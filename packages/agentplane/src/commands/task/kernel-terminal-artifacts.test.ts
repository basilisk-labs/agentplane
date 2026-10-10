import type * as TaskBackend from "../shared/task-backend.js";
import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ports = vi.hoisted(() => ({
  commit: vi.fn(),
  close: vi.fn(),
  loadTask: vi.fn(),
}));
vi.mock("../guard/impl/commit.js", () => ({ cmdCommit: ports.commit }));
vi.mock("./finish-close.js", () => ({ materializeBranchPrCloseTail: ports.close }));
vi.mock("../shared/task-backend.js", async (original) => ({
  ...(await original<typeof TaskBackend>()),
  loadTaskFromContext: ports.loadTask,
}));

import { commitCanonicalTerminalTaskArtifacts } from "./kernel-terminal-artifacts.js";

const exec = promisify(execFile);
const roots: string[] = [];
const taskId = "202610060918-3FK38R";
const taskRoot = `.agentplane/tasks/${taskId}`;
const projections = [
  "meta.json",
  "review.md",
  "diffstat.txt",
  "github-title.txt",
  "github-body.md",
];
async function git(root: string, ...args: string[]) {
  const result = await exec("git", args, { cwd: root });
  return result.stdout.trim();
}
async function put(root: string, relative: string, content: string) {
  await mkdir(path.dirname(path.join(root, relative)), { recursive: true });
  await writeFile(path.join(root, relative), content);
}
async function fixture(mode = "branch_pr", branch = `task/${taskId}/fixture`) {
  const root = await mkdtemp(path.join(os.tmpdir(), "terminal-artifact-owner-"));
  roots.push(root);
  await git(root, "init", "-b", branch);
  await git(root, "config", "user.name", "Fixture");
  await git(root, "config", "user.email", "fixture@example.com");
  await put(root, `${taskRoot}/README.md`, "completed\n");
  await put(root, `${taskRoot}/supervision/final.json`, "passed\n");
  await put(root, "source.ts", "original\n");
  await put(root, ".agentplane/tasks/other/README.md", "other\n");
  for (const file of projections) await put(root, `${taskRoot}/pr/${file}`, "published\n");
  await git(root, "add", ".");
  await git(root, "commit", "-m", "fixture");
  ports.loadTask.mockResolvedValue({ execution_route: { repository_mode: mode } });
  const command = {
    resolvedProject: { gitRoot: root },
    config: {
      paths: { workflow_dir: ".agentplane/tasks" },
      branch: { task_prefix: "task", task_close_prefix: "close" },
    },
    git: { invalidateStatus: vi.fn() },
  } as unknown as TaskBackend.CommandContext;
  return { root, command };
}
async function snapshot(root: string) {
  return {
    head: await git(root, "rev-parse", "HEAD"),
    status: await git(root, "status", "--porcelain=v1", "--untracked-files=all"),
    patch: await git(root, "diff", "HEAD"),
    index: await git(root, "diff", "--cached"),
  };
}
async function persist(root: string) {
  await git(root, "add", taskRoot);
  await git(root, "commit", "-m", "native terminal fixture port");
  return 0;
}
beforeEach(() => vi.resetAllMocks());
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("canonical terminal artifact ownership", () => {
  it("leaves published PR refreshes and unrelated dirt byte-stable on repeated calls", async () => {
    const { root, command } = await fixture();
    for (const file of projections) await put(root, `${taskRoot}/pr/${file}`, "refreshed\n");
    await put(root, "source.ts", "unrelated change\n");
    await put(root, ".agentplane/tasks/other/README.md", "other changed\n");
    await git(root, "add", `${taskRoot}/pr/meta.json`, "source.ts");
    const before = await snapshot(root);
    expect(await commitCanonicalTerminalTaskArtifacts(command, taskId)).toBe(false);
    expect(await commitCanonicalTerminalTaskArtifacts(command, taskId)).toBe(false);
    expect(await snapshot(root)).toEqual(before);
    expect(ports.commit).not.toHaveBeenCalled();
    expect(ports.close).not.toHaveBeenCalled();
  });

  it.each(["README.md", "supervision/final.json", "pr-extra/evidence.json"])(
    "persists genuine terminal artifact %s on the task branch",
    async (file) => {
      const { root, command } = await fixture();
      await put(root, `${taskRoot}/${file}`, "new canonical evidence\n");
      const before = await git(root, "rev-parse", "HEAD");
      ports.commit.mockImplementation(() => persist(root));
      expect(await commitCanonicalTerminalTaskArtifacts(command, taskId)).toBe(true);
      expect(await git(root, "rev-parse", "HEAD")).not.toBe(before);
      expect(await git(root, "status", "--porcelain")).toBe("");
      expect(ports.commit).toHaveBeenCalledWith(
        expect.objectContaining({
          taskId,
          allow: [],
          allowTasks: true,
          autoAllow: false,
          requireClean: false,
          allowBase: false,
          allowPolicy: false,
          close: false,
        }),
      );
    },
  );

  it("persists mixed canonical changes and then leaves a subsequent PR refresh to its owner", async () => {
    const { root, command } = await fixture();
    await put(root, `${taskRoot}/README.md`, "new canonical completion\n");
    await put(root, `${taskRoot}/pr/review.md`, "first refresh\n");
    await put(root, "source.ts", "unrelated change\n");
    await put(root, ".agentplane/tasks/other/README.md", "other change\n");
    ports.commit.mockImplementation(async () => {
      await persist(root);
      await put(root, `${taskRoot}/pr/review.md`, "post-commit refresh\n");
      return 0;
    });
    expect(await commitCanonicalTerminalTaskArtifacts(command, taskId)).toBe(true);
    const after = await snapshot(root);
    expect(await commitCanonicalTerminalTaskArtifacts(command, taskId)).toBe(false);
    expect(await snapshot(root)).toEqual(after);
    expect(ports.commit).toHaveBeenCalledTimes(1);
    expect(await git(root, "show", "HEAD:source.ts")).toBe("original");
    expect(await readFile(path.join(root, "source.ts"), "utf8")).toBe("unrelated change\n");
    expect(await git(root, "show", "HEAD:.agentplane/tasks/other/README.md")).toBe("other");
  });

  it.each(["README.md", "pr/meta.json"])("keeps direct persistence for %s", async (file) => {
    const { root, command } = await fixture("direct", "main");
    await put(root, `${taskRoot}/${file}`, "direct completion\n");
    ports.commit.mockImplementation(() => persist(root));
    expect(await commitCanonicalTerminalTaskArtifacts(command, taskId)).toBe(true);
    expect(ports.commit).toHaveBeenCalledOnce();
    expect(ports.close).not.toHaveBeenCalled();
  });

  it("preserves close-tail materialization for genuine state on base", async () => {
    const { root, command } = await fixture("branch_pr", "main");
    await put(root, `${taskRoot}/README.md`, "closed\n");
    ports.close.mockImplementation(async () => {
      await persist(root);
      return "close/fixture";
    });
    expect(await commitCanonicalTerminalTaskArtifacts(command, taskId)).toBe(true);
    expect(ports.close).toHaveBeenCalledWith(
      expect.objectContaining({ taskId, closeUnstageOthers: true }),
    );
    expect(ports.commit).not.toHaveBeenCalled();
  });

  it("does not create a close tail merely for PR projections on base", async () => {
    const { root, command } = await fixture("branch_pr", "main");
    await put(root, `${taskRoot}/pr/meta.json`, "observed\n");
    const before = await snapshot(root);
    expect(await commitCanonicalTerminalTaskArtifacts(command, taskId)).toBe(false);
    expect(await snapshot(root)).toEqual(before);
    expect(ports.close).not.toHaveBeenCalled();
  });

  it.each(["commit failure", "remaining dirt"])("fails closed on %s", async (failure) => {
    const { root, command } = await fixture();
    await put(root, `${taskRoot}/README.md`, "unpersisted\n");
    ports.commit.mockResolvedValue(failure === "commit failure" ? 1 : 0);
    await expect(commitCanonicalTerminalTaskArtifacts(command, taskId)).rejects.toThrow(
      failure === "commit failure" ? "commit exited 1" : "remain dirty after commit",
    );
  });

  it("preserves the guard rejection for staged unrelated source", async () => {
    const { root, command } = await fixture();
    await put(root, `${taskRoot}/README.md`, "unpersisted\n");
    await put(root, "source.ts", "staged unrelated\n");
    await git(root, "add", "source.ts");
    const before = await snapshot(root);
    ports.commit.mockRejectedValue(new Error("guard rejected unrelated staged source"));
    await expect(commitCanonicalTerminalTaskArtifacts(command, taskId)).rejects.toThrow(
      "guard rejected",
    );
    expect(await snapshot(root)).toEqual(before);
  });
});
