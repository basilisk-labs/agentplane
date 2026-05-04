import { Buffer } from "node:buffer";
import { constants as fsConstants } from "node:fs";
import { access, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(websiteRoot, "..");
const docsRoot = path.join(repoRoot, "docs");
const logoPath = path.join(repoRoot, "docs", "assets", "agentplane.svg");
const socialRoot = path.join(websiteRoot, "static", "img", "social");

const WIDTH = 1280;
const HEIGHT = 640;

const args = new Set(process.argv.slice(2));
const check = args.has("--check");

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function titleCase(value) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");
}

function readFrontMatterTitle(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    return null;
  }

  const titleMatch = match[1].match(/^title:\s*(?:"([^"]+)"|'([^']+)'|(.+))$/m);
  const rawTitle = titleMatch?.[1] ?? titleMatch?.[2] ?? titleMatch?.[3];

  return rawTitle?.trim() || null;
}

function wrapWords(value, maxChars, maxLines) {
  const words = value.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;

    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }

    if (current) {
      lines.push(current);
      current = word;
    } else {
      lines.push(word);
    }

    if (lines.length === maxLines) {
      break;
    }
  }

  if (current && lines.length < maxLines) {
    lines.push(current);
  }

  if (words.join(" ").length > lines.join(" ").length && lines.length > 0) {
    lines[lines.length - 1] = `${lines.at(-1).replace(/\s+\S*$/, "")}...`;
  }

  return lines.length > 0 ? lines : [value];
}

async function collectDocs(directory, files = []) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await collectDocs(absolute, files);
      continue;
    }

    if (
      !/\.(md|mdx)$/.test(entry.name) ||
      entry.name === "README.md" ||
      entry.name.startsWith("_")
    ) {
      continue;
    }

    files.push(absolute);
  }

  return files;
}

function routeFromDocPath(docPath) {
  const relative = path.relative(docsRoot, docPath);
  const parsed = path.parse(relative);
  const withoutExtension = path.join(parsed.dir, parsed.name).split(path.sep).join("/");

  if (withoutExtension === "index") {
    return "/docs";
  }

  if (withoutExtension.endsWith("/index")) {
    return `/docs/${withoutExtension.slice(0, -"/index".length)}`;
  }

  return `/docs/${withoutExtension}`;
}

function outputPathFromRoute(route) {
  const relative = route.replace(/^\//, "");
  return path.join(socialRoot, `${relative}.png`);
}

function labelsFromRoute(route, title) {
  const parts = route
    .replace(/^\/docs\/?/, "")
    .split("/")
    .filter(Boolean);
  const section = parts[0] ? titleCase(parts[0]) : "Docs";
  const breadcrumb = ["docs", ...parts].join(" / ");

  return {
    section,
    title,
    breadcrumb,
  };
}

function renderTextLines(lines, options) {
  return lines
    .map((line, index) => {
      const y = options.y + index * options.lineHeight;
      return `<text x="${options.x}" y="${y}" font-family="${options.fontFamily}" font-size="${options.fontSize}" font-weight="${options.fontWeight}" fill="${options.fill}">${escapeXml(line)}</text>`;
    })
    .join("\n");
}

function renderGrid() {
  const lines = [];

  for (let x = 68; x <= 1212; x += 92) {
    lines.push(`<line x1="${x}" y1="36" x2="${x}" y2="604" />`);
  }

  for (let y = 36; y <= 604; y += 92) {
    lines.push(`<line x1="36" y1="${y}" x2="1244" y2="${y}" />`);
  }

  return lines.join("\n");
}

async function renderCard(entry, logoDataUri) {
  const titleLines = wrapWords(entry.title, entry.title.length > 28 ? 32 : 25, 2);
  const titleFontSize = titleLines.length > 1 ? 64 : 80;
  const titleLineHeight = titleLines.length > 1 ? 76 : 90;

  const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#ffffff"/>
  <rect x="32" y="32" width="1216" height="576" rx="6" fill="#ffffff"/>
  <g stroke="#eef1f4" stroke-width="1">
    ${renderGrid()}
  </g>
  <rect x="32" y="32" width="1216" height="576" rx="6" fill="none" stroke="#e6e9ee"/>
  <image href="${logoDataUri}" x="56" y="76" width="390" height="78" preserveAspectRatio="xMinYMid meet"/>
  <rect x="56" y="190" width="${Math.max(112, entry.section.length * 13 + 34)}" height="38" rx="19" fill="#f4f8ff" stroke="#d7e7ff"/>
  <text x="73" y="216" font-family="Inter, Arial, sans-serif" font-size="19" font-weight="700" fill="#2f78d8">${escapeXml(entry.section)}</text>
  ${renderTextLines(titleLines, {
    x: 56,
    y: 318,
    lineHeight: titleLineHeight,
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: titleFontSize,
    fontWeight: "760",
    fill: "#050505",
  })}
  <text x="56" y="532" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="27" fill="#5b6472">${escapeXml(entry.breadcrumb)}</text>
  <path d="M32 36h18M32 36v18M1248 608h-18M1248 608v-18" stroke="#b8c0ca" stroke-width="1.1" fill="none"/>
</svg>`;

  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function fileExists(filePath) {
  try {
    await access(filePath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const logo = await readFile(logoPath, "utf8");
  const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`;
  const docs = await collectDocs(docsRoot);
  const entries = [];

  for (const doc of docs) {
    const source = await readFile(doc, "utf8");
    const route = routeFromDocPath(doc);
    const fallbackTitle = titleCase(
      path.parse(doc).name === "index" ? "Docs" : path.parse(doc).name,
    );
    const title = readFrontMatterTitle(source) ?? fallbackTitle;

    entries.push({
      ...labelsFromRoute(route, title),
      outputPath: outputPathFromRoute(route),
      route,
      title,
    });
  }

  let stale = false;

  if (!check) {
    await rm(socialRoot, { recursive: true, force: true });
  }

  for (const entry of entries) {
    const png = await renderCard(entry, logoDataUri);

    if (check) {
      const exists = await fileExists(entry.outputPath);
      const current = exists ? await readFile(entry.outputPath) : null;
      const matches = current && Buffer.compare(current, png) === 0;

      if (!matches) {
        stale = true;
        console.error(`stale social image: ${path.relative(websiteRoot, entry.outputPath)}`);
      }

      continue;
    }

    await mkdir(path.dirname(entry.outputPath), { recursive: true });
    await writeFile(entry.outputPath, png);
  }

  if (stale) {
    process.exitCode = 1;
    return;
  }

  console.log(`${check ? "checked" : "generated"} ${entries.length} docs social images`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
