import { execFile } from "node:child_process";
import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import {
  exerciseConflictExchange,
  fakeGithubProviderSource,
  withFakeConflictGh as withFakeGh,
  type ConflictVerificationDrift,
} from "./task-advance-effect-recovery.testkit.js";
import { exerciseManagedConflict } from "./managed-conflict-recovery.testkit.js";
import { materializeRepoLocalDistForWorktree } from "../commands/branch/work-start.materialize.js";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { ensureRuntimeGitignore } from "../runtime/shared/runtime-gitignore.js";

import { describe } from "vitest";

import {
  captureStdIO,
  defaultConfig,
  expect,
  it,
  mkGitRepoRootWithBranch,
  runCli,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";

const execFileAsync = promisify(execFile);
const PROVIDER_CONFLICT_REWORK_MATRIX_TIMEOUT_MS = 120_000;

type ConflictRouteOutput = {
  workflow_step: {
    kind: string;
    id: string;
    authoritativeCheckout?: string;
    episode?: { purpose: string; role: string };
    compatibility: { code: string; command: string | null };
  };
  execution_packet: {
    actionKind: string;
    safeToMutate: boolean;
    exactArgv: string[] | null;
    staleStateCheck: string;
  };
  blockers: { code: string }[];
  conflict_rework:
    | {
        state: "ready";
        packet: {
          provider: { head_sha: string; base_sha: string; mergeability: { state: string } };
          base_context: {
            provider_conflict_base_sha: string;
            current_base_sha: string;
            relation: string;
            legacy_queue_base_sha: string | null;
          };
          route_evidence: {
            kind: string;
            queue: { status: string; base_sha: string } | null;
            handoff: { provider_base_sha: string | null } | null;
          };
          candidate_conflict_paths: { paths: string[]; total: number };
          freshness: { token: string };
          safety: { preparation_mutations: unknown[]; cli_must_not: string[] };
        };
      }
    | {
        state: "adoption_required";
        reason: string;
        adoption: {
          token: string;
          evidence: { task_id: string };
        };
      }
    | {
        state: "publication_required";
        reason: string;
        provider_head_sha: string;
        local_head_sha: string;
      }
    | { state: "invalid"; reason_code: string; reason: string }
    | { state: "not_conflicting"; reason: string }
    | null;
};

type CanonicalEpisodePacket = {
  authority: { role: string };
  exchange: {
    directory: string;
    work_order_ref: string;
    result_path: string;
    resume_argv: string[];
  };
};

async function createBranchPrTask(root: string): Promise<{
  taskId: string;
  branch: string;
  worktree: string;
  executionPacket: CanonicalEpisodePacket;
}> {
  await ensureRuntimeGitignore({ gitRoot: root });
  await appendFile(
    path.join(root, ".gitignore"),
    "\n.agentplane/bin/\nnode_modules\npackages/\nwebsite/\ndist\n",
  );
  await execFileAsync("git", ["add", ".gitignore"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "test: ignore materialized conflict runtime"], {
    cwd: root,
  });
  await execFileAsync("git", ["add", "-A"], { cwd: root });
  let hasBootstrapChanges = false;
  try {
    await execFileAsync("git", ["diff", "--cached", "--quiet"], { cwd: root });
  } catch {
    hasBootstrapChanges = true;
  }
  if (hasBootstrapChanges) {
    await execFileAsync("git", ["commit", "-m", "test: persist conflict policy baseline"], {
      cwd: root,
    });
  }
  let taskId = "";
  const createIo = captureStdIO();
  try {
    expect(
      await runCli([
        "task",
        "new",
        "--title",
        "Prepare semantic conflict rework route",
        "--description",
        "Exercise a provider-reported conflict route without allowing CLI resolution.",
        "--priority",
        "high",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--verify",
        "node --version",
        "--allow-duplicate",
        "--root",
        root,
      ]),
      createIo.stderr,
    ).toBe(0);
    taskId = createIo.stdout.trim();
  } finally {
    createIo.restore();
  }
  await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "test: seed canonical conflict task"], {
    cwd: root,
  });
  const advanceIo = captureStdIO();
  let packet!: {
    exchange: {
      directory: string;
      work_order_ref: string;
      result_path: string;
      resume_argv: string[];
    };
  };
  try {
    expect(
      await runCli(["task", "advance", taskId, "--agent-json", "--root", root]),
      advanceIo.stderr,
    ).toBe(0);
    packet = JSON.parse(advanceIo.stdout) as typeof packet;
  } finally {
    advanceIo.restore();
  }
  const workOrder = JSON.parse(
    await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
  ) as {
    work_order_id: string;
    canonical_binding: Record<string, unknown>;
  };
  await writeFile(
    packet.exchange.result_path,
    `${JSON.stringify({
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: workOrder.work_order_id,
      status: "completed",
      summary: "Prepare a bounded provider conflict rework plan.",
      findings: [],
      uncertainty: [],
      canonical_binding: workOrder.canonical_binding,
      canonical_plan: {
        work_items: [
          {
            id: "resolve-provider-conflict",
            depends_on: [],
            required_inputs: [],
            expected_outputs: ["resolved-conflict"],
            optional: false,
            execution_requirements: {
              scope_roots: ["docs"],
              repository_effects: ["source_code"],
              external_effects: [],
              capabilities: ["repository_write", "task.verify"],
              resources: [],
            },
            contract: {
              role: "EXECUTOR",
              objective: "Resolve the provider conflict without losing base or task changes.",
              acceptance_criteria: ["The conflict route preserves exact provider identity."],
              verification_commands: ["node --version"],
            },
          },
        ],
      },
    })}\n`,
    "utf8",
  );
  const resumeIo = captureStdIO();
  try {
    expect(
      await runCli([...packet.exchange.resume_argv.slice(1), "--root", root]),
      resumeIo.stderr,
    ).toBe(0);
  } finally {
    resumeIo.restore();
  }
  const approveIo = captureStdIO();
  try {
    expect(
      await runCli([
        "task",
        "plan",
        "approve",
        taskId,
        "--by",
        "USER",
        "--note",
        "Approve the provider conflict fixture plan.",
        "--root",
        root,
      ]),
      approveIo.stderr,
    ).toBe(0);
  } finally {
    approveIo.restore();
  }
  await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "test: persist canonical conflict plan"], {
    cwd: root,
  });
  const materializeIo = captureStdIO();
  let materialized!: { action: { kind: string; must_run_from: string } };
  try {
    expect(
      await runCli(["task", "advance", taskId, "--agent-json", "--root", root]),
      materializeIo.stderr,
    ).toBe(0);
    materialized = JSON.parse(materializeIo.stdout) as typeof materialized;
    expect(materialized.action.kind).toBe("external_wait");
  } finally {
    materializeIo.restore();
  }
  const branch = `task/${taskId}/prepare-semantic-conflict-rework-route`;
  const worktree = await worktreeForBranch(root, branch);
  expect(path.resolve(materialized.action.must_run_from)).toBe(path.resolve(worktree));
  const executionIo = captureStdIO();
  let executionPacket!: CanonicalEpisodePacket;
  try {
    const code = await runCli(["task", "advance", taskId, "--agent-json", "--root", worktree]);
    const [rootStatus, worktreeStatus] = await Promise.all([
      execFileAsync("git", ["status", "--short", "--untracked-files=all"], { cwd: root }),
      execFileAsync("git", ["status", "--short", "--untracked-files=all"], { cwd: worktree }),
    ]);
    expect(
      code,
      `${executionIo.stderr}\nroot:\n${rootStatus.stdout}\nworktree:\n${worktreeStatus.stdout}`,
    ).toBe(0);
    executionPacket = JSON.parse(executionIo.stdout) as CanonicalEpisodePacket;
    expect(executionPacket.authority.role).toBe("EXECUTOR");
  } finally {
    executionIo.restore();
  }
  return {
    taskId,
    branch,
    worktree,
    executionPacket,
  };
}

