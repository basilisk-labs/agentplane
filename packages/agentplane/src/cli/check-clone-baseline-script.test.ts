import { execFile } from "node:child_process";
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/checks/check-clone-baseline.mjs");
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
});
