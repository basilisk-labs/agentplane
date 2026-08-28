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
import { resolveObservedVerificationChangedPaths } from "./verify-record-observed-changes.js";
import { resolveEvaluatorReviewTarget } from "../evaluator/evaluator-qualification-review.js";
import { resolveTaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import { mkGitRepoRootWithCommit, writeDefaultConfig } from "@agentplane/testkit";
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
  const root = await mkGitRepoRootWithCommit();
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

  it.each(["task", "base"] as const)(
    "strengthens a legacy branch task contract from the %s checkout",
    async (checkout) => {
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
      await execFileAsync("git", ["add", "-f", `.agentplane/tasks/${taskId}/README.md`], {
        cwd: root,
      });
      await writeFile(
        path.join(root, "package.json"),
        '{"name":"contract-diff-fixture"}\n',
        "utf8",
      );
      await execFileAsync("git", ["add", "package.json"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "test: seed contract diff fixture"], {
        cwd: root,
      });
      await execFileAsync("git", ["branch", "-M", baseBranch], { cwd: root });
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

      const { stdout: implementationOutput } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      const implementationSha = implementationOutput.trim();
      const initial = await ctx.taskBackend.getTask(taskId);
      if (!initial) throw new Error("missing branch verification fixture");
      await ctx.taskBackend.writeTask?.({
        ...initial,
        extensions: { ...initial.extensions, implementation_commit: { hash: implementationSha } },
      });
      await execFileAsync("git", ["add", "-f", `.agentplane/tasks/${taskId}`], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "test: persist task branch snapshot"], {
        cwd: root,
      });
      const { stdout: taskHeadOutput } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      if (checkout === "base") {
        await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
        await writeFile(path.join(root, "unrelated.ts"), "export const unrelated = true;\n");
        await execFileAsync("git", ["add", "unrelated.ts"], { cwd: root });
        await execFileAsync("git", ["commit", "-m", "test: independent base change"], {
          cwd: root,
        });
      }
      const { stdout: checkoutHead } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });

      const verify = () =>
        cmdVerifyParsed({
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
      await verify();
      await verify();

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
      const recordNames = await readdir(verificationDir);
      expect(recordNames).toHaveLength(2);
      for (const recordName of recordNames) {
        const record: unknown = JSON.parse(
          await readFile(path.join(verificationDir, recordName), "utf8"),
        );
        expect(record).toMatchObject({
          implementation_sha: implementationSha,
          input: { verification_contract_digest: contract?.digest },
        });
      }
      const currentHead = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
      const currentTaskHead = await execFileAsync("git", ["rev-parse", taskBranch], { cwd: root });
      expect(currentHead.stdout).toBe(checkoutHead);
      expect(currentTaskHead.stdout).toBe(taskHeadOutput);
    },
  );

  it.each(["policy", "lifecycle"] as const)(
    "keeps verification and evaluator targets aligned after a %s commit",
    async (change) => {
      const root = await makeRepo();
      const taskId = "202602050900-V1F4T";
      await addTask(root, taskId);
      const git = async (...args: string[]) => {
        const result = await execFileAsync("git", args, { cwd: root });
        return result.stdout.trim();
      };
      const baseSha = await git("rev-parse", "HEAD");
      await writeFile(path.join(root, "feature.ts"), "export const feature = true;\n");
      await git("add", "feature.ts");
      await git("commit", "-m", "test: reviewed implementation");
      const implementationSha = await git("rev-parse", "HEAD");
      const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
      ctx.config.workflow_mode = "direct";
      const initial = await ctx.taskBackend.getTask(taskId);
      if (!initial) throw new Error("missing target continuity fixture");
      await ctx.taskBackend.writeTask?.({
        ...initial,
        extensions: {
          ...initial.extensions,
          implementation_commit: { hash: implementationSha },
          workflow_route_baseline: { start_head_sha: baseSha },
        },
      });
      mocks.writeJsonStableIfChanged.mockImplementation(async (filePath, value) => {
        const resolvedPath = String(filePath);
        await mkdir(path.dirname(resolvedPath), { recursive: true });
        await writeFile(resolvedPath, `${JSON.stringify(value)}\n`, "utf8");
        return true;
      });
      const verify = () =>
        cmdVerifyParsed({
          ctx,
          cwd: root,
          taskId,
          state: "ok",
          by: "REVIEWER",
          note: "Target continuity checks passed.",
          details:
            "Command: bun test\nResult: pass\nEvidence: target continuity fixture passed\nScope: complete task diff",
          quiet: true,
        });
      await verify();
      const verificationDir = path.join(root, ".agentplane", "tasks", taskId, "verification");
      const initialRecords = new Set(await readdir(verificationDir));
      const policyPath = ".agentplane/policy/incidents.md";
      if (change === "policy") {
        await mkdir(path.dirname(path.join(root, policyPath)), { recursive: true });
        await writeFile(path.join(root, policyPath), "# Recorded incident\n");
        await git("add", "-f", policyPath);
      } else {
        const evidencePath = `.agentplane/tasks/${taskId}/evidence/closeout.json`;
        await mkdir(path.dirname(path.join(root, evidencePath)), { recursive: true });
        await writeFile(path.join(root, evidencePath), '{"kind":"closeout-evidence"}\n');
        await git("add", "-f", evidencePath);
      }
      await git("commit", "-m", `test: ${change} after implementation`);
      const changedHead = await git("rev-parse", "HEAD");
      const expectedSha = change === "policy" ? changedHead : implementationSha;
      const expectedPaths = change === "policy" ? [policyPath, "feature.ts"] : ["feature.ts"];
      for (let attempt = 0; attempt < 2; attempt += 1) {
        await verify();
        const task = await ctx.taskBackend.getTask(taskId);
        if (!task) throw new Error("missing verified target continuity fixture");
        const execution = await resolveTaskExecutionContext({
          ctx,
          tasks: [task],
          primaryTaskId: taskId,
          authoritativeTaskSource: "base_checkout",
        });
        const review = await resolveEvaluatorReviewTarget({
          ctx,
          task,
          reason: "preparation",
          execution,
        });
        expect(review.evaluatedSha).toBe(expectedSha);
        expect(task.execution_contract?.verification.contract?.observed.changed_files).toEqual(
          expectedPaths,
        );
        expect(task.extensions?.implementation_commit).toEqual({ hash: implementationSha });
        expect(await git("rev-parse", "HEAD")).toBe(changedHead);
      }
      const allRecords = await readdir(verificationDir);
      const newRecords = allRecords.filter((name) => !initialRecords.has(name));
      expect(newRecords).toHaveLength(2);
      for (const name of newRecords) {
        const record = JSON.parse(await readFile(path.join(verificationDir, name), "utf8")) as {
          implementation_sha: string;
        };
        expect(record.implementation_sha).toBe(expectedSha);
      }
    },
  );

  it("observes the complete direct task diff from the frozen execution base", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-V1F4B";
    await addTask(root, taskId);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed direct task base"], { cwd: root });
    const { stdout: baseShaOutput } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const baseSha = baseShaOutput.trim();
    const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
    const task = await ctx.taskBackend.getTask(taskId);
    if (!task) throw new Error("missing direct task fixture");
    await ctx.taskBackend.writeTask?.({
      ...task,
      extensions: {
        ...task.extensions,
        workflow_route_baseline: {
          start_head_sha: baseSha,
        },
      },
    });
    await mkdir(path.join(root, "packages", "app"), { recursive: true });
    await writeFile(path.join(root, "packages", "app", "first.ts"), "export const first = 1;\n");
    await execFileAsync("git", ["add", "packages/app/first.ts"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: first direct task change"], { cwd: root });
    await writeFile(path.join(root, "packages", "app", "second.ts"), "export const second = 2;\n");
    await execFileAsync("git", ["add", "packages/app/second.ts"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: second direct task change"], { cwd: root });
    const { stdout: evaluatedShaOutput } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const changedPaths = await resolveObservedVerificationChangedPaths({
      ctx,
      evaluatedSha: evaluatedShaOutput.trim(),
      taskId,
      artifactTaskIds: [taskId],
      execution: {
        schema_version: 1,
        primary_task_id: taskId,
        task_ids: [taskId],
        repository_mode: "direct",
        selected_mode: "direct",
        requested_mode: "direct",
        route_source: "execution_contract",
        reason_codes: [],
        base_ref: "main",
        base_sha: baseSha,
        authoritative_task_source: "base_checkout",
      },
    });

    expect(changedPaths).toEqual(["packages/app/first.ts", "packages/app/second.ts"]);
  });

  it("uses the single-commit fallback when a legacy direct base was not frozen", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-V1F5";
    await addTask(root, taskId);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed legacy direct task"], { cwd: root });
    await mkdir(path.join(root, "packages", "app"), { recursive: true });
    await writeFile(path.join(root, "packages", "app", "first.ts"), "export const first = 1;\n");
    await execFileAsync("git", ["add", "packages/app/first.ts"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: first legacy direct change"], {
      cwd: root,
    });
    await writeFile(path.join(root, "packages", "app", "second.ts"), "export const second = 2;\n");
    await execFileAsync("git", ["add", "packages/app/second.ts"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: second legacy direct change"], {
      cwd: root,
    });
    const { stdout: evaluatedShaOutput } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const evaluatedSha = evaluatedShaOutput.trim();
    const ctx = await loadCommandContext({ cwd: root, rootOverride: null });

    const changedPaths = await resolveObservedVerificationChangedPaths({
      ctx,
      evaluatedSha,
      taskId,
      artifactTaskIds: [taskId],
      execution: {
        schema_version: 1,
        primary_task_id: taskId,
        task_ids: [taskId],
        repository_mode: "direct",
        selected_mode: "direct",
        requested_mode: "direct",
        route_source: "legacy_migration",
        reason_codes: [],
        base_ref: "main",
        base_sha: evaluatedSha,
        authoritative_task_source: "base_checkout",
      },
    });

    expect(changedPaths).toEqual(["packages/app/second.ts"]);
  });
});
