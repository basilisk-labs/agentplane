import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

export const INSTALLED_MIGRATION_MATRIX = Object.freeze([
  Object.freeze({
    id: "fresh-direct-v2-doc3",
    kind: "fresh",
    workflowMode: "direct",
    workflowVersion: 2,
    taskDocVersion: 3,
    activeTask: false,
    sourceTag: null,
  }),
  Object.freeze({
    id: "fresh-branch-pr-v2-doc3",
    kind: "fresh",
    workflowMode: "branch_pr",
    workflowVersion: 2,
    taskDocVersion: 3,
    activeTask: false,
    sourceTag: null,
  }),
  Object.freeze({
    id: "upgrade-0.6.24-direct-v2-doc2-active",
    kind: "upgrade",
    workflowMode: "direct",
    workflowVersion: 2,
    taskDocVersion: 2,
    activeTask: true,
    sourceTag: "v0.6.24",
  }),
  Object.freeze({
    id: "upgrade-0.6.24-branch-pr-v2-doc3-active",
    kind: "upgrade",
    workflowMode: "branch_pr",
    workflowVersion: 2,
    taskDocVersion: 3,
    activeTask: true,
    sourceTag: "v0.6.24",
  }),
  Object.freeze({
    id: "upgrade-0.6.26-direct-v2-doc3-active",
    kind: "upgrade",
    workflowMode: "direct",
    workflowVersion: 2,
    taskDocVersion: 3,
    activeTask: true,
    sourceTag: "v0.6.26",
  }),
  Object.freeze({
    id: "upgrade-0.6.26-branch-pr-v2-doc3-active",
    kind: "upgrade",
    workflowMode: "branch_pr",
    workflowVersion: 2,
    taskDocVersion: 3,
    activeTask: true,
    sourceTag: "v0.6.26",
  }),
  Object.freeze({
    id: "workflow-v1-direct-rollback",
    kind: "workflow_migration",
    workflowMode: "direct",
    workflowVersion: 1,
    taskDocVersion: 3,
    activeTask: false,
    sourceTag: null,
  }),
  Object.freeze({
    id: "workflow-v1-branch-pr-rollback",
    kind: "workflow_migration",
    workflowMode: "branch_pr",
    workflowVersion: 1,
    taskDocVersion: 3,
    activeTask: false,
    sourceTag: null,
  }),
]);

function sortedUnique(values) {
  return [...new Set(values)].toSorted((left, right) => String(left).localeCompare(String(right)));
}

export function validateInstalledMigrationMatrixCoverage(scenarios) {
  assert.ok(Array.isArray(scenarios), "installed migration matrix must be an array");
  assert.equal(
    new Set(scenarios.map((scenario) => scenario.id)).size,
    scenarios.length,
    "installed migration matrix scenario ids must be unique",
  );

  const workflowModes = sortedUnique(scenarios.map((scenario) => scenario.workflowMode));
  const workflowVersions = sortedUnique(scenarios.map((scenario) => scenario.workflowVersion));
  const taskDocVersions = sortedUnique(scenarios.map((scenario) => scenario.taskDocVersion));
  const sourceTags = sortedUnique(
    scenarios.map((scenario) => scenario.sourceTag).filter((value) => value !== null),
  );
  assert.deepEqual(
    workflowModes,
    ["branch_pr", "direct"],
    "installed migration matrix must cover direct and branch_pr workflows",
  );
  assert.deepEqual(
    workflowVersions,
    [1, 2],
    "installed migration matrix must cover WORKFLOW v1 and v2",
  );
  assert.deepEqual(
    taskDocVersions,
    [2, 3],
    "installed migration matrix must cover task README v2 and v3",
  );
  assert.deepEqual(
    sourceTags,
    ["v0.6.24", "v0.6.26"],
    "installed migration matrix must cover the original and latest stable migration sources",
  );

  for (const workflowMode of workflowModes) {
    assert.ok(
      scenarios.some(
        (scenario) => scenario.kind === "fresh" && scenario.workflowMode === workflowMode,
      ),
      `installed migration matrix must cover a fresh ${workflowMode} repository`,
    );
    assert.ok(
      scenarios.some(
        (scenario) =>
          scenario.kind === "upgrade" &&
          scenario.workflowMode === workflowMode &&
          scenario.activeTask,
      ),
      `installed migration matrix must cover an active 0.6.24 ${workflowMode} upgrade`,
    );
    assert.ok(
      scenarios.some(
        (scenario) =>
          scenario.kind === "workflow_migration" && scenario.workflowMode === workflowMode,
      ),
      `installed migration matrix must cover WORKFLOW v1 ${workflowMode} rollback`,
    );
  }
  for (const sourceTag of sourceTags) {
    for (const workflowMode of workflowModes) {
      assert.ok(
        scenarios.some(
          (scenario) =>
            scenario.kind === "upgrade" &&
            scenario.sourceTag === sourceTag &&
            scenario.workflowMode === workflowMode &&
            scenario.activeTask,
        ),
        `installed migration matrix must cover an active ${sourceTag} ${workflowMode} upgrade`,
      );
    }
  }

  return {
    scenarioCount: scenarios.length,
    workflowModes,
    workflowVersions,
    taskDocVersions,
    sourceTags,
  };
}

