import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  createRecipeArchive,
  mkGitRepoRoot,
  pathExists,
  registerAgentplaneHome,
  runCliSilent,
  silenceStdIO,
  writeDefaultConfig,
} from "./run-cli.test-helpers.js";

registerAgentplaneHome();
let restoreStdIO: (() => void) | null = null;

beforeEach(() => {
  restoreStdIO = silenceStdIO();
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
});

describe("runCli scenario", () => {
  it("scenario list and info use resolver-backed manifest descriptors", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive();
    const manifestId = String(manifest.id);

    await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root]);

    const ioList = captureStdIO();
    try {
      const code = await runCli(["scenario", "list", "--root", root]);
      expect(code).toBe(0);
      expect(ioList.stdout).toContain(`${manifestId}:RECIPE_SCENARIO`);
      expect(ioList.stdout).toContain("[mode=analysis] [compatible]");
    } finally {
      ioList.restore();
    }

    const ioInfo = captureStdIO();
    try {
      const code = await runCli([
        "scenario",
        "info",
        `${manifestId}:RECIPE_SCENARIO`,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(ioInfo.stdout).toContain("Scenario:");
      expect(ioInfo.stdout).toContain("Run profile:");
      expect(ioInfo.stdout).toContain("Scenario file:");
      expect(ioInfo.stdout).toContain("Compatibility: satisfied");
      expect(ioInfo.stdout).not.toContain("Steps:");
    } finally {
      ioInfo.restore();
    }
  });

  it("scenario run validates scenario definition files", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive();
    const manifestId = String(manifest.id);

    await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root]);

    const scenarioPath = path.join(
      root,
      ".agentplane",
      "recipes",
      manifestId,
      "scenarios",
      "recipe-scenario.json",
    );
    const scenario = JSON.parse(await readFile(scenarioPath, "utf8")) as Record<string, unknown>;
    delete scenario.goal;
    await writeFile(scenarioPath, JSON.stringify(scenario, null, 2), "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "scenario",
        "run",
        `${manifestId}:RECIPE_SCENARIO`,
        "--root",
        root,
      ]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Missing required field: scenario.goal");
    } finally {
      io.restore();
    }
  });

  it("scenario run prints a prepared run plan without executing tools", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive();
    const manifestId = String(manifest.id);

    await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "scenario",
        "run",
        `${manifestId}:RECIPE_SCENARIO`,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(`Prepared run plan: ${manifestId}:RECIPE_SCENARIO`);
      expect(io.stdout).toContain("Selection reasons:");
      expect(io.stdout).toContain("Status: scenario orchestration runtime is not implemented yet.");
    } finally {
      io.restore();
    }

    const runsRoot = path.join(root, ".agentplane", "recipes", manifestId, "runs");
    expect(await pathExists(runsRoot)).toBe(false);
    expect(
      await pathExists(path.join(root, ".agentplane", "recipes", manifestId, "artifact.txt")),
    ).toBe(false);
  });

  it("scenario run rejects missing scenario definition files", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive();
    const manifestId = String(manifest.id);

    await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root]);

    const scenarioPath = path.join(
      root,
      ".agentplane",
      "recipes",
      manifestId,
      "scenarios",
      "recipe-scenario.json",
    );
    await rm(scenarioPath, { force: true });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "scenario",
        "run",
        `${manifestId}:RECIPE_SCENARIO`,
        "--root",
        root,
      ]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("Scenario definition not found");
    } finally {
      io.restore();
    }
  });

  it("scenario rejects unknown subcommands", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["scenario", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unknown scenario subcommand");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane scenario");
      expect(io.stderr).toContain("agentplane help scenario --compact");
    } finally {
      io.restore();
    }
  });

  it("scenario rejects missing subcommand and extra args", async () => {
    const ioMissing = captureStdIO();
    try {
      const code = await runCli(["scenario"]);
      expect(code).toBe(2);
      expect(ioMissing.stderr).toContain("Missing scenario subcommand");
      expect(ioMissing.stderr).toContain("Usage:");
      expect(ioMissing.stderr).toContain("agentplane scenario");
      expect(ioMissing.stderr).toContain("agentplane help scenario --compact");
    } finally {
      ioMissing.restore();
    }

    const ioExtra = captureStdIO();
    try {
      const code = await runCli(["scenario", "list", "extra"]);
      expect(code).toBe(2);
      expect(ioExtra.stderr).toContain("Unexpected argument: extra");
      expect(ioExtra.stderr).toContain("Usage:");
      expect(ioExtra.stderr).toContain("agentplane scenario list");
      expect(ioExtra.stderr).toContain("agentplane help scenario list --compact");
    } finally {
      ioExtra.restore();
    }
  });

  it("scenario info and run reject missing ids", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const ioInfo = captureStdIO();
    try {
      const code = await runCli(["scenario", "info", "--root", root]);
      expect(code).toBe(2);
      expect(ioInfo.stderr).toContain("Missing required argument");
      expect(ioInfo.stderr).toContain("Usage:");
      expect(ioInfo.stderr).toContain("agentplane scenario info");
      expect(ioInfo.stderr).toContain("agentplane help scenario info --compact");
    } finally {
      ioInfo.restore();
    }

    const ioRun = captureStdIO();
    try {
      const code = await runCli(["scenario", "run", "--root", root]);
      expect(code).toBe(2);
      expect(ioRun.stderr).toContain("Missing required argument");
      expect(ioRun.stderr).toContain("Usage:");
      expect(ioRun.stderr).toContain("agentplane scenario run");
      expect(ioRun.stderr).toContain("agentplane help scenario run --compact");
    } finally {
      ioRun.restore();
    }
  });
});
