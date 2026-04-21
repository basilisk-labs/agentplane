import { DeprecatedFlagError, UsageError } from "../../shared/errors.js";
import type { CliError } from "../../shared/errors.js";

import type { CommandSpec } from "./spec.js";
import { renderCommandHelpText } from "./help-render.js";

/**
 * Usage-error helpers for command-spec parsing/rendering only.
 *
 * Allowed here:
 * - E_USAGE construction tied to CLI spec/help rendering
 * - command-specific usage context shaping
 *
 * Do not add:
 * - shared runtime error primitives
 * - backend/domain errors
 * - non-CLI formatting or transport concerns
 */
export function usageError(opts: {
  message: string;
  spec?: CommandSpec<unknown>;
  command?: string;
  context?: Record<string, unknown>;
}): CliError {
  const command = opts.command ?? (opts.spec ? opts.spec.id.join(" ") : undefined);
  const usage =
    opts.spec && renderCommandHelpText(opts.spec, { compact: true, includeHeader: false });
  const fullMessage = usage ? `${opts.message}\n\n${usage}` : opts.message;

  const context: Record<string, unknown> = {};
  if (command) context.command = command;
  if (opts.context) Object.assign(context, opts.context);

  return new UsageError({
    message: fullMessage,
    context: Object.keys(context).length > 0 ? context : undefined,
  });
}

export function deprecatedFlagError(opts: {
  option: string;
  deprecated: string;
  spec?: CommandSpec<unknown>;
}): CliError {
  const command = opts.spec ? opts.spec.id.join(" ") : undefined;
  const usage =
    opts.spec && renderCommandHelpText(opts.spec, { compact: true, includeHeader: false });
  const fullMessage = `Deprecated option ${opts.option} is ${opts.deprecated}; remove it or use the documented replacement.${
    usage ? `\n\n${usage}` : ""
  }`;

  return new DeprecatedFlagError({
    message: fullMessage,
    context: {
      option: opts.option,
      deprecated: opts.deprecated,
      ...(command ? { command } : {}),
    },
  });
}
