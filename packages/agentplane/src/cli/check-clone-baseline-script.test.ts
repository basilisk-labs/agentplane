import { execFile } from "node:child_process";
import { chmod, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/checks/check-clone-baseline.mjs");
const JSCPD_PATH = path.resolve(process.cwd(), "node_modules/.bin/jscpd");
const tempRoots: string[] = [];

async function setupFixture(): Promise<{ root: string; baselinePath: string; argsPath: string }> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-clone-baseline-"));
  tempRoots.push(root);
  const binDir = path.join(root, "node_modules", ".bin");
  const argsPath = path.join(root, "jscpd-args.json");
  await mkdir(binDir, { recursive: true });
  const jscpdPath = path.join(binDir, "jscpd");
  await writeFile(
    jscpdPath,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      'const path = require("node:path");',
      "const args = process.argv.slice(2);",
      `fs.writeFileSync(${JSON.stringify(argsPath)}, JSON.stringify(args));`,
      'const outputIndex = args.indexOf("--output");',
      "const output = args[outputIndex + 1];",
      "fs.mkdirSync(output, { recursive: true });",
      'fs.writeFileSync(path.join(output, "jscpd-report.json"), JSON.stringify({',
      "  statistics: { total: { sources: 0, lines: 0, tokens: 0, clones: 0, duplicatedLines: 0, duplicatedTokens: 0, percentage: 0, percentageTokens: 0 } },",
      "  duplicates: []",
      "}));",
    ].join("\n"),
    "utf8",
  );
  await chmod(jscpdPath, 0o755);

  const baselinePath = path.join(root, "clone-baseline.json");
  await writeFile(
    baselinePath,
    `${JSON.stringify({
      schema_version: 1,
      tool: "jscpd",
      metrics: { clones: 0, duplicatedLines: 0, duplicatedTokens: 0 },
    })}\n`,
    "utf8",
  );
  return { root, baselinePath, argsPath };
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (root) await rm(root, { recursive: true, force: true });
  }
});

describe("check-clone-baseline script", () => {
  it("uses the jscpd v5 CLI contract", async () => {
    const { root, baselinePath, argsPath } = await setupFixture();
    const reportDir = path.join(root, "report");

    const result = await execFileAsync(
      process.execPath,
      [SCRIPT_PATH, "--baseline", baselinePath, "--report-dir", reportDir],
      { cwd: root },
    );

    expect(result.stdout).toContain("Clone baseline OK");
    const args = JSON.parse(await readFile(argsPath, "utf8")) as string[];
    expect(args).toContain("--exit-code");
    expect(args[args.indexOf("--exit-code") + 1]).toBe("0");
    expect(args).not.toContain("--exitCode");
    expect(args).not.toContain("--noSymlinks");
  });

  it("ignores JavaScript tests while scanning ordinary JS and MJS sources", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-clone-sources-"));
    tempRoots.push(root);
    const binDir = path.join(root, "node_modules", ".bin");
    const scriptsDir = path.join(root, "scripts");
    await mkdir(binDir, { recursive: true });
    await mkdir(scriptsDir, { recursive: true });
    for (const name of ["agentplane", "core", "recipes", "testkit"]) {
      await mkdir(path.join(root, "packages", name, "src"), { recursive: true });
    }
    await symlink(JSCPD_PATH, path.join(binDir, "jscpd"));

    const repeatedSource = Array.from(
      { length: 14 },
      (_, index) => `const value${index} = input.map((item) => item.value + ${index});`,
    ).join("\n");
    const ordinaryPaths = ["source.js", "source.mjs"];
    const testPaths = ["sample.test.js", "sample.test.mjs", "sample.spec.js", "sample.spec.mjs"];
    for (const file of [...ordinaryPaths, ...testPaths]) {
      await writeFile(path.join(scriptsDir, file), `${repeatedSource}\n`, "utf8");
    }

    const reportDir = path.join(root, "report");
    await execFileAsync(process.execPath, [SCRIPT_PATH, "--report", "--report-dir", reportDir], {
      cwd: root,
    });

    const report = JSON.parse(
      await readFile(path.join(reportDir, "jscpd-report.json"), "utf8"),
    ) as {
      statistics: { total: { sources: number; clones: number } };
      duplicates: { firstFile: { name: string }; secondFile: { name: string } }[];
    };
    expect(report.statistics.total.sources).toBe(2);
    expect(report.statistics.total.clones).toBeGreaterThan(0);
    const duplicatePaths = report.duplicates.flatMap((item) => [
      item.firstFile.name,
      item.secondFile.name,
    ]);
    for (const sourceFile of ordinaryPaths) {
      expect(duplicatePaths.some((file) => file.endsWith(sourceFile))).toBe(true);
    }
    expect(
      duplicatePaths.some((file) => testPaths.some((testFile) => file.endsWith(testFile))),
    ).toBe(false);
  });
});
