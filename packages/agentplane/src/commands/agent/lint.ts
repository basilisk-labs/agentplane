import { lintAgentsDir, loadConfig, resolveProject } from "@agentplaneorg/core";
import path from "node:path";

import { mapCoreError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";

export async function cmdAgentLint(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    const agentsDir = path.join(resolved.gitRoot, loaded.config.paths.agents_dir);
    const result = await lintAgentsDir(agentsDir);
    if (result.errors.length > 0) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: result.errors.join("\n"),
      });
    }
    for (const w of result.warnings) {
      process.stderr.write(`warn: ${w}\n`);
    }
    process.stdout.write("OK\n");
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "agent lint", root: opts.rootOverride ?? null });
  }
}
