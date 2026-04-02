import { access, readFile } from "node:fs/promises";
import path from "node:path";

const MATRIX_PATH = "docs/developer/workflow-harness-test-matrix.mdx";
const TARGETS = [
  {
    source: "packages/agentplane/src/workflow-runtime/validate.ts",
    tests: ["packages/agentplane/src/workflow-runtime/validate.test.ts"],
  },
  {
    source: "packages/agentplane/src/workflow-runtime/file-ops.ts",
    tests: ["packages/agentplane/src/workflow-runtime/file-ops.test.ts"],
  },
  {
    source: "packages/agentplane/src/harness/state-machine.ts",
    tests: ["packages/agentplane/src/harness/state-machine.test.ts"],
  },
  {
    source: "packages/agentplane/src/harness/retry-policy.ts",
    tests: ["packages/agentplane/src/harness/retry-policy.test.ts"],
  },
  {
    source: "packages/agentplane/src/harness/scheduler.ts",
    tests: ["packages/agentplane/src/harness/scheduler.test.ts"],
  },
];

async function assertExists(relPath) {
  await access(path.join(process.cwd(), relPath));
}

async function main() {
  const matrix = await readFile(path.join(process.cwd(), MATRIX_PATH), "utf8");
  const failures = [];

  for (const target of TARGETS) {
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
    `Workflow harness suite contract OK (${TARGETS.length} source targets; matrix=${MATRIX_PATH}).\n`,
  );
}

await main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  throw error;
});
