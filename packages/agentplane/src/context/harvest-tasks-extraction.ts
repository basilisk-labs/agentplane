import type { TaskData } from "../backends/task-backend.js";
import type { TaskNewParsed } from "../commands/task/new.js";
import type { PromptModule } from "../runtime/prompt-modules/index.js";
import { PROMPT_MODULE_CONTRACT_SCHEMA_VERSION } from "../runtime/prompt-modules/index.js";
import { SGR_CONTRACT_SCHEMA_VERSION } from "../runtime/sgr/index.js";
import { CliError } from "../shared/errors.js";
import { isRecord } from "./context-utils.js";
import { taskTextDigest } from "./harvest-tasks-markers.js";
import type { ContextHarvestTasksParsed } from "./harvest-tasks-artifacts.js";
import {
  validateContextExtractionSgrResult,
  type ContextExtractionSgrResult,
} from "./sgr-extraction.js";

type ExtractionTask = TaskData & { id: string; title: string; status: string };

type ExtractionTaskPlan = {
  batch_index: number;
  batch_count: number;
  source_task_ids: string[];
  parsed: TaskNewParsed;
};

const CONTEXT_TASK_EXTRACTION_PROMPT_ADDRESS =
  "framework/template/generated.artifact/context_task_extraction/v1";

const CONTEXT_EXTRACTION_SGR_EXAMPLE: ContextExtractionSgrResult = {
  schema_version: SGR_CONTRACT_SCHEMA_VERSION,
  kind: "context_extraction",
  reasoning: [
    {
      label: "source-classification",
      summary: "Classify source task README and ACR evidence before extracting claims.",
    },
  ],
  source_refs: [{ path: ".agentplane/tasks/<source-task-id>/README.md" }],
  extracted_items: [
    {
      id: "fact.<stable-id>",
      kind: "fact",
      summary: "A reusable, source-backed project fact.",
      source_refs: [{ path: ".agentplane/tasks/<source-task-id>/README.md" }],
      confidence: 0.8,
      status: "proposed",
      stale_markers: [],
      conflict_markers: [],
    },
  ],
};

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
      "You are CURATOR processing a bounded batch of completed AgentPlane tasks. This is the default semantic harvest path; raw harvest proposal artifacts are only scaffolds.",
      "",
      "Read each source task README first. Read ACR evidence when present. Treat generated raw JSON, search rows, and caches as supporting indexes, not as semantic truth.",
      "",
      "Extract durable knowledge only when it is backed by source_refs. Prefer small, reusable facts over task-summary restatement.",
      "",
      "Required extraction classes:",
      "- components, commands, policies, and workflow surfaces touched by the tasks;",
      "- decisions and invariants that should guide future agents;",
      "- known failures, mitigations, stale assumptions, and conflict candidates;",
      "- graph relations between tasks, components, commands, facts, decisions, and wiki pages.",
      "",
      "Before writing, search existing wiki/facts/graph rows for matching entities. Update or append with provenance; do not silently overwrite unrelated knowledge.",
      "",
      "Preserve the project's chosen wiki hierarchy after first analysis. Use concepts/entities/decisions/modules as optional starting directories, not as a required taxonomy for every repository.",
      "",
      "When a glossary is useful, keep it as a thin navigation index over canonical wiki pages and graph entities. Normalize aliases there, but keep factual claims and provenance on the backing wiki/fact/graph artifacts.",
      "",
      "When updating wiki pages, add useful Markdown cross-links to existing wiki pages or glossary anchors on first meaningful mentions of known concepts, entities, decisions, risks, or modules. Do not link every repeated mention, and do not invent target pages just to satisfy linking.",
      "",
      "Write only allowed outputs from the task extension. Keep source_refs on every factual claim. Mark contradictions, stale candidates, and open questions instead of promoting them.",
      "",
      "Return extraction reasoning in the SGR context_extraction v1 shape before writing context artifacts:",
      JSON.stringify(CONTEXT_EXTRACTION_SGR_EXAMPLE, null, 2),
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
            allowed_outputs: [
              "context/wiki/**",
              ".agentplane/context/derived/facts/**",
              ".agentplane/context/derived/graph/**",
              ".agentplane/context/derived/reports/**",
              ".agentplane/tasks/${taskId}/README.md",
              ".agentplane/tasks/${taskId}/acr.json",
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
