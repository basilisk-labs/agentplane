import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

function usage() {
  console.log("Usage: node scripts/sync-schemas.mjs <check|sync>");
  throw new Error("Invalid usage");
}

function main() {
  const mode = process.argv[2];
  if (mode !== "check" && mode !== "sync") usage();

  const repoRoot = process.cwd();
  const canonical = path.join(repoRoot, "packages", "spec", "schemas", "config.schema.json");
  const target = path.join(repoRoot, "packages", "core", "schemas", "config.schema.json");

  const canonicalText = readFileSync(canonical, "utf8");
  const targetText = readFileSync(target, "utf8");

  if (mode === "check") {
    if (canonicalText !== targetText) {
      const msg =
        "config.schema.json is out of sync.\n" +
        `Canonical: ${path.relative(repoRoot, canonical)}\n` +
        `Target:    ${path.relative(repoRoot, target)}\n` +
        "Run: bun run schemas:sync";
      throw new Error(msg);
    }
    process.stdout.write("schemas OK\n");
    return;
  }

  if (canonicalText === targetText) {
    process.stdout.write("schemas already in sync\n");
    return;
  }

  writeFileSync(target, canonicalText, "utf8");
  process.stdout.write(
    `synced ${path.relative(repoRoot, canonical)} -> ${path.relative(repoRoot, target)}\n`,
  );
}

main();
