import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit";
import { makeRunnerContextBundle } from "@agentplane/testkit/runner";
import { defaultConfig } from "@agentplaneorg/core/config";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import {
  normalizeTaskPlanProposal,
  taskCentricDigest,
  taskKernel as k,
} from "@agentplaneorg/core/tasks";
import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import { parseScenarioV2 } from "@agentplaneorg/recipes";
import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { runTaskNewParsed } from "../../commands/task/new.js";
import { compactPlanInput } from "../../commands/task/create-plan-input.testkit.js";
import { observeSuppliedPlanBaseline } from "../../commands/task/create-plan-input.js";
import { setCanonicalPlan } from "../../commands/task/kernel-plan.js";
import {
  createKernelRuntime,
  requireKernelCommit,
} from "../../commands/task/kernel-runtime-context.js";
import { advanceTaskStep } from "../../commands/task/advance-task-step.js";
import { computeRecipeDependencyClosure } from "./recipe-closure.js";
import { prepareRecipeClosureRetention } from "./recipe-retention.js";
import { observeRecipeApplicability } from "./recipe-applicability.js";
import { bindRecipePlanProvenance } from "./recipe-plan-binding.js";
import { projectRecipeRoleContext, RECIPE_ROLE_CONTEXT_LABEL } from "./recipe-role-context.js";
import { buildWorkOrderContextManifest } from "./work-order-context.js";
import { renderTaskRunnerBootstrap } from "../usecases/task-run-bootstrap.js";
import { collectRecipePromptBlocks } from "./recipe-prompt-blocks.js";
import { resolveTaskRunnerRecipe } from "../usecases/task-run-recipe-context.js";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";

