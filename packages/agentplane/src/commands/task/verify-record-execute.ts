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
import { buildVerifiedPrMeta, parsePrMeta } from "../shared/pr-meta.js";
import { resolvePrPaths } from "../pr/internal/pr-paths.js";
import { ensureReconciledBeforeMutation } from "../shared/reconcile-check.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";

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
  await applyTaskMutation({
    ctx,
    taskId: opts.taskId,
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
        details: opts.details ?? null,
        doc,
        requiredSections: config.tasks.doc.required_sections,
      });
      const intents = [...execution.intents];
      if (opts.finding) {
        const findingPlan = buildStructuredFindingMutationPlan({
          current,
          config,
          observation: opts.finding.observation,
          impact: opts.finding.impact,
          resolution: opts.finding.resolution,
          promote: !opts.finding.localOnly,
          external: !opts.finding.localOnly,
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
      ? opts.finding.localOnly
        ? "task-local"
        : "incident-candidate"
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
