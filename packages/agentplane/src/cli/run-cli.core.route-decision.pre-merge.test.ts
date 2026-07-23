import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
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
      "Route decision task",
      "--description",
      "Exercise pre-merge closure route decisions.",
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

async function withFakeGh<T>(filename: string, source: string, run: () => Promise<T>): Promise<T> {
  const fakeRoot = await mkdtemp(path.join(tmpdir(), "agentplane-fake-gh-"));
  const fakeGh = path.join(fakeRoot, filename);
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
    await rm(fakeRoot, { recursive: true, force: true });
  }
}

async function createClosedPreMergeTask(): Promise<{
  root: string;
  taskId: string;
  branchName: string;
  branchHeadSha: string;
}> {
  const root = await mkGitRepoRootWithBranch("main");
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  await writeConfig(root, config);
  await runCliSilent(["branch", "base", "set", "main", "--root", root]);

  const taskId = await createBranchPrTask(root);
  const branchName = `task/${taskId}/pre-merge-closure`;
  await runCliSilent([
    "task",
    "plan",
    "set",
    taskId,
    "--text",
    "Exercise pre-merge closure route decisions.",
    "--updated-by",
    "ORCHESTRATOR",
    "--root",
    root,
  ]);
  await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

  await execFileAsync("git", ["checkout", "-b", branchName], { cwd: root });
  await writeFile(path.join(root, "impl.txt"), "implementation\n", "utf8");
  await execFileAsync("git", ["add", "impl.txt"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "feat: implementation"], { cwd: root });
  const { stdout: implementationShaRaw } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: root,
  });
  const implementationSha = implementationShaRaw.trim();
  await runCliSilent([
    "task",
    "start-ready",
    taskId,
    "--author",
    "CODER",
    "--body",
    "Start: prepare the branch for final publication.",
    "--root",
    root,
  ]);
  await runCliSilent([
    "verify",
    taskId,
    "--ok",
    "--by",
    "CODER",
    "--note",
    "Implementation verified before closure.",
    "--root",
    root,
  ]);
  await runCliSilent([
    "evaluator",
    "run",
    taskId,
    "--provenance",
    "evaluator_supplied",
    "--verdict",
    "pass",
    "--summary",
    "Quality review passed.",
    "--finding",
    "No blocking findings.",
    "--evidence",
    `.agentplane/tasks/${taskId}/README.md`,
    "--root",
    root,
  ]);
  await mkdir(path.join(root, ".agentplane", "tasks", taskId, "pr"), { recursive: true });
  await writeFile(
    path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"),
    `${JSON.stringify(
      {
        schema_version: 1,
        task_id: taskId,
        branch: branchName,
        base: "main",
        status: "OPEN",
        pr_number: 4402,
        pr_url: "https://github.test/pull/4402",
        created_at: "2026-04-05T09:00:00.000Z",
        updated_at: "2026-04-05T09:00:00.000Z",
        verify: { status: "pass" },
      },
      null,
      2,
    )}\n`,
  );
  await execFileAsync("git", ["add", "-A"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "task: seed pre-merge evidence"], {
    cwd: root,
  });
  const finishIo = captureStdIO();
  try {
    const finishCode = await runCli([
      "finish",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Verified: final pre-merge closure packet is complete and ready for hosted integration.",
      "--result",
      "pre-merge closure",
      "--commit",
      implementationSha,
      "--pre-merge-closure",
      "--root",
      root,
    ]);
    if (finishCode !== 0) throw new Error(finishIo.stderr);
    expect(finishCode).toBe(0);
  } finally {
    finishIo.restore();
  }
  const { stdout: postFinishStatus } = await execFileAsync("git", ["status", "--porcelain"], {
    cwd: root,
  });
  if (postFinishStatus.trim()) {
    await execFileAsync("git", ["add", "-A"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "task: persist post-finish lifecycle state"], {
      cwd: root,
    });
  }
  const { stdout: branchHeadRaw } = await execFileAsync("git", ["rev-parse", branchName], {
    cwd: root,
  });
  return { root, taskId, branchName, branchHeadSha: branchHeadRaw.trim() };
}

