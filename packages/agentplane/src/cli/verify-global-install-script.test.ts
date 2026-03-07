import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/verify-global-agentplane-install.mjs");

async function writeJson(filePath: string, data: Record<string, unknown>) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function writeBuildManifest(installDir: string, packageDir: string, gitHead: string) {
  await writeJson(path.join(installDir, "dist", ".build-manifest.json"), {
    schema_version: 1,
    package_dir: packageDir,
    git_head: gitHead,
  });
}

async function setupRepoFixture(root: string, version = "0.3.2") {
  await writeJson(path.join(root, "package.json"), { name: "agentplane-root", private: true });
  await writeJson(path.join(root, "packages", "agentplane", "package.json"), {
    name: "agentplane",
    version,
    dependencies: { "@agentplaneorg/core": version },
  });
  await writeJson(path.join(root, "packages", "core", "package.json"), {
    name: "@agentplaneorg/core",
    version,
  });
}

describe("verify-global-agentplane-install script", () => {
  it("passes when the global runtime resolves agentplane and core from this checkout", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-global-install-"));
    const npmRoot = path.join(root, "global-prefix", "lib", "node_modules");
    const gitHead = "abc123";
    await setupRepoFixture(root);

    const globalAgentplaneDir = path.join(npmRoot, "agentplane");
    const globalCoreDir = path.join(npmRoot, "@agentplaneorg", "core");

    await writeJson(path.join(globalAgentplaneDir, "package.json"), {
      name: "agentplane",
      version: "0.3.2",
      dependencies: { "@agentplaneorg/core": "0.3.2" },
    });
    await writeBuildManifest(
      globalAgentplaneDir,
      path.join(root, "packages", "agentplane"),
      gitHead,
    );

    await writeJson(path.join(globalCoreDir, "package.json"), {
      name: "@agentplaneorg/core",
      version: "0.3.2",
    });
    await writeBuildManifest(globalCoreDir, path.join(root, "packages", "core"), gitHead);

    const result = await execFileAsync(
      "node",
      [SCRIPT_PATH, "--repo-root", root, "--npm-root", npmRoot, "--expected-head", gitHead],
      { cwd: root },
    );

    expect(result.stdout).toContain("verified global framework install");
    expect(result.stdout).toContain(
      `agentplane_source: ${path.join(root, "packages", "agentplane")}`,
    );
    expect(result.stdout).toContain(`core_source: ${path.join(root, "packages", "core")}`);
  });

  it("fails when global agentplane resolves core from a non-local nested dependency", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-global-install-"));
    const npmRoot = path.join(root, "global-prefix", "lib", "node_modules");
    const gitHead = "abc123";
    await setupRepoFixture(root);

    const globalAgentplaneDir = path.join(npmRoot, "agentplane");
    const nestedCoreDir = path.join(globalAgentplaneDir, "node_modules", "@agentplaneorg", "core");
    const topLevelCoreDir = path.join(npmRoot, "@agentplaneorg", "core");

    await writeJson(path.join(globalAgentplaneDir, "package.json"), {
      name: "agentplane",
      version: "0.3.2",
      dependencies: { "@agentplaneorg/core": "0.3.2" },
    });
    await writeBuildManifest(
      globalAgentplaneDir,
      path.join(root, "packages", "agentplane"),
      gitHead,
    );

    await writeJson(path.join(topLevelCoreDir, "package.json"), {
      name: "@agentplaneorg/core",
      version: "0.3.2",
    });
    await writeBuildManifest(topLevelCoreDir, path.join(root, "packages", "core"), gitHead);

    await writeJson(path.join(nestedCoreDir, "package.json"), {
      name: "@agentplaneorg/core",
      version: "0.3.2",
    });
    await writeBuildManifest(nestedCoreDir, path.join(root, "published-cache", "core"), gitHead);

    const result = await execFileAsync(
      "node",
      [SCRIPT_PATH, "--repo-root", root, "--npm-root", npmRoot, "--expected-head", gitHead],
      { cwd: root },
    ).then(
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
    expect(result.stderr).toContain("@agentplaneorg/core was not built from this checkout");
  });
});
