import { execFileAsync } from "@agentplaneorg/core/process";
import { commitAll, configureGitUser, mkGitRepoRoot } from "@agentplane/testkit";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import * as prompts from "./prompts.js";
import {
  applyInitBaseBranchSelection,
  resolveInitBaseBranchForInit,
} from "./run-cli/commands/init/base-branch.js";

describe("init base branch selection", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("plans interactive base branch creation without mutating git before apply", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await commitAll(root, "chore: seed");

    vi.spyOn(prompts, "selectPrompt").mockResolvedValue("Create new branch");
    vi.spyOn(prompts, "textPrompt").mockResolvedValue("planned-base");

    const selection = await resolveInitBaseBranchForInit({
      gitRoot: root,
      baseBranchFallback: "main",
      isInteractive: true,
      workflow: "branch_pr",
      gitRootExisted: true,
    });

    expect(selection).toEqual({
      baseBranch: "planned-base",
      createBranch: { name: "planned-base", mode: "branch" },
    });
    const beforeApply = await execFileAsync("git", ["branch", "--list", "planned-base"], {
      cwd: root,
    });
    expect(beforeApply.stdout.trim()).toBe("");

    await applyInitBaseBranchSelection({ gitRoot: root, selection });

    const afterApply = await execFileAsync("git", ["branch", "--list", "planned-base"], {
      cwd: root,
    });
    expect(afterApply.stdout.trim()).toContain("planned-base");
  });
});
