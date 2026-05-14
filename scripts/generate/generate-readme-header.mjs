import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../..");

const legacyOutputPath = path.join(repoRoot, "docs/assets/header.svg");
const outputDir = path.join(repoRoot, "docs/assets/readme-headers");
const logoPath = path.join(repoRoot, "docs/assets/agentplane.svg");
const packagePath = path.join(repoRoot, "packages/agentplane/package.json");
const checkMode = process.argv.includes("--check");
const rawAssetBase =
  "https://raw.githubusercontent.com/basilisk-labs/agentplane/main/docs/assets/readme-headers";

const readmeSurfaces = [
  {
    id: "agentplane",
    readme: "README.md",
    src: "docs/assets/readme-headers/agentplane.svg",
    alt: "AgentPlane latest release header",
    mode: "release",
  },
  {
    id: "agentplane-cli",
    readme: "packages/agentplane/README.md",
    src: `${rawAssetBase}/agentplane-cli.svg`,
    alt: "AgentPlane CLI package header",
    headline: "AgentPlane CLI",
    subhead: "Traceable agent work in Git",
  },
  {
    id: "core",
    readme: "packages/core/README.md",
    src: `${rawAssetBase}/core.svg`,
    alt: "AgentPlane core package header",
    headline: "Core Contracts",
    subhead: "Typed workflow utilities",
  },
  {
    id: "recipes",
    readme: "packages/recipes/README.md",
    src: `${rawAssetBase}/recipes.svg`,
    alt: "AgentPlane recipes package header",
    headline: "Recipe Runtime",
    subhead: "Signed behavior modules",
  },
  {
    id: "spec",
    readme: "packages/spec/README.md",
    src: `${rawAssetBase}/spec.svg`,
    alt: "AgentPlane spec package header",
    headline: "Versioned Specs",
    subhead: "Repository artifact contracts",
  },
  {
    id: "testkit",
    readme: "packages/testkit/README.md",
    src: `${rawAssetBase}/testkit.svg`,
    alt: "AgentPlane testkit package header",
    headline: "Internal Testkit",
    subhead: "Workflow fixtures and harnesses",
  },
  {
    id: "docs",
    readme: "docs/README.md",
    src: "assets/readme-headers/docs.svg",
    alt: "AgentPlane docs header",
    headline: "AgentPlane Docs",
    subhead: "Public navigation source",
  },
  {
    id: "releases",
    readme: "docs/releases/README.md",
    src: "../assets/readme-headers/releases.svg",
    alt: "AgentPlane release notes header",
    headline: "Release Notes",
    subhead: "Version evidence trail",
  },
  {
    id: "adr",
    readme: "docs/adr/README.md",
    src: "../assets/readme-headers/adr.svg",
    alt: "AgentPlane ADR header",
    headline: "Architecture Decisions",
    subhead: "Design record index",
  },
  {
    id: "scripts",
    readme: "scripts/README.md",
    src: "../docs/assets/readme-headers/scripts.svg",
    alt: "AgentPlane scripts header",
    headline: "Maintainer Scripts",
    subhead: "Release and verification automation",
  },
  {
    id: "schemas",
    readme: "schemas/README.md",
    src: "../docs/assets/readme-headers/schemas.svg",
    alt: "AgentPlane schemas header",
    headline: "Schema Contracts",
    subhead: "Machine-readable workflow evidence",
  },
  {
    id: "skills",
    readme: "skills/README.md",
    src: "../docs/assets/readme-headers/skills.svg",
    alt: "AgentPlane skills header",
    headline: "AgentPlane Skills",
    subhead: "Reusable operator playbooks",
  },
  {
    id: "humanizer",
    readme: "skills/humanizer/README.md",
    src: "../../docs/assets/readme-headers/humanizer.svg",
    alt: "AgentPlane humanizer skill header",
    headline: "Humanizer Skill",
    subhead: "Natural technical writing",
  },
];

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

function renderSvg({ tag, headline, subhead, logo, surfaceLabel = "latest release" }) {
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
<text class="mono" x="96" y="266" font-size="26" fill="#005CFF" letter-spacing="1.6">${escapeXml(surfaceLabel)} / ${escapeXml(tag)}</text>
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

function renderHeaderBlock(surface) {
  return `<p align="center">
  <img src="${surface.src}" alt="${surface.alt}" style="width:100%;max-width:100%;"/>
</p>
`;
}

function syncReadmeHeader(readmeText, surface) {
  const block = renderHeaderBlock(surface);
  const normalized = readmeText.replace(/^\uFEFF/u, "");
  const existingHeader =
    /^<p align="center">\n\s*<img src="(?:[^"]*docs\/assets\/header\.svg|[^"]*docs\/assets\/readme-headers\/[^"]+|(?:\.\.\/)*assets\/readme-headers\/[^"]+|(?:\.\.\/)*docs\/assets\/readme-headers\/[^"]+)"[^>]*\/>\n<\/p>\n*/u;
  if (existingHeader.test(normalized)) {
    return normalized.replace(existingHeader, `${block}\n`);
  }
  return `${block}\n${normalized}`;
}

async function main() {
  const tag = latestReleaseTag() ?? (await packageVersionTag());
  const summary = await releaseSummary(tag);
  const releaseSurfaceCopy = releaseCopy(tag, summary);
  const logo = compactLogo(await readFile(logoPath, "utf8"));
  const generated = new Map();
  const stale = [];

  for (const surface of readmeSurfaces) {
    const copy =
      surface.mode === "release"
        ? releaseSurfaceCopy
        : { headline: surface.headline, subhead: surface.subhead };
    const svg = renderSvg({
      tag,
      ...copy,
      logo,
      surfaceLabel: surface.id.replaceAll("-", " "),
    });
    generated.set(path.join(outputDir, `${surface.id}.svg`), svg);
  }

  generated.set(legacyOutputPath, generated.get(path.join(outputDir, "agentplane.svg")));

  if (checkMode) {
    for (const [targetPath, expected] of generated) {
      const current = await readFile(targetPath, "utf8");
      if (current !== expected) {
        stale.push(path.relative(repoRoot, targetPath));
      }
    }
    for (const surface of readmeSurfaces) {
      const readmePath = path.join(repoRoot, surface.readme);
      const current = await readFile(readmePath, "utf8");
      const expected = syncReadmeHeader(current, surface);
      if (current !== expected) {
        stale.push(surface.readme);
      }
    }
    if (stale.length > 0) {
      console.error(`README header artifacts are stale:\n- ${stale.join("\n- ")}`);
      console.error("Run: bun run docs:readme-header:generate");
      process.exitCode = 1;
      return;
    }
    console.log(`README header artifacts are fresh for ${tag}`);
    return;
  }

  await mkdir(outputDir, { recursive: true });
  for (const [targetPath, svg] of generated) {
    await writeFile(targetPath, svg, "utf8");
  }
  for (const surface of readmeSurfaces) {
    const readmePath = path.join(repoRoot, surface.readme);
    const current = await readFile(readmePath, "utf8");
    await writeFile(readmePath, syncReadmeHeader(current, surface), "utf8");
  }
  console.log(`generated ${generated.size} README header images for ${tag}`);
  console.log(`linked ${readmeSurfaces.length} README files`);
}

await main();
