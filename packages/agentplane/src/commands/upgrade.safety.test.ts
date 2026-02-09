import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  createUpgradeBundle,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "../cli/run-cli.test-helpers.js";
import { cmdUpgradeParsed } from "./upgrade.js";

describe("upgrade safety invariants", () => {
  it("rejects bundles that include .agentplane/tasks/** in the manifest (and does not touch local tasks)", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    await mkdir(path.join(root, ".agentplane", "tasks"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "tasks", "keep.txt"), "local", "utf8");

    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "framework.manifest.json": JSON.stringify(
        {
          schema_version: 1,
          files: [
            {
              path: ".agentplane/tasks/evil.txt",
              type: "text",
              merge_strategy: "agent_json_merge",
              required: false,
            },
          ],
        },
        null,
        2,
      ),
      ".agentplane/tasks/evil.txt": "EVIL",
    });

    await expect(
      cmdUpgradeParsed({
        cwd: root,
        rootOverride: root,
        flags: {
          bundle: bundlePath,
          checksum: checksumPath,
          mode: "auto",
          remote: false,
          allowTarball: false,
          dryRun: false,
          backup: false,
          yes: true,
        },
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION", exitCode: 3 });

    // Ensure the user-owned tasks dir content was not replaced/augmented by the bundle.
    const tasksEntries = await readdir(path.join(root, ".agentplane", "tasks"));
    expect(tasksEntries).toContain("keep.txt");
    expect(tasksEntries).not.toContain("evil.txt");
    const keep = await readFile(path.join(root, ".agentplane", "tasks", "keep.txt"), "utf8");
    expect(keep).toBe("local");
  });

  it("rejects bundles that include backends/config/task exports (and does not touch local backend config)", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const backendsDir = path.join(root, ".agentplane", "backends", "local");
    await mkdir(backendsDir, { recursive: true });
    const backendPath = path.join(backendsDir, "backend.json");
    await writeFile(
      backendPath,
      JSON.stringify({ id: "local", version: 1, settings: { x: 1 } }, null, 2),
      "utf8",
    );

    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "framework.manifest.json": JSON.stringify(
        {
          schema_version: 1,
          files: [
            {
              path: ".agentplane/backends/local/backend.json",
              type: "json",
              merge_strategy: "agent_json_merge",
              required: false,
            },
          ],
        },
        null,
        2,
      ),
      ".agentplane/backends/local/backend.json": JSON.stringify(
        { id: "local", version: 999, settings: { x: "EVIL" } },
        null,
        2,
      ),
    });

    await expect(
      cmdUpgradeParsed({
        cwd: root,
        rootOverride: root,
        flags: {
          bundle: bundlePath,
          checksum: checksumPath,
          mode: "auto",
          remote: false,
          allowTarball: false,
          dryRun: false,
          backup: false,
          yes: true,
        },
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION", exitCode: 3 });

    const backendText = await readFile(backendPath, "utf8");
    expect(JSON.parse(backendText)).toMatchObject({ id: "local", version: 1, settings: { x: 1 } });
  });

  it("rejects bundles that include unknown .agentplane paths not in the allowlist", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "framework.manifest.json": JSON.stringify(
        {
          schema_version: 1,
          files: [
            { path: ".agentplane/notes.txt", type: "text", merge_strategy: "agent_json_merge" },
          ],
        },
        null,
        2,
      ),
      ".agentplane/notes.txt": "NOPE",
    });

    await expect(
      cmdUpgradeParsed({
        cwd: root,
        rootOverride: root,
        flags: {
          bundle: bundlePath,
          checksum: checksumPath,
          mode: "auto",
          remote: false,
          allowTarball: false,
          dryRun: false,
          backup: false,
          yes: true,
        },
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION", exitCode: 3 });
  });
});
