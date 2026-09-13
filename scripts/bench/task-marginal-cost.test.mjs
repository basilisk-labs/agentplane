import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { measureTaskMarginalCost } from "../lib/agent-efficiency-repository-snapshot.mjs";

function git(root, args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}

function write(root, relativePath, contents) {
  const target = path.join(root, relativePath);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, contents);
}

function commit(root, message, { empty = false } = {}) {
  git(root, ["add", "--all"]);
  git(root, ["commit", ...(empty ? ["--allow-empty"] : []), "-m", message]);
  return git(root, ["rev-parse", "HEAD"]);
}

test("measures one new task without charging duplicate or preexisting blobs twice", () => {
  const root = mkdtempSync(path.join(os.tmpdir(), "agentplane-task-marginal-cost-"));
  git(root, ["init", "-q"]);
  git(root, ["config", "user.name", "AgentPlane Test"]);
  git(root, ["config", "user.email", "test@example.invalid"]);
  write(root, ".agentplane/tasks/OLD/README.md", "shared payload\n");
  write(root, "src/existing.txt", "existing\n");
  const before = commit(root, "baseline");

  write(
    root,
    ".agentplane/tasks/NEW/README.md",
    ["---", 'id: "NEW"', 'updated_at: "2026-01-01T00:00:00.000Z"', "---", "Task\n"].join("\n"),
  );
  write(root, ".agentplane/tasks/NEW/evidence/a.txt", "shared payload\n");
  write(root, ".agentplane/tasks/NEW/evidence/b.txt", "shared payload\n");
  commit(root, "create task artifacts");
  write(
    root,
    ".agentplane/tasks/NEW/README.md",
    ["---", 'id: "NEW"', 'updated_at: "2026-01-02T00:00:00.000Z"', "---", "Task\n"].join("\n"),
  );
  commit(root, "refresh projection timestamp");
  write(root, "src/meaningful.txt", "meaningful\n");
  commit(root, "meaningful product change");
  const after = commit(root, "empty checkpoint", { empty: true });

  const measurement = measureTaskMarginalCost({
    repoRoot: root,
    beforeRevision: before,
    afterRevision: after,
    taskId: "NEW",
    observed: { filesystem_writes: 7, tool_calls: 5, control_plane_calls: 3 },
  });

  assert.equal(measurement.task_paths.count, 3);
  assert.equal(measurement.task_paths.duplicate_paths, 1);
  assert.equal(measurement.git_blobs.referenced_unique_count, 2);
  assert.equal(measurement.git_blobs.new_unique_count, 1);
  assert.equal(measurement.git_blobs.reused_unique_count, 1);
  assert.equal(measurement.git_blobs.new_unique_bytes, measurement.task_paths.paths[0].bytes);
  assert.deepEqual(measurement.operations, {
    filesystem_writes: 7,
    tool_calls: 5,
    control_plane_calls: 3,
  });
  assert.deepEqual(
    {
      total: measurement.commits.total,
      service_only: measurement.commits.service_only,
      meaningful: measurement.commits.meaningful,
      empty: measurement.commits.empty,
      timestamp_only: measurement.commits.timestamp_only,
    },
    { total: 4, service_only: 2, meaningful: 2, empty: 1, timestamp_only: 1 },
  );
});

test("rejects a task that existed before the requested measurement boundary", () => {
  const root = mkdtempSync(path.join(os.tmpdir(), "agentplane-task-marginal-existing-"));
  git(root, ["init", "-q"]);
  git(root, ["config", "user.name", "AgentPlane Test"]);
  git(root, ["config", "user.email", "test@example.invalid"]);
  write(root, ".agentplane/tasks/EXISTING/README.md", "existing\n");
  const before = commit(root, "baseline");
  write(root, ".agentplane/tasks/EXISTING/evidence.json", "{}\n");
  const after = commit(root, "extend task");

  assert.throws(
    () =>
      measureTaskMarginalCost({
        repoRoot: root,
        beforeRevision: before,
        afterRevision: after,
        taskId: "EXISTING",
      }),
    /task absent from the before revision/u,
  );
});
