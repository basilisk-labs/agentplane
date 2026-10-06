import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import { execFileAsync } from "@agentplaneorg/core/process";
import { taskBranchName } from "@agentplaneorg/core/git";
import { createTaskExecutionBaseIdentity } from "@agentplaneorg/core/tasks";
import {
  installRunCliIntegrationHarness,
  mkGitRepoRootWithCommit,
  writeConfig,
} from "@agentplane/testkit";
import type { TaskData } from "../../backends/task-backend.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { resolveLogicalRepositoryIdentity } from "../task/execution-authority-context.js";
import { cmdWorkStart } from "./work-start.js";

installRunCliIntegrationHarness();
const taskId = "202610060001-ABC123";
async function git(root: string, ...args: string[]) {
  const result = await execFileAsync("git", args, { cwd: root });
  return String(result.stdout).trim();
}
async function fixture() {
  const root = await mkGitRepoRootWithCommit();
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  config.agents.approvals.require_plan = false;
  await writeConfig(root, config);
  await mkdir(path.join(root, config.paths.workflow_dir), { recursive: true });
  await writeFile(path.join(root, "source.txt"), "frozen\n");
  await git(root, "add", ".");
  await git(root, "commit", "-qm", "frozen source");
  const sha = await git(root, "rev-parse", "HEAD");
  await git(root, "branch", "development");
  const identity = await resolveLogicalRepositoryIdentity({
    git_root: root,
    task: {},
    create_if_missing: false,
  });
  const task: TaskData = {
    id: taskId,
    title: "Frozen base",
    description: "Prepare isolated worktree",
    status: "DOING",
    priority: "med",
    owner: "CODER",
    depends_on: [],
    tags: [],
    extensions: {
      task_execution_context: createTaskExecutionBaseIdentity({
        base_ref: "development",
        base_sha: sha,
        source: "explicit",
        repository_identity: identity,
      }),
    },
  };
  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  vi.spyOn(ctx.taskBackend, "getTask").mockImplementation(() => Promise.resolve(task));
  const branch = taskBranchName({ taskPrefix: config.branch.task_prefix, taskId, slug: "frozen" });
  const target = path.join(root, config.paths.worktrees_dir, `${taskId}-frozen`);
  const start = (extra: Partial<Parameters<typeof cmdWorkStart>[0]> = {}) =>
    cmdWorkStart({
      ctx,
      cwd: root,
      taskId,
      agent: "CODER",
      slug: "frozen",
      worktree: true,
      base: "development",
      baseSha: sha,
      quiet: true,
      ...extra,
    });
  const inventory = () => git(root, "worktree", "list", "--porcelain");
  return { root, ctx, task, sha, branch, target, start, inventory };
}

describe("native frozen-base worktree preparation", { timeout: 120_000 }, () => {
  it("uses the exact frozen commit after the development branch advances, preserving dirty primary bytes", async () => {
    const f = await fixture();
    const development = path.join(f.root, ".agentplane", "development-owner");
    await git(f.root, "worktree", "add", development, "development");
    await writeFile(path.join(development, "source.txt"), "newer\n");
    await git(development, "add", "source.txt");
    await git(development, "commit", "-qm", "advance source branch");
    await writeFile(path.join(f.root, "source.txt"), "uncommitted primary\n");
    const primaryBranch = await git(f.root, "branch", "--show-current");
    expect(await f.start()).toBe(0);
    expect(await git(f.target, "rev-parse", "HEAD")).toBe(f.sha);
    expect(await git(f.root, "branch", "--show-current")).toBe(primaryBranch);
    expect(await readFile(path.join(f.root, "source.txt"), "utf8")).toBe("uncommitted primary\n");
    expect(await readFile(path.join(f.target, "source.txt"), "utf8")).toBe("frozen\n");
    expect(await readFile(path.join(development, "source.txt"), "utf8")).toBe("newer\n");
    const before = await f.inventory();
    await expect(f.start()).rejects.toThrow(/already has authoritative worktree/u);
    expect(await f.inventory()).toBe(before);
  });

  it.each(["missing", "legacy", "repository", "sha", "ref", "missing-commit", "unrelated"])(
    "rejects %s frozen evidence before creating a branch or worktree",
    async (invalid) => {
      const f = await fixture();
      const frozen = { ...(f.task.extensions!.task_execution_context as Record<string, unknown>) };
      let baseSha = f.sha;
      let base = "development";
      if (invalid === "missing") delete f.task.extensions!.task_execution_context;
      else {
        if (invalid === "legacy") frozen.source = "legacy";
        if (invalid === "repository") frozen.repository_identity = `sha256:${"f".repeat(64)}`;
        if (invalid === "sha") baseSha = "f".repeat(40);
        if (invalid === "ref") base = "main";
        if (invalid === "missing-commit") {
          baseSha = "e".repeat(40);
          frozen.base_sha = baseSha;
        }
        if (invalid === "unrelated") {
          const tree = await git(f.root, "rev-parse", "HEAD^{tree}");
          baseSha = await git(f.root, "commit-tree", tree, "-m", "unrelated root");
          frozen.base_sha = baseSha;
        }
        f.task.extensions!.task_execution_context = frozen;
      }
      const before = await f.inventory();
      await expect(f.start({ baseSha, base })).rejects.toThrow();
      expect(await f.inventory()).toBe(before);
      await expect(git(f.root, "show-ref", "--verify", `refs/heads/${f.branch}`)).rejects.toThrow();
    },
  );

  it("rejects preparation from the internal development owner even with valid admitted evidence", async () => {
    const f = await fixture();
    const internal = path.join(f.root, ".agentplane", "development-owner");
    await git(f.root, "worktree", "add", internal, "development");
    const ctx = await loadCommandContext({ cwd: internal, rootOverride: internal });
    vi.spyOn(ctx.taskBackend, "getTask").mockImplementation(() => Promise.resolve(f.task));
    const before = await f.inventory();
    await expect(f.start({ ctx, cwd: internal })).rejects.toThrow(/internal control checkout/u);
    expect(await f.inventory()).toBe(before);
  });

  it("preserves single task branch ownership", async () => {
    const f = await fixture();
    await git(
      f.root,
      "branch",
      taskBranchName({ taskPrefix: f.ctx.config.branch.task_prefix, taskId, slug: "other" }),
    );
    const before = await f.inventory();
    await expect(f.start()).rejects.toThrow(/active branch ownership/u);
    expect(await f.inventory()).toBe(before);
  });

  it("retains legacy preparation from the current base", async () => {
    const f = await fixture();
    delete f.task.extensions!.task_execution_context;
    const current = await git(f.root, "branch", "--show-current");
    expect(await f.start({ base: current, baseSha: undefined })).toBe(0);
    expect(await git(f.target, "rev-parse", "HEAD")).toBe(f.sha);
  });
});
