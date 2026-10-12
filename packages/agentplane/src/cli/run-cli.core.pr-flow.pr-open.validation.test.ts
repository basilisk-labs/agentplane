import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  aggregate,
  authority,
  plan,
} from "../../../core/src/tasks/task-kernel/kernel.test-fixtures.js";
import { makeKernelRecord, readKernelRecord } from "../adapters/task-backend/kernel-record.js";
import type { TaskData } from "../backends/task-backend.js";
import type * as TaskBackend from "../commands/shared/task-backend.js";
import { resolveLogicalRepositoryIdentity } from "../commands/task/execution-authority-context.js";
import { observeKernelRepository } from "../runner/observation/kernel-repository.js";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe } from "vitest";

import {
  PR_FLOW_INTEGRATION_TIMEOUT_MS,
  PR_FLOW_LONG_TIMEOUT_MS,
  approveTaskPlan,
  captureStdIO,
  chmod,
  cleanGitEnv,
  commitAll,
  commitPathsIfChanged,
  configureGitUser,
  configurePushableOrigin,
  createUpgradeBundle,
  defaultConfig,
  execFile,
  expect,
  extractTaskSuffix,
  filterAgentsByWorkflow,
  getAgentplaneHome,
  gitBranchExists,
  it,
  loadAgentTemplates,
  loadAgentsTemplate,
  mkdir,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  mkdtemp,
  os,
  path,
  pathExists,
  promisify,
  prompts,
  readFile,
  readFileSync,
  readTask,
  realpath,
  readdir,
  recordVerificationOk,
  renderTaskReadme,
  resolveUpdateCheckCachePath,
  rm,
  runCli,
  runCliSilent,
  setConcreteVerifySteps,
  stageGitignoreIfPresent,
  stubTaskBackend,
  validateCommitSubject,
  vi,
  writeConfig,
  writeDefaultConfig,
  writeFile,
  installFakeGhPrApi,
  installFakeGhPrApiRequiringPublishedPacketHead,
  installFakeGhPrLookup,
  type ResolvedProject,
} from "@agentplane/testkit/cli-core-pr-flow";

