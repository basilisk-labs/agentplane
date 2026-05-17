/* eslint-disable @typescript-eslint/no-unused-vars, unicorn/no-array-sort */
import { execFile } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { gitEnv } from "@agentplaneorg/core/git";

import { infoMessage } from "../../cli/output.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { cmdInit } from "../../cli/run-cli/commands/init/orchestrate.js";
import { detectParentGitRoot } from "../../cli/run-cli/commands/init/git.js";
import type { InitParsed } from "../../cli/run-cli/commands/init/model.js";
import type { CommandSpec } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged, writeTextIfChanged } from "../../shared/write-if-changed.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

import type { ContextInitParsed } from "./context.spec.js";
import { cmdContextReindex } from "./reindex.js";

const execFileAsync = promisify(execFile);
const CONTEXT_BOOTSTRAP_TASK_ID = "202601010101-CTX1NT";

const DEFAULT_GITIGNORE_ENTRIES = [
  ".agentplane/cache.sqlite",
  ".agentplane/cache.sqlite-wal",
  ".agentplane/cache.sqlite-shm",
  ".agentplane/context/service/",
  ".agentplane/context/service/cache/",
  ".agentplane/context/service/embeddings/",
  ".agentplane/context/service/remotes/",
  "context/raw/private/",
];

const POLICY_FILES = new Set([
  ".agentplane/context/policies/context.rules.md",
  ".agentplane/context/policies/wiki.rules.md",
  ".agentplane/context/policies/capability.rules.md",
  ".agentplane/context/policies/redaction.rules.yaml",
  ".agentplane/context/policies/sync.rules.yaml",
]);

const SAFE_EMPTY_PLACEHOLDERS = new Set([".DS_Store"]);

const contextBootstrapInitSpec: CommandSpec<InitParsed> = {
  id: ["init"],
  group: "Setup",
  summary: "Initialize agentplane project files before context bootstrap.",
  parse: () => ({ yes: true }),
};

type InitReport = {
  created: string[];
  rewritten: string[];
  skipped: string[];
};

type StarterWikiPage = {
  relative: string;
  title: string;
  modality: string;
  status: string;
  summary: string;
};

export async function cmdContextInit(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  parsed: ContextInitParsed;
}): Promise<number> {
  try {
    const loaded =
      opts.ctx ??
      (await loadOrBootstrapCommandContext({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
      }));
    const ctx = "ctx" in loaded ? loaded.ctx : loaded;
    const bootstrapped = "bootstrapped" in loaded ? loaded.bootstrapped : false;
    const root = ctx.resolvedProject.gitRoot;
    const report = await createContextWorkspace(root, opts.parsed);
    const wroteGitignore = await ensureContextGitignore(root, opts.parsed);
    await cmdContextReindex({
      cwd: root,
      rootOverride: root,
      parsed: { includeTasks: false, includeRaw: true, reset: false },
    });
    const committedBootstrap = bootstrapped ? await commitContextBootstrapIfChanged(root) : false;

    for (const created of report.created) {
      process.stdout.write(infoMessage(`wrote ${created}`) + "\n");
    }
    for (const skipped of report.skipped) {
      process.stdout.write(infoMessage(`skip existing ${skipped}`) + "\n");
    }
    for (const rewritten of report.rewritten) {
      process.stdout.write(infoMessage(`rewrite ${rewritten}`) + "\n");
    }
    if (wroteGitignore) {
      process.stdout.write(infoMessage("updated .gitignore") + "\n");
    }
    if (committedBootstrap) {
      process.stdout.write(infoMessage("committed context bootstrap") + "\n");
    }
    if (report.created.length + report.rewritten.length === 0 && report.skipped.length > 0) {
      process.stdout.write(infoMessage("context already initialized") + "\n");
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message: `context init failed: ${(err as Error).message}`,
    });
  }
}

