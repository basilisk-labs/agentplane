import fs from "node:fs";
import path from "node:path";

function collectPaths(text, re) {
  const out = [];
  for (const match of text.matchAll(re)) {
    const value = String(match[1] ?? "").trim();
    if (value) out.push(value);
  }
  return out;
}

function isRepoRelative(p) {
  if (!p) return false;
  if (path.isAbsolute(p)) return false;
  if (p.startsWith("../") || p.includes("/../")) return false;
  return true;
}

function assertFilesExist(repoRoot, paths, label, errors) {
  for (const relPath of paths) {
    if (!isRepoRelative(relPath)) {
      errors.push(`${label} path is not repo-relative: ${relPath}`);
      continue;
    }
    const absPath = path.join(repoRoot, relPath);
    if (!fs.existsSync(absPath)) {
      errors.push(`${label} path does not exist: ${relPath}`);
    }
  }
}

function main() {
  const repoRoot = process.cwd();
  const agentsPath = path.join(repoRoot, "AGENTS.md");
  const text = fs.readFileSync(agentsPath, "utf8");
  const errors = [];

  const lineCount = text.split(/\r?\n/).length;
  if (lineCount > 250) {
    errors.push(`AGENTS.md exceeds policy budget (<=250 lines): got ${lineCount}`);
  }

  const requiredHeadings = [
    "# PURPOSE",
    "## SOURCES OF TRUTH",
    "## TOOLING",
    "## LOAD RULES",
    "## MUST / MUST NOT",
    "## CORE DOD",
    "## CANONICAL DOCS",
    "## REFERENCE EXAMPLES",
  ];
  for (const heading of requiredHeadings) {
    if (!text.includes(heading)) {
      errors.push(`Missing required heading: ${heading}`);
    }
  }

  if (!text.includes("MUST NOT load unrelated policy files")) {
    errors.push("Missing strict routing guard: MUST NOT load unrelated policy files");
  }

  const loadPaths = collectPaths(text, /->\s*LOAD\s+`([^`]+)`/g);
  const docPaths = collectPaths(text, /-\s*DOC\s+`([^`]+)`/g);
  const examplePaths = collectPaths(text, /-\s*EXAMPLE\s+`([^`]+)`/g);

  if (loadPaths.length < 5) {
    errors.push(`Expected at least 5 LOAD paths, got ${loadPaths.length}`);
  }
  if (docPaths.length < 5) {
    errors.push(`Expected at least 5 DOC paths, got ${docPaths.length}`);
  }
  if (examplePaths.length < 3) {
    errors.push(`Expected at least 3 EXAMPLE paths, got ${examplePaths.length}`);
  }

  assertFilesExist(repoRoot, [...new Set(loadPaths)], "LOAD", errors);
  assertFilesExist(repoRoot, [...new Set(docPaths)], "DOC", errors);
  assertFilesExist(repoRoot, [...new Set(examplePaths)], "EXAMPLE", errors);

  if (errors.length > 0) {
    throw new Error(`Policy routing check failed:\n- ${errors.join("\n- ")}`);
  }

  process.stdout.write("policy routing OK\n");
}

main();
