/**
 * @module @flowscripter/plugin-api
 */

import RuntimeContext from '../context/RuntimeContext';

/**
 * Interface exposed by a Flowscripter runtime implementation.
 */
export default interface Runtime {

    /**
     * [[RuntimeContext]] for this [[Runtime]] instance.
     */
    readonly runtimeContext: RuntimeContext;
}