function run(command, args, opts = {}) {
  return execFileSync(command, args, {
    cwd: opts.cwd,
    encoding: "utf8",
    env: {
      ...process.env,
      AGENTPLANE_NO_UPDATE_CHECK: "1",
      ...(opts.env ?? {}),
    },
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 64 * 1024 * 1024,
  });
}

function git(root, args) {
  return run("git", args, { cwd: root });
}

function commitAll(root, message) {
  git(root, ["add", "-A"]);
  git(root, ["commit", "--allow-empty", "-m", message]);
}

function initGitRepo(root) {
  mkdirSync(root, { recursive: true });
  git(root, ["init", "-q", "-b", "main"]);
  git(root, ["config", "user.name", "AgentPlane Migration Matrix"]);
  git(root, ["config", "user.email", "agentplane-matrix@example.com"]);
  writeFileSync(path.join(root, "README.md"), "# Installed migration matrix\n", "utf8");
  commitAll(root, "seed installed migration fixture");
}

function extractTaskId(output) {
  const match = /\b\d{12}-[A-Z0-9]{6}\b/u.exec(output);
  assert.ok(match, `installed migration matrix could not parse task id from: ${output}`);
  return match[0];
}

function parseJson(output, label) {
  try {
    return JSON.parse(output);
  } catch (error) {
    throw new Error(`${label} did not emit JSON: ${error.message}\n${output}`);
  }
}

function gitTrackedState(root) {
  return git(root, ["status", "--short", "--untracked-files=all"]);
}

function initializeInstalledProject(agentplane, root, workflowMode) {
  initGitRepo(root);
  run(
    agentplane,
    [
      "init",
      "--yes",
      "--setup-profile",
      "light",
      "--workflow",
      workflowMode,
      "--backend",
      "local",
      "--hooks",
      "false",
      "--require-plan-approval",
      "true",
    ],
    { cwd: root },
  );
  commitAll(root, `initialize installed ${workflowMode} fixture`);
}

function createApprovedTask(agentplane, root, workflowMode) {
  const taskId = extractTaskId(
    run(
      agentplane,
      [
        "task",
        "new",
        "--title",
        `Installed ${workflowMode} migration task`,
        "--description",
        "Preserve active lifecycle truth across the installed migration matrix.",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
      ],
      { cwd: root },
    ),
  );
  run(
    agentplane,
    [
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "1. Preserve active task truth\n2. Exercise installed migration commands",
      "--updated-by",
      "ORCHESTRATOR",
    ],
    { cwd: root },
  );
  run(
    agentplane,
    ["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--note", "Matrix plan"],
    { cwd: root },
  );
  return taskId;
}

