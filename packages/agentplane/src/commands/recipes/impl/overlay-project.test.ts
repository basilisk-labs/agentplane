import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  readProjectOverlayBundle,
  readProjectPromptGraph,
  readProjectRecipeAssetRegistry,
} from "./overlay-project.js";

const tempDirs = new Set<string>();

async function makeAgentplaneDir(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-overlay-project-"));
  tempDirs.add(root);
  const agentplaneDir = path.join(root, ".agentplane");
  await mkdir(path.join(agentplaneDir, "generated"), { recursive: true });
  return agentplaneDir;
}

afterEach(async () => {
  const dirs = [...tempDirs];
  tempDirs.clear();
  await Promise.all(dirs.map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("overlay project artifact readers", () => {
  it("returns null when generated artifacts are absent", async () => {
    const agentplaneDir = await makeAgentplaneDir();

    await expect(readProjectOverlayBundle({ agentplaneDir })).resolves.toBeNull();
    await expect(readProjectRecipeAssetRegistry({ agentplaneDir })).resolves.toBeNull();
    await expect(readProjectPromptGraph({ agentplaneDir })).resolves.toBeNull();
  });

  it("rejects malformed overlay bundle payloads", async () => {
    const agentplaneDir = await makeAgentplaneDir();
    await writeFile(
      path.join(agentplaneDir, "generated", "overlay-bundle.json"),
      JSON.stringify({ schema_version: 1, kind: "overlay_bundle", active: [] }, null, 2),
      "utf8",
    );

    await expect(readProjectOverlayBundle({ agentplaneDir })).rejects.toThrow(
      "Invalid field overlay bundle.surfaces: expected object",
    );
  });

  it("rejects malformed recipe asset registry payloads", async () => {
    const agentplaneDir = await makeAgentplaneDir();
    await writeFile(
      path.join(agentplaneDir, "generated", "recipe-assets.json"),
      JSON.stringify({ schema_version: 1, kind: "recipe_asset_registry", entries: [{}] }, null, 2),
      "utf8",
    );

    await expect(readProjectRecipeAssetRegistry({ agentplaneDir })).rejects.toThrow(
      "Invalid field recipe asset registry.entries[0].id: expected non-empty string",
    );
  });

  it("rejects malformed prompt graph payloads", async () => {
    const agentplaneDir = await makeAgentplaneDir();
    await writeFile(
      path.join(agentplaneDir, "generated", "prompt-graph.json"),
      JSON.stringify({ schema_version: 1, nodes: [] }, null, 2),
      "utf8",
    );

    await expect(readProjectPromptGraph({ agentplaneDir })).rejects.toThrow(
      "Invalid field prompt module graph.diagnostics: expected array",
    );
  });
});
