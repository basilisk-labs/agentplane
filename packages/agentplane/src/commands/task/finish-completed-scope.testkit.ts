import { expect } from "vitest";
import { configureGitUser, tempRepo } from "@agentplane/testkit";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import type { TaskData } from "../../backends/task-backend.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import { readKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import {
  loadCommandContext,
  resolveTaskOwnerCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { getTaskStore } from "../shared/task-store.js";
import { loadTaskForFinish } from "./finish-shared.js";

export async function checkCompletedScopeFinish(ctx: CommandContext, id: string, before: TaskData) {
  await checkHistoricalScope(before, (await ctx.taskBackend.getTask(id))!);
  const store = getTaskStore(ctx);
  const raw = await store.get(id);
  const identity = (raw.extensions!.task_kernel as { repository_identity: `sha256:${string}` })
    .repository_identity;
  expect(readKernelRecord(raw, identity).kind).toBe("malformed");
  const result = await loadTaskForFinish({
    ctx,
    store,
    useStore: true,
    taskId: id,
    taskCount: 1,
    metaTaskId: id,
    resultProvided: true,
    resultSummary: "Fixture completion",
    force: true,
    capturePrimaryLifecycleMeta: false,
  });
  expect(readKernelRecord(result.loaded.task, identity).kind).toBe("canonical");
  // Node command/deferred bundles have different LocalBackend constructors and
  // permit WeakMaps. Preserve the native backend behavior across that boundary.
  const foreignBackend = new Proxy(ctx.taskBackend, { getPrototypeOf: () => null });
  const owner = await resolveTaskOwnerCommandContext({
    ctx: { ...ctx, taskBackend: foreignBackend },
    taskId: id,
  });
  const authenticated = (await owner.taskBackend.getTask(id))!;
  expect(owner.taskBackend).not.toBe(foreignBackend);
  expect(readKernelRecord(authenticated, identity).kind).toBe("canonical");
  expect(authenticated.extensions!.task_kernel).toEqual(raw.extensions!.task_kernel);
  expect(authenticated.extensions!.task_execution_context).toEqual(
    raw.extensions!.task_execution_context,
  );
}

async function checkHistoricalScope(before: TaskData, admitted: TaskData) {
  const repo = await tempRepo({ withDefaultConfig: true, branch: "main" });
  await configureGitUser(repo.root);
  await writeFile(path.join(repo.root, "seed.txt"), "unrelated repository\n");
  execFileSync("git", ["add", "."], { cwd: repo.root });
  execFileSync("git", ["commit", "-m", "seed historical reader"], { cwd: repo.root });
  const command = await loadCommandContext({ cwd: repo.root });
  await command.taskBackend.writeTask(before);
  const fresh = await loadCommandContext({ cwd: repo.root });
  const listed = await fresh.taskBackend.listTasks();
  const historical = listed.find((task) => task.id === before.id)!;
  expect(historical.extensions!.task_kernel).toEqual(before.extensions!.task_kernel);
  const own = (before.extensions!.task_kernel as { repository_identity: `sha256:${string}` })
    .repository_identity;
  expect(readKernelRecord(historical, own).kind).toBe("canonical");
  const current = await resolveLogicalRepositoryIdentity({ git_root: repo.root, task: {} });
  expect(readKernelRecord(historical, current as `sha256:${string}`).kind).toBe("malformed");
  // A same-ID proof in the default store must not select a different namespace.
  await command.taskBackend.writeTask(admitted);
  const config = structuredClone(command.config);
  config.paths.workflow_dir = "operations/native/tasks";
  const custom = await loadCommandContext({ cwd: repo.root, config });
  await custom.taskBackend.writeTask(before);
  const foreign = new Proxy(custom.taskBackend, { getPrototypeOf: () => null });
  const owner = await resolveTaskOwnerCommandContext({
    ctx: { ...custom, taskBackend: foreign },
    taskId: before.id,
  });
  expect(owner.taskBackend).toBe(foreign);
  expect(owner.config.paths.workflow_dir).toBe("operations/native/tasks");
  expect((await owner.taskBackend.getTask(before.id))!.extensions!.task_kernel).toEqual(
    before.extensions!.task_kernel,
  );
}
