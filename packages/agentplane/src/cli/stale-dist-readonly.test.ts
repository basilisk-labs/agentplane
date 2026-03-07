import { execFile } from "node:child_process";
import { chmod, copyFile, mkdtemp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const tempRoots: string[] = [];
const workspaceRoot = process.cwd();
type ExecFileError = Error & { stderr?: string };

async function setupFrameworkCheckout() {
  const repoRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-stale-readonly-"));
  tempRoots.push(repoRoot);

  const packageRoot = path.join(repoRoot, "packages", "agentplane");
  const binDir = path.join(packageRoot, "bin");
  const srcDir = path.join(packageRoot, "src");
  const distDir = path.join(packageRoot, "dist");

  await mkdir(binDir, { recursive: true });
  await mkdir(srcDir, { recursive: true });
  await mkdir(distDir, { recursive: true });

  await writeFile(path.join(packageRoot, "package.json"), '{\n  "type": "module"\n}\n', "utf8");
  await copyFile(
    path.join(workspaceRoot, "packages", "agentplane", "bin", "agentplane.js"),
    path.join(binDir, "agentplane.js"),
  );
  await copyFile(
    path.join(workspaceRoot, "packages", "agentplane", "bin", "dist-guard.js"),
    path.join(binDir, "dist-guard.js"),
  );
  await copyFile(
    path.join(workspaceRoot, "packages", "agentplane", "bin", "runtime-context.js"),
    path.join(binDir, "runtime-context.js"),
  );
  await copyFile(
    path.join(workspaceRoot, "packages", "agentplane", "bin", "runtime-watch.js"),
    path.join(binDir, "runtime-watch.js"),
  );
  await copyFile(
    path.join(workspaceRoot, "packages", "agentplane", "bin", "stale-dist-policy.js"),
    path.join(binDir, "stale-dist-policy.js"),
  );

  const repoBin = path.join(binDir, "agentplane.js");
  await chmod(repoBin, 0o755);
  await writeFile(path.join(srcDir, "cli.ts"), "export const cli = true;\n", "utf8");
  await writeFile(path.join(srcDir, "index.ts"), "export const index = true;\n", "utf8");
  await writeFile(
    path.join(distDir, "cli.js"),
    [
      "#!/usr/bin/env node",
      String.raw`process.stdout.write("DIST" + JSON.stringify({ args: process.argv.slice(2), cwd: process.cwd() }) + "\n");`,
      "",
    ].join("\n"),
    "utf8",
  );

  await execFileAsync("git", ["init", "-q", "-b", "main"], { cwd: repoRoot });
  await execFileAsync("git", ["config", "user.name", "Stale Readonly Test"], { cwd: repoRoot });
  await execFileAsync("git", ["config", "user.email", "stale-readonly@example.com"], {
    cwd: repoRoot,
  });
  await execFileAsync("git", ["add", "."], { cwd: repoRoot });
  await execFileAsync("git", ["commit", "-m", "feat: initial framework checkout"], {
    cwd: repoRoot,
  });

  const [head, cliStat, indexStat] = await Promise.all([
    execFileAsync("git", ["rev-parse", "HEAD"], { cwd: packageRoot }),
    stat(path.join(srcDir, "cli.ts")),
    stat(path.join(srcDir, "index.ts")),
  ]);
  const manifest = {
    schema_version: 1,
    git_head: head.stdout.trim(),
    src_cli_mtime_ms: cliStat.mtimeMs,
    src_index_mtime_ms: indexStat.mtimeMs,
  };
  await writeFile(
    path.join(distDir, ".build-manifest.json"),
    `${JSON.stringify(manifest)}\n`,
    "utf8",
  );

  const cliPath = path.join(srcDir, "cli.ts");
  const current = await readFile(cliPath, "utf8");
  await writeFile(cliPath, `${current}export const dirty = true;\n`, "utf8");

  return { repoRoot, repoBin };
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("stale-dist read-only diagnostics", () => {
  it("warns but runs doctor when watched runtime paths are dirty", async () => {
    const { repoRoot, repoBin } = await setupFrameworkCheckout();

    const { stdout, stderr } = await execFileAsync(process.execPath, [repoBin, "doctor"], {
      cwd: repoRoot,
      encoding: "utf8",
    });

    expect(stdout).toContain("DIST");
    expect(stdout).toContain('"args":["doctor"]');
    expect(stderr).toContain(
      "allowing read-only diagnostic command to run with a stale repo build",
    );
    expect(stderr).toContain("command: doctor");
  });

  it("warns but runs runtime explain when watched runtime paths are dirty", async () => {
    const { repoRoot, repoBin } = await setupFrameworkCheckout();

    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      [repoBin, "runtime", "explain", "--json"],
      {
        cwd: repoRoot,
        encoding: "utf8",
      },
    );

    expect(stdout).toContain("DIST");
    expect(stdout).toContain('"args":["runtime","explain","--json"]');
    expect(stderr).toContain("command: runtime explain --json");
  });

  it("still blocks strict commands when watched runtime paths are dirty", async () => {
    const { repoRoot, repoBin } = await setupFrameworkCheckout();

    const failure = (await execFileAsync(process.execPath, [repoBin, "task", "list"], {
      cwd: repoRoot,
      encoding: "utf8",
    }).then(
      () => null,
      (error: unknown) => error as ExecFileError,
    )) satisfies ExecFileError | null;

    expect(failure).toBeTruthy();
    expect(String(failure?.stderr ?? "")).toContain("refusing to run a stale repo build");
  });
});
