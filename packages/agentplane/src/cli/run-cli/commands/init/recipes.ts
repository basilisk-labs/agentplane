import { infoMessage } from "../../../output.js";
import { listBundledRecipes } from "../../../recipes-bundled.js";

export function maybeInstallBundledRecipes(recipes: string[]): void {
  if (recipes.length === 0) return;

  if (listBundledRecipes().length === 0) {
    process.stdout.write(`${infoMessage("bundled recipes are empty; nothing to install")}\n`);
    return;
  }

  process.stdout.write(`${infoMessage("bundled recipe install is not implemented; skipping")}\n`);
}
