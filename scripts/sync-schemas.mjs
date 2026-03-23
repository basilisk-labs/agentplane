import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { renderAgentplaneConfigSchemaJson } from "../packages/core/src/config/config-schema.ts";

function usage() {
  console.log("Usage: bun scripts/sync-schemas.mjs <check|sync>");
  throw new Error("Invalid usage");
}

function main() {
  const mode = process.argv[2];
  if (mode !== "check" && mode !== "sync") usage();

  const repoRoot = process.cwd();
  const targets = [
    path.join(repoRoot, "packages", "spec", "schemas", "config.schema.json"),
    path.join(repoRoot, "packages", "core", "schemas", "config.schema.json"),
  ];
  const rendered = renderAgentplaneConfigSchemaJson();

  if (mode === "check") {
    const drifted = targets.filter((target) => readFileSync(target, "utf8") !== rendered);
    if (drifted.length > 0) {
      const lines = drifted
        .map((target) => `Target: ${path.relative(repoRoot, target)}`)
        .join("\n");
      throw new Error(
        `config schema artifacts are out of sync.\n${lines}\nRun: bun run schemas:sync`,
      );
    }
    process.stdout.write("schemas OK\n");
    return;
  }

  const drifted = targets.filter((target) => readFileSync(target, "utf8") !== rendered);
  if (drifted.length === 0) {
    process.stdout.write("schemas already in sync\n");
    return;
  }

  for (const target of drifted) writeFileSync(target, rendered, "utf8");
  process.stdout.write(
    `synced runtime config schema -> ${drifted.map((target) => path.relative(repoRoot, target)).join(", ")}\n`,
  );
}

main();
