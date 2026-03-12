import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { CliError } from "../shared/errors.js";
import {
  agentEntry,
  baseRecipeEntry,
  baseRecipeManifest,
  captureStdIO,
  createRecipeArchive,
  installRecipe,
  installRecipesCommandHarness,
  mkGitRepoRoot,
  resolveProjectRecipeDir,
  runRecipesTest,
  scenarioDescriptor,
  toolEntry,
  writeDefaultConfig,
  writeInstalledRecipes,
  writeSignedIndex,
} from "./recipes.test-helpers.js";

installRecipesCommandHarness();

describe("commands/recipes catalog/install", () => {
  it("rejects missing recipes subcommand", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: [],
        command: undefined,
      }),
    ).rejects.toBeInstanceOf(CliError);
  });

  it("rejects invalid recipes install usage", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: [],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects recipes install positional + flag mix", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["--name", "viewer", "extra"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects recipes install with multiple explicit flags", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["--name", "viewer", "--url", "https://example.test"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects recipes install with too many positional args", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["one", "two"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects recipes install with invalid conflict mode", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["--name", "viewer", "--on-conflict", "bad"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("installs a recipe from a local archive path", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    const { archivePath } = await createRecipeArchive();

    await expect(installRecipe({ projectDir, archivePath })).resolves.toBeUndefined();

    const manifestPath = path.join(resolveProjectRecipeDir(projectDir, "viewer"), "manifest.json");
    const installMetaPath = path.join(
      resolveProjectRecipeDir(projectDir, "viewer"),
      ".install.json",
    );
    expect(JSON.parse(await readFile(manifestPath, "utf8"))).toMatchObject({ id: "viewer" });
    expect(JSON.parse(await readFile(installMetaPath, "utf8"))).toMatchObject({
      id: "viewer",
      install_mode: "project-local",
    });
  });

  it("installs a recipe from a local directory path", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    const fixtureRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipe-dir-"));
    const recipeDir = path.join(fixtureRoot, "local-viewer");
    await mkdir(path.join(recipeDir, "agents"), { recursive: true });
    await mkdir(path.join(recipeDir, "skills"), { recursive: true });
    await mkdir(path.join(recipeDir, "scenarios"), { recursive: true });
    await mkdir(path.join(recipeDir, "tools"), { recursive: true });
    await writeFile(
      path.join(recipeDir, "manifest.json"),
      JSON.stringify(
        baseRecipeManifest({
          id: "local-viewer",
          version: "0.1.0",
          name: "Local Viewer",
          summary: "Local recipe fixture",
          description: "Local recipe fixture",
          tools: [
            toolEntry({
              id: "noop",
              summary: "No-op tool",
              runtime: "node",
              entrypoint: "tools/noop.mjs",
              permissions: ["fs.read"],
            }),
          ],
          agents: [agentEntry({ tools: ["noop"] })],
          scenarios: [
            scenarioDescriptor({
              id: "fixture",
              name: "Fixture Scenario",
              summary: "Fixture scenario",
              tools_used: ["noop"],
              file: "scenarios/fixture.json",
            }),
          ],
        }),
        null,
        2,
      ),
      "utf8",
    );
    await writeFile(
      path.join(recipeDir, "agents", "recipe.json"),
      JSON.stringify({ id: "RECIPE_AGENT", role: "Recipe agent" }, null, 2),
      "utf8",
    );
    await writeFile(
      path.join(recipeDir, "skills", "recipe.json"),
      JSON.stringify({ id: "RECIPE_SKILL", kind: "agent-skill" }, null, 2),
      "utf8",
    );
    await writeFile(
      path.join(recipeDir, "scenarios", "fixture.json"),
      JSON.stringify(
        {
          schema_version: "1",
          id: "fixture",
          goal: "Fixture goal",
          inputs: [],
          outputs: [],
          steps: [{ tool: "noop" }],
        },
        null,
        2,
      ),
      "utf8",
    );
    await writeFile(path.join(recipeDir, "tools", "noop.mjs"), "console.log('ok');\n", "utf8");

    const io = captureStdIO();
    try {
      await expect(
        runRecipesTest({
          cwd: projectDir,
          args: ["--path", recipeDir],
          command: "install",
        }),
      ).resolves.toBe(0);
    } finally {
      io.restore();
      await rm(fixtureRoot, { recursive: true, force: true });
    }

    expect(
      JSON.parse(
        await readFile(
          path.join(resolveProjectRecipeDir(projectDir, "local-viewer"), "manifest.json"),
          "utf8",
        ),
      ),
    ).toMatchObject({ id: "local-viewer" });
  });

  it("prints recipe info details", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir, tags: ["docs"] });

    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: ["viewer"],
        command: "info",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("Recipe: viewer@1.2.3");
    expect(io.stdout).toContain("Tags: docs");
    expect(io.stdout).toContain("Agents:");
    expect(io.stdout).toContain("Tools:");
  });

  it("prints recipe explain output", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: ["viewer"],
        command: "explain",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("Scenarios:");
    expect(io.stdout).toContain("Steps:");
  });

  it("recipe explain uses manifest scenarios when no scenario files exist", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [
      baseRecipeEntry({
        manifest: baseRecipeManifest({
          tags: [],
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
    const recipeDir = resolveProjectRecipeDir(projectDir, "viewer");
    await mkdir(recipeDir, { recursive: true });

    const io = captureStdIO();
    try {
      const code = await runRecipesTest({
        cwd: projectDir,
        args: ["viewer"],
        command: "explain",
      });
      expect(code).toBe(0);
      expect(io.stdout).toContain("Scenarios:");
      expect(io.stdout).toContain("alpha");
    } finally {
      io.restore();
    }
  });

  it("removes an installed recipe", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    const io = captureStdIO();
    try {
      await expect(
        runRecipesTest({
          cwd: projectDir,
          args: ["viewer"],
          command: "remove",
        }),
      ).resolves.toBe(0);
    } finally {
      io.restore();
    }

    await expect(
      readFile(path.join(resolveProjectRecipeDir(projectDir, "viewer"), "manifest.json")),
    ).rejects.toMatchObject({
      code: "ENOENT",
    });
  });

  it("rejects removing a missing recipe", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: ["missing"],
        command: "remove",
      }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });

  it("rejects install from index when recipe is missing", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    const indexPath = path.join(projectDir, "recipes-index.json");
    await writeSignedIndex(indexPath, { schema_version: 1, recipes: [] });

    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: ["--name", "missing", "--index", indexPath, "--refresh"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });

  it("rejects install when index checksum mismatches", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    const { archivePath } = await createRecipeArchive();
    const target = path.join(projectDir, "recipe.tar.gz");
    await writeFile(target, await readFile(archivePath));

    const indexPath = path.join(projectDir, "recipes-index.json");
    await writeSignedIndex(indexPath, {
      schema_version: 1,
      recipes: [
        {
          id: "viewer",
          summary: "Preview tasks",
          description: "Preview tasks",
          versions: [{ version: "1.0.0", url: "recipe.tar.gz", sha256: "bad" }],
        },
      ],
    });

    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: ["--name", "viewer", "--index", indexPath, "--refresh"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
  });
});
