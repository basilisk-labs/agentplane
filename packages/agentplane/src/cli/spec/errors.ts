import { CliError } from "../../shared/errors.js";

import type { CommandSpec } from "./spec.js";
import { renderCommandHelpText } from "./help-render.js";

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

  return new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message: fullMessage,
    context: Object.keys(context).length > 0 ? context : undefined,
  });
}
