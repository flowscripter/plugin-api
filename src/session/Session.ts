/**
 * @module @flowscripter/plugin-api
 */

import DataEntry from '../data/DataEntry';

/**
 * Interface exposed by a Flowscripter session implementation.
 */
export default interface Session {

    /**
     * Return all [[DataEntry]] instances for the session.
     *
     * @return an iterable of [[DataEntry]] instances.
     */
    getAllDataEntries(): Iterable<DataEntry>;
}
