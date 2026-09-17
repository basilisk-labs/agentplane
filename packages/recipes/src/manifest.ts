import { readFile } from "node:fs/promises";

import { invalidFieldMessage, isRecord } from "./internal-utils.js";
import {
  normalizeNumber,
  normalizeOptionalString,
  normalizeOptionalStringList,
  normalizeRequiredString,
  normalizeStringList,
} from "./manifest-primitives.js";
import {
  normalizeAgentId,
  normalizePromptModuleId,
  normalizePromptMutationSetId,
  normalizeRecipeId,
  normalizeRecipeRelativePath,
  normalizeRecipeTags,
  normalizeScenarioId,
  normalizeSkillId,
  normalizeToolId,
} from "./normalize.js";
import type {
  OverlayPromptFragment,
  OverlayStrength,
  OverlaySurface,
  OverlayValidator,
  OverlayWhen,
  ProjectOverlayManifestV2,
  RecipeAgentDefinition,
  RecipeCompatibility,
  RecipeManifest,
  RecipePromptModuleDefinition,
  RecipePromptMutationSetDefinition,
  RecipeRunProfile,
  RecipeScenarioDescriptor,
  RecipeSkillDefinition,
  RecipeToolDefinition,
} from "./types.js";

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
    writes_artifacts_to: normalizeOptionalStringList(
      raw.writes_artifacts_to,
      `${field}.writes_artifacts_to`,
    ),
  };
}

function normalizeSkills(raw: unknown): RecipeSkillDefinition[] | undefined {
  if (raw === undefined) return undefined;
  if (!Array.isArray(raw)) throw new Error(invalidFieldMessage("manifest.skills", "array"));
  return raw.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(invalidFieldMessage(`manifest.skills[${index}]`, "object"));
    }
    return {
      id: normalizeSkillId(normalizeRequiredString(entry.id, `manifest.skills[${index}].id`)),
      summary: normalizeRequiredString(entry.summary, `manifest.skills[${index}].summary`),
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
    if (!isRecord(entry)) {
      throw new Error(invalidFieldMessage(`manifest.tools[${index}]`, "object"));
    }
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
    if (!isRecord(entry)) {
      throw new Error(invalidFieldMessage(`manifest.agents[${index}]`, "object"));
    }
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

function normalizeLegacyStringList(raw: unknown, field: string, fallback: string[]): string[] {
  return raw === undefined ? fallback : normalizeStringList(raw, field);
}

function normalizeLegacyRunProfile(raw: unknown, field: string): RecipeRunProfile {
  return raw === undefined ? { mode: "analysis" } : normalizeRunProfile(raw, field);
}

function normalizeLegacyScenarioFile(raw: unknown, field: string, scenarioId: string): string {
  const value =
    raw === undefined ? `scenarios/${scenarioId}.json` : normalizeRequiredString(raw, field);
  return normalizeRecipeRelativePath(field, value);
}

function normalizeScenarios(
  raw: unknown,
  opts?: { legacyScenarioDefaults?: boolean },
): RecipeScenarioDescriptor[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error(invalidFieldMessage("manifest.scenarios", "non-empty array"));
  }
  const legacyDefaults = opts?.legacyScenarioDefaults === true;
  return raw.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(invalidFieldMessage(`manifest.scenarios[${index}]`, "object"));
    }
    const id = normalizeScenarioId(
      normalizeRequiredString(entry.id, `manifest.scenarios[${index}].id`),
    );
    const summary = normalizeRequiredString(entry.summary, `manifest.scenarios[${index}].summary`);
    return {
      id,
      name: normalizeOptionalString(entry.name, `manifest.scenarios[${index}].name`) ?? summary,
      summary,
      description: normalizeOptionalString(
        entry.description,
        `manifest.scenarios[${index}].description`,
      ),
      use_when: legacyDefaults
        ? normalizeLegacyStringList(entry.use_when, `manifest.scenarios[${index}].use_when`, [
            summary,
          ])
        : normalizeStringList(entry.use_when, `manifest.scenarios[${index}].use_when`, {
            minLength: 1,
          }),
      avoid_when: normalizeOptionalStringList(
        entry.avoid_when,
        `manifest.scenarios[${index}].avoid_when`,
      ),
      required_inputs: legacyDefaults
        ? normalizeLegacyStringList(
            entry.required_inputs,
            `manifest.scenarios[${index}].required_inputs`,
            [],
          )
        : normalizeStringList(
            entry.required_inputs,
            `manifest.scenarios[${index}].required_inputs`,
          ),
      outputs: legacyDefaults
        ? normalizeLegacyStringList(entry.outputs, `manifest.scenarios[${index}].outputs`, [])
        : normalizeStringList(entry.outputs, `manifest.scenarios[${index}].outputs`),
      permissions: normalizeStringList(
        Array.isArray(entry.permissions) ? entry.permissions : [],
        `manifest.scenarios[${index}].permissions`,
      ),
      artifacts: normalizeStringList(
        Array.isArray(entry.artifacts) ? entry.artifacts : [],
        `manifest.scenarios[${index}].artifacts`,
      ),
      agents_involved: legacyDefaults
        ? normalizeLegacyStringList(
            entry.agents_involved,
            `manifest.scenarios[${index}].agents_involved`,
            [],
          )
        : normalizeStringList(
            entry.agents_involved,
            `manifest.scenarios[${index}].agents_involved`,
            {
              minLength: 1,
            },
          ),
      skills_used: normalizeStringList(
        Array.isArray(entry.skills_used) ? entry.skills_used : [],
        `manifest.scenarios[${index}].skills_used`,
      ),
      tools_used: normalizeStringList(
        Array.isArray(entry.tools_used) ? entry.tools_used : [],
        `manifest.scenarios[${index}].tools_used`,
      ),
      run_profile: legacyDefaults
        ? normalizeLegacyRunProfile(entry.run_profile, `manifest.scenarios[${index}].run_profile`)
        : normalizeRunProfile(entry.run_profile, `manifest.scenarios[${index}].run_profile`),
      file: legacyDefaults
        ? normalizeLegacyScenarioFile(entry.file, `manifest.scenarios[${index}].file`, id)
        : normalizeRecipeRelativePath(
            `manifest.scenarios[${index}].file`,
            normalizeRequiredString(entry.file, `manifest.scenarios[${index}].file`),
          ),
    };
  });
}

