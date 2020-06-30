/**
 * @module @flowscripter/plugin-api
 */

import FlowscripterComponent from '../component/FlowscripterComponent';
import DataEntry from './DataEntry';

/**
 * Interface exposed by a Flowscripter datastore implementation.
 */
export default interface Datastore extends FlowscripterComponent {

    /**
     * Return all stored [[DataEntry]] instances for the datastore.
     *
     * @return an iterable of [[DataEntry]] instances.
     */
    getAllDataEntries(): Iterable<DataEntry>;
}