async function loadOrBootstrapCommandContext(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<{ ctx: CommandContext; bootstrapped: boolean }> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const target = await inspectBootstrapTarget(root);
  if (target?.canBootstrap) {
    return { ctx: await bootstrapEmptyProjectForContextInit(root), bootstrapped: true };
  }

  try {
    return {
      ctx: await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }),
      bootstrapped: false,
    };
  } catch (err) {
    if (target && !target.hasAgentplaneDir && isMissingProjectError(err)) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message:
          "context init can bootstrap AgentPlane only in an empty directory. " +
          "Run agentplane init explicitly before context init for non-empty directories.",
      });
    }
    throw err;
  }
}

async function commitContextBootstrapIfChanged(root: string): Promise<boolean> {
  const baseGitEnv = gitEnv();
  const status = await execFileAsync("git", ["status", "--porcelain"], {
    cwd: root,
    encoding: "utf8",
    env: baseGitEnv,
  });
  if (!status.stdout.trim()) return false;
  const env = {
    ...baseGitEnv,
    AGENTPLANE_ALLOW_POLICY: "1",
    AGENTPLANE_TASK_ID: CONTEXT_BOOTSTRAP_TASK_ID,
  };
  await execFileAsync("git", ["add", "."], { cwd: root, env: baseGitEnv });
  await execFileAsync(
    "git",
    [
      "commit",
      "-m",
      "✅ CTX1NT task: initialize AgentPlane context",
      "-m",
      ["Context-Bootstrap: true", `Context-Bootstrap-Task: ${CONTEXT_BOOTSTRAP_TASK_ID}`].join(
        "\n",
      ),
    ],
    { cwd: root, env },
  );
  return true;
}

type BootstrapTarget = {
  canBootstrap: boolean;
  hasAgentplaneDir: boolean;
};

async function inspectBootstrapTarget(root: string): Promise<BootstrapTarget | null> {
  const entries = await readBootstrapTargetEntries(root);
  if (!entries) return null;
  const meaningfulEntries = entries.filter((entry) => !SAFE_EMPTY_PLACEHOLDERS.has(entry));
  const canBootstrap =
    meaningfulEntries.length === 0 ||
    (meaningfulEntries.length === 1 && meaningfulEntries[0] === ".git");

  return {
    canBootstrap,
    hasAgentplaneDir: meaningfulEntries.includes(".agentplane"),
  };
}

async function bootstrapEmptyProjectForContextInit(root: string): Promise<CommandContext> {
  const parentGitRoot = await detectParentGitRoot(root);
  if (parentGitRoot) {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message:
        "context init can bootstrap AgentPlane only in a standalone empty directory. " +
        `Target ${root} is inside parent Git repository ${parentGitRoot}. ` +
        "Run agentplane init explicitly from the intended project root.",
    });
  }

  process.stdout.write(
    infoMessage("agentplane project not found; bootstrapping empty directory") + "\n",
  );
  await cmdInit({
    cwd: root,
    rootOverride: root,
    outputMode: "text",
    flags: { yes: true },
    spec: contextBootstrapInitSpec,
  });
  return await loadCommandContext({ cwd: root, rootOverride: root });
}

async function readBootstrapTargetEntries(root: string): Promise<string[] | null> {
  try {
    return await readdir(root);
  } catch {
    return null;
  }
}

function isMissingProjectError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return (
    message.startsWith("Not a git repository") ||
    message.includes("ENOENT") ||
    message.includes(".agentplane")
  );
}

