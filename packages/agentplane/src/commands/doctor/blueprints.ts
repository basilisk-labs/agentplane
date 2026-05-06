import {
  projectBlueprintsDirectory,
  validateProjectBlueprintDirectory,
} from "../../blueprints/index.js";

export async function checkProjectBlueprints(repoRoot: string): Promise<string[]> {
  const result = await validateProjectBlueprintDirectory(projectBlueprintsDirectory(repoRoot));
  if (result.files.length === 0) return [];
  return result.files.flatMap((file) =>
    file.errors.map(
      (error) =>
        `[WARN] Project blueprint ${file.path} is invalid: ${error.code}: ${error.message}`,
    ),
  );
}
