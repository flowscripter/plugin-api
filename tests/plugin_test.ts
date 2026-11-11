import { describe, expect, test } from "bun:test";
import type { ExtensionDescriptor, Plugin } from "@flowscripter/dynamic-plugin-framework";
import {
  createCLIPlugin,
  createComponentPlugin,
  FLOWSCRIPTER_DATA_MODEL,
  FLOWSCRIPTER_DATASTORE,
  COMPONENT_NAME_KEY,
  COMPONENT_VERSION_KEY,
  ComponentConfigError,
} from "../index.ts";
import type {
  CLIPlugin,
  ComponentFactory,
  ComponentPlugin,
  DataModel,
  DataModelExtensionDescriptor,
  Datastore,
  DatastoreExtensionDescriptor,
} from "../index.ts";

// type-level assertions: these fail typecheck if the shapes drift
const _descriptors: ExtensionDescriptor[] = [
  {} as DataModelExtensionDescriptor,
  {} as DatastoreExtensionDescriptor,
];
const _plugin: Plugin = {} as ComponentPlugin;
const _cliPlugin: CLIPlugin = createCLIPlugin({});
const _typedFactory: ComponentFactory<{ n: number }, DataModel> = {
  defaultConfig: { n: 1 },
  create: async (_context, config) => ({ config }),
};
const _unknownConfigFactory: ComponentFactory<unknown, DataModel> = _typedFactory;

const modelFactory: ComponentFactory<unknown, DataModel> = {
  create: async () => ({ config: {} }),
};
const storeFactory: ComponentFactory<unknown, Datastore> = {
  create: async () => ({
    config: {},
    async *getAllDataEntries() {},
  }),
};

describe("createComponentPlugin", () => {
  test("empty options give no descriptors", () => {
    expect(createComponentPlugin({}).extensionDescriptors).toEqual([]);
  });

  test("builds one descriptor per factory, accepting factories or providers", async () => {
    const pluginData = new Map([["a", "b"]]);
    const plugin = createComponentPlugin({
      dataModelFactory: modelFactory,
      datastoreFactory: async () => storeFactory,
      pluginData,
    });
    expect(plugin.pluginData).toBe(pluginData);
    expect(plugin.extensionDescriptors.map((d) => d.extensionPoint)).toEqual([
      FLOWSCRIPTER_DATA_MODEL,
      FLOWSCRIPTER_DATASTORE,
    ]);
    const created = await Promise.all(plugin.extensionDescriptors.map((d) => d.factory.create()));
    expect(created).toEqual([modelFactory, storeFactory]);
  });

  test("sets componentName and componentVersion extensionData when provided", () => {
    const plugin = createComponentPlugin({
      dataModelFactory: modelFactory,
      datastoreFactory: storeFactory,
      componentName: "Example",
      componentVersion: "1.2.3",
    });
    for (const d of plugin.extensionDescriptors) {
      expect(d.extensionData?.get(COMPONENT_NAME_KEY)).toBe("Example");
      expect(d.extensionData?.get(COMPONENT_VERSION_KEY)).toBe("1.2.3");
    }
  });

  test("omits extensionData keys which are not provided", () => {
    const plugin = createComponentPlugin({ dataModelFactory: modelFactory, componentName: "X" });
    const data = plugin.extensionDescriptors[0].extensionData;
    expect(data?.get(COMPONENT_NAME_KEY)).toBe("X");
    expect(data?.has(COMPONENT_VERSION_KEY)).toBe(false);
  });
});

describe("ComponentConfigError", () => {
  test("carries handle, field and cause", () => {
    const cause = new Error("root");
    const e = new ComponentConfigError("bad", { handle: "h", field: "f", cause });
    expect(e).toBeInstanceOf(Error);
    expect(e.name).toBe("ComponentConfigError");
    expect(e.message).toBe("bad");
    expect(e.handle).toBe("h");
    expect(e.field).toBe("f");
    expect(e.cause).toBe(cause);
  });

  test("details are optional", () => {
    const e = new ComponentConfigError("bad");
    expect(e.handle).toBeUndefined();
    expect(e.field).toBeUndefined();
  });
});
