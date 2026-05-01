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
} from "./lib/script-runtime.mjs";

const ROOT = process.cwd();
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
  const worktreeRoot = path.resolve(cwd);
  const localIndexPath = path.join(worktreeRoot, "agentplane-recipes", "index.json");
  if (fs.existsSync(localIndexPath)) {
    return worktreeRoot;
  }

  const commonRepoRoot = resolveCommonRepoRoot(worktreeRoot, options.resolveGit ?? gitRevParse);
  const commonIndexPath = path.join(commonRepoRoot, "agentplane-recipes", "index.json");
  if (fs.existsSync(commonIndexPath)) {
    return commonRepoRoot;
  }

  throw new Error(
    "agentplane-recipes/index.json not found in the current worktree or the common repo root. Fix: git submodule update --init --recursive agentplane-recipes",
  );
}

export function resolveInventoryPaths(cwd = ROOT, options = {}) {
  const worktreeRoot = path.resolve(cwd);
  const sourceRoot = resolveRecipesSourceRoot(worktreeRoot, options);
  return {
    worktreeRoot,
    sourceRoot,
    indexPath: path.join(sourceRoot, "agentplane-recipes", "index.json"),
    recipesRoot: path.join(sourceRoot, "agentplane-recipes", "recipes"),
    outputPath: path.join(worktreeRoot, "docs", "recipes-inventory.json"),
  };
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
      source: `agentplane-recipes/recipes/${recipeId}`,
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
    const { outputPath: defaultOutputPath } = resolveInventoryPaths(cwd);
    const outputPath = resolveOutPathArg(argv, cwd, defaultOutputPath);
    const payload = await buildInventory(cwd);
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
