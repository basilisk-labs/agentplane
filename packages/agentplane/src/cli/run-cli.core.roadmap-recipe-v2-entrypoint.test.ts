import { mkdir, readdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  mkGitRepoRootWithBranch,
  configureGitUser,
  commitAll,
  writeConfig,
  installRunCliIntegrationHarness,
  runCliSilent,
} from "@agentplane/testkit";
import { defaultConfig } from "@agentplaneorg/core/config";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { parseScenarioV2 } from "@agentplaneorg/recipes";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import { runJson } from "./task-create-planner-intent.testkit.js";
import { readSuppliedCliOrder } from "./supplied-plan.testkit.js";

installRunCliIntegrationHarness();
async function fixture() {
  const root = await mkGitRepoRootWithBranch("main");
  await configureGitUser(root);
  await writeConfig(root, defaultConfig());
  await writeFile(path.join(root, "source.txt"), "source\n");
  await writeFile(path.join(root, ".gitignore"), ".agentplane/recipes/\n.agentplane/tasks/\n");
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
  const input = { schema_version: 1, kind: "selected_recipe", selection, bindings };
  const file = path.join(root, "selection.json");
  await writeFile(file, JSON.stringify(input));
  await commitAll(root, "seed installed V2 CLI input");
  const command = await loadCommandContext({ cwd: root, rootOverride: root });
  const create = () =>
    runJson(root, [
      "task",
      "create",
      "Produce a Recipe report",
      "--task-kind",
      "analysis",
      "--mutation-scope",
      "none",
      "--recipe-file",
      file,
      "--json",
    ]);
  const record = async (id: string) =>
    (await command.taskBackend.getTask(id))!.extensions!.task_kernel as {
      aggregate: {
        state: string;
        current_plan: { state: string; digest: string } | null;
        authority_lineage?: unknown[];
        work_items: Record<string, { state: string }>;
      };
      events: { kind: string }[];
    };
  return { root, recipe, file, input, command, create, record };
}
async function saveContinuation(root: string, created: Record<string, unknown>) {
  const id = String(created.task_id);
  const file = path.join(root, ".agentplane/tasks", id, "recipe-input.json");
  await writeFile(file, JSON.stringify(created.recipe_input));
  return file;
}
async function commitRetention(root: string, created: Record<string, unknown>) {
  const input = created.recipe_input as { reference: { artifact: { path: string } } };
  const opts = {
    cwd: root,
    env: { ...gitEnv(), GIT_ALLOW_PROTOCOL: "file", GIT_TERMINAL_PROMPT: "0" },
    timeout: 30_000,
  };
  await execFileAsync(
    "git",
    ["-c", "core.hooksPath=/dev/null", "add", "-f", input.reference.artifact.path],
    opts,
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
      "retain exact Recipe closure",
    ],
    opts,
  );
}

