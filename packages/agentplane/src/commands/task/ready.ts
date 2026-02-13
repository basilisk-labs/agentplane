import { mapBackendError } from "../../cli/error-map.js";
import { successMessage, unknownEntityMessage, warnMessage } from "../../cli/output.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

import { resolveTaskDependencyState } from "./shared.js";

export async function cmdReady(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const task = await ctx.taskBackend.getTask(opts.taskId);
    const warnings: string[] = [];
    let dep: {
      dependsOn: string[];
      missing: string[];
      incomplete: string[];
    } | null = null;
    if (task) {
      dep = await resolveTaskDependencyState(task, ctx.taskBackend);
      const missing = dep.missing;
      const incomplete = dep.incomplete;
      if (missing.length > 0) {
        warnings.push(`${task.id}: missing deps: ${missing.join(", ")}`);
      }
      if (incomplete.length > 0) {
        warnings.push(`${task.id}: incomplete deps: ${incomplete.join(", ")}`);
      }
    } else {
      warnings.push(unknownEntityMessage("task id", opts.taskId));
    }

    for (const warning of warnings) {
      process.stdout.write(`${warnMessage(warning)}\n`);
    }

    if (task) {
      const status = String(task.status || "TODO").toUpperCase();
      const title = task.title?.trim() || "(untitled task)";
      const owner = task.owner?.trim() || "-";
      const dependsOn = dep?.dependsOn ?? [];
      process.stdout.write(`Task: ${task.id} [${status}] ${title}\n`);
      process.stdout.write(`Owner: ${owner}\n`);
      process.stdout.write(`Depends on: ${dependsOn.length > 0 ? dependsOn.join(", ") : "-"}\n`);
      const missing = dep?.missing ?? [];
      const incomplete = dep?.incomplete ?? [];
      if (missing.length > 0) {
        process.stdout.write(`${warnMessage(`missing deps: ${missing.join(", ")}`)}\n`);
      }
      if (incomplete.length > 0) {
        process.stdout.write(`${warnMessage(`incomplete deps: ${incomplete.join(", ")}`)}\n`);
      }
    }

    const ready = warnings.length === 0;
    process.stdout.write(`${ready ? successMessage("ready") : warnMessage("not ready")}` + "\n");
    return ready ? 0 : 2;
  } catch (err) {
    throw mapBackendError(err, { command: "ready", root: opts.rootOverride ?? null });
  }
}
