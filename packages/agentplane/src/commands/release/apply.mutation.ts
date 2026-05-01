import { saveConfig, setByDottedKey, loadConfig } from "@agentplaneorg/core/config";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import {
  resolvePreferredNodeExecutable,
  withPreferredRuntimePath,
} from "../../shared/runtime-env.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";

export async function replacePackageVersionInFile(
  pkgJsonPath: string,
  nextVersion: string,
): Promise<void> {
  const text = await readFile(pkgJsonPath, "utf8");
  const replaced = text.replace(/"version"\s*:\s*"[^"]*"/u, `"version": "${nextVersion}"`);
  if (replaced === text) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Failed to update version in ${pkgJsonPath} (missing "version" field).`,
    });
  }
  await writeFile(pkgJsonPath, replaced, "utf8");
}

export async function replaceRecipesRuntimeVersionInFile(
  sourcePath: string,
  nextVersion: string,
): Promise<void> {
  const text = await readFile(sourcePath, "utf8");
  const replaced = text.replace(
    /export\s+const\s+RECIPES_VERSION\s*=\s*["'][^"']*["']\s*;/u,
    `export const RECIPES_VERSION = "${nextVersion}";`,
  );
  if (replaced === text) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Failed to update RECIPES_VERSION in ${sourcePath}.`,
    });
  }
  await writeFile(sourcePath, replaced, "utf8");
}

export async function replaceAgentplanePackageMetadata(
  pkgJsonPath: string,
  nextVersion: string,
): Promise<void> {
  const text = await readFile(pkgJsonPath, "utf8");
  const withVersion = text.replace(/"version"\s*:\s*"[^"]*"/u, `"version": "${nextVersion}"`);
  if (withVersion === text) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Failed to update version in ${pkgJsonPath} (missing "version" field).`,
    });
  }
  const withDependency = withVersion.replace(
    /("@agentplaneorg[/]core"\s*:\s*")[^"]*(")/u,
    `$1${nextVersion}$2`,
  );
  if (withDependency === withVersion) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Failed to update @agentplaneorg/core dependency in ${pkgJsonPath}. ` +
        "Ensure packages/agentplane/package.json declares this dependency.",
    });
  }
  const withRecipesDependency = withDependency.replace(
    /("@agentplaneorg\/recipes"\s*:\s*")[^"]*(")/u,
    `$1${nextVersion}$2`,
  );
  if (withRecipesDependency === withDependency) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Failed to update @agentplaneorg/recipes dependency in ${pkgJsonPath}. ` +
        "Ensure packages/agentplane/package.json declares this dependency.",
    });
  }
  await writeFile(pkgJsonPath, withRecipesDependency, "utf8");
}

export async function replacePackageDependencyVersion(
  pkgJsonPath: string,
  dependencyName: string,
  nextVersion: string,
): Promise<void> {
  const text = await readFile(pkgJsonPath, "utf8");
  const pattern = new RegExp(
    String.raw`("${dependencyName.replace("/", String.raw`\/`)}"\s*:\s*")[^"]*(")`,
    "u",
  );
  const replaced = text.replace(pattern, `$1${nextVersion}$2`);
  if (replaced === text) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Failed to update ${dependencyName} dependency in ${pkgJsonPath}. ` +
        "Ensure the package.json declares this dependency.",
    });
  }
  await writeFile(pkgJsonPath, replaced, "utf8");
}

export async function packageDependencyExists(
  pkgJsonPath: string,
  dependencyName: string,
): Promise<boolean> {
  const raw = JSON.parse(await readFile(pkgJsonPath, "utf8")) as {
    dependencies?: Record<string, unknown>;
  };
  return typeof raw.dependencies?.[dependencyName] === "string";
}

export async function maybeUpdateBunLockfile(
  gitRoot: string,
  fileExists: (p: string) => Promise<boolean>,
): Promise<void> {
  const bunLockPath = path.join(gitRoot, "bun.lock");
  const rootPkgPath = path.join(gitRoot, "package.json");
  if (!(await fileExists(bunLockPath))) return;
  if (!(await fileExists(rootPkgPath))) return;

  try {
    await execFileAsync("bun", ["install", "--ignore-scripts"], {
      cwd: gitRoot,
      env: withPreferredRuntimePath(process.env),
      maxBuffer: 50 * 1024 * 1024,
    });
  } catch (err) {
    const e = err as { message?: string } | null;
    throw new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message:
        "Failed to update bun.lock via `bun install --ignore-scripts`.\n" +
        "Fix:\n" +
        "  1) Run `bun install --ignore-scripts` manually\n" +
        "  2) Re-run `agentplane release apply`\n" +
        (e?.message ? `\nDetails:\n${e.message}` : ""),
    });
  }
}

export async function maybeRefreshGeneratedReference(
  gitRoot: string,
  fileExists: (p: string) => Promise<boolean>,
): Promise<boolean> {
  const scriptPath = path.join(gitRoot, "scripts", "generate-website-docs.mjs");
  if (!(await fileExists(scriptPath))) return false;

  try {
    await execFileAsync(resolvePreferredNodeExecutable(process.env), [scriptPath], {
      cwd: gitRoot,
      env: withPreferredRuntimePath(process.env),
      maxBuffer: 20 * 1024 * 1024,
    });
  } catch (err) {
    const e = err as { message?: string } | null;
    throw new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message:
        "Failed to refresh docs/reference/generated-reference.mdx after bumping release versions.\n" +
        "Fix:\n" +
        "  1) Run `node scripts/generate-website-docs.mjs`\n" +
        "  2) Re-run `agentplane release apply`\n" +
        (e?.message ? `\nDetails:\n${e.message}` : ""),
    });
  }

  return await fileExists(path.join(gitRoot, "docs", "reference", "generated-reference.mdx"));
}

export async function maybePersistExpectedCliVersion(
  agentplaneDir: string,
  nextVersion: string,
): Promise<boolean> {
  const loaded = await loadConfig(agentplaneDir);
  if (!loaded.exists) return false;

  const raw = { ...loaded.raw };
  setByDottedKey(raw, "framework.cli.expected_version", nextVersion);
  await saveConfig(agentplaneDir, raw);
  return true;
}

export function cleanHookEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...gitEnv() };
  delete env.AGENTPLANE_TASK_ID;
  delete env.AGENTPLANE_STATUS_TO;
  delete env.AGENTPLANE_AGENT_ID;
  env.AGENTPLANE_ALLOW_CONFIG = "1";
  return withPreferredRuntimePath(env);
}
