/**
 * @module @flowscripter/plugin-api
 */

import { Option, Positional } from '@flowscripter/cli-framework';
import FlowscripterExtensionDetails from './FlowscripterExtensionDetails';

/**
 * Details for the [[FlowscripterCommand]] implementation provided by the extension.
 */
export default interface CommandExtensionDetails extends FlowscripterExtensionDetails {

    /**
     * Option arguments exposed by the provided [[FlowscripterCommand]] implementation.
     */
    readonly options: ReadonlyArray<Option>;

    /**
     * Positional arguments exposed by the provided [[FlowscripterCommand]] implementation.
     */
    readonly positionals: ReadonlyArray<Positional>;
}
