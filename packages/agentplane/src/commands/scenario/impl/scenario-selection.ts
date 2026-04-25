import path from "node:path";

import type { ResolvedProject } from "@agentplaneorg/core/project";

import { exitCodeForError } from "../../../cli/exit-codes.js";
import { fileExists } from "../../../cli/fs-utils.js";
import { CliError } from "../../../shared/errors.js";
import {
  readProjectInstalledRecipes,
  readScenarioDefinition,
  resolveRecipeScenarioSelection,
  type ScenarioDefinition,
} from "../../recipes.js";

type ScenarioCliSelection = Awaited<ReturnType<typeof resolveRecipeScenarioSelection>>;
type ScenarioSelectionErrorRule = {
  startsWith: string[];
  exitCode: ReturnType<typeof exitCodeForError>;
  code: "E_IO" | "E_VALIDATION";
  message?: (message: string) => string;
};

const SCENARIO_SELECTION_ERROR_RULES: ScenarioSelectionErrorRule[] = [
  {
    startsWith: ["No recipe scenario matches"],
    exitCode: exitCodeForError("E_IO"),
    code: "E_IO",
    message: (_message) => "",
  },
  {
    startsWith: ["Scenario definition not found"],
    exitCode: exitCodeForError("E_IO"),
    code: "E_IO",
  },
  {
    startsWith: [
      "Scenario selection is ambiguous",
      "Missing required field: scenario.",
      "Invalid field scenario.",
      "Scenario definition id mismatch:",
    ],
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
  },
];

function buildScenarioNotFoundError(recipeId: string, scenarioId: string): CliError {
  return new CliError({
    exitCode: exitCodeForError("E_IO"),
    code: "E_IO",
    message: `Scenario not found: ${recipeId}:${scenarioId}`,
  });
}

function mapScenarioSelectionError(
  recipeId: string,
  scenarioId: string,
  error: unknown,
): CliError | null {
  const message = error instanceof Error ? error.message : String(error);
  for (const rule of SCENARIO_SELECTION_ERROR_RULES) {
    if (!rule.startsWith.some((prefix) => message.startsWith(prefix))) continue;
    if (message.startsWith("No recipe scenario matches")) {
      return buildScenarioNotFoundError(recipeId, scenarioId);
    }
    return new CliError({
      exitCode: rule.exitCode,
      code: rule.code,
      message: rule.message ? rule.message(message) : message,
    });
  }
  return null;
}

export async function resolveScenarioForCli(opts: {
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
    const mapped = mapScenarioSelectionError(opts.recipeId, opts.scenarioId, error);
    if (mapped) throw mapped;
    throw error;
  }
}

export async function readValidatedScenarioDefinition(opts: {
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

export async function validateScenarioRecipeFiles(opts: {
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

export function assertScenarioCompatibility(selection: ScenarioCliSelection): void {
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
