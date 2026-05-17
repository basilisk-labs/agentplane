import type { TaskNewParsed } from "../commands/task/new.js";
import type { PromptModule } from "../runtime/prompt-modules/index.js";
import { PROMPT_MODULE_CONTRACT_SCHEMA_VERSION } from "../runtime/prompt-modules/index.js";
import type { ContextIngestParsed, ManifestEntry } from "./ingest.js";

const CONTEXT_ASSIMILATION_PROMPT_ADDRESS =
  "framework/template/generated.artifact/context_assimilation/v1";

export function selectedSourceRows(
  opts: Pick<ContextIngestParsed, "mode" | "includePrivate">,
  sourceRows: ManifestEntry[],
): ManifestEntry[] {
  const visible = opts.includePrivate
    ? sourceRows
    : sourceRows.filter((entry) => entry.status !== "private");
  if (opts.mode === "changed") {
    return visible.filter(
      (entry) =>
        entry.status === "new" ||
        entry.status === "changed" ||
        (opts.includePrivate && entry.status === "private"),
    );
  }
  return visible;
}

function buildIngestMetadata(
  opts: Omit<ContextIngestParsed, "runTask">,
  sourceRows: ManifestEntry[],
): {
  title: string;
  description: string;
  verify: string[];
} {
  const modeLabel = {
    all: "all tracked sources",
    changed: "changed sources",
    sources: "explicit sources",
  }[opts.mode];
  const modeSource = selectedSourceRows(opts, sourceRows);
  const title = `context assimilation (${modeLabel})`;
  const promptRef = CONTEXT_ASSIMILATION_PROMPT_ADDRESS;
  const description = [
    `Source context assimilation for ${modeLabel}.`,
    "This task is created by `context ingest`.",
    `Source set: ${JSON.stringify(modeSource.map((row) => row.path))}`,
    `Mode detail: mode=${opts.mode}, indexOnly=${opts.indexOnly}, dryRun=${opts.dryRun}`,
    `Total tracked candidates: ${sourceRows.length}`,
    `Changed/new candidates: ${modeSource.length}`,
    `private-only filtering: enabled`,
    `Run policy: task-owner CURATOR`,
    `Prompt module: ${promptRef}`,
    "",
    "CURATOR contract:",
    "- Maintain `context/wiki/**` as a human-readable, source-backed llm-wiki.",
    "- Use markdown frontmatter as the page manifest for modality, status, source_refs, claims, and graph refs.",
    "- Keep atomic claims and graph rows in derived artifacts; do not turn every claim into a wiki page.",
    "- Create or update wiki pages only when the topic is reusable for future tasks or useful to a human reader.",
    "- Add meaningful markdown cross-links between related wiki pages on first useful mention.",
    "- Represent facts, decisions, policies, requirements, risks, preferences, and definitions as distinct modalities.",
    "- If claims conflict, create a conflict candidate and ask for review before promotion; never overwrite silently.",
    "- Treat completed-task architecture changes as ADR/evolution records with provenance, not as probabilistic facts.",
  ].join("\n");
  return {
    title,
    description,
    verify: [
      "agentplane context verify-task <created-task-id>",
      "agentplane context doctor",
      "agentplane context graph validate",
      'agentplane context search "<smoke-query>" --format json',
      "agentplane acr generate <created-task-id> --write",
      "agentplane acr check <created-task-id>",
    ],
  };
}

