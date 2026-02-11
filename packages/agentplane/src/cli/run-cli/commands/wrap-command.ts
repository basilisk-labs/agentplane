import { mapCoreError } from "../../error-map.js";
import { CliError } from "../../../shared/errors.js";

export async function wrapCommand<T>(
  opts: {
    command: string;
    rootOverride?: string;
    context?: Record<string, unknown>;
  },
  fn: () => Promise<T> | T,
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof CliError) throw err;
    const context = opts.context ?? {};
    throw mapCoreError(err, {
      command: opts.command,
      root: opts.rootOverride ?? null,
      ...context,
    });
  }
}
