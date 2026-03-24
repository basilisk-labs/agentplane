import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const INDEX_PATH = path.join(ROOT, "agentplane-recipes", "index.json");
const RECIPES_ROOT = path.join(ROOT, "agentplane-recipes", "recipes");
const OUTPUT_PATH = path.join(ROOT, "docs", "recipes-inventory.json");
const SUPPORTED_RUN_PROFILE_FIELDS = [
  "mode",
  "sandbox",
  "requires_human_approval",
  "writes_artifacts_to",
  "expected_exit_contract",
];

const RUNTIME_CONTRACT = {
  install_root: ".agentplane/recipes/<recipe-id>/",
  public_entrypoint: "scenario",
  scenario_run: "preview-only",
  scenario_execute: "materialize-task-and-runner-execution",
  task_run: "shared-runner-task-entrypoint",
  notes: [
    "Recipe-local agents, skills, tools, and scenarios stay inside the recipe bundle.",
    "scenario run validates compatibility and file references and prints a prepared plan without creating run artifacts.",
    "scenario execute materializes a task from the scenario task_template and runs it through the shared runner contract.",
  ],
};

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

function runBunx(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("bunx", args, {
      cwd: ROOT,
      stdio: "inherit",
      env: process.env,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) return resolve();
      reject(new Error(`bunx ${args.join(" ")} failed with exit code ${code ?? "unknown"}`));
    });
  });
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function buildInventory() {
  const index = await readJson(INDEX_PATH);
  const indexRecipes = Array.isArray(index.recipes) ? index.recipes : [];
  const recipes = [];

  for (const entry of indexRecipes.toSorted((left, right) =>
    String(left.id).localeCompare(String(right.id)),
  )) {
    const recipeId = String(entry.id ?? "").trim();
    if (!recipeId) continue;
    const manifestPath = path.join(RECIPES_ROOT, recipeId, "manifest.json");
    const manifest = await readJson(manifestPath);
    if (manifest.id !== recipeId) {
      throw new Error(
        `recipes inventory source mismatch: index id ${JSON.stringify(recipeId)} does not match manifest id ${JSON.stringify(manifest.id)} at ${path.relative(ROOT, manifestPath)}`,
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

async function main() {
  const outputPath = process.argv.includes("--out")
    ? path.resolve(ROOT, process.argv[process.argv.indexOf("--out") + 1] ?? "")
    : OUTPUT_PATH;
  const payload = await buildInventory();
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  await runBunx(["prettier", "--write", outputPath]);
  process.stdout.write(`generated ${path.relative(ROOT, outputPath)}\n`);
}

main().catch((error) => {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
