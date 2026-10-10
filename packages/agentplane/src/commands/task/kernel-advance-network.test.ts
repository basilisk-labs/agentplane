import type * as RuntimeModule from "./kernel-runtime-context.js";
import type * as AuthorityModule from "./kernel-plan-authority.js";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { makeTaskBackendDouble } from "@agentplane/testkit/task";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type { TaskData } from "../../backends/task-backend.js";
import {
  KernelBackendAdapter,
  type KernelCommandInput,
} from "../../adapters/task-backend/kernel-backend-adapter.js";
import {
  kernelReplayJourney,
  replayRepositoryIdentity,
} from "../../adapters/task-backend/kernel-replay-journey.test-fixtures.js";
import type { KernelAuthorityPort, NativeAuthorityContext } from "../../ports/kernel-authority.js";
import { KernelAuthorityResolver } from "../../runner/usecases/kernel-authority.js";
import { KernelTaskLifecycle } from "../../runner/usecases/kernel-task-lifecycle.js";
import type { CommandContext } from "../shared/task-backend.js";

const mocks = vi.hoisted(() => ({ runtime: vi.fn(), issue: vi.fn() }));
vi.mock("./kernel-runtime-context.js", async (original) => ({
  ...(await original<typeof RuntimeModule>()),
  createKernelRuntime: mocks.runtime,
}));
vi.mock("./kernel-exchange.js", () => ({ issueKernelExchange: mocks.issue }));
vi.mock("./kernel-worktree-routing.js", () => ({
  ensureCanonicalTaskWorktree: () => Promise.resolve(null),
}));
vi.mock("./kernel-planning-checkout.js", () => ({
  canonicalPlanningCheckoutBoundary: () => Promise.resolve(null),
}));
vi.mock("./kernel-plan-authority.js", async (original) => ({
  ...(await original<typeof AuthorityModule>()),
  projectCanonicalPlanApproval: () => Promise.resolve(),
}));
vi.mock("./kernel-final-validation.js", () => ({
  restoreKernelFinalValidation: () => Promise.resolve(null),
}));
import { advanceTaskStep } from "./advance-task-step.js";

beforeEach(() => {
  vi.restoreAllMocks();
  mocks.runtime.mockReset();
  mocks.issue.mockReset();
});
type Payload = k.TaskCommand extends infer C
  ? C extends k.TaskCommand
    ? Omit<C, "task_id" | "expected_task_revision" | "expected_state_fingerprint">
    : never
  : never;

