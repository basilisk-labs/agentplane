import path from "node:path";
import { readFile } from "node:fs/promises";

import { writeTextIfChanged } from "../../../../shared/write-if-changed.js";

type EnvTemplateEntry = {
  key: string;
  value: string;
  comment: string;
  required: boolean;
};

const REDMINE_ENV_TEMPLATE: EnvTemplateEntry[] = [
  {
    key: "AGENTPLANE_REDMINE_URL",
    value: "https://redmine.example",
    comment: "Redmine base URL.",
    required: true,
  },
  {
    key: "AGENTPLANE_REDMINE_API_KEY",
    value: "replace-me",
    comment: "Redmine API key.",
    required: true,
  },
  {
    key: "AGENTPLANE_REDMINE_PROJECT_ID",
    value: "replace-me",
    comment: "Project identifier (numeric ID or project slug).",
    required: true,
  },
  {
    key: "AGENTPLANE_REDMINE_OWNER_AGENT",
    value: "REDMINE",
    comment: "Optional default owner agent.",
    required: false,
  },
  {
    key: "AGENTPLANE_REDMINE_ASSIGNEE_ID",
    value: "",
    comment: "Optional assignee numeric ID.",
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

export async function ensureInitRedmineEnvTemplate(opts: { gitRoot: string }): Promise<void> {
  const dotEnvPath = path.join(opts.gitRoot, ".env");
  const existing = (await readTextIfExists(dotEnvPath)) ?? "";
  const definedKeys = collectDefinedEnvKeys(existing);
  const missing = REDMINE_ENV_TEMPLATE.filter((entry) => !definedKeys.has(entry.key));
  if (missing.length === 0) return;

  const lines: string[] = [];
  lines.push("# agentplane: redmine backend configuration");
  lines.push("# Required values:");
  for (const entry of missing.filter((item) => item.required)) {
    lines.push(`# ${entry.comment}`);
    lines.push(`${entry.key}=${entry.value}`);
  }
  const optional = missing.filter((item) => !item.required);
  if (optional.length > 0) {
    lines.push("");
    lines.push("# Optional values:");
    for (const entry of optional) {
      lines.push(`# ${entry.comment}`);
      lines.push(`${entry.key}=${entry.value}`);
    }
  }

  const block = `${lines.join("\n")}\n`;
  const prefix =
    existing.length > 0 && !existing.endsWith("\n") ? "\n\n" : existing.length > 0 ? "\n" : "";
  const next = `${existing}${prefix}${block}`;
  await writeTextIfChanged(dotEnvPath, next);
}
