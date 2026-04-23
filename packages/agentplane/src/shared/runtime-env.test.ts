import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { describe, expect, it } from "vitest";

import { resolvePreferredNodeExecutable, withPreferredRuntimePath } from "./runtime-env.js";

describe("withPreferredRuntimePath", () => {
  it("prepends the preferred node runtime directory ahead of inherited PATH entries", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-runtime-env-"));
    const nvmBin = path.join(root, ".nvm", "versions", "node", "v24.11.1", "bin");
    await mkdir(nvmBin, { recursive: true });
    await writeFile(path.join(nvmBin, "node"), "", "utf8");

    const env = withPreferredRuntimePath({
      PATH: "/tmp/custom/bin:/usr/bin",
      HOME: root,
    });
    const entries = String(env.PATH ?? "").split(path.delimiter);

    expect(entries[0]).toBe(nvmBin);
    expect(entries).toContain("/tmp/custom/bin");
    expect(entries).toContain("/usr/bin");
  });

  it("injects the bun install bin directory only once", () => {
    const homeDir = "/tmp/home";
    const bunBin = path.join(homeDir, ".bun", "bin");
    const env = withPreferredRuntimePath({
      PATH: `${bunBin}${path.delimiter}/usr/bin`,
      HOME: homeDir,
      BUN_INSTALL: homeDir,
    });
    const entries = String(env.PATH ?? "").split(path.delimiter);

    expect(entries.filter((entry) => entry === bunBin)).toHaveLength(1);
  });

  it("falls back to os.homedir when HOME is unset", () => {
    const env = withPreferredRuntimePath({ PATH: "/usr/bin" });
    const entries = String(env.PATH ?? "").split(path.delimiter);

    expect(entries).toContain(path.join(os.homedir(), ".bun", "bin"));
  });
});

describe("resolvePreferredNodeExecutable", () => {
  it("prefers NVM_BIN when available", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-runtime-node-"));
    const nvmBin = path.join(root, "bin");
    const nodePath = path.join(nvmBin, "node");
    await mkdir(nvmBin, { recursive: true });
    await writeFile(nodePath, "", "utf8");

    expect(resolvePreferredNodeExecutable({ NVM_BIN: nvmBin })).toBe(nodePath);
  });
});