async function createContextWorkspace(
  root: string,
  parsed: ContextInitParsed,
): Promise<InitReport> {
  const created: string[] = [];
  const rewritten: string[] = [];
  const skipped: string[] = [];
  const now = new Date().toISOString();
  const projectName = path.basename(root);
  const files: { relative: string; content: string; policy?: boolean }[] = [
    { relative: "context/README.md", content: buildContextReadme(parsed.profile) },
    { relative: "context/raw/.gitkeep", content: "" },
    { relative: "context/raw/private/.gitkeep", content: "" },
    { relative: "context/wiki/.gitkeep", content: "" },
    {
      relative: "context/wiki/AGENTS.md",
      content: buildWikiAgentsMarkdown(parsed.profile),
    },
    {
      relative: "context/capabilities/README.md",
      content: buildCapabilitiesReadme(parsed.profile),
    },
    { relative: "context/capabilities/snippets/.gitkeep", content: "" },
    { relative: "context/capabilities/prompts/.gitkeep", content: "" },
    { relative: "context/capabilities/checklists/.gitkeep", content: "" },
    { relative: "context/capabilities/playbooks/.gitkeep", content: "" },
    { relative: "context/capabilities/templates/.gitkeep", content: "" },
    { relative: "context/capabilities/workflows/.gitkeep", content: "" },
    { relative: "context/capabilities/rubrics/.gitkeep", content: "" },
    { relative: "context/capabilities/recipes/.gitkeep", content: "" },
    {
      relative: ".agentplane/context/agentplane.context.yaml",
      content: buildContextManifestYaml(projectName, parsed.profile, now),
    },
    {
      relative: ".agentplane/context/policies/context.rules.md",
      content: buildPolicyMarkdown("Context rules"),
      policy: true,
    },
    {
      relative: ".agentplane/context/policies/wiki.rules.md",
      content: buildPolicyMarkdown("Wiki rules"),
      policy: true,
    },
    {
      relative: ".agentplane/context/policies/capability.rules.md",
      content: buildPolicyMarkdown("Capability rules"),
      policy: true,
    },
    {
      relative: ".agentplane/context/policies/redaction.rules.yaml",
      content: buildRedactionRulesYaml(),
      policy: true,
    },
    {
      relative: ".agentplane/context/policies/sync.rules.yaml",
      content: buildSyncRulesYaml(),
      policy: true,
    },
    { relative: ".agentplane/context/derived/facts/facts.jsonl", content: "" },
    { relative: ".agentplane/context/derived/graph/entities.jsonl", content: "" },
    { relative: ".agentplane/context/derived/graph/edges.jsonl", content: "" },
    { relative: ".agentplane/context/derived/graph/provenance_edges.jsonl", content: "" },
    { relative: ".agentplane/context/derived/capabilities/capabilities.jsonl", content: "" },
    { relative: ".agentplane/context/derived/capabilities/capability_edges.jsonl", content: "" },
    { relative: ".agentplane/context/derived/reports/assimilation-events.jsonl", content: "" },
    { relative: ".agentplane/context/service/.gitkeep", content: "" },
  ];

  if (
    parsed.profile === "adaptive" ||
    parsed.profile === "wiki" ||
    parsed.profile === "codebase" ||
    parsed.profile === "research"
  ) {
    files.push(
      { relative: "context/raw/specs/.gitkeep", content: "" },
      { relative: "context/raw/research/.gitkeep", content: "" },
      starterWikiPage({
        relative: "context/wiki/index.md",
        title: "Context wiki",
        modality: "definition",
        status: "sourced_claim",
        summary:
          "Starter navigation page for the project-specific AgentPlane context wiki. Replace this scaffold with a hierarchy grounded in project evidence.",
      }),
      starterWikiPage({
        relative: "context/wiki/concepts/index.md",
        title: "Concepts",
        modality: "definition",
        status: "sourced_claim",
        summary:
          "Starter index for reusable concepts. Keep this page only if concept-level navigation fits the project.",
      }),
      starterWikiPage({
        relative: "context/wiki/entities/index.md",
        title: "Entities",
        modality: "definition",
        status: "sourced_claim",
        summary:
          "Starter index for people, systems, organizations, and other entities that recur across sources.",
      }),
      starterWikiPage({
        relative: "context/wiki/decisions/index.md",
        title: "Decisions",
        modality: "decision",
        status: "sourced_claim",
        summary:
          "Starter index for durable decisions and ADR-style evolution records extracted from source evidence.",
      }),
      starterWikiPage({
        relative: "context/wiki/modules/index.md",
        title: "Modules",
        modality: "definition",
        status: "sourced_claim",
        summary:
          "Starter index for code modules, runtime surfaces, and implementation areas when they are useful to future tasks.",
      }),
      starterWikiPage({
        relative: "context/wiki/contradictions/index.md",
        title: "Contradictions",
        modality: "risk",
        status: "sourced_claim",
        summary:
          "Starter index for disputed claims, stale evidence, and source conflicts that need explicit review before promotion.",
      }),
      starterWikiPage({
        relative: "context/wiki/reports/index.md",
        title: "Reports",
        modality: "observation",
        status: "sourced_claim",
        summary:
          "Starter index for context assimilation reports, audit summaries, and temporary synthesis notes.",
      }),
      { relative: "context/wiki/concepts/.gitkeep", content: "" },
      { relative: "context/wiki/entities/.gitkeep", content: "" },
      { relative: "context/wiki/decisions/.gitkeep", content: "" },
      { relative: "context/wiki/modules/.gitkeep", content: "" },
      { relative: "context/wiki/contradictions/.gitkeep", content: "" },
      { relative: "context/wiki/reports/.gitkeep", content: "" },
    );
  }
  if (parsed.profile === "codebase") {
    files.push({ relative: "context/raw/notes/.gitkeep", content: "" });
  }
  if (parsed.profile === "research") {
    files.push({ relative: "context/wiki/notes/.gitkeep", content: "" });
  }

  const lockPayload = {
    version: 1,
    generated_at: now,
    workspace_hash: `sha256:${Buffer.from(root).toString("hex").slice(0, 16)}`,
    sources: [],
  };
  files.push({
    relative: ".agentplane/context/manifest.lock.json",
    content: `${JSON.stringify(lockPayload, null, 2)}\n`,
  });

  for (const file of files) {
    const abs = path.join(root, file.relative);
    const exists = await readExisting(abs);
    if (exists !== null) {
      if (parsed.repair && parsed.force && file.policy && POLICY_FILES.has(file.relative)) {
        await writeTextIfChanged(abs, file.content);
        rewritten.push(file.relative);
      } else {
        skipped.push(file.relative);
      }
      continue;
    }
    await writeTextIfChanged(abs, file.content);
    created.push(file.relative);
  }

  return { created, rewritten, skipped };
}

