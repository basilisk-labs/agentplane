import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { resolveProject } from "@agentplaneorg/core";

import {
  buildRecipeResolverContext,
  listResolvedRecipeScenarios,
  resolveRecipeScenarioSelection,
} from "./recipes.js";
import {
  baseRecipeEntry,
  baseRecipeManifest,
  captureStdIO,
  installRecipe,
  installRecipesCommandHarness,
  mkGitRepoRoot,
  resolveProjectRecipeDir,
  runScenarioTest,
  scenarioDescriptor,
  writeDefaultConfig,
  writeInstalledRecipes,
} from "./recipes.test-helpers.js";

installRecipesCommandHarness();

describe("commands/recipes scenario", () => {
  it("scenario list and info read installed recipe scenarios", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    const ioList = captureStdIO();
    try {
      const code = await runScenarioTest({
        cwd: projectDir,
        args: [],
        command: "list",
      });
      expect(code).toBe(0);
      expect(ioList.stdout).toContain("viewer:RECIPE_SCENARIO");
    } finally {
      ioList.restore();
    }

    const ioInfo = captureStdIO();
    try {
      const code = await runScenarioTest({
        cwd: projectDir,
        args: ["viewer:RECIPE_SCENARIO"],
        command: "info",
      });
      expect(code).toBe(0);
      expect(ioInfo.stdout).toContain("Scenario:");
      expect(ioInfo.stdout).toContain("Use when:");
      expect(ioInfo.stdout).toContain("Run profile:");
      expect(ioInfo.stdout).toContain("Compatibility: satisfied");
    } finally {
      ioInfo.restore();
    }
  });

  it("builds deterministic resolver context and normalized run profiles", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeFile(
      path.join(projectDir, "package.json"),
      JSON.stringify({ name: "resolver-fixture", private: true }, null, 2),
      "utf8",
    );
    await writeInstalledRecipes(projectDir, [baseRecipeEntry()]);
    const project = await resolveProject({ cwd: projectDir, rootOverride: projectDir });

    const context = await buildRecipeResolverContext({ project });
    const resolvedScenarios = await listResolvedRecipeScenarios({ project });

    expect(context).toMatchObject({
      manifest_api_version: "1",
      scenario_api_version: "1",
      runtime_api_version: "1",
      repo_types: ["generic", "node"],
    });
    expect(resolvedScenarios).toHaveLength(1);
    expect(resolvedScenarios[0]).toMatchObject({
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      compatibility: { ok: true },
      run_profile: {
        mode: "analysis",
        network: false,
        requires_human_approval: false,
        permissions: [],
        agents_involved: ["RECIPE_AGENT"],
        skills_used: ["RECIPE_SKILL"],
        tools_used: ["RECIPE_TOOL"],
        required_inputs: [],
        outputs: [],
        artifacts: [],
        writes_artifacts_to: [],
      },
    });
    expect(resolvedScenarios[0].compatibility.reasons).toEqual(
      expect.arrayContaining([
        expect.stringContaining("agentplane"),
        "manifest_api_version=1",
        "scenario_api_version=1",
        "runtime_api_version=1",
      ]),
    );
  });

  it("selects a single scenario with explicit resolver reasons", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [
      baseRecipeEntry({
        manifest: baseRecipeManifest({
          scenarios: [
            scenarioDescriptor({
              required_inputs: ["task_id"],
              permissions: ["network"],
              run_profile: {
                mode: "analysis",
                sandbox: "read-only",
              },
            }),
          ],
        }),
      }),
    ]);
    const project = await resolveProject({ cwd: projectDir, rootOverride: projectDir });

    const selection = await resolveRecipeScenarioSelection({
      project,
      flags: {
        recipeId: "viewer",
        scenarioId: "RECIPE_SCENARIO",
        tags: ["docs"],
        mode: "analysis",
        available_inputs: ["task_id"],
      },
    });

    expect(selection.run_profile).toMatchObject({
      mode: "analysis",
      sandbox: "read-only",
      network: true,
      required_inputs: ["task_id"],
      permissions: ["network"],
    });
    expect(selection.selection_reasons).toEqual(
      expect.arrayContaining([
        "recipe compatibility satisfied",
        "matches requested recipe: viewer",
        "matches requested scenario: RECIPE_SCENARIO",
        "matches required tags: docs",
        "matches requested mode: analysis",
        "required inputs satisfied: task_id",
      ]),
    );
  });

  it("rejects ambiguous resolver selection instead of guessing", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [
      baseRecipeEntry({
        manifest: baseRecipeManifest({
          scenarios: [
            scenarioDescriptor({
              id: "alpha",
              name: "Alpha Scenario",
              file: "scenarios/alpha.json",
            }),
            scenarioDescriptor({
              id: "beta",
              name: "Beta Scenario",
              file: "scenarios/beta.json",
            }),
          ],
        }),
      }),
    ]);
    const project = await resolveProject({ cwd: projectDir, rootOverride: projectDir });

    await expect(
      resolveRecipeScenarioSelection({
        project,
        flags: { recipeId: "viewer" },
      }),
    ).rejects.toThrow("Scenario selection is ambiguous: viewer:alpha, viewer:beta");
  });

  it("scenario commands validate usage and run scenarios", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    await expect(
      runScenarioTest({ cwd: projectDir, args: [], command: undefined }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["extra"], command: "list" }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      runScenarioTest({ cwd: projectDir, args: [], command: "info" }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["viewer"], command: "info" }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      runScenarioTest({ cwd: projectDir, args: [], command: "run" }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    const ioRun = captureStdIO();
    try {
      const code = await runScenarioTest({
        cwd: projectDir,
        args: ["viewer:RECIPE_SCENARIO"],
        command: "run",
      });
      expect(code).toBe(0);
    } finally {
      ioRun.restore();
    }
  });

  it("scenario run rejects missing recipes and scenarios", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["missing:scenario"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_IO" });

    await installRecipe({ projectDir });

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["viewer"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["viewer:UNKNOWN"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_IO" });

    const scenarioPath = path.join(
      resolveProjectRecipeDir(projectDir, "viewer"),
      "scenarios",
      "recipe-scenario.json",
    );
    await rm(scenarioPath, { force: true });

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["viewer:RECIPE_SCENARIO"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });

  it("scenario list prints empty state when no recipes are installed", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);

    const io = captureStdIO();
    try {
      const code = await runScenarioTest({ cwd: projectDir, args: [], command: "list" });
      expect(code).toBe(0);
      expect(io.stdout).toContain("No scenarios found");
    } finally {
      io.restore();
    }
  });

  it("scenario info remains manifest-driven when definition is missing", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [
      baseRecipeEntry({
        manifest: baseRecipeManifest({
          scenarios: [
            scenarioDescriptor({
              id: "beta",
              name: "Beta Scenario",
              summary: "Beta scenario",
              file: "scenarios/beta.json",
            }),
          ],
        }),
      }),
    ]);

    const io = captureStdIO();
    try {
      const code = await runScenarioTest({
        cwd: projectDir,
        args: ["viewer:beta"],
        command: "info",
      });
      expect(code).toBe(0);
      expect(io.stdout).toContain("Summary: Beta scenario");
      expect(io.stdout).toContain("Run profile:");
      expect(io.stdout).toContain("Use when:");
      expect(io.stdout).toContain("Scenario file:");
      expect(io.stdout).not.toContain("Steps:");
    } finally {
      io.restore();
    }
  });

  it("scenario run prints a prepared run plan without writing artifacts", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    const io = captureStdIO();
    try {
      const code = await runScenarioTest({
        cwd: projectDir,
        args: ["viewer:RECIPE_SCENARIO"],
        command: "run",
      });
      expect(code).toBe(0);
      expect(io.stdout).toContain("Prepared run plan: viewer:RECIPE_SCENARIO");
      expect(io.stdout).toContain("Selection reasons:");
      expect(io.stdout).toContain("Status: scenario orchestration runtime is not implemented yet.");
    } finally {
      io.restore();
    }

    await expect(
      readdir(path.join(projectDir, ".agentplane", "recipes", "viewer", "runs")),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("scenario run rejects incompatible runtime context", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    const manifestPath = path.join(resolveProjectRecipeDir(projectDir, "viewer"), "manifest.json");
    const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as Record<string, unknown>;
    ((manifest.compatibility as Record<string, unknown>).platforms as unknown[]) = ["win32"];
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["viewer:RECIPE_SCENARIO"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
  });

  it("scenario run validates recipe-local file references", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    await rm(path.join(resolveProjectRecipeDir(projectDir, "viewer"), "agents", "recipe.json"), {
      force: true,
    });
    await expect(
      runScenarioTest({ cwd: projectDir, args: ["viewer:RECIPE_SCENARIO"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });

  it("scenario run validates scenario definition schema", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    const scenarioPath = path.join(
      resolveProjectRecipeDir(projectDir, "viewer"),
      "scenarios",
      "recipe-scenario.json",
    );
    const scenario = JSON.parse(await readFile(scenarioPath, "utf8")) as Record<string, unknown>;
    delete scenario.goal;
    await writeFile(scenarioPath, JSON.stringify(scenario, null, 2), "utf8");

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["viewer:RECIPE_SCENARIO"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
  });

  it("lists scenarios from manifest descriptors with matching definition files", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [
      baseRecipeEntry({
        manifest: baseRecipeManifest({
          scenarios: [
            scenarioDescriptor({
              id: "alpha",
              name: "Alpha Scenario",
              summary: "Alpha scenario",
              file: "scenarios/alpha.json",
            }),
          ],
        }),
      }),
    ]);

    const recipeDir = path.join(resolveProjectRecipeDir(projectDir, "viewer"), "scenarios");
    await mkdir(recipeDir, { recursive: true });
    await writeFile(
      path.join(recipeDir, "alpha.json"),
      JSON.stringify(
        {
          schema_version: "1",
          id: "alpha",
          goal: "Do the thing",
          inputs: [],
          outputs: [],
          steps: [],
          summary: "Alpha scenario",
        },
        null,
        2,
      ),
      "utf8",
    );

    const io = captureStdIO();

    await expect(
      runScenarioTest({
        cwd: projectDir,
        args: [],
        command: "list",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("viewer:alpha");
  });

  it("lists scenarios from manifest descriptors without definition files", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [
      baseRecipeEntry({
        manifest: baseRecipeManifest({
          scenarios: [
            scenarioDescriptor({
              id: "beta",
              name: "Beta Scenario",
              summary: "Beta scenario",
              file: "scenarios/beta.json",
            }),
          ],
        }),
      }),
    ]);

    const io = captureStdIO();

    await expect(
      runScenarioTest({
        cwd: projectDir,
        args: [],
        command: "list",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("viewer:beta");
  });

  it("rejects missing scenario subcommand", async () => {
    await expect(
      runScenarioTest({
        cwd: process.cwd(),
        args: [],
        command: undefined,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects scenario list with extra args", async () => {
    await expect(
      runScenarioTest({
        cwd: process.cwd(),
        args: ["extra"],
        command: "list",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });
});
