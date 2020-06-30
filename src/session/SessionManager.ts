/**
 * @module @flowscripter/plugin-api
 */

import Session from './Session';

/**
 * Provides a mechanism to manage all created [[Session]] instances for a [[Runtime]].
 *
 * String values are used as handles to the [[Session]] instances.
 */
export default interface SessionManager {

    /**
     * Return all registered [[Session]] instances.
     *
     * @return an iterable of tuples [string, [[Session]]] for all managed [[Session]] instances.
     */
    getAll(): Iterable<[string, Session]>;
}
