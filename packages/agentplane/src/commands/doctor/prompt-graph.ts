import { renderDiagnosticFinding } from "../shared/diagnostics.js";
import {
  inspectProjectPromptGraph,
  type PromptGraphInspection,
} from "../shared/prompt-graph-diagnostics.js";

function refreshCommand(inspection: PromptGraphInspection): string {
  const [firstActiveRecipe] = inspection.activeRecipeIds;
  if (firstActiveRecipe) return `agentplane recipes enable ${firstActiveRecipe}`;
  return "agentplane recipes explain-active";
}

function artifactDetail(inspection: PromptGraphInspection): string[] {
  return [
    `Artifact: ${inspection.artifactPath ?? "unresolved"}`,
    `Active recipes: ${
      inspection.activeRecipeIds.length > 0 ? inspection.activeRecipeIds.join(", ") : "none"
    }`,
    ...(inspection.summary
      ? [
          `Modules: ${inspection.summary.moduleCount}; repo overrides: ${inspection.summary.repoOverrideCount}`,
          `Owners: ${JSON.stringify(inspection.summary.ownerCounts)}`,
          `Provenance: ${JSON.stringify(inspection.summary.sourceKindCounts)}`,
        ]
      : []),
  ];
}

export async function checkPromptGraphFacts(project: {
  agentplaneDir: string;
}): Promise<string[]> {
  const inspection = await inspectProjectPromptGraph(project);
  const findings: string[] = [];

  if (inspection.artifactState === "invalid") {
    findings.push(
      renderDiagnosticFinding({
        severity: "ERROR",
        state: "generated prompt graph is unreadable or violates the prompt module contract",
        likelyCause:
          "the generated artifact was edited manually or produced by an older incompatible runtime",
        nextAction: {
          command: refreshCommand(inspection),
          reason: "re-publish recipe prompt artifacts from the current registry before relying on them",
        },
        details: [...artifactDetail(inspection), ...(inspection.error ? [inspection.error] : [])],
      }),
    );
  }

  if (inspection.artifactState === "compile_error") {
    findings.push(
      renderDiagnosticFinding({
        severity: "ERROR",
        state: "expected prompt graph cannot be compiled from the current recipe registry",
        likelyCause:
          "active recipe prompt modules or mutation sets drifted from the validated manifest contract",
        nextAction: {
          command: refreshCommand(inspection),
          reason: "surface the recipe compilation failure through the normal recipe command path",
        },
        details: [...artifactDetail(inspection), ...(inspection.error ? [inspection.error] : [])],
      }),
    );
  }

  if (inspection.artifactState === "missing") {
    findings.push(
      renderDiagnosticFinding({
        severity: "WARN",
        state: "active recipes exist but the generated prompt graph is missing",
        likelyCause:
          "recipe state was created before prompt graph publication or generated artifacts were deleted",
        nextAction: {
          command: refreshCommand(inspection),
          reason: "re-publish generated recipe artifacts for the active recipe set",
        },
        details: artifactDetail(inspection),
      }),
    );
  }

  if (inspection.artifactState === "stale") {
    findings.push(
      renderDiagnosticFinding({
        severity: "WARN",
        state: "generated prompt graph is stale relative to current recipe inputs",
        likelyCause:
          "the recipe registry, vendored recipe assets, or framework prompt modules changed after the artifact was published",
        nextAction: {
          command: refreshCommand(inspection),
          reason: "re-publish generated prompt artifacts from current inputs",
        },
        details: artifactDetail(inspection),
      }),
    );
  }

  for (const diagnostic of inspection.diagnostics) {
    findings.push(
      renderDiagnosticFinding({
        severity: diagnostic.severity === "error" ? "ERROR" : "WARN",
        state: `compiled prompt graph reports ${diagnostic.code}`,
        likelyCause: diagnostic.message,
        nextAction: {
          command: refreshCommand(inspection),
          reason: "recompile the graph after correcting the referenced module or mutation",
        },
        details: [
          ...artifactDetail(inspection),
          ...(diagnostic.module_address ? [`Module: ${diagnostic.module_address}`] : []),
          ...(diagnostic.mutation_id ? [`Mutation: ${diagnostic.mutation_id}`] : []),
          ...(diagnostic.validator_id ? [`Validator: ${diagnostic.validator_id}`] : []),
        ],
      }),
    );
  }

  return findings;
}
