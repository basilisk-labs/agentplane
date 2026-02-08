import { createPublicKey, verify } from "node:crypto";
import { cp, mkdir, mkdtemp, readdir, readFile, rename, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defaultConfig, loadConfig, resolveProject } from "@agentplaneorg/core";

import { extractArchive } from "../cli/archive.js";
import { sha256File } from "../cli/checksum.js";
import { mapCoreError } from "../cli/error-map.js";
import { fileExists, getPathKind } from "../cli/fs-utils.js";
import { downloadToFile, fetchJson, fetchText } from "../cli/http.js";
import {
  emptyStateMessage,
  infoMessage,
  invalidFieldMessage,
  invalidPathMessage,
  missingFileMessage,
  requiredFieldMessage,
  successMessage,
} from "../cli/output.js";
import { isRecord } from "../shared/guards.js";
import { CliError } from "../shared/errors.js";
import { dedupeStrings } from "../shared/strings.js";
import { writeJsonStableIfChanged, writeTextIfChanged } from "../shared/write-if-changed.js";
import { ensureNetworkApproved } from "./shared/network-approval.js";
import { resolvePathFallback } from "./shared/path.js";

type RecipeManifest = {
  schema_version: "1";
  id: string;
  version: string;
  name: string;
  summary: string;
  description: string;
  tags?: string[];
  agents?: { id?: string; summary?: string; file?: string }[];
  tools?: {
    id?: string;
    summary?: string;
    runtime?: "node" | "bash";
    entrypoint?: string;
    permissions?: string[];
  }[];
  scenarios?: { id?: string; summary?: string }[];
};

export type RecipeConflictMode = "fail" | "rename" | "overwrite";

type InstalledRecipeEntry = {
  id: string;
  version: string;
  source: string;
  installed_at: string;
  tags: string[];
  manifest: RecipeManifest;
};

type InstalledRecipesFile = {
  schema_version: 1;
  updated_at: string;
  recipes: InstalledRecipeEntry[];
};

export type ScenarioDefinition = {
  schema_version: "1";
  id: string;
  summary?: string;
  description?: string;
  goal: string;
  inputs: unknown;
  outputs: unknown;
  steps: unknown[];
};

type RecipeScenarioDetail = {
  id: string;
  summary?: string;
  description?: string;
  goal?: string;
  inputs?: unknown;
  outputs?: unknown;
  steps?: unknown[];
  source: "definition" | "index" | "manifest";
};

type RecipesIndex = {
  schema_version: 1;
  recipes: {
    id: string;
    summary: string;
    description?: string;
    versions: {
      version: string;
      url: string;
      sha256: string;
      min_agentplane_version?: string;
      tags?: string[];
    }[];
  }[];
};

type RecipesIndexSignature = {
  schema_version: 1;
  key_id: string;
  signature: string;
  algorithm?: string;
};

const INSTALLED_RECIPES_NAME = "recipes.json";
export const RECIPES_DIR_NAME = "recipes";
export const RECIPES_SCENARIOS_DIR_NAME = "scenarios";
export const RECIPES_SCENARIOS_INDEX_NAME = "scenarios.json";
const RECIPES_REMOTE_INDEX_NAME = "recipes-index.json";
const RECIPES_REMOTE_INDEX_SIG_NAME = "recipes-index.json.sig";
const DEFAULT_RECIPES_INDEX_URL =
  "https://raw.githubusercontent.com/basilisk-labs/agentplane-recipes/main/index.json";
const RECIPES_INDEX_PUBLIC_KEYS_ENV = "AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS";
const RECIPES_INDEX_PUBLIC_KEYS: Record<string, string> = {
  "2026-02": `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAeRWdXKVZtz0v+bnQS3zb24jMfa0gflsRUHQkeJkji6E=
-----END PUBLIC KEY-----`,
};
const AGENTPLANE_HOME_ENV = "AGENTPLANE_HOME";
const GLOBAL_RECIPES_DIR_NAME = "recipes";
const PROJECT_RECIPES_CACHE_DIR_NAME = "recipes-cache";

function isNotGitRepoError(err: unknown): boolean {
  if (err instanceof Error) {
    return err.message.startsWith("Not a git repository");
  }
  return false;
}

