import type { CommandCtx } from "../cli/spec/spec.js";
import { createCliEmitter } from "../cli/output.js";
import { loadBackendTask, type CommandContext } from "./shared/task-backend.js";
import { resolvePrFlowStatus } from "./pr/flow-status.js";
import {
  markQueueEntry,
  readIntegrationQueue,
  withIntegrationQueueMutex,
  writeIntegrationQueue,
} from "./pr/integrate/queue-state.js";
import { applyIntegrationQueueDoctorRepairs } from "./integrate-queue-doctor.js";
import { decideIntegrationQueueRecovery } from "./integrate-queue-recovery.js";
import type { IntegrateQueueDoctorParsed } from "./integrate-queue.spec.js";

export async function runIntegrationQueueDoctor(opts: {
  commandCtx: CommandContext;
  ctx: CommandCtx;
  parsed: IntegrateQueueDoctorParsed;
}): Promise<number> {
  const gitRoot = opts.commandCtx.resolvedProject.gitRoot;
  const before = await readIntegrationQueue(gitRoot);
  const findings: { task_id: string; status: string; reason: string; repair: string | null }[] = [];
  let nextQueue = before;

  for (const entry of before.entries) {
    const loaded = await loadBackendTask({
      ctx: opts.commandCtx,
      cwd: opts.ctx.cwd,
      rootOverride: opts.ctx.rootOverride ?? null,
      taskId: entry.task_id,
    }).catch(() => null);
    if (loaded?.task.status === "DONE" && entry.status !== "done") {
      const reason = "task is already DONE; queue entry is terminal stale";
      findings.push({
        task_id: entry.task_id,
        status: entry.status,
        reason,
        repair: "mark_done",
      });
      nextQueue = markQueueEntry(nextQueue, entry.task_id, "done", reason);
      continue;
    }
    if (entry.status !== "handoff") continue;
    const report = await resolvePrFlowStatus({
      ctx: opts.commandCtx,
      cwd: opts.ctx.cwd,
      rootOverride: opts.ctx.rootOverride ?? undefined,
      taskId: entry.task_id,
    }).catch(() => null);
    if (!report) continue;
    const decision = decideIntegrationQueueRecovery({ entry, report });
    if (decision.action !== "mark") continue;
    findings.push({
      task_id: entry.task_id,
      status: entry.status,
      reason: decision.reason,
      repair: `mark_${decision.status}`,
    });
    nextQueue = markQueueEntry(nextQueue, entry.task_id, decision.status, decision.reason);
  }

  if (opts.parsed.fix && !opts.parsed.dryRun) {
    await withIntegrationQueueMutex(gitRoot, async () => {
      await writeIntegrationQueue(
        gitRoot,
        applyIntegrationQueueDoctorRepairs(await readIntegrationQueue(gitRoot), findings),
      );
    });
  }

  const output = createCliEmitter();
  if (opts.parsed.json) {
    output.json({ findings, applied: opts.parsed.fix && !opts.parsed.dryRun });
    return 0;
  }
  if (findings.length === 0) {
    output.success("integration queue doctor", undefined, "no stale entries detected");
    return 0;
  }
  output.lines(
    findings.map((finding) => {
      const suffix =
        opts.parsed.fix && !opts.parsed.dryRun
          ? "applied"
          : opts.parsed.fix && opts.parsed.dryRun
            ? "would_apply"
            : "not_applied";
      return `${finding.task_id} ${finding.status}: ${finding.reason} repair=${finding.repair ?? "none"} ${suffix}`;
    }),
  );
  return 0;
}
