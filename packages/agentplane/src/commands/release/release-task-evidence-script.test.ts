import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";
import { renderTaskReadme } from "@agentplaneorg/core/tasks";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/release-task-evidence.mjs");

const roots: string[] = [];

async function git(cwd: string, args: string[]) {
  await execFileAsync("git", args, {
    cwd,
    env: process.env,
    maxBuffer: 20 * 1024 * 1024,
  });
}

async function initRepo() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-release-task-evidence-"));
  roots.push(root);
  await git(root, ["init", "-b", "main"]);
  await git(root, ["config", "user.name", "agentplane-test"]);
  await git(root, ["config", "user.email", "agentplane-test@example.com"]);
  return root;
}

async function commitAll(root: string, message: string) {
  await git(root, ["add", "."]);
  await git(root, ["commit", "--no-verify", "-m", message]);
  const result = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    env: process.env,
  });
  return String(result.stdout ?? "").trim();
}

async function writeTaskReadme(
  root: string,
  taskId: string,
  opts: {
    verificationState?: "pending" | "ok" | "needs_rework";
    verificationText?: string;
    docUpdatedAt?: string;
  } = {},
) {
  const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
  await mkdir(path.dirname(readmePath), { recursive: true });
  const verificationText =
    opts.verificationText ??
    ["<!-- BEGIN VERIFICATION RESULTS -->", "<!-- END VERIFICATION RESULTS -->"].join("\n");
  const docUpdatedAt = opts.docUpdatedAt ?? "2026-04-19T00:00:00.000Z";
  const verificationState = opts.verificationState ?? "pending";
  const body = [
    "## Summary",
    "",
    "Release task summary",
    "",
    "## Scope",
    "",
    "scope",
    "",
    "## Plan",
    "",
    "plan",
    "",
    "## Verify Steps",
    "",
    "1. verify",
    "",
    "## Verification",
    "",
    verificationText,
    "",
    "## Rollback Plan",
    "",
    "rollback",
    "",
    "## Findings",
    "",
  ].join("\n");
  const text = renderTaskReadme(
    {
      id: taskId,
      title: "Release task",
      status: "DONE",
      priority: "high",
      owner: "CODER",
      revision: 1,
      origin: { system: "manual" },
      depends_on: [],
      tags: ["release"],
      verify: [],
      plan_approval: {
        state: "approved",
        updated_at: "2026-04-19T00:00:00.000Z",
        updated_by: "ORCHESTRATOR",
        note: null,
      },
      verification: {
        state: verificationState,
        updated_at: null,
        updated_by: null,
        note: null,
      },
      comments: [],
      events: [],
      doc_version: 3,
      doc_updated_at: docUpdatedAt,
      doc_updated_by: "CODER",
      description: "release task",
      sections: {
        Summary: "Release task summary",
        Scope: "scope",
        Plan: "plan",
        "Verify Steps": "1. verify",
        Verification: verificationText,
        "Rollback Plan": "rollback",
        Findings: "",
      },
      id_source: "generated",
    },
    body,
  );
  await writeFile(readmePath, text, "utf8");
  return readmePath;
}

async function writePublishResult(root: string, payload: unknown) {
  const filePath = path.join(root, ".agentplane", ".release", "publish", "publish-result.json");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return filePath;
}

function buildPublishResult(success = true) {
  return {
    success,
    reasonCode: success ? "publish_succeeded" : "publish_incomplete",
    message: success ? "ok" : "not ok",
    sha: "abc123def4567890",
    version: "0.3.15",
    tag: "v0.3.15",
    packages: {
      core: {
        alreadyPublished: false,
        stepOutcome: "success",
        published: true,
        source: "published_in_run",
      },
      recipes: {
        alreadyPublished: false,
        stepOutcome: "success",
        published: true,
        source: "published_in_run",
      },
      cli: {
        alreadyPublished: true,
        stepOutcome: "skipped",
        published: true,
        source: "preexisting",
      },
    },
    checks: {
      npmSmoke: { passed: true, outcome: "success" },
      tag: { ensured: true, outcome: "success", existed: false },
      githubRelease: { created: true, outcome: "success" },
    },
    failures: [],
    job: {
      workflow: "Publish to npm",
      runId: "24628440381",
      runAttempt: "1",
      eventName: "workflow_run",
    },
  };
}

