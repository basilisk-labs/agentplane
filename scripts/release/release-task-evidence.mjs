import { execFile } from "node:child_process";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import {
  parseTaskReadme,
  renderTaskDocFromSections,
  renderTaskReadme,
  taskDocToSectionMap,
  taskReadmeDocBody,
  taskReadmePath,
} from "../../packages/core/src/index.ts";

const execFileAsync = promisify(execFile);

function usage() {
  return [
    "Usage: bun scripts/release-task-evidence.mjs <prepare|apply> [options]",
    "",
    "Subcommands:",
    "  prepare  Resolve deterministic release-task evidence PR metadata from a publish-result manifest.",
    "  apply    Write hosted publish evidence into the release task README.",
    "  audit    Check recent closed release/hosted-close task READMEs for pending verification drift.",
  ].join("\n");
}

function prepareUsage() {
  return [
    "Usage: bun scripts/release-task-evidence.mjs prepare [options]",
    "",
    "Options:",
    "  --release-sha <sha>       Exact release commit SHA",
    "  --publish-result <path>   Path to publish-result.json",
    "  --base-ref <branch>       Base branch for the follow-up PR (default: main)",
    "  --repo <owner/name>       GitHub repository (default: $GITHUB_REPOSITORY)",
    "  --json                    Emit JSON to stdout",
  ].join("\n");
}

function applyUsage() {
  return [
    "Usage: bun scripts/release-task-evidence.mjs apply [options]",
    "",
    "Options:",
    "  --task-id <id>            Release task id",
    "  --publish-result <path>   Path to publish-result.json",
    "  --repo <owner/name>       GitHub repository (default: $GITHUB_REPOSITORY)",
    "  --author <name>           doc/verification updater (default: DEUS)",
    "  --at <iso-ts>             Optional override timestamp",
    "  --json                    Emit JSON to stdout",
  ].join("\n");
}

function auditUsage() {
  return [
    "Usage: bun scripts/release-task-evidence.mjs audit [options]",
    "",
    "Options:",
    "  --since <iso-ts>          Required. Only inspect task READMEs updated at or after this timestamp.",
    "  --tasks-dir <path>        Task README directory (default: .agentplane/tasks)",
    "  --json                    Emit JSON to stdout",
  ].join("\n");
}

function ensureNonEmpty(value, label) {
  const text = String(value ?? "").trim();
  if (!text) throw new Error(`Missing required ${label}.`);
  return text;
}

function shortSha(value) {
  return value.trim().slice(0, 12);
}

function buildReleaseEvidencePrTitle(taskId) {
  return `task-evidence: Record hosted publish evidence [${taskId}]`;
}

async function git(args) {
  const result = await execFileAsync("git", args, {
    cwd: process.cwd(),
    env: process.env,
    maxBuffer: 20 * 1024 * 1024,
  });
  return String(result.stdout ?? "").trim();
}

async function readPublishResult(filePath) {
  return JSON.parse(await readFile(path.resolve(filePath), "utf8"));
}

async function resolveReleaseTaskIdsFromCommit(releaseSha) {
  const parentLine = await git(["rev-list", "--parents", "-n", "1", releaseSha]);
  const parents = parentLine.split(/\s+/u).filter(Boolean).slice(1);
  const stdout =
    parents.length > 0
      ? await git(["diff", "--name-only", `${releaseSha}^1`, releaseSha])
      : await git(["diff-tree", "--root", "--no-commit-id", "--name-only", "-r", releaseSha]);
  const taskIds = stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = /^\.agentplane\/tasks\/([^/]+)\/README\.md$/u.exec(line);
      return match?.[1]?.trim() ?? "";
    })
    .filter(Boolean);
  return [...new Set(taskIds)];
}

