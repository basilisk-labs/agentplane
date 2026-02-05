import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { cmdRecipes, cmdScenario } from "./recipes.js";
import { CliError } from "../shared/errors.js";
import {
  captureStdIO,
  createRecipeArchive,
  createRecipeArchiveWithManifest,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "../cli/run-cli.test-helpers.js";

const originalAgentplaneHome = process.env.AGENTPLANE_HOME;
let tempHome: string | null = null;

async function writeInstalledRecipes(recipes: unknown[]): Promise<void> {
  if (!tempHome) throw new Error("temp home not set");
  const payload = {
    schema_version: 1,
    updated_at: "2026-02-05T00:00:00Z",
    recipes,
  };
  await writeFile(path.join(tempHome, "recipes.json"), JSON.stringify(payload, null, 2), "utf8");
}

function baseRecipeEntry(overrides?: Partial<Record<string, unknown>>) {
  const base = {
    id: "viewer",
    version: "1.2.3",
    source: "local",
    installed_at: "2026-02-05T00:00:00Z",
    tags: ["docs"],
    manifest: {
      schema_version: "1",
      id: "viewer",
      version: "1.2.3",
      name: "Viewer",
      summary: "Preview tasks",
      description: "Preview tasks",
      tags: ["docs"],
      agents: [],
      tools: [],
      scenarios: [],
    },
  };
  if (!overrides) return base;
  return { ...base, ...overrides };
}

async function installRecipe(opts: {
  projectDir: string;
  archivePath?: string;
  tags?: string[];
}): Promise<void> {
  const { archivePath } = opts.archivePath
    ? { archivePath: opts.archivePath }
    : await createRecipeArchive({ tags: opts.tags });
  const io = captureStdIO();
  try {
    await cmdRecipes({
      cwd: opts.projectDir,
      args: ["--path", archivePath],
      command: "install",
    });
  } finally {
    io.restore();
  }
}

describe("commands/recipes", () => {
  beforeEach(async () => {
    tempHome = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-test-"));
    process.env.AGENTPLANE_HOME = tempHome;
  });

  afterEach(async () => {
    if (tempHome) {
      await rm(tempHome, { recursive: true, force: true });
    }
    tempHome = null;
    if (originalAgentplaneHome === undefined) {
      delete process.env.AGENTPLANE_HOME;
    } else {
      process.env.AGENTPLANE_HOME = originalAgentplaneHome;
    }
  });

  it("rejects missing recipes subcommand", async () => {
    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: [],
        command: undefined,
      }),
    ).rejects.toBeInstanceOf(CliError);
  });

  it("rejects invalid recipes install usage", async () => {
    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: [],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects invalid recipes list usage", async () => {
    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["--tag"],
        command: "list",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["--unknown"],
        command: "list",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects invalid recipes list payloads", async () => {
    if (!tempHome) throw new Error("temp home not set");
    await writeFile(
      path.join(tempHome, "recipes.json"),
      JSON.stringify({ schema_version: 2, updated_at: "", recipes: [] }, null, 2),
      "utf8",
    );

    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: [],
        command: "list",
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
  });

  it("rejects invalid recipes index data", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-cwd-"));
    const indexPath = path.join(cwd, "recipes-index.json");
    await writeFile(
      indexPath,
      JSON.stringify({ schema_version: 1, recipes: [{ id: "viewer" }] }, null, 2),
      "utf8",
    );

    await expect(
      cmdRecipes({
        cwd,
        args: ["--index", indexPath, "--refresh"],
        command: "list-remote",
      }),
    ).rejects.toMatchObject({ code: "E_IO" });

    await rm(cwd, { recursive: true, force: true });
  });

  it("rejects recipes install positional + flag mix", async () => {
    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["--name", "viewer", "extra"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects recipes install with multiple explicit flags", async () => {
    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["--name", "viewer", "--url", "https://example.test"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects recipes install with too many positional args", async () => {
    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["one", "two"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects recipes install with invalid conflict mode", async () => {
    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["--name", "viewer", "--on-conflict", "bad"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("installs a recipe from a local archive path", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    const { archivePath } = await createRecipeArchive();

    await expect(installRecipe({ projectDir, archivePath })).resolves.toBeUndefined();

    const installed = JSON.parse(await readFile(path.join(tempHome, "recipes.json"), "utf8")) as {
      recipes: { id: string }[];
    };
    expect(installed.recipes[0]?.id).toBe("viewer");
  });

  it("prints recipe info details", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir, tags: ["docs"] });

    const io = captureStdIO();

    await expect(
      cmdRecipes({
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
    if (!tempHome) throw new Error("temp home not set");
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    const io = captureStdIO();

    await expect(
      cmdRecipes({
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
    if (!tempHome) throw new Error("temp home not set");
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes([
      baseRecipeEntry({
        manifest: {
          schema_version: "1",
          id: "viewer",
          version: "1.2.3",
          name: "Viewer",
          summary: "Preview tasks",
          description: "Preview tasks",
          tags: [],
          agents: [],
          tools: [],
          scenarios: [{ id: "alpha", summary: "Alpha scenario" }],
        },
      }),
    ]);
    const recipeDir = path.join(tempHome, "recipes", "viewer", "1.2.3");
    await mkdir(recipeDir, { recursive: true });

    const io = captureStdIO();
    try {
      const code = await cmdRecipes({
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
    if (!tempHome) throw new Error("temp home not set");
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    const io = captureStdIO();
    try {
      await expect(
        cmdRecipes({
          cwd: projectDir,
          args: ["viewer"],
          command: "remove",
        }),
      ).resolves.toBe(0);
    } finally {
      io.restore();
    }

    const installed = JSON.parse(await readFile(path.join(tempHome, "recipes.json"), "utf8")) as {
      recipes: { id: string }[];
    };
    expect(installed.recipes.length).toBe(0);
  });

  it("rejects removing a missing recipe", async () => {
    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["missing"],
        command: "remove",
      }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });

  it("rejects install from index when recipe is missing", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-cwd-"));
    const indexPath = path.join(cwd, "recipes-index.json");
    await writeFile(indexPath, JSON.stringify({ schema_version: 1, recipes: [] }, null, 2), "utf8");

    await expect(
      cmdRecipes({
        cwd,
        args: ["--name", "missing", "--index", indexPath, "--refresh"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_IO" });

    await rm(cwd, { recursive: true, force: true });
  });

  it("rejects install when index checksum mismatches", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-cwd-"));
    const { archivePath } = await createRecipeArchive();
    const target = path.join(cwd, "recipe.tar.gz");
    await writeFile(target, await readFile(archivePath));

    const indexPath = path.join(cwd, "recipes-index.json");
    await writeFile(
      indexPath,
      JSON.stringify(
        {
          schema_version: 1,
          recipes: [
            {
              id: "viewer",
              summary: "Preview tasks",
              description: "Preview tasks",
              versions: [{ version: "1.0.0", url: "recipe.tar.gz", sha256: "bad" }],
            },
          ],
        },
        null,
        2,
      ),
      "utf8",
    );

    await expect(
      cmdRecipes({
        cwd,
        args: ["--name", "viewer", "--index", indexPath, "--refresh"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });

    await rm(cwd, { recursive: true, force: true });
  });

  it("scenario list and info read installed recipe scenarios", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    const ioList = captureStdIO();
    try {
      const code = await cmdScenario({
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
      const code = await cmdScenario({
        cwd: projectDir,
        args: ["viewer:RECIPE_SCENARIO"],
        command: "info",
      });
      expect(code).toBe(0);
      expect(ioInfo.stdout).toContain("Goal:");
      expect(ioInfo.stdout).toContain("Inputs:");
      expect(ioInfo.stdout).toContain("Outputs:");
      expect(ioInfo.stdout).toContain("Steps:");
    } finally {
      ioInfo.restore();
    }
  });

  it("scenario commands validate usage and run scenarios", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    await expect(
      cmdScenario({ cwd: projectDir, args: [], command: undefined }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      cmdScenario({ cwd: projectDir, args: ["extra"], command: "list" }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(cmdScenario({ cwd: projectDir, args: [], command: "info" })).rejects.toMatchObject(
      { code: "E_USAGE" },
    );

    await expect(
      cmdScenario({ cwd: projectDir, args: ["viewer"], command: "info" }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(cmdScenario({ cwd: projectDir, args: [], command: "run" })).rejects.toMatchObject({
      code: "E_USAGE",
    });

    const ioRun = captureStdIO();
    try {
      const code = await cmdScenario({
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
    if (!tempHome) throw new Error("temp home not set");
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);

    await expect(
      cmdScenario({ cwd: projectDir, args: ["missing:scenario"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_IO" });

    await installRecipe({ projectDir });

    await expect(
      cmdScenario({ cwd: projectDir, args: ["viewer"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      cmdScenario({ cwd: projectDir, args: ["viewer:UNKNOWN"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_IO" });

    const scenariosDir = path.join(tempHome, "recipes", "viewer", "1.2.3", "scenarios");
    await rm(scenariosDir, { recursive: true, force: true });

    await expect(
      cmdScenario({ cwd: projectDir, args: ["viewer:RECIPE_SCENARIO"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });

  it("scenario list prints empty state when no scenarios exist", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes([
      baseRecipeEntry({
        manifest: {
          schema_version: "1",
          id: "viewer",
          version: "1.2.3",
          name: "Viewer",
          summary: "Preview tasks",
          description: "Preview tasks",
          tags: ["docs"],
          agents: [],
          tools: [],
          scenarios: [],
        },
      }),
    ]);
    const recipeDir = path.join(tempHome, "recipes", "viewer", "1.2.3");
    await mkdir(recipeDir, { recursive: true });

    const io = captureStdIO();
    try {
      const code = await cmdScenario({ cwd: projectDir, args: [], command: "list" });
      expect(code).toBe(0);
      expect(io.stdout).toContain("No scenarios found");
    } finally {
      io.restore();
    }
  });

  it("scenario info falls back to index summary when definition is missing", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes([baseRecipeEntry()]);
    const recipeDir = path.join(tempHome, "recipes", "viewer", "1.2.3");
    await mkdir(recipeDir, { recursive: true });
    await writeFile(
      path.join(recipeDir, "scenarios.json"),
      JSON.stringify(
        {
          schema_version: 1,
          scenarios: [{ id: "beta", summary: "Beta scenario" }],
        },
        null,
        2,
      ),
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await cmdScenario({
        cwd: projectDir,
        args: ["viewer:beta"],
        command: "info",
      });
      expect(code).toBe(0);
      expect(io.stdout).toContain("Summary: Beta scenario");
      expect(io.stdout).toContain("Scenario definition not found in recipe");
    } finally {
      io.restore();
    }
  });

  it("scenario run rejects invalid tool runtime and failing tools", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    const recipeDir = path.join(tempHome, "recipes", "viewer", "1.2.3");
    const manifestPath = path.join(recipeDir, "manifest.json");
    const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as Record<string, unknown>;
    (manifest.tools as Record<string, unknown>[])[0].runtime = "python";
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");

    await expect(
      cmdScenario({ cwd: projectDir, args: ["viewer:RECIPE_SCENARIO"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });

    (manifest.tools as Record<string, unknown>[])[0].runtime = "bash";
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
    await writeFile(path.join(recipeDir, "tools", "run.sh"), "exit 2\n", "utf8");

    await expect(
      cmdScenario({ cwd: projectDir, args: ["viewer:RECIPE_SCENARIO"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });

    const runsRoot = path.join(projectDir, ".agentplane", "recipes", "viewer", "runs");
    const runs = await readdir(runsRoot);
    expect(runs.length).toBeGreaterThan(0);
    const latest = runs.toSorted().at(-1);
    const metaPath = path.join(runsRoot, latest ?? "", "meta.json");
    expect(await readFile(metaPath, "utf8")).toContain('"recipe"');
  });

  it("scenario run warns on tool permissions and missing entrypoint", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    const manifest = {
      schema_version: "1",
      id: "viewer",
      version: "1.2.3",
      name: "Viewer",
      summary: "Preview tasks",
      description: "Preview tasks",
      tools: [
        {
          id: "WARN_TOOL",
          summary: "Warn tool",
          runtime: "bash",
          entrypoint: "tools/missing.sh",
          permissions: ["read", "write"],
        },
      ],
      scenarios: [{ id: "WARN_SCENARIO", summary: "Warn scenario" }],
    };
    const archivePath = await createRecipeArchiveWithManifest({
      manifest,
      files: {
        "scenarios/warn.json": JSON.stringify(
          {
            schema_version: "1",
            id: "WARN_SCENARIO",
            goal: "warn",
            inputs: [],
            outputs: [],
            steps: [{ tool: "WARN_TOOL" }],
          },
          null,
          2,
        ),
      },
    });

    await cmdRecipes({
      cwd: projectDir,
      args: ["--path", archivePath],
      command: "install",
    });

    const io = captureStdIO();
    try {
      await expect(
        cmdScenario({ cwd: projectDir, args: ["viewer:WARN_SCENARIO"], command: "run" }),
      ).rejects.toMatchObject({ code: "E_IO" });
      expect(io.stdout).toContain("Warning: tool WARN_TOOL declares permissions");
    } finally {
      io.restore();
    }
  });

  it("scenario run rejects invalid step args", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    const manifest = {
      schema_version: "1",
      id: "viewer",
      version: "1.2.3",
      name: "Viewer",
      summary: "Preview tasks",
      description: "Preview tasks",
      tools: [
        {
          id: "BAD_ARGS_TOOL",
          summary: "Bad args tool",
          runtime: "bash",
          entrypoint: "tools/run.sh",
        },
      ],
      scenarios: [{ id: "BAD_ARGS", summary: "Bad args scenario" }],
    };
    const archivePath = await createRecipeArchiveWithManifest({
      manifest,
      files: {
        "tools/run.sh": "#!/usr/bin/env bash\nexit 0\n",
        "scenarios/bad-args.json": JSON.stringify(
          {
            schema_version: "1",
            id: "BAD_ARGS",
            goal: "bad args",
            inputs: [],
            outputs: [],
            steps: [{ tool: "BAD_ARGS_TOOL", args: [1] }],
          },
          null,
          2,
        ),
      },
    });

    await cmdRecipes({
      cwd: projectDir,
      args: ["--path", archivePath],
      command: "install",
    });

    await expect(
      cmdScenario({ cwd: projectDir, args: ["viewer:BAD_ARGS"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });

  it("lists empty recipes with default hint", async () => {
    const io = captureStdIO();

    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: [],
        command: "list",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("No installed recipes found");
  });

  it("lists empty recipes for a tag", async () => {
    const io = captureStdIO();

    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["--tag", "docs"],
        command: "list",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("installed recipes for tag docs");
  });

  it("lists recipes in full JSON output", async () => {
    await writeInstalledRecipes([baseRecipeEntry()]);

    const io = captureStdIO();

    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["--full"],
        command: "list",
      }),
    ).resolves.toBe(0);

    io.restore();
    const parsed = JSON.parse(io.stdout) as { recipes: { id: string }[] };
    expect(parsed.recipes[0]?.id).toBe("viewer");
  });

  it("lists recipes filtered by tag", async () => {
    await writeInstalledRecipes([
      baseRecipeEntry({
        id: "viewer",
        tags: ["docs"],
        manifest: {
          schema_version: "1",
          id: "viewer",
          version: "1.2.3",
          name: "Viewer",
          summary: "Preview tasks",
          description: "Preview tasks",
          tags: ["docs"],
          agents: [],
          tools: [],
          scenarios: [],
        },
      }),
      baseRecipeEntry({
        id: "runner",
        version: "2.0.0",
        tags: ["ops"],
        manifest: {
          schema_version: "1",
          id: "runner",
          version: "2.0.0",
          name: "Runner",
          summary: "Runs jobs",
          description: "Runs jobs",
          tags: ["ops"],
          agents: [],
          tools: [],
          scenarios: [],
        },
      }),
    ]);

    const io = captureStdIO();

    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["--tag", "docs"],
        command: "list",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("viewer@1.2.3");
    expect(io.stdout).not.toContain("runner@2.0.0");
  });

  it("lists remote recipes from a local index", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-cwd-"));
    const indexPath = path.join(cwd, "recipes-index.json");
    await writeFile(
      indexPath,
      JSON.stringify(
        {
          schema_version: 1,
          recipes: [
            {
              id: "viewer",
              summary: "Preview tasks",
              description: "Preview tasks",
              versions: [{ version: "1.0.0", url: "https://example.test", sha256: "abc" }],
            },
          ],
        },
        null,
        2,
      ),
      "utf8",
    );

    const io = captureStdIO();

    await expect(
      cmdRecipes({
        cwd,
        args: ["--index", indexPath, "--refresh"],
        command: "list-remote",
      }),
    ).resolves.toBe(0);

    io.restore();
    await rm(cwd, { recursive: true, force: true });

    expect(io.stdout).toContain("viewer@1.0.0");
  });

  it("lists remote recipes from an http index", async () => {
    const fetchMock = vi.fn(() => ({
      ok: true,
      status: 200,
      statusText: "OK",
      json: () => ({
        schema_version: 1,
        recipes: [
          {
            id: "viewer",
            summary: "Preview tasks",
            description: "Preview tasks",
            versions: [{ version: "1.0.0", url: "https://example.test", sha256: "abc" }],
          },
        ],
      }),
    }));
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const io = captureStdIO();

    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["--index", "https://example.test/index.json", "--refresh"],
        command: "list-remote",
      }),
    ).resolves.toBe(0);

    io.restore();
    vi.unstubAllGlobals();

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(io.stdout).toContain("viewer@1.0.0");
  });

  it("rejects missing cache subcommand", async () => {
    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: [],
        command: "cache",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects invalid cache subcommand", async () => {
    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["noop"],
        command: "cache",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects invalid cache prune flags", async () => {
    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["prune", "--bad"],
        command: "cache",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("reports missing recipe cache directory", async () => {
    const io = captureStdIO();

    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["prune"],
        command: "cache",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("recipe cache directory not found");
  });

  it("reports empty recipe cache directory", async () => {
    if (!tempHome) throw new Error("temp home not set");
    await mkdir(path.join(tempHome, "recipes"), { recursive: true });

    const io = captureStdIO();

    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["prune"],
        command: "cache",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("recipe cache is empty");
  });

  it("reports dry-run cache prune with --all", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const cacheDir = path.join(tempHome, "recipes", "viewer", "1.2.3");
    await mkdir(cacheDir, { recursive: true });

    const io = captureStdIO();

    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["prune", "--all", "--dry-run"],
        command: "cache",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("dry-run: would remove viewer@1.2.3");
  });

  it("reports clean cache when all cached recipes are installed", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const cacheDir = path.join(tempHome, "recipes", "viewer", "1.2.3");
    await mkdir(cacheDir, { recursive: true });
    await writeInstalledRecipes([baseRecipeEntry()]);

    const io = captureStdIO();

    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["prune"],
        command: "cache",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("recipe cache already clean");
  });

  it("prunes uninstalled cached recipes", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const cacheDir = path.join(tempHome, "recipes", "viewer", "1.2.3");
    await mkdir(cacheDir, { recursive: true });
    await writeInstalledRecipes([]);

    const io = captureStdIO();

    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["prune"],
        command: "cache",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("removed cached recipes");
  });

  it("removes all cached recipes with --all", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const cacheDir = path.join(tempHome, "recipes", "viewer", "1.2.3");
    await mkdir(cacheDir, { recursive: true });

    const io = captureStdIO();

    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: ["prune", "--all"],
        command: "cache",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("removed cached recipes");
  });

  it("lists scenarios from a scenarios directory", async () => {
    if (!tempHome) throw new Error("temp home not set");
    await writeInstalledRecipes([baseRecipeEntry()]);

    const recipeDir = path.join(tempHome, "recipes", "viewer", "1.2.3", "scenarios");
    await mkdir(recipeDir, { recursive: true });
    await writeFile(
      path.join(recipeDir, "scenario.json"),
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
      cmdScenario({
        cwd: process.cwd(),
        args: [],
        command: "list",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("viewer:alpha");
  });

  it("lists scenarios from a scenarios index", async () => {
    if (!tempHome) throw new Error("temp home not set");
    await writeInstalledRecipes([baseRecipeEntry()]);

    const recipeDir = path.join(tempHome, "recipes", "viewer", "1.2.3");
    await mkdir(recipeDir, { recursive: true });
    await writeFile(
      path.join(recipeDir, "scenarios.json"),
      JSON.stringify(
        {
          schema_version: 1,
          scenarios: [{ id: "beta", summary: "Beta scenario" }],
        },
        null,
        2,
      ),
      "utf8",
    );

    const io = captureStdIO();

    await expect(
      cmdScenario({
        cwd: process.cwd(),
        args: [],
        command: "list",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("viewer:beta");
  });

  it("rejects missing scenario subcommand", async () => {
    await expect(
      cmdScenario({
        cwd: process.cwd(),
        args: [],
        command: undefined,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects scenario list with extra args", async () => {
    await expect(
      cmdScenario({
        cwd: process.cwd(),
        args: ["extra"],
        command: "list",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });
});
