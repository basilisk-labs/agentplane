import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import {
  resolveTaskExecutionContext,
  type TaskExecutionContext,
} from "../../runtime/task-execution-context/index.js";
import { CliError } from "../../shared/errors.js";
import {
  checkTaskBlueprintSnapshotDrift,
  buildTaskBlueprintResolvedSnapshot,
} from "../blueprint/snapshot-artifact.js";
import { normalizeBranchPrBatchTaskIds } from "../pr/internal/sync-batch-ownership.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { recordedTaskImplementationCommitSha } from "../shared/quality-review-target.js";
import { withEvidenceMutationLock } from "../evidence/evidence-mutation-lock.js";
import {
  assessLocalVerificationRecords,
  requiredVerificationContractChecks,
} from "../shared/task-verification-records.js";

import type { EvaluatorModule } from "../../evaluators/catalog.js";
import {
  renderActualDiff,
  resolveActualDiffNames,
  resolveEvaluatorDiffBase,
} from "./evaluator-diff-evidence.js";
import {
  evaluatorQualityDir,
  freezeEvaluatorFile,
  readEvaluatorFileDigest,
  readDirectSupervisionEvidence,
  readVerifiedSupervisorJournalHistory,
  writeEvaluatorArtifact,
} from "./evaluator-review-artifacts.js";
import {
  assertEvaluatorPacketCurrent,
  putEvaluatorEvidenceObject,
  writeEvaluatorPacketManifest,
} from "./evaluator-evidence-store.js";
import { resolveEvaluatorReviewTarget } from "./evaluator-qualification-review.js";
import {
  verificationRecordPaths,
  verificationRuntimeEvidencePaths,
} from "./evaluator-verification-records.js";
import {
  renderEvaluatorPrompt,
  safePathSegment,
  timestampPathSegment,
} from "./evaluator-quality-artifacts.js";
import {
  evaluatorAcceptanceCriteria,
  evaluatorObjective,
  isWithinRoot,
  relative,
  type PreparedEvaluatorReview,
} from "./evaluator-review-shared.js";
import type { EvaluatorRunProvenance } from "./evaluator.spec.js";
import { renderEvaluatorResultOutputSchemaJson } from "./evaluator-result-schema.js";
import { applyLegacyPrBase } from "./evaluator-execution-base.js";
import {
  assertTaskReviewWorkspaceClean,
  frozenObjectEvidence,
  reportPaths,
} from "./evaluator-review-support.js";
import {
  EVALUATOR_ALLOWED_TOOL_CLASSES,
  EVALUATOR_WORK_ORDER_SCHEMA,
  evaluatorWorkOrderId,
  type EvaluatorWorkOrder,
} from "./evaluator-work-order.js";

export {
  isWithinRoot,
  relative,
  uniqueStrings,
  type HumanEvaluatorReviewInput,
  type PreparedEvaluatorReview,
} from "./evaluator-review-shared.js";
export {
  renderActualDiff,
  resolveActualDiffNames,
  resolveEvaluatorDiffBase,
} from "./evaluator-diff-evidence.js";
export { validateStrictEvaluatorResult } from "./evaluator-result-validation.js";
export { assertResultEvidenceIsFrozen, readWorkOrder } from "./evaluator-work-order.js";
export type { EvaluatorWorkOrder } from "./evaluator-work-order.js";

const EVALUATOR_PACKET_MANIFEST_FILE = "evaluator-evidence-manifest.json";

type PrepareEvaluatorReviewOptions = {
  ctx: CommandContext;
  task: TaskData;
  evaluator: EvaluatorModule;
  provenance: EvaluatorRunProvenance;
  at?: string;
  execution?: TaskExecutionContext;
};

type PrepareEvaluatorReviewLockedOptions = Omit<PrepareEvaluatorReviewOptions, "execution"> & {
  execution: TaskExecutionContext;
};

export async function prepareEvaluatorReview(
  opts: PrepareEvaluatorReviewOptions,
): Promise<PreparedEvaluatorReview> {
  const ctx = opts.ctx;
  const taskIds = normalizeBranchPrBatchTaskIds(opts.task, opts.task.id);
  const tasks = await Promise.all(
    taskIds.map(async (taskId) =>
      taskId === opts.task.id
        ? opts.task
        : await loadTaskFromContext({ ctx, taskId, preferBranchSnapshot: true }),
    ),
  );
  const resolvedExecution =
    opts.execution ??
    (await resolveTaskExecutionContext({
      ctx,
      tasks,
      primaryTaskId: opts.task.id,
      authoritativeTaskSource: "task_worktree",
    }));
  const execution =
    opts.execution ??
    (await applyLegacyPrBase({ ctx, task: opts.task, execution: resolvedExecution }));
  await assertTaskReviewWorkspaceClean({ ctx, taskId: opts.task.id });
  const gitRoot = ctx.resolvedProject.gitRoot;
  return await withEvidenceMutationLock(
    {
      root: gitRoot,
      workflowDir: ctx.config.paths.workflow_dir,
      taskId: opts.task.id,
    },
    () => prepareEvaluatorReviewLocked({ ...opts, ctx, execution }, gitRoot),
  );
}

