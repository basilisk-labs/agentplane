import { readFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { AGENTPLANE_CODEX_HOME_ENV } from "../commands/codex/plugin-install.js";
import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  mkTempDir,
  writeDefaultConfig,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

const originalCodexHome = process.env[AGENTPLANE_CODEX_HOME_ENV];

afterEach(() => {
  if (originalCodexHome === undefined) {
    delete process.env[AGENTPLANE_CODEX_HOME_ENV];
  } else {
    process.env[AGENTPLANE_CODEX_HOME_ENV] = originalCodexHome;
  }
});

describe("runCli codex plugin install", () => {
  it("installs the bundled plugin into the user-local Codex marketplace", async () => {
    const codexHome = await mkTempDir();
    process.env[AGENTPLANE_CODEX_HOME_ENV] = codexHome;

    const io = captureStdIO();
    try {
      const code = await runCli(["codex", "plugin", "install"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Installed Codex plugin");
      expectLabeledPath(io.stdout, "Plugin root", path.join(codexHome, "plugins", "agentplane"));
      expectLabeledPath(
        io.stdout,
        "Marketplace",
        path.join(codexHome, ".agents", "plugins", "marketplace.json"),
      );
    } finally {
      io.restore();
    }

    const manifest = JSON.parse(
      await readFile(
        path.join(codexHome, "plugins", "agentplane", ".codex-plugin", "plugin.json"),
        "utf8",
      ),
    ) as { name: string };
    expect(manifest.name).toBe("agentplane");
  });

  it("installs the bundled plugin into a repository-local Codex marketplace", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const io = captureStdIO();
    try {
      const code = await runCli(["codex", "plugin", "install", "--scope", "repo", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(`Install root: ${root}`);
      expectLabeledPath(
        io.stdout,
        "Marketplace",
        path.join(root, ".agents", "plugins", "marketplace.json"),
      );
    } finally {
      io.restore();
    }

    const marketplace = JSON.parse(
      await readFile(path.join(root, ".agents", "plugins", "marketplace.json"), "utf8"),
    ) as { plugins: { name: string }[] };
    expect(marketplace.plugins.map((entry) => entry.name)).toContain("agentplane");
  });
});

function expectLabeledPath(output: string, label: string, expected: string): void {
  const line = output.split(/\r?\n/u).find((line) => line.trimStart().startsWith(`${label}:`));
  expect(line?.split(/:\s*/u, 2)[1]).toBe(expected);
}
