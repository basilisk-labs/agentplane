import { execFileSync } from "node:child_process";
import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { expect } from "vitest";
import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import { kernelExchangeDirectory } from "../commands/task/kernel-exchange.js";
import {
  KERNEL_OPERATIONAL_PROJECTION,
  readKernelOperationalProjection,
} from "../commands/task/kernel-operational-projection.js";
import { recoverKernelOperationalProjection } from "../commands/task/kernel-operational-projection-recovery.js";
import type { loadCommandContext } from "../commands/shared/task-backend.js";
import type { createKernelRuntime } from "../commands/task/kernel-runtime-context.js";

export async function assertProjectionRecovery(
  root: string,
  command: Awaited<ReturnType<typeof loadCommandContext>>,
  runtime: Awaited<ReturnType<typeof createKernelRuntime>>,
  taskId: string,
) {
  const read = await runtime.adapter.read(taskId);
  if (read.kind !== "canonical") throw new Error("Missing recovery fixture");
  const original = readKernelOperationalProjection(read.task.extensions);
  expect(original).not.toBeNull();
  const extensions = { ...read.task.extensions };
  delete extensions[KERNEL_OPERATIONAL_PROJECTION];
  await command.taskBackend.writeTask(
    { ...read.task, extensions, revision: read.task.revision! + 1 },
    { expectedRevision: read.task.revision },
  );
  const missing = await runtime.adapter.read(taskId);
  if (missing.kind !== "canonical") throw new Error("Missing recovery fixture");
  const task = {
    ...missing.task,
    execution_route: { ...missing.task.execution_route!, repository_mode: "branch_pr" as const },
  };
  const recover = () => recoverKernelOperationalProjection(command, missing.record, task);
  const inspectionId = Object.keys(missing.record.aggregate.mutation_receipts).findLast((id) =>
    id.startsWith("validation:sha256:"),
  )!;
  const directory = await kernelExchangeDirectory(
    command,
    taskId,
    inspectionId.slice("validation:".length),
  );
  const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
    JSON.parse(await readFile(path.join(directory, "work-order.json"), "utf8")),
  );
  const nativePath = order.required_inputs.find((input) => input.id === "native-validation")!.path!;
  const repositoryPath = order.required_inputs.find(
    (input) => input.id === "repository-evidence",
  )!.path!;
  const reviewPath = path.join(directory, "inspection-result.json");
  for (const target of [
    order.required_inputs.find((input) => input.id === "implementation-result")!.path!,
    nativePath,
    repositoryPath,
    reviewPath,
    path.join(directory, "quality-report.json"),
  ]) {
    const contents = await readFile(target, "utf8");
    await writeFile(target, "{}");
    const stopped = await recover();
    expect(stopped).toMatchObject({
      kind: "stop",
      action: {
        reason: "canonical_operational_projection_recovery_required",
        operator_action: {
          kind: "create_recovery_task",
        },
      },
    });
    if (stopped.kind !== "stop") throw new Error("Invalid evidence requires recovery");
    expect(stopped.action.operator_action.argv.slice(0, 3)).toEqual([
      "agentplane",
      "task",
      "create",
    ]);
    expect(await runtime.adapter.read(taskId)).toEqual(missing);
    await writeFile(target, contents);
  }
  const repositoryContents = await readFile(repositoryPath, "utf8");
  await rm(repositoryPath);
  expect(await recover()).toMatchObject({ kind: "stop" });
  await writeFile(repositoryPath, repositoryContents);
  const stale = structuredClone(missing.record);
  stale.aggregate.work_items.build!.attempt += 1;
  expect(await recoverKernelOperationalProjection(command, stale, task)).toMatchObject({
    kind: "stop",
  });
  expect(await runtime.adapter.read(taskId)).toEqual(missing);
  await writeFile(path.join(root, "result.txt"), "unreviewed change");
  expect(await recover()).toMatchObject({ kind: "stop" });
  await writeFile(path.join(root, "result.txt"), "managed implementation");
  expect(
    await recover(),
    execFileSync("git", ["status", "--short", "--untracked-files=all"], {
      cwd: root,
      encoding: "utf8",
    }),
  ).toEqual({ kind: "restored" });
  const restored = await runtime.adapter.read(taskId);
  if (restored.kind !== "canonical") throw new Error("Missing restored fixture");
  expect(restored.record).toEqual(missing.record);
  expect(readKernelOperationalProjection(restored.task.extensions)).toMatchObject({
    implementation_commit: original!.implementation_commit,
    review_identity_digest: original!.review_identity_digest,
  });
  expect(
    await recoverKernelOperationalProjection(command, restored.record, {
      ...restored.task,
      execution_route: task.execution_route,
    }),
  ).toEqual({ kind: "unchanged" });
  expect(await runtime.adapter.read(taskId)).toEqual(restored);
}
