import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { applyMinorTags, planMinorTags } from "./update-minor-tags.mjs";
const release = (tag_name, extra = {}) => ({ tag_name, draft: false, prerelease: false, ...extra });
test("selects numeric stable patches and peels annotated tags", () => {
  const plan = planMinorTags(
    [
      release("v0.6.27"),
      release("v0.6.9"),
      release("v0.6.28-beta.1"),
      release("v0.6.29", { draft: true }),
      release("v0.6.30", { prerelease: true }),
      release("v0.7.8"),
    ],
    "aaa refs/tags/v0.6.27\nbbb refs/tags/v0.6.27^{}\nccc refs/tags/v0.7.8\n",
  );
  assert.deepEqual(
    plan.map(({ ref, sha }) => [ref, sha]),
    [
      ["refs/tags/v0.6", "bbb"],
      ["refs/tags/v0.7", "ccc"],
    ],
  );
  assert.throws(() => planMinorTags([release("v0.6.27")], ""), /missing/u);
});
test("real Git creation, advancement, rerun and atomic stale rejection", () => {
  const root = mkdtempSync(path.join(tmpdir(), "minor-tags-"));
  const env = {
    ...process.env,
    GIT_AUTHOR_NAME: "Test",
    GIT_AUTHOR_EMAIL: "test@example.invalid",
    GIT_COMMITTER_NAME: "Test",
    GIT_COMMITTER_EMAIL: "test@example.invalid",
  };
  const run = (args, cwd = root) =>
    execFileSync("git", args, {
      cwd,
      env,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  try {
    run(["init", "--bare", "remote.git"]);
    run(["init", "local"]);
    const git = (args) => run(args, path.join(root, "local"));
    git(["remote", "add", "origin", path.join(root, "remote.git")]);
    git(["-c", "core.hooksPath=/dev/null", "commit", "--allow-empty", "-m", "first"]);
    const first = git(["rev-parse", "HEAD"]);
    git(["tag", "-a", "v0.6.9", "-m", "annotated"]);
    git(["push", "origin", "refs/tags/v0.6.9"]);
    const plan = () =>
      planMinorTags(
        [release("v0.6.9"), ...(git(["tag", "--list", "v0.6.27"]) ? [release("v0.6.27")] : [])],
        git(["ls-remote", "--tags", "origin"]),
      );
    applyMinorTags(plan(), git);
    assert.match(git(["ls-remote", "origin", "refs/tags/v0.6"]), new RegExp(first));
    applyMinorTags(plan(), () => assert.fail("rerun must not push"));
    git(["-c", "core.hooksPath=/dev/null", "commit", "--allow-empty", "-m", "second"]);
    const second = git(["rev-parse", "HEAD"]);
    git(["tag", "v0.6.27"]);
    git(["push", "origin", "refs/tags/v0.6.27"]);
    const stale = plan();
    git(["-c", "core.hooksPath=/dev/null", "commit", "--allow-empty", "-m", "concurrent"]);
    const concurrent = git(["rev-parse", "HEAD"]);
    git(["push", "--force", "origin", `${concurrent}:refs/tags/v0.6`]);
    assert.throws(() => applyMinorTags(stale, git));
    assert.match(git(["ls-remote", "origin", "refs/tags/v0.6"]), new RegExp(concurrent));
    applyMinorTags(plan(), git);
    for (const alias of ["v0.6"])
      assert.match(git(["ls-remote", "origin", `refs/tags/${alias}`]), new RegExp(second));
    assert.equal(git(["rev-parse", "v0.6.9^{}"]), first);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
