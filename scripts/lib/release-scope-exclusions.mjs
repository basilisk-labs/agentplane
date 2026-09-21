import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const DEFAULT_MANIFEST_PATH = path.join("scripts", "release", "release-scope-exclusions.json");
const TASK_ID_PATTERN = /^[0-9]{12}-[A-Z0-9]{6}$/u;
const COMMIT_PATTERN = /^[0-9a-f]{40}$/u;
const EVIDENCE_KINDS = new Set(["merged_commit", "published_tag", "superseded_by_task"]);
const ROOT_KEYS = new Set(["schema_version", "exclusions"]);
const COMMON_KEYS = new Set(["task_id", "evidence_kind", "reason", "git_ref"]);

function fail(message) {
  throw new Error(`release scope exclusions invalid: ${message}`);
}

function assertPlainObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail(`${label} must be an object`);
  }
}

function assertExactKeys(value, allowedKeys, label) {
  const unknown = Object.keys(value).filter((key) => !allowedKeys.has(key));
  if (unknown.length > 0) fail(`${label} has unknown fields: ${unknown.join(", ")}`);
}

function parseFrontMatter(text) {
  if (!text.startsWith("---\n")) return {};
  const end = text.indexOf("\n---", 4);
  if (end === -1) return {};
  const result = {};
  for (const line of text.slice(4, end).split(/\r?\n/u)) {
    const match = /^([A-Za-z0-9_-]+):\s*(.*)$/u.exec(line);
    if (!match) continue;
    result[match[1]] = String(match[2] ?? "")
      .trim()
      .replaceAll(/^["']|["']$/gu, "");
  }
  return result;
}

function runGit(repoRoot, args, label) {
  const result = spawnSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.status !== 0) {
    const detail = String(result.stderr || result.stdout || "git command failed").trim();
    fail(`${label}: ${detail}`);
  }
  return String(result.stdout ?? "").trim();
}

function readTaskAtHead(repoRoot, taskId, label) {
  const readmePath = path.join(repoRoot, ".agentplane", "tasks", taskId, "README.md");
  if (!existsSync(readmePath)) fail(`${label} references unknown task ${taskId}`);
  const text = readFileSync(readmePath, "utf8");
  const frontMatter = parseFrontMatter(text);
  if (frontMatter.id !== taskId) fail(`${label} task README id does not match ${taskId}`);
  return { text, frontMatter };
}

function readTaskAtCommit(repoRoot, gitRef, taskId, label) {
  const taskPath = `.agentplane/tasks/${taskId}/README.md`;
  const text = runGit(
    repoRoot,
    ["show", `${gitRef}:${taskPath}`],
    `${label} missing ${taskId} at ${gitRef}`,
  );
  const frontMatter = parseFrontMatter(text);
  if (frontMatter.id !== taskId) fail(`${label} task id at ${gitRef} does not match ${taskId}`);
  return { text, frontMatter };
}

function validateGitRef(repoRoot, gitRef, label) {
  if (!COMMIT_PATTERN.test(gitRef)) fail(`${label}.git_ref must be a full lowercase commit SHA`);
  const resolved = runGit(
    repoRoot,
    ["rev-parse", "--verify", `${gitRef}^{commit}`],
    `${label}.git_ref does not resolve`,
  );
  if (resolved !== gitRef) fail(`${label}.git_ref must resolve exactly to ${gitRef}`);
  const ancestor = spawnSync("git", ["merge-base", "--is-ancestor", gitRef, "HEAD"], {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (ancestor.status !== 0) fail(`${label}.git_ref ${gitRef} is not an ancestor of HEAD`);
}

function validateEntry(repoRoot, entry, index, seenTaskIds) {
  const label = `exclusions[${index}]`;
  assertPlainObject(entry, label);
  const evidenceKind = String(entry.evidence_kind ?? "");
  if (!EVIDENCE_KINDS.has(evidenceKind)) fail(`${label}.evidence_kind is unsupported`);
  const allowedKeys = new Set(COMMON_KEYS);
  if (evidenceKind === "published_tag") allowedKeys.add("tag");
  if (evidenceKind === "superseded_by_task") allowedKeys.add("replacement_task_id");
  assertExactKeys(entry, allowedKeys, label);

  const taskId = String(entry.task_id ?? "");
  if (!TASK_ID_PATTERN.test(taskId)) fail(`${label}.task_id is invalid`);
  if (seenTaskIds.has(taskId)) fail(`${label}.task_id duplicates ${taskId}`);
  seenTaskIds.add(taskId);
  const reason = String(entry.reason ?? "").trim();
  if (!reason) fail(`${label}.reason must be non-empty`);
  const gitRef = String(entry.git_ref ?? "");
  validateGitRef(repoRoot, gitRef, label);

  const currentTask = readTaskAtHead(repoRoot, taskId, label);
  if (currentTask.frontMatter.status !== "DOING") {
    fail(
      `${label} may exclude only a DOING historical projection; ${taskId} is ${currentTask.frontMatter.status || "missing status"}`,
    );
  }
  readTaskAtCommit(repoRoot, gitRef, taskId, label);

  const accepted = { taskId, evidenceKind, reason, gitRef };
  if (evidenceKind === "published_tag") {
    const tag = String(entry.tag ?? "").trim();
    if (!/^v[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.-]+)?$/u.test(tag)) {
      fail(`${label}.tag is invalid`);
    }
    if (currentTask.frontMatter.task_kind !== "release") {
      fail(`${label} published_tag evidence requires a release task`);
    }
    const taggedCommit = runGit(
      repoRoot,
      ["rev-parse", "--verify", `refs/tags/${tag}^{commit}`],
      `${label}.tag ${tag} does not resolve`,
    );
    if (taggedCommit !== gitRef) fail(`${label}.tag ${tag} does not resolve to git_ref ${gitRef}`);
    return { ...accepted, tag };
  }

  if (evidenceKind === "superseded_by_task") {
    const replacementTaskId = String(entry.replacement_task_id ?? "");
    if (!TASK_ID_PATTERN.test(replacementTaskId) || replacementTaskId === taskId) {
      fail(`${label}.replacement_task_id is invalid`);
    }
    const currentReplacement = readTaskAtHead(repoRoot, replacementTaskId, label);
    if (currentReplacement.frontMatter.status !== "DONE") {
      fail(`${label} replacement task ${replacementTaskId} is not DONE at HEAD`);
    }
    const committedReplacement = readTaskAtCommit(repoRoot, gitRef, replacementTaskId, label);
    if (committedReplacement.frontMatter.status !== "DONE") {
      fail(`${label} replacement task ${replacementTaskId} is not DONE at ${gitRef}`);
    }
    return { ...accepted, replacementTaskId };
  }

  return accepted;
}

export function loadValidatedReleaseScopeExclusions(repoRoot, options = {}) {
  const manifestPath = path.resolve(repoRoot, options.manifestPath ?? DEFAULT_MANIFEST_PATH);
  if (!existsSync(manifestPath)) {
    return { manifestPath, taskIds: [], exclusions: [] };
  }

  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (error) {
    fail(
      `cannot parse ${path.relative(repoRoot, manifestPath)} (${error instanceof Error ? error.message : String(error)})`,
    );
  }
  assertPlainObject(manifest, "manifest");
  assertExactKeys(manifest, ROOT_KEYS, "manifest");
  if (manifest.schema_version !== 1) fail("manifest.schema_version must equal 1");
  if (!Array.isArray(manifest.exclusions)) fail("manifest.exclusions must be an array");

  const seenTaskIds = new Set();
  const exclusions = manifest.exclusions.map((entry, index) =>
    validateEntry(repoRoot, entry, index, seenTaskIds),
  );
  return {
    manifestPath,
    taskIds: exclusions.map((entry) => entry.taskId),
    exclusions,
  };
}