function starterWikiPage(page: StarterWikiPage): { relative: string; content: string } {
  const canonicalId = `wiki.${
    page.relative
      .replace(/^context\/wiki\//u, "")
      .replace(/\/index\.md$/u, "")
      .replace(/\.md$/u, "")
      .replaceAll(/[^a-z0-9]+/giu, "-")
      .replaceAll(/^-+|-+$/gu, "")
      .toLowerCase() || "index"
  }`;
  return {
    relative: page.relative,
    content: `---
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "${canonicalId}"
  title: "${page.title}"
  modality: ${page.modality}
  epistemic_status: ${page.status}
  visibility: project
  source_refs: []
  claims: []
  graph_refs:
    entities: []
    edges: []
  conflicts: []
  updated_by: context_init
---

# ${page.title}

## Summary

${page.summary}

## Source References

- no-source: generated starter page from \`agentplane context init\`; add source references before promotion.
`,
  };
}

async function ensureContextGitignore(root: string, parsed: ContextInitParsed): Promise<boolean> {
  const gitignorePath = path.join(root, ".gitignore");
  const wanted = new Set<string>(DEFAULT_GITIGNORE_ENTRIES);
  if (parsed.rawGitignore === "all") wanted.add("context/raw/");
  if (parsed.derivedGitignore === "all") wanted.add(".agentplane/context/derived/");

  const currentText = await readOptionalText(gitignorePath);
  const existing = await readGitignore(gitignorePath);
  for (const entry of wanted) {
    if (!existing.includes(entry)) existing.push(entry);
  }
  const normalized = normalizeGitignore(existing);
  const nextText = `${normalized.join("\n")}\n`;
  if (currentText.trimEnd() === nextText.trimEnd()) return false;
  await writeTextIfChanged(gitignorePath, nextText);
  return true;
}