function normalizeOverlaySurface(raw: unknown, field: string): OverlaySurface {
  const surface = normalizeRequiredString(raw, field);
  if (
    surface !== "planning" &&
    surface !== "execution" &&
    surface !== "coding" &&
    surface !== "debugging" &&
    surface !== "review" &&
    surface !== "verification" &&
    surface !== "docs" &&
    surface !== "finish"
  ) {
    throw new Error(invalidFieldMessage(field, "valid overlay surface"));
  }
  return surface;
}

function normalizeOverlayStrength(raw: unknown, field: string): OverlayStrength | undefined {
  if (raw === undefined) return undefined;
  const strength = normalizeRequiredString(raw, field);
  if (strength !== "required" && strength !== "default" && strength !== "advisory") {
    throw new Error(invalidFieldMessage(field, '"required" | "default" | "advisory"'));
  }
  return strength;
}

function normalizeOverlayWhen(raw: unknown, field: string): OverlayWhen | undefined {
  if (raw === undefined) return undefined;
  if (!isRecord(raw)) throw new Error(invalidFieldMessage(field, "object"));
  return {
    task_kinds: normalizeOptionalStringList(raw.task_kinds, `${field}.task_kinds`) as
      | OverlayWhen["task_kinds"]
      | undefined,
    commands: normalizeOptionalStringList(raw.commands, `${field}.commands`),
    tags_any: normalizeOptionalStringList(raw.tags_any, `${field}.tags_any`),
    repo_types: normalizeOptionalStringList(raw.repo_types, `${field}.repo_types`),
  };
}

function normalizePrompts(raw: unknown): OverlayPromptFragment[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error(invalidFieldMessage("manifest.prompts", "non-empty array"));
  }
  return raw.map((entry, index) => {
    if (!isRecord(entry))
      throw new Error(invalidFieldMessage(`manifest.prompts[${index}]`, "object"));
    return {
      id: normalizeRequiredString(entry.id, `manifest.prompts[${index}].id`),
      surface: normalizeOverlaySurface(entry.surface, `manifest.prompts[${index}].surface`),
      strength: normalizeOverlayStrength(entry.strength, `manifest.prompts[${index}].strength`),
      file: normalizeRecipeRelativePath(
        `manifest.prompts[${index}].file`,
        normalizeRequiredString(entry.file, `manifest.prompts[${index}].file`),
      ),
      order: normalizeNumber(entry.order, `manifest.prompts[${index}].order`),
      when: normalizeOverlayWhen(entry.when, `manifest.prompts[${index}].when`),
    };
  });
}

function normalizeOptionalPrompts(raw: unknown): OverlayPromptFragment[] | undefined {
  if (raw === undefined) return undefined;
  return normalizePrompts(raw);
}

