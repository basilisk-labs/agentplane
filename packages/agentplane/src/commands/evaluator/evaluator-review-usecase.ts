import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

import type { TaskData } from "../../backends/task-backend.js";
import {
  validateEvaluatorSgrResult,
  type EvaluatorSgrResult,
} from "../../evaluators/sgr-result.js";
import { CliError } from "../../shared/errors.js";
import {
  checkTaskBlueprintSnapshotDrift,
  buildTaskBlueprintResolvedSnapshot,
} from "../blueprint/snapshot-artifact.js";
import { normalizeBranchPrBatchIncludedTaskIds } from "../pr/internal/sync-batch-ownership.js";
import { resolveQualityReviewTargetSha } from "../shared/quality-review-target.js";
import type { CommandContext } from "../shared/task-backend.js";

import type { EvaluatorModule } from "../../evaluators/catalog.js";
import {
  renderActualDiff,
  resolveEvaluatorDiffBase,
  resolveEvaluatorDiffBaseRef,
} from "./evaluator-diff-evidence.js";
import { verificationRecordPaths } from "./evaluator-verification-records.js";
import {
  EVALUATOR_OPINION_FILE,
  EVALUATOR_PROMPT_FILE,
  QUALITY_REPORT_FILE,
  relativeArtifactPath,
  renderEvaluatorPrompt,
  safePathSegment,
  timestampPathSegment,
} from "./evaluator-quality-artifacts.js";
import type { EvaluatorRunProvenance, EvaluatorRunVerdict } from "./evaluator.spec.js";

export { renderActualDiff, resolveEvaluatorDiffBase } from "./evaluator-diff-evidence.js";

const EVALUATOR_WORK_ORDER_FILE = "evaluator-work-order.json";
const EVALUATOR_RESULT_FILE = "evaluator-result.json";
const EVALUATOR_DIFF_FILE = "evaluator-diff.patch";
const EVALUATOR_OBSERVED_CHECKS_FILE = "evaluator-observed-checks.json";
const EVALUATOR_BLUEPRINT_FILE = "evaluator-blueprint.json";

const EVALUATOR_WORK_ORDER_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    kind: z.literal("evaluator_work_order"),
    work_order_id: z.string().trim().min(1),
    prepared_at: z.string().datetime({ offset: true }),
    task: z
      .object({
        id: z.string().trim().min(1),
        revision: z.number().int().positive().nullable(),
        objective: z.string().trim().min(1),
        acceptance_criteria: z.array(z.string().trim().min(1)).min(1),
      })
      .strict(),
    evaluated_sha: z.string().trim().min(1).nullable(),
    diff_base_sha: z.string().trim().min(1).nullable().optional(),
    blueprint_digest: z.string().trim().min(1).nullable(),
    evaluator: z
      .object({
        id: z.string().trim().min(1),
        profile: z.string().trim().min(1),
        prompt_module_path: z.string().trim().min(1),
      })
      .strict(),
    authority: z
      .object({
        sandbox: z.literal("read-only"),
        writable_roots: z.array(z.string()).length(0),
        allowed_tool_classes: z.array(
          z.enum(["repository_read", "git_read", "run_checks", "report_result"]),
        ),
        external_side_effects: z.array(z.string()).length(0),
      })
      .strict(),
    result_contract: z.literal("sgr.evaluator_result.v1"),
    evidence: z
      .array(
        z
          .object({
            id: z.string().trim().min(1),
            kind: z.enum([
              "task_document",
              "actual_diff",
              "observed_checks",
              "verification_log",
              "blueprint",
              "policy_module",
              "knowledge_ref",
            ]),
            path: z.string().trim().min(1),
            sha256: z.string().regex(/^sha256:[a-f0-9]{64}$/u),
            required: z.boolean(),
          })
          .strict(),
      )
      .min(3),
  })
  .strict();

export type EvaluatorWorkOrder = z.infer<typeof EVALUATOR_WORK_ORDER_SCHEMA>;

export type PreparedEvaluatorReview = {
  work_order: EvaluatorWorkOrder;
  work_order_path: string;
  report_path: string;
  prompt_path: string;
  opinion_path: string;
  result_path: string;
};

