import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { afterEach } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { runtime } from "../../../../core/src/tasks/task-kernel/kernel.test-fixtures.js";
import { buildKernelAgentWorkOrder, resumeKernelWorkOrder } from "./kernel-work-order.js";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";

export function nativeCommand() {
  return {
    backendId: "local",
    resolvedProject: { gitRoot: process.cwd() },
    config: { paths: { workflow_dir: ".agentplane/tasks", tasks_path: ".agentplane/tasks.json" } },
  } as never;
}
const roots: string[] = [];
afterEach(async () => {
  for (const root of roots.splice(0)) await rm(root, { recursive: true, force: true });
});
export async function createDirectory(prefix: string) {
  const dir = await mkdtemp(path.join(os.tmpdir(), prefix));
  roots.push(dir);
  return dir;
}
export async function write(dir: string, name: string, value: unknown) {
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), JSON.stringify(value));
}
export async function nativeOrder(
  record: KernelRecord,
  authority: k.ExecutionAuthority,
  workItem = "kernel",
) {
  const implementation = resumeKernelWorkOrder({
    record,
    work_item_id: workItem,
    authority,
    repository_fingerprint: authority.repository_fingerprint,
  });
  if (!implementation) throw new Error("Expected native implementation WorkOrder");
  return buildKernelAgentWorkOrder({
    command: nativeCommand(),
    record,
    implementation,
    context: {
      repository_identity: record.repository_identity,
      repository_fingerprint: authority.repository_fingerprint,
      ceiling: authority,
    } as never,
  });
}

export function fixtureDefinitions() {
  const contract = {
    role: "EXECUTOR" as const,
    objective: "Build source",
    acceptance_criteria: ["Source is correct"],
    verification_commands: [],
  };
  const nextContract = { ...contract, objective: "Build source with bounded network reads" };
  const previous = {
    ...runtime("EXECUTING").definition,
    contract_digest: k.kernelDigest(contract),
    execution_requirements: {
      scope_roots: ["src"],
      repository_effects: ["source_code"],
      external_effects: [],
      capabilities: ["repository_write"],
      resources: [],
    },
  } satisfies k.WorkItemDefinition;
  const documents = {
    intent: { objective: "Build source", context: "Bounded exchange recovery." },
    contracts: Object.fromEntries([
      [k.kernelDigest(contract), contract],
      [k.kernelDigest(nextContract), nextContract],
    ]),
  };
  return { contract, nextContract, previous, documents };
}
