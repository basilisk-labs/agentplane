import { readFile } from "node:fs/promises";
import path from "node:path";
import { format } from "prettier";

import { ROOT, defineScript, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";
import {
  checkGeneratedTextArtifactFresh,
  writeGeneratedTextArtifact,
} from "../lib/generated-artifacts.mjs";

const PACKAGE_JSON_PATH = path.join(ROOT, "package.json");
const DEFAULT_OUT_PATH = path.join(ROOT, "scripts", "README.md");

const GROUPS = [
  {
    key: "ci",
    title: "CI",
    match: (name) => name === "ci" || name.startsWith("ci:"),
  },
  {
    key: "release",
    title: "Release",
    match: (name) => name.startsWith("release:"),
  },
  {
    key: "docs",
    title: "Docs",
    match: (name) => name.startsWith("docs:"),
  },
  {
    key: "test",
    title: "Test",
    match: (name) => name === "test" || name.startsWith("test:"),
  },
  {
    key: "coverage",
    title: "Coverage",
    match: (name) => name.startsWith("coverage:"),
  },
  {
    key: "arch",
    title: "Architecture",
    match: (name) => name === "arch:check" || name.startsWith("arch:"),
  },
  {
    key: "bench",
    title: "Bench",
    match: (name) => name.startsWith("bench:"),
  },
  {
    key: "clone",
    title: "Clone Detection",
    match: (name) => name.startsWith("clone:"),
  },
  {
    key: "misc",
    title: "Misc",
    match: () => true,
  },
];

function classifyScript(name) {
  const group = GROUPS.find((entry) => entry.match(name));
  return group ? group.key : "misc";
}

function inferPurpose(name) {
  if (name === "build") return "Build TypeScript project and bundle publishable packages.";
  if (name === "typecheck") return "Run repository TypeScript type checks.";
  if (name === "lint") return "Run full lint suite.";
  if (name === "format") return "Format repository files with Prettier.";
  if (name === "format:check") return "Check formatting drift with Prettier.";
  if (name === "hotspots:check") return "Run hotspot guardrails for runtime and test file size.";
  if (name === "workflows:lint") return "Validate workflow files and command contracts.";
  if (name === "docs:scripts:check") return "Check scripts/README.md freshness.";
  if (name === "docs:scripts:generate") return "Regenerate scripts/README.md from package scripts.";

  const [namespace, ...rest] = name.split(":");
  if (rest.length === 0) {
    return `Run ${namespace} workflow commands.`;
  }
  const detail = rest.join(" ");
  return `Run ${namespace} workflow: ${detail}.`;
}

function renderTable(entries) {
  if (entries.length === 0) {
    return "_No scripts in this group._\n";
  }
  const header = ["| Script | Command | Purpose |", "| --- | --- | --- |"];
  const rows = entries.map((entry) => {
    const command = entry.command.replaceAll("|", String.raw`\|`);
    const purpose = inferPurpose(entry.name).replaceAll("|", String.raw`\|`);
    return `| \`${entry.name}\` | \`${command}\` | ${purpose} |`;
  });
  return [...header, ...rows, ""].join("\n");
}

function buildReadme(entries) {
  const lines = [
    '<p align="center">',
    '  <img src="../docs/assets/readme-headers/scripts.svg" alt="AgentPlane scripts header" style="width:100%;max-width:100%;"/>',
    "</p>",
    "",
    "# Scripts README",
    "",
    "> Generated file. Do not edit manually.",
    "",
    "Source of truth: `package.json` `scripts` field.",
    "",
    "Grouping policy: `ci`, `release`, `docs`, `test`, `coverage`, `arch`, `bench`, `clone`, `misc`.",
    "",
    "Implementation layout: canonical script implementations live under `scripts/checks/`, `scripts/generate/`, `scripts/bench/`, `scripts/release/`, and `scripts/workflow/`. Root-level `scripts/*.mjs` files are compatibility wrappers for existing local and external callers.",
    "",
  ];

  for (const group of GROUPS) {
    const groupTable = renderTable(entries.filter((entry) => entry.group === group.key));
    lines.push(`## ${group.title}`, "", groupTable);
  }

  const ambiguous = entries.filter((entry) => entry.group === "misc" && entry.name.includes(":"));
  lines.push("## Ungrouped Namespace Scripts", "");
  if (ambiguous.length === 0) {
    lines.push("_None._", "");
  } else {
    const ambiguousRows = ambiguous.map(
      (entry) => `- \`${entry.name}\` is currently grouped as \`misc\` (review namespace intent).`,
    );
    lines.push(...ambiguousRows, "");
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

async function loadScripts() {
  const raw = await readFile(PACKAGE_JSON_PATH, "utf8");
  const parsed = JSON.parse(raw);
  const scripts = parsed?.scripts;
  if (!scripts || typeof scripts !== "object") {
    throw new Error("package.json does not contain a scripts object");
  }

  return Object.entries(scripts)
    .map(([name, command]) => {
      if (typeof command !== "string") {
        throw new TypeError(`Script "${name}" must be a string`);
      }
      return { name, command, group: classifyScript(name) };
    })
    .toSorted((left, right) => left.name.localeCompare(right.name));
}

async function generateScriptsReadmeText() {
  const scripts = await loadScripts();
  return format(buildReadme(scripts), { parser: "markdown" });
}

async function runGenerateScriptsReadme(argv) {
  const { flags } = parseScriptArgs(argv, {
    valueFlags: ["out"],
    booleanFlags: ["check"],
  });
  const outPath = flags.out ? path.resolve(ROOT, flags.out) : DEFAULT_OUT_PATH;
  const check = flags.check === true;

  if (check) {
    await checkGeneratedTextArtifactFresh({
      outputPath: outPath,
      generateText: generateScriptsReadmeText,
      missingMessage:
        "scripts/README.md is missing. Regenerate with: bun run docs:scripts:generate",
      staleMessage: "scripts/README.md is stale. Regenerate with: bun run docs:scripts:generate",
    });
    process.stdout.write("ok: scripts/README.md is up to date\n");
    return;
  }

  await writeGeneratedTextArtifact({
    outputPath: outPath,
    generateText: generateScriptsReadmeText,
  });
  process.stdout.write(`generated: ${path.relative(ROOT, outPath).split(path.sep).join("/")}\n`);
}

const main = defineScript({
  name: "generate-scripts-readme",
  run: async ({ argv }) => runGenerateScriptsReadme(argv),
});

runScriptMain(main);
