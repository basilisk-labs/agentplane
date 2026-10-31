import { expect } from "vitest";
import { configureGitUser, tempRepo } from "@agentplane/testkit";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { readFile, mkdir } from "node:fs/promises";
import * as taskBackend from "../shared/task-backend.js";
import * as proof from "../../adapters/task-backend/completed-scope-admission.js";
import { git } from "./kernel-completed-external-rework.testkit.js";
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

export async function checkCompletedScopeColdReaders(
  command: CommandContext,
  id: string,
  before: TaskData,
) {
  const root = command.resolvedProject.gitRoot;
  const identity = (before.extensions!.task_kernel as { repository_identity: `sha256:${string}` })
    .repository_identity;
  const expectedCold = {
    one: "canonical",
    batch: "canonical",
    list: "canonical",
    projection: "canonical",
  };
  const cold = coldProcess(root, id);
  expect(cold).toMatchObject(expectedCold);
  expect(cold.pid).not.toBe(process.pid);
  const oldBase = (before.extensions!.task_execution_context as { base_sha: string }).base_sha;
  const main = path.join(root, ".agentplane/worktrees/cold-main");
  git(root, "worktree", "add", main, "main");
  git(main, "merge", "--ff-only", git(root, "branch", "--show-current"));
  expect(coldProcess(main, id)).toMatchObject(expectedCold);
  const compact = path.join(root, ".agentplane/worktrees/cold-history");
  git(root, "worktree", "add", "--detach", compact, oldBase);
  await mkdir(path.join(compact, ".agentplane/tasks"), { recursive: true });
  git(root, "config", "extensions.worktreeConfig", "true");
  git(compact, "config", "--worktree", "agentplane.compactTaskHistory", "true");
  expect(coldProcess(compact, id)).toMatchObject(expectedCold);
  const snapshot = await taskBackend.loadCommandContext({ cwd: main, rootOverride: null });
  snapshot.memo.taskWorktreeInventory = Promise.resolve([]);
  const historicalTask = await taskBackend.loadTaskFromBranchSnapshot({
    ctx: snapshot,
    taskId: id,
    readmePath: path.join(main, snapshot.config.paths.workflow_dir, id, "README.md"),
    branch: git(root, "branch", "--show-current"),
    requireWorktree: false,
  });
  expect(readKernelRecord(historicalTask, identity).kind).toBe("canonical");
  const current = (await command.taskBackend.getTask(id))!;
  const common = await taskBackend.resolveCommandGitCommonDir(command);
  const proofId = proof.completedScopeAdmissionIds(current).at(-1)!;
  const retained = await proof.readCompletedScopeAdmission(common, id, proofId);
  current.execution_contract!.observed.verification_results = [
    { id: "fixture-native-check", result: "pass" },
    { id: "recorded-check-1", result: "pass" },
    { id: "verification-record", result: "pass" },
  ];
  await command.taskBackend.writeTask(current);
  const coldContext = await taskBackend.loadCommandContext({ cwd: root, rootOverride: null });
  const refreshed = (await coldContext.taskBackend.getTask(id))!;
  expect(readKernelRecord(refreshed, identity).kind).toBe("canonical");
  expect(refreshed.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
  const retainedAfterRefresh = await proof.readCompletedScopeAdmission(common, id, proofId);
  expect(retainedAfterRefresh.after).toEqual(retained.after);
  const readme = path.join(root, command.config.paths.workflow_dir, id, "README.md");
  const validSource = await readFile(readme, "utf8");
  refreshed.execution_contract!.observed.verification_results =
    refreshed.execution_contract!.observed.verification_results.filter(
      (result) => result.id !== "fixture-native-check",
    );
  await command.taskBackend.writeTask(refreshed);
  await expect(coldContext.taskBackend.getTask(id)).rejects.toThrow(
    /historical verification result/u,
  );
  await writeFile(readme, validSource);
  const restored = (await coldContext.taskBackend.getTask(id))!;
  expect(readKernelRecord(restored, identity).kind).toBe("canonical");
}

function coldProcess(root: string, id: string) {
  const backend = fileURLToPath(new URL("../shared/task-backend.ts", import.meta.url));
  const kernel = fileURLToPath(
    new URL("../../adapters/task-backend/kernel-record.ts", import.meta.url),
  );
  const script = `const b=await import(${JSON.stringify(backend)});const k=await import(${JSON.stringify(kernel)});
    const c=await b.loadCommandContext({cwd:${JSON.stringify(root)},rootOverride:null});
    const t=await c.taskBackend.getTask(${JSON.stringify(id)});
    const all=await c.taskBackend.getTasks([t.id]);const list=await c.taskBackend.listTasks();
    const projected=await c.taskBackend.listProjectionTasks();
    const classify=t=>k.readKernelRecord(t,t.extensions.task_kernel.repository_identity).kind;
    console.log(JSON.stringify({pid:process.pid,one:classify(t),batch:classify(all[0]),list:classify(list.find(x=>x.id===t.id)),projection:classify(projected.find(x=>x.id===t.id))}));`;
  return JSON.parse(
    execFileSync("bun", ["--eval", script], { cwd: root, encoding: "utf8", timeout: 30_000 }),
  ) as {
    pid: number;
    one: string;
    batch: string;
    list: string;
    projection: string;
  };
}
