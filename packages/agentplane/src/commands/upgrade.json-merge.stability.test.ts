import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  createUpgradeBundle,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "../cli/run-cli.test-helpers.js";
import { cmdUpgradeParsed } from "./upgrade.js";

describe("upgrade agent JSON merge stability", () => {
  it("does not treat key order differences as user edits in 3-way merge", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const agentsDir = path.join(root, ".agentplane", "agents");
    await mkdir(agentsDir, { recursive: true });

    // Baseline (base) and current have identical content but different key order.
    const base =
      JSON.stringify({ id: "CODER", role: "Coder v1", settings: { a: 1, b: 2 } }, null, 2) + "\n";
    const current =
      '{\n  "settings": { "b": 2, "a": 1 },\n  "role": "Coder v1",\n  "id": "CODER"\n}\n';
    const incoming =
      JSON.stringify({ id: "CODER", role: "Coder v2", settings: { a: 1, b: 3 } }, null, 2) + "\n";

    await writeFile(path.join(agentsDir, "CODER.json"), current, "utf8");

    // Seed baseline for 3-way merges.
    const baselinePath = path.join(
      root,
      ".agentplane",
      ".upgrade",
      "baseline",
      "agents",
      "CODER.json",
    );
    await mkdir(path.dirname(baselinePath), { recursive: true });
    await writeFile(baselinePath, base, "utf8");

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
  });
});
