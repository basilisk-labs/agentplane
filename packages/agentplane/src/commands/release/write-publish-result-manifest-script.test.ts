import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/manifest.mjs");

const roots: string[] = [];

async function makeRoot() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-publish-result-"));
  roots.push(root);
  return root;
}

async function runScript(root: string, args: string[] = [], env: Record<string, string> = {}) {
  return execFileAsync("node", [SCRIPT_PATH, "publish-result", ...args], {
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

describe("manifest script publish-result command", () => {
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
        "--recipes-prepublished",
        "false",
        "--cli-prepublished",
        "true",
        "--core-outcome",
        "success",
        "--recipes-outcome",
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
        recipes: { published: boolean; source: string };
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
    expect(payload.packages.recipes.published).toBe(true);
    expect(payload.packages.recipes.source).toBe("published_in_run");
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
      "--recipes-prepublished",
      "false",
      "--cli-prepublished",
      "false",
      "--core-outcome",
      "failure",
      "--recipes-outcome",
      "skipped",
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
    expect(payload.failures).toContain("@agentplaneorg/recipes publish not confirmed");
    expect(payload.failures).toContain("agentplane publish not confirmed");
    expect(payload.failures).toContain("publish job status=failure");
    expect(payload.checks.npmSmoke.passed).toBe(false);
    expect(payload.checks.npmSmoke.outcome).toBe("skipped");
    expect(payload.checks.githubRelease.created).toBe(false);
    expect(payload.checks.githubRelease.outcome).toBe("skipped");
  });

  it("embeds release distribution evidence when a distribution manifest is provided", async () => {
    const root = await makeRoot();
    const distributionPath = path.join(
      root,
      ".agentplane",
      ".release",
      "publish",
      "distribution",
      "release-distribution.json",
    );
    await mkdir(path.dirname(distributionPath), { recursive: true });
    await writeFile(
      distributionPath,
      `${JSON.stringify(
        {
          schemaVersion: 1,
          manifestKind: "release_distribution",
          version: "0.3.6",
          tag: "v0.3.6",
          sha: "abc123",
          releaseAssets: [
            {
              name: "install.sh",
              kind: "installer",
              sha256: "a".repeat(64),
              url: "https://github.com/basilisk-labs/agentplane/releases/download/v0.3.6/install.sh",
            },
          ],
          channels: {
            homebrewTap: {
              status: "skipped_missing_credentials",
              requiredSecret: "HOMEBREW_TAP_TOKEN",
            },
          },
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const result = await runScript(root, [
      "--json",
      "--sha",
      "abc123",
      "--version",
      "0.3.6",
      "--tag",
      "v0.3.6",
      "--distribution-manifest",
      distributionPath,
      "--job-status",
      "success",
      "--core-prepublished",
      "true",
      "--recipes-prepublished",
      "true",
      "--cli-prepublished",
      "true",
      "--core-outcome",
      "skipped",
      "--recipes-outcome",
      "skipped",
      "--cli-outcome",
      "skipped",
      "--smoke-outcome",
      "success",
      "--tag-exists",
      "true",
      "--tag-outcome",
      "skipped",
      "--release-outcome",
      "success",
    ]);

    const payload = JSON.parse(String(result.stdout ?? "")) as {
      success: boolean;
      distribution: {
        requested: boolean;
        loaded: boolean;
        manifest: {
          releaseAssets: { name: string }[];
          channels: { homebrewTap: { status: string; requiredSecret: string } };
        };
      };
    };

    expect(payload.success).toBe(true);
    expect(payload.distribution.requested).toBe(true);
    expect(payload.distribution.loaded).toBe(true);
    expect(payload.distribution.manifest.releaseAssets[0]?.name).toBe("install.sh");
    expect(payload.distribution.manifest.channels.homebrewTap.status).toBe(
      "skipped_missing_credentials",
    );
    expect(payload.distribution.manifest.channels.homebrewTap.requiredSecret).toBe(
      "HOMEBREW_TAP_TOKEN",
    );
  });

  it("marks publish incomplete when an external distribution PR is only opened", async () => {
    const root = await makeRoot();
    const homebrewResult = path.join(root, ".agentplane", ".release", "publish", "homebrew.json");
    const scoopResult = path.join(root, ".agentplane", ".release", "publish", "scoop.json");
    await mkdir(path.dirname(homebrewResult), { recursive: true });
    await writeFile(
      homebrewResult,
      `${JSON.stringify({
        schemaVersion: 1,
        module: "homebrew",
        repository: "basilisk-labs/homebrew-tap",
        status: "pr_opened",
        prUrl: "https://github.com/basilisk-labs/homebrew-tap/pull/7",
        metadata: {
          ok: false,
          warnings: [
            {
              target: "topics",
              reasonCode: "external_metadata_permission_denied",
            },
          ],
        },
      })}\n`,
      "utf8",
    );
    await writeFile(
      scoopResult,
      `${JSON.stringify({
        schemaVersion: 1,
        module: "scoop",
        repository: "basilisk-labs/scoop-bucket",
        status: "skipped_missing_credentials",
        reasonCode: "missing_credentials",
      })}\n`,
      "utf8",
    );

    const result = await runScript(root, [
      "--json",
      "--sha",
      "abc123",
      "--version",
      "0.4.2",
      "--tag",
      "v0.4.2",
      "--job-status",
      "success",
      "--core-prepublished",
      "true",
      "--recipes-prepublished",
      "true",
      "--cli-prepublished",
      "true",
      "--core-outcome",
      "skipped",
      "--recipes-outcome",
      "skipped",
      "--cli-outcome",
      "skipped",
      "--smoke-outcome",
      "success",
      "--tag-exists",
      "true",
      "--tag-outcome",
      "skipped",
      "--release-outcome",
      "success",
      "--external-result",
      homebrewResult,
      "--external-result",
      scoopResult,
    ]);

    const payload = JSON.parse(String(result.stdout ?? "")) as {
      success: boolean;
      failures: string[];
      external: {
        modules: { name: string; status: string; metadata?: { ok: boolean } }[];
      };
    };
    expect(payload.success).toBe(false);
    expect(payload.external.modules.find((module) => module.name === "homebrew")).toMatchObject({
      name: "homebrew",
      status: "pr_opened",
      metadata: { ok: false },
    });
    expect(payload.failures).toContain(
      "external distribution homebrew not confirmed (status=pr_opened)",
    );
    expect(payload.failures).toContain(
      "external distribution scoop not confirmed (status=skipped_missing_credentials reason=missing_credentials)",
    );
  });

  it("accepts merged and verified external distribution results as publish proof", async () => {
    const root = await makeRoot();
    const homebrewResult = path.join(root, ".agentplane", ".release", "publish", "homebrew.json");
    await mkdir(path.dirname(homebrewResult), { recursive: true });
    await writeFile(
      homebrewResult,
      `${JSON.stringify({
        schemaVersion: 1,
        module: "homebrew",
        repository: "basilisk-labs/homebrew-tap",
        status: "published",
        prUrl: "https://github.com/basilisk-labs/homebrew-tap/pull/7",
        verification: {
          ok: true,
          branch: "main",
          sha: "a".repeat(40),
        },
      })}\n`,
      "utf8",
    );

    const result = await runScript(root, [
      "--json",
      "--sha",
      "abc123",
      "--version",
      "0.4.2",
      "--tag",
      "v0.4.2",
      "--job-status",
      "success",
      "--core-prepublished",
      "true",
      "--recipes-prepublished",
      "true",
      "--cli-prepublished",
      "true",
      "--core-outcome",
      "skipped",
      "--recipes-outcome",
      "skipped",
      "--cli-outcome",
      "skipped",
      "--smoke-outcome",
      "success",
      "--tag-exists",
      "true",
      "--tag-outcome",
      "skipped",
      "--release-outcome",
      "success",
      "--external-result",
      homebrewResult,
    ]);

    const payload = JSON.parse(String(result.stdout ?? "")) as {
      success: boolean;
      failures: string[];
      external: {
        modules: { name: string; status: string; verification?: { ok: boolean } }[];
      };
    };
    expect(payload.success).toBe(true);
    expect(payload.failures).toHaveLength(0);
    expect(payload.external.modules[0]).toMatchObject({
      name: "homebrew",
      status: "published",
      verification: { ok: true },
    });
  });
});
