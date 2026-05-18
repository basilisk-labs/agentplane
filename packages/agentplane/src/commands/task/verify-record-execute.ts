import { readFile } from "node:fs/promises";
import path from "node:path";

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
import { gitRevParse } from "../shared/git-ops.js";
import { ensureReconciledBeforeMutation } from "../shared/reconcile-check.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { setTaskFieldsIntent } from "../shared/task-store.js";

import { buildStructuredFindingMutationPlan } from "./findings.js";
import {
  assertVerifyStepsFilled,
  executeTaskVerificationTransitionRequest,
  extractDocSection,
  nowIso,
} from "./shared.js";
import { resolveVerifyRecordInput } from "./verify-record-input.js";
import type {
  ExecuteVerifyRecordCommandOptions,
  VerifyState,
  VerifyStructuredFindingInput,
} from "./verify-record.types.js";

function appendDetailsBlock(details: string | null | undefined, lines: readonly string[]): string {
  const existing = (details ?? "").trim();
  return [existing, lines.join("\n")].filter(Boolean).join("\n\n");
}

function verificationStateToQualityReviewState(state: string): "pass" | "rework" | "blocked" {
  if (state === "ok") return "pass";
  if (state === "blocked_external") return "blocked";
  return "rework";
}

async function appendBlueprintSnapshotReference(
  details: string | null | undefined,
  opts: {
    ctx: CommandContext;
    task: Parameters<typeof checkTaskBlueprintSnapshotDrift>[0]["task"];
  },
): Promise<string> {
  try {
    const snapshot = await checkTaskBlueprintSnapshotDrift(opts);
    return appendDetailsBlock(details, [
      "BlueprintSnapshotRef:",
      `- state: ${snapshot.state}`,
      `- path: ${snapshot.path}`,
      `- old_digest: ${snapshot.previous.digest ?? "none"}`,
      `- current_digest: ${snapshot.current.digest}`,
      `- route_changed: ${
        snapshot.routeChanged === null ? "unknown" : snapshot.routeChanged ? "yes" : "no"
      }`,
      `- safe_command: ${snapshot.safeCommand}`,
    ]);
  } catch (err) {
    const message = err instanceof Error && err.message.trim() ? err.message.trim() : String(err);
    return appendDetailsBlock(details, [
      "BlueprintSnapshotRef:",
      "- state: unavailable",
      `- error: ${message}`,
      `- safe_command: agentplane blueprint snapshot ${opts.task.id}`,
    ]);
  }
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
}): Promise<void> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  await ensureReconciledBeforeMutation({ ctx, command: "verify" });
  const backend = ctx.taskBackend;
  const config = ctx.config;
  const resolved = ctx.resolvedProject;
  if (!backend.getTaskDoc || !backend.writeTask) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: backendNotSupportedMessage("task docs"),
    });
  }

  const at = nowIso();
  const evaluatedSha = await gitRevParse(resolved.gitRoot, ["HEAD"]).catch(() => null);
  await applyTaskMutation({
    ctx,
    taskId: opts.taskId,
    policyAction: "task_verify",
    phase: "verify",
    build: async (current) => {
      const doc =
        (typeof current.doc === "string" ? current.doc : "") ||
        (await backend.getTaskDoc!(current.id));
      assertVerifyStepsFilled({
        taskId: current.id,
        sectionText: extractDocSection(doc, "Verify Steps"),
        action: "record verification",
        guidance: "fill it before running `agentplane verify ...`",
      });
      const execution = executeTaskVerificationTransitionRequest({
        task: current,
        at,
        by: opts.by,
        note: opts.note,
        state: opts.state,
        details: await appendBlueprintSnapshotReference(opts.details, { ctx, task: current }),
        doc,
        requiredSections: config.tasks.doc.required_sections,
        maxReworkAttempts: config.evaluator?.max_rework_attempts,
      });
      const intents = [...execution.intents];
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
      if (opts.finding) {
        const findingPlan = buildStructuredFindingMutationPlan({
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
        });
        if (findingPlan) intents.push(...findingPlan.intents);
      }
      return { intents };
    },
  });

  if (config.workflow_mode === "branch_pr") {
    const syncResult = await ensurePrArtifactsSynced({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      author: opts.by,
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
  } else if (config.workflow_mode === "branch_pr") {
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
    if (incidentSummary && config.workflow_mode === "branch_pr") {
      process.stdout.write(`${infoMessage(incidentSummary)}\n`);
    }
  }
}

export async function executeVerifyRecordCommand(
  opts: ExecuteVerifyRecordCommandOptions,
): Promise<number> {
  const input = await resolveVerifyRecordInput(opts);

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
    });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: opts.command, root: opts.rootOverride ?? null });
  }
}
