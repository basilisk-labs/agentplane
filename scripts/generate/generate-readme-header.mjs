import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../..");

const legacyOutputPath = path.join(repoRoot, "docs/assets/header.svg");
const outputDir = path.join(repoRoot, "docs/assets/readme-headers");
const packagePath = path.join(repoRoot, "packages/agentplane/package.json");
const checkMode = process.argv.includes("--check");
const rawAssetBase =
  "https://raw.githubusercontent.com/basilisk-labs/agentplane/main/docs/assets/readme-headers";
const headerTextBox = {
  x: 52,
  y: 328,
  width: 1421,
  height: 357,
  fontSize: 96,
  lineHeight: 114,
  bottom: 728,
  descenderAllowance: 20,
  maxLines: 3,
};
const releaseHeadlineSlogan =
  "Ship agent work faster with repo-local plans, checks, traces, and PR evidence.";

const readmeSurfaces = [
  {
    id: "agentplane",
    readme: "README.md",
    src: "docs/assets/readme-headers/agentplane.svg",
    alt: "AgentPlane latest release header",
  },
  {
    id: "agentplane-cli",
    readme: "packages/agentplane/README.md",
    src: `${rawAssetBase}/agentplane-cli.svg`,
    alt: "AgentPlane CLI package header",
  },
  {
    id: "core",
    readme: "packages/core/README.md",
    src: `${rawAssetBase}/core.svg`,
    alt: "AgentPlane core package header",
  },
  {
    id: "recipes",
    readme: "packages/recipes/README.md",
    src: `${rawAssetBase}/recipes.svg`,
    alt: "AgentPlane recipes package header",
  },
  {
    id: "spec",
    readme: "packages/spec/README.md",
    src: `${rawAssetBase}/spec.svg`,
    alt: "AgentPlane spec package header",
  },
  {
    id: "testkit",
    readme: "packages/testkit/README.md",
    src: `${rawAssetBase}/testkit.svg`,
    alt: "AgentPlane testkit package header",
  },
  {
    id: "docs",
    readme: "docs/README.md",
    src: "assets/readme-headers/docs.svg",
    alt: "AgentPlane docs header",
  },
  {
    id: "releases",
    readme: "docs/releases/README.md",
    src: "../assets/readme-headers/releases.svg",
    alt: "AgentPlane release notes header",
  },
  {
    id: "adr",
    readme: "docs/adr/README.md",
    src: "../assets/readme-headers/adr.svg",
    alt: "AgentPlane ADR header",
  },
  {
    id: "scripts",
    readme: "scripts/README.md",
    src: "../docs/assets/readme-headers/scripts.svg",
    alt: "AgentPlane scripts header",
  },
  {
    id: "schemas",
    readme: "schemas/README.md",
    src: "../docs/assets/readme-headers/schemas.svg",
    alt: "AgentPlane schemas header",
  },
  {
    id: "skills",
    readme: "skills/README.md",
    src: "../docs/assets/readme-headers/skills.svg",
    alt: "AgentPlane skills header",
  },
  {
    id: "humanizer",
    readme: "skills/humanizer/README.md",
    src: "../../docs/assets/readme-headers/humanizer.svg",
    alt: "AgentPlane humanizer skill header",
  },
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function latestReleaseTag() {
  try {
    const firstTag = execFileSync("git", ["tag", "--list", "v[0-9]*", "--sort=-v:refname"], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .split("\n")
      .map((tag) => tag.trim())
      .find((tag) => tag.length > 0);

    return firstTag ?? null;
  } catch {
    return null;
  }
}

async function packageVersionTag() {
  const pkg = JSON.parse(await readFile(packagePath, "utf8"));
  return `v${pkg.version}`;
}

function trimHeadline(value, max = 92) {
  const normalized = value.replaceAll(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  const clipped = normalized.slice(0, max - 1);
  const wordBoundary = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, Math.max(wordBoundary, max - 18)).trimEnd()}…`;
}

function releaseHeaderText() {
  return trimHeadline(releaseHeadlineSlogan);
}

function estimateTextWidth(value, fontSize) {
  let width = 0;
  for (const character of value) {
    if (character === " ") width += fontSize * 0.28;
    else if (/[.,:;!|'`]/u.test(character)) width += fontSize * 0.22;
    else if (/[—–/-]/u.test(character)) width += fontSize * 0.46;
    else if (/[ilI]/u.test(character)) width += fontSize * 0.24;
    else if (/[mwMW]/u.test(character)) width += fontSize * 0.82;
    else width += fontSize * 0.52;
  }
  return width;
}

