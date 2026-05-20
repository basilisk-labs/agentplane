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
import {
  assertProfileSwitchIsExplicit,
  POLICY_FILES,
  shouldRewriteExistingContextFile,
} from "./init-profile-switch.js";
import { buildContextManifestYaml } from "./init-manifest.js";
import { starterWikiPageFiles, wikiFrontmatter } from "./init-wiki.js";
import { buildWikiPolicyMarkdown } from "./init-wiki-policy.js";
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
];

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
      content: buildWikiPolicyMarkdown(),
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
    parsed.profile === "research" ||
    parsed.profile === "maximum-assimilation"
  ) {
    files.push(
      starterWikiPageFiles().find((file) => file.relative === "context/wiki/index.md") ?? {
        relative: "context/wiki/index.md",
        content: `${wikiFrontmatter("wiki.index", "Context wiki", "definition")}\n\n# Context wiki\n`,
      },
    );
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

  await assertProfileSwitchIsExplicit({ root, parsed, readExisting });

  for (const file of files) {
    const abs = path.join(root, file.relative);
    const exists = await readExisting(abs);
    if (exists !== null) {
      if (shouldRewriteExistingContextFile(file, parsed)) {
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
  const maximumAssimilation =
    profile === "maximum-assimilation"
      ? `
Maximum-assimilation mode adds a stricter wiki maintenance contract:

- Preserve all significant source meaning in wiki, facts, graph, glossary, and coverage
  artifacts so maintained context remains useful even if \`context/raw/**\` is later removed.
- Keep original source identity in a source registry with \`source_id\`, original path,
  \`sha256:\` hash, content type, line count, ingest time, and availability state.
- Use line-addressed source refs as provenance pointers, not as retained content. If raw files are
  missing, refs may be non-dereferenceable while wiki/fact/graph artifacts stay self-contained.
- Extract entities, aliases, relations, decisions, requirements, risks, workflows, and conflicts
  before writing narrative articles.
- Choose the wiki structure from source content; do not create the default
  concepts/entities/decisions/modules/contradictions/reports scaffold unless source analysis
  justifies it. Record the topology decision before creating page families.
- Maintain a canonical glossary as a navigation/alias layer over wiki pages and graph entities, then
  use glossary canonical terms in synthesized prose while preserving source-local terms as aliases.
- Use Obsidian-compatible \`[[Page Title]]\` links for semantic wiki graph links; keep Markdown
  links for source refs, files, and external URLs.
- Treat coverage gaps, unresolved entity identity, sensitive-source leakage risk, and missing line refs
  as blockers or explicit approval-required findings.
- Require EVALUATOR review of topology, granularity, wikilinks, coverage, glossary safety,
  raw-deletion resilience, and private leakage risk before finish.
`
      : "";
  return `# Context workspace

Profile: ${profile}

Use this directory as the human-readable context surface.

AgentPlane local context uses one adaptive llm-wiki contract:

- \`context/raw/**\` keeps source material.
- \`context/wiki/**\` keeps readable synthesis pages with AgentPlane frontmatter.
- \`.agentplane/context/derived/**\` keeps reproducible claims, graph rows, provenance, and reports.
- \`.agentplane/context/service/**\` keeps local caches only.

Agents should create wiki pages when a topic is reusable for future tasks, but keep atomic claims in
derived machine artifacts. \`context init\` creates only \`context/raw/.gitkeep\`,
\`context/wiki/AGENTS.md\`, and \`context/wiki/index.md\`; users own any hierarchy below
\`context/raw/**\`. Source references should preserve user-created raw paths where possible.
${maximumAssimilation}
`;
}

function buildWikiAgentsMarkdown(profile: ContextInitParsed["profile"]): string {
  const maximumAssimilation =
    profile === "maximum-assimilation"
      ? `
## Maximum assimilation mode

- Use the \`context.maximum_assimilation\` blueprint for new context assimilation tasks.
- Goal: after assimilation, the maintained wiki and derived artifacts preserve all significant
  source meaning without relying on raw files for semantic recall.
- Keep original hashes in the source-set lock and cite source content with concrete line refs such as
  \`context/raw/<user-path>/note.md#lines=12-24\`; treat those refs as audit provenance, not as the
  stored meaning.
- First pass: build or update canonical entities, glossary aliases, relation candidates, conflict
  candidates, and coverage notes.
- Topology pass: choose wiki structure from source content; do not mechanically create
  \`concepts/\`, \`entities/\`, \`decisions/\`, \`modules/\`, \`contradictions/\`, or \`reports/\`.
- Record a topology decision before page-family creation. It must classify the source shape (book/corpus, codebase, task history, product docs, research notes, ops logs, or another named shape), name canonical page families, justify page-vs-heading granularity, map source-local terms to canonical labels or aliases, and keep ambiguous identities as open questions.
- Second pass: synthesize granular wiki articles from that graph/glossary layer; use canonical
  glossary terms in prose and preserve source-local wording as aliases or evidence details.
- Create separate pages for reusable entities, concepts, decisions, requirements, risks, workflows,
  and modules; use stable headings for smaller objects inside broader pages.
- Use Obsidian-compatible \`[[Page Title]]\` or \`[[Page Title#Section]]\` links for semantic wiki
  graph links; keep Markdown links for source refs, files, and external URLs.
- Record extraction coverage: covered source spans, intentionally omitted boilerplate, redacted
  spans, unresolved conflicts, and open questions.
- Record EVALUATOR review for topology, granularity, wikilinks, line refs, glossary safety,
  coverage gaps, raw-deletion resilience, and private leakage risk before finish.
- If a raw source is missing later, keep its source registry entry with availability state
  \`missing\`; the wiki, facts, graph, glossary, and coverage artifacts must still carry the
  assimilated meaning.
- Do not copy secrets into public wiki pages. Redact sensitive source spans before publication.
`
      : "";
  return `${wikiFrontmatter("wiki.agents", "Context wiki agent notes", "policy")}

# Context wiki agent notes

Profile: ${profile}

- Treat \`context/wiki/**\` as durable, source-backed project knowledge with stable AgentPlane frontmatter.
- Treat \`.agentplane/context/agentplane.context.yaml\` as the machine-readable context contract and \`.agentplane/context/policies/wiki.rules.md\` as the human-readable wiki policy.
- Analyze the base project, existing docs, task history, and raw sources before choosing a wiki structure.
- Choose the smallest wiki hierarchy that fits this project; do not force a universal concepts/entities/decisions/modules layout.
- Keep this initialized wiki minimal until first ingest; project-specific folders should appear from source-backed assimilation, not from empty scaffolding.
- Preserve modality, source refs, cross-links, glossary aliases, and graph alignment when updating pages.
- Write synthesized wiki prose in English by default; preserve source-language terms only for quotes, titles, proper names, aliases, paths, and code identifiers.
- Prefer updating existing canonical pages over creating duplicates; describe small objects under stable headings when that is clearer.
- Use \`agentplane context wiki new\`, \`agentplane context wiki lint\`, \`agentplane context wiki explain\`, \`agentplane context wiki link\`, and \`agentplane context wiki index\`.
- When claims conflict, keep both claims, create a conflict candidate, and ask for review before promotion or overwrite.
- Keep raw inputs in \`context/raw/**\`; preserve the user-created hierarchy when citing sources.
- Add source references for factual claims and run \`agentplane context verify-task <task-id>\` before closing context assimilation work.
${maximumAssimilation}

## Source References

- no-source: generated policy notes from \`agentplane context init\`; add source references before promotion.
`;
}

function buildCapabilitiesReadme(profile: ContextInitParsed["profile"]): string {
  return `# Context capabilities\n\nProfile: ${profile}\n\nReusable artefacts for prompts, playbooks, templates, checklists and rubrics.\n`;
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