async function maybeResolveProject(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<{ gitRoot: string; agentplaneDir: string } | null> {
  try {
    return await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
  } catch (err) {
    if (isNotGitRepoError(err)) {
      if (opts.rootOverride) throw err;
      return null;
    }
    throw err;
  }
}

type RecipeListRemoteFlags = {
  refresh: boolean;
  index?: string;
  yes: boolean;
};

export type { RecipeListRemoteFlags };

function normalizeRecipeId(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error(requiredFieldMessage("manifest.id"));
  if (trimmed.includes("/") || trimmed.includes("\\")) {
    throw new Error(invalidPathMessage("manifest.id", "must not contain path separators"));
  }
  if (trimmed === "." || trimmed === "..") {
    throw new Error(invalidPathMessage("manifest.id", "must not be '.' or '..'"));
  }
  return trimmed;
}

function normalizeAgentId(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error(requiredFieldMessage("agent.id"));
  if (trimmed.includes("/") || trimmed.includes("\\")) {
    throw new Error(invalidPathMessage("agent.id", "must not contain path separators"));
  }
  if (trimmed === "." || trimmed === "..") {
    throw new Error(invalidPathMessage("agent.id", "must not be '.' or '..'"));
  }
  return trimmed;
}

function normalizeScenarioId(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error(requiredFieldMessage("scenario.id"));
  if (trimmed.includes("/") || trimmed.includes("\\")) {
    throw new Error(invalidPathMessage("scenario.id", "must not contain path separators"));
  }
  if (trimmed === "." || trimmed === "..") {
    throw new Error(invalidPathMessage("scenario.id", "must not be '.' or '..'"));
  }
  return trimmed;
}

function normalizeRecipeTags(value: unknown): string[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw new Error(invalidFieldMessage("manifest.tags", "string[]"));
  const tags = value.map((tag) => {
    if (typeof tag !== "string") throw new Error(invalidFieldMessage("manifest.tags", "string[]"));
    return tag.trim();
  });
  return dedupeStrings(tags);
}

function validateRecipeManifest(raw: unknown): RecipeManifest {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("manifest", "object"));
  if (raw.schema_version !== "1")
    throw new Error(invalidFieldMessage("manifest.schema_version", '"1"'));
  if (typeof raw.id !== "string") throw new Error(invalidFieldMessage("manifest.id", "string"));
  if (typeof raw.version !== "string")
    throw new Error(invalidFieldMessage("manifest.version", "string"));
  if (typeof raw.name !== "string") throw new Error(invalidFieldMessage("manifest.name", "string"));
  if (typeof raw.summary !== "string")
    throw new Error(invalidFieldMessage("manifest.summary", "string"));
  if (typeof raw.description !== "string")
    throw new Error(invalidFieldMessage("manifest.description", "string"));

  const id = normalizeRecipeId(raw.id);
  const version = raw.version.trim();
  if (!version) throw new Error(requiredFieldMessage("manifest.version"));
  const tags = normalizeRecipeTags(raw.tags);

  return {
    schema_version: "1",
    id,
    version,
    name: raw.name.trim(),
    summary: raw.summary.trim(),
    description: raw.description.trim(),
    tags: tags.length > 0 ? tags : undefined,
    agents: Array.isArray(raw.agents) ? (raw.agents as RecipeManifest["agents"]) : undefined,
    tools: Array.isArray(raw.tools) ? (raw.tools as RecipeManifest["tools"]) : undefined,
    scenarios: Array.isArray(raw.scenarios)
      ? (raw.scenarios as RecipeManifest["scenarios"])
      : undefined,
  };
}

function validateInstalledRecipesFile(raw: unknown): InstalledRecipesFile {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("recipes.json", "object"));
  if (raw.schema_version !== 1)
    throw new Error(invalidFieldMessage("recipes.json.schema_version", "1"));
  if (!Array.isArray(raw.recipes))
    throw new Error(invalidFieldMessage("recipes.json.recipes", "array"));
  const updatedAt = typeof raw.updated_at === "string" ? raw.updated_at : "";
  const recipes = raw.recipes
    .filter((entry) => isRecord(entry))
    .map((entry) => {
      const manifest = validateRecipeManifest(entry.manifest);
      const id = typeof entry.id === "string" ? entry.id.trim() : manifest.id;
      const version = typeof entry.version === "string" ? entry.version.trim() : manifest.version;
      const source = typeof entry.source === "string" ? entry.source.trim() : "";
      const installedAt = typeof entry.installed_at === "string" ? entry.installed_at.trim() : "";
      if (!id || !version || !source || !installedAt) {
        throw new Error(
          invalidFieldMessage("recipes.json.recipes[]", "id, version, source, installed_at"),
        );
      }
      if (id !== manifest.id || version !== manifest.version) {
        throw new Error(invalidFieldMessage("recipes.json.recipes[]", "id/version match manifest"));
      }
      const tags = normalizeRecipeTags(entry.tags ?? manifest.tags ?? []);
      return { id, version, source, installed_at: installedAt, tags, manifest };
    });
  return { schema_version: 1, updated_at: updatedAt, recipes };
}

