import { execFileSync } from "node:child_process";

import { selectFastCiPlan } from "../lib/local-ci-selection.mjs";
import { listStagedGitFiles } from "../lib/staged-git-files.mjs";

function run(command, args, env) {
  execFileSync(command, args, {
    stdio: "inherit",
    env: env ? { ...process.env, ...env } : process.env,
  });
}

function main() {
  const files = listStagedGitFiles();
  if (files.length === 0) {
    process.stdout.write("pre-commit: no staged files for test-fast, skipping.\n");
    return;
  }

  const plan = selectFastCiPlan(files);
  if (plan.kind === "docs-only") {
    process.stdout.write(
      `pre-commit: skipping broad test-fast for artifact/docs-only staged scope (${plan.reason}).\n`,
    );
    return;
  }

  run("bun", ["run", "test:precommit"]);
}

main();
