import path from "node:path";

import type { ResolvedProject } from "@agentplaneorg/core";

import { fileExists } from "../../../cli/fs-utils.js";
import { getVersion } from "../../../meta/version.js";
import { dedupeStrings } from "../../../shared/strings.js";
import { compareVersions } from "../../../shared/version-compare.js";

import { resolveProjectInstalledRecipeDir } from "./paths.js";
import { readProjectInstalledRecipes } from "./project-installed-recipes.js";
import type {
  InstalledRecipeEntry,
  RecipeCompatibility,
  RecipeResolverCompatibility,
  RecipeResolverCompatibilityFailure,
  RecipeResolverContext,
  RecipeRunProfile,
  RecipeScenarioDescriptor,
  ResolveRecipeScenarioSelectionFlags,
  ResolvedRecipeRunProfile,
  ResolvedRecipeScenario,
  ResolvedRecipeScenarioSelection,
} from "./types.js";

const SUPPORTED_MANIFEST_API_VERSION = "1" as const;
const SUPPORTED_SCENARIO_API_VERSION = "1" as const;
const SUPPORTED_RUNTIME_API_VERSION = "1" as const;

async function detectProjectRepoTypes(project: ResolvedProject): Promise<string[]> {
  const repoTypes = ["generic"];
  const checks: [string, string][] = [
    ["package.json", "node"],
    ["pyproject.toml", "python"],
    ["go.mod", "go"],
    ["Cargo.toml", "rust"],
  ];
  for (const [relativePath, repoType] of checks) {
    if (await fileExists(path.join(project.gitRoot, relativePath))) {
      repoTypes.push(repoType);
    }
  }
  return dedupeStrings(repoTypes).toSorted();
}

export async function buildRecipeResolverContext(opts: {
  project: ResolvedProject;
}): Promise<RecipeResolverContext> {
  return {
    agentplane_version: getVersion(),
    manifest_api_version: SUPPORTED_MANIFEST_API_VERSION,
    scenario_api_version: SUPPORTED_SCENARIO_API_VERSION,
    runtime_api_version: SUPPORTED_RUNTIME_API_VERSION,
    platform: process.platform,
    repo_types: await detectProjectRepoTypes(opts.project),
  };
}

function pushCompatibilityFailure(
  failures: RecipeResolverCompatibilityFailure[],
  field: RecipeResolverCompatibilityFailure["field"],
  expected: string | string[],
  actual: string | string[] | null,
  reason: string,
): void {
  failures.push({ field, expected, actual, reason });
}

