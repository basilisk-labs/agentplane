import { execFile } from "node:child_process";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { atomicWriteFile, resolveProject } from "@agentplaneorg/core";

import { mapCoreError } from "../cli/error-map.js";
import { fileExists, getPathKind } from "../cli/fs-utils.js";
import { emptyStateMessage, usageMessage } from "../cli/output.js";
import { CliError } from "../shared/errors.js";
import { dedupeStrings } from "../shared/strings.js";
import {
  RECIPES_DIR_NAME,
  RECIPES_SCENARIOS_DIR_NAME,
  RECIPES_SCENARIOS_INDEX_NAME,
  normalizeScenarioToolStep,
  readInstalledRecipesFile,
  readRecipeManifest,
  readScenarioDefinition,
  readScenarioIndex,
  resolveInstalledRecipeDir,
  resolveInstalledRecipesPath,
  resolveProjectRecipesCacheDir,
  type ScenarioDefinition,
} from "./recipes.js";

const execFileAsync = promisify(execFile);

const SCENARIO_USAGE = "Usage: agentplane scenario <list|info|run> [args]";
const SCENARIO_USAGE_EXAMPLE = "agentplane scenario list";
const SCENARIO_INFO_USAGE = "Usage: agentplane scenario info <recipe:scenario>";
const SCENARIO_INFO_USAGE_EXAMPLE = "agentplane scenario info viewer:demo";
const SCENARIO_RUN_USAGE = "Usage: agentplane scenario run <recipe:scenario>";
const SCENARIO_RUN_USAGE_EXAMPLE = "agentplane scenario run viewer:demo";
const SCENARIO_REPORT_NAME = "report.json";

type ScenarioRunGitSummary = {
  diff_stat?: string;
  staged_stat?: string;
  status?: string[];
};

type ScenarioRunReportStep = {
  step: number;
  tool: string;
  runtime: string;
  entrypoint: string;
  args: string[];
  env_keys: string[];
  exit_code: number;
  duration_ms: number;
};

type ScenarioRunReport = {
  schema_version: 1;
  recipe: string;
  scenario: string;
  run_id: string;
  started_at: string;
  ended_at: string;
  status: "success" | "failed";
  steps: ScenarioRunReportStep[];
  git?: ScenarioRunGitSummary;
};

const SENSITIVE_ARG_FLAGS = new Set([
  "--token",
  "--secret",
  "--password",
  "--api-key",
  "--apikey",
  "--access-key",
  "--client-secret",
  "--auth",
  "--authorization",
  "--bearer",
]);

function redactArgs(args: string[]): string[] {
  const out = [...args];
  for (let i = 0; i < out.length; i++) {
    const arg = out[i];
    if (!arg) continue;
    const eqIndex = arg.indexOf("=");
    const flag = eqIndex === -1 ? arg : arg.slice(0, eqIndex);
    if (!SENSITIVE_ARG_FLAGS.has(flag)) continue;
    if (eqIndex !== -1) {
      out[i] = `${flag}=<redacted>`;
      continue;
    }
    out[i] = flag;
    if (i + 1 < out.length && !out[i + 1]?.startsWith("-")) {
      out[i + 1] = "<redacted>";
      i += 1;
    }
  }
  return out;
}

function isNotGitRepoError(err: unknown): boolean {
  if (err instanceof Error) {
    return err.message.startsWith("Not a git repository");
  }
  return false;
}

async function getGitDiffSummary(cwd: string): Promise<ScenarioRunGitSummary | undefined> {
  try {
    const [diff, staged, status] = await Promise.all([
      execFileAsync("git", ["diff", "--stat"], { cwd }),
      execFileAsync("git", ["diff", "--stat", "--staged"], { cwd }),
      execFileAsync("git", ["status", "--porcelain"], { cwd }),
    ]);
    const diffStat = String(diff.stdout).trim();
    const stagedStat = String(staged.stdout).trim();
    const statusLines = String(status.stdout).trim();
    return {
      diff_stat: diffStat || undefined,
      staged_stat: stagedStat || undefined,
      status: statusLines
        ? statusLines
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
        : [],
    };
  } catch (err) {
    if (isNotGitRepoError(err)) return undefined;
    return undefined;
  }
}

