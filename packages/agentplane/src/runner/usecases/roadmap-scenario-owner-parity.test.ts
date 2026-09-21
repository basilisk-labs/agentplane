import { readFile } from "node:fs/promises";
import path from "node:path";

import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { advanceCanonicalTask } from "../../commands/task/kernel-advance.js";
import { createKernelRuntime } from "../../commands/task/kernel-runtime-context.js";
import { runTaskNewParsed } from "../../commands/task/new.js";
import { runCliSilent } from "@agentplane/testkit";
import {
  createRecipeArchive,
  installRecipesCommandHarness,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "@agentplane/testkit/recipes";
import { describe, expect, it } from "vitest";

import { materializeRecipeScenarioTask } from "./scenario-materialize-task.js";

installRecipesCommandHarness();

describe("LC-17 Recipe V1 owner parity", { timeout: 120_000 }, () => {
  it("materializes Recipe and ordinary tasks under one Kernel owner without template authority", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const materializerSource = await readFile(
      new URL("scenario-materialize-task.ts", import.meta.url),
      "utf8",
    );
    expect(materializerSource).not.toContain("scenario.steps");
    const { archivePath, manifest } = await createRecipeArchive();
    expect(await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root])).toBe(
      0,
    );
    expect(
      await runCliSilent([
        "recipes",
        "add",
        `${String(manifest.id)}@${String(manifest.version)}`,
        "--root",
        root,
      ]),
    ).toBe(0);

    const command = await loadCommandContext({ cwd: root, rootOverride: root });
    const recipe = await materializeRecipeScenarioTask({
      ctx: command,
      cwd: root,
      rootOverride: root,
      recipe_id: String(manifest.id),
      scenario_id: "RECIPE_SCENARIO",
      run_id: "recipe-owner-parity",
    });
    const ordinary = await runTaskNewParsed({
      ctx: command,
      cwd: root,
      rootOverride: root,
      printTaskId: false,
      parsed: {
        title: "Ordinary owner parity",
        description: "Use the same Kernel owner without Recipe provenance.",
        owner: "CODER",
        priority: "med",
        tags: ["code"],
        route: "auto",
        dependsOn: [],
        verify: [],
        allowDuplicate: false,
      },
    });

    expect(recipe.task.extensions).toHaveProperty(TASK_KERNEL_EXTENSION);
    expect(recipe.task.origin).toEqual({
      system: "recipe",
      recipe_id: String(manifest.id),
      scenario_id: "RECIPE_SCENARIO",
      recipe_version: String(manifest.version),
      run_id: "recipe-owner-parity",
    });
    const recipeRuntime = await createKernelRuntime({
      command,
      task_id: recipe.task_id,
      transport: "host",
      operation_id: "inspect-recipe-owner",
    });
    const ordinaryRuntime = await createKernelRuntime({
      command,
      task_id: ordinary.task_id,
      transport: "host",
      operation_id: "inspect-ordinary-owner",
    });
    const recipeRecord = await recipeRuntime.adapter.read(recipe.task_id);
    const ordinaryRecord = await ordinaryRuntime.adapter.read(ordinary.task_id);
    expect(recipeRecord.kind).toBe("canonical");
    expect(ordinaryRecord.kind).toBe("canonical");
    if (recipeRecord.kind !== "canonical" || ordinaryRecord.kind !== "canonical") {
      throw new Error("Kernel owner readback unavailable");
    }
    expect(recipeRecord.record.aggregate).toMatchObject({
      state: "PLANNING",
      current_plan: null,
    });
    expect(ordinaryRecord.record.aggregate).toMatchObject({
      state: "PLANNING",
      current_plan: null,
    });

    const recipePacket = await advanceCanonicalTask({
      command,
      task_id: recipe.task_id,
      transport: "host",
    });
    const ordinaryPacket = await advanceCanonicalTask({
      command,
      task_id: ordinary.task_id,
      transport: "host",
    });
    expect(recipePacket).toMatchObject({
      action: { kind: "agent_episode" },
      authority: { role: "PLANNER", mutation: "read_only" },
      exchange: { work_order_ref: "work-order.json", result_ref: "result.json" },
    });
    expect(ordinaryPacket).toMatchObject({
      action: { kind: "agent_episode" },
      authority: { role: "PLANNER", mutation: "read_only" },
      exchange: { work_order_ref: "work-order.json", result_ref: "result.json" },
    });
    if (!("exchange" in recipePacket)) throw new Error("Recipe PLANNER exchange missing");
    const recipeOrder = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
      JSON.parse(
        await readFile(path.join(recipePacket.exchange.directory, "work-order.json"), "utf8"),
      ),
    );
    expect(recipeOrder.authority).toMatchObject({ mutation_scope: "none", writable_roots: [] });
    expect(recipe.scenario.steps).not.toHaveLength(0);
    expect(recipe.recipe_context.run_profile).toMatchObject({ sandbox: "workspace-write" });
  });
});
