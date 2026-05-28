/* eslint-disable @typescript-eslint/no-unused-vars, unicorn/no-array-sort */
import { readFile } from "node:fs/promises";
import path from "node:path";

import { infoMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";
import type { CommandContext } from "../shared/task-backend.js";

import type { ContextInitParsed } from "./context.spec.js";
import {
  assertContextBootstrapIndexClean,
  commitContextBootstrapIfChanged,
  loadOrBootstrapCommandContext,
} from "./context-init-bootstrap.js";
import {
  buildCapabilitiesReadme,
  buildContextReadme,
  buildPolicyMarkdown,
  buildRedactionRulesYaml,
  buildSyncRulesYaml,
  buildWikiAgentsMarkdown,
} from "./context-init-builders.js";
import {
  assertProfileSwitchIsExplicit,
  POLICY_FILES,
  shouldRewriteExistingContextFile,
} from "./init-profile-switch.js";
import { buildContextManifestYaml } from "./init-manifest.js";
import {
  ensureRootGatewayReferencesContextPolicy,
  renderContextPolicyMarkdown,
} from "./init-policy-gateway.js";
import { starterWikiPageFiles, wikiFrontmatter } from "./init-wiki.js";
import { buildWikiPolicyMarkdown } from "./init-wiki-policy.js";
import { cmdContextReindex } from "./reindex.js";

const DEFAULT_GITIGNORE_ENTRIES = [
  ".agentplane/cache.sqlite",
  ".agentplane/cache.sqlite-wal",
  ".agentplane/cache.sqlite-shm",
  ".agentplane/context/service/",
  ".agentplane/context/service/cache/",
  ".agentplane/context/service/embeddings/",
  ".agentplane/context/service/remotes/",
];

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
    const root = ctx.resolvedProject.gitRoot;
    await assertContextBootstrapIndexClean(root);
    const report = await createContextWorkspace(root, opts.parsed);
    const wroteGitignore = await ensureContextGitignore(root, opts.parsed);
    await cmdContextReindex({
      cwd: root,
      rootOverride: root,
      parsed: { includeTasks: false, includeRaw: true, reset: false },
    });
    const committedBootstrap = await commitContextBootstrapIfChanged(root, [
      ...report.created,
      ...report.rewritten,
      ...(wroteGitignore ? [".gitignore"] : []),
    ]);

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

async function createContextWorkspace(
  root: string,
  parsed: ContextInitParsed,
): Promise<InitReport> {
  const created: string[] = [];
  const rewritten: string[] = [];
  const skipped: string[] = [];
  const now = new Date().toISOString();
  const projectName = path.basename(root);
  const contextPolicyText = await renderContextPolicyMarkdown();
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
      relative: ".agentplane/policy/context.must.md",
      content: contextPolicyText,
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
  await ensureRootGatewayReferencesContextPolicy(root, { rewritten });

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
