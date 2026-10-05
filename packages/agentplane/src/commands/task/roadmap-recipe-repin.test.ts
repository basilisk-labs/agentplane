import { suppliedKernelProposal } from "./create-plan-proposal.js";
import { makeRunTaskPlanRejectHandler } from "./plan-reject.command.js";
import { generateKeyPairSync } from "node:crypto";
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  mkGitRepoRootWithBranch,
  configureGitUser,
  commitAll,
  writeConfig,
  installRunCliIntegrationHarness,
} from "@agentplane/testkit";
import { defaultConfig } from "@agentplaneorg/core/config";
import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { normalizeTaskPlanProposal, taskKernel as k } from "@agentplaneorg/core/tasks";
import { parseScenarioV2 } from "@agentplaneorg/recipes";
import { loadCommandContext } from "../shared/task-backend.js";
import { runTaskNewParsed } from "./new.js";
import { observeSuppliedPlanBaseline } from "./create-plan-input.js";
import {
  bindRecipePlanProvenance,
  readBoundRecipePlanClosure,
} from "../../runner/context/recipe-plan-binding.js";
import { computeRecipeDependencyClosure } from "../../runner/context/recipe-closure.js";
import { prepareRecipeClosureRetention } from "../../runner/context/recipe-retention.js";
import { prepareRecipePlanRebind } from "../../runner/context/recipe-plan-rebind.js";
import { observeRecipeApplicability } from "../../runner/context/recipe-applicability.js";
import { setCanonicalPlan } from "./kernel-plan.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";
import {
  preserveCompletedRecipeContracts,
  validateKernelRecipeBindings,
} from "./kernel-recipe-admission.js";

