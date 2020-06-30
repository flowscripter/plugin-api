/**
 * @module @flowscripter/plugin-api
 */

/* eslint-disable @typescript-eslint/no-empty-interface */

import { SubCommand } from '@flowscripter/cli-framework';

/**
 * Interface defining a Flowscripter CLI Command.
 *
 * This is an extension of the esm-dynamic-plugins SubCommand.
 */
export default interface FlowscripterCommand extends SubCommand {
}