function sortInstalledRecipes(file: InstalledRecipesFile): InstalledRecipesFile {
  const recipes = [...file.recipes].toSorted((a, b) => a.id.localeCompare(b.id));
  return { schema_version: 1, updated_at: file.updated_at, recipes };
}

function loadRecipesIndexPublicKeys(): Record<string, string> {
  const raw = process.env[RECIPES_INDEX_PUBLIC_KEYS_ENV];
  if (!raw) return { ...RECIPES_INDEX_PUBLIC_KEYS };
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const merged: Record<string, string> = { ...RECIPES_INDEX_PUBLIC_KEYS };
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "string" && value.trim()) merged[key] = value.trim();
    }
    return merged;
  } catch {
    return { ...RECIPES_INDEX_PUBLIC_KEYS };
  }
}

function validateRecipesIndexSignature(raw: unknown): RecipesIndexSignature {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("recipes index signature", "object"));
  if (raw.schema_version !== 1) {
    throw new Error(invalidFieldMessage("recipes index signature.schema_version", "1"));
  }
  const keyId = typeof raw.key_id === "string" ? raw.key_id.trim() : "";
  const signature = typeof raw.signature === "string" ? raw.signature.trim() : "";
  if (!keyId || !signature) {
    throw new Error(invalidFieldMessage("recipes index signature", "key_id, signature"));
  }
  const algorithm = typeof raw.algorithm === "string" ? raw.algorithm.trim() : undefined;
  return { schema_version: 1, key_id: keyId, signature, algorithm };
}

function verifyRecipesIndexSignature(indexText: string, signature: RecipesIndexSignature): void {
  if (signature.algorithm && signature.algorithm !== "ed25519") {
    throw new Error(invalidFieldMessage("recipes index signature.algorithm", "ed25519"));
  }
  const keys = loadRecipesIndexPublicKeys();
  const publicKey = keys[signature.key_id];
  if (!publicKey) {
    throw new Error(invalidFieldMessage("recipes index signature.key_id", "known key id"));
  }
  const key = createPublicKey(publicKey);
  const ok = verify(null, Buffer.from(indexText), key, Buffer.from(signature.signature, "base64"));
  if (!ok) {
    throw new Error("Invalid signature for recipes index");
  }
}

function signatureSourceForIndex(source: string): string {
  return `${source}.sig`;
}

function validateRecipesIndex(raw: unknown): RecipesIndex {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("recipes index", "object"));
  if (raw.schema_version !== 1)
    throw new Error(invalidFieldMessage("recipes index.schema_version", "1"));
  if (!Array.isArray(raw.recipes))
    throw new Error(invalidFieldMessage("recipes index.recipes", "array"));

  const recipes = raw.recipes
    .filter((entry) => isRecord(entry))
    .map((entry) => {
      const id = typeof entry.id === "string" ? entry.id : "";
      const summary = typeof entry.summary === "string" ? entry.summary : "";
      const description = typeof entry.description === "string" ? entry.description : undefined;
      const versionsRaw = Array.isArray(entry.versions) ? entry.versions : [];
      if (!id || !summary || versionsRaw.length === 0) {
        throw new Error(invalidFieldMessage("recipes index.recipes[]", "id, summary, versions"));
      }
      const versions = versionsRaw
        .filter((version) => isRecord(version))
        .map((version) => {
          const versionId = typeof version.version === "string" ? version.version : "";
          const url = typeof version.url === "string" ? version.url : "";
          const sha256 = typeof version.sha256 === "string" ? version.sha256 : "";
          if (!versionId || !url || !sha256) {
            throw new Error(
              invalidFieldMessage("recipes index.recipes[].versions[]", "version, url, sha256"),
            );
          }
          return {
            version: versionId,
            url,
            sha256,
            min_agentplane_version:
              typeof version.min_agentplane_version === "string"
                ? version.min_agentplane_version
                : undefined,
            tags: Array.isArray(version.tags)
              ? version.tags.filter((tag) => typeof tag === "string")
              : undefined,
          };
        });
      return { id, summary, description, versions };
    });
  return { schema_version: 1, recipes };
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

function formatJsonBlock(value: unknown, indent: string): string {
  const payload = JSON.stringify(value, null, 2);
  if (!payload) return "";
  return payload
    .split("\n")
    .map((line) => `${indent}${line}`)
    .join("\n");
}

