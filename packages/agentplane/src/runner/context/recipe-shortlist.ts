import type { ResolvedProject } from "@agentplaneorg/core/project";
import { parseScenarioDefinition, type RecipeCandidateSummary } from "@agentplaneorg/recipes";
import {
  readExplicitRecipeRegistry,
  readExplicitInstalledRecipeSource,
} from "../../commands/recipes/impl/explicit-selection.js";
import {
  buildRecipeResolverContext,
  resolveRecipeCompatibility,
} from "../../commands/recipes/impl/resolver.js";

const compare = (left: string, right: string) => (left < right ? -1 : left > right ? 1 : 0);
const MAX_PACKAGES = 16;
const MAX_SCENARIOS = 32;
const MAX_CANDIDATES = 8;
const MAX_SUMMARY_BYTES = 16 * 1024;

/** Called only after the native coordinator already requires a PLANNER episode.
 * No objective, prose, tags, score or model is used to infer semantic applicability.
 */
export async function summarizeRecipeCandidates(
  project: ResolvedProject,
): Promise<RecipeCandidateSummary> {
  const summary: RecipeCandidateSummary = {
    schema_version: 1,
    purpose: "planning_advice_only",
    semantic_applicability: "not_assessed",
    status: "complete",
    candidates: [],
    omitted: 0,
    unavailable: 0,
  };
  let registry: Awaited<ReturnType<typeof readExplicitRecipeRegistry>>;
  try {
    registry = await readExplicitRecipeRegistry(project);
  } catch (error) {
    if ((error as { code?: string }).code !== "ENOENT") {
      summary.status = "unavailable";
      summary.unavailable = 1;
    }
    return summary;
  }
  const context = await buildRecipeResolverContext({ project });
  const entries = registry.recipes.toSorted(
    (a, b) => compare(a.id, b.id) || compare(a.version, b.version) || compare(a.path, b.path),
  );
  summary.omitted = Math.max(0, entries.length - MAX_PACKAGES);
  let examined = 0;
  for (const entry of entries.slice(0, MAX_PACKAGES)) {
    if (
      entries.filter((other) => other.id === entry.id && other.version === entry.version).length !==
      1
    ) {
      summary.unavailable += 1;
      continue;
    }
    try {
      const source = await readExplicitInstalledRecipeSource(project, entry, {
        max_bytes: 1024 * 1024,
      });
      const scenarios = (source.manifest.scenarios ?? []).toSorted((a, b) => compare(a.id, b.id));
      for (const descriptor of scenarios) {
        if (examined >= MAX_SCENARIOS) {
          summary.omitted += 1;
          continue;
        }
        examined += 1;
        try {
          if (scenarios.filter((other) => other.id === descriptor.id).length !== 1)
            throw new Error("Ambiguous scenario identity");
          const scenario = parseScenarioDefinition(await source.read(descriptor.file), ["2"]);
          if (scenario.schema_version !== "2" || scenario.id !== descriptor.id)
            throw new Error("Scenario identity mismatch");
          const compatibility = resolveRecipeCompatibility({
            compatibility: source.manifest.compatibility,
            context: {
              ...context,
              manifest_api_version: source.manifest.schema_version,
              scenario_api_version: "2",
            },
          });
          if (!compatibility.ok) continue;
          const selection = {
            recipe_id: entry.id,
            recipe_version: entry.version,
            scenario_id: scenario.id,
            scenario_api_version: "2" as const,
          };
          const reasons = [...new Set(compatibility.reasons)].toSorted(compare);
          if (
            Object.values(selection).some((value) => value.length > 256) ||
            reasons.length > 8 ||
            reasons.some((reason) => reason.length > 256)
          )
            throw new Error("Candidate summary exceeds bounded fields");
          if (summary.candidates.length >= MAX_CANDIDATES) summary.omitted += 1;
          else {
            summary.candidates.push({ selection, reasons });
            // Reserve room for final status/counters without truncating any exact identity.
            if (Buffer.byteLength(JSON.stringify(summary), "utf8") > MAX_SUMMARY_BYTES - 256) {
              summary.candidates.pop();
              summary.omitted += 1;
            }
          }
        } catch {
          summary.unavailable += 1;
        }
      }
    } catch {
      summary.unavailable += 1;
    }
  }
  if (summary.omitted > 0) summary.status = "bounded";
  else if (summary.unavailable > 0) summary.status = "unavailable";
  return summary;
}
