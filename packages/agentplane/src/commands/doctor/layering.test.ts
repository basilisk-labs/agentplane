import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { checkLayering } from "./layering.js";

const roots: string[] = [];

async function sourceRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-layering-"));
  roots.push(root);
  await mkdir(path.join(root, "packages", "agentplane", "src", "cli"), { recursive: true });
  await mkdir(path.join(root, "packages", "agentplane", "src", "ports"), { recursive: true });
  return root;
}

afterEach(async () => {
  await Promise.all(roots.splice(0).map(async (root) => await rm(root, { recursive: true })));
});

describe("doctor source layering", () => {
  it("accepts an absent optional clean-usecase directory", async () => {
    const root = await sourceRoot();

    await expect(checkLayering(root)).resolves.toEqual([]);
  });

  it("rejects OS, Git, and network imports in clean usecases", async () => {
    const root = await sourceRoot();
    const usecaseRoot = path.join(root, "packages", "agentplane", "src", "usecases");
    await mkdir(usecaseRoot, { recursive: true });
    await writeFile(
      path.join(usecaseRoot, "unsafe.ts"),
      [
        'import { readFile } from "node:fs/promises";',
        'import { gitRevParse } from "@agentplaneorg/core/git";',
        'import { request } from "node:https";',
        'export { execFile } from "node:child_process";',
        'const loadGit = import("simple-git");',
        'const git = require("isomorphic-git");',
        "void readFile; void gitRevParse; void request; void loadGit; void git;",
      ].join("\n"),
      "utf8",
    );

    await expect(checkLayering(root)).resolves.toEqual([
      "unsafe.ts imports banned modules: node:fs/promises, @agentplaneorg/core/git, node:https, node:child_process, simple-git, isomorphic-git",
    ]);
  });

  it("rejects direct adapter imports from the CLI", async () => {
    const root = await sourceRoot();
    const cliPath = path.join(root, "packages", "agentplane", "src", "cli", "unsafe.ts");
    await writeFile(cliPath, 'import "../adapters/fs/node-fs-adapter.js";\n', "utf8");

    await expect(checkLayering(root)).resolves.toEqual([
      "unsafe.ts imports adapters directly: ../adapters/fs/node-fs-adapter.js",
    ]);
  });
});
