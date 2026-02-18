import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const scanRoot = path.join(repoRoot, "website", "src");

const forbiddenPatterns = [
  {
    name: "Rounded utility classes",
    regex: /\brounded-(?!none)\S*/gi,
  },
];

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
  for (const rule of forbiddenPatterns) {
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
    const allowed = value === "0" || value === "0px" || value === "var(--ifm-global-radius)";
    if (!allowed) {
      violations.push({
        rule: "Non-zero border radius",
        file,
        sample: match[0].slice(0, 80),
      });
    }
  }

  for (const match of content.matchAll(/box-shadow\s*:\s*([^;]+);/gi)) {
    const value = match[1].trim();
    if (value !== "none") {
      violations.push({
        rule: "Box shadow usage",
        file,
        sample: match[0].slice(0, 80),
      });
    }
  }

  const allowGradientsInFile = file === "website/src/css/custom.css";
  for (const match of content.matchAll(/(linear-gradient|radial-gradient|conic-gradient)/gi)) {
    if (!allowGradientsInFile) {
      violations.push({
        rule: "Gradient usage outside approved grid overlay",
        file,
        sample: match[0].slice(0, 80),
      });
    }
  }

  return violations;
}

async function main() {
  const files = await walk(scanRoot);
  const violations = [];
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
