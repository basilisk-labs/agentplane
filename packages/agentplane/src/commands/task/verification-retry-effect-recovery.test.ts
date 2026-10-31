import { createHash } from "node:crypto";
import type * as TaskBackendModule from "../shared/task-backend.js";
import type * as KernelRecordModule from "../../adapters/task-backend/kernel-record.js";
import type * as ImplementationRecoveryModule from "./external-agent-implementation-recovery.js";
import type { cmdVerifyParsed } from "./verify-record.js";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, rename, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { mkGitRepoRoot } from "@agentplane/testkit";
import {
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import {
  mergeTaskDoc,
  parseTaskReadme,
  renderTaskReadme,
  taskCentricDigest,
} from "@agentplaneorg/core/tasks";
import { taskDataToFrontmatter } from "../shared/task-backend.js";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { captureExternalTaskArtifacts } from "./external-agent-task-artifact-baseline.js";
import { reconcileVerificationRetry } from "./verification-retry-effect-recovery.js";
import { verificationRetryContractIdentity } from "./verification-retry-source-proof.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../shared/supervisor-execution-episode.js";
const mocks = vi.hoisted(() => ({
  context: vi.fn(),
  kernel: vi.fn(),
  verification: vi.fn(),
  persist: vi.fn(),
  prSync: vi.fn(),
}));
vi.mock("../shared/task-backend.js", async (original) => ({
  ...(await original<typeof TaskBackendModule>()),
  loadCommandContext: mocks.context,
}));
vi.mock("../../adapters/task-backend/kernel-record.js", async (original) => ({
  ...(await original<typeof KernelRecordModule>()),
  readKernelRecord: mocks.kernel,
}));
vi.mock("./external-agent-implementation-recovery.js", async (original) => ({
  ...(await original<typeof ImplementationRecoveryModule>()),
  resolveImplementationVerificationTask: mocks.verification,
}));
vi.mock("./verify-record.js", () => ({ cmdVerifyParsed: mocks.persist }));
vi.mock("./verify-record-pr-artifacts.js", () => ({
  syncRecordedVerificationArtifacts: mocks.prSync,
}));
const roots: string[] = [];
afterEach(async () => {
  for (const root of roots.splice(0)) await rm(root, { recursive: true, force: true });
});
beforeEach(() => {
  vi.clearAllMocks();
  mocks.prSync.mockResolvedValue(undefined);
});
async function fixture(tail = "", workflow = ".agentplane/tasks") {
  const root = await mkGitRepoRoot();
  roots.push(root);
  const taskId = "202610280001-RETRY1";
  const prefix = `${workflow}/${taskId}`;
  const failedRelative = `${prefix}/supervision/declared-checks.json`;
  await mkdir(path.join(root, prefix, "supervision"), { recursive: true });
  await mkdir(path.join(root, prefix, "quality"), { recursive: true });
  const failed = {
    schema_version: 1,
    kind: "direct_task_declared_checks",
    task_id: taskId,
    status: "failed",
    checks: [{ command: "node check.mjs", exit_code: 1 }],
  };
  await writeFile(path.join(root, failedRelative), JSON.stringify(failed));
  await writeFile(
    path.join(root, prefix, "README.md"),
    "---\nid: " + taskId + "\n---\nFixture Task\n",
  );
  await writeFile(path.join(root, prefix, "quality/old-eval.json"), '{"historical":"retain"}');
  await writeFile(
    path.join(root, "check.mjs"),
    "import{appendFileSync}from'node:fs';appendFileSync('.git/check-count','1');" + tail,
  );
  execFileSync("git", ["add", "."], { cwd: root });
  execFileSync("git", ["commit", "-m", "retry fixture"], { cwd: root });
  const pin = `sha256:${"a".repeat(64)}`;
  const contractId = `sha256:${"c".repeat(64)}`;
  const kernel = {
    digest: pin,
    repository_identity: pin,
    aggregate: {
      id: taskId,
      state: "COMPLETED",
      current_plan: {
        state: "APPROVED",
        work_items: [
          {
            optional: false,
            contract_digest: contractId,
            execution_requirements: { scope_roots: ["check.mjs"] },
          },
        ],
      },
    },
    documents: { contracts: { [contractId]: { verification_commands: ["node check.mjs"] } } },
  };
  const task = {
    id: taskId,
    task_kind: "code",
    mutation_scope: "code",
    verify: ["node check.mjs"],
    quality_review: { state: "pass", evaluated_sha: "old" },
    verification: { state: "needs_rework" },
    extensions: { task_kernel: kernel },
  };
  await mkdir(path.join(root, prefix, "pr"), { recursive: true });
  const prMetaPath = path.join(root, prefix, "pr/meta.json");
  const prBodyPath = path.join(root, prefix, "pr/github-body.md");
  await writeFile(prMetaPath, "retained provider identity");
  await writeFile(prBodyPath, "retained PR body");
  execFileSync("git", ["add", "."], { cwd: root });
  execFileSync("git", ["commit", "-m", "retained PR fixture"], { cwd: root });
  const sourceHead = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    encoding: "utf8",
  }).trim();
  const command = {
    memo: {},
    config: { paths: { workflow_dir: workflow } },
    resolvedProject: { gitRoot: root },
    taskBackend: { getTask: vi.fn(() => Promise.resolve(task)) },
  };
  mocks.context.mockResolvedValue(command);
  mocks.kernel.mockImplementation(() => ({ kind: "canonical", record: kernel, task }));
  mocks.verification.mockImplementation(() =>
    Promise.resolve({
      task,
      snapshot: {
        evaluated_sha: sourceHead,
        execution_contract: {},
        changed_paths: ["check.mjs"],
        inherited_paths: [],
        repository_effects: ["source_code"],
      },
    }),
  );
  mocks.persist.mockImplementation(async (opts: Parameters<typeof cmdVerifyParsed>[0]) => {
    expect(opts.projectionPolicy).toBe("task-only");
    const next = { ...task, verification: { state: "ok", updated_at: "2026-10-28T09:00:00.000Z" } };
    await opts.beforePersist!({ current: structuredClone(task) as never, next: next as never });
    Object.assign(task, next);
    const file = path.join(root, prefix, "README.md");
    const readme = parseTaskReadme(await readFile(file, "utf8"));
    const rendered = renderTaskReadme(
      { ...readme.frontmatter, ...taskDataToFrontmatter(next as never) },
      mergeTaskDoc(readme.body, ""),
    );
    await writeFile(file, rendered.endsWith("\n") ? rendered : `${rendered}\n`);
    return 0;
  });
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: root,
    task_id: taskId,
  });
  const created = createSupervisorExecutionEpisodeJournal({
    task_id: taskId,
    task_revision: 1,
    state_fingerprint_digest: pin,
    budget: {
      max_episodes: 10,
      max_agent_runs: null,
      max_input_tokens: null,
      max_output_tokens: null,
      max_total_tokens: null,
      max_wall_time_ms: null,
      max_changed_files: null,
      max_diff_lines: null,
      max_no_progress_episodes: null,
    },
  });
  const started = startSupervisorExecutionEpisode({
    journal: created,
    role: "EXECUTOR",
    kind: "cli_operation",
    operation_identity: { direct_task_operation: "task_verify" },
    precondition_fingerprint_digest: pin,
    authority_ref: "direct-task-supervisor:task_verify",
    authority_digest: pin,
    effect_ref: "task_verify",
  });
  if (started.status !== "started") throw new Error("fixture admission failed");
  const journal = completeSupervisorExecutionEpisode({
    journal: started.journal,
    operation_key: started.operation_key,
    result: {
      direct_task_operation: "task_verify",
      result: { verification: "needs_rework", declared_checks: failedRelative },
    },
  });
  await createSupervisorEpisodeStore(journalPath).write(journal);
  const request = {
    schema_version: 1,
    kind: "verification_retry_request",
    task_id: taskId,
    repository_identity: pin,
    kernel_digest: pin,
    source_sha: sourceHead,
    head_sha: sourceHead,
    check_contract_digest: verificationRetryContractIdentity(task as never),
    failed_operation_key: started.operation_key,
    failed_checks_digest: taskCentricDigest(failed),
  };
  const inputPath = path.join(root, ".git/retry-request.json");
  await writeFile(inputPath, JSON.stringify(request));
  const opts = {
    command,
    task_id: taskId,
    input_path: inputPath,
    canonical_record: kernel,
    decide: () =>
      Promise.resolve({
        task: { id: taskId },
        workflowMode: "branch_pr",
        workspace: { taskWorktreePath: root },
      }),
  };
  return {
    root,
    task,
    opts: opts as never,
    request,
    inputPath,
    kernel,
    journalPath,
    failedPath: path.join(root, failedRelative),
    evalPath: path.join(root, prefix, "quality/old-eval.json"),
    prMetaPath,
    prBodyPath,
  };
}
describe.each([".agentplane/tasks", "operations/native/tasks"])(
  "verification retry in workflow %s",
  (workflow) => {
    it("runs real checks once and preserves terminal Kernel, failed journal, old checks and EVAL", async () => {
      const f = await fixture("", workflow);
      const before = await Promise.all([
        readFile(f.journalPath, "utf8"),
        readFile(f.failedPath, "utf8"),
        readFile(f.evalPath, "utf8"),
      ]);
      const kernel = JSON.stringify(f.kernel);
      const result = await reconcileVerificationRetry(f.opts);
      expect(result.result).toMatchObject({ status: "passed", fresh_evaluator_required: true });
      expect(f.task.verification.state).toBe("ok");
      expect(JSON.stringify(f.kernel)).toBe(kernel);
      expect(
        await Promise.all([
          readFile(f.journalPath, "utf8"),
          readFile(f.failedPath, "utf8"),
          readFile(f.evalPath, "utf8"),
        ]),
      ).toEqual(before);
      const replay = await reconcileVerificationRetry(f.opts);
      expect(replay.replay).toBe(true);
      expect(await readFile(path.join(f.root, ".git/check-count"), "utf8")).toBe("1");
      expect(mocks.persist).toHaveBeenCalledTimes(1);
      expect(mocks.prSync).not.toHaveBeenCalled();
      expect(await readFile(f.prMetaPath, "utf8")).toBe("retained provider identity");
      expect(await readFile(f.prBodyPath, "utf8")).toBe("retained PR body");
    });
    it.each([
      "source_sha",
      "head_sha",
      "kernel_digest",
      "check_contract_digest",
      "failed_operation_key",
      "failed_checks_digest",
    ])("refuses changed %s without running a check", async (field) => {
      const f = await fixture("", workflow);
      await writeFile(
        f.inputPath,
        JSON.stringify({
          ...f.request,
          [field]: field.endsWith("sha") ? "f".repeat(40) : `sha256:${"f".repeat(64)}`,
        }),
      );
      await expect(reconcileVerificationRetry(f.opts)).rejects.toThrow();
      expect(mocks.persist).not.toHaveBeenCalled();
      await expect(readFile(path.join(f.root, ".git/check-count"))).rejects.toMatchObject({
        code: "ENOENT",
      });
    });
    it("does not execute again after an interruption before verification persistence", async () => {
      const f = await fixture("", workflow);
      mocks.persist.mockRejectedValue(new Error("interrupted persistence"));
      await expect(reconcileVerificationRetry(f.opts)).rejects.toThrow("interrupted persistence");
      await expect(reconcileVerificationRetry(f.opts)).rejects.toThrow("no final receipt");
      expect(await readFile(path.join(f.root, ".git/check-count"), "utf8")).toBe("1");
    });

    it("retains a real failed retry and never promotes it to PASS", async () => {
      const f = await fixture("process.exit(1);", workflow);
      const result = await reconcileVerificationRetry(f.opts);
      expect(result.result).toMatchObject({ status: "failed" });
      expect(f.task.verification.state).toBe("needs_rework");
      expect(mocks.persist).not.toHaveBeenCalled();
      expect(mocks.prSync).not.toHaveBeenCalled();
      expect(await readFile(f.prMetaPath, "utf8")).toBe("retained provider identity");
      expect(await readFile(f.prBodyPath, "utf8")).toBe("retained PR body");
      const replay = await reconcileVerificationRetry(f.opts);
      expect(replay.replay).toBe(true);
      expect(await readFile(path.join(f.root, ".git/check-count"), "utf8")).toBe("1");
    });

    it("admits one executor when two retry callers compete", async () => {
      const f = await fixture("await new Promise(r=>setTimeout(r,300));", workflow);
      const outcomes = await Promise.allSettled([
        reconcileVerificationRetry(f.opts),
        reconcileVerificationRetry(f.opts),
      ]);
      expect(outcomes.filter((item) => item.status === "fulfilled")).toHaveLength(1);
      expect(outcomes.filter((item) => item.status === "rejected")).toHaveLength(1);
      expect(await readFile(path.join(f.root, ".git/check-count"), "utf8")).toBe("1");
    });

    it.each(["commands", "verification", "old-eval"])(
      "refuses a completed replay after %s drift",
      async (kind) => {
        const f = await fixture("", workflow);
        await reconcileVerificationRetry(f.opts);
        if (kind === "commands") f.task.verify = ["node --version"];
        if (kind === "verification") f.task.verification = { state: "needs_rework" };
        if (kind === "old-eval") await writeFile(f.evalPath, "changed historical review");
        await expect(reconcileVerificationRetry(f.opts)).rejects.toThrow();
        expect(await readFile(path.join(f.root, ".git/check-count"), "utf8")).toBe("1");
      },
    );

    it("reconciles the durable prepared native afterimage after persistence interruption", async () => {
      const f = await fixture("", workflow);
      const persist = mocks.persist.getMockImplementation()!;
      mocks.persist.mockImplementationOnce(async (opts) => {
        await persist(opts);
        throw new Error("interrupted AFTER native persistence");
      });
      await expect(reconcileVerificationRetry(f.opts)).rejects.toThrow("AFTER native persistence");
      expect(f.task.verification.state).toBe("ok");
      const recovered = await reconcileVerificationRetry(f.opts);
      expect(recovered.replay).toBe(true);
      expect(recovered.result).toMatchObject({ status: "passed", fresh_evaluator_required: true });
      expect(await readFile(path.join(f.root, ".git/check-count"), "utf8")).toBe("1");
      expect(mocks.persist).toHaveBeenCalledTimes(1);
      expect(mocks.prSync).not.toHaveBeenCalled();
      expect(await readFile(f.prMetaPath, "utf8")).toBe("retained provider identity");
      expect(await readFile(f.prBodyPath, "utf8")).toBe("retained PR body");
    });

    it("does not treat a caller pin as approval for an added command", async () => {
      const f = await fixture("", workflow);
      f.task.verify = ["node check.mjs", "node --version"];
      await writeFile(
        f.inputPath,
        JSON.stringify({
          ...f.request,
          check_contract_digest: verificationRetryContractIdentity(f.task as never),
        }),
      );
      await expect(reconcileVerificationRetry(f.opts)).rejects.toThrow(
        "immutable approved WorkItem contracts",
      );
      await expect(readFile(path.join(f.root, ".git/check-count"))).rejects.toMatchObject({
        code: "ENOENT",
      });
    });

    it.each(["meta", "body"])(
      "refuses %s tampering after native persistence interruption without PR overwrite",
      async (kind) => {
        const f = await fixture("", workflow);
        const persist = mocks.persist.getMockImplementation()!;
        mocks.persist.mockImplementationOnce(async (opts) => {
          await persist(opts);
          throw new Error("interrupted AFTER native persistence");
        });
        await expect(reconcileVerificationRetry(f.opts)).rejects.toThrow(
          "AFTER native persistence",
        );
        const file = kind === "meta" ? f.prMetaPath : f.prBodyPath;
        const tampered =
          kind === "meta" ? '{"provider":{"repository":"foreign"}}' : "foreign PR body";
        await writeFile(file, tampered);
        await expect(reconcileVerificationRetry(f.opts)).rejects.toThrow();
        expect(await readFile(file, "utf8")).toBe(tampered);
        expect(mocks.prSync).not.toHaveBeenCalled();
        expect(mocks.persist).toHaveBeenCalledTimes(1);
        expect(await readFile(path.join(f.root, ".git/check-count"), "utf8")).toBe("1");
      },
    );
  },
);

