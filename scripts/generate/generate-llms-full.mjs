import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../..");
const check = process.argv.includes("--check");

const SOURCES = [
  "docs/manifesto.mdx",
  "docs/compare.mdx",
  "docs/user/overview.mdx",
  "docs/user/setup.mdx",
  "docs/user/workflow.mdx",
  "docs/user/task-lifecycle.mdx",
  "docs/user/commands.mdx",
  "docs/recipes/index.mdx",
  "website/blog/2026-05-04-introducing-acr-v0-1.mdx",
];

function stripFrontmatter(text) {
  if (!text.startsWith("---\n")) return text.trim();
  const end = text.indexOf("\n---\n", 4);
  if (end === -1) return text.trim();
  return text.slice(end + 5).trim();
}

async function main() {
  const sections = [];
  for (const source of SOURCES) {
    const absolute = path.join(repoRoot, source);
    const text = await readFile(absolute, "utf8");
    sections.push([`## Source: ${source}`, "", stripFrontmatter(text)].join("\n"));
  }

  const output = [
    "# AgentPlane LLM Discovery Index",
    "",
    "canonical: https://agentplane.org",
    "updated: 2026-05-04",
    "acr-schema: https://agentplane.org/schemas/acr-v0.1.schema.json",
    "",
    ...sections,
  ].join("\n\n");

  const targetPath = path.join(repoRoot, "website/static/llms-full.txt");
  const rendered = `${output}\n`;
  const current = await readFile(targetPath, "utf8").catch(() => null);

  if (check) {
    if (current === rendered) {
      process.stdout.write("ok: website/static/llms-full.txt is fresh\n");
    } else {
      process.stderr.write("stale website/static/llms-full.txt\n");
      process.exitCode = 1;
    }
    return;
  }

  if (current === rendered) {
    process.stdout.write("unchanged website/static/llms-full.txt\n");
    return;
  }

  await writeFile(targetPath, rendered, "utf8");
  process.stdout.write("generated website/static/llms-full.txt\n");
}

await main();
