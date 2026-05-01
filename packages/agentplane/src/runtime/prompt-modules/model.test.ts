import { describe, expect, it } from "vitest";

import {
  PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
  migratePromptModuleSchemaVersion,
  validatePromptModule,
  validatePromptModuleCompiledGraph,
  validatePromptModuleMutationSet,
  type PromptModule,
  type PromptModuleGraph,
} from "./index.js";

function basePromptModule(): PromptModule {
  return {
    schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
    address: {
      value: "framework/gateway/AGENTS.md/load_rules/base",
      namespace: "framework",
      surface: "gateway",
      target: "AGENTS.md",
      slot: "load_rules",
      name: "base",
    },
    owner: {
      kind: "framework",
      package_name: "agentplane",
      version: "0.4.0",
    },
    title: "Gateway load rules",
    content_kind: "markdown",
    content: "## LOAD RULES\n\nRouting is strict.\n",
    mutability: "locked",
    merge: {
      mode: "pick_one",
      conflict: "error",
      precedence: 100,
    },
    load: {
      policy_gateways: ["codex"],
      workflow_modes: ["direct", "branch_pr"],
    },
    provenance: {
      source_kind: "framework_builtin",
      source_ref: "packages/agentplane/assets/AGENTS.md",
    },
  };
}

describe("prompt module domain contracts", () => {
  it("models locked framework gateway modules with stable addressing and provenance", () => {
    const module = basePromptModule();

    expect(module.address.value).toBe("framework/gateway/AGENTS.md/load_rules/base");
    expect(module.mutability).toBe("locked");
    expect(module.provenance.source_kind).toBe("framework_builtin");
  });

  it("keeps v1 prompt module schema migration as a no-op entrypoint", () => {
    const module = basePromptModule();

    expect(migratePromptModuleSchemaVersion(module, "prompt module")).toBe(module);
    expect(validatePromptModule(module)).toEqual(module);
  });

  it("rejects unknown prompt module schema versions before structural validation", () => {
    const module = {
      ...basePromptModule(),
      schema_version: 2,
    };

    expect(() => migratePromptModuleSchemaVersion(module, "prompt module")).toThrow(
      "Invalid field prompt module.schema_version: expected 1",
    );
    expect(() => validatePromptModule(module, "prompt module")).toThrow(
      "Invalid field prompt module.schema_version: expected 1",
    );
    expect(() =>
      validatePromptModuleMutationSet(
        {
          schema_version: 2,
          mutations: [],
        },
        "prompt module mutation set",
      ),
    ).toThrow("Invalid field prompt module mutation set.schema_version: expected 1");
    expect(() =>
      validatePromptModuleCompiledGraph(
        {
          schema_version: 2,
          nodes: [],
          diagnostics: [],
          validators: [],
          bindings: [],
          ok: true,
        },
        "prompt module graph",
      ),
    ).toThrow("Invalid field prompt module graph.schema_version: expected 1");
  });

  it("models recipe-owned modules as extensions to framework-owned modules", () => {
    const graph = {
      schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
      nodes: [
        {
          module: {
            schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
            address: {
              value: "recipe.tdd/gateway/AGENTS.md/load_rules/tdd-routing",
              namespace: "recipe.tdd",
              surface: "gateway",
              target: "AGENTS.md",
              slot: "load_rules",
              name: "tdd-routing",
            },
            owner: {
              kind: "recipe",
              recipe_id: "tdd",
              version: "1.0.0",
            },
            title: "TDD routing extension",
            content_kind: "markdown",
            content: "- IF task changes implementation code THEN require failing test first.\n",
            mutability: "extendable",
            merge: {
              mode: "append",
              conflict: "keep_all",
              precedence: 500,
            },
            load: {
              task_tags_any: ["code", "bugfix", "feature"],
              recipe_ids: ["tdd"],
            },
            dependencies: [
              {
                address: "framework/gateway/AGENTS.md/load_rules/base",
                required: true,
              },
            ],
            provenance: {
              source_kind: "recipe_asset",
              source_ref: ".agentplane/recipes/tdd/prompts/load-rules.md",
              recipe_id: "tdd",
              recipe_version: "1.0.0",
            },
          },
          extends: ["framework/gateway/AGENTS.md/load_rules/base"],
        },
      ],
    } satisfies PromptModuleGraph;

    expect(graph.nodes[0]?.module.owner.kind).toBe("recipe");
    expect(graph.nodes[0]?.extends).toEqual(["framework/gateway/AGENTS.md/load_rules/base"]);
    expect(graph.nodes[0]?.module.merge.mode).toBe("append");
  });
});
