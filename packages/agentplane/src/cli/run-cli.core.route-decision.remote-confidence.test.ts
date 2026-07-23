import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
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

async function createBranchPrTask(root: string): Promise<string> {
  const taskIo = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Route confidence task",
      "--description",
      "Exercise remote route confidence.",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "code",
      "--allow-duplicate",
      "--root",
      root,
    ]);
    expect(code).toBe(0);
    return taskIo.stdout.trim();
  } finally {
    taskIo.restore();
  }
}

async function withFakeGh<T>(
  root: string,
  filename: string,
  source: string,
  run: () => Promise<T>,
): Promise<T> {
  const fakeGh = path.join(root, filename);
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

describe("runCli route decision remote confidence", () => {
  it("distinguishes confirmed missing close-tail state from unavailable provider evidence", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
    });

    const taskId = await createBranchPrTask(root);
    const implementationBranch = `task/${taskId}/route-confidence`;
    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "meta.json"),
      JSON.stringify(
        {
          schema_version: 1,
          task_id: taskId,
          branch: implementationBranch,
          base: "main",
          created_at: "2026-05-23T00:00:00.000Z",
          updated_at: "2026-05-23T00:00:00.000Z",
          status: "MERGED",
          pr_url: "https://github.com/example/repo/pull/123",
          merge_commit: "abc123def456",
          head_sha: "def456abc123",
        },
        null,
        2,
      ),
      "utf8",
    );

    const fakeSource = [
      "const args = process.argv.slice(2);",
      'if (args[0] === "api" && (args[1] ?? "").includes("route-confidence")) {',
      `  console.log(${JSON.stringify(
        JSON.stringify([
          {
            number: 123,
            html_url: "https://github.com/example/repo/pull/123",
            state: "closed",
            merged_at: "2026-05-23T00:02:00.000Z",
            merge_commit_sha: "abc123def456",
            head: { ref: implementationBranch, sha: "def456abc123" },
            base: { ref: "main" },
          },
        ]),
      )});`,
      "  process.exit(0);",
      "}",
      'if (args[0] === "api" && args[1] === "graphql") {',
      "  console.log(JSON.stringify({ data: { repository: { pullRequest: { reviewThreads: { nodes: [] } } } } }));",
      "  process.exit(0);",
      "}",
      'if (args[0] === "pr" && args[1] === "checks") {',
      '  console.log("[]");',
      "  process.exit(0);",
      "}",
      'if (args[0] === "api" && (args[1] ?? "").startsWith("repos/example/repo/pulls?")) {',
      '  console.log("[]");',
      "  process.exit(0);",
      "}",
      "console.error(`unexpected gh args: ${JSON.stringify(args)}`);",
      "process.exit(91);",
      "",
    ].join("\n");
    await withFakeGh(root, "gh-close-tail-lookup.js", fakeSource, async () => {
      const statusIo = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "status",
          taskId,
          "--route",
          "--json",
          "--remote",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        const parsed = JSON.parse(statusIo.stdout) as {
          prFlow: { closeTail: { state: string; provider?: string } };
          source_confidence: Record<
            string,
            { source: string; freshness: string; confidence: string; note?: string }
          >;
        };
        expect(parsed.prFlow.closeTail).toMatchObject({
          state: "not_found",
          provider: "github",
        });
        expect(parsed.source_confidence.route).toMatchObject({
          freshness: "remote_live",
          confidence: "medium",
        });
        expect(parsed.source_confidence.remote).toMatchObject({
          freshness: "remote_live",
          confidence: "medium",
        });
      } finally {
        statusIo.restore();
      }

      const briefIo = captureStdIO();
      try {
        const code = await runCli(["task", "brief", taskId, "--json", "--remote", "--root", root]);
        expect(code).toBe(0);
        const parsed = JSON.parse(briefIo.stdout) as {
          source_confidence: Record<string, { freshness: string; confidence: string }>;
        };
        expect(parsed.source_confidence.remote).toMatchObject({
          freshness: "remote_live",
          confidence: "medium",
        });
      } finally {
        briefIo.restore();
      }
    });

    await withFakeGh(
      root,
      "gh-unavailable.js",
      'console.error("authentication required");\nprocess.exit(1);\n',
      async () => {
        const statusIo = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "status",
            taskId,
            "--route",
            "--json",
            "--remote",
            "--root",
            root,
          ]);
          expect(code).toBe(0);
          const parsed = JSON.parse(statusIo.stdout) as {
            prFlow: { closeTail: { state: string; reason?: string } };
            source_confidence: Record<
              string,
              { freshness: string; confidence: string; note?: string }
            >;
          };
          expect(parsed.prFlow.closeTail.state).toBe("unavailable");
          expect(parsed.prFlow.closeTail.reason).toContain("authentication required");
          expect(parsed.source_confidence.remote).toMatchObject({
            freshness: "remote_skipped",
            confidence: "low",
          });
          expect(parsed.source_confidence.route).toMatchObject({
            freshness: "computed_local",
            confidence: "medium",
          });
        } finally {
          statusIo.restore();
        }
      },
    );
  });
});
