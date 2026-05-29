import {
  ACR_VERSION,
  computeAcrRecordDigest,
  validateAcr,
  type AgentChangeRecord,
} from "@agentplaneorg/core/schemas";
import {
  gitConfigGet,
  gitMergeBase,
  gitRevParse,
  resolveBaseBranch,
} from "@agentplaneorg/core/git";
import path from "node:path";

import { getVersion } from "../../meta/version.js";
import { readTaskEvidenceBundleTrustExtension } from "../evidence/evidence.command.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { readDiffSummary } from "./diff.js";
import {
  buildAcrBlueprintExtension,
  buildAcrContextExtension,
  buildResidualRisks,
  hashFile,
  inferCheckType,
} from "./generate-extensions.js";
import { defaultAcrPath } from "./validate.js";

type ModelProvider = "anthropic" | "openai" | "cursor" | "aider" | "unknown" | "custom";

export async function generateAcr(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  workCommit?: string;
  baseCommit?: string;
  agent?: string;
  agentName?: string;
  modelProvider?: ModelProvider;
  modelName?: string;
  out?: string;
  write?: boolean;
  refresh?: boolean;
}): Promise<{ record: AgentChangeRecord; acrPath: string | null; warnings: string[] }> {
  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const task = await loadTaskFromContext({ ctx: opts.ctx, taskId: opts.taskId });
  const taskReadmePath = path.join(
    gitRoot,
    opts.ctx.config.paths.workflow_dir,
    opts.taskId,
    "README.md",
  );
  const workCommit = await resolveCommit(gitRoot, opts.workCommit ?? task.commit?.hash ?? "HEAD");
  const baseCommit = await resolveBaseCommit({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    baseCommit: opts.baseCommit,
    workCommit,
  });
  const branch = await gitRevParse(gitRoot, ["--abbrev-ref", "HEAD"]).catch(() => "unknown");
  const remote = await gitConfigGet(gitRoot, "remote.origin.url");
  const diff = await readDiffSummary(gitRoot, baseCommit, workCommit);
  const taskHash = await hashFile(taskReadmePath).catch(() => null);
  const observationsPath = path.join(
    gitRoot,
    opts.ctx.config.paths.workflow_dir,
    opts.taskId,
    "observations.jsonl",
  );
  const observationsHash = await hashFile(observationsPath).catch(() => null);
  const planState = task.plan_approval?.state ?? "pending";
  const verificationState = task.verification?.state ?? "pending";
  const now = new Date().toISOString();
  const producerVersion = getVersion();
  const approvals =
    planState === "approved"
      ? [
          {
            approval_id: `approval_${opts.taskId.replaceAll(/[^A-Za-z0-9_-]/g, "_")}_plan`,
            type: "plan_approval" as const,
            decision: "approved" as const,
            approved_by: {
              type: "agentplane_role",
              id: task.plan_approval?.updated_by ?? "ORCHESTRATOR",
            },
            approved_at: task.plan_approval?.updated_at ?? now,
            scope: "task",
          },
        ]
      : [];
  const recordId = `acr_${opts.taskId.replaceAll(/[^A-Za-z0-9_-]/g, "_")}`;
  const taskPath = path.relative(gitRoot, taskReadmePath);
  const taskEvidence = taskHash
    ? [
        {
          type: "task" as const,
          path: taskPath,
          sha256: taskHash,
        },
        ...(planState === "approved"
          ? [
              {
                type: "plan" as const,
                path: taskPath,
                sha256: taskHash,
              },
            ]
          : []),
        ...(verificationState === "ok"
          ? [
              {
                type: "verification_log" as const,
                path: taskPath,
                sha256: taskHash,
              },
            ]
          : []),
      ]
    : [];
  const blueprint = await buildAcrBlueprintExtension({
    task,
    ctx: opts.ctx,
  });
  const trust = await readTaskEvidenceBundleTrustExtension({
    ctx: opts.ctx,
    taskId: task.id,
  });
  const evidence = [
    ...taskEvidence,
    ...(observationsHash
      ? [
          {
            type: "other" as const,
            path: path.relative(gitRoot, observationsPath),
            sha256: observationsHash,
          },
        ]
      : []),
    ...(blueprint.snapshot?.state === "current" &&
    blueprint.snapshot.path &&
    blueprint.snapshot.artifact_sha256
      ? [
          {
            type: "other" as const,
            path: blueprint.snapshot.path,
            sha256: blueprint.snapshot.artifact_sha256,
          },
        ]
      : []),
  ];
  const verificationChecks = (task.verify ?? []).map((command, index) => ({
    check_id: `verify-${index + 1}`,
    type: inferCheckType(command),
    command,
    status: verificationState === "ok" ? ("passed" as const) : ("unknown" as const),
  }));
  const residualRisks = buildResidualRisks({
    taskHash,
    planState,
    verificationState,
    verificationChecks,
    evidence,
  });
  const mergeReady = residualRisks.length === 0;
  const extensions = {
    "agentplane.blueprint": blueprint,
    ...buildAcrContextExtension(task),
  };
  if (trust) Object.assign(extensions, trust);
  const recordWithoutDigest: AgentChangeRecord = {
    acr_version: ACR_VERSION,
    record_type: "agent_change_record",
    record_id: recordId,
    created_at: now,
    producer: {
      name: "agentplane",
      version: producerVersion,
    },
    repository: {
      vcs: "git",
      ...(remote ? { remote } : {}),
      base_ref: await resolveBaseRef(opts.ctx, opts.cwd, opts.rootOverride).catch(() => "main"),
      base_commit: baseCommit,
      work_ref: branch,
      work_commit: workCommit,
    },
    task: {
      task_id: task.id,
      title: task.title,
      intent: task.description || task.title,
      requested_by: { type: "agentplane_role", id: "ORCHESTRATOR" },
    },
    agent: {
      id: opts.agent ?? task.owner,
      name: opts.agentName ?? opts.agent ?? task.owner ?? "unknown",
      agent_type: "coding_agent",
      model: {
        provider: opts.modelProvider ?? "unknown",
        name: opts.modelName ?? "unknown",
        version: "unknown",
      },
      toolchain: [{ name: "agentplane", version: producerVersion }],
    },
    plan: {
      status:
        planState === "approved"
          ? "approved"
          : planState === "rejected"
            ? "rejected"
            : "pending_approval",
      ...(taskHash
        ? {
            artifact: {
              path: taskPath,
              sha256: taskHash,
            },
          }
        : {}),
      ...(task.plan_approval?.updated_at ? { approved_at: task.plan_approval.updated_at } : {}),
      ...(task.plan_approval?.updated_by
        ? { approved_by: { type: "agentplane_role", id: task.plan_approval.updated_by } }
        : {}),
    },
    permissions: {
      network: {
        mode: opts.ctx.config.agents.approvals.require_network ? "approval_required" : "unknown",
      },
      secrets: { access: "none" },
      tools: [{ name: "shell", allowed: true }],
    },
    policy: {
      policy_version: "0.1.0",
      decisions: [
        {
          rule_id: "plan.required",
          decision: planState === "approved" ? "pass" : "warning",
          reason: planState === "approved" ? "Approved plan exists." : "Plan is not approved.",
        },
        {
          rule_id: "verification.required",
          decision: verificationState === "ok" ? "pass" : "warning",
          reason:
            verificationState === "ok"
              ? "Verification is recorded as ok."
              : "Verification is not ok.",
        },
      ],
    },
    changes: {
      summary: task.result_summary ?? task.description ?? task.title,
      diff_stats: diff.diff_stats,
      files: diff.files,
      risk: {
        level: task.risk_level === "high" ? "high" : task.risk_level === "low" ? "low" : "medium",
        categories: [...new Set(diff.files.flatMap((file) => file.risk_categories ?? []))],
        protected_paths_touched: diff.files.some(
          (file) => file.path.startsWith(".github/") || file.path.startsWith("secrets/"),
        ),
      },
    },
    verification: {
      status:
        verificationState === "ok"
          ? "passed"
          : verificationState === "needs_rework"
            ? "failed"
            : "not_run",
      checks: verificationChecks,
    },
    approvals,
    evidence,
    result: {
      status:
        task.status === "DONE"
          ? "finished"
          : verificationState === "ok"
            ? "verified"
            : "implemented",
      merge_ready: mergeReady,
      residual_risks: residualRisks,
      rollback: {
        available: true,
        notes: `Revert work_commit ${workCommit} if downstream validation fails.`,
      },
    },
    integrity: {
      digest_algorithm: "sha256",
      record_digest: null,
      canonicalization: "rfc8785-jcs",
      signatures: [],
    },
    extensions,
  };
  const record = {
    ...recordWithoutDigest,
    integrity: {
      ...recordWithoutDigest.integrity,
      record_digest: computeAcrRecordDigest(recordWithoutDigest),
    },
  };
  validateAcr(record);
  const acrPath = opts.out
    ? path.resolve(opts.cwd, opts.out)
    : opts.write
      ? defaultAcrPath(opts.ctx, opts.taskId)
      : null;
  return { record, acrPath, warnings: [] };
}

async function resolveBaseRef(
  ctx: CommandContext,
  cwd: string,
  rootOverride?: string,
): Promise<string> {
  return (
    (await resolveBaseBranch({
      cwd,
      rootOverride: rootOverride ?? null,
      mode: ctx.config.workflow_mode,
      cliBaseOpt: null,
    })) ?? "main"
  );
}

async function resolveBaseCommit(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  baseCommit?: string;
  workCommit: string;
}): Promise<string> {
  if (opts.baseCommit)
    return await resolveCommit(opts.ctx.resolvedProject.gitRoot, opts.baseCommit);
  const baseRef = await resolveBaseRef(opts.ctx, opts.cwd, opts.rootOverride);
  return await gitMergeBase(opts.ctx.resolvedProject.gitRoot, opts.workCommit, baseRef);
}

async function resolveCommit(gitRoot: string, rev: string): Promise<string> {
  return await gitRevParse(gitRoot, [rev]);
}
