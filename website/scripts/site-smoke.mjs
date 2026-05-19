const base = process.env.BASE_URL || "http://localhost:3000";

const routes = [
  "/",
  "/docs/",
  "/docs/start/quickstart/",
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
const forbiddenPublicText = [
  "Website information architecture",
  "Website success metrics",
  "Citation guidelines",
  "Why AgentPlane exists",
  "Context and evidence",
  "View on GitHub",
];

const forbiddenNonBlogText = ["Blueprints"];

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

  if (route === "/" && !html.includes("https://github.com/basilisk-labs/agentplane")) {
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
