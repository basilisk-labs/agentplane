import {
  ACR_VERSION,
  computeAcrRecordDigest,
  renderAcrSchemaJson,
  validateAcr,
  type AgentChangeRecord,
} from "@agentplaneorg/core/schemas";
import {
  gitConfigGet,
  gitDiffNameStatus,
  gitDiffNumstat,
  gitIsAncestor,
  gitMergeBase,
  gitRevParse,
  resolveBaseBranch,
} from "@agentplaneorg/core/git";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { explainResolvedBlueprint, resolveBlueprint } from "../../blueprints/index.js";
import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";
import { blueprintResolveInputFromTask } from "../blueprint/task-input.js";
import { checkTaskBlueprintSnapshotDrift } from "../blueprint/snapshot-artifact.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { withDiagnosticContext } from "../shared/diagnostics.js";

type AcrMode = "schema" | "local" | "ci";
type AcrCiSemanticOptions = Pick<
  AcrCheckParsed,
  | "requirePlanApproved"
  | "requireVerification"
  | "requirePolicyPass"
  | "allowWaivedVerification"
  | "allowManualOverride"
>;

export type AcrGenerateParsed = {
  taskId: string;
  workCommit?: string;
  baseCommit?: string;
  agent?: string;
  agentName?: string;
  modelProvider?: "anthropic" | "openai" | "cursor" | "aider" | "unknown" | "custom";
  modelName?: string;
  out?: string;
  write: boolean;
  stdout: boolean;
  refresh: boolean;
  json: boolean;
};

export type AcrValidateParsed = {
  target: string;
  mode: AcrMode;
  strict: boolean;
  json: boolean;
};

export type AcrCheckParsed = {
  taskId: string;
  mode: AcrMode;
  requirePlanApproved: boolean;
  requireVerification: boolean;
  requirePolicyPass: boolean;
  allowWaivedVerification: boolean;
  allowManualOverride: boolean;
  json: boolean;
};

export type AcrExplainParsed = {
  target: string;
  json: boolean;
};

export type AcrSchemaParsed = {
  version: "0.1";
  out?: string;
};

export const acrSpec: CommandSpec<GroupCommandParsed> = {
  id: ["acr"],
  group: "ACR",
  summary: "Generate, validate, check, explain, and print Agent Change Record artifacts.",
  description:
    "This is a command group. Use a subcommand such as `agentplane acr generate ...`, `agentplane acr validate ...`, or `agentplane acr schema`.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    {
      cmd: "agentplane acr generate 202605031625-886KZ6 --work-commit HEAD --write",
      why: "Generate a task-local ACR.",
    },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export const acrSchemaSpec: CommandSpec<AcrSchemaParsed> = {
  id: ["acr", "schema"],
  group: "ACR",
  summary: "Print or write the ACR v0.1 JSON Schema.",
  options: [
    {
      kind: "string",
      name: "version",
      valueHint: "<version>",
      choices: ["0.1"],
      default: "0.1",
      description: "ACR schema version.",
    },
    {
      kind: "string",
      name: "out",
      valueHint: "<path>",
      description: "Write schema to a file instead of stdout.",
    },
  ],
  examples: [
    { cmd: "agentplane acr schema --version 0.1", why: "Print the bundled schema." },
    {
      cmd: "agentplane acr schema --version 0.1 --out schemas/acr-v0.1.schema.json",
      why: "Write the bundled schema to a custom path.",
    },
  ],
  parse: (raw) => ({
    version: (raw.opts.version ?? "0.1") as "0.1",
    out: typeof raw.opts.out === "string" ? raw.opts.out : undefined,
  }),
};