function buildContextReadme(profile: ContextInitParsed["profile"]): string {
  return `# Context workspace

Profile: ${profile}

Use this directory as the human-readable context surface.

AgentPlane local context uses one adaptive llm-wiki contract:

- \`context/raw/**\` keeps source material.
- \`context/wiki/**\` keeps readable synthesis pages with AgentPlane frontmatter.
- \`.agentplane/context/derived/**\` keeps reproducible claims, graph rows, provenance, and reports.
- \`.agentplane/context/service/**\` keeps local caches only.

Agents should create wiki pages when a topic is reusable for future tasks, but keep atomic claims in
derived machine artifacts. Source references should be markdown links where possible.
`;
}

function buildWikiAgentsMarkdown(profile: ContextInitParsed["profile"]): string {
  return `---
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "wiki.agents"
  title: "Context wiki agent notes"
  modality: policy
  epistemic_status: sourced_claim
  visibility: project
  source_refs: []
  claims: []
  graph_refs:
    entities: []
    edges: []
  conflicts: []
  updated_by: context_init
---

# Context wiki agent notes

Profile: ${profile}

- Treat \`context/wiki/**\` as durable, source-backed project knowledge.
- Treat this wiki as adaptive: generate the page hierarchy from project evidence, while preserving
  stable frontmatter fields for future publication/synchronization.
- Wiki pages are context artifacts; atomic claims and graph edges remain machine-readable derived
  artifacts.
- Use page frontmatter with \`agentplane_context.schema_version\`, \`artifact_type\`,
  \`canonical_id\`, \`modality\`, \`epistemic_status\`, \`visibility\`, \`source_refs\`,
  \`claims\`, \`graph_refs\`, and \`conflicts\`.
- Analyze the base project, existing docs, task history, and raw sources before choosing a wiki structure.
- Choose the smallest wiki hierarchy that fits this project; do not force a universal concepts/entities/decisions/modules layout.
- Preserve and refine the chosen hierarchy after the first analysis; avoid reshaping it unless new evidence makes the old structure misleading.
- Keep different modalities explicit: factual_claim, observation, assumption, hypothesis, decision,
  policy, preference, requirement, risk, capability, definition, and deprecation.
- Decisions from task history should be written as ADR/evolution records with provenance and
  supersession metadata, not as probabilistic factual claims.
- If a glossary is useful, keep it as a thin index over existing wiki pages and graph entities, not as a competing source of truth.
- Prefer useful inline Markdown cross-links between related wiki pages and glossary entries,
  especially on first meaningful mentions of known concepts, entities, decisions, risks, or modules.
- When lookup gives high confidence that a source term matches an existing wiki page or graph
  entity, use the canonical term in prose and link it to the canonical page or section; record the
  source-local term as an alias when useful.
- Use \`agentplane context wiki new\`, \`agentplane context wiki lint\`,
  \`agentplane context wiki explain\`, \`agentplane context wiki link\`, and
  \`agentplane context wiki index\` when creating, linking, indexing, or reviewing wiki pages.
- Before writing new wiki/facts/graph data, search existing context and graph rows for matching
  entities and use canonical labels when an analyzed source mentions an already-described entity.
- If new evidence extends an existing entity, update the existing page or section and add sourced
  claims/provenance instead of creating a duplicate page.
- If a small object belongs inside a broader topic, describe it under a stable heading and link to
  that section from related pages.
- Update relevant \`index.md\` pages after adding, moving, or materially renaming wiki pages.
- When claims conflict, keep both claims, create a conflict candidate, and ask for review before
  promotion or overwrite.
- Keep raw inputs in \`context/raw/**\`; do not copy private raw sources into public wiki pages.
- Add source references for factual claims that come from raw files, task READMEs, ACRs, or code.
- Use \`agentplane context verify-task <task-id>\` before closing context assimilation work.

## Source References

- no-source: generated policy notes from \`agentplane context init\`; add source references before promotion.
`;
}

