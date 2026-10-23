import type { Logger, MetricEvent, Output, ProgressEvent } from "./host.ts";

/**
 * Base for all Flowscripter runtime components. The config is opaque to the runtime and is
 * validated by the component itself.
 */
export interface FlowscripterComponent<TConfig = unknown> {
  readonly config: TConfig;
  dispose?(): void | Promise<void>;
}

/**
 * Members to be refined in flowscripter/runtime#10.
 */
export interface DataModel extends FlowscripterComponent {}

export interface DataEntry {
  readonly model: DataModel;
}

export interface Datastore extends FlowscripterComponent {
  getAllDataEntries(): AsyncIterable<DataEntry>;
}

/**
 * Read-only view of the components loaded in a runtime, keyed by handle.
 */
export interface Registry {
  getAllDatastores(): Iterable<[string, Datastore]>;
  getAllDataModels(): Iterable<[string, DataModel]>;
}

export interface DatastoreManager {
  getAll(): Iterable<[string, Datastore]>;
}

export interface DataCollection {
  getAll(): AsyncIterable<DataEntry>;
  add(entry: DataEntry): Promise<void>;
  remove(entry: DataEntry): Promise<boolean>;
}

/**
 * Opaque placeholder; nodes and edges are defined by the ticket which implements processing.
 */
export type ProcessingGraph = unknown;

/**
 * Mutable during a run: the host and components add and remove entries.
 */
export interface Session {
  readonly graph?: ProcessingGraph;
  readonly inputs: DataCollection;
  readonly results: DataCollection;
}

export interface SessionManager {
  getAll(): Iterable<[string, Session]>;
  create(handle: string): Promise<Session>;
  remove(handle: string): Promise<boolean>;
}

/**
 * Everything a runtime needs for processing, passed to components on creation.
 */
export interface RuntimeContext {
  readonly logger: Logger;
  readonly output: Output;
  reportProgress(event: ProgressEvent): void;
  reportMetric(event: MetricEvent): void;
  readonly registry: Registry;
  readonly datastoreManager: DatastoreManager;
  readonly sessionManager: SessionManager;
  readonly session: Session;
}
