import { chmod, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { afterEach, describe, expect, it } from "vitest";

import {
  resolvePreferredNodeExecutable,
  withPreferredRuntimePath,
  resolveLocalExecutable,
  localRuntimeEvidence,
} from "./runtime-env.js";

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});
async function fixture(prefix: string): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), prefix));
  roots.push(root);
  return root;
}

describe("withPreferredRuntimePath", () => {
  it("preserves inherited PATH order and adds the available node runtime directory", async () => {
    const root = await fixture("agentplane-runtime-env-");
    const nvmBin = path.join(root, ".nvm", "versions", "node", "v24.11.1", "bin");
    await mkdir(nvmBin, { recursive: true });
    await writeFile(path.join(nvmBin, "node"), "", "utf8");
    await chmod(path.join(nvmBin, "node"), 0o755);

    const env = withPreferredRuntimePath({
      PATH: "/tmp/custom/bin:/usr/bin",
      HOME: root,
    });
    const entries = String(env.PATH ?? "").split(path.delimiter);

    expect(entries[0]).toBe("/tmp/custom/bin");
    expect(entries).toContain(nvmBin);
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
    const root = await fixture("agentplane-runtime-node-");
    const nvmBin = path.join(root, "bin");
    const nodePath = path.join(nvmBin, "node");
    await mkdir(nvmBin, { recursive: true });
    await writeFile(nodePath, "", "utf8");
    await chmod(nodePath, 0o755);

    expect(resolvePreferredNodeExecutable({ NVM_BIN: nvmBin })).toBe(nodePath);
  });
});

describe("deterministic local runtime resolution", () => {
  it("keeps explicit profile PATH first and does not mutate either source", () => {
    const base = { PATH: "/inherited/bin", HOME: "/fixture/home", SECRET: "not-evidence" };
    const overrides = { PATH: "/profile/bin", BUN_INSTALL: "/profile/bun" };
    const env = withPreferredRuntimePath(base, overrides);
    expect(env.PATH!.split(path.delimiter).slice(0, 3)).toEqual([
      "/profile/bin",
      "/profile/bun/bin",
      "/inherited/bin",
    ]);
    expect(base.PATH).toBe("/inherited/bin");
    expect(overrides.PATH).toBe("/profile/bin");
    expect(JSON.stringify(localRuntimeEvidence("missing-test-runtime", env))).not.toContain(
      base.SECRET,
    );
  });

  it("chooses the highest executable NVM version numerically", async () => {
    const home = await fixture("agentplane-runtime-versions-");
    for (const version of ["v9.0.0", "v24.1.0", "v25.0.0"]) {
      const file = path.join(home, ".nvm", "versions", "node", version, "bin", "node");
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, "");
      if (version !== "v25.0.0") await chmod(file, 0o755);
    }
    if (process.platform !== "win32")
      expect(resolvePreferredNodeExecutable({ HOME: home, PATH: "" })).toContain("v24.1.0");
  });

  it("rejects implicit relative candidates and true absence", async () => {
    const home = await fixture("agentplane-runtime-absent-");
    expect(resolveLocalExecutable("node", { PATH: "." })).toBeNull();
    expect(resolveLocalExecutable("./node", { PATH: home })).toBeNull();
    expect(localRuntimeEvidence("absent-agentplane-runtime", { PATH: home })).toMatchObject({
      status: "unavailable",
      executable_digest: null,
    });
    const file = path.join(home, "node");
    await writeFile(file, "not executable");
    if (process.platform !== "win32")
      expect(resolveLocalExecutable(file, { PATH: home })).toBeNull();
  });
});
