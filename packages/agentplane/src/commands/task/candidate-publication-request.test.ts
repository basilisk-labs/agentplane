import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  candidatePublicationApprovalRequest,
  candidatePublicationRequestSchema,
  candidateRemoteUrl,
} from "./candidate-publication-request.js";
import { assertCandidateTree, readCandidateTree } from "./candidate-publication-tree.js";

const roots: string[] = [];
afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});
function fixture() {
  const root = mkdtempSync(path.join(os.tmpdir(), "candidate-request-"));
  roots.push(root);
  const git = (...args: string[]) =>
    execFileSync("git", args, {
      cwd: root,
      env: { ...process.env, GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: os.devNull },
      encoding: "utf8",
    }).trim();
  git("init", "--quiet");
  git("config", "user.name", "Fixture");
  git("config", "user.email", "fixture@example.invalid");
  writeFileSync(path.join(root, "source.txt"), "old\n");
  writeFileSync(path.join(root, "deleted.txt"), "gone\n");
  git("add", ".");
  git("-c", "core.hooksPath=" + os.devNull, "commit", "--quiet", "-m", "base");
  const base = git("rev-parse", "HEAD");
  writeFileSync(path.join(root, "source.txt"), "reviewed\n");
  rmSync(path.join(root, "deleted.txt"));
  git("add", "-A");
  git("-c", "core.hooksPath=" + os.devNull, "commit", "--quiet", "-m", "candidate");
  return { root, base, commit: git("rev-parse", "HEAD") };
}
async function request() {
  const f = fixture();
  const tree = await readCandidateTree(f.root, f.base, f.commit);
  const contents = {
    schema_version: 1 as const,
    kind: "candidate_publication_request" as const,
    task_id: "T-1",
    record_digest: k.kernelDigest("record"),
    repository_identity: k.kernelDigest("repo"),
    plan_digest: k.kernelDigest("plan"),
    plan_revision: 1,
    work_item_id: "code",
    attempt: 1,
    claim_id: k.kernelDigest("claim"),
    contract_digest: k.kernelDigest("contract"),
    work_order_digest: k.kernelDigest("work-order"),
    begin_receipt_digest: k.kernelDigest("begin"),
    review_digest: k.kernelDigest("review"),
    ...tree,
    remote_url: "https://github.com/example/project.git",
    candidate_ref: `refs/heads/agentplane-candidates/T-1/${f.commit}`,
    expected_remote_head: null,
  };
  return { ...f, value: { ...contents, digest: k.kernelDigest(contents) } };
}

describe("immutable candidate preparation", () => {
  it("binds exact changed tracked bytes and deletions despite unrelated dirty files", async () => {
    const f = await request();
    writeFileSync(path.join(f.root, "unrelated.txt"), "private local scratch");
    writeFileSync(path.join(f.root, "source.txt"), "unreviewed dirty replacement");
    const parsed = candidatePublicationRequestSchema.parse(f.value);
    await expect(assertCandidateTree(f.root, parsed)).resolves.toBeUndefined();
    expect(parsed.files.map((entry) => entry.path)).toEqual(["deleted.txt", "source.txt"]);
    expect(parsed.files[0]).toEqual({
      path: "deleted.txt",
      mode: null,
      blob: null,
      content_digest: null,
    });
    const preparation = candidatePublicationApprovalRequest(parsed);
    expect(preparation.kind).toBe("approval_required");
    expect(preparation.request).toEqual(parsed);
    expect(preparation.permitted_effects).toEqual(["publish_exact_candidate_ref"]);
    expect(preparation.forbidden_effects).toContain("task_completion");
  });
  it("rejects a rehashed manifest that omits a changed path", async () => {
    const f = await request();
    const { digest: _digest, ...value } = f.value;
    value.files = value.files.slice(1);
    value.files_digest = k.kernelDigest(value.files);
    const altered = candidatePublicationRequestSchema.parse({
      ...value,
      digest: k.kernelDigest(value),
    });
    await expect(assertCandidateTree(f.root, altered)).rejects.toThrow("does not match");
  });
  it("rejects claiming dirty working bytes as published candidate content", async () => {
    const f = await request();
    const { digest: _digest, ...value } = f.value;
    value.files[1]!.content_digest = k.kernelDigest("dirty bytes");
    value.files_digest = k.kernelDigest(value.files);
    await expect(
      assertCandidateTree(f.root, { ...value, digest: k.kernelDigest(value) }),
    ).rejects.toThrow("does not match");
  });
  it.each(["task_id", "record_digest", "plan_digest", "claim_id", "commit", "tree", "remote_url"])(
    "rejects changed %s without approval identity refresh",
    async (field) => {
      const f = await request();
      expect(
        candidatePublicationRequestSchema.safeParse({ ...f.value, [field]: "changed" }).success,
      ).toBe(false);
    },
  );
  it.each([
    "https://token@github.com/repo.git",
    "https://github.com/repo.git?token=secret",
    "ssh://git:secret@host/repo",
    "file:///tmp/repo",
    "ext::command",
    "https://host/repo#secret",
  ])("rejects unsafe or credential-bearing destination %s", (url) => {
    expect(candidateRemoteUrl(url)).toBe(false);
  });
  it("rejects mutable and non-candidate destination refs", async () => {
    const f = await request();
    for (const candidate_ref of [
      "refs/heads/main",
      "refs/tags/v1",
      "refs/heads/agentplane-candidates/T-1/other",
    ]) {
      const { digest: _digest, ...value } = { ...f.value, candidate_ref };
      expect(
        candidatePublicationRequestSchema.safeParse({ ...value, digest: k.kernelDigest(value) })
          .success,
      ).toBe(false);
    }
  });
});
