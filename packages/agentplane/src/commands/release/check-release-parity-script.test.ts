import path from "node:path";
import { execFile } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import { initReleaseWorkspace, writePackageJson } from "@agentplane/testkit/release";

const execFileAsync = promisify(execFile);

const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/check-release-parity.mjs");

async function runParity(root: string): Promise<{ ok: boolean; stderr: string }> {
  return execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
    () => ({ ok: true, stderr: "" }),
    (error: unknown) => {
      const stderr =
        typeof error === "object" &&
        error !== null &&
        "stderr" in error &&
        typeof (error as { stderr?: unknown }).stderr === "string"
          ? (error as { stderr: string }).stderr
          : "";
      return { ok: false, stderr };
    },
  );
}

describe("check-release-parity script", () => {
  it("passes when package versions and core dependency are aligned", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-parity-",
      coreVersion: "2.3.4",
      cliVersion: "2.3.4",
      recipesVersion: "2.3.4",
      dependencyVersion: "2.3.4",
      recipesDependencyVersion: "2.3.4",
    });

    await expect(execFileAsync("node", [SCRIPT_PATH], { cwd: root })).resolves.toBeDefined();
  });

  it("fails when the recipes runtime version constant drifts from package version", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-parity-",
      coreVersion: "2.3.4",
      cliVersion: "2.3.4",
      recipesVersion: "2.3.4",
      dependencyVersion: "2.3.4",
      recipesDependencyVersion: "2.3.4",
    });
    await writeFile(
      path.join(root, "packages", "recipes", "src", "index.ts"),
      'export const RECIPES_VERSION = "2.3.3";\n',
      "utf8",
    );

    const result = await runParity(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain(
      "packages/recipes/src/index.ts RECIPES_VERSION=2.3.3 does not match packages/recipes version 2.3.4",
    );
  });

  it("passes when the v0.3 freeze artifact references the current package version", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-parity-",
      coreVersion: "0.3.25",
      cliVersion: "0.3.25",
      recipesVersion: "0.3.25",
      dependencyVersion: "0.3.25",
      recipesDependencyVersion: "0.3.25",
    });
    await writeFile(path.join(root, "FREEZE.v0.3.md"), "Package version: `agentplane@0.3.25`.\n");

    await expect(execFileAsync("node", [SCRIPT_PATH], { cwd: root })).resolves.toBeDefined();
  });

  it("fails when the v0.3 freeze artifact is missing for a 0.3.x package version", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-parity-",
      coreVersion: "0.3.25",
      cliVersion: "0.3.25",
      recipesVersion: "0.3.25",
      dependencyVersion: "0.3.25",
      recipesDependencyVersion: "0.3.25",
    });

    const result = await runParity(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("FREEZE.v0.3.md is required");
  });

  it("fails when the v0.3 freeze artifact references a stale package version", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-parity-",
      coreVersion: "0.3.25",
      cliVersion: "0.3.25",
      recipesVersion: "0.3.25",
      dependencyVersion: "0.3.25",
      recipesDependencyVersion: "0.3.25",
    });
    await writeFile(path.join(root, "FREEZE.v0.3.md"), "Package version: `agentplane@0.3.24`.\n");

    const result = await runParity(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain(
      "FREEZE.v0.3.md must reference current package version agentplane@0.3.25",
    );
  });

  it("fails when the v0.3 freeze artifact remains after the workspace leaves 0.3.x", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-parity-",
      coreVersion: "0.4.0",
      cliVersion: "0.4.0",
      recipesVersion: "0.4.0",
      dependencyVersion: "0.4.0",
      recipesDependencyVersion: "0.4.0",
    });
    await writeFile(path.join(root, "FREEZE.v0.3.md"), "Package version: `agentplane@0.3.25`.\n");

    const result = await runParity(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("outside the frozen 0.3.x line");
  });

  it("fails when core dependency version drifts from workspace version", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-parity-",
      coreVersion: "2.3.4",
      cliVersion: "2.3.4",
      recipesVersion: "2.3.4",
      dependencyVersion: "2.3.3",
      recipesDependencyVersion: "2.3.4",
    });

    const result = await execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("@agentplaneorg/core=2.3.3");
  });

  it("fails when recipes package or dependency versions drift from the release version", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-parity-",
      coreVersion: "2.3.4",
      cliVersion: "2.3.4",
      recipesVersion: "2.3.3",
      dependencyVersion: "2.3.4",
      recipesDependencyVersion: "2.3.2",
    });

    const result = await execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("packages/recipes=2.3.3");
    expect(result.stderr).toContain("@agentplaneorg/recipes=2.3.2");
  });

  it("fails when private workspace package dependencies drift from the release version", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-parity-",
      coreVersion: "2.3.4",
      cliVersion: "2.3.4",
      recipesVersion: "2.3.4",
      dependencyVersion: "2.3.4",
      recipesDependencyVersion: "2.3.4",
    });
    await writePackageJson(root, "packages/testkit", {
      name: "@agentplane/testkit",
      version: "0.0.0",
      private: true,
      dependencies: {
        "@agentplaneorg/core": "2.3.3",
      },
    });

    const result = await execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain(
      "packages/testkit/package.json dependencies @agentplaneorg/core=2.3.3 does not match workspace version 2.3.4",
    );
  });

  it("fails when the publishable package manifest leaks a workspace protocol dependency", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-parity-",
      coreVersion: "2.3.4",
      cliVersion: "2.3.4",
      recipesVersion: "2.3.4",
      dependencyVersion: "2.3.4",
      recipesDependencyVersion: "2.3.4",
      extraDependencies: {
        "@agentplane/recipes": "workspace:packages/recipes",
      },
      extraWorkspacePackages: [
        {
          relDir: "packages/recipes",
          name: "@agentplane/recipes",
          version: "0.0.0",
          private: true,
        },
      ],
    });

    const result = await execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("unsupported workspace protocol");
    expect(result.stderr).toContain("@agentplane/recipes=workspace:packages/recipes");
  });
});
