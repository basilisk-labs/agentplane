// Build-time public interface inventory. This does not read task authority or invoke observers.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { PLAN_VALIDATION_CAPABILITIES } from "../../../../packages/agentplane/src/commands/task/planning-capabilities.ts";
import { createNativeRecipeApplicabilityObservers } from "../../../../packages/agentplane/src/runner/context/recipe-native-observers.ts";
const files = [
  "packages/agentplane/src/commands/recipes/impl/apply.ts",
  "packages/agentplane/src/commands/recipes/impl/explicit-selection.ts",
  "packages/agentplane/src/runner/context/recipe-plan-validation.ts",
  "packages/recipes/src/manifest.ts",
  "packages/recipes/src/scenario-parameters.ts",
  "packages/recipes/src/scenario-compiler.ts",
  "packages/agentplane/src/runner/context/recipe-native-observers.ts",
  "packages/agentplane/src/runtime/capabilities/backend.ts",
  "packages/agentplane/src/commands/task/planning-capabilities.ts",
  "packages/agentplane/src/commands/task/create-plan-proposal.ts",
  "packages/agentplane/src/runner/context/recipe-closure.ts",
];
const command = (requirePlanner) => ({
  config: { agents: { approvals: { require_planner: requirePlanner } } },
});
const keys = (value) => [...createNativeRecipeApplicabilityObservers(command(value)).values.keys()];
console.log(
  JSON.stringify(
    {
      schema_version: 1,
      discovery:
        "Synthetic config used only to enumerate keys; no readers or capability callbacks executed.",
      scope:
        "Source-pinned public interface guidance; no observer values, task authority or native admission.",
      observed_value_keys: keys(),
      conditional_observed_value_keys: keys(true).filter((key) => !keys().includes(key)),
      validation_capabilities: [...PLAN_VALIDATION_CAPABILITIES],
      rules: [
        "ScenarioV2 archives require BOTH manifest schema_version 2 and compatibility.scenario_api_version 2; otherwise installer uses ScenarioV1 reader. A manifestV2 requires explicit kind project_overlay. Individually valid manifest1 and scenario2 do not form an installable package.",
        "Actual installer asset validation checks declared nonempty markdown agents/skills, tool entrypoint and prompt asset existence, prompt module/mutation asset contracts, scenario reader version and equality of scenario id to descriptor id. Package asset success is not installation or admission.",
        "Native explicit selected_recipe entry requires a unique project-installed Recipe id/version and scenario id with API2, compatible actual package/runtime metadata, contained stable source files, actual context sources, computed and retained dependency closure, fresh baseline, task authority and supported declared checks. Legacy resolver defaults are not proof of explicit V2 entry compatibility.",
        "Only {{name}} tokens are substituted. ${name} is literal text. Semantic surfaces: summary, description, goal, criteria descriptions, work-item objectives/context symbol hints, assumptions, unresolved questions and applicability values.",
        "Path substitutions require repo_path parameters and are allowed only in applicability paths, work-item scope roots/context required or optional sources, and path resource claims. Declarations/defaults remain source data. Commands and other fields forbid {{name}} interpolation.",
        "Required graph inputs need actual other producing WorkItems. Public parameter bindings and prose do not create graph outputs or authority.",
        "Any unresolved_questions entry unconditionally yields specialization_required, including exact-match cases. This is not compiled executable admission. Genuine missing task evidence remains required by native gates; do not fabricate it or remove real uncertainty merely to obtain compiled status.",
        "The native observed-value key list below is an interface allowlist. Conditional policy.require_planner exists only when configured boolean. No selection reader exists. Keys cannot be registered by Recipe prose or parameter bindings.",
        "Native applicability capability registry reports backend.<backend_id>.<field> descriptors. It is distinct from task execution authority. Recipe dependency capabilities inventory does not register providers or grant permissions.",
        "Supplied Plan checks require a capability in validation_capabilities, reject provider-kind checks, and require a command for nonsemantic checks. Top-level commands must be declared task checks. Work capabilities also require actual task authority; this public authoring context cannot assert it.",
        "Dependency closure must declare exact resolved commands and capability dependency references. Declaration consistency alone does not prove transitive imports, runtime provenance, containment, retained closure, native applicability or admission.",
        "Static interface compatibility does not decide no-match or near-match applicability. Preserve their registered exclusion or missing-binding specialization/fallback without inventing an observer or default binding.",
      ],
      sources: files.map((path) => ({
        path,
        sha256: createHash("sha256").update(readFileSync(path)).digest("hex"),
      })),
    },
    null,
    2,
  ),
);
