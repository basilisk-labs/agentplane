import { execFile } from "node:child_process";
import {
  chmod,
  copyFile,
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

import { buildCleanRuntimeModeEnv } from "@agentplane/testkit";

const execFileAsync = promisify(execFile);
const tempRoots: string[] = [];
const workspaceRoot = process.cwd();
const nestedSuffix = path.join("packages", "agentplane", "src", "nested");

type CliPayload = {
  args: string[];
  cwd: string;
  handoff?: string;
};

function buildChildEnv(overrides: NodeJS.ProcessEnv = {}): NodeJS.ProcessEnv {
  return buildCleanRuntimeModeEnv(process.env, overrides);
}

function parsePayload(output: string, prefix: "LOCAL" | "GLOBAL"): CliPayload {
  return JSON.parse(output.replace(new RegExp(`^${prefix}`, "u"), "")) as CliPayload;
}

async function setupGlobalInstall() {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-global-wrapper-"));
  tempRoots.push(root);
  await mkdir(path.join(root, "bin"), { recursive: true });
  await mkdir(path.join(root, "dist"), { recursive: true });

  await writeFile(path.join(root, "package.json"), '{\n  "type": "module"\n}\n', "utf8");
  await copyFile(
    path.join(workspaceRoot, "packages", "agentplane", "bin", "agentplane.js"),
    path.join(root, "bin", "agentplane.js"),
  );
  await copyFile(
    path.join(workspaceRoot, "packages", "agentplane", "bin", "framework-dev-contract.js"),
    path.join(root, "bin", "framework-dev-contract.js"),
  );
  await copyFile(
    path.join(workspaceRoot, "packages", "agentplane", "bin", "runtime-context.js"),
    path.join(root, "bin", "runtime-context.js"),
  );
  await copyFile(
    path.join(workspaceRoot, "packages", "agentplane", "bin", "runtime-watch.js"),
    path.join(root, "bin", "runtime-watch.js"),
  );
  await copyFile(
    path.join(workspaceRoot, "packages", "agentplane", "bin", "stale-dist-policy.js"),
    path.join(root, "bin", "stale-dist-policy.js"),
  );
  await copyFile(
    path.join(workspaceRoot, "packages", "agentplane", "bin", "dist-guard.js"),
    path.join(root, "bin", "dist-guard.js"),
  );
  await writeFile(
    path.join(root, "dist", "cli.js"),
    [
      "#!/usr/bin/env node",
      String.raw`process.stdout.write(${JSON.stringify("GLOBAL")} + JSON.stringify({ args: process.argv.slice(2), cwd: process.cwd() }) + "\n");`,
      "",
    ].join("\n"),
    "utf8",
  );

  return {
    root,
    binPath: path.join(root, "bin", "agentplane.js"),
  };
}

async function setupFrameworkCheckout() {
  const repoRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-framework-checkout-"));
  tempRoots.push(repoRoot);
  const binDir = path.join(repoRoot, "packages", "agentplane", "bin");
  const distDir = path.join(repoRoot, "packages", "agentplane", "dist");
  const srcDir = path.join(repoRoot, "packages", "agentplane", "src", "nested");
  await mkdir(binDir, { recursive: true });
  await mkdir(distDir, { recursive: true });
  await mkdir(srcDir, { recursive: true });
  const repoBin = path.join(binDir, "agentplane.js");
  await writeFile(
    repoBin,
    [
      "#!/usr/bin/env node",
      String.raw`process.stdout.write(${JSON.stringify("LOCAL")} + JSON.stringify({ args: process.argv.slice(2), cwd: process.cwd(), handoff: process.env.AGENTPLANE_REPO_LOCAL_HANDOFF ?? "" }) + "\n");`,
      "",
    ].join("\n"),
    "utf8",
  );
  await chmod(repoBin, 0o755);
  await writeFile(
    path.join(repoRoot, "packages", "agentplane", "src", "cli.ts"),
    "export const cli = true;\n",
    "utf8",
  );
  await writeFile(
    path.join(distDir, "cli.js"),
    ["#!/usr/bin/env node", String.raw`process.stdout.write("DIST_READY\n");`, ""].join("\n"),
    "utf8",
  );

  return {
    repoRoot,
    nestedCwd: srcDir,
    repoBin,
  };
}

async function setupFrameworkCheckoutWithoutDist() {
  const repoRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-framework-checkout-"));
  tempRoots.push(repoRoot);
  const binDir = path.join(repoRoot, "packages", "agentplane", "bin");
  const srcDir = path.join(repoRoot, "packages", "agentplane", "src", "nested");
  await mkdir(binDir, { recursive: true });
  await mkdir(srcDir, { recursive: true });
  for (const entry of await readdir(path.join(workspaceRoot, "packages", "agentplane", "bin"))) {
    if (!entry.endsWith(".js")) continue;
    await copyFile(
      path.join(workspaceRoot, "packages", "agentplane", "bin", entry),
      path.join(binDir, entry),
    );
  }
  await writeFile(
    path.join(repoRoot, "packages", "agentplane", "src", "cli.ts"),
    "export const cli = true;\n",
    "utf8",
  );

  return {
    repoRoot,
    nestedCwd: srcDir,
  };
}

async function setupFrameworkCheckoutWithoutInstallLayout() {
  const repoRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-framework-checkout-"));
  tempRoots.push(repoRoot);
  const binDir = path.join(repoRoot, "packages", "agentplane", "bin");
  const distDir = path.join(repoRoot, "packages", "agentplane", "dist");
  const srcDir = path.join(repoRoot, "packages", "agentplane", "src", "nested");
  await mkdir(binDir, { recursive: true });
  await mkdir(distDir, { recursive: true });
  await mkdir(srcDir, { recursive: true });
  for (const entry of await readdir(path.join(workspaceRoot, "packages", "agentplane", "bin"))) {
    if (!entry.endsWith(".js")) continue;
    await copyFile(
      path.join(workspaceRoot, "packages", "agentplane", "bin", entry),
      path.join(binDir, entry),
    );
  }
  await writeFile(
    path.join(repoRoot, "packages", "agentplane", "src", "cli.ts"),
    "export const cli = true;\n",
    "utf8",
  );
  await writeFile(
    path.join(repoRoot, "packages", "agentplane", "package.json"),
    '{\n  "name": "agentplane",\n  "type": "module",\n  "dependencies": {\n    "@agentplaneorg/core": "0.0.0-test"\n  }\n}\n',
    "utf8",
  );
  await writeFile(
    path.join(distDir, "cli.js"),
    ["#!/usr/bin/env node", String.raw`process.stdout.write("SHOULD_NOT_RUN\n");`, ""].join("\n"),
    "utf8",
  );
  await execFileAsync("git", ["init", "-q", "-b", "main"], { cwd: repoRoot });
  await execFileAsync("git", ["config", "user.name", "Repo Local Handoff Test"], { cwd: repoRoot });
  await execFileAsync("git", ["config", "user.email", "repo-local-handoff@example.com"], {
    cwd: repoRoot,
  });
  await execFileAsync("git", ["add", "."], { cwd: repoRoot });
  await execFileAsync("git", ["commit", "-m", "feat: install-layout harness"], {
    cwd: repoRoot,
  });
  const headResult = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: path.join(repoRoot, "packages", "agentplane"),
    encoding: "utf8",
  });
  const head = headResult.stdout.trim();
  await writeFile(
    path.join(distDir, ".build-manifest.json"),
    JSON.stringify({
      schema_version: 1,
      git_head: head,
      watched_runtime_paths: ["src"],
      watched_runtime_files: [{ path: "src/cli.ts", sha256: "stub", size_bytes: 24 }],
      watched_runtime_snapshot_hash: "stub",
    }),
    "utf8",
  );

  return {
    repoRoot,
    nestedCwd: srcDir,
  };
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("repo-local handoff wrapper", () => {
  it("keeps core conditional exports resolvable from the repo-local dependency check", async () => {
    const corePackageJson = JSON.parse(
      await readFile(path.join(workspaceRoot, "packages", "core", "package.json"), "utf8"),
    ) as {
      exports?: Record<string, { default?: string; import?: string; types?: string } | string>;
    };
    const rootExport = corePackageJson.exports?.["."];

    expect(typeof rootExport).toBe("object");
    expect(rootExport).toMatchObject({
      default: "./dist/index.js",
      import: "./dist/index.js",
      types: "./dist/index.d.ts",
    });

    const requireFromAgentplane = createRequire(
      path.join(workspaceRoot, "packages", "agentplane", "package.json"),
    );
    const resolvedCore = requireFromAgentplane.resolve("@agentplaneorg/core");
    const resolvedCoreRealPath = await realpath(resolvedCore);
    const coreRoot = await realpath(path.join(workspaceRoot, "packages", "core"));
    const relativeCore = path.relative(coreRoot, resolvedCoreRealPath);
    expect(
      relativeCore === path.join("dist", "index.js") ||
        relativeCore === path.join("src", "index.ts") ||
        resolvedCoreRealPath.endsWith(path.join("packages", "core", "dist", "index.js")) ||
        resolvedCoreRealPath.endsWith(path.join("packages", "core", "src", "index.ts")),
    ).toBe(true);
  });

  it("delegates to the repo-local binary from a nested framework cwd", async () => {
    const globalInstall = await setupGlobalInstall();
    const framework = await setupFrameworkCheckout();

    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      [globalInstall.binPath, "task", "list"],
      {
        cwd: framework.nestedCwd,
        encoding: "utf8",
        env: buildChildEnv(),
      },
    );

    const local = parsePayload(stdout, "LOCAL");
    expect(local.args).toEqual(["task", "list"]);
    expect(path.normalize(local.cwd).endsWith(nestedSuffix)).toBe(true);
    expect(local.handoff).toBe("1");
    expect(stderr).toContain("delegating to repo-local binary");
    expect(stderr).toContain(framework.repoBin);
  });

  it("stays on the global binary when AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 is set", async () => {
    const globalInstall = await setupGlobalInstall();
    const framework = await setupFrameworkCheckout();

    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      [globalInstall.binPath, "help"],
      {
        cwd: framework.nestedCwd,
        encoding: "utf8",
        env: buildChildEnv({
          AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK: "1",
        }),
      },
    );

    const global = parsePayload(stdout, "GLOBAL");
    expect(global.args).toEqual(["help"]);
    expect(path.normalize(global.cwd).endsWith(nestedSuffix)).toBe(true);
    expect(stderr).toContain(
      "warning: running global agentplane binary inside repository checkout.",
    );
  });

  it("does not recurse when AGENTPLANE_REPO_LOCAL_HANDOFF=1 is already set", async () => {
    const globalInstall = await setupGlobalInstall();
    const framework = await setupFrameworkCheckout();

    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      [globalInstall.binPath, "doctor"],
      {
        cwd: framework.nestedCwd,
        encoding: "utf8",
        env: buildChildEnv({
          AGENTPLANE_REPO_LOCAL_HANDOFF: "1",
        }),
      },
    );

    const global = parsePayload(stdout, "GLOBAL");
    expect(global.args).toEqual(["doctor"]);
    expect(path.normalize(global.cwd).endsWith(nestedSuffix)).toBe(true);
    expect(stderr).not.toContain("delegating to repo-local binary");
  });

  it("passes through arguments unchanged after delegation", async () => {
    const globalInstall = await setupGlobalInstall();
    const framework = await setupFrameworkCheckout();

    const { stdout } = await execFileAsync(
      process.execPath,
      [globalInstall.binPath, "help", "help", "--compact"],
      {
        cwd: framework.nestedCwd,
        encoding: "utf8",
        env: buildChildEnv(),
      },
    );

    const local = parsePayload(stdout, "LOCAL");
    expect(local.args).toEqual(["help", "help", "--compact"]);
  });

  it("stays on the global binary when repo-local dist is missing", async () => {
    const globalInstall = await setupGlobalInstall();
    const framework = await setupFrameworkCheckoutWithoutDist();

    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      [globalInstall.binPath, "help"],
      {
        cwd: framework.nestedCwd,
        encoding: "utf8",
        env: buildChildEnv(),
      },
    );

    const global = parsePayload(stdout, "GLOBAL");
    expect(global.args).toEqual(["help"]);
    expect(path.normalize(global.cwd).endsWith(nestedSuffix)).toBe(true);
    expect(stderr).toContain("staying on current installed binary");
    expect(stderr).toContain("target framework checkout repo-local runtime is not bootstrapped");
    expect(stderr).toContain("bun run framework:dev:bootstrap");
    expect(stderr).not.toContain("delegating to repo-local binary");
  });

  it("stays on the global binary when repo-local install layout is missing", async () => {
    const globalInstall = await setupGlobalInstall();
    const framework = await setupFrameworkCheckoutWithoutInstallLayout();

    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      [globalInstall.binPath, "help"],
      {
        cwd: framework.nestedCwd,
        encoding: "utf8",
        env: buildChildEnv(),
      },
    );

    const global = parsePayload(stdout, "GLOBAL");
    expect(global.args).toEqual(["help"]);
    expect(path.normalize(global.cwd).endsWith(nestedSuffix)).toBe(true);
    expect(stderr).toContain("staying on current installed binary");
    expect(stderr).toContain("target framework checkout repo-local runtime is not bootstrapped");
    expect(stderr).toContain("bun run framework:dev:bootstrap");
    expect(stderr).not.toContain("delegating to repo-local binary");
    expect(stderr).not.toContain("ERR_MODULE_NOT_FOUND");
    expect(stdout).not.toContain("SHOULD_NOT_RUN");
  });
});