function buildPrepareOutcome({ actionable, reason, manifest, releaseSha, baseRef, repo, taskId }) {
  if (!actionable || !taskId) {
    return {
      actionable: false,
      reason,
      task_id: null,
      base_ref: baseRef,
      release_sha: releaseSha,
      closure_branch: null,
      pr_title: null,
      pr_body: null,
      readme_path: null,
    };
  }

  const closureBranch = `task-close/${taskId}/${shortSha(releaseSha)}-publish`;
  const releaseUrl = `https://github.com/${repo}/releases/tag/${manifest.tag}`;
  const publishRunUrl = manifest.job.runId
    ? `https://github.com/${repo}/actions/runs/${manifest.job.runId}`
    : null;
  const prBodyLines = [
    `Records hosted publish evidence for \`${manifest.tag}\`.`,
    "",
    "## Source",
    "",
    `- Task: \`${taskId}\``,
    `- Release SHA: \`${releaseSha}\``,
    `- Tag: \`${manifest.tag}\``,
    `- Release: ${releaseUrl}`,
  ];
  if (publishRunUrl) {
    prBodyLines.push(`- Publish run: ${publishRunUrl}`);
  }
  prBodyLines.push(
    "",
    "## Scope",
    "",
    "This PR updates only the tracked release task README so canonical task closure includes hosted publish evidence.",
  );

  return {
    actionable: true,
    reason: null,
    task_id: taskId,
    base_ref: baseRef,
    release_sha: releaseSha,
    closure_branch: closureBranch,
    pr_title: buildReleaseEvidencePrTitle(taskId),
    pr_body: prBodyLines.join("\n"),
    readme_path: `.agentplane/tasks/${taskId}/README.md`,
  };
}

function parsePrepareArgs(argv) {
  const out = {
    releaseSha: "",
    publishResultPath: "",
    baseRef: "main",
    repo: process.env.GITHUB_REPOSITORY ?? "",
    json: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index] ?? "";
    if (arg === "--release-sha") {
      out.releaseSha = argv[index + 1] ?? out.releaseSha;
      index += 1;
      continue;
    }
    if (arg === "--publish-result") {
      out.publishResultPath = argv[index + 1] ?? out.publishResultPath;
      index += 1;
      continue;
    }
    if (arg === "--base-ref") {
      out.baseRef = argv[index + 1] ?? out.baseRef;
      index += 1;
      continue;
    }
    if (arg === "--repo") {
      out.repo = argv[index + 1] ?? out.repo;
      index += 1;
      continue;
    }
    if (arg === "--json") {
      out.json = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      process.stdout.write(`${prepareUsage()}\n`);
      return null;
    }
    throw new Error(`unknown argument: ${arg}`);
  }
  out.releaseSha = ensureNonEmpty(out.releaseSha, "release sha");
  out.publishResultPath = ensureNonEmpty(out.publishResultPath, "publish-result path");
  out.repo = ensureNonEmpty(out.repo, "repo");
  return out;
}

function parseApplyArgs(argv) {
  const out = {
    taskId: "",
    publishResultPath: "",
    repo: process.env.GITHUB_REPOSITORY ?? "",
    author: "DEUS",
    at: null,
    json: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index] ?? "";
    if (arg === "--task-id") {
      out.taskId = argv[index + 1] ?? out.taskId;
      index += 1;
      continue;
    }
    if (arg === "--publish-result") {
      out.publishResultPath = argv[index + 1] ?? out.publishResultPath;
      index += 1;
      continue;
    }
    if (arg === "--repo") {
      out.repo = argv[index + 1] ?? out.repo;
      index += 1;
      continue;
    }
    if (arg === "--author") {
      out.author = argv[index + 1] ?? out.author;
      index += 1;
      continue;
    }
    if (arg === "--at") {
      out.at = argv[index + 1] ?? out.at;
      index += 1;
      continue;
    }
    if (arg === "--json") {
      out.json = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      process.stdout.write(`${applyUsage()}\n`);
      return null;
    }
    throw new Error(`unknown argument: ${arg}`);
  }
  out.taskId = ensureNonEmpty(out.taskId, "task id");
  out.publishResultPath = ensureNonEmpty(out.publishResultPath, "publish-result path");
  out.repo = ensureNonEmpty(out.repo, "repo");
  out.author = ensureNonEmpty(out.author, "author");
  return out;
}

