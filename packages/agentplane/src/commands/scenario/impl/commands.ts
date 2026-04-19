import path from "node:path";

import { resolveProject, runProcess, type ResolvedProject } from "@agentplaneorg/core";

import { mapCoreError } from "../../../cli/error-map.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { fileExists } from "../../../cli/fs-utils.js";
import { createCliEmitter, emptyStateMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";
import {
  listResolvedRecipeScenarios,
  readProjectInstalledRecipes,
  readScenarioDefinition,
  resolveRecipeScenarioSelection,
  type ScenarioDefinition,
} from "../../recipes.js";

const output = createCliEmitter();

type RecipeToolRuntime = "node" | "bash";

type RecipeToolInvocation = {
  command: string;
  args: string[];
};

type ScenarioCliSelection = Awaited<ReturnType<typeof resolveRecipeScenarioSelection>>;

function buildScenarioNotFoundError(recipeId: string, scenarioId: string): CliError {
  return new CliError({
    exitCode: exitCodeForError("E_IO"),
    code: "E_IO",
    message: `Scenario not found: ${recipeId}:${scenarioId}`,
  });
}

async function resolveScenarioForCli(opts: {
  project: ResolvedProject;
  recipeId: string;
  scenarioId: string;
}): Promise<{
  entry: Awaited<ReturnType<typeof readProjectInstalledRecipes>>["recipes"][number];
  selection: ScenarioCliSelection;
}> {
  const installed = await readProjectInstalledRecipes(opts.project);
  const entry = installed.recipes.find((recipe) => recipe.id === opts.recipeId);
  if (!entry) {
    throw new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message: `Recipe not installed: ${opts.recipeId}`,
    });
  }
  try {
    const selection = await resolveRecipeScenarioSelection({
      project: opts.project,
      flags: {
        recipeId: opts.recipeId,
        scenarioId: opts.scenarioId,
        includeIncompatible: true,
      },
    });
    return { entry, selection };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.startsWith("No recipe scenario matches")) {
      throw buildScenarioNotFoundError(opts.recipeId, opts.scenarioId);
    }
    if (message.startsWith("Scenario definition not found")) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message,
      });
    }
    if (message.startsWith("Scenario selection is ambiguous")) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message,
      });
    }
    if (
      message.startsWith("Missing required field: scenario.") ||
      message.startsWith("Invalid field scenario.") ||
      message.startsWith("Scenario definition id mismatch:")
    ) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message,
      });
    }
    throw error;
  }
}

async function readValidatedScenarioDefinition(opts: {
  selection: ScenarioCliSelection;
}): Promise<ScenarioDefinition> {
  if (!(await fileExists(opts.selection.scenario_file))) {
    throw new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message: `Scenario definition not found: ${opts.selection.scenario_file}`,
    });
  }
  try {
    const scenario = await readScenarioDefinition(opts.selection.scenario_file);
    if (scenario.id !== opts.selection.scenario_id) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message:
          `Scenario definition id mismatch: manifest expects ${opts.selection.scenario_id}, ` +
          `file defines ${scenario.id}`,
      });
    }
    return scenario;
  } catch (error) {
    if (error instanceof CliError) throw error;
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

async function validateScenarioRecipeFiles(opts: {
  entry: Awaited<ReturnType<typeof readProjectInstalledRecipes>>["recipes"][number];
  selection: ScenarioCliSelection;
}): Promise<string[]> {
  const checks: string[] = [];
  const agents = opts.entry.manifest.agents ?? [];
  const skills = opts.entry.manifest.skills ?? [];
  const tools = opts.entry.manifest.tools ?? [];

  const selectedAgents = agents.filter((agent) =>
    opts.selection.agents_involved.includes(agent.id),
  );
  const selectedSkills = skills.filter((skill) => opts.selection.skills_used.includes(skill.id));
  const selectedTools = tools.filter((tool) => opts.selection.tools_used.includes(tool.id));

  for (const agent of selectedAgents) {
    const agentFile = path.join(opts.selection.recipe_dir, agent.file);
    if (!(await fileExists(agentFile))) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message: `Recipe agent file not found: ${agent.file}`,
      });
    }
  }
  checks.push(`agent files ok: ${selectedAgents.length}`);

  for (const skill of selectedSkills) {
    const skillFile = path.join(opts.selection.recipe_dir, skill.file);
    if (!(await fileExists(skillFile))) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message: `Recipe skill file not found: ${skill.file}`,
      });
    }
  }
  checks.push(`skill files ok: ${selectedSkills.length}`);

  for (const tool of selectedTools) {
    const toolEntrypoint = path.join(opts.selection.recipe_dir, tool.entrypoint);
    if (!(await fileExists(toolEntrypoint))) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message: `Tool entrypoint not found: ${tool.entrypoint}`,
      });
    }
  }
  checks.push(`tool entrypoints ok: ${selectedTools.length}`);

  return checks;
}

