import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(new URL("../..", import.meta.url).pathname);
const docsRoot = path.join(repoRoot, "docs");
const websiteRoot = path.join(repoRoot, "website");
const errors = [];
const warnings = [];

const criticalExternalLinks = [
  "https://martinfowler.com/articles/harness-engineering.html",
  "https://www.oreilly.com/radar/agent-harness-engineering/",
  "https://www.anthropic.com/engineering/building-effective-agents",
  "https://developers.openai.com/cookbook/examples/orchestrating_agents",
  "https://www.langchain.com/blog/context-engineering-for-agents",
  "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
  "https://opentelemetry.io/docs/concepts/signals/traces/",
];

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    if (!/\.(md|mdx|ts|tsx|txt)$/.test(entry.name)) return [];
    return [fullPath];
  });
}

function routeExists(route) {
  const cleanRoute = route.length > 1 ? route.replace(/\/$/, "") : route;
  route = cleanRoute;
  if (route === "/" || route === "/docs") return true;
  if (route === "/blog") return true;
  if (route.startsWith("/docs/")) {
    const docId = route.replace(/^\/docs\//, "");
    return (
      existsSync(path.join(docsRoot, `${docId}.mdx`)) ||
      existsSync(path.join(docsRoot, `${docId}.md`)) ||
      existsSync(path.join(docsRoot, docId, "index.mdx")) ||
      existsSync(path.join(docsRoot, docId, "index.md")) ||
      existsSync(path.join(websiteRoot, "src/pages", `${route.replace(/^\//, "")}.tsx`)) ||
      existsSync(path.join(websiteRoot, "src/pages", route.replace(/^\//, ""), "index.tsx"))
    );
  }
  if (route === "/examples") return existsSync(path.join(websiteRoot, "src/pages/examples.tsx"));
  if (route === "/about") return existsSync(path.join(websiteRoot, "src/pages/about.tsx"));
  return false;
}

for (const file of walk(docsRoot).concat(walk(path.join(websiteRoot, "src")))) {
  const content = readFileSync(file, "utf8");
  const matches = content.matchAll(/(?:to|href)=["'](?<route>\/[^"']+)["']|\]\((?<md>\/[^)]+)\)/g);
  for (const match of matches) {
    const route = (match.groups?.route || match.groups?.md || "").split("#")[0];
    if (!route || route.startsWith("//")) continue;
    if (!routeExists(route)) {
      errors.push(`${path.relative(repoRoot, file)} links to missing route ${route}`);
    }
  }
}

for (const url of criticalExternalLinks) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    if (!response.ok) warnings.push(`external link returned ${response.status}: ${url}`);
  } catch (error) {
    warnings.push(
      `external link warning: ${url} (${error instanceof Error ? error.message : "failed"})`,
    );
  }
}

for (const warning of warnings) console.warn(`[link-check] ${warning}`);
if (errors.length > 0) {
  for (const error of errors) console.error(`[link-check] ${error}`);
  throw new Error("internal link check failed");
}

console.log("[link-check] ok");
