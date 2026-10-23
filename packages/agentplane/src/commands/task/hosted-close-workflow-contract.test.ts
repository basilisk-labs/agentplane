import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { tmpdir } from "node:os";
import { promisify } from "node:util";
import path from "node:path";

import { describe, expect, it } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";

const WORKFLOW_PATH = path.resolve(process.cwd(), ".github/workflows/task-hosted-close.yml");

describe("Task hosted-close workflow contract", () => {
  it("selects the merged assembly containing task artifacts rather than main", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "hosted-target-"));
    const exec = promisify(execFile);
    const git = (...args: string[]) => exec("git", args, { cwd: root });
    try {
      await git("init", "--initial-branch=main");
      await git(
        "-c",
        "user.name=Test",
        "-c",
        "user.email=test@example.invalid",
        "commit",
        "--allow-empty",
        "-m",
        "base",
      );
      await git("switch", "-c", "agentplane/assembly");
      await writeFile(path.join(root, "task-artifact.txt"), "retained task record\n");
      await git("add", "task-artifact.txt");
      await git(
        "-c",
        "user.name=Test",
        "-c",
        "user.email=test@example.invalid",
        "commit",
        "-m",
        "merged task",
      );
      const resolvedHead = await git("rev-parse", "HEAD");
      const mergeSha = resolvedHead.stdout.trim();
      const workflow = await readFile(WORKFLOW_PATH, "utf8");
      const targetStep = workflow
        .split("- name: Checkout merged target as data")[1]!
        .split("- name:")[0]!;
      const selectedRef = /^\s+ref: (.+)$/m.exec(targetStep)?.[1];
      const event = { pull_request: { base: { ref: "agentplane/assembly" } } };
      const checkoutRef =
        selectedRef === "${{ steps.prepare.outputs.base_ref }}"
          ? event.pull_request.base.ref
          : selectedRef;
      expect(checkoutRef).toBe("agentplane/assembly");
      await expect(git("show", "main:task-artifact.txt")).rejects.toThrow();
      await git("switch", checkoutRef!);
      await git("merge-base", "--is-ancestor", mergeSha, "HEAD");
      expect(await readFile(path.join(root, "task-artifact.txt"), "utf8")).toBe(
        "retained task record\n",
      );
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("executes trusted tooling without handing off to base-local code", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "hosted-untrusted-base-"));
    const exec = promisify(execFile);
    try {
      await exec("git", ["init", "--initial-branch=main"], { cwd: root });
      await mkdir(path.join(root, ".agentplane"), { recursive: true });
      await writeFile(path.join(root, ".agentplane/config.json"), JSON.stringify(defaultConfig()));
      await mkdir(path.join(root, "packages/agentplane/bin"), { recursive: true });
      await writeFile(
        path.join(root, "package.json"),
        JSON.stringify({
          name: "agentplane",
          private: true,
          workspaces: ["packages/*"],
          scripts: { "framework:dev:bootstrap": "touch UNTRUSTED_EXECUTED" },
        }),
      );
      await writeFile(
        path.join(root, "packages/agentplane/package.json"),
        JSON.stringify({ name: "agentplane", type: "module" }),
      );
      await writeFile(
        path.join(root, "packages/agentplane/bin/agentplane.js"),
        "import { writeFileSync } from 'node:fs'; writeFileSync('UNTRUSTED_EXECUTED', 'bad'); process.exit(77);\n",
      );
      const eventPath = path.join(root, "event.json");
      await writeFile(eventPath, JSON.stringify({ pull_request: { merged: false } }));
      const result = await exec(
        process.execPath,
        [
          path.resolve("packages/agentplane/dist/cli.js"),
          "task",
          "hosted-close",
          "--event-json",
          eventPath,
          "--quiet",
        ],
        { cwd: root, env: { ...process.env, AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK: "1" } },
      );
      expect(result.stderr).not.toContain("UNTRUSTED_EXECUTED");
      await expect(readFile(path.join(root, "UNTRUSTED_EXECUTED"))).rejects.toMatchObject({
        code: "ENOENT",
      });
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("runs on merged pull_request_target close events and opens a follow-up closure PR", async () => {
    const workflow = await readFile(WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("name: Task Hosted Close");
    expect(workflow).toContain("pull_request_target:");
    expect(workflow).toContain("types:");
    expect(workflow).toContain("- closed");
    expect(workflow).toContain("if: github.event.pull_request.merged == true");
    expect(workflow).toContain("contents: write");
    expect(workflow).toContain("checks: write");
    expect(workflow).toContain("pull-requests: write");
    expect(workflow).toContain("fetch-depth: 0");
    expect(workflow).toContain("ref: ${{ steps.prepare.outputs.base_ref }}");
    expect(workflow).toContain("ref: ${{ github.event.repository.default_branch }}");
    expect(workflow).toContain(
      'AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 node "$GITHUB_WORKSPACE/packages/agentplane/dist/cli.js"',
    );
    expect(workflow).not.toContain("ref: refs/heads/main");
    expect(workflow).toContain('git merge-base --is-ancestor "$MERGE_SHA" HEAD');
    expect(workflow).toContain("node scripts/prepare-hosted-task-closure.mjs");
    expect(workflow).not.toContain("pull/${{ steps.prepare.outputs.pr_number }}/head");
    expect(workflow).toContain("task hosted-close");
    expect(workflow).toContain("gh pr create");
    expect(workflow).toContain("Record hosted closure PR verification");
    expect(workflow).toContain('"repos/${{ github.repository }}/check-runs"');
    expect(workflow).toContain('-f name="PR verification"');
    expect(workflow).toContain('-f head_sha="$closure_sha"');
    expect(workflow).toContain('if gh pr merge --rebase --delete-branch "$pr_url"; then');
    expect(workflow).toContain("gh pr merge --auto --rebase --delete-branch");
    expect(workflow).not.toContain("gh pr merge --merge");
    expect(workflow).not.toContain("gh pr merge --squash");
    expect(workflow).toContain(
      "Hosted closure PR created but neither direct merge nor auto-merge could be enabled",
    );
    expect(workflow).toContain("GIT_AUTHOR_NAME: DEUS");
    expect(workflow).toContain("GIT_AUTHOR_EMAIL: deus@agentplane.org");
    expect(workflow).toContain("GIT_COMMITTER_NAME: DEUS");
    expect(workflow).toContain("GIT_COMMITTER_EMAIL: deus@agentplane.org");
    expect(workflow).not.toContain("agentplane-bot@example.com");
    expect(workflow).not.toContain("GIT_AUTHOR_NAME: agentplane-bot");
  });
});
