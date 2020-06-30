/**
 * @module @flowscripter/plugin-api
 */

/* eslint-disable @typescript-eslint/no-empty-interface */

import { ExtensionFactory } from '@flowscripter/esm-dynamic-plugins';

/**
 * An extension of esm-dynamic-plugins ExtensionDescriptor interface which is specific to the Flowscripter system.
 */
export default interface FlowscripterExtensionFactory extends ExtensionFactory {
}