async function prepareEvaluatorReviewLocked(
  opts: PrepareEvaluatorReviewLockedOptions,
  gitRoot: string,
): Promise<PreparedEvaluatorReview> {
  if (
    opts.task.verification?.state === "ok" &&
    !opts.task.execution_contract?.verification.contract
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "evaluator cannot accept passing verification without a persisted Verification Contract; record verification again so AgentPlane materializes the contract and binds evidence to its digest.",
      context: { task_id: opts.task.id, reason_code: "verification_contract_missing" },
    });
  }
  const at = opts.at ?? new Date().toISOString();
  const reviewDir = evaluatorQualityDir({
    gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    taskId: opts.task.id,
    evaluatorId: opts.evaluator.id,
    timestamp: at,
    safePathSegment,
    timestampPathSegment,
  });
  const paths = reportPaths(reviewDir);
  const taskRoot = path.join(gitRoot, opts.ctx.config.paths.workflow_dir, opts.task.id);
  const taskReadmePath = path.join(taskRoot, "README.md");
  const { evaluatedSha, qualificationPacket } = await resolveEvaluatorReviewTarget({
    ctx: opts.ctx,
    task: opts.task,
    reason: "preparation",
    execution: opts.execution,
  });
  const diffBaseSha = await resolveEvaluatorDiffBase({
    gitRoot,
    evaluatedSha,
    baseRef: evaluatedSha ? opts.execution.base_sha : null,
    allowSingleCommitFallback: opts.execution.selected_mode !== "branch_pr",
  });
  const taskArtifactPrefixes = normalizeBranchPrBatchTaskIds(opts.task, opts.task.id).map(
    (taskId) => `${opts.ctx.config.paths.workflow_dir.replaceAll("\\", "/")}/${taskId}/`,
  );
  const exactChangedPaths = await resolveActualDiffNames(gitRoot, evaluatedSha, diffBaseSha);
  const implementationChangedPaths = exactChangedPaths.filter(
    (changedPath) => !taskArtifactPrefixes.some((prefix) => changedPath.startsWith(prefix)),
  );
  const contractChangedPaths =
    opts.task.execution_contract?.verification.contract?.observed.changed_files ?? [];
  const missingContractPaths = implementationChangedPaths.filter(
    (changedPath) => !contractChangedPaths.includes(changedPath),
  );
  if (opts.task.verification?.state === "ok" && missingContractPaths.length > 0) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `evaluator cannot accept a Verification Contract whose observed changed files do not cover the exact evaluated diff (missing: ${missingContractPaths.join(
        ", ",
      )}); record verification again so AgentPlane strengthens the contract from deterministic Git evidence.`,
      context: {
        task_id: opts.task.id,
        reason_code: "verification_contract_diff_incomplete",
        missing_paths: missingContractPaths,
      },
    });
  }
  const blueprint = await buildTaskBlueprintResolvedSnapshot({
    ctx: opts.ctx,
    task: opts.task,
  });
  const verificationTargetSha =
    qualificationPacket?.packet.implementation_sha ??
    evaluatedSha ??
    recordedTaskImplementationCommitSha(opts.task);
  const verificationTargetContext = {
    gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    taskIds: normalizeBranchPrBatchTaskIds(opts.task, opts.task.id),
    workflowMode: opts.execution.selected_mode,
    execution: opts.execution,
  } as const;
  const recordPaths = await verificationRecordPaths(taskRoot, opts.task, verificationTargetSha, {
    ...verificationTargetContext,
  });
  const selectedContractChecks = requiredVerificationContractChecks(opts.task);
  if (selectedContractChecks.length > 0 && recordPaths.length === 0) {
    const assessment = await assessLocalVerificationRecords({
      taskRoot,
      task: opts.task,
      evaluatedSha: verificationTargetSha,
      targetContext: verificationTargetContext,
    });
    throw new CliError({
      code: "E_VALIDATION",
      message: [
        "evaluator requires a current verification record that satisfies the persisted Verification Contract.",
        `task=${opts.task.id}`,
        `required_checks=${selectedContractChecks.join(",")}`,
        `reason_code=${assessment.reason}`,
        "Fix: record current verification with concrete evidence and a `Check: <check-id>` block for every required check.",
      ].join("\n"),
    });
  }
  const verificationRecords = await Promise.all(
    recordPaths.map((filePath, index) =>
      freezeEvaluatorFile({
        gitRoot,
        id: `verification-record-${String(index + 1)}`,
        kind: "verification_log",
        filePath,
        required: true,
      }),
    ),
  );
  const runtimeEvidencePaths = await verificationRuntimeEvidencePaths({
    gitRoot,
    taskRoot,
    verificationRecordPaths: recordPaths,
  });
  const runtimeEvidence = await Promise.all(
    runtimeEvidencePaths.map((filePath, index) =>
      freezeEvaluatorFile({
        gitRoot,
        id: `runtime-evidence-${String(index + 1)}`,
        kind: "runtime_evidence",
        filePath,
        required: true,
      }),
    ),
  );
  const linkedRunnerHistory = await readVerifiedSupervisorJournalHistory({
    gitRoot,
    verifiedRuntimeEvidencePaths: runtimeEvidencePaths,
  });
  const observedChecks = {
    task_status: opts.task.status,
    declared_checks: opts.task.verify ?? [],
    verification_contract: opts.task.execution_contract?.verification.contract ?? null,
    verification: opts.task.verification ?? null,
    verification_records: verificationRecords.map(({ path: evidencePath, sha256 }) => ({
      path: evidencePath,
      sha256,
    })),
    runner_history:
      opts.task.runner?.history && opts.task.runner.history.length > 0
        ? opts.task.runner.history
        : linkedRunnerHistory,
    runtime_evidence: runtimeEvidence.map(({ path: evidencePath, sha256 }) => ({
      path: evidencePath,
      sha256,
    })),
    direct_supervision: await readDirectSupervisionEvidence({
      gitRoot,
      workflowDir: opts.ctx.config.paths.workflow_dir,
      taskId: opts.task.id,
      verifiedRuntimeEvidencePaths: runtimeEvidencePaths,
    }),
    qualification_packet: qualificationPacket
      ? {
          path: relative(gitRoot, qualificationPacket.path),
          digest: qualificationPacket.packet.digest,
          implementation_sha: qualificationPacket.packet.implementation_sha,
          evidence_commit: evaluatedSha,
        }
      : { state: "not_required", reason: "not a milestone qualification task" },
  };
  const taskQualityRoot = path.join(taskRoot, "quality");
  const [diffArtifact, observedChecksArtifact, blueprintArtifact] = await Promise.all([
    putEvaluatorEvidenceObject({
      gitRoot,
      taskQualityRoot,
      logicalName: "evaluator-diff",
      kind: "actual_diff",
      extension: ".patch",
      mediaType: "text/x-diff",
      contents: await renderActualDiff(
        gitRoot,
        evaluatedSha,
        diffBaseSha,
        path.join(opts.ctx.config.paths.workflow_dir, opts.task.id),
      ),
    }),
    putEvaluatorEvidenceObject({
      gitRoot,
      taskQualityRoot,
      logicalName: "evaluator-observed-checks",
      kind: "observed_checks",
      extension: ".json",
      mediaType: "application/json",
      contents: `${JSON.stringify(observedChecks, null, 2)}\n`,
    }),
    putEvaluatorEvidenceObject({
      gitRoot,
      taskQualityRoot,
      logicalName: "evaluator-blueprint",
      kind: "blueprint",
      extension: ".json",
      mediaType: "application/json",
      contents: `${JSON.stringify(blueprint, null, 2)}\n`,
    }),
  ]);

  const evidence: EvaluatorWorkOrder["evidence"] = [
    await freezeEvaluatorFile({
      gitRoot,
      id: "task-document",
      kind: "task_document",
      filePath: taskReadmePath,
      required: true,
    }),
    frozenObjectEvidence({
      id: "actual-diff",
      kind: "actual_diff",
      artifact: diffArtifact,
      required: true,
    }),
    frozenObjectEvidence({
      id: "observed-checks",
      kind: "observed_checks",
      artifact: observedChecksArtifact,
      required: true,
    }),
    ...verificationRecords,
    ...runtimeEvidence,
    ...(qualificationPacket
      ? [
          await freezeEvaluatorFile({
            gitRoot,
            id: "qualification-packet",
            kind: "qualification_packet",
            filePath: qualificationPacket.path,
            required: true,
          }),
        ]
      : []),
    frozenObjectEvidence({
      id: "blueprint",
      kind: "blueprint",
      artifact: blueprintArtifact,
      required: true,
    }),
  ];
  for (const [index, policyModule] of blueprint.policyModules.entries()) {
    const policyPath = path.join(gitRoot, policyModule);
    try {
      evidence.push(
        await freezeEvaluatorFile({
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

  const nextWorkOrderId = evaluatorWorkOrderId({
    taskId: opts.task.id,
    revision: opts.task.revision ?? null,
    evaluatedSha,
    diffBaseSha,
    evidence,
  });
  const promptContents = renderEvaluatorPrompt({
    evaluator: opts.evaluator,
    taskId: opts.task.id,
    taskReadmePath: relative(gitRoot, taskReadmePath),
    workOrderPath: relative(gitRoot, paths.work_order_path),
    resultPath: relative(gitRoot, paths.result_path),
    reportPath: relative(gitRoot, paths.report_path),
    provenance: opts.provenance,
  });
  const [promptArtifact, resultSchemaArtifact] = await Promise.all([
    putEvaluatorEvidenceObject({
      gitRoot,
      taskQualityRoot,
      logicalName: "evaluator-prompt",
      kind: "prompt",
      extension: ".md",
      mediaType: "text/markdown",
      contents: promptContents,
    }),
    putEvaluatorEvidenceObject({
      gitRoot,
      taskQualityRoot,
      logicalName: "evaluator-result-schema",
      kind: "result_schema",
      extension: ".json",
      mediaType: "application/schema+json",
      contents: renderEvaluatorResultOutputSchemaJson(),
    }),
  ]);
  const packetManifestPath = path.join(reviewDir, EVALUATOR_PACKET_MANIFEST_FILE);
  const packet = await writeEvaluatorPacketManifest({
    gitRoot,
    taskId: opts.task.id,
    workOrderId: nextWorkOrderId,
    createdAt: at,
    taskQualityRoot,
    manifestPath: packetManifestPath,
    artifacts: [
      diffArtifact,
      observedChecksArtifact,
      blueprintArtifact,
      promptArtifact,
      resultSchemaArtifact,
    ],
  });
  const workOrder = EVALUATOR_WORK_ORDER_SCHEMA.parse({
    schema_version: 1,
    kind: "evaluator_work_order",
    work_order_id: nextWorkOrderId,
    prepared_at: at,
    task: {
      id: opts.task.id,
      revision: opts.task.revision ?? null,
      objective: evaluatorObjective(opts.task),
      acceptance_criteria: evaluatorAcceptanceCriteria(opts.task),
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
      allowed_tool_classes: EVALUATOR_ALLOWED_TOOL_CLASSES,
      external_side_effects: [],
    },
    result_contract: "sgr.evaluator_result.v1",
    packet: {
      manifest_path: relative(gitRoot, packetManifestPath),
      manifest_sha256: packet.sha256,
      prompt_path: promptArtifact.path,
      result_schema_path: resultSchemaArtifact.path,
    },
    evidence,
  });
  await writeEvaluatorArtifact({
    filePath: paths.work_order_path,
    contents: `${JSON.stringify(workOrder, null, 2)}\n`,
  });
  return {
    work_order: workOrder,
    ...paths,
    prompt_path: path.resolve(gitRoot, promptArtifact.path),
    output_schema_path: path.resolve(gitRoot, resultSchemaArtifact.path),
    packet_manifest_path: packetManifestPath,
  };
}

export async function assertFrozenEvaluatorArtifactsCurrent(opts: {
  gitRoot: string;
  workOrder: EvaluatorWorkOrder;
}): Promise<void> {
  if (opts.workOrder.packet) {
    await assertEvaluatorPacketCurrent({
      gitRoot: opts.gitRoot,
      taskId: opts.workOrder.task.id,
      manifestPath: opts.workOrder.packet.manifest_path,
      manifestSha256: opts.workOrder.packet.manifest_sha256,
      promptPath: opts.workOrder.packet.prompt_path,
      resultSchemaPath: opts.workOrder.packet.result_schema_path,
    });
  }
  for (const evidence of opts.workOrder.evidence) {
    const evidencePath = path.resolve(opts.gitRoot, evidence.path);
    if (
      !isWithinRoot(opts.gitRoot, evidencePath) ||
      (await readEvaluatorFileDigest(evidencePath)) !== evidence.sha256
    ) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `Evaluator work order is stale because frozen evidence changed: ${evidence.path}`,
      });
    }
  }
}

export async function assertWorkOrderCurrent(opts: {
  ctx: CommandContext;
  task: TaskData;
  workOrder: EvaluatorWorkOrder;
}): Promise<void> {
  if ((opts.task.revision ?? null) !== opts.workOrder.task.revision) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Evaluator work order is stale because the task revision changed after preparation.",
    });
  }
  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const execution = await resolveTaskExecutionContext({
    ctx: opts.ctx,
    tasks: [opts.task],
    primaryTaskId: opts.task.id,
  });
  const { evaluatedSha: currentSha } = await resolveEvaluatorReviewTarget({
    ctx: opts.ctx,
    task: opts.task,
    reason: "staleness",
    execution,
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
  await assertFrozenEvaluatorArtifactsCurrent({ gitRoot, workOrder: opts.workOrder });
}
