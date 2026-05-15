import { execFileSync } from "node:child_process";
import { readdir, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../..");

const legacyOutputPath = path.join(repoRoot, "docs/assets/header.svg");
const outputDir = path.join(repoRoot, "docs/assets/readme-headers");
const logoPath = path.join(repoRoot, "docs/assets/agentplane.svg");
const packagePath = path.join(repoRoot, "packages/agentplane/package.json");
const blogDir = path.join(repoRoot, "website/blog");
const checkMode = process.argv.includes("--check");
const rawAssetBase =
  "https://raw.githubusercontent.com/basilisk-labs/agentplane/main/docs/assets/readme-headers";

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
    const tags = execFileSync("git", ["tag", "--list", "v[0-9]*", "--sort=-v:refname"], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .split("\n")
      .map((tag) => tag.trim())
      .filter(Boolean);

    return tags[0] ?? null;
  } catch {
    return null;
  }
}

async function packageVersionTag() {
  const pkg = JSON.parse(await readFile(packagePath, "utf8"));
  return `v${pkg.version}`;
}

function tagVariants(tag) {
  const normalized = tag.replace(/^v/i, "");
  const dash = normalized.replaceAll(".", "-");
  return [normalized.toLowerCase(), `v${normalized.toLowerCase()}`, dash.toLowerCase()];
}

function compactLogo(markup) {
  const inner = markup.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1]?.trim();
  if (!inner) throw new Error(`Could not read SVG body from ${logoPath}`);
  return inner;
}

function extractFrontmatterTitle(markdown) {
  const frontmatter = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter) return null;
  const titleLine = frontmatter[1].match(/^title:\s*(?:"([^"]+)"|'([^']+)'|(.+))$/m);
  return (titleLine?.[1] ?? titleLine?.[2] ?? titleLine?.[3] ?? "").trim() || null;
}

async function latestReleaseBlogTitle(tag) {
  try {
    const files = (await readdir(blogDir))
      .filter((name) => /\.mdx?$/.test(name))
      .filter((name) => /release|agentplane-\d+-\d+-\d+/i.test(name))
      .sort()
      .reverse();

    const variants = tagVariants(tag);
    const taggedFiles = files.filter((filename) =>
      variants.some((variant) => filename.toLowerCase().includes(variant)),
    );
    const ordered = taggedFiles.length > 0 ? taggedFiles : files;

    for (const filename of ordered) {
      const markdown = await readFile(path.join(blogDir, filename), "utf8");
      const title = extractFrontmatterTitle(markdown);
      if (title) return title;
    }
  } catch {
    // Non-fatal fallback below.
  }

  return "Release notes";
}

function trimSubtitle(value, max = 84) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}

function renderSvg({ tag, subtitle, logo }) {
  const version = tag.replace(/^v/, "");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1560" height="840" viewBox="0 0 1560 840">
<title>AgentPlane ${escapeXml(tag)} README header</title>
<style>
  .display { font-family: 'Inter Display', 'Inter', 'Arial', sans-serif; }
  .mono { font-family: 'PT Mono', 'DejaVu Sans Mono', 'Menlo', monospace; }
</style>
<rect width="1560" height="840" fill="#FAFAF7"/>
<line x1="96" y1="96" x2="1464" y2="96" stroke="#DFDED8" stroke-width="2"/>
<svg x="96" y="142" width="320" height="64" viewBox="0 0 320 64">
${logo}
</svg>
<text class="display" x="96" y="468" font-size="186" fill="#070707" font-weight="760">${escapeXml(version)}</text>
<text class="mono" x="100" y="556" font-size="24" fill="#5A6270">${escapeXml(subtitle)}</text>
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
  const subtitle = trimSubtitle(await latestReleaseBlogTitle(tag));
  const logo = compactLogo(await readFile(logoPath, "utf8"));
  const generated = new Map();
  const stale = [];

  for (const surface of readmeSurfaces) {
    const svg = renderSvg({ tag, subtitle, logo });
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
