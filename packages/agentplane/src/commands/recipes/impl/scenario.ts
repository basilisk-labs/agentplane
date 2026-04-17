import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { fileExists, getPathKind } from "../../../cli/fs-utils.js";
import { invalidFieldMessage, requiredFieldMessage } from "../../../cli/output.js";
import { isRecord } from "../../../shared/guards.js";
import { dedupeStrings } from "../../../shared/strings.js";

import { RECIPES_SCENARIOS_DIR_NAME, RECIPES_SCENARIOS_INDEX_NAME } from "./constants.js";
import { normalizeScenarioId } from "./normalize.js";
import type {
  RecipeManifest,
  RecipeScenarioDetail,
  RecipeTaskTemplate,
  RecipeTaskTemplateDoc,
  ScenarioDefinition,
} from "./types.js";

function normalizeRequiredString(raw: unknown, field: string, sourcePath: string): string {
  if (typeof raw !== "string") throw new Error(invalidFieldMessage(field, "string", sourcePath));
  const value = raw.trim();
  if (!value) throw new Error(requiredFieldMessage(field, sourcePath));
  return value;
}

function normalizeOptionalString(
  raw: unknown,
  field: string,
  sourcePath: string,
): string | undefined {
  if (raw === undefined) return undefined;
  if (typeof raw !== "string") throw new Error(invalidFieldMessage(field, "string", sourcePath));
  const value = raw.trim();
  return value || undefined;
}

function normalizeOptionalStringList(
  raw: unknown,
  field: string,
  sourcePath: string,
): string[] | undefined {
  if (raw === undefined) return undefined;
  if (!Array.isArray(raw)) throw new Error(invalidFieldMessage(field, "string[]", sourcePath));
  const values = raw.map((value) => {
    if (typeof value !== "string")
      throw new Error(invalidFieldMessage(field, "string[]", sourcePath));
    const trimmed = value.trim();
    if (!trimmed) throw new Error(invalidFieldMessage(field, "string[]", sourcePath));
    return trimmed;
  });
  const deduped = dedupeStrings(values).toSorted();
  return deduped.length > 0 ? deduped : undefined;
}

function normalizeTaskTemplateDoc(
  raw: unknown,
  sourcePath: string,
): RecipeTaskTemplateDoc | undefined {
  if (raw === undefined) return undefined;
  if (!isRecord(raw)) {
    throw new Error(invalidFieldMessage("scenario.task_template.doc", "object", sourcePath));
  }
  const doc: RecipeTaskTemplateDoc = {
    summary: normalizeOptionalString(raw.summary, "scenario.task_template.doc.summary", sourcePath),
    scope: normalizeOptionalString(raw.scope, "scenario.task_template.doc.scope", sourcePath),
    plan: normalizeOptionalString(raw.plan, "scenario.task_template.doc.plan", sourcePath),
    verify_steps: normalizeOptionalString(
      raw.verify_steps,
      "scenario.task_template.doc.verify_steps",
      sourcePath,
    ),
    rollback_plan: normalizeOptionalString(
      raw.rollback_plan,
      "scenario.task_template.doc.rollback_plan",
      sourcePath,
    ),
    findings: normalizeOptionalString(
      raw.findings,
      "scenario.task_template.doc.findings",
      sourcePath,
    ),
  };
  return Object.values(doc).some((value) => value !== undefined) ? doc : undefined;
}

function normalizeTaskTemplate(raw: unknown, sourcePath: string): RecipeTaskTemplate {
  if (!isRecord(raw)) {
    throw new Error(invalidFieldMessage("scenario.task_template", "object", sourcePath));
  }
  const rawPriority = raw.priority;
  let priority: RecipeTaskTemplate["priority"];
  if (rawPriority !== undefined) {
    if (
      rawPriority !== "low" &&
      rawPriority !== "normal" &&
      rawPriority !== "med" &&
      rawPriority !== "high"
    ) {
      throw new Error(
        invalidFieldMessage(
          "scenario.task_template.priority",
          '"low" | "normal" | "med" | "high"',
          sourcePath,
        ),
      );
    }
    priority = rawPriority;
  }
  return {
    title: normalizeRequiredString(raw.title, "scenario.task_template.title", sourcePath),
    description: normalizeRequiredString(
      raw.description,
      "scenario.task_template.description",
      sourcePath,
    ),
    owner: normalizeRequiredString(raw.owner, "scenario.task_template.owner", sourcePath),
    priority,
    tags: normalizeOptionalStringList(raw.tags, "scenario.task_template.tags", sourcePath),
    verify: normalizeOptionalStringList(raw.verify, "scenario.task_template.verify", sourcePath),
    doc: normalizeTaskTemplateDoc(raw.doc, sourcePath),
  };
}

