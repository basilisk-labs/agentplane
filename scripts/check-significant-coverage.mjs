import { access } from "node:fs/promises";
import path from "node:path";

const TARGETS = [
  {
    source: "packages/agentplane/src/commands/guard/impl/commands.ts",
    tests: [
      "packages/agentplane/src/commands/guard/impl/commands.unit.test.ts",
      "packages/agentplane/src/cli/run-cli.core.guard.test.ts",
    ],
  },
  {
    source: "packages/agentplane/src/commands/guard/impl/comment-commit.ts",
    tests: [
      "packages/agentplane/src/commands/guard/impl/comment-commit.test.ts",
      "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts",
    ],
  },
];

async function assertExists(relPath) {
  await access(path.join(process.cwd(), relPath));
}

async function main() {
  const failures = [];

  for (const target of TARGETS) {
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

  process.stdout.write(`Significant suite contract OK (${TARGETS.length} source targets).\n`);
}

await main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  throw error;
});
