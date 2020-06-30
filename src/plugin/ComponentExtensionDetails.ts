/**
 * @module @flowscripter/plugin-api
 */

import FlowscripterExtensionDetails from './FlowscripterExtensionDetails';
import ConfigParameters from '../component/ConfigParameters';

/**
 * Details for the [[FlowscripterComponent]] implementation provided by the extension.
 */
export default interface ComponentExtensionDetails extends FlowscripterExtensionDetails {

    /**
     * Configuration exposed by the provided [[FlowscripterComponent]] implementation.
     */
    readonly config: ConfigParameters;
}