function assertScenarioCompatibility(selection: ScenarioCliSelection): void {
  if (selection.compatibility.ok) return;
  const reasons = selection.compatibility.failures
    .map((failure) => `- ${failure.reason}`)
    .join("\n");
  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message: `Scenario is not compatible with the current runtime:\n${reasons}`,
  });
}

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
    const project = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const entries = await listResolvedRecipeScenarios({
      project,
      includeIncompatible: true,
    });

    if (entries.length === 0) {
      output.line(emptyStateMessage("scenarios", "Install a recipe to add scenarios."));
      return 0;
    }

    for (const entry of entries) {
      const compatibilityLabel = entry.compatibility.ok ? "compatible" : "incompatible";
      output.line(
        `${entry.recipe_id}:${entry.scenario_id} - ${entry.scenario_summary} ` +
          `[mode=${entry.run_profile.mode}] [${compatibilityLabel}]`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes scenario list", root: opts.rootOverride ?? null });
  }
}

export async function cmdScenarioInfoParsed(opts: {
  cwd: string;
  rootOverride?: string;
  recipeId: string;
  scenarioId: string;
}): Promise<number> {
  try {
    const project = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const { selection } = await resolveScenarioForCli({
      project,
      recipeId: opts.recipeId,
      scenarioId: opts.scenarioId,
    });

    output.line(`Scenario: ${selection.recipe_id}:${selection.scenario_id}`);
    output.line(
      `Recipe: ${selection.recipe_name} (${selection.recipe_id}@${selection.recipe_version})`,
    );
    output.line(`Summary: ${selection.scenario_summary}`);
    if (selection.scenario_description) {
      output.line(`Description: ${selection.scenario_description}`);
    }
    output.jsonSection("Use when", selection.use_when);
    if (selection.avoid_when.length > 0) {
      output.jsonSection("Avoid when", selection.avoid_when);
    }
    output.jsonSection("Run profile", selection.run_profile);
    output.jsonSection("Task template", selection.task_template);
    output.line(`Scenario file: ${path.relative(project.gitRoot, selection.scenario_file)}`);
    if (selection.compatibility.ok) {
      output.line("Compatibility: satisfied");
    } else {
      output.jsonSection("Compatibility failures", selection.compatibility.failures);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes scenario info", root: opts.rootOverride ?? null });
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
    const { stdout, stderr } = await runProcess({
      command,
      args,
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

export async function cmdScenarioRunParsed(opts: {
  cwd: string;
  rootOverride?: string;
  recipeId: string;
  scenarioId: string;
  resolved?: Awaited<ReturnType<typeof resolveProject>>;
}): Promise<number> {
  const project =
    opts.resolved ??
    (await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    }));
  try {
    const { entry, selection } = await resolveScenarioForCli({
      project,
      recipeId: opts.recipeId,
      scenarioId: opts.scenarioId,
    });
    assertScenarioCompatibility(selection);
    const scenarioDefinition = await readValidatedScenarioDefinition({ selection });
    const validationChecks = await validateScenarioRecipeFiles({ entry, selection });

    output.line(`Prepared run plan: ${selection.recipe_id}:${selection.scenario_id}`);
    output.line(
      `Recipe: ${selection.recipe_name} (${selection.recipe_id}@${selection.recipe_version})`,
    );
    output.line(`Goal: ${scenarioDefinition.goal}`);
    output.line(`Scenario file: ${path.relative(project.gitRoot, selection.scenario_file)}`);
    output.jsonSection("Run profile", selection.run_profile);
    output.jsonSection("Selection reasons", selection.selection_reasons);
    output.jsonSection("Validation", [
      `scenario definition ok: ${path.relative(project.gitRoot, selection.scenario_file)}`,
      ...validationChecks,
    ]);
    output.line("Status: preview only; no task created and no runner executed.");
    output.line(
      `Next: use \`agentplane recipes scenario execute ${selection.recipe_id}:${selection.scenario_id}\` ` +
        "to materialize and run this scenario.",
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes scenario run", root: opts.rootOverride ?? null });
  }
}