installRunCliIntegrationHarness();
async function fixture(
  opts: { guidance?: string; source?: string; secondItem?: boolean; executorRole?: string } = {},
) {
  const root = await mkGitRepoRootWithBranch("main");
  await configureGitUser(root);
  await writeConfig(root, defaultConfig());
  await writeFile(
    path.join(root, "source.txt"),
    opts.source ?? "Required retained source. Stop if evidence is incomplete.",
  );
  await commitAll(root, "seed role context");
  const command = await loadCommandContext({ cwd: root, rootOverride: root });
  const created = await runTaskNewParsed({
    ctx: command,
    cwd: root,
    rootOverride: root,
    printTaskId: false,
    parsed: {
      title: "Role context",
      description: "Preserve the user constraint: no external writes.",
      owner: "CODER",
      priority: "med",
      tags: ["workflow"],
      taskKind: "analysis",
      mutationScope: "none",
      verify: [],
      dependsOn: [],
      allowDuplicate: true,
    },
  });
  const id = created.task_id;
  const recipe = path.join(root, ".agentplane/recipes/demo");
  await mkdir(recipe, { recursive: true });
  const plan = compactPlanInput();
  plan.work_items[0]!.context.required_sources.push("source.txt");
  if (opts.secondItem) {
    Object.assign(plan.work_items[0]!, { criterion_ids: ["c"], check_ids: ["review"] });
    Object.assign(plan, { top_level_validation: { criterion_ids: ["c"], check_ids: ["review"] } });
    const other = structuredClone(plan.work_items[0]!);
    other.id = "other";
    other.objective = "Unrelated WorkItem objective";
    other.expected_outputs = ["other-report"];
    plan.work_items.push(other);
  }
  const scenario = parseScenarioV2({
    schema_version: "2",
    id: "report",
    goal: "Strategy goal",
    parameters: [],
    applicability: {
      required: [{ kind: "path_exists", path: "source.txt" }],
      excluded: [{ kind: "path_exists", path: "forbidden.txt" }],
    },
    plan_template: plan,
  });
  const files = {
    "executor.md": opts.guidance ?? "EXECUTOR GUIDANCE. Stop if the required evidence is absent.",
    "evaluator.md": "EVALUATOR GUIDANCE. Independently challenge the accepted claims.",
    "planner.md": "PLANNER GUIDANCE. Keep material questions unresolved.",
    "exec-skill.md": "EXECUTOR SKILL",
    "review-skill.md": "EVALUATOR SKILL",
    "shared.md": "SHARED CONSTRAINT: never disclose secrets.",
  };
  const manifest = {
    schema_version: "2",
    kind: "project_overlay",
    id: "demo",
    version: "1.0.0",
    name: "Demo",
    summary: "CATALOGUE TEXT MUST NOT ENTER THE PROMPT",
    agents: [
      {
        id: "executor",
        role: opts.executorRole ?? "EXECUTOR",
        display_name: "Executor",
        summary: "Executor",
        file: "executor.md",
        skills: ["exec"],
      },
      {
        id: "evaluator",
        role: "EVALUATOR",
        display_name: "Evaluator",
        summary: "Evaluator",
        file: "evaluator.md",
        skills: ["review"],
      },
      {
        id: "planner",
        role: "PLANNER",
        display_name: "Planner",
        summary: "Planner",
        file: "planner.md",
      },
    ],
    skills: [
      { id: "exec", name: "Exec", summary: "Exec", file: "exec-skill.md" },
      { id: "review", name: "Review", summary: "Review", file: "review-skill.md" },
      { id: "shared", name: "Shared", summary: "Shared", file: "shared.md" },
    ],
    scenarios: [
      {
        id: "report",
        name: "Report",
        summary: "Report",
        use_when: ["Report"],
        required_inputs: [],
        outputs: [],
        permissions: [],
        artifacts: [],
        agents_involved: ["executor", "evaluator", "planner"],
        skills_used: ["shared"],
        tools_used: [],
        run_profile: { mode: "analysis" },
        file: "scenario.json",
      },
    ],
    dependency_closure: {
      schema_version: 1,
      files: [
        ...["scenario.json", ...Object.keys(files)].map((file) => ({
          source: "recipe",
          path: file,
          dependencies: [],
        })),
        { source: "repository", path: "source.txt", dependencies: [] },
      ],
      packages: [],
      tools: [],
      commands: [],
      capabilities: [{ id: "task.verify", dependencies: [] }],
    },
  };
  await writeFile(path.join(recipe, "manifest.json"), JSON.stringify(manifest));
  await writeFile(path.join(recipe, "scenario.json"), JSON.stringify(scenario));
  for (const [file, text] of Object.entries(files)) await writeFile(path.join(recipe, file), text);
  const proposal = normalizeTaskPlanProposal(plan, {
    task_id: id,
    planning_baseline: await observeSuppliedPlanBaseline(command),
  });
  proposal.work_items.work_items[0]!.objective = "Task-specific approved objective";
  const computed = await computeRecipeDependencyClosure({
    recipe_root: recipe,
    repository_root: root,
    scenario_id: "report",
    bindings: [],
    proposed_plan: proposal,
  });
  const reference = await prepareRecipeClosureRetention({
    gitRoot: root,
    taskQualityRoot: path.join(root, `.agentplane/tasks/${id}/quality`),
    computed,
  });
  const gitOpts = {
    cwd: root,
    env: { ...gitEnv(), GIT_ALLOW_PROTOCOL: "file", GIT_TERMINAL_PROMPT: "0" },
    timeout: 30_000,
  };
  await execFileAsync(
    "git",
    ["-c", "core.hooksPath=/dev/null", "add", "-f", reference.artifact.path],
    gitOpts,
  );
  await execFileAsync(
    "git",
    [
      "-c",
      "core.hooksPath=/dev/null",
      "-c",
      "commit.gpgsign=false",
      "commit",
      "-m",
      "retain role context",
    ],
    gitOpts,
  );
  const bound = await bindRecipePlanProvenance({
    gitRoot: root,
    proposal,
    reference,
    bindings: [],
    applicability: await observeRecipeApplicability({
      scenario,
      bindings: [],
      repository_root: root,
    }),
  });
  // Removal precedes native admission/approval; no external dirty edit is hidden from authority.
  await rm(recipe, { recursive: true });
  await setCanonicalPlan(command, id, bound);
  const record = (await command.taskBackend.getTask(id))!.extensions!.task_kernel as KernelRecord;
  const source = Object.values(record.documents!.plan_inputs!).find(
    (input) => input.recipe_provenance,
  )!;
  const project = (role: "EXECUTOR" | "EVALUATOR" | "PLANNER" = "EXECUTOR") =>
    projectRecipeRoleContext({
      gitRoot: root,
      proposal: source,
      role,
      ...(role === "PLANNER" ? {} : { work_item_id: "report" }),
    });
  const advance = (result_path?: string) =>
    advanceTaskStep({ command, task_id: id, transport: "host", result_path });
  const issue = async () => {
    const runtime = await createKernelRuntime({
      command,
      task_id: id,
      transport: "manual",
      operation_id: "role-context-fixture",
      approval: {
        kind: "manual_operator",
        actor_id: "USER",
        invocation_id: k.kernelDigest("role-context-approval"),
      },
    });
    requireKernelCommit(await runtime.authority.approve(id));
    const packet = await advance();
    if (!("exchange" in packet)) throw new Error(JSON.stringify(packet.action));
    const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
      JSON.parse(await readFile(path.join(packet.exchange.directory, "work-order.json"), "utf8")),
    );
    return { packet, order };
  };
  return { root, command, id, reference, source, project, issue, advance, scenario };
}

