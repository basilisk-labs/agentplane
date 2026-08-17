import { execFile } from "node:child_process";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

import { initReleaseWorkspace } from "@agentplane/testkit/release";

const execFileAsync = promisify(execFile);
const OPEN_SCRIPT_PATH = path.resolve(
  process.cwd(),
  "scripts/release/open-next-development-version.mjs",
);
const VERSION_BUMP_SCRIPT_PATH = path.resolve(process.cwd(), "scripts/release/version-bump.mjs");
const roots: string[] = [];

async function workspace(version: string) {
  const root = await initReleaseWorkspace({
    prefix: "agentplane-next-development-version-",
    coreVersion: version,
    cliVersion: version,
    recipesVersion: version,
    dependencyVersion: version,
    recipesDependencyVersion: version,
  });
  roots.push(root);
  return root;
}

async function readJson(root: string, relPath: string) {
  return JSON.parse(await readFile(path.join(root, relPath), "utf8")) as Record<string, unknown>;
}

afterEach(async () => {
  while (roots.length > 0) {
    const root = roots.pop();
    if (root) await rm(root, { recursive: true, force: true });
  }
});

describe("open next development version", () => {
  it("atomically opens the next patch beta and is idempotent", async () => {
    const root = await workspace("0.2.6");

    const first = await execFileAsync(
      "node",
      [OPEN_SCRIPT_PATH, "--published-version", "0.2.6", "--write", "--skip-install", "--json"],
      { cwd: root },
    );
    const firstPayload = JSON.parse(first.stdout) as {
      action: string;
      next_version: string;
      changed_paths: string[];
    };

    expect(firstPayload.action).toBe("apply");
    expect(firstPayload.next_version).toBe("0.2.7-beta.1");
    expect(firstPayload.changed_paths).toEqual(
      expect.arrayContaining([
        "packages/agentplane/package.json",
        "packages/core/package.json",
        "packages/recipes/package.json",
        "packages/recipes/src/index.ts",
      ]),
    );
    const agentplaneManifest = await readJson(root, "packages/agentplane/package.json");
    const coreManifest = await readJson(root, "packages/core/package.json");
    const recipesManifest = await readJson(root, "packages/recipes/package.json");
    expect(agentplaneManifest.version).toBe("0.2.7-beta.1");
    expect(coreManifest.version).toBe("0.2.7-beta.1");
    expect(recipesManifest.version).toBe("0.2.7-beta.1");
    await expect(
      readFile(path.join(root, "packages", "recipes", "src", "index.ts"), "utf8"),
    ).resolves.toContain('RECIPES_VERSION = "0.2.7-beta.1"');

    const repeated = await execFileAsync(
      "node",
      [OPEN_SCRIPT_PATH, "--published-version", "0.2.6", "--write", "--skip-install", "--json"],
      { cwd: root },
    );
    const repeatedPayload = JSON.parse(repeated.stdout) as {
      action: string;
      reason: string;
      changed_paths: string[];
    };
    expect(repeatedPayload).toMatchObject({
      action: "skip",
      reason: "development_version_already_open",
      changed_paths: [],
    });
  });

  it("does not downgrade a workspace that has already advanced", async () => {
    const root = await workspace("0.2.7-beta.2");
    const result = await execFileAsync(
      "node",
      [OPEN_SCRIPT_PATH, "--published-version", "0.2.6", "--write", "--skip-install", "--json"],
      { cwd: root },
    );
    expect(JSON.parse(result.stdout)).toMatchObject({
      action: "skip",
      reason: "workspace_already_ahead",
      previous_version: "0.2.7-beta.2",
      next_version: "0.2.7-beta.1",
    });
  });

  it("fails closed on a conflicting prerelease line", async () => {
    const root = await workspace("0.2.7-alpha.1");
    await expect(
      execFileAsync(
        "node",
        [OPEN_SCRIPT_PATH, "--published-version", "0.2.6", "--write", "--skip-install"],
        { cwd: root },
      ),
    ).rejects.toMatchObject({ code: 1 });
  });

  it("finalizes the current beta when the candidate bump requests patch", async () => {
    const root = await workspace("0.2.7-beta.1");
    const result = await execFileAsync(
      "node",
      [VERSION_BUMP_SCRIPT_PATH, "--bump", "patch", "--skip-install", "--json"],
      { cwd: root },
    );
    expect(JSON.parse(result.stdout)).toMatchObject({
      previous_version: "0.2.7-beta.1",
      next_version: "0.2.7",
    });
  });
});
