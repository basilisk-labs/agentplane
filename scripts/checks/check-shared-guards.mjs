import fs from "node:fs";
import path from "node:path";
import { defineCheck, runScriptMain } from "../lib/script-runtime.mjs";

const ALLOWED_IS_RECORD_DEFINITIONS = new Map([
  ["packages/agentplane/src/shared/guards.ts", "canonical shared guard"],
  ["packages/agentplane/src/evaluators/catalog.ts", "RawFrontmatter narrowing guard"],
]);

function walkTsFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkTsFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".ts")) out.push(fullPath);
  }
  return out;
}

const main = defineCheck({
  name: "check-shared-guards",
  check() {
    const root = process.cwd();
    const srcRoot = path.join(root, "packages", "agentplane", "src");
    const violations = [];
    for (const filePath of walkTsFiles(srcRoot)) {
      const relPath = path.relative(root, filePath).replaceAll(path.sep, "/");
      const text = fs.readFileSync(filePath, "utf8");
      const hasLocalIsRecord = /^(?:export\s+)?function\s+isRecord\b/m.test(text);
      if (hasLocalIsRecord && !ALLOWED_IS_RECORD_DEFINITIONS.has(relPath)) {
        violations.push(
          `${relPath}: import isRecord from packages/agentplane/src/shared/guards.ts`,
        );
      }
    }
    if (violations.length > 0) {
      throw new Error(
        `local isRecord guard definitions are not allowed:\n${violations.join("\n")}`,
      );
    }
    process.stdout.write("shared guards OK\n");
  },
});

runScriptMain(main);