export const acrGenerateSpec: CommandSpec<AcrGenerateParsed> = {
  id: ["acr", "generate"],
  group: "ACR",
  summary: "Generate an Agent Change Record from task, Git, policy, and verification state.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "work-commit",
      valueHint: "<rev>",
      description: "Implementation revision.",
    },
    {
      kind: "string",
      name: "base-commit",
      valueHint: "<rev>",
      description: "Base revision override.",
    },
    {
      kind: "string",
      name: "agent",
      valueHint: "<id>",
      description: "AgentPlane role or agent id.",
    },
    {
      kind: "string",
      name: "agent-name",
      valueHint: "<name>",
      description: "Human-readable agent name.",
    },
    {
      kind: "string",
      name: "model-provider",
      valueHint: "<provider>",
      choices: ["anthropic", "openai", "cursor", "aider", "unknown", "custom"],
      description: "Model provider.",
    },
    { kind: "string", name: "model-name", valueHint: "<name>", description: "Model name." },
    { kind: "string", name: "out", valueHint: "<path>", description: "Write ACR to custom path." },
    { kind: "boolean", name: "write", default: false, description: "Write task-local ACR." },
    { kind: "boolean", name: "stdout", default: false, description: "Print ACR JSON to stdout." },
    { kind: "boolean", name: "refresh", default: false, description: "Overwrite existing ACR." },
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
  ],
  examples: [
    {
      cmd: "agentplane acr generate 202605031625-886KZ6 --work-commit HEAD --write",
      why: "Write `.agentplane/tasks/<task-id>/acr.json`.",
    },
  ],
  validateRaw: (raw) => {
    if (raw.opts.write === true && typeof raw.opts.out === "string") {
      throw usageError({
        spec: acrGenerateSpec,
        command: "acr generate",
        message: "--write and --out are mutually exclusive.",
      });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    workCommit: typeof raw.opts["work-commit"] === "string" ? raw.opts["work-commit"] : undefined,
    baseCommit: typeof raw.opts["base-commit"] === "string" ? raw.opts["base-commit"] : undefined,
    agent: typeof raw.opts.agent === "string" ? raw.opts.agent : undefined,
    agentName: typeof raw.opts["agent-name"] === "string" ? raw.opts["agent-name"] : undefined,
    modelProvider: raw.opts["model-provider"] as AcrGenerateParsed["modelProvider"],
    modelName: typeof raw.opts["model-name"] === "string" ? raw.opts["model-name"] : undefined,
    out: typeof raw.opts.out === "string" ? raw.opts.out : undefined,
    write: raw.opts.write === true,
    stdout: raw.opts.stdout === true,
    refresh: raw.opts.refresh === true,
    json: raw.opts.json === true,
  }),
};

export const acrValidateSpec: CommandSpec<AcrValidateParsed> = {
  id: ["acr", "validate"],
  group: "ACR",
  summary: "Validate an ACR file by schema, local, or CI invariants.",
  args: [{ name: "task-id-or-path", required: true, valueHint: "<task-id-or-path>" }],
  options: [
    {
      kind: "string",
      name: "mode",
      valueHint: "<schema|local|ci>",
      choices: ["schema", "local", "ci"],
      default: "local",
      description: "Validation mode.",
    },
    { kind: "boolean", name: "strict", default: false, description: "Treat warnings as failures." },
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
  ],
  examples: [
    { cmd: "agentplane acr validate 202605031625-886KZ6 --mode local", why: "Validate task ACR." },
  ],
  parse: (raw) => ({
    target: String(raw.args["task-id-or-path"]),
    mode: (raw.opts.mode ?? "local") as AcrMode,
    strict: raw.opts.strict === true,
    json: raw.opts.json === true,
  }),
};

export const acrCheckSpec: CommandSpec<AcrCheckParsed> = {
  id: ["acr", "check"],
  group: "ACR",
  summary: "Run the ACR merge-gate check for CI and branch review.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "mode",
      valueHint: "<ci>",
      choices: ["ci"],
      default: "ci",
      description: "Check mode.",
    },
    {
      kind: "boolean",
      name: "require-plan-approved",
      default: true,
      description: "Require approved plan.",
    },
    {
      kind: "boolean",
      name: "require-verification",
      default: true,
      description: "Require passed verification.",
    },
    {
      kind: "boolean",
      name: "require-policy-pass",
      default: true,
      description: "Reject failed policy decisions.",
    },
    {
      kind: "boolean",
      name: "allow-waived-verification",
      default: false,
      description: "Allow waived verification with approval.",
    },
    {
      kind: "boolean",
      name: "allow-manual-override",
      default: false,
      description: "Allow policy manual_override with approval.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
  ],
  examples: [{ cmd: "agentplane acr check 202605031625-886KZ6 --mode ci", why: "Run merge gate." }],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    mode: (raw.opts.mode ?? "ci") as AcrMode,
    requirePlanApproved: raw.opts["require-plan-approved"] !== false,
    requireVerification: raw.opts["require-verification"] !== false,
    requirePolicyPass: raw.opts["require-policy-pass"] !== false,
    allowWaivedVerification: raw.opts["allow-waived-verification"] === true,
    allowManualOverride: raw.opts["allow-manual-override"] === true,
    json: raw.opts.json === true,
  }),
};

