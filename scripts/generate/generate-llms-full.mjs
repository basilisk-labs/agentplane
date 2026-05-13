import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../..");

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

  await writeFile(path.join(repoRoot, "website/static/llms-full.txt"), `${output}\n`, "utf8");
  process.stdout.write("generated website/static/llms-full.txt\n");
}

await main();