function normalizeScenarioEvidence(
  raw: unknown,
  sourcePath: string,
): ScenarioDefinition["evidence"] | undefined {
  if (raw === undefined) return undefined;
  if (!isRecord(raw)) {
    throw new Error(invalidFieldMessage("scenario.evidence", "object", sourcePath));
  }
  const required = raw.required === true;
  let files: string[] = [];
  if (raw.files !== undefined) {
    if (!Array.isArray(raw.files)) {
      throw new Error(invalidFieldMessage("scenario.evidence.files", "string[]", sourcePath));
    }
    files = raw.files
      .map((value) => (typeof value === "string" ? value.trim() : ""))
      .filter(Boolean);
    if (files.length !== raw.files.length) {
      throw new Error(invalidFieldMessage("scenario.evidence.files", "string[]", sourcePath));
    }
  }
  if (required && files.length === 0) {
    files = ["evidence.json"];
  }
  return { required, files };
}

function validateScenarioDefinition(raw: unknown, sourcePath: string): ScenarioDefinition {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("scenario", "object", sourcePath));
  if (raw.schema_version !== undefined && raw.schema_version !== "1") {
    throw new Error(invalidFieldMessage("scenario.schema_version", '"1"', sourcePath));
  }
  const rawId = typeof raw.id === "string" ? raw.id : "";
  const id = normalizeScenarioId(rawId);
  const goal = typeof raw.goal === "string" ? raw.goal.trim() : "";
  if (!goal) throw new Error(requiredFieldMessage("scenario.goal", sourcePath));
  if (!("task_template" in raw)) {
    throw new Error(requiredFieldMessage("scenario.task_template", sourcePath));
  }
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
    task_template: normalizeTaskTemplate(raw.task_template, sourcePath),
    inputs: raw.inputs,
    outputs: raw.outputs,
    evidence: normalizeScenarioEvidence(raw.evidence, sourcePath),
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
  const manifestScenarios = manifest.scenarios ?? [];
  const scenariosDir = path.join(recipeDir, RECIPES_SCENARIOS_DIR_NAME);
  if (manifestScenarios.length > 0) {
    const details = manifestScenarios.map<RecipeScenarioDetail>((scenario) => ({
      id: scenario.id,
      name: scenario.name,
      summary: scenario.summary,
      description: scenario.description,
      use_when: scenario.use_when,
      avoid_when: scenario.avoid_when,
      required_inputs: scenario.required_inputs,
      outputs: scenario.outputs,
      permissions: scenario.permissions,
      artifacts: scenario.artifacts,
      agents_involved: scenario.agents_involved,
      skills_used: scenario.skills_used,
      tools_used: scenario.tools_used,
      run_profile: scenario.run_profile,
      file: scenario.file,
      source: "manifest",
    }));

    if ((await getPathKind(scenariosDir)) === "dir") {
      const files = await readdir(scenariosDir);
      const jsonFiles = files.filter((file) => file.toLowerCase().endsWith(".json")).toSorted();
      for (const file of jsonFiles) {
        const scenario = await readScenarioDefinition(path.join(scenariosDir, file));
        const detail = details.find((entry) => entry.id === scenario.id);
        if (!detail) continue;
        detail.description ??= scenario.description;
        detail.goal = scenario.goal;
        detail.task_template = scenario.task_template;
        detail.inputs = scenario.inputs;
        detail.steps = scenario.steps;
        detail.outputs = detail.outputs ?? scenario.outputs;
        detail.evidence = scenario.evidence;
        detail.source = "definition";
      }
    }

    return details.toSorted((a, b) => a.id.localeCompare(b.id));
  }

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
        task_template: scenario.task_template,
        inputs: scenario.inputs,
        outputs: scenario.outputs,
        evidence: scenario.evidence,
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