afterEach(async () => {
  while (roots.length > 0) {
    const root = roots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("release-task-evidence script", () => {
  it("prepares a deterministic follow-up PR payload for a successful release task commit", async () => {
    const root = await initRepo();
    const taskId = "202604191130-JWBEB7";
    await writeTaskReadme(root, taskId);
    const releaseSha = await commitAll(root, "release v0.3.15");
    const publishResultPath = await writePublishResult(root, buildPublishResult(true));

    const result = await execFileAsync(
      "bun",
      [
        SCRIPT_PATH,
        "prepare",
        "--release-sha",
        releaseSha,
        "--publish-result",
        publishResultPath,
        "--repo",
        "basilisk-labs/agentplane",
      ],
      { cwd: root, env: process.env },
    );

    const payload = JSON.parse(String(result.stdout ?? "")) as {
      actionable: boolean;
      task_id: string;
      closure_branch: string;
      pr_title: string;
      pr_body: string;
    };

    expect(payload.actionable).toBe(true);
    expect(payload.task_id).toBe(taskId);
    expect(payload.closure_branch).toBe(`task-close/${taskId}/${releaseSha.slice(0, 12)}-publish`);
    expect(payload.pr_title).toBe(`task-evidence: Record hosted publish evidence [${taskId}]`);
    expect(payload.pr_body).toContain("v0.3.15");
    expect(payload.pr_body).toContain("## Source");
    expect(payload.pr_body).toContain("## Scope");
  });

  it("marks prepare as non-actionable when publish-result is incomplete", async () => {
    const root = await initRepo();
    const taskId = "202604191130-JWBEB7";
    await writeTaskReadme(root, taskId);
    const releaseSha = await commitAll(root, "release v0.3.15");
    const publishResultPath = await writePublishResult(root, buildPublishResult(false));

    let stdout = "";
    try {
      await execFileAsync(
        "bun",
        [
          SCRIPT_PATH,
          "prepare",
          "--release-sha",
          releaseSha,
          "--publish-result",
          publishResultPath,
          "--repo",
          "basilisk-labs/agentplane",
        ],
        { cwd: root, env: process.env },
      );
    } catch (error) {
      stdout = String((error as { stdout?: string }).stdout ?? "");
    }

    const payload = JSON.parse(stdout) as { actionable: boolean; reason: string };
    expect(payload.actionable).toBe(false);
    expect(payload.reason).toContain("publish-result is not successful");
  });

  it("writes hosted publish evidence into the release task README", async () => {
    const root = await initRepo();
    const taskId = "202604191130-JWBEB7";
    const readmePath = await writeTaskReadme(root, taskId);
    await commitAll(root, "seed release task");
    const publishResultPath = await writePublishResult(root, buildPublishResult(true));

    const result = await execFileAsync(
      "bun",
      [
        SCRIPT_PATH,
        "apply",
        "--task-id",
        taskId,
        "--publish-result",
        publishResultPath,
        "--repo",
        "basilisk-labs/agentplane",
        "--author",
        "DEUS",
        "--at",
        "2026-04-19T12:00:00.000Z",
      ],
      { cwd: root, env: process.env },
    );

    const payload = JSON.parse(String(result.stdout ?? "")) as { changed: boolean };
    const updated = await readFile(readmePath, "utf8");

    expect(payload.changed).toBe(true);
    expect(updated).toContain("Hosted publish confirmed for v0.3.15.");
    expect(updated).toContain(
      "release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.3.15",
    );
    expect(updated).toContain(
      "publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/24628440381",
    );
    expect(updated).toContain('updated_by: "DEUS"');
    expect(updated).toContain('state: "ok"');
  });

  it("audits only scoped recent DONE tasks with closure evidence and pending verification", async () => {
    const root = await initRepo();
    await writeTaskReadme(root, "202604280001-NEWBAD", {
      docUpdatedAt: "2026-04-28T12:00:00.000Z",
      verificationText: [
        "<!-- BEGIN VERIFICATION RESULTS -->",
        "- State: ok",
        "- Note: Hosted publish confirmed for v0.3.15.",
        "<!-- END VERIFICATION RESULTS -->",
      ].join("\n"),
    });
    await writeTaskReadme(root, "202604200001-LEGACY", {
      docUpdatedAt: "2026-04-20T12:00:00.000Z",
      verificationText: [
        "<!-- BEGIN VERIFICATION RESULTS -->",
        "- State: ok",
        "- Note: Hosted publish confirmed for v0.3.14.",
        "<!-- END VERIFICATION RESULTS -->",
      ].join("\n"),
    });
    await writeTaskReadme(root, "202604280002-NEWOK", {
      docUpdatedAt: "2026-04-28T13:00:00.000Z",
      verificationState: "ok",
      verificationText: [
        "<!-- BEGIN VERIFICATION RESULTS -->",
        "- State: ok",
        "- Note: Hosted publish confirmed for v0.3.16.",
        "<!-- END VERIFICATION RESULTS -->",
      ].join("\n"),
    });

    let stdout = "";
    try {
      await execFileAsync(
        "bun",
        [
          SCRIPT_PATH,
          "audit",
          "--since",
          "2026-04-28T00:00:00.000Z",
          "--tasks-dir",
          path.join(root, ".agentplane", "tasks"),
        ],
        { cwd: root, env: process.env },
      );
    } catch (error) {
      stdout = String((error as { stdout?: string }).stdout ?? "");
    }

    const payload = JSON.parse(stdout) as {
      ok: boolean;
      violations: { task_id: string; verification_state: string }[];
    };
    expect(payload.ok).toBe(false);
    expect(payload.violations).toEqual([
      {
        task_id: "202604280001-NEWBAD",
        readme_path: path.join(root, ".agentplane", "tasks", "202604280001-NEWBAD", "README.md"),
        doc_updated_at: "2026-04-28T12:00:00.000Z",
        verification_state: "pending",
      },
    ]);
  });
});
