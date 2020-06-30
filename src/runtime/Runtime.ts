/**
 * @module @flowscripter/plugin-api
 */

import RuntimeContext from './RuntimeContext';

/**
 * Interface exposed by a Flowscripter runtime implementation.
 */
export default interface Runtime {

    /**
     * [[RuntimeContext]] for this [[Runtime]] instance.
     */
    readonly runtimeContext: RuntimeContext;
}
