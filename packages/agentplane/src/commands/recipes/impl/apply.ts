import { cp, mkdir, readFile, readdir, rename, rm } from "node:fs/promises";
import path from "node:path";

import { exitCodeForError } from "../../../cli/exit-codes.js";
import { fileExists, getPathKind } from "../../../cli/fs-utils.js";
import { invalidFieldMessage, missingFileMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";
import { isRecord } from "../../../shared/guards.js";
import { writeJsonStableIfChanged } from "../../../shared/write-if-changed.js";

import { RECIPES_SCENARIOS_DIR_NAME, RECIPES_SCENARIOS_INDEX_NAME } from "./constants.js";
import { normalizeAgentId } from "./normalize.js";
import { readScenarioDefinition } from "./scenario.js";
import type { RecipeConflictMode, RecipeManifest } from "./types.js";

export async function moveRecipeDir(opts: { from: string; to: string }): Promise<void> {
  await mkdir(path.dirname(opts.to), { recursive: true });
  try {
    await rename(opts.from, opts.to);
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "EXDEV") {
      await cp(opts.from, opts.to, { recursive: true });
      await rm(opts.from, { recursive: true, force: true });
      return;
    }
    throw err;
  }
}

export async function applyRecipeAgents(opts: {
  manifest: RecipeManifest;
  recipeDir: string;
  agentplaneDir: string;
  onConflict: RecipeConflictMode;
}): Promise<void> {
  const agents = opts.manifest.agents ?? [];
  if (agents.length === 0) return;

  const agentsDir = path.join(opts.agentplaneDir, "agents");
  await mkdir(agentsDir, { recursive: true });

  for (const agent of agents) {
    const rawId = typeof agent?.id === "string" ? agent.id : "";
    const rawFile = typeof agent?.file === "string" ? agent.file : "";
    if (!rawId.trim() || !rawFile.trim()) {
      throw new Error("manifest.agents entries must include id and file");
    }
    const agentId = normalizeAgentId(rawId);
    const sourcePath = path.join(opts.recipeDir, rawFile);
    if (!(await fileExists(sourcePath))) {
      throw new Error(missingFileMessage("recipe agent file", rawFile));
    }

    const rawAgent = JSON.parse(await readFile(sourcePath, "utf8")) as unknown;
    if (!isRecord(rawAgent)) {
      throw new Error(invalidFieldMessage("recipe agent file", "JSON object", rawFile));
    }

    const baseId = `${opts.manifest.id}__${agentId}`;
    let targetId = baseId;
    let targetPath = path.join(agentsDir, `${targetId}.json`);
    if (await getPathKind(targetPath)) {
      if (opts.onConflict === "fail") {
        throw new CliError({
          exitCode: exitCodeForError("E_IO"),
          code: "E_IO",
          message: `Agent already exists: ${targetId}`,
        });
      }
      if (opts.onConflict === "rename") {
        let counter = 1;
        while (await getPathKind(targetPath)) {
          targetId = `${baseId}__${counter}`;
          targetPath = path.join(agentsDir, `${targetId}.json`);
          counter += 1;
        }
      }
    }

    rawAgent.id = targetId;
    await writeJsonStableIfChanged(targetPath, rawAgent);
  }
}

export async function applyRecipeScenarios(opts: {
  manifest: RecipeManifest;
  recipeDir: string;
}): Promise<void> {
  const scenariosDir = path.join(opts.recipeDir, RECIPES_SCENARIOS_DIR_NAME);
  const scenariosIndexPath = path.join(opts.recipeDir, RECIPES_SCENARIOS_INDEX_NAME);
  const payload = { schema_version: 1, scenarios: [] as { id: string; summary?: string }[] };

  if ((await getPathKind(scenariosDir)) === "dir") {
    const entries = await readdir(scenariosDir);
    const jsonEntries = entries.filter((entry) => entry.toLowerCase().endsWith(".json")).toSorted();
    for (const entry of jsonEntries) {
      const scenarioPath = path.join(scenariosDir, entry);
      const scenario = await readScenarioDefinition(scenarioPath);
      payload.scenarios.push({ id: scenario.id, summary: scenario.summary });
    }
  } else {
    const scenarios = opts.manifest.scenarios ?? [];
    payload.scenarios = scenarios
      .filter((scenario) => isRecord(scenario))
      .map((scenario) => ({
        id: typeof scenario.id === "string" ? scenario.id : "",
        summary: typeof scenario.summary === "string" ? scenario.summary : "",
      }))
      .filter((scenario) => scenario.id);
  }

  if (payload.scenarios.length === 0) return;
  await writeJsonStableIfChanged(scenariosIndexPath, payload);
}
