import { execFile, spawn } from "node:child_process";
import { once } from "node:events";
import { chmod, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";
import { promisify, stripVTControlCharacters } from "node:util";
import { afterEach, describe, expect, it } from "vitest";
import { recoverStaleVitestTempRoots, VITEST_TEMP_ROOT_STALE_MS } from "./temp-root-cleanup.js";

const execFileAsync = promisify(execFile);
const require = createRequire(import.meta.url);
const roots: string[] = [];
const workers: ReturnType<typeof startWorker>[] = [];

async function sandbox() {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cleanup-lifecycle-"));
  roots.push(root);
  return root;
}

function startWorker(parent: string) {
  const helper = fileURLToPath(new URL("temp-root-cleanup.ts", import.meta.url));
  const child = spawn(
    "bun",
    [
      "-e",
      `
    import { installOwnedVitestTempRoot } from ${JSON.stringify(helper)};
    const cleanup = await installOwnedVitestTempRoot({ parent: ${JSON.stringify(parent)} });
    console.log(JSON.stringify({ root: process.env.TMPDIR }));
    await new Promise(resolve => process.stdin.once('data', resolve));
    await cleanup();
    process.stdin.destroy();
  `,
    ],
    { stdio: ["pipe", "pipe", "pipe"] },
  );
  child.stderr.resume();
  const closed = once(child, "close") as Promise<[number | null, NodeJS.Signals | null]>;
  const lines = createInterface({ input: child.stdout });
  const ready = once(lines, "line").then(([line]) => {
    lines.close();
    return (JSON.parse(String(line)) as { root: string }).root;
  });
  return { child, ready, closed };
}

afterEach(async () => {
  for (const worker of workers.splice(0)) {
    if (worker.child.exitCode === null && worker.child.signalCode === null)
      worker.child.kill("SIGKILL");
    await worker.closed;
  }
  for (const root of roots.splice(0)) await rm(root, { recursive: true, force: true });
});

describe("owned temp-root process lifecycle", { timeout: 120_000 }, () => {
  it.skipIf(process.platform === "win32").each(["cache", "fixture", "symlink"])(
    "measurement handles %s residue without hiding fixture leaks",
    async (scenario) => {
      const root = await sandbox();
      const bin = path.join(root, "bin");
      const target = path.join(root, "preserved");
      await mkdir(bin);
      await mkdir(target);
      await writeFile(path.join(target, "sentinel"), "preserve");
      const executable = path.join(bin, "bun");
      await writeFile(
        executable,
        `#!${process.execPath}\n
const fs = require('node:fs');
const path = require('node:path');
const root = process.env.TMPDIR;
const cache = path.join(root, 'node-jiti');
if (${JSON.stringify(scenario)} === 'symlink') {
  fs.symlinkSync(${JSON.stringify(target)}, cache, 'dir');
} else {
  fs.mkdirSync(cache, { recursive: true });
  fs.writeFileSync(path.join(cache, 'compiled.js'), 'toolchain cache');
  if (${JSON.stringify(scenario)} === 'fixture') {
    fs.writeFileSync(path.join(root, 'unexpected-fixture'), 'must fail');
  }
}
`,
      );
      await chmod(executable, 0o755);
      const script = fileURLToPath(new URL("temp-root-cleanup.measure.mjs", import.meta.url));
      const result = await execFileAsync(process.execPath, [script, "--focused"], {
        cwd: root,
        env: { ...process.env, PATH: `${bin}${path.delimiter}${process.env.PATH ?? ""}` },
        timeout: 90_000,
      }).then(
        ({ stdout }) => ({ code: 0, stdout }),
        (error: { code: unknown; stdout: string }) => error,
      );
      expect(result.code).toBe(scenario === "cache" ? 0 : 1);
      const records = result.stdout
        .trim()
        .split("\n")
        .map(
          (line) =>
            JSON.parse(line) as {
              kind: string;
              phase?: string;
              entries?: number;
            },
        );
      const after = records.filter((record) => record.phase === "after");
      expect(after).toHaveLength(scenario === "cache" ? 2 : 1);
      expect(after.every((record) => record.entries === 0)).toBe(scenario === "cache");
      expect(records.some((record) => record.kind === "toolchain_cache_cleanup")).toBe(
        scenario !== "symlink",
      );
      expect(await readFile(path.join(target, "sentinel"), "utf8")).toBe("preserve");
    },
  );

  it.each([
    ["assertion", "0"],
    ["assertion", "1"],
    ["subprocess", "0"],
    ["subprocess", "1"],
  ])("cleans up after a real %s test failure with FORCE_COLOR=%s", async (failure, forceColor) => {
    const root = await sandbox();
    const temporary = path.join(root, "temporary");
    await mkdir(temporary);
    const setup = fileURLToPath(new URL("../vitest-temp-root.setup.ts", import.meta.url));
    await writeFile(
      path.join(root, "vitest.config.mjs"),
      `export default ${JSON.stringify({
        test: {
          globals: true,
          include: ["failure.test.mjs"],
          setupFiles: [setup],
          maxWorkers: 1,
          // Vitest 5 otherwise stores fork transform copies in the fixture TMPDIR.
          // Keep runner caches in a separate owned location; fixture residue must stay empty.
          fsModuleCache: true,
          fsModuleCachePath: path.join(root, "runner-cache"),
        },
      })};`,
    );
    await writeFile(
      path.join(root, "failure.test.mjs"),
      `
      import { mkdtempSync, writeFileSync } from 'node:fs';
      import os from 'node:os';
      import path from 'node:path';
      import { execFileSync } from 'node:child_process';
      test('intentional failure after allocating data', () => {
        const root = mkdtempSync(path.join(os.tmpdir(), 'fixture-'));
        writeFileSync(path.join(root, 'payload'), 'owned test data');
        ${failure === "assertion" ? "expect(false).toBe(true);" : "execFileSync(process.execPath, ['-e', 'process.exit(17)']);"}
      });
    `,
    );
    const outcome = await execFileAsync(
      process.execPath,
      [
        path.join(path.dirname(require.resolve("vitest/package.json")), "vitest.mjs"),
        "run",
        "--config",
        "vitest.config.mjs",
      ],
      {
        cwd: root,
        env: {
          ...process.env,
          FORCE_COLOR: forceColor,
          TMPDIR: temporary,
          TMP: temporary,
          TEMP: temporary,
        },
        timeout: 90_000,
        maxBuffer: 2 * 1024 * 1024,
      },
    ).then(
      () => ({ code: 0, stdout: "" }),
      (error: { code: unknown; stdout: string }) => error,
    );
    expect(outcome.code).toBe(1);
    expect(stripVTControlCharacters(outcome.stdout)).toMatch(/Tests\s+1 failed/u);
    expect(await readdir(temporary)).toEqual([]);
    const runnerCacheEntries = await readdir(path.join(root, "runner-cache"));
    expect(runnerCacheEntries.length).toBeGreaterThan(0);
  });

  it("preserves concurrent live roots and recovers only an interrupted stale worker", async () => {
    const parent = await sandbox();
    const first = startWorker(parent);
    workers.push(first);
    const second = startWorker(parent);
    workers.push(second);
    const firstRoot = await first.ready;
    const secondRoot = await second.ready;
    expect(firstRoot).not.toBe(secondRoot);
    const future = Date.now() + VITEST_TEMP_ROOT_STALE_MS + 60_000;
    await recoverStaleVitestTempRoots(parent, { nowMs: future });
    const activeRoots = await readdir(parent);
    expect(activeRoots.toSorted()).toEqual(
      [path.basename(firstRoot), path.basename(secondRoot)].toSorted(),
    );
    first.child.kill("SIGKILL");
    await first.closed;
    await recoverStaleVitestTempRoots(parent);
    expect(await readdir(parent)).toHaveLength(2);
    await recoverStaleVitestTempRoots(parent, { nowMs: future });
    expect(await readdir(parent)).toEqual([path.basename(secondRoot)]);
    second.child.stdin.end("cleanup\n");
    const [exitCode] = await second.closed;
    expect(exitCode).toBe(0);
    expect(await readdir(parent)).toEqual([]);
  });
});
