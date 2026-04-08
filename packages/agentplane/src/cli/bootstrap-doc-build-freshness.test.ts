import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

import * as generatedArtifacts from "../../../../scripts/lib/generated-artifacts.mjs";

const generatedArtifactsRecord = generatedArtifacts as Record<string, unknown>;
const assertAgentplaneCliDistFreshForDocs =
  generatedArtifactsRecord.assertAgentplaneCliDistFreshForDocs as (root?: string) => Promise<void>;

const execFileAsync = promisify(execFile);
const tempRoots: string[] = [];

async function initPackageRepo(): Promise<string> {
  const repoRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-bootstrap-doc-build-"));
  tempRoots.push(repoRoot);

  const packageRoot = path.join(repoRoot, "packages", "agentplane");
  await mkdir(path.join(packageRoot, "src"), { recursive: true });
  await mkdir(path.join(packageRoot, "dist"), { recursive: true });
  await mkdir(path.join(packageRoot, "bin"), { recursive: true });

  await writeFile(path.join(packageRoot, "src", "cli.ts"), "export const cli = 1;\n", "utf8");
  await writeFile(path.join(packageRoot, "src", "index.ts"), "export const index = 1;\n", "utf8");
  await writeFile(
    path.join(packageRoot, "bin", "agentplane.js"),
    "#!/usr/bin/env node\nexport {};\n",
    "utf8",
  );
  await writeFile(path.join(packageRoot, "bin", "runtime-context.js"), "export const x = 1;\n");
  await writeFile(path.join(packageRoot, "bin", "stale-dist-policy.js"), "export const y = 1;\n");
  await writeFile(path.join(packageRoot, "dist", "cli.js"), "export const built = true;\n", "utf8");
  await writeFile(
    path.join(packageRoot, "dist", "index.js"),
    "export const builtIndex = true;\n",
    "utf8",
  );

  await execFileAsync("git", ["init", "-q", "-b", "main"], { cwd: repoRoot });
  await execFileAsync("git", ["config", "user.name", "Bootstrap Doc Test"], { cwd: repoRoot });
  await execFileAsync("git", ["config", "user.email", "bootstrap-doc@example.com"], {
    cwd: repoRoot,
  });
  await execFileAsync("git", ["add", "."], { cwd: repoRoot });
  await execFileAsync("git", ["commit", "-m", "feat: initial package"], { cwd: repoRoot });

  const [{ stdout: head }, cliStat, indexStat] = await Promise.all([
    execFileAsync("git", ["rev-parse", "HEAD"], { cwd: packageRoot }),
    stat(path.join(packageRoot, "src", "cli.ts")),
    stat(path.join(packageRoot, "src", "index.ts")),
  ]);
  await writeFile(
    path.join(packageRoot, "dist", ".build-manifest.json"),
    `${JSON.stringify(
      {
        schema_version: 1,
        git_head: head.trim(),
        src_cli_mtime_ms: cliStat.mtimeMs,
        src_index_mtime_ms: indexStat.mtimeMs,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  await execFileAsync("git", ["add", "."], { cwd: repoRoot });
  await execFileAsync("git", ["commit", "-m", "build: write manifest"], { cwd: repoRoot });

  return repoRoot;
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

async function expectFreshnessError(promise: Promise<unknown>, pattern: RegExp): Promise<void> {
  try {
    await promise;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    expect(message).toMatch(pattern);
    return;
  }
  throw new Error(`Expected promise to reject with ${pattern.toString()}`);
}

describe("assertAgentplaneCliDistFreshForDocs", () => {
  it("rejects stale dist when watched source changed after the manifest build", async () => {
    const repoRoot = await initPackageRepo();
    const cliPath = path.join(repoRoot, "packages", "agentplane", "src", "cli.ts");
    const current = await readFile(cliPath, "utf8");
    await writeFile(cliPath, `${current}export const changed = 2;\n`, "utf8");

    await expectFreshnessError(
      assertAgentplaneCliDistFreshForDocs(repoRoot),
      /CLI dist is stale for bootstrap docs/,
    );
  });

  it("rejects when package dist is missing", async () => {
    const repoRoot = await initPackageRepo();
    await rm(path.join(repoRoot, "packages", "agentplane", "dist"), {
      recursive: true,
      force: true,
    });

    await expectFreshnessError(
      assertAgentplaneCliDistFreshForDocs(repoRoot),
      /CLI dist is missing for bootstrap docs/,
    );
  });
});