export type HumanEvaluatorReviewInput = {
  verdict: EvaluatorRunVerdict;
  summary: string;
  findings: string[];
  evidence_refs: string[];
  missing_tests: string[];
  hidden_assumptions: string[];
  residual_risks: string[];
};

function sha256(value: string | Buffer): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

export function relative(gitRoot: string, target: string): string {
  return relativeArtifactPath(gitRoot, target);
}

export function isWithinRoot(root: string, target: string): boolean {
  const value = path.relative(root, target);
  return (
    value !== "" && !value.startsWith(`..${path.sep}`) && value !== ".." && !path.isAbsolute(value)
  );
}

function taskSection(task: TaskData, name: string): string | null {
  const section = task.sections?.[name];
  return typeof section === "string" && section.trim() ? section.trim() : null;
}

export function uniqueStrings(values: readonly string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function acceptanceCriteria(task: TaskData): string[] {
  const criteria = uniqueStrings([
    ...(task.verify ?? []),
    taskSection(task, "Scope") ?? "",
    taskSection(task, "Plan") ?? "",
    taskSection(task, "Verify Steps") ?? "",
  ]).slice(0, 64);
  return criteria.length > 0 ? criteria : [`Review the approved outcome for ${task.title}.`];
}

function evaluatorObjective(task: TaskData): string {
  return taskSection(task, "Summary") ?? task.description?.trim() ?? task.title;
}

function qualityDir(opts: {
  ctx: CommandContext;
  taskId: string;
  evaluatorId: string;
  at: string;
}): string {
  return path.join(
    opts.ctx.resolvedProject.gitRoot,
    opts.ctx.config.paths.workflow_dir,
    opts.taskId,
    "quality",
    `${timestampPathSegment(opts.at)}-${safePathSegment(opts.evaluatorId) || "evaluator"}`,
  );
}

async function readFileDigest(filePath: string): Promise<`sha256:${string}`> {
  return sha256(await readFile(filePath));
}

async function freezeFile(opts: {
  gitRoot: string;
  id: string;
  kind: EvaluatorWorkOrder["evidence"][number]["kind"];
  filePath: string;
  required: boolean;
}): Promise<EvaluatorWorkOrder["evidence"][number]> {
  return {
    id: opts.id,
    kind: opts.kind,
    path: relative(opts.gitRoot, opts.filePath),
    sha256: await readFileDigest(opts.filePath),
    required: opts.required,
  };
}

async function assertTaskReviewWorkspaceClean(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<void> {
  const [staged, unstaged] = await Promise.all([
    opts.ctx.git.statusStagedPaths(),
    opts.ctx.git.statusUnstagedTrackedPaths(),
  ]);
  const taskPrefix = `${opts.ctx.config.paths.workflow_dir.replaceAll(/\/+$/gu, "")}/${opts.taskId}/`;
  const blocking = [...staged, ...unstaged].filter(
    (entry) => !entry.replaceAll("\\", "/").startsWith(taskPrefix),
  );
  if (blocking.length === 0) return;
  throw new CliError({
    code: "E_VALIDATION",
    message:
      "Evaluator preparation requires committed implementation evidence; tracked paths outside the current task artifact subtree are dirty.",
    context: { task_id: opts.taskId, blocking_paths: uniqueStrings(blocking) },
  });
}

function workOrderId(opts: {
  taskId: string;
  revision: number | null;
  evaluatedSha: string | null;
  diffBaseSha: string | null;
  evidence: EvaluatorWorkOrder["evidence"];
}): string {
  const digest = sha256(
    JSON.stringify({
      task_id: opts.taskId,
      revision: opts.revision,
      evaluated_sha: opts.evaluatedSha,
      diff_base_sha: opts.diffBaseSha,
      evidence: opts.evidence.map((entry) => [entry.id, entry.sha256]),
    }),
  ).slice("sha256:".length, "sha256:".length + 24);
  const task = opts.taskId.replaceAll(/[^A-Za-z0-9_.-]/gu, "-").slice(0, 96) || "task";
  return `evaluator-work-order-${task}-${digest}`;
}

export function reportPaths(reviewDir: string): Omit<PreparedEvaluatorReview, "work_order"> {
  return {
    work_order_path: path.join(reviewDir, EVALUATOR_WORK_ORDER_FILE),
    report_path: path.join(reviewDir, QUALITY_REPORT_FILE),
    prompt_path: path.join(reviewDir, EVALUATOR_PROMPT_FILE),
    opinion_path: path.join(reviewDir, EVALUATOR_OPINION_FILE),
    result_path: path.join(reviewDir, EVALUATOR_RESULT_FILE),
  };
}

export async function prepareEvaluatorReview(opts: {
  ctx: CommandContext;
  task: TaskData;
  evaluator: EvaluatorModule;
  provenance: EvaluatorRunProvenance;
  at?: string;
}): Promise<PreparedEvaluatorReview> {
  await assertTaskReviewWorkspaceClean({ ctx: opts.ctx, taskId: opts.task.id });
  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const at = opts.at ?? new Date().toISOString();
  const reviewDir = qualityDir({
    ctx: opts.ctx,
    taskId: opts.task.id,
    evaluatorId: opts.evaluator.id,
    at,
  });
  const paths = reportPaths(reviewDir);
  const taskReadmePath = path.join(
    gitRoot,
    opts.ctx.config.paths.workflow_dir,
    opts.task.id,
    "README.md",
  );
  const evaluatedSha = await resolveQualityReviewTargetSha({
    gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    taskId: opts.task.id,
    taskIds: [opts.task.id, ...normalizeBranchPrBatchIncludedTaskIds(opts.task, opts.task.id)],
    previousEvaluatedSha: opts.task.quality_review?.evaluated_sha ?? null,
  });
  const diffBaseSha = await resolveEvaluatorDiffBase({
    gitRoot,
    evaluatedSha,
    baseRef: evaluatedSha
      ? await resolveEvaluatorDiffBaseRef({ ctx: opts.ctx, taskId: opts.task.id })
      : null,
    allowSingleCommitFallback: opts.ctx.config.workflow_mode !== "branch_pr",
  });
  const blueprint = await buildTaskBlueprintResolvedSnapshot({ ctx: opts.ctx, task: opts.task });
  const recordPaths = await verificationRecordPaths(path.dirname(taskReadmePath));
  const verificationRecords = await Promise.all(
    recordPaths.map((filePath, index) =>
      freezeFile({
        gitRoot,
        id: `verification-record-${String(index + 1)}`,
        kind: "verification_log",
        filePath,
        required: true,
      }),
    ),
  );
  const observedChecks = {
    task_status: opts.task.status,
    declared_checks: opts.task.verify ?? [],
    verification: opts.task.verification ?? null,
    verification_records: verificationRecords.map(({ path: evidencePath, sha256 }) => ({
      path: evidencePath,
      sha256,
    })),
    runner_history: opts.task.runner?.history ?? [],
  };
  await mkdir(reviewDir, { recursive: true });
  await writeFile(
    path.join(reviewDir, EVALUATOR_DIFF_FILE),
    await renderActualDiff(gitRoot, evaluatedSha, diffBaseSha),
    "utf8",
  );
  await writeFile(
    path.join(reviewDir, EVALUATOR_OBSERVED_CHECKS_FILE),
    `${JSON.stringify(observedChecks, null, 2)}\n`,
    "utf8",
  );
  await writeFile(
    path.join(reviewDir, EVALUATOR_BLUEPRINT_FILE),
    `${JSON.stringify(blueprint, null, 2)}\n`,
    "utf8",
  );

  const evidence: EvaluatorWorkOrder["evidence"] = [
    await freezeFile({
      gitRoot,
      id: "task-document",
      kind: "task_document",
      filePath: taskReadmePath,
      required: true,
    }),
    await freezeFile({
      gitRoot,
      id: "actual-diff",
      kind: "actual_diff",
      filePath: path.join(reviewDir, EVALUATOR_DIFF_FILE),
      required: true,
    }),
    await freezeFile({
      gitRoot,
      id: "observed-checks",
      kind: "observed_checks",
      filePath: path.join(reviewDir, EVALUATOR_OBSERVED_CHECKS_FILE),
      required: true,
    }),
    ...verificationRecords,
    await freezeFile({
      gitRoot,
      id: "blueprint",
      kind: "blueprint",
      filePath: path.join(reviewDir, EVALUATOR_BLUEPRINT_FILE),
      required: true,
    }),
  ];
  for (const [index, policyModule] of blueprint.policyModules.entries()) {
    const policyPath = path.join(gitRoot, policyModule);
    try {
      evidence.push(
        await freezeFile({
          gitRoot,
          id: `policy-${index + 1}`,
          kind: "policy_module",
          filePath: policyPath,
          required: true,
        }),
      );
    } catch (error) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `Unable to freeze required evaluator policy module ${policyModule}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
    }
  }

  const workOrder = EVALUATOR_WORK_ORDER_SCHEMA.parse({
    schema_version: 1,
    kind: "evaluator_work_order",
    work_order_id: workOrderId({
      taskId: opts.task.id,
      revision: opts.task.revision ?? null,
      evaluatedSha,
      diffBaseSha,
      evidence,
    }),
    prepared_at: at,
    task: {
      id: opts.task.id,
      revision: opts.task.revision ?? null,
      objective: evaluatorObjective(opts.task),
      acceptance_criteria: acceptanceCriteria(opts.task),
    },
    evaluated_sha: evaluatedSha,
    diff_base_sha: diffBaseSha,
    blueprint_digest: blueprint.digest.value,
    evaluator: {
      id: opts.evaluator.id,
      profile: opts.evaluator.profile,
      prompt_module_path: relative(gitRoot, opts.evaluator.path),
    },
    authority: {
      sandbox: "read-only",
      writable_roots: [],
      allowed_tool_classes: ["repository_read", "git_read", "run_checks", "report_result"],
      external_side_effects: [],
    },
    result_contract: "sgr.evaluator_result.v1",
    evidence,
  });
  await writeFile(paths.work_order_path, `${JSON.stringify(workOrder, null, 2)}\n`, "utf8");
  await writeFile(
    paths.prompt_path,
    renderEvaluatorPrompt({
      evaluator: opts.evaluator,
      taskId: opts.task.id,
      taskReadmePath: relative(gitRoot, taskReadmePath),
      workOrderPath: relative(gitRoot, paths.work_order_path),
      resultPath: relative(gitRoot, paths.result_path),
      reportPath: relative(gitRoot, paths.report_path),
      provenance: opts.provenance,
    }),
    "utf8",
  );
  return { work_order: workOrder, ...paths };
}

function assertExactKeys(
  value: unknown,
  keys: readonly string[],
  field: string,
): asserts value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new CliError({ code: "E_VALIDATION", message: `${field} must be an object.` });
  }
  const unexpected = Object.keys(value).filter((key) => !keys.includes(key));
  if (unexpected.length > 0) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `${field} contains forbidden fields: ${unexpected.join(", ")}. Evaluator results are read-only.`,
    });
  }
}

function normalizeEvaluatorStructuredNulls(raw: Record<string, unknown>): Record<string, unknown> {
  const normalized: Record<string, unknown> = { ...raw };
  if (normalized.recovery_context === null) delete normalized.recovery_context;
  if (!Array.isArray(normalized.findings)) return normalized;
  normalized.findings = (normalized.findings as unknown[]).map((finding: unknown): unknown => {
    if (!finding || typeof finding !== "object" || Array.isArray(finding)) return finding;
    const normalizedFinding: Record<string, unknown> = { ...finding };
    if (!Array.isArray(normalizedFinding.evidence_refs)) return normalizedFinding;
    normalizedFinding.evidence_refs = (normalizedFinding.evidence_refs as unknown[]).map(
      (evidence: unknown): unknown => {
        if (!evidence || typeof evidence !== "object" || Array.isArray(evidence)) return evidence;
        const normalizedEvidence: Record<string, unknown> = { ...evidence };
        for (const field of ["sha256", "line", "lines", "section"] as const) {
          if (normalizedEvidence[field] === null) delete normalizedEvidence[field];
        }
        return normalizedEvidence;
      },
    );
    return normalizedFinding;
  });
  return normalized;
}

export function validateStrictEvaluatorResult(raw: unknown): EvaluatorSgrResult {
  assertExactKeys(
    raw,
    [
      "schema_version",
      "kind",
      "evaluator_id",
      "verdict",
      "findings",
      "missing_tests",
      "hidden_assumptions",
      "recovery_context",
    ],
    "EvaluatorSgrResult",
  );
  const record = raw as Record<string, unknown>;
  if (Array.isArray(record.findings)) {
    for (const [index, finding] of record.findings.entries()) {
      assertExactKeys(
        finding,
        ["id", "severity", "summary", "broken_invariant", "evidence_refs"],
        `EvaluatorSgrResult.findings[${index}]`,
      );
      if (
        finding &&
        typeof finding === "object" &&
        Array.isArray((finding as Record<string, unknown>).evidence_refs)
      ) {
        for (const [evidenceIndex, evidence] of (
          (finding as Record<string, unknown>).evidence_refs as unknown[]
        ).entries()) {
          assertExactKeys(
            evidence,
            ["path", "sha256", "line", "lines", "section"],
            `EvaluatorSgrResult.findings[${index}].evidence_refs[${evidenceIndex}]`,
          );
        }
      }
    }
  }
  return validateEvaluatorSgrResult(normalizeEvaluatorStructuredNulls(record));
}

export function readWorkOrder(raw: unknown): EvaluatorWorkOrder {
  try {
    return EVALUATOR_WORK_ORDER_SCHEMA.parse(raw);
  } catch (error) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Invalid EvaluatorWorkOrder: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
}

export function assertResultEvidenceIsFrozen(opts: {
  workOrder: EvaluatorWorkOrder;
  result: EvaluatorSgrResult;
}): void {
  const allowed = new Set(opts.workOrder.evidence.map((entry) => entry.path));
  for (const finding of opts.result.findings) {
    for (const evidence of finding.evidence_refs) {
      if (!allowed.has(evidence.path)) {
        throw new CliError({
          code: "E_VALIDATION",
          message: `Evaluator finding ${finding.id} refers to evidence outside the frozen work order: ${evidence.path}`,
        });
      }
    }
  }
}

export async function assertWorkOrderCurrent(opts: {
  ctx: CommandContext;
  task: TaskData;
  workOrder: EvaluatorWorkOrder;
}): Promise<void> {
  const currentRevision = opts.task.revision ?? null;
  if (currentRevision !== opts.workOrder.task.revision) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Evaluator work order is stale because the task revision changed after preparation.",
    });
  }
  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const currentSha = await resolveQualityReviewTargetSha({
    gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    taskId: opts.task.id,
    taskIds: [opts.task.id, ...normalizeBranchPrBatchIncludedTaskIds(opts.task, opts.task.id)],
    previousEvaluatedSha: opts.task.quality_review?.evaluated_sha ?? null,
  });
  if (currentSha !== opts.workOrder.evaluated_sha) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Evaluator work order is stale because the evaluated SHA changed after preparation.",
    });
  }
  const snapshot = await checkTaskBlueprintSnapshotDrift({ ctx: opts.ctx, task: opts.task });
  if (snapshot.current.digest !== opts.workOrder.blueprint_digest) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Evaluator work order is stale because the resolved blueprint changed after preparation.",
    });
  }
  for (const evidence of opts.workOrder.evidence) {
    const evidencePath = path.resolve(gitRoot, evidence.path);
    if (
      !isWithinRoot(gitRoot, evidencePath) ||
      (await readFileDigest(evidencePath)) !== evidence.sha256
    ) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `Evaluator work order is stale because frozen evidence changed: ${evidence.path}`,
      });
    }
  }
}

export function qualityState(
  verdict: EvaluatorRunVerdict,
): "pass" | "rework" | "blocked" | "human_review" {
  return verdict;
}

export function evaluatorSummary(result: EvaluatorSgrResult): string {
  return `EVALUATOR returned ${result.verdict} with ${result.findings.length} typed finding(s).`;
}
