import { readFile } from "node:fs/promises";

import { invalidFieldMessage, requiredFieldMessage } from "../../../cli/output.js";
import { isRecord } from "../../../shared/guards.js";
import { dedupeStrings } from "../../../shared/strings.js";

import {
  normalizeAgentId,
  normalizeRecipeId,
  normalizeRecipeRelativePath,
  normalizeRecipeTags,
  normalizeScenarioId,
  normalizeSkillId,
  normalizeToolId,
} from "./normalize.js";
import type {
  RecipeAgentDefinition,
  RecipeCompatibility,
  RecipeManifest,
  RecipeRunProfile,
  RecipeScenarioDescriptor,
  RecipeSkillDefinition,
  RecipeToolDefinition,
} from "./types.js";

function normalizeRequiredString(raw: unknown, field: string): string {
  if (typeof raw !== "string") throw new Error(invalidFieldMessage(field, "string"));
  const value = raw.trim();
  if (!value) throw new Error(requiredFieldMessage(field));
  return value;
}

function normalizeOptionalString(raw: unknown, field: string): string | undefined {
  if (raw === undefined) return undefined;
  if (typeof raw !== "string") throw new Error(invalidFieldMessage(field, "string"));
  const value = raw.trim();
  return value || undefined;
}

function normalizeStringList(raw: unknown, field: string, opts?: { minLength?: number }): string[] {
  if (!Array.isArray(raw)) throw new Error(invalidFieldMessage(field, "string[]"));
  const values = raw.map((value) => {
    if (typeof value !== "string") throw new Error(invalidFieldMessage(field, "string[]"));
    const trimmed = value.trim();
    if (!trimmed) throw new Error(invalidFieldMessage(field, "string[]"));
    return trimmed;
  });
  const deduped = dedupeStrings(values);
  if ((opts?.minLength ?? 0) > 0 && deduped.length < (opts?.minLength ?? 0)) {
    throw new Error(invalidFieldMessage(field, `string[${opts?.minLength ?? 0}+]`));
  }
  return deduped;
}

function normalizeOptionalStringList(raw: unknown, field: string): string[] | undefined {
  if (raw === undefined) return undefined;
  return normalizeStringList(raw, field);
}

function normalizeBoolean(raw: unknown, field: string): boolean | undefined {
  if (raw === undefined) return undefined;
  if (typeof raw !== "boolean") throw new Error(invalidFieldMessage(field, "boolean"));
  return raw;
}

function normalizeNumber(raw: unknown, field: string): number | undefined {
  if (raw === undefined) return undefined;
  if (typeof raw !== "number" || Number.isNaN(raw)) {
    throw new Error(invalidFieldMessage(field, "number"));
  }
  return raw;
}

function normalizeCompatibility(raw: unknown): RecipeCompatibility | undefined {
  if (raw === undefined) return undefined;
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("manifest.compatibility", "object"));
  return {
    min_agentplane_version: normalizeOptionalString(
      raw.min_agentplane_version,
      "manifest.compatibility.min_agentplane_version",
    ),
    manifest_api_version: normalizeOptionalString(
      raw.manifest_api_version,
      "manifest.compatibility.manifest_api_version",
    ),
    scenario_api_version: normalizeOptionalString(
      raw.scenario_api_version,
      "manifest.compatibility.scenario_api_version",
    ),
    runtime_api_version: normalizeOptionalString(
      raw.runtime_api_version,
      "manifest.compatibility.runtime_api_version",
    ),
    platforms: normalizeOptionalStringList(raw.platforms, "manifest.compatibility.platforms"),
    repo_types: normalizeOptionalStringList(raw.repo_types, "manifest.compatibility.repo_types"),
  };
}

function normalizeRunProfile(raw: unknown, field: string): RecipeRunProfile {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage(field, "object"));
  return {
    mode: normalizeRequiredString(raw.mode, `${field}.mode`),
    sandbox: normalizeOptionalString(raw.sandbox, `${field}.sandbox`),
    network: normalizeBoolean(raw.network, `${field}.network`),
    requires_human_approval: normalizeBoolean(
      raw.requires_human_approval,
      `${field}.requires_human_approval`,
    ),
    writes_artifacts_to: normalizeOptionalStringList(
      raw.writes_artifacts_to,
      `${field}.writes_artifacts_to`,
    ),
    expected_exit_contract: normalizeOptionalString(
      raw.expected_exit_contract,
      `${field}.expected_exit_contract`,
    ),
  };
}

