import { lintTaskVerifyStepsSection, lintTasksSnapshot } from "@agentplaneorg/core/tasks";

import { mapCoreError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";
import { buildTasksExportSnapshotFromTasks } from "../../backends/task-backend/shared/export.js";
import { loadCommandContext, listTasksMemo } from "../shared/task-backend.js";

export async function cmdTaskLint(opts: {
  cwd: string;
  rootOverride?: string;
  verifySteps?: boolean;
}): Promise<number> {
  try {
    const ctx = await loadCommandContext({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const tasks = await listTasksMemo(ctx);
    const warnings = ctx.taskBackend.getLastListWarnings?.() ?? [];
    if (warnings.length > 0) {
      const preview = warnings.slice(0, 3).join("; ");
      const suffix = warnings.length > 3 ? `; +${warnings.length - 3} more` : "";
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `task lint failed: skipped ${warnings.length} task files during scan (${preview}${suffix})`,
      });
    }
    const snapshot = buildTasksExportSnapshotFromTasks(tasks);
    const result = lintTasksSnapshot(snapshot, ctx.config);
    if (opts.verifySteps === true) {
      const verifyStepErrors = tasks.flatMap((task) =>
        lintTaskVerifyStepsSection({
          taskId: task.id,
          text: task.sections?.["Verify Steps"],
        }),
      );
      result.errors.push(...verifyStepErrors);
    }
    if (result.errors.length > 0) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: result.errors.join("\n"),
      });
    }
    process.stdout.write("OK\n");
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "task lint", root: opts.rootOverride ?? null });
  }
}
