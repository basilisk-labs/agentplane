import { execFile } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { defaultConfig } from "../../cli/core-imports.js";
import {
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  pathExists,
  writeConfig,
} from "@agentplane/testkit";
import { runTaskNewParsed } from "./new.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";

installRunCliIntegrationHarness();

describe("task new primary-checkout routing", { timeout: 180_000 }, () => {
  it("stores a sibling task in the primary checkout when invoked from a task worktree", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await commitAll(root, "seed primary checkout");

    const taskWorktree = path.join(root, ".agentplane", "worktrees", "existing-task");
    await promisify(execFile)(
      "git",
      ["worktree", "add", "-b", "task/202608211010-EXIST3/work", taskWorktree],
      { cwd: root },
    );

    const staleWorktreeConfig = structuredClone(config);
    staleWorktreeConfig.workflow_mode = "direct";
    await writeConfig(taskWorktree, staleWorktreeConfig);

    const created = await runTaskNewParsed({
      cwd: taskWorktree,
      rootOverride: taskWorktree,
      parsed: {
        title: "Primary checkout sibling",
        description: "Keep sibling task ownership out of the invoking task worktree.",
        owner: "CODER",
        priority: "med",
        tags: ["workflow"],
        dependsOn: [],
        verify: [],
        showBlueprint: false,
        allowDuplicate: false,
      },
    });

    expect(
      await pathExists(path.join(root, ".agentplane", "tasks", created.task_id, "README.md")),
    ).toBe(true);
    expect(
      await pathExists(
        path.join(taskWorktree, ".agentplane", "tasks", created.task_id, "README.md"),
      ),
    ).toBe(false);
  });

  it("keeps later task issuance canonical after the repository enters cutover", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    await writeConfig(root, config);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await commitAll(root, "seed canonical cutover");
    const parsed = {
      title: "Canonical cutover task",
      description: "Create a canonical task after repository cutover.",
      owner: "CODER",
      priority: "med" as const,
      tags: ["workflow"],
      dependsOn: [],
      verify: [],
      showBlueprint: false,
      allowDuplicate: true,
    };

    await runTaskNewParsed({
      cwd: root,
      rootOverride: root,
      parsed: { ...parsed, title: "Activate canonical cutover", canonical: true },
      printTaskId: false,
    });
    const second = await runTaskNewParsed({
      cwd: root,
      rootOverride: root,
      parsed,
      printTaskId: false,
    });
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const stored = await ctx.taskBackend.getTask(second.task_id);

    expect(stored?.extensions).toHaveProperty(TASK_KERNEL_EXTENSION);
  });
});