export const acrExplainSpec: CommandSpec<AcrExplainParsed> = {
  id: ["acr", "explain"],
  group: "ACR",
  summary: "Explain an ACR for human review.",
  args: [{ name: "task-id-or-path", required: true, valueHint: "<task-id-or-path>" }],
  options: [
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit machine-readable summary.",
    },
  ],
  examples: [
    { cmd: "agentplane acr explain 202605031625-886KZ6", why: "Summarize ACR readiness." },
  ],
  parse: (raw) => ({
    target: String(raw.args["task-id-or-path"]),
    json: raw.opts.json === true,
  }),
};

async function runAcrRootGroup(_ctx: CommandCtx, p: GroupCommandParsed): Promise<number> {
  throwGroupCommandUsage({
    spec: acrSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["acr"]),
    command: "acr",
    contextCommand: "acr",
  });
}

export function makeRunAcrHandler(_getCtx: (cmd: string) => Promise<CommandContext>) {
  return runAcrRootGroup;
}

export function makeRunAcrSchemaHandler() {
  return runAcrSchemaHandler;
}

async function runAcrSchemaHandler(ctx: CommandCtx, p: AcrSchemaParsed): Promise<number> {
  const text = renderAcrSchemaJson();
  if (p.out) {
    const outPath = path.resolve(ctx.cwd, p.out);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeTextIfChanged(outPath, text);
    process.stdout.write(`${outPath}\n`);
    return 0;
  }
  process.stdout.write(text);
  return 0;
}

export function makeRunAcrGenerateHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (cmdCtx: CommandCtx, p: AcrGenerateParsed): Promise<number> => {
    const ctx = await getCtx("acr generate");
    const { record, acrPath, warnings } = await generateAcr({
      ctx,
      cwd: cmdCtx.cwd,
      rootOverride: cmdCtx.rootOverride,
      taskId: p.taskId,
      workCommit: p.workCommit,
      baseCommit: p.baseCommit,
      agent: p.agent,
      agentName: p.agentName,
      modelProvider: p.modelProvider,
      modelName: p.modelName,
      out: p.out,
      write: p.write,
      refresh: p.refresh,
    });

    const shouldWrite = p.write || p.out;
    if (shouldWrite && acrPath) {
      await writeAcrFile({ acrPath, record, refresh: p.refresh });
    }

    if (p.json) {
      process.stdout.write(
        `${JSON.stringify(
          {
            ok: true,
            command: "acr generate",
            task_id: p.taskId,
            acr_path: acrPath ? path.relative(ctx.resolvedProject.gitRoot, acrPath) : null,
            record_id: record.record_id,
            record_digest: record.integrity.record_digest,
            warnings,
          },
          null,
          2,
        )}\n`,
      );
      return 0;
    }

    if (!shouldWrite || p.stdout) {
      process.stdout.write(`${JSON.stringify(record, null, 2)}\n`);
    } else if (acrPath) {
      process.stdout.write(`${path.relative(ctx.resolvedProject.gitRoot, acrPath)}\n`);
    }
    return 0;
  };
}

export function makeRunAcrValidateHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (_cmdCtx: CommandCtx, p: AcrValidateParsed): Promise<number> => {
    const ctx = await getCtx("acr validate");
    const result = await validateAcrTarget({
      ctx,
      target: p.target,
      mode: p.mode,
      strict: p.strict,
      allowManualOverride: false,
      allowWaivedVerification: false,
      requirePlanApproved: p.mode === "ci",
      requireVerification: p.mode === "ci",
      requirePolicyPass: p.mode === "ci",
    });
    emitValidationResult(result, p.json, "acr validate");
    return 0;
  };
}

