import { readFile } from "node:fs/promises";
import path from "node:path";

import { infoMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged, writeTextIfChanged } from "../../shared/write-if-changed.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

import type { ContextInitParsed } from "./context.spec.js";

const DEFAULT_GITIGNORE_ENTRIES = [
  ".agentplane/context/service/",
  ".agentplane/context/service/local.sqlite",
  ".agentplane/context/service/local.sqlite-wal",
  ".agentplane/context/service/local.sqlite-shm",
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
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const root = ctx.resolvedProject.gitRoot;
    const report = await createContextWorkspace(root, opts.parsed);
    const wroteGitignore = await ensureContextGitignore(root, opts.parsed);

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
    if (report.created.length + report.rewritten.length === 0 && report.skipped.length > 0) {
      process.stdout.write(infoMessage("context already initialized") + "\n");
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw new CliError({
      exitCode: 3,
      code: "E_RUNTIME",
      message: `context init failed: ${(err as Error).message}`,
    });
  }
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
  const files: Array<{ relative: string; content: string; policy?: boolean }> = [
    { relative: "context/README.md", content: buildContextReadme(parsed.profile) },
    { relative: "context/raw/.gitkeep", content: "" },
    { relative: "context/raw/private/.gitkeep", content: "" },
    { relative: "context/wiki/.gitkeep", content: "" },
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
    { relative: ".agentplane/context/service/cache/.gitkeep", content: "" },
    { relative: ".agentplane/context/service/embeddings/.gitkeep", content: "" },
    { relative: ".agentplane/context/service/remotes/.gitkeep", content: "" },
  ];

  if (parsed.profile === "wiki" || parsed.profile === "codebase" || parsed.profile === "research") {
    files.push(
      { relative: "context/raw/specs/.gitkeep", content: "" },
      { relative: "context/raw/research/.gitkeep", content: "" },
      { relative: "context/wiki/index.md", content: "# Context wiki\n" },
      { relative: "context/wiki/concepts/index.md", content: "# Concepts\n" },
      { relative: "context/wiki/entities/index.md", content: "# Entities\n" },
      { relative: "context/wiki/decisions/index.md", content: "# Decisions\n" },
      { relative: "context/wiki/modules/index.md", content: "# Modules\n" },
      { relative: "context/wiki/contradictions/index.md", content: "# Contradictions\n" },
      { relative: "context/wiki/reports/index.md", content: "# Reports\n" },
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

async function ensureContextGitignore(root: string, parsed: ContextInitParsed): Promise<boolean> {
  const gitignorePath = path.join(root, ".gitignore");
  const wanted = new Set<string>(DEFAULT_GITIGNORE_ENTRIES);
  if (parsed.rawGitignore === "all") wanted.add("context/raw/");
  if (parsed.derivedGitignore === "all") wanted.add(".agentplane/context/derived/");

  const existing = await readGitignore(gitignorePath);
  const before = existing.length;
  for (const entry of wanted) {
    if (!existing.includes(entry)) existing.push(entry);
  }
  const normalized = normalizeGitignore(existing);
  if (normalized.length === before) return false;
  await writeTextIfChanged(gitignorePath, `${normalized.join("\n")}\n`);
  return true;
}

function buildContextReadme(profile: ContextInitParsed["profile"]): string {
  return `# Context workspace\n\nProfile: ${profile}\n\nUse this directory as the human-readable context surface.\n`;
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
  name: "${projectName.replace(/"/g, '\\"')}"
  root: "."
workspace:
  namespace: local.project
  mode: ${profile}
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
agentplane:
  tasks_root: .agentplane/tasks
service:
  root: .agentplane/context/service
  index:
    type: sqlite
    path: .agentplane/context/service/local.sqlite
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
  try {
    const text = await readFile(gitignorePath, "utf8");
    return text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith("#"));
  } catch (err) {
    if ((err as { code?: string } | null)?.code === "ENOENT") return [];
    throw err;
  }
}

function normalizeGitignore(lines: string[]): string[] {
  const uniq = new Map<string, true>();
  for (const line of lines) uniq.set(line, true);
  return ["# context workspace", ...Array.from(uniq.keys())].sort();
}
