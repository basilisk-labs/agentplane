import { describe, expect, it, vi } from "vitest";
import { mkdtemp, mkdir, writeFile, symlink, unlink } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { defaultConfig } from "@agentplaneorg/core/config";
import type { CommandContext } from "./task-backend.js";
import { observeWorkflowPolicy } from "./workflow-step-fingerprint.js";

import * as contained from "../../shared/contained-stable-file.js";

import type { WorkflowRouteStateInput } from "./workflow-step-fingerprint.js";
import { observeWorkflowPolicyScope } from "./workflow-step-policy-scope.js";

describe("workflow policy scope", () => {
  it("reuses dirty paths from the authoritative Git snapshot", async () => {
    const state = {
      workflowMode: "direct",
      task: {
        id: "202608040031-POLICY",
        status: "TODO",
        extensions: {},
      },
      resume: {},
      taskWorktree: null,
      prFlow: null,
    } as WorkflowRouteStateInput;

    await expect(
      observeWorkflowPolicyScope({
        repositoryRoot: "/path/that/is/not/a/repository",
        state,
        preobservedDirtyPaths: ["docs/guide.md", "./docs/guide.md"],
      }),
    ).resolves.toEqual({
      state: "present",
      changedPaths: ["docs/guide.md"],
      sources: ["working_tree"],
    });
  });
});

async function policyFixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "policy-link-"));
  const git = (...args: string[]) =>
    execFileSync("git", args, {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: os.devNull },
    });
  git("init", "-b", "main");
  await mkdir(path.join(root, "packages/agentplane/assets"), { recursive: true });
  await writeFile(path.join(root, "packages/agentplane/assets/AGENTS.md"), "policy one");
  await symlink("packages/agentplane/assets/AGENTS.md", path.join(root, "AGENTS.md"));
  git("add", ".");
  const observe = () =>
    observeWorkflowPolicy({
      ctx: { config: defaultConfig() } as CommandContext,
      repositoryRoot: root,
      policyPaths: ["AGENTS.md"],
      scope: { state: "present", changedPaths: [], sources: [] },
    });
  return { root, observe, git };
}

describe("canonical policy symlink observation", () => {
  it("observes the tracked contained projection and binds current target bytes", async () => {
    const f = await policyFixture();
    const first = await f.observe();
    expect(first.state).toBe("present");
    await writeFile(path.join(f.root, "packages/agentplane/assets/AGENTS.md"), "policy two");
    const next = await f.observe();
    expect(next.state).toBe("present");
    expect(next).not.toEqual(first);
  });
});

describe("policy link refusal and observation races", () => {
  it.each(["outside", "alias", "dangling", "directory", "cycle", "untracked"])(
    "refuses %s policy aliases without reading their contents",
    async (kind) => {
      const f = await policyFixture();
      const link = path.join(f.root, "AGENTS.md");
      const target = path.join(f.root, "packages/agentplane/assets/AGENTS.md");
      if (kind === "untracked") f.git("rm", "--cached", "AGENTS.md");
      else if (kind === "outside" || kind === "alias") {
        await unlink(link);
        await symlink(kind === "outside" ? "/etc/passwd" : "package.json", link);
      } else {
        await unlink(target);
        if (kind === "directory") await mkdir(target);
        if (kind === "cycle") await symlink("../../../AGENTS.md", target);
      }
      const observed = await f.observe();
      expect(observed.state).toBe("unavailable");
    },
  );

  it("refuses a link swapped after contained target observation", async () => {
    const f = await policyFixture();
    const original = contained.readContainedStableTextNoFollow;
    const spy = vi
      .spyOn(contained, "readContainedStableTextNoFollow")
      .mockImplementation(async (opts) => {
        const contents = await original(opts);
        await unlink(path.join(f.root, "AGENTS.md"));
        await symlink("packages/agentplane/assets/AGENTS.md", path.join(f.root, "AGENTS.md"));
        return contents;
      });
    try {
      const observed = await f.observe();
      expect(observed.state).toBe("unavailable");
    } finally {
      spy.mockRestore();
    }
  });
});
