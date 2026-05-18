/* eslint-disable @typescript-eslint/no-base-to-string */
import { parseGroupCommand, type GroupCommandParsed } from "../../cli/group-command.js";
import { toStringList } from "../../cli/spec/parse-utils.js";
import type { CommandSpec } from "../../cli/spec/spec.js";

export const contextSpec: CommandSpec<GroupCommandParsed> = {
  id: ["context"],
  group: "Context",
  summary: "Manage local project context, durable derivations, projections, and search surfaces.",
  description:
    "Context commands cover local knowledge-workspace bootstrap, raw-source indexing, wiki/derived mutation, verification, and discovery surfaces.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  parse: (raw) => parseGroupCommand(raw),
};

export const contextInitSpec: CommandSpec<{
  profile: "adaptive" | "minimal" | "wiki" | "codebase" | "research";
  rawGitignore: "none" | "all";
  derivedGitignore: "none" | "all";
  repair: boolean;
  force: boolean;
}> = {
  id: ["context", "init"],
  group: "Context",
  summary: "Initialize local context workspace and system manifest.",
  description:
    "Creates the local context workspace in an initialized Agentplane project. When run in an empty standalone directory, it first initializes Agentplane with safe non-interactive defaults, then writes the context workspace. Non-empty uninitialized directories must run agentplane init explicitly first.",
  options: [
    {
      kind: "string",
      name: "profile",
      valueHint: "<adaptive|minimal|wiki|codebase|research>",
      choices: ["adaptive", "minimal", "wiki", "codebase", "research"],
      default: "adaptive",
      description:
        "Select initial context setup. adaptive is the default cloud-ready llm-wiki contract; legacy scaffold aliases remain available.",
    },
    {
      kind: "string",
      name: "raw-gitignore",
      choices: ["none", "all"],
      default: "none",
      valueHint: "<none|all>",
      description: "Ignore raw sources by default when set to all.",
    },
    {
      kind: "string",
      name: "derived-gitignore",
      choices: ["none", "all"],
      default: "none",
      valueHint: "<none|all>",
      description:
        "Ignore machine-derived context files under .agentplane/context/derived when set to all.",
    },
    {
      kind: "boolean",
      name: "repair",
      default: false,
      description: "Create missing files only.",
    },
    {
      kind: "boolean",
      name: "force",
      default: false,
      description: "Rewrite default policy files while repairing.",
    },
  ],
  parse: (raw) => ({
    profile:
      (raw.opts.profile as "adaptive" | "minimal" | "wiki" | "codebase" | "research") ?? "adaptive",
    rawGitignore: (raw.opts["raw-gitignore"] as "none" | "all") ?? "none",
    derivedGitignore: (raw.opts["derived-gitignore"] as "none" | "all") ?? "none",
    repair: raw.opts.repair === true,
    force: raw.opts.force === true,
  }),
};

export type ContextInitParsed = {
  profile: "adaptive" | "minimal" | "wiki" | "codebase" | "research";
  rawGitignore: "none" | "all";
  derivedGitignore: "none" | "all";
  repair: boolean;
  force: boolean;
};

export const contextReindexSpec: CommandSpec<{
  includeTasks: boolean;
  includeRaw: boolean;
  reset: boolean;
}> = {
  id: ["context", "reindex"],
  group: "Context",
  summary: "Rebuild local SQLite projection from source artifacts.",
  options: [
    {
      kind: "boolean",
      name: "include-tasks",
      default: false,
      description: "Include task READMEs and ACR during projection refresh.",
    },
    {
      kind: "boolean",
      name: "include-raw",
      default: false,
      description: "Include raw source text during projection refresh.",
    },
    {
      kind: "boolean",
      name: "reset",
      default: false,
      description: "Drop projection before reindex.",
    },
  ],
  parse: (raw) => ({
    includeTasks: raw.opts["include-tasks"] === true,
    includeRaw: raw.opts["include-raw"] === true,
    reset: raw.opts.reset === true,
  }),
};

export const contextSearchSpec: CommandSpec<{
  query: string;
  scope: string;
  format: "text" | "json";
  explain: boolean;
}> = {
  id: ["context", "search"],
  group: "Context",
  summary: "Search indexed local context, facts, graph, tasks, and capabilities.",
  args: [{ name: "query", required: true, valueHint: "<query>" }],
  options: [
    {
      kind: "string",
      name: "scope",
      default: "wiki,facts,graph,tasks,capabilities",
      description: "Comma-separated scope list.",
      valueHint: "<scope>",
    },
    {
      kind: "string",
      name: "format",
      choices: ["text", "json"],
      default: "text",
      description: "Output format.",
      valueHint: "<text|json>",
    },
    {
      kind: "boolean",
      name: "explain",
      default: false,
      description: "Include score explanation metadata.",
    },
  ],
  parse: (raw) => ({
    query: String(raw.args.query),
    scope:
      typeof raw.opts.scope === "string" ? raw.opts.scope : "wiki,facts,graph,tasks,capabilities",
    format: (raw.opts.format as "text" | "json") ?? "text",
    explain: raw.opts.explain === true,
  }),
};

