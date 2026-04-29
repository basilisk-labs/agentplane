import { describe, expect, it } from "vitest";

import {
  PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
  validatePromptModuleMutationSet,
  type PromptModuleMutation,
  type PromptModuleMutationSet,
} from "./index.js";

const recipeSource = {
  owner: {
    kind: "recipe",
    recipe_id: "tdd",
    version: "1.0.0",
  },
  provenance: {
    source_kind: "recipe_asset",
    source_ref: ".agentplane/recipes/tdd/prompt-modules.json",
    recipe_id: "tdd",
    recipe_version: "1.0.0",
  },
} as const;

describe("prompt module mutation contracts", () => {
  it("models structured patch operations against explicit module selectors", () => {
    const mutation = {
      id: "tdd.patch.gateway-load-rules",
      op: "patch_module",
      source: recipeSource,
      target: {
        address: "framework/gateway/AGENTS.md/load_rules/base",
        fragment_id: "gateway.agents.load_rules.base",
        surface: "gateway",
        target: "AGENTS.md",
        slot: "load_rules",
      },
      patch: {
        merge: {
          mode: "append",
          conflict: "keep_all",
          precedence: 500,
        },
        load: {
          task_tags_any: ["code", "bugfix"],
          recipe_ids: ["tdd"],
        },
      },
      reason: "TDD recipes append coding rules instead of replacing the framework gateway.",
    } satisfies PromptModuleMutation;

    expect(mutation.op).toBe("patch_module");
    expect(mutation.patch).not.toHaveProperty("diff");
    expect(mutation.patch).not.toHaveProperty("raw");
    expect(mutation.target.address).toBe("framework/gateway/AGENTS.md/load_rules/base");
    expect(mutation.target.fragment_id).toBe("gateway.agents.load_rules.base");
    expect(() =>
      validatePromptModuleMutationSet({
        schema_version: 1,
        recipe_id: "tdd",
        mutations: [mutation],
      }),
    ).not.toThrow();
  });

  it("models add, bind, disable, and validator operations in one recipe mutation set", () => {
    const set = {
      schema_version: 1,
      recipe_id: "roadmap",
      mutations: [
        {
          id: "roadmap.add.prd-module",
          op: "add_module",
          source: recipeSource,
          module: {
            schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
            address: {
              value: "recipe.roadmap/policy/.agentplane/policy/body/prd-before-code",
              namespace: "recipe.roadmap",
              surface: "policy",
              target: ".agentplane/policy",
              slot: "body",
              name: "prd-before-code",
            },
            owner: {
              kind: "recipe",
              recipe_id: "roadmap",
              version: "1.0.0",
            },
            title: "PRD before implementation",
            content_kind: "markdown",
            content: "Create or update a PRD before implementation tasks start.\n",
            mutability: "extendable",
            merge: {
              mode: "append",
              conflict: "keep_all",
            },
            provenance: {
              source_kind: "recipe_asset",
              source_ref: ".agentplane/recipes/roadmap/modules/prd.md",
              recipe_id: "roadmap",
              recipe_version: "1.0.0",
            },
          },
        },
        {
          id: "roadmap.bind.prd-module",
          op: "bind_module",
          source: recipeSource,
          binding: {
            id: "roadmap.requires.base-load-rules",
            kind: "requires",
            from: "recipe.roadmap/policy/.agentplane/policy/body/prd-before-code",
            to: "framework/gateway/AGENTS.md/load_rules/base",
            required: true,
          },
        },
        {
          id: "roadmap.disable.docs-only-shortcut",
          op: "disable_module",
          source: recipeSource,
          target: {
            address: "framework/policy/.agentplane/policy/body/docs-only-shortcut",
          },
          when: {
            task_tags_any: ["prd"],
          },
        },
        {
          id: "roadmap.validator.prd-command",
          op: "add_validator",
          source: recipeSource,
          validator: {
            id: "roadmap.prd-command",
            phase: "doctor",
            kind: "required_command",
            command: "agentplane task doc show",
            required: true,
          },
        },
      ],
    } satisfies PromptModuleMutationSet;

    expect(set.mutations.map((mutation) => mutation.op)).toEqual([
      "add_module",
      "bind_module",
      "disable_module",
      "add_validator",
    ]);
  });

  it("validates structured mutation set assets and rejects raw mutation operations", () => {
    expect(() =>
      validatePromptModuleMutationSet({
        schema_version: 1,
        recipe_id: "roadmap",
        mutations: [
          {
            id: "roadmap.raw",
            op: "raw_patch",
            source: recipeSource,
          },
        ],
      }),
    ).toThrow("prompt module mutation set.mutations[0].op");
  });
});
