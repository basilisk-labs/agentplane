import { buildProjectBlueprintCompatibilityReport } from "../../blueprints/index.js";

export async function checkProjectBlueprints(repoRoot: string): Promise<string[]> {
  const result = await buildProjectBlueprintCompatibilityReport(repoRoot);
  return [
    `[INFO] Project blueprint compatibility: ${
      result.compatible ? "compatible" : "incompatible"
    }; trusted=${result.trustedBlueprintIds.length}`,
    ...result.blueprints.flatMap((blueprint) =>
      blueprint.errors.map(
        (error) =>
          `[WARN] Project blueprint ${blueprint.path} is invalid: ${error.code}: ${error.message}`,
      ),
    ),
    ...result.errors
      .filter((error) => !result.blueprints.some((blueprint) => blueprint.errors.includes(error)))
      .map(
        (error) =>
          `[WARN] Project blueprint trust config is invalid: ${error.code}: ${error.message}`,
      ),
  ];
}