async function collectRecipeScenarioDetails(
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

export async function readInstalledRecipesFile(filePath: string): Promise<InstalledRecipesFile> {
  try {
    const raw = JSON.parse(await readFile(filePath, "utf8")) as unknown;
    return sortInstalledRecipes(validateInstalledRecipesFile(raw));
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return { schema_version: 1, updated_at: "", recipes: [] };
    throw err;
  }
}

async function writeInstalledRecipesFile(
  filePath: string,
  file: InstalledRecipesFile,
): Promise<void> {
  const sorted = sortInstalledRecipes({
    ...file,
    updated_at: new Date().toISOString(),
  });
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeJsonStableIfChanged(filePath, sorted);
}

export async function readRecipeManifest(manifestPath: string): Promise<RecipeManifest> {
  const raw = JSON.parse(await readFile(manifestPath, "utf8")) as unknown;
  return validateRecipeManifest(raw);
}

async function resolveRecipeRoot(extractedDir: string): Promise<string> {
  const rootManifest = path.join(extractedDir, "manifest.json");
  if (await fileExists(rootManifest)) return extractedDir;
  const entries = await readdir(extractedDir, { withFileTypes: true });
  const dirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  if (dirs.length !== 1) {
    throw new Error(missingFileMessage("manifest.json", "archive root"));
  }
  const candidate = path.join(extractedDir, dirs[0]);
  if (!(await fileExists(path.join(candidate, "manifest.json")))) {
    throw new Error(missingFileMessage("manifest.json", "archive root"));
  }
  return candidate;
}

function resolveAgentplaneHome(): string {
  const overridden = process.env[AGENTPLANE_HOME_ENV]?.trim();
  if (overridden) return overridden;
  return path.join(os.homedir(), ".agentplane");
}

function resolveGlobalRecipesDir(): string {
  return path.join(resolveAgentplaneHome(), GLOBAL_RECIPES_DIR_NAME);
}

export function resolveInstalledRecipesPath(): string {
  return path.join(resolveAgentplaneHome(), INSTALLED_RECIPES_NAME);
}

function resolveRecipesIndexCachePath(): string {
  return path.join(resolveAgentplaneHome(), RECIPES_REMOTE_INDEX_NAME);
}

export function resolveInstalledRecipeDir(entry: { id: string; version: string }): string {
  return path.join(resolveGlobalRecipesDir(), entry.id, entry.version);
}

export function resolveProjectRecipesCacheDir(resolved: { agentplaneDir: string }): string {
  return path.join(resolved.agentplaneDir, PROJECT_RECIPES_CACHE_DIR_NAME);
}

export type RecipeInstallSource =
  | { type: "name"; value: string }
  | { type: "path"; value: string }
  | { type: "url"; value: string }
  | { type: "auto"; value: string };

type RecipeCachePruneFlags = {
  dryRun: boolean;
  all: boolean;
};

export type { RecipeCachePruneFlags };

type RecipeListFlags = {
  full: boolean;
  tag?: string;
};

export type { RecipeListFlags };

async function applyRecipeAgents(opts: {
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
          exitCode: 5,
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

async function applyRecipeScenarios(opts: {
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

function isHttpUrl(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
}

async function readRecipesIndexText(source: string, cwd: string): Promise<string> {
  if (isHttpUrl(source)) {
    return await fetchText(source);
  }
  return await readFile(path.resolve(cwd, source), "utf8");
}

async function readRecipesIndexSignature(
  source: string,
  cwd: string,
): Promise<RecipesIndexSignature> {
  const sigSource = signatureSourceForIndex(source);
  if (isHttpUrl(sigSource)) {
    const raw = await fetchJson(sigSource);
    return validateRecipesIndexSignature(raw);
  }
  const rawText = await readFile(path.resolve(cwd, sigSource), "utf8");
  return validateRecipesIndexSignature(JSON.parse(rawText) as unknown);
}

async function loadRecipesRemoteIndex(opts: {
  cwd: string;
  source?: string;
  refresh: boolean;
}): Promise<RecipesIndex> {
  const cachePath = resolveRecipesIndexCachePath();
  const cacheSigPath = path.join(path.dirname(cachePath), RECIPES_REMOTE_INDEX_SIG_NAME);
  const cacheDir = path.dirname(cachePath);
  let rawIndex: unknown;

  if (opts.refresh || !(await fileExists(cachePath))) {
    const source = opts.source ?? DEFAULT_RECIPES_INDEX_URL;
    const indexText = await readRecipesIndexText(source, opts.cwd);
    const signature = await readRecipesIndexSignature(source, opts.cwd);
    verifyRecipesIndexSignature(indexText, signature);
    rawIndex = JSON.parse(indexText) as unknown;
    await mkdir(cacheDir, { recursive: true });
    await writeTextIfChanged(cachePath, indexText);
    await writeJsonStableIfChanged(cacheSigPath, signature);
  } else {
    const [indexText, sigText] = await Promise.all([
      readFile(cachePath, "utf8"),
      readFile(cacheSigPath, "utf8"),
    ]);
    const signature = validateRecipesIndexSignature(JSON.parse(sigText) as unknown);
    verifyRecipesIndexSignature(indexText, signature);
    rawIndex = JSON.parse(indexText) as unknown;
  }

  return validateRecipesIndex(rawIndex);
}

export async function cmdRecipeListParsed(opts: {
  cwd: string;
  rootOverride?: string;
  flags: RecipeListFlags;
}): Promise<number> {
  const flags = opts.flags;
  try {
    const filePath = resolveInstalledRecipesPath();
    const installed = await readInstalledRecipesFile(filePath);

    let recipes = installed.recipes;
    if (flags.tag) {
      const needle = flags.tag.toLowerCase();
      recipes = recipes.filter((entry) => entry.tags.some((tag) => tag.toLowerCase() === needle));
    }

    if (recipes.length === 0) {
      if (flags.tag) {
        process.stdout.write(`${emptyStateMessage(`installed recipes for tag ${flags.tag}`)}\n`);
        return 0;
      }
      process.stdout.write(
        `${emptyStateMessage(
          "installed recipes",
          "Use `agentplane recipes list-remote` or `agentplane recipes install <id>`.",
        )}\n`,
      );
      return 0;
    }

    if (flags.full) {
      const payload: InstalledRecipesFile = {
        schema_version: 1,
        updated_at: installed.updated_at,
        recipes,
      };
      process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
      return 0;
    }

    for (const entry of recipes) {
      process.stdout.write(
        `${entry.id}@${entry.version} - ${entry.manifest.summary || "No summary"}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes list", root: opts.rootOverride ?? null });
  }
}

export async function cmdRecipeListRemoteParsed(opts: {
  cwd: string;
  rootOverride?: string;
  flags: RecipeListRemoteFlags;
}): Promise<number> {
  const flags = opts.flags;
  try {
    const project = await maybeResolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride });
    let config = defaultConfig();
    if (project) {
      const loaded = await loadConfig(project.agentplaneDir);
      config = loaded.config;
    }
    const source = flags.index ?? DEFAULT_RECIPES_INDEX_URL;
    const cachePath = resolveRecipesIndexCachePath();
    const willFetchRemote = (flags.refresh || !(await fileExists(cachePath))) && isHttpUrl(source);
    if (willFetchRemote) {
      await ensureNetworkApproved({
        config,
        yes: flags.yes,
        reason: "recipes list-remote fetches the remote recipes index",
      });
    }
    const index = await loadRecipesRemoteIndex({
      cwd: opts.cwd,
      source: flags.index,
      refresh: flags.refresh,
    });
    for (const recipe of index.recipes) {
      const latest = [...recipe.versions]
        .toSorted((a, b) => a.version.localeCompare(b.version))
        .at(-1);
      if (!latest) continue;
      process.stdout.write(`${recipe.id}@${latest.version} - ${recipe.summary}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes list-remote", root: opts.rootOverride ?? null });
  }
}

export async function cmdRecipeInfoParsed(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const entry = installed.recipes.find((recipe) => recipe.id === opts.id);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${opts.id}`,
      });
    }
    const manifest = entry.manifest;

    process.stdout.write(`Recipe: ${manifest.id}@${manifest.version}\n`);
    process.stdout.write(`Name: ${manifest.name}\n`);
    process.stdout.write(`Summary: ${manifest.summary}\n`);
    process.stdout.write(`Description: ${manifest.description}\n`);
    if (manifest.tags && manifest.tags.length > 0) {
      process.stdout.write(`Tags: ${manifest.tags.join(", ")}\n`);
    }

    const agents = manifest.agents ?? [];
    const tools = manifest.tools ?? [];
    const scenarios = manifest.scenarios ?? [];

    if (agents.length > 0) {
      process.stdout.write("Agents:\n");
      for (const agent of agents) {
        const label = agent?.id ?? "unknown";
        const summary = agent?.summary ? ` - ${agent.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    if (tools.length > 0) {
      process.stdout.write("Tools:\n");
      for (const tool of tools) {
        const label = tool?.id ?? "unknown";
        const summary = tool?.summary ? ` - ${tool.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    if (scenarios.length > 0) {
      process.stdout.write("Scenarios:\n");
      for (const scenario of scenarios) {
        const label = scenario?.id ?? "unknown";
        const summary = scenario?.summary ? ` - ${scenario.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes info", root: opts.rootOverride ?? null });
  }
}

export async function cmdRecipeExplainParsed(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const entry = installed.recipes.find((recipe) => recipe.id === opts.id);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${opts.id}`,
      });
    }

    const manifest = entry.manifest;
    const recipeDir = resolveInstalledRecipeDir(entry);
    const scenarioDetails = await collectRecipeScenarioDetails(recipeDir, manifest);

    process.stdout.write(`Recipe: ${manifest.id}@${manifest.version}\n`);
    process.stdout.write(`Name: ${manifest.name}\n`);
    process.stdout.write(`Summary: ${manifest.summary}\n`);
    process.stdout.write(`Description: ${manifest.description}\n`);
    if (manifest.tags && manifest.tags.length > 0) {
      process.stdout.write(`Tags: ${manifest.tags.join(", ")}\n`);
    }

    const agents = manifest.agents ?? [];
    const tools = manifest.tools ?? [];

    if (agents.length > 0) {
      process.stdout.write("Agents:\n");
      for (const agent of agents) {
        const label = agent?.id ?? "unknown";
        const summary = agent?.summary ? ` - ${agent.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    if (tools.length > 0) {
      process.stdout.write("Tools:\n");
      for (const tool of tools) {
        const label = tool?.id ?? "unknown";
        const summary = tool?.summary ? ` - ${tool.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    if (scenarioDetails.length > 0) {
      process.stdout.write("Scenarios:\n");
      for (const scenario of scenarioDetails) {
        const summary = scenario.summary ? ` - ${scenario.summary}` : "";
        process.stdout.write(`  - ${scenario.id}${summary}\n`);
        if (scenario.description) {
          process.stdout.write(`    Description: ${scenario.description}\n`);
        }
        if (scenario.goal) {
          process.stdout.write(`    Goal: ${scenario.goal}\n`);
        }
        if (scenario.inputs !== undefined) {
          const payload = formatJsonBlock(scenario.inputs, "      ");
          if (payload) process.stdout.write(`    Inputs:\n${payload}\n`);
        }
        if (scenario.outputs !== undefined) {
          const payload = formatJsonBlock(scenario.outputs, "      ");
          if (payload) process.stdout.write(`    Outputs:\n${payload}\n`);
        }
        if (scenario.steps && scenario.steps.length > 0) {
          process.stdout.write("    Steps:\n");
          let stepIndex = 1;
          for (const step of scenario.steps) {
            process.stdout.write(`      ${stepIndex}. ${JSON.stringify(step)}\n`);
            stepIndex += 1;
          }
          continue;
        }
        if (scenario.source !== "definition") {
          process.stdout.write("    Details: Scenario definition not found in recipe.\n");
        }
      }
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes explain", root: opts.rootOverride ?? null });
  }
}

export async function cmdRecipeInstall(opts: {
  cwd: string;
  rootOverride?: string;
  source: RecipeInstallSource;
  index?: string;
  refresh: boolean;
  onConflict: RecipeConflictMode;
  yes: boolean;
}): Promise<number> {
  try {
    const project = await maybeResolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride });
    let config = defaultConfig();
    if (project) {
      const loaded = await loadConfig(project.agentplaneDir);
      config = loaded.config;
    }
    let networkApproved = false;
    const ensureApproved = async (reason: string): Promise<void> => {
      if (networkApproved) return;
      await ensureNetworkApproved({ config, yes: opts.yes, reason });
      networkApproved = true;
    };

    const tempRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipe-"));
    try {
      let sourcePath = "";
      let sourceLabel = "";
      let expectedSha = "";
      let indexTags: string[] = [];

      const resolveFromIndex = async (recipeId: string): Promise<string> => {
        const indexSource = opts.index ?? DEFAULT_RECIPES_INDEX_URL;
        const cachePath = resolveRecipesIndexCachePath();
        const willFetchRemote =
          (opts.refresh || !(await fileExists(cachePath))) && isHttpUrl(indexSource);
        if (willFetchRemote) {
          await ensureApproved("recipes install fetches the remote recipes index");
        }
        const index = await loadRecipesRemoteIndex({
          cwd: opts.cwd,
          source: opts.index,
          refresh: opts.refresh,
        });
        const entry = index.recipes.find((recipe) => recipe.id === recipeId);
        if (!entry) {
          throw new CliError({
            exitCode: 5,
            code: "E_IO",
            message: `Recipe not found in remote index: ${recipeId}`,
          });
        }
        const latest = [...entry.versions]
          .toSorted((a, b) => a.version.localeCompare(b.version))
          .at(-1);
        if (!latest) {
          throw new CliError({
            exitCode: 3,
            code: "E_VALIDATION",
            message: `Recipe ${entry.id} has no versions in the remote index`,
          });
        }
        expectedSha = latest.sha256;
        sourceLabel = `${entry.id}@${latest.version}`;
        indexTags = normalizeRecipeTags(latest.tags ?? []);

        if (isHttpUrl(latest.url)) {
          await ensureApproved("recipes install downloads a recipe archive");
          const url = new URL(latest.url);
          const filename = path.basename(url.pathname) || "recipe.tar.gz";
          const target = path.join(tempRoot, filename);
          await downloadToFile(latest.url, target);
          return target;
        }
        const resolved = path.resolve(opts.cwd, latest.url);
        if (!(await fileExists(resolved))) {
          throw new CliError({
            exitCode: 5,
            code: "E_IO",
            message: `Recipe archive not found: ${latest.url}`,
          });
        }
        return resolved;
      };

      const resolveSourcePath = async (source: RecipeInstallSource): Promise<string> => {
        if (source.type === "name") return await resolveFromIndex(source.value);
        if (source.type === "url") {
          await ensureApproved("recipes install downloads a recipe archive");
          const url = new URL(source.value);
          const filename = path.basename(url.pathname) || "recipe.tar.gz";
          const target = path.join(tempRoot, filename);
          sourceLabel = source.value;
          await downloadToFile(source.value, target);
          return target;
        }
        if (source.type === "path") {
          const candidate = await resolvePathFallback(source.value);
          if (!(await fileExists(candidate))) {
            throw new CliError({
              exitCode: 5,
              code: "E_IO",
              message: `Recipe archive not found: ${source.value}`,
            });
          }
          sourceLabel = candidate;
          return candidate;
        }
        if (isHttpUrl(source.value)) {
          return await resolveSourcePath({ type: "url", value: source.value });
        }
        const candidate = await resolvePathFallback(source.value);
        if (await fileExists(candidate)) {
          return await resolveSourcePath({ type: "path", value: source.value });
        }
        return await resolveSourcePath({ type: "name", value: source.value });
      };

      sourcePath = await resolveSourcePath(opts.source);
      if (!sourceLabel) sourceLabel = opts.source.value;

      const actualSha = expectedSha ? await sha256File(sourcePath) : "";
      if (expectedSha && actualSha !== expectedSha) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Recipe checksum mismatch for ${sourceLabel}`,
        });
      }

      await extractArchive({
        archivePath: sourcePath,
        destDir: tempRoot,
      });
      const recipeRoot = await resolveRecipeRoot(tempRoot);
      const manifest = await readRecipeManifest(path.join(recipeRoot, "manifest.json"));
      const resolvedTags =
        manifest.tags && manifest.tags.length > 0 ? manifest.tags : normalizeRecipeTags(indexTags);
      const manifestWithTags =
        resolvedTags.length > 0 ? { ...manifest, tags: resolvedTags } : manifest;

      const installDir = resolveInstalledRecipeDir(manifestWithTags);
      const installKind = await getPathKind(installDir);
      if (installKind && installKind !== "dir") {
        throw new CliError({
          exitCode: 5,
          code: "E_IO",
          message: `Recipe install path is not a directory: ${installDir}`,
        });
      }

      const hadExisting = Boolean(installKind);
      if (installKind) {
        await rm(installDir, { recursive: true, force: true });
      }
      await mkdir(path.dirname(installDir), { recursive: true });
      await mkdir(resolveGlobalRecipesDir(), { recursive: true });
      try {
        await rename(recipeRoot, installDir);
      } catch (err) {
        const code = (err as { code?: string } | null)?.code;
        if (code === "EXDEV") {
          await cp(recipeRoot, installDir, { recursive: true });
        } else {
          throw err;
        }
      }

      try {
        if (project) {
          await applyRecipeAgents({
            manifest: manifestWithTags,
            recipeDir: installDir,
            agentplaneDir: project.agentplaneDir,
            onConflict: opts.onConflict,
          });
        }
        await applyRecipeScenarios({ manifest: manifestWithTags, recipeDir: installDir });
      } catch (err) {
        if (!hadExisting) {
          await rm(installDir, { recursive: true, force: true });
        }
        throw err;
      }

      const recipesPath = resolveInstalledRecipesPath();
      const installed = await readInstalledRecipesFile(recipesPath);
      const updated = installed.recipes.filter((entry) => entry.id !== manifestWithTags.id);
      updated.push({
        id: manifestWithTags.id,
        version: manifestWithTags.version,
        source: sourceLabel,
        installed_at: new Date().toISOString(),
        tags: resolvedTags,
        manifest: manifestWithTags,
      });
      await writeInstalledRecipesFile(recipesPath, {
        schema_version: 1,
        updated_at: installed.updated_at,
        recipes: updated,
      });

      process.stdout.write(`Installed recipe ${manifestWithTags.id}@${manifestWithTags.version}\n`);
      return 0;
    } finally {
      await rm(tempRoot, { recursive: true, force: true });
    }
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes install", root: opts.rootOverride ?? null });
  }
}

export async function cmdRecipeRemoveParsed(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const recipesPath = resolveInstalledRecipesPath();
    const installed = await readInstalledRecipesFile(recipesPath);
    const entry = installed.recipes.find((recipe) => recipe.id === opts.id);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${opts.id}`,
      });
    }
    const recipeDir = resolveInstalledRecipeDir(entry);
    await rm(recipeDir, { recursive: true, force: true });

    const updated = installed.recipes.filter((recipe) => recipe.id !== opts.id);
    await writeInstalledRecipesFile(recipesPath, {
      schema_version: 1,
      updated_at: installed.updated_at,
      recipes: updated,
    });

    process.stdout.write(`${successMessage("removed recipe", `${entry.id}@${entry.version}`)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes remove", root: opts.rootOverride ?? null });
  }
}

async function listRecipeCacheEntries(cacheDir: string): Promise<
  {
    id: string;
    version: string;
    path: string;
  }[]
> {
  const entries: { id: string; version: string; path: string }[] = [];
  const recipeDirs = await readdir(cacheDir, { withFileTypes: true });
  for (const recipeDir of recipeDirs) {
    if (!recipeDir.isDirectory()) continue;
    const recipeId = recipeDir.name;
    const versionRoot = path.join(cacheDir, recipeId);
    const versions = await readdir(versionRoot, { withFileTypes: true });
    for (const versionDir of versions) {
      if (!versionDir.isDirectory()) continue;
      const version = versionDir.name;
      entries.push({
        id: recipeId,
        version,
        path: path.join(versionRoot, version),
      });
    }
  }
  return entries;
}

export async function cmdRecipeCachePruneParsed(opts: {
  cwd: string;
  rootOverride?: string;
  flags: RecipeCachePruneFlags;
}): Promise<number> {
  const flags = opts.flags;
  try {
    const cacheDir = resolveGlobalRecipesDir();
    if (!(await fileExists(cacheDir))) {
      process.stdout.write(`${infoMessage(`recipe cache directory not found: ${cacheDir}`)}\n`);
      return 0;
    }

    const cacheEntries = await listRecipeCacheEntries(cacheDir);
    if (cacheEntries.length === 0) {
      process.stdout.write(`${infoMessage("recipe cache is empty")}\n`);
      return 0;
    }

    if (flags.all) {
      if (flags.dryRun) {
        for (const entry of cacheEntries) {
          process.stdout.write(
            `${infoMessage(`dry-run: would remove ${entry.id}@${entry.version}`)}\n`,
          );
        }
        process.stdout.write(
          `${infoMessage(`dry-run: would remove ${cacheEntries.length} cached recipes`)}\n`,
        );
        return 0;
      }
      await rm(cacheDir, { recursive: true, force: true });
      await writeInstalledRecipesFile(resolveInstalledRecipesPath(), {
        schema_version: 1,
        updated_at: "",
        recipes: [],
      });
      process.stdout.write(
        `${successMessage("removed cached recipes", undefined, `count=${cacheEntries.length}`)}\n`,
      );
      return 0;
    }

    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const keep = new Set(installed.recipes.map((entry) => `${entry.id}@${entry.version}`));
    const prune = cacheEntries.filter((entry) => !keep.has(`${entry.id}@${entry.version}`));

    if (prune.length === 0) {
      process.stdout.write(
        `${infoMessage("recipe cache already clean (no uninstalled entries)")}\n`,
      );
      return 0;
    }

    if (flags.dryRun) {
      for (const entry of prune) {
        process.stdout.write(
          `${infoMessage(`dry-run: would remove ${entry.id}@${entry.version}`)}\n`,
        );
      }
      process.stdout.write(
        `${infoMessage(`dry-run: would remove ${prune.length} cached recipes`)}\n`,
      );
      return 0;
    }

    const recipeDirs = new Set<string>();
    for (const entry of prune) {
      recipeDirs.add(path.dirname(entry.path));
      await rm(entry.path, { recursive: true, force: true });
    }
    for (const recipeDir of recipeDirs) {
      const remaining = await readdir(recipeDir);
      if (remaining.length === 0) {
        await rm(recipeDir, { recursive: true, force: true });
      }
    }

    process.stdout.write(
      `${successMessage("removed cached recipes", undefined, `count=${prune.length}`)}\n`,
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes cache prune", root: opts.rootOverride ?? null });
  }
}

// Note: legacy `cmdRecipes(...)` dispatcher was removed. cli2 command specs are the source of truth.
