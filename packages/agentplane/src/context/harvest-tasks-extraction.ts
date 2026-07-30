import { createHash } from "node:crypto";

import type { TaskData } from "../backends/task-backend.js";
import type { TaskNewParsed } from "../commands/task/new.js";
import type { PromptModule } from "../runtime/prompt-modules/index.js";
import { PROMPT_MODULE_CONTRACT_SCHEMA_VERSION } from "../runtime/prompt-modules/index.js";
import { CONTEXT_EXTRACTION_SGR_EXAMPLE } from "../runtime/sgr/index.js";
import { CliError } from "../shared/errors.js";
import { isRecord } from "./context-utils.js";
import { taskSourceFingerprint, type TaskSourceFingerprint } from "./harvest-tasks-markers.js";
import { taskKnowledgeProposalId } from "./harvest-tasks-builders.js";
import { taskTextDigest } from "./harvest-tasks-markers.js";
import type { ContextHarvestTasksParsed } from "./harvest-tasks-artifacts.js";
import { parsePositiveIntegerOption } from "./harvest-tasks-model.js";
import { validateContextExtractionSgrResult } from "./sgr-extraction.js";

type ExtractionTask = TaskData & { id: string; title: string; status: string };

type ExtractionTaskPlan = {
  batch_index: number;
  batch_count: number;
  source_task_ids: string[];
  source_bytes: number;
  byte_budget: number;
  oversized_source_ids: string[];
  batch_fingerprint: string;
  parsed: TaskNewParsed;
};

type WeightedExtractionTask = {
  task: ExtractionTask;
  fingerprint: TaskSourceFingerprint;
};

type ExtractionBatch = {
  entries: WeightedExtractionTask[];
  source_bytes: number;
};

const CONTEXT_TASK_EXTRACTION_PROMPT_ADDRESS =
  "framework/template/generated.artifact/context_task_knowledge_proposal/v2";

type TaskExtractionMarker = {
  schema_version: 1;
  pipeline: "context.harvest.tasks";
  state: "selected";
  queued_at: string;
  source_digest: string;
  source_fingerprint_version: 1 | 2;
  source_bytes: number;
  extraction_task_id: string;
  extraction_task_readme_path: string;
  batch_index: number;
  batch_count: number;
  prompt_module_ref: string;
};

function normalizeTags(value: unknown): string[] {
  return Array.isArray(value)
    ? value
        .map(String)
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];
}

function sourceTaskRef(task: ExtractionTask, fingerprint: TaskSourceFingerprint) {
  const acrPath = `.agentplane/tasks/${task.id}/acr.json`;
  const readmePath = `.agentplane/tasks/${task.id}/README.md`;
  const extensions = isRecord(task.extensions) ? task.extensions : {};
  const marker = isRecord(extensions.context_harvest) ? extensions.context_harvest : null;
  return {
    id: task.id,
    title: task.title,
    status: task.status,
    tags: normalizeTags(task.tags),
    readme_path: readmePath,
    acr_path: acrPath,
    source_digest: fingerprint.digest,
    source_fingerprint_version: fingerprint.version,
    source_bytes: fingerprint.size_bytes,
    existing_harvest_marker: marker
      ? {
          source_digest:
            typeof marker.source_digest === "string" ? marker.source_digest : undefined,
          raw_evidence_path:
            typeof marker.raw_evidence_path === "string" ? marker.raw_evidence_path : undefined,
          proposal_id: typeof marker.proposal_id === "string" ? marker.proposal_id : undefined,
          proposal_path:
            typeof marker.proposal_path === "string" ? marker.proposal_path : undefined,
          publication_state:
            typeof marker.publication_state === "string" ? marker.publication_state : undefined,
        }
      : null,
  };
}

