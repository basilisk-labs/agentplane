import { existsSync } from "node:fs";
import path from "node:path";

/**
 * @typedef {{
 *   repoRoot: string;
 *   packageRoot: string;
 *   repoBin: string;
 *   repoCli: string;
 * }} FrameworkCheckout
 */

/**
 * @typedef {{
 *   cwd: string;
 *   thisBin: string;
 * }} FrameworkBinaryContextOptions
 */

/**
 * @typedef {{
 *   inFrameworkCheckout: boolean;
 *   isRepoLocalBinary: boolean;
 *   checkout: FrameworkCheckout | null;
 *   thisBin: string;
 * }} FrameworkBinaryContext
 */

function fileExists(p) {
  return existsSync(p);
}

/**
 * @param {string} startDir
 * @returns {FrameworkCheckout | null}
 */
export function findFrameworkCheckout(startDir) {
  let dir = path.resolve(startDir);
  for (;;) {
    const packageRoot = path.join(dir, "packages", "agentplane");
    const repoBin = path.join(packageRoot, "bin", "agentplane.js");
    const repoCli = path.join(packageRoot, "src", "cli.ts");
    if (fileExists(repoBin) && fileExists(repoCli)) {
      return {
        repoRoot: dir,
        packageRoot,
        repoBin,
        repoCli,
      };
    }

    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

/**
 * @param {FrameworkBinaryContextOptions} options
 * @returns {FrameworkBinaryContext}
 */
export function resolveFrameworkBinaryContext(options) {
  const cwd = path.resolve(options.cwd);
  const thisBin = path.resolve(options.thisBin);
  const checkout = findFrameworkCheckout(cwd);
  if (!checkout) {
    return {
      inFrameworkCheckout: false,
      isRepoLocalBinary: false,
      checkout: null,
      thisBin,
    };
  }

  return {
    inFrameworkCheckout: true,
    isRepoLocalBinary: path.resolve(checkout.repoBin) === thisBin,
    checkout,
    thisBin,
  };
}
