import { execFile } from "node:child_process";
import { appendFile, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/release/check-task-registry-ready.mjs");
const temps: string[] = [];

async function makeRepo(
  tasks: {
    id: string;
    status: string;
    title?: string;
    mergedPr?: boolean;
    dependsOn?: string[];
  }[],
) {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-task-registry-ready-"));
  temps.push(root);
  for (const task of tasks) {
    const dir = path.join(root, ".agentplane", "tasks", task.id);
    await mkdir(dir, { recursive: true });
    await writeFile(
      path.join(dir, "README.md"),
      [
        "---",
        `id: ${task.id}`,
        `title: ${task.title ?? "Test task"}`,
        `status: ${task.status}`,
        task.dependsOn?.length
          ? ["depends_on:", ...task.dependsOn.map((dependency) => `  - "${dependency}"`)].join("\n")
          : "depends_on: []",
        "tags:",
        task.title?.startsWith("Release AgentPlane") ? '  - "release"' : '  - "code"',
        "---",
        "",
      ].join("\n"),
      "utf8",
    );
    if (task.mergedPr) {
      const prDir = path.join(dir, "pr");
      await mkdir(prDir, { recursive: true });
      await writeFile(
        path.join(prDir, "meta.json"),
        `${JSON.stringify(
          {
            schema_version: 1,
            task_id: task.id,
            status: "MERGED",
            pr_number: 4050,
            merge_commit: "abcdef1234567890abcdef1234567890abcdef12",
          },
          null,
          2,
        )}\n`,
        "utf8",
      );
    }
  }
  await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
  await writeFile(
    path.join(root, "packages", "agentplane", "package.json"),
    `${JSON.stringify({ name: "agentplane", version: "0.6.3" }, null, 2)}\n`,
    "utf8",
  );
  return root;
}

async function writeReleasePlan(
  root: string,
  plan: {
    rootTaskId: string;
    requiredTaskIds: string[];
    optionalTaskIds?: string[];
  },
) {
  const planDir = path.join(root, "docs", "internal");
  await mkdir(planDir, { recursive: true });
  await writeFile(
    path.join(planDir, "v0.7-release-task-closure.json"),
    `${JSON.stringify(
      {
        schema_version: 1,
        release: "0.7.0",
        root_task_id: plan.rootTaskId,
        required_task_ids: plan.requiredTaskIds,
        optional_tasks: (plan.optionalTaskIds ?? []).map((taskId) => ({
          task_id: taskId,
          reason: "Optional prerelease qualification.",
        })),
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
}

async function runRegistryCheck(root: string) {
  return execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
    () => ({ ok: true as const, stderr: "" }),
    (error: unknown) => {
      const stderr =
        typeof error === "object" &&
        error !== null &&
        "stderr" in error &&
        typeof (error as { stderr?: unknown }).stderr === "string"
          ? (error as { stderr: string }).stderr
          : "";
      return { ok: false as const, stderr };
    },
  );
}

afterEach(async () => {
  while (temps.length > 0) {
    const dir = temps.pop();
    if (dir) await rm(dir, { recursive: true, force: true });
  }
});

describe("check-task-registry-ready script", () => {
  it("passes when no local task is DOING", async () => {
    const root = await makeRepo([{ id: "202605190001-ABC123", status: "DONE" }]);

    await expect(execFileAsync("node", [SCRIPT_PATH], { cwd: root })).resolves.toBeDefined();
  });

  it("fails with remediation when a local task is DOING", async () => {
    const root = await makeRepo([{ id: "202605190001-ABC123", status: "DOING" }]);

    const result = await execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("DOING task blocks release readiness");
    expect(result.stderr).toContain(
      "finish, close, or explicitly move it out of the release scope",
    );
  });

  it("fails with explicit remediation when a branch_pr task is merged pending close", async () => {
    const root = await makeRepo([{ id: "202605190001-ABC123", status: "DOING", mergedPr: true }]);

    const result = await execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("MERGED_PENDING_CLOSE task blocks release readiness");
    expect(result.stderr).toContain("wait for hosted close to record DONE");
    expect(result.stderr).not.toContain("DOING task blocks release readiness");
  });

  it("allows the current version release task only when explicitly requested", async () => {
    const root = await makeRepo([
      { id: "202605190001-ABC123", status: "DOING", title: "Release AgentPlane v0.6.3" },
    ]);

    await expect(
      execFileAsync("node", [SCRIPT_PATH, "--allow-active-release-task"], { cwd: root }),
    ).resolves.toBeDefined();
  });

  it("does not allow unrelated DOING tasks that merely mention the release version", async () => {
    const root = await makeRepo([
      { id: "202605190001-ABC123", status: "DOING", title: "Fix release notes for v0.6.3" },
    ]);

    const result = await execFileAsync("node", [SCRIPT_PATH, "--allow-active-release-task"], {
      cwd: root,
    }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("DOING task blocks release readiness");
  });

  it("still blocks open release observations on the allowed active release task", async () => {
    const root = await makeRepo([
      { id: "202605190001-ABC123", status: "DOING", title: "Release AgentPlane v0.6.3" },
    ]);
    await appendFile(
      path.join(root, ".agentplane", "tasks", "202605190001-ABC123", "observations.jsonl"),
      `${JSON.stringify({
        schema_version: "0.1",
        id: "obs-release-risk",
        task_id: "202605190001-ABC123",
        severity: "high",
        summary: "Release blocker",
        recommended_action: { type: "none" },
        status: "open",
      })}\n`,
      "utf8",
    );

    const result = await execFileAsync("node", [SCRIPT_PATH, "--allow-active-release-task"], {
      cwd: root,
    }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("obs-release-risk requires severity triage");
  });

  it("fails release readiness on open medium actionable observations", async () => {
    const root = await makeRepo([{ id: "202605190001-ABC123", status: "DONE" }]);
    await appendFile(
      path.join(root, ".agentplane", "tasks", "202605190001-ABC123", "observations.jsonl"),
      `${JSON.stringify({
        schema_version: "0.1",
        id: "obs-release-gate",
        task_id: "202605190001-ABC123",
        created_at: "2026-05-20T00:00:00.000Z",
        author: "AGENT",
        phase: "verification",
        kind: "issue_candidate",
        severity: "medium",
        summary: "Release should not hide actionable task observations.",
        recommended_action: { type: "github_issue", title: "Triage before release" },
        status: "open",
      })}\n`,
      "utf8",
    );

    const result = await execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("obs-release-gate requires github_issue triage");
  });

  it("blocks open high observations even with action none", async () => {
    const root = await makeRepo([{ id: "202605190001-ABC123", status: "DONE" }]);
    await appendFile(
      path.join(root, ".agentplane", "tasks", "202605190001-ABC123", "observations.jsonl"),
      `${JSON.stringify({
        schema_version: "0.1",
        id: "obs-severe-risk",
        task_id: "202605190001-ABC123",
        created_at: "2026-05-20T00:00:00.000Z",
        author: "AGENT",
        phase: "verification",
        kind: "risk",
        severity: "high",
        summary: "Severe open risk must block release even before action routing is known.",
        recommended_action: { type: "none" },
        status: "open",
      })}\n`,
      "utf8",
    );

    const result = await execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("obs-severe-risk requires severity triage");
  });

  it("allows open medium observations with action none", async () => {
    const root = await makeRepo([{ id: "202605190001-ABC123", status: "DONE" }]);
    await appendFile(
      path.join(root, ".agentplane", "tasks", "202605190001-ABC123", "observations.jsonl"),
      `${JSON.stringify({
        schema_version: "0.1",
        id: "obs-release-note",
        task_id: "202605190001-ABC123",
        created_at: "2026-05-20T00:00:00.000Z",
        author: "AGENT",
        phase: "verification",
        kind: "decision",
        severity: "medium",
        summary: "No downstream action required.",
        recommended_action: { type: "none" },
        status: "open",
      })}\n`,
      "utf8",
    );

    await expect(execFileAsync("node", [SCRIPT_PATH], { cwd: root })).resolves.toBeDefined();
  });

  it("accepts a fully classified release closure and a disconnected declared optional task", async () => {
    const rootTaskId = "202605190001-ROOT01";
    const gateTaskId = "202605190002-GATE01";
    const rf02TaskId = "202605190003-RF0200";
    const rf20TaskId = "202605190004-RF2000";
    const optionalTaskId = "202605190005-OPT001";
    const root = await makeRepo([
      { id: rootTaskId, status: "TODO", dependsOn: [gateTaskId] },
      { id: gateTaskId, status: "DONE", dependsOn: [rf02TaskId, rf20TaskId] },
      { id: rf02TaskId, status: "DONE" },
      { id: rf20TaskId, status: "DONE" },
      { id: optionalTaskId, status: "DONE" },
    ]);
    await writeReleasePlan(root, {
      rootTaskId,
      requiredTaskIds: [gateTaskId, rf02TaskId, rf20TaskId],
      optionalTaskIds: [optionalTaskId],
    });

    await expect(execFileAsync("node", [SCRIPT_PATH], { cwd: root })).resolves.toBeDefined();
  });

  it("fails closed when the v0.7 roadmap exists without its release closure contract", async () => {
    const root = await makeRepo([{ id: "202605190001-ROOT01", status: "DONE" }]);
    const planDir = path.join(root, "docs", "internal");
    await mkdir(planDir, { recursive: true });
    await writeFile(path.join(planDir, "v0.7-refactor-plan.md"), "# AgentPlane 0.7 plan\n", "utf8");

    const result = await runRegistryCheck(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("release plan is missing");
  });

  it("names RF-02 and RF-20 when their release dependency edges are removed", async () => {
    const rootTaskId = "202605190001-ROOT01";
    const gateTaskId = "202605190002-GATE01";
    const rf02TaskId = "202605190003-RF0200";
    const rf20TaskId = "202605190004-RF2000";
    const root = await makeRepo([
      { id: rootTaskId, status: "TODO", dependsOn: [gateTaskId] },
      { id: gateTaskId, status: "DONE" },
      { id: rf02TaskId, status: "DONE" },
      { id: rf20TaskId, status: "DONE" },
    ]);
    await writeReleasePlan(root, {
      rootTaskId,
      requiredTaskIds: [gateTaskId, rf02TaskId, rf20TaskId],
    });

    const result = await runRegistryCheck(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain(`required task ${rf02TaskId} is not an ancestor`);
    expect(result.stderr).toContain(`required task ${rf20TaskId} is not an ancestor`);
  });

  it("reports release cycles and unknown dependencies with exact task ids", async () => {
    const rootTaskId = "202605190001-ROOT01";
    const gateTaskId = "202605190002-GATE01";
    const cycleTaskId = "202605190003-CYCLE1";
    const unknownTaskId = "202605190099-MISS01";
    const root = await makeRepo([
      { id: rootTaskId, status: "TODO", dependsOn: [gateTaskId] },
      { id: gateTaskId, status: "DONE", dependsOn: [cycleTaskId, unknownTaskId] },
      { id: cycleTaskId, status: "DONE", dependsOn: [gateTaskId] },
    ]);
    await writeReleasePlan(root, {
      rootTaskId,
      requiredTaskIds: [gateTaskId, cycleTaskId],
    });

    const result = await runRegistryCheck(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain(
      `release dependency cycle: ${gateTaskId} -> ${cycleTaskId} -> ${gateTaskId}`,
    );
    expect(result.stderr).toContain(`unknown dependency ${gateTaskId} -> ${unknownTaskId}`);
  });

  it("rejects an optional task that the release root requires in practice", async () => {
    const rootTaskId = "202605190001-ROOT01";
    const optionalTaskId = "202605190002-OPT001";
    const root = await makeRepo([
      { id: rootTaskId, status: "TODO", dependsOn: [optionalTaskId] },
      { id: optionalTaskId, status: "DONE" },
    ]);
    await writeReleasePlan(root, {
      rootTaskId,
      requiredTaskIds: [],
      optionalTaskIds: [optionalTaskId],
    });

    const result = await runRegistryCheck(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain(`optional task ${optionalTaskId} is required by release root`);
  });
});