describe(
  "runCli pr open flow validation gates",
  { timeout: PR_FLOW_INTEGRATION_TIMEOUT_MS },
  () => {
    it("pr open respects --sync-only and skips remote GitHub PR creation", async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await configureGitUser(root);
      const execFileAsync = promisify(execFile);
      await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
      await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
      await execFileAsync(
        "git",
        ["remote", "add", "origin", "https://github.com/example/repo.git"],
        {
          cwd: root,
          env: cleanGitEnv(),
        },
      );
      await configurePushableOrigin(root);
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "PR open sync only",
          "--description",
          "PR open should allow local-only artifact sync without remote creation",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "github",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = ioTask.stdout.trim();
      } finally {
        ioTask.restore();
      }

      const branch = `task/${taskId}/sync-only`;
      await execFileAsync("git", ["checkout", "-b", branch], { cwd: root, env: cleanGitEnv() });
      await execFileAsync("git", ["commit", "--allow-empty", "-m", "chore branch sync seed"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      const { fakeBin, logPath } = await installFakeGhPrApi({
        scenarioName: "open-sync-only",
        branch,
        createResponse: {
          number: 987,
          html_url: "https://github.com/example/repo/pull/987",
          state: "open",
          merged_at: null,
          merge_commit_sha: null,
          head: { sha: "remote-head-sha" },
          base: { ref: "main" },
        },
      });
      const originalPath = process.env.PATH;
      process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
      process.env.AGENTPLANE_GH_LOG = logPath;

      const io = captureStdIO();
      try {
        const code = await runCli([
          "pr",
          "open",
          taskId,
          "--author",
          "CODER",
          "--branch",
          branch,
          "--sync-only",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toMatch(
          /remote PR creation (skipped \(--sync-only\)|staged \(GitHub PR creation failed\))/,
        );
      } finally {
        io.restore();
        process.env.PATH = originalPath;
        delete process.env.AGENTPLANE_GH_LOG;
      }

      const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
      const meta = JSON.parse(await readFile(metaPath, "utf8")) as {
        pr_number?: number;
      };
      expect(meta.pr_number).toBeUndefined();

      const logText = await readFile(logPath, "utf8");
      const log = logText
        .trim()
        .split("\n")
        .filter(Boolean)
        .map((line) => JSON.parse(line) as string[]);
      expect(
        log.some(
          (args) =>
            args[0] === "api" &&
            args[1] === "repos/example/repo/pulls" &&
            args.includes("-X") &&
            args.includes("POST"),
        ),
      ).toBe(false);
    });
  },
);

describe("pr open provider-base publication order", () => {
  it.each([
    "Exact-SHA PR base is ambiguous: local and live main differ.",
    "Exact-SHA PR base does not match provider base branch main.",
    "Exact-SHA PR base requires local and live provider evidence for main.",
    "Exact-SHA PR base is inconsistent with the frozen Task execution base_sha.",
    "matching",
    "named-base",
    "late-base-race",
    "sync-only",
  ])("validates %s before publishing the task branch", async (scenario) => {
    const execution = await import("../runtime/task-execution-context/index.js");
    const sync = await import("../commands/pr/internal/sync.js");
    const artifacts = await import("../commands/pr/internal/auto-commit.js");
    const publication = await import("../commands/pr/branch-publication.js");
    const provider = await import("../commands/pr/internal/change-request-provider.js");
    const base = await import("../commands/pr/internal/provider-base.js");
    const { CliError } = await import("../shared/errors.js");
    const { cmdPrOpen } = await import("../commands/pr/open.js");
    const sha = "a".repeat(40);
    const order: string[] = [];
    const ctx = {
      resolvedProject: { gitRoot: "/repo" },
      config: {
        paths: { workflow_dir: ".agentplane/tasks", tasks_path: ".agentplane/tasks.json" },
      },
    };
    const identity = { targetUrl: "https://github.com/example/repo.git" };
    const result = {
      meta: { branch: "task/T-1/example", base: sha },
      prDir: "/repo/pr",
      resolved: ctx.resolvedProject,
    };
    const spies = [
      vi.spyOn(execution, "loadTaskCommandContext").mockResolvedValue({
        command: ctx,
        execution: {
          selected_mode: "branch_pr",
          base_ref: scenario === "named-base" ? "main" : sha,
          base_sha: sha,
        },
      } as never),
      vi.spyOn(artifacts, "maybeAutoCommitTaskPrArtifacts").mockResolvedValue(undefined),
      vi.spyOn(provider, "resolveChangeRequestIdentity").mockResolvedValue(identity as never),
    ];
    const baseSpy = vi.spyOn(base, "resolveProviderBaseBranch").mockImplementation(() => {
      order.push("validate-base");
      if (
        scenario === "late-base-race" &&
        order.filter((entry) => entry === "validate-base").length === 2
      ) {
        return Promise.reject(
          new CliError({
            code: "E_VALIDATION",
            exitCode: 3,
            message: "base moved after preflight",
          }),
        );
      }
      if (!["matching", "named-base", "late-base-race", "sync-only"].includes(scenario)) {
        return Promise.reject(
          new CliError({ code: "E_VALIDATION", exitCode: 3, message: scenario }),
        );
      }
      return Promise.resolve("main");
    });
    const pushSpy = vi
      .spyOn(publication, "pushTaskBranchUpstreamIfConfigured")
      .mockImplementation(() => {
        order.push("push");
        return Promise.resolve(true);
      });
    const syncSpy = vi.spyOn(sync, "syncPrArtifacts").mockImplementation(async (opts) => {
      if (opts.remoteMode === "auto") {
        await base.resolveProviderBaseBranch({
          gitRoot: "/repo",
          baseRef: sha,
          baseSha: sha,
          identity: identity as never,
        });
        order.push("hosted-create");
      }
      return result as never;
    });
    try {
      const open = cmdPrOpen({
        ctx: ctx as never,
        cwd: "/repo",
        taskId: "T-1",
        author: "CODER",
        quiet: true,
        syncOnly: scenario === "sync-only",
      });
      switch (scenario) {
        case "matching": {
          await expect(open).resolves.toBe(0);
          expect(order).toEqual(["validate-base", "push", "validate-base", "hosted-create"]);
          expect(baseSpy).toHaveBeenNthCalledWith(1, {
            gitRoot: "/repo",
            baseRef: sha,
            baseSha: sha,
            identity,
          });
          break;
        }
        case "named-base": {
          await expect(open).resolves.toBe(0);
          expect(order).toEqual(["push", "validate-base", "hosted-create"]);
          break;
        }
        case "late-base-race": {
          await expect(open).rejects.toThrow("base moved after preflight");
          expect(order).toEqual(["validate-base", "push", "validate-base"]);
          break;
        }
        case "sync-only": {
          await expect(open).resolves.toBe(0);
          expect(baseSpy).not.toHaveBeenCalled();
          expect(pushSpy).not.toHaveBeenCalled();
          break;
        }
        default: {
          await expect(open).rejects.toThrow(scenario);
          expect(pushSpy).not.toHaveBeenCalled();
          expect(order).toEqual(["validate-base"]);
        }
      }
    } finally {
      for (const spy of [...spies, baseSpy, pushSpy, syncSpy]) spy.mockRestore();
    }
  });
});

const reviewedGit = async (root: string, ...args: string[]) => {
  const result = await promisify(execFile)("git", args, { cwd: root, env: cleanGitEnv() });
  return result.stdout.trim();
};

async function reviewedPublicationFixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "reviewed-publication-"));
  await reviewedGit(root, "init", "-b", "main");
  await reviewedGit(root, "config", "user.name", "Fixture");
  await reviewedGit(root, "config", "user.email", "fixture@example.com");
  await reviewedGit(root, "config", "agentplane.baseBranch", "main");
  await writeFile(path.join(root, "source.ts"), "old\n");
  await reviewedGit(root, "add", ".");
  await reviewedGit(root, "commit", "-m", "old base");
  const old = await reviewedGit(root, "rev-parse", "HEAD");
  await reviewedGit(root, "checkout", "-b", "task/202610101212-RDPWEM/repair");
  await writeFile(path.join(root, "source.ts"), "reviewed\n");
  await reviewedGit(root, "add", ".");
  await reviewedGit(root, "commit", "-m", "reviewed import");
  const head = await reviewedGit(root, "rev-parse", "HEAD");
  const remote = path.join(root, "remote.git");
  // The mock isolates only provider URL discovery. The live ref query uses real Git.
  await reviewedGit(root, "init", "--bare", remote);
  await reviewedGit(root, "push", remote, `${head}:refs/heads/main`);
  await writeFile(path.join(root, ".git", "info", "exclude"), "remote.git/\n");
  const identity = (await resolveLogicalRepositoryIdentity({
    git_root: root,
    task: {},
    create_if_missing: true,
  })) as k.Sha256Digest;
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  const command = {
    resolvedProject: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") },
    config,
    memo: {},
    taskBackend: { getTask: () => Promise.resolve(task), writeTask: vi.fn() },
  } as unknown as TaskBackend.CommandContext;
  const observation = await observeKernelRepository({
    repository_root: root,
    repository_identity: identity,
    operational_paths: [
      config.paths.workflow_dir,
      config.paths.tasks_path,
      config.paths.worktrees_dir,
    ],
  });
  const approved = { ...plan, approval_actor_id: "USER" };
  const parentContents = {
    ...authority,
    task_id: "202610101212-RDPWEM",
    repository_identity: identity,
    provenance: { ...authority.provenance, actor_id: "USER" },
  };
  const parent = { ...parentContents, digest: k.authorityDigest(parentContents) };
  const state = aggregate({
    id: "202610101212-RDPWEM",
    current_plan: approved,
    authority_lineage: [{ authority: parent, approval_mode: "manual_operator", observation: null }],
  });
  const contents = {
    ...parent,
    repository_fingerprint: observation.fingerprint,
    policy_digests: [k.kernelDigest("new policy")],
    provenance: { ...parent.provenance, actor_id: "USER", parent_authority_digest: parent.digest },
  };
  const renewed = { ...contents, digest: k.authorityDigest(contents) };
  const reviewed = {
    old_commit: old,
    new_commit: head,
    checkpoint_digest: parent.repository_fingerprint,
    work_order_digest: k.kernelDigest("retained work order"),
    canonical_record_digest: k.kernelDigest("retained record"),
    mutation_receipt_digest: k.kernelDigest("begin receipt"),
    overlay_digest: k.kernelDigest([]),
    imported_paths: ["source.ts"],
  };
  const request = k.policyRenewalRequestDigest({
    task_revision: state.revision,
    parent,
    repository_fingerprint: observation.fingerprint,
    policy_digests: renewed.policy_digests,
    changed_paths: ["source.ts"],
    repository_evidence_digest: k.kernelDigest("repository evidence"),
    reviewed_base_import: reviewed,
  });
  const record: k.CanonicalAuthorityRecord = {
    authority: renewed,
    approval_mode: "manual_operator",
    observation: {
      kind: "policy_renewal",
      previous_fingerprint: parent.repository_fingerprint,
      changed_paths: ["source.ts"],
      request_task_revision: state.revision,
      request_digest: request,
      evidence_digest: k.policyRenewalApprovalEvidence({
        request_digest: request,
        actor_id: "USER",
      }),
      repository_evidence_digest: k.kernelDigest("repository evidence"),
      reviewed_base_import: reviewed,
    },
  };
  const reduction = k.reduceTaskCommand({
    aggregate: state,
    command: {
      kind: "renew_policy_authority",
      task_id: state.id,
      expected_task_revision: state.revision,
      expected_state_fingerprint: observation.fingerprint,
      record,
    },
    actor: { id: "USER", kind: "USER", transport: "manual", capabilities: [] },
    authority: null,
    repository_fingerprint: observation.fingerprint,
    occurred_at: "2026-10-10T10:00:00.000Z",
    mutation_id: "renew",
  });
  expect(reduction.kind).toBe("accepted");
  if (reduction.kind !== "accepted") throw new Error(JSON.stringify(reduction));
  const current = reduction.aggregate;
  const evidence = {
    binding: {
      task_id: state.id,
      plan_digest: approved.digest,
      repository_fingerprint: observation.fingerprint,
      evaluator_target: head,
      commands: ["test"],
    },
    checks: { status: "passed", checks: [{ exit_code: 0 }] },
  };
  current.final_validation = {
    status: "PASSED",
    identity: {
      implementation_identity: observation.fingerprint,
      command_digest: k.kernelDigest(evidence.binding.commands),
      check_id: "final",
      toolchain_digest: k.kernelDigest("tools"),
      environment_digest: k.kernelDigest("env"),
    },
    evidence_digests: [k.kernelDigest(evidence)],
    observed_at: "2026-10-10T10:01:00.000Z",
  };
  const task: TaskData = {
    id: state.id,
    title: "Fixture",
    description: "Native routing",
    status: "DOING",
    owner: "CODER",
    priority: "high",
    tags: [],
    depends_on: [],
    extensions: {
      task_kernel: makeKernelRecord(identity, current, reduction.events),
      task_execution_context: { base_ref: old, base_sha: old },
    },
  };
  expect(readKernelRecord(task, identity).kind).toBe("canonical");
  const directory = path.join(root, ".git/agentplane/kernel/exchanges", state.id, "a".repeat(64));
  await mkdir(directory, { recursive: true });
  const evidencePath = path.join(directory, "final-validation.json");
  await writeFile(evidencePath, JSON.stringify(evidence));
  const options = { command, task, branch: "task/202610101212-RDPWEM/repair", fallback: old };
  return {
    root,
    command,
    remote,
    old,
    head,
    identity,
    current,
    task,
    evidencePath,
    options,
    persist: () => {
      const { digest: _digest, ...stored } = task.extensions!.task_kernel as ReturnType<
        typeof makeKernelRecord
      >;
      const modified = { ...stored, aggregate: current };
      task.extensions!.task_kernel = { ...modified, digest: k.kernelDigest(modified) };
    },
  };
}