async function fixture(role: "EXECUTOR" | "CURATOR" = "EXECUTOR") {
  const journey = kernelReplayJourney("direct");
  const seed = journey.steps[0]!.input;
  let saved: TaskData | null = null;
  const backend = makeTaskBackendDouble({
    capabilities: {
      ...makeTaskBackendDouble().capabilities,
      canonical_source: "remote",
      atomic_task_record: true,
    },
    getTask: () => Promise.resolve(structuredClone(saved)),
    writeTask: (next, options) => {
      if ((saved?.revision ?? 0) !== options?.expectedRevision) throw new Error("CAS conflict");
      saved = structuredClone(next);
      return Promise.resolve();
    },
  });
  const adapter = new KernelBackendAdapter(backend, replayRepositoryIdentity);
  const lifecycle = new KernelTaskLifecycle(adapter);
  const root = seed.authority!;
  let counter = 0;
  const intent = { objective: "Read the explicitly authorized registry", context: "No writes" };
  const contract = {
    role,
    objective: intent.objective,
    acceptance_criteria: ["Network reads only"],
    verification_commands: [],
  };
  const definition: k.WorkItemDefinition = {
    id: "build",
    depends_on: [],
    required_inputs: [],
    expected_outputs: ["report"],
    optional: false,
    contract_digest: k.kernelDigest(contract),
    execution_requirements: {
      scope_roots: ["src"],
      repository_effects: ["repository_write"],
      external_effects: ["network_read"],
      capabilities: ["repository_write"],
      resources: [],
    },
  };
  const plan: k.PlanRecord = {
    revision: 1,
    digest: k.kernelDigest({ revision: 1, work_items: [definition] }),
    state: "PROPOSED",
    approval_actor_id: null,
    approval_evidence_digest: null,
    work_items: [definition],
  };
  const values = {
    task_id: journey.task.id,
    repository_identity: replayRepositoryIdentity,
    repository_fingerprint: root.repository_fingerprint,
    actor: {
      id: "native-controller",
      kind: "SYSTEM",
      transport: "manual",
      capabilities: ["repository_write", "authority.observe"],
    },
    occurred_at: "2026-08-31T10:00:00.000Z",
    approval_receipts: { trusted_issuers: [], max_ttl_minutes: 15, clock_skew_seconds: 0 },
    ceiling: {
      scope_roots: ["src"],
      external_effects: ["network_read"],
      policy_digests: [],
      repository_effects: root.repository_effects,
      capabilities: root.capabilities,
      resources: root.resources,
      validation_requirements: root.validation_requirements,
      completion_requirements: root.completion_requirements,
      risk: root.risk,
      expires_at: null,
    },
  } satisfies Omit<NativeAuthorityContext, "task_revision" | "mutation_id">;
  const native: KernelAuthorityPort = {
    readContext: async () => {
      const read = await adapter.read(journey.task.id);
      if (read.kind !== "canonical") throw new Error(read.kind);
      return {
        ...values,
        task_revision: read.record.aggregate.revision,
        mutation_id: `observe-${++counter}`,
      };
    },
    readApproval: () =>
      Promise.resolve({
        kind: "manual_operator",
        actor_id: "USER",
        invocation_id: "fixture-user-decision",
      }),
    observeContinuation: () => Promise.resolve(null),
  };
  const authority = new KernelAuthorityResolver(adapter, native);
  const capture = {
    ...seed,
    command: {
      ...seed.command,
      kind: "capture_intent" as const,
      intent_digest: k.kernelDigest(intent),
    },
  };
  expect(await lifecycle.create(journey.task, intent, capture)).toMatchObject({
    kind: "committed",
  });
  expect(
    await lifecycle.apply(
      {
        ...seed,
        mutation_id: "propose",
        command: {
          kind: "propose_plan",
          task_id: journey.task.id,
          expected_task_revision: 1,
          expected_state_fingerprint: root.repository_fingerprint,
          plan,
        },
      },
      [contract],
    ),
  ).toMatchObject({ kind: "committed" });
  expect(await authority.approve(journey.task.id)).toMatchObject({ kind: "committed" });
  async function input(
    payload: Payload,
    mutation = `input-${++counter}`,
  ): Promise<KernelCommandInput> {
    const resolved = await authority.resolve(
      journey.task.id,
      "work_item_id" in payload ? payload.work_item_id : undefined,
    );
    return {
      actor: resolved.context.actor,
      authority: resolved.authority,
      repository_fingerprint: resolved.context.repository_fingerprint,
      occurred_at: resolved.context.occurred_at,
      mutation_id: mutation,
      command: {
        ...payload,
        task_id: journey.task.id,
        expected_task_revision: resolved.context.task_revision,
        expected_state_fingerprint: resolved.context.repository_fingerprint,
      } as k.TaskCommand,
    };
  }
  expect(
    await lifecycle.apply(
      await input({ kind: "materialize_work_items", plan_revision: 1, plan_digest: plan.digest }),
    ),
  ).toMatchObject({ kind: "committed" });
  expect(
    await lifecycle.apply(
      await input({
        kind: "transition_work_item",
        action: "claim",
        work_item_id: "build",
        claim_id: "claim-first",
      }),
    ),
  ).toMatchObject({ kind: "committed" });
  const command = {
    backendId: "local",
    taskBackend: backend,
    resolvedProject: { gitRoot: process.cwd() },
    config: { paths: { workflow_dir: ".agentplane/tasks", tasks_path: ".agentplane/tasks.json" } },
  } as CommandContext;
  const runtime = { adapter, lifecycle, authority, native, input, command };
  mocks.runtime.mockResolvedValue(runtime);
  const orders: AgentWorkOrderV2[] = [];
  mocks.issue.mockImplementation((_command: unknown, order: AgentWorkOrderV2) => {
    orders.push(order);
    return { kind: "agent_episode", work_order_id: order.work_order_id };
  });
  const advance = () => advanceTaskStep({ command, task_id: journey.task.id, transport: "host" });
  return { runtime, values, orders, advance, taskId: journey.task.id };
}

