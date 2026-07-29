import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  digestSupervisorEpisodeValue,
  retryFailedSupervisorExecutionEpisode,
  startSupervisorExecutionEpisode,
  type SupervisorEpisodeOperationKind,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { atomicWriteFile } from "@agentplaneorg/core/fs";

import type { TaskData } from "../../backends/task-backend.js";
import type { CommandCtx } from "../../cli/spec/spec.js";
import {
  advanceContextIngestRunForTask,
  contextIngestRunPhaseRank,
  contextIngestSemanticFingerprint,
  findContextIngestRunForTask,
  requestContextIngestSemanticRework,
  type ContextIngestRunJournal,
  type ContextIngestRunPhase,
} from "../../context/ingest-run-journal.js";
import { validateContextExtractionSgrResult } from "../../context/sgr-extraction.js";
import { CliError } from "../../shared/errors.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import { openSupervisorExecutionEpisode } from "../shared/supervisor-execution-episode.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

import { cmdContextDoctor } from "./doctor.js";
import { cmdContextExtractionApply } from "./extraction.js";
import { cmdContextGraphValidate } from "./graph.js";
import { cmdContextReindex } from "./reindex.js";
import { cmdContextSearch } from "./search.js";
import { cmdContextVerifyTask } from "./verify-task.js";
import { cmdContextWikiIndex, cmdContextWikiLint } from "./wiki.js";
import { cmdContextWikiReport } from "./wiki-reports.js";

export const CONTEXT_ASSIMILATION_OPERATION_IDS = [
  "semantic_result",
  "apply",
  "wiki_report_seed",
  "wiki_index",
  "wiki_report",
  "wiki_lint",
  "reindex",
  "graph_validate",
  "task_verify",
  "doctor",
  "smoke_search",
  "evaluator_request",
  "evaluator_result",
  "acr_generate",
  "acr_check",
  "semantic_rework",
  "finalize",
] as const;

export type ContextAssimilationOperationId = (typeof CONTEXT_ASSIMILATION_OPERATION_IDS)[number];

type ContextAssimilationOperation = {
  id: ContextAssimilationOperationId;
  kind: SupervisorEpisodeOperationKind;
  phase: ContextIngestRunPhase;
  run: () => Promise<unknown>;
};

type EpisodeState = { fingerprint: string; task_revision: number | null };

export type ContextAssimilationSupervisorDependencies = {
  createAcr?: () => Promise<unknown>;
  checkAcr?: () => Promise<unknown>;
  getEpisodeState?: () => Promise<EpisodeState>;
  loadTask?: () => Promise<TaskData>;
  runEvaluator?: () => Promise<unknown>;
  operations?: Partial<Record<ContextAssimilationOperationId, () => Promise<unknown>>>;
};

export type ContextAssimilationSupervisorResult = {
  episode: SupervisorExecutionEpisodeJournal;
  episode_path: string;
  phase: ContextIngestRunPhase;
  rework_work_order: string | null;
  status: "finalized" | "awaiting_semantic_rework";
};

type SupervisorInput = {
  command: CommandContext;
  ctx: CommandCtx;
  extractionFile: string;
  smokeQuery?: string;
  taskId: string;
};

function phaseIsComplete(run: ContextIngestRunJournal, phase: ContextIngestRunPhase): boolean {
  if (run.phase === "semantic_rework_requested") return false;
  return contextIngestRunPhaseRank(run.phase) >= contextIngestRunPhaseRank(phase);
}

function operationRole(kind: SupervisorEpisodeOperationKind): "CURATOR" | "EXECUTOR" {
  return kind === "agent_episode" ? "CURATOR" : "EXECUTOR";
}

function boundedText(value: string | null | undefined, max = 1000): string | null {
  if (!value) return null;
  const compact = value.replaceAll(/\s+/gu, " ").trim();
  return compact.length <= max ? compact : `${compact.slice(0, Math.max(0, max - 1))}…`;
}

