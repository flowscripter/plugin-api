import type { DataModel } from "../data/data-model.ts";
import type { Datastore } from "../data/datastore.ts";
import {
  COMPONENT_NAME_KEY,
  COMPONENT_VERSION_KEY,
  FLOWSCRIPTER_DATA_MODEL,
  FLOWSCRIPTER_DATASTORE,
} from "./plugin.ts";
import type { ComponentFactory, ComponentPlugin } from "./plugin.ts";

export type FactoryOrProvider<T> = T | (() => Promise<T>);

export interface ComponentPluginOptions {
  readonly dataModelFactory?: FactoryOrProvider<ComponentFactory<unknown, DataModel>>;
  readonly datastoreFactory?: FactoryOrProvider<ComponentFactory<unknown, Datastore>>;
  readonly pluginData?: ReadonlyMap<string, string>;
  /** Human readable name, set as `extensionData` `componentName` on each descriptor. */
  readonly componentName?: string;
  /** Set as `extensionData` `componentVersion` on each descriptor. */
  readonly componentVersion?: string;
}

export async function resolve<T extends object>(value: FactoryOrProvider<T>): Promise<T> {
  return typeof value === "function" ? (value as () => Promise<T>)() : value;
}

/**
 * Build a {@link ComponentPlugin} from component factories (or factory functions), without
 * needing to hand-construct extension descriptors.
 */
export function createComponentPlugin(options: ComponentPluginOptions): ComponentPlugin {
  const extensionDescriptors: ComponentPlugin["extensionDescriptors"][number][] = [];
  const { dataModelFactory, datastoreFactory, componentName, componentVersion } = options;

  const extensionData = new Map<string, string>();
  if (componentName !== undefined) extensionData.set(COMPONENT_NAME_KEY, componentName);
  if (componentVersion !== undefined) extensionData.set(COMPONENT_VERSION_KEY, componentVersion);

  if (dataModelFactory) {
    extensionDescriptors.push({
      extensionPoint: FLOWSCRIPTER_DATA_MODEL,
      extensionData: new Map(extensionData),
      factory: { create: () => resolve(dataModelFactory) },
    });
  }
  if (datastoreFactory) {
    extensionDescriptors.push({
      extensionPoint: FLOWSCRIPTER_DATASTORE,
      extensionData: new Map(extensionData),
      factory: { create: () => resolve(datastoreFactory) },
    });
  }

  return { extensionDescriptors, pluginData: options.pluginData };
}
