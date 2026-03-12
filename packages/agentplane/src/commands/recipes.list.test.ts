import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

import {
  baseRecipeEntry,
  baseRecipeManifest,
  captureStdIO,
  installRecipesCommandHarness,
  mkGitRepoRoot,
  resolveProjectRecipeDir,
  runRecipesTest,
  signIndexPayload,
  writeDefaultConfig,
  writeInstalledRecipes,
  writeSignedIndex,
} from "./recipes.test-helpers.js";

installRecipesCommandHarness();

describe("commands/recipes list", () => {
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
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    const recipeDir = resolveProjectRecipeDir(projectDir, "bad");
    await mkdir(recipeDir, { recursive: true });
    await writeFile(
      path.join(recipeDir, "manifest.json"),
      JSON.stringify(
        baseRecipeManifest({
          id: "bad",
          version: "1.0.0",
          name: "Bad",
          summary: "Bad",
          description: "Bad",
        }),
        null,
        2,
      ),
      "utf8",
    );
    await writeFile(
      path.join(recipeDir, ".install.json"),
      JSON.stringify({ schema_version: 2, id: "bad", version: "1.0.0" }, null, 2),
      "utf8",
    );

    await expect(
      runRecipesTest({
        cwd: projectDir,
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

  it("lists empty recipes with default hint", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: [],
        command: "list",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("No installed recipes found");
  });

  it("lists empty recipes for a tag", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: ["--tag", "docs"],
        command: "list",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("installed recipes for tag docs");
  });

  it("lists recipes in full JSON output", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [baseRecipeEntry()]);

    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: ["--full"],
        command: "list",
      }),
    ).resolves.toBe(0);

    io.restore();
    const parsed = JSON.parse(io.stdout) as { recipes: { id: string }[] };
    expect(parsed.recipes[0]?.id).toBe("viewer");
  });

  it("lists recipes filtered by tag", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [
      baseRecipeEntry({
        id: "viewer",
        tags: ["docs"],
        manifest: {
          ...baseRecipeManifest({
            tags: ["docs"],
          }),
        },
      }),
      baseRecipeEntry({
        id: "runner",
        version: "2.0.0",
        tags: ["ops"],
        manifest: {
          ...baseRecipeManifest({
            id: "runner",
            version: "2.0.0",
            name: "Runner",
            summary: "Runs jobs",
            description: "Runs jobs",
            tags: ["ops"],
          }),
        },
      }),
    ]);

    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: projectDir,
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
});
