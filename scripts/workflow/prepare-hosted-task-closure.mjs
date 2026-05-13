import { readFile } from "node:fs/promises";
import path from "node:path";

function printHelp() {
  process.stdout.write(
    [
      "Usage: node scripts/prepare-hosted-task-closure.mjs --event-json <path> [--task-branch-prefix <prefix>]",
      "",
      "Build deterministic hosted branch_pr closure metadata from a merged GitHub pull_request event.",
      "",
      "Outputs JSON with:",
      "- actionable: whether the event should create/update a hosted closure PR",
      "- task_id: extracted task id from the PR branch",
      "- base_ref: target base branch",
      "- merge_sha: merge commit SHA",
      "- source_branch: original merged task branch",
      "- closure_branch: deterministic follow-up branch name",
      "- pr_title / pr_body: hosted closure PR metadata",
    ].join("\n"),
  );
}

function parseArgs(argv) {
  const args = { eventJson: null, taskBranchPrefix: "task" };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--help" || token === "-h") return { help: true };
    if (token === "--event-json") {
      const next = argv[index + 1];
      if (!next) throw new Error("Missing value after --event-json");
      args.eventJson = next;
      index += 1;
      continue;
    }
    if (token === "--task-branch-prefix") {
      const next = argv[index + 1];
      if (!next) throw new Error("Missing value after --task-branch-prefix");
      args.taskBranchPrefix = next;
      index += 1;
      continue;
    }
    throw new Error(`Unknown option: ${token}`);
  }
  if (!args.eventJson) throw new Error("Missing required option: --event-json");
  return args;
}

function parseTaskIdFromBranch(prefix, branch) {
  const normalized = branch.startsWith("refs/heads/") ? branch.slice("refs/heads/".length) : branch;
  if (!normalized.startsWith(`${prefix}/`)) return null;
  const rest = normalized.slice(prefix.length + 1);
  const taskId = rest.split("/", 1)[0];
  return taskId?.trim() || null;
}

function noAction(reason) {
  return { actionable: false, reason };
}

function shortSha(value) {
  return String(value || "")
    .trim()
    .slice(0, 12);
}

function normalizeOneLine(value, maxChars) {
  const trimmed = String(value ?? "")
    .trim()
    .replaceAll(/\s+/g, " ");
  if (!trimmed) return "";
  return trimmed.length > maxChars ? `${trimmed.slice(0, Math.max(1, maxChars - 3))}...` : trimmed;
}

function extractTaskSuffix(taskId) {
  const parts = String(taskId).trim().split("-");
  return parts.at(-1) || String(taskId).trim();
}

function titleFromSourcePullTitle(value, taskId) {
  const title = normalizeOneLine(value, 140);
  if (!title) return "Merged task";
  const patterns = [
    /^task:\s*(.+?)\s*\[[^\]]+\]$/iu,
    /^[^:]+:\s*(.+?)\s*\([A-Z0-9]{4,8}\)$/iu,
    /^[\p{Emoji_Presentation}\p{Extended_Pictographic}\s]*[A-Z0-9-]+\s+task:\s*(.+)$/iu,
  ];
  for (const pattern of patterns) {
    const match = pattern.exec(title);
    if (match?.[1]) return normalizeOneLine(match[1], 96);
  }
  return normalizeOneLine(title.replace(`[${taskId}]`, "").replace(`(${taskId})`, ""), 96);
}

function buildClosureMetadata(payload, prefix) {
  const pull = payload && typeof payload === "object" ? payload.pull_request : null;
  if (!pull || typeof pull !== "object") return noAction("event does not contain pull_request");
  if (pull.merged !== true) return noAction("pull_request is not merged");

  const head = pull.head && typeof pull.head === "object" ? pull.head : null;
  const base = pull.base && typeof pull.base === "object" ? pull.base : null;
  const sourceBranch = typeof head?.ref === "string" ? head.ref.trim() : "";
  const baseRef = typeof base?.ref === "string" ? base.ref.trim() : "";
  const mergeSha =
    typeof pull.merge_commit_sha === "string" && pull.merge_commit_sha.trim().length > 0
      ? pull.merge_commit_sha.trim()
      : "";
  const number = typeof pull.number === "number" ? pull.number : null;
  if (!sourceBranch || !mergeSha || !number)
    return noAction("merged pull_request is missing branch or merge SHA");

  const taskId = parseTaskIdFromBranch(prefix, sourceBranch);
  if (!taskId) return noAction(`source branch is not a ${prefix}/<task-id>/... task branch`);

  const mergeShort = shortSha(mergeSha);
  const closureBranch = `task-close/${taskId}/${mergeShort}`;
  const sourceTitle = titleFromSourcePullTitle(pull.title, taskId);
  const prTitle = `🧩 ${extractTaskSuffix(taskId)} task-close: ${sourceTitle} [${taskId}]`;
  const prBody = [
    `Closes task \`${taskId}\` after merged task PR #${number}.`,
    "",
    "## Source",
    "",
    `- Task: \`${taskId}\``,
    `- Source PR: #${number}`,
    `- Source branch: \`${sourceBranch}\``,
    `- Merge SHA: \`${mergeSha}\``,
    "",
    "## Scope",
    "",
    "This PR contains only tracked task artifacts produced by the hosted branch_pr closure flow.",
  ].join("\n");
  return {
    actionable: true,
    task_id: taskId,
    base_ref: baseRef || "main",
    merge_sha: mergeSha,
    source_branch: sourceBranch,
    closure_branch: closureBranch,
    pr_number: number,
    pr_title: prTitle,
    pr_body: prBody,
  };
}

async function main() {
  const parsed = parseArgs(process.argv.slice(2));
  if (parsed.help) {
    printHelp();
    return;
  }

  const raw = await readFile(path.resolve(parsed.eventJson), "utf8");
  const payload = JSON.parse(raw);
  process.stdout.write(
    `${JSON.stringify(buildClosureMetadata(payload, parsed.taskBranchPrefix), null, 2)}\n`,
  );
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  throw error;
});
