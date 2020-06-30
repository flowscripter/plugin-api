/**
 * @module @flowscripter/plugin-api
 */

import Registry from './registry/Registry';
import DatastoreManager from './datastore/DatastoreManager';
import SessionManager from './session/SessionManager';

/**
 * A context for the currently running [[Runtime]].
 */
export default interface RuntimeContext {

    /**
     * Implementation of a [[Registry]].
     */
    readonly registry: Registry;

    /**
     * Implementation of a [[DatastoreManager]].
     */
    readonly datastoreManager: DatastoreManager;

    /**
     * Implementation of a [[SessionManager]].
     */
    readonly sessionManager: SessionManager;
}
