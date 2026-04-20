import { mapCoreError } from "../../../cli/error-map.js";
import { CliError } from "../../../shared/errors.js";
import { loadCommandContext } from "../../shared/task-backend.js";
import { suggestAllowPrefixes } from "./allow.js";

export async function cmdGuardSuggestAllow(opts: {
  cwd: string;
  rootOverride?: string;
  format: "lines" | "args";
}): Promise<number> {
  try {
    const ctx = await loadCommandContext({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const staged = await ctx.git.statusStagedPaths();
    if (staged.length === 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "No staged files (git index empty)",
      });
    }
    const prefixes = suggestAllowPrefixes(staged);
    if (opts.format === "args") {
      const args = prefixes.map((p) => `--allow ${p}`).join(" ");
      process.stdout.write(`${args}\n`);
    } else {
      for (const prefix of prefixes) process.stdout.write(`${prefix}\n`);
    }
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "guard suggest-allow", root: opts.rootOverride ?? null });
  }
}
