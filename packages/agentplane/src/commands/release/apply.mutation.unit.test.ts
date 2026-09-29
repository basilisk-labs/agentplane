import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  replaceAcrExampleVersionInFile,
  replaceAgentplanePackageMetadata,
  replacePackageDependencyVersion,
  replacePackageVersionInFile,
  replaceRecipesRuntimeVersionInFile,
} from "./apply.mutation.js";

const temps: string[] = [];

afterEach(async () => {
  while (temps.length > 0) {
    const dir = temps.pop();
    if (dir) await rm(dir, { recursive: true, force: true });
  }
});

async function tempFile(name: string, text: string): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-release-mutation-"));
  temps.push(root);
  const filePath = path.join(root, name);
  await writeFile(filePath, text, "utf8");
  return filePath;
}

const renderAcr = (version: string) => `{
  "producer": { "name": "agentplane", "version": "${version}" },
  "agent": {
    "toolchain": [
      { "name": "agentplane", "version": "${version}" },
      { "name": "node", "version": "0.6.3" }
    ]
  },
  "permissions": { "allowed_paths": ["packages/**"], "protected_paths": [".github/**"] },
  "metadata": { "version": "0.6.3", "description": "version: 0.6.3" }
}\n`;

describe("release apply mutation helpers", () => {
  it("preserves ACR formatting and unrelated versions during release preparation", async () => {
    const acrPath = await tempFile("acr.json", renderAcr("0.6.3"));

    await replaceAcrExampleVersionInFile(acrPath, "0.6.4");
    expect(await readFile(acrPath, "utf8")).toBe(renderAcr("0.6.4"));
    await replaceAcrExampleVersionInFile(acrPath, "0.6.4");
    expect(await readFile(acrPath, "utf8")).toBe(renderAcr("0.6.4"));
  });

  it("does not write an ACR example without an agentplane toolchain", async () => {
    const text = '{"producer":{"version":"0.6.3"},"agent":{"toolchain":[]}}\n';
    const acrPath = await tempFile("acr.json", text);
    await expect(replaceAcrExampleVersionInFile(acrPath, "0.6.4")).rejects.toThrow(
      "Failed to update agentplane toolchain version",
    );
    expect(await readFile(acrPath, "utf8")).toBe(text);
  });

  it.each([
    '{"agent":{"toolchain":[{"name":"agentplane","version":"0.6.3"}]}}',
    '{"producer":{"version":3},"agent":{"toolchain":[{"name":"agentplane","version":"0.6.3"}]}}',
    '{"producer":{"version":"0.6.2","version":"0.6.3"},"agent":{"toolchain":[{"name":"agentplane","version":"0.6.3"}]}}',
  ])("leaves missing or ambiguous version fields unchanged: %s", async (text) => {
    const acrPath = await tempFile("acr.json", text);
    await expect(replaceAcrExampleVersionInFile(acrPath, "0.6.4")).rejects.toThrow(
      "Failed to locate an unambiguous ACR version",
    );
    expect(await readFile(acrPath, "utf8")).toBe(text);
  });

  it("treats already-updated version surfaces as idempotent no-ops", async () => {
    const pkgPath = await tempFile("package.json", '{\n  "version": "0.6.4"\n}\n');
    await replacePackageVersionInFile(pkgPath, "0.6.4");
    expect(await readFile(pkgPath, "utf8")).toBe('{\n  "version": "0.6.4"\n}\n');

    const recipesPath = await tempFile("index.ts", 'export const RECIPES_VERSION = "0.6.4";\n');
    await replaceRecipesRuntimeVersionInFile(recipesPath, "0.6.4");
    expect(await readFile(recipesPath, "utf8")).toBe('export const RECIPES_VERSION = "0.6.4";\n');

    const agentplanePath = await tempFile(
      "agentplane-package.json",
      '{\n  "version": "0.6.4",\n  "dependencies": {\n    "@agentplaneorg/core": "0.6.4",\n    "@agentplaneorg/recipes": "0.6.4"\n  }\n}\n',
    );
    await replaceAgentplanePackageMetadata(agentplanePath, "0.6.4");
    expect(await readFile(agentplanePath, "utf8")).toContain('"@agentplaneorg/core": "0.6.4"');
  });

  it("preserves dependency JSON syntax when replacing package dependency versions", async () => {
    const pkgPath = await tempFile(
      "testkit-package.json",
      '{\n  "dependencies": {\n    "agentplane": "0.6.3"\n  }\n}\n',
    );
    await replacePackageDependencyVersion(pkgPath, "agentplane", "0.6.4");
    expect(JSON.parse(await readFile(pkgPath, "utf8"))).toEqual({
      dependencies: {
        agentplane: "0.6.4",
      },
    });
  });
});