export function makeRunAcrCheckHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (_cmdCtx: CommandCtx, p: AcrCheckParsed): Promise<number> => {
    const ctx = await getCtx("acr check");
    const result = await validateAcrTarget({
      ctx,
      target: p.taskId,
      mode: "ci",
      strict: true,
      allowManualOverride: p.allowManualOverride,
      allowWaivedVerification: p.allowWaivedVerification,
      requirePlanApproved: p.requirePlanApproved,
      requireVerification: p.requireVerification,
      requirePolicyPass: p.requirePolicyPass,
    });
    emitValidationResult(result, p.json, "acr check");
    return 0;
  };
}

export function makeRunAcrExplainHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (_cmdCtx: CommandCtx, p: AcrExplainParsed): Promise<number> => {
    const ctx = await getCtx("acr explain");
    const resolved = await readAcrTarget(ctx, p.target);
    const summary = summarizeAcr(resolved.record);
    if (p.json) {
      process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
      return 0;
    }
    process.stdout.write(renderAcrSummary(summary));
    return 0;
  };
}

export async function generateAcr(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  workCommit?: string;
  baseCommit?: string;
  agent?: string;
  agentName?: string;
  modelProvider?: "anthropic" | "openai" | "cursor" | "aider" | "unknown" | "custom";
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

export async function writeAcrFile(opts: {
  acrPath: string;
  record: AgentChangeRecord;
  refresh: boolean;
}): Promise<void> {
  if (!opts.refresh) {
    try {
      await readFile(opts.acrPath, "utf8");
      throw acrValidationError("ACR_E_EXISTS", `ACR already exists: ${opts.acrPath}`);
    } catch (err) {
      if (err instanceof CliError) throw err;
    }
  }
  await mkdir(path.dirname(opts.acrPath), { recursive: true });
  await writeFile(opts.acrPath, `${JSON.stringify(opts.record, null, 2)}\n`, "utf8");
}

export async function validateAcrTarget(opts: {
  ctx: CommandContext;
  target: string;
  mode: AcrMode;
  strict: boolean;
  requirePlanApproved: boolean;
  requireVerification: boolean;
  requirePolicyPass: boolean;
  allowWaivedVerification: boolean;
  allowManualOverride: boolean;
}): Promise<{
  ok: true;
  task_id: string;
  acr_path: string;
  record_id: string;
  warnings: string[];
}> {
  const resolved = await readAcrTarget(opts.ctx, opts.target);
  const warnings: string[] = [];
  validateAcr(resolved.record);
  if (opts.mode !== "schema") {
    const task = await loadTaskFromContext({ ctx: opts.ctx, taskId: resolved.record.task.task_id });
    if (task.id !== resolved.record.task.task_id) {
      throw acrValidationError("ACR_E_TASK_NOT_FOUND", "ACR task id does not resolve locally.");
    }
    await assertGitCommit(opts.ctx.resolvedProject.gitRoot, resolved.record.repository.base_commit);
    await assertGitCommit(opts.ctx.resolvedProject.gitRoot, resolved.record.repository.work_commit);
    const ancestor = await gitIsAncestor(
      opts.ctx.resolvedProject.gitRoot,
      resolved.record.repository.base_commit,
      resolved.record.repository.work_commit,
    );
    if (!ancestor) {
      throw acrValidationError(
        "ACR_E_GIT_RANGE_INVALID",
        "work_commit is not a descendant of base_commit.",
      );
    }
    for (const evidence of resolved.record.evidence) {
      const fullPath = path.join(opts.ctx.resolvedProject.gitRoot, evidence.path);
      const digest = await hashFile(fullPath).catch(() => null);
      if (!digest)
        throw acrValidationError("ACR_E_EVIDENCE_NOT_FOUND", `Missing evidence: ${evidence.path}`);
      if (digest !== evidence.sha256) {
        throw acrValidationError(
          "ACR_E_EVIDENCE_HASH_MISMATCH",
          `Evidence hash mismatch: ${evidence.path}`,
        );
      }
    }
    if (resolved.record.integrity.record_digest === null) {
      warnings.push("ACR record digest is not finalized.");
    } else if (
      computeAcrRecordDigest(resolved.record) !== resolved.record.integrity.record_digest
    ) {
      throw acrValidationError(
        "ACR_E_DIGEST_MISMATCH",
        "ACR record digest does not match record content.",
      );
    }
  }
  if (opts.mode === "ci") {
    assertAcrCiSemantics(resolved.record, opts);
  }
  if (opts.strict && warnings.length > 0) {
    throw acrValidationError("ACR_E_STRICT_WARNING", warnings.join("; "));
  }
  return {
    ok: true,
    task_id: resolved.record.task.task_id,
    acr_path: resolved.acrPath,
    record_id: resolved.record.record_id,
    warnings,
  };
}

export function assertAcrCiSemantics(record: AgentChangeRecord, opts: AcrCiSemanticOptions): void {
  if (!record.result.merge_ready) {
    throw acrValidationError("ACR_E_NOT_MERGE_READY", "ACR result.merge_ready is not true.");
  }
  if (record.integrity.record_digest === null) {
    throw acrValidationError("ACR_E_DIGEST_REQUIRED", "Merge-ready ACR requires record_digest.");
  }
  if (record.evidence.length === 0) {
    throw acrValidationError("ACR_E_EVIDENCE_REQUIRED", "Merge-ready ACR requires evidence.");
  }
  if (opts.requirePlanApproved && record.plan.status !== "approved") {
    if (record.plan.status === "waived") {
      assertApproval(record, "plan_waiver", "ACR_E_PLAN_WAIVER_REQUIRED");
    } else {
      throw acrValidationError("ACR_E_PLAN_NOT_APPROVED", "ACR plan status is not approved.");
    }
  }
  if (record.plan.status === "approved") {
    assertApproval(record, "plan_approval", "ACR_E_PLAN_APPROVAL_REQUIRED");
    assertEvidence(record, "plan", "ACR_E_PLAN_EVIDENCE_REQUIRED");
  }
  if (
    opts.requireVerification &&
    record.verification.status !== "passed" &&
    !(opts.allowWaivedVerification && record.verification.status === "waived")
  ) {
    throw acrValidationError(
      "ACR_E_VERIFICATION_REQUIRED",
      "ACR verification status is not passed.",
    );
  }
  if (record.verification.status === "passed") {
    if (record.verification.checks.length === 0) {
      throw acrValidationError(
        "ACR_E_VERIFICATION_CHECK_REQUIRED",
        "Passed verification requires at least one check.",
      );
    }
    assertEvidence(record, "verification_log", "ACR_E_VERIFICATION_EVIDENCE_REQUIRED");
  }
  if (record.verification.status === "waived") {
    assertApproval(record, "verification_waiver", "ACR_E_VERIFICATION_WAIVER_REQUIRED");
  }
  if (opts.requirePolicyPass) {
    const failed = record.policy.decisions.find((item) => item.decision === "fail");
    if (failed) throw acrValidationError("ACR_E_POLICY_FAILED", `Policy failed: ${failed.rule_id}`);
    const manual = record.policy.decisions.find((item) => item.decision === "manual_override");
    if (manual) {
      assertApproval(record, "policy_override", "ACR_E_POLICY_OVERRIDE_REQUIRED");
    }
    if (manual && !opts.allowManualOverride) {
      throw acrValidationError(
        "ACR_E_MANUAL_OVERRIDE_NOT_ALLOWED",
        `Manual override not allowed: ${manual.rule_id}`,
      );
    }
  }
}

async function readAcrTarget(
  ctx: CommandContext,
  target: string,
): Promise<{ record: AgentChangeRecord; acrPath: string }> {
  const acrPath =
    target.includes("/") || target.endsWith(".json")
      ? path.resolve(ctx.resolvedProject.gitRoot, target)
      : defaultAcrPath(ctx, target);
  const text = await readFile(acrPath, "utf8").catch(() => {
    throw acrValidationError(
      "ACR_E_NOT_FOUND",
      `ACR not found: ${path.relative(ctx.resolvedProject.gitRoot, acrPath)}`,
    );
  });
  try {
    return { record: validateAcr(JSON.parse(text) as unknown), acrPath };
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw acrValidationError("ACR_E_INVALID_JSON", `Invalid ACR JSON: ${err.message}`);
    }
    throw acrValidationError("ACR_E_SCHEMA", err instanceof Error ? err.message : String(err));
  }
}