function legacyTaskReadme(taskId) {
  return `---
id: "${taskId}"
title: "Installed direct migration task"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify:
  - "agentplane task brief ${taskId} --json"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T00:00:00.000Z"
  updated_by: "ORCHESTRATOR"
  note: "Matrix plan"
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-08-01T00:00:00.000Z"
doc_updated_by: "CODER"
description: "Preserve active lifecycle truth across the installed migration matrix."
id_source: "generated"
---
## Summary

Installed direct migration task

## Scope

- In scope: preserve active task identity, owner, status, plan approval, and verification contract.

## Plan

1. Upgrade the installed framework bundle.
2. Migrate this README without losing lifecycle truth.

## Verify Steps

- Run the installed task brief and next-action commands.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Restore the exact fixture snapshot.

## Notes

Legacy v2 lifecycle sentinel.
`;
}

function installStableManagedAssets(repoRoot, fixtureRoot, sourceTag) {
  const oldManifest = JSON.parse(
    git(repoRoot, ["show", `${sourceTag}:packages/agentplane/assets/framework.manifest.json`]),
  );
  const currentManifest = JSON.parse(
    readFileSync(path.join(repoRoot, "packages/agentplane/assets/framework.manifest.json"), "utf8"),
  );
  const oldPaths = new Set(oldManifest.files.map((entry) => entry.path));

  for (const entry of currentManifest.files) {
    if (!oldPaths.has(entry.path)) {
      rmSync(path.join(fixtureRoot, entry.path), { recursive: true, force: true });
    }
  }
  for (const entry of oldManifest.files) {
    const sourcePath = entry.source_path ?? entry.path;
    const contents = git(repoRoot, [
      "show",
      `${sourceTag}:packages/agentplane/assets/${sourcePath}`,
    ]);
    const targetPath = path.join(fixtureRoot, entry.path);
    mkdirSync(path.dirname(targetPath), { recursive: true });
    writeFileSync(targetPath, contents, "utf8");
  }

  const workflowPath = path.join(fixtureRoot, ".agentplane/WORKFLOW.md");
  const workflow = readFileSync(workflowPath, "utf8").replace(
    /expected_version:\s*[^\n]+/u,
    `expected_version: ${sourceTag.slice(1)}`,
  );
  writeFileSync(workflowPath, workflow, "utf8");
}

function assertFreshScenario(agentplane, root, workflowMode) {
  initializeInstalledProject(agentplane, root, workflowMode);
  run(agentplane, ["doctor"], { cwd: root });
  const config = run(agentplane, ["config", "show"], { cwd: root });
  assert.match(config, new RegExp(`workflow_mode["']?[:=\\s]+["']?${workflowMode}`, "u"));
  return { workflow_mode: workflowMode, doctor: "pass" };
}

function assertInstalledTaskSurfaces(agentplane, root, taskId) {
  const brief = parseJson(
    run(agentplane, ["task", "brief", taskId, "--json"], { cwd: root }),
    "installed task brief",
  );
  assert.equal(brief.task?.id ?? brief.task_id, taskId, "installed task brief lost task identity");

  const nextAction = parseJson(
    run(agentplane, ["task", "next-action", taskId, "--json"], { cwd: root }),
    "installed task next-action",
  );
  assert.ok(
    nextAction.next_action ?? nextAction.action ?? nextAction.code,
    "installed task next-action omitted its typed action",
  );
  return { brief: "pass", next_action: "pass" };
}

