import path from "node:path";

import type { CommandCtx } from "../cli/spec/spec.js";
import { createCliEmitter } from "../cli/output.js";
import { loadBackendTask, type CommandContext } from "./shared/task-backend.js";
import { resolvePrFlowStatus } from "./pr/flow-status.js";
import {
  readIntegrationQueue,
  inspectIntegrationQueueMutex,
  withIntegrationQueueMutex,
  writeIntegrationQueue,
} from "./pr/integrate/queue-state.js";
import {
  applyIntegrationQueueDoctorRepairs,
  type IntegrationQueueDoctorRepair,
} from "./integrate-queue-doctor.js";
import { decideIntegrationQueueRecovery } from "./integrate-queue-recovery.js";
import type { IntegrateQueueDoctorParsed } from "./integrate-queue.spec.js";

export async function runIntegrationQueueDoctor(opts: {
  commandCtx: CommandContext;
  ctx: CommandCtx;
  parsed: IntegrateQueueDoctorParsed;
}): Promise<number> {
  const gitRoot = opts.commandCtx.resolvedProject.gitRoot;
  const mutexLockPath = path.join(
    gitRoot,
    ".agentplane",
    "cache",
    "locks",
    "integration-queue.lock",
  );
  const mutexInspection = await inspectIntegrationQueueMutex(gitRoot);
  const manualRecoveryRequired = mutexInspection.state !== "absent";
  const applyRepairs = opts.parsed.fix && !opts.parsed.dryRun && !manualRecoveryRequired;
  const before = await readIntegrationQueue(gitRoot);
  const findings: { task_id: string; status: string; reason: string; repair: string | null }[] = [];
  const repairs: IntegrationQueueDoctorRepair[] = [];

  for (const entry of before.entries) {
    if (entry.status === "done") continue;
    const loaded = await loadBackendTask({
      ctx: opts.commandCtx,
      cwd: opts.ctx.cwd,
      rootOverride: opts.ctx.rootOverride ?? null,
      taskId: entry.task_id,
    }).catch(() => null);
    if (loaded?.task.status !== "DONE" && entry.status !== "handoff") {
      continue;
    }
    const report = await resolvePrFlowStatus({
      ctx: opts.commandCtx,
      cwd: opts.ctx.cwd,
      rootOverride: opts.ctx.rootOverride ?? undefined,
      taskId: entry.task_id,
    }).catch(() => null);
    if (!report) continue;
    const decision = decideIntegrationQueueRecovery({ entry, report });
    if (decision.action !== "mark") continue;
    const finding = {
      task_id: entry.task_id,
      status: entry.status,
      reason: decision.reason,
      repair: `mark_${decision.status}`,
    };
    findings.push(finding);
    repairs.push({ ...finding, expected_entry: entry });
  }

  if (applyRepairs) {
    await withIntegrationQueueMutex(gitRoot, async () => {
      await writeIntegrationQueue(
        gitRoot,
        applyIntegrationQueueDoctorRepairs(await readIntegrationQueue(gitRoot), repairs),
      );
    });
  }

  const output = createCliEmitter();
  if (opts.parsed.json) {
    output.json({
      findings,
      applied: applyRepairs,
      mutex: {
        ...mutexInspection,
        lock_path: mutexLockPath,
        manual_recovery_required: manualRecoveryRequired,
      },
    });
    return opts.parsed.fix && !opts.parsed.dryRun && manualRecoveryRequired ? 5 : 0;
  }
  if (manualRecoveryRequired) {
    const owner =
      "owner" in mutexInspection
        ? `${mutexInspection.owner.pid}@${mutexInspection.owner.host}`
        : "-";
    const reason = "reason" in mutexInspection ? ` reason=${mutexInspection.reason}` : "";
    output.line(
      `integration queue mutex: state=${mutexInspection.state} owner=${owner}${reason} path=${mutexLockPath} manual_recovery_required=yes`,
    );
  }
  if (findings.length === 0) {
    output.success("integration queue doctor", undefined, "no stale entries detected");
    return opts.parsed.fix && !opts.parsed.dryRun && manualRecoveryRequired ? 5 : 0;
  }
  output.lines(
    findings.map((finding) => {
      const suffix = applyRepairs
        ? "applied"
        : opts.parsed.fix && !opts.parsed.dryRun && manualRecoveryRequired
          ? "blocked_manual_recovery"
          : opts.parsed.fix && opts.parsed.dryRun
            ? "would_apply"
            : "not_applied";
      return `${finding.task_id} ${finding.status}: ${finding.reason} repair=${finding.repair ?? "none"} ${suffix}`;
    }),
  );
  return opts.parsed.fix && !opts.parsed.dryRun && manualRecoveryRequired ? 5 : 0;
}
