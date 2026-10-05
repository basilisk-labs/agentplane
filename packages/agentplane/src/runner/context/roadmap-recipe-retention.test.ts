import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { mkGitRepoRoot } from "@agentplane/testkit";
import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import {
  createRepositorySnapshot,
  normalizeTaskPlanProposal,
  taskCentricDigest,
} from "@agentplaneorg/core/tasks";
import { parseScenarioV2 } from "@agentplaneorg/recipes";
import {
  computeRecipeDependencyClosure,
  prepareRecipeClosureRetention,
  readRetainedRecipeClosure,
  type RecipeClosureReference,
} from "./recipe-context.js";
import {
  putEvaluatorEvidenceObject,
  readEvaluatorEvidenceObject,
} from "../../commands/evaluator/evaluator-evidence-store.js";

const cleanup: string[] = [];
afterEach(async () => {
  await Promise.all(cleanup.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});
const digest = (bytes: Uint8Array | string) =>
  `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
async function git(root: string, args: string[]) {
  return execFileAsync(
    "git",
    ["-c", "core.hooksPath=/dev/null", "-c", "commit.gpgsign=false", ...args],
    {
      cwd: root,
      env: { ...gitEnv(), GIT_ALLOW_PROTOCOL: "file", GIT_TERMINAL_PROMPT: "0" },
      timeout: 30_000,
    },
  );
}
async function fixture(binary = Buffer.from([0, 255, 128, 1])) {
  const root = await mkGitRepoRoot();
  cleanup.push(root);
  await git(root, ["commit", "--allow-empty", "-m", "test seed"]);
  const recipe = path.join(root, "installed");
  const quality = path.join(root, ".agentplane/tasks/T-RETENTION/quality");
  await mkdir(path.join(recipe, "tool"), { recursive: true });
  const scenario = parseScenarioV2({
    schema_version: "2",
    id: "repair",
    goal: "Repair",
    parameters: [],
    applicability: { required: [], excluded: [] },
    plan_template: {
      schema_version: 2,
      criteria: [{ id: "correct", description: "Correct", required: true, check_ids: ["test"] }],
      checks: [{ id: "test", kind: "semantic", required: true, capability: "test" }],
      work_items: [
        {
          id: "repair",
          objective: "Repair",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["patch"],
          scope_roots: ["src"],
          context: {
            required_sources: ["context.md"],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 1024,
          },
          risk: "medium",
          capabilities: [],
          resource_claims: [],
          optional: false,
          priority: 1,
        },
      ],
    },
  });
  const toolFiles = [
    { path: "binary.dat", bytes: binary },
    { path: "helper.js", bytes: Buffer.from("export const value = 1;") },
    { path: "main.js", bytes: Buffer.from('import "./helper.js";') },
  ];
  const manifest = {
    schema_version: "2",
    kind: "project_overlay",
    id: "demo",
    version: "1.0.0",
    name: "Demo",
    summary: "Demo",
    agents: [
      {
        id: "worker",
        display_name: "Worker",
        role: "EXECUTOR",
        summary: "Worker",
        file: "agent.md",
        tools: ["check"],
      },
    ],
    tools: [{ id: "check", summary: "Check", runtime: "node", entrypoint: "tool/main.js" }],
    scenarios: [
      {
        id: "repair",
        name: "Repair",
        summary: "Repair",
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
    dependency_closure: {
      schema_version: 1,
      files: [
        { source: "recipe", path: "scenario.json", dependencies: [] },
        {
          source: "recipe",
          path: "agent.md",
          dependencies: [{ kind: "secret", id: "secret:service", version: "opaque-v1" }],
        },
        { source: "repository", path: "context.md", dependencies: [] },
      ],
      packages: [
        {
          id: "tool-package",
          version: "1",
          source: "recipe",
          root: "tool",
          files: toolFiles.map((file) => file.path),
          digest: taskCentricDigest(
            toolFiles.map((file) => ({ path: file.path, digest: digest(file.bytes) })),
          ),
          dependencies: [],
        },
      ],
      tools: [{ id: "check", package_id: "tool-package" }],
      capabilities: [{ id: "test", dependencies: [] }],
      commands: [],
    },
  };
  await Promise.all([
    writeFile(path.join(recipe, "manifest.json"), JSON.stringify(manifest)),
    writeFile(path.join(recipe, "scenario.json"), JSON.stringify(scenario)),
    writeFile(path.join(recipe, "agent.md"), "Pinned agent guidance"),
    writeFile(path.join(root, "context.md"), "Pinned repository context"),
    ...toolFiles.map((file) => writeFile(path.join(recipe, "tool", file.path), file.bytes)),
  ]);
  const planningBaseline = createRepositorySnapshot({
    git: { kind: "commit", sha: "a".repeat(40), ref: "refs/heads/main" },
    dirty_paths: [],
    policy_digest: null,
    config_digest: null,
    context_digest: null,
    task_history_cursor: null,
    captured_at: "2026-10-05T00:00:00.000Z",
  });
  const computed = await computeRecipeDependencyClosure({
    recipe_root: recipe,
    repository_root: root,
    scenario_id: "repair",
    bindings: [],
    proposed_plan: normalizeTaskPlanProposal(scenario.plan_template, {
      task_id: "task",
      planning_baseline: planningBaseline,
    }),
  });
  const reference = await prepareRecipeClosureRetention({
    gitRoot: root,
    taskQualityRoot: quality,
    computed,
  });
  async function commit(ref = reference) {
    await writeFile(
      path.join(root, "bound-plan.json"),
      JSON.stringify({ closure_reference: ref, closure_digest: computed.closure.digest }),
    );
    await git(root, ["add", "--", ref.artifact.path, "bound-plan.json"]);
    await git(root, ["commit", "-m", "test retain pinned closure"]);
  }
  return { root, recipe, quality, computed, reference, binary, commit };
}
function recover(
  root: string,
  reference: RecipeClosureReference,
  expected = reference.closure_digest,
) {
  return readRetainedRecipeClosure({ gitRoot: root, reference, expectedClosureDigest: expected });
}

describe("portable retained Recipe closure", () => {
  it("deduplicates repeated preparation into one existing content-addressed object", async () => {
    const f = await fixture();
    const again = await prepareRecipeClosureRetention({
      gitRoot: f.root,
      taskQualityRoot: f.quality,
      computed: f.computed,
    });
    expect(again).toEqual(f.reference);
    expect(await readdir(path.join(f.quality, "objects/sha256"))).toHaveLength(1);
    expect(f.reference.retention).toBe("keep_in_current_tree_until_task_and_audit_complete");
  });
  it("requires a committed object, rejecting both untracked and staged-only copies", async () => {
    const f = await fixture();
    await expect(recover(f.root, f.reference)).rejects.toThrow(/not committed/iu);
    await git(f.root, ["add", "--", f.reference.artifact.path]);
    await expect(recover(f.root, f.reference)).rejects.toThrow(/not committed/iu);
    await f.commit();
    const result = await recover(f.root, f.reference);
    expect(result.proof.commit).toMatch(/^[a-f0-9]{40,64}$/u);
    expect(result.closure).toEqual(f.computed.closure);
  });
  it("recovers all exact bytes from a genuine offline fresh clone without installed packages", async () => {
    const f = await fixture();
    await f.commit();
    await rm(f.recipe, { recursive: true, force: true });
    await rm(path.join(f.root, "context.md"));
    const cloneParent = await mkGitRepoRoot();
    cleanup.push(cloneParent);
    const clone = path.join(cloneParent, "fresh-clone");
    await git(cloneParent, ["clone", "--no-local", "--no-hardlinks", "--", f.root, clone]);
    await expect(readFile(path.join(clone, "installed/manifest.json"))).rejects.toMatchObject({
      code: "ENOENT",
    });
    await expect(readFile(path.join(clone, ".git/objects/info/alternates"))).rejects.toMatchObject({
      code: "ENOENT",
    });
    const bound = JSON.parse(await readFile(path.join(clone, "bound-plan.json"), "utf8")) as {
      closure_reference: RecipeClosureReference;
      closure_digest: string;
    };
    const recovered = await readRetainedRecipeClosure({
      gitRoot: clone,
      reference: bound.closure_reference,
      expectedClosureDigest: bound.closure_digest,
    });
    for (const file of f.computed.closure.files) {
      const bytes = recovered.readFile(file.source, file.path);
      expect(digest(bytes)).toBe(file.digest);
      expect(bytes.length).toBe(file.size_bytes);
    }
    expect(Buffer.from(recovered.readFile("recipe", "tool/binary.dat"))).toEqual(f.binary);
    expect(recovered.closure.secret_refs).toEqual([{ id: "secret:service", version: "opaque-v1" }]);
  });
  it("never selects updated or removed installed package bytes", async () => {
    const f = await fixture();
    await f.commit();
    await writeFile(path.join(f.recipe, "tool/helper.js"), "new latest version");
    const updated = await recover(f.root, f.reference);
    expect(Buffer.from(updated.readFile("recipe", "tool/helper.js")).toString("utf8")).toBe(
      "export const value = 1;",
    );
    await rm(f.recipe, { recursive: true, force: true });
    const removed = await recover(f.root, f.reference);
    expect(removed.closure.digest).toBe(f.reference.closure_digest);
  });
  it("does not treat a Git-common-dir-only object as portable retention", async () => {
    const f = await fixture();
    await expect(
      prepareRecipeClosureRetention({
        gitRoot: f.root,
        taskQualityRoot: path.join(f.root, ".git/retention/quality"),
        computed: f.computed,
      }),
    ).rejects.toThrow(/Git common directory/iu);
    const ref = { ...f.reference, task_quality_root: ".git/retention/quality" };
    await expect(recover(f.root, ref)).rejects.toThrow(/Git common directory/iu);
  });
  it("stops on missing bytes instead of falling back to installed or Git-history bytes", async () => {
    const f = await fixture();
    await f.commit();
    await rm(path.join(f.root, f.reference.artifact.path));
    await expect(recover(f.root, f.reference)).rejects.toThrow();
  });
  it("stops on same-inode evidence tamper", async () => {
    const f = await fixture();
    await f.commit();
    const file = path.join(f.root, f.reference.artifact.path);
    await writeFile(file, (await readFile(file, "utf8")) + " ");
    await expect(recover(f.root, f.reference)).rejects.toThrow(/changed after preparation/iu);
  });
  it("requires the committed blob to match even a self-consistent working-tree descriptor", async () => {
    const f = await fixture();
    await f.commit();
    const file = path.join(f.root, f.reference.artifact.path);
    const changed = (await readFile(file, "utf8")) + " ";
    await writeFile(file, changed);
    const ref = structuredClone(f.reference);
    ref.artifact.sha256 = digest(changed);
    ref.artifact.size_bytes = Buffer.byteLength(changed);
    await expect(recover(f.root, ref)).rejects.toThrow(/Committed evidence object/iu);
  });
  it("rejects a different bound closure identity", async () => {
    const f = await fixture();
    await f.commit();
    await expect(recover(f.root, f.reference, `sha256:${"f".repeat(64)}`)).rejects.toThrow(
      /bound closure/iu,
    );
  });
  it("rejects retained object symlinks", async () => {
    const f = await fixture();
    await f.commit();
    const file = path.join(f.root, f.reference.artifact.path);
    await rm(file);
    await symlink(path.join(f.root, "bound-plan.json"), file);
    await expect(recover(f.root, f.reference)).rejects.toThrow();
  });
  it("rejects a committed envelope missing a required byte object", async () => {
    const f = await fixture();
    const envelope = JSON.parse(
      await readFile(path.join(f.root, f.reference.artifact.path), "utf8"),
    ) as { objects: unknown[] };
    envelope.objects.pop();
    const artifact = await putEvaluatorEvidenceObject({
      gitRoot: f.root,
      taskQualityRoot: f.quality,
      logicalName: f.reference.artifact.logical_name,
      kind: "recipe_closure",
      extension: ".json",
      mediaType: f.reference.artifact.media_type,
      contents: JSON.stringify(envelope),
    });
    const ref = { ...f.reference, artifact };
    await f.commit(ref);
    await expect(recover(f.root, ref)).rejects.toThrow(
      /Missing or invalid retained Recipe bytes/iu,
    );
  });
  it("rejects committed envelopes whose embedded byte digests do not match", async () => {
    const f = await fixture();
    const envelope = JSON.parse(
      await readFile(path.join(f.root, f.reference.artifact.path), "utf8"),
    ) as { objects: { base64: string }[] };
    envelope.objects[0]!.base64 = Buffer.from("substituted bytes").toString("base64");
    const artifact = await putEvaluatorEvidenceObject({
      gitRoot: f.root,
      taskQualityRoot: f.quality,
      logicalName: f.reference.artifact.logical_name,
      kind: "recipe_closure",
      extension: ".json",
      mediaType: f.reference.artifact.media_type,
      contents: JSON.stringify(envelope),
    });
    const ref = { ...f.reference, artifact };
    await f.commit(ref);
    await expect(recover(f.root, ref)).rejects.toThrow(/object bytes are invalid/iu);
  });
  it("does not treat a historical blob restored only as an untracked file as current retention", async () => {
    const f = await fixture();
    await f.commit();
    const file = path.join(f.root, f.reference.artifact.path);
    const retained = await readFile(file);
    await git(f.root, ["rm", "--", f.reference.artifact.path]);
    await git(f.root, ["commit", "-m", "test remove retention object"]);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, retained);
    await expect(recover(f.root, f.reference)).rejects.toThrow(/not committed/iu);
  });
  it("protects immutable recovered metadata and isolates returned byte copies", async () => {
    const f = await fixture();
    await f.commit();
    const recovered = await recover(f.root, f.reference);
    expect(() => {
      recovered.closure.recipe.version = "forged";
    }).toThrow();
    recovered.readFile("recipe", "tool/binary.dat")[0] = 5;
    expect(Buffer.from(recovered.readFile("recipe", "tool/binary.dat"))).toEqual(f.binary);
    expect(() => recovered.readFile("recipe", "unrelated.md")).toThrow(/Undeclared/iu);
  });
  it("retains binary data larger than the default Git subprocess buffer", async () => {
    const f = await fixture(Buffer.alloc(2 * 1024 * 1024, 255));
    await f.commit();
    const recovered = await recover(f.root, f.reference);
    expect(Buffer.from(recovered.readFile("recipe", "tool/binary.dat"))).toEqual(f.binary);
  });
  it("enforces the existing evidence reader's opt-in byte budget", async () => {
    const f = await fixture();
    await expect(
      readEvaluatorEvidenceObject({
        gitRoot: f.root,
        objectRoot: `${f.reference.task_quality_root}/objects`,
        artifact: f.reference.artifact,
        maxBytes: 1,
      }),
    ).rejects.toThrow(/read budget/iu);
  });
});
