/**
 * @module @flowscripter/plugin-api
 */

import Datastore from './Datastore';

/**
 * Provides a mechanism to manage [[Datastore]] instances.
 *
 * String values are used as handles to the [[Datastore]] instances.
 */
export default interface DatastoreManager {

    /**
     * Return all managed [[Datastore]] instances.
     *
     * @return an iterable of tuples [string, [[Datastore]]] for all managed [[Datastore]] instances.
     */
    getAll(): Iterable<[string, Datastore]>;
}
