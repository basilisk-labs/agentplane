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
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { explainResolvedBlueprint, resolveBlueprint } from "../../blueprints/index.js";
import { blueprintResolveInputFromTask } from "../blueprint/task-input.js";
import { checkTaskBlueprintSnapshotDrift } from "../blueprint/snapshot-artifact.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { readDiffSummary } from "./diff.js";
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
  const planState = task.plan_approval?.state ?? "pending";
  const verificationState = task.verification?.state ?? "pending";
  const now = new Date().toISOString();
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
  const evidence = [
    ...taskEvidence,
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
  const recordWithoutDigest: AgentChangeRecord = {
    acr_version: ACR_VERSION,
    record_type: "agent_change_record",
    record_id: recordId,
    created_at: now,
    producer: {
      name: "agentplane",
      version: "0.4.2",
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
      toolchain: [{ name: "agentplane", version: "0.4.2" }],
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
    extensions: {
      "agentplane.blueprint": blueprint,
      ...buildAcrContextExtension(task),
    },
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function buildAcrContextExtension(
  task: Awaited<ReturnType<typeof loadTaskFromContext>>,
): Record<string, unknown> {
  if (task.task_kind !== "context") return {};
  const extensions = isRecord(task.extensions) ? task.extensions : {};
  const context = extensions["agentplane.context"];
  if (!isRecord(context)) return {};
  return {
    "agentplane.context": {
      ...structuredClone(context),
      task_id: task.id,
      task_kind: task.task_kind,
      mutation_scope: task.mutation_scope ?? null,
      blueprint_request: task.blueprint_request ?? null,
    },
  };
}

async function buildAcrBlueprintExtension(opts: {
  task: Awaited<ReturnType<typeof loadTaskFromContext>>;
  ctx: CommandContext;
}) {
  const input = blueprintResolveInputFromTask({ task: opts.task, config: opts.ctx.config });
  const resolved = resolveBlueprint({ input });
  const explained = explainResolvedBlueprint({ resolved, workflowMode: input.workflowMode });
  const snapshot = await buildAcrBlueprintSnapshotProjection({
    task: opts.task,
    ctx: opts.ctx,
  });
  return {
    blueprint_id: explained.blueprintId,
    blueprint_version: explained.blueprintVersion,
    workflow_mode: explained.workflowMode ?? null,
    route: explained.route.map((node) => node.kind),
    required_evidence: explained.requiredEvidence.map((item) => ({
      id: item.id,
      kind: item.kind,
      produced_by: item.producedBy,
      required: item.required,
    })),
    accepted_recipe_extensions: explained.acceptedRecipeExtensions.map((item) => ({
      recipe_id: item.recipeId,
      recipe_version: item.recipeVersion ?? null,
      extension_id: item.extensionId ?? null,
      kind: item.kind,
      node_kind: item.nodeKind,
      summary: item.summary ?? null,
    })),
    rejected_recipe_extensions: explained.rejectedRecipeExtensions.map((item) => ({
      recipe_id: item.recipeId,
      recipe_version: item.recipeVersion ?? null,
      extension_id: item.extensionId ?? null,
      kind: item.kind,
      node_kind: item.nodeKind ?? null,
      summary: item.summary ?? null,
      reason: item.reason,
    })),
    stop_reasons: explained.stopReasons.map((item) => ({
      id: item.id,
      severity: item.severity,
      reason: item.reason,
    })),
    snapshot,
  };
}

async function buildAcrBlueprintSnapshotProjection(opts: {
  task: Awaited<ReturnType<typeof loadTaskFromContext>>;
  ctx: CommandContext;
}): Promise<{
  state: "current" | "missing" | "invalid" | "stale" | "unavailable";
  path: string | null;
  digest: string | null;
  current_digest: string | null;
  route_changed: boolean | null;
  artifact_sha256: string | null;
  safe_command: string;
}> {
  const safeCommand = `agentplane blueprint snapshot ${opts.task.id}`;
  try {
    const snapshot = await checkTaskBlueprintSnapshotDrift({ ctx: opts.ctx, task: opts.task });
    const relativePath = path.relative(opts.ctx.resolvedProject.gitRoot, snapshot.path);
    const artifactSha256 =
      snapshot.state === "current" ? await hashFile(snapshot.path).catch(() => null) : null;
    return {
      state: snapshot.state,
      path: relativePath,
      digest: snapshot.previous.digest,
      current_digest: snapshot.current.digest,
      route_changed: snapshot.routeChanged,
      artifact_sha256: artifactSha256,
      safe_command: snapshot.safeCommand,
    };
  } catch {
    return {
      state: "unavailable",
      path: null,
      digest: null,
      current_digest: null,
      route_changed: null,
      artifact_sha256: null,
      safe_command: safeCommand,
    };
  }
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

function inferCheckType(
  command: string,
): AgentChangeRecord["verification"]["checks"][number]["type"] {
  if (command.includes("typecheck")) return "typecheck";
  if (command.includes("lint")) return "lint";
  if (command.includes("build")) return "build";
  if (command.includes("schema")) return "schema_validation";
  if (command.includes("test") || command.includes("vitest")) return "test";
  return "other";
}

async function hashFile(filePath: string): Promise<string> {
  const bytes = await readFile(filePath);
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function buildResidualRisks(opts: {
  taskHash: string | null;
  planState: string;
  verificationState: string;
  verificationChecks: AgentChangeRecord["verification"]["checks"];
  evidence: AgentChangeRecord["evidence"];
}): string[] {
  const risks: string[] = [];
  if (opts.planState !== "approved") risks.push("Plan is not approved.");
  if (opts.verificationState !== "ok") risks.push("Verification is not recorded as ok.");
  if (opts.verificationState === "ok" && opts.verificationChecks.length === 0) {
    risks.push("Passed verification has no checks.");
  }
  if (!opts.taskHash) risks.push("Task README evidence is missing.");
  if (!opts.evidence.some((item) => item.type === "plan")) risks.push("Plan evidence is missing.");
  if (!opts.evidence.some((item) => item.type === "verification_log")) {
    risks.push("Verification log evidence is missing.");
  }
  return risks;
}
