import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { CommandContext } from "../shared/task-backend.js";
import type { CommandCtx } from "../../cli/spec/spec.js";
import {
  hydrateTaskSideEffectAuthority,
  loadSideEffectAuthorityState,
} from "../shared/side-effect-authority-store.js";
import { nativeCandidateFixture } from "@agentplane/testkit/task";
import { readCandidateTree } from "./candidate-publication-tree.js";
import type * as CandidateContextModule from "./candidate-publication-context.js";
import type { candidatePublicationApprovalRequest } from "./candidate-publication-request.js";
import { readCandidateContext } from "./candidate-publication-context.js";
import {
  makeRunTaskCandidateHandler,
  type CandidateParsed,
} from "./candidate-publication.command.js";

// The command boundary uses authenticated issuance fixtures; transport/native admission are tested separately.
vi.mock("./candidate-publication-context.js", async (importOriginal) => ({
  ...(await importOriginal<typeof CandidateContextModule>()),
  readCandidateContext: vi.fn(),
}));
const roots: string[] = [];
afterEach(() => {
  vi.restoreAllMocks();
  vi.clearAllMocks();
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});
async function fixture() {
  const root = mkdtempSync(path.join(os.tmpdir(), "candidate-cli-"));
  roots.push(root);
  const git = (...args: string[]) =>
    execFileSync("git", args, {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, GIT_CONFIG_GLOBAL: os.devNull, GIT_CONFIG_NOSYSTEM: "1" },
    }).trim();
  git("init", "--quiet");
  git("config", "user.name", "Fixture");
  git("config", "user.email", "fixture@example.invalid");
  writeFileSync(path.join(root, "file"), "base");
  git("add", "file");
  git("-c", `core.hooksPath=${os.devNull}`, "commit", "--quiet", "-m", "base");
  const base = git("rev-parse", "HEAD");
  writeFileSync(path.join(root, "file"), "candidate");
  git("add", "file");
  git("-c", `core.hooksPath=${os.devNull}`, "commit", "--quiet", "-m", "candidate");
  const commit = git("rev-parse", "HEAD");
  const f = nativeCandidateFixture(root, commit);
  const taskId = f.record.aggregate.id;
  const canonicalBefore = JSON.stringify(f.record);
  vi.mocked(readCandidateContext).mockImplementation(async () => ({
    ...f,
    fingerprint: f.raw.state_fingerprint,
    task: await hydrateTaskSideEffectAuthority({
      gitRoot: root,
      taskId,
      task: { id: taskId, extensions: {} } as never,
    }),
  }));
  const command = { resolvedProject: { gitRoot: root }, memo: {} } as CommandContext;
  const handler = makeRunTaskCandidateHandler(() => Promise.resolve(command));
  const output: string[] = [];
  vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
    output.push(String(chunk));
    return true;
  });
  const tree = await readCandidateTree(root, base, commit);
  const input = {
    work_order_digest: f.pins.work_order_digest,
    base_commit: base,
    commit,
    frozen_files_digest: tree.files_digest,
    review_digest: k.kernelDigest("review"),
    remote_url: "https://example.invalid/project.git",
    candidate_ref: `refs/heads/agentplane-candidates/fixture/${commit}`,
  };
  const file = path.join(root, "input.json");
  writeFileSync(file, JSON.stringify(input));
  const run = (extra: Partial<CandidateParsed>) =>
    handler({ cwd: root } as CommandCtx, { action: "prepare", taskId, file, ttl: 15, ...extra });
  await run({});
  const prepared = JSON.parse(output.at(-1)!) as ReturnType<
    typeof candidatePublicationApprovalRequest
  >;
  const requestFile = path.join(root, "request.json");
  writeFileSync(requestFile, JSON.stringify(prepared.request));
  return { root, f, taskId, run, prepared, requestFile, canonicalBefore, input, file, output };
}
it("prepares without granting and approves/revokes exact authority without changing native task", async () => {
  const f = await fixture();
  expect(existsSync(path.join(f.root, ".git/agentplane/side-effect-authority"))).toBe(false);
  const approve = {
    action: "approve" as const,
    file: f.requestFile,
    by: "USER",
    approval: f.prepared.approval_digest,
  };
  await f.run(approve);
  const state = await loadSideEffectAuthorityState({ gitRoot: f.root, taskId: f.taskId, task: {} });
  expect(state.state?.grants).toHaveLength(1);
  expect(state.state?.grants[0].evidenceDigest).toBe(f.prepared.approval_digest);
  await expect(f.run(approve)).rejects.toThrow("already exists");
  const stored = path.join(
    f.root,
    ".git/agentplane/candidate-publication",
    f.taskId,
    f.prepared.request.digest.slice(7),
    "request.json",
  );
  expect(JSON.parse(readFileSync(stored, "utf8"))).toEqual(f.prepared.request);
  await f.run({ action: "revoke", digest: f.prepared.request.digest, by: "USER" });
  const revoked = await loadSideEffectAuthorityState({
    gitRoot: f.root,
    taskId: f.taskId,
    task: {},
  });
  expect(revoked.state?.grants).toEqual([]);
  expect(JSON.stringify(f.f.record)).toBe(f.canonicalBefore);
  await expect(f.run({ action: "publish", digest: f.prepared.request.digest })).rejects.toThrow(
    "missing, revoked, expired, or stale",
  );
});
it("rejects wrong approval and frozen manifest before creating authority", async () => {
  const f = await fixture();
  await expect(
    f.run({
      action: "approve",
      file: f.requestFile,
      by: "EXECUTOR",
      approval: f.prepared.approval_digest,
    }),
  ).rejects.toThrow("USER");
  await expect(
    f.run({
      action: "approve",
      file: f.requestFile,
      by: "USER",
      approval: k.kernelDigest("wrong"),
    }),
  ).rejects.toThrow("exact separate USER");
  writeFileSync(
    f.file,
    JSON.stringify({ ...f.input, frozen_files_digest: k.kernelDigest("wrong") }),
  );
  await expect(f.run({ action: "prepare" })).rejects.toThrow("frozen file inventory");
  expect(existsSync(path.join(f.root, ".git/agentplane/side-effect-authority"))).toBe(false);
});
it("rejects request substitution and unsafe storage identities before dispatch", async () => {
  const f = await fixture();
  await expect(
    f.run({
      action: "approve",
      file: f.requestFile,
      taskId: "other",
      by: "USER",
      approval: f.prepared.approval_digest,
    }),
  ).rejects.toThrow("identity changed");
  await expect(f.run({ action: "publish", digest: "../../foreign" })).rejects.toThrow(
    "storage identity",
  );
});
