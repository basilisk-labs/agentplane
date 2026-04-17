import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
  AGENTPLANE_CODEX_HOME_ENV,
  buildCodexPluginManifest,
  installBundledCodexPlugin,
  resolveCodexInstallRoot,
} from "./plugin-install.js";

const createdDirs = new Set<string>();
const originalCodexHome = process.env[AGENTPLANE_CODEX_HOME_ENV];

afterEach(async () => {
  if (originalCodexHome === undefined) {
    delete process.env[AGENTPLANE_CODEX_HOME_ENV];
  } else {
    process.env[AGENTPLANE_CODEX_HOME_ENV] = originalCodexHome;
  }

  await Promise.all(
    [...createdDirs].map(async (dir) => {
      await rm(dir, { recursive: true, force: true });
    }),
  );
  createdDirs.clear();
});

async function mkTempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-codex-plugin-"));
  createdDirs.add(root);
  return root;
}

describe("codex plugin installer", () => {
  it("builds a manifest with bundled relative paths", () => {
    const manifest = buildCodexPluginManifest("9.9.9") as {
      name: string;
      version: string;
      skills: string;
      interface: {
        composerIcon: string;
        logo: string;
        screenshots: string[];
      };
    };

    expect(manifest.name).toBe("agentplane");
    expect(manifest.version).toBe("9.9.9");
    expect(manifest.skills).toBe("./skills/");
    expect(manifest.interface.composerIcon).toBe("./assets/icon.svg");
    expect(manifest.interface.logo).toBe("./assets/logo.svg");
    expect(manifest.interface.screenshots).toEqual(["./assets/header.png"]);
  });

  it("uses AGENTPLANE_CODEX_HOME for user scope when present", () => {
    process.env[AGENTPLANE_CODEX_HOME_ENV] = "/tmp/agentplane-codex-home";
    expect(resolveCodexInstallRoot({ scope: "user" })).toBe("/tmp/agentplane-codex-home");
  });

  it("installs the bundled plugin and appends an agentplane marketplace entry", async () => {
    const root = await mkTempRoot();
    const result = await installBundledCodexPlugin({
      scope: "user",
      installRoot: root,
      version: "1.2.3",
    });

    const manifest = JSON.parse(await readFile(result.manifestPath, "utf8")) as {
      version: string;
      interface: { displayName: string };
    };
    const marketplace = JSON.parse(await readFile(result.marketplacePath, "utf8")) as {
      plugins: { name: string; source: { path: string } }[];
    };
    const skillPath = path.join(result.pluginRoot, "skills", "agentplane", "SKILL.md");

    expect(manifest.version).toBe("1.2.3");
    expect(manifest.interface.displayName).toBe("AgentPlane");
    expect(await readFile(skillPath, "utf8")).toContain("Use AgentPlane through its CLI");
    expect(marketplace.plugins).toEqual(
      expect.arrayContaining([
        {
          name: "agentplane",
          source: { source: "local", path: "./plugins/agentplane" },
          policy: { installation: "AVAILABLE", authentication: "ON_INSTALL" },
          category: "Productivity",
        },
      ]),
    );
  });

  it("updates an existing marketplace entry without disturbing unrelated plugins", async () => {
    const root = await mkTempRoot();
    const marketplacePath = path.join(root, ".agents", "plugins", "marketplace.json");
    await mkdir(path.dirname(marketplacePath), { recursive: true });
    await writeFile(
      marketplacePath,
      `${JSON.stringify(
        {
          name: "team-marketplace",
          interface: { displayName: "Team Marketplace" },
          plugins: [
            {
              name: "other-plugin",
              source: { source: "local", path: "./plugins/other-plugin" },
              policy: { installation: "AVAILABLE", authentication: "ON_USE" },
              category: "Productivity",
            },
            {
              name: "agentplane",
              source: { source: "local", path: "./plugins/old-agentplane" },
              policy: { installation: "NOT_AVAILABLE", authentication: "ON_USE" },
              category: "Legacy",
            },
          ],
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    await installBundledCodexPlugin({
      scope: "user",
      installRoot: root,
      version: "2.0.0",
    });

    const marketplace = JSON.parse(await readFile(marketplacePath, "utf8")) as {
      name: string;
      interface: { displayName: string };
      plugins: { name: string; source: { path: string }; category: string }[];
    };

    expect(marketplace.name).toBe("team-marketplace");
    expect(marketplace.interface.displayName).toBe("Team Marketplace");
    expect(marketplace.plugins).toEqual(
      expect.arrayContaining([
        {
          name: "other-plugin",
          source: { source: "local", path: "./plugins/other-plugin" },
          policy: { installation: "AVAILABLE", authentication: "ON_USE" },
          category: "Productivity",
        },
        {
          name: "agentplane",
          source: { source: "local", path: "./plugins/agentplane" },
          policy: { installation: "AVAILABLE", authentication: "ON_INSTALL" },
          category: "Productivity",
        },
      ]),
    );
    expect(marketplace.plugins.filter((entry) => entry.name === "agentplane")).toHaveLength(1);
  });
});
