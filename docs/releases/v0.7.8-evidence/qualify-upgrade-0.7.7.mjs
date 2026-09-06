import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  createQualificationCommandRunner,
  installPackedWorkspace,
  installPublishedAgentplane,
} from "../../../scripts/lib/qualification-packed-runtime.mjs";

const repoRoot = fileURLToPath(new URL("../../../", import.meta.url));
const tempRoot = mkdtempSync(path.join(os.tmpdir(), "agentplane-078-upgrade-077-"));
const run = createQualificationCommandRunner(repoRoot);
const git = (root, args) => run("git", args, { cwd: root }).trim();
const cli = (binary, root, args) => run(process.execPath, [binary, ...args], { cwd: root });
const hash = (value) => `sha256:${createHash("sha256").update(value).digest("hex")}`;

function commitFixture(root, message) {
  git(root, ["add", "-A"]);
  git(root, ["commit", "--allow-empty", "-m", message]);
}

function taskDocument(root, taskId) {
  return readFileSync(path.join(root, ".agentplane/tasks", taskId, "README.md"), "utf8");
}

function field(document, name) {
  const value = new RegExp(`^${name}: (.+)$`, "mu").exec(document)?.[1];
  assert.ok(value, `Task document is missing ${name}`);
  return value;
}

function qualifyMode(baselineCli, candidateCli, mode) {
  const root = path.join(tempRoot, mode);
  mkdirSync(root);
  git(root, ["init", "-q", "-b", "main"]);
  git(root, ["config", "user.name", "AgentPlane release qualification"]);
  git(root, ["config", "user.email", "release-qualification@example.invalid"]);
  const sentinel = `Existing ${mode} project content must survive the 0.7.7 upgrade.\n`;
  writeFileSync(path.join(root, "README.md"), sentinel);
  writeFileSync(
    path.join(root, "check-project.mjs"),
    `import assert from "node:assert/strict";\nimport { readFileSync } from "node:fs";\nassert.equal(readFileSync("README.md", "utf8"), ${JSON.stringify(sentinel)});\n`,
  );
  commitFixture(root, "Initialize upgrade fixture");
  cli(baselineCli, root, [
    "init",
    "--yes",
    "--init-mode",
    "ci",
    "--tool",
    "manual",
    "--workflow",
    mode,
    "--backend",
    "local",
    "--hooks",
    "false",
    "--require-plan-approval",
    "true",
    "--require-network-approval",
    "false",
  ]);
  assert.equal(cli(baselineCli, root, ["--version"]).trim(), "0.7.7");
  commitFixture(root, "Record published 0.7.7 initialization");

  const created = cli(baselineCli, root, [
    "task",
    "new",
    "--title",
    `Preserve the active ${mode} upgrade task`,
    "--description",
    "Existing task content must survive the installed 0.7.7 to 0.7.8 upgrade.",
    "--owner",
    "CODER",
    "--tag",
    "code",
    "--verify",
    "node check-project.mjs",
  ]);
  const taskId = /\b\d{12}-[A-Z0-9]{6}\b/u.exec(created)?.[0];
  assert.ok(taskId, "Published CLI did not return a task id");
  cli(baselineCli, root, [
    "task",
    "plan",
    "set",
    taskId,
    "--text",
    "1. Preserve the existing project and task identity through the managed framework upgrade.\n2. Inspect the upgraded task and verify that its owner, status, description, and project sentinel remain intact.",
    "--updated-by",
    "ORCHESTRATOR",
  ]);
  cli(baselineCli, root, [
    "task",
    "doc",
    "set",
    taskId,
    "--section",
    "Verify Steps",
    "--text",
    "1. Run `node check-project.mjs`. Expected: the original project README content is preserved.\n2. Inspect the task document and project README. Expected: their original identity and content remain present.",
    "--updated-by",
    "ORCHESTRATOR",
  ]);
  cli(baselineCli, root, [
    "task",
    "plan",
    "approve",
    taskId,
    "--by",
    "USER",
    "--note",
    "Approve this isolated migration fixture",
  ]);
  commitFixture(root, "Record the approved 0.7.7 task");

  let activeRoot = root;
  if (mode === "branch_pr") {
    git(root, ["remote", "add", "origin", "."]);
    git(root, ["config", "branch.main.remote", "origin"]);
    git(root, ["config", "branch.main.merge", "refs/heads/main"]);
    git(root, ["update-ref", "refs/remotes/origin/main", "HEAD"]);
    cli(baselineCli, root, [
      "work",
      "start",
      taskId,
      "--agent",
      "CODER",
      "--slug",
      "upgrade-077",
      "--worktree",
    ]);
    activeRoot = path.join(root, ".agentplane/worktrees", `${taskId}-upgrade-077`);
    assert.ok(existsSync(activeRoot), "Published CLI did not create the task worktree");
  }
  cli(baselineCli, activeRoot, [
    "task",
    "start-ready",
    taskId,
    "--author",
    "CODER",
    "--body",
    "Start: preserve this active task through the installed release upgrade.",
  ]);
  commitFixture(activeRoot, "Record active 0.7.7 task before upgrade");
  const before = taskDocument(activeRoot, taskId);
  assert.equal(field(before, "status"), '"DOING"');
  const countBefore = git(root, ["worktree", "list", "--porcelain"])
    .split("\n")
    .filter((line) => line.startsWith("worktree ")).length;
  const headBefore = git(activeRoot, ["rev-parse", "HEAD"]);
  const statusBefore = git(activeRoot, ["status", "--short", "--untracked-files=all"]);
  assert.equal(statusBefore, "", "Fixture must be clean before upgrading");
  const dryRun = cli(candidateCli, activeRoot, ["upgrade", "--dry-run"]);
  assert.equal(git(activeRoot, ["status", "--short", "--untracked-files=all"]), statusBefore);
  const upgrade = cli(candidateCli, activeRoot, [
    "upgrade",
    "--auto",
    "--yes",
    "--migrate-task-docs",
  ]);
  const headAfter = git(activeRoot, ["rev-parse", "HEAD"]);
  assert.notEqual(headAfter, headBefore, "Upgrade must create its dedicated commit");
  const upgradeSubject = git(activeRoot, ["log", "-1", "--format=%s"]);
  assert.match(upgradeSubject, /0\.7\.8/u);
  const after = taskDocument(activeRoot, taskId);
  for (const name of ["id", "title", "status", "owner", "description", "doc_version"]) {
    assert.equal(field(after, name), field(before, name), `Upgrade changed task ${name}`);
  }
  assert.ok(after.includes("Existing task content must survive"));
  assert.equal(readFileSync(path.join(activeRoot, "README.md"), "utf8"), sentinel);
  assert.equal(cli(candidateCli, activeRoot, ["--version"]).trim(), "0.7.8");
  const runtime = JSON.parse(cli(candidateCli, activeRoot, ["runtime", "explain", "--json"]));
  assert.equal(runtime.agentplane.version, "0.7.8");
  assert.equal(runtime.core.version, "0.7.8");
  assert.equal(runtime.framework.inFrameworkCheckout, false);
  assert.equal(runtime.repoCliExpectation.state, "satisfied");
  run(process.execPath, ["check-project.mjs"], { cwd: activeRoot });
  const brief = JSON.parse(cli(candidateCli, activeRoot, ["task", "brief", taskId, "--json"]));
  assert.equal(brief.task?.id ?? brief.task_id, taskId);
  const nextAction = JSON.parse(
    cli(candidateCli, activeRoot, ["task", "next-action", taskId, "--json"]),
  );
  assert.ok(nextAction.next_action ?? nextAction.action ?? nextAction.code);
  const doctor = cli(candidateCli, activeRoot, ["doctor"]);
  const routing = run(process.execPath, [".agentplane/policy/check-routing.mjs"], {
    cwd: activeRoot,
  });
  cli(candidateCli, activeRoot, ["agents"]);
  const reviewPath = path.join(activeRoot, ".agentplane/.upgrade/last-review.json");
  assert.ok(existsSync(reviewPath), "Upgrade review report is missing");
  const review = JSON.parse(readFileSync(reviewPath, "utf8"));
  const idempotent = cli(candidateCli, activeRoot, ["upgrade", "--dry-run"]);
  assert.match(idempotent, /Upgrade dry-run: 0 add, 0 update, 0 remove/u);
  const repeatedUpgrade = cli(candidateCli, activeRoot, [
    "upgrade",
    "--auto",
    "--yes",
    "--migrate-task-docs",
  ]);
  assert.equal(git(activeRoot, ["rev-parse", "HEAD"]), headAfter);
  assert.equal(git(activeRoot, ["status", "--short", "--untracked-files=all"]), "");
  assert.equal(
    git(root, ["worktree", "list", "--porcelain"])
      .split("\n")
      .filter((line) => line.startsWith("worktree ")).length,
    countBefore,
  );
  return {
    mode,
    task_id: taskId,
    state_before: field(before, "status"),
    state_after: field(after, "status"),
    before_task_sha256: hash(before),
    after_task_sha256: hash(after),
    upgrade_commit: headAfter,
    upgrade_subject: upgradeSubject,
    worktree_count: countBefore,
    dry_run: dryRun.trim(),
    upgrade: upgrade.trim(),
    idempotence: idempotent.trim(),
    repeated_upgrade: repeatedUpgrade.trim(),
    doctor: doctor.trim(),
    routing: routing.trim(),
    runtime,
    review,
    task_identity_preserved: true,
    project_content_preserved: true,
    clean: true,
    status: "pass",
  };
}

