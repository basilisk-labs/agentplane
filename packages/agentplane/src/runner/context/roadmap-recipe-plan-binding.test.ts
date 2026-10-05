import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { mkGitRepoRoot } from "@agentplane/testkit";
import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { defaultConfig } from "@agentplaneorg/core/config";
import { AGENT_SEMANTIC_RESULT_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import {
  createRepositorySnapshot,
  normalizeTaskPlanProposal,
  parseTaskPlanProposal,
  recipeSourcePlanSemanticDigest,
  taskCentricDigest,
  taskKernel as k,
} from "@agentplaneorg/core/tasks";
import { parseScenarioV2 } from "@agentplaneorg/recipes";
import {
  bindRecipePlanProvenance,
  computeRecipeDependencyClosure,
  observeRecipeApplicability,
  prepareRecipeClosureRetention,
  readBoundRecipePlanClosure,
  readRetainedRecipeClosure,
  validateRecipePlanForAdmission,
} from "./recipe-context.js";
import { prepareSuppliedPlan } from "../../commands/task/create-plan-input.js";
import { suppliedKernelProposal } from "../../commands/task/create-plan-proposal.js";
import { canonicalPlanFromProposal } from "../../commands/task/kernel-plan-proposal.js";
import {
  kernelDocumentIssues,
  kernelDocumentsSchema,
} from "../../adapters/task-backend/kernel-documents.js";
import { putEvaluatorEvidenceObject } from "../../commands/evaluator/evaluator-evidence-store.js";

function jsonRoundtrip(value: unknown): unknown {
  const bytes = JSON.stringify(value);
  return JSON.parse(bytes) as unknown;
}
const cleanup: string[] = [];
afterEach(async () => {
  await Promise.all(cleanup.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});
async function git(root: string, args: string[]) {
  return execFileAsync(
    "git",
    ["-c", "core.hooksPath=/dev/null", "-c", "commit.gpgsign=false", ...args],
    {
      cwd: root,
      env: { ...gitEnv(), GIT_ALLOW_PROTOCOL: "file", GIT_TERMINAL_PROMPT: "0" },
      timeout: 30_000,
    },
  );
}
function baseline(sha: string) {
  return createRepositorySnapshot({
    git: { kind: "commit", sha, ref: null },
    dirty_paths: [],
    policy_digest: null,
    config_digest: null,
    context_digest: null,
    task_history_cursor: null,
    captured_at: "2026-10-05T00:00:00.000Z",
  });
}
async function fixture() {
  const root = await mkGitRepoRoot();
  cleanup.push(root);
  await git(root, ["commit", "--allow-empty", "-m", "seed"]);
  const beforeResult = await git(root, ["rev-parse", "HEAD"]);
  const before = beforeResult.stdout.trim();
  const recipe = path.join(root, "installed");
  const quality = path.join(root, ".agentplane/tasks/task-1/quality");
  await mkdir(recipe);
  await mkdir(path.join(root, "src"));
  const scenario = parseScenarioV2({
    schema_version: "2",
    id: "repair",
    goal: "Repair {{target}}",
    parameters: [
      { name: "target", type: "repo_path", required: true, default: "src" },
      { name: "count", type: "integer", required: false, default: 1 },
    ],
    applicability: { required: [{ kind: "path_exists", path: "src" }], excluded: [] },
    plan_template: {
      schema_version: 2,
      criteria: [{ id: "correct", description: "Correct", required: true, check_ids: ["test"] }],
      checks: [{ id: "test", kind: "semantic", required: true, capability: "task.verify" }],
      work_items: [
        {
          id: "repair",
          objective: "Repair",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["patch"],
          scope_roots: ["{{target}}"],
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
        id: "repair",
        name: "Repair",
        summary: "Repair",
        use_when: ["repair"],
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
      ],
      packages: [],
      tools: [],
      commands: [],
      capabilities: [{ id: "task.verify", dependencies: [] }],
    },
  };
  await writeFile(path.join(recipe, "manifest.json"), JSON.stringify(manifest));
  await writeFile(path.join(recipe, "scenario.json"), JSON.stringify(scenario));
  await writeFile(path.join(recipe, "agent.md"), "Pinned old guidance");
  // Compile before retention's commit, then recover and bind to the new native HEAD.
  const { resolveScenarioParameters } = await import("@agentplaneorg/recipes");
  const proposal = normalizeTaskPlanProposal(
    resolveScenarioParameters(scenario, []).plan_template,
    { task_id: "task-1", planning_baseline: baseline(before) },
  );
  const computed = await computeRecipeDependencyClosure({
    recipe_root: recipe,
    repository_root: root,
    scenario_id: "repair",
    bindings: [],
    proposed_plan: proposal,
  });
  const reference = await prepareRecipeClosureRetention({
    gitRoot: root,
    taskQualityRoot: quality,
    computed,
  });
  await git(root, ["add", "-f", reference.artifact.path]);
  await git(root, ["commit", "-m", "retain selected closure"]);
  const afterResult = await git(root, ["rev-parse", "HEAD"]);
  const after = afterResult.stdout.trim();
  const current = normalizeTaskPlanProposal(proposal, {
    task_id: "task-1",
    planning_baseline: baseline(after),
    rebind: true,
  });
  const applicability = await observeRecipeApplicability({
    scenario,
    bindings: [],
    repository_root: root,
  });
  const bind = (bindings: { name: string; value: string | number | boolean }[] = []) =>
    bindRecipePlanProvenance({
      gitRoot: root,
      proposal: current,
      reference,
      bindings,
      applicability,
    });
  const bound = await bind();
  return {
    root,
    recipe,
    quality,
    scenario,
    proposal,
    current,
    computed,
    reference,
    applicability,
    before,
    after,
    bound,
    bind,
  };
}
function nativePlan(input: ReturnType<typeof parseTaskPlanProposal>) {
  const proposal = suppliedKernelProposal(input, {
    verify: [],
    execution_contract: {
      authority: { allowed_capabilities: [] },
      declaration: { repository_effects: ["source_code"], external_effects: [] },
    },
  } as Parameters<typeof suppliedKernelProposal>[1]);
  return { proposal, plan: canonicalPlanFromProposal(proposal, 1) };
}
function command(root: string) {
  return { resolvedProject: { gitRoot: root }, config: defaultConfig() } as Parameters<
    typeof prepareSuppliedPlan
  >[0];
}

describe("Recipe provenance in the existing Kernel Plan input", () => {
  it("recovers committed closure and binds after HEAD changes without a circular identity", async () => {
    const f = await fixture();
    expect(f.after).not.toBe(f.before);
    expect(recipeSourcePlanSemanticDigest(f.current)).toBe(
      recipeSourcePlanSemanticDigest(f.proposal),
    );
    expect(taskCentricDigest(f.current)).not.toBe(taskCentricDigest(f.proposal));
    expect(f.bound.recipe_provenance).toMatchObject({
      schema_version: 1,
      package: { id: "demo", version: "1.0.0" },
      compiler: { id: "agentplane.scenario", version: 1 },
      closure: { digest: f.computed.closure.digest },
    });
    expect(
      await f.bind([
        { name: "target", value: "src" },
        { name: "count", value: 1 },
      ]),
    ).toEqual(f.bound);
    expect(
      await f.bind([
        { name: "count", value: 1 },
        { name: "target", value: "src" },
      ]),
    ).toEqual(f.bound);
    const roundtrip = parseTaskPlanProposal(jsonRoundtrip(f.bound));
    await expect(
      validateRecipePlanForAdmission({ gitRoot: f.root, proposal: roundtrip }),
    ).resolves.toBeUndefined();
    const admitted = await prepareSuppliedPlan(command(f.root), "task-1", roundtrip);
    expect(admitted.recipe_provenance).toEqual(f.bound.recipe_provenance);
    expect(admitted.planning_baseline.git).toMatchObject({ sha: f.after });
  });

  it("keeps provenance once in native documents and binds it through contracts and Plan identity", async () => {
    const f = await fixture();
    const { proposal, plan } = nativePlan(f.bound);
    const sourceDigest = k.kernelDigest(f.bound);
    expect(proposal.work_items[0]!.contract.plan_input_digest).toBe(sourceDigest);
    expect(plan).not.toHaveProperty("recipe_provenance");
    const intent = { objective: "Repair", context: "Repair", plan_input_digest: sourceDigest };
    const documents = kernelDocumentsSchema.parse({
      intent,
      contracts: Object.fromEntries(
        proposal.work_items.map((item) => [k.kernelDigest(item.contract), item.contract]),
      ),
      plan_inputs: { [String(sourceDigest)]: f.bound },
    });
    const aggregate = {
      id: "task-1",
      intent_digest: k.kernelDigest(intent),
      current_plan: plan,
      plan_history: [],
    } as unknown as k.TaskAggregate;
    expect(kernelDocumentIssues(aggregate, documents)).toEqual([]);
    const altered = structuredClone(documents);
    altered.plan_inputs![String(sourceDigest)]!.recipe_provenance!.closure.digest =
      k.kernelDigest("latest");
    expect(kernelDocumentIssues(aggregate, altered)).toContain(
      `plan_input_identity:${sourceDigest}`,
    );
    const rebound = normalizeTaskPlanProposal(f.bound, {
      task_id: "task-1",
      planning_baseline: baseline("b".repeat(40)),
      rebind: true,
    });
    const replacement = nativePlan(rebound).plan;
    expect(replacement.digest).not.toBe(plan.digest);
    const authority = {
      digest: k.kernelDigest("approval"),
      task_id: "task-1",
      plan_revision: 1,
      plan_digest: plan.digest,
      repository_fingerprint: k.kernelDigest("repository"),
      work_item_id: null,
    } as k.ExecutionAuthority;
    const expected = {
      task_id: "task-1",
      plan_revision: 1,
      plan_digest: plan.digest,
      repository_fingerprint: authority.repository_fingerprint,
      work_item_id: "repair",
    };
    expect(k.authorityBindsCurrentState(authority, expected)).toBe(true);
    expect(
      k.authorityBindsCurrentState(authority, { ...expected, plan_digest: replacement.digest }),
    ).toBe(false);
    expect(rebound.recipe_provenance).toEqual(f.bound.recipe_provenance);
  });

  it.each(["objective", "scope", "check", "output", "assumption"])(
    "cannot reuse a retained pin after semantic %s changes",
    async (field) => {
      const f = await fixture();
      const changed = structuredClone(f.current);
      const item = changed.work_items.work_items[0]!;
      if (field === "objective") item.objective = "Different";
      if (field === "scope") item.scope_roots = ["elsewhere"];
      if (field === "check") item.validation.checks[0]!.capability = "other";
      if (field === "output") item.expected_outputs = ["different"];
      if (field === "assumption") changed.assumptions = ["Different"];
      await expect(
        bindRecipePlanProvenance({
          gitRoot: f.root,
          proposal: changed,
          reference: f.reference,
          bindings: [],
          applicability: f.applicability,
        }),
      ).rejects.toThrow("different source Plan");
      expect(() =>
        parseTaskPlanProposal({ ...changed, recipe_provenance: f.bound.recipe_provenance }),
      ).toThrow("exact source Plan");
    },
  );

  it("rejects forged full-proposal applicability and retained references at common intake", async () => {
    const f = await fixture();
    const forged = structuredClone(f.bound);
    forged.recipe_provenance!.applicability.evidence_digest = taskCentricDigest(true);
    expect(parseTaskPlanProposal(forged)).toEqual(forged);
    await expect(prepareSuppliedPlan(command(f.root), "task-1", forged)).rejects.toThrow(
      "observation changed",
    );
    const changedPin = structuredClone(f.bound);
    changedPin.recipe_provenance!.closure.artifact_digest = taskCentricDigest("latest");
    await expect(prepareSuppliedPlan(command(f.root), "task-1", changedPin)).rejects.toThrow();
    await expect(
      bindRecipePlanProvenance({
        gitRoot: f.root,
        proposal: f.current,
        reference: f.reference,
        bindings: [],
        applicability: structuredClone(f.applicability),
      }),
    ).rejects.toThrow("Unissued");
    await rm(path.join(f.root, "src"), { recursive: true });
    await expect(prepareSuppliedPlan(command(f.root), "task-1", f.bound)).rejects.toThrow(
      "mismatch",
    );
  });

  it("never resolves installed latest instead of approved retained bytes", async () => {
    const f = await fixture();
    await writeFile(path.join(f.recipe, "agent.md"), "Latest guidance");
    await rm(path.join(f.recipe, "manifest.json"));
    const retained = await readBoundRecipePlanClosure({
      gitRoot: f.root,
      proposal: jsonRoundtrip(f.bound),
    });
    expect(Buffer.from(retained.readFile("recipe", "agent.md")).toString()).toBe(
      "Pinned old guidance",
    );
    await rm(path.join(f.root, f.reference.artifact.path));
    await expect(
      readBoundRecipePlanClosure({ gitRoot: f.root, proposal: f.bound }),
    ).rejects.toThrow();
  });

  it("retains historical closure v1 exact digest semantics but requires explicit recompilation for binding", async () => {
    const f = await fixture();
    const envelope = JSON.parse(
      await readFile(path.join(f.root, f.reference.artifact.path), "utf8"),
    ) as { closure: Record<string, unknown>; objects: unknown[] };
    delete envelope.closure.plan_semantics_digest;
    envelope.closure.schema_version = 1;
    envelope.closure.plan_digest = taskCentricDigest(f.proposal);
    const { digest: _old, ...body } = envelope.closure;
    const closureDigest = taskCentricDigest(body);
    envelope.closure.digest = closureDigest;
    const artifact = await putEvaluatorEvidenceObject({
      gitRoot: f.root,
      taskQualityRoot: f.quality,
      logicalName: `recipe-closure:${closureDigest}`,
      kind: "recipe_closure",
      extension: ".json",
      mediaType: "application/vnd.agentplane.recipe-closure+json",
      contents: JSON.stringify(envelope),
    });
    await git(f.root, ["add", "-f", artifact.path]);
    await git(f.root, ["commit", "-m", "historical fixture"]);
    const reference = { ...f.reference, artifact, closure_digest: closureDigest };
    const historical = await readRetainedRecipeClosure({
      gitRoot: f.root,
      reference,
      expectedClosureDigest: reference.closure_digest,
    });
    expect(historical.closure).toMatchObject({
      schema_version: 1,
      plan_digest: taskCentricDigest(f.proposal),
    });
    await expect(
      bindRecipePlanProvenance({
        gitRoot: f.root,
        proposal: f.current,
        reference,
        bindings: [],
        applicability: f.applicability,
      }),
    ).rejects.toThrow("explicit recompilation");
  });

  it("report-only results cannot replace provenance or Plan semantics", async () => {
    const f = await fixture();
    const { plan } = nativePlan(f.bound);
    const digest = taskCentricDigest(f.bound);
    const result = {
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: "issued",
      status: "completed",
      summary: "Report A",
      findings: [],
      uncertainty: [],
      canonical_binding: {
        task_id: "task-1",
        repository_identity: digest,
        repository_fingerprint: digest,
        phase: "implementation",
        plan_revision: 1,
        plan_digest: plan.digest,
        work_item_id: "repair",
        attempt: 1,
        claim_id: "claim",
        contract_digest: plan.work_items[0]!.contract_digest,
        authority_digest: digest,
      },
      canonical_outputs: [{ id: "patch", kind: "report", digest }],
    };
    const first = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(result);
    const second = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse({
      ...result,
      summary: "Report B",
      findings: ["More context"],
    });
    expect(second.canonical_binding).toEqual(first.canonical_binding);
    expect(nativePlan(f.bound).plan.digest).toBe(plan.digest);
    expect(() =>
      AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse({ ...result, task_plan_proposal: f.bound }),
    ).toThrow();
    expect(() =>
      AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse({
        ...result,
        recipe_provenance: f.bound.recipe_provenance,
      }),
    ).toThrow();
    const { canonical_binding: _binding, canonical_outputs: _outputs, ...legacyResult } = result;
    expect(() =>
      AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse({ ...legacyResult, task_plan_proposal: f.bound }),
    ).toThrow("native intake");
  });

  it("rejects unsupported provenance versions, mutable compiler identity and noncanonical parameters", async () => {
    const f = await fixture();
    for (const change of [
      { schema_version: 2 },
      { compiler: { id: "installed-latest", version: 1 } },
      {
        parameters: [
          { name: "target", value: "src" },
          { name: "count", value: 1 },
        ],
      },
      {
        parameters: [
          { name: "count", value: 1 },
          { name: "count", value: 1 },
        ],
      },
    ]) {
      expect(() =>
        parseTaskPlanProposal({
          ...f.bound,
          recipe_provenance: { ...f.bound.recipe_provenance, ...change },
        }),
      ).toThrow();
    }
  });

  it("preserves ordinary full proposal serialization and native identity", async () => {
    const f = await fixture();
    expect(parseTaskPlanProposal(f.current)).toEqual(f.current);
    expect(f.current).not.toHaveProperty("recipe_provenance");
    expect(nativePlan(parseTaskPlanProposal(jsonRoundtrip(f.current)))).toEqual(
      nativePlan(f.current),
    );
    await expect(
      bindRecipePlanProvenance({
        gitRoot: f.root,
        proposal: f.bound,
        reference: f.reference,
        bindings: [],
        applicability: f.applicability,
      }),
    ).rejects.toThrow("already bound");
  });
});
