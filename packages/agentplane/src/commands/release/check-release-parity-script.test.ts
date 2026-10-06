import path from "node:path";
import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import { initReleaseWorkspace, writePackageJson } from "@agentplane/testkit/release";

const execFileAsync = promisify(execFile);

const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/check-release-parity.mjs");
const VERSION_SURFACES_MODULE_PATH = path.resolve(
  process.cwd(),
  "scripts/lib/release-version-surfaces.mjs",
);

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

type VersionSurfaces = {
  applyReleaseVersionSurfaces(rootDir: string, nextVersion: string): string[];
};

async function optionalSurfaceFixture(value: unknown, required = false) {
  const root = await initReleaseWorkspace({ prefix: "agentplane-optional-surface-" });
  await mkdir(path.join(root, "scripts/release"), { recursive: true });
  await writeFile(path.join(root, "surface.json"), `${JSON.stringify(value)}\n`);
  await writeFile(
    path.join(root, "scripts/release/version-surfaces.json"),
    JSON.stringify({
      schema_version: 1,
      version_surfaces: [
        {
          id: "optional.edge",
          file: "surface.json",
          kind: "json",
          path: ["dependencies", "core"],
          required,
        },
      ],
    }),
  );
  const writer = (await import(VERSION_SURFACES_MODULE_PATH)) as VersionSurfaces;
  return { root, writer, file: path.join(root, "surface.json") };
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

  it("fails when manifest-declared ACR release version surfaces drift", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-parity-",
      coreVersion: "2.3.4",
      cliVersion: "2.3.4",
      recipesVersion: "2.3.4",
      dependencyVersion: "2.3.4",
      recipesDependencyVersion: "2.3.4",
    });
    await mkdir(path.join(root, "packages", "spec", "examples"), { recursive: true });
    await writeFile(
      path.join(root, "packages", "spec", "examples", "acr.json"),
      `${JSON.stringify(
        {
          producer: { version: "2.3.3" },
          agent: { toolchain: [{ name: "agentplane", version: "2.3.2" }] },
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const result = await runParity(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("acr.producer.version=2.3.3");
    expect(result.stderr).toContain("acr.agentplane.toolchain.version=2.3.2");
  });

  it("skips optional array-match surfaces during version writes when the match is absent", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-parity-",
      coreVersion: "2.3.4",
      cliVersion: "2.3.4",
      recipesVersion: "2.3.4",
      dependencyVersion: "2.3.4",
      recipesDependencyVersion: "2.3.4",
    });
    await mkdir(path.join(root, "packages", "spec", "examples"), { recursive: true });
    await writeFile(
      path.join(root, "packages", "spec", "examples", "acr.json"),
      `${JSON.stringify({ producer: { version: "2.3.4" }, agent: { toolchain: [] } }, null, 2)}\n`,
      "utf8",
    );
    const versionSurfaces = (await import(VERSION_SURFACES_MODULE_PATH)) as {
      applyReleaseVersionSurfaces(rootDir: string, nextVersion: string): string[];
    };

    const changedPaths = versionSurfaces.applyReleaseVersionSurfaces(root, "2.3.5");

    expect(changedPaths).toContain("packages/spec/examples/acr.json");
    const acr = JSON.parse(
      await readFile(path.join(root, "packages", "spec", "examples", "acr.json"), "utf8"),
    ) as { producer?: { version?: string }; agent?: { toolchain?: unknown[] } };
    expect(acr.producer?.version).toBe("2.3.5");
    expect(acr.agent?.toolchain).toEqual([]);
  });

  it("updates workflow expected CLI version during release version writes", async () => {
    const root = await initReleaseWorkspace({
      prefix: "agentplane-release-parity-",
      coreVersion: "2.3.4",
      cliVersion: "2.3.4",
      recipesVersion: "2.3.4",
      dependencyVersion: "2.3.4",
      recipesDependencyVersion: "2.3.4",
    });
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "WORKFLOW.md"),
      "framework:\n  cli:\n    expected_version: 2.3.4\n",
      "utf8",
    );
    const versionSurfaces = (await import(VERSION_SURFACES_MODULE_PATH)) as {
      applyReleaseVersionSurfaces(rootDir: string, nextVersion: string): string[];
    };

    const changedPaths = versionSurfaces.applyReleaseVersionSurfaces(root, "2.3.5");

    expect(changedPaths).toContain(".agentplane/WORKFLOW.md");
    await expect(
      readFile(path.join(root, ".agentplane", "WORKFLOW.md"), "utf8"),
    ).resolves.toContain("expected_version: 2.3.5");
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
  it.each([true, false])(
    "writes declared recipes core edge when present=%s without changing legacy absence",
    async (present) => {
      const root = await initReleaseWorkspace({
        coreVersion: "0.7.12",
        recipesCoreDependencyVersion: present ? "0.7.12" : undefined,
      });
      const file = path.join(root, "packages/recipes/package.json");
      const original = JSON.parse(await readFile(file, "utf8")) as {
        version: string;
        dependencies?: Record<string, string>;
      };
      original.dependencies = { ...original.dependencies, zod: "^4.0.0" };
      await writeFile(file, `${JSON.stringify(original, null, 2)}\n`);
      const before = await readFile(file, "utf8");
      const bumpScript = path.resolve(process.cwd(), "scripts/release/version-bump.mjs");
      const dryRun = await execFileAsync(
        "node",
        [bumpScript, "--version", "0.7.13", "--skip-install", "--json"],
        { cwd: root },
      );
      expect(JSON.parse(dryRun.stdout)).toMatchObject({ dry_run: true, next_version: "0.7.13" });
      expect(await readFile(file, "utf8")).toBe(before);
      const writer = (await import(VERSION_SURFACES_MODULE_PATH)) as VersionSurfaces;
      expect(writer.applyReleaseVersionSurfaces(root, "0.7.13")).toContain(
        "packages/recipes/package.json",
      );
      const after = await readFile(file, "utf8");
      const recipes = JSON.parse(after) as typeof original;
      expect(recipes.version).toBe("0.7.13");
      expect(recipes.dependencies).toEqual({
        ...(present ? { "@agentplaneorg/core": "0.7.13" } : {}),
        zod: "^4.0.0",
      });
      expect(await runParity(root)).toEqual({ ok: true, stderr: "" });
      expect(writer.applyReleaseVersionSurfaces(root, "0.7.13")).toEqual([]);
      expect(await readFile(file, "utf8")).toBe(after);
      if (present) {
        recipes.dependencies!["@agentplaneorg/core"] = "0.7.12";
        await writeFile(file, JSON.stringify(recipes));
        const stale = await runParity(root);
        expect(stale.ok).toBe(false);
        expect(stale.stderr).toContain(
          "packages/recipes/package.json dependencies @agentplaneorg/core=0.7.12 does not match workspace version 0.7.13",
        );
      }
    },
  );

  it.each([{}, { dependencies: {} }, { dependencies: { other: "keep" } }])(
    "skips truly absent optional JSON keys: %j",
    async (value) => {
      const f = await optionalSurfaceFixture(value);
      const before = await readFile(f.file, "utf8");
      expect(f.writer.applyReleaseVersionSurfaces(f.root, "0.7.13")).toEqual([]);
      expect(await readFile(f.file, "utf8")).toBe(before);
    },
  );

  it.each([null, [], "invalid", { dependencies: null }, { dependencies: [] }, { dependencies: 3 }])(
    "rejects malformed optional traversed parents: %j",
    async (value) => {
      const f = await optionalSurfaceFixture(value);
      const before = await readFile(f.file, "utf8");
      expect(() => f.writer.applyReleaseVersionSurfaces(f.root, "0.7.13")).toThrow(
        "malformed parent",
      );
      expect(await readFile(f.file, "utf8")).toBe(before);
    },
  );

  it.each(["0.7.12", null, 7, {}, []])(
    "preserves present optional leaf rewrite behavior: %j",
    async (core) => {
      const f = await optionalSurfaceFixture({ dependencies: { core } });
      expect(f.writer.applyReleaseVersionSurfaces(f.root, "0.7.13")).toEqual(["surface.json"]);
      expect(JSON.parse(await readFile(f.file, "utf8"))).toEqual({
        dependencies: { core: "0.7.13" },
      });
    },
  );

  it("preserves required missing-key creation and strict required-surface parity", async () => {
    const f = await optionalSurfaceFixture({}, true);
    expect(f.writer.applyReleaseVersionSurfaces(f.root, "0.7.13")).toEqual(["surface.json"]);
    expect(JSON.parse(await readFile(f.file, "utf8"))).toEqual({
      dependencies: { core: "0.7.13" },
    });
    const root = await initReleaseWorkspace({ coreVersion: "0.7.12" });
    await writePackageJson(root, "packages/core", { name: "@agentplaneorg/core" });
    const result = await runParity(root);
    expect(result.ok).toBe(false);
  });

  it("preserves optional missing-file skipping and required missing-file rejection", async () => {
    const f = await optionalSurfaceFixture({});
    const manifestPath = path.join(f.root, "scripts/release/version-surfaces.json");
    const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as {
      version_surfaces: { file: string; required: boolean }[];
    };
    manifest.version_surfaces[0]!.file = "missing.json";
    await writeFile(manifestPath, JSON.stringify(manifest));
    expect(f.writer.applyReleaseVersionSurfaces(f.root, "0.7.13")).toEqual([]);
    manifest.version_surfaces[0]!.required = true;
    await writeFile(manifestPath, JSON.stringify(manifest));
    expect(() => f.writer.applyReleaseVersionSurfaces(f.root, "0.7.13")).toThrow(
      "required release version surface is missing",
    );
  });
});
