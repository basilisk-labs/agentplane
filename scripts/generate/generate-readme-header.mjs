import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../..");

const outputPath = path.join(repoRoot, "docs/assets/header.svg");
const logoPath = path.join(repoRoot, "docs/assets/agentplane.svg");
const packagePath = path.join(repoRoot, "packages/agentplane/package.json");
const checkMode = process.argv.includes("--check");

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function titleCase(value) {
  return value
    .trim()
    .replaceAll(/\s+/g, " ")
    .replaceAll(/\b[a-z]/g, (char) => char.toUpperCase())
    .replaceAll(/\bAnd\b/g, "and")
    .replaceAll(/\bOr\b/g, "or")
    .replaceAll(/\bFor\b/g, "for")
    .replaceAll(/\bIn\b/g, "in");
}

function latestReleaseTag() {
  try {
    const tags = execFileSync("git", ["tag", "--list", "v[0-9]*", "--sort=-v:refname"], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .split("\n")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const tag = tags.find(Boolean);
    if (tag) return tag;
  } catch {
    // Fall through to package metadata.
  }

  return null;
}

async function packageVersionTag() {
  const pkg = JSON.parse(await readFile(packagePath, "utf8"));
  return `v${pkg.version}`;
}

async function releaseSummary(tag) {
  const releasePath = path.join(repoRoot, "docs/releases", `${tag}.md`);

  try {
    const text = await readFile(releasePath, "utf8");
    const summary = text.match(/## Summary\n+([\s\S]*?)(?:\n## |\n?$)/);
    const bullet = summary?.[1]
      ?.split("\n")
      .map((line) => line.trim())
      .find((line) => line.startsWith("- "));

    if (bullet) return bullet.slice(2).trim();
  } catch {
    // Release notes are useful copy input, not a hard dependency.
  }

  return "Git-native infrastructure for traceable AI work.";
}

function releaseCopy(tag, summary) {
  let withoutVersion = summary.trim();
  if (withoutVersion.toLowerCase().startsWith(`${tag.toLowerCase()} `)) {
    withoutVersion = withoutVersion.slice(tag.length).trimStart();
  }
  if (withoutVersion.toLowerCase().startsWith("agentplane ")) {
    withoutVersion = withoutVersion.slice("AgentPlane".length).trimStart();
  }
  if (withoutVersion.endsWith(".")) {
    withoutVersion = withoutVersion.slice(0, -1);
  }

  const turns = withoutVersion.match(/^turns\s+(.+?)\s+into\s+(.+?)(?:,\s+including|$)/i);
  if (turns) {
    return {
      headline: titleCase(turns[1]),
      subhead: titleCase(turns[2]),
    };
  }

  const adds = withoutVersion.match(/^adds\s+(.+?)(?::\s+(.+)|$)/i);
  if (adds) {
    return {
      headline: titleCase(adds[1]),
      subhead: titleCase(adds[2] ?? "Traceable agent work in Git"),
    };
  }

  const sentence = withoutVersion.split(/[.;]/)[0]?.trim() || "Traceable AI work";
  const words = sentence.split(/\s+/);
  const midpoint = Math.min(5, Math.ceil(words.length / 2));

  return {
    headline: titleCase(words.slice(0, midpoint).join(" ")),
    subhead: titleCase(
      words.slice(midpoint, midpoint + 7).join(" ") || "Traceable agent work in Git",
    ),
  };
}

function compactLogo(markup) {
  const inner = markup.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1]?.trim();
  if (!inner) throw new Error(`Could not read SVG body from ${logoPath}`);
  return inner;
}

function fitDisplaySize(value, maxWidth, preferred, minimum) {
  const approximateCharacterWidth = 0.56;
  return Math.max(
    minimum,
    Math.min(preferred, Math.floor(maxWidth / (value.length * approximateCharacterWidth))),
  );
}

function renderSvg({ tag, headline, subhead, logo }) {
  const headlineSize = fitDisplaySize(headline, 1260, 88, 56);
  const subheadSize = fitDisplaySize(subhead, 1260, 88, 56);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1560" height="840" viewBox="0 0 1560 840">
<title>AgentPlane ${escapeXml(tag)} README header</title>
<style>
  .display { font-family: 'Inter Display', 'Inter', 'Arial', sans-serif; }
  .sans { font-family: 'Inter', 'Arial', sans-serif; }
  .mono { font-family: 'PT Mono', 'DejaVu Sans Mono', 'Menlo', monospace; }
</style>
<rect width="1560" height="840" fill="#FAFAF7"/>
<line x1="96" y1="94" x2="1464" y2="94" stroke="#DFDED8" stroke-width="2"/>
<line x1="96" y1="94" x2="238" y2="94" stroke="#005CFF" stroke-width="3"/>
<svg x="96" y="126" width="320" height="64" viewBox="0 0 320 64">
${logo}
</svg>
<text class="mono" x="96" y="266" font-size="26" fill="#005CFF" letter-spacing="1.6">latest release / ${escapeXml(tag)}</text>
<text class="display" x="92" y="390" font-size="${headlineSize}" fill="#070707" font-weight="830">${escapeXml(headline)}</text>
<text class="display" x="92" y="500" font-size="${subheadSize}" fill="#070707" font-weight="830">${escapeXml(subhead)}</text>
<text class="sans" x="98" y="592" font-size="32" fill="#3F4752">Git-native infrastructure for traceable AI work</text>
<text class="mono" x="100" y="704" font-size="30" fill="#070707">plan -&gt; verify -&gt; ACR -&gt; finish</text>
<rect x="104" y="732" width="358" height="3" fill="#005CFF" rx="1.5"/>
<rect x="1148" y="604" width="236" height="96" fill="#070707" rx="14"/>
<text class="mono" x="1184" y="642" font-size="22" fill="#98A4B7" letter-spacing="2">VERSION</text>
<text class="display" x="1184" y="681" font-size="42" fill="#FFFFFF" font-weight="760">${escapeXml(tag.replace(/^v/, ""))}</text>
</svg>
`;
}

async function main() {
  const tag = latestReleaseTag() ?? (await packageVersionTag());
  const summary = await releaseSummary(tag);
  const copy = releaseCopy(tag, summary);
  const logo = compactLogo(await readFile(logoPath, "utf8"));
  const svg = renderSvg({ tag, ...copy, logo });

  if (checkMode) {
    const current = await readFile(outputPath, "utf8");
    if (current !== svg) {
      console.error(
        `${path.relative(repoRoot, outputPath)} is stale. Run: bun run docs:readme-header:generate`,
      );
      process.exitCode = 1;
      return;
    }
    console.log(`${path.relative(repoRoot, outputPath)} is fresh for ${tag}`);
    return;
  }

  await writeFile(outputPath, svg, "utf8");
  console.log(`generated ${path.relative(repoRoot, outputPath)} for ${tag}`);
}

await main();
