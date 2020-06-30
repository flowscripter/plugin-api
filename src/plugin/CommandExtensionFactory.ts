/**
 * @module @flowscripter/plugin-api
 */

import FlowscripterExtensionFactory from './FlowscripterExtensionFactory';
import FlowscripterCommand from '../command/FlowscripterCommand';
import Runtime from '../runtime/Runtime';

/**
 * A [[FlowscripterExtensionFactory]] used to instantiate a [[FlowscripterCommand]] implementation.
 */
export default interface CommandExtensionFactory extends FlowscripterExtensionFactory {

    /**
     * Construct and return an instance of a [[FlowscripterCommand]].
     *
     * @param runtime a reference to the [[Runtime]] which should be passed to the [[FlowscripterCommand]].
     *
     * @return a newly instantianted [[FlowscripterCommand]].
     */
    create(runtime: Runtime): Promise<FlowscripterCommand>;
}
