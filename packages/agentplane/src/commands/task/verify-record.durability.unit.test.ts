import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";

import * as taskBackend from "../../backends/task-backend.js";
import { defaultConfig } from "@agentplaneorg/core/config";
import { cmdTaskAdd } from "../workflow.js";
import { loadCommandContext } from "../shared/task-backend.js";
import * as taskMutation from "../shared/task-mutation.js";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";
import { cmdVerifyParsed } from "./verify-record.js";
import { mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { execFileAsync } from "@agentplaneorg/core/process";

const mocks = vi.hoisted(() => ({
  writeJsonStableIfChanged: vi.fn(),
}));

vi.mock("../../shared/write-if-changed.js", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return { ...actual, writeJsonStableIfChanged: mocks.writeJsonStableIfChanged };
});

async function makeRepo(): Promise<string> {
  const root = await mkGitRepoRoot();
  await writeDefaultConfig(root);
  return root;
}

async function addTask(root: string, taskId: string): Promise<void> {
  await cmdTaskAdd({
    cwd: root,
    taskIds: [taskId],
    title: "Task",
    description: "Desc",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    tags: ["nodejs"],
    dependsOn: [],
    verify: [],
    commentAuthor: null,
    commentBody: null,
  });
}

describe("task verification durability", () => {
  beforeEach(() => {
    mocks.writeJsonStableIfChanged.mockReset();
  });

  it("fails closed when durable verification record creation fails", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-V1F4F";
    await addTask(root, taskId);
    const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
    mocks.writeJsonStableIfChanged.mockRejectedValueOnce(new Error("disk full"));

    await expect(
      cmdVerifyParsed({
        ctx,
        cwd: root,
        rootOverride: undefined,
        taskId,
        state: "ok",
        by: "REVIEWER",
        note: "Looks good",
        details:
          "Check: task_outcome\nCommand: bun test\nResult: pass\nEvidence: focused tests passed\nScope: task outcome",
        quiet: true,
      }),
    ).rejects.toThrow("disk full");

    const { backend } = await taskBackend.loadTaskBackend({ cwd: root, rootOverride: null });
    const task = await backend.getTask(taskId);
    expect(task?.verification?.state).toBe("pending");
    await expect(
      readdir(path.join(root, ".agentplane", "tasks", taskId, "verification")),
    ).resolves.toEqual([]);
  });

  it("removes an uncommitted record when the guarded task mutation fails", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-V1F4G";
    await addTask(root, taskId);
    const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
    const current = await ctx.taskBackend.getTask(taskId);
    if (!current) throw new Error("missing task fixture");
    mocks.writeJsonStableIfChanged.mockImplementationOnce(async (filePath, value) => {
      const resolvedPath = String(filePath);
      await mkdir(path.dirname(resolvedPath), { recursive: true });
      await writeFile(resolvedPath, `${JSON.stringify(value)}\n`, "utf8");
      return true;
    });
    const mutation = vi
      .spyOn(taskMutation, "applyTaskMutation")
      .mockImplementationOnce(async (options) => {
        await options.build(current);
        throw new Error("task write failed");
      });

    await expect(
      cmdVerifyParsed({
        ctx,
        cwd: root,
        rootOverride: undefined,
        taskId,
        state: "ok",
        by: "REVIEWER",
        note: "Looks good",
        details:
          "Check: task_outcome\nCommand: bun test\nResult: pass\nEvidence: focused tests passed\nScope: task outcome",
        quiet: true,
      }),
    ).rejects.toThrow("task write failed");

    await expect(
      readdir(path.join(root, ".agentplane", "tasks", taskId, "verification")),
    ).resolves.toEqual([]);
    const task = await ctx.taskBackend.getTask(taskId);
    expect(task?.verification?.state).toBe("pending");
    mutation.mockRestore();
  });

  it("persists verification observations with the transition in one task write", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-V1F4H";
    await addTask(root, taskId);
    const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
    ctx.config.workflow_mode = "direct";
    const current = await ctx.taskBackend.getTask(taskId);
    if (!current) throw new Error("missing task fixture");
    const executionContract = resolveTaskExecutionContract({
      config: defaultConfig(),
      task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
      declaration: {
        schema_version: 1,
        preferred_mode: "direct",
        scope_roots: ["packages/app"],
        repository_effects: ["repository_write", "source_code"],
        external_effects: [],
        uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["localized implementation"],
      },
    });
    await ctx.taskBackend.writeTask?.({
      ...current,
      status: "DOING",
      execution_contract: executionContract,
      doc: [
        "## Summary",
        "x",
        "",
        "## Verify Steps",
        "Run the focused check.",
        "",
        "## Verification",
        "<!-- BEGIN VERIFICATION RESULTS -->",
        "<!-- END VERIFICATION RESULTS -->",
      ].join("\n"),
    });
    const before = await ctx.taskBackend.getTask(taskId);
    if (!before) throw new Error("missing persisted task fixture");

    await cmdVerifyParsed({
      ctx,
      cwd: root,
      rootOverride: undefined,
      taskId,
      state: "ok",
      by: "REVIEWER",
      note: "Focused check passed.",
      details:
        "Check: affected_unit_integration\nCommand: bun test focused\nResult: pass\nEvidence: 1 test passed\nScope: focused behavior\n\nCheck: critical_paths\nCommand: bun test focused\nResult: pass\nEvidence: 1 test passed\nScope: critical behavior\n\nCheck: task_outcome\nCommand: bun test focused\nResult: pass\nEvidence: 1 test passed\nScope: task outcome",
      quiet: true,
    });

    const task = await ctx.taskBackend.getTask(taskId);
    expect(task).toMatchObject({
      revision: before.revision + 1,
      verification: { state: "ok" },
      execution_contract: {
        observed: {
          verification_results: [
            { id: "recorded-check-1", result: "pass" },
            { id: "recorded-check-2", result: "pass" },
            { id: "recorded-check-3", result: "pass" },
          ],
        },
      },
    });
  });

  it("materializes a Verification Contract for an already-active legacy task", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-V1F4";
    await addTask(root, taskId);
    const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
    ctx.config.workflow_mode = "direct";

    await cmdVerifyParsed({
      ctx,
      cwd: root,
      rootOverride: undefined,
      taskId,
      state: "ok",
      by: "REVIEWER",
      note: "Legacy task outcome passed.",
      details:
        "Check: task_outcome\nCommand: bun test\nResult: pass\nEvidence: focused tests passed\nScope: task outcome",
      quiet: true,
    });

    const task = await ctx.taskBackend.getTask(taskId);
    expect(task?.execution_contract).toMatchObject({
      source: "legacy_compatibility",
      verification: {
        contract: {
          schema_version: 2,
          selected_checks: ["task_outcome"],
        },
      },
    });
  });

  it("strengthens a legacy branch task contract from the exact implementation diff", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-V1F4D";
    mocks.writeJsonStableIfChanged.mockImplementation(async (filePath, value) => {
      const resolvedPath = String(filePath);
      await mkdir(path.dirname(resolvedPath), { recursive: true });
      await writeFile(resolvedPath, `${JSON.stringify(value)}\n`, "utf8");
      return true;
    });
    await addTask(root, taskId);
    const baseBranch = "main";
    await writeFile(path.join(root, "package.json"), '{"name":"contract-diff-fixture"}\n', "utf8");
    await execFileAsync("git", ["add", "package.json"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed contract diff fixture"], {
      cwd: root,
    });
    const taskBranch = `task/${taskId}/contract-diff`;
    await execFileAsync("git", ["config", "--local", "agentplane.baseBranch", baseBranch], {
      cwd: root,
    });
    await execFileAsync("git", ["checkout", "-b", taskBranch], { cwd: root });
    await mkdir(path.join(root, ".github", "workflows"), { recursive: true });
    await mkdir(path.join(root, "schemas"), { recursive: true });
    await writeFile(path.join(root, ".github", "workflows", "ci.yml"), "name: CI\n", "utf8");
    await writeFile(path.join(root, "schemas", "task.schema.json"), "{}\n", "utf8");
    await execFileAsync("git", ["add", ".github/workflows/ci.yml", "schemas/task.schema.json"], {
      cwd: root,
    });
    await execFileAsync("git", ["commit", "-m", "test: central implementation diff"], {
      cwd: root,
    });
    const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
    ctx.config.workflow_mode = "branch_pr";
    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "meta.json"),
      `${JSON.stringify({
        schema_version: 1,
        task_id: taskId,
        branch: taskBranch,
        base: baseBranch,
        created_at: "2026-02-05T09:00:00.000Z",
        updated_at: "2026-02-05T09:00:00.000Z",
        status: "OPEN",
      })}\n`,
      "utf8",
    );
    await writeFile(path.join(prDir, "review.md"), "# Review\n", "utf8");

    await cmdVerifyParsed({
      ctx,
      cwd: root,
      rootOverride: undefined,
      taskId,
      state: "ok",
      by: "REVIEWER",
      note: "Full central-path checks passed.",
      details:
        "Command: bun test\nResult: pass\nEvidence: full suite passed\nScope: exact implementation diff",
      quiet: true,
    });

    const task = await ctx.taskBackend.getTask(taskId);
    const contract = task?.execution_contract?.verification.contract;
    expect(task?.execution_contract?.observed.changed_paths).toEqual([
      ".github/workflows/ci.yml",
      "schemas/task.schema.json",
    ]);
    expect(contract).toMatchObject({
      observed: {
        changed_files: [".github/workflows/ci.yml", "schemas/task.schema.json"],
        changed_components: [".github", "schemas"],
      },
      requires_full_regression: true,
    });
    expect(contract?.selected_checks).toContain("full_regression");
    expect(contract?.selected_checks).toContain("hosted_integration");
    expect(contract?.escalation_reasons).toContain("central_path:.github/workflows/ci.yml");
    expect(contract?.escalation_reasons).toContain("central_path:schemas/task.schema.json");
    expect(contract?.escalation_reasons).toContain("effect_ci");
    expect(contract?.escalation_reasons).toContain("effect_schema");

    const verificationDir = path.join(root, ".agentplane", "tasks", taskId, "verification");
    const [recordName] = await readdir(verificationDir);
    if (!recordName) throw new Error("missing verification record");
    const record = JSON.parse(await readFile(path.join(verificationDir, recordName), "utf8")) as {
      input?: { verification_contract_digest?: string };
    };
    expect(record.input?.verification_contract_digest).toBe(contract?.digest);
  });
});
