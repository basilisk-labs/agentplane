import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

import { ROOT, defineScript, runScriptMain } from "./lib/script-runtime.mjs";

const DOCS_DIR = path.join(ROOT, "docs");
const DOCS_INDEX_PATH = path.join(DOCS_DIR, "index.mdx");
const SIDEBARS_PATH = path.join(ROOT, "website", "sidebars.ts");

const NAV_DOC_ROOTS = new Set([
  "user",
  "workflow-guides",
  "recipes",
  "developer",
  "help",
  "reference",
  "archive",
]);
const INDEX_DOC_ROOTS = new Set([...NAV_DOC_ROOTS, "releases"]);
const INDEX_ROUTE_ALIASES = new Set(["workflow-guides", "recipes", "releases"]);

const staleReferenceRules = [
  {
    name: "misspelled harness engineering route",
    pattern: /harness-engeneering|engeneering/gi,
  },
  {
    name: "retired schema ADR route",
    pattern: /schema-runtime-contract-adr/gi,
  },
  {
    name: "archived framework refactor route",
    pattern: /developer\/framework-refactor-program/gi,
  },
  {
    name: "archived CLI bug ledger route",
    pattern: /developer\/cli-bug-ledger-v0-3-x/gi,
  },
  {
    name: "removed context resolver path",
    pattern:
      /packages\/agentplane\/src\/usecases\/context\/resolve-context\.ts|usecases\/context\/resolve-context\.ts/gi,
  },
  {
    name: "removed core project file path",
    pattern: /packages\/core\/src\/project\.ts/gi,
  },
  {
    name: "removed core config file path",
    pattern: /packages\/core\/src\/config\.ts/gi,
  },
  {
    name: "removed core task flat-file path",
    pattern: /packages\/core\/src\/task-/gi,
  },
];

const repoPathPrefixes = [
  ".agentplane/",
  ".github/",
  "AGENTS.md",
  "README.md",
  "DESIGN.md",
  "docs/",
  "eslint.config.cjs",
  "package.json",
  "packages/",
  "scripts/",
  "tsconfig.json",
  "vitest.workspace.ts",
  "website/",
];

const projectLocalPrefixes = [
  ".agentplane/.release/",
  ".agentplane/.upgrade/",
  ".agentplane/backends/",
  ".agentplane/blueprint-catalog/",
  ".agentplane/blueprints/",
  ".agentplane/cache/",
  ".agentplane/generated/",
  ".agentplane/handoff/",
  ".agentplane/recipes/",
  ".agentplane/tasks/",
  ".agentplane/tmp/",
  ".agentplane/workflows/",
  ".agentplane/worktrees/",
];

const generatedRepoPathPatterns = [
  /^packages\/[^/]+\/dist\//,
  /^\.agentplane\/(?:index|tasks)\.md$/,
  /^\.agentplane\/by-(?:owner|status|tag)\//,
];

const filePathExtensionPattern =
  /\.(cjs|css|cts|html|js|json|md|mdx|mjs|mts|sh|toml|ts|tsx|yaml|yml)$/i;

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function stripDocExtension(value) {
  return value.replace(/\.(md|mdx)$/i, "");
}

function formatList(values) {
  return values.map((value) => `- ${value}`).join("\n");
}

function assertEmpty(values, message) {
  if (values.length > 0) {
    throw new Error(`${message}\n${formatList(values)}`);
  }
}

async function pathExists(fullPath) {
  try {
    await stat(fullPath);
    return true;
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

async function isDirectory(fullPath) {
  try {
    const stats = await stat(fullPath);
    return stats.isDirectory();
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

async function walkMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkMarkdownFiles(fullPath)));
      continue;
    }
    if (/\.(md|mdx)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function docIdFromDocsPath(file) {
  const relative = toPosix(path.relative(DOCS_DIR, file));
  return stripDocExtension(relative);
}

function isGeneratedOrHistoricalDoc(file) {
  const relative = toPosix(path.relative(ROOT, file));
  return (
    relative.startsWith("docs/adr/") ||
    relative.startsWith("docs/archive/") ||
    relative.startsWith("docs/releases/")
  );
}

function isNavigableDoc(file) {
  if (isGeneratedOrHistoricalDoc(file)) {
    return false;
  }
  const id = docIdFromDocsPath(file);
  if (id === "README" || id === "index" || id.startsWith("adr/")) {
    return false;
  }
  const root = id.split("/")[0] ?? "";
  return NAV_DOC_ROOTS.has(root);
}

function extractSidebarDocIds(source) {
  const ids = new Set();
  let inItems = false;

  for (const line of source.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.startsWith("items:")) {
      inItems = true;
    }

    if (inItems) {
      for (const match of trimmed.matchAll(/"([^"]+)"/g)) {
        const id = match[1];
        const root = id.split("/")[0] ?? "";
        if (INDEX_DOC_ROOTS.has(root)) {
          ids.add(id);
        }
      }
    }

    if (inItems && trimmed.includes("]")) {
      inItems = false;
    }
  }

  return ids;
}

