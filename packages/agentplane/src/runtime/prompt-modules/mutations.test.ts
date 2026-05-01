import { describe, expect, it } from "vitest";

import {
  compilePromptModuleGraph,
  PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
  validatePromptModuleMutationSet,
  type PromptModule,
  type PromptModuleGraph,
  type PromptModuleMutation,
  type PromptModuleMutationSet,
} from "./index.js";

const frameworkOwner = {
  kind: "framework",
  package_name: "agentplane",
  version: "0.4.0",
} satisfies PromptModule["owner"];

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

const roadmapOwner = {
  kind: "recipe",
  recipe_id: "roadmap",
  version: "1.0.0",
} satisfies PromptModule["owner"];

function markdownModule(opts: {
  value: string;
  name: string;
  content: string;
  owner?: PromptModule["owner"];
  load?: PromptModule["load"];
  mutability?: PromptModule["mutability"];
}): PromptModule {
  const owner = opts.owner ?? frameworkOwner;
  return {
    schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
    address: {
      value: opts.value,
      namespace: opts.value.startsWith("recipe.") ? "recipe.roadmap" : "framework",
      surface: "gateway",
      target: "AGENTS.md",
      slot: "load_rules",
      name: opts.name,
    },
    owner,
    title: opts.name,
    content_kind: "markdown",
    content: opts.content,
    mutability: opts.mutability ?? "replaceable",
    merge: {
      mode: "append",
      conflict: "keep_all",
      precedence: owner.kind === "recipe" ? 500 : 100,
    },
    load: opts.load,
    provenance:
      owner.kind === "recipe"
        ? {
            source_kind: "recipe_asset",
            source_ref: `.agentplane/recipes/${owner.recipe_id}/modules/${opts.name}.md`,
            recipe_id: owner.recipe_id,
            recipe_version: owner.version,
          }
        : {
            source_kind: "framework_builtin",
            source_ref: "packages/agentplane/assets/AGENTS.md",
          },
  };
}

function graph(nodes: PromptModule[]): PromptModuleGraph {
  return {
    schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
    nodes: nodes.map((module) => ({ module })),
  };
}

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

  it("applies add, patch, replace, disable, bind, and validator mutations", () => {
    const base = markdownModule({
      value: "framework/gateway/AGENTS.md/load_rules/base",
      name: "base",
      content: "Base\n",
    });
    const deprecated = markdownModule({
      value: "framework/gateway/AGENTS.md/load_rules/deprecated",
      name: "deprecated",
      content: "Deprecated\n",
    });
    const replacement = markdownModule({
      value: "framework/gateway/AGENTS.md/load_rules/replacement",
      name: "replacement",
      content: "Replacement\n",
    });
    const recipe = markdownModule({
      value: "recipe.roadmap/gateway/AGENTS.md/load_rules/prd",
      name: "prd",
      content: "Recipe\n",
      owner: roadmapOwner,
      load: { recipe_ids: ["roadmap"] },
      mutability: "extendable",
    });
    const mutations = {
      schema_version: 1,
      recipe_id: "roadmap",
      mutations: [
        {
          id: "roadmap.patch.base",
          op: "patch_module",
          source: recipeSource,
          target: { address: base.address.value },
          patch: { content: "Base patched\n" },
        },
        {
          id: "roadmap.disable.deprecated",
          op: "disable_module",
          source: recipeSource,
          target: { address: deprecated.address.value },
        },
        {
          id: "roadmap.replace.replacement",
          op: "replace_module",
          source: recipeSource,
          target: { address: replacement.address.value },
          module: {
            ...replacement,
            title: "Replacement patched",
            content: "Replacement patched\n",
          },
        },
        {
          id: "roadmap.add.prd",
          op: "add_module",
          source: recipeSource,
          module: recipe,
        },
        {
          id: "roadmap.bind.prd",
          op: "bind_module",
          source: recipeSource,
          binding: {
            id: "roadmap.prd.requires-base",
            kind: "requires",
            from: recipe.address.value,
            to: base.address.value,
            required: true,
          },
        },
        {
          id: "roadmap.validator.doctor",
          op: "add_validator",
          source: recipeSource,
          validator: {
            id: "roadmap.doctor",
            phase: "doctor",
            kind: "required_command",
            command: "agentplane doctor",
            required: true,
          },
        },
        {
          id: "roadmap.validator.disable-legacy",
          op: "disable_validator",
          source: recipeSource,
          validator_id: "legacy.missing-command",
        },
      ],
    } satisfies PromptModuleMutationSet;

    const result = compilePromptModuleGraph({
      graph: graph([base, deprecated, replacement]),
      mutation_sets: [mutations],
      validators: [
        {
          id: "legacy.missing-command",
          phase: "compile",
          kind: "required_command",
          command: "legacy missing command",
          required: true,
        },
      ],
      context: {
        recipe_ids: ["roadmap"],
        validator_phases: ["compile", "doctor"],
        available_commands: ["agentplane doctor"],
      },
    });

    expect(result.ok).toBe(true);
    expect(result.nodes.map((node) => node.module.address.value)).toEqual([
      base.address.value,
      replacement.address.value,
      recipe.address.value,
    ]);
    expect(result.nodes[0]?.module.content).toBe("Base patched\n");
    expect(result.nodes[1]?.module.content).toBe("Replacement patched\n");
    expect(result.nodes[2]?.module.dependencies).toEqual([
      { address: base.address.value, required: true },
    ]);
    expect(result.bindings.map((binding) => binding.id)).toEqual(["roadmap.prd.requires-base"]);
    expect(result.validators.map((validator) => validator.id)).toEqual(["roadmap.doctor"]);
  });
});