export function resolveRecipeCompatibility(opts: {
  compatibility?: RecipeCompatibility;
  context: RecipeResolverContext;
}): RecipeResolverCompatibility {
  const reasons: string[] = [];
  const failures: RecipeResolverCompatibilityFailure[] = [];
  const compatibility = opts.compatibility;
  const context = opts.context;

  if (!compatibility) {
    reasons.push("recipe compatibility is unconstrained");
    return { ok: true, reasons, failures };
  }

  if (compatibility.min_agentplane_version) {
    if (compareVersions(context.agentplane_version, compatibility.min_agentplane_version) < 0) {
      pushCompatibilityFailure(
        failures,
        "min_agentplane_version",
        compatibility.min_agentplane_version,
        context.agentplane_version,
        `agentplane ${context.agentplane_version} is older than required ${compatibility.min_agentplane_version}`,
      );
    } else {
      reasons.push(
        `agentplane ${context.agentplane_version} satisfies min ${compatibility.min_agentplane_version}`,
      );
    }
  }

  const versionChecks: {
    field: Extract<
      RecipeResolverCompatibilityFailure["field"],
      "manifest_api_version" | "scenario_api_version" | "runtime_api_version"
    >;
    expected: string | undefined;
    actual: string;
  }[] = [
    {
      field: "manifest_api_version",
      expected: compatibility.manifest_api_version,
      actual: context.manifest_api_version,
    },
    {
      field: "scenario_api_version",
      expected: compatibility.scenario_api_version,
      actual: context.scenario_api_version,
    },
    {
      field: "runtime_api_version",
      expected: compatibility.runtime_api_version,
      actual: context.runtime_api_version,
    },
  ];
  for (const check of versionChecks) {
    if (check.expected === undefined) continue;
    if (check.expected === check.actual) {
      reasons.push(`${check.field}=${check.actual}`);
    } else {
      pushCompatibilityFailure(
        failures,
        check.field,
        check.expected,
        check.actual,
        `${check.field} requires ${check.expected}, active runtime exposes ${check.actual}`,
      );
    }
  }

  if (compatibility.platforms && compatibility.platforms.length > 0) {
    if (compatibility.platforms.includes(context.platform)) {
      reasons.push(`platform ${context.platform} is supported`);
    } else {
      pushCompatibilityFailure(
        failures,
        "platforms",
        compatibility.platforms,
        context.platform,
        `platform ${context.platform} is not supported by recipe`,
      );
    }
  }

  if (compatibility.repo_types && compatibility.repo_types.length > 0) {
    const matched = compatibility.repo_types.filter((repoType) =>
      context.repo_types.includes(repoType),
    );
    if (matched.length > 0) {
      reasons.push(`repo types matched: ${matched.join(", ")}`);
    } else {
      pushCompatibilityFailure(
        failures,
        "repo_types",
        compatibility.repo_types,
        context.repo_types,
        `project repo types ${context.repo_types.join(", ")} do not match recipe requirements`,
      );
    }
  }

  return { ok: failures.length === 0, reasons, failures };
}

export function normalizeResolvedRecipeRunProfile(
  scenario: RecipeScenarioDescriptor,
): ResolvedRecipeRunProfile {
  const declaredProfile: RecipeRunProfile = scenario.run_profile;
  const permissions = dedupeStrings([...scenario.permissions]).toSorted();
  const network = declaredProfile.network ?? permissions.includes("network");
  return {
    mode: declaredProfile.mode,
    sandbox: declaredProfile.sandbox,
    network,
    requires_human_approval: declaredProfile.requires_human_approval ?? false,
    writes_artifacts_to: dedupeStrings(declaredProfile.writes_artifacts_to ?? []).toSorted(),
    expected_exit_contract: declaredProfile.expected_exit_contract,
    permissions,
    agents_involved: dedupeStrings([...scenario.agents_involved]).toSorted(),
    skills_used: dedupeStrings([...scenario.skills_used]).toSorted(),
    tools_used: dedupeStrings([...scenario.tools_used]).toSorted(),
    required_inputs: dedupeStrings([...scenario.required_inputs]).toSorted(),
    outputs: dedupeStrings([...scenario.outputs]).toSorted(),
    artifacts: dedupeStrings([...scenario.artifacts]).toSorted(),
  };
}

function toResolvedRecipeScenarios(opts: {
  project: ResolvedProject;
  entry: InstalledRecipeEntry;
  compatibility: RecipeResolverCompatibility;
}): ResolvedRecipeScenario[] {
  const recipeDir = resolveProjectInstalledRecipeDir(opts.project, opts.entry.id);
  return opts.entry.manifest.scenarios
    .map<ResolvedRecipeScenario>((scenario) => ({
      recipe_id: opts.entry.id,
      recipe_version: opts.entry.version,
      recipe_name: opts.entry.manifest.name,
      recipe_summary: opts.entry.manifest.summary,
      recipe_tags: [...opts.entry.tags].toSorted(),
      recipe_dir: recipeDir,
      scenario_id: scenario.id,
      scenario_name: scenario.name,
      scenario_summary: scenario.summary,
      scenario_description: scenario.description,
      use_when: [...scenario.use_when],
      avoid_when: [...(scenario.avoid_when ?? [])],
      scenario_file: path.join(recipeDir, scenario.file),
      compatibility: opts.compatibility,
      run_profile: normalizeResolvedRecipeRunProfile(scenario),
    }))
    .toSorted((left, right) => left.scenario_id.localeCompare(right.scenario_id));
}

