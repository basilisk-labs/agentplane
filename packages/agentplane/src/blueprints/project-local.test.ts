import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  buildProjectBlueprintCompatibilityReport,
  loadProjectBlueprintTrustConfig,
  projectBlueprintsConfigPath,
  scaffoldProjectBlueprint,
} from "./project-local.js";

async function tempProjectRoot(): Promise<string> {
  return await mkdtemp(path.join(os.tmpdir(), "agentplane-blueprints-"));
}

describe("project-local blueprint trust config", () => {
  it("returns a versioned disabled trust config when no project config exists", async () => {
    const root = await tempProjectRoot();

    await expect(loadProjectBlueprintTrustConfig(root)).resolves.toMatchObject({
      ok: true,
      exists: false,
      config: {
        schemaVersion: 1,
        trustModel: "explicit_allowlist",
        enabled: false,
        allowedIds: [],
        selection: "explicit_only",
      },
    });
  });

  it("loads legacy allowlist config through the versioned trust contract", async () => {
    const root = await tempProjectRoot();
    const configPath = projectBlueprintsConfigPath(root);
    await mkdir(path.dirname(configPath), { recursive: true });
    await writeFile(
      configPath,
      JSON.stringify({
        enabled: true,
        allowed_ids: ["analysis.local"],
        selection: "explicit_only",
      }),
      "utf8",
    );

    await expect(loadProjectBlueprintTrustConfig(root)).resolves.toMatchObject({
      ok: true,
      exists: true,
      config: {
        schemaVersion: 1,
        trustModel: "explicit_allowlist",
        enabled: true,
        allowedIds: ["analysis.local"],
        selection: "explicit_only",
      },
    });
  });

  it("rejects unsupported trust config versions and trust models", async () => {
    const root = await tempProjectRoot();
    const configPath = projectBlueprintsConfigPath(root);
    await mkdir(path.dirname(configPath), { recursive: true });
    await writeFile(
      configPath,
      JSON.stringify({
        schema_version: 2,
        trust_model: "implicit_directory",
        enabled: true,
        allowed_ids: ["analysis.local"],
        selection: "explicit_only",
      }),
      "utf8",
    );

    const result = await loadProjectBlueprintTrustConfig(root);
    expect(result.ok).toBe(false);
    expect(result.errors.map((error) => error.message)).toEqual([
      "Blueprint trust config schema_version must be 1.",
      "Blueprint trust config trust_model must be explicit_allowlist.",
    ]);
  });

  it("reports trusted project-local blueprint compatibility", async () => {
    const root = await tempProjectRoot();
    await scaffoldProjectBlueprint({ projectRoot: root, id: "analysis.local" });
    const configPath = projectBlueprintsConfigPath(root);
    await writeFile(
      configPath,
      JSON.stringify({
        schema_version: 1,
        trust_model: "explicit_allowlist",
        enabled: true,
        allowed_ids: ["analysis.local"],
        selection: "explicit_only",
      }),
      "utf8",
    );

    await expect(buildProjectBlueprintCompatibilityReport(root)).resolves.toMatchObject({
      schemaVersion: 1,
      compatible: true,
      trustConfig: {
        exists: true,
        ok: true,
        config: {
          schemaVersion: 1,
          trustModel: "explicit_allowlist",
          enabled: true,
          allowedIds: ["analysis.local"],
        },
      },
      blueprints: [
        {
          ok: true,
          blueprintId: "analysis.local",
          trusted: true,
          errors: [],
        },
      ],
      trustedBlueprintIds: ["analysis.local"],
      errors: [],
    });
  });

  it("reports blocking errors for unknown allowed blueprint ids", async () => {
    const root = await tempProjectRoot();
    const configPath = projectBlueprintsConfigPath(root);
    await mkdir(path.dirname(configPath), { recursive: true });
    await writeFile(
      configPath,
      JSON.stringify({
        schema_version: 1,
        trust_model: "explicit_allowlist",
        enabled: true,
        allowed_ids: ["missing.local"],
        selection: "explicit_only",
      }),
      "utf8",
    );

    await expect(buildProjectBlueprintCompatibilityReport(root)).resolves.toMatchObject({
      schemaVersion: 1,
      compatible: false,
      trustedBlueprintIds: [],
      errors: [
        {
          code: "invalid_trust_config",
          message:
            "Blueprint trust config allows unknown project-local blueprint id: missing.local",
        },
      ],
    });
  });
});