async function worktreeForBranch(root: string, branch: string): Promise<string> {
  const { stdout } = await execFileAsync("git", ["worktree", "list", "--porcelain"], {
    cwd: root,
  });
  for (const entry of stdout.split("\n\n")) {
    const lines = entry.split("\n");
    const worktreeLine = lines.find((line) => line.startsWith("worktree "));
    const branchLine = lines.find((line) => line.startsWith("branch "));
    if (branchLine !== `branch refs/heads/${branch}` || !worktreeLine) continue;
    return worktreeLine.slice("worktree ".length);
  }
  throw new Error(`No worktree found for ${branch}`);
}

async function completeCanonicalWorkItem(
  worktree: string,
  packet: CanonicalEpisodePacket,
): Promise<void> {
  const executionOrder = JSON.parse(
    await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
  ) as { work_order_id: string; canonical_binding: Record<string, unknown> };
  await writeFile(
    packet.exchange.result_path,
    JSON.stringify({
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: executionOrder.work_order_id,
      status: "completed",
      summary: "Prepared the scoped provider conflict fixture.",
      findings: [],
      uncertainty: [],
      canonical_binding: executionOrder.canonical_binding,
      canonical_outputs: [
        {
          id: "resolved-conflict",
          kind: "source",
          digest: k.kernelDigest("provider-conflict-fixture"),
        },
      ],
    }),
  );
  const inspectIo = captureStdIO();
  let inspectionPacket!: CanonicalEpisodePacket;
  try {
    expect(
      await runCli([...packet.exchange.resume_argv.slice(1), "--root", worktree]),
      inspectIo.stderr,
    ).toBe(0);
    inspectionPacket = JSON.parse(inspectIo.stdout) as CanonicalEpisodePacket;
    expect(inspectionPacket.authority.role).toBe("EVALUATOR");
  } finally {
    inspectIo.restore();
  }
  const inspectionOrder = JSON.parse(
    await readFile(
      path.join(inspectionPacket.exchange.directory, inspectionPacket.exchange.work_order_ref),
      "utf8",
    ),
  ) as { work_order_id: string; canonical_binding: Record<string, unknown> };
  await writeFile(
    inspectionPacket.exchange.result_path,
    JSON.stringify({
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: inspectionOrder.work_order_id,
      status: "completed",
      summary: "The provider conflict fixture satisfies its scoped contract.",
      findings: ["The scoped task-side change is present and ready for provider routing."],
      uncertainty: [],
      canonical_binding: inspectionOrder.canonical_binding,
      review: {
        verdict: "pass",
        missing_tests: [],
        hidden_assumptions: [],
        residual_risks: [],
      },
    }),
  );
  const completeIo = captureStdIO();
  try {
    expect(
      await runCli([...inspectionPacket.exchange.resume_argv.slice(1), "--root", worktree]),
      completeIo.stderr,
    ).toBe(0);
    const completed = JSON.parse(completeIo.stdout) as {
      action?: { kind?: string; reason?: string };
    };
    if (
      completed.action?.kind !== "terminal" &&
      !(
        completed.action?.kind === "external_wait" &&
        completed.action.reason === "canonical_provider_access_required"
      )
    ) {
      throw new Error(JSON.stringify(completed, null, 2));
    }
  } finally {
    completeIo.restore();
  }
}