function parseAuditArgs(argv) {
  const out = {
    since: "",
    tasksDir: path.join(process.cwd(), ".agentplane", "tasks"),
    json: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index] ?? "";
    if (arg === "--since") {
      out.since = argv[index + 1] ?? out.since;
      index += 1;
      continue;
    }
    if (arg === "--tasks-dir") {
      out.tasksDir = path.resolve(argv[index + 1] ?? out.tasksDir);
      index += 1;
      continue;
    }
    if (arg === "--json") {
      out.json = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      process.stdout.write(`${auditUsage()}\n`);
      return null;
    }
    throw new Error(`unknown argument: ${arg}`);
  }
  out.since = ensureNonEmpty(out.since, "since timestamp");
  const sinceMs = Date.parse(out.since);
  if (!Number.isFinite(sinceMs)) throw new Error(`Invalid --since timestamp: ${out.since}`);
  return out;
}

async function runPrepare(argv) {
  const args = parsePrepareArgs(argv);
  if (!args) return null;
  const manifest = await readPublishResult(args.publishResultPath);
  if (!manifest.success) {
    return buildPrepareOutcome({
      actionable: false,
      reason: `publish-result is not successful (reason=${manifest.reasonCode})`,
      manifest,
      releaseSha: args.releaseSha,
      baseRef: args.baseRef,
      repo: args.repo,
    });
  }
  const taskIds = await resolveReleaseTaskIdsFromCommit(args.releaseSha);
  if (taskIds.length === 0) {
    return buildPrepareOutcome({
      actionable: false,
      reason: `release commit ${args.releaseSha} does not touch a tracked task README`,
      manifest,
      releaseSha: args.releaseSha,
      baseRef: args.baseRef,
      repo: args.repo,
    });
  }
  if (taskIds.length > 1) {
    return buildPrepareOutcome({
      actionable: false,
      reason: `release commit ${args.releaseSha} touches multiple task READMEs: ${taskIds.join(", ")}`,
      manifest,
      releaseSha: args.releaseSha,
      baseRef: args.baseRef,
      repo: args.repo,
    });
  }
  return buildPrepareOutcome({
    actionable: true,
    reason: null,
    manifest,
    releaseSha: args.releaseSha,
    baseRef: args.baseRef,
    repo: args.repo,
    taskId: taskIds[0],
  });
}

function renderVerificationSection(manifest, repo) {
  const releaseUrl = `https://github.com/${repo}/releases/tag/${manifest.tag}`;
  const publishRunUrl = manifest.job.runId
    ? `https://github.com/${repo}/actions/runs/${manifest.job.runId}`
    : null;
  const lines = [
    "<!-- BEGIN VERIFICATION RESULTS -->",
    "- State: ok",
    `- Note: Hosted publish confirmed for ${manifest.tag}.`,
    "- Details:",
    `  - release_sha: ${manifest.sha}`,
    `  - version: ${manifest.version}`,
    `  - tag: ${manifest.tag}`,
    `  - @agentplaneorg/core: ${manifest.packages.core.source}`,
    `  - @agentplaneorg/recipes: ${manifest.packages.recipes.source}`,
    `  - agentplane: ${manifest.packages.cli.source}`,
    `  - npm_smoke: ${manifest.checks.npmSmoke.passed ? "pass" : manifest.checks.npmSmoke.outcome}`,
    `  - github_release: ${manifest.checks.githubRelease.created ? "created" : manifest.checks.githubRelease.outcome}`,
    `  - release_url: ${releaseUrl}`,
  ];
  if (publishRunUrl) {
    lines.push(`  - publish_run: ${publishRunUrl}`);
  }
  lines.push("<!-- END VERIFICATION RESULTS -->");
  return lines.join("\n");
}

