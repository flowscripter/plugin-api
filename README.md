# plugin-api
[![license](https://img.shields.io/github/license/flowscripter/plugin-api.svg)](https://github.com/flowscripter/plugin-api/blob/master/LICENSE)
[![dependencies](https://img.shields.io/david/flowscripter/plugin-api.svg)](https://david-dm.org/flowscripter/plugin-api)
[![travis](https://api.travis-ci.com/flowscripter/plugin-api.svg)](https://travis-ci.com/flowscripter/plugin-api)
[![npm](https://img.shields.io/npm/v/@flowscripter/plugin-api.svg)](https://www.npmjs.com/package/@flowscripter/plugin-api)

> Flowscripter Plugin API.

## Overview
This project provides a Plugin API for the Flowscripter system.

**This is a work in progress**

#### Plugins and Extensions
Plugins are based on extensions to the interfaces provided in the
[@flowscripter/esm-dynamic-plugins](https://github.com/flowscripter/esm-dynamic-plugins)
and [@flowscripter/cli-framework](https://github.com/flowscripter/cli-framework) projects.

The extended interfaces declare stricter types which explicitly define their use as a plugin mechanism for the Flowscripter
[CLI](https://github.com/flowscripter/cli) and Flowscripter [Runtime](https://github.com/flowscripter/runtime).

The two extensions which can be implemented by plugins are:

* `FlowscripterComponent`: These extend the Flowscripter [Runtime](https://github.com/flowscripter/runtime) with
core functionality (e.g. payload types, datastores and operators) and may access the Runtime Context.
* `FlowscripterCommand`: These extend the Flowscripter [CLI](https://github.com/flowscripter/cli) with parameterised
TypeScript or JavaScript and may access the Runtime API.

The following high level class diagram illustrates these relationships:

![High Level Plugin Class Diagram](http://www.plantuml.com/plantuml/proxy?fmt=svg&cache=no&src=https://raw.githubusercontent.com/flowscripter/plugin-api/master/images/high_level_plugin_class_diagram.iuml "High Level Runtime Class Diagram")

#### Runtime and Context

The Runtime interface allows `FlowscripterCommand` implementations to manipulate and manage a Flowscripter
[Runtime](https://github.com/flowscripter/runtime) instance.

The Runtime Context interface allows `FlowscripterComponent` implementations to interact with the internal processing
loop of the Flowscripter [Runtime](https://github.com/flowscripter/runtime).

The following high level class diagram illustrates these relationships:

![High Level Runtime Class Diagram](http://www.plantuml.com/plantuml/proxy?fmt=svg&cache=no&src=https://raw.githubusercontent.com/flowscripter/plugin-api/master/images/high_level_runtime_class_diagram.iuml "High Level Runtime Class Diagram")

## Development

Firstly:

```
npm install
```

then:

Build: `npm run build`

Watch: `npm run watch`

Lint: `npm run lint`

Docs: `npm run docs`

## API

[API documentation](https://flowscripter.github.io/plugin-api)

## Further Details

Further details on project configuration files and Javascript version support can be found in
the [template for this project](https://github.com/flowscripter/ts-template/blob/master/README.md#overview).

## License

MIT © Flowscripter
