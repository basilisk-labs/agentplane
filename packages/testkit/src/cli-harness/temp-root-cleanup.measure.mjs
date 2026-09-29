import { spawn } from "node:child_process";
import { lstat, mkdtemp, readdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const mode = process.argv[2];
if (process.argv.length !== 3 || !["--focused", "--full"].includes(mode)) {
  throw new Error("Expected --focused or --full");
}
const parent = await mkdtemp(path.join(os.tmpdir(), "agentplane-cleanup-measure-"));
const args =
  mode === "--full"
    ? ["run", "ci:local:full"]
    : [
        "x",
        "vitest",
        "run",
        "--config",
        "vitest.config.ts",
        "--maxWorkers=2",
        "packages/testkit/src/cli-harness/temp-root-cleanup.test.ts",
        "packages/testkit/src/cli-harness/temp-root-cleanup.integration.test.ts",
        "packages/agentplane/src/commands/guard/impl/close-message.test.ts",
      ];

async function measure(root) {
  let entries = 0;
  let directories = 0;
  let bytes = 0;
  for (const name of await readdir(root)) {
    const target = path.join(root, name);
    const stat = await lstat(target);
    entries += 1;
    if (stat.isDirectory() && !stat.isSymbolicLink()) {
      directories += 1;
      const nested = await measure(target);
      entries += nested.entries;
      directories += nested.directories;
      bytes += nested.bytes;
    } else bytes += stat.size;
  }
  return { entries, directories, bytes };
}

try {
  console.log(
    JSON.stringify({ kind: "temp_residue", phase: "before", ...(await measure(parent)) }),
  );
  for (let run = 1; run <= (mode === "--focused" ? 2 : 1); run += 1) {
    const code = await new Promise((resolve, reject) => {
      const child = spawn("bun", args, {
        stdio: "inherit",
        env: { ...process.env, TMPDIR: parent, TMP: parent, TEMP: parent },
      });
      child.once("error", reject);
      child.once("close", (status) => resolve(status ?? 1));
    });
    const residue = await measure(parent);
    console.log(
      JSON.stringify({ kind: "temp_residue", phase: "after", mode, run, code, ...residue }),
    );
    if (code !== 0 || residue.entries !== 0) {
      process.exitCode = code || 1;
      break;
    }
  }
} finally {
  await rm(parent, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}
