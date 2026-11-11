# plugin-api

[![version](https://img.shields.io/github/v/release/flowscripter/plugin-api?sort=semver)](https://github.com/flowscripter/plugin-api/releases)
[![build](https://img.shields.io/github/actions/workflow/status/flowscripter/plugin-api/release-bun-library.yml)](https://github.com/flowscripter/plugin-api/actions/workflows/release-bun-library.yml)
[![coverage](https://codecov.io/gh/flowscripter/plugin-api/graph/badge.svg?token=uWK0oWsBjr)](https://codecov.io/gh/flowscripter/plugin-api)
[![docs](https://img.shields.io/badge/docs-API-blue)](https://flowscripter.github.io/plugin-api/index.html)
[![license: MIT](https://img.shields.io/github/license/flowscripter/plugin-api)](https://github.com/flowscripter/plugin-api/blob/main/LICENSE)

> Flowscripter plugin API: interfaces for command and component plugins

> Work in progress.

## Bun Module Usage

Add the module:

`bun add @flowscripter/plugin-api`

Use the module:

```typescript
import {
  ComponentConfigError,
  createComponentPlugin,
  type ComponentFactory,
  type Datastore,
} from "@flowscripter/plugin-api";

const datastoreFactory: ComponentFactory<{ path?: string }, Datastore> = {
  defaultConfig: {},
  create: async (context, config) => {
    if (config.path !== undefined && config.path === "") {
      throw new ComponentConfigError("path must not be empty", { field: "path" });
    }
    context.logger.info("creating datastore", { path: config.path ?? null });
    return {
      config,
      async *getAllDataEntries() {},
    };
  },
};

const plugin = createComponentPlugin({
  datastoreFactory,
  componentName: "Example Datastore",
  componentVersion: "1.0.0",
});
```

## Development

Install dependencies:

`bun install`

Build (produces `dist/` for Node.js and TypeScript consumers; Bun uses raw source directly):

`bun run build`

Test:

`bun test`

Format:

`bunx oxfmt`

Lint:

`bunx oxlint index.ts src/ tests/`

Generate HTML API Documentation:

`bunx typedoc index.ts`

## Documentation

### Overview

A component plugin provides factories for data models and datastores. The runtime calls each factory with a `RuntimeContext`, which gives components logging, output, progress and metric reporting, and access to the registry, datastore manager, session manager and the active session. A `Session` holds the processing `Graph` and exposes its data entries.

```mermaid
classDiagram
    class FlowscripterComponent~TConfig~ {
        <<interface>>
        +config TConfig
        +dispose() void
    }
    class DataModel {
        <<interface>>
    }
    class DataEntry {
        <<interface>>
        +model DataModel
    }
    class Datastore {
        <<interface>>
        +getAllDataEntries() AsyncIterable~DataEntry~
    }
    class Graph {
        <<type>>
    }
    class Session {
        <<interface>>
        +graph Graph
        +getAllDataEntries() AsyncIterable~DataEntry~
    }
    class SessionManager {
        <<interface>>
        +getAll() Iterable~Session~
    }
    class DatastoreManager {
        <<interface>>
        +getAll() Iterable~Datastore~
    }
    class Registry {
        <<interface>>
        +getAllDatastores() Iterable~Datastore~
        +getAllDataModels() Iterable~DataModel~
    }
    class RuntimeContext {
        <<interface>>
        +logger Logger
        +output Output
        +reportProgress(event ProgressEvent) void
        +reportMetric(event MetricEvent) void
        +registry Registry
        +datastoreManager DatastoreManager
        +sessionManager SessionManager
        +session Session
    }
    class ComponentFactory~TConfig~ {
        <<interface>>
        +defaultConfig TConfig
        +create(context RuntimeContext, config TConfig) Promise~FlowscripterComponent~
    }
    class ComponentPlugin {
        <<interface>>
        +extensionDescriptors
    }
    class ComponentConfigError {
        +handle string
        +field string
    }

    FlowscripterComponent <|-- DataModel
    FlowscripterComponent <|-- Datastore
    DataEntry --> DataModel
    Datastore ..> DataEntry
    Session --> Graph
    Session ..> DataEntry
    SessionManager ..> Session
    DatastoreManager ..> Datastore
    Registry ..> Datastore
    Registry ..> DataModel
    RuntimeContext --> Registry
    RuntimeContext --> DatastoreManager
    RuntimeContext --> SessionManager
    RuntimeContext --> Session
    ComponentFactory ..> RuntimeContext
    ComponentFactory ..> FlowscripterComponent
    ComponentPlugin ..> ComponentFactory
    ComponentFactory ..> ComponentConfigError : throws
```

### API

Link to auto-generated API docs:

[API Documentation](https://flowscripter.github.io/plugin-api/index.html)

## License

MIT © Flowscripter
