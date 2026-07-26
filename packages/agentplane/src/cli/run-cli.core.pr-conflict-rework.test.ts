import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

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
          candidate_conflict_paths: { paths: string[]; total: number };
          freshness: { token: string };
          safety: { preparation_mutations: unknown[]; cli_must_not: string[] };
        };
      }
    | { state: "invalid"; reason_code: string; reason: string }
    | { state: "not_conflicting"; reason: string }
    | null;
};

async function createBranchPrTask(root: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
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
      "--allow-duplicate",
      "--root",
      root,
    ]);
    expect(code).toBe(0);
    return io.stdout.trim();
  } finally {
    io.restore();
  }
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

async function withFakeGh<T>(root: string, source: string, run: () => Promise<T>): Promise<T> {
  const fakeGh = path.join(root, "fake-gh-provider-conflict.mjs");
  await writeFile(fakeGh, source, "utf8");
  const previousGhBin = process.env.AGENTPLANE_GH_BIN;
  const previousGhArgs = process.env.AGENTPLANE_GH_ARGS;
  process.env.AGENTPLANE_GH_BIN = process.execPath;
  process.env.AGENTPLANE_GH_ARGS = JSON.stringify([fakeGh]);
  try {
    return await run();
  } finally {
    if (previousGhBin === undefined) delete process.env.AGENTPLANE_GH_BIN;
    else process.env.AGENTPLANE_GH_BIN = previousGhBin;
    if (previousGhArgs === undefined) delete process.env.AGENTPLANE_GH_ARGS;
    else process.env.AGENTPLANE_GH_ARGS = previousGhArgs;
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
    if (code !== 0) process.stderr.write(routeIo.stderr);
    expect(code).toBe(0);
    return JSON.parse(routeIo.stdout) as ConflictRouteOutput;
  } finally {
    routeIo.restore();
  }
}

function fakeGithubProviderSource(detail: Record<string, unknown>): string {
  return [
    "const args = process.argv.slice(2);",
    `const detail = ${JSON.stringify(detail)};`,
    'if (args[0] === "api" && args[1] === "repos/example/repo/branches/main/protection") {',
    '  console.log(JSON.stringify({ required_pull_request_reviews: {} }));',
    "  process.exit(0);",
    "}",
    'if (args[0] === "api" && (args[1] ?? "").startsWith("repos/example/repo/pulls?")) {',
    "  console.log(JSON.stringify([{ number: detail.number, state: detail.state, head: detail.head, base: { ref: detail.base.ref } }]));",
    "  process.exit(0);",
    "}",
    'if (args[0] === "api" && args[1] === "repos/example/repo/pulls/4626") {',
    "  console.log(JSON.stringify(detail));",
    "  process.exit(0);",
    "}",
    'if (args[0] === "pr" && args[1] === "checks") {',
    '  console.log("[]");',
    "  process.exit(0);",
    "}",
    'if (args[0] === "api" && args[1] === "graphql") {',
    "  console.log(JSON.stringify({ data: { repository: { pullRequest: { reviewThreads: { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } } } } } }));",
    "  process.exit(0);",
    "}",
    "console.error(`unexpected gh args: ${JSON.stringify(args)}`);",
    "process.exit(91);",
    "",
  ].join("\n");
}

