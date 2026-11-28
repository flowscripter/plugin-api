import type { DataModel } from "../data/data-model.ts";
import type { Datastore } from "../data/datastore.ts";

/**
 * Read-only view of the components loaded in a runtime, keyed by handle.
 */
export interface Registry {
  getAllDatastores(): Iterable<[string, Datastore]>;
  getAllDataModels(): Iterable<[string, DataModel]>;
}
