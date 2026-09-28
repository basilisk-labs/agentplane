import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit";
import { defaultConfig } from "../../cli/core-imports.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { runTaskNewParsed } from "./new.js";
import { advanceTaskStep } from "./advance-task-step.js";
import { compactPlanInput } from "./create-plan-input.testkit.js";
import { prepareSuppliedPlan } from "./create-plan-input.js";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";

installRunCliIntegrationHarness();

describe("supplied Plan materialization", { timeout: 180_000 }, () => {
  async function setup(
    opts: {
      supplied?: unknown;
      policy?: Record<string, unknown>;
      full?: boolean;
      unknownIntent?: boolean;
    } = {},
  ) {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    if (opts.policy !== undefined) Object.assign(config.agents.approvals, opts.policy);
    await writeConfig(root, config);
    await writeFile(path.join(root, "source.txt"), "unchanged\n");
    await commitAll(root, "seed materialization test");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    if (opts.policy !== undefined)
      expect(ctx.config.agents.approvals.require_planner).toBe(opts.policy.require_planner);
    const supplied = opts.full
      ? await prepareSuppliedPlan(ctx, "caller-placeholder", compactPlanInput())
      : opts.supplied;
    const created = await runTaskNewParsed({
      ctx,
      cwd: root,
      rootOverride: root,
      printTaskId: false,
      parsed: {
        title: "Explicit supplied Plan",
        description: "Answer the report question.",
        owner: "CODER",
        priority: "med",
        tags: ["workflow"],
        taskKind: "analysis",
        mutationScope: opts.unknownIntent ? "unknown" : "none",
        verify: [],
        dependsOn: [],
        allowDuplicate: true,
        ...(supplied ? { suppliedPlan: supplied } : {}),
      },
    });
    const advance = () =>
      advanceTaskStep({
        command: ctx,
        task_id: created.task_id,
        transport: "host",
      });
    const record = async () =>
      (await ctx.taskBackend.getTask(created.task_id))!.extensions!.task_kernel as KernelRecord;
    return { root, ctx, id: created.task_id, advance, record };
  }

  it.each(["compact", "full"])(
    "materializes %s input and stops at ordinary approval",
    async (form) => {
      const fixture = await setup({ supplied: compactPlanInput(), full: form === "full" });
      const packet = await fixture.advance();
      expect(packet.action).toMatchObject({
        kind: "approval_required",
        reason: "kernel_plan_approval_required",
      });
      expect(packet).not.toHaveProperty("exchange");
      const record = await fixture.record();
      expect(record.aggregate.current_plan?.state).toBe("PROPOSED");
      expect(record.aggregate.current_plan?.approval_actor_id).toBeNull();
      expect(record.aggregate.authority_lineage ?? []).toEqual([]);
      expect(record.events.map((event) => event.kind)).toEqual([
        "intent_captured",
        "plan_proposed",
      ]);
      expect(Object.values(record.documents!.contracts)[0]).toMatchObject({
        objective: "Produce the report",
        acceptance_criteria: ["The report answers the question"],
        plan_input_digest: record.documents!.intent.plan_input_digest,
      });
      const again = await fixture.advance();
      expect(again.action.kind).toBe("approval_required");
      const replayed = await fixture.record();
      expect(replayed.digest).toBe(record.digest);
    },
  );

  it.each([
    ["missing input", {}],
    [
      "unresolved question",
      { supplied: { ...compactPlanInput(), unresolved_questions: ["Which audience?"] } },
    ],
    ["unknown intent", { supplied: compactPlanInput(), unknownIntent: true }],
    ["mandatory policy", { supplied: compactPlanInput(), policy: { require_planner: true } }],
    ["malformed policy", { supplied: compactPlanInput(), policy: { require_planner: "false" } }],
  ] as const)("keeps read-only PLANNER for %s", async (_name, options) => {
    const fixture = await setup(options);
    const packet = await fixture.advance();
    expect(packet.action.kind).toBe("agent_episode");
    if (!("exchange" in packet)) throw new Error("PLANNER exchange missing");
    const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
      JSON.parse(await readFile(path.join(packet.exchange.directory, "work-order.json"), "utf8")),
    );
    expect(order.role).toBe("PLANNER");
    expect(order.authority.mutation_scope).toBe("none");
    const record = await fixture.record();
    expect(record.aggregate.current_plan).toBeNull();
  });

  it("does not silently rebind an accepted input after source changes", async () => {
    const fixture = await setup({ supplied: compactPlanInput() });
    const original = await fixture.record();
    await writeFile(path.join(fixture.root, "source.txt"), "changed\n");
    const packet = await fixture.advance();
    expect(packet.action.kind).toBe("agent_episode");
    const record = await fixture.record();
    expect(record.documents).toEqual(original.documents);
    expect(record.aggregate.current_plan).toBeNull();
  });

  it.each([
    { kind: "semantic", capability: "unknown.verifier" },
    { kind: "deterministic", capability: "task.verify" },
    { kind: "provider", capability: "task.verify" },
  ])("requires planning for an unsupported verification contract %j", async (check) => {
    const supplied = compactPlanInput();
    Object.assign(supplied.checks[0]!, check);
    const fixture = await setup({ supplied });
    const packet = await fixture.advance();
    expect(packet.action.kind).toBe("agent_episode");
    const record = await fixture.record();
    expect(record.aggregate.current_plan).toBeNull();
  });
});
