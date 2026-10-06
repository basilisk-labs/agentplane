import path from "node:path";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { describe, expect, it } from "vitest";
import {
  aggregate,
  authority as baseAuthority,
  runtime,
} from "../../../../core/src/tasks/task-kernel/kernel.test-fixtures.js";
import { makeKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { NativeAuthorityContext } from "../../ports/kernel-authority.js";
import type { CommandContext } from "../shared/task-backend.js";
import { buildKernelAgentWorkOrder, resumeKernelWorkOrder } from "./kernel-work-order.js";

type Mutable<T> = { -readonly [P in keyof T]: Mutable<T[P]> };

const command = {
  backendId: "local",
  resolvedProject: { gitRoot: process.cwd() },
  config: { paths: { workflow_dir: ".agentplane/tasks", tasks_path: ".agentplane/tasks.json" } },
} as CommandContext;

function fixture(
  role: "EXECUTOR" | "CURATOR" | "PLANNER" | "EVALUATOR" = "EXECUTOR",
  grants: { issued?: string[]; requirements?: string[]; ceiling?: string[] } = {},
) {
  const contract = {
    role,
    objective: "Read an explicitly authorized dependency registry.",
    acceptance_criteria: ["Do not publish or access credentials."],
    verification_commands: [],
  };
  const item = { ...runtime("EXECUTING") };
  item.definition = {
    ...item.definition,
    contract_digest: k.kernelDigest(contract),
    execution_requirements: {
      ...item.definition.execution_requirements,
      external_effects: grants.requirements ?? ["network_read"],
    },
  };
  const workItems = [item.definition];
  const plan = {
    ...aggregate().current_plan!,
    work_items: workItems,
    digest: k.kernelDigest({ revision: 1, work_items: workItems }),
  };
  const intent = { objective: contract.objective, context: "Only the declared WorkItem may read." };
  const record = makeKernelRecord(
    baseAuthority.repository_identity,
    aggregate({
      intent_digest: k.kernelDigest(intent),
      current_plan: plan,
      work_items: { kernel: item },
    }),
    [],
    { intent, contracts: Object.fromEntries([[k.kernelDigest(contract), contract]]) },
  );
  const authority = {
    ...baseAuthority,
    plan_digest: plan.digest,
    work_item_id: "kernel",
    external_effects: grants.issued ?? ["network_read"],
  };
  authority.digest = k.authorityDigest(authority);
  const context = {
    task_id: record.aggregate.id,
    task_revision: record.aggregate.revision,
    repository_identity: authority.repository_identity,
    repository_fingerprint: authority.repository_fingerprint,
    ceiling: { ...authority, external_effects: grants.ceiling ?? ["network_read"] },
  } as NativeAuthorityContext;
  const implementation = resumeKernelWorkOrder({
    record,
    work_item_id: "kernel",
    authority,
    repository_fingerprint: context.repository_fingerprint,
  });
  if (!implementation) throw new Error("Native resume did not issue implementation");
  return { record, context, implementation } as Mutable<{
    record: typeof record;
    context: typeof context;
    implementation: typeof implementation;
  }>;
}

async function project(f: ReturnType<typeof fixture>, planning = false) {
  return await buildKernelAgentWorkOrder({
    command,
    record: f.record,
    context: f.context,
    ...(planning ? {} : { implementation: f.implementation }),
  });
}

function deny(order: Awaited<ReturnType<typeof project>>) {
  expect(order.authority.network).toBe("deny");
  expect(order.authority.allowed_tool_classes).not.toContain("network_read");
  expect(order.authority.external_side_effects).toEqual([]);
}

describe("native WorkItem network projection", () => {
  it.each(["EXECUTOR", "CURATOR"] as const)("projects bounded reads for %s", async (role) => {
    const f = fixture(role);
    const order = await project(f);
    expect(order.authority.network).toBe("allowed");
    expect(order.authority.allowed_tool_classes).toEqual([
      "repository_read",
      "git_read",
      "report_result",
      "report_blocker",
      "workspace_write",
      "run_checks",
    ]);
    expect(order.authority.external_side_effects).toEqual([]);
    expect(order.authority.writable_roots).toEqual(
      f.implementation.authority.scope_roots.map((root) => path.resolve(process.cwd(), root)),
    );
    expect(order.authority.expires_at).toBe(f.implementation.authority.expires_at);
    expect(order.authority.mutation_scope).toBe(role === "CURATOR" ? "context" : "code");
    expect(order.canonical_binding).toMatchObject({
      ...f.implementation.binding,
      authority_digest: f.implementation.authority.digest,
      phase: "implementation",
    });
    expect(order.state_fingerprint.components.authority.state).toBe("present");
    expect(order.state_fingerprint.components.capability.state).toBe("present");
  });

  it.each(["issued", "requirements", "ceiling"] as const)(
    "denies absent %s permission",
    async (source) => {
      const f = fixture("EXECUTOR", { [source]: [] });
      deny(await project(f));
    },
  );

  it("denies a broad parent grant and ignores another WorkItem grant", async () => {
    const f = fixture();
    f.implementation.authority.work_item_id = null;
    f.implementation.authority.digest = k.authorityDigest(f.implementation.authority);
    deny(await project(f));
    const other = fixture();
    other.record.aggregate.current_plan!.work_items = [
      { ...other.record.aggregate.work_items.kernel!.definition, id: "other" },
    ];
    deny(await project(other));
  });

  it("does not project unrelated external effects or tool classes", async () => {
    const f = fixture("EXECUTOR", {
      issued: ["network_read", "pr.merge", "publish", "credentials"],
      ceiling: ["network_read", "pr.merge", "publish", "credentials"],
    });
    const order = await project(f);
    expect(order.authority.network).toBe("allowed");
    expect(order.authority.external_side_effects).toEqual([]);
    expect(order.authority.allowed_tool_classes).not.toEqual(expect.arrayContaining(["publish"]));
  });

  it("keeps planning without implementation offline", async () => {
    deny(await project(fixture(), true));
  });

  it.each(["PLANNER", "EVALUATOR"] as const)("keeps %s contracts offline", async (role) => {
    deny(await project(fixture(role)));
  });

  it("denies an unapproved current Plan", async () => {
    const f = fixture();
    f.record.aggregate.current_plan!.state = "PROPOSED";
    deny(await project(f));
  });

  it.each(["task", "revision"] as const)("denies mismatched native context %s", async (field) => {
    const f = fixture();
    if (field === "task") f.context.task_id = "another-task";
    else f.context.task_revision += 1;
    deny(await project(f));
  });

  it.each(["task_id", "plan_digest", "contract_digest", "claim_id", "attempt"] as const)(
    "denies a stale or cross-episode %s binding",
    async (field) => {
      const f = fixture();
      if (field === "attempt") f.implementation.binding.attempt += 1;
      else f.implementation.binding[field] = k.kernelDigest("different");
      if (field === "task_id") await expect(project(f)).rejects.toThrow(/Canonical binding/u);
      else deny(await project(f));
    },
  );
});
