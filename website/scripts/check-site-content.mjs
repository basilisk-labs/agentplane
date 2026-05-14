import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const root = new URL("..", import.meta.url).pathname;
const errors = [];

function read(relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

function checkBlogDates() {
  const today = todayUtc();
  for (const filename of readdirSync(path.join(root, "blog"))) {
    const match = /^(?<date>\d{4}-\d{2}-\d{2})-.+\.mdx$/.exec(filename);
    if (!match?.groups?.date) continue;
    if (match.groups.date > today) {
      errors.push(`future-dated blog post must not ship: ${filename} > ${today} UTC`);
    }
  }
}

function checkHomepageCommands() {
  const content = read("src/data/homepage-content.ts");
  const page = read("src/pages/index.tsx");

  if (content.includes("$agentplane") || page.includes("$agentplane")) {
    errors.push("homepage command snippets must not contain '$agentplane'");
  }

  if (content.includes("npm i -g agentplane ") || page.includes("npm i -g agentplane ")) {
    errors.push("install command must not contain trailing whitespace");
  }

  if (!content.includes('export const installCommand = "npm i -g agentplane";')) {
    errors.push("homepage install command must stay exactly 'npm i -g agentplane'");
  }
}

checkBlogDates();
checkHomepageCommands();

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`[site-content] ${error}`);
  }
  throw new Error("site content check failed");
}

console.log("[site-content] ok");
