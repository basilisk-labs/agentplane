import { access } from "node:fs/promises";
import path from "node:path";
import { SIGNIFICANT_COVERAGE_TARGETS } from "./lib/test-inventory.mjs";

async function assertExists(relPath) {
  await access(path.join(process.cwd(), relPath));
}

async function main() {
  const failures = [];

  for (const target of SIGNIFICANT_COVERAGE_TARGETS) {
    try {
      await assertExists(target.source);
    } catch {
      failures.push(`Missing significant-suite source target: ${target.source}`);
    }
    for (const testFile of target.tests) {
      try {
        await assertExists(testFile);
      } catch {
        failures.push(`Missing significant-suite test target: ${testFile}`);
      }
    }
  }

  if (failures.length > 0) {
    throw new Error(failures.join("\n"));
  }

  process.stdout.write(
    `Significant suite contract OK (${SIGNIFICANT_COVERAGE_TARGETS.length} source targets).\n`,
  );
}

await main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  throw error;
});
