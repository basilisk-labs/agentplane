import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, test } from "node:test";

import { runPostinstallHooks } from "./postinstall-hooks.mjs";

const tempRoots = [];

function makeRepo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "agentplane-postinstall-"));
  tempRoots.push(root);
  execFileSync("git", ["init", "-q"], { cwd: root });
  return root;
}

function hooksDir(root) {
  return path.join(root, ".git", "hooks");
}

function recordingRun(root) {
  const calls = [];
  const decision = runPostinstallHooks({
    cwd: root,
    runLefthook: () => calls.push("lefthook install"),
    write: () => {},
  });
  return { calls, decision };
}

afterEach(() => {
  while (tempRoots.length > 0) fs.rmSync(tempRoots.pop(), { recursive: true, force: true });
});

test("keeps AgentPlane-managed hooks byte-identical and skips lefthook", () => {
  const root = makeRepo();
  const hookPath = path.join(hooksDir(root), "pre-commit");
  const shim = "#!/usr/bin/env sh\n# agentplane-hook (do not edit)\nexit 0\n";
  fs.writeFileSync(hookPath, shim, { mode: 0o755 });

  const { calls, decision } = recordingRun(root);

  assert.deepEqual(calls, []);
  assert.equal(decision.reason, "agentplane_managed_hooks");
  assert.deepEqual(decision.managedHooks, ["pre-commit"]);
  assert.equal(fs.readFileSync(hookPath, "utf8"), shim);
});

test("runs lefthook install when no AgentPlane-managed hook exists", () => {
  const root = makeRepo();
  fs.writeFileSync(path.join(hooksDir(root), "pre-commit"), "#!/bin/sh\ncall_lefthook()\n");

  const { calls, decision } = recordingRun(root);

  assert.deepEqual(calls, ["lefthook install"]);
  assert.equal(decision.action, "lefthook_install");
});

test("detects managed hooks from a linked worktree", () => {
  const root = makeRepo();
  execFileSync(
    "git",
    ["-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "--allow-empty", "-m", "init"],
    {
      cwd: root,
    },
  );
  const worktree = path.join(root, "wt");
  execFileSync("git", ["worktree", "add", "-q", worktree], { cwd: root });
  fs.writeFileSync(
    path.join(hooksDir(root), "commit-msg"),
    "#!/usr/bin/env sh\n# agentplane-hook (do not edit)\n",
  );

  const { calls, decision } = recordingRun(worktree);

  assert.deepEqual(calls, []);
  assert.deepEqual(decision.managedHooks, ["commit-msg"]);
});

test("skips without failing outside a git repository", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agentplane-postinstall-nogit-"));
  tempRoots.push(dir);

  const { calls, decision } = recordingRun(dir);

  assert.deepEqual(calls, []);
  assert.equal(decision.reason, "not_a_git_repository");
});
