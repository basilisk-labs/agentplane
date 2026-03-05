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

function listFilesRecursive(dirPath, relPrefix = "") {
  if (!fs.existsSync(dirPath)) return [];
  const entries = fs.readdirSync(dirPath).toSorted((a, b) => a.localeCompare(b));
  const out = [];
  for (const entry of entries) {
    if (entry.startsWith(".")) continue;
    const abs = path.join(dirPath, entry);
    const rel = relPrefix ? `${relPrefix}/${entry}` : entry;
    const st = fs.statSync(abs);
    if (st.isDirectory()) {
      out.push(...listFilesRecursive(abs, rel));
      continue;
    }
    if (st.isFile()) out.push(rel);
  }
  return out;
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

  const wildcardInlineCode = collectPaths(text, /`([^`]*\*[^`]*)`/g);
  for (const wildcard of wildcardInlineCode) {
    errors.push(`Wildcard paths are not allowed in AGENTS.md: ${wildcard}`);
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

  const incidentsPath = ".agentplane/policy/incidents.md";
  if (!docPaths.includes(incidentsPath)) {
    errors.push(`Missing canonical DOC path: ${incidentsPath}`);
  }
  if (!loadPaths.includes(incidentsPath)) {
    errors.push(`Missing LOAD rule for incidents path: ${incidentsPath}`);
  }

  assertFilesExist(repoRoot, [...new Set(loadPaths)], "LOAD", errors);
  assertFilesExist(repoRoot, [...new Set(docPaths)], "DOC", errors);
  assertFilesExist(repoRoot, [...new Set(examplePaths)], "EXAMPLE", errors);

  const policyDir = path.join(repoRoot, ".agentplane", "policy");
  const incidentFiles = listFilesRecursive(policyDir).filter((relPath) =>
    /incident/i.test(path.basename(relPath)),
  );
  if (incidentFiles.length !== 1 || incidentFiles[0] !== "incidents.md") {
    errors.push(
      `Policy incidents must use a single file (.agentplane/policy/incidents.md). Found: ${incidentFiles.join(", ") || "none"}`,
    );
  }

  if (errors.length > 0) {
    throw new Error(`Policy routing check failed:\n- ${errors.join("\n- ")}`);
  }

  process.stdout.write("policy routing OK\n");
}

main();
