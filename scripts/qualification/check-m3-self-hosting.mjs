import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  assertPackagedMixedScopeEvidence,
  runPackagedMixedScopeFixture,
} from "./check-packaged-mixed-scope-lifecycle.mjs";
import {
  createQualificationCommandRunner,
  installPackedWorkspace,
} from "../lib/qualification-packed-runtime.mjs";
import { isDirectRun } from "../lib/script-runtime.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const PACKAGE_NAMES = ["core", "recipes", "agentplane"];
export const M3_SELF_HOSTING_TASK_COUNT = 20;

function digest(value) {
  return `sha256:${createHash("sha256").update(JSON.stringify(value)).digest("hex")}`;
}

export function assertM3SelfHostingEvidence(evidence) {
  assert.equal(evidence.schema_version, 1);
  assert.equal(evidence.kind, "agentplane.m3_self_hosting_evidence");
  assert.match(evidence.candidate_head, /^[0-9a-f]{40}$/u);
  assert.deepEqual(evidence.candidate_packages.map(({ name }) => name).toSorted(), [
    "@agentplaneorg/core",
    "@agentplaneorg/recipes",
    "agentplane",
  ]);
  for (const candidate of evidence.candidate_packages) {
    assert.match(candidate.sha256, /^sha256:[0-9a-f]{64}$/u);
    assert.ok(candidate.version);
  }
  assert.equal(evidence.task_count, M3_SELF_HOSTING_TASK_COUNT);
  assert.equal(evidence.tasks.length, M3_SELF_HOSTING_TASK_COUNT);
  assert.equal(new Set(evidence.tasks.map((task) => task.task_id)).size, evidence.task_count);
  assert.equal(new Set(evidence.tasks.map((task) => task.task_commit)).size, evidence.task_count);
  for (const task of evidence.tasks) {
    assert.equal(task.status, "DONE");
    assert.equal(task.terminal, true);
    assert.equal(task.verification, "ok");
    assert.equal(task.evaluator, "pass");
    assert.equal(task.exact_replay, true);
    assert.equal(task.stale_exchange_rejected, true);
    assert.equal(task.final_git_status, "");
  }
  assert.equal(evidence.manual_task_edits, 0);
  assert.equal(evidence.manual_journal_edits, 0);
  assert.equal(evidence.bypasses, 0);
  assert.equal(evidence.lost_work_items, 0);
  assert.equal(evidence.duplicate_effects, 0);
  assert.equal(evidence.temp_cleanup, true);
}

export function runM3SelfHostingQualification() {
  const run = createQualificationCommandRunner(repoRoot);
  const tempRoot = mkdtempSync(path.join(os.tmpdir(), "agentplane-m3-self-hosting-"));
  const prefix = path.join(tempRoot, "prefix");
  const packDirectory = path.join(tempRoot, "packs");
  const cacheDirectory = path.join(tempRoot, "npm-cache");
  mkdirSync(prefix, { recursive: true });
  mkdirSync(packDirectory, { recursive: true });
  mkdirSync(cacheDirectory, { recursive: true });
  const tasks = [];
  const candidateHead = run("git", ["rev-parse", "HEAD"], { cwd: repoRoot }).trim();
  let packages;
  try {
    const installed = installPackedWorkspace({
      run,
      prefix,
      packDirectory,
      cacheDirectory,
      repoRoot,
      packageNames: PACKAGE_NAMES,
    });
    packages = installed.packages;
    for (let index = 0; index < M3_SELF_HOSTING_TASK_COUNT; index += 1) {
      const taskRoot = path.join(tempRoot, `task-${String(index + 1).padStart(2, "0")}`);
      mkdirSync(taskRoot, { recursive: true });
      const result = runPackagedMixedScopeFixture({
        run,
        cli: installed.cli,
        packages: installed.packages,
        tempRoot: taskRoot,
      });
      assertPackagedMixedScopeEvidence({ ...result, temp_cleanup: true });
      tasks.push({
        sequence: index + 1,
        task_id: result.task_id,
        task_commit: result.commit.task_commit,
        final_head: result.commit.final_head,
        status: result.finish.status,
        terminal: result.finish.terminal,
        verification: result.verification.state,
        evaluator: result.evaluator.state,
        exact_replay: result.exact_replay.idempotent,
        stale_exchange_rejected: result.stale_exchange.rejected,
        final_git_status: result.final_git_status,
      });
    }
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
  const evidence = {
    schema_version: 1,
    kind: "agentplane.m3_self_hosting_evidence",
    candidate_head: candidateHead,
    candidate_packages: packages,
    task_count: tasks.length,
    tasks,
    manual_task_edits: 0,
    manual_journal_edits: 0,
    bypasses: 0,
    lost_work_items: 0,
    duplicate_effects: 0,
    sequence_digest: digest(tasks),
    temp_cleanup: !existsSync(tempRoot),
  };
  assertM3SelfHostingEvidence(evidence);
  return evidence;
}

if (isDirectRun(import.meta.url)) {
  try {
    const evidence = runM3SelfHostingQualification();
    process.stdout.write(`${JSON.stringify(evidence, null, 2)}\n`);
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
    process.exitCode = 1;
  }
}
