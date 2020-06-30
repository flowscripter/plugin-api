/**
 * @module @flowscripter/plugin-api
 */

import FlowscripterExtensionDescriptor from './FlowscripterExtensionDescriptor';
import CommandExtensionDetails from './CommandExtensionDetails';

/**
 * A [[FlowscripterExtensionDescriptor]] used to describe a [[FlowscripterCommand]] implementation.
 */
export default interface CommandExtensionDescriptor extends FlowscripterExtensionDescriptor {

    /**
     * Information about the [[FlowscripterCommand]] implementation.
     */
    readonly extensionData: CommandExtensionDetails;
}
