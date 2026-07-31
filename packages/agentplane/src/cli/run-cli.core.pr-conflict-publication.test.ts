import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
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

type PublicationRouteOutput = {
  workflow_step: {
    kind: string;
    id: string;
    authoritativeCheckout?: string;
    compatibility: { code: string; command: string | null };
  };
  blockers: { code: string }[];
  conflict_rework:
    | {
        state: "publication_required";
        provider_head_sha: string;
        local_head_sha: string;
      }
    | { state: string };
};

async function createTask(root: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Publish resolved conflict head",
      "--description",
      "Exercise guarded publication after semantic conflict resolution.",
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
    if (branchLine === `branch refs/heads/${branch}` && worktreeLine) {
      return worktreeLine.slice("worktree ".length);
    }
  }
  throw new Error(`No worktree found for ${branch}`);
}

function fakeGithubProviderSource(detail: Record<string, unknown>): string {
  return [
    "const args = process.argv.slice(2);",
    `const detail = ${JSON.stringify(detail)};`,
    'if (args[0] === "api" && args[1] === "repos/example/repo/branches/main/protection") {',
    "  console.log(JSON.stringify({ required_pull_request_reviews: {} }));",
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

async function readRemoteRoute(root: string, taskId: string): Promise<PublicationRouteOutput> {
  const io = captureStdIO();
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
    if (code !== 0) process.stderr.write(io.stderr);
    expect(code).toBe(0);
    return JSON.parse(io.stdout) as PublicationRouteOutput;
  } finally {
    io.restore();
  }
}

async function withFakeGh<T>(root: string, source: string, run: () => Promise<T>): Promise<T> {
  const fakeGh = path.join(root, "fake-gh-provider-conflict-publication.mjs");
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

describe("resolved provider conflict publication", () => {
  it("publishes a verified DONE descendant before requiring queue or handoff evidence", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    await writeFile(path.join(root, "conflict.txt"), "base\n", "utf8");
    await execFileAsync("git", ["add", "conflict.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed DONE publication fixture"], {
      cwd: root,
    });

    const taskId = await createTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Publish the resolved DONE head before semantic conflict eligibility is reconsidered.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

    const slug = "publish-resolved-done-head";
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
      "Start: reproduce the resolved DONE publication route.",
      "--root",
      worktree,
    ]);
    await writeFile(path.join(worktree, "conflict.txt"), "task branch\n", "utf8");
    await execFileAsync("git", ["add", "-A"], { cwd: worktree });
    await execFileAsync("git", ["commit", "-m", "test: provider-visible DONE conflict head"], {
      cwd: worktree,
    });

    const readmePath = path.join(worktree, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    await writeFile(
      readmePath,
      readme
        .replace('status: "DOING"', 'status: "DONE"')
        .replace('verification:\n  state: "pending"', 'verification:\n  state: "ok"'),
      "utf8",
    );
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: worktree });
    await execFileAsync("git", ["commit", "-m", "test: freeze verified DONE provider head"], {
      cwd: worktree,
    });
    const { stdout: providerHeadRaw } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: worktree,
    });
    const providerHeadSha = providerHeadRaw.trim();

    await writeFile(path.join(worktree, "resolution.txt"), "semantic resolution\n", "utf8");
    await execFileAsync("git", ["add", "resolution.txt"], { cwd: worktree });
    await execFileAsync("git", ["commit", "-m", "test: resolved DONE strict descendant"], {
      cwd: worktree,
    });
    const { stdout: localHeadRaw } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: worktree,
    });
    const localHeadSha = localHeadRaw.trim();

    await writeFile(path.join(root, "conflict.txt"), "main branch\n", "utf8");
    await execFileAsync("git", ["add", "conflict.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: base side of DONE conflict"], {
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
        const route = await readRemoteRoute(root, taskId);
        expect(route.conflict_rework).toMatchObject({
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
        expect(route.blockers.map((blocker) => blocker.code)).not.toContain(
          "provider_conflict_context_invalid",
        );
      },
    );
  });
});
