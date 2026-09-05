import { createHash } from "node:crypto";
import { mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { gitRevParse } from "@agentplaneorg/core/git";

import { canonicalizeJson, taskExecutionBaseFromExtensions } from "@agentplaneorg/core/tasks";

import { mapBackendError } from "../../cli/error-map.js";
import { backendNotSupportedMessage, infoMessage, successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import {
  collectTaskIncidents,
  inspectTaskIncidents,
  renderIncidentCollectionPlanOutcome,
} from "../incidents/shared.js";
import { ensurePrArtifactsSynced } from "../pr/internal/sync.js";
import { checkTaskBlueprintSnapshotDrift } from "../blueprint/snapshot-artifact.js";
import { buildVerifiedPrMeta, parsePrMeta } from "../shared/pr-meta.js";
import { resolvePrPaths } from "../pr/internal/pr-paths.js";
import { normalizeBranchPrBatchTaskIds } from "../pr/internal/sync-batch-ownership.js";
import {
  recordedTaskImplementationCommitSha,
  resolveQualityReviewTargetSha,
} from "../shared/quality-review-target.js";
import { ensureReconciledBeforeMutation } from "../shared/reconcile-check.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  resolveTaskBranchFromContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { setTaskFieldsIntent } from "../shared/task-store.js";
import { resolveVerificationInputIdentity } from "../shared/task-verification-input.js";
import {
  reconcileTaskExecutionContract,
  resolveTaskExecutionContract,
} from "../../runtime/task-routing/index.js";
import {
  loadTaskCommandContext,
  resolveTaskExecutionContext,
} from "../../runtime/task-execution-context/index.js";

import { buildStructuredFindingMutationPlan } from "./findings.js";
import {
  assertVerifyStepsFilled,
  executeTaskVerificationTransitionRequest,
  extractDocSection,
  nowIso,
} from "./shared.js";
import { resolveVerifyRecordInput } from "./verify-record-input.js";
import { resolveObservedVerificationChangedPaths } from "./verify-record-observed-changes.js";
import { isQualificationTask, writeQualificationPacket } from "./qualification-packet.js";
import { resolveQualificationDependencyLeaves } from "./qualification-packet-dependencies.js";
import { parseVerificationCheckDetails } from "../shared/verification-details.js";
import { verificationContractEvidenceCoverage } from "../shared/task-verification-records.js";
import type {
  ExecuteVerifyRecordCommandOptions,
  VerifyState,
  VerifyStructuredFindingInput,
} from "./verify-record.types.js";
import {
  appendBlueprintSnapshotReference,
  appendDecisionContextReference,
} from "./verify-record-references.js";

function verificationStateToQualityReviewState(state: string): "pass" | "rework" | "blocked" {
  if (state === "ok") return "pass";
  if (state === "blocked_external") return "blocked";
  return "rework";
}

function sha256(value: string): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function verificationRecordName(at: string, digest: string): string {
  const timestamp = at.replaceAll(/[^0-9]/gu, "");
  return `${timestamp}-${digest.slice("sha256:".length, "sha256:".length + 16)}.json`;
}

function verificationCommand(opts: {
  command: ExecuteVerifyRecordCommandOptions["command"];
  taskId: string;
  state: VerifyState;
  by: string;
}): string {
  const stateFlag = opts.state === "ok" ? "--ok" : "--rework";
  return `agentplane ${opts.command} ${opts.taskId} ${stateFlag} --by ${opts.by}`;
}

async function recordVerificationResult(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  state: VerifyState;
  by: string;
  note: string;
  details?: string | null;
  finding?: VerifyStructuredFindingInput | null;
  collectIncidents?: boolean;
  quiet: boolean;
  command: ExecuteVerifyRecordCommandOptions["command"];
  verificationSnapshot?: ExecuteVerifyRecordCommandOptions["verificationSnapshot"];
}): Promise<void> {
  const initialCtx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  if (!initialCtx.taskBackend.getTaskDoc || !initialCtx.taskBackend.writeTask) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: backendNotSupportedMessage("task docs"),
    });
  }
  const taskCommand = await loadTaskCommandContext({
    ctx: initialCtx,
    taskIds: [opts.taskId],
  });
  const ctx = taskCommand.command;
  const workflowMode = taskCommand.execution.selected_mode;
  await ensureReconciledBeforeMutation({ ctx, command: "verify", taskIds: [opts.taskId] });
  const backend = ctx.taskBackend;
  const config = ctx.config;
  const resolved = ctx.resolvedProject;

  const at = nowIso();
  let verificationPath: string | null = null;
  let verificationRecordCreated = false;
  try {
    await applyTaskMutation({
      ctx,
      taskId: opts.taskId,
      policyAction: "task_verify",
      phase: "verify",
      build: async (current) => {
        const baseExecutionContract =
          opts.verificationSnapshot?.execution_contract ??
          current.execution_contract ??
          resolveTaskExecutionContract({
            config,
            task: current,
            requestedMode:
              current.execution_route?.requested_mode ??
              current.execution_route?.selected_mode ??
              "auto",
          });
        const doc =
          (typeof current.doc === "string" ? current.doc : "") ||
          (await backend.getTaskDoc!(current.id));
        assertVerifyStepsFilled({
          taskId: current.id,
          sectionText: extractDocSection(doc, "Verify Steps"),
          action: "record verification",
          guidance: "fill it before running `agentplane verify ...`",
        });
        const verificationScope = extractDocSection(doc, "Verify Steps")?.trim() ?? "";
        const batchTaskIds = normalizeBranchPrBatchTaskIds(current, current.id);
        const qualificationDependencies = isQualificationTask(current)
          ? await resolveQualificationDependencyLeaves({
              taskId: current.id,
              loadTask: (taskId) => ctx.taskBackend.getTask(taskId),
            })
          : null;
        const qualityReviewTaskIds = qualificationDependencies
          ? [...new Set([...batchTaskIds, ...qualificationDependencies.dependencyTaskIds])]
          : batchTaskIds;
        const taskBranch =
          workflowMode === "branch_pr"
            ? await resolveTaskBranchFromContext({ ctx, taskId: current.id })
            : null;
        const evaluatedSha =
          opts.verificationSnapshot?.evaluated_sha ??
          (await resolveQualityReviewTargetSha({
            gitRoot: resolved.gitRoot,
            workflowDir: config.paths.workflow_dir,
            taskId: current.id,
            taskIds: qualityReviewTaskIds,
            lifecycleTaskIds: batchTaskIds,
            headSha: taskBranch ? await gitRevParse(resolved.gitRoot, [taskBranch]) : undefined,
            previousEvaluatedSha:
              current.quality_review?.evaluated_sha ?? recordedTaskImplementationCommitSha(current),
            workflowMode,
          }));
        const observedChangedPaths =
          opts.verificationSnapshot?.changed_paths ??
          (await resolveObservedVerificationChangedPaths({
            ctx,
            evaluatedSha,
            taskId: current.id,
            artifactTaskIds: qualityReviewTaskIds,
            execution: taskCommand.execution,
          }));
        const observedExecutionContract = reconcileTaskExecutionContract({
          contract: baseExecutionContract,
          changed_paths: observedChangedPaths,
        }).contract;
        const contractTask = { ...current, execution_contract: observedExecutionContract };
        const parsedDetails = parseVerificationCheckDetails(opts.details);
        const requiresConcreteDetails =
          workflowMode === "branch_pr" &&
          (current.status === "DONE" || Boolean(current.commit?.hash?.trim()));
        if (opts.state === "ok" && requiresConcreteDetails && parsedDetails === null) {
          throw new CliError({
            code: "E_VALIDATION",
            message:
              'Passing verification for a committed branch_pr task requires --details with one or more Command, Result, Evidence, and Scope blocks. No verification state was changed. Use --details "Command: <command>\\nResult: pass\\nEvidence: <observed result>\\nScope: <covered behavior>" and repeat each four-field block for additional checks.',
            context: {
              task_id: current.id,
              reason_code: "verification_details_required",
            },
          });
        }
        if (opts.state === "ok" && parsedDetails?.some((check) => check.result !== "pass")) {
          throw new CliError({
            code: "E_VALIDATION",
            message:
              "Passing verification cannot contain a check whose structured Result is fail. No verification state was changed.",
            context: {
              task_id: current.id,
              reason_code: "verification_result_conflict",
            },
          });
        }
        const contractCoverage = verificationContractEvidenceCoverage(contractTask, opts.details);
        if (
          opts.state === "ok" &&
          contractCoverage.requiredChecks.length > 0 &&
          !contractCoverage.accepted
        ) {
          throw new CliError({
            code: "E_VALIDATION",
            message: [
              "Passing verification must satisfy every check selected by the persisted Verification Contract. No verification state was changed.",
              `required_checks=${contractCoverage.requiredChecks.join(",")}`,
              `satisfied_checks=${contractCoverage.satisfiedChecks.join(",") || "none"}`,
              `missing_checks=${contractCoverage.missingChecks.join(",") || "none"}`,
              `unexpected_checks=${contractCoverage.unexpectedChecks.join(",") || "none"}`,
              "Fix: add `Check: <check-id>` to a structured Command/Result/Evidence/Scope block for every required check.",
            ].join("\n"),
            context: {
              task_id: current.id,
              reason_code: "verification_contract_evidence_missing",
            },
          });
        }
        const batchTasks = await Promise.all(
          batchTaskIds.map(async (taskId) =>
            taskId === current.id
              ? contractTask
              : await loadTaskFromContext({
                  ctx,
                  taskId,
                  preferBranchSnapshot: workflowMode === "branch_pr",
                }),
          ),
        );
        const verificationExecutionContext = await resolveTaskExecutionContext({
          ctx,
          tasks: batchTasks,
          primaryTaskId: current.id,
          authoritativeTaskSource: taskCommand.execution.authoritative_task_source,
        });
        const verificationInput = await resolveVerificationInputIdentity({
          gitRoot: resolved.gitRoot,
          workflowDir: config.paths.workflow_dir,
          taskIds: batchTaskIds,
          targetSha: evaluatedSha,
          verifySteps: verificationScope,
          verificationContractDigest:
            observedExecutionContract.verification.contract?.digest ?? null,
          execution: verificationExecutionContext,
          verificationDetails: opts.details,
        });
        if (
          opts.state === "ok" &&
          isQualificationTask(current) &&
          parseVerificationCheckDetails(opts.details) === null
        ) {
          throw new CliError({
            code: "E_VALIDATION",
            message:
              "Qualification verification requires structured --details with Command, Result, Evidence, and Scope for every check.",
          });
        }
        const findingPlan = opts.finding
          ? buildStructuredFindingMutationPlan({
              current,
              config,
              observation: opts.finding.observation,
              impact: opts.finding.impact,
              resolution: opts.finding.resolution,
              promote: opts.finding.promote === true,
              external: opts.finding.external === true,
              fixability: opts.finding.repoFixable ? "repo-fixable" : null,
              incidentScope: opts.finding.incidentScope,
              incidentTags: opts.finding.incidentTags ?? [],
              incidentMatch: opts.finding.incidentMatch ?? [],
              incidentAdvice: opts.finding.incidentAdvice,
              incidentRule: opts.finding.incidentRule,
            })
          : null;
        const record = {
          schema_version: verificationInput ? 2 : 1,
          kind: "task_verification_record",
          task_id: opts.taskId,
          recorded_at: at,
          verification_command: verificationCommand({
            command: opts.command,
            taskId: opts.taskId,
            state: opts.state,
            by: opts.by,
          }),
          result: opts.state,
          verifier: opts.by,
          note: opts.note,
          details: opts.details?.trim() ?? null,
          implementation_sha: evaluatedSha,
          scope: verificationScope,
          scope_digest: sha256(verificationScope),
          ...(verificationInput ? { input: verificationInput } : {}),
        };
        const digest = sha256(JSON.stringify(canonicalizeJson(record)));
        const verificationDir = path.join(
          resolved.gitRoot,
          config.paths.workflow_dir,
          opts.taskId,
          "verification",
        );
        await mkdir(verificationDir, { recursive: true });
        verificationPath = path.join(verificationDir, verificationRecordName(at, digest));
        verificationRecordCreated = await writeJsonStableIfChanged(verificationPath, {
          ...record,
          digest,
        });
        if (opts.state === "ok" && isQualificationTask(current)) {
          await writeQualificationPacket({
            ctx,
            task: current,
            recordPath: verificationPath,
            recordedAt: at,
          });
        }

        const execution = executeTaskVerificationTransitionRequest({
          task: current,
          at,
          by: opts.by,
          note: opts.note,
          state: opts.state,
          details: await appendDecisionContextReference(
            await appendBlueprintSnapshotReference(opts.details, { ctx, task: current }),
            {
              ctx,
              cwd: opts.cwd,
              rootOverride: opts.rootOverride,
              taskId: current.id,
            },
          ),
          doc,
          requiredSections: config.tasks.doc.required_sections,
          maxReworkAttempts: config.evaluator?.max_rework_attempts,
          verificationInputDigest: verificationInput?.digest ?? null,
        });
        const intents = [...execution.intents];
        const verificationResults = (parsedDetails ?? []).map((check, index) => ({
          id: `recorded-check-${String(index + 1)}`,
          result: check.result,
        }));
        if (verificationResults.length === 0) {
          verificationResults.push({
            id: "verification-record",
            result: opts.state === "ok" ? "pass" : "fail",
          });
        }
        const nextExtensions = {
          ...current.extensions,
          task_execution_context: {
            schema_version: 1,
            base_ref: verificationExecutionContext.base_ref,
            base_sha: verificationExecutionContext.base_sha,
            repository_identity:
              taskExecutionBaseFromExtensions(current.extensions)?.repository_identity ?? null,
          },
        };
        if (opts.state !== "ok") {
          Reflect.deleteProperty(nextExtensions, "implementation_commit");
        }
        const reconciledContract = reconcileTaskExecutionContract({
          contract: observedExecutionContract,
          changed_paths: observedChangedPaths,
          verification_results: verificationResults,
        }).contract;
        intents.unshift(
          setTaskFieldsIntent({
            execution_contract: reconciledContract,
            extensions: nextExtensions,
          }),
        );
        if (opts.by === "EVALUATOR") {
          const snapshot = await checkTaskBlueprintSnapshotDrift({ ctx, task: current }).catch(
            () => null,
          );
          const readmePath = path.join(
            resolved.gitRoot,
            config.paths.workflow_dir,
            current.id,
            "README.md",
          );
          intents.push(
            setTaskFieldsIntent({
              quality_review: {
                state: verificationStateToQualityReviewState(
                  execution.nextTask.verification?.state ?? opts.state,
                ),
                updated_at: at,
                updated_by: opts.by,
                note: opts.note,
                evaluated_sha: evaluatedSha,
                blueprint_digest: snapshot?.current.digest ?? null,
                evidence_refs: [
                  path.relative(resolved.gitRoot, readmePath),
                  ...(snapshot?.path ? [snapshot.path] : []),
                ],
                findings: opts.details ? [opts.details] : [],
              },
            }),
          );
        }
        if (findingPlan) intents.push(...findingPlan.intents);
        return { intents };
      },
    });
  } catch (error) {
    if (verificationPath && verificationRecordCreated) {
      await rm(verificationPath, { force: true }).catch(() => null);
    }
    throw error;
  }

  if (workflowMode === "branch_pr") {
    const syncResult = await ensurePrArtifactsSynced({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      author: opts.by,
      workflowMode,
    });
    if (syncResult) {
      const { metaPath } = await resolvePrPaths({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
      });
      const meta = parsePrMeta(await readFile(metaPath, "utf8"), opts.taskId);
      await writeJsonStableIfChanged(
        metaPath,
        buildVerifiedPrMeta({
          meta,
          at,
          state: opts.state === "ok" ? "pass" : "fail",
        }),
      );
    }
  }

  let incidentSummary: string | null = null;
  if (opts.collectIncidents === true) {
    const collected = await collectTaskIncidents({
      ctx,
      taskId: opts.taskId,
      write: true,
    });
    incidentSummary = renderIncidentCollectionPlanOutcome(collected.plan, {
      wrote: collected.wrote,
      context: "collect",
      promotedIds: collected.plan.promotable.map((item) => item.entry.id),
      registryPaths: collected.registryPaths,
      taskId: opts.taskId,
    });
  } else if (workflowMode === "branch_pr") {
    const inspected = await inspectTaskIncidents({
      ctx,
      taskId: opts.taskId,
    });
    incidentSummary = renderIncidentCollectionPlanOutcome(inspected.plan, {
      wrote: false,
      context: "verify",
      taskId: opts.taskId,
    });
  }

  if (!opts.quiet) {
    const findingState = opts.finding
      ? opts.finding.promote === true
        ? "incident-candidate"
        : "task-local"
      : null;
    const readmePath = path.join(
      resolved.gitRoot,
      config.paths.workflow_dir,
      opts.taskId,
      "README.md",
    );
    const relReadmePath = path.relative(resolved.gitRoot, readmePath);
    const extra = findingState ? ` finding=${findingState}` : "";
    process.stdout.write(
      `${successMessage(
        "verified",
        opts.taskId,
        `state=${opts.state} readme=${relReadmePath}${extra}`,
      )}\n`,
    );
    if (incidentSummary && workflowMode === "branch_pr") {
      process.stdout.write(`${infoMessage(incidentSummary)}\n`);
    }
  }
}

export async function executeVerifyRecordCommand(
  opts: ExecuteVerifyRecordCommandOptions,
): Promise<number> {
  const input = await resolveVerifyRecordInput(opts);
  if (!opts.quiet) {
    process.stdout.write(
      `${infoMessage(`recording verification ${opts.taskId} state=${opts.state}`)}\n`,
    );
  }

  try {
    await recordVerificationResult({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      state: opts.state,
      by: input.by,
      note: input.note,
      details: input.details,
      finding: opts.finding,
      collectIncidents: opts.collectIncidents,
      quiet: opts.quiet,
      command: opts.command,
      verificationSnapshot: opts.verificationSnapshot,
    });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: opts.command, root: opts.rootOverride ?? null });
  }
}
