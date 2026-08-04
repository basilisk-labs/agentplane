import { execFile } from "node:child_process";
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";
import { parseTaskReadme } from "@agentplaneorg/core/tasks";
import { createIncidentRegistrySkeleton } from "../runtime/incidents/index.js";

import { runCli } from "./run-cli.js";
import {
  approveTaskPlan,
  captureStdIO,
  installRunCliIntegrationHarness,
  recordVerificationOk,
  runCliSilent,
  writeAndConfigureRoot,
  writeConfig,
} from "@agentplane/testkit";

const execFileAsync = promisify(execFile);
const RELEASE_TASK_EVIDENCE_SCRIPT = path.resolve(
  process.cwd(),
  "scripts/release/release-task-evidence.mjs",
);

installRunCliIntegrationHarness();

async function installMergedPullProvider(opts: {
  root: string;
  pull: Record<string, unknown>;
}): Promise<{ fakeBin: string; logPath: string }> {
  const fakeBin = path.join(opts.root, "fake-github-provider");
  await mkdir(fakeBin, { recursive: true });
  const scriptPath = path.join(fakeBin, "fake-gh.mjs");
  const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
  await writeFile(
    scriptPath,
    [
      'import fs from "node:fs";',
      "const args = process.argv.slice(2);",
      "const logPath = process.env.AGENTPLANE_GH_LOG;",
      "if (logPath) fs.appendFileSync(logPath, `${JSON.stringify(args)}\\n`);",
      `const pull = ${JSON.stringify(opts.pull)};`,
      'if (args[0] === "pr" && args[1] === "checks") { console.log("[]"); process.exit(0); }',
      'if (args[0] !== "api") process.exit(90);',
      'const endpoint = args[1] ?? "";',
      'if (endpoint.startsWith("repos/example/repo/pulls?")) { console.log(JSON.stringify([pull])); process.exit(0); }',
      "if (/^repos\\/example\\/repo\\/pulls\\/\\d+$/.test(endpoint)) { console.log(JSON.stringify(pull)); process.exit(0); }",
      'if (endpoint === "graphql") {',
      "  console.log(JSON.stringify({ data: { repository: { pullRequest: { reviewThreads: { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } } } } } }));",
      "  process.exit(0);",
      "}",
      "console.error(`unexpected gh args: ${JSON.stringify(args)}`);",
      "process.exit(91);",
      "",
    ].join("\n"),
    "utf8",
  );
  if (process.platform === "win32") {
    await writeFile(ghPath, '@echo off\r\nnode "%~dp0\\fake-gh.mjs" %*\r\n', "utf8");
  } else {
    await writeFile(ghPath, '#!/bin/sh\nnode "$(dirname "$0")/fake-gh.mjs" "$@"\n', "utf8");
    await chmod(ghPath, 0o755);
  }
  return { fakeBin, logPath: path.join(fakeBin, "gh.log") };
}

async function readRemoteRoute(opts: { root: string; taskId: string }): Promise<{
  route_oracle: { phase: string; nextCommand: string | null };
  workflow_step: { id: string; kind: string };
  blockers: { code: string }[];
}> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "next-action",
      opts.taskId,
      "--remote",
      "--json",
      "--root",
      opts.root,
    ]);
    expect(code, io.stderr).toBe(0);
    return JSON.parse(io.stdout) as {
      route_oracle: { phase: string; nextCommand: string | null };
      workflow_step: { id: string; kind: string };
      blockers: { code: string }[];
    };
  } finally {
    io.restore();
  }
}