export const contextShowSpec: CommandSpec<{ ref: string }> = {
  id: ["context", "show"],
  group: "Context",
  summary: "Resolve a context source reference and print addressed content.",
  args: [{ name: "source-ref", required: true, valueHint: "<source-ref>" }],
  parse: (raw) => ({ ref: String(raw.args["source-ref"]) }),
};

export const contextGraphSpec: CommandSpec<GroupCommandParsed> = {
  id: ["context", "graph"],
  group: "Context",
  summary: "Validate and inspect derived context graph.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  parse: (raw) => parseGroupCommand(raw),
};

export const contextWikiSpec: CommandSpec<GroupCommandParsed> = {
  id: ["context", "wiki"],
  group: "Context",
  summary: "Create, lint, explain, link, and index local context wiki pages.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  parse: (raw) => parseGroupCommand(raw),
};

export const contextWikiNewSpec: CommandSpec<{
  page: string;
  title: string;
  modality: string;
  status: string;
  visibility: string;
  source: string[];
  force: boolean;
}> = {
  id: ["context", "wiki", "new"],
  group: "Context",
  summary: "Create a wiki page with Agentplane context frontmatter.",
  args: [{ name: "page", required: true, valueHint: "<path-or-slug>" }],
  options: [
    {
      kind: "string",
      name: "title",
      valueHint: "<title>",
      description: "Page title. Defaults to a title derived from the path.",
    },
    {
      kind: "string",
      name: "modality",
      default: "factual_claim",
      valueHint: "<modality>",
      description:
        "Primary page modality: factual_claim, observation, assumption, hypothesis, decision, policy, preference, requirement, risk, capability, definition, or deprecation.",
    },
    {
      kind: "string",
      name: "status",
      default: "sourced_claim",
      valueHint: "<epistemic-status>",
      description:
        "Initial epistemic status such as extracted_candidate, sourced_claim, reviewed_claim, disputed, deprecated, or canonical_org_knowledge.",
    },
    {
      kind: "string",
      name: "visibility",
      default: "project",
      valueHint: "<scope>",
      description: "Intended visibility scope for future publication metadata.",
    },
    {
      kind: "string",
      name: "source",
      repeatable: true,
      valueHint: "<source-ref>",
      description: "Repeatable markdown/source reference backing the page.",
    },
    {
      kind: "boolean",
      name: "force",
      default: false,
      description: "Overwrite an existing page.",
    },
  ],
  parse: (raw) => ({
    page: String(raw.args.page),
    title: typeof raw.opts.title === "string" ? raw.opts.title : "",
    modality: typeof raw.opts.modality === "string" ? raw.opts.modality : "factual_claim",
    status: typeof raw.opts.status === "string" ? raw.opts.status : "sourced_claim",
    visibility: typeof raw.opts.visibility === "string" ? raw.opts.visibility : "project",
    source: toStringList(raw.opts.source),
    force: raw.opts.force === true,
  }),
};

export const contextWikiLintSpec: CommandSpec<{ path: string }> = {
  id: ["context", "wiki", "lint"],
  group: "Context",
  summary: "Validate wiki page frontmatter and source-link hygiene.",
  args: [{ name: "path", required: false, valueHint: "<path>" }],
  parse: (raw) => ({ path: typeof raw.args.path === "string" ? raw.args.path : "" }),
};

export const contextWikiExplainSpec: CommandSpec<{ page: string }> = {
  id: ["context", "wiki", "explain"],
  group: "Context",
  summary: "Print a wiki page's Agentplane context frontmatter.",
  args: [{ name: "page", required: true, valueHint: "<path-or-slug>" }],
  parse: (raw) => ({ page: String(raw.args.page) }),
};

export const contextWikiLinkSpec: CommandSpec<{ page: string }> = {
  id: ["context", "wiki", "link"],
  group: "Context",
  summary: "Suggest existing wiki pages that may deserve cross-links.",
  args: [{ name: "page", required: true, valueHint: "<path-or-slug>" }],
  parse: (raw) => ({ page: String(raw.args.page) }),
};

export const contextWikiIndexSpec: CommandSpec<{ path: string }> = {
  id: ["context", "wiki", "index"],
  group: "Context",
  summary: "Update generated wiki index sections for pages and subdirectories.",
  args: [{ name: "path", required: false, valueHint: "<path>" }],
  parse: (raw) => ({ path: typeof raw.args.path === "string" ? raw.args.path : "context/wiki" }),
};

