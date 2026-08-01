import path from "node:path";

import type { CommandCtx } from "../cli/spec/spec.js";
import { createCliEmitter, emitCommandResults } from "../cli/output.js";
import { loadBackendTask, type CommandContext } from "./shared/task-backend.js";
import { resolvePrFlowStatus } from "./pr/flow-status.js";
import {
  readIntegrationQueue,
  inspectIntegrationQueueMutex,
  type IntegrationQueueMutexInspection,
  withIntegrationQueueMutex,
  writeIntegrationQueue,
} from "./pr/integrate/queue-state.js";
import {
  applyIntegrationQueueDoctorRepairs,
  type IntegrationQueueDoctorRepair,
} from "./integrate-queue-doctor.js";
import { decideIntegrationQueueRecovery } from "./integrate-queue-recovery.js";
import type { IntegrateQueueDoctorParsed } from "./integrate-queue.spec.js";
import { renderIntegrationQueueDoctorResult } from "./integrate-queue-render.js";

const INTEGRATION_QUEUE_DOCTOR_RESULT_SCHEMA = "agentplane.integration_queue.doctor.v1" as const;

type IntegrationQueueDoctorFinding = {
  task_id: string;
  status: string;
  reason: string;
  repair: string | null;
  disposition: "applied" | "blocked_manual_recovery" | "would_apply" | "not_applied";
};

export type IntegrationQueueDoctorResult = {
  schema: typeof INTEGRATION_QUEUE_DOCTOR_RESULT_SCHEMA;
  operation: "integrate.queue.doctor";
  findings: IntegrationQueueDoctorFinding[];
  applied: boolean;
  mutex: IntegrationQueueMutexInspection & {
    lock_path: string;
    manual_recovery_required: boolean;
  };
  exit_code: number;
  audit: {
    authority: "provider_read";
    attempts: 1;
    effects_applied: number;
    requested_fix: boolean;
    dry_run: boolean;
  };
};

export async function inspectIntegrationQueueDoctor(opts: {
  commandCtx: CommandContext;
  ctx: CommandCtx;
  parsed: IntegrateQueueDoctorParsed;
}): Promise<IntegrationQueueDoctorResult> {
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
  const findings: IntegrationQueueDoctorFinding[] = [];
  const repairs: IntegrationQueueDoctorRepair[] = [];

  for (const entry of before.entries) {
    if (entry.status === "done" || entry.status === "superseded") continue;
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
    const finding: IntegrationQueueDoctorFinding = {
      task_id: entry.task_id,
      status: entry.status,
      reason: decision.reason,
      repair: `mark_${decision.status}`,
      disposition: applyRepairs
        ? "applied"
        : opts.parsed.fix && !opts.parsed.dryRun && manualRecoveryRequired
          ? "blocked_manual_recovery"
          : opts.parsed.fix && opts.parsed.dryRun
            ? "would_apply"
            : "not_applied",
    };
    findings.push(finding);
    repairs.push({
      task_id: finding.task_id,
      status: finding.status,
      reason: finding.reason,
      repair: finding.repair,
      expected_entry: entry,
    });
  }

  if (applyRepairs) {
    await withIntegrationQueueMutex(gitRoot, async () => {
      await writeIntegrationQueue(
        gitRoot,
        applyIntegrationQueueDoctorRepairs(await readIntegrationQueue(gitRoot), repairs),
      );
    });
  }

  const exitCode = opts.parsed.fix && !opts.parsed.dryRun && manualRecoveryRequired ? 5 : 0;
  return {
    schema: INTEGRATION_QUEUE_DOCTOR_RESULT_SCHEMA,
    operation: "integrate.queue.doctor",
    findings,
    applied: applyRepairs,
    mutex: {
      ...mutexInspection,
      lock_path: mutexLockPath,
      manual_recovery_required: manualRecoveryRequired,
    },
    exit_code: exitCode,
    audit: {
      authority: "provider_read",
      attempts: 1,
      effects_applied: applyRepairs ? repairs.length : 0,
      requested_fix: opts.parsed.fix,
      dry_run: opts.parsed.dryRun,
    },
  };
}

export async function runIntegrationQueueDoctor(opts: {
  commandCtx: CommandContext;
  ctx: CommandCtx;
  parsed: IntegrateQueueDoctorParsed;
}): Promise<number> {
  const result = await inspectIntegrationQueueDoctor(opts);
  emitCommandResults(
    createCliEmitter(),
    renderIntegrationQueueDoctorResult(result, opts.parsed.json),
  );
  return result.exit_code;
}