describe("provider conflict rework CLI", () => {
  it("routes a live GitHub conflict to CODER with a fresh read-only packet", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    await writeFile(path.join(root, "conflict.txt"), "base\n", "utf8");
    await execFileAsync("git", ["add", "conflict.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed merge conflict fixture"], {
      cwd: root,
    });

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Route a provider merge conflict to semantic CODER rework.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

    const slug = "provider-conflict-route";
    const branch = `task/${taskId}/${slug}`;
    await runCliSilent([
      "work",
      "start",
      taskId,
      "--agent",
      "CODER",
      "--slug",
      slug,
      "--worktree",
      "--root",
      root,
    ]);
    const worktree = await worktreeForBranch(root, branch);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: inspect the provider conflict from the dedicated task worktree.",
      "--root",
      worktree,
    ]);
    await writeFile(path.join(worktree, "conflict.txt"), "task branch\n", "utf8");
    await execFileAsync("git", ["add", "-A"], { cwd: worktree });
    await execFileAsync("git", ["commit", "-m", "test: task side of conflict fixture"], {
      cwd: worktree,
    });

    const taskReadmePath = path.join(worktree, ".agentplane", "tasks", taskId, "README.md");
    const taskReadme = await readFile(taskReadmePath, "utf8");
    await writeFile(
      taskReadmePath,
      taskReadme
        .replace('status: "DOING"', 'status: "DONE"')
        .replace('verification:\n  state: "pending"', 'verification:\n  state: "ok"'),
      "utf8",
    );
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: worktree });
    await execFileAsync("git", ["commit", "-m", "test: mark task verified for queue handoff"], {
      cwd: worktree,
    });

    await writeFile(path.join(root, "conflict.txt"), "main branch\n", "utf8");
    await execFileAsync("git", ["add", "conflict.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: base side of conflict fixture"], {
      cwd: root,
    });
    const [{ stdout: headRaw }, { stdout: baseRaw }] = await Promise.all([
      execFileAsync("git", ["rev-parse", branch], { cwd: root }),
      execFileAsync("git", ["rev-parse", "main"], { cwd: root }),
    ]);
    const headSha = headRaw.trim();
    const baseSha = baseRaw.trim();
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
    });
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
            base_sha: baseSha,
            changed_paths: ["conflict.txt"],
            pr_number: 4626,
            pr_url: "https://github.example/acme/agentplane/pull/4626",
            priority: 0,
            status: "handoff",
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

    const fakeGhSource = [
      "const args = process.argv.slice(2);",
      `const detail = ${JSON.stringify({
        number: 4626,
        html_url: "https://github.example/acme/agentplane/pull/4626",
        state: "open",
        merged_at: null,
        merge_commit_sha: null,
        mergeable: false,
        mergeable_state: "dirty",
        head: { ref: branch, sha: headSha },
        base: { ref: "main", sha: baseSha },
      })};`,
      'if (args[0] === "api" && args[1] === "repos/example/repo/branches/main/protection") {',
      '  console.log(JSON.stringify({ required_pull_request_reviews: {} }));',
      "  process.exit(0);",
      "}",
      'if (args[0] === "api" && (args[1] ?? "").startsWith("repos/example/repo/pulls?")) {',
      "  console.log(JSON.stringify([{ number: detail.number, state: detail.state, head: detail.head, base: { ref: detail.base.ref } }]));",
      "  process.exit(0);",
      "}",
      'if (args[0] === "api" && args[1] === "repos/example/repo/pulls/4626") {',
      "  console.log(JSON.stringify(detail));",
      "  process.exit(0);",
      "}",
      'if (args[0] === "pr" && args[1] === "checks") {',
      '  console.log("[]");',
      "  process.exit(0);",
      "}",
      'if (args[0] === "api" && args[1] === "graphql") {',
      "  console.log(JSON.stringify({ data: { repository: { pullRequest: { reviewThreads: { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } } } } } }));",
      "  process.exit(0);",
      "}",
      "console.error(`unexpected gh args: ${JSON.stringify(args)}`);",
      "process.exit(91);",
      "",
    ].join("\n");

    await withFakeGh(root, fakeGhSource, async () => {
      const before = await execFileAsync("git", ["status", "--porcelain"], { cwd: worktree });
      expect(before.stdout).toBe("");

      const route = await readRemoteRoute(root, taskId);
      const conflictRework = route.conflict_rework;
      if (conflictRework?.state !== "ready") {
        throw new Error("expected ready conflict-rework packet");
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
          candidate_conflict_paths: { paths: ["conflict.txt"], total: 1 },
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
    });

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
        expect(route.blockers.map((blocker) => blocker.code)).not.toContain("provider_merge_conflict");
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
  });
});
