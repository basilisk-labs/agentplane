import { mkdir } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  baseRecipeEntry,
  captureStdIO,
  installRecipesCommandHarness,
  requireRecipesTempHome,
  runRecipesTest,
  writeInstalledRecipesRegistry,
} from "./recipes.test-helpers.js";

installRecipesCommandHarness();

describe("commands/recipes cache", () => {
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
    const tempHome = requireRecipesTempHome();
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
    const tempHome = requireRecipesTempHome();
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
    const tempHome = requireRecipesTempHome();
    const cacheDir = path.join(tempHome, "recipes", "viewer", "1.2.3");
    await mkdir(cacheDir, { recursive: true });
    await writeInstalledRecipesRegistry([baseRecipeEntry()]);

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
    const tempHome = requireRecipesTempHome();
    const cacheDir = path.join(tempHome, "recipes", "viewer", "1.2.3");
    await mkdir(cacheDir, { recursive: true });
    await writeInstalledRecipesRegistry([]);

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
    const tempHome = requireRecipesTempHome();
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
});