function emitValidationResult(
  result: { ok: true; task_id: string; acr_path: string; record_id: string; warnings: string[] },
  json: boolean,
  command: string,
): void {
  if (json) {
    process.stdout.write(`${JSON.stringify({ command, ...result }, null, 2)}\n`);
    return;
  }
  process.stdout.write(`✅ ${command} ${path.basename(result.acr_path)}\n`);
}

function summarizeAcr(record: AgentChangeRecord) {
  const blueprint = record.extensions?.["agentplane.blueprint"] as
    | { blueprint_id?: unknown; route?: unknown }
    | undefined;
  return {
    task_id: record.task.task_id,
    title: record.task.title,
    agent: `${record.agent.name}${record.agent.model ? ` / ${record.agent.model.provider} / ${record.agent.model.name}` : ""}`,
    plan: record.plan.status,
    work_range: `${record.repository.base_commit}..${record.repository.work_commit}`,
    policy: {
      pass: record.policy.decisions.filter((item) => item.decision === "pass").length,
      fail: record.policy.decisions.filter((item) => item.decision === "fail").length,
      warning: record.policy.decisions.filter((item) => item.decision === "warning").length,
      manual_override: record.policy.decisions.filter((item) => item.decision === "manual_override")
        .length,
    },
    verification: record.verification.status,
    merge_ready: record.result.merge_ready,
    blueprint:
      typeof blueprint?.blueprint_id === "string"
        ? {
            id: blueprint.blueprint_id,
            route: Array.isArray(blueprint.route)
              ? blueprint.route.filter((item): item is string => typeof item === "string")
              : [],
          }
        : null,
    record_digest: record.integrity.record_digest,
  };
}

