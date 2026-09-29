import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import {
  defineScript,
  isDirectRun,
  resolveOutPathArg,
  runBunx,
  runScriptMain,
} from "../lib/script-runtime.mjs";

const ROOT = process.cwd();
const RECIPES_SOURCE_ENV = "AGENTPLANE_RECIPES_SOURCE";
const RECIPES_REPOSITORY_URL = "https://github.com/basilisk-labs/agentplane-recipes";
const SUPPORTED_RUN_PROFILE_FIELDS = [
  "mode",
  "sandbox",
  "requires_human_approval",
  "writes_artifacts_to",
  "expected_exit_contract",
];

const RUNTIME_CONTRACT = {
  install_root: ".agentplane/recipes/<recipe-id>/",
  public_entrypoint: "recipes add / recipes active / recipes explain",
  task_run: "shared-runner-task-entrypoint",
  notes: [
    "Recipe-local agents, skills, tools, and scenarios stay inside the recipe bundle.",
    "Scenario assets remain recipe-owned internals rather than a first-class public CLI domain.",
    "Task materialization and execution stay on the shared runner contract instead of a parallel public scenario runtime.",
  ],
};

function gitRevParse(cwd, args) {
  return execFileSync("git", ["rev-parse", ...args], {
    cwd,
    encoding: "utf8",
  }).trim();
}

export function resolveCommonRepoRoot(cwd = ROOT, resolveGit = gitRevParse) {
  const repoRoot = path.resolve(resolveGit(cwd, ["--show-toplevel"]));
  const commonDirRaw = resolveGit(cwd, ["--git-common-dir"]);
  const commonDir = path.resolve(
    path.isAbsolute(commonDirRaw) ? commonDirRaw : path.join(repoRoot, commonDirRaw),
  );
  return path.basename(commonDir) === ".git" ? path.dirname(commonDir) : repoRoot;
}

export function resolveRecipesSourceRoot(cwd = ROOT, options = {}) {
  const configuredSource = String(
    options.recipesSource ??
      options.env?.[RECIPES_SOURCE_ENV] ??
      process.env[RECIPES_SOURCE_ENV] ??
      "",
  ).trim();
  if (!configuredSource) {
    throw new Error(
      `recipes source is required; pass --recipes-source <path> or set ${RECIPES_SOURCE_ENV} to a checkout of ${RECIPES_REPOSITORY_URL}`,
    );
  }

  const sourceRoot = path.resolve(cwd, configuredSource);
  const missing = ["index.json", "recipes"].filter(
    (relativePath) => !fs.existsSync(path.join(sourceRoot, relativePath)),
  );
  if (missing.length > 0) {
    throw new Error(
      `invalid recipes source ${JSON.stringify(sourceRoot)}: missing ${missing.join(", ")}`,
    );
  }
  return sourceRoot;
}

export function resolveInventoryPaths(cwd = ROOT, options = {}) {
  const worktreeRoot = path.resolve(cwd);
  const sourceRoot = resolveRecipesSourceRoot(worktreeRoot, options);
  return {
    worktreeRoot,
    sourceRoot,
    indexPath: path.join(sourceRoot, "index.json"),
    recipesRoot: path.join(sourceRoot, "recipes"),
    outputPath: path.join(worktreeRoot, "docs", "recipes-inventory.json"),
  };
}

function resolveRecipesSourceArg(argv) {
  const sourceIndex = argv.indexOf("--recipes-source");
  if (sourceIndex === -1) return;
  const value = argv[sourceIndex + 1];
  if (!value || value.startsWith("-")) {
    throw new Error("Missing value for --recipes-source");
  }
  return value;
}

function normalizeStringList(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((entry) => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function pickRunProfile(value) {
  const source = value && typeof value === "object" ? value : {};
  const output = {};
  for (const key of SUPPORTED_RUN_PROFILE_FIELDS) {
    if (!(key in source)) continue;
    output[key] = source[key];
  }
  return output;
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function buildInventory(cwd = ROOT, options = {}) {
  const { indexPath, recipesRoot, worktreeRoot } = resolveInventoryPaths(cwd, options);
  const index = await readJson(indexPath);
  const indexRecipes = Array.isArray(index.recipes) ? index.recipes : [];
  const recipes = [];

  for (const entry of indexRecipes.toSorted((left, right) =>
    String(left.id).localeCompare(String(right.id)),
  )) {
    const recipeId = String(entry.id ?? "").trim();
    if (!recipeId) continue;
    const manifestPath = path.join(recipesRoot, recipeId, "manifest.json");
    const manifest = await readJson(manifestPath);
    if (manifest.id !== recipeId) {
      throw new Error(
        `recipes inventory source mismatch: index id ${JSON.stringify(recipeId)} does not match manifest id ${JSON.stringify(manifest.id)} at ${path.relative(worktreeRoot, manifestPath)}`,
      );
    }

    const scenarios = Array.isArray(manifest.scenarios) ? manifest.scenarios : [];
    recipes.push({
      id: recipeId,
      name: String(manifest.name ?? recipeId),
      version: String(manifest.version ?? ""),
      summary: String(manifest.summary ?? ""),
      source: `${RECIPES_REPOSITORY_URL}/tree/main/recipes/${recipeId}`,
      self_contained: true,
      scenarios: scenarios
        .map((scenario) => ({
          id: String(scenario.id ?? ""),
          summary: String(scenario.summary ?? ""),
          use_when: normalizeStringList(scenario.use_when),
          required_inputs: normalizeStringList(scenario.required_inputs),
          outputs: normalizeStringList(scenario.outputs),
          agents_involved: normalizeStringList(scenario.agents_involved),
          skills_used: normalizeStringList(scenario.skills_used),
          tools_used: normalizeStringList(scenario.tools_used),
          run_profile: pickRunProfile(scenario.run_profile),
        }))
        .toSorted((left, right) => left.id.localeCompare(right.id)),
    });
  }

  return {
    schema_version: "recipes-inventory@2",
    runtime_contract: RUNTIME_CONTRACT,
    recipes,
  };
}

const main = defineScript({
  name: "generate-recipes-inventory",
  async run({ argv, cwd = ROOT }) {
    const recipesSource = resolveRecipesSourceArg(argv);
    const { outputPath: defaultOutputPath } = resolveInventoryPaths(cwd, { recipesSource });
    const outputPath = resolveOutPathArg(argv, cwd, defaultOutputPath);
    const payload = await buildInventory(cwd, { recipesSource });
    await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    await runBunx(
      ["prettier", "--config", path.join(cwd, ".prettierrc.json"), "--write", outputPath],
      {
        cwd,
      },
    );
    process.stdout.write(`generated ${path.relative(cwd, outputPath)}\n`);
  },
});

if (isDirectRun(import.meta.url)) {
  runScriptMain(main);
}
