/**
 * @module @flowscripter/plugin-api
 */

import { ExtensionDescriptor } from '@flowscripter/esm-dynamic-plugins';
import FlowscripterExtensionFactory from './FlowscripterExtensionFactory';

/**
 * An extension of esm-dynamic-plugins ExtensionDescriptor interface which is specific to the Flowscripter system.
 */
export default interface FlowscripterExtensionDescriptor extends ExtensionDescriptor<string> {

    /**
     * Provides a [[FlowscripterExtensionFactory]] which can be used to create an instance of the Extension Point to
     * which this [[FlowscripterExtensionDescriptor]] object relates.
     */
    readonly factory: FlowscripterExtensionFactory;
}
