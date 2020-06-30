/**
 * @module @flowscripter/plugin-api
 */

import { ConfigValueType } from './ConfigValueType';

/**
 * A container object for generic configuration values.
 */
export default interface ConfigParameters {
    [configValueName: string]: ConfigValueType;
}