const artifactTask = "202610280002-ARTF01";
it.each([".agentplane/tasks", "operations/native/tasks"])(
  "captures configured artifacts and missing roots: %s",
  async (workflow) => {
    const root = await mkGitRepoRoot();
    roots.push(root);
    expect(await captureExternalTaskArtifacts(root, artifactTask, workflow)).toEqual({});
    const taskRoot = path.join(root, workflow, artifactTask);
    await mkdir(taskRoot, { recursive: true });
    await writeFile(path.join(taskRoot, "README.md"), "native artifact");
    const entries = await captureExternalTaskArtifacts(root, artifactTask, workflow);
    expect(entries["README.md"]).toMatch(/^file:[0-9]+:[a-f0-9]{64}$/u);
  },
);
it.each(["../outside", "/absolute", "C:\\absolute", "nested/../../outside"])(
  "refuses workflow escape before checks: %s",
  async (workflow) => {
    const root = await mkGitRepoRoot();
    roots.push(root);
    await expect(captureExternalTaskArtifacts(root, artifactTask, workflow)).rejects.toThrow();
    await expect(readFile(path.join(root, ".git/check-count"))).rejects.toMatchObject({
      code: "ENOENT",
    });
  },
);
it.each(["operations", "operations/native", "operations/native/tasks"])(
  "refuses an intermediate workflow symlink: %s",
  async (ancestor) => {
    const root = await mkGitRepoRoot(),
      outside = await mkGitRepoRoot();
    roots.push(root, outside);
    await mkdir(path.join(root, "operations/native/tasks", artifactTask), { recursive: true });
    const held = path.join(outside, "held");
    await rename(path.join(root, ancestor), held);
    await symlink(held, path.join(root, ancestor), "dir");
    await expect(
      captureExternalTaskArtifacts(root, artifactTask, "operations/native/tasks"),
    ).rejects.toThrow(/symlink/u);
    await expect(readFile(path.join(root, ".git/check-count"))).rejects.toMatchObject({
      code: "ENOENT",
    });
  },
);
it("hashes artifact symlink targets without traversing them", async () => {
  const root = await mkGitRepoRoot(),
    outside = await mkGitRepoRoot();
  roots.push(root, outside);
  const taskRoot = path.join(root, "operations/native/tasks", artifactTask);
  await mkdir(taskRoot, { recursive: true });
  const target = path.join(outside, "private.txt");
  await writeFile(target, "unchanged private bytes");
  await symlink(target, path.join(taskRoot, "linked.txt"));
  await symlink(outside, path.join(taskRoot, "linked-directory"), "dir");
  const entries = await captureExternalTaskArtifacts(root, artifactTask, "operations/native/tasks");
  expect(entries["linked.txt"]).toMatch(
    new RegExp(`^link:[0-9]+:${createHash("sha256").update(target).digest("hex")}$`, "u"),
  );
  expect(Object.keys(entries)).toEqual(["linked-directory", "linked.txt"]);
  expect(await readFile(target, "utf8")).toBe("unchanged private bytes");
});
