import { mkdir, readdir, writeFile, rm } from "node:fs/promises";
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
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import { parseScenarioV2 } from "@agentplaneorg/recipes";
import { resolveExplicitRecipeScenarioSelection } from "./impl/explicit-selection.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { runTaskNewParsed } from "../task/new.js";
import { materializeRecipeScenarioTask } from "../../runner/usecases/scenario-materialize-task.js";
import { setCanonicalPlan } from "../task/kernel-plan.js";

installRunCliIntegrationHarness();
async function fixture() {
  const root = await mkGitRepoRootWithBranch("main");
  await configureGitUser(root);
  await writeConfig(root, defaultConfig());
  await writeFile(path.join(root, "source.txt"), "source\n");
  await commitAll(root, "seed explicit selection");
  const command = await loadCommandContext({ cwd: root, rootOverride: root });
  const created = await runTaskNewParsed({
    ctx: command,
    cwd: root,
    rootOverride: root,
    printTaskId: false,
    parsed: {
      title: "Explicit Recipe selection",
      description: "Produce a report",
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
  const recipe = path.join(root, ".agentplane/recipes/packages/demo");
  await mkdir(recipe, { recursive: true });
  const scenario = parseScenarioV2({
    schema_version: "2",
    id: "report",
    goal: "Report {{audience}}",
    parameters: [{ name: "audience", type: "string", required: true }],
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
          objective: "Report for {{audience}}",
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
    compatibility: {
      manifest_api_version: "2",
      scenario_api_version: "2",
      runtime_api_version: "1",
    },
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
        permissions: ["provider.write"],
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
  const registry = {
    schema_version: 1,
    updated_at: "2026-10-05T00:00:00Z",
    recipes: [
      {
        id: "demo",
        version: "1.0.0",
        path: "packages/demo",
        active: true,
        materialization: "copy",
        source_ref: "fixture",
        source_sha256: "a".repeat(64),
        vendored_sha256: "b".repeat(64),
        installed_at: "2026-10-05T00:00:00Z",
        tags: [],
      },
    ],
  };
  const save = async () => {
    await writeFile(path.join(recipe, "manifest.json"), JSON.stringify(manifest));
    await writeFile(path.join(recipe, "scenario.json"), JSON.stringify(scenario));
    await writeFile(path.join(root, ".agentplane/recipes/registry.json"), JSON.stringify(registry));
  };
  await save();
  await writeFile(path.join(recipe, "agent.md"), "Guidance is not approval.");
  const selection = {
    recipe_id: "demo",
    recipe_version: "1.0.0",
    scenario_id: "report",
    scenario_api_version: "2" as const,
  };
  const bindings = [{ name: "audience", value: "operators" }];
  const select = (changes = {}) =>
    resolveExplicitRecipeScenarioSelection({
      project: command.resolvedProject,
      selection: { ...selection, ...changes },
    });
  const prepare = (values = bindings) =>
    materializeRecipeScenarioTask({
      ctx: command,
      cwd: root,
      mode: "instantiate",
      task_id: id,
      selection,
      bindings: values,
    });
  return {
    root,
    recipe,
    command,
    id,
    selection,
    bindings,
    scenario,
    manifest,
    registry,
    save,
    select,
    prepare,
  };
}

describe("exact installed Recipe selection", { timeout: 180_000 }, () => {
  it("prepares one exact pin with zero selector episodes and instantiates it through common intake", async () => {
    const f = await fixture();
    const before = await f.command.taskBackend.getTask(f.id);
    const selected = await f.prepare();
    expect(selected.kind).toBe("retention_required");
    expect(await f.command.taskBackend.getTask(f.id)).toEqual(before);
    await expect(
      readdir(path.join(f.root, ".git/agentplane/kernel/exchanges", f.id)),
    ).rejects.toMatchObject({ code: "ENOENT" });
    if (selected.kind !== "retention_required") throw new Error("Missing pin");
    expect(selected.selection).toEqual(f.selection);
    const gitOpts = {
      cwd: f.root,
      env: { ...gitEnv(), GIT_ALLOW_PROTOCOL: "file", GIT_TERMINAL_PROMPT: "0" },
      timeout: 30_000,
    };
    await execFileAsync(
      "git",
      ["-c", "core.hooksPath=/dev/null", "add", "-f", selected.reference.artifact.path],
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
        "retain explicit selection",
      ],
      gitOpts,
    );
    await rm(f.recipe, { recursive: true });
    const compiled = await materializeRecipeScenarioTask({
      ctx: f.command,
      cwd: f.root,
      mode: "instantiate",
      task_id: f.id,
      reference: selected.reference,
      bindings: selected.bindings,
    });
    expect(compiled.kind).toBe("compiled");
    if (compiled.kind !== "compiled") throw new Error("Compilation blocked");
    await setCanonicalPlan(f.command, f.id, compiled.proposal);
    const task = await f.command.taskBackend.getTask(f.id);
    const record = task!.extensions!.task_kernel as {
      aggregate: { current_plan: { state: string }; authority_lineage?: unknown[] };
      events: { kind: string }[];
    };
    expect(record.aggregate.current_plan.state).toBe("PROPOSED");
    expect(record.aggregate.authority_lineage ?? []).toEqual([]);
    expect(record.events.map((event) => event.kind)).toEqual(["intent_captured", "plan_proposed"]);
  });
  it("does not choose a nearest recipe, version or scenario", async () => {
    const f = await fixture();
    await expect(f.select({ recipe_id: "dem" })).rejects.toMatchObject({ code: "not_installed" });
    await expect(f.select({ recipe_version: "1.0.1" })).rejects.toMatchObject({
      code: "not_installed",
    });
    await expect(f.select({ recipe_version: "^1.0.0" })).rejects.toMatchObject({
      code: "not_installed",
    });
    await expect(f.select({ scenario_id: "reports" })).rejects.toMatchObject({
      code: "scenario_not_found",
    });
  });
  it("makes omitted and duplicate installed versions visible instead of choosing latest", async () => {
    const f = await fixture();
    const unique = await f.select({ recipe_version: undefined });
    expect(unique.selection.recipe_version).toBe("1.0.0");
    f.registry.recipes.push({
      ...f.registry.recipes[0]!,
      version: "2.0.0",
      path: "packages/newer",
    });
    await f.save();
    await expect(f.select({ recipe_version: undefined })).rejects.toMatchObject({
      code: "ambiguous_version",
    });
    await expect(f.select()).resolves.toMatchObject({ selection: f.selection });
    f.registry.recipes.push({ ...f.registry.recipes[0]! });
    await f.save();
    await expect(f.select()).rejects.toMatchObject({ code: "ambiguous_version" });
  });
  it("returns precise parameter and native-fact needs without a selector or guessed values", async () => {
    const f = await fixture();
    await expect(f.prepare([])).resolves.toMatchObject({
      kind: "needs_evidence",
      evidence_needs: [{ kind: "parameter", name: "audience" }],
    });
    f.scenario.applicability.required = [
      { kind: "observed_value_equals", key: "unknown.fact", value: true },
    ];
    await f.save();
    await expect(f.prepare()).resolves.toMatchObject({
      kind: "needs_evidence",
      evidence_needs: [
        {
          predicate_ref: "required:0",
          kind: "observed_value_equals",
          source_ref: "unknown.fact",
          reason: "value_observer_missing",
        },
      ],
    });
    f.scenario.applicability.required = [{ kind: "path_exists", path: "absent" }];
    await f.save();
    await expect(f.prepare()).resolves.toMatchObject({ kind: "mismatch" });
  });
  it("rejects unknown scenario API even when the manifest claims supported compatibility", async () => {
    const f = await fixture();
    await writeFile(
      path.join(f.recipe, "scenario.json"),
      JSON.stringify({ ...f.scenario, schema_version: "99" }),
    );
    await expect(f.select()).rejects.toThrow("Unsupported scenario API version");
    await writeFile(
      path.join(f.recipe, "manifest.json"),
      JSON.stringify({ ...f.manifest, schema_version: "99" }),
    );
    await expect(f.select()).rejects.toThrow("manifest.schema_version");
  });
  it("reports compatibility failures without includeIncompatible bypass", async () => {
    const f = await fixture();
    f.manifest.compatibility.runtime_api_version = "99";
    await f.save();
    await expect(f.select()).rejects.toMatchObject({
      code: "incompatible",
      facts: [expect.stringContaining("runtime_api_version")],
    });
    await expect(f.select({ includeIncompatible: true })).rejects.toThrow();
  });
  it("rejects registry and selected source paths that escape containment", async () => {
    const f = await fixture();
    f.registry.recipes[0]!.path = "../../outside";
    await f.save();
    await expect(f.select()).rejects.toMatchObject({ code: "unsafe_installed_path" });
    f.registry.recipes[0]!.path = "packages/demo";
    f.manifest.scenarios[0]!.file = "../../source.txt";
    await f.save();
    await expect(f.select()).rejects.toThrow();
  });
});