function normalizePromptModuleDefinitions(
  raw: unknown,
): RecipePromptModuleDefinition[] | undefined {
  if (raw === undefined) return undefined;
  if (!Array.isArray(raw)) {
    throw new Error(invalidFieldMessage("manifest.prompt_modules", "array"));
  }
  if (raw.length === 0) {
    throw new Error(invalidFieldMessage("manifest.prompt_modules", "non-empty array"));
  }
  return raw.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(invalidFieldMessage(`manifest.prompt_modules[${index}]`, "object"));
    }
    return {
      id: normalizePromptModuleId(
        normalizeRequiredString(entry.id, `manifest.prompt_modules[${index}].id`),
      ),
      summary: normalizeRequiredString(entry.summary, `manifest.prompt_modules[${index}].summary`),
      file: normalizeRecipeRelativePath(
        `manifest.prompt_modules[${index}].file`,
        normalizeRequiredString(entry.file, `manifest.prompt_modules[${index}].file`),
      ),
    };
  });
}

function normalizePromptMutationSetDefinitions(
  raw: unknown,
): RecipePromptMutationSetDefinition[] | undefined {
  if (raw === undefined) return undefined;
  if (!Array.isArray(raw)) {
    throw new Error(invalidFieldMessage("manifest.prompt_mutation_sets", "array"));
  }
  if (raw.length === 0) {
    throw new Error(invalidFieldMessage("manifest.prompt_mutation_sets", "non-empty array"));
  }
  return raw.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(invalidFieldMessage(`manifest.prompt_mutation_sets[${index}]`, "object"));
    }
    return {
      id: normalizePromptMutationSetId(
        normalizeRequiredString(entry.id, `manifest.prompt_mutation_sets[${index}].id`),
      ),
      summary: normalizeRequiredString(
        entry.summary,
        `manifest.prompt_mutation_sets[${index}].summary`,
      ),
      file: normalizeRecipeRelativePath(
        `manifest.prompt_mutation_sets[${index}].file`,
        normalizeRequiredString(entry.file, `manifest.prompt_mutation_sets[${index}].file`),
      ),
    };
  });
}

function normalizeOptionalScenarios(
  raw: unknown,
  opts?: { legacyScenarioDefaults?: boolean },
): RecipeScenarioDescriptor[] | undefined {
  if (raw === undefined) return undefined;
  return normalizeScenarios(raw, opts);
}

function normalizeValidators(raw: unknown): OverlayValidator[] | undefined {
  if (raw === undefined) return undefined;
  if (!Array.isArray(raw)) throw new Error(invalidFieldMessage("manifest.validators", "array"));
  return raw.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(invalidFieldMessage(`manifest.validators[${index}]`, "object"));
    }
    const id = normalizeRequiredString(entry.id, `manifest.validators[${index}].id`);
    const phase = normalizeRequiredString(entry.phase, `manifest.validators[${index}].phase`);
    const kind = normalizeRequiredString(entry.kind, `manifest.validators[${index}].kind`);
    const when = normalizeOverlayWhen(entry.when, `manifest.validators[${index}].when`);
    if (kind === "required_evidence") {
      return {
        id,
        phase: phase as "coding" | "verification" | "review" | "finish" | "debugging",
        kind,
        required: true,
        evidence: normalizeStringList(entry.evidence, `manifest.validators[${index}].evidence`, {
          minLength: 1,
        }),
        when,
      };
    }
    if (kind === "required_command") {
      return {
        id,
        phase: phase as "verification" | "finish" | "docs",
        kind,
        command: normalizeRequiredString(entry.command, `manifest.validators[${index}].command`),
        required: entry.required !== false,
        when,
      };
    }
    if (kind === "check_script") {
      const runtime = normalizeRequiredString(
        entry.runtime,
        `manifest.validators[${index}].runtime`,
      );
      if (runtime !== "bash" && runtime !== "node") {
        throw new Error(
          invalidFieldMessage(`manifest.validators[${index}].runtime`, '"bash" | "node"'),
        );
      }
      return {
        id,
        phase: phase as "verification" | "docs",
        kind,
        runtime,
        entrypoint: normalizeRecipeRelativePath(
          `manifest.validators[${index}].entrypoint`,
          normalizeRequiredString(entry.entrypoint, `manifest.validators[${index}].entrypoint`),
        ),
        required: entry.required !== false,
        when,
      };
    }
    throw new Error(
      invalidFieldMessage(`manifest.validators[${index}].kind`, "known validator kind"),
    );
  });
}

function normalizeTemplates(raw: unknown): Record<string, string> | undefined {
  if (raw === undefined) return undefined;
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("manifest.templates", "object"));
  const entries = Object.entries(raw).map(([key, value]) => [key.trim(), value] as const);
  const normalized: Record<string, string> = {};
  for (const [key, value] of entries) {
    if (!key) throw new Error(invalidFieldMessage("manifest.templates", "non-empty keys"));
    normalized[key] = normalizeRequiredString(value, `manifest.templates.${key}`);
  }
  return normalized;
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

