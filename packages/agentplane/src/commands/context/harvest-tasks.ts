import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { fileExists } from "./context-utils.js";
import {
  buildOutput,
  renderText,
  selectTasks,
  writeOutputs,
  type ContextHarvestTasksParsed,
} from "./harvest-tasks-artifacts.js";

export { readHarvestReport, type ContextHarvestTasksParsed } from "./harvest-tasks-artifacts.js";

async function readAllTasks(ctx: CommandContext): Promise<TaskData[]> {
  return await ctx.taskBackend.listTasks();
}

async function assertContextWorkspaceReady(root: string): Promise<void> {
  const required = [
    ".agentplane/context/agentplane.context.yaml",
    ".agentplane/context/policies/context.rules.md",
    ".agentplane/context/policies/wiki.rules.md",
    ".agentplane/context/policies/redaction.rules.yaml",
  ];
  const missing: string[] = [];
  for (const rel of required) {
    if (!(await fileExists(path.join(root, rel)))) missing.push(rel);
  }
  if (missing.length > 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        "context harvest writes require an initialized context workspace. " +
        `Run agentplane context init first. Missing: ${missing.join(", ")}`,
    });
  }
}

export async function cmdContextHarvestTasks(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  parsed: ContextHarvestTasksParsed;
}): Promise<number> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const root = ctx.resolvedProject.gitRoot;
  const selected = selectTasks(await readAllTasks(ctx), opts.parsed);
  const output = buildOutput(opts.parsed, selected);
  const shouldWrite = opts.parsed.writeProposals || opts.parsed.promote;

  if (!opts.parsed.dryRun && shouldWrite) {
    await assertContextWorkspaceReady(root);
  }

  const changed =
    opts.parsed.dryRun || !shouldWrite ? [] : await writeOutputs(root, output, opts.parsed.promote);
  const payload = {
    ...output.report,
    selected_task_ids: selected.map((task) => task.id),
    changed_paths: changed,
  };

  if (opts.parsed.format === "json") {
    process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
  } else {
    process.stdout.write(`${renderText(output, changed)}\n`);
  }

  if (opts.parsed.promote && output.report.promotion_gate.state === "blocked") {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `context harvest promotion blocked: ${output.report.promotion_gate.blockers.join("; ")}`,
    });
  }
  return 0;
}
