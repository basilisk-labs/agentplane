import { mkdir, mkdtemp, realpath, rename, rm, symlink, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  createRepositorySnapshot,
  normalizeTaskPlanProposal,
  taskCentricDigest,
} from "@agentplaneorg/core/tasks";
import {
  parseScenarioV2,
  validateRecipeManifest,
  type RecipeDependencyClosureDeclaration,
} from "@agentplaneorg/recipes";
import { computeRecipeDependencyClosure } from "./recipe-context.js";

const digest = (text: string) => `sha256:${createHash("sha256").update(text).digest("hex")}`;
const baseline = createRepositorySnapshot({
  git: { kind: "commit", sha: "a".repeat(40), ref: "refs/heads/main" },
  dirty_paths: [],
  policy_digest: null,
  config_digest: null,
  context_digest: null,
  task_history_cursor: null,
  captured_at: "2026-10-05T00:00:00.000Z",
});
const scenario = parseScenarioV2({
  schema_version: "2",
  id: "repair",
  goal: "Repair source",
  parameters: [],
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
        scope_roots: ["src"],
        context: {
          required_sources: ["guidance.md"],
          optional_sources: [],
          symbol_hints: [],
          max_bytes: 4096,
        },
        risk: "medium",
        capabilities: ["repository_write"],
        resource_claims: [],
        optional: false,
        priority: 1,
      },
    ],
  },
});
const fileRef = (relative: string, source: "recipe" | "repository" = "recipe") => ({
  kind: "file" as const,
  source,
  path: relative,
});
let root: string;
let recipe: string;
let manifest: Record<string, unknown>;
let declaration: RecipeDependencyClosureDeclaration;
let proposal: ReturnType<typeof normalizeTaskPlanProposal>;
const entrypoint = 'import "./helper.js";';
const helper = "export const value = 1;";
async function writeManifest() {
  await writeFile(path.join(recipe, "manifest.json"), JSON.stringify(manifest));
}
async function compute() {
  await writeManifest();
  return computeRecipeDependencyClosure({
    recipe_root: recipe,
    repository_root: root,
    scenario_id: "repair",
    bindings: [],
    proposed_plan: proposal,
  });
}
beforeEach(async () => {
  root = await realpath(await mkdtemp(path.join(os.tmpdir(), "recipe-closure-")));
  recipe = path.join(root, "recipe");
  await mkdir(path.join(recipe, "tool"), { recursive: true });
  await Promise.all([
    writeFile(path.join(recipe, "scenario.json"), JSON.stringify(scenario)),
    writeFile(path.join(recipe, "agent.md"), "Use the selected guidance."),
    writeFile(path.join(recipe, "skill.md"), "Read transitive guidance."),
    writeFile(path.join(recipe, "transitive.md"), "Transitive required asset."),
    writeFile(path.join(recipe, "tool/main.js"), entrypoint),
    writeFile(path.join(recipe, "tool/helper.js"), helper),
    writeFile(path.join(root, "guidance.md"), "Repository context."),
  ]);
  declaration = {
    schema_version: 1,
    files: [
      { source: "recipe", path: "scenario.json", dependencies: [] },
      { source: "recipe", path: "agent.md", dependencies: [] },
      { source: "recipe", path: "skill.md", dependencies: [fileRef("transitive.md")] },
      {
        source: "recipe",
        path: "transitive.md",
        dependencies: [{ kind: "secret", id: "secret:service", version: "opaque-v3" }],
      },
      { source: "repository", path: "guidance.md", dependencies: [] },
    ],
    packages: [
      {
        id: "tool-package",
        version: "1.2.3",
        source: "recipe",
        root: "tool",
        files: ["main.js", "helper.js"],
        digest: taskCentricDigest([
          { path: "helper.js", digest: digest(helper) },
          { path: "main.js", digest: digest(entrypoint) },
        ]),
        dependencies: [],
      },
    ],
    tools: [{ id: "check", package_id: "tool-package" }],
    capabilities: [
      { id: "run_checks", dependencies: [{ kind: "package", id: "tool-package" }] },
      { id: "repository_write", dependencies: [] },
    ],
    commands: [{ command: "bun test", dependencies: [{ kind: "package", id: "tool-package" }] }],
  };
  manifest = {
    schema_version: "2",
    kind: "project_overlay",
    id: "demo",
    version: "1.0.0",
    name: "Demo",
    summary: "Selected closure",
    agents: [
      {
        id: "worker",
        display_name: "Worker",
        role: "EXECUTOR",
        summary: "Worker",
        file: "agent.md",
        skills: ["guide"],
        tools: ["check"],
      },
    ],
    skills: [{ id: "guide", summary: "Guide", file: "skill.md" }],
    tools: [{ id: "check", summary: "Check", runtime: "node", entrypoint: "tool/main.js" }],
    scenarios: [
      {
        id: "repair",
        name: "Repair",
        summary: "Repair source",
        use_when: ["repair"],
        required_inputs: [],
        outputs: [],
        permissions: [],
        artifacts: [],
        agents_involved: ["worker"],
        skills_used: [],
        tools_used: [],
        run_profile: { mode: "analysis" },
        file: "scenario.json",
      },
    ],
    dependency_closure: declaration,
  };
  proposal = normalizeTaskPlanProposal(scenario.plan_template, {
    task_id: "task",
    planning_baseline: baseline,
  });
});
afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

