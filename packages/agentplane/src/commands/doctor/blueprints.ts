import { loadTrustedProjectBlueprintRegistry } from "../../blueprints/index.js";

export async function checkProjectBlueprints(repoRoot: string): Promise<string[]> {
  const result = await loadTrustedProjectBlueprintRegistry(repoRoot);
  if (result.files.length === 0) return [];
  return [
    ...result.files.flatMap((file) =>
      file.errors.map(
        (error) =>
          `[WARN] Project blueprint ${file.path} is invalid: ${error.code}: ${error.message}`,
      ),
    ),
    ...result.errors
      .filter((error) => !result.files.some((file) => file.errors.includes(error)))
      .map(
        (error) =>
          `[WARN] Project blueprint trust config is invalid: ${error.code}: ${error.message}`,
      ),
  ];
}
