import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { WORKFLOW_HARNESS_TARGETS } from "./lib/test-inventory.mjs";

const MATRIX_PATH = "docs/developer/workflow-harness-test-matrix.mdx";

async function assertExists(relPath) {
  await access(path.join(process.cwd(), relPath));
}

async function main() {
  const matrix = await readFile(path.join(process.cwd(), MATRIX_PATH), "utf8");
  const failures = [];

  for (const target of WORKFLOW_HARNESS_TARGETS) {
    try {
      await assertExists(target.source);
    } catch {
      failures.push(`Missing workflow-harness source target: ${target.source}`);
    }
    if (!matrix.includes(target.source)) {
      failures.push(`Workflow harness matrix is missing source target: ${target.source}`);
    }
    for (const testFile of target.tests) {
      try {
        await assertExists(testFile);
      } catch {
        failures.push(`Missing workflow-harness test target: ${testFile}`);
        continue;
      }
      if (!matrix.includes(testFile)) {
        failures.push(`Workflow harness matrix is missing test target: ${testFile}`);
      }
    }
  }

  if (failures.length > 0) {
    throw new Error(failures.join("\n"));
  }

  process.stdout.write(
    `Workflow harness suite contract OK (${WORKFLOW_HARNESS_TARGETS.length} source targets; matrix=${MATRIX_PATH}).\n`,
  );
}

await main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  throw error;
});
