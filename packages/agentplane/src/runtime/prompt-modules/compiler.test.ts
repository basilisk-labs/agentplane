import { describe, expect, it } from "vitest";

import {
  compilePromptModuleGraph,
  PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
  type PromptModule,
  type PromptModuleGraph,
  type PromptModuleMutationSet,
  type PromptModuleOwner,
  type PromptModuleValidator,
} from "./index.js";

const frameworkOwner = {
  kind: "framework",
  package_name: "agentplane",
  version: "0.4.0",
} satisfies PromptModuleOwner;

const recipeOwner = {
  kind: "recipe",
  recipe_id: "roadmap",
  version: "1.0.0",
} satisfies PromptModuleOwner;

const frameworkSource = {
  source_kind: "framework_builtin",
  source_ref: "packages/agentplane/assets/AGENTS.md",
} as const;

const recipeSource = {
  owner: recipeOwner,
  provenance: {
    source_kind: "recipe_asset",
    source_ref: ".agentplane/recipes/roadmap/prompt-modules.json",
    recipe_id: "roadmap",
    recipe_version: "1.0.0",
  },
} as const;

function moduleAddress(value: string, name: string): PromptModule["address"] {
  return {
    value,
    namespace: value.startsWith("recipe.") ? "recipe.roadmap" : "framework",
    surface: "gateway",
    target: "AGENTS.md",
    slot: "load_rules",
    name,
  };
}

function markdownModule(opts: {
  value: string;
  name: string;
  title?: string;
  content: string;
  owner?: PromptModuleOwner;
  load?: PromptModule["load"];
  dependencies?: PromptModule["dependencies"];
  mutability?: PromptModule["mutability"];
  merge?: PromptModule["merge"];
  surface?: PromptModule["address"]["surface"];
  target?: PromptModule["address"]["target"];
  slot?: PromptModule["address"]["slot"];
  fragmentId?: string;
}): PromptModule {
  const owner = opts.owner ?? frameworkOwner;
  const provenance: PromptModule["provenance"] =
    owner.kind === "recipe"
      ? {
          source_kind: "recipe_asset",
          source_ref: `.agentplane/recipes/${owner.recipe_id}/modules/${opts.name}.md`,
          recipe_id: owner.recipe_id,
          recipe_version: owner.version,
        }
      : { ...frameworkSource };
  if (opts.fragmentId) provenance.fragment_id = opts.fragmentId;
  return {
    schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
    address: {
      ...moduleAddress(opts.value, opts.name),
      surface: opts.surface ?? "gateway",
      target: opts.target ?? "AGENTS.md",
      slot: opts.slot ?? "load_rules",
    },
    owner,
    title: opts.title ?? opts.name,
    content_kind: "markdown",
    content: opts.content,
    mutability: opts.mutability ?? "extendable",
    merge: opts.merge ?? {
      mode: "append",
      conflict: "keep_all",
      precedence: owner.kind === "recipe" ? 500 : 100,
    },
    load: opts.load,
    dependencies: opts.dependencies,
    provenance,
  };
}

function graph(nodes: PromptModule[]): PromptModuleGraph {
  return {
    schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
    nodes: nodes.map((module) => ({ module })),
  };
}