export const contextHarvestSpec: CommandSpec<GroupCommandParsed> = {
  id: ["context", "harvest"],
  group: "Context",
  summary: "Harvest existing project evidence into source-backed context proposals.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  parse: (raw) => parseGroupCommand(raw),
};

export const contextHarvestTasksSpec: CommandSpec<{
  status: string[];
  tag: string[];
  task: string[];
  since: string;
  until: string;
  afterTask: string;
  limit: string;
  writeProposals: boolean;
  createExtractionTasks: boolean;
  batchSize: string;
  promote: boolean;
  dryRun: boolean;
  format: "text" | "json";
}> = {
  id: ["context", "harvest", "tasks"],
  group: "Context",
  summary: "Harvest completed task evidence into raw scaffolds or CURATOR extraction tasks.",
  description:
    "Selects completed tasks in oldest-first order, skips unchanged tasks with matching ingestion markers, and separates raw scaffold writing, default CURATOR extraction task creation, promotion-gate state, and task README markers. Write modes require an initialized context workspace.",
  options: [
    {
      kind: "string",
      name: "status",
      repeatable: true,
      valueHint: "<status>",
      description: "Repeatable task status filter. Defaults to DONE.",
    },
    {
      kind: "string",
      name: "tag",
      repeatable: true,
      valueHint: "<tag>",
      description: "Repeatable tag filter. Matches tasks with any listed tag.",
    },
    {
      kind: "string",
      name: "task",
      repeatable: true,
      valueHint: "<task-id>",
      description: "Repeatable explicit task id filter.",
    },
    {
      kind: "string",
      name: "since",
      valueHint: "<YYYY-MM-DD|YYYYMMDDHHmm>",
      description: "Only include tasks at or after this task-id timestamp prefix.",
    },
    {
      kind: "string",
      name: "until",
      valueHint: "<YYYY-MM-DD|YYYYMMDDHHmm>",
      description: "Only include tasks at or before this task-id timestamp prefix.",
    },
    {
      kind: "string",
      name: "after-task",
      valueHint: "<task-id>",
      description: "Continue after a previously harvested task id.",
    },
    {
      kind: "string",
      name: "limit",
      valueHint: "<n>",
      description: "Maximum number of oldest matching tasks to harvest.",
    },
    {
      kind: "boolean",
      name: "write-proposals",
      default: false,
      description:
        "Write raw evidence and proposal scaffold artifacts only; semantic wiki/facts/graph extraction belongs to CURATOR tasks.",
    },
    {
      kind: "boolean",
      name: "create-extraction-tasks",
      default: false,
      description:
        "Create standard CURATOR tasks for batchwise semantic extraction from task README/ACR sources. This is the default non-write action.",
    },
    {
      kind: "string",
      name: "batch-size",
      default: "25",
      valueHint: "<n>",
      description: "Number of selected completed tasks per generated extraction task.",
    },
    {
      kind: "boolean",
      name: "promote",
      default: false,
      description: "Promote the wiki proposal to semi-canonical only if the promotion gate passes.",
    },
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Preview selection and gate state without writing artifacts.",
    },
    {
      kind: "string",
      name: "format",
      choices: ["text", "json"],
      default: "text",
      valueHint: "<text|json>",
      description: "Output format.",
    },
  ],
  examples: [
    {
      cmd: "agentplane context harvest tasks --tag release --limit 20 --dry-run",
      why: "Preview the oldest completed release tasks before creating extraction tasks or writing raw scaffolds.",
    },
    {
      cmd: "agentplane context harvest tasks --tag branch_pr --batch-size 25",
      why: "Create default CURATOR tasks that extract semantic wiki/fact/graph knowledge in bounded oldest-first batches.",
    },
    {
      cmd: "agentplane context harvest tasks --tag branch_pr --write-proposals",
      why: "Write raw source-backed proposal scaffolds from completed branch_pr tasks.",
    },
    {
      cmd: "agentplane context harvest tasks --tag branch_pr --create-extraction-tasks --batch-size 25",
      why: "Explicitly request CURATOR extraction tasks for older scripts.",
    },
  ],
  parse: (raw) => {
    const writeProposals = raw.opts["write-proposals"] === true;
    const promote = raw.opts.promote === true;
    const dryRun = raw.opts["dry-run"] === true;
    return {
      status: toStringList(raw.opts.status),
      tag: toStringList(raw.opts.tag),
      task: toStringList(raw.opts.task),
      since: typeof raw.opts.since === "string" ? raw.opts.since : "",
      until: typeof raw.opts.until === "string" ? raw.opts.until : "",
      afterTask: typeof raw.opts["after-task"] === "string" ? raw.opts["after-task"] : "",
      limit: typeof raw.opts.limit === "string" ? raw.opts.limit : "",
      writeProposals,
      createExtractionTasks:
        raw.opts["create-extraction-tasks"] === true || (!writeProposals && !promote && !dryRun),
      batchSize: typeof raw.opts["batch-size"] === "string" ? raw.opts["batch-size"] : "25",
      promote,
      dryRun,
      format: (raw.opts.format as "text" | "json") ?? "text",
    };
  },
};

