/**
 * @module @flowscripter/plugin-api
 */

import RuntimeContext from '../context/RuntimeContext';
import FlowscripterComponent from '../component/FlowscripterComponent';
import FlowscripterExtensionFactory from './FlowscripterExtensionFactory';

/**
 * A [[FlowscripterExtensionFactory]] used to instantiate a [[FlowscripterComponent]] implementation.
 */
export default interface ComponentExtensionFactory extends FlowscripterExtensionFactory {

    /**
     * Construct and return an instance of a [[FlowscripterComponent]].
     *
     * @param runtimeContext a reference to the [[RuntimeContext]] which should be passed to the
     * [[FlowscripterComponent]].
     *
     * @return a newly instantianted [[FlowscripterComponent]].
     */
    create(runtimeContext: RuntimeContext): Promise<FlowscripterComponent>;
}
