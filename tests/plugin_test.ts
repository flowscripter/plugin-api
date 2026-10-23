import { describe, expect, test } from "bun:test";
import type { ExtensionDescriptor, Plugin } from "@flowscripter/dynamic-plugin-framework";
import {
  createCLIPlugin,
  createComponentPlugin,
  FLOWSCRIPTER_DATA_MODEL,
  FLOWSCRIPTER_DATASTORE,
  FLOWSCRIPTER_REGISTRY,
} from "../index.ts";
import type {
  CLIPlugin,
  ComponentFactory,
  ComponentPlugin,
  DataModel,
  DataModelExtensionDescriptor,
  Datastore,
  DatastoreExtensionDescriptor,
  Registry,
  RegistryExtensionDescriptor,
} from "../index.ts";

// type-level assertions: these fail typecheck if the shapes drift
const _descriptors: ExtensionDescriptor[] = [
  {} as DataModelExtensionDescriptor,
  {} as DatastoreExtensionDescriptor,
  {} as RegistryExtensionDescriptor,
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
const registryFactory: ComponentFactory<unknown, Registry> = {
  create: async () => ({ getAllDatastores: () => [], getAllDataModels: () => [] }),
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
      registryFactory,
      pluginData,
    });
    expect(plugin.pluginData).toBe(pluginData);
    expect(plugin.extensionDescriptors.map((d) => d.extensionPoint)).toEqual([
      FLOWSCRIPTER_DATA_MODEL,
      FLOWSCRIPTER_DATASTORE,
      FLOWSCRIPTER_REGISTRY,
    ]);
    const created = await Promise.all(plugin.extensionDescriptors.map((d) => d.factory.create()));
    expect(created).toEqual([modelFactory, storeFactory, registryFactory]);
  });
});
