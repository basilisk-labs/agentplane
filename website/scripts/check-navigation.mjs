import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const websiteRoot = path.resolve(new URL("..", import.meta.url).pathname);
const buildRoot = path.join(websiteRoot, "build");

const requiredDocsTargets = [
  {
    route: "/docs/start/quickstart/",
    label: "Quickstart",
    title: "Quickstart",
  },
  {
    route: "/docs/context/",
    label: "Context",
    title: "Context",
  },
  {
    route: "/docs/context/modes/",
    label: "Context modes",
    title: "Choose a context mode",
  },
  {
    route: "/docs/context/agent-guide/",
    label: "Agent guide to project context",
    title: "Agent guide to project context",
  },
  {
    route: "/docs/reference/acr/",
    label: "Agent Change Records",
    title: "Agent Change Records",
  },
];

function routeToHtmlPath(route) {
  const cleanRoute = route.replace(/^\/+/, "").replace(/\/$/, "");
  return path.join(buildRoot, cleanRoute, "index.html");
}

function readRoute(route) {
  const file = route === "/" ? path.join(buildRoot, "index.html") : routeToHtmlPath(route);
  if (!existsSync(file)) {
    throw new Error(`missing built route: ${route} (${path.relative(websiteRoot, file)})`);
  }
  return readFileSync(file, "utf8");
}

function normalizeRoute(route) {
  if (route === "/") return "/";
  return route.endsWith("/") ? route : `${route}/`;
}

function extractInternalDocLinks(html) {
  const links = new Set();
  for (const match of html.matchAll(/\bhref=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/g)) {
    const href = match[1] ?? match[2] ?? match[3] ?? "";
    if (!href.startsWith("/docs")) continue;
    const route = href.split(/[?#]/)[0] ?? "";
    links.add(normalizeRoute(route));
  }
  return links;
}

function extractAssets(html) {
  return [...html.matchAll(/(?:src|href)=["'](?<asset>\/assets\/(?:js|css)\/[^"']+)["']/g)]
    .map((match) => match.groups?.asset)
    .filter(Boolean)
    .toSorted();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertH1(html, title, message) {
  const expression = new RegExp(`<h1(?:\\s[^>]*)?>\\s*${escapeRegExp(title)}\\s*</h1>`);
  if (!expression.test(html)) {
    throw new Error(message);
  }
}

function assertHasCoreAssets(route, baselineAssets, targetAssets) {
  const coreAssets = baselineAssets.filter((asset) =>
    /\/assets\/(?:js\/(?:runtime~main|main)|css\/styles)\.[^"']+$/.test(asset),
  );
  const missing = coreAssets.filter((asset) => !targetAssets.includes(asset));
  if (missing.length > 0) {
    throw new Error(`${route} is missing core docs assets: ${missing.join(", ")}`);
  }
}

export function checkDocsNavigation() {
  const docsHtml = readRoute("/docs/");
  const docsLinks = extractInternalDocLinks(docsHtml);
  const docsAssets = extractAssets(docsHtml);
  const errors = [];

  for (const target of requiredDocsTargets) {
    const route = normalizeRoute(target.route);
    if (!docsLinks.has(route)) {
      errors.push(`/docs/ must link to ${route} (${target.label})`);
      continue;
    }

    try {
      const targetHtml = readRoute(route);
      assertH1(targetHtml, target.title, `${route} must render h1 '${target.title}'`);

      const targetAssets = extractAssets(targetHtml);
      assertHasCoreAssets(route, docsAssets, targetAssets);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }

  if (!docsLinks.has("/docs/context/modes/")) {
    errors.push("/docs/ must expose the context mode decision page");
  }

  if (errors.length > 0) {
    for (const error of errors) {
      console.error(`[navigation-check] ${error}`);
    }
    throw new Error("navigation check failed");
  }

  console.log(
    `[navigation-check] ok: checked ${requiredDocsTargets.length} docs targets from website/build`,
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  checkDocsNavigation();
}
