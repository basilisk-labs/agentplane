import type { TaskData } from "../backends/task-backend.js";
import type { TaskNewParsed } from "../commands/task/new.js";
import type { PromptModule } from "../runtime/prompt-modules/index.js";
import { PROMPT_MODULE_CONTRACT_SCHEMA_VERSION } from "../runtime/prompt-modules/index.js";
import { CONTEXT_EXTRACTION_SGR_EXAMPLE } from "../runtime/sgr/index.js";
import { CliError } from "../shared/errors.js";
import { isRecord } from "./context-utils.js";
import { taskTextDigest } from "./harvest-tasks-markers.js";
import type { ContextHarvestTasksParsed } from "./harvest-tasks-artifacts.js";
import { validateContextExtractionSgrResult } from "./sgr-extraction.js";

type ExtractionTask = TaskData & { id: string; title: string; status: string };

type ExtractionTaskPlan = {
  batch_index: number;
  batch_count: number;
  source_task_ids: string[];
  parsed: TaskNewParsed;
};

const CONTEXT_TASK_EXTRACTION_PROMPT_ADDRESS =
  "framework/template/generated.artifact/context_task_extraction/v1";

type TaskExtractionMarker = {
  schema_version: 1;
  pipeline: "context.harvest.tasks";
  state: "queued";
  queued_at: string;
  source_digest: string;
  extraction_task_id: string;
  extraction_task_readme_path: string;
  batch_index: number;
  batch_count: number;
  prompt_module_ref: string;
};

