import { execFileSync } from "node:child_process";

import { parseScriptArgs } from "../lib/script-runtime.mjs";
import { selectFastCiPlan } from "../lib/local-ci-selection.mjs";

function changedFiles(base) {
  const tracked = execFileSync("git", ["diff", "--name-only", "--diff-filter=ACMR", base], {
    encoding: "utf8",
  })
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const untracked = execFileSync("git", ["ls-files", "--others", "--exclude-standard"], {
    encoding: "utf8",
  })
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return [...new Set([...tracked, ...untracked])].toSorted();
}

const { flags } = parseScriptArgs(process.argv.slice(2), {
  valueFlags: ["base"],
  booleanFlags: ["json"],
});
const files = changedFiles(String(flags.base ?? "HEAD"));
const plan = selectFastCiPlan(files);
const commands = [
  "bun run format:changed",
  plan.kind === "docs-only" ? "bun run ci:local:smoke" : "bun run ci:local:fast",
  "bun run dev:turbo:affected",
];
const report = { schema_version: 1, files, plan, commands };

if (flags.json === true) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  process.stdout.write(`Changed files: ${files.length}\n`);
  process.stdout.write(`CI selector: ${plan.kind}${plan.bucket ? ` (${plan.bucket})` : ""}\n`);
  process.stdout.write(`Commands:\n${commands.map((cmd) => `- ${cmd}`).join("\n")}\n`);
}
