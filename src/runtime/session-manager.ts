import type { Session } from "../processing/session.ts";

export interface SessionManager {
  getAll(): Iterable<[string, Session]>;
}
