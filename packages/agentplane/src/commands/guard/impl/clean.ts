import { mapCoreError } from "../../../cli/error-map.js";
import { successMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";
import { loadCommandContext } from "../../shared/task-backend.js";

export async function cmdGuardClean(opts: {
  cwd: string;
  rootOverride?: string;
  quiet: boolean;
}): Promise<number> {
  try {
    const ctx = await loadCommandContext({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const staged = await ctx.git.statusStagedPaths();
    if (staged.length > 0) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: "Staged files exist",
      });
    }
    if (!opts.quiet) {
      process.stdout.write(`${successMessage("index clean", undefined, "no staged files")}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "guard clean", root: opts.rootOverride ?? null });
  }
}
