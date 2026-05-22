import { execFile } from "node:child_process";
import { appendFile, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/release/check-task-registry-ready.mjs");
const temps: string[] = [];

async function makeRepo(tasks: { id: string; status: string; title?: string }[]) {
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
        "depends_on: []",
        "tags:",
        task.title?.startsWith("Release AgentPlane") ? '  - "release"' : '  - "code"',
        "---",
        "",
      ].join("\n"),
      "utf8",
    );
  }
  await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
  await writeFile(
    path.join(root, "packages", "agentplane", "package.json"),
    `${JSON.stringify({ name: "agentplane", version: "0.6.3" }, null, 2)}\n`,
    "utf8",
  );
  return root;
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
});
