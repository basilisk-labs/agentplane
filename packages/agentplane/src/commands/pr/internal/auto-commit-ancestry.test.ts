import { execFile } from "node:child_process";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it, vi } from "vitest";
import { GitContext } from "@agentplaneorg/core/git";
import { cleanGitEnv } from "@agentplane/testkit/cli-core-pr-flow";
import type { CommandContext } from "../../shared/task-backend.js";
import { loadBackendTask } from "../../shared/task-backend.js";
import { loadTaskCommandContext } from "../../../runtime/task-execution-context/index.js";
import { cmdPrUpdate } from "../update.js";
import { syncPrArtifacts } from "./sync.js";
import { maybeAutoCommitTaskPrArtifacts } from "./auto-commit.js";

vi.mock("../../guard/impl/env.js", () => ({
  buildGitCommitEnv: vi.fn(() => cleanGitEnv()),
  resolveCanonicalGitIdentity: vi.fn(() =>
    Promise.resolve({ name: "Test", email: "test@example.invalid" }),
  ),
}));
vi.mock("../../guard/impl/dco.js", () => ({
  appendDcoSignoff: vi.fn(() => "Signed-off-by: Test <test@example.invalid>"),
}));
vi.mock("../../../runtime/task-execution-context/index.js", () => ({
  loadTaskCommandContext: vi.fn(),
}));
vi.mock("../../shared/task-backend.js", () => ({
  loadBackendTask: vi.fn(),
  loadCommandContext: vi.fn(),
}));
vi.mock("./sync.js", () => ({ syncPrArtifacts: vi.fn() }));

const exec = promisify(execFile);
const roots: string[] = [];
const taskId = "202610010900-ABC123";
const branch = `task/${taskId}/artifact-ancestry`;
const workflowDir = ".agentplane/tasks";
const meta = `${workflowDir}/${taskId}/pr/meta.json`;
afterEach(async () => {
  vi.clearAllMocks();
  for (const root of roots.splice(0)) await rm(root, { recursive: true, force: true });
});

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-artifact-ancestry-"));
  roots.push(root);
  const git = async (...args: string[]) => {
    const result = await exec("git", args, { cwd: root, env: cleanGitEnv() });
    return result.stdout.trim();
  };
  const put = async (file: string, content: string) => {
    await mkdir(path.dirname(path.join(root, file)), { recursive: true });
    await writeFile(path.join(root, file), content);
  };
  await git("init", "-b", "main");
  await git("config", "user.name", "Test");
  await git("config", "user.email", "test@example.invalid");
  await put("source.txt", "unchanged implementation\n");
  await git("add", ".");
  await git("commit", "-m", "seed");
  await git("switch", "-c", branch);
  await put(meta, '{"verify":{"status":"pass"}}\n');
  await put(`${workflowDir}/${taskId}/README.md`, "Native completed task\n");
  await put(`${workflowDir}/${taskId}/supervision/final.json`, '{"status":"PASSED"}\n');
  await put(`${workflowDir}/${taskId}/quality/receipt.json`, '{"verdict":"pass"}\n');
  await git("add", ".");
  await git("commit", "-m", "✅ ABC123 task: persist canonical completion");
  const published = await git("rev-parse", "HEAD");
  const target = path.join(root, "remote.git");
  await git("init", "--bare", target);
  await put(".git/info/exclude", "remote.git/\n");
  await git("remote", "add", "origin", target);
  await git("push", "-u", "origin", branch);
  // Persistence must work even when the remote is unavailable. No network probe is needed.
  await git("remote", "set-url", "origin", path.join(root, "absent.git"));
  const ctx = {
    resolvedProject: { gitRoot: root },
    config: { workflow_mode: "branch_pr", paths: { workflow_dir: workflowDir } },
    git: new GitContext({ gitRoot: root }),
  } as unknown as CommandContext;
  return { root, git, put, published, target, ctx };
}

describe("PR artifact published ancestry", () => {
  it.each(["auto", "update"] as const)(
    "preserves a published terminal commit through %s",
    async (mode) => {
      const f = await fixture();
      await f.put(meta, '{"verify":{"status":"pass"},"pr_number":1}\n');
      await f.put("unrelated.txt", "not part of the task packet\n");
      if (mode === "update") {
        vi.mocked(loadTaskCommandContext).mockResolvedValue({
          command: f.ctx,
          execution: { selected_mode: "branch_pr", base_ref: "main" },
        } as never);
        vi.mocked(loadBackendTask).mockResolvedValue({
          config: f.ctx.config,
          task: { verify: [] },
        } as never);
        vi.mocked(syncPrArtifacts).mockResolvedValue({
          meta: { branch },
          prDir: path.join(f.root, workflowDir, taskId, "pr"),
          resolved: f.ctx.resolvedProject,
        } as never);
        expect(await cmdPrUpdate({ ctx: f.ctx, cwd: f.root, taskId, silent: true })).toBe(0);
      } else {
        expect(
          await maybeAutoCommitTaskPrArtifacts({ ctx: f.ctx, taskId, branch, strategy: "auto" }),
        ).toBe(true);
      }
      const head = await f.git("rev-parse", "HEAD");
      expect(await f.git("rev-parse", "HEAD^1")).toBe(f.published);
      await f.git("merge-base", "--is-ancestor", f.published, head);
      expect(await f.git("diff", "--name-only", f.published, head)).toBe(meta);
      expect(await f.git("log", "-1", "--format=%B")).toContain(
        "Signed-off-by: Test <test@example.invalid>",
      );
      expect(await f.git("status", "--porcelain")).toBe("?? unrelated.txt");
      await f.git("remote", "set-url", "origin", f.target);
      await f.git("push", "origin", branch);
      expect(await f.git("--git-dir", f.target, "rev-parse", `refs/heads/${branch}`)).toBe(head);
    },
  );

  it("refuses foreign staged changes without changing the index or published HEAD", async () => {
    const f = await fixture();
    await f.put(meta, '{"pr_number":1}\n');
    await f.put("foreign.txt", "foreign staged content\n");
    await f.git("add", "foreign.txt");
    const before = await f.git("write-tree");
    expect(await maybeAutoCommitTaskPrArtifacts({ ctx: f.ctx, taskId, branch })).toBe(false);
    expect(await f.git("write-tree")).toBe(before);
    expect(await f.git("rev-parse", "HEAD")).toBe(f.published);
    expect(await f.git("diff", "--name-only")).toBe(meta);
  });

  it("refuses another branch without staging owned artifacts", async () => {
    const f = await fixture();
    await f.put(meta, '{"pr_number":1}\n');
    expect(
      await maybeAutoCommitTaskPrArtifacts({ ctx: f.ctx, taskId, branch: "task/other/branch" }),
    ).toBe(false);
    expect(await f.git("diff", "--cached", "--name-only")).toBe("");
    expect(await f.git("rev-parse", "HEAD")).toBe(f.published);
  });
});