describe("public V2 native task entrypoint", { timeout: 180_000 }, () => {
  it("previews without effects and retains through creation without Plan or USER authority", async () => {
    const f = await fixture();
    const before = await readdir(f.root, { recursive: true });
    const preview = await runJson(f.root, ["recipes", "preview-v2", f.file]);
    expect(preview).toMatchObject({
      kind: "preview_only",
      selection: f.input.selection,
      scenario: { goal: "Report operators" },
    });
    const after = await readdir(f.root, { recursive: true });
    expect(after.toSorted()).toEqual(before.toSorted());
    const created = await f.create();
    expect(created).toMatchObject({
      status: "retention_required",
      required_role: null,
      recipe_input: { task_id: created.task_id, kind: "retained_recipe" },
    });
    const id = String(created.task_id);
    const record = await f.record(id);
    expect(record.aggregate).toMatchObject({ state: "PLANNING", current_plan: null });
    expect(record.aggregate.authority_lineage ?? []).toEqual([]);
    expect(record.events.map((event) => event.kind)).toEqual(["intent_captured"]);
    await expect(
      readdir(path.join(f.root, ".git/agentplane/kernel/exchanges", id)),
    ).rejects.toMatchObject({ code: "ENOENT" });
    const file = await saveContinuation(f.root, created);
    const blocked = await runJson(f.root, ["task", "plan", "set", id, "--recipe-file", file]);
    expect(blocked).toMatchObject({
      status: "needs_evidence",
      prepared: {
        evidence_needs: [
          { kind: "retained_closure", reason: "committed_retained_closure_unavailable_or_invalid" },
        ],
      },
    });
    expect(await f.record(id)).toEqual(record);
    await commitRetention(f.root, created);
    const retainedInput = created.recipe_input as { reference: { artifact: { path: string } } };
    await writeFile(path.join(f.root, retainedInput.reference.artifact.path), "tampered");
    const tampered = await runJson(f.root, ["task", "plan", "set", id, "--recipe-file", file]);
    expect(tampered.status).toBe("needs_evidence");
    expect(await f.record(id)).toEqual(record);
    expect(
      await runCliSilent([
        "recipes",
        "scenario",
        "execute",
        "demo:report",
        "--by",
        "USER",
        "--root",
        f.root,
      ]),
    ).not.toBe(0);
    expect(await f.record(id)).toEqual(record);
  });

  it("proposes committed old bytes through public CLI and preserves approval, replay and independent review", async () => {
    const f = await fixture();
    const created = await f.create();
    const id = String(created.task_id);
    const file = await saveContinuation(f.root, created);
    await commitRetention(f.root, created);
    await rm(f.recipe, { recursive: true });
    const proposed = await runJson(f.root, ["task", "plan", "set", id, "--recipe-file", file]);
    expect(proposed.status).toBe("advance_required");
    const firstRecord = await f.record(id);
    expect(firstRecord.aggregate.current_plan?.state).toBe("PROPOSED");
    expect(firstRecord.aggregate.authority_lineage ?? []).toEqual([]);
    const repeated = await runJson(f.root, ["task", "plan", "set", id, "--recipe-file", file]);
    expect(repeated.plan_digest).toBe(proposed.plan_digest);
    expect(await f.record(id)).toEqual(firstRecord);
    const pending = await runJson(f.root, ["task", "advance", id, "--agent-json"]);
    expect(pending.action).toMatchObject({ kind: "approval_required" });
    expect(pending).not.toHaveProperty("exchange");
    expect(
      await runCliSilent(["task", "plan", "approve", id, "--by", "USER", "--root", f.root]),
    ).toBe(0);
    const first = await runJson(f.root, ["task", "advance", id, "--agent-json"]);
    const { order, exchange } = await readSuppliedCliOrder(first);
    expect(order.role).toBe("EXECUTOR");
    expect(order.task.objective).toBe("Report for operators");
    expect(order.authority).toMatchObject({
      mutation_scope: "code",
      writable_roots: [],
      network: "deny",
      external_side_effects: [],
    });
    expect(
      order.recipe_context!.projection.guidance.some((entry) =>
        entry.content.includes("Guidance is not approval."),
      ),
    ).toBe(true);
    expect(order.recipe_context!.digest).toBe(k.kernelDigest(order.recipe_context!.projection));
    const replay = await readSuppliedCliOrder(
      await runJson(f.root, ["task", "advance", id, "--agent-json"]),
    );
    expect(replay.order.work_order_id).toBe(order.work_order_id);
    expect(replay.exchange.result_path).toBe(exchange.result_path);
    await writeFile(
      exchange.result_path,
      JSON.stringify({
        work_order_id: order.work_order_id,
        status: "completed",
        summary: "Produced report evidence",
        findings: [],
        uncertainty: [],
        canonical_outputs: [
          { id: "report-evidence", kind: "report", digest: k.kernelDigest("report") },
        ],
      }),
    );
    const review = await runJson(f.root, [
      "task",
      "advance",
      id,
      "--result",
      exchange.result_path,
      "--agent-json",
    ]);
    const evaluator = await readSuppliedCliOrder(review);
    expect(evaluator.order.role).toBe("EVALUATOR");
    expect(evaluator.order.authority.mutation_scope).toBe("none");
    expect(evaluator.order.required_inputs.some((input) => input.id === "native-validation")).toBe(
      true,
    );
    const inspecting = await f.record(id);
    expect(inspecting.aggregate.work_items.report?.state).not.toBe("COMPLETED");
  });

  it("rejects forged or cross-task input and recovers missing parameters on the same Task", async () => {
    const f = await fixture();
    await writeFile(
      f.file,
      JSON.stringify({
        ...f.input,
        selection: { ...f.input.selection, scenario_api_version: "1" },
      }),
    );
    expect(
      await runCliSilent([
        "task",
        "create",
        "Invalid",
        "--recipe-file",
        f.file,
        "--json",
        "--root",
        f.root,
      ]),
    ).not.toBe(0);
    await writeFile(f.file, JSON.stringify({ ...f.input, bindings: [] }));
    const created = await f.create();
    const id = String(created.task_id);
    expect(created.status).toBe("needs_evidence");
    const file = await saveContinuation(f.root, created);
    await writeFile(file, JSON.stringify({ ...f.input, task_id: id }));
    const prepared = await runJson(f.root, ["task", "plan", "set", id, "--recipe-file", file]);
    expect(prepared.status).toBe("retention_required");
    const input = prepared.recipe_input as Record<string, unknown>;
    await writeFile(file, JSON.stringify({ ...input, task_id: "202610051234-ABCDE" }));
    const before = await f.record(id);
    expect(
      await runCliSilent(["task", "plan", "set", id, "--recipe-file", file, "--root", f.root]),
    ).not.toBe(0);
    await writeFile(file, JSON.stringify({ ...input, approved_by: "USER" }));
    expect(
      await runCliSilent(["task", "plan", "set", id, "--recipe-file", file, "--root", f.root]),
    ).not.toBe(0);
    expect(await f.record(id)).toEqual(before);
  });
});
