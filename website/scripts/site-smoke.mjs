const base = process.env.BASE_URL || "http://localhost:3000";

const routes = [
  "/",
  "/docs/",
  "/docs/start/quickstart/",
  "/docs/context/",
  "/docs/context/modes/",
  "/docs/context/agent-guide/",
  "/docs/workflow-guides/",
  "/docs/workflow-guides/codex/",
  "/docs/user/overview/",
  "/docs/user/setup/",
  "/docs/reference/acr/",
  "/examples/",
  "/blog/",
];

const redirectRoutes = new Map([
  ["/docs/user/agent-change-record/", "/docs/reference/acr/"],
  ["/docs/user/website-ia/", "/docs/"],
  ["/docs/listing/", "/docs/"],
  ["/docs/showcase/", "/examples/"],
]);

const requiredNav = ["Docs", "Quickstart", "npm i -g agentplane"];
const requiredDocsText = new Map([
  ["/docs/", "Hand work to any coding agent"],
  ["/docs/workflow-guides/", "Agentplane is agent-agnostic and LLM-agnostic"],
  ["/docs/workflow-guides/codex/", "This tool-specific page is kept only for old links."],
]);
const forbiddenPublicText = [
  "Website information architecture",
  "Website success metrics",
  "Citation guidelines",
  "Why AgentPlane exists",
  "Context and evidence",
  "View on GitHub",
];

const forbiddenNonBlogText = ["Blueprints"];
const githubRepoUrl = new URL("https://github.com/basilisk-labs/agentplane");

function normalizedUrlKey(url) {
  const pathname = url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;
  return `${url.origin}${pathname}`;
}

function htmlHasLinkTo(html, expectedUrl, documentUrl) {
  const expected = normalizedUrlKey(expectedUrl);
  const hrefPattern = /\bhref=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/g;
  let match;

  while ((match = hrefPattern.exec(html)) !== null) {
    try {
      const href = match[1] ?? match[2] ?? match[3];
      const candidate = new URL(href, documentUrl);
      if (normalizedUrlKey(candidate) === expected) {
        return true;
      }
    } catch {
      // Ignore malformed HTML attributes; the smoke check only needs valid links.
    }
  }

  return false;
}

async function check(route) {
  const url = `${base}${route}`;
  const res = await fetch(url, { redirect: "follow" });

  if (!res.ok) {
    throw new Error(`${url} returned ${res.status}`);
  }

  const html = await res.text();

  for (const label of requiredNav) {
    if (!html.includes(label)) {
      throw new Error(`${url} missing nav label: ${label}`);
    }
  }

  const requiredText = requiredDocsText.get(route);
  if (requiredText && !html.includes(requiredText)) {
    throw new Error(`${url} missing required docs text: ${requiredText}`);
  }

  for (const text of forbiddenPublicText) {
    if (html.includes(text)) {
      throw new Error(`${url} contains stale/internal text: ${text}`);
    }
  }

  if (route !== "/blog/") {
    for (const text of forbiddenNonBlogText) {
      if (html.includes(text)) {
        throw new Error(`${url} contains stale/internal text: ${text}`);
      }
    }
  }

  if (route === "/" && !htmlHasLinkTo(html, githubRepoUrl, url)) {
    throw new Error(`${url} homepage must link to GitHub`);
  }
}

async function checkRedirect(route, target) {
  const url = `${base}${route}`;
  const res = await fetch(url, { redirect: "manual" });

  if (!res.ok) {
    throw new Error(`${url} returned ${res.status}`);
  }

  const html = await res.text();
  if (!html.includes(target)) {
    throw new Error(`${url} must point users to ${target}`);
  }
}

for (const route of routes) {
  await check(route);
}

for (const [route, target] of redirectRoutes) {
  await checkRedirect(route, target);
}

console.log(`ok checked ${routes.length} routes and ${redirectRoutes.size} redirects at ${base}`);