function normalizeSkills(raw: unknown): RecipeSkillDefinition[] | undefined {
  if (raw === undefined) return undefined;
  if (!Array.isArray(raw)) throw new Error(invalidFieldMessage("manifest.skills", "array"));
  return raw.map((entry, index) => {
    if (!isRecord(entry))
      throw new Error(invalidFieldMessage(`manifest.skills[${index}]`, "object"));
    return {
      id: normalizeSkillId(normalizeRequiredString(entry.id, `manifest.skills[${index}].id`)),
      summary: normalizeRequiredString(entry.summary, `manifest.skills[${index}].summary`),
      kind: normalizeRequiredString(entry.kind, `manifest.skills[${index}].kind`),
      file: normalizeRecipeRelativePath(
        `manifest.skills[${index}].file`,
        normalizeRequiredString(entry.file, `manifest.skills[${index}].file`),
      ),
    };
  });
}

function normalizeTools(raw: unknown): RecipeToolDefinition[] | undefined {
  if (raw === undefined) return undefined;
  if (!Array.isArray(raw)) throw new Error(invalidFieldMessage("manifest.tools", "array"));
  return raw.map((entry, index) => {
    if (!isRecord(entry))
      throw new Error(invalidFieldMessage(`manifest.tools[${index}]`, "object"));
    const runtime = normalizeRequiredString(entry.runtime, `manifest.tools[${index}].runtime`);
    if (runtime !== "node" && runtime !== "bash") {
      throw new Error(invalidFieldMessage(`manifest.tools[${index}].runtime`, '"node" | "bash"'));
    }
    return {
      id: normalizeToolId(normalizeRequiredString(entry.id, `manifest.tools[${index}].id`)),
      summary: normalizeRequiredString(entry.summary, `manifest.tools[${index}].summary`),
      runtime,
      entrypoint: normalizeRecipeRelativePath(
        `manifest.tools[${index}].entrypoint`,
        normalizeRequiredString(entry.entrypoint, `manifest.tools[${index}].entrypoint`),
      ),
      permissions: normalizeOptionalStringList(
        entry.permissions,
        `manifest.tools[${index}].permissions`,
      ),
      timeout_ms: normalizeNumber(entry.timeout_ms, `manifest.tools[${index}].timeout_ms`),
      cwd_policy: normalizeOptionalString(entry.cwd_policy, `manifest.tools[${index}].cwd_policy`),
    };
  });
}

function normalizeAgents(raw: unknown): RecipeAgentDefinition[] | undefined {
  if (raw === undefined) return undefined;
  if (!Array.isArray(raw)) throw new Error(invalidFieldMessage("manifest.agents", "array"));
  return raw.map((entry, index) => {
    if (!isRecord(entry))
      throw new Error(invalidFieldMessage(`manifest.agents[${index}]`, "object"));
    return {
      id: normalizeAgentId(normalizeRequiredString(entry.id, `manifest.agents[${index}].id`)),
      display_name: normalizeRequiredString(
        entry.display_name,
        `manifest.agents[${index}].display_name`,
      ),
      role: normalizeRequiredString(entry.role, `manifest.agents[${index}].role`),
      summary: normalizeRequiredString(entry.summary, `manifest.agents[${index}].summary`),
      skills: normalizeOptionalStringList(entry.skills, `manifest.agents[${index}].skills`),
      tools: normalizeOptionalStringList(entry.tools, `manifest.agents[${index}].tools`),
      file: normalizeRecipeRelativePath(
        `manifest.agents[${index}].file`,
        normalizeRequiredString(entry.file, `manifest.agents[${index}].file`),
      ),
    };
  });
}

