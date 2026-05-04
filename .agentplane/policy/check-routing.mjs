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

function readLines(filePath) {
  return fs.readFileSync(filePath, "utf8").split(/\r?\n/).length;
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

function remediationForRoutingError(error) {
  if (error.includes("exceeds policy budget")) {
    return {
      code: "POLICY_ROUTING_BUDGET",
      why: "Large gateway or policy modules make agent startup context harder to route deterministically.",
      fix: "Move scenario-specific detail into the correct canonical module or shorten duplicate rule text.",
      safeCommand: "node .agentplane/policy/check-routing.mjs",
      stopCondition:
        "Stop if the size reduction would remove a hard constraint or source-of-truth rule.",
    };
  }
  if (error.includes("path does not exist") || error.includes("Missing canonical")) {
    return {
      code: "POLICY_ROUTING_MISSING_PATH",
      why: "AGENTS.md references a policy file that agents cannot load.",
      fix: "Restore the referenced file or update the gateway reference to the canonical existing path.",
      safeCommand: "agentplane doctor",
      stopCondition: "Stop if the missing file is a policy module deleted by another active task.",
    };
  }
  return {
    code: "POLICY_ROUTING_FAILED",
    why: "The policy gateway no longer matches the deterministic load-rule contract.",
    fix: "Repair AGENTS.md load rules, canonical docs, examples, or policy module layout.",
    safeCommand: "node .agentplane/policy/check-routing.mjs",
    stopCondition: "Stop if the repair changes workflow mode, approval gates, or policy ownership.",
  };
}

function renderRemediation(error) {
  const r = remediationForRoutingError(error);
  return [
    `  Code: ${r.code}`,
    `  Why: ${r.why}`,
    `  Fix: ${r.fix}`,
    `  Safe command: ${r.safeCommand}`,
    `  Stop condition: ${r.stopCondition}`,
  ].join("\n");
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
  const codexPath = path.join(repoRoot, "AGENTS.md");
  const claudePath = path.join(repoRoot, "CLAUDE.md");
  const hasCodex = fs.existsSync(codexPath);
  const hasClaude = fs.existsSync(claudePath);
  let gatewayPath = codexPath;
  if (!hasCodex && hasClaude) gatewayPath = claudePath;
  const gatewayFileName = path.basename(gatewayPath);
  if (!hasCodex && !hasClaude) {
    throw new Error(
      "Policy routing check failed:\n- Missing policy gateway file: AGENTS.md or CLAUDE.md",
    );
  }
  const text = fs.readFileSync(gatewayPath, "utf8");
  const errors = [];

  const lineCount = text.split(/\r?\n/).length;
  if (lineCount > 250) {
    errors.push(`${gatewayFileName} exceeds policy budget (<=250 lines): got ${lineCount}`);
  }

  const requiredHeadings = [
    "# PURPOSE",
    "## PROJECT",
    "## SOURCES OF TRUTH",
    "## COMMANDS",
    "## TOOLING",
    "## LOAD RULES",
    "## MUST / MUST NOT",
    "## CORE DOD",
    "## SIZE BUDGET",
    "## CANONICAL DOCS",
    "## REFERENCE EXAMPLES",
  ];
  for (const heading of requiredHeadings) {
    if (!text.includes(heading)) {
      errors.push(`Missing required heading: ${heading}`);
    }
  }

  if (!text.includes("MUST NOT load unrelated policy modules")) {
    errors.push("Missing strict routing guard: MUST NOT load unrelated policy modules");
  }
  if (!text.includes("MUST NOT use wildcard policy paths")) {
    errors.push("Missing strict routing guard: MUST NOT use wildcard policy paths");
  }

  if (/->\s*LOAD\s+`/i.test(text) || /-\s*IF\s+.*->/i.test(text)) {
    errors.push("Legacy IF/LOAD routing syntax is forbidden; use @path imports in LOAD RULES");
  }

  const importPaths = collectPaths(text, /`@([^`\s]+)`/g);
  const docPaths = collectPaths(text, /-\s*DOC\s+`([^`]+)`/g);
  const examplePaths = collectPaths(text, /-\s*EXAMPLE\s+`([^`]+)`/g);
  const wildcardPolicyPaths = [...importPaths, ...docPaths, ...examplePaths].filter((p) =>
    p.includes("*"),
  );
  for (const wildcard of wildcardPolicyPaths) {
    errors.push(`Wildcard policy path is not allowed: ${wildcard}`);
  }

  if (importPaths.length < 6) {
    errors.push(`Expected at least 6 @import paths, got ${importPaths.length}`);
  }
  if (docPaths.length < 6) {
    errors.push(`Expected at least 6 DOC paths, got ${docPaths.length}`);
  }
  if (examplePaths.length < 3) {
    errors.push(`Expected at least 3 EXAMPLE paths, got ${examplePaths.length}`);
  }

  const incidentsPath = ".agentplane/policy/incidents.md";
  if (!docPaths.includes(incidentsPath)) {
    errors.push(`Missing canonical DOC path: ${incidentsPath}`);
  }
  if (!importPaths.includes(incidentsPath)) {
    errors.push(`Missing @import rule for incidents path: ${incidentsPath}`);
  }

  assertFilesExist(repoRoot, [...new Set(importPaths)], "IMPORT", errors);
  assertFilesExist(repoRoot, [...new Set(docPaths)], "DOC", errors);
  assertFilesExist(repoRoot, [...new Set(examplePaths)], "EXAMPLE", errors);

  const policyDir = path.join(repoRoot, ".agentplane", "policy");
  const policyFiles = listFilesRecursive(policyDir);
  const markdownModules = policyFiles.filter((relPath) => relPath.endsWith(".md"));

  for (const relPath of markdownModules) {
    const abs = path.join(policyDir, relPath);
    const moduleLines = readLines(abs);
    if (moduleLines > 100) {
      errors.push(
        `Policy module exceeds budget (<=100 lines): .agentplane/policy/${relPath} (${moduleLines})`,
      );
    }
  }

  const importedMarkdown = [...new Set(importPaths.filter((p) => p.endsWith(".md")))];
  let worstCaseLoadedLines = 0;
  for (const relPath of importedMarkdown) {
    const abs = path.join(repoRoot, relPath);
    if (!fs.existsSync(abs)) continue;
    worstCaseLoadedLines += readLines(abs);
  }
  if (worstCaseLoadedLines > 600) {
    errors.push(
      `Worst-case loaded policy graph exceeds budget (<=600 lines): ${worstCaseLoadedLines}`,
    );
  }

  const incidentFiles = policyFiles.filter((relPath) => /incident/i.test(path.basename(relPath)));
  if (incidentFiles.length !== 1 || incidentFiles[0] !== "incidents.md") {
    errors.push(
      `Policy incidents must use a single file (.agentplane/policy/incidents.md). Found: ${incidentFiles.join(", ") || "none"}`,
    );
  }

  if (errors.length > 0) {
    throw new Error(
      `Policy routing check failed:\n${errors
        .map((error) => `- ${error}\n${renderRemediation(error)}`)
        .join("\n")}`,
    );
  }

  process.stdout.write("policy routing OK\n");
}

main();