function buildCapabilitiesReadme(profile: ContextInitParsed["profile"]): string {
  return `# Context capabilities\n\nProfile: ${profile}\n\nReusable artefacts for prompts, playbooks, templates, checklists and rubrics.\n`;
}

function buildContextManifestYaml(
  projectName: string,
  profile: ContextInitParsed["profile"],
  now: string,
): string {
  return `version: 1
project:
  name: "${projectName.replaceAll('"', String.raw`\"`)}"
  root: "."
workspace:
  namespace: local.project
  mode: ${profile}
  layout_strategy: adaptive
  page_granularity: topic_artifact
  claim_granularity: atomic
  root: context
  raw: context/raw
  wiki: context/wiki
  capabilities: context/capabilities
control:
  root: .agentplane/context
  policies:
    rules: .agentplane/context/policies/context.rules.md
    wiki_rules: .agentplane/context/policies/wiki.rules.md
    capability_rules: .agentplane/context/policies/capability.rules.md
    redaction: .agentplane/context/policies/redaction.rules.yaml
    sync: .agentplane/context/policies/sync.rules.yaml
lock:
  path: .agentplane/context/manifest.lock.json
derived:
  root: .agentplane/context/derived
  facts: .agentplane/context/derived/facts/facts.jsonl
  graph:
    entities: .agentplane/context/derived/graph/entities.jsonl
    edges: .agentplane/context/derived/graph/edges.jsonl
    provenance_edges: .agentplane/context/derived/graph/provenance_edges.jsonl
  capabilities:
    registry: .agentplane/context/derived/capabilities/capabilities.jsonl
    edges: .agentplane/context/derived/capabilities/capability_edges.jsonl
  reports:
    events: .agentplane/context/derived/reports/assimilation-events.jsonl
wiki:
  frontmatter_required: true
  source_refs_as_markdown_links: true
  cross_links_required: true
  modalities:
    - factual_claim
    - observation
    - assumption
    - hypothesis
    - decision
    - policy
    - preference
    - requirement
    - risk
    - capability
    - definition
    - deprecation
agentplane:
  tasks_root: .agentplane/tasks
service:
  root: .agentplane/context/service
  index:
    type: sqlite
    path: .agentplane/cache.sqlite
    fts: true
    cache_task_readmes: true
    cache_acr_summaries: true
generated_at: "${now}"
remotes: []
`;
}

function buildPolicyMarkdown(name: string): string {
  return `# ${name}\n\n- Keep raw sources in \`context/raw\`.\n- Keep durable machine artifacts under \`.agentplane/context/derived\`.\n- Keep service caches under \`.agentplane/context/service\`.\n`;
}

function buildRedactionRulesYaml(): string {
  return `mode: explicit\nallowlist: []\ndenylist: []\n`;
}

function buildSyncRulesYaml(): string {
  return `mode: manual\nallow_external: false\n`;
}

async function readExisting(filePath: string): Promise<string | null> {
  try {
    return await readFile(filePath, "utf8");
  } catch (err) {
    if ((err as { code?: string } | null)?.code === "ENOENT") return null;
    throw err;
  }
}

async function readGitignore(gitignorePath: string): Promise<string[]> {
  const text = await readOptionalText(gitignorePath);
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));
}

async function readOptionalText(filePath: string): Promise<string> {
  try {
    return await readFile(filePath, "utf8");
  } catch (err) {
    if ((err as { code?: string } | null)?.code === "ENOENT") return "";
    throw err;
  }
}

function normalizeGitignore(lines: string[]): string[] {
  const uniq = new Map<string, true>();
  for (const line of lines) uniq.set(line, true);
  return ["# context workspace", ...uniq.keys()].sort();
}