describe("pre-execution Recipe dependency closure", () => {
  it("pins selected Scenario, shared Plan, guidance, entrypoint and helpers deterministically", async () => {
    const first = await compute();
    const second = await compute();
    expect(first.closure).toEqual(second.closure);
    expect(first.closure.plan_digest).toBe(taskCentricDigest(proposal));
    expect(first.closure.scenario_digest).toBe(taskCentricDigest(scenario));
    expect(first.closure.files.map((file) => file.path)).toEqual([
      "agent.md",
      "scenario.json",
      "skill.md",
      "tool/helper.js",
      "tool/main.js",
      "transitive.md",
      "guidance.md",
    ]);
    expect(
      first.closure.nodes.find((node) => node.id === "package:tool-package")?.definition,
    ).toMatchObject({ version: "1.2.3", digest: declaration.packages[0]!.digest });
    expect(
      first.objects.every(
        (object) => digest(Buffer.from(object.bytes).toString("utf8")) === object.digest,
      ),
    ).toBe(true);
    await second.assertUnchanged();
  });
  it("changes identity when a transitive required asset changes", async () => {
    const first = await compute();
    await writeFile(path.join(recipe, "transitive.md"), "Changed transitive guidance.");
    const changed = await compute();
    expect(changed.closure.digest).not.toBe(first.closure.digest);
  });
  it("ignores unrelated installed packages and does not load unrelated catalogue assets", async () => {
    const first = await compute();
    await mkdir(path.join(root, "unrelated"));
    await writeFile(path.join(root, "unrelated/manifest.json"), "not even JSON");
    (manifest.skills as unknown[]).push({
      id: "unrelated",
      summary: "Never loaded",
      file: "absent.md",
    });
    declaration.files.push({
      source: "recipe",
      path: "absent.md",
      dependencies: [fileRef("also-absent.md")],
    });
    const unchanged = await compute();
    expect(unchanged.closure).toEqual(first.closure);
  });
  it("retains opaque versioned secret refs without reading environment values", async () => {
    const result = await compute();
    expect(result.closure.secret_refs).toEqual([{ id: "secret:service", version: "opaque-v3" }]);
    expect(result.closure.files.every((file) => !file.path.includes("secret"))).toBe(true);
    expect(result.objects).toHaveLength(7);
  });
  it("rejects secret value and hash fields in the declaration", async () => {
    declaration.files[3]!.dependencies.push({
      kind: "secret",
      id: "bad",
      version: "v1",
      value: "must-not-retain",
    } as never);
    await expect(compute()).rejects.toThrow();
    declaration.files[3]!.dependencies.pop();
    declaration.files[3]!.dependencies.push({
      kind: "secret",
      id: "bad",
      version: "v1",
      value_hash: "must-not-hash",
    } as never);
    await expect(compute()).rejects.toThrow();
  });
  it("rejects dotenv file dependencies before reading their bytes", async () => {
    declaration.files[3]!.dependencies.push(fileRef(".env"));
    declaration.files.push({ source: "recipe", path: ".env", dependencies: [] });
    await writeFile(path.join(recipe, ".env"), "PRIVATE=value");
    await expect(compute()).rejects.toMatchObject({ code: "secret_file_forbidden" });
  });
  it("requires package pinning even when the entrypoint alone is available", async () => {
    declaration.tools = [];
    await expect(compute()).rejects.toMatchObject({ code: "tool_package_unpinned" });
  });
  it("cannot cover an unpinned helper by hashing only the entrypoint", async () => {
    declaration.packages[0]!.files = ["main.js"];
    declaration.packages[0]!.digest = taskCentricDigest([
      { path: "main.js", digest: digest(entrypoint) },
    ]);
    await expect(compute()).rejects.toMatchObject({ code: "package_inventory_unpinned" });
  });
  it("rejects helper tampering under the old package pin", async () => {
    await writeFile(path.join(recipe, "tool/helper.js"), "changed helper");
    await expect(compute()).rejects.toMatchObject({ code: "package_digest_mismatch" });
  });
  it("changes identity when a helper is deliberately repinned", async () => {
    const first = await compute();
    await writeFile(path.join(recipe, "tool/helper.js"), "changed helper");
    declaration.packages[0]!.digest = taskCentricDigest([
      { path: "helper.js", digest: digest("changed helper") },
      { path: "main.js", digest: digest(entrypoint) },
    ]);
    const changed = await compute();
    expect(changed.closure.digest).not.toBe(first.closure.digest);
  });
  it("follows declared transitive package dependencies", async () => {
    await mkdir(path.join(recipe, "dependency"));
    await writeFile(path.join(recipe, "dependency/lib.js"), "dependency bytes");
    declaration.packages.push({
      id: "dep",
      version: "2",
      source: "recipe",
      root: "dependency",
      files: ["lib.js"],
      digest: taskCentricDigest([{ path: "lib.js", digest: digest("dependency bytes") }]),
      dependencies: [],
    });
    declaration.packages[0]!.dependencies.push({ kind: "package", id: "dep" });
    const result = await compute();
    expect(result.closure.files.some((file) => file.path === "dependency/lib.js")).toBe(true);
  });
  it("fails on unknown transitive packages", async () => {
    declaration.packages[0]!.dependencies.push({ kind: "package", id: "unknown" });
    await expect(compute()).rejects.toMatchObject({
      code: "package_unpinned",
      reference: "unknown",
    });
  });
  it("fails on an unknown guidance closure rather than assuming no imports", async () => {
    declaration.files = declaration.files.filter((file) => file.path !== "transitive.md");
    await expect(compute()).rejects.toMatchObject({ code: "file_dependencies_unknown" });
  });
  it("includes newly proposed Plan context dependencies", async () => {
    await writeFile(path.join(root, "additional.md"), "Added specialization");
    declaration.files.push({ source: "repository", path: "additional.md", dependencies: [] });
    const first = await compute();
    proposal.work_items.work_items[0]!.context.optional_sources.push("additional.md");
    const second = await compute();
    expect(second.closure.digest).not.toBe(first.closure.digest);
    expect(second.closure.files.some((file) => file.path === "additional.md")).toBe(true);
  });
  it("rejects undeclared capability and check command dependencies", async () => {
    declaration.capabilities = [];
    await expect(compute()).rejects.toMatchObject({ code: "capability_dependencies_unknown" });
    declaration.capabilities = [
      { id: "run_checks", dependencies: [] },
      { id: "repository_write", dependencies: [] },
    ];
    declaration.commands = [];
    await expect(compute()).rejects.toMatchObject({ code: "command_dependencies_unknown" });
  });
  it("uses native graph validation for the proposed Plan", async () => {
    proposal.work_items.work_items[0]!.depends_on.push("missing");
    await expect(compute()).rejects.toThrow(/dependency/iu);
  });
  it("rejects declared dependency cycles", async () => {
    declaration.files[3]!.dependencies.push(fileRef("skill.md"));
    await expect(compute()).rejects.toMatchObject({ code: "dependency_cycle" });
  });
  it("rejects duplicate dependency declarations", async () => {
    declaration.files.push(declaration.files[0]!);
    await expect(compute()).rejects.toMatchObject({ code: "duplicate_declaration" });
  });
  it("rejects conflicting secret versions", async () => {
    declaration.files[3]!.dependencies.push({
      kind: "secret",
      id: "secret:service",
      version: "other",
    });
    await expect(compute()).rejects.toMatchObject({ code: "conflicting_secret_version" });
  });
  it("rejects an entrypoint outside its declared package", async () => {
    (manifest.tools as { entrypoint: string }[])[0]!.entrypoint = "elsewhere.js";
    await expect(compute()).rejects.toMatchObject({ code: "entrypoint_not_in_package" });
  });
  it("rejects a Recipe root outside the repository before loading its manifest", async () => {
    await expect(
      computeRecipeDependencyClosure({
        recipe_root: path.dirname(root),
        repository_root: root,
        scenario_id: "repair",
        bindings: [],
        proposed_plan: proposal,
      }),
    ).rejects.toThrow(/outside the repository/iu);
  });
  it("rejects symlink package helpers", async () => {
    await rm(path.join(recipe, "tool/helper.js"));
    await symlink(path.join(root, "guidance.md"), path.join(recipe, "tool/helper.js"));
    await expect(compute()).rejects.toMatchObject({ code: "unsafe_package_entry" });
  });
  it("detects ancestor replacement and changed bytes at use time", async () => {
    const result = await compute();
    await rename(path.join(recipe, "tool"), path.join(recipe, "old-tool"));
    await mkdir(path.join(recipe, "tool"));
    await expect(result.assertUnchanged()).rejects.toThrow(/changed/iu);
  });
  it("detects changed output and object bytes", async () => {
    const result = await compute();
    result.closure.recipe.version = "forged";
    await expect(result.assertUnchanged()).rejects.toMatchObject({
      code: "computed_closure_changed",
    });
    const next = await compute();
    next.objects[0]!.bytes[0] = 0;
    await expect(next.assertUnchanged()).rejects.toMatchObject({
      code: "computed_closure_changed",
    });
  });
  it("binds tool definitions reached only through a proposed Plan capability", async () => {
    (manifest.agents as { tools: string[] }[])[0]!.tools = [];
    declaration.capabilities[0]!.dependencies = [{ kind: "tool", id: "check" }];
    const first = await compute();
    expect(first.closure.nodes.find((node) => node.id === "tool:check")?.definition).toMatchObject({
      runtime: "node",
      entrypoint: "tool/main.js",
    });
    (manifest.tools as { permissions?: string[] }[])[0]!.permissions = [
      "extra_requested_permission",
    ];
    const second = await compute();
    expect(second.closure.digest).not.toBe(first.closure.digest);
  });
  it("rejects unknown transitive tools without treating a package alone as their definition", async () => {
    declaration.files[3]!.dependencies.push({ kind: "tool", id: "unknown" });
    await expect(compute()).rejects.toMatchObject({
      code: "tool_package_unpinned",
      reference: "unknown",
    });
  });
  it("requires pins for manifest-level Recipe dependencies", async () => {
    manifest.requires = ["missing-recipe-package"];
    await expect(compute()).rejects.toMatchObject({
      code: "package_unpinned",
      reference: "missing-recipe-package",
    });
  });
  it("retains binary assets as their exact original bytes", async () => {
    const bytes = Buffer.from([0, 255, 128, 1]);
    await writeFile(path.join(recipe, "binary.dat"), bytes);
    declaration.files[3]!.dependencies.push(fileRef("binary.dat"));
    declaration.files.push({ source: "recipe", path: "binary.dat", dependencies: [] });
    const result = await compute();
    const file = result.closure.files.find((entry) => entry.path === "binary.dat")!;
    const object = result.objects.find((entry) => entry.digest === file.digest)!;
    expect(Buffer.from(object.bytes)).toEqual(bytes);
  });
  it("rejects removal of a computed evidence object", async () => {
    const result = await compute();
    result.objects.pop();
    await expect(result.assertUnchanged()).rejects.toMatchObject({
      code: "computed_closure_changed",
    });
  });
  it("is stable under dependency catalogue and inventory ordering", async () => {
    const first = await compute();
    declaration.files.reverse();
    declaration.packages[0]!.files.reverse();
    declaration.capabilities.reverse();
    const second = await compute();
    expect(second.closure).toEqual(first.closure);
  });
  it("rejects added Plan dependencies absent from the declared closure", async () => {
    proposal.work_items.work_items[0]!.context.required_sources.push("undeclared.md");
    await expect(compute()).rejects.toMatchObject({
      code: "file_dependencies_unknown",
      reference: "file:repository:undeclared.md",
    });
  });
  it("keeps distinct opaque secret identifiers collision-free", async () => {
    declaration.files[3]!.dependencies = [
      { kind: "secret", id: "a:b", version: "c" },
      { kind: "secret", id: "a", version: "b:c" },
    ];
    const result = await compute();
    expect(result.closure.secret_refs).toHaveLength(2);
  });
  it("preserves manifests without closure metadata and requires explicit metadata for V2 closure", async () => {
    delete manifest.dependency_closure;
    expect(validateRecipeManifest(manifest).dependency_closure).toBeUndefined();
    await expect(compute()).rejects.toMatchObject({ code: "declaration_missing" });
  });
  it.each(["../escape", "C:/escape", "//host/share", "dir/../escape"])(
    "rejects unsafe declared paths: %s",
    async (unsafe) => {
      declaration.files[0]!.path = unsafe;
      await expect(compute()).rejects.toThrow();
    },
  );
});