function collectScenarioEnvKeys(stepEnv: Record<string, string> | undefined): string[] {
  return dedupeStrings([
    ...Object.keys(stepEnv ?? {}),
    "AGENTPLANE_RUN_DIR",
    "AGENTPLANE_STEP_DIR",
    "AGENTPLANE_RECIPES_CACHE_DIR",
    "AGENTPLANE_RECIPE_ID",
    "AGENTPLANE_SCENARIO_ID",
    "AGENTPLANE_TOOL_ID",
  ]);
}

async function writeScenarioReport(opts: {
  runDir: string;
  recipeId: string;
  scenarioId: string;
  runId: string;
  startedAt: string;
  status: "success" | "failed";
  steps: ScenarioRunReportStep[];
  gitSummary?: ScenarioRunGitSummary;
}): Promise<void> {
  const report: ScenarioRunReport = {
    schema_version: 1,
    recipe: opts.recipeId,
    scenario: opts.scenarioId,
    run_id: opts.runId,
    started_at: opts.startedAt,
    ended_at: new Date().toISOString(),
    status: opts.status,
    steps: opts.steps,
    git: opts.gitSummary,
  };
  await atomicWriteFile(
    path.join(opts.runDir, SCENARIO_REPORT_NAME),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
}

async function cmdScenarioList(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  return await cmdScenarioListParsed(opts);
}

export async function cmdScenarioListParsed(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<number> {
  try {
    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const entries: { recipeId: string; scenarioId: string; summary?: string }[] = [];

    for (const recipe of installed.recipes) {
      const recipeDir = resolveInstalledRecipeDir(recipe);
      const scenariosDir = path.join(recipeDir, RECIPES_SCENARIOS_DIR_NAME);
      if ((await getPathKind(scenariosDir)) === "dir") {
        const files = await readdir(scenariosDir);
        const jsonFiles = files.filter((entry) => entry.toLowerCase().endsWith(".json")).toSorted();
        for (const file of jsonFiles) {
          const scenario = await readScenarioDefinition(path.join(scenariosDir, file));
          entries.push({ recipeId: recipe.id, scenarioId: scenario.id, summary: scenario.summary });
        }
        continue;
      }
      const scenariosIndexPath = path.join(recipeDir, RECIPES_SCENARIOS_INDEX_NAME);
      if (await fileExists(scenariosIndexPath)) {
        const index = await readScenarioIndex(scenariosIndexPath);
        for (const scenario of index.scenarios) {
          entries.push({
            recipeId: recipe.id,
            scenarioId: scenario.id,
            summary: scenario.summary,
          });
        }
      }
    }

    if (entries.length === 0) {
      process.stdout.write(
        `${emptyStateMessage("scenarios", "Install a recipe to add scenarios.")}\n`,
      );
      return 0;
    }

    const sorted = entries.toSorted((a, b) => {
      const byRecipe = a.recipeId.localeCompare(b.recipeId);
      if (byRecipe !== 0) return byRecipe;
      return a.scenarioId.localeCompare(b.scenarioId);
    });
    for (const entry of sorted) {
      process.stdout.write(
        `${entry.recipeId}:${entry.scenarioId} - ${entry.summary ?? "No summary"}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "scenario list", root: opts.rootOverride ?? null });
  }
}

async function cmdScenarioInfo(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const [recipeId, scenarioId] = opts.id.split(":");
    if (!recipeId || !scenarioId) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(SCENARIO_INFO_USAGE, SCENARIO_INFO_USAGE_EXAMPLE),
      });
    }
    return await cmdScenarioInfoParsed({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      recipeId,
      scenarioId,
    });
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "scenario info", root: opts.rootOverride ?? null });
  }
}

export async function cmdScenarioInfoParsed(opts: {
  cwd: string;
  rootOverride?: string;
  recipeId: string;
  scenarioId: string;
}): Promise<number> {
  const { recipeId, scenarioId } = opts;
  try {
    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const entry = installed.recipes.find((recipe) => recipe.id === recipeId);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${recipeId}`,
      });
    }
    const recipeDir = resolveInstalledRecipeDir(entry);
    const scenariosDir = path.join(recipeDir, RECIPES_SCENARIOS_DIR_NAME);
    let scenario: ScenarioDefinition | null = null;
    if ((await getPathKind(scenariosDir)) === "dir") {
      const files = await readdir(scenariosDir);
      const jsonFiles = files.filter((file) => file.toLowerCase().endsWith(".json")).toSorted();
      for (const file of jsonFiles) {
        const candidate = await readScenarioDefinition(path.join(scenariosDir, file));
        if (candidate.id === scenarioId) {
          scenario = candidate;
          break;
        }
      }
    }

    let summary: string | undefined;
    if (!scenario) {
      const scenariosIndexPath = path.join(recipeDir, RECIPES_SCENARIOS_INDEX_NAME);
      if (await fileExists(scenariosIndexPath)) {
        const index = await readScenarioIndex(scenariosIndexPath);
        const entrySummary = index.scenarios.find((item) => item.id === scenarioId);
        summary = entrySummary?.summary;
      }
    }

    if (!scenario && !summary) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Scenario not found: ${recipeId}:${scenarioId}`,
      });
    }

    process.stdout.write(`Scenario: ${recipeId}:${scenarioId}\n`);
    if (summary) process.stdout.write(`Summary: ${summary}\n`);
    if (!scenario) {
      process.stdout.write("Details: Scenario definition not found in recipe.\n");
      return 0;
    }

    if (scenario.summary) process.stdout.write(`Summary: ${scenario.summary}\n`);
    if (scenario.description) process.stdout.write(`Description: ${scenario.description}\n`);
    process.stdout.write(`Goal: ${scenario.goal}\n`);
    process.stdout.write(`Inputs: ${JSON.stringify(scenario.inputs, null, 2)}\n`);
    process.stdout.write(`Outputs: ${JSON.stringify(scenario.outputs, null, 2)}\n`);
    process.stdout.write("Steps:\n");
    let stepIndex = 1;
    for (const step of scenario.steps) {
      process.stdout.write(`  ${stepIndex}. ${JSON.stringify(step)}\n`);
      stepIndex += 1;
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "scenario info", root: opts.rootOverride ?? null });
  }
}

async function executeRecipeTool(opts: {
  runtime: "node" | "bash";
  entrypoint: string;
  args: string[];
  cwd: string;
  env: Record<string, string>;
}): Promise<{ exitCode: number; stdout: string; stderr: string }> {
  try {
    const command = opts.runtime === "node" ? "node" : "bash";
    const { stdout, stderr } = await execFileAsync(command, [opts.entrypoint, ...opts.args], {
      cwd: opts.cwd,
      env: opts.env,
    });
    return { exitCode: 0, stdout: String(stdout), stderr: String(stderr) };
  } catch (err) {
    let execErr: { code?: number; stdout?: string; stderr?: string } | null = null;
    if (err && typeof err === "object") {
      execErr = err as { code?: number; stdout?: string; stderr?: string };
    }
    const exitCode = typeof execErr?.code === "number" ? execErr.code : 1;
    return {
      exitCode,
      stdout: String(execErr?.stdout ?? ""),
      stderr: String(execErr?.stderr ?? ""),
    };
  }
}

function sanitizeRunId(value: string): string {
  return value.replaceAll(/[^a-zA-Z0-9._-]/g, "_");
}

async function cmdScenarioRun(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const [recipeId, scenarioId] = opts.id.split(":");
    if (!recipeId || !scenarioId) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(SCENARIO_RUN_USAGE, SCENARIO_RUN_USAGE_EXAMPLE),
      });
    }
    return await cmdScenarioRunParsed({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      recipeId,
      scenarioId,
      resolved,
    });
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "scenario run", root: opts.rootOverride ?? null });
  }
}

export async function cmdScenarioRunParsed(opts: {
  cwd: string;
  rootOverride?: string;
  recipeId: string;
  scenarioId: string;
  resolved?: Awaited<ReturnType<typeof resolveProject>>;
}): Promise<number> {
  const resolved =
    opts.resolved ??
    (await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    }));
  const { recipeId, scenarioId } = opts;
  try {
    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const entry = installed.recipes.find((recipe) => recipe.id === recipeId);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${recipeId}`,
      });
    }
    const recipeDir = resolveInstalledRecipeDir(entry);
    const manifestPath = path.join(recipeDir, "manifest.json");
    const manifest = await readRecipeManifest(manifestPath);
    const scenariosDir = path.join(recipeDir, RECIPES_SCENARIOS_DIR_NAME);
    if ((await getPathKind(scenariosDir)) !== "dir") {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Scenario definitions not found for recipe: ${recipeId}`,
      });
    }
    let scenario: ScenarioDefinition | null = null;
    const files = await readdir(scenariosDir);
    const jsonFiles = files.filter((file) => file.toLowerCase().endsWith(".json")).toSorted();
    for (const file of jsonFiles) {
      const candidate = await readScenarioDefinition(path.join(scenariosDir, file));
      if (candidate.id === scenarioId) {
        scenario = candidate;
        break;
      }
    }
    if (!scenario) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Scenario not found: ${recipeId}:${scenarioId}`,
      });
    }

    const runsRoot = path.join(resolved.agentplaneDir, RECIPES_DIR_NAME, recipeId, "runs");
    await mkdir(runsRoot, { recursive: true });
    const recipesCacheDir = resolveProjectRecipesCacheDir(resolved);
    await mkdir(recipesCacheDir, { recursive: true });
    const runStartedAt = new Date().toISOString();
    const runId = `${new Date()
      .toISOString()
      .replaceAll(":", "-")
      .replaceAll(".", "-")}-${sanitizeRunId(scenarioId)}`;
    const runDir = path.join(runsRoot, runId);
    await mkdir(runDir, { recursive: true });

    const stepsMeta: {
      tool: string;
      runtime: string;
      entrypoint: string;
      exitCode: number;
      duration_ms: number;
    }[] = [];
    const stepsReport: ScenarioRunReportStep[] = [];

    for (let index = 0; index < scenario.steps.length; index++) {
      const step = normalizeScenarioToolStep(scenario.steps[index], `${recipeId}:${scenarioId}`);
      const toolEntry = manifest.tools?.find((tool) => tool?.id === step.tool);
      if (!toolEntry) {
        throw new CliError({
          exitCode: 5,
          code: "E_IO",
          message: `Tool not found in recipe manifest: ${step.tool}`,
        });
      }
      const runtime =
        toolEntry.runtime === "node" || toolEntry.runtime === "bash" ? toolEntry.runtime : "";
      const entrypoint = typeof toolEntry.entrypoint === "string" ? toolEntry.entrypoint : "";
      if (!runtime || !entrypoint) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Tool entry is missing runtime/entrypoint: ${step.tool}`,
        });
      }
      if (Array.isArray(toolEntry.permissions) && toolEntry.permissions.length > 0) {
        process.stdout.write(
          `Warning: tool ${toolEntry.id} declares permissions: ${toolEntry.permissions.join(", ")}\n`,
        );
      }

      const entrypointPath = path.join(recipeDir, entrypoint);
      if (!(await fileExists(entrypointPath))) {
        throw new CliError({
          exitCode: 5,
          code: "E_IO",
          message: `Tool entrypoint not found: ${entrypoint}`,
        });
      }

      const stepDir = path.join(runDir, `step-${index + 1}-${sanitizeRunId(step.tool)}`);
      await mkdir(stepDir, { recursive: true });

      const stepEnvKeys = collectScenarioEnvKeys(step.env);
      const env = {
        ...process.env,
        ...step.env,
        AGENTPLANE_RUN_DIR: runDir,
        AGENTPLANE_STEP_DIR: stepDir,
        AGENTPLANE_RECIPES_CACHE_DIR: recipesCacheDir,
        AGENTPLANE_RECIPE_ID: recipeId,
        AGENTPLANE_SCENARIO_ID: scenarioId,
        AGENTPLANE_TOOL_ID: step.tool,
      } as Record<string, string>;

      const startedAt = Date.now();
      const result = await executeRecipeTool({
        runtime,
        entrypoint: entrypointPath,
        args: step.args,
        cwd: recipeDir,
        env,
      });
      const durationMs = Date.now() - startedAt;
      await atomicWriteFile(path.join(stepDir, "stdout.log"), result.stdout, "utf8");
      await atomicWriteFile(path.join(stepDir, "stderr.log"), result.stderr, "utf8");
      stepsMeta.push({
        tool: step.tool,
        runtime,
        entrypoint,
        exitCode: result.exitCode,
        duration_ms: durationMs,
      });
      stepsReport.push({
        step: index + 1,
        tool: step.tool,
        runtime,
        entrypoint,
        args: redactArgs(step.args),
        env_keys: stepEnvKeys,
        exit_code: result.exitCode,
        duration_ms: durationMs,
      });

      if (result.exitCode !== 0) {
        const gitSummary = await getGitDiffSummary(resolved.gitRoot);
        await writeScenarioReport({
          runDir,
          recipeId,
          scenarioId,
          runId,
          startedAt: runStartedAt,
          status: "failed",
          steps: stepsReport,
          gitSummary,
        });
        await atomicWriteFile(
          path.join(runDir, "meta.json"),
          `${JSON.stringify(
            {
              recipe: recipeId,
              scenario: scenarioId,
              run_id: runId,
              steps: stepsMeta,
            },
            null,
            2,
          )}\n`,
          "utf8",
        );
        throw new CliError({
          exitCode: result.exitCode,
          code: "E_INTERNAL",
          message: `Scenario step failed: ${step.tool}`,
        });
      }
    }

    const gitSummary = await getGitDiffSummary(resolved.gitRoot);
    await writeScenarioReport({
      runDir,
      recipeId,
      scenarioId,
      runId,
      startedAt: runStartedAt,
      status: "success",
      steps: stepsReport,
      gitSummary,
    });
    await atomicWriteFile(
      path.join(runDir, "meta.json"),
      `${JSON.stringify(
        {
          recipe: recipeId,
          scenario: scenarioId,
          run_id: runId,
          steps: stepsMeta,
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    process.stdout.write(`Run artifacts: ${path.relative(resolved.gitRoot, runDir)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "scenario run", root: opts.rootOverride ?? null });
  }
}

export async function cmdScenario(opts: {
  cwd: string;
  rootOverride?: string;
  command?: string;
  args: string[];
}): Promise<number> {
  const sub = opts.command;
  if (!sub) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(SCENARIO_USAGE, SCENARIO_USAGE_EXAMPLE),
    });
  }
  if (sub === "list") {
    if (opts.args.length > 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(SCENARIO_USAGE, SCENARIO_USAGE_EXAMPLE),
      });
    }
    return await cmdScenarioList({ cwd: opts.cwd, rootOverride: opts.rootOverride });
  }
  if (sub === "info") {
    if (opts.args.length !== 1) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(SCENARIO_INFO_USAGE, SCENARIO_INFO_USAGE_EXAMPLE),
      });
    }
    return await cmdScenarioInfo({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      id: opts.args[0],
    });
  }
  if (sub === "run") {
    if (opts.args.length !== 1) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(SCENARIO_RUN_USAGE, SCENARIO_RUN_USAGE_EXAMPLE),
      });
    }
    return await cmdScenarioRun({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      id: opts.args[0],
    });
  }

  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message: usageMessage(SCENARIO_USAGE, SCENARIO_USAGE_EXAMPLE),
  });
}