function renderAcrSummary(summary: ReturnType<typeof summarizeAcr>): string {
  return [
    "Agent Change Record",
    `Task: ${summary.task_id}`,
    `Title: ${summary.title}`,
    `Agent: ${summary.agent}`,
    `Plan: ${summary.plan}`,
    `Work range: ${summary.work_range}`,
    `Policy: ${summary.policy.pass} pass, ${summary.policy.fail} fail, ${summary.policy.warning} warning, ${summary.policy.manual_override} manual override`,
    `Verification: ${summary.verification}`,
    `Merge ready: ${summary.merge_ready ? "yes" : "no"}`,
    ...(summary.blueprint
      ? [
          `Blueprint: ${summary.blueprint.id}`,
          `Blueprint route: ${summary.blueprint.route.join(" -> ")}`,
        ]
      : []),
    `Digest: ${summary.record_digest}`,
    "",
  ].join("\n");
}

function defaultAcrPath(ctx: CommandContext, taskId: string): string {
  return path.join(ctx.resolvedProject.gitRoot, ctx.config.paths.workflow_dir, taskId, "acr.json");
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

async function assertGitCommit(gitRoot: string, rev: string): Promise<void> {
  await gitRevParse(gitRoot, ["--verify", `${rev}^{commit}`]).catch(() => {
    throw acrValidationError("ACR_E_GIT_COMMIT_MISSING", `Git commit missing: ${rev}`);
  });
}

async function readDiffSummary(gitRoot: string, baseCommit: string, workCommit: string) {
  const [numstat, names] = await Promise.all([
    gitDiffNumstat(gitRoot, baseCommit, workCommit, { range: "two-dot" }).catch(() => []),
    gitDiffNameStatus(gitRoot, baseCommit, workCommit, { range: "two-dot" }).catch(() => []),
  ]);
  const files = names.map(({ statusCode, path: filePath }) => ({
    path: filePath,
    status: mapGitStatus(statusCode),
    risk_categories: inferRiskCategories(filePath),
  }));
  const insertions = numstat.reduce((sum, entry) => sum + entry.insertions, 0);
  const deletions = numstat.reduce((sum, entry) => sum + entry.deletions, 0);
  return {
    diff_stats: {
      files_changed: files.length,
      insertions,
      deletions,
    },
    files,
  };
}

function mapGitStatus(status: string): AgentChangeRecord["changes"]["files"][number]["status"] {
  const code = status[0];
  if (code === "A") return "added";
  if (code === "M") return "modified";
  if (code === "D") return "deleted";
  if (code === "R") return "renamed";
  if (code === "C") return "copied";
  if (code === "T") return "type_changed";
  return "unknown";
}

function inferRiskCategories(
  filePath: string,
): NonNullable<AgentChangeRecord["changes"]["files"][number]["risk_categories"]> {
  const categories = new Set<
    NonNullable<AgentChangeRecord["changes"]["files"][number]["risk_categories"]>[number]
  >();
  if (filePath.includes("schema")) categories.add("schema");
  if (filePath.startsWith("docs/")) categories.add("docs");
  if (filePath.includes("/test") || filePath.endsWith(".test.ts")) categories.add("tests");
  if (filePath.startsWith(".github/")) categories.add("ci");
  if (filePath.startsWith("packages/agentplane/src/commands/")) categories.add("cli");
  if (categories.size === 0) categories.add("tooling");
  return [...categories];
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

function assertApproval(
  record: AgentChangeRecord,
  type: AgentChangeRecord["approvals"][number]["type"],
  code: string,
): void {
  if (
    !record.approvals.some((approval) => approval.type === type && approval.decision !== "rejected")
  ) {
    throw acrValidationError(code, `Missing approval: ${type}.`);
  }
}

function assertEvidence(
  record: AgentChangeRecord,
  type: AgentChangeRecord["evidence"][number]["type"],
  code: string,
): void {
  if (!record.evidence.some((evidence) => evidence.type === type)) {
    throw acrValidationError(code, `Missing evidence: ${type}.`);
  }
}

function acrValidationError(code: string, message: string): CliError {
  return new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message: `${code}: ${message}`,
    context: withDiagnosticContext(
      { reason_code: code },
      {
        state: "ACR validation failed.",
        likelyCause: message,
        hint: "ACR is a derived evidence record; regenerate it from task, policy, verification, and Git state instead of hand-editing it.",
        nextAction: {
          command: "agentplane acr explain <task-id>",
          reason: "inspect the current ACR readiness summary before retrying the gate",
          reasonCode: code,
        },
        remediation: acrRemediationForCode(code, message),
      },
    ),
  });
}

