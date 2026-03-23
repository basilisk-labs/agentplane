import { chmod, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { defaultConfig, readTask } from "@agentplaneorg/core";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  createRecipeArchive,
  mkGitRepoRoot,
  pathExists,
  registerAgentplaneHome,
  runCliSilent,
  silenceStdIO,
  writeConfig,
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
      expect(ioInfo.stdout).toContain("Task template:");
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

  it("scenario info rejects invalid task_template definitions with a precise error", async () => {
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
    scenario.task_template = {
      title: "Broken template",
      description: "Broken template",
      owner: 123,
    };
    await writeFile(scenarioPath, JSON.stringify(scenario, null, 2), "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "scenario",
        "info",
        `${manifestId}:RECIPE_SCENARIO`,
        "--root",
        root,
      ]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Invalid field scenario.task_template.owner");
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
      expect(io.stdout).toContain("Status: preview only; no task created and no runner executed.");
      expect(io.stdout).toContain(
        `Next: use \`agentplane scenario execute ${manifestId}:RECIPE_SCENARIO\` to materialize and run this scenario.`,
      );
    } finally {
      io.restore();
    }

    const runsRoot = path.join(root, ".agentplane", "recipes", manifestId, "runs");
    expect(await pathExists(runsRoot)).toBe(false);
    expect(
      await pathExists(path.join(root, ".agentplane", "recipes", manifestId, "artifact.txt")),
    ).toBe(false);
  });

  it("scenario execute materializes a task and runs the shared runner with recipe context", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive();
    const manifestId = String(manifest.id);
    await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root]);

    const fakeBinDir = path.join(root, "bin");
    const fakeCodexPath = path.join(fakeBinDir, "codex");
    await mkdir(fakeBinDir, { recursive: true });
    await writeFile(
      fakeCodexPath,
      [
        "#!/bin/sh",
        'out=""',
        'while [ "$#" -gt 0 ]; do',
        '  case "$1" in',
        "    exec|--json|-|danger-full-access|never)",
        "      shift",
        "      ;;",
        "    --output-last-message|-C|-s|-a)",
        '      if [ "$1" = "--output-last-message" ]; then out="$2"; fi',
        "      shift 2",
        "      ;;",
        "    *)",
        "      shift",
        "      ;;",
        "  esac",
        "done",
        "cat >/dev/null",
        String.raw`printf '{"type":"session.started"}\n'`,
        String.raw`printf 'scenario execute final message\n' > "$out"`,
        String.raw`printf 'scenario execute stdout\n'`,
        "exit 0",
      ].join("\n"),
      "utf8",
    );
    await chmod(fakeCodexPath, 0o755);

    const io = captureStdIO();
    const originalPath = process.env.PATH;
    try {
      process.env.PATH = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`;
      const code = await runCli([
        "scenario",
        "execute",
        `${manifestId}:RECIPE_SCENARIO`,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(`scenario executed: ${manifestId}:RECIPE_SCENARIO`);
      expect(io.stdout).toContain("status: success");
      expect(io.stdout).toContain("runner_exit_code: 0");

      const taskIdMatch = /^task_id: (.+)$/m.exec(io.stdout);
      expect(taskIdMatch?.[1]).toBeTruthy();
      const taskId = taskIdMatch?.[1] ?? "";
      const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
      const readme = await readFile(readmePath, "utf8");
      expect(readme).toContain('status: "DOING"');
      expect(readme).toContain(`recipe_id: "${manifestId}"`);
      expect(readme).toContain('scenario_id: "RECIPE_SCENARIO"');
      expect(readme).toContain(
        `Start: execute recipe scenario ${manifestId}:RECIPE_SCENARIO through the shared runner`,
      );

      const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
      const runEntries = await readdir(runsRoot);
      const sortedRunEntries = runEntries.toSorted();
      expect(sortedRunEntries).toHaveLength(1);
      const runDir = path.join(runsRoot, sortedRunEntries[0] ?? "");
      const bundle = JSON.parse(await readFile(path.join(runDir, "bundle.json"), "utf8")) as {
        base_prompts?: { id?: string; source?: string }[];
        target: { kind: string; recipe_id?: string; scenario_id?: string; task_id?: string };
        recipe?: { recipe_id?: string; scenario_id?: string };
      };
      expect(bundle.target).toEqual({
        kind: "recipe_scenario",
        recipe_id: manifestId,
        scenario_id: "RECIPE_SCENARIO",
        task_id: taskId,
      });
      expect(bundle.recipe).toMatchObject({
        recipe_id: manifestId,
        scenario_id: "RECIPE_SCENARIO",
      });
      expect(bundle.base_prompts?.map((prompt) => prompt.id)).toEqual(
        expect.arrayContaining([
          "base.framework_runner",
          "base.policy_gateway",
          "base.owner_profile",
          "recipe.execution_context",
          "recipe.agent.RECIPE_AGENT",
          "recipe.skill.RECIPE_SKILL",
          "recipe.tools_summary",
        ]),
      );
      expect(
        bundle.base_prompts?.find((prompt) => prompt.id === "recipe.agent.RECIPE_AGENT")?.source,
      ).toBe(`.agentplane/recipes/${manifestId}/agents/recipe.json`);

      const task = await readTask({ cwd: root, rootOverride: root, taskId });
      expect(task.frontmatter.verification?.state).toBe("pending");
      expect(task.frontmatter.runner).toMatchObject({
        status: "success",
        adapter_id: "codex",
        mode: "execute",
        target: {
          kind: "recipe_scenario",
          recipe_id: manifestId,
          scenario_id: "RECIPE_SCENARIO",
          task_id: taskId,
        },
      });
      expect(task.body).toContain("RUNNER — success");
      expect(task.body).toContain(`Target: recipe ${manifestId}:RECIPE_SCENARIO -> task ${taskId}`);
    } finally {
      process.env.PATH = originalPath;
      io.restore();
    }
  });

  it("scenario execute exports resolved recipe run_profile policy to the custom runner", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = {
      command: ["custom-runner"],
    };
    await writeConfig(root, config);
    const { archivePath, manifest } = await createRecipeArchive();
    const manifestId = String(manifest.id);
    await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root]);

    const fakeBinDir = path.join(root, "bin");
    const fakeRunnerPath = path.join(fakeBinDir, "custom-runner");
    await mkdir(fakeBinDir, { recursive: true });
    await writeFile(
      fakeRunnerPath,
      [
        "#!/bin/sh",
        "node <<'NODE'",
        'const fs = require("node:fs");',
        "const out = {",
        "  recipe_id: process.env.AGENTPLANE_RECIPE_ID ?? null,",
        "  scenario_id: process.env.AGENTPLANE_SCENARIO_ID ?? null,",
        "  mode: process.env.AGENTPLANE_RECIPE_MODE ?? null,",
        "  sandbox: process.env.AGENTPLANE_RECIPE_SANDBOX ?? null,",
        "  network: process.env.AGENTPLANE_RECIPE_NETWORK ?? null,",
        "  requires_human_approval: process.env.AGENTPLANE_RECIPE_REQUIRES_HUMAN_APPROVAL ?? null,",
        "  expected_exit_contract: process.env.AGENTPLANE_RECIPE_EXPECTED_EXIT_CONTRACT ?? null,",
        '  writes_artifacts_to: JSON.parse(process.env.AGENTPLANE_RECIPE_WRITES_ARTIFACTS_TO ?? "[]"),',
        '  permissions: JSON.parse(process.env.AGENTPLANE_RECIPE_PERMISSIONS ?? "[]"),',
        '  agents_involved: JSON.parse(process.env.AGENTPLANE_RECIPE_AGENTS_INVOLVED ?? "[]"),',
        '  skills_used: JSON.parse(process.env.AGENTPLANE_RECIPE_SKILLS_USED ?? "[]"),',
        '  tools_used: JSON.parse(process.env.AGENTPLANE_RECIPE_TOOLS_USED ?? "[]"),',
        '  required_inputs: JSON.parse(process.env.AGENTPLANE_RECIPE_REQUIRED_INPUTS ?? "[]"),',
        '  outputs: JSON.parse(process.env.AGENTPLANE_RECIPE_OUTPUTS ?? "[]"),',
        '  artifacts: JSON.parse(process.env.AGENTPLANE_RECIPE_ARTIFACTS ?? "[]"),',
        '  run_profile: JSON.parse(process.env.AGENTPLANE_RECIPE_RUN_PROFILE ?? "{}"),',
        "};",
        "fs.writeFileSync(",
        '  process.env.AGENTPLANE_RUNNER_RUN_DIR + "/recipe-env.json",',
        "  JSON.stringify(out, null, 2),",
        ");",
        "NODE",
        String.raw`printf '{"schema_version":1,"summary":"custom scenario ok","capabilities_used":["custom.recipe"]}\n' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
        "cat >/dev/null",
        "exit 0",
      ].join("\n"),
      "utf8",
    );
    await chmod(fakeRunnerPath, 0o755);

    const io = captureStdIO();
    const originalPath = process.env.PATH;
    try {
      process.env.PATH = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`;
      const code = await runCli([
        "scenario",
        "execute",
        `${manifestId}:RECIPE_SCENARIO`,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(`scenario executed: ${manifestId}:RECIPE_SCENARIO`);
      expect(io.stdout).toContain("status: success");

      const taskIdMatch = /^task_id: (.+)$/m.exec(io.stdout);
      expect(taskIdMatch?.[1]).toBeTruthy();
      const taskId = taskIdMatch?.[1] ?? "";

      const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
      const runEntries = await readdir(runsRoot);
      const sortedRunEntries = runEntries.toSorted();
      expect(sortedRunEntries).toHaveLength(1);
      const runDir = path.join(runsRoot, sortedRunEntries[0] ?? "");
      const recipeEnv = JSON.parse(
        await readFile(path.join(runDir, "recipe-env.json"), "utf8"),
      ) as {
        recipe_id?: string;
        scenario_id?: string;
        mode?: string;
        sandbox?: string;
        network?: string;
        requires_human_approval?: string;
        expected_exit_contract?: string;
        writes_artifacts_to?: string[];
        permissions?: string[];
        agents_involved?: string[];
        skills_used?: string[];
        tools_used?: string[];
        required_inputs?: string[];
        outputs?: string[];
        artifacts?: string[];
        run_profile?: Record<string, unknown>;
      };
      expect(recipeEnv).toMatchObject({
        recipe_id: manifestId,
        scenario_id: "RECIPE_SCENARIO",
        mode: "analysis",
        sandbox: "workspace-write",
        network: "false",
        requires_human_approval: "false",
        expected_exit_contract: "report",
        writes_artifacts_to: ["logs/", "reports/"],
        permissions: ["filesystem-write"],
        agents_involved: ["RECIPE_AGENT"],
        skills_used: ["RECIPE_SKILL"],
        tools_used: ["RECIPE_TOOL"],
        required_inputs: ["task_id"],
        outputs: ["report"],
        artifacts: ["artifact.txt"],
      });
      expect(recipeEnv.run_profile).toMatchObject({
        mode: "analysis",
        sandbox: "workspace-write",
        network: false,
        requires_human_approval: false,
        writes_artifacts_to: ["logs/", "reports/"],
        expected_exit_contract: "report",
        permissions: ["filesystem-write"],
        agents_involved: ["RECIPE_AGENT"],
        skills_used: ["RECIPE_SKILL"],
        tools_used: ["RECIPE_TOOL"],
        required_inputs: ["task_id"],
        outputs: ["report"],
        artifacts: ["artifact.txt"],
      });
    } finally {
      process.env.PATH = originalPath;
      io.restore();
    }
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
