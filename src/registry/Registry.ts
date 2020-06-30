/**
 * @module @flowscripter/plugin-api
 */

import Datastore from '../data/Datastore';
import DataModel from '../data/DataModel';

/**
 * Provides a mechanism to manage all [[FlowscripterComponent]] instances loaded in a Flowscripter [[Runtime]].
 *
 * String values are used as handles to the [[FlowscripterComponent]] instances.
 */
export default interface Registry {

    /**
     * Return all registered [[Datastore]] instances.
     *
     * @return an iterable of tuples [string, [[Datastore]]] for all registered [[Datastore]] implementations.
     */
    getAllDatastores(): Iterable<[string, Datastore]>;

    /**
     * Return all registered [[DataModel]] instances.
     *
     * @return an iterable of tuples [string, [[DataModel]]] for all registered [[DataModel]] implementations.
     */
    getAllDataModels(): Iterable<[string, DataModel]>;
}
