import { execFile } from "node:child_process";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { atomicWriteFile, resolveProject } from "@agentplaneorg/core";

import { mapCoreError } from "../../../cli/error-map.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { fileExists, getPathKind } from "../../../cli/fs-utils.js";
import { emptyStateMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";
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
} from "../../recipes.js";

import {
  collectScenarioEnvKeys,
  getGitDiffSummary,
  redactArgs,
  writeScenarioReport,
  type ScenarioRunReportStep,
} from "./report.js";

const execFileAsync = promisify(execFile);

type RecipeToolRuntime = "node" | "bash";

type RecipeToolInvocation = {
  command: string;
  args: string[];
};

export function resolveRecipeToolInvocation(
  runtime: RecipeToolRuntime,
  entrypoint: string,
  args: string[],
): RecipeToolInvocation {
  if (runtime === "node") {
    return { command: "node", args: [entrypoint, ...args] };
  }
  return {
    command: "bash",
    args: [entrypoint, ...args],
  };
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
        exitCode: exitCodeForError("E_IO"),
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
        exitCode: exitCodeForError("E_IO"),
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

export async function executeRecipeTool(opts: {
  runtime: RecipeToolRuntime;
  entrypoint: string;
  args: string[];
  cwd: string;
  env: Record<string, string>;
}): Promise<{ exitCode: number; stdout: string; stderr: string }> {
  const { command, args } = resolveRecipeToolInvocation(opts.runtime, opts.entrypoint, opts.args);
  try {
    const { stdout, stderr } = await execFileAsync(command, args, {
      cwd: opts.cwd,
      env: opts.env,
    });
    return { exitCode: 0, stdout: String(stdout), stderr: String(stderr) };
  } catch (err) {
    const rawCode =
      err && typeof err === "object" && "code" in err
        ? (err as { code?: number | string }).code
        : undefined;
    const code = typeof rawCode === "number" ? rawCode : undefined;
    const isCommandNotFound = rawCode === "ENOENT" || code === 127;
    let execErr: { code?: number; stdout?: string; stderr?: string } | null = null;
    if (err && typeof err === "object") {
      execErr = err as { code?: number; stdout?: string; stderr?: string };
    }
    const exitCode = typeof execErr?.code === "number" ? execErr.code : 1;
    let stderrText = String(execErr?.stderr ?? "");
    const isMissingNodeEntrypoint =
      command === "node" &&
      /Cannot find module/i.test(stderrText) &&
      (stderrText.includes(opts.entrypoint) || stderrText.includes(`${opts.entrypoint}.js`));
    if (isMissingNodeEntrypoint && !isCommandNotFound) {
      const runtimeLabel = opts.entrypoint.replace(/\.(js|mjs|cjs)$/, "");
      stderrText = `Runtime command not found: ${runtimeLabel}`;
      return {
        exitCode: 1,
        stdout: "",
        stderr: stderrText,
      };
    }
    if (isCommandNotFound && !stderrText) {
      stderrText = `Runtime command not found: ${command}`;
    }
    return {
      exitCode,
      stdout: String(execErr?.stdout ?? ""),
      stderr: stderrText,
    };
  }
}

function sanitizeRunId(value: string): string {
  return value.replaceAll(/[^a-zA-Z0-9._-]/g, "_");
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
        exitCode: exitCodeForError("E_IO"),
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
        exitCode: exitCodeForError("E_IO"),
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
        exitCode: exitCodeForError("E_IO"),
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
          exitCode: exitCodeForError("E_IO"),
          code: "E_IO",
          message: `Tool not found in recipe manifest: ${step.tool}`,
        });
      }
      const runtime =
        toolEntry.runtime === "node" || toolEntry.runtime === "bash"
          ? (toolEntry.runtime as RecipeToolRuntime)
          : "";
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
          exitCode: exitCodeForError("E_IO"),
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
