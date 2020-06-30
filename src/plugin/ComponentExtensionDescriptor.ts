/**
 * @module @flowscripter/plugin-api
 */

import ComponentExtensionDetails from './ComponentExtensionDetails';
import FlowscripterExtensionDescriptor from './FlowscripterExtensionDescriptor';

/**
 * A [[FlowscripterExtensionDescriptor]] used to describe a [[FlowscripterComponent]] implementation.
 */
export default interface ComponentExtensionDescriptor extends FlowscripterExtensionDescriptor {

    /**
     * Information about the [[FlowscripterComponent]] implementation.
     */
    readonly extensionData: ComponentExtensionDetails;
}