describe("release evidence route convergence", { timeout: 300_000 }, () => {
  it("keeps a closed branch_pr task terminal after an evidence-only README commit", async () => {
    const root = await writeAndConfigureRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await mkdir(path.join(root, "packages", "agentplane", "assets", "policy"), {
      recursive: true,
    });
    const incidents = createIncidentRegistrySkeleton();
    await writeFile(path.join(root, ".agentplane", "policy", "incidents.md"), incidents, "utf8");
    await writeFile(
      path.join(root, "packages", "agentplane", "assets", "policy", "incidents.md"),
      incidents,
      "utf8",
    );
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "--no-verify", "-m", "seed"], { cwd: root });
    const { stdout: baseStdout } = await execFileAsync(
      "git",
      ["rev-parse", "--abbrev-ref", "HEAD"],
      { cwd: root },
    );
    const baseBranch = baseStdout.trim();
    const taskId = "202603271950-E7D007";
    const branch = `task/${taskId}/release-evidence-route`;

    expect(
      await runCliSilent([
        "task",
        "add",
        taskId,
        "--title",
        "Release evidence route fixture",
        "--description",
        "Prove evidence-only task metadata preserves terminal routing.",
        "--priority",
        "high",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]),
    ).toBe(0);
    await approveTaskPlan(root, taskId);
    expect(
      await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: exercise the exact hosted release-evidence route.",
        "--root",
        root,
      ]),
    ).toBe(0);
    await recordVerificationOk(root, taskId);
    expect(
      await runCliSilent([
        "pr",
        "open",
        taskId,
        "--branch",
        branch,
        "--sync-only",
        "--author",
        "CODER",
        "--root",
        root,
      ]),
    ).toBe(0);

    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(
      path.join(root, "src", "release-evidence-route.ts"),
      "export const ok = true;\n",
    );
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync(
      "git",
      ["commit", "--no-verify", "-m", "feat: release evidence route fixture"],
      { cwd: root },
    );
    await recordVerificationOk(root, taskId);
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}`], { cwd: root });
    await execFileAsync(
      "git",
      ["commit", "--no-verify", "-m", "task: record release route verification"],
      { cwd: root },
    );
    const { stdout: branchHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const branchHead = branchHeadStdout.trim();

    await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", branch, "-m", "Merge release fixture"], {
      cwd: root,
    });
    const { stdout: mergeStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const mergeSha = mergeStdout.trim();
    const eventDir = await mkdtemp(path.join(tmpdir(), "agentplane-release-route-event-"));
    const eventPath = path.join(eventDir, "event.json");
    await writeFile(
      eventPath,
      `${JSON.stringify({
        pull_request: {
          merged: true,
          number: 91,
          title: "Release evidence route fixture",
          merge_commit_sha: mergeSha,
          merged_at: "2026-08-04T17:10:00.000Z",
          head: { ref: branch, sha: branchHead },
          base: { ref: baseBranch },
        },
      })}\n`,
      "utf8",
    );
    expect(
      await runCliSilent(["task", "hosted-close", "--event-json", eventPath, "--root", root]),
    ).toBe(0);

    const taskReadme = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const beforeEvidence = parseTaskReadme(await readFile(taskReadme, "utf8")).frontmatter;
    expect(beforeEvidence.status).toBe("DONE");
    expect(beforeEvidence.quality_review?.state).toBe("pass");

    const publishResultPath = path.join(root, "publish-result.json");
    await writeFile(
      publishResultPath,
      `${JSON.stringify({
        success: true,
        sha: mergeSha,
        version: "0.7.3",
        tag: "v0.7.3",
        packages: {
          core: { source: "published_in_run" },
          recipes: { source: "published_in_run" },
          cli: { source: "published_in_run" },
        },
        checks: {
          npmSmoke: { passed: true, outcome: "success" },
          githubRelease: { created: true, outcome: "success" },
        },
        job: { runId: "30913095505" },
      })}\n`,
      "utf8",
    );
    await execFileAsync(
      "bun",
      [
        RELEASE_TASK_EVIDENCE_SCRIPT,
        "apply",
        "--task-id",
        taskId,
        "--publish-result",
        publishResultPath,
        "--repo",
        "example/repo",
        "--author",
        "DEUS",
        "--at",
        "2026-08-04T17:15:00.000Z",
      ],
      { cwd: root, env: process.env },
    );
    const afterEvidence = parseTaskReadme(await readFile(taskReadme, "utf8")).frontmatter;
    expect(afterEvidence.verification).toEqual(beforeEvidence.verification);
    expect(afterEvidence.quality_review).toEqual(beforeEvidence.quality_review);

    const taskReadmeRel = `.agentplane/tasks/${taskId}/README.md`;
    await execFileAsync("git", ["add", taskReadmeRel], { cwd: root });
    await execFileAsync(
      "git",
      ["commit", "--no-verify", "-m", "task-evidence: record hosted publish evidence"],
      { cwd: root },
    );
    const { stdout: evidencePaths } = await execFileAsync(
      "git",
      ["show", "--format=", "--name-only", "HEAD"],
      { cwd: root },
    );
    expect(evidencePaths.trim()).toBe(taskReadmeRel);
    await execFileAsync("git", ["branch", "-d", branch], { cwd: root });
    await execFileAsync("git", ["remote", "add", "origin", "git@github.com:example/repo.git"], {
      cwd: root,
    });
    const { stdout: evidenceHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    await execFileAsync(
      "git",
      ["update-ref", `refs/remotes/origin/${baseBranch}`, evidenceHeadStdout.trim()],
      { cwd: root },
    );

    const pull = {
      number: 91,
      html_url: "https://github.com/example/repo/pull/91",
      state: "closed",
      merged_at: "2026-08-04T17:10:00.000Z",
      merge_commit_sha: mergeSha,
      head: { ref: branch, sha: branchHead },
      base: { ref: baseBranch },
    };
    const fakeProvider = await installMergedPullProvider({ root, pull });
    const oldPath = process.env.PATH;
    const oldGhLog = process.env.AGENTPLANE_GH_LOG;
    process.env.PATH = `${fakeProvider.fakeBin}${path.delimiter}${oldPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = fakeProvider.logPath;
    try {
      let route = await readRemoteRoute({ root, taskId });
      if (route.route_oracle.phase === "side_effect_authority_required") {
        const command = route.route_oracle.nextCommand;
        if (!command) throw new Error("expected authority grant command");
        await runCliSilent([...command.split(" ").slice(1), "--root", root]);
        route = await readRemoteRoute({ root, taskId });
      }
      const providerLog = await readFile(fakeProvider.logPath, "utf8").catch(() => "no gh calls");
      expect(route.blockers).toEqual([]);
      expect(route.route_oracle.phase, providerLog).toBe("done");
      expect(route.workflow_step).toMatchObject({ id: "terminal.done", kind: "terminal" });
    } finally {
      process.env.PATH = oldPath;
      if (oldGhLog === undefined) delete process.env.AGENTPLANE_GH_LOG;
      else process.env.AGENTPLANE_GH_LOG = oldGhLog;
      await rm(eventDir, { recursive: true, force: true });
    }
  });
});
