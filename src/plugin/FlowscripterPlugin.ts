/**
 * @module @flowscripter/plugin-api
 */

import { Plugin } from '@flowscripter/esm-dynamic-plugins';
import PluginDetails from './PluginDetails';
import FlowscripterExtensionDescriptor from './FlowscripterExtensionDescriptor';

/**
 * An extension of esm-dynamic-plugins Plugin interface which is specific to the Flowscripter system.
 */
export default interface FlowscripterPlugin extends Plugin<string> {

    /**
     * Array of [[FlowscripterExtensionDescriptor]] instances describing all Extensions provided by the plugin.
     */
    readonly extensionDescriptors: FlowscripterExtensionDescriptor[];

    /**
     * Information about the [[Plugin]].
     */
    readonly pluginData: PluginDetails;
}
