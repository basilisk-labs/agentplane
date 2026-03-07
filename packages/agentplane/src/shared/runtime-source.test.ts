import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { resolveRuntimeSourceInfo } from "./runtime-source.js";

const tempRoots: string[] = [];

type FrameworkFixture = {
  repoRoot: string;
  nestedCwd: string;
  agentplaneRoot: string;
  agentplaneBin: string;
  corePackageJsonPath: string;
};

async function createFrameworkFixture(): Promise<FrameworkFixture> {
  const repoRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-runtime-source-"));
  tempRoots.push(repoRoot);
  const agentplaneRoot = path.join(repoRoot, "packages", "agentplane");
  const agentplaneBin = path.join(agentplaneRoot, "bin", "agentplane.js");
  const agentplaneSrc = path.join(agentplaneRoot, "src");
  const coreRoot = path.join(repoRoot, "packages", "core");
  await mkdir(path.join(agentplaneRoot, "bin"), { recursive: true });
  await mkdir(agentplaneSrc, { recursive: true });
  await mkdir(coreRoot, { recursive: true });
  await writeFile(agentplaneBin, "#!/usr/bin/env node\n", "utf8");
  await writeFile(path.join(agentplaneSrc, "cli.ts"), "export const cli = true;\n", "utf8");
  await writeFile(
    path.join(agentplaneRoot, "package.json"),
    '{\n  "name": "agentplane",\n  "version": "0.3.3-beta.0"\n}\n',
    "utf8",
  );
  await writeFile(
    path.join(coreRoot, "package.json"),
    '{\n  "name": "@agentplaneorg/core",\n  "version": "0.3.3-beta.0"\n}\n',
    "utf8",
  );
  return {
    repoRoot,
    nestedCwd: agentplaneSrc,
    agentplaneRoot,
    agentplaneBin,
    corePackageJsonPath: path.join(coreRoot, "package.json"),
  };
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("runtime-source", () => {
  it("reports repo-local handoff with framework roots and resolved package versions", async () => {
    const fixture = await createFrameworkFixture();
    const globalBin = path.join(os.tmpdir(), "agentplane-global-bin.js");

    const report = resolveRuntimeSourceInfo({
      cwd: fixture.nestedCwd,
      activeBinaryPath: fixture.agentplaneBin,
      env: {
        ...process.env,
        AGENTPLANE_REPO_LOCAL_HANDOFF: "1",
        AGENTPLANE_RUNTIME_HANDOFF_FROM: globalBin,
      },
      agentplanePackageRoot: fixture.agentplaneRoot,
      corePackageJsonPath: fixture.corePackageJsonPath,
    });

    expect(report.mode).toBe("repo-local-handoff");
    expect(report.activeBinaryPath).toBe(fixture.agentplaneBin);
    expect(report.handoffFromBinaryPath).toBe(path.resolve(globalBin));
    expect(report.framework.inFrameworkCheckout).toBe(true);
    expect(report.framework.isRepoLocalRuntime).toBe(true);
    expect(report.frameworkSources.repoRoot).toBe(fixture.repoRoot);
    expect(report.frameworkSources.coreRoot).toBe(path.join(fixture.repoRoot, "packages", "core"));
    expect(report.agentplane.version).toBe("0.3.3-beta.0");
    expect(report.core.version).toBe("0.3.3-beta.0");
  });

  it("reports forced global runtime inside the framework checkout", async () => {
    const fixture = await createFrameworkFixture();
    const globalBin = path.join(os.tmpdir(), "agentplane-global-bin.js");

    const report = resolveRuntimeSourceInfo({
      cwd: fixture.nestedCwd,
      activeBinaryPath: globalBin,
      env: {
        ...process.env,
        AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK: "1",
      },
      agentplanePackageRoot: fixture.agentplaneRoot,
      corePackageJsonPath: fixture.corePackageJsonPath,
    });

    expect(report.mode).toBe("global-forced-in-framework");
    expect(report.framework.inFrameworkCheckout).toBe(true);
    expect(report.framework.isRepoLocalRuntime).toBe(false);
    expect(report.frameworkSources.agentplaneRoot).toBe(fixture.agentplaneRoot);
  });

  it("reports a normal global install outside the framework checkout", async () => {
    const fixture = await createFrameworkFixture();
    const outsideRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-runtime-source-outside-"));
    tempRoots.push(outsideRoot);

    const report = resolveRuntimeSourceInfo({
      cwd: outsideRoot,
      activeBinaryPath: path.join(os.tmpdir(), "agentplane-global-bin.js"),
      env: { ...process.env },
      agentplanePackageRoot: fixture.agentplaneRoot,
      corePackageJsonPath: fixture.corePackageJsonPath,
    });

    expect(report.mode).toBe("global-installed");
    expect(report.framework.inFrameworkCheckout).toBe(false);
    expect(report.frameworkSources.repoRoot).toBeNull();
  });
});
