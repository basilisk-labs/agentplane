import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { readJsonFile } from "./json-io.js";

describe("shared/json-io", () => {
  it("reads JSON files", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-json-io-"));
    const filePath = path.join(root, "data.json");
    await writeFile(filePath, JSON.stringify({ ok: true }), "utf8");

    await expect(readJsonFile<{ ok: boolean }>(filePath)).resolves.toEqual({ ok: true });
  });

  it("returns the configured default for missing or invalid JSON", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-json-io-"));
    const missingPath = path.join(root, "missing.json");
    const invalidPath = path.join(root, "invalid.json");
    await writeFile(invalidPath, "{", "utf8");

    await expect(readJsonFile(missingPath, { defaultValue: null })).resolves.toBeNull();
    await expect(readJsonFile(invalidPath, { defaultValue: null })).resolves.toBeNull();
  });

  it("throws read or parse errors when no default is configured", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-json-io-"));
    const invalidPath = path.join(root, "invalid.json");
    await writeFile(invalidPath, "{", "utf8");

    await expect(readJsonFile(path.join(root, "missing.json"))).rejects.toMatchObject({
      code: "ENOENT",
    });
    await expect(readJsonFile(invalidPath)).rejects.toBeInstanceOf(SyntaxError);
  });
});
