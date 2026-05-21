import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../..");
const scanRoot = path.join(repoRoot, "website", "src");
const websiteCssPath = path.join(scanRoot, "css", "custom.css");

const websiteCssRequiredSnippets = [
  {
    name: "Geist primary font",
    snippet: '"Geist", "Geist Sans"',
  },
  {
    name: "Geist Mono code font",
    snippet: '"Geist Mono", "SFMono-Regular"',
  },
  {
    name: "Orange accent token",
    snippet: "--accent: 252 107 54;",
  },
  {
    name: "Compact global radius",
    snippet: "--ifm-global-radius: 4px;",
  },
  {
    name: "Compact floating navbar radius",
    snippet: "--chrome-radius: 4px;",
  },
];

const disallowedKeywordPatterns = [
  {
    name: "Neon/cyberpunk keyword",
    regex: /\b(neon|cyberpunk)\b/gi,
  },
  {
    name: "Parallax usage",
    regex: /\bparallax\b/gi,
  },
];

function isExpressiveSurface(file) {
  return (
    file === "website/src/css/custom.css" || /^website\/src\/pages\/.+\.module\.css$/.test(file)
  );
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }
    if (/\.(css|tsx?|jsx?)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function collectViolations(content, file) {
  const violations = [];
  for (const rule of disallowedKeywordPatterns) {
    for (const match of content.matchAll(rule.regex)) {
      violations.push({
        rule: rule.name,
        file,
        sample: match[0].slice(0, 80),
      });
    }
  }

  for (const match of content.matchAll(/border-radius\s*:\s*([^;]+);/gi)) {
    const value = match[1].trim();
    const pxMatch = /^(\d+(?:\.\d+)?)px$/.exec(value);
    if (pxMatch && Number(pxMatch[1]) > 4) {
      violations.push({
        rule: "Border radius exceeds 4px compact-radius contract",
        file,
        sample: match[0].slice(0, 80),
      });
      continue;
    }

    const allowed =
      isExpressiveSurface(file) ||
      value === "0" ||
      value === "0px" ||
      value === "var(--ifm-global-radius)";
    if (!allowed) {
      violations.push({
        rule: "Border radius outside expressive surface allowlist",
        file,
        sample: match[0].slice(0, 80),
      });
    }
  }

  for (const match of content.matchAll(/box-shadow\s*:\s*([^;]+);/gi)) {
    const value = match[1].trim();
    if (value !== "none" && !isExpressiveSurface(file)) {
      violations.push({
        rule: "Box shadow outside expressive surface allowlist",
        file,
        sample: match[0].slice(0, 80),
      });
    }
  }

  for (const match of content.matchAll(/(linear-gradient|radial-gradient|conic-gradient)/gi)) {
    if (!isExpressiveSurface(file)) {
      violations.push({
        rule: "Gradient usage outside expressive surface allowlist",
        file,
        sample: match[0].slice(0, 80),
      });
    }
  }

  return violations;
}

async function collectWebsiteCssContractViolations() {
  const content = await readFile(websiteCssPath, "utf8");
  return websiteCssRequiredSnippets
    .filter((rule) => !content.includes(rule.snippet))
    .map((rule) => ({
      rule: rule.name,
      file: path.relative(repoRoot, websiteCssPath),
      sample: rule.snippet,
    }));
}

async function main() {
  const files = await walk(scanRoot);
  const violations = await collectWebsiteCssContractViolations();
  for (const file of files) {
    const rel = path.relative(repoRoot, file);
    const content = await readFile(file, "utf8");
    violations.push(...collectViolations(content, rel));
  }

  if (violations.length === 0) {
    process.stdout.write("DESIGN.md compliance check passed\n");
    return;
  }

  const lines = ["DESIGN.md compliance check failed:"];
  for (const violation of violations) {
    lines.push(`- ${violation.rule} in ${violation.file}: ${violation.sample}`);
  }
  throw new Error(lines.join("\n"));
}

await main();
