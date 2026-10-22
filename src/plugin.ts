import type { ExtensionDescriptor, Plugin } from "@flowscripter/dynamic-plugin-framework";
import type { DataModel, Datastore, Registry, RuntimeContext } from "./component.ts";

export const FLOWSCRIPTER_DATA_MODEL = "FLOWSCRIPTER_DATA_MODEL";
export const FLOWSCRIPTER_DATASTORE = "FLOWSCRIPTER_DATASTORE";
export const FLOWSCRIPTER_REGISTRY = "FLOWSCRIPTER_REGISTRY";

/**
 * Returned by the framework extension factory. The runtime resolves the config (starting from
 * `defaultConfig`) and then calls `create` itself, so rich services bypass the string-only
 * framework `hostData`.
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

export interface RegistryExtensionDescriptor extends ExtensionDescriptor {
  readonly extensionPoint: typeof FLOWSCRIPTER_REGISTRY;
  readonly factory: {
    create(hostData?: Map<string, string>): Promise<ComponentFactory<unknown, Registry>>;
  };
}

/**
 * A {@link Plugin} whose extension descriptors are limited to the Flowscripter component
 * extension points.
 */
export interface ComponentPlugin extends Plugin {
  readonly extensionDescriptors: ReadonlyArray<
    DataModelExtensionDescriptor | DatastoreExtensionDescriptor | RegistryExtensionDescriptor
  >;
}

type FactoryOrProvider<T> = T | (() => Promise<T>);

export interface ComponentPluginOptions {
  readonly dataModelFactory?: FactoryOrProvider<ComponentFactory<unknown, DataModel>>;
  readonly datastoreFactory?: FactoryOrProvider<ComponentFactory<unknown, Datastore>>;
  readonly registryFactory?: FactoryOrProvider<ComponentFactory<unknown, Registry>>;
  readonly pluginData?: ReadonlyMap<string, string>;
}

async function resolve<T extends object>(value: FactoryOrProvider<T>): Promise<T> {
  return typeof value === "function" ? (value as () => Promise<T>)() : value;
}

/**
 * Build a {@link ComponentPlugin} from component factories (or factory functions), without
 * needing to hand-construct extension descriptors.
 */
export function createComponentPlugin(options: ComponentPluginOptions): ComponentPlugin {
  const extensionDescriptors: ComponentPlugin["extensionDescriptors"][number][] = [];
  const { dataModelFactory, datastoreFactory, registryFactory } = options;

  if (dataModelFactory) {
    extensionDescriptors.push({
      extensionPoint: FLOWSCRIPTER_DATA_MODEL,
      factory: { create: () => resolve(dataModelFactory) },
    });
  }
  if (datastoreFactory) {
    extensionDescriptors.push({
      extensionPoint: FLOWSCRIPTER_DATASTORE,
      factory: { create: () => resolve(datastoreFactory) },
    });
  }
  if (registryFactory) {
    extensionDescriptors.push({
      extensionPoint: FLOWSCRIPTER_REGISTRY,
      factory: { create: () => resolve(registryFactory) },
    });
  }

  return { extensionDescriptors, pluginData: options.pluginData };
}
