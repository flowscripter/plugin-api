/**
 * @module @flowscripter/plugin-api
 */

import Datastore from '../datastore/Datastore';

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
    getAllDataStores(): Iterable<[string, Datastore]>;
}