export function buildTaskExtractionMarker(opts: {
  task: ExtractionTask;
  queuedAt: string;
  extractionTaskId: string;
  batchIndex: number;
  batchCount: number;
  fingerprint?: TaskSourceFingerprint;
}): TaskExtractionMarker {
  const fingerprint = opts.fingerprint ?? taskSourceFingerprint(opts.task);
  return {
    schema_version: 1,
    pipeline: "context.harvest.tasks",
    state: "selected",
    queued_at: opts.queuedAt,
    source_digest: fingerprint.digest,
    source_fingerprint_version: fingerprint.version,
    source_bytes: fingerprint.size_bytes,
    extraction_task_id: opts.extractionTaskId,
    extraction_task_readme_path: `.agentplane/tasks/${opts.extractionTaskId}/README.md`,
    batch_index: opts.batchIndex,
    batch_count: opts.batchCount,
    prompt_module_ref: CONTEXT_TASK_EXTRACTION_PROMPT_ADDRESS,
  };
}

function buildBatches(
  tasks: ExtractionTask[],
  batchSize: number,
  batchBytes: number,
  sourceFingerprints: ReadonlyMap<string, TaskSourceFingerprint>,
): ExtractionBatch[] {
  const batches: ExtractionBatch[] = [];
  let entries: WeightedExtractionTask[] = [];
  let sourceBytes = 0;

  const flush = () => {
    if (entries.length === 0) return;
    batches.push({ entries, source_bytes: sourceBytes });
    entries = [];
    sourceBytes = 0;
  };

  for (const task of tasks) {
    const entry = {
      task,
      fingerprint: sourceFingerprints.get(task.id) ?? taskSourceFingerprint(task),
    };
    if (
      entries.length > 0 &&
      (entries.length >= batchSize || sourceBytes + entry.fingerprint.size_bytes > batchBytes)
    ) {
      flush();
    }
    entries.push(entry);
    sourceBytes += entry.fingerprint.size_bytes;
    if (entry.fingerprint.size_bytes > batchBytes) flush();
  }
  flush();
  return batches;
}

function batchFingerprint(entries: WeightedExtractionTask[]): string {
  const canonical = entries
    .map(
      ({ task, fingerprint }) =>
        `${task.id}\t${fingerprint.version}\t${fingerprint.digest}\t${fingerprint.size_bytes}`,
    )
    .join("\n");
  return `sha256:${createHash("sha256").update(canonical).digest("hex")}`;
}

function buildExtractionPromptModule(): PromptModule {
  validateContextExtractionSgrResult(CONTEXT_EXTRACTION_SGR_EXAMPLE);
  return {
    schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
    address: {
      value: CONTEXT_TASK_EXTRACTION_PROMPT_ADDRESS,
      namespace: "framework",
      surface: "template",
      target: "generated.artifact",
      slot: "body",
      name: "context_task_extraction_v1",
    },
    owner: {
      kind: "framework",
      package_name: "agentplane",
    },
    title: "Task knowledge proposal semantic prompt",
    summary:
      "CURATOR prompt for deciding one selected task-history knowledge proposal from bounded README and ACR evidence.",
    content_kind: "markdown",
    content: [
      "# Task Knowledge Proposal",
      "",
      "Goal: decide the semantic content of exactly one selected source-backed task knowledge proposal. Do not restate task summaries as durable knowledge.",
      "",
      "1. Read the task-bound proposal record, source README, available ACR, canonical snapshot, and `extraction-contract.json`.",
      "2. Reconcile candidate terms against existing canonical context. Decide whether the proposal yields durable knowledge, is duplicate, needs consolidation, is transient, conflicts with existing knowledge, or should be rejected.",
      "3. Return one schema-valid SGR v2 `context_extraction` result with source refs, semantic resolution evidence, durable claims only when justified, and explicit coverage/rejection reasons.",
      "4. Do not apply the SGR, edit wiki/facts/graph files, reindex, validate, invoke evaluators, write ACR, or finalize the task. CLI supervision owns every mechanical operation and records the apply receipt.",
      "",
      "Stop rather than promote when identity, source precision, private-data safety, topology rationale, or conflict resolution is insufficient. New tasks must emit schema v2.",
    ].join("\n"),
    mutability: "replaceable",
    merge: {
      mode: "pick_one",
      conflict: "error",
      precedence: 100,
    },
    load: {
      roles: ["CURATOR"],
      commands: ["context harvest tasks"],
      task_tags_any: ["context", "assimilation", "task-harvest"],
    },
    provenance: {
      source_kind: "framework_builtin",
      source_ref: "context.harvest.tasks#create-extraction-tasks",
      generated_by: "context.harvest.tasks",
    },
  };
}