function smokeQueryFromSemantic(raw: unknown): string {
  const semantic = validateContextExtractionSgrResult(raw);
  for (const item of semantic.extracted_items) {
    const entity = item.entity;
    if (entity?.label?.trim()) return entity.label.trim();
    if (entity?.aliases?.[0]?.trim()) return entity.aliases[0].trim();
  }
  const summary = semantic.extracted_items[0]?.summary?.trim();
  if (summary) return summary.split(/\s+/u).slice(0, 6).join(" ");
  throw new CliError({
    code: "E_VALIDATION",
    message: "Context extraction has no usable semantic term for the supervisor smoke search.",
  });
}

async function readSemanticResult(
  root: string,
  extractionFile: string,
): Promise<{
  fingerprint: string;
  raw: unknown;
  smoke_query: string;
}> {
  const file = path.resolve(root, extractionFile);
  const text = await readFile(file, "utf8");
  const raw = JSON.parse(text) as unknown;
  validateContextExtractionSgrResult(raw);
  return {
    fingerprint: contextIngestSemanticFingerprint(text),
    raw,
    smoke_query: smokeQueryFromSemantic(raw),
  };
}

async function defaultEpisodeState(input: SupervisorInput): Promise<EpisodeState> {
  const [task, decision] = await Promise.all([
    loadTaskFromContext({ ctx: input.command, taskId: input.taskId }),
    buildTaskRouteDecision({
      ctx: input.command,
      cwd: input.ctx.cwd,
      rootOverride: input.ctx.rootOverride ?? null,
      taskId: input.taskId,
      includeRemote: false,
    }),
  ]);
  return {
    fingerprint: decision.workflowStep.preconditionFingerprint.digest,
    task_revision: task.revision ?? null,
  };
}

async function writeReworkWorkOrder(opts: {
  root: string;
  run: ContextIngestRunJournal;
  semanticFingerprint: string;
  task: TaskData;
}): Promise<{ feedback_digest: string; work_order_file: string }> {
  const review = opts.task.quality_review;
  if (review?.state !== "rework") {
    throw new CliError({
      code: "E_RUNTIME",
      message: "Context semantic rework requires an evaluator quality_review=rework result.",
    });
  }
  const cursor = (opts.run.supervision?.rework.length ?? 0) + 1;
  const feedback = {
    verdict: review.state,
    note: boundedText(review.note),
    findings: review.findings.slice(0, 12).map((finding) => boundedText(finding, 500) ?? ""),
    evidence_refs: review.evidence_refs.slice(0, 16),
  };
  const workOrder = {
    schema_version: 1,
    kind: "context_semantic_rework",
    task_id: opts.task.id,
    run_id: opts.run.run_id,
    cursor,
    replaces_semantic_fingerprint: opts.semanticFingerprint,
    input: {
      context_pack: `.agentplane/tasks/${opts.task.id}/context-pack.md`,
      extraction_contract: `.agentplane/tasks/${opts.task.id}/extraction-contract.json`,
      canonical_catalog: `.agentplane/tasks/${opts.task.id}/canonical-entity-catalog.json`,
    },
    semantic_feedback: feedback,
    required_output: {
      kind: "context_extraction",
      schema_contract: `.agentplane/tasks/${opts.task.id}/extraction-contract.json`,
      instruction:
        "Return one corrected, schema-valid semantic SGR result. Do not run lifecycle, indexing, validation, evaluator, ACR, or finalization commands.",
    },
    stop_rules: [
      "Do not resolve ambiguity by lexical similarity or identifiers alone.",
      "Preserve unresolved or conflicting identity decisions explicitly.",
      "Stop and return the SGR result when the semantic correction is complete; CLI owns all mechanical processing.",
    ],
  };
  const workOrderFile = `.agentplane/tasks/${opts.task.id}/context-rework/${String(cursor).padStart(3, "0")}.json`;
  await mkdir(path.dirname(path.join(opts.root, workOrderFile)), { recursive: true });
  await atomicWriteFile(
    path.join(opts.root, workOrderFile),
    `${JSON.stringify(workOrder, null, 2)}\n`,
    "utf8",
  );
  return {
    feedback_digest: digestSupervisorEpisodeValue(feedback),
    work_order_file: workOrderFile,
  };
}

