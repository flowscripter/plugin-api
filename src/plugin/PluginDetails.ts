/**
 * @module @flowscripter/plugin-api
 */

/**
 * Provides vendor and version information for a [[FlowscripterPlugin]].
 */
export default interface PluginDetails {

    /**
     * Name for the [[FlowscripterPlugin]].
     */
    readonly name: string

    /**
     * Version for the [[FlowscripterPlugin]].
     */
    readonly version: string

    /**
     * Optional vendor name for the [[FlowscripterPlugin]].
     */
    readonly vendor?: string

    /**
     * Other [[Plugin]] implementations that this [[Plugin]] depends on in the form of an array of tuples
     * `[<plugin.name>, <plugin.version>]`
     */
    readonly dependencies: ReadonlyArray<[string, string]>;
}