describe("retained Recipe role projection and managed restart", { timeout: 180_000 }, () => {
  it("loads exact role/shared guidance and current deviations from retained bytes after package removal", async () => {
    const f = await fixture({ secondItem: true });
    const executor = await f.project();
    expect(executor!.current_work_items.map((item) => item.id)).toEqual(["report"]);
    expect(executor!.guidance.map((entry) => entry.path)).toEqual([
      "exec-skill.md",
      "executor.md",
      "shared.md",
      "source.txt",
    ]);
    expect(executor!.deviations).toEqual([
      { work_item_id: "report", kind: "changed", fields: ["objective"] },
    ]);
    expect(executor!.current_work_items[0]!.objective).toBe("Task-specific approved objective");
    expect(executor!.applicability).toEqual(f.scenario.applicability);
    const evaluator = await f.project("EVALUATOR");
    expect(evaluator!.guidance.map((entry) => entry.path)).toEqual([
      "evaluator.md",
      "review-skill.md",
      "shared.md",
      "source.txt",
    ]);
    const planner = await f.project("PLANNER");
    expect(planner!.current_work_items.map((item) => item.id)).toEqual(["report", "other"]);
    expect(planner!.guidance.map((entry) => entry.path)).toEqual([
      "planner.md",
      "shared.md",
      "source.txt",
    ]);
    for (const text of [
      JSON.stringify(executor),
      JSON.stringify(evaluator),
      JSON.stringify(planner),
    ]) {
      expect(text).not.toContain("CATALOGUE TEXT");
      expect(text).not.toContain("base64");
      expect(text).not.toContain("planning_baseline");
      expect(text).not.toContain("plan_template");
    }
  });

  it("delivers complete required native Recipe context to a fresh managed adapter without provider memory", async () => {
    const f = await fixture();
    const { packet, order } = await f.issue();
    expect(order.role).toBe("EXECUTOR");
    expect(order.context_intent.purpose).toContain(RECIPE_ROLE_CONTEXT_LABEL);
    expect(order.context_intent.purpose).not.toContain("Caller-supplied Plan input");
    const bundle = makeRunnerContextBundle({ runId: "recipe-role-restart" });
    bundle.work_order = order;
    bundle.semantic_context = buildWorkOrderContextManifest(
      order,
      path.join(packet.exchange.directory, "work-order.json"),
    );
    bundle.execution.write_scope = {
      ...bundle.execution.write_scope!,
      writable_roots: [...order.authority.writable_roots],
    };
    const delivered = renderTaskRunnerBootstrap(bundle);
    const wireBundle = path.join(f.root, "managed-bundle.json");
    await writeFile(wireBundle, JSON.stringify(bundle));
    const restarted = renderTaskRunnerBootstrap(
      JSON.parse(await readFile(wireBundle, "utf8")) as typeof bundle,
    );
    expect(restarted).toBe(delivered);
    for (const required of [
      "EXECUTOR GUIDANCE",
      "SHARED CONSTRAINT",
      "no external writes",
      "forbidden.txt",
      "excluded",
      "Stop if excluded applicability is true or unknown",
      "Task-specific approved objective",
      "Required retained source",
      "Do not invoke task, Git or provider lifecycle commands",
    ])
      expect(delivered).toContain(required);
    for (const unrelated of [
      "EVALUATOR GUIDANCE",
      "PLANNER GUIDANCE",
      "CATALOGUE TEXT",
      '"base64"',
      "Caller-supplied Plan input",
    ])
      expect(delivered).not.toContain(unrelated);
    expect(bundle.semantic_context.blocks.find((block) => block.id === "constraints")!.digest).toBe(
      taskCentricDigest(order.context_intent),
    );
  });

  it("uses the same retained role owner for native independent inspection", async () => {
    const f = await fixture();
    const { packet, order } = await f.issue();
    await writeFile(
      packet.exchange.result_path,
      JSON.stringify({
        work_order_id: order.work_order_id,
        status: "completed",
        summary: "Report produced",
        findings: [],
        uncertainty: [],
        canonical_outputs: [{ id: "report", kind: "report", digest: taskCentricDigest("report") }],
      }),
    );
    const inspection = await f.advance(packet.exchange.result_path);
    if (!("exchange" in inspection)) throw new Error(JSON.stringify(inspection.action));
    const review = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
      JSON.parse(
        await readFile(path.join(inspection.exchange.directory, "work-order.json"), "utf8"),
      ),
    );
    expect(review.role).toBe("EVALUATOR");
    expect(review.context_intent.purpose).toContain("EVALUATOR GUIDANCE");
    expect(review.context_intent.purpose).not.toContain("EXECUTOR GUIDANCE");
    expect(review.context_intent.purpose).toContain("forbidden.txt");
    expect(review.context_intent.purpose).toContain("no external writes");
    expect(review.authority.mutation_scope).toBe("none");
    expect(
      review.required_inputs.some((input) => input.id === "native-validation" && input.required),
    ).toBe(true);
  });

  it("stops on tampered retained evidence or a changed source Plan instead of using installed/latest guidance", async () => {
    const f = await fixture();
    const changed = structuredClone(f.source);
    changed.work_items.work_items[0]!.objective = "Forged context";
    await expect(
      projectRecipeRoleContext({
        gitRoot: f.root,
        proposal: changed,
        role: "EXECUTOR",
        work_item_id: "report",
      }),
    ).rejects.toThrow("exact source Plan");
    await writeFile(path.join(f.root, f.reference.artifact.path), "tampered");
    await expect(f.project()).rejects.toThrow();
  });

  it("rejects unmapped roles in selected retained guidance instead of silently omitting them", async () => {
    const f = await fixture({ executorRole: "CODER" });
    await expect(f.project()).rejects.toThrow("explicit native role mapping");
    await expect(f.issue()).rejects.toThrow("explicit native role mapping");
  });

  it("blocks oversized required guidance without silently truncating constraints", async () => {
    const f = await fixture({ guidance: "Required stop condition\n".repeat(4000) });
    await expect(f.project()).rejects.toThrow("byte budget");
    await expect(f.issue()).rejects.toThrow("byte budget");
  });

  it("blocks required repository context exceeding its declared budget", async () => {
    const f = await fixture({ source: "Required source\n".repeat(1000) });
    await expect(f.project()).rejects.toThrow("byte budget");
  });

  it("rejects V2 raw legacy runner context instead of duplicating or reloading a full manifest", async () => {
    const recipe = {
      recipe_id: "demo",
      scenario_id: "report",
      recipe_dir: "/unavailable",
      scenario: { schema_version: "2" },
      manifest: { secret: "Not guidance" },
    };
    await expect(collectRecipePromptBlocks({ git_root: process.cwd(), recipe })).rejects.toThrow(
      "retained native WorkOrder",
    );
    await expect(resolveTaskRunnerRecipe({ command: {} as never, recipe })).rejects.toThrow(
      "retained native WorkOrder",
    );
  });
});
