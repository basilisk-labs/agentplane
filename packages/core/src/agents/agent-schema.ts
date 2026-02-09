import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import type { ErrorObject, Options, ValidateFunction } from "ajv";
import AjvModule from "ajv";

export type AgentDefinition = {
  id: string;
  role: string;
  description: string;
  inputs?: string[];
  outputs?: string[];
  permissions: string[];
  workflow: string[];
  allowed_tools?: string[];
  denied_tools?: string[];
  model_preference?: "fast" | "balanced" | "powerful";
};

export type AgentLintResult = {
  errors: string[];
  warnings: string[];
};

const AGENT_SCHEMA_URL = new URL("../../schemas/agent.schema.json", import.meta.url);
const AGENT_SCHEMA = JSON.parse(
  readFileSync(fileURLToPath(AGENT_SCHEMA_URL), "utf8"),
) as Record<string, unknown>;

type AjvInstance = {
  compile: <T>(schema: unknown) => ValidateFunction<T>;
  errorsText: (errors?: ErrorObject[] | null, opts?: { dataVar?: string }) => string;
};

type AjvConstructor = new (opts?: Options) => AjvInstance;

const Ajv =
  (AjvModule as unknown as { default?: AjvConstructor }).default ??
  (AjvModule as unknown as AjvConstructor);

const AJV = new Ajv({
  allErrors: true,
  allowUnionTypes: true,
  strict: false,
});

const validateSchema = AJV.compile<AgentDefinition>(AGENT_SCHEMA);

function formatSchemaErrors(errors: ErrorObject[] | null | undefined): string {
  if (!errors || errors.length === 0) return "agent schema validation failed";
  return AJV.errorsText(errors, { dataVar: "agent" });
}

export function validateAgent(raw: unknown): AgentDefinition {
  const candidate = raw && typeof raw === "object" ? structuredClone(raw) : raw;
  if (!validateSchema(candidate)) {
    throw new Error(formatSchemaErrors(validateSchema.errors));
  }
  return candidate;
}

export function lintAgent(raw: unknown, fileName?: string): AgentLintResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Schema validation
  const candidate = raw && typeof raw === "object" ? structuredClone(raw) : raw;
  if (!validateSchema(candidate)) {
    const msg = formatSchemaErrors(validateSchema.errors);
    errors.push(msg);
    return { errors, warnings };
  }

  const agent = candidate as AgentDefinition;

  // Filename must match id
  if (fileName) {
    const expected = `${agent.id}.json`;
    if (fileName !== expected) {
      errors.push(
        `filename "${fileName}" does not match agent id "${agent.id}" (expected "${expected}")`,
      );
    }
  }

  // Check allowed_tools / denied_tools overlap
  if (agent.allowed_tools && agent.denied_tools) {
    const allowed = new Set(agent.allowed_tools);
    const overlap = agent.denied_tools.filter((t) => allowed.has(t));
    if (overlap.length > 0) {
      errors.push(`allowed_tools and denied_tools overlap: ${overlap.join(", ")}`);
    }
  }

  return { errors, warnings };
}

export async function lintAgentsDir(agentsDir: string): Promise<AgentLintResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  let entries: string[];
  try {
    entries = await readdir(agentsDir);
  } catch {
    errors.push(`cannot read agents directory: ${agentsDir}`);
    return { errors, warnings };
  }

  const jsonFiles = entries.filter((f) => f.endsWith(".json")).sort();
  if (jsonFiles.length === 0) {
    warnings.push("no agent JSON files found");
    return { errors, warnings };
  }

  const seenIds = new Map<string, string>();

  for (const file of jsonFiles) {
    const filePath = path.join(agentsDir, file);
    let raw: unknown;
    try {
      const text = await readFile(filePath, "utf8");
      raw = JSON.parse(text);
    } catch (err) {
      errors.push(`${file}: invalid JSON – ${(err as Error).message}`);
      continue;
    }

    const result = lintAgent(raw, file);
    for (const e of result.errors) errors.push(`${file}: ${e}`);
    for (const w of result.warnings) warnings.push(`${file}: ${w}`);

    // Check duplicate IDs
    if (
      raw &&
      typeof raw === "object" &&
      "id" in raw &&
      typeof (raw as Record<string, unknown>).id === "string"
    ) {
      const id = (raw as Record<string, unknown>).id as string;
      const prev = seenIds.get(id);
      if (prev) {
        errors.push(`duplicate agent id "${id}" in ${prev} and ${file}`);
      } else {
        seenIds.set(id, file);
      }
    }
  }

  return { errors, warnings };
}
