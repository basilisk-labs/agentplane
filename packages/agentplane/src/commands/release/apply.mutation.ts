import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync, gitEnv } from "../shared/git.js";

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
    /("@agentplaneorg\/core"\s*:\s*")[^"]*(")/u,
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
  await writeFile(pkgJsonPath, withDependency, "utf8");
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
      env: process.env,
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
    await execFileAsync("node", [scriptPath], {
      cwd: gitRoot,
      env: process.env,
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

export function cleanHookEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...gitEnv() };
  delete env.AGENTPLANE_TASK_ID;
  delete env.AGENTPLANE_STATUS_TO;
  delete env.AGENTPLANE_AGENT_ID;
  return env;
}