installRunCliIntegrationHarness();
async function fixture() {
  const root = await mkGitRepoRootWithBranch("main");
  await configureGitUser(root);
  const config = defaultConfig();
  config.authority.approval_receipts.trusted_issuers = [
    {
      id: "recipe-test-issuer",
      public_key_spki: generateKeyPairSync("ed25519")
        .publicKey.export({ type: "spki", format: "der" })
        .toString("base64"),
    },
  ];
  await writeConfig(root, config);
  await writeFile(path.join(root, "source.txt"), "source\n");
  await commitAll(root, "seed");
  const command = await loadCommandContext({ cwd: root, rootOverride: root });
  const created = await runTaskNewParsed({
    ctx: command,
    cwd: root,
    rootOverride: root,
    printTaskId: false,
    parsed: {
      title: "Recipe pinned recovery",
      description: "Produce bounded report",
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
  const scenario = parseScenarioV2({
    schema_version: "2",
    id: "report",
    goal: "Report",
    parameters: [],
    applicability: { required: [], excluded: [] },
    plan_template: {
      schema_version: 2,
      criteria: [
        { id: "correct", description: "Correct report", required: true, check_ids: ["review"] },
      ],
      checks: [{ id: "review", kind: "semantic", required: true, capability: "task.verify" }],
      work_items: [
        {
          id: "report",
          objective: "Produce report",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["report-evidence"],
          scope_roots: [],
          context: {
            required_sources: [],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 1024,
          },
          risk: "low",
          capabilities: [],
          resource_claims: [],
          optional: false,
          priority: 1,
        },
      ],
    },
  });
  const manifest = {
    schema_version: "2",
    kind: "project_overlay",
    id: "demo",
    version: "1.0.0",
    name: "Demo",
    summary: "Demo",
    agents: [
      {
        id: "worker",
        display_name: "Worker",
        role: "EXECUTOR",
        summary: "Worker",
        file: "agent.md",
      },
    ],
    scenarios: [
      {
        id: "report",
        name: "Report",
        summary: "Report",
        use_when: ["report"],
        required_inputs: [],
        outputs: [],
        permissions: [],
        artifacts: [],
        agents_involved: ["worker"],
        skills_used: [],
        tools_used: [],
        run_profile: { mode: "analysis" },
        file: "scenario.json",
      },
    ],
    dependency_closure: {
      schema_version: 1,
      files: [
        { source: "recipe", path: "scenario.json", dependencies: [] },
        { source: "recipe", path: "agent.md", dependencies: [] },
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
  await writeFile(path.join(recipe, "agent.md"), "Pinned guidance");
  const proposal = normalizeTaskPlanProposal(scenario.plan_template, {
    task_id: id,
    planning_baseline: await observeSuppliedPlanBaseline(command),
  });
  const computed = await computeRecipeDependencyClosure({
    recipe_root: recipe,
    repository_root: root,
    scenario_id: scenario.id,
    bindings: [],
    proposed_plan: proposal,
  });
  const reference = await prepareRecipeClosureRetention({
    gitRoot: root,
    taskQualityRoot: path.join(root, `.agentplane/tasks/${id}/quality`),
    computed,
  });
  const retain = async (file: string) => {
    const opts = {
      cwd: root,
      env: { ...gitEnv(), GIT_ALLOW_PROTOCOL: "file", GIT_TERMINAL_PROMPT: "0" },
      timeout: 30_000,
    };
    await execFileAsync("git", ["-c", "core.hooksPath=/dev/null", "add", "-f", file], opts);
    await execFileAsync(
      "git",
      [
        "-c",
        "core.hooksPath=/dev/null",
        "-c",
        "commit.gpgsign=false",
        "commit",
        "-m",
        "retain dependency proof",
      ],
      opts,
    );
  };
  await retain(reference.artifact.path);
  const observe = () =>
    observeRecipeApplicability({ scenario, bindings: [], repository_root: root });
  const bound = await bindRecipePlanProvenance({
    gitRoot: root,
    proposal,
    reference,
    bindings: [],
    applicability: await observe(),
  });
  await setCanonicalPlan(command, id, bound);
  const runtime = () =>
    createKernelRuntime({
      command,
      task_id: id,
      transport: "manual",
      operation_id: "recipe-repin-fixture",
      approval: {
        kind: "manual_operator",
        actor_id: "USER",
        invocation_id: k.kernelDigest("exact native approval"),
      },
    });
  const native = await runtime();
  const read = async () => {
    const value = await native.adapter.read(id);
    if (value.kind !== "canonical") throw new Error(value.kind);
    return value;
  };
  const initialRead = await read();
  const source = initialRead.record.documents!.plan_inputs!;
  const previous = Object.values(source).find((value) => value.recipe_provenance)!;
  const specialized = structuredClone(previous);
  delete specialized.recipe_provenance;
  const added = structuredClone(specialized.work_items.work_items[0]!);
  added.id = "added-guidance";
  added.objective = "Use the added repository guidance";
  added.expected_outputs = ["added-evidence"];
  added.context.required_sources = ["source.txt"];
  specialized.work_items.work_items.push(added);
  return {
    root,
    command,
    id,
    recipe,
    scenario,
    manifest,
    bound,
    previous,
    specialized,
    reference,
    native,
    runtime,
    read,
    retain,
    observe,
  };
}

describe("Recipe specialization dependency rebinding", { timeout: 180_000 }, () => {
  it("retains added dependency bytes before common proposal approval and rejects an old pin", async () => {
    const f = await fixture();
    const before = await f.read();
    const base = before.record.aggregate.current_plan!;
    const first = base.work_items[0]!;
    const { contract_digest, ...definition } = first;
    const contract = before.record.documents!.contracts[String(contract_digest)]!;
    const refinement = {
      schema_version: 1,
      kind: "plan_refinement",
      task_id: f.id,
      base_plan_digest: base.digest,
      operations: [
        {
          kind: "add",
          work_item: {
            ...definition,
            id: "added-guidance",
            expected_outputs: ["added-evidence"],
            contract,
          },
        },
      ],
    };
    await expect(setCanonicalPlan(f.command, f.id, refinement)).rejects.toThrow("rebind required");
    expect(await f.read()).toEqual(before);
    const prepared = await prepareRecipePlanRebind({
      command: f.command,
      recipe_root: f.recipe,
      previous: f.previous,
      proposal: f.specialized,
    });
    expect(prepared.reference.closure_digest).not.toBe(f.reference.closure_digest);
    await expect(
      bindRecipePlanProvenance({
        gitRoot: f.root,
        proposal: prepared.proposal,
        reference: prepared.reference,
        bindings: [],
        applicability: await f.observe(),
      }),
    ).rejects.toThrow();
    await f.retain(prepared.reference.artifact.path);
    const bound = await bindRecipePlanProvenance({
      gitRoot: f.root,
      proposal: prepared.proposal,
      reference: prepared.reference,
      bindings: [],
      applicability: await f.observe(),
    });
    const retained = await readBoundRecipePlanClosure({ gitRoot: f.root, proposal: bound });
    expect(Buffer.from(retained.readFile("repository", "source.txt")).toString()).toBe("source\n");
    await makeRunTaskPlanRejectHandler(() => Promise.resolve(f.command))(
      { cwd: f.root },
      { taskId: f.id, by: "USER", note: "Review specialized dependencies before approval" },
    );
    await setCanonicalPlan(f.command, f.id, bound);
    const after = await f.read();
    expect(after.record.aggregate.current_plan?.state).toBe("PROPOSED");
    expect(after.record.aggregate.current_plan?.digest).not.toBe(base.digest);
    requireKernelCommit(await f.native.authority.approve(f.id));
    const finalRead = await f.read();
    expect(finalRead.record.aggregate.current_plan?.state).toBe("APPROVED");
  });
  it("requires fresh native approval for added dependencies on an ACTIVE Plan", async () => {
    const f = await fixture();
    requireKernelCommit(await f.native.authority.approve(f.id));
    const before = await f.read();
    const plan = before.record.aggregate.current_plan!;
    const oldAuthority = before.record.aggregate.authority_lineage!.at(-1)!.authority;
    requireKernelCommit(
      await f.native.lifecycle.apply(
        await f.native.input(
          {
            kind: "materialize_work_items",
            plan_revision: plan.revision,
            plan_digest: plan.digest,
          },
          "materialize-repin",
        ),
      ),
    );
    const prepared = await prepareRecipePlanRebind({
      command: f.command,
      recipe_root: f.recipe,
      previous: f.previous,
      proposal: f.specialized,
    });
    await f.retain(prepared.reference.artifact.path);
    const bound = await bindRecipePlanProvenance({
      gitRoot: f.root,
      proposal: prepared.proposal,
      reference: prepared.reference,
      bindings: [],
      applicability: await f.observe(),
    });
    const unchanged = await f.read();
    const completed = structuredClone(unchanged.record.aggregate);
    completed.work_items.report = { ...completed.work_items.report!, state: "COMPLETED" };
    const candidate = suppliedKernelProposal(bound, unchanged.task);
    const preserved = preserveCompletedRecipeContracts({
      proposal: candidate,
      aggregate: completed,
      documents: unchanged.record.documents,
    });
    expect(k.kernelDigest(preserved.work_items[0]!.contract)).toBe(
      completed.work_items.report.definition.contract_digest,
    );
    expect(preserved.work_items[1]!.contract.plan_input_digest).toBe(k.kernelDigest(bound));
    const changedCompleted = structuredClone(candidate);
    changedCompleted.work_items[0]!.contract.objective = "Changed completed work";
    expect(() =>
      preserveCompletedRecipeContracts({
        proposal: changedCompleted,
        aggregate: completed,
        documents: unchanged.record.documents,
      }),
    ).toThrow("cannot change completed");
    await expect(setCanonicalPlan(f.command, f.id, bound)).rejects.toThrow(
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    expect(await f.read()).toEqual(unchanged);
    await setCanonicalPlan(f.command, f.id, bound, { scopeExpansionApprovedBy: "USER" });
    const after = await f.read();
    const newAuthority = after.record.aggregate.authority_lineage!.at(-1)!.authority;
    expect(after.record.aggregate.current_plan?.digest).not.toBe(plan.digest);
    expect(newAuthority.plan_digest).toBe(after.record.aggregate.current_plan?.digest);
    expect(k.compareExecutionAuthority(oldAuthority, newAuthority).ok).toBe(false);
    await expect(f.native.authority.resolve(f.id, "added-guidance")).resolves.toBeDefined();
    const subset = {
      ...after.record.aggregate.current_plan!,
      work_items: after.record.aggregate.current_plan!.work_items.slice(0, 1),
    };
    await expect(
      validateKernelRecipeBindings({
        command: f.command,
        task: after.task,
        plan: subset,
        documents: after.record.documents,
      }),
    ).rejects.toThrow("complete specialized Plan");
  });
  it("uses approved retained bytes after installed removal or unrelated catalogue update", async () => {
    const f = await fixture();
    requireKernelCommit(await f.native.authority.approve(f.id));
    const before = await f.read();
    await writeFile(path.join(f.recipe, "agent.md"), "Installed same-version replacement");
    await writeFile(path.join(f.recipe, "unrelated.json"), "unrelated");
    await validateKernelRecipeBindings({
      command: f.command,
      task: before.task,
      plan: before.record.aggregate.current_plan,
      documents: before.record.documents,
    });
    await expect(f.native.authority.resolve(f.id)).rejects.toThrow("native_continuation_required");
    await rm(f.recipe, { recursive: true });
    await validateKernelRecipeBindings({
      command: f.command,
      task: before.task,
      plan: before.record.aggregate.current_plan,
      documents: before.record.documents,
    });
    await expect(f.native.authority.resolve(f.id)).rejects.toThrow("native_continuation_required");
    const retained = await readBoundRecipePlanClosure({ gitRoot: f.root, proposal: f.previous });
    expect(Buffer.from(retained.readFile("recipe", "agent.md")).toString()).toBe("Pinned guidance");
    expect(await f.read()).toEqual(before);
  });
  it("fails bound-byte tamper at use without replacing the original pin", async () => {
    const f = await fixture();
    requireKernelCommit(await f.native.authority.approve(f.id));
    const file = path.join(f.root, f.reference.artifact.path);
    const bytes = await readFile(file);
    await writeFile(file, Buffer.concat([bytes, Buffer.from(" ")]));
    await expect(f.native.authority.resolve(f.id)).rejects.toThrow();
    const finalRead = await f.read();
    expect(finalRead.record.aggregate.current_plan?.state).toBe("APPROVED");
  });
  it("routes current trust revocation through native policy admission", async () => {
    const f = await fixture();
    requireKernelCommit(await f.native.authority.approve(f.id));
    f.command.config.authority.approval_receipts.trusted_issuers = [];
    await expect(f.native.authority.resolve(f.id)).rejects.toThrow("native_policy_changed");
    const finalRead = await f.read();
    expect(finalRead.record.aggregate.current_plan?.state).toBe("APPROVED");
  });
  it("rejects identical-version changed guidance during explicit recomputation", async () => {
    const f = await fixture();
    await writeFile(path.join(f.recipe, "agent.md"), "Different bytes, same version");
    await expect(
      prepareRecipePlanRebind({
        command: f.command,
        recipe_root: f.recipe,
        previous: f.previous,
        proposal: f.specialized,
      }),
    ).rejects.toThrow("pinned bytes changed");
  });
  it("detects a forged native dependency change independently of common input parsing", async () => {
    const f = await fixture();
    const read = await f.read();
    const plan = structuredClone(read.record.aggregate.current_plan!);
    plan.work_items[0]!.execution_requirements.capabilities = ["unbound.tool"];
    await expect(
      validateKernelRecipeBindings({
        command: f.command,
        task: read.task,
        plan,
        documents: read.record.documents,
      }),
    ).rejects.toThrow("differs from its pinned source");
  });
});
