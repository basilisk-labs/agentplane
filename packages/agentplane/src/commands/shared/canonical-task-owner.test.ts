import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFile, rm, writeFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { configureGitUser, mockConfig, tempRepo } from "@agentplane/testkit";
import { KernelBackendAdapter } from "../../adapters/task-backend/kernel-backend-adapter.js";
import {
  kernelReplayJourney,
  replayRepositoryIdentity,
} from "../../adapters/task-backend/kernel-replay-journey.test-fixtures.js";
import { cmdTaskScaffold } from "../task/scaffold.js";
import {
  listTaskSummariesMemo,
  loadCommandContext,
  loadTaskFromContext,
  resolveTaskOwnerCommandContext,
} from "./task-backend.js";

const git = promisify(execFile);

describe("canonical task ownership across worktrees", { timeout: 120_000 }, () => {
  it.each(["base", "owner"])(
    "does not let a legacy %s projection hide canonical identity",
    async (legacyLocation) => {
      const repo = await tempRepo({ branch: "main" });
      await configureGitUser(repo.root);
      await repo.writeConfig(
        mockConfig((config) => {
          config.workflow_mode = "branch_pr";
        }),
      );
      const primary = await loadCommandContext({ cwd: repo.root });
      const journey = kernelReplayJourney("branch_pr");
      const taskId = journey.task.id;
      const adapter = new KernelBackendAdapter(primary.taskBackend, replayRepositoryIdentity);
      expect(await adapter.create(journey.task, journey.steps[0]!.input)).toMatchObject({
        kind: "committed",
      });
      await git("git", ["add", "."], { cwd: repo.root });
      await git("git", ["-c", "core.hooksPath=/dev/null", "commit", "-m", "seed identity"], {
        cwd: repo.root,
      });
      const owner = path.join(repo.root, ".agentplane/worktrees/owner");
      await git("git", ["worktree", "add", "-b", `task/${taskId}/owner`, owner], {
        cwd: repo.root,
      });
      const ownerCtx = await loadCommandContext({ cwd: owner });
      const legacyBackend = legacyLocation === "base" ? primary.taskBackend : ownerCtx.taskBackend;
      const task = (await legacyBackend.getTask(taskId))!;
      const extensions = { ...task.extensions };
      delete extensions.task_kernel;
      await legacyBackend.writeTask({ ...task, extensions });
      const relative = path.join(".agentplane/tasks", taskId, "README.md");
      const baseBytes = await readFile(path.join(repo.root, relative));
      const ownerBytes = await readFile(path.join(owner, relative));
      for (const cwd of [repo.root, owner]) {
        const ctx = await loadCommandContext({ cwd });
        if (legacyLocation === "owner") {
          const failure = {
            code: "E_VALIDATION",
            context: { reason_code: "canonical_owner_record_missing" },
          };
          await expect(loadTaskFromContext({ ctx, taskId })).rejects.toMatchObject(failure);
          await expect(listTaskSummariesMemo(ctx)).rejects.toMatchObject(failure);
          await expect(resolveTaskOwnerCommandContext({ ctx, taskId })).rejects.toMatchObject(
            failure,
          );
          await expect(
            cmdTaskScaffold({
              ctx,
              cwd,
              taskId,
              force: true,
              yes: true,
              overwrite: true,
              quiet: true,
            }),
          ).rejects.toMatchObject(failure);
        } else {
          const live = await ownerCtx.taskBackend.getTask(taskId);
          expect(await loadTaskFromContext({ ctx, taskId })).toEqual(live);
          expect(
            (await listTaskSummariesMemo(ctx)).find((entry) => entry.id === taskId)?.extensions
              ?.task_kernel,
          ).toEqual(live?.extensions?.task_kernel);
          expect(
            (await resolveTaskOwnerCommandContext({ ctx, taskId })).resolvedProject.gitRoot,
          ).toBe(owner);
          await expect(
            cmdTaskScaffold({
              ctx,
              cwd,
              taskId,
              force: true,
              yes: true,
              overwrite: true,
              quiet: true,
            }),
          ).rejects.toMatchObject({
            code: "E_VALIDATION",
            context: { reason_code: "canonical_scaffold_forbidden" },
          });
        }
      }
      expect(await readFile(path.join(repo.root, relative))).toEqual(baseBytes);
      expect(await readFile(path.join(owner, relative))).toEqual(ownerBytes);
      await writeFile(path.join(repo.root, relative), "---\nid: [broken\n---\n");
      for (const cwd of [repo.root, owner]) {
        const ctx = await loadCommandContext({ cwd });
        const read = loadTaskFromContext({ ctx, taskId, preferBranchSnapshot: true });
        if (legacyLocation === "owner") {
          await expect(read).rejects.toThrow();
          await expect(resolveTaskOwnerCommandContext({ ctx, taskId })).rejects.toThrow();
          await expect(
            cmdTaskScaffold({
              ctx,
              cwd,
              taskId,
              force: true,
              yes: true,
              overwrite: true,
              quiet: true,
            }),
          ).rejects.toThrow();
        } else {
          expect(await read).toEqual(await ownerCtx.taskBackend.getTask(taskId));
        }
      }
      expect(await readFile(path.join(repo.root, relative), "utf8")).toBe(
        "---\nid: [broken\n---\n",
      );
      expect(await readFile(path.join(owner, relative))).toEqual(ownerBytes);
    },
  );

  it("reads live owner state across execution and review without replacing either projection", async () => {
    const repo = await tempRepo({ branch: "main" });
    await configureGitUser(repo.root);
    await repo.writeConfig(
      mockConfig((config) => {
        config.workflow_mode = "branch_pr";
      }),
    );
    const initial = await loadCommandContext({ cwd: repo.root });
    const journey = kernelReplayJourney("branch_pr");
    const taskId = journey.task.id;
    const adapter = new KernelBackendAdapter(initial.taskBackend, replayRepositoryIdentity);
    expect(await adapter.create(journey.task, journey.steps[0]!.input)).toMatchObject({
      kind: "committed",
    });
    await git("git", ["add", "."], { cwd: repo.root });
    await git("git", ["-c", "core.hooksPath=/dev/null", "commit", "-m", "seed canonical task"], {
      cwd: repo.root,
    });
    const owner = path.join(repo.root, ".agentplane/worktrees/owner");
    await git("git", ["worktree", "add", "-b", `task/${taskId}/owner`, owner], { cwd: repo.root });
    const ownerCtx = await loadCommandContext({ cwd: owner });
    const ownerAdapter = new KernelBackendAdapter(ownerCtx.taskBackend, replayRepositoryIdentity);
    const relative = path.join(".agentplane/tasks", taskId, "README.md");
    const originalBase = await readFile(path.join(repo.root, relative));

    for (const step of journey.steps.slice(1, 10)) {
      expect(await ownerAdapter.execute(step.input)).toMatchObject({ kind: "committed" });
      const caller = await loadCommandContext({ cwd: repo.root });
      const live = await ownerCtx.taskBackend.getTask(taskId);
      expect(await loadTaskFromContext({ ctx: caller, taskId })).toEqual(live);
      expect(
        (await resolveTaskOwnerCommandContext({ ctx: caller, taskId })).resolvedProject.gitRoot,
      ).toBe(owner);
      expect(
        (await listTaskSummariesMemo(caller)).find((task) => task.id === taskId)?.extensions
          ?.task_kernel,
      ).toEqual(live?.extensions?.task_kernel);
      const filtered = await listTaskSummariesMemo(await loadCommandContext({ cwd: repo.root }), {
        projectionStatus: [live!.status],
      });
      expect(filtered.some((task) => task.id === taskId)).toBe(true);
      expect(await readFile(path.join(repo.root, relative))).toEqual(originalBase);
    }

    await rm(path.join(repo.root, relative));
    const caller = await loadCommandContext({ cwd: repo.root });
    const liveBytes = await readFile(path.join(owner, relative));
    expect(await loadTaskFromContext({ ctx: caller, taskId })).toEqual(
      await ownerCtx.taskBackend.getTask(taskId),
    );
    for (const overwrite of [false, true]) {
      await expect(
        cmdTaskScaffold({
          ctx: caller,
          cwd: repo.root,
          taskId,
          force: true,
          yes: true,
          overwrite,
          quiet: true,
        }),
      ).rejects.toMatchObject({
        code: "E_VALIDATION",
        context: { reason_code: "canonical_scaffold_forbidden" },
      });
    }
    await expect(readFile(path.join(repo.root, relative))).rejects.toMatchObject({
      code: "ENOENT",
    });
    expect(await readFile(path.join(owner, relative))).toEqual(liveBytes);
    await rm(path.join(owner, relative));
    await expect(
      loadTaskFromContext({ ctx: await loadCommandContext({ cwd: repo.root }), taskId }),
    ).rejects.toMatchObject({
      code: "E_IO",
      context: { reason_code: "authoritative_task_readme_unavailable" },
    });
  });

  it("resolves an untracked primary canonical task before its owner branch exists", async () => {
    const repo = await tempRepo({ branch: "main" });
    await configureGitUser(repo.root);
    await repo.writeConfig(
      mockConfig((config) => {
        config.workflow_mode = "branch_pr";
      }),
    );
    await git("git", ["add", "."], { cwd: repo.root });
    await git("git", ["-c", "core.hooksPath=/dev/null", "commit", "-m", "seed old checkout"], {
      cwd: repo.root,
    });
    const stale = path.join(repo.root, ".agentplane/worktrees/stale");
    await git("git", ["worktree", "add", "-b", "recovery/stale", stale], { cwd: repo.root });
    const primary = await loadCommandContext({ cwd: repo.root });
    const journey = kernelReplayJourney("branch_pr");
    const adapter = new KernelBackendAdapter(primary.taskBackend, replayRepositoryIdentity);
    expect(await adapter.create(journey.task, journey.steps[0]!.input)).toMatchObject({
      kind: "committed",
    });
    const caller = await loadCommandContext({ cwd: stale });
    expect(await loadTaskFromContext({ ctx: caller, taskId: journey.task.id })).toEqual(
      await primary.taskBackend.getTask(journey.task.id),
    );
    await expect(
      cmdTaskScaffold({
        ctx: caller,
        cwd: stale,
        taskId: journey.task.id,
        force: true,
        yes: true,
        overwrite: true,
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
    await expect(
      readFile(path.join(stale, ".agentplane/tasks", journey.task.id, "README.md")),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });
});
