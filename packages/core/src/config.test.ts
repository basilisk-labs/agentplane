import { describe, expect, it } from "vitest";
import os from "node:os";
import path from "node:path";
import { mkdtemp, readFile } from "node:fs/promises";

import { defaultConfig, loadConfig, saveConfig, setByDottedKey, validateConfig } from "./index.js";

describe("config", () => {
  it("defaultConfig validates", () => {
    expect(() => validateConfig(defaultConfig())).not.toThrow();
  });

  it("loadConfig returns default config when config.json is missing", async () => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), "agentplane-config-missing-"));
    const agentplaneDir = path.join(tmp, ".agentplane");

    const loaded = await loadConfig(agentplaneDir);
    expect(loaded.exists).toBe(false);
    expect(loaded.config.schema_version).toBe(1);
    expect(loaded.raw).toHaveProperty("schema_version", 1);
  });

  it("setByDottedKey sets nested fields and preserves object shape", () => {
    const cfg = defaultConfig() as unknown as Record<string, unknown>;
    setByDottedKey(cfg, "workflow_mode", "branch_pr");
    setByDottedKey(cfg, "paths.tasks_path", ".agentplane/tasks.json");
    const validated = validateConfig(cfg);
    expect(validated.workflow_mode).toBe("branch_pr");
    expect(validated.paths.tasks_path).toBe(".agentplane/tasks.json");
  });

  it("setByDottedKey parses scalars and json-ish values", () => {
    const cfg = defaultConfig() as unknown as Record<string, unknown>;
    setByDottedKey(cfg, "finish_auto_status_commit", "false");
    setByDottedKey(cfg, "tasks.id_suffix_length_default", "12");
    setByDottedKey(cfg, "tasks.verify.required_tags", '["code","backend"]');

    const validated = validateConfig(cfg);
    expect(validated.finish_auto_status_commit).toBe(false);
    expect(validated.tasks.id_suffix_length_default).toBe(12);
    expect(validated.tasks.verify.required_tags).toEqual(["code", "backend"]);
  });

  it("setByDottedKey handles edge scalar parsing cases", () => {
    const cfg = defaultConfig() as unknown as Record<string, unknown>;

    setByDottedKey(cfg, "finish_auto_status_commit", "true");
    setByDottedKey(cfg, "framework.last_update", "null");

    setByDottedKey(cfg, "misc.decimal", "1.5");
    setByDottedKey(cfg, "misc.bad_object", "{not-json");
    setByDottedKey(cfg, "misc.bad_array", "[not-json");

    setByDottedKey(cfg, "shadow", "oops");
    setByDottedKey(cfg, "shadow.nested", "2");

    const validated = validateConfig(cfg);
    expect(validated.finish_auto_status_commit).toBe(true);
    expect(validated.framework.last_update).toBeNull();

    const rawCfg = cfg as unknown as {
      misc: { decimal: unknown; bad_object: unknown; bad_array: unknown };
      shadow: { nested: unknown };
    };
    expect(rawCfg.misc.decimal).toBe(1.5);
    expect(rawCfg.misc.bad_object).toBe("{not-json");
    expect(rawCfg.misc.bad_array).toBe("[not-json");
    expect(rawCfg.shadow.nested).toBe(2);
  });

  it("setByDottedKey rejects empty keys", () => {
    const cfg = defaultConfig() as unknown as Record<string, unknown>;
    expect(() => setByDottedKey(cfg, "", "x")).toThrow(/non-empty/);
    expect(() => setByDottedKey(cfg, ".", "x")).toThrow(/non-empty/);
  });

  it("saveConfig writes config.json and loadConfig reads it back", async () => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), "agentplane-config-test-"));
    const agentplaneDir = path.join(tmp, ".agentplane");

    const raw = defaultConfig() as unknown as Record<string, unknown>;
    setByDottedKey(raw, "workflow_mode", "branch_pr");
    await saveConfig(agentplaneDir, raw);

    const text = await readFile(path.join(agentplaneDir, "config.json"), "utf8");
    expect(text).toContain('"workflow_mode": "branch_pr"');

    const loaded = await loadConfig(agentplaneDir);
    expect(loaded.exists).toBe(true);
    expect(loaded.config.workflow_mode).toBe("branch_pr");
  });

  it("validateConfig rejects unsupported schema_version", () => {
    const raw = defaultConfig() as unknown as Record<string, unknown>;
    raw.schema_version = 999;
    expect(() => validateConfig(raw)).toThrow(/schema_version/);
  });

  it("validateConfig rejects non-integer id_suffix_length_default", () => {
    const raw = defaultConfig() as unknown as {
      tasks: { id_suffix_length_default: number };
    };
    raw.tasks.id_suffix_length_default = 1.25;
    expect(() => validateConfig(raw)).toThrow(/id_suffix_length_default/);
  });
});
