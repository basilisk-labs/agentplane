import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const sourceRoot = path.join(repoRoot, "packages/agentplane/src");
const LEGACY_RUNTIME = "task-centric-backend-runtime";
const LEGACY_ADAPTER = "task-centric-backend-adapter";

const explicitCompatibilityBoundary = new Map([
  ["adapters/task-backend/kernel-migration-source.ts", [LEGACY_RUNTIME]],
  ["adapters/task-backend/task-centric-backend-adapter.ts", [LEGACY_RUNTIME]],
  ["commands/task/finish-shared.ts", [LEGACY_ADAPTER]],
  ["commands/task/task-centric-external-result.ts", [LEGACY_RUNTIME, LEGACY_ADAPTER]],
]);

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(target);
    if (!entry.isFile() || !/\.[cm]?[jt]sx?$/u.test(entry.name)) return [];
    if (/\.(?:test|spec)\.[cm]?[jt]sx?$/u.test(entry.name)) return [];
    return [target];
  });
}

export function inspectM3LegacyAuthorityImports() {
  const production = sourceFiles(sourceRoot);
  const imports = [];
  let productionLoc = 0;
  for (const file of production) {
    const relative = path.relative(sourceRoot, file).replaceAll("\\", "/");
    const text = readFileSync(file, "utf8");
    productionLoc += text.split("\n").length;
    for (const symbol of [LEGACY_RUNTIME, LEGACY_ADAPTER]) {
      if (text.includes(symbol)) imports.push({ file: relative, symbol });
    }
  }
  const unexpected = imports.filter(
    ({ file, symbol }) => !explicitCompatibilityBoundary.get(file)?.includes(symbol),
  );
  const legacyFiles = [
    "adapters/task-backend/task-centric-backend-runtime.ts",
    "adapters/task-backend/task-centric-backend-adapter.ts",
  ];
  const legacyProductionLoc = legacyFiles.reduce((total, relative) => {
    const file = path.join(sourceRoot, relative);
    assert.equal(statSync(file).isFile(), true);
    return total + readFileSync(file, "utf8").split("\n").length;
  }, 0);
  return {
    production_files: production.length,
    production_loc: productionLoc,
    legacy_production_loc: legacyProductionLoc,
    imports,
    unexpected,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  const report = inspectM3LegacyAuthorityImports();
  assert.deepEqual(
    report.unexpected,
    [],
    `Unexpected mutable legacy authority import: ${JSON.stringify(report.unexpected)}`,
  );
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}
