/**
 * @module @flowscripter/plugin-api
 */

import ConfigParameters from './ConfigParameters';

/**
 * Interface specifying a Flowscripter runtime component.
 */
export default interface FlowscripterComponent {

    /**
     * Configuration for the [[FlowscripterComponent]].
     */
    readonly config: ConfigParameters;
}
