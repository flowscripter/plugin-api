/**
 * Base for all Flowscripter runtime components. The config is opaque to the runtime and is
 * validated by the component itself.
 */
export interface FlowscripterComponent<TConfig = unknown> {
  readonly config: TConfig;
  dispose?(): void | Promise<void>;
}

/**
 * Thrown by {@link ComponentFactory.create} when the supplied config is invalid. The runtime
 * logs it and skips the component.
 */
export class ComponentConfigError extends Error {
  readonly handle?: string;
  readonly field?: string;

  constructor(message: string, details: { handle?: string; field?: string; cause?: unknown } = {}) {
    super(message, { cause: details.cause });
    this.name = "ComponentConfigError";
    this.handle = details.handle;
    this.field = details.field;
  }
}
