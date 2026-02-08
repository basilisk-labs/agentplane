import { generateKeyPairSync, sign } from "node:crypto";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  cmdRecipeCachePruneParsed,
  cmdRecipeExplainParsed,
  cmdRecipeInfoParsed,
  cmdRecipeInstall,
  cmdRecipeListParsed,
  cmdRecipeListRemoteParsed,
  cmdRecipeRemoveParsed,
} from "./recipes.js";
import { cmdScenarioInfoParsed, cmdScenarioListParsed, cmdScenarioRunParsed } from "./scenario.js";
import { CliError } from "../shared/errors.js";
import { parseCommandArgv } from "../cli2/parse.js";
import { recipesCachePruneSpec } from "./recipes/cache-prune.command.js";
import { recipesExplainSpec } from "./recipes/explain.command.js";
import { recipesInfoSpec } from "./recipes/info.command.js";
import { recipesInstallSpec } from "./recipes/install.command.js";
import { recipesListRemoteSpec } from "./recipes/list-remote.command.js";
import { recipesListSpec } from "./recipes/list.command.js";
import { recipesRemoveSpec } from "./recipes/remove.command.js";
import { scenarioInfoSpec } from "./scenario/info.command.js";
import { scenarioListSpec } from "./scenario/list.command.js";
import { scenarioRunSpec } from "./scenario/run.command.js";
import {
  captureStdIO,
  createRecipeArchive,
  createRecipeArchiveWithManifest,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "../cli/run-cli.test-helpers.js";

const originalAgentplaneHome = process.env.AGENTPLANE_HOME;
const originalRecipesKeys = process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS;
let tempHome: string | null = null;
let testKeyId = "test-key";
let testPrivateKey: ReturnType<typeof generateKeyPairSync>["privateKey"] | null = null;

function signIndexPayload(indexText: string): {
  schema_version: 1;
  key_id: string;
  signature: string;
} {
  if (!testPrivateKey) throw new Error("test private key not set");
  const signature = sign(null, Buffer.from(indexText), testPrivateKey).toString("base64");
  return { schema_version: 1, key_id: testKeyId, signature };
}

async function writeSignedIndex(indexPath: string, payload: unknown): Promise<void> {
  const indexText = JSON.stringify(payload, null, 2);
  await writeFile(indexPath, indexText, "utf8");
  const signature = signIndexPayload(indexText);
  await writeFile(`${indexPath}.sig`, JSON.stringify(signature, null, 2), "utf8");
}

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
    await runRecipesTest({
      cwd: opts.projectDir,
      command: "install",
      args: ["--path", archivePath],
    });
  } finally {
    io.restore();
  }
}

async function runRecipesTest(opts: {
  cwd: string;
  rootOverride?: string;
  command: string | undefined;
  args: string[];
}): Promise<number> {
  if (!opts.command) {
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Missing recipes subcommand." });
  }

  switch (opts.command) {
    case "list": {
      const parsed = parseCommandArgv(recipesListSpec, opts.args).parsed;
      return await cmdRecipeListParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        flags: parsed,
      });
    }
    case "list-remote": {
      const parsed = parseCommandArgv(recipesListRemoteSpec, opts.args).parsed;
      return await cmdRecipeListRemoteParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        flags: parsed,
      });
    }
    case "info": {
      const parsed = parseCommandArgv(recipesInfoSpec, opts.args).parsed;
      return await cmdRecipeInfoParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        id: parsed.id,
      });
    }
    case "explain": {
      const parsed = parseCommandArgv(recipesExplainSpec, opts.args).parsed;
      return await cmdRecipeExplainParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        id: parsed.id,
      });
    }
    case "install": {
      const parsed = parseCommandArgv(recipesInstallSpec, opts.args).parsed;
      return await cmdRecipeInstall({ cwd: opts.cwd, rootOverride: opts.rootOverride, ...parsed });
    }
    case "remove": {
      const parsed = parseCommandArgv(recipesRemoveSpec, opts.args).parsed;
      return await cmdRecipeRemoveParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        id: parsed.id,
      });
    }
    case "cache": {
      const [sub, ...tail] = opts.args;
      if (sub !== "prune") {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Unknown recipes cache subcommand: ${String(sub ?? "")}`,
        });
      }
      const parsed = parseCommandArgv(recipesCachePruneSpec, tail).parsed;
      return await cmdRecipeCachePruneParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        flags: parsed,
      });
    }
    default: {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Unknown recipes subcommand: ${opts.command}`,
      });
    }
  }
}

