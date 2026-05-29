import path from "node:path";
import { readFile } from "node:fs/promises";

import { writeTextIfChanged } from "../../../../shared/write-if-changed.js";

type EnvTemplateEntry = {
  key: string;
  value: string;
  comment: string;
  required: boolean;
};

const CLOUD_ENV_TEMPLATE: EnvTemplateEntry[] = [
  {
    key: "AGENTPLANE_CLOUD_ENDPOINT",
    value: "https://agentplane-cloud.example",
    comment: "Cloud sync service base URL.",
    required: true,
  },
  {
    key: "AGENTPLANE_CLOUD_TOKEN",
    value: "replace-me",
    comment: "Cloud sync service access token.",
    required: true,
  },
  {
    key: "AGENTPLANE_CLOUD_PROJECT_ID",
    value: "replace-me",
    comment: "Cloud sync service project identifier.",
    required: true,
  },
  {
    key: "AGENTPLANE_CLOUD_PROVIDER",
    value: "",
    comment: "Optional remote projection provider selected in the cloud service.",
    required: false,
  },
];

async function readTextIfExists(filePath: string): Promise<string | null> {
  try {
    return await readFile(filePath, "utf8");
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

function collectDefinedEnvKeys(dotEnvText: string): Set<string> {
  const keys = new Set<string>();
  for (const line of dotEnvText.split(/\r?\n/u)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = /^([A-Za-z_][A-Za-z0-9_]*)\s*=/u.exec(trimmed);
    if (match?.[1]) keys.add(match[1]);
  }
  return keys;
}

function buildTemplateBlock(opts: {
  existing: string;
  entries: EnvTemplateEntry[];
  heading: string;
}): string {
  const { existing, entries, heading } = opts;
  const definedKeys = collectDefinedEnvKeys(existing);
  const missing = entries.filter((entry) => !definedKeys.has(entry.key));
  if (missing.length === 0) return existing;

  const required = missing.filter((item) => item.required);
  const optional = missing.filter((item) => !item.required);

  const requiredLines = required.flatMap((entry) => [
    `# ${entry.comment}`,
    `${entry.key}=${entry.value}`,
  ]);
  const optionalLines =
    optional.length === 0
      ? []
      : [
          "",
          "# Optional values:",
          ...optional.flatMap((entry) => [`# ${entry.comment}`, `${entry.key}=${entry.value}`]),
        ];
  const lines = [
    `# agentplane: ${heading}`,
    "# Required values:",
    ...requiredLines,
    ...optionalLines,
  ];

  const block = `${lines.join("\n")}\n`;
  const prefix =
    existing.length > 0 && !existing.endsWith("\n") ? "\n\n" : existing.length > 0 ? "\n" : "";
  return `${existing}${prefix}${block}`;
}

export async function ensureInitCloudEnvTemplate(opts: { gitRoot: string }): Promise<void> {
  const dotEnvExamplePath = path.join(opts.gitRoot, ".env.example");
  const existingExample = (await readTextIfExists(dotEnvExamplePath)) ?? "";
  const nextExample = buildTemplateBlock({
    existing: existingExample,
    entries: CLOUD_ENV_TEMPLATE,
    heading: "cloud backend configuration",
  });
  await writeTextIfChanged(dotEnvExamplePath, nextExample);

  const dotEnvPath = path.join(opts.gitRoot, ".env");
  const existingEnv = await readTextIfExists(dotEnvPath);
  if (existingEnv !== null) return;
  await writeTextIfChanged(dotEnvPath, nextExample);
}
