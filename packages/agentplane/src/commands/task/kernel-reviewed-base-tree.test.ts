import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { afterEach, describe, expect, it } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelRepositoryObservation } from "../../runner/observation/kernel-repository.js";
import { verifyReviewedBaseTrees } from "./kernel-reviewed-base-tree.js";

const directories: string[] = [];
afterEach(async () => {
  await Promise.all(
    directories.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  );
});
const identity = k.kernelDigest("repository");
function observation(files: Record<string, string>): KernelRepositoryObservation {
  const contents = {
    schema_version: 1 as const,
    repository_identity: identity,
    excluded_paths: [],
    files: Object.entries(files)
      .map(([name, content]) => ({
        path: name,
        kind: "file" as const,
        executable: false,
        content_digest:
          `sha256:${createHash("sha256").update(content).digest("hex")}` as k.Sha256Digest,
      }))
      .toSorted((a, b) => a.path.localeCompare(b.path)),
  };
  return { ...contents, fingerprint: k.kernelDigest(contents) };
}
async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "reviewed-base-"));
  directories.push(root);
  const git = (...args: string[]) =>
    execFileSync("git", args, {
      cwd: root,
      encoding: "utf8",
      env: {
        ...process.env,
        GIT_CONFIG_NOSYSTEM: "1",
        GIT_AUTHOR_NAME: "Test",
        GIT_AUTHOR_EMAIL: "test@example.test",
        GIT_COMMITTER_NAME: "Test",
        GIT_COMMITTER_EMAIL: "test@example.test",
      },
    }).trim();
  git("init", "-q");
  await writeFile(path.join(root, "outside.ts"), "old");
  git("add", ".");
  git("commit", "-qm", "old");
  const old_commit = git("rev-parse", "HEAD");
  await writeFile(path.join(root, "outside.ts"), "reviewed");
  git("add", ".");
  git("commit", "-qm", "reviewed");
  const new_commit = git("rev-parse", "HEAD");
  const before = observation({ "outside.ts": "old", "report.txt": "retained" });
  const after = observation({ "outside.ts": "reviewed", "report.txt": "retained" });
  const parent = {
    repository_identity: identity,
    repository_fingerprint: before.fingerprint,
    scope_roots: ["report.txt"],
  } as k.ExecutionAuthority;
  return { root, old_commit, new_commit, before, after, parent, git };
}
describe("reviewed base tree proof", () => {
  it("admits exact fast-forward tree import while preserving an admitted overlay", async () => {
    const f = await fixture();
    expect(await verifyReviewedBaseTrees(f)).toMatchObject({ imported_paths: ["outside.ts"] });
  });
  it("rejects extra implementation edits even inside the original scope", async () => {
    const f = await fixture();
    f.after = observation({ "outside.ts": "reviewed", "report.txt": "changed" });
    await expect(verifyReviewedBaseTrees(f)).rejects.toThrow("overlay changed");
  });
  it("rejects additional untracked files", async () => {
    const f = await fixture();
    f.after = observation({
      "outside.ts": "reviewed",
      "report.txt": "retained",
      "extra.ts": "new",
    });
    await expect(verifyReviewedBaseTrees(f)).rejects.toThrow("additional implementation edit");
  });
  it("rejects staged changes hidden by matching working tree bytes", async () => {
    const f = await fixture();
    await writeFile(path.join(f.root, "outside.ts"), "staged hidden edit");
    f.git("add", "outside.ts");
    await writeFile(path.join(f.root, "outside.ts"), "reviewed");
    await expect(verifyReviewedBaseTrees(f)).rejects.toThrow("staged implementation changes");
  });
  it("rejects a forged checkpoint whose digest no longer matches", async () => {
    const f = await fixture();
    f.before = { ...f.before, files: [] };
    await expect(verifyReviewedBaseTrees(f)).rejects.toThrow("authentication failed");
  });
  it("rejects a self-consistent but unapproved checkpoint", async () => {
    const f = await fixture();
    f.before = observation({ "outside.ts": "different" });
    await expect(verifyReviewedBaseTrees(f)).rejects.toThrow("binding changed");
  });
  it("rejects an old overlay outside approved scope", async () => {
    const f = await fixture();
    f.parent = { ...f.parent, scope_roots: [] };
    await expect(verifyReviewedBaseTrees(f)).rejects.toThrow("outside admitted scope");
  });
  it("rejects stale or abbreviated new pins", async () => {
    const f = await fixture();
    await expect(
      verifyReviewedBaseTrees({ ...f, new_commit: f.new_commit.slice(0, 8) }),
    ).rejects.toThrow("full commit SHAs");
    await expect(
      verifyReviewedBaseTrees({ ...f, old_commit: f.new_commit, new_commit: f.old_commit }),
    ).rejects.toThrow("current HEAD changed");
  });
  it("rejects a non-fast-forward imported head", async () => {
    const f = await fixture();
    f.git("checkout", "--orphan", "unrelated");
    f.git("commit", "-qm", "unrelated");
    await expect(
      verifyReviewedBaseTrees({ ...f, new_commit: f.git("rev-parse", "HEAD") }),
    ).rejects.toThrow();
  });
});
