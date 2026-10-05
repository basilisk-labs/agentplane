import { mkdir, mkdtemp, realpath, rename, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createRepositorySnapshot, normalizeTaskPlanProposal } from "@agentplaneorg/core/tasks";
import { parseScenarioV2, type ScenarioV2Definition } from "@agentplaneorg/recipes";

import { validateRecipeScenarioPlan } from "./recipe-context.js";

const baseline = createRepositorySnapshot({
  git: { kind: "commit", sha: "a".repeat(40), ref: "refs/heads/main" },
  dirty_paths: [],
  policy_digest: null,
  config_digest: null,
  context_digest: null,
  task_history_cursor: null,
  captured_at: "2026-10-05T00:00:00.000Z",
});

function scenario(): ScenarioV2Definition {
  return parseScenarioV2({
    schema_version: "2",
    id: "repair",
    goal: "Repair {{target}}",
    parameters: [{ name: "target", type: "repo_path", required: true }],
    applicability: { required: [], excluded: [] },
    plan_template: {
      schema_version: 2,
      criteria: [
        { id: "correct", description: "Regression passes", required: true, check_ids: ["test"] },
      ],
      checks: [
        {
          id: "test",
          kind: "deterministic",
          required: true,
          capability: "run_checks",
          command: "bun test",
        },
      ],
      work_items: [
        {
          id: "repair",
          objective: "Repair source",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["patch"],
          scope_roots: ["{{target}}"],
          context: {
            required_sources: ["guidance.md"],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 1024,
          },
          risk: "medium",
          capabilities: ["repository_write"],
          resource_claims: [{ kind: "path", resource: "{{target}}", mode: "write" }],
          optional: false,
          priority: 1,
        },
      ],
    },
  });
}

let root: string;
let outside: string;
beforeEach(async () => {
  root = await realpath(await mkdtemp(path.join(os.tmpdir(), "recipe-plan-")));
  outside = await realpath(await mkdtemp(path.join(os.tmpdir(), "recipe-outside-")));
  await mkdir(path.join(root, "src"));
  await writeFile(path.join(root, "guidance.md"), "Bounded guidance");
});
afterEach(async () => {
  await Promise.all([
    rm(root, { recursive: true, force: true }),
    rm(outside, { recursive: true, force: true }),
  ]);
});
function validate(input = scenario(), target = "src") {
  return validateRecipeScenarioPlan({
    scenario: input,
    bindings: [{ name: "target", value: target }],
    repository_root: root,
    task_id: "task",
    planning_baseline: baseline,
  });
}