describe("pr open authenticated reviewed-publication preflight", () => {
  it.each([
    "reviewed",
    "authority-drift",
    "validation-drift",
    "remote-drift",
    "late-remote-drift",
  ] as const)("preserves the genuine renewal route and rejects %s drift", async (scenario) => {
    const f = await reviewedPublicationFixture();
    const execution = await import("../runtime/task-execution-context/index.js");
    const sync = await import("../commands/pr/internal/sync.js");
    const artifacts = await import("../commands/pr/internal/auto-commit.js");
    const publication = await import("../commands/pr/branch-publication.js");
    const provider = await import("../commands/pr/internal/change-request-provider.js");
    const host = await import("../commands/pr/internal/git-host-identity.js");
    const { resolveReviewedPublicationBase } =
      await import("../commands/pr/internal/reviewed-publication-base.js");
    const { cmdPrOpen } = await import("../commands/pr/open.js");
    const order: string[] = [];
    if (scenario === "authority-drift") {
      f.current.authority_lineage!.at(-1)!.authority.provenance.parent_authority_digest =
        k.kernelDigest("foreign");
      f.persist();
    }
    if (scenario === "validation-drift") {
      f.current.final_validation!.status = "FAILED";
      f.persist();
    }
    if (scenario === "remote-drift") {
      await reviewedGit(f.root, "push", "--force", f.remote, `${f.old}:refs/heads/main`);
    }
    const spies = [
      vi.spyOn(execution, "loadTaskCommandContext").mockResolvedValue({
        command: f.command,
        primary_task: f.task,
        execution: { selected_mode: "branch_pr", base_ref: f.old, base_sha: f.old },
      } as never),
      vi.spyOn(artifacts, "maybeAutoCommitTaskPrArtifacts").mockResolvedValue(undefined),
      vi.spyOn(host, "resolveGitHostIdentity").mockResolvedValue({ targetUrl: f.remote } as never),
      vi
        .spyOn(provider, "resolveChangeRequestIdentity")
        .mockResolvedValue({ targetUrl: f.remote } as never),
      vi.spyOn(sync, "syncPrArtifacts").mockImplementation(async (opts) => {
        if (opts.remoteMode === "auto") {
          await resolveReviewedPublicationBase(f.options);
          order.push("hosted-create");
        }
        return {
          meta: { branch: f.options.branch, base: f.head },
          prDir: path.join(f.root, "pr"),
          resolved: f.command.resolvedProject,
        } as never;
      }),
    ];
    const pushSpy = vi
      .spyOn(publication, "pushTaskBranchUpstreamIfConfigured")
      .mockImplementation(async () => {
        order.push("push");
        if (scenario === "late-remote-drift") {
          await reviewedGit(f.root, "push", "--force", f.remote, `${f.old}:refs/heads/main`);
        }
        return true;
      });
    const before = JSON.stringify(f.task);
    try {
      expect(await reviewedGit(f.root, "rev-parse", "main")).toBe(f.old);
      const open = cmdPrOpen({
        ctx: f.command,
        cwd: f.root,
        taskId: f.task.id,
        author: "CODER",
        quiet: true,
      });
      if (scenario === "reviewed") {
        await expect(open).resolves.toBe(0);
        expect(order).toEqual(["push", "hosted-create"]);
      } else {
        await expect(open).rejects.toThrow("Reviewed publication base is unavailable");
        if (scenario === "late-remote-drift") expect(order).toEqual(["push"]);
        else expect(pushSpy).not.toHaveBeenCalled();
      }
      expect(JSON.stringify(f.task)).toBe(before);
      expect(f.task.extensions!.task_execution_context).toEqual({
        base_ref: f.old,
        base_sha: f.old,
      });
    } finally {
      for (const spy of [...spies, pushSpy]) spy.mockRestore();
      await rm(f.root, { recursive: true, force: true });
    }
  });
});