describe("prompt module compiler", () => {
  it("filters load conditions and reports missing required dependencies", () => {
    const base = markdownModule({
      value: "framework/gateway/AGENTS.md/load_rules/base",
      name: "base",
      content: "Base\n",
      load: {
        workflow_modes: ["branch_pr"],
        policy_gateways: ["codex"],
      },
    });
    const directOnly = markdownModule({
      value: "framework/gateway/AGENTS.md/load_rules/direct",
      name: "direct",
      content: "Direct\n",
      load: {
        workflow_modes: ["direct"],
      },
    });
    const missingDependency = markdownModule({
      value: "framework/gateway/AGENTS.md/load_rules/needs-missing",
      name: "needs-missing",
      content: "Needs missing\n",
      dependencies: [{ address: "framework/gateway/AGENTS.md/load_rules/missing", required: true }],
    });

    const result = compilePromptModuleGraph({
      graph: graph([base, directOnly, missingDependency]),
      context: {
        workflow_mode: "branch_pr",
        policy_gateway: "codex",
      },
    });

    expect(result.nodes.map((node) => node.module.address.value)).toEqual([
      "framework/gateway/AGENTS.md/load_rules/base",
      "framework/gateway/AGENTS.md/load_rules/needs-missing",
    ]);
    expect(result.ok).toBe(false);
    expect(result.diagnostics.map((diagnostic) => diagnostic.code)).toContain("missing_dependency");
  });

  it("applies add, patch, disable, replace, and binding mutations deterministically", () => {
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
      owner: recipeOwner,
      load: { recipe_ids: ["roadmap"] },
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
            id: "roadmap.prd.extends-base",
            kind: "extends",
            from: recipe.address.value,
            to: base.address.value,
            required: true,
          },
        },
        {
          id: "roadmap.require.prd",
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
      ],
    } satisfies PromptModuleMutationSet;

    const result = compilePromptModuleGraph({
      graph: graph([base, deprecated, replacement]),
      mutation_sets: [mutations],
      context: {
        recipe_ids: ["roadmap"],
      },
    });

    expect(result.ok).toBe(true);
    expect(result.nodes.map((node) => node.module.address.value)).toEqual([
      base.address.value,
      replacement.address.value,
      recipe.address.value,
    ]);
    expect(result.nodes[0]?.module.content).toBe("Base patched\n");
    expect(result.nodes[1]?.module.title).toBe("Replacement patched");
    expect(result.nodes[2]?.extends).toEqual([base.address.value]);
    expect(result.nodes[2]?.module.dependencies).toEqual([
      { address: base.address.value, required: true },
    ]);
    expect(result.bindings.map((binding) => binding.id)).toEqual([
      "roadmap.prd.extends-base",
      "roadmap.prd.requires-base",
    ]);
  });

  it("targets named prompt fragments across framework prompt surfaces", () => {
    const gateway = markdownModule({
      value: "framework/gateway/AGENTS.md/load_rules/branch-pr",
      name: "branch-pr",
      content: "Use branch PR mode.\n",
      surface: "gateway",
      target: "AGENTS.md",
      slot: "load_rules",
      fragmentId: "gateway.agents.load_rules.workflow.branch_pr",
    });
    const policy = markdownModule({
      value: "framework/policy/.agentplane~policy/body/start-worktree",
      name: "start-worktree",
      content: "Start a worktree.\n",
      surface: "policy",
      target: ".agentplane/policy",
      slot: "body",
      fragmentId: "policy.workflow.branch_pr.sequence.start_worktree",
    });
    const runner = markdownModule({
      value: "framework/runner/runner.bundle/body/framework-runner",
      name: "framework-runner",
      content: "Run the task.\n",
      surface: "runner",
      target: "runner.bundle",
      slot: "body",
      fragmentId: "runner.bundle.body.framework.runner",
    });
    const agentProfile = markdownModule({
      value: "framework/agent_profile/.agentplane~agents/workflow/coder-diff-minimal",
      name: "coder-diff-minimal",
      content: "Keep diffs minimal.\n",
      surface: "agent_profile",
      target: ".agentplane/agents",
      slot: "workflow",
      fragmentId: "agent.coder.workflow.diff.minimal",
    });
    const mutations = {
      schema_version: 1,
      recipe_id: "roadmap",
      mutations: [
        {
          id: "roadmap.patch.gateway-branch-pr",
          op: "patch_module",
          source: recipeSource,
          target: { fragment_id: "gateway.agents.load_rules.workflow.branch_pr" },
          patch: { content: "Use branch PR mode with recipe review gates.\n" },
        },
        {
          id: "roadmap.replace.policy-start-worktree",
          op: "replace_module",
          source: recipeSource,
          target: { fragment_id: "policy.workflow.branch_pr.sequence.start_worktree" },
          module: {
            ...policy,
            content: "Start a dedicated recipe-aware worktree.\n",
          },
        },
        {
          id: "roadmap.disable.runner-base",
          op: "disable_module",
          source: recipeSource,
          target: { fragment_id: "runner.bundle.body.framework.runner" },
        },
        {
          id: "roadmap.validator.coder-fragment",
          op: "add_validator",
          source: recipeSource,
          validator: {
            id: "roadmap.requires.coder-fragment",
            phase: "compile",
            kind: "required_module",
            target: { fragment_id: "agent.coder.workflow.diff.minimal" },
            required: true,
          },
        },
      ],
    } satisfies PromptModuleMutationSet;

    const result = compilePromptModuleGraph({
      graph: graph([gateway, policy, runner, agentProfile]),
      mutation_sets: [mutations],
    });

    expect(result.ok).toBe(true);
    expect(
      result.nodes.find(
        (node) => node.module.provenance.fragment_id === gateway.provenance.fragment_id,
      )?.module.content,
    ).toBe("Use branch PR mode with recipe review gates.\n");
    expect(
      result.nodes.find(
        (node) => node.module.provenance.fragment_id === policy.provenance.fragment_id,
      )?.module.content,
    ).toBe("Start a dedicated recipe-aware worktree.\n");
    expect(
      result.nodes.some(
        (node) => node.module.provenance.fragment_id === runner.provenance.fragment_id,
      ),
    ).toBe(false);
    expect(result.validators.map((validator) => validator.id)).toContain(
      "roadmap.requires.coder-fragment",
    );
  });

  it("reports missing fragment selectors in compiler diagnostics", () => {
    const base = markdownModule({
      value: "framework/gateway/AGENTS.md/load_rules/base",
      name: "base",
      content: "Base\n",
      fragmentId: "gateway.agents.load_rules.base",
    });
    const mutations = {
      schema_version: 1,
      recipe_id: "roadmap",
      mutations: [
        {
          id: "roadmap.patch.missing-fragment",
          op: "patch_module",
          source: recipeSource,
          target: { fragment_id: "gateway.agents.load_rules.missing" },
          patch: { content: "Missing\n" },
        },
      ],
    } satisfies PromptModuleMutationSet;

    const result = compilePromptModuleGraph({
      graph: graph([base]),
      mutation_sets: [mutations],
    });

    expect(result.ok).toBe(false);
    expect(result.diagnostics[0]?.message).toContain(
      "fragment_id=gateway.agents.load_rules.missing",
    );
  });

  it("merges duplicate modules by merge policy when conflicts keep all", () => {
    const address = "framework/gateway/AGENTS.md/load_rules/base";
    const base = markdownModule({
      value: address,
      name: "base",
      content: "Base\n",
      merge: { mode: "append", conflict: "keep_all", precedence: 100 },
    });
    const extension = markdownModule({
      value: address,
      name: "base",
      content: "Recipe\n",
      owner: recipeOwner,
      merge: { mode: "append", conflict: "keep_all", precedence: 500 },
    });

    const result = compilePromptModuleGraph({
      graph: graph([extension, base]),
    });

    expect(result.ok).toBe(true);
    expect(result.nodes).toHaveLength(1);
    expect(result.nodes[0]?.module.content).toBe("Base\nRecipe\n");
  });

  it("reports duplicate modules when conflict policy is error", () => {
    const address = "framework/gateway/AGENTS.md/load_rules/base";
    const first = markdownModule({
      value: address,
      name: "base",
      content: "First\n",
      merge: { mode: "pick_one", conflict: "error", precedence: 100 },
    });
    const second = markdownModule({
      value: address,
      name: "base",
      content: "Second\n",
      merge: { mode: "pick_one", conflict: "error", precedence: 500 },
    });

    const result = compilePromptModuleGraph({
      graph: graph([first, second]),
    });

    expect(result.ok).toBe(false);
    expect(result.diagnostics).toMatchObject([
      {
        severity: "error",
        code: "duplicate_module",
        module_address: address,
      },
    ]);
  });

  it("runs validators for requested phases", () => {
    const base = markdownModule({
      value: "framework/gateway/AGENTS.md/load_rules/base",
      name: "base",
      content: "Base\n",
    });
    const validators: PromptModuleValidator[] = [
      {
        id: "doctor.requires-command",
        phase: "doctor",
        kind: "required_command",
        command: "agentplane doctor",
        required: true,
      },
      {
        id: "compile.forbids-recipe",
        phase: "compile",
        kind: "forbidden_module",
        target: { owner: "recipe" },
        required: true,
      },
    ];

    const missingCommand = compilePromptModuleGraph({
      graph: graph([base]),
      validators,
      context: {
        validator_phases: ["doctor"],
      },
    });
    const availableCommand = compilePromptModuleGraph({
      graph: graph([base]),
      validators,
      context: {
        validator_phases: ["doctor"],
        available_commands: ["agentplane doctor"],
      },
    });

    expect(missingCommand.ok).toBe(false);
    expect(missingCommand.diagnostics[0]?.validator_id).toBe("doctor.requires-command");
    expect(availableCommand.ok).toBe(true);
    expect(availableCommand.validators.map((validator) => validator.id)).toEqual([
      "doctor.requires-command",
      "compile.forbids-recipe",
    ]);
  });
});