function buildDescription(opts: {
  batchIndex: number;
  batchCount: number;
  first: ExtractionTask;
  last: ExtractionTask;
  count: number;
  sourceBytes: number;
  byteBudget: number;
  oversizedCount: number;
}): string {
  return [
    `Semantically decide the selected task-history knowledge proposal ${opts.batchIndex}/${opts.batchCount}.`,
    `Source task: ${opts.first.id}; source bytes: ${opts.sourceBytes}/${opts.byteBudget}; oversized sources: ${opts.oversizedCount}.`,
    "Return one source-backed SGR only. CLI supervision validates and materializes any accepted formal context and wiki updates.",
  ].join(" ");
}

function buildVerifySteps(): string[] {
  return [
    "Return one schema-valid context_extraction SGR under semantic-results/.",
    "Do not apply or materialize semantic output; CLI supervision owns the apply receipt and all deterministic checks.",
  ];
}

export function buildExtractionTaskPlans(
  tasks: ExtractionTask[],
  parsed: ContextHarvestTasksParsed,
  sourceFingerprints: ReadonlyMap<string, TaskSourceFingerprint> = new Map(),
): ExtractionTaskPlan[] {
  const batchSize = parsePositiveIntegerOption(parsed.batchSize, 25, "--batch-size");
  const batchBytes = parsePositiveIntegerOption(parsed.batchBytes, 131_072, "--batch-bytes");
  const batches = buildBatches(tasks, batchSize, batchBytes, sourceFingerprints);
  const promptModule = buildExtractionPromptModule();
  return batches.map((batch, index) => {
    const first = batch.entries[0]?.task;
    const last = batch.entries.at(-1)?.task;
    if (!first || !last) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: "Cannot create an empty extraction task batch.",
      });
    }
    const batchIndex = index + 1;
    const batchCount = batches.length;
    const oversizedSourceIds = batch.entries
      .filter((entry) => entry.fingerprint.size_bytes > batchBytes)
      .map((entry) => entry.task.id);
    const sourceTasks = batch.entries.map((entry) => sourceTaskRef(entry.task, entry.fingerprint));
    const fingerprint = batchFingerprint(batch.entries);
    const proposalIds = batch.entries.map((entry) =>
      taskKnowledgeProposalId({ id: entry.task.id, text_digest: taskTextDigest(entry.task) }),
    );
    return {
      batch_index: batchIndex,
      batch_count: batchCount,
      source_task_ids: batch.entries.map((entry) => entry.task.id),
      source_bytes: batch.source_bytes,
      byte_budget: batchBytes,
      oversized_source_ids: oversizedSourceIds,
      batch_fingerprint: fingerprint,
      parsed: {
        title: `Curate task knowledge proposal ${proposalIds.join(", ")}`,
        description: buildDescription({
          batchIndex,
          batchCount,
          first,
          last,
          count: batch.entries.length,
          sourceBytes: batch.source_bytes,
          byteBudget: batchBytes,
          oversizedCount: oversizedSourceIds.length,
        }),
        owner: "CURATOR",
        priority: "med",
        tags: ["context", "assimilation", "task-harvest", "knowledge-proposal"],
        taskKind: "context",
        mutationScope: "context",
        blueprintRequest: "context.maximum_assimilation",
        extensions: {
          "agentplane.context": {
            schema_version: 1,
            task_type: "task_knowledge_proposal",
            pipeline: "context.harvest.tasks",
            workspace: "context",
            mode: "selected_task_knowledge_proposal",
            order: "explicit_selection",
            proposal: {
              ids: proposalIds,
              paths: proposalIds.map(
                (proposalId) =>
                  `.agentplane/context/derived/proposals/task-knowledge/${proposalId}.json`,
              ),
              selected_by: "context.harvest.tasks --create-extraction-tasks --task <task-id>",
              publication_state: "not_published",
            },
            batch: {
              index: batchIndex,
              count: batchCount,
              size: batch.entries.length,
              batch_size: batchSize,
              source_bytes: batch.source_bytes,
              byte_budget: batchBytes,
              oversized_source_ids: oversizedSourceIds,
              fingerprint,
              first_task_id: first.id,
              last_task_id: last.id,
            },
            source_set: {
              kind: "completed_tasks",
              selection: {
                statuses: parsed.status.length > 0 ? parsed.status : ["DONE"],
                tags: parsed.tag,
                tasks: parsed.task,
                since: parsed.since || null,
                until: parsed.until || null,
                after_task: parsed.afterTask || null,
              },
              sources: sourceTasks,
            },
            prompt_modules: [promptModule],
            prompt_module_ref: promptModule.address.value,
            extraction_contract_path: ".agentplane/tasks/${taskId}/extraction-contract.json",
            allowed_outputs: [
              "context/wiki/**",
              ".agentplane/context/derived/claims/**",
              ".agentplane/context/derived/facts/**",
              ".agentplane/context/derived/graph/**",
              ".agentplane/context/derived/ontology/**",
              ".agentplane/context/derived/reports/**",
              ".agentplane/context/derived/sources/**",
              ".agentplane/context/derived/wiki/**",
              ".agentplane/tasks/${taskId}/README.md",
              ".agentplane/tasks/${taskId}/acr.json",
              ".agentplane/tasks/${taskId}/context-pack.md",
              ".agentplane/tasks/${taskId}/extraction-contract.json",
              ".agentplane/tasks/${taskId}/canonical-snapshot.json",
              ".agentplane/tasks/${taskId}/canonical-entity-catalog.json",
              ".agentplane/tasks/${taskId}/canonical-reconciliation-candidates.json",
              ".agentplane/tasks/${taskId}/source-set.lock.json",
              ".agentplane/tasks/${taskId}/source-spans.skeleton.jsonl",
              ".agentplane/tasks/${taskId}/expected-artifacts.json",
              ".agentplane/tasks/${taskId}/semantic-results/**",
              ".agentplane/tasks/${taskId}/context-rework/**",
            ],
            agent_allowed_outputs: [".agentplane/tasks/${taskId}/semantic-results/**"],
            cli_owned_operations: [
              "validate_semantic_result",
              "apply_semantic_result",
              "materialize_context",
              "reindex",
              "verify",
              "evaluate",
              "acr",
              "finalize",
            ],
            forbidden_outputs: [
              "context/raw/**",
              ".agentplane/cache.sqlite",
              ".agentplane/context/service/**",
            ],
            extraction: {
              read_readme_first: true,
              read_acr_when_present: true,
              extract_entities: true,
              extract_facts: true,
              extract_relations: true,
              update_wiki: false,
              detect_contradictions: true,
              detect_stale_claims: true,
              detect_open_questions: true,
              require_source_refs: true,
              allow_raw_mutation: false,
            },
            policies: {
              context_rules: ".agentplane/context/policies/context.rules.md",
              wiki_rules: ".agentplane/context/policies/wiki.rules.md",
              redaction: ".agentplane/context/policies/redaction.rules.yaml",
            },
          },
        },
        dependsOn: [],
        verify: buildVerifySteps(),
        showBlueprint: false,
        allowDuplicate: true,
        riskFlags: [],
      },
    };
  });
}