function assertDirectUpgradeScenario(agentplane, repoRoot, root, sourceTag, taskDocVersion) {
  initializeInstalledProject(agentplane, root, "direct");
  const taskId = createApprovedTask(agentplane, root, "direct");
  run(
    agentplane,
    [
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: preserve the active direct task through the installed migration matrix.",
    ],
    { cwd: root },
  );
  if (taskDocVersion === 2) {
    writeFileSync(
      path.join(root, ".agentplane/tasks", taskId, "README.md"),
      legacyTaskReadme(taskId),
      "utf8",
    );
  }
  installStableManagedAssets(repoRoot, root, sourceTag);
  commitAll(root, `fixture ${sourceTag} direct active task with README v${taskDocVersion}`);

  const beforeDryRun = gitTrackedState(root);
  run(agentplane, ["upgrade", "--dry-run"], { cwd: root });
  assert.equal(gitTrackedState(root), beforeDryRun, "upgrade dry-run mutated the direct fixture");

  run(agentplane, ["upgrade", "--yes", "--migrate-task-docs"], { cwd: root });
  const migrated = readFileSync(path.join(root, ".agentplane/tasks", taskId, "README.md"), "utf8");
  assert.match(migrated, /status: "DOING"/u);
  assert.match(migrated, /owner: "CODER"/u);
  assert.match(migrated, /doc_version: 3/u);
  if (taskDocVersion === 2) {
    assert.match(migrated, /Legacy v2 lifecycle sentinel\./u);
  }

  const idempotent = run(agentplane, ["upgrade", "--dry-run"], { cwd: root });
  assert.match(idempotent, /Upgrade dry-run: 0 add, 0 update, 0 remove/u);
  const surfaces = assertInstalledTaskSurfaces(agentplane, root, taskId);

  const runner = parseJson(
    run(agentplane, ["task", "run", taskId, "--dry-run", "--json"], { cwd: root }),
    "installed task runner dry-run",
  );
  assert.ok(runner.run_id ?? runner.run?.id, "installed task runner omitted run identity");
  const runnerStatus = parseJson(
    run(agentplane, ["task", "run", "status", taskId, "--json"], { cwd: root }),
    "installed task runner status",
  );
  assert.ok(
    runnerStatus.run_id ?? runnerStatus.run?.id,
    "installed runner status lost run identity",
  );

  const evaluator = parseJson(
    run(
      agentplane,
      [
        "evaluator",
        "run",
        taskId,
        "--provenance",
        "human_supplied",
        "--verdict",
        "pass",
        "--summary",
        "Installed evaluator path is operational.",
        "--finding",
        "The migrated active task retained its typed route.",
        "--evidence",
        `.agentplane/tasks/${taskId}/README.md`,
        "--no-record",
        "--json",
      ],
      { cwd: root },
    ),
    "installed evaluator",
  );
  assert.equal(evaluator.verdict ?? evaluator.report?.verdict, "pass");

  return {
    task_id: taskId,
    source_tag: sourceTag,
    task_doc: taskDocVersion === 2 ? "v2_to_v3" : "v3_preserved",
    ...surfaces,
    runner: "dry_run_and_status_pass",
    evaluator: "pass",
  };
}

function worktreeCount(root) {
  return git(root, ["worktree", "list", "--porcelain"])
    .split("\n")
    .filter((line) => line.startsWith("worktree ")).length;
}

function assertBranchPrUpgradeScenario(agentplane, repoRoot, root, sourceTag) {
  initializeInstalledProject(agentplane, root, "branch_pr");
  const taskId = createApprovedTask(agentplane, root, "branch_pr");
  commitAll(root, "record approved branch_pr migration task");
  git(root, ["remote", "add", "origin", "."]);
  git(root, ["config", "branch.main.remote", "origin"]);
  git(root, ["config", "branch.main.merge", "refs/heads/main"]);
  git(root, ["update-ref", "refs/remotes/origin/main", "HEAD"]);

  const slug = "installed-migration-matrix";
  run(agentplane, ["work", "start", taskId, "--agent", "CODER", "--slug", slug, "--worktree"], {
    cwd: root,
  });
  const taskWorktree = path.join(root, ".agentplane/worktrees", `${taskId}-${slug}`);
  run(
    agentplane,
    [
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: preserve the active branch_pr task and its worktree through migration.",
    ],
    { cwd: taskWorktree },
  );
  commitAll(taskWorktree, "start active branch_pr migration task");

  installStableManagedAssets(repoRoot, root, sourceTag);
  commitAll(root, `fixture ${sourceTag} branch_pr active task with README v3`);
  const countBefore = worktreeCount(root);
  const beforeDryRun = gitTrackedState(root);
  run(agentplane, ["upgrade", "--dry-run"], { cwd: root });
  assert.equal(
    gitTrackedState(root),
    beforeDryRun,
    "upgrade dry-run mutated the branch_pr fixture",
  );
  run(agentplane, ["upgrade", "--yes", "--migrate-task-docs"], { cwd: root });
  const idempotent = run(agentplane, ["upgrade", "--dry-run"], { cwd: root });
  assert.match(idempotent, /Upgrade dry-run: 0 add, 0 update, 0 remove/u);

  const resumed = run(agentplane, ["work", "resume", taskId], { cwd: root });
  assert.match(resumed, new RegExp(taskId, "u"));
  assert.equal(worktreeCount(root), countBefore, "work resume created a duplicate worktree");
  const surfaces = assertInstalledTaskSurfaces(agentplane, taskWorktree, taskId);

  return {
    task_id: taskId,
    source_tag: sourceTag,
    task_doc: "v3_preserved",
    worktree_resume: "single_worktree",
    ...surfaces,
  };
}