async function runScenarioTest(opts: {
  cwd: string;
  rootOverride?: string;
  command: string | undefined;
  args: string[];
}): Promise<number> {
  if (!opts.command) {
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Missing scenario subcommand." });
  }

  switch (opts.command) {
    case "list": {
      parseCommandArgv(scenarioListSpec, opts.args);
      return await cmdScenarioListParsed({ cwd: opts.cwd, rootOverride: opts.rootOverride });
    }
    case "info": {
      const parsed = parseCommandArgv(scenarioInfoSpec, opts.args).parsed;
      return await cmdScenarioInfoParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        recipeId: parsed.recipeId,
        scenarioId: parsed.scenarioId,
      });
    }
    case "run": {
      const parsed = parseCommandArgv(scenarioRunSpec, opts.args).parsed;
      return await cmdScenarioRunParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        recipeId: parsed.recipeId,
        scenarioId: parsed.scenarioId,
      });
    }
    default: {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Unknown scenario subcommand: ${opts.command}`,
      });
    }
  }
}

describe("commands/recipes", () => {
  beforeEach(async () => {
    tempHome = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-test-"));
    process.env.AGENTPLANE_HOME = tempHome;
    const { publicKey, privateKey } = generateKeyPairSync("ed25519");
    testPrivateKey = privateKey;
    const publicPem = publicKey.export({ type: "spki", format: "pem" }).toString();
    process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS = JSON.stringify({ [testKeyId]: publicPem });
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
    if (originalRecipesKeys === undefined) {
      delete process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS;
    } else {
      process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS = originalRecipesKeys;
    }
    testPrivateKey = null;
  });

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

  it("rejects invalid recipes list usage", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["--tag"],
        command: "list",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      runRecipesTest({
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
      runRecipesTest({
        cwd: process.cwd(),
        args: [],
        command: "list",
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
  });

  it("rejects invalid recipes index data", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-cwd-"));
    const indexPath = path.join(cwd, "recipes-index.json");
    await writeSignedIndex(indexPath, { schema_version: 1, recipes: [{ id: "viewer" }] });

    await expect(
      runRecipesTest({
        cwd,
        args: ["--index", indexPath, "--refresh"],
        command: "list-remote",
      }),
    ).rejects.toMatchObject({ code: "E_IO" });

    await rm(cwd, { recursive: true, force: true });
  });

  it("rejects unsigned recipes index", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-cwd-"));
    const indexPath = path.join(cwd, "recipes-index.json");
    await writeFile(indexPath, JSON.stringify({ schema_version: 1, recipes: [] }, null, 2), "utf8");

    await expect(
      runRecipesTest({
        cwd,
        args: ["--index", indexPath, "--refresh"],
        command: "list-remote",
      }),
    ).rejects.toMatchObject({ code: "E_IO" });

    await rm(cwd, { recursive: true, force: true });
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
    if (!tempHome) throw new Error("temp home not set");
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
    if (!tempHome) throw new Error("temp home not set");
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

    const installed = JSON.parse(await readFile(path.join(tempHome, "recipes.json"), "utf8")) as {
      recipes: { id: string }[];
    };
    expect(installed.recipes.length).toBe(0);
  });

  it("rejects removing a missing recipe", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["missing"],
        command: "remove",
      }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });

  it("rejects install from index when recipe is missing", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-cwd-"));
    const indexPath = path.join(cwd, "recipes-index.json");
    await writeSignedIndex(indexPath, { schema_version: 1, recipes: [] });

    await expect(
      runRecipesTest({
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
    if (!tempHome) throw new Error("temp home not set");
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

    const scenariosDir = path.join(tempHome, "recipes", "viewer", "1.2.3", "scenarios");
    await rm(scenariosDir, { recursive: true, force: true });

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["viewer:RECIPE_SCENARIO"], command: "run" }),
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
      const code = await runScenarioTest({ cwd: projectDir, args: [], command: "list" });
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
      const code = await runScenarioTest({
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
      runScenarioTest({ cwd: projectDir, args: ["viewer:RECIPE_SCENARIO"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });

    (manifest.tools as Record<string, unknown>[])[0].runtime = "bash";
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
    await writeFile(path.join(recipeDir, "tools", "run.sh"), "exit 2\n", "utf8");

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["viewer:RECIPE_SCENARIO"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });

    const runsRoot = path.join(projectDir, ".agentplane", "recipes", "viewer", "runs");
    const runs = await readdir(runsRoot);
    expect(runs.length).toBeGreaterThan(0);
    const latest = runs.toSorted().at(-1);
    const metaPath = path.join(runsRoot, latest ?? "", "meta.json");
    expect(await readFile(metaPath, "utf8")).toContain('"recipe"');
    const reportPath = path.join(runsRoot, latest ?? "", "report.json");
    const reportText = await readFile(reportPath, "utf8");
    const report = JSON.parse(reportText) as Record<string, unknown>;
    expect(report.status).toBe("failed");
  });

  it("scenario run writes audit report with redacted args and env keys", async () => {
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
          id: "AUDIT_TOOL",
          summary: "Audit tool",
          runtime: "bash",
          entrypoint: "tools/run.sh",
        },
      ],
      scenarios: [{ id: "AUDIT_SCENARIO", summary: "Audit scenario" }],
    };
    const archivePath = await createRecipeArchiveWithManifest({
      manifest,
      files: {
        "tools/run.sh": "#!/usr/bin/env bash\nexit 0\n",
        "scenarios/audit.json": JSON.stringify(
          {
            schema_version: "1",
            id: "AUDIT_SCENARIO",
            goal: "audit",
            inputs: [],
            outputs: [],
            steps: [
              {
                tool: "AUDIT_TOOL",
                args: ["--token=supersecret", "--user", "denis", "--password", "hunter2"],
                env: { SECRET_TOKEN: "abc123", SAFE: "ok" },
              },
            ],
          },
          null,
          2,
        ),
      },
    });

    await runRecipesTest({
      cwd: projectDir,
      args: ["--path", archivePath],
      command: "install",
    });

    await runScenarioTest({
      cwd: projectDir,
      args: ["viewer:AUDIT_SCENARIO"],
      command: "run",
    });

    const runsRoot = path.join(projectDir, ".agentplane", "recipes", "viewer", "runs");
    const runs = await readdir(runsRoot);
    const latest = runs.toSorted().at(-1);
    const reportPath = path.join(runsRoot, latest ?? "", "report.json");
    const reportText = await readFile(reportPath, "utf8");
    expect(reportText).not.toContain("abc123");
    expect(reportText).not.toContain("hunter2");
    expect(reportText).not.toContain("supersecret");
    const report = JSON.parse(reportText) as Record<string, unknown>;
    expect(report.status).toBe("success");
    const steps = report.steps as Record<string, unknown>[];
    expect(steps).toHaveLength(1);
    expect(steps[0]?.args).toEqual([
      "--token=<redacted>",
      "--user",
      "denis",
      "--password",
      "<redacted>",
    ]);
    const envKeys = steps[0]?.env_keys as string[];
    expect(envKeys).toContain("SECRET_TOKEN");
    expect(envKeys).toContain("SAFE");
    expect(envKeys).toContain("AGENTPLANE_RUN_DIR");
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

    await runRecipesTest({
      cwd: projectDir,
      args: ["--path", archivePath],
      command: "install",
    });

    const io = captureStdIO();
    try {
      await expect(
        runScenarioTest({ cwd: projectDir, args: ["viewer:WARN_SCENARIO"], command: "run" }),
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

    await runRecipesTest({
      cwd: projectDir,
      args: ["--path", archivePath],
      command: "install",
    });

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["viewer:BAD_ARGS"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });

  it("lists empty recipes with default hint", async () => {
    const io = captureStdIO();

    await expect(
      runRecipesTest({
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
      runRecipesTest({
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
      runRecipesTest({
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
      runRecipesTest({
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
    await writeSignedIndex(indexPath, {
      schema_version: 1,
      recipes: [
        {
          id: "viewer",
          summary: "Preview tasks",
          description: "Preview tasks",
          versions: [{ version: "1.0.0", url: "https://example.test", sha256: "abc" }],
        },
      ],
    });

    const io = captureStdIO();

    await expect(
      runRecipesTest({
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
    const indexPayload = {
      schema_version: 1,
      recipes: [
        {
          id: "viewer",
          summary: "Preview tasks",
          description: "Preview tasks",
          versions: [{ version: "1.0.0", url: "https://example.test", sha256: "abc" }],
        },
      ],
    };
    const indexText = JSON.stringify(indexPayload, null, 2);
    const signature = signIndexPayload(indexText);
    const fetchMock = vi.fn((url: string) => {
      if (url.endsWith(".sig")) {
        return Promise.resolve({
          ok: true,
          status: 200,
          statusText: "OK",
          json: () => signature,
        });
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        statusText: "OK",
        text: () => Promise.resolve(indexText),
      });
    });
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["--index", "https://example.test/index.json", "--refresh", "--yes"],
        command: "list-remote",
      }),
    ).resolves.toBe(0);

    io.restore();
    vi.unstubAllGlobals();

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(io.stdout).toContain("viewer@1.0.0");
  });

  it("rejects missing cache subcommand", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: [],
        command: "cache",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects invalid cache subcommand", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["noop"],
        command: "cache",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects invalid cache prune flags", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["prune", "--bad"],
        command: "cache",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("reports missing recipe cache directory", async () => {
    const io = captureStdIO();

    await expect(
      runRecipesTest({
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
      runRecipesTest({
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
      runRecipesTest({
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
      runRecipesTest({
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
      runRecipesTest({
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
      runRecipesTest({
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
      runScenarioTest({
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
      runScenarioTest({
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