describe("pre-merge closure route decisions", () => {
  it("requires remote refresh before publishing a locally recorded open PR", async () => {
    const { root, taskId } = await createClosedPreMergeTask();
    const providerMarker = path.join(root, "provider-called");
    await withFakeGh(
      "gh-must-not-run.js",
      `import { writeFileSync } from "node:fs";\nwriteFileSync(${JSON.stringify(providerMarker)}, "called");\nprocess.exit(97);\n`,
      async () => {
        const statusIo = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "status",
            taskId,
            "--route",
            "--json",
            "--root",
            root,
          ]);
          if (code !== 0) process.stderr.write(statusIo.stderr);
          expect(code).toBe(0);
          const parsed = JSON.parse(statusIo.stdout) as {
            nextAction: { code: string; command: string };
            oracle: { phase: string; authoritativeCheckout: string };
            source_confidence: {
              remote: { freshness: string; confidence: string };
            };
          };
          expect(parsed.nextAction).toMatchObject({
            code: "refresh_remote_route",
            command: `agentplane task next-action ${taskId} --remote --explain`,
          });
          expect(parsed.oracle).toMatchObject({
            phase: "remote_route_refresh_needed",
            authoritativeCheckout: "base_checkout",
          });
          expect(parsed.source_confidence.remote).toMatchObject({
            freshness: "remote_skipped",
            confidence: "skipped",
          });
        } finally {
          statusIo.restore();
        }
        await expect(readFile(providerMarker, "utf8")).rejects.toMatchObject({ code: "ENOENT" });
      },
    );
  });

  it("publishes only after live provider state confirms an open PR at another head", async () => {
    const { root, taskId, branchName, branchHeadSha } = await createClosedPreMergeTask();
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
    });
    await execFileAsync("git", ["update-ref", `refs/remotes/origin/${branchName}`, branchHeadSha], {
      cwd: root,
    });
    await execFileAsync(
      "git",
      ["branch", "--set-upstream-to", `origin/${branchName}`, branchName],
      { cwd: root },
    );

    const providerHead = "1111111111111111111111111111111111111111";
    const fakeSource = [
      "const args = process.argv.slice(2);",
      'if (args[0] === "api" && args[1] === "repos/example/repo/pulls/4402") {',
      `  console.log(${JSON.stringify(
        JSON.stringify({
          number: 4402,
          html_url: "https://github.test/pull/4402",
          state: "open",
          merged_at: null,
          merge_commit_sha: null,
          head: { ref: branchName, sha: providerHead },
          base: { ref: "main" },
        }),
      )});`,
      "  process.exit(0);",
      "}",
      'if (args[0] === "pr" && args[1] === "checks") {',
      '  console.log("[]");',
      "  process.exit(0);",
      "}",
      'if (args[0] === "api" && args[1] === "graphql") {',
      "  console.log(JSON.stringify({ data: { repository: { pullRequest: { reviewThreads: { nodes: [] } } } } }));",
      "  process.exit(0);",
      "}",
      "console.error(`unexpected gh args: ${JSON.stringify(args)}`);",
      "process.exit(91);",
      "",
    ].join("\n");

    await withFakeGh("gh-open-mismatch.js", fakeSource, async () => {
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
        if (code !== 0) process.stderr.write(statusIo.stderr);
        expect(code).toBe(0);
        const parsed = JSON.parse(statusIo.stdout) as {
          prFlow: {
            pr: { state: string; source: string; headSha: string | null };
            publication: { state: string; hostedHeadSha: string | null };
          };
          nextAction: { code: string; command: string };
          oracle: { phase: string; authoritativeCheckout: string };
          source_confidence: {
            remote: { freshness: string; confidence: string };
          };
        };
        expect(parsed.prFlow.pr).toMatchObject({
          state: "OPEN",
          source: "lookup",
          headSha: providerHead,
        });
        expect(parsed.prFlow.publication).toMatchObject({
          state: "hosted_mismatch",
          hostedHeadSha: providerHead,
        });
        expect(parsed.nextAction).toMatchObject({
          code: "publish_pr_head",
          command: `agentplane pr open ${taskId} --author CODER`,
        });
        expect(parsed.oracle).toMatchObject({
          phase: "pr_head_publication_needed",
          authoritativeCheckout: "task_worktree",
        });
        expect(parsed.source_confidence.remote).toMatchObject({
          freshness: "remote_live",
          confidence: "medium",
        });
      } finally {
        statusIo.restore();
      }
    });
  });
});
