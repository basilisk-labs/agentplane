import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  createUpgradeBundle,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "../cli/run-cli.test-helpers.js";
import { cmdUpgradeParsed } from "./upgrade.js";

describe("upgrade agent JSON replacement stability", () => {
  it("replaces agent JSON with incoming content regardless of local key order", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const agentsDir = path.join(root, ".agentplane", "agents");
    await mkdir(agentsDir, { recursive: true });

    // Current has local formatting/key-order differences; upgrade should still replace with incoming.
    const current =
      '{\n  "settings": { "b": 2, "a": 1 },\n  "role": "Coder v1",\n  "id": "CODER"\n}\n';
    const incoming =
      JSON.stringify({ id: "CODER", role: "Coder v2", settings: { a: 1, b: 3 } }, null, 2) + "\n";

    await writeFile(path.join(agentsDir, "CODER.json"), current, "utf8");

    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "framework.manifest.json": JSON.stringify(
        {
          schema_version: 1,
          files: [
            {
              path: ".agentplane/agents/CODER.json",
              source_path: "agents/CODER.json",
              type: "json",
              merge_strategy: "agent_json_3way",
              required: true,
            },
          ],
        },
        null,
        2,
      ),
      "agents/CODER.json": incoming,
    });

    await cmdUpgradeParsed({
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
    });

    const finalText = await readFile(path.join(agentsDir, "CODER.json"), "utf8");
    const final = JSON.parse(finalText) as { role?: string; settings?: { b?: number } };
    expect(final.role).toBe("Coder v2");
    expect(final.settings?.b).toBe(3);
    expect(finalText).toBe(incoming);
  });
});
