import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  createRecipeArchive,
  getAgentplaneHome,
  mkGitRepoRoot,
  pathExists,
  registerAgentplaneHome,
  resetAgentplaneHomeRecipes,
  writeDefaultConfig,
} from "./run-cli.test-helpers.js";

registerAgentplaneHome();

const agentplaneHomePath = () => getAgentplaneHome() ?? "";

describe("runCli scenario", () => {
  it("scenario list and info read installed recipe scenarios", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive();
    const manifestId = String(manifest.id);

    await runCli(["recipes", "install", "--path", archivePath, "--root", root]);

    const ioList = captureStdIO();
    try {
      const code = await runCli(["scenario", "list", "--root", root]);
      expect(code).toBe(0);
      expect(ioList.stdout).toContain(`${manifestId}:RECIPE_SCENARIO`);
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
      expect(ioInfo.stdout).toContain("Goal:");
      expect(ioInfo.stdout).toContain("Inputs:");
      expect(ioInfo.stdout).toContain("Outputs:");
      expect(ioInfo.stdout).toContain("Steps:");
    } finally {
      ioInfo.restore();
    }
  });

  it("scenario list rejects invalid env blocks", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await resetAgentplaneHomeRecipes();
    const { archivePath, manifest } = await createRecipeArchive();
    const manifestId = String(manifest.id);
    const manifestVersion = String(manifest.version);

    await runCli(["recipes", "install", "--path", archivePath, "--root", root]);

    const scenariosDir = path.join(
      agentplaneHomePath(),
      "recipes",
      manifestId,
      manifestVersion,
      "scenarios",
    );
    await mkdir(scenariosDir, { recursive: true });
    const scenarioPath = path.join(scenariosDir, "recipe-scenario.json");
    if (!(await pathExists(scenarioPath))) {
      await writeFile(
        scenarioPath,
        JSON.stringify(
          {
            schema_version: "1",
            id: "RECIPE_SCENARIO",
            summary: "Recipe scenario",
            goal: "Preview installed tasks.",
            inputs: [{ name: "task_id", type: "string" }],
            outputs: [{ name: "report", type: "html" }],
            steps: [{ tool: "RECIPE_TOOL" }],
          },
          null,
          2,
        ),
        "utf8",
      );
    }
    const scenario = JSON.parse(await readFile(scenarioPath, "utf8")) as Record<string, unknown>;
    scenario.steps = [{ tool: "RECIPE_TOOL", env: ["bad"] }];
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
      expect(code).toBe(4);
      expect(io.stderr).toContain("scenario step env must be an object");
    } finally {
      io.restore();
    }
  });

  it("scenario list rejects non-string env values", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await resetAgentplaneHomeRecipes();
    const { archivePath, manifest } = await createRecipeArchive();
    const manifestId = String(manifest.id);
    const manifestVersion = String(manifest.version);

    await runCli(["recipes", "install", "--path", archivePath, "--root", root]);

    const scenariosDir = path.join(
      agentplaneHomePath(),
      "recipes",
      manifestId,
      manifestVersion,
      "scenarios",
    );
    await mkdir(scenariosDir, { recursive: true });
    const scenarioPath = path.join(scenariosDir, "recipe-scenario.json");
    if (!(await pathExists(scenarioPath))) {
      await writeFile(
        scenarioPath,
        JSON.stringify(
          {
            schema_version: "1",
            id: "RECIPE_SCENARIO",
            summary: "Recipe scenario",
            goal: "Preview installed tasks.",
            inputs: [{ name: "task_id", type: "string" }],
            outputs: [{ name: "report", type: "html" }],
            steps: [{ tool: "RECIPE_TOOL" }],
          },
          null,
          2,
        ),
        "utf8",
      );
    }
    const scenario = JSON.parse(await readFile(scenarioPath, "utf8")) as Record<string, unknown>;
    scenario.steps = [{ tool: "RECIPE_TOOL", env: { KEY: 123 } }];
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
      expect(code).toBe(4);
      expect(io.stderr).toContain("scenario step env values must be strings");
    } finally {
      io.restore();
    }
  });

  it("scenario run executes tools and writes artifacts", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive();
    const manifestId = String(manifest.id);

    await runCli(["recipes", "install", "--path", archivePath, "--root", root]);

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
      expect(io.stdout).toContain("Run artifacts:");
    } finally {
      io.restore();
    }

    const runsRoot = path.join(root, ".agentplane", "recipes", manifestId, "runs");
    const runs = await readdir(runsRoot);
    expect(runs.length).toBeGreaterThan(0);
    const runDir = path.join(runsRoot, runs[0]);
    const artifactPath = path.join(runDir, "artifact.txt");
    expect(await pathExists(artifactPath)).toBe(true);
  }, 15000);

  it("scenario rejects unknown subcommands", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["scenario", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane scenario");
    } finally {
      io.restore();
    }
  });

  it("scenario rejects missing subcommand and extra args", async () => {
    const ioMissing = captureStdIO();
    try {
      const code = await runCli(["scenario"]);
      expect(code).toBe(2);
      expect(ioMissing.stderr).toContain("Usage: agentplane scenario");
    } finally {
      ioMissing.restore();
    }

    const ioExtra = captureStdIO();
    try {
      const code = await runCli(["scenario", "list", "extra"]);
      expect(code).toBe(2);
      expect(ioExtra.stderr).toContain("Usage: agentplane scenario");
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
      expect(ioInfo.stderr).toContain("Usage: agentplane scenario info");
    } finally {
      ioInfo.restore();
    }

    const ioRun = captureStdIO();
    try {
      const code = await runCli(["scenario", "run", "--root", root]);
      expect(code).toBe(2);
      expect(ioRun.stderr).toContain("Usage: agentplane scenario run");
    } finally {
      ioRun.restore();
    }
  });
});
