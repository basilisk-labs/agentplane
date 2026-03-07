import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { findFrameworkCheckout, resolveFrameworkBinaryContext } from "../../bin/runtime-context.js";

const tempRoots: string[] = [];

async function setupFrameworkCheckout() {
  const repoRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-runtime-context-"));
  tempRoots.push(repoRoot);
  await mkdir(path.join(repoRoot, "packages", "agentplane", "bin"), { recursive: true });
  await mkdir(path.join(repoRoot, "packages", "agentplane", "src"), { recursive: true });
  await writeFile(
    path.join(repoRoot, "packages", "agentplane", "bin", "agentplane.js"),
    "#!/usr/bin/env node\n",
    "utf8",
  );
  await writeFile(
    path.join(repoRoot, "packages", "agentplane", "src", "cli.ts"),
    "export const cli = true;\n",
    "utf8",
  );
  return {
    repoRoot,
    nestedCwd: path.join(repoRoot, "packages", "agentplane", "src"),
    repoBin: path.join(repoRoot, "packages", "agentplane", "bin", "agentplane.js"),
  };
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("runtime-context", () => {
  it("finds the nearest framework checkout from a nested cwd", async () => {
    const { repoRoot, nestedCwd, repoBin } = await setupFrameworkCheckout();

    const checkout = findFrameworkCheckout(nestedCwd);

    expect(checkout).not.toBeNull();
    expect(checkout?.repoRoot).toBe(repoRoot);
    expect(checkout?.repoBin).toBe(repoBin);
  });

  it("returns null when cwd is outside a framework checkout", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-runtime-context-outside-"));
    tempRoots.push(root);

    const checkout = findFrameworkCheckout(root);

    expect(checkout).toBeNull();
  });

  it("detects whether the current binary is already the repo-local binary", async () => {
    const { nestedCwd, repoBin } = await setupFrameworkCheckout();
    const globalBin = path.join(os.tmpdir(), "agentplane-global-bin.js");

    const repoLocal = resolveFrameworkBinaryContext({ cwd: nestedCwd, thisBin: repoBin });
    const global = resolveFrameworkBinaryContext({ cwd: nestedCwd, thisBin: globalBin });
    const distRuntime = resolveFrameworkBinaryContext({
      cwd: nestedCwd,
      thisBin: path.join(path.dirname(repoBin), "..", "dist", "cli.js"),
    });

    expect(repoLocal.inFrameworkCheckout).toBe(true);
    expect(repoLocal.isRepoLocalBinary).toBe(true);
    expect(repoLocal.isRepoLocalRuntime).toBe(true);
    expect(global.inFrameworkCheckout).toBe(true);
    expect(global.isRepoLocalBinary).toBe(false);
    expect(global.isRepoLocalRuntime).toBe(false);
    expect(global.checkout?.repoBin).toBe(repoBin);
    expect(distRuntime.inFrameworkCheckout).toBe(true);
    expect(distRuntime.isRepoLocalBinary).toBe(false);
    expect(distRuntime.isRepoLocalRuntime).toBe(true);
  });
});