function acrRemediationForCode(
  code: string,
  message: string,
): NonNullable<Parameters<typeof withDiagnosticContext>[1]["remediation"]> {
  if (code.includes("PLAN")) {
    return {
      code,
      why: "The ACR cannot prove that the implementation followed an approved plan.",
      fix: "Approve the task plan through AgentPlane, then regenerate or refresh the task-local ACR.",
      safeCommand: "agentplane task plan approve <task-id> --by ORCHESTRATOR",
      stopCondition:
        "Stop if the plan is missing, stale, or no longer matches the implementation scope.",
    };
  }
  if (code.includes("VERIFICATION")) {
    return {
      code,
      why: "The ACR cannot prove that required checks ran and passed.",
      fix: "Run the task Verify Steps, record verification through AgentPlane, then regenerate the ACR.",
      safeCommand: "agentplane task verify-show <task-id>",
      stopCondition:
        "Stop if a required check must be skipped without explicit approval and recorded risk.",
    };
  }
  if (code.includes("EVIDENCE") || code.includes("DIGEST")) {
    return {
      code,
      why: "The ACR evidence does not match the current repository artifact state.",
      fix: "Regenerate the ACR from current task evidence and verify the digest again.",
      safeCommand: "agentplane acr generate <task-id> --work-commit HEAD --write --refresh",
      stopCondition:
        "Stop if the evidence mismatch points to uncommitted or unintended task artifact changes.",
    };
  }
  if (code.includes("GIT")) {
    return {
      code,
      why: "The ACR Git range cannot be validated locally.",
      fix: "Confirm the base and work commits exist and that work_commit descends from base_commit.",
      safeCommand: "git merge-base --is-ancestor <base_commit> <work_commit>",
      stopCondition:
        "Stop if the recorded commits are from another branch, checkout, or repository.",
    };
  }
  if (code.includes("POLICY")) {
    return {
      code,
      why: "The ACR records a policy decision that is not merge-ready.",
      fix: "Resolve the failed policy decision or record an approved policy override when allowed.",
      safeCommand: "agentplane acr explain <task-id>",
      stopCondition: "Stop if resolving the policy failure requires changing repository policy.",
    };
  }
  return {
    code,
    why: message,
    fix: "Inspect the ACR target, regenerate it from canonical task evidence, and rerun validation.",
    safeCommand: "agentplane acr validate <task-id> --mode local",
    stopCondition: "Stop if the target ACR was hand-edited or cannot be traced to a task README.",
  };
}