function buildContextAssimilationPromptModule(): PromptModule {
  return {
    schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
    address: {
      value: CONTEXT_ASSIMILATION_PROMPT_ADDRESS,
      namespace: "framework",
      surface: "template",
      target: "generated.artifact",
      slot: "body",
      name: "context_assimilation_v1",
    },
    owner: {
      kind: "framework",
      package_name: "agentplane",
    },
    title: "Context assimilation prompt",
    summary:
      "Default CURATOR prompt module for turning raw or changed sources into a linked llm-wiki plus atomic claims, graph rows, and provenance.",
    content_kind: "markdown",
    content: [
      "# Context Assimilation",
      "",
      "You are CURATOR maintaining an AgentPlane llm-wiki. The task may be executed by a runner, Codex, an IDE agent, or a human-assisted agent. Treat this task README and extension as the portable source of instructions.",
      "",
      "Goal: transform the selected sources into durable, human-readable wiki artifacts and machine-readable context artifacts without laundering weak claims into truth.",
      "",
      "Core rules:",
      "- Raw sources remain source-of-truth. Do not mutate `context/raw/**`.",
      "- Wiki pages are synthesis artifacts for humans and agents. They should be readable markdown with YAML frontmatter.",
      "- Atomic claims belong in derived claim/fact rows and graph rows. Do not create one markdown page per minor claim.",
      "- Create a new wiki page when a concept, entity, decision, requirement, policy, risk, definition, workflow, or module is likely to be reused by future tasks.",
      "- Keep related claims on a topic page when that is more readable, but mark every important claim with modality, status, scope, and source_refs.",
      "- Use markdown cross-links for source_refs and meaningful page-to-page references. Do not add decorative links to every repeated word.",
      "- Represent every extracted assertion as a claim candidate until its source and status justify stronger use.",
      "- Preserve modality: factual_claim, observation, assumption, hypothesis, decision, policy, preference, requirement, risk, capability, definition, deprecation.",
      "- Use confidence vectors for factual/requirement/risk claims; do not use one scalar confidence score.",
      "- For decisions from completed task evidence, write ADR/evolution records with source_refs, decision_status, scope, supersedes/superseded_by, and provenance integrity rather than probabilistic confidence.",
      "- If a new claim contradicts existing context, write a conflict candidate, keep both claims, lower conflict_status, and ask the user before promotion or overwrite.",
      "- Keep private or sensitive data out of public wiki artifacts. Preserve visibility/sensitivity metadata when relevant.",
      "",
      "Expected outputs:",
      "- `context/wiki/**` pages with frontmatter manifests.",
      "- `.agentplane/context/derived/facts/**` or claim/fact rows with source_refs and status.",
      "- `.agentplane/context/derived/graph/**` entities, edges, and provenance edges.",
      "- `.agentplane/context/derived/reports/**` when useful for conflict, stale, or open-question summaries.",
      "",
      "Recommended CLI helpers:",
      "- Use `agentplane context wiki new <slug> --modality <type> --source <source-ref>` to create pages with the required AgentPlane frontmatter.",
      "- Use `agentplane context wiki lint context/wiki` before verification.",
      "- Use `agentplane context wiki explain <page>` to inspect page metadata before updating it.",
      "- Use `agentplane context wiki link <page>` to find existing pages that may deserve meaningful cross-links.",
      '- Use `agentplane context search "<term>"` before creating a new page or entity.',
      "- Use `agentplane context graph show <entity-id>` and `agentplane context graph neighbors <entity-id>` before choosing canonical entity names.",
      "",
      "Before writing:",
      "- Search existing wiki, facts, and graph rows for matching entities, concepts, and claims.",
      "- Prefer updating canonical pages over creating duplicates.",
      "- Prefer existing canonical labels over source-local wording; record source-local names as aliases when useful.",
      "- If a document extends an existing entity, update the existing page or section and add sourced claims/provenance instead of creating a duplicate page.",
      "- If a small object belongs inside a broader topic, describe it under a stable heading and link to that section from related pages.",
      "- Use `possibly_same_as` or an open question when entity identity is uncertain.",
      "- If new evidence contradicts existing knowledge, create a conflict candidate and request review before promotion or overwrite.",
      "",
      "Verification:",
      "- Run `agentplane context verify-task <task-id>`.",
      "- Run `agentplane context graph validate`.",
      "- Run a smoke `agentplane context search` query using exact source terminology.",
    ].join("\n"),
    mutability: "replaceable",
    merge: {
      mode: "pick_one",
      conflict: "error",
      precedence: 100,
    },
    load: {
      roles: ["CURATOR"],
      commands: ["context ingest", "context learn files", "context learn changes"],
      task_tags_any: ["context", "assimilation"],
    },
    provenance: {
      source_kind: "framework_builtin",
      source_ref: "context.ingest#create-context-assimilation-task",
      generated_by: "context.ingest",
    },
  };
}

export function createTaskNewParsed(
  opts: ContextIngestParsed,
  sourceRows: ManifestEntry[],
): TaskNewParsed {
  const metadata = buildIngestMetadata(opts, sourceRows);
  const now = new Date().toISOString();
  const selectedRows = selectedSourceRows(opts, sourceRows);
  const allowCapabilities = false;
  const allowedOutputs = [
    "context/wiki/**",
    ".agentplane/context/derived/facts/**",
    ".agentplane/context/derived/graph/**",
    ".agentplane/context/derived/reports/**",
    ".agentplane/tasks/${taskId}/README.md",
    ".agentplane/tasks/${taskId}/acr.json",
  ];
  if (allowCapabilities) {
    allowedOutputs.push("context/capabilities/**", ".agentplane/context/derived/capabilities/**");
  }
  const promptModule = buildContextAssimilationPromptModule();
  return {
    title: metadata.title,
    description: metadata.description,
    owner: "CURATOR",
    priority: "med",
    tags: ["context", "assimilation"],
    taskKind: "context",
    mutationScope: "context",
    blueprintRequest: "context.assimilation",
    extensions: {
      "agentplane.context": {
        schema_version: 1,
        task_type: "context_assimilation",
        manifest: ".agentplane/context/agentplane.context.yaml",
        workspace: "context",
        mode: "wiki",
        source_set: {
          selection: opts.mode,
          include_private: opts.includePrivate,
          generated_at: now,
          files: selectedRows.map((row) => ({
            path: row.path,
            sha256: row.sha256,
            status: row.status,
            content_type: row.content_type,
            size_bytes: row.size_bytes,
          })),
        },
        prompt_modules: [promptModule],
        prompt_module_ref: promptModule.address.value,
        allowed_outputs: allowedOutputs,
        wiki: {
          layout_strategy: "adaptive",
          page_granularity: "topic_artifact",
          claim_granularity: "atomic",
          frontmatter_required: true,
          cross_links_required: true,
          source_refs_as_markdown_links: true,
        },
        assimilation: {
          update_wiki: true,
          extract_entities: true,
          extract_facts: true,
          extract_relations: true,
          detect_contradictions: true,
          detect_open_questions: true,
          propose_capabilities: allowCapabilities,
          update_capabilities: allowCapabilities,
          allow_raw_mutation: false,
        },
        forbidden_outputs: [
          "context/raw/**",
          "context/raw/private/**",
          ".agentplane/cache.sqlite",
          ".agentplane/context/service/**",
        ],
        policies: {
          context_rules: ".agentplane/context/policies/context.rules.md",
          wiki_rules: ".agentplane/context/policies/wiki.rules.md",
          capability_rules: ".agentplane/context/policies/capability.rules.md",
          redaction: ".agentplane/context/policies/redaction.rules.yaml",
        },
      },
    },
    dependsOn: [],
    verify: metadata.verify,
    showBlueprint: false,
    allowDuplicate: true,
    riskFlags: [],
  };
}