export const contextGraphSummarySpec: CommandSpec<Record<string, never>> = {
  id: ["context", "graph", "summary"],
  group: "Context",
  summary: "Print a context-graph summary.",
  parse: () => ({}),
};

export const contextGraphShowSpec: CommandSpec<{ id: string }> = {
  id: ["context", "graph", "show"],
  group: "Context",
  summary: "Show a node with neighborhood summary.",
  args: [{ name: "entity-id", required: true, valueHint: "<entity-id>" }],
  parse: (raw) => ({ id: String(raw.args["entity-id"]) }),
};

export const contextGraphNeighborsSpec: CommandSpec<{ id: string }> = {
  id: ["context", "graph", "neighbors"],
  group: "Context",
  summary: "Show direct neighbors for one graph node.",
  args: [{ name: "entity-id", required: true, valueHint: "<entity-id>" }],
  parse: (raw) => ({ id: String(raw.args["entity-id"]) }),
};

export const contextGraphValidateSpec: CommandSpec<Record<string, never>> = {
  id: ["context", "graph", "validate"],
  group: "Context",
  summary: "Validate derived graph JSONL rows and references.",
  parse: () => ({}),
};

export const contextGraphExportSpec: CommandSpec<{ format: "json" | "jsonl" | "csv" }> = {
  id: ["context", "graph", "export"],
  group: "Context",
  summary: "Export graph artifacts for offline consumption.",
  options: [
    {
      kind: "string",
      name: "format",
      choices: ["json", "jsonl", "csv"],
      default: "json",
      description: "Export format.",
      valueHint: "<json|jsonl|csv>",
    },
  ],
  parse: (raw) => ({
    format: (raw.opts.format as "json" | "jsonl" | "csv") ?? "json",
  }),
};

export const contextDoctorSpec: CommandSpec<{ fix: boolean }> = {
  id: ["context", "doctor"],
  group: "Context",
  summary: "Diagnose local context health and projection consistency.",
  options: [
    {
      kind: "boolean",
      name: "fix",
      default: false,
      description: "Attempt safe local fixes for detected issues.",
    },
  ],
  parse: (raw) => ({ fix: raw.opts.fix === true }),
};

export const contextVerifyTaskSpec: CommandSpec<{ taskId: string }> = {
  id: ["context", "verify-task"],
  group: "Context",
  summary: "Validate mutations for a context_assimilation task.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  parse: (raw) => ({ taskId: String(raw.args["task-id"]) }),
};

export const contextCapabilitySpec: CommandSpec<GroupCommandParsed> = {
  id: ["context", "capability"],
  group: "Context",
  summary: "Capability maintenance fallback under context namespace.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  parse: (raw) => parseGroupCommand(raw),
};

export const contextCapabilityValidateSpec: CommandSpec<{ path: string }> = {
  id: ["context", "capability", "validate"],
  group: "Context",
  summary: "Validate a unified capability artifact.",
  args: [{ name: "path", required: true, valueHint: "<path>" }],
  parse: (raw) => ({ path: String(raw.args.path) }),
};

export const contextCapabilitySearchSpec: CommandSpec<{ query: string }> = {
  id: ["context", "capability", "search"],
  group: "Context",
  summary: "Search capability registry and candidate surface.",
  args: [{ name: "query", required: true, valueHint: "<query>" }],
  parse: (raw) => ({ query: String(raw.args.query) }),
};

export const contextCapabilityDiscoverSpec: CommandSpec<{
  from: string;
  minSupport: string;
  writeProposals: boolean;
}> = {
  id: ["context", "capability", "discover"],
  group: "Context",
  summary: "Discover capability candidates from context operations.",
  options: [
    {
      kind: "string",
      name: "from",
      required: true,
      description: "Source domain for discovery.",
      valueHint: "<from>",
    },
    {
      kind: "string",
      name: "min-support",
      default: "3",
      description: "Minimum evidence threshold for proposal.",
      valueHint: "<n>",
    },
    {
      kind: "boolean",
      name: "write-proposals",
      default: false,
      description: "Write proposed capability artifacts in context/capabilities.",
    },
  ],
  parse: (raw) => ({
    from: String(raw.opts.from ?? ""),
    minSupport: String(raw.opts["min-support"] ?? "3"),
    writeProposals: raw.opts["write-proposals"] === true,
  }),
};

export { type ContextIngestParsed } from "./ingest.js";
