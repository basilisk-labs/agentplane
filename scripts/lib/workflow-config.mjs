import { readFile } from "node:fs/promises";
import path from "node:path";

function parseYamlStringScalar(value) {
  if (!value) return null;
  if (value.startsWith('"') && value.endsWith('"')) {
    return value
      .slice(1, -1)
      .replaceAll(String.raw`\"`, '"')
      .trim();
  }
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replaceAll("''", "'").trim();
  }
  return value.split(" #", 1)[0]?.trim() ?? null;
}

function stringValue(value) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export function parseWorkflowBranchConfig(text) {
  const normalized = String(text ?? "")
    .replaceAll("\r\n", "\n")
    .replaceAll("\r", "\n");
  if (!normalized.startsWith("---\n")) return {};
  const end = normalized.indexOf("\n---", 4);
  if (end === -1) return {};
  const out = {};
  let inBranch = false;
  for (const line of normalized.slice(4, end).split("\n")) {
    if (line === "branch:") {
      inBranch = true;
      continue;
    }
    if (!inBranch) continue;
    if (line.length > 0 && !line.startsWith("  ")) break;
    const trimmed = line.trim();
    const separator = trimmed.indexOf(":");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    if (key !== "task_prefix" && key !== "task_close_prefix") continue;
    out[key] = parseYamlStringScalar(trimmed.slice(separator + 1).trim());
  }
  return out;
}

export async function readConfiguredBranchPrefixes(cwd = process.cwd()) {
  try {
    const workflow = await readFile(path.join(cwd, ".agentplane", "WORKFLOW.md"), "utf8");
    const branch = parseWorkflowBranchConfig(workflow);
    return {
      taskBranchPrefix: stringValue(branch.task_prefix),
      taskCloseBranchPrefix: stringValue(branch.task_close_prefix),
    };
  } catch {
    return {};
  }
}

export async function readConfiguredTaskCloseBranchPrefix(cwd = process.cwd()) {
  const branch = await readConfiguredBranchPrefixes(cwd);
  return branch.taskCloseBranchPrefix ?? null;
}
