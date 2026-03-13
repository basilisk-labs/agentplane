import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/write-publish-result-manifest.mjs");

const roots: string[] = [];

async function makeRoot() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-publish-result-"));
  roots.push(root);
  return root;
}

async function runScript(root: string, args: string[] = [], env: Record<string, string> = {}) {
  return execFileAsync("node", [SCRIPT_PATH, ...args], {
    cwd: root,
    env: {
      ...process.env,
      ...env,
    },
  });
}

afterEach(async () => {
  while (roots.length > 0) {
    const root = roots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("write-publish-result-manifest script", () => {
  it("emits a successful publish-result manifest when publish completed cleanly", async () => {
    const root = await makeRoot();
    const outPath = path.join(root, ".agentplane", ".release", "publish", "publish-result.json");

    const result = await runScript(
      root,
      [
        "--out",
        outPath,
        "--json",
        "--sha",
        "abc123",
        "--version",
        "0.3.6",
        "--tag",
        "v0.3.6",
        "--release-ready-run-id",
        "999",
        "--job-status",
        "success",
        "--core-prepublished",
        "false",
        "--cli-prepublished",
        "true",
        "--core-outcome",
        "success",
        "--cli-outcome",
        "skipped",
        "--smoke-outcome",
        "success",
        "--tag-exists",
        "false",
        "--tag-outcome",
        "success",
        "--release-outcome",
        "success",
      ],
      {
        GITHUB_WORKFLOW: "Publish to npm",
        GITHUB_RUN_ID: "12345",
        GITHUB_RUN_ATTEMPT: "2",
        GITHUB_EVENT_NAME: "workflow_run",
      },
    );

    const payload = JSON.parse(String(result.stdout ?? "")) as {
      success: boolean;
      reasonCode: string;
      sha: string;
      version: string;
      tag: string;
      releaseReady: { runId: string | null };
      packages: {
        core: { published: boolean; source: string };
        cli: { published: boolean; source: string };
      };
      checks: {
        npmSmoke: { passed: boolean };
        tag: { ensured: boolean };
        githubRelease: { created: boolean };
      };
      failures: string[];
      job: { workflow: string | null; runId: string | null };
    };

    expect(payload.success).toBe(true);
    expect(payload.reasonCode).toBe("publish_succeeded");
    expect(payload.sha).toBe("abc123");
    expect(payload.version).toBe("0.3.6");
    expect(payload.tag).toBe("v0.3.6");
    expect(payload.releaseReady.runId).toBe("999");
    expect(payload.packages.core.published).toBe(true);
    expect(payload.packages.core.source).toBe("published_in_run");
    expect(payload.packages.cli.published).toBe(true);
    expect(payload.packages.cli.source).toBe("preexisting");
    expect(payload.checks.npmSmoke.passed).toBe(true);
    expect(payload.checks.tag.ensured).toBe(true);
    expect(payload.checks.githubRelease.created).toBe(true);
    expect(payload.failures).toHaveLength(0);
    expect(payload.job.workflow).toBe("Publish to npm");
    expect(payload.job.runId).toBe("12345");

    const manifestText = await readFile(outPath, "utf8");
    expect(manifestText).toContain('"success": true');
  });

  it("emits an incomplete publish-result manifest when publish or release steps failed", async () => {
    const root = await makeRoot();
    const result = await runScript(root, [
      "--json",
      "--sha",
      "abc123",
      "--version",
      "0.3.6",
      "--tag",
      "v0.3.6",
      "--job-status",
      "failure",
      "--core-prepublished",
      "false",
      "--cli-prepublished",
      "false",
      "--core-outcome",
      "failure",
      "--cli-outcome",
      "skipped",
      "--smoke-outcome",
      "skipped",
      "--tag-exists",
      "false",
      "--tag-outcome",
      "skipped",
      "--release-outcome",
      "skipped",
    ]);

    const payload = JSON.parse(String(result.stdout ?? "")) as {
      success: boolean;
      reasonCode: string;
      message: string;
      failures: string[];
      checks: {
        npmSmoke: { passed: boolean; outcome: string };
        githubRelease: { created: boolean; outcome: string };
      };
    };

    expect(payload.success).toBe(false);
    expect(payload.reasonCode).toBe("publish_incomplete");
    expect(payload.message).toContain("Publish result for v0.3.6 is incomplete");
    expect(payload.failures).toContain("@agentplaneorg/core publish not confirmed");
    expect(payload.failures).toContain("agentplane publish not confirmed");
    expect(payload.failures).toContain("publish job status=failure");
    expect(payload.checks.npmSmoke.passed).toBe(false);
    expect(payload.checks.npmSmoke.outcome).toBe("skipped");
    expect(payload.checks.githubRelease.created).toBe(false);
    expect(payload.checks.githubRelease.outcome).toBe("skipped");
  });
});