function stoppedError(journal: SupervisorExecutionEpisodeJournal): CliError {
  const exhaustedDimensions = journal.stop?.exhausted_dimensions;
  const exhausted =
    exhaustedDimensions && exhaustedDimensions.length > 0 ? exhaustedDimensions.join(",") : "none";
  return new CliError({
    code: "E_RUNTIME",
    message:
      `Context assimilation supervisor stopped: ${journal.stop?.reason ?? "unknown"}` +
      ` (${exhausted}).`,
  });
}

/**
 * Execute only deterministic context post-processing. CURATOR work is recorded
 * as an already-produced semantic SGR result; it is never re-run here.
 */
export async function runContextAssimilationSupervisor(
  input: SupervisorInput,
  dependencies: ContextAssimilationSupervisorDependencies = {},
): Promise<ContextAssimilationSupervisorResult> {
  const root = path.resolve(input.command.resolvedProject.gitRoot);
  const semantic = await readSemanticResult(root, input.extractionFile);
  const getEpisodeState = dependencies.getEpisodeState ?? (() => defaultEpisodeState(input));
  const loadTask =
    dependencies.loadTask ??
    (() => loadTaskFromContext({ ctx: input.command, taskId: input.taskId }));
  let reworkWorkOrder: string | null = null;

  const operation = async (
    definition: ContextAssimilationOperation,
  ): Promise<SupervisorExecutionEpisodeJournal> => {
    const run = await findContextIngestRunForTask(root, input.taskId);
    if (run === null) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `No context ingest journal exists for task ${input.taskId}.`,
      });
    }
    const alreadyComplete = phaseIsComplete(run, definition.phase);
    const before = await getEpisodeState();
    const opened = await openSupervisorExecutionEpisode({
      git_root: root,
      task_id: input.taskId,
      task_revision: before.task_revision,
      state_fingerprint_digest: before.fingerprint,
      recover_intent: false,
    });
    let journal = opened.journal;
    if (journal.status === "stopped" && journal.stop?.reason === "operation_failed") {
      journal = retryFailedSupervisorExecutionEpisode({
        journal,
        state_fingerprint_digest: before.fingerprint,
        next_kind: definition.kind,
      });
      await opened.store.write(journal);
    }
    if (journal.status === "stopped") throw stoppedError(journal);
    if (journal.cursor.phase === "completed") {
      journal = advanceSupervisorExecutionEpisodeState({
        journal,
        state_fingerprint_digest: before.fingerprint,
        route_observation: { operation: definition.id, resumed: true },
      });
      await opened.store.write(journal);
    }
    if (journal.state_fingerprint_digest !== before.fingerprint) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `Context assimilation state changed before ${definition.id}; refresh the task route before retrying.`,
      });
    }

    let operationKey: string;
    if (journal.cursor.phase === "intent_recorded") {
      const pending = journal.operations.at(-1);
      if (alreadyComplete && pending?.effect_ref !== definition.id) return journal;
      if (pending?.effect_ref !== definition.id || pending.operation_key === null) {
        throw new CliError({
          code: "E_RUNTIME",
          message: "Context assimilation supervisor has an unrelated effect in doubt.",
        });
      }
      operationKey = pending.operation_key;
    } else {
      if (alreadyComplete) return journal;
      const started = startSupervisorExecutionEpisode({
        journal,
        role: operationRole(definition.kind),
        kind: definition.kind,
        operation_identity: { context_assimilation_operation: definition.id, run_id: run.run_id },
        precondition_fingerprint_digest: before.fingerprint,
        authority_ref: `context-assimilation:${definition.id}`,
        authority_digest: before.fingerprint,
        effect_ref: definition.id,
      });
      journal = started.journal;
      await opened.store.write(journal);
      if (started.status !== "started") throw stoppedError(journal);
      operationKey = started.operation_key;
    }

    let result: unknown = { resumed: true };
    try {
      if (!alreadyComplete) {
        result = await definition.run();
        await advanceContextIngestRunForTask(root, input.taskId, { phase: definition.phase });
      }
    } catch (error) {
      journal = completeSupervisorExecutionEpisode({
        journal,
        operation_key: operationKey,
        result: {
          operation: definition.id,
          error: error instanceof Error ? error.name : "unknown",
        },
        failed: true,
      });
      await opened.store.write(journal);
      throw error;
    }

    journal = completeSupervisorExecutionEpisode({
      journal,
      operation_key: operationKey,
      result: { operation: definition.id, result },
      progress: {
        operation: definition.id,
        phase: definition.phase,
        semantic: semantic.fingerprint,
      },
    });
    await opened.store.write(journal);
    if (journal.status === "stopped") throw stoppedError(journal);
    const after = await getEpisodeState();
    journal = advanceSupervisorExecutionEpisodeState({
      journal,
      state_fingerprint_digest: after.fingerprint,
      route_observation: { operation: definition.id, phase: definition.phase },
    });
    await opened.store.write(journal);
    return journal;
  };

  const invoke = (id: ContextAssimilationOperationId, fallback: () => Promise<unknown>) =>
    dependencies.operations?.[id] ?? fallback;
  const suppliedSmokeQuery = input.smokeQuery?.trim();
  const smokeQuery =
    suppliedSmokeQuery === "" ? semantic.smoke_query : (suppliedSmokeQuery ?? semantic.smoke_query);
  let latest: SupervisorExecutionEpisodeJournal | null = null;
  const run = async (
    id: ContextAssimilationOperationId,
    kind: SupervisorEpisodeOperationKind,
    phase: ContextIngestRunPhase,
    fallback: () => Promise<unknown>,
  ) => {
    latest = await operation({ id, kind, phase, run: invoke(id, fallback) });
  };

  await run("semantic_result", "agent_episode", "semantic_result_received", async () => {
    const existing = await findContextIngestRunForTask(root, input.taskId);
    const attempt = (existing?.supervision?.rework.length ?? 0) + 1;
    await advanceContextIngestRunForTask(root, input.taskId, {
      phase: "semantic_result_received",
      semantic: {
        extraction_file: input.extractionFile,
        extraction_fingerprint: semantic.fingerprint,
        attempt,
      },
    });
    return { extraction_fingerprint: semantic.fingerprint, attempt };
  });
  await run(
    "apply",
    "cli_operation",
    "artifacts_applied",
    async () =>
      await cmdContextExtractionApply({
        cwd: input.ctx.cwd,
        rootOverride: root,
        parsed: {
          file: input.extractionFile,
          taskId: input.taskId,
          dryRun: false,
          synthesizeWiki: true,
        },
      }),
  );
  await run(
    "wiki_report_seed",
    "cli_operation",
    "wiki_report_started",
    async () =>
      await cmdContextWikiReport({
        cwd: input.ctx.cwd,
        rootOverride: root,
        parsed: { path: "context/wiki" },
      }),
  );
  await run(
    "wiki_index",
    "cli_operation",
    "wiki_indexed",
    async () =>
      await cmdContextWikiIndex({
        cwd: input.ctx.cwd,
        rootOverride: root,
        parsed: { path: "context/wiki" },
      }),
  );
  await run(
    "wiki_report",
    "cli_operation",
    "wiki_reported",
    async () =>
      await cmdContextWikiReport({
        cwd: input.ctx.cwd,
        rootOverride: root,
        parsed: { path: "context/wiki" },
      }),
  );
  await run(
    "wiki_lint",
    "cli_operation",
    "wiki_linted",
    async () =>
      await cmdContextWikiLint({
        cwd: input.ctx.cwd,
        rootOverride: root,
        parsed: { path: "context/wiki" },
      }),
  );
  await run(
    "reindex",
    "cli_operation",
    "reindexed",
    async () =>
      await cmdContextReindex({
        cwd: input.ctx.cwd,
        rootOverride: root,
        parsed: { includeTasks: false, includeRaw: false, reset: false },
      }),
  );
  await run(
    "graph_validate",
    "cli_operation",
    "graph_validated",
    async () =>
      await cmdContextGraphValidate({ cwd: input.ctx.cwd, rootOverride: root, parsed: {} }),
  );
  await run(
    "task_verify",
    "cli_operation",
    "task_verified",
    async () =>
      await cmdContextVerifyTask({
        cwd: input.ctx.cwd,
        rootOverride: root,
        parsed: { taskId: input.taskId },
      }),
  );
  await run(
    "doctor",
    "cli_operation",
    "doctor_checked",
    async () =>
      await cmdContextDoctor({
        cwd: input.ctx.cwd,
        rootOverride: root,
        parsed: { fix: false, label: "doctor" },
      }),
  );
  await run(
    "smoke_search",
    "cli_operation",
    "smoke_checked",
    async () =>
      await cmdContextSearch({
        cwd: input.ctx.cwd,
        rootOverride: root,
        parsed: {
          query: smokeQuery,
          scope: "context/wiki,.agentplane/context/derived",
          format: "json",
          explain: false,
        },
      }),
  );
  await run("evaluator_request", "cli_operation", "evaluator_requested", () =>
    Promise.resolve({ requested: true }),
  );

  const afterRequest = await findContextIngestRunForTask(root, input.taskId);
  if (afterRequest === null)
    throw new Error("Context ingest journal disappeared before evaluator.");
  if (!phaseIsComplete(afterRequest, "evaluated")) {
    if (!dependencies.runEvaluator) {
      throw new CliError({
        code: "E_RUNTIME",
        message: "Context assimilation supervisor requires an EVALUATOR execution dependency.",
      });
    }
    await dependencies.runEvaluator();
  }
  await run("evaluator_result", "cli_operation", "evaluated", async () => {
    const task = await loadTask();
    if (!task.quality_review || task.quality_review.state === "pending") {
      throw new CliError({
        code: "E_RUNTIME",
        message: "Evaluator did not record a quality review.",
      });
    }
    return { state: task.quality_review.state, evidence: task.quality_review.evidence_refs };
  });

  const evaluatedTask = await loadTask();
  if (evaluatedTask.quality_review?.state === "rework") {
    const reworkDefinition: ContextAssimilationOperation = {
      id: "semantic_rework",
      kind: "cli_operation",
      phase: "semantic_rework_requested",
      run: async () => {
        const current = await findContextIngestRunForTask(root, input.taskId);
        if (current === null)
          throw new Error("Context ingest journal disappeared while writing rework order.");
        const created = await writeReworkWorkOrder({
          root,
          run: current,
          semanticFingerprint: semantic.fingerprint,
          task: evaluatedTask,
        });
        reworkWorkOrder = created.work_order_file;
        await requestContextIngestSemanticRework(root, input.taskId, created);
        return { work_order: created.work_order_file };
      },
    };
    latest = await operation(reworkDefinition);
    const episodeState = await getEpisodeState();
    const opened = await openSupervisorExecutionEpisode({
      git_root: root,
      task_id: input.taskId,
      task_revision: episodeState.task_revision,
      state_fingerprint_digest: episodeState.fingerprint,
      recover_intent: false,
    });
    return {
      episode: latest,
      episode_path: opened.journal_path,
      phase: "semantic_rework_requested",
      rework_work_order: reworkWorkOrder,
      status: "awaiting_semantic_rework",
    };
  }
  if (evaluatedTask.quality_review?.state !== "pass") {
    throw new CliError({
      code: "E_RUNTIME",
      message: `Evaluator stopped context assimilation with quality_review=${evaluatedTask.quality_review?.state ?? "missing"}.`,
    });
  }

  await run("acr_generate", "cli_operation", "acr_generated", async () => {
    if (!dependencies.createAcr) return { skipped: "acr_dependency_unavailable" };
    return await dependencies.createAcr();
  });
  await run("acr_check", "cli_operation", "acr_checked", async () => {
    if (!dependencies.checkAcr) return { skipped: "acr_dependency_unavailable" };
    return await dependencies.checkAcr();
  });
  await run("finalize", "cli_operation", "finalized", () => Promise.resolve({ finalized: true }));
  if (latest === null)
    throw new Error("Context assimilation supervisor completed without a journal.");
  const episodeState = await getEpisodeState();
  const opened = await openSupervisorExecutionEpisode({
    git_root: root,
    task_id: input.taskId,
    task_revision: episodeState.task_revision,
    state_fingerprint_digest: episodeState.fingerprint,
    recover_intent: false,
  });
  return {
    episode: latest,
    episode_path: opened.journal_path,
    phase: "finalized",
    rework_work_order: null,
    status: "finalized",
  };
}