function parseBatchSize(value: string): number {
  if (!value.trim()) return 25;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Invalid --batch-size value: ${value}`,
    });
  }
  return parsed;
}

function normalizeTags(value: unknown): string[] {
  return Array.isArray(value)
    ? value
        .map(String)
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];
}

function sourceTaskRef(task: ExtractionTask) {
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
    source_digest: taskTextDigest(task),
    existing_harvest_marker: marker
      ? {
          source_digest:
            typeof marker.source_digest === "string" ? marker.source_digest : undefined,
          raw_evidence_path:
            typeof marker.raw_evidence_path === "string" ? marker.raw_evidence_path : undefined,
          wiki_proposal_path:
            typeof marker.wiki_proposal_path === "string" ? marker.wiki_proposal_path : undefined,
          promotion_state:
            typeof marker.promotion_state === "string" ? marker.promotion_state : undefined,
        }
      : null,
  };
}

function existingExtractionMarker(task: ExtractionTask): TaskExtractionMarker | null {
  const extensions = isRecord(task.extensions) ? task.extensions : {};
  const marker = extensions.context_task_extraction;
  if (!isRecord(marker) || marker.pipeline !== "context.harvest.tasks") return null;
  return marker as TaskExtractionMarker;
}

export function alreadyQueuedForExtractionUnchanged(
  task: ExtractionTask,
  parsed: Pick<ContextHarvestTasksParsed, "task">,
): boolean {
  const marker = existingExtractionMarker(task);
  if (marker?.source_digest !== taskTextDigest(task)) return false;
  if (parsed.task.includes(task.id)) return false;
  return true;
}

export function buildTaskExtractionMarker(opts: {
  task: ExtractionTask;
  queuedAt: string;
  extractionTaskId: string;
  batchIndex: number;
  batchCount: number;
}): TaskExtractionMarker {
  return {
    schema_version: 1,
    pipeline: "context.harvest.tasks",
    state: "queued",
    queued_at: opts.queuedAt,
    source_digest: taskTextDigest(opts.task),
    extraction_task_id: opts.extractionTaskId,
    extraction_task_readme_path: `.agentplane/tasks/${opts.extractionTaskId}/README.md`,
    batch_index: opts.batchIndex,
    batch_count: opts.batchCount,
    prompt_module_ref: CONTEXT_TASK_EXTRACTION_PROMPT_ADDRESS,
  };
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
    title: "Context task-history extraction prompt",
    summary:
      "Default CURATOR prompt module for extracting sourced wiki, facts, and graph updates from completed task READMEs and ACR evidence.",
    content_kind: "markdown",
    content: [
      "# Context Task Extraction",
      "",
      "Goal: convert a bounded batch of completed task READMEs/ACRs into reusable typed context and linked wiki updates; do not restate task summaries as knowledge.",
      "",
      "1. Read every source README and available ACR. Reconcile candidate terms against existing wiki/facts/graph before creating entities or pages.",
      "2. Extract precise source-backed entities, decisions, requirements, invariants, risks, failures, mitigations, relations, conflicts, open questions, and coverage using the task-bound `extraction-contract.json`.",
      "3. Save one SGR v2 `context_extraction` result and run `agentplane context extraction apply <sgr-json> --task-id <task-id>` before narrative wiki edits.",
      "4. Update canonical reusable pages; keep local details under headings. Add useful first-mention wikilinks and keep the glossary a thin alias/navigation layer.",
      "5. Preserve exact README/ACR source refs, validity/supersession, stale/conflict state, and explicit coverage reasons. Raw proposal artifacts and caches are indexes, not semantic truth.",
      "6. Reindex, refresh wiki reports, validate graph/task context, and smoke-search exact task terminology.",
      "",
      "Stop rather than promote when identity, source precision, private-data safety, topology rationale, or conflict resolution is insufficient. Legacy SGR v1 remains readable, but new tasks must emit schema v2.",
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
}): string {
  return [
    `Semantically extract reusable context from completed task history batch ${opts.batchIndex}/${opts.batchCount}.`,
    `Source range: ${opts.first.id} -> ${opts.last.id}; source tasks: ${opts.count}.`,
    "Read task READMEs and ACR evidence, then update sourced wiki proposals, facts, graph rows, stale markers, and conflict markers with provenance.",
  ].join(" ");
}

function buildVerifySteps(): string[] {
  return [
    "agentplane context doctor",
    "agentplane context graph summary",
    "agentplane context graph validate",
    "agentplane context verify-task <task-id>",
  ];
}

export function buildExtractionTaskPlans(
  tasks: ExtractionTask[],
  parsed: ContextHarvestTasksParsed,
): ExtractionTaskPlan[] {
  const batchSize = parseBatchSize(parsed.batchSize);
  const batches: ExtractionTask[][] = [];
  for (let index = 0; index < tasks.length; index += batchSize) {
    batches.push(tasks.slice(index, index + batchSize));
  }
  const promptModule = buildExtractionPromptModule();
  return batches.map((batch, index) => {
    const first = batch[0];
    const last = batch.at(-1);
    if (!first || !last) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: "Cannot create an empty extraction task batch.",
      });
    }
    const batchIndex = index + 1;
    const batchCount = batches.length;
    const sourceTasks = batch.map((task) => sourceTaskRef(task));
    return {
      batch_index: batchIndex,
      batch_count: batchCount,
      source_task_ids: batch.map((task) => task.id),
      parsed: {
        title: `Extract task-history context ${first.id}..${last.id}`,
        description: buildDescription({
          batchIndex,
          batchCount,
          first,
          last,
          count: batch.length,
        }),
        owner: "CURATOR",
        priority: "med",
        tags: ["context", "assimilation", "task-harvest"],
        taskKind: "context",
        mutationScope: "context",
        blueprintRequest: "context.assimilation",
        extensions: {
          "agentplane.context": {
            schema_version: 1,
            task_type: "context_task_extraction",
            pipeline: "context.harvest.tasks",
            workspace: "context",
            mode: "task_history_batch",
            order: "oldest_first",
            batch: {
              index: batchIndex,
              count: batchCount,
              size: batch.length,
              batch_size: batchSize,
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
              ".agentplane/context/derived/facts/**",
              ".agentplane/context/derived/graph/**",
              ".agentplane/context/derived/reports/**",
              ".agentplane/tasks/${taskId}/README.md",
              ".agentplane/tasks/${taskId}/acr.json",
              ".agentplane/tasks/${taskId}/extraction-contract.json",
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
              update_wiki: true,
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
