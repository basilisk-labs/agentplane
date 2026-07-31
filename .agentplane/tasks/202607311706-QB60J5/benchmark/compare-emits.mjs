import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const packagesDir = path.join(root, "packages");

function run(command, args) {
  execFileSync(command, args, { cwd: root, stdio: "inherit" });
}

function collectFiles(directory, files = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectFiles(absolutePath, files);
    } else if (absolutePath.includes(`${path.sep}dist${path.sep}`)) {
      files.push(absolutePath);
    }
  }
  return files;
}

function snapshot() {
  return new Map(
    collectFiles(packagesDir)
      .sort()
      .map((absolutePath) => {
        const relativePath = path.relative(root, absolutePath);
        const content = readFileSync(absolutePath);
        const digest = createHash("sha256").update(content).digest("hex");
        return [relativePath, { content: content.toString("utf8"), digest }];
      }),
  );
}

run(process.execPath, ["scripts/checks/run-typescript-build.mjs", "--clean"]);
run(process.execPath, ["scripts/checks/run-typescript-build.mjs"]);
const typescript6 = snapshot();

const typescript7Binary = path.join(
  root,
  "node_modules",
  "@typescript",
  "native",
  "bin",
  "tsc",
);
run(typescript7Binary, ["-b", "--clean"]);
run(typescript7Binary, ["-b"]);
const typescript7 = snapshot();

const allPaths = [...new Set([...typescript6.keys(), ...typescript7.keys()])].sort();
const added = allPaths.filter((file) => !typescript6.has(file));
const removed = allPaths.filter((file) => !typescript7.has(file));
const changed = allPaths.filter(
  (file) =>
    typescript6.has(file) &&
    typescript7.has(file) &&
    typescript6.get(file).digest !== typescript7.get(file).digest,
);

function classify(file) {
  if (file.endsWith(".tsbuildinfo")) return "tsbuildinfo";
  if (file.endsWith(".d.ts.map")) return "declaration_map";
  if (file.endsWith(".d.ts")) return "declaration";
  if (file.endsWith(".js.map")) return "javascript_map";
  if (file.endsWith(".js")) return "javascript";
  return "other";
}

const changedByKind = Object.groupBy(changed, classify);

function tokenMultiset(content) {
  return extractTokens(content).sort().join("\n");
}

function extractTokens(content) {
  return (
    content.match(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[A-Za-z_$][\w$]*|\d+(?:\.\d+)?|=>|[^\s]/g) ??
    []
  );
}

function tokenCountDelta(before, after) {
  const counts = new Map();
  for (const token of extractTokens(before)) counts.set(token, (counts.get(token) ?? 0) - 1);
  for (const token of extractTokens(after)) counts.set(token, (counts.get(token) ?? 0) + 1);
  return Object.fromEntries([...counts.entries()].filter(([, delta]) => delta !== 0).sort());
}

const changedDeclarations = changed.filter((file) => file.endsWith(".d.ts"));
const declarationTokenMultisetMismatch = changedDeclarations.filter(
  (file) =>
    tokenMultiset(typescript6.get(file).content) !== tokenMultiset(typescript7.get(file).content),
);
const declarationTokenCountDelta = Object.fromEntries(
  declarationTokenMultisetMismatch.map((file) => [
    file,
    tokenCountDelta(typescript6.get(file).content, typescript7.get(file).content),
  ]),
);
console.log(
  JSON.stringify(
    {
      typescript6Files: typescript6.size,
      typescript7Files: typescript7.size,
      added,
      removed,
      changedCount: changed.length,
      changedByKind: Object.fromEntries(
        Object.entries(changedByKind).map(([kind, files]) => [kind, files.length]),
      ),
      changedSample: changed.slice(0, 40),
      declarationTokenMultisetMismatch,
      declarationTokenCountDelta,
    },
    null,
    2,
  ),
);