function normalizeProjectOverlay(raw: Record<string, unknown>): ProjectOverlayManifestV2 {
  const id = normalizeRecipeId(normalizeRequiredString(raw.id, "manifest.id"));
  const version = normalizeRequiredString(raw.version, "manifest.version");
  const name = normalizeRequiredString(raw.name, "manifest.name");
  const summary = normalizeRequiredString(raw.summary, "manifest.summary");
  const description = normalizeOptionalString(raw.description, "manifest.description");
  const prompts = normalizeOptionalPrompts(raw.prompts);
  const validators = normalizeValidators(raw.validators);
  const skills = normalizeSkills(raw.skills);
  const agents = normalizeAgents(raw.agents);
  const tools = normalizeTools(raw.tools);
  const scenarios = normalizeOptionalScenarios(raw.scenarios, {
    legacyScenarioDefaults: raw.schema_version === "1",
  });
  const prompt_modules = normalizePromptModuleDefinitions(raw.prompt_modules);
  const prompt_mutation_sets = normalizePromptMutationSetDefinitions(raw.prompt_mutation_sets);
  const tags = normalizeRecipeTags(raw.tags);
  if (
    !prompts?.length &&
    !scenarios?.length &&
    !prompt_modules?.length &&
    !prompt_mutation_sets?.length
  ) {
    throw new Error(
      invalidFieldMessage(
        "manifest",
        "prompts, scenarios, prompt_modules, or prompt_mutation_sets",
      ),
    );
  }
  if (prompts) assertUniqueIds("manifest.prompts", prompts);
  if (prompt_modules) assertUniqueIds("manifest.prompt_modules", prompt_modules);
  if (prompt_mutation_sets) {
    assertUniqueIds("manifest.prompt_mutation_sets", prompt_mutation_sets);
  }
  if (skills) assertUniqueIds("manifest.skills", skills);
  if (validators) assertUniqueIds("manifest.validators", validators);
  if (agents) assertUniqueIds("manifest.agents", agents);
  if (tools) assertUniqueIds("manifest.tools", tools);
  if (scenarios) assertUniqueIds("manifest.scenarios", scenarios);

  const skillIds = new Set((skills ?? []).map((skill) => skill.id));
  const toolIds = new Set((tools ?? []).map((tool) => tool.id));
  const agentIds = new Set((agents ?? []).map((agent) => agent.id));

  for (const [index, agent] of (agents ?? []).entries()) {
    assertKnownReferences(`manifest.agents[${index}].skills`, agent.skills, skillIds);
    assertKnownReferences(`manifest.agents[${index}].tools`, agent.tools, toolIds);
  }
  for (const [index, scenario] of (scenarios ?? []).entries()) {
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
    schema_version:
      raw.schema_version === "1" || raw.schema_version === "2" ? raw.schema_version : "2",
    kind: "project_overlay",
    id,
    version,
    name,
    summary,
    description,
    tags: tags.length > 0 ? tags : undefined,
    compatibility: normalizeCompatibility(raw.compatibility),
    requires: normalizeOptionalStringList(raw.requires, "manifest.requires"),
    conflicts: Array.isArray(raw.conflicts)
      ? raw.conflicts.map((entry, index) => {
          if (!isRecord(entry)) {
            throw new Error(invalidFieldMessage(`manifest.conflicts[${index}]`, "object"));
          }
          return {
            recipe_id: normalizeRecipeId(
              normalizeRequiredString(entry.recipe_id, `manifest.conflicts[${index}].recipe_id`),
            ),
            reason: normalizeRequiredString(entry.reason, `manifest.conflicts[${index}].reason`),
          };
        })
      : undefined,
    prompts,
    validators,
    templates: normalizeTemplates(raw.templates),
    skills,
    agents,
    tools,
    scenarios,
    prompt_modules,
    prompt_mutation_sets,
  };
}

export function validateRecipeManifest(raw: unknown): RecipeManifest {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("manifest", "object"));
  const schemaVersion =
    raw.schema_version === "1" || raw.schema_version === "2" ? raw.schema_version : null;
  if (!schemaVersion) {
    throw new Error(invalidFieldMessage("manifest.schema_version", '"1" | "2"'));
  }
  const kind =
    raw.kind === undefined && schemaVersion === "1"
      ? "project_overlay"
      : normalizeRequiredString(raw.kind, "manifest.kind");
  if (kind !== "project_overlay") {
    throw new Error(invalidFieldMessage("manifest.kind", '"project_overlay"'));
  }
  return normalizeProjectOverlay(raw);
}

export async function readRecipeManifest(manifestPath: string): Promise<RecipeManifest> {
  const raw = JSON.parse(await readFile(manifestPath, "utf8")) as unknown;
  return validateRecipeManifest(raw);
}
