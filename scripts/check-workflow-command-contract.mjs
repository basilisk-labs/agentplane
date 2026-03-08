import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const WORKFLOWS_DIR = path.join(process.cwd(), ".github", "workflows");

const FORBIDDEN_PATTERNS = [
  { label: "inline bun test", pattern: /\bbun test\b/g },
  { label: "inline bunx vitest run", pattern: /\bbunx vitest run\b/g },
  { label: "inline vitest run", pattern: /(^|\s)vitest run\b/g },
];

async function listWorkflowFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listWorkflowFiles(fullPath)));
      continue;
    }
    if (entry.isFile() && /\.(?:yml|yaml)$/u.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files.toSorted();
}

function findLineNumber(text, index) {
  return text.slice(0, index).split("\n").length;
}

function humanPath(absolutePath) {
  return path.relative(process.cwd(), absolutePath).replaceAll("\\", "/");
}

function formatMatches(filePath, text) {
  const findings = [];
  for (const { label, pattern } of FORBIDDEN_PATTERNS) {
    for (const match of text.matchAll(pattern)) {
      const index = match.index ?? -1;
      if (index < 0) continue;
      findings.push({
        filePath,
        label,
        line: findLineNumber(text, index),
        snippet: match[0].trim(),
      });
    }
  }
  return findings;
}

async function main() {
  const workflowFiles = await listWorkflowFiles(WORKFLOWS_DIR);
  const findings = [];

  for (const filePath of workflowFiles) {
    const text = await readFile(filePath, "utf8");
    findings.push(...formatMatches(filePath, text));
  }

  if (findings.length === 0) {
    process.stdout.write("workflow command contract OK\n");
    return;
  }

  const lines = [
    "Workflow command contract violation: inline test runners were found in workflow YAML.",
    "Use canonical repository scripts (for example `bun run test:platform-critical`) instead of embedding test runner command lines.",
    "",
  ];

  for (const finding of findings) {
    lines.push(
      `- ${humanPath(finding.filePath)}:${finding.line} ${finding.label} -> ${finding.snippet}`,
    );
  }

  throw new Error(lines.join("\n"));
}

await main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
