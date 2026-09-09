import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { readTask } from "@agentplaneorg/core/tasks";
import { withEvaluatorPolicyFixture } from "@agentplane/testkit";
import {
  captureStdIO,
  commitAll,
  configureGitUser,
  defaultConfig,
  mkGitRepoRootWithCommit,
  runCli,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";
import { describe, expect, it } from "vitest";

import {
  approveRouteTaskPlan,
  completeRouteWorkItem,
  routeVerificationDetails,
} from "./route-decision.testkit.js";

type OpsFixture = {
  root: string;
  taskId: string;
  actionPath: string;
};

async function createOpsFixture(
  opts: {
    rollback?: string;
    verify?: boolean;
  } = {},
): Promise<OpsFixture> {
  const root = await mkGitRepoRootWithCommit();
  await configureGitUser(root);
  const config = defaultConfig();
  config.workflow_mode = "direct";
  await writeConfig(root, config);
  await runCliSilent(["branch", "base", "set", "main", "--root", root]);
  await commitAll(root, "test: seed direct ops configuration");

  const createIo = captureStdIO();
  let taskId = "";
  try {
    expect(
      await runCli([
        "task",
        "new",
        "--title",
        "Direct ops quality lifecycle",
        "--description",
        "Exercise evidence-bound quality review for an approval-gated local operation.",
        "--priority",
        "high",
        "--owner",
        "CODER",
        "--tag",
        "ops",
        "--task-kind",
        "ops",
        "--mutation-scope",
        "ops",
        "--risk",
        "deploy",
        "--blueprint-request",
        "ops.approval",
        "--route",
        "direct",
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

  await approveRouteTaskPlan(root, taskId, "Validate the local operation and rollback path.");
  await runCliSilent([
    "task",
    "doc",
    "set",
    taskId,
    "--section",
    "Rollback Plan",
    "--text",
    opts.rollback ?? "Restore the prior local configuration and rerun the operational check.",
    "--updated-by",
    "CODER",
    "--root",
    root,
  ]);
  await runCliSilent([
    "task",
    "start-ready",
    taskId,
    "--author",
    "CODER",
    "--body",
    "Start: execute the approved local operation and capture its evidence.",
    "--root",
    root,
  ]);
  await runCliSilent(["blueprint", "snapshot", taskId, "--root", root]);
  await completeRouteWorkItem(root, taskId);

  const actionPath = `.agentplane/tasks/${taskId}/evidence/action-receipt.txt`;
  await mkdir(path.dirname(path.join(root, actionPath)), { recursive: true });
  await writeFile(path.join(root, actionPath), "operation=applied\ncheck=ready\n", "utf8");
  await commitAll(root, "test: record local operation receipt");

  if (opts.verify !== false) {
    const verificationDetails = await routeVerificationDetails(root, taskId);
    const details = verificationDetails.replaceAll(
      "deterministic test fixture; no hosted evidence claimed",
      actionPath,
    );
    const verifyIo = captureStdIO();
    try {
      expect(
        await runCli([
          "verify",
          taskId,
          "--ok",
          "--by",
          "TESTER",
          "--note",
          "Verified: the approved local operation and rollback evidence are current.",
          "--details",
          details,
          "--root",
          root,
        ]),
        verifyIo.stderr,
      ).toBe(0);
    } finally {
      verifyIo.restore();
    }
  }
  return { root, taskId, actionPath };
}

async function head(root: string): Promise<string> {
  const { execFileAsync } = await import("@agentplaneorg/core/process");
  const result = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  return result.stdout.trim();
}

async function recordOpsReview(opts: OpsFixture & { commit?: string }): Promise<{
  code: number;
  stderr: string;
}> {
  const io = captureStdIO();
  try {
    const code = await withEvaluatorPolicyFixture(opts.root, () =>
      runCli([
        "evaluator",
        "run",
        opts.taskId,
        ...(opts.commit ? ["--commit", opts.commit] : []),
        "--provenance",
        "evaluator_supplied",
        "--verdict",
        "pass",
        "--summary",
        "The operational evidence satisfies the approved direct ops contract.",
        "--finding",
        "The action receipt, passing checks, and rollback evidence are complete.",
        "--evidence",
        opts.actionPath,
        "--root",
        opts.root,
      ]),
    );
    return { code, stderr: io.stderr };
  } finally {
    io.restore();
  }
}

async function finishOps(
  opts: OpsFixture & {
    commit: string;
    force?: boolean;
    body?: string;
    result?: string;
  },
): Promise<{ code: number; stderr: string }> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "finish",
      opts.taskId,
      "--author",
      "CODER",
      "--body",
      opts.body ??
        "Verified: direct ops evidence remains current and complete at lifecycle closeout.",
      "--result",
      opts.result ?? "direct ops quality lifecycle completed",
      "--commit",
      opts.commit,
      ...(opts.force ? ["--force", "--yes"] : []),
      "--no-close-commit",
      "--root",
      opts.root,
    ]);
    return { code, stderr: io.stderr };
  } finally {
    io.restore();
  }
}

describe("direct ops quality review lifecycle", { timeout: 240_000 }, () => {
  it("finishes and remains idempotent when review and finish use the same evidence commit", async () => {
    const fixture = await createOpsFixture();
    const evidenceCommit = await head(fixture.root);
    expect(await recordOpsReview({ ...fixture, commit: "HEAD" })).toMatchObject({ code: 0 });

    const stored = await readTask({
      cwd: fixture.root,
      rootOverride: fixture.root,
      taskId: fixture.taskId,
    });
    expect(stored.frontmatter.quality_review).toMatchObject({
      evaluated_sha: evidenceCommit,
      evaluated_subject: { kind: "git_commit", value: evidenceCommit },
    });

    const first = await finishOps({ ...fixture, commit: evidenceCommit });
    expect(first.code, first.stderr).toBe(0);
    const second = await finishOps({ ...fixture, commit: evidenceCommit, force: true });
    expect(second.code, second.stderr).toBe(0);
    const finishedTask = await readTask({
      cwd: fixture.root,
      rootOverride: fixture.root,
      taskId: fixture.taskId,
    });
    expect(finishedTask.frontmatter.status).toBe("DONE");
  });

  it("uses an evidence bundle instead of an unrelated HEAD and accepts a later closure commit", async () => {
    const fixture = await createOpsFixture();
    const unrelatedHead = await head(fixture.root);
    const review = await recordOpsReview(fixture);
    expect(review.code, review.stderr).toBe(0);
    const reviewed = await readTask({
      cwd: fixture.root,
      rootOverride: fixture.root,
      taskId: fixture.taskId,
    });
    expect(reviewed.frontmatter.quality_review).toMatchObject({
      evaluated_sha: null,
      evaluated_subject: { kind: "evidence_bundle" },
    });
    expect(reviewed.frontmatter.quality_review?.evaluated_subject?.value).toMatch(
      /^sha256:[a-f0-9]{64}$/u,
    );
    expect(reviewed.frontmatter.quality_review?.evaluated_subject?.value).not.toBe(unrelatedHead);

    await commitAll(fixture.root, "test: record evidence-bound quality review");
    const closureCommit = await head(fixture.root);
    const finished = await finishOps({ ...fixture, commit: closureCommit });
    expect(finished.code, finished.stderr).toBe(0);
  });

  it("rejects mismatched commits even with --force --yes", async () => {
    const fixture = await createOpsFixture();
    const evidenceCommit = await head(fixture.root);
    expect(await recordOpsReview({ ...fixture, commit: evidenceCommit })).toMatchObject({
      code: 0,
    });
    await commitAll(fixture.root, "test: create a distinct closure commit");
    const differentCommit = await head(fixture.root);

    const result = await finishOps({ ...fixture, commit: differentCommit, force: true });
    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain(
      `quality_review.evaluated_subject=git_commit:${evidenceCommit}`,
    );
    expect(result.stderr).toContain(`expected_subject=git_commit:${differentCommit}`);
    expect(result.stderr).toContain(
      `agentplane evaluator prepare ${fixture.taskId} --commit ${differentCommit}`,
    );
  });

  it("rejects evidence drift after review even with --force --yes", async () => {
    const fixture = await createOpsFixture();
    const review = await recordOpsReview(fixture);
    expect(review.code, review.stderr).toBe(0);
    const reviewed = await readTask({
      cwd: fixture.root,
      rootOverride: fixture.root,
      taskId: fixture.taskId,
    });
    const reviewedSubject = reviewed.frontmatter.quality_review?.evaluated_subject?.value;
    await commitAll(fixture.root, "test: seal evidence review for drift check");
    const closureCommit = await head(fixture.root);
    await writeFile(
      path.join(fixture.root, fixture.actionPath),
      "operation=changed-after-review\n",
    );

    const result = await finishOps({ ...fixture, commit: closureCommit, force: true });
    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain(
      `quality_review.evaluated_subject=evidence_bundle:${reviewedSubject}`,
    );
    expect(result.stderr).toContain("expected_subject=evidence_bundle:sha256:");
  });

  it("rejects bundle review when rollback or operational checks are missing", async () => {
    const missingRollback = await createOpsFixture({ rollback: "TODO" });
    const rollbackReview = await recordOpsReview(missingRollback);
    expect(rollbackReview.code).not.toBe(0);
    expect(rollbackReview.stderr).toContain("requires concrete rollback evidence");

    const missingChecks = await createOpsFixture({ verify: false });
    const checksReview = await recordOpsReview(missingChecks);
    expect(checksReview.code).not.toBe(0);
    expect(checksReview.stderr).toContain("requires passing operational checks");

    expect(
      await readFile(
        path.join(missingChecks.root, `.agentplane/tasks/${missingChecks.taskId}/README.md`),
        "utf8",
      ),
    ).not.toContain("evaluated_subject:");
  });
});
