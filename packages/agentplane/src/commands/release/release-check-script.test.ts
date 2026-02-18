import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/release-check.mjs");

function writeBinary(filePath: string, content: string) {
  writeFileSync(filePath, content, { encoding: "utf8" });
}

describe("release-check script", () => {
  it("uses explicit NPM_CONFIG_CACHE and both release package dirs", async () => {
    const tmpRoot = mkdtempSync(path.join(tmpdir(), "agentplane-release-check-"));
    const binDir = path.join(tmpRoot, "bin");
    const logPath = path.join(tmpRoot, "npm-call.log");
    const cachePath = path.join(tmpRoot, "cache-override");
    const wrapperPath = path.join(binDir, "npm-wrapper.js");
    mkdirSync(binDir, { recursive: true });

    writeBinary(
      wrapperPath,
      `const fs = require('node:fs');\n` +
        `const path = process.env.RELEASE_CHECK_LOG;\n` +
        `if (path) { fs.appendFileSync(path, JSON.stringify({\n` +
        `  cwd: process.cwd(),\n` +
        `  args: process.argv.slice(2),\n` +
        `  cache: process.env.NPM_CONFIG_CACHE,\n` +
        `}) + '\\n'); }\n` +
        `process.exit(0);\n`,
    );

    writeBinary(
      path.join(binDir, "npm"),
      `#!/usr/bin/env node\nrequire('${wrapperPath.replaceAll("\\", "\\\\")}');\n`,
    );
    chmodSync(path.join(binDir, "npm"), 0o755);
    writeBinary(path.join(binDir, "npm.cmd"), `@node "${wrapperPath}" %*\n`);

    const runResult = await execFileAsync("node", [SCRIPT_PATH], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        PATH: `${binDir}${path.delimiter}${process.env.PATH}`,
        NPM_CONFIG_CACHE: cachePath,
        RELEASE_CHECK_LOG: logPath,
      },
    }).then(
      () => ({ ok: true as const }),
      () => ({ ok: false as const }),
    );

    try {
      expect(runResult.ok).toBe(true);
      const lines = readFileSync(logPath, "utf8")
        .trim()
        .split("\n")
        .map(
          (line) => JSON.parse(line) as { cwd: string; args: string[]; cache: string | undefined },
        );

      expect(lines).toHaveLength(2);
      expect(lines.map((entry) => entry.args)).toEqual([
        ["pack", "--dry-run"],
        ["pack", "--dry-run"],
      ]);
      expect(lines[0].cache).toBe(cachePath);
      expect(lines[1].cache).toBe(cachePath);
      expect(
        path.normalize(lines[0].cwd).includes(path.normalize(path.join("packages", "core"))),
      ).toBe(true);
      expect(
        path.normalize(lines[1].cwd).includes(path.normalize(path.join("packages", "agentplane"))),
      ).toBe(true);
    } finally {
      rmSync(tmpRoot, { recursive: true, force: true });
    }
  });
});
