/**
 * @module @flowscripter/plugin-api
 */

import DataModel from './DataModel';

/**
 * Interface exposed by a Flowscripter data entry implementation.
 */
export default interface DataEntry {

    /**
     * The [[DataModel]] which contains the definition for this [[DataEntry]].
     */
    readonly model: DataModel;
}