async function runApply(argv) {
  const args = parseApplyArgs(argv);
  if (!args) return null;
  const manifest = await readPublishResult(args.publishResultPath);
  if (!manifest.success) {
    throw new Error(`publish-result is not successful (reason=${manifest.reasonCode})`);
  }
  const readmePath = taskReadmePath(path.join(process.cwd(), ".agentplane", "tasks"), args.taskId);
  const original = await readFile(readmePath, "utf8");
  const parsed = parseTaskReadme(original);
  if (String(parsed.frontmatter.id ?? "") !== args.taskId) {
    throw new Error(`Task README id mismatch at ${readmePath}`);
  }

  const verificationText = renderVerificationSection(manifest, args.repo);
  const sections = {
    ...taskDocToSectionMap(taskReadmeDocBody(parsed.frontmatter, parsed.body)),
    Verification: verificationText,
  };
  const body = renderTaskDocFromSections(sections);
  const at = args.at ?? new Date().toISOString();
  const nextFrontmatter = {
    ...parsed.frontmatter,
    verification: {
      state: "ok",
      updated_at: at,
      updated_by: args.author,
      note: `Hosted publish confirmed for ${manifest.tag}.`,
    },
    doc_updated_at: at,
    doc_updated_by: args.author,
    sections,
  };
  const rendered = renderTaskReadme(nextFrontmatter, body);
  const changed = rendered !== original;
  if (changed) {
    await mkdir(path.dirname(readmePath), { recursive: true });
    await writeFile(readmePath, rendered, "utf8");
  }
  return {
    changed,
    task_id: args.taskId,
    readme_path: readmePath,
    verification_note: `Hosted publish confirmed for ${manifest.tag}.`,
  };
}

function taskUpdatedAt(frontmatter) {
  const candidates = [frontmatter.doc_updated_at, frontmatter.updated_at].filter(Boolean);
  for (const value of candidates) {
    const parsed = Date.parse(String(value));
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function hasClosureEvidence(parsed) {
  const verification =
    taskDocToSectionMap(taskReadmeDocBody(parsed.frontmatter, parsed.body)).Verification ?? "";
  const text = [
    verification,
    String(parsed.frontmatter.result ?? ""),
    String(parsed.frontmatter.description ?? ""),
  ].join("\n");
  return (
    /Hosted publish confirmed for\s+v?\d/iu.test(text) ||
    /hosted closure automation recorded canonical task artifacts/iu.test(text) ||
    /Merged via PR #\d+/iu.test(text)
  );
}

async function runAudit(argv) {
  const args = parseAuditArgs(argv);
  if (!args) return null;
  const sinceMs = Date.parse(args.since);
  const entries = await readdir(args.tasksDir, { withFileTypes: true }).catch(() => []);
  const violations = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const readmePath = path.join(args.tasksDir, entry.name, "README.md");
    let parsed;
    try {
      parsed = parseTaskReadme(await readFile(readmePath, "utf8"));
    } catch {
      continue;
    }
    const updatedAt = taskUpdatedAt(parsed.frontmatter);
    if (updatedAt === null || updatedAt < sinceMs) continue;
    if (String(parsed.frontmatter.status ?? "").toUpperCase() !== "DONE") continue;
    if (parsed.frontmatter.verification?.state !== "pending") continue;
    if (!hasClosureEvidence(parsed)) continue;
    violations.push({
      task_id: String(parsed.frontmatter.id ?? entry.name),
      readme_path: readmePath,
      doc_updated_at: parsed.frontmatter.doc_updated_at ?? null,
      verification_state: parsed.frontmatter.verification.state,
    });
  }

  return {
    ok: violations.length === 0,
    since: args.since,
    checked_tasks_dir: args.tasksDir,
    violations,
  };
}

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  if (!command || command === "--help" || command === "-h") {
    process.stdout.write(`${usage()}\n`);
    return;
  }

  if (command === "prepare") {
    const payload = await runPrepare(rest);
    if (!payload) return;
    process.stdout.write(`${JSON.stringify(payload)}\n`);
    if (!payload.actionable) process.exitCode = 1;
    return;
  }
  if (command === "apply") {
    const payload = await runApply(rest);
    if (!payload) return;
    process.stdout.write(`${JSON.stringify(payload)}\n`);
    return;
  }
  if (command === "audit") {
    const payload = await runAudit(rest);
    if (!payload) return;
    process.stdout.write(`${JSON.stringify(payload)}\n`);
    if (!payload.ok) process.exitCode = 1;
    return;
  }

  throw new Error(`unknown subcommand: ${command}`);
}

await main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
