/**
 * @module @flowscripter/plugin-api
 */

export type ConfigSingleValueType = number | string | boolean;

/**
 * The type of the value to be parsed as a config value can be: `boolean`, `number` or `string` or an array of these.
 */
export type ConfigValueType = ConfigSingleValueType | ConfigSingleValueType[];

/**
 * Enum of possible [[Config]] value types
 */

// eslint-disable-next-line import/prefer-default-export
export enum ConfigValueTypeName {
    String = 'STRING',
    Number = 'NUMBER',
    Boolean = 'BOOLEAN'
}