function wrapHeaderText(value) {
  const words = value.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (current && estimateTextWidth(next, headerTextBox.fontSize) > headerTextBox.width) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  if (lines.length <= headerTextBox.maxLines) return lines;

  const kept = lines.slice(0, headerTextBox.maxLines);
  let last = kept.at(-1) ?? "";
  while (
    last.length > 1 &&
    estimateTextWidth(`${last}…`, headerTextBox.fontSize) > headerTextBox.width
  ) {
    last = last.replace(/\s+\S+$/u, "");
  }
  kept[kept.length - 1] = `${last.trimEnd()}…`;
  return kept;
}

function renderGrid() {
  const vertical = Array.from({ length: 13 }, (_, index) => {
    const x = 10 + index * 119.91;
    return `<line x1="${x.toFixed(2)}" y1="59" x2="${x.toFixed(2)}" y2="780" stroke="#EBEBEB" stroke-width="1"/>`;
  }).join("\n");
  const horizontal = Array.from({ length: 7 }, (_, index) => {
    const y = 59 + index * 120;
    return `<line x1="10" y1="${y.toFixed(2)}" x2="1450" y2="${y.toFixed(2)}" stroke="#EBEBEB" stroke-width="1"/>`;
  }).join("\n");
  return `${vertical}\n${horizontal}`;
}

function renderHeaderLines(text) {
  const lines = wrapHeaderText(text);
  const firstBaseline =
    headerTextBox.bottom -
    headerTextBox.descenderAllowance -
    (lines.length - 1) * headerTextBox.lineHeight;
  return lines
    .map((line, index) => {
      const y = firstBaseline + index * headerTextBox.lineHeight;
      return `<tspan x="${headerTextBox.x}" y="${y}">${escapeXml(line)}</tspan>`;
    })
    .join("\n");
}

function renderSvg({ tag, headline }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1560" height="840" viewBox="0 0 1560 840">
<title>AgentPlane ${escapeXml(tag)} README header</title>
<style>
  .display { font-family: 'Geist', 'Inter Display', 'Inter', 'Arial', sans-serif; }
  .pixel { font-family: 'Geist Pixel', 'PT Mono', 'DejaVu Sans Mono', 'Menlo', monospace; }
</style>
<rect width="1560" height="840" fill="#FFFFFF"/>
${renderGrid()}
<path d="M0 59H21M10 49V70M1439 780H1460M1450 769V790" stroke="#AFAFAF" stroke-width="1"/>
<text class="display" x="52" y="299" font-size="196" font-weight="700" letter-spacing="-0.02em" fill="#000000">agent/plane</text>
<text class="pixel" x="1160" y="179" font-size="48" font-weight="400" letter-spacing="-0.04em" fill="#000000">${escapeXml(tag)}</text>
<text class="display" font-size="${headerTextBox.fontSize}" font-weight="500" line-height="${headerTextBox.lineHeight}" letter-spacing="-0.04em" fill="#000000">
${renderHeaderLines(headline)}
</text>
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
  const headline = releaseHeaderText();
  const generated = new Map();
  const stale = [];

  for (const surface of readmeSurfaces) {
    const svg = renderSvg({ tag, headline });
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