describe("authenticated context after first native begin", () => {
  it.each(["EXECUTOR", "CURATOR"] as const)(
    "allows first %s dispatch and resumes without another begin",
    async (role) => {
      const f = await fixture(role);
      const before = await f.runtime.native.readContext(f.taskId);
      const begin = vi.spyOn(f.runtime.lifecycle, "begin");
      await f.advance();
      expect(begin).toHaveBeenCalledTimes(1);
      expect(f.orders[0]?.authority.network).toBe("allowed");
      expect(f.orders[0]?.task.revision).toBe(before.task_revision + 1);
      const begun = (await begin.mock.results[0]!.value) as Awaited<
        ReturnType<KernelTaskLifecycle["begin"]>
      >;
      expect(f.orders[0]?.canonical_binding).toMatchObject(begun.work_order.binding);
      const replay = await f.runtime.lifecycle.begin(begin.mock.calls[0]![0]);
      expect(replay.work_order).toBeNull();
      expect(replay.result).toMatchObject({ kind: "committed", replayed: true });
      await f.advance();
      expect(begin).toHaveBeenCalledTimes(2); // Includes only the explicit replay above.
      expect(f.orders[1]?.work_order_id).toBe(f.orders[0]?.work_order_id);
      expect(f.orders[1]?.authority.network).toBe("allowed");
    },
  );

  it("refuses a ceiling narrowed after begin before issuing an episode", async () => {
    const f = await fixture();
    const begin = f.runtime.lifecycle.begin.bind(f.runtime.lifecycle);
    vi.spyOn(f.runtime.lifecycle, "begin").mockImplementation(async (input) => {
      const result = await begin(input);
      f.values.ceiling.external_effects = [];
      return result;
    });
    await expect(f.advance()).rejects.toThrow();
    expect(f.orders).toHaveLength(0);
  });

  it.each(["stale", "wrong-task", "wrong-repository"] as const)(
    "refuses %s context after begin",
    async (kind) => {
      const f = await fixture();
      const before = await f.runtime.native.readContext(f.taskId);
      const begin = f.runtime.lifecycle.begin.bind(f.runtime.lifecycle);
      vi.spyOn(f.runtime.lifecycle, "begin").mockImplementation(async (input) => {
        const result = await begin(input);
        vi.spyOn(f.runtime.native, "readContext").mockResolvedValue(
          kind === "stale"
            ? before
            : {
                ...before,
                ...(kind === "wrong-task"
                  ? { task_id: "another-task" }
                  : { repository_identity: k.kernelDigest("another-repository") }),
              },
        );
        return result;
      });
      await expect(f.advance()).rejects.toThrow(/native_context_binding/u);
      expect(f.orders).toHaveLength(0);
    },
  );
  it("does not issue an episode when authority resolution fails after begin", async () => {
    const f = await fixture();
    const begin = f.runtime.lifecycle.begin.bind(f.runtime.lifecycle);
    vi.spyOn(f.runtime.lifecycle, "begin").mockImplementation(async (input) => {
      const result = await begin(input);
      vi.spyOn(f.runtime.authority, "resolve").mockRejectedValue(new Error("observer unavailable"));
      return result;
    });
    await expect(f.advance()).rejects.toThrow("observer unavailable");
    expect(f.orders).toHaveLength(0);
  });
});