function normalizeScenarios(raw: unknown): RecipeScenarioDescriptor[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error(invalidFieldMessage("manifest.scenarios", "non-empty array"));
  }
  return raw.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(invalidFieldMessage(`manifest.scenarios[${index}]`, "object"));
    }
    return {
      id: normalizeScenarioId(normalizeRequiredString(entry.id, `manifest.scenarios[${index}].id`)),
      name: normalizeRequiredString(entry.name, `manifest.scenarios[${index}].name`),
      summary: normalizeRequiredString(entry.summary, `manifest.scenarios[${index}].summary`),
      description: normalizeOptionalString(
        entry.description,
        `manifest.scenarios[${index}].description`,
      ),
      use_when: normalizeStringList(entry.use_when, `manifest.scenarios[${index}].use_when`, {
        minLength: 1,
      }),
      avoid_when: normalizeOptionalStringList(
        entry.avoid_when,
        `manifest.scenarios[${index}].avoid_when`,
      ),
      required_inputs: normalizeStringList(
        entry.required_inputs,
        `manifest.scenarios[${index}].required_inputs`,
      ),
      outputs: normalizeStringList(entry.outputs, `manifest.scenarios[${index}].outputs`),
      permissions: normalizeStringList(
        Array.isArray(entry.permissions) ? entry.permissions : [],
        `manifest.scenarios[${index}].permissions`,
      ),
      artifacts: normalizeStringList(
        Array.isArray(entry.artifacts) ? entry.artifacts : [],
        `manifest.scenarios[${index}].artifacts`,
      ),
      agents_involved: normalizeStringList(
        entry.agents_involved,
        `manifest.scenarios[${index}].agents_involved`,
        { minLength: 1 },
      ),
      skills_used: normalizeStringList(
        Array.isArray(entry.skills_used) ? entry.skills_used : [],
        `manifest.scenarios[${index}].skills_used`,
      ),
      tools_used: normalizeStringList(
        Array.isArray(entry.tools_used) ? entry.tools_used : [],
        `manifest.scenarios[${index}].tools_used`,
      ),
      run_profile: normalizeRunProfile(
        entry.run_profile,
        `manifest.scenarios[${index}].run_profile`,
      ),
      file: normalizeRecipeRelativePath(
        `manifest.scenarios[${index}].file`,
        normalizeRequiredString(entry.file, `manifest.scenarios[${index}].file`),
      ),
    };
  });
}

function assertUniqueIds(field: string, items: { id: string }[]): void {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) {
      throw new Error(invalidFieldMessage(field, `unique ids (duplicate: ${item.id})`));
    }
    seen.add(item.id);
  }
}

function assertKnownReferences(
  field: string,
  refs: string[] | undefined,
  known: Set<string>,
): void {
  if (!refs || refs.length === 0) return;
  const missing = refs.filter((ref) => !known.has(ref));
  if (missing.length > 0) {
    throw new Error(invalidFieldMessage(field, `known ids (missing: ${missing.join(", ")})`));
  }
}

export function validateRecipeManifest(raw: unknown): RecipeManifest {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("manifest", "object"));
  if (raw.schema_version !== "1")
    throw new Error(invalidFieldMessage("manifest.schema_version", '"1"'));
  const id = normalizeRecipeId(normalizeRequiredString(raw.id, "manifest.id"));
  const version = normalizeRequiredString(raw.version, "manifest.version");
  const tags = normalizeRecipeTags(raw.tags);
  const compatibility = normalizeCompatibility(raw.compatibility);
  const skills = normalizeSkills(raw.skills);
  const tools = normalizeTools(raw.tools);
  const agents = normalizeAgents(raw.agents);
  const scenarios = normalizeScenarios(raw.scenarios);

  if (skills) assertUniqueIds("manifest.skills", skills);
  if (tools) assertUniqueIds("manifest.tools", tools);
  if (agents) assertUniqueIds("manifest.agents", agents);
  assertUniqueIds("manifest.scenarios", scenarios);

  const skillIds = new Set((skills ?? []).map((skill) => skill.id));
  const toolIds = new Set((tools ?? []).map((tool) => tool.id));
  const agentIds = new Set((agents ?? []).map((agent) => agent.id));

  for (const [index, agent] of (agents ?? []).entries()) {
    assertKnownReferences(`manifest.agents[${index}].skills`, agent.skills, skillIds);
    assertKnownReferences(`manifest.agents[${index}].tools`, agent.tools, toolIds);
  }
  for (const [index, scenario] of scenarios.entries()) {
    assertKnownReferences(
      `manifest.scenarios[${index}].agents_involved`,
      scenario.agents_involved,
      agentIds,
    );
    assertKnownReferences(
      `manifest.scenarios[${index}].skills_used`,
      scenario.skills_used,
      skillIds,
    );
    assertKnownReferences(`manifest.scenarios[${index}].tools_used`, scenario.tools_used, toolIds);
  }

  return {
    schema_version: "1",
    id,
    version,
    name: normalizeRequiredString(raw.name, "manifest.name"),
    summary: normalizeRequiredString(raw.summary, "manifest.summary"),
    description: normalizeRequiredString(raw.description, "manifest.description"),
    tags: tags.length > 0 ? tags : undefined,
    compatibility,
    skills,
    agents,
    tools,
    scenarios,
  };
}

export async function readRecipeManifest(manifestPath: string): Promise<RecipeManifest> {
  const raw = JSON.parse(await readFile(manifestPath, "utf8")) as unknown;
  return validateRecipeManifest(raw);
}