try {
  const baselinePrefix = path.join(tempRoot, "baseline");
  const candidatePrefix = path.join(tempRoot, "candidate");
  const packDirectory = path.join(tempRoot, "packs");
  const cacheDirectory = path.join(tempRoot, "npm-cache");
  for (const directory of [baselinePrefix, candidatePrefix, packDirectory, cacheDirectory])
    mkdirSync(directory);
  const baselineCli = installPublishedAgentplane({
    run,
    prefix: baselinePrefix,
    cacheDirectory,
    version: "0.7.7",
  });
  const candidate = installPackedWorkspace({
    run,
    prefix: candidatePrefix,
    packDirectory,
    cacheDirectory,
    repoRoot,
    packageNames: ["core", "recipes", "agentplane"],
  });
  for (const entry of candidate.packages) assert.equal(entry.version, "0.7.8");
  const results = ["direct", "branch_pr"].map((mode) =>
    qualifyMode(baselineCli, candidate.cli, mode),
  );
  process.stdout.write(
    `${JSON.stringify(
      {
        schema_version: 1,
        qualification: "published-0.7.7-to-packed-0.7.8",
        status: "pass",
        source_commit: git(repoRoot, ["rev-parse", "HEAD"]),
        source_dirty_paths: git(repoRoot, ["status", "--short", "--untracked-files=all"]),
        baseline_version: "0.7.7",
        candidate_packages: candidate.packages,
        results,
      },
      null,
      2,
    )}\n`,
  );
} catch (error) {
  process.stderr.write(`${error.stack ?? error}\n${error.stdout ?? ""}\n${error.stderr ?? ""}\n`);
  process.exitCode = 1;
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}