async function readRemoteRoute(root: string, taskId: string): Promise<ConflictRouteOutput> {
  const routeIo = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "next-action",
      taskId,
      "--remote",
      "--json",
      "--root",
      root,
    ]);
    expect(code, `${routeIo.stderr}\n${routeIo.stdout}`).toBe(0);
    return JSON.parse(routeIo.stdout) as ConflictRouteOutput;
  } finally {
    routeIo.restore();
  }
}

describe("provider conflict rework CLI", () => {
  it("routes a clean strict local descendant through guarded publication before conflict rework", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    await mkdir(path.join(root, "docs"), { recursive: true });
    await writeFile(path.join(root, "docs/conflict.md"), "base\n", "utf8");
    await execFileAsync("git", ["add", "docs/conflict.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed publication conflict fixture"], {
      cwd: root,
    });

    const { taskId, branch, worktree, executionPacket } = await createBranchPrTask(root);
    await writeFile(path.join(worktree, "docs/conflict.md"), "task branch\n", "utf8");
    await completeCanonicalWorkItem(worktree, executionPacket);

    const { stdout: providerHeadRaw } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: worktree,
    });
    const providerHeadSha = providerHeadRaw.trim();

    await writeFile(path.join(worktree, "local-evidence.txt"), "local-only evidence\n", "utf8");
    await execFileAsync("git", ["add", "local-evidence.txt"], { cwd: worktree });
    await execFileAsync("git", ["commit", "-m", "test: local strict descendant"], {
      cwd: worktree,
    });
    const { stdout: localHeadRaw } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: worktree,
    });
    const localHeadSha = localHeadRaw.trim();

    await writeFile(path.join(root, "docs/conflict.md"), "main branch\n", "utf8");
    await execFileAsync("git", ["add", "docs/conflict.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: base side of publication conflict"], {
      cwd: root,
    });
    const { stdout: baseRaw } = await execFileAsync("git", ["rev-parse", "main"], { cwd: root });
    const baseSha = baseRaw.trim();
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
    });

    await withFakeGh(
      root,
      fakeGithubProviderSource({
        number: 4626,
        html_url: "https://github.example/acme/agentplane/pull/4626",
        state: "open",
        merged_at: null,
        merge_commit_sha: null,
        mergeable: false,
        mergeable_state: "dirty",
        head: { ref: branch, sha: providerHeadSha },
        base: { ref: "main", sha: baseSha },
      }),
      async () => {
        const before = await execFileAsync("git", ["status", "--porcelain"], { cwd: worktree });
        const route = await readRemoteRoute(root, taskId);
        expect(route.conflict_rework, JSON.stringify(route, null, 2)).toMatchObject({
          state: "publication_required",
          provider_head_sha: providerHeadSha,
          local_head_sha: localHeadSha,
        });
        expect(route.workflow_step).toMatchObject({
          kind: "approval",
          id: "approval.pr.head.publish",
          authoritativeCheckout: "task_worktree",
          compatibility: { code: "publish_conflict_pr_head" },
        });
        expect(route.blockers.map((blocker) => blocker.code)).toContain("pr_head_unpublished");
        expect(route.blockers.map((blocker) => blocker.code)).not.toContain(
          "provider_conflict_context_invalid",
        );
        expect(route.execution_packet).toMatchObject({
          actionKind: "provider_action",
          safeToMutate: false,
          exactArgv: null,
        });

        const packetIo = captureStdIO();
        try {
          const code = await runCli(["pr", "conflict-rework", taskId, "--json", "--root", root]);
          expect(code).not.toBe(0);
          expect(packetIo.stderr).toContain(
            "must be published before conflict context can be frozen",
          );
          expect(packetIo.stderr).toContain(
            `agentplane task next-action ${taskId} --remote --explain`,
          );
        } finally {
          packetIo.restore();
        }

        const after = await execFileAsync("git", ["status", "--porcelain"], { cwd: worktree });
        expect(after.stdout).toBe(before.stdout);
      },
    );

    await withFakeGh(
      root,
      fakeGithubProviderSource({
        number: 4626,
        html_url: "https://github.example/acme/agentplane/pull/4626",
        state: "open",
        merged_at: null,
        merge_commit_sha: null,
        mergeable: false,
        mergeable_state: "dirty",
        head: { ref: branch, sha: localHeadSha },
        base: { ref: "main", sha: baseSha },
      }),
      async () => {
        const alignedRoute = await readRemoteRoute(root, taskId);
        expect(alignedRoute.conflict_rework).toMatchObject({
          state: "ready",
          packet: {
            provider: { head_sha: localHeadSha },
            route_evidence: {
              kind: "current_verified_open_pr_rework",
              queue: null,
              handoff: null,
            },
          },
        });
        expect(alignedRoute.workflow_step).toMatchObject({
          kind: "agent_episode",
          id: "agent.provider_conflict_rework",
          authoritativeCheckout: "task_worktree",
          episode: { purpose: "implementation_rework", role: "CODER" },
        });
        expect(alignedRoute.execution_packet).toMatchObject({
          actionKind: "stop",
          safeToMutate: true,
          exactArgv: null,
        });
      },
    );
  });

  it.each([
    "read_only",
    "external_exchange",
    "external_exchange_advanced_base",
    "after_verification_advanced_base",
    "managed_interrupted_advanced_base",
    "after_verification_base_advanced_base",
    "after_verification_provider_advanced_base",
    "after_verification_diffstat_advanced_base",
    "interrupted_exchange",
    "interrupted_drift",
    "before_checkpoint",
    "before_checkpoint_drift",
    "after_verification",
    "before_verification_artifacts",
    "after_verification_workspace",
    "after_verification_task",
    "after_verification_result",
    "after_verification_policy",
    "managed_runner",
    "managed_workspace_drift",
    "managed_result_drift",
    "managed_policy_drift",
    "managed_interrupted",
    "managed_evidence_interrupted",
    "managed_interrupted_context_drift",
    "managed_interrupted_workspace_drift",
    "managed_interrupted_policy_drift",
  ] as const)(
    "routes a live GitHub conflict to CODER with a fresh packet (%s)",
    async (scenario) => {
      const advancedBase = scenario.endsWith("_advanced_base");
      const mode = scenario.replace(/_advanced_base$/u, "");
      const root = await mkGitRepoRootWithBranch("main");
      expect(await runCliSilent(["init", "--yes", "--hooks", "no", "--root", root])).toBe(0);
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      if (mode.startsWith("managed_")) {
        config.runner.default_adapter = "custom";
        config.runner.custom = {
          command: [process.execPath, path.join(root, "managed-conflict-fixture.mjs")],
        };
        await writeFile(
          path.join(root, "managed-conflict-fixture.mjs"),
          [
            'import { writeFileSync } from "node:fs";',
            'writeFileSync("docs/conflict.md", "resolved task and main\\n");',
            ...(advancedBase
              ? ['writeFileSync("docs/base-only.md", "preserve current base contribution\\n");']
              : []),
            'writeFileSync(process.env.AGENTPLANE_RUNNER_RESULT_PATH, JSON.stringify({ schema_version: 2, kind: "agent_semantic_result", work_order_id: process.env.AGENTPLANE_RUNNER_WORK_ORDER_ID, status: "completed", summary: "Resolve the scoped conflict workspace.", findings: [], uncertainty: [], claimed_checks: [] }));',
            "process.stdin.resume();",
          ].join("\n"),
        );
      }
      await writeConfig(root, config);
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      await mkdir(path.join(root, "docs"), { recursive: true });
      await writeFile(path.join(root, "docs/conflict.md"), "base\n", "utf8");
      await appendFile(path.join(root, ".gitignore"), "\ndist\n.agentplane/cache/\n");
      await writeFile(
        path.join(root, "package.json"),
        JSON.stringify({
          private: true,
          scripts: { "ci:local:full": "node verify-fixture.mjs" },
        }),
      );
      await writeFile(
        path.join(root, "verify-fixture.mjs"),
        [
          'import assert from "node:assert/strict";',
          'import { readFileSync } from "node:fs";',
          'import { execFileSync } from "node:child_process";',
          'assert.equal(readFileSync("docs/conflict.md", "utf8"), "resolved task and main\\n");',
          'const parents = execFileSync("git", ["show", "-s", "--format=%P", "HEAD"], { encoding: "utf8" }).trim().split(" ");',
          "assert.equal(parents.length, 2);",
        ].join("\n"),
      );
      await materializeRepoLocalDistForWorktree({ repoRoot: root, worktreePath: root });
      await execFileAsync("git", ["add", "-A"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "test: seed merge conflict fixture"], {
        cwd: root,
      });

      const { taskId, branch, worktree, executionPacket } = await createBranchPrTask(root);
      await writeFile(path.join(worktree, "docs/conflict.md"), "task branch\n", "utf8");
      await completeCanonicalWorkItem(worktree, executionPacket);

      await writeFile(path.join(root, "docs/conflict.md"), "main branch\n", "utf8");
      await execFileAsync("git", ["add", "docs/conflict.md"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "test: base side of conflict fixture"], {
        cwd: root,
      });
      const [{ stdout: headRaw }, { stdout: baseRaw }] = await Promise.all([
        execFileAsync("git", ["rev-parse", branch], { cwd: root }),
        execFileAsync("git", ["rev-parse", "main"], { cwd: root }),
      ]);
      const headSha = headRaw.trim();
      const baseSha = baseRaw.trim();
      let currentBaseSha = baseSha;
      if (advancedBase) {
        await writeFile(
          path.join(root, "docs/base-only.md"),
          "preserve current base contribution\n",
        );
        await execFileAsync("git", ["add", "docs/base-only.md"], { cwd: root });
        await execFileAsync("git", ["commit", "-m", "test: advance current conflict base"], {
          cwd: root,
        });
        const advanced = await execFileAsync("git", ["rev-parse", "main"], { cwd: root });
        currentBaseSha = advanced.stdout.trim();
      }
      await execFileAsync(
        "git",
        ["remote", "add", "origin", "https://github.com/example/repo.git"],
        {
          cwd: root,
        },
      );
      const queuePath = path.join(root, ".agentplane", "cache", "integration-queue.json");
      await mkdir(path.dirname(queuePath), { recursive: true });
      await writeFile(
        queuePath,
        `${JSON.stringify({
          schema_version: 1,
          entries: [
            {
              task_id: taskId,
              branch,
              base: "main",
              head_sha: headSha,
              base_sha: currentBaseSha,
              changed_paths: ["docs/conflict.md"],
              pr_number: 4626,
              pr_url: "https://github.example/acme/agentplane/pull/4626",
              priority: 0,
              status: advancedBase ? "queued" : "handoff",
              enqueued_at: "2026-07-26T00:00:00.000Z",
              updated_at: "2026-07-26T00:01:00.000Z",
              claimed_by: "integrator",
              claimed_at: "2026-07-26T00:00:00.000Z",
              lease_expires_at: "2099-07-26T00:00:00.000Z",
              reason: "provider conflict",
            },
          ],
        })}\n`,
        "utf8",
      );

      const fakeGhSource = fakeGithubProviderSource({
        number: 4626,
        html_url: "https://github.example/acme/agentplane/pull/4626",
        state: "open",
        merged_at: null,
        merge_commit_sha: null,
        mergeable: false,
        mergeable_state: "dirty",
        head: { ref: branch, sha: headSha },
        base: { ref: "main", sha: baseSha },
      });

      await withFakeGh(root, fakeGhSource, async () => {
        const before = await execFileAsync("git", ["status", "--porcelain"], { cwd: worktree });
        const route = await readRemoteRoute(root, taskId);
        const conflictRework = route.conflict_rework;
        if (conflictRework?.state !== "ready") {
          throw new Error(
            `expected ready conflict-rework packet: ${JSON.stringify(route, null, 2)}`,
          );
        }

        expect(route.workflow_step).toMatchObject({
          kind: "agent_episode",
          id: "agent.provider_conflict_rework",
          authoritativeCheckout: "task_worktree",
          episode: { purpose: "implementation_rework", role: "CODER" },
          compatibility: {
            code: "semantic_conflict_rework_required",
            command: `agentplane pr conflict-rework ${taskId} --expect-freshness-token ${conflictRework.packet.freshness.token}`,
          },
        });
        expect(route.execution_packet).toMatchObject({
          actionKind: "stop",
          safeToMutate: true,
          exactArgv: null,
          staleStateCheck: `agentplane task next-action ${taskId} --remote --explain`,
        });
        expect(route.blockers.map((blocker) => blocker.code)).toContain("provider_merge_conflict");
        expect(conflictRework).toMatchObject({
          state: "ready",
          packet: {
            provider: {
              head_sha: headSha,
              base_sha: baseSha,
              mergeability: { state: "conflicting" },
            },
            candidate_conflict_paths: { paths: ["docs/conflict.md"], total: 1 },
            safety: {
              preparation_mutations: [],
            },
          },
        });
        expect(
          conflictRework.packet.safety.cli_must_not.some((rule) => rule.includes("auto-rebase")),
        ).toBe(true);

        const packetIo = captureStdIO();
        try {
          const code = await runCli([
            "pr",
            "conflict-rework",
            taskId,
            "--expect-freshness-token",
            conflictRework.packet.freshness.token,
            "--json",
            "--root",
            root,
          ]);
          if (code !== 0) process.stderr.write(packetIo.stderr);
          expect(code).toBe(0);
          const packet = JSON.parse(packetIo.stdout) as {
            freshness: { token: string };
            safety: { preparation_mutations: unknown[] };
          };
          expect(packet.freshness.token).toBe(conflictRework.packet.freshness.token);
          expect(packet.safety.preparation_mutations).toEqual([]);
        } finally {
          packetIo.restore();
        }

        const after = await execFileAsync("git", ["status", "--porcelain"], { cwd: worktree });
        expect(after.stdout).toBe(before.stdout);
        if (mode.startsWith("managed_")) {
          await exerciseManagedConflict({
            // This explicit local test provider is not a containment qualification.
            runner_authority: {
              sandbox_override: "danger-full-access",
              danger_authority: {
                danger_full_access_authorized: true,
                provenance: "explicit_operator",
                source: "managed conflict regression fixture",
              },
            },
            worktree,
            taskId,
            baseSha: currentBaseSha,
            interrupt: mode.startsWith("managed_interrupted"),
            interruptAfterStatus: mode.startsWith("managed_status_interrupted"),
            interruptAfterContract: mode === "managed_contract_interrupted",
            interruptAfterEvidence: mode === "managed_evidence_interrupted",
            recoveryDrift: mode.endsWith("_context_drift")
              ? "context"
              : mode.endsWith("_workspace_drift")
                ? "workspace"
                : mode.endsWith("_policy_drift")
                  ? "policy"
                  : mode.endsWith("_task_drift")
                    ? "task"
                    : undefined,
            drift:
              mode === "managed_workspace_drift"
                ? "workspace"
                : mode === "managed_result_drift"
                  ? "result"
                  : mode === "managed_policy_drift"
                    ? "policy"
                    : mode === "managed_projection_drift"
                      ? "projection"
                      : undefined,
          });
        } else if (mode !== "read_only") {
          await exerciseConflictExchange({
            root,
            worktree,
            taskId,
            headSha,
            baseSha: currentBaseSha,
            providerBaseSha: baseSha,
            materializeBaseContribution: advancedBase,
            interrupt: mode === "interrupted_exchange" || mode === "interrupted_drift",
            driftAfterInterruption:
              mode === "interrupted_drift" || mode === "before_checkpoint_drift",
            interruptBeforeCheckpoint:
              mode === "before_checkpoint" || mode === "before_checkpoint_drift",
            interruptAfterVerification: mode.startsWith("after_verification"),
            interruptBeforeVerificationArtifacts: mode === "before_verification_artifacts",
            verificationDrift: mode.startsWith("after_verification_")
              ? (mode.slice("after_verification_".length) as ConflictVerificationDrift)
              : undefined,
          });
        }
        if (advancedBase) {
          expect(await readFile(path.join(worktree, "docs/base-only.md"), "utf8")).toBe(
            "preserve current base contribution\n",
          );
        }
      });

      if (mode !== "read_only") return;
      const providerCore = {
        number: 4626,
        html_url: "https://github.example/acme/agentplane/pull/4626",
        state: "open",
        merged_at: null,
        merge_commit_sha: null,
        head: { ref: branch, sha: headSha },
        base: { ref: "main", sha: baseSha },
      };
      const unsettledProviderDetails = [
        ["omitted mergeability fields", providerCore],
        [
          "contradictory false and unknown mergeability",
          { ...providerCore, mergeable: false, mergeable_state: "unknown" },
        ],
        [
          "pending unknown mergeability",
          { ...providerCore, mergeable: null, mergeable_state: "unknown" },
        ],
        [
          "unsettled null and pending mergeability",
          { ...providerCore, mergeable: null, mergeable_state: "pending" },
        ],
        [
          "contradictory true and dirty mergeability",
          { ...providerCore, mergeable: true, mergeable_state: "dirty" },
        ],
        [
          "contradictory true and conflicting mergeability",
          { ...providerCore, mergeable: true, mergeable_state: "conflicting" },
        ],
      ] as const;
      for (const [label, providerDetail] of unsettledProviderDetails) {
        await withFakeGh(root, fakeGithubProviderSource(providerDetail), async () => {
          const [rootBefore, worktreeBefore] = await Promise.all([
            execFileAsync("git", ["status", "--porcelain"], { cwd: root }),
            execFileAsync("git", ["status", "--porcelain"], { cwd: worktree }),
          ]);
          const route = await readRemoteRoute(root, taskId);

          expect(route.workflow_step).toMatchObject({
            kind: "terminal",
            id: "terminal.provider_conflict_context_invalid",
          });
          expect(route.workflow_step.kind, label).not.toBe("agent_episode");
          expect(route.workflow_step.kind, label).not.toBe("cli_operation");
          expect(route.execution_packet).toMatchObject({
            actionKind: "stop",
            safeToMutate: false,
            exactArgv: null,
          });
          expect(route.blockers.map((blocker) => blocker.code)).toContain(
            "provider_conflict_context_invalid",
          );
          expect(route.blockers.map((blocker) => blocker.code)).not.toContain(
            "provider_merge_conflict",
          );
          expect(route.conflict_rework).toMatchObject({
            state: "invalid",
            reason_code: "provider_mergeability_unknown",
          });

          const [rootAfter, worktreeAfter] = await Promise.all([
            execFileAsync("git", ["status", "--porcelain"], { cwd: root }),
            execFileAsync("git", ["status", "--porcelain"], { cwd: worktree }),
          ]);
          expect(rootAfter.stdout, label).toBe(rootBefore.stdout);
          expect(worktreeAfter.stdout, label).toBe(worktreeBefore.stdout);
        });
      }

      const coherentNonConflictProviderDetails = [
        "clean",
        "behind",
        "unstable",
        "blocked",
      ] as const;
      for (const providerState of coherentNonConflictProviderDetails) {
        await withFakeGh(
          root,
          fakeGithubProviderSource({
            ...providerCore,
            mergeable: true,
            mergeable_state: providerState,
          }),
          async () => {
            const [rootBefore, worktreeBefore] = await Promise.all([
              execFileAsync("git", ["status", "--porcelain"], { cwd: root }),
              execFileAsync("git", ["status", "--porcelain"], { cwd: worktree }),
            ]);
            const route = await readRemoteRoute(root, taskId);

            expect(route.conflict_rework, providerState).toBeNull();
            expect(route.workflow_step, providerState).toMatchObject({
              kind: "approval",
              id: "approval.pr.head.publish",
              compatibility: { code: "publish_pr_head" },
            });
            expect(route.execution_packet, providerState).toMatchObject({
              actionKind: "provider_action",
              safeToMutate: false,
              exactArgv: null,
            });
            expect(
              route.blockers.map((blocker) => blocker.code),
              providerState,
            ).not.toContain("provider_conflict_context_invalid");
            expect(
              route.blockers.map((blocker) => blocker.code),
              providerState,
            ).not.toContain("provider_merge_conflict");

            const [rootAfter, worktreeAfter] = await Promise.all([
              execFileAsync("git", ["status", "--porcelain"], { cwd: root }),
              execFileAsync("git", ["status", "--porcelain"], { cwd: worktree }),
            ]);
            expect(rootAfter.stdout, providerState).toBe(rootBefore.stdout);
            expect(worktreeAfter.stdout, providerState).toBe(worktreeBefore.stdout);
          },
        );
      }

      await writeFile(path.join(root, "docs/conflict.md"), "main queue snapshot\n", "utf8");
      await execFileAsync("git", ["add", "docs/conflict.md"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "test: advance legacy queue snapshot"], {
        cwd: root,
      });
      const { stdout: queueBaseRaw } = await execFileAsync("git", ["rev-parse", "main"], {
        cwd: root,
      });
      const legacyQueueBase = queueBaseRaw.trim();

      await writeFile(path.join(root, "docs/conflict.md"), "main current base\n", "utf8");
      await execFileAsync("git", ["add", "docs/conflict.md"], { cwd: root });
      await execFileAsync(
        "git",
        ["commit", "-m", "test: advance current base beyond queue snapshot"],
        {
          cwd: root,
        },
      );
      const { stdout: currentBaseRaw } = await execFileAsync("git", ["rev-parse", "main"], {
        cwd: root,
      });
      const currentBase = currentBaseRaw.trim();

      await writeFile(
        queuePath,
        `${JSON.stringify({
          schema_version: 1,
          entries: [
            {
              task_id: taskId,
              branch,
              base: "main",
              head_sha: headSha,
              base_sha: legacyQueueBase,
              changed_paths: ["docs/conflict.md"],
              pr_number: 4626,
              pr_url: "https://github.example/acme/agentplane/pull/4626",
              priority: 0,
              status: "rework",
              enqueued_at: "2026-07-26T00:00:00.000Z",
              updated_at: "2026-07-26T05:24:58.052Z",
              reason: "released after protected provider merge failed",
            },
          ],
        })}\n`,
        "utf8",
      );
      const handoffDir = path.join(root, ".agentplane", "tasks", taskId, "handoff");
      await mkdir(handoffDir, { recursive: true });
      await writeFile(
        path.join(handoffDir, "latest.json"),
        `${JSON.stringify({
          schema_version: 1,
          task_id: taskId,
          created_at: "2026-07-26T00:00:00.000Z",
          from_role: "INTEGRATOR",
          reason: "branch_pr integration is waiting for the GitHub PR merge into main.",
          note: "legacy protected-base handoff fixture",
          branch,
          base_branch: "main",
          head_sha: headSha,
          pr_branch: branch,
          route: {
            kind: "protected_base_integrate",
            status: "awaiting_github_merge",
            local_mutation: "not_performed",
            finalize_via: "github_task_pr_merge_then_hosted_close",
            pr_number: 4626,
            pr_url: "https://github.example/acme/agentplane/pull/4626",
          },
          next_actions: [],
          evidence_paths: [],
        })}\n`,
        "utf8",
      );

      await withFakeGh(
        root,
        fakeGithubProviderSource({
          ...providerCore,
          mergeable: false,
          mergeable_state: "dirty",
        }),
        async () => {
          const [rootBefore, worktreeBefore] = await Promise.all([
            execFileAsync("git", ["status", "--porcelain"], { cwd: root }),
            execFileAsync("git", ["status", "--porcelain"], { cwd: worktree }),
          ]);
          const route = await readRemoteRoute(root, taskId);
          const conflictRework = route.conflict_rework;
          expect(currentBase).not.toBe(legacyQueueBase);
          expect(conflictRework).toMatchObject({
            state: "adoption_required",
            adoption: { evidence: { task_id: taskId } },
          });
          expect(route.workflow_step).toMatchObject({
            kind: "approval",
            id: "approval.integration.adopt_legacy_protected_conflict",
            authoritativeCheckout: "task_worktree",
            request: { operationId: "integration.adopt_legacy_protected_conflict" },
            compatibility: { code: "adopt_legacy_protected_conflict" },
          });
          expect(route.execution_packet).toMatchObject({
            actionKind: "provider_action",
            recommendedRole: "USER",
            safeToMutate: false,
            exactArgv: null,
          });

          const [rootAfter, worktreeAfter] = await Promise.all([
            execFileAsync("git", ["status", "--porcelain"], { cwd: root }),
            execFileAsync("git", ["status", "--porcelain"], { cwd: worktree }),
          ]);
          expect(rootAfter.stdout).toBe(rootBefore.stdout);
          expect(worktreeAfter.stdout).toBe(worktreeBefore.stdout);
        },
      );
    },
    PROVIDER_CONFLICT_REWORK_MATRIX_TIMEOUT_MS,
  );
});
