import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { fileExists, getPathKind } from "../../../cli/fs-utils.js";
import { invalidFieldMessage, requiredFieldMessage } from "../../../cli/output.js";
import { isRecord } from "../../../shared/guards.js";

import { RECIPES_SCENARIOS_DIR_NAME, RECIPES_SCENARIOS_INDEX_NAME } from "./constants.js";
import { normalizeScenarioId } from "./normalize.js";
import type { RecipeManifest, RecipeScenarioDetail, ScenarioDefinition } from "./types.js";

function validateScenarioDefinition(raw: unknown, sourcePath: string): ScenarioDefinition {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("scenario", "object", sourcePath));
  if (raw.schema_version !== undefined && raw.schema_version !== "1") {
    throw new Error(invalidFieldMessage("scenario.schema_version", '"1"', sourcePath));
  }
  const rawId = typeof raw.id === "string" ? raw.id : "";
  const id = normalizeScenarioId(rawId);
  const goal = typeof raw.goal === "string" ? raw.goal.trim() : "";
  if (!goal) throw new Error(requiredFieldMessage("scenario.goal", sourcePath));
  if (!("inputs" in raw)) throw new Error(requiredFieldMessage("scenario.inputs", sourcePath));
  if (!("outputs" in raw)) throw new Error(requiredFieldMessage("scenario.outputs", sourcePath));
  if (!Array.isArray(raw.steps)) {
    throw new Error(invalidFieldMessage("scenario.steps", "array", sourcePath));
  }
  return {
    schema_version: "1",
    id,
    summary: typeof raw.summary === "string" ? raw.summary.trim() : undefined,
    description: typeof raw.description === "string" ? raw.description.trim() : undefined,
    goal,
    inputs: raw.inputs,
    outputs: raw.outputs,
    steps: raw.steps,
  };
}

export async function readScenarioDefinition(filePath: string): Promise<ScenarioDefinition> {
  const raw = JSON.parse(await readFile(filePath, "utf8")) as unknown;
  return validateScenarioDefinition(raw, filePath);
}

export async function readScenarioIndex(filePath: string): Promise<{
  schema_version: 1;
  scenarios: { id: string; summary?: string }[];
}> {
  const raw = JSON.parse(await readFile(filePath, "utf8")) as unknown;
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("scenarios index", "object"));
  if (raw.schema_version !== 1)
    throw new Error(invalidFieldMessage("scenarios index.schema_version", "1"));
  if (!Array.isArray(raw.scenarios))
    throw new Error(invalidFieldMessage("scenarios index.scenarios", "array"));
  const scenarios = raw.scenarios
    .filter((entry) => isRecord(entry))
    .map((entry) => ({
      id: typeof entry.id === "string" ? entry.id : "",
      summary: typeof entry.summary === "string" ? entry.summary : undefined,
    }))
    .filter((entry) => entry.id);
  return { schema_version: 1, scenarios };
}

export async function collectRecipeScenarioDetails(
  recipeDir: string,
  manifest: RecipeManifest,
): Promise<RecipeScenarioDetail[]> {
  const scenariosDir = path.join(recipeDir, RECIPES_SCENARIOS_DIR_NAME);
  if ((await getPathKind(scenariosDir)) === "dir") {
    const files = await readdir(scenariosDir);
    const jsonFiles = files.filter((file) => file.toLowerCase().endsWith(".json")).toSorted();
    const details: RecipeScenarioDetail[] = [];
    for (const file of jsonFiles) {
      const scenario = await readScenarioDefinition(path.join(scenariosDir, file));
      details.push({
        id: scenario.id,
        summary: scenario.summary,
        description: scenario.description,
        goal: scenario.goal,
        inputs: scenario.inputs,
        outputs: scenario.outputs,
        steps: scenario.steps,
        source: "definition",
      });
    }
    return details.toSorted((a, b) => a.id.localeCompare(b.id));
  }

  const scenariosIndexPath = path.join(recipeDir, RECIPES_SCENARIOS_INDEX_NAME);
  if (await fileExists(scenariosIndexPath)) {
    const index = await readScenarioIndex(scenariosIndexPath);
    return index.scenarios
      .map<RecipeScenarioDetail>((scenario) => ({
        id: scenario.id,
        summary: scenario.summary,
        source: "index",
      }))
      .toSorted((a, b) => a.id.localeCompare(b.id));
  }

  const manifestScenarios = manifest.scenarios ?? [];
  if (manifestScenarios.length > 0) {
    return manifestScenarios
      .map<RecipeScenarioDetail>((scenario) => ({
        id: scenario?.id ?? "",
        summary: scenario?.summary,
        source: "manifest",
      }))
      .filter((scenario) => scenario.id)
      .toSorted((a, b) => a.id.localeCompare(b.id));
  }

  return [];
}

export function normalizeScenarioToolStep(
  raw: unknown,
  sourcePath: string,
): { tool: string; args: string[]; env: Record<string, string> } {
  if (!isRecord(raw)) {
    throw new Error(invalidFieldMessage("scenario step", "object", sourcePath));
  }
  const tool = typeof raw.tool === "string" ? raw.tool.trim() : "";
  if (!tool) {
    throw new Error(requiredFieldMessage("scenario step.tool", sourcePath));
  }
  const args = Array.isArray(raw.args) ? raw.args.filter((arg) => typeof arg === "string") : [];
  if (Array.isArray(raw.args) && args.length !== raw.args.length) {
    throw new Error(invalidFieldMessage("scenario step.args", "string[]", sourcePath));
  }
  const env: Record<string, string> = {};
  if (raw.env !== undefined) {
    if (!isRecord(raw.env)) {
      throw new Error(invalidFieldMessage("scenario step.env", "object", sourcePath));
    }
    for (const [key, value] of Object.entries(raw.env)) {
      if (typeof value !== "string") {
        throw new Error(invalidFieldMessage("scenario step.env", "string map", sourcePath));
      }
      env[key] = value;
    }
  }
  return { tool, args, env };
}
