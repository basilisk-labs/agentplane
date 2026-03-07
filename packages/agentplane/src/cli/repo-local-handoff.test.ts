import { execFile } from "node:child_process";
import { chmod, copyFile, mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const tempRoots: string[] = [];
const workspaceRoot = process.cwd();
const nestedSuffix = path.join("packages", "agentplane", "src", "nested");

type CliPayload = {
  args: string[];
  cwd: string;
  handoff?: string;
};

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
    path.join(workspaceRoot, "packages", "agentplane", "bin", "runtime-context.js"),
    path.join(root, "bin", "runtime-context.js"),
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
  const srcDir = path.join(repoRoot, "packages", "agentplane", "src", "nested");
  await mkdir(binDir, { recursive: true });
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

  return {
    repoRoot,
    nestedCwd: srcDir,
    repoBin,
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
  it("delegates to the repo-local binary from a nested framework cwd", async () => {
    const globalInstall = await setupGlobalInstall();
    const framework = await setupFrameworkCheckout();

    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      [globalInstall.binPath, "task", "list"],
      {
        cwd: framework.nestedCwd,
        encoding: "utf8",
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
        env: {
          ...process.env,
          AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK: "1",
        },
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
        env: {
          ...process.env,
          AGENTPLANE_REPO_LOCAL_HANDOFF: "1",
        },
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
      },
    );

    const local = parsePayload(stdout, "LOCAL");
    expect(local.args).toEqual(["help", "help", "--compact"]);
  });
});