describe("Recipe Plan native normalization and containment", () => {
  it("uses exactly the native compact Plan normalization and preserves required checks", async () => {
    const result = await validate();
    expect(result.proposal).toEqual(
      normalizeTaskPlanProposal(result.scenario.plan_template, {
        task_id: "task",
        planning_baseline: baseline,
      }),
    );
    expect(result.proposal.top_level_validation.checks[0]).toMatchObject({
      id: "test",
      command: "bun test",
      required: true,
    });
    expect(result.proposal.work_items.work_items[0]!.acceptance_criteria[0]!.required).toBe(true);
    expect(result.proposal.task_id).toBe("task");
    expect(result.proposal.planning_baseline).toEqual(baseline);
    expect(await result.readContextSource("guidance.md")).toBe("Bounded guidance");
    await expect(result.readContextSource("not-declared.md")).rejects.toThrow("Undeclared");
    await expect(result.assertPathsUnchanged()).resolves.toBeUndefined();
  });

  const invalidPlans: [string, (s: ScenarioV2Definition) => void, RegExp][] = [
    [
      "cycle",
      (s) => {
        s.plan_template.work_items[0]!.depends_on = ["repair"];
      },
      /dependency_cycle/u,
    ],
    [
      "dangling dependency",
      (s) => {
        s.plan_template.work_items[0]!.depends_on = ["missing"];
      },
      /missing_dependency/u,
    ],
    [
      "dangling input",
      (s) => {
        s.plan_template.work_items[0]!.required_inputs = ["missing"];
      },
      /missing_input_declaration/u,
    ],
    [
      "self input",
      (s) => {
        s.plan_template.work_items[0]!.required_inputs = ["patch"];
      },
      /missing_input_declaration/u,
    ],
    [
      "duplicate output",
      (s) => {
        s.plan_template.work_items[0]!.expected_outputs = ["patch", "patch"];
      },
      /duplicate_output_declaration/u,
    ],
    [
      "dangling check",
      (s) => {
        s.plan_template.criteria[0]!.check_ids = ["missing"];
      },
      /outside its validation plan/u,
    ],
    [
      "dangling criterion",
      (s) => {
        s.plan_template.work_items[0]!.criterion_ids = ["missing"];
      },
      /Unknown criterion/u,
    ],
    [
      "empty required checks",
      (s) => {
        s.plan_template.criteria[0]!.check_ids = [];
      },
      /missing_validation/u,
    ],
    [
      "dropped required check",
      (s) => {
        s.plan_template.checks.push({
          id: "native",
          required: true,
          kind: "deterministic",
          capability: "run_checks",
          command: "bun run native",
        });
        s.plan_template.work_items[0]!.check_ids = ["test"];
        s.plan_template.top_level_validation = { criterion_ids: ["correct"], check_ids: ["test"] };
      },
      /unused criteria or checks/u,
    ],
  ];
  it.each(invalidPlans)("rejects %s through the native validator", async (_name, mutate, error) => {
    const input = scenario();
    mutate(input);
    await expect(validate(input)).rejects.toThrow(error);
  });

  it("rejects duplicate outputs across WorkItems without introducing another DAG validator", async () => {
    const input = scenario();
    const first = input.plan_template.work_items[0]!;
    first.criterion_ids = ["correct"];
    first.check_ids = ["test"];
    input.plan_template.work_items.push({
      ...structuredClone(first),
      id: "second",
      depends_on: ["repair"],
    });
    input.plan_template.top_level_validation = { criterion_ids: ["correct"], check_ids: ["test"] };
    await expect(validate(input)).rejects.toThrow("duplicate_output_declaration");
    input.plan_template.work_items[1]!.expected_outputs = ["report"];
    input.plan_template.work_items[1]!.required_inputs = ["patch"];
    await expect(validate(input)).resolves.toHaveProperty("proposal");
  });

  it.each([
    "/outside",
    "../outside",
    "src/../../outside",
    "C:/outside",
    "C:outside",
    "\\\\server\\share",
    "//server/share",
    "\\?\\C:\\outside",
  ])("rejects portable path escape %s", async (target) => {
    await expect(validate(scenario(), target)).rejects.toThrow();
  });

  it.each(["internal", "external"])("rejects %s symlink scope", async (kind) => {
    await symlink(
      kind === "internal" ? path.join(root, "src") : outside,
      path.join(root, "alias"),
      "dir",
    );
    await expect(validate(scenario(), "alias/new")).rejects.toThrow("symlinked");
  });

  it("rejects case aliases, including ambiguous case-distinct sibling entries", async () => {
    await expect(validate(scenario(), "SRC")).rejects.toThrow("case-aliased");
    await mkdir(path.join(root, "SRC"));
    await expect(validate()).rejects.toThrow("case-aliased");
  });

  it.each(["required_sources", "optional_sources"] as const)(
    "rejects dangling %s guidance references",
    async (field) => {
      const input = scenario();
      input.plan_template.work_items[0]!.context[field] = ["missing.md"];
      await expect(validate(input)).rejects.toThrow("Dangling Recipe context source");
    },
  );

  it("rejects symlink context sources and scope paths that traverse a regular file", async () => {
    await writeFile(path.join(outside, "secret.md"), "secret");
    await symlink(path.join(outside, "secret.md"), path.join(root, "alias.md"));
    const input = scenario();
    input.plan_template.work_items[0]!.context.required_sources = ["alias.md"];
    await expect(validate(input)).rejects.toThrow("symlinked");
    await expect(validate(scenario(), "guidance.md/nested")).rejects.toThrow("non-directory");
  });

  it("supports root scope and absent nested destinations while keeping observed ancestors pinned", async () => {
    await expect(validate(scenario(), ".")).resolves.toHaveProperty("proposal");
    const result = await validate(scenario(), "src/new/destination");
    await expect(result.assertPathsUnchanged()).resolves.toBeUndefined();
    await mkdir(path.join(root, "src", "new"));
    await expect(result.assertPathsUnchanged()).rejects.toThrow("changed");
  });

  it.each(["symlink", "directory"])(
    "rejects an ancestor replaced by a %s at use time",
    async (replacement) => {
      const result = await validate(scenario(), "src/new/destination");
      await rename(path.join(root, "src"), path.join(root, "retired"));
      if (replacement === "symlink") await symlink(outside, path.join(root, "src"), "dir");
      else await mkdir(path.join(root, "src"));
      await expect(result.assertPathsUnchanged()).rejects.toThrow(/symlinked|changed/u);
      await expect(result.readContextSource("guidance.md")).rejects.toThrow(/symlinked|changed/u);
    },
  );

  it("rejects a context ancestor replacement before reading and enforces the native read budget", async () => {
    await mkdir(path.join(root, "docs"));
    await writeFile(path.join(root, "docs", "guide.md"), "inside");
    await writeFile(path.join(outside, "guide.md"), "outside");
    const input = scenario();
    input.plan_template.work_items[0]!.context.required_sources = ["docs/guide.md"];
    const result = await validate(input);
    await rename(path.join(root, "docs"), path.join(root, "old-docs"));
    await symlink(outside, path.join(root, "docs"), "dir");
    await expect(result.readContextSource("docs/guide.md")).rejects.toThrow("symlinked");
    const bounded = scenario();
    bounded.plan_template.work_items[0]!.context.max_bytes = 1;
    const boundedResult = await validate(bounded);
    await expect(boundedResult.readContextSource("guidance.md")).rejects.toThrow(
      "observation budget",
    );
  });

  it("rejects repository-root replacement at use time", async () => {
    const result = await validate();
    const retired = root + "-retired";
    await rename(root, retired);
    try {
      await mkdir(root);
      await mkdir(path.join(root, "src"));
      await writeFile(path.join(root, "guidance.md"), "replacement");
      await expect(result.assertPathsUnchanged()).rejects.toThrow("changed");
    } finally {
      await rm(retired, { recursive: true, force: true });
    }
  });

  it("fails closed on platforms without qualified containment", async () => {
    const platform = Object.getOwnPropertyDescriptor(process, "platform")!;
    Object.defineProperty(process, "platform", { value: "win32" });
    try {
      await expect(validate()).rejects.toThrow("unsupported on this platform");
    } finally {
      Object.defineProperty(process, "platform", platform);
    }
  });
  it("rejects a changed Plan before reusing its path observations", async () => {
    const result = await validate();
    result.proposal.work_items.work_items[0]!.scope_roots.push("../outside");
    await expect(result.assertPathsUnchanged()).rejects.toThrow("Plan changed");
    await expect(result.readContextSource("guidance.md")).rejects.toThrow("Plan changed");
  });
});