export async function listResolvedRecipeScenarios(opts: {
  project: ResolvedProject;
  recipeId?: string;
  includeIncompatible?: boolean;
}): Promise<ResolvedRecipeScenario[]> {
  const [context, installed] = await Promise.all([
    buildRecipeResolverContext({ project: opts.project }),
    readProjectInstalledRecipes(opts.project),
  ]);

  const results: ResolvedRecipeScenario[] = [];
  for (const entry of installed.recipes) {
    if (opts.recipeId && entry.id !== opts.recipeId) continue;
    const compatibility = resolveRecipeCompatibility({
      compatibility: entry.manifest.compatibility,
      context,
    });
    if (!opts.includeIncompatible && !compatibility.ok) continue;
    results.push(...toResolvedRecipeScenarios({ project: opts.project, entry, compatibility }));
  }

  return results.toSorted((left, right) => {
    const byRecipe = left.recipe_id.localeCompare(right.recipe_id);
    if (byRecipe !== 0) return byRecipe;
    return left.scenario_id.localeCompare(right.scenario_id);
  });
}

export async function resolveRecipeScenarioSelection(opts: {
  project: ResolvedProject;
  flags: ResolveRecipeScenarioSelectionFlags;
}): Promise<ResolvedRecipeScenarioSelection> {
  const requiredTags = dedupeStrings(opts.flags.tags ?? []).toSorted();
  const availableInputs = dedupeStrings(opts.flags.available_inputs ?? []).toSorted();
  const candidates = await listResolvedRecipeScenarios({
    project: opts.project,
    recipeId: opts.flags.recipeId,
    includeIncompatible: opts.flags.includeIncompatible,
  });
  const matches: ResolvedRecipeScenarioSelection[] = [];

  for (const candidate of candidates) {
    if (opts.flags.scenarioId && candidate.scenario_id !== opts.flags.scenarioId) continue;
    if (opts.flags.mode && candidate.run_profile.mode !== opts.flags.mode) continue;
    if (requiredTags.some((tag) => !candidate.recipe_tags.includes(tag))) {
      continue;
    }
    if (
      availableInputs.length > 0 &&
      candidate.run_profile.required_inputs.some((input) => !availableInputs.includes(input))
    ) {
      continue;
    }

    const selectionReasons: string[] = [];
    if (candidate.compatibility.ok) selectionReasons.push("recipe compatibility satisfied");
    if (opts.flags.recipeId)
      selectionReasons.push(`matches requested recipe: ${opts.flags.recipeId}`);
    if (opts.flags.scenarioId) {
      selectionReasons.push(`matches requested scenario: ${opts.flags.scenarioId}`);
    }
    if (requiredTags.length > 0) {
      selectionReasons.push(`matches required tags: ${requiredTags.join(", ")}`);
    }
    if (opts.flags.mode) selectionReasons.push(`matches requested mode: ${opts.flags.mode}`);
    if (availableInputs.length > 0 && candidate.run_profile.required_inputs.length > 0) {
      selectionReasons.push(
        `required inputs satisfied: ${candidate.run_profile.required_inputs.join(", ")}`,
      );
    }
    matches.push({
      ...candidate,
      selection_reasons: selectionReasons,
    });
  }

  if (matches.length === 0) {
    const requestedRecipe = opts.flags.recipeId ? ` recipe=${opts.flags.recipeId}` : "";
    const requestedScenario = opts.flags.scenarioId ? ` scenario=${opts.flags.scenarioId}` : "";
    throw new Error(
      `No recipe scenario matches the requested selection.${requestedRecipe}${requestedScenario}`,
    );
  }

  if (matches.length > 1) {
    const labels = matches.map((match) => `${match.recipe_id}:${match.scenario_id}`).join(", ");
    throw new Error(`Scenario selection is ambiguous: ${labels}`);
  }

  return matches[0];
}
