import { execFile } from "node:child_process";
import { mkdir, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { mkGitRepoRoot } from "@agentplane/testkit";
import { afterEach, expect, it } from "vitest";
import { observeVerificationRetrySource } from "./verification-retry-source-proof.js";
const exec = promisify(execFile);
const roots: string[] = [];
afterEach(async () => {
  for (const root of roots.splice(0)) await rm(root, { recursive: true, force: true });
});
async function commit(root: string, name: string, body: string) {
  await mkdir(path.dirname(path.join(root, name)), { recursive: true });
  await writeFile(path.join(root, name), body);
  await exec("git", ["add", "--", name], { cwd: root });
  await exec("git", ["commit", "-m", "source proof fixture"], { cwd: root });
  const observed = await exec("git", ["rev-parse", "HEAD"], { cwd: root });
  return observed.stdout.trim();
}
it("accepts only managed descendants and rejects same-size source changes", async () => {
  const root = await mkGitRepoRoot();
  roots.push(root);
  const source = await commit(root, "source.txt", "one");
  const head = await commit(root, ".agentplane/tasks/T1/quality/review.json", "{}");
  const opts = {
    checkout: root,
    task_id: "T1",
    workflow_dir: ".agentplane/tasks",
    source_sha: source,
    expected_head: head,
  };
  const proof = await observeVerificationRetrySource(opts);
  expect(proof.source_sha).toBe(source);
  await writeFile(path.join(root, "source.txt"), "two");
  await expect(observeVerificationRetrySource(opts)).rejects.toThrow("clean source");
  const changed = await commit(root, "source.txt", "two");
  await expect(observeVerificationRetrySource({ ...opts, expected_head: changed })).rejects.toThrow(
    "non-managed",
  );
});
it("rejects foreign task metadata, unexpected untracked paths and head drift", async () => {
  const root = await mkGitRepoRoot();
  roots.push(root);
  const source = await commit(root, "source.txt", "one");
  const opts = {
    checkout: root,
    task_id: "T1",
    workflow_dir: ".agentplane/tasks",
    source_sha: source,
    expected_head: source,
  };
  await writeFile(path.join(root, "untracked.txt"), "unknown");
  await expect(observeVerificationRetrySource(opts)).rejects.toThrow("clean source");
  await rm(path.join(root, "untracked.txt"));
  const head = await commit(root, ".agentplane/tasks/T2/quality/review.json", "{}");
  await expect(observeVerificationRetrySource(opts)).rejects.toThrow("ancestry changed");
  await expect(observeVerificationRetrySource({ ...opts, expected_head: head })).rejects.toThrow(
    "non-managed",
  );
});

it("refuses rewritten historical receipts even inside managed task paths", async () => {
  const root = await mkGitRepoRoot();
  roots.push(root);
  const name = ".agentplane/tasks/T1/quality/old-eval.json";
  const source = await commit(root, name, '{"status":"failed"}');
  const head = await commit(root, name, '{"status":"passed"}');
  await expect(
    observeVerificationRetrySource({
      checkout: root,
      task_id: "T1",
      workflow_dir: ".agentplane/tasks",
      source_sha: source,
      expected_head: head,
    }),
  ).rejects.toThrow("rewritten historical evidence");
});
it("refuses a newly committed managed symlink", async () => {
  const root = await mkGitRepoRoot();
  roots.push(root);
  const source = await commit(root, "source.txt", "one");
  const name = ".agentplane/tasks/T1/quality/eval.json";
  await mkdir(path.dirname(path.join(root, name)), { recursive: true });
  await symlink("../../../../source.txt", path.join(root, name));
  await exec("git", ["add", "--", name], { cwd: root });
  await exec("git", ["commit", "-m", "unsafe artifact fixture"], { cwd: root });
  const observed = await exec("git", ["rev-parse", "HEAD"], { cwd: root });
  const head = observed.stdout.trim();
  await expect(
    observeVerificationRetrySource({
      checkout: root,
      task_id: "T1",
      workflow_dir: ".agentplane/tasks",
      source_sha: source,
      expected_head: head,
    }),
  ).rejects.toThrow("regular Git artifact");
});
it("does not interpret an arbitrary PR document rewrite as a native projection", async () => {
  const root = await mkGitRepoRoot();
  roots.push(root);
  const name = ".agentplane/tasks/T1/pr/review.md";
  const source = await commit(root, name, "old native review");
  const head = await commit(root, name, "invented review");
  await expect(
    observeVerificationRetrySource({
      checkout: root,
      task_id: "T1",
      workflow_dir: ".agentplane/tasks",
      source_sha: source,
      expected_head: head,
    }),
  ).rejects.toThrow();
});
it("allows only the authenticated failed receipt projection", async () => {
  const { taskCentricDigest } = await import("@agentplaneorg/core/tasks");
  const root = await mkGitRepoRoot();
  roots.push(root);
  const name = ".agentplane/tasks/T1/supervision/declared-checks.json";
  const source = await commit(root, name, '{"status":"old"}');
  const receipt = { status: "failed" };
  const head = await commit(root, name, JSON.stringify(receipt));
  const opts = {
    checkout: root,
    task_id: "T1",
    workflow_dir: ".agentplane/tasks",
    source_sha: source,
    expected_head: head,
  };
  await expect(observeVerificationRetrySource(opts)).rejects.toThrow(
    "rewritten historical evidence",
  );
  const proof = await observeVerificationRetrySource({
    ...opts,
    failed_checks_digest: taskCentricDigest(receipt),
  });
  expect(proof.head_sha).toBe(head);
  await expect(
    observeVerificationRetrySource({
      ...opts,
      failed_checks_digest: taskCentricDigest({ status: "passed" }),
    }),
  ).rejects.toThrow("failed verification projection changed");
});
