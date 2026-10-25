import type { Datastore } from "../data/datastore.ts";

export interface DatastoreManager {
  getAll(): Iterable<[string, Datastore]>;
}
