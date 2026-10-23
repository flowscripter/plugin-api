/**
 * Plain structured data (JSON-compatible) which a host may pretty-print and highlight.
 */
export type StructuredValue =
  | string
  | number
  | boolean
  | null
  | ReadonlyArray<StructuredValue>
  | { readonly [key: string]: StructuredValue };

export type LogLevel = "debug" | "info" | "warn" | "error" | "silent";

export type LogFields = Readonly<Record<string, StructuredValue>>;

/**
 * Levelled sink for runtime processing events (diagnostics, not results).
 */
export interface Logger {
  /**
   * The lazy form must not invoke the callback when debug logging is disabled.
   */
  debug(message: string | (() => string), fields?: LogFields): void;
  info(message: string, fields?: LogFields): void;
  warn(message: string, fields?: LogFields): void;
  /**
   * `cause` is passed as-is and may be an `Error` with circular references; implementations render it
   * with a circular-safe formatter and must not rely on `JSON.stringify` (which gives `{}` for an `Error`).
   */
  error(message: string, fields?: LogFields, cause?: unknown): void;
}

/**
 * Sink for the results of runtime processing (distinct from {@link Logger}).
 */
export interface Output {
  write(value: string | StructuredValue): void;
}

export interface ProgressEvent {
  readonly id: string;
  readonly operation: string;
  readonly state: "start" | "update" | "end";
  readonly current?: number;
  readonly total?: number;
  readonly message?: string;
}

export interface MetricEvent {
  readonly name: string;
  readonly value: number;
  readonly unit?: string;
  readonly tags?: Readonly<Record<string, string>>;
}
