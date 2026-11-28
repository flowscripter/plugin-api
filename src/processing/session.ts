import type { DataEntry } from "../data/data-entry.ts";
import type { Graph } from "./graph.ts";

export interface Session {
  readonly graph?: Graph;
  getAllDataEntries(): AsyncIterable<DataEntry>;
}
