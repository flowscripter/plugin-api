import type { FlowscripterComponent } from "../component/component.ts";
import type { DataEntry } from "./data-entry.ts";

export interface Datastore extends FlowscripterComponent {
  getAllDataEntries(): AsyncIterable<DataEntry>;
}