function workflowV1Text(workflowMode) {
  return [
    "---",
    "version: 1",
    `mode: ${workflowMode}`,
    "owners:",
    "  orchestrator: ORCHESTRATOR",
    "approvals:",
    "  require_plan: true",
    "  require_verify: true",
    "  require_network: true",
    "retry_policy:",
    "  normal_exit_continuation: true",
    "  abnormal_backoff: exponential",
    "  max_attempts: 5",
    "timeouts:",
    "  stall_seconds: 900",
    "in_scope_paths:",
    '  - "**"',
    "---",
    "",
    "## Prompt Template",
    "Preserve {{ runtime.repo_name }} exactly.",
    "",
    "## Checks",
    "- verify",
    "",
    "## Fallback",
    "last_known_good: .agentplane/workflows/last-known-good.md",
    "",
  ].join("\r\n");
}

function assertWorkflowMigrationScenario(agentplane, root, workflowMode) {
  initGitRepo(root);
  const workflowPath = path.join(root, ".agentplane/WORKFLOW.md");
  mkdirSync(path.dirname(workflowPath), { recursive: true });
  const source = workflowV1Text(workflowMode);
  writeFileSync(workflowPath, source, "utf8");

  run(agentplane, ["workflow", "migrate", "--dry-run"], { cwd: root });
  assert.equal(readFileSync(workflowPath, "utf8"), source, "workflow dry-run changed source bytes");
  run(agentplane, ["workflow", "migrate"], { cwd: root });
  const migrated = readFileSync(workflowPath, "utf8");
  assert.match(migrated, /version: 2/u);
  assert.match(migrated, new RegExp(`mode: ["']?${workflowMode}["']?`, "u"));
  run(agentplane, ["workflow", "migrate"], { cwd: root });
  assert.equal(
    readFileSync(workflowPath, "utf8"),
    migrated,
    "workflow migration was not idempotent",
  );

  const receiptDir = path.join(root, ".agentplane/workflows/migrations");
  const receipts = readdirSync(receiptDir).filter((entry) => entry.endsWith(".json"));
  assert.equal(receipts.length, 1, "workflow migration must create one deterministic receipt");
  const receipt = path.relative(root, path.join(receiptDir, receipts[0]));
  run(agentplane, ["workflow", "migrate", "--rollback", receipt], { cwd: root });
  assert.equal(readFileSync(workflowPath, "utf8"), source, "workflow rollback lost exact bytes");

  return { workflow_mode: workflowMode, dry_run: "no_mutation", rollback: "exact_bytes" };
}

export function runInstalledMigrationMatrix({ agentplane, repoRoot, tempRoot }) {
  const coverage = validateInstalledMigrationMatrixCoverage(INSTALLED_MIGRATION_MATRIX);
  const results = [];
  for (const scenario of INSTALLED_MIGRATION_MATRIX) {
    const root = path.join(tempRoot, scenario.id);
    let evidence;
    if (scenario.kind === "fresh") {
      evidence = assertFreshScenario(agentplane, root, scenario.workflowMode);
    } else if (scenario.kind === "upgrade" && scenario.workflowMode === "direct") {
      evidence = assertDirectUpgradeScenario(
        agentplane,
        repoRoot,
        root,
        scenario.sourceTag,
        scenario.taskDocVersion,
      );
    } else if (scenario.kind === "upgrade") {
      evidence = assertBranchPrUpgradeScenario(agentplane, repoRoot, root, scenario.sourceTag);
    } else {
      evidence = assertWorkflowMigrationScenario(agentplane, root, scenario.workflowMode);
    }
    results.push({ id: scenario.id, status: "pass", evidence });
  }
  return { schema_version: 1, coverage, results };
}