function normalizeIndexDocLink(destination) {
  let value = destination.trim();
  if (value.length === 0 || value.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(value)) {
    return null;
  }

  value = value.split(/[#?]/)[0] ?? "";
  value = value.replace(/^\/docs\//, "");
  value = value.replace(/^docs\//, "");
  value = value.replace(/^\.\//, "");
  value = stripDocExtension(value);

  const root = value.split("/")[0] ?? "";
  if (value === root && INDEX_ROUTE_ALIASES.has(value)) {
    return `${value}/index`;
  }
  return INDEX_DOC_ROOTS.has(root) ? value : null;
}

function extractIndexDocIds(source) {
  const ids = new Set();
  for (const match of source.matchAll(/\[[^\]]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const id = normalizeIndexDocLink(match[1]);
    if (id) {
      ids.add(id);
    }
  }
  return ids;
}

async function resolveDocIdFile(id) {
  const basePath = path.join(DOCS_DIR, ...id.split("/"));
  return (
    (await pathExists(`${basePath}.mdx`)) ||
    (await pathExists(`${basePath}.md`)) ||
    (await pathExists(path.join(basePath, "index.mdx"))) ||
    (await pathExists(path.join(basePath, "index.md")))
  );
}

async function assertDocsNavigationAligned() {
  const [indexSource, sidebarSource, docFiles] = await Promise.all([
    readFile(DOCS_INDEX_PATH, "utf8"),
    readFile(SIDEBARS_PATH, "utf8"),
    walkMarkdownFiles(DOCS_DIR),
  ]);

  const indexIds = extractIndexDocIds(indexSource);
  const sidebarIds = extractSidebarDocIds(sidebarSource);

  assertEmpty(
    [...indexIds].filter((id) => !sidebarIds.has(id)).toSorted(),
    "docs/index.mdx links are missing from website/sidebars.ts:",
  );

  assertEmpty(
    [...sidebarIds].filter((id) => !id.startsWith("releases/") && !indexIds.has(id)).toSorted(),
    "website/sidebars.ts doc IDs are missing from docs/index.mdx:",
  );

  const navigableDocIds = docFiles
    .filter((file) => isNavigableDoc(file))
    .map((file) => docIdFromDocsPath(file));
  assertEmpty(
    navigableDocIds.filter((id) => !sidebarIds.has(id)).toSorted(),
    "Navigable docs are not present in website/sidebars.ts:",
  );

  const deadSidebarIds = [];
  for (const id of sidebarIds) {
    if (!(await resolveDocIdFile(id))) {
      deadSidebarIds.push(id);
    }
  }
  assertEmpty(deadSidebarIds.toSorted(), "website/sidebars.ts points at missing docs:");
}

async function assertNoStaleCurrentDocReferences() {
  const allFiles = await walkMarkdownFiles(DOCS_DIR);
  const files = allFiles.filter((file) => !isGeneratedOrHistoricalDoc(file));
  const violations = [];

  for (const file of files) {
    const source = await readFile(file, "utf8");
    const relative = toPosix(path.relative(ROOT, file));
    for (const rule of staleReferenceRules) {
      for (const match of source.matchAll(rule.pattern)) {
        violations.push(`${relative}: ${rule.name}: ${match[0]}`);
      }
    }
  }

  assertEmpty(violations, "Current docs contain stale legacy references:");
}

function cleanInlineCodeToken(raw) {
  let value = raw.trim();
  if (value.includes("\n") || /\s/.test(value)) return null;
  if (/[<>{}[\]$*]/.test(value) || value.includes("...") || value.includes("X.Y.Z")) {
    return null;
  }
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return null;

  value = value.replaceAll(/^['"`]+|['"`]+$/g, "");
  value = value.replaceAll(/[),.;]+$/g, "");
  value = value.replace(/^\.?\//, "");
  value = value.replace(/:\d+(?::\d+)?$/, "");
  value = value.split(/[#?]/)[0] ?? "";

  if (!repoPathPrefixes.some((prefix) => value === prefix || value.startsWith(prefix))) {
    return null;
  }
  if (projectLocalPrefixes.some((prefix) => value.startsWith(prefix))) {
    return null;
  }
  if (generatedRepoPathPatterns.some((pattern) => pattern.test(value))) {
    return null;
  }
  if (!filePathExtensionPattern.test(value) && !value.endsWith("/")) {
    return null;
  }

  return value;
}

async function repoPathReferenceExists(repoPath) {
  const fullPath = path.join(ROOT, ...repoPath.split("/"));
  if (!fullPath.startsWith(ROOT)) {
    return false;
  }
  if (repoPath.endsWith("/")) {
    return isDirectory(fullPath);
  }
  return pathExists(fullPath);
}

async function assertRepoPathReferencesExist() {
  const allFiles = await walkMarkdownFiles(DOCS_DIR);
  const files = allFiles.filter((file) => !isGeneratedOrHistoricalDoc(file));
  const violations = [];

  for (const file of files) {
    const source = await readFile(file, "utf8");
    const relative = toPosix(path.relative(ROOT, file));
    for (const match of source.matchAll(/`([^`\n]+)`/g)) {
      const repoPath = cleanInlineCodeToken(match[1]);
      if (!repoPath) continue;
      if (!(await repoPathReferenceExists(repoPath))) {
        violations.push(`${relative}: \`${repoPath}\``);
      }
    }
  }

  assertEmpty(violations, "Current docs reference missing repository paths:");
}

const main = defineScript({
  name: "check-docs-ia",
  async run() {
    await assertDocsNavigationAligned();
    await assertNoStaleCurrentDocReferences();
    await assertRepoPathReferencesExist();
    process.stdout.write(
      "ok: docs IA, sidebar coverage, and current path references are aligned\n",
    );
  },
});

runScriptMain(main);
