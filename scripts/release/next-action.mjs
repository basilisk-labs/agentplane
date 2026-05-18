import { execFileSync } from "node:child_process";

import { parseScriptArgs } from "../lib/script-runtime.mjs";

function runJson(cmd, args) {
  return JSON.parse(execFileSync(cmd, args, { encoding: "utf8", env: process.env }));
}

function main() {
  const { flags } = parseScriptArgs(process.argv.slice(2), {
    booleanFlags: ["check-registry", "json"],
  });
  const state = runJson("node", [
    "scripts/release/state.mjs",
    "--json",
    ...(flags["check-registry"] === true ? ["--check-registry"] : []),
  ]);

  let action = "run release candidate preparation";
  let command = "bun run release:candidate:prepare -- --write";
  if (state.git.tracked_dirty) {
    action = "clean tracked working tree before release work";
    command = "git status --short --untracked-files=no";
  } else if (!state.parity.ok) {
    action = "restore release version parity";
    command = "bun run release:parity";
  } else if (!state.release.notes_exists) {
    action = "write release notes for the target tag";
    command = `docs/releases/${state.release.tag}.md`;
  } else if (
    state.registry.checked &&
    state.registry.packages.some((pkg) => pkg.published === false) &&
    state.registry.packages.some((pkg) => pkg.published === true)
  ) {
    action = "recover partial npm publication";
    command = "bun run release:recover -- --check-github --check-registry";
  } else if (
    state.registry.checked &&
    state.registry.packages.every((pkg) => pkg.published === true) &&
    !state.release.publish_result_exists
  ) {
    action = "collect hosted publish evidence";
    command = "bun run release:evidence:collect";
  }

  const result = { schema_version: 1, action, command, state };
  if (flags.json === true) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }
  process.stdout.write(`Next action: ${action}\nCommand: ${command}\n`);
}

try {
  main();
} catch (error) {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
