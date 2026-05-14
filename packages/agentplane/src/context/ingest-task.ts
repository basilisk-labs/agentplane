import type { TaskNewParsed } from "../commands/task/new.js";
import type { ContextIngestParsed, ManifestEntry } from "./ingest.js";

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
  const description = [
    `Source context assimilation for ${modeLabel}.`,
    "This task is created by `context ingest`.",
    `Source set: ${JSON.stringify(modeSource.map((row) => row.path))}`,
    `Mode detail: mode=${opts.mode}, indexOnly=${opts.indexOnly}, dryRun=${opts.dryRun}`,
    `Total tracked candidates: ${sourceRows.length}`,
    `Changed/new candidates: ${modeSource.length}`,
    `private-only filtering: enabled`,
    `Run policy: task-owner CURATOR`,
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
        allowed_outputs: allowedOutputs,
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
