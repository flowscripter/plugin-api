import type { ExtensionDescriptor, Plugin } from "@flowscripter/dynamic-plugin-framework";
import type { DataModel } from "../data/data-model.ts";
import type { Datastore } from "../data/datastore.ts";
import type { RuntimeContext } from "../runtime/runtime-context.ts";

export const FLOWSCRIPTER_DATA_MODEL = "FLOWSCRIPTER_DATA_MODEL";
export const FLOWSCRIPTER_DATASTORE = "FLOWSCRIPTER_DATASTORE";

/**
 * `extensionData` keys set by {@link createComponentPlugin} for the runtime `components` listing.
 */
export const COMPONENT_NAME_KEY = "componentName";
export const COMPONENT_VERSION_KEY = "componentVersion";

/**
 * Returned by the framework extension factory. The runtime resolves the config (starting from
 * `defaultConfig`) and then calls `create` itself, so rich services bypass the string-only
 * framework `hostData`. `create` rejects with a `ComponentConfigError` if the config is invalid.
 */
export interface ComponentFactory<TConfig, TComponent> {
  readonly defaultConfig?: TConfig;
  create(context: RuntimeContext, config: TConfig): Promise<TComponent>;
}

export interface DataModelExtensionDescriptor extends ExtensionDescriptor {
  readonly extensionPoint: typeof FLOWSCRIPTER_DATA_MODEL;
  readonly factory: {
    create(hostData?: Map<string, string>): Promise<ComponentFactory<unknown, DataModel>>;
  };
}

export interface DatastoreExtensionDescriptor extends ExtensionDescriptor {
  readonly extensionPoint: typeof FLOWSCRIPTER_DATASTORE;
  readonly factory: {
    create(hostData?: Map<string, string>): Promise<ComponentFactory<unknown, Datastore>>;
  };
}

/**
 * A {@link Plugin} whose extension descriptors are limited to the Flowscripter component
 * extension points.
 */
export interface ComponentPlugin extends Plugin {
  readonly extensionDescriptors: ReadonlyArray<
    DataModelExtensionDescriptor | DatastoreExtensionDescriptor
  >;
}
