import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { defineScript, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const ASSETS_DIR = path.join("packages", "agentplane", "assets");
const OUT_FILE = path.join(
  "packages",
  "agentplane",
  "src",
  "shared",
  "builtin-assets.generated.ts",
);

function usage() {
  return [
    "Usage: node scripts/generate-builtin-assets.mjs [--check]",
    "",
    "Generate the TypeScript builtin asset table used by compiled AgentPlane runtimes.",
  ].join("\n");
}

function walkFiles(root, relDir = "") {
  const dir = path.join(root, relDir);
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const rel = path.join(relDir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkFiles(root, rel));
      continue;
    }
    if (entry.isFile()) out.push(rel.split(path.sep).join("/"));
  }
  return out.toSorted();
}

function render(repoRoot) {
  const assetsRoot = path.join(repoRoot, ASSETS_DIR);
  const files = walkFiles(assetsRoot);
  const hash = createHash("sha256");
  const rows = files.map((relative) => {
    const content = readFileSync(path.join(assetsRoot, relative));
    hash.update(relative);
    hash.update("\0");
    hash.update(content);
    hash.update("\0");
    return {
      path: relative,
      base64: content.toString("base64"),
    };
  });

  return [
    "// Generated from packages/agentplane/assets for compiled Bun binary runtime.",
    "// Regenerate after bundled asset changes.",
    "",
    "export type BuiltinAgentplaneAsset = {",
    "  path: string;",
    "  base64: string;",
    "};",
    "",
    `export const BUILTIN_AGENTPLANE_ASSETS_HASH =`,
    `  ${JSON.stringify(hash.digest("hex"))};`,
    "",
    "export const BUILTIN_AGENTPLANE_ASSETS: BuiltinAgentplaneAsset[] = [",
    ...rows.flatMap((row) => [
      "  {",
      `    path: ${JSON.stringify(row.path)},`,
      "    base64:",
      `      ${JSON.stringify(row.base64)},`,
      "  },",
    ]),
    "];",
    "",
  ].join("\n");
}

const main = defineScript({
  name: "generate-builtin-assets.mjs",
  async run({ argv, cwd }) {
    const { flags } = parseScriptArgs(argv, {
      booleanFlags: ["check", "help"],
    });
    if (flags.help) {
      process.stdout.write(`${usage()}\n`);
      return;
    }

    const next = render(cwd);
    const outPath = path.join(cwd, OUT_FILE);
    const current = existsSync(outPath) ? readFileSync(outPath, "utf8") : "";
    if (flags.check) {
      if (current !== next) {
        throw new Error(`${OUT_FILE} is stale. Run node scripts/generate-builtin-assets.mjs.`);
      }
      process.stdout.write("builtin asset table is fresh\n");
      return;
    }

    writeFileSync(outPath, next, "utf8");
    process.stdout.write(
      `builtin asset table generated (${walkFiles(path.join(cwd, ASSETS_DIR)).length} assets)\n`,
    );
  },
});

runScriptMain(main);
