import { describe, expect, it } from "vitest";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import {
  createRepositorySnapshot,
  normalizeTaskPlanProposal,
  taskKernel as k,
} from "@agentplaneorg/core/tasks";
import { parseSuppliedPlanInput } from "./create-plan-input.js";
import { suppliedKernelProposal } from "./create-plan-proposal.js";
import { kernelDocumentIssues } from "../../adapters/task-backend/kernel-documents.js";
import { defaultConfig } from "../../cli/core-imports.js";
import {
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit";
import { runTaskNewParsed } from "./new.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { setCanonicalPlan } from "./kernel-plan.js";
import { createKernelRuntime } from "./kernel-runtime-context.js";
import { buildKernelAgentWorkOrder } from "./kernel-work-order.js";
import { taskCreateSpec, makeRunTaskCreateHandler } from "./create.command.js";

installRunCliIntegrationHarness();

export function compactPlanInput() {
  return {
    schema_version: 2,
    criteria: [
      {
        id: "c",
        description: "The report answers the question",
        required: true,
        check_ids: ["review"],
      },
    ],
    checks: [{ id: "review", kind: "semantic", required: true, capability: "review" }],
    work_items: [
      {
        id: "report",
        objective: "Produce the report",
        depends_on: [],
        required_inputs: [],
        expected_outputs: ["report"],
        scope_roots: [] as string[],
        context: { required_sources: [], optional_sources: [], symbol_hints: [], max_bytes: 4096 },
        risk: "low",
        capabilities: [],
        resource_claims: [],
        optional: false,
        priority: 0,
      },
    ],
    assumptions: [],
    unresolved_questions: [],
  };
}

function baseline(sha = "a".repeat(40)) {
  return createRepositorySnapshot({
    git: { kind: "commit", sha, ref: null },
    dirty_paths: [],
    policy_digest: null,
    config_digest: null,
    context_digest: null,
    task_history_cursor: null,
    captured_at: "2026-09-28T00:00:00.000Z",
  });
}

describe("supplied Plan intake", () => {
  it("normalizes full and compact proposals with the same validator", () => {
    const context = { task_id: "T-1", planning_baseline: baseline() };
    const full = normalizeTaskPlanProposal(compactPlanInput(), context);
    expect(normalizeTaskPlanProposal(full, context)).toEqual(full);
    expect(parseSuppliedPlanInput(full)).toEqual(full);
  });

  it("rebinds native intake while issued semantic results reject stale identity", () => {
    const full = normalizeTaskPlanProposal(compactPlanInput(), {
      task_id: "old",
      planning_baseline: baseline(),
    });
    const context = { task_id: "new", planning_baseline: baseline("b".repeat(40)) };
    expect(() => normalizeTaskPlanProposal(full, context)).toThrow("task_id");
    expect(() => normalizeTaskPlanProposal({ ...full, task_id: "new" }, context)).toThrow(
      "planning_baseline",
    );
    const rebound = normalizeTaskPlanProposal(full, { ...context, rebind: true });
    expect(rebound.task_id).toBe("new");
    expect(rebound.planning_baseline).toEqual(context.planning_baseline);
    expect(rebound.work_items.work_items[0]?.validation.evidence_fingerprint).toBe(
      context.planning_baseline.digest,
    );
    expect(full.task_id).toBe("old");
  });

  it.each(["approved_by", "authority", "canonical_binding", "state", "plan_input_digest"])(
    "rejects forged %s before persistence",
    (field) => {
      expect(() => parseSuppliedPlanInput({ ...compactPlanInput(), [field]: "USER" })).toThrow(
        field,
      );
    },
  );

  it("rejects nested canonical fields and reports missing semantic fields", () => {
    const input = compactPlanInput();
    expect(() =>
      parseSuppliedPlanInput({
        ...input,
        work_items: [{ ...input.work_items[0], approval: { actor: "USER" } }],
      }),
    ).toThrow("approval");
    expect(() =>
      parseSuppliedPlanInput({
        ...input,
        work_items: [{ ...input.work_items[0], objective: "" }],
      }),
    ).toThrow("objective");
  });

  it("retains unresolved questions and requests planning instead of guessing", () => {
    const full = normalizeTaskPlanProposal(
      {
        ...compactPlanInput(),
        unresolved_questions: ["Which audience?"],
      },
      { task_id: "T-1", planning_baseline: baseline() },
    );
    expect(full.unresolved_questions).toEqual(["Which audience?"]);
    expect(() => suppliedKernelProposal(full, {})).toThrow("requires PLANNER");
  });

  it("rejects a missing or altered retained input document", () => {
    const proposal = normalizeTaskPlanProposal(compactPlanInput(), {
      task_id: "T-1",
      planning_baseline: baseline(),
    });
    const digest = k.kernelDigest(proposal);
    const intent = { objective: "Report", context: "Context", plan_input_digest: digest };
    const aggregate = {
      id: "T-1",
      intent_digest: k.kernelDigest(intent),
      current_plan: null,
      plan_history: [],
    } as unknown as k.TaskAggregate;
    expect(kernelDocumentIssues(aggregate, { intent, contracts: {} })).toContain(
      `plan_input_missing:${digest}`,
    );
    expect(
      kernelDocumentIssues(aggregate, {
        intent,
        contracts: {},
        plan_inputs: { [digest]: proposal },
      }),
    ).toEqual([]);
    expect(
      kernelDocumentIssues(aggregate, {
        intent,
        contracts: {},
        plan_inputs: { [digest]: { ...proposal, assumptions: ["altered"] } },
      }),
    ).toContain(`plan_input_identity:${digest}`);
  });
});

describe("canonical supplied Plan transport", { timeout: 180_000 }, () => {
  async function setup() {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    await writeConfig(root, defaultConfig());
    await commitAll(root, "seed supplied Plan test");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const parsed = {
      title: "Produce a report",
      description: "Answer the supplied question.",
      owner: "CODER",
      priority: "med" as const,
      taskKind: "analysis" as const,
      mutationScope: "none" as const,
      tags: ["workflow"],
      dependsOn: [],
      verify: [],
      allowDuplicate: true,
    };
    return { root, ctx, parsed };
  }

  it("retains compact intake as canonical input without inventing approval", async () => {
    const { root, ctx, parsed } = await setup();
    const suppliedPlan = { ...compactPlanInput(), unresolved_questions: ["Which audience?"] };
    const created = await runTaskNewParsed({
      ctx,
      cwd: root,
      rootOverride: root,
      printTaskId: false,
      parsed: { ...parsed, suppliedPlan },
    });
    const runtime = await createKernelRuntime({
      command: ctx,
      task_id: created.task_id,
      transport: "manual",
      operation_id: "inspect-input",
    });
    const read = await runtime.adapter.read(created.task_id);
    expect(read.kind).toBe("canonical");
    if (read.kind !== "canonical") throw new Error("Canonical input missing");
    expect(read.record.aggregate.current_plan).toBeNull();
    expect(read.record.aggregate.authority_lineage ?? []).toEqual([]);
    const digest = read.record.documents!.intent.plan_input_digest!;
    const proposal = read.record.documents!.plan_inputs![digest]!;
    expect(proposal.task_id).toBe(created.task_id);
    expect(proposal.planning_baseline.git.kind).toBe("commit");
    expect(k.kernelDigest(proposal)).toBe(digest);
    const order = await buildKernelAgentWorkOrder({
      command: ctx,
      record: read.record,
      context: await runtime.native.readContext(created.task_id),
    });
    expect(order.role).toBe("PLANNER");
    expect(order.task.unresolved_questions).toEqual([
      { id: "supplied-plan-question-1", question: "Which audience?", blocking: true },
    ]);
    expect(order.context_intent.purpose).toContain(JSON.stringify(proposal));
    expect(order.authority.writable_roots).toEqual([]);
    const input = await runtime.input(
      {
        kind: "propose_plan",
        plan: {
          revision: 1,
          digest: k.kernelDigest({ revision: 1, work_items: [] }),
          state: "PROPOSED",
          approval_actor_id: null,
          approval_evidence_digest: null,
          work_items: [],
        },
      },
      "tamper-input",
      true,
    );
    const documents = read.record.documents!;
    const altered = structuredClone(documents);
    altered.plan_inputs![digest]!.assumptions.push("Rewritten source");
    const rejected = await runtime.adapter.execute(input, altered);
    expect(rejected).toMatchObject({
      kind: "unavailable",
      code: "malformed",
      facts: ["immutable_documents_changed"],
    });
    const after = await runtime.adapter.read(created.task_id);
    expect(after).toEqual(read);
  });

  it("accepts full intake and compact refinement through the canonical proposal path", async () => {
    const { root, ctx, parsed } = await setup();
    const suppliedPlan = normalizeTaskPlanProposal(compactPlanInput(), {
      task_id: "caller-placeholder",
      planning_baseline: baseline(),
    });
    const created = await runTaskNewParsed({
      ctx,
      cwd: root,
      rootOverride: root,
      printTaskId: false,
      parsed: { ...parsed, suppliedPlan },
    });
    const refined = compactPlanInput();
    refined.work_items[0]!.objective = "Produce the refined report";
    const result = await setCanonicalPlan(ctx, created.task_id, refined);
    expect(result.record.aggregate.current_plan?.state).toBe("PROPOSED");
    const definition = result.record.aggregate.current_plan!.work_items[0]!;
    const contract = result.record.documents!.contracts[definition.contract_digest!]!;
    expect(contract.objective).toBe("Produce the refined report");
    expect(contract.plan_input_digest).toBeDefined();
    expect(Object.keys(result.record.documents!.plan_inputs!)).toHaveLength(2);
    expect(result.record.aggregate.current_plan?.approval_actor_id).toBeNull();
    expect(result.record.aggregate.authority_lineage ?? []).toEqual([]);
    const replay = await setCanonicalPlan(ctx, created.task_id, refined);
    expect(replay.replayed).toBe(true);
    expect(replay.record.digest).toBe(result.record.digest);
    const original = await ctx.taskBackend.getTask(created.task_id);
    const outside = compactPlanInput();
    outside.work_items[0]!.scope_roots = ["private"];
    await expect(setCanonicalPlan(ctx, created.task_id, outside)).rejects.toThrow("scope_roots");
    expect(await ctx.taskBackend.getTask(created.task_id)).toEqual(original);
  });

  it("rejects invalid intake before a canonical task write and unresolved refinement without mutation", async () => {
    const { root, ctx, parsed } = await setup();
    const before = await ctx.taskBackend.listTasks();
    await expect(
      runTaskNewParsed({
        ctx,
        cwd: root,
        rootOverride: root,
        printTaskId: false,
        parsed: { ...parsed, suppliedPlan: { ...compactPlanInput(), approved_by: "USER" } },
      }),
    ).rejects.toThrow("approved_by");
    expect(await ctx.taskBackend.listTasks()).toEqual(before);
    const created = await runTaskNewParsed({
      ctx,
      cwd: root,
      rootOverride: root,
      printTaskId: false,
      parsed,
    });
    const original = await ctx.taskBackend.getTask(created.task_id);
    await expect(
      setCanonicalPlan(ctx, created.task_id, {
        ...compactPlanInput(),
        unresolved_questions: ["Missing audience"],
      }),
    ).rejects.toThrow("requires PLANNER");
    expect(await ctx.taskBackend.getTask(created.task_id)).toEqual(original);
  });

  it("loads --plan-file through the ordinary create command", async () => {
    const { root, ctx } = await setup();
    const file = path.join(root, "proposal.json");
    await writeFile(file, JSON.stringify(compactPlanInput()));
    const raw = {
      args: { outcome: "Create from a supplied file" },
      opts: { "plan-file": "proposal.json", json: true },
    };
    taskCreateSpec.validateRaw?.(raw);
    const parsed = taskCreateSpec.parse(raw);
    expect(parsed.planFile).toBe("proposal.json");
    const code = await makeRunTaskCreateHandler(async () => ctx)({ cwd: root }, parsed);
    expect(code).toBe(0);
    const tasks = await ctx.taskBackend.listTasks();
    expect(tasks).toHaveLength(1);
    expect(JSON.stringify(tasks[0]?.extensions)).toContain("plan_input_digest");
  });
});
