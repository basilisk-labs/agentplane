import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/release/audit-platform-publication.mjs");

const roots: string[] = [];

async function makeRoot() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-postpublish-audit-"));
  roots.push(root);
  return root;
}

async function writePublishResult(root: string, payload: unknown) {
  const filePath = path.join(root, "publish-result.json");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return filePath;
}

function completePublishResult() {
  return {
    schemaVersion: 1,
    success: true,
    reasonCode: "publish_succeeded",
    sha: "a".repeat(40),
    version: "0.6.2",
    tag: "v0.6.2",
    packages: {
      core: { published: true },
      recipes: { published: true },
      cli: { published: true },
    },
    checks: {
      npmSmoke: { passed: true },
      ghcr: { published: true },
      tag: { ensured: true },
      githubRelease: { created: true },
    },
    distribution: {
      loaded: true,
      manifest: {
        releaseAssets: [
          { name: "release-distribution.json" },
          { name: "SHA256SUMS" },
          { name: "install.sh" },
          { name: "install.ps1" },
        ],
        channels: {
          npm: { required: true },
          githubRelease: { required: true },
          ghcr: { required: true },
        },
      },
    },
    external: {
      requested: true,
      modules: [
        { name: "homebrew", loaded: true, status: "published" },
        { name: "scoop", loaded: true, status: "published" },
        {
          name: "setup-agentplane",
          loaded: true,
          status: "unchanged",
          setupTag: { status: "published" },
        },
      ],
    },
  };
}

async function runAudit(filePath: string) {
  return execFileAsync("node", [SCRIPT_PATH, "--publish-result", filePath, "--json"], {
    cwd: process.cwd(),
    env: process.env,
  });
}

async function runAuditFailureStdout(filePath: string) {
  try {
    await runAudit(filePath);
  } catch (error: unknown) {
    const stdout =
      error && typeof error === "object" && "stdout" in error ? error.stdout : undefined;
    if (typeof stdout === "string") return stdout;
    throw error;
  }
  throw new Error("Expected audit command to fail.");
}

afterEach(async () => {
  while (roots.length > 0) {
    const root = roots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("post-publish platform audit script", () => {
  it("passes when every release channel has canonical evidence", async () => {
    const root = await makeRoot();
    const filePath = await writePublishResult(root, completePublishResult());

    const result = await runAudit(filePath);
    const payload = JSON.parse(String(result.stdout ?? "")) as { ok: boolean; failures: string[] };

    expect(payload.ok).toBe(true);
    expect(payload.failures).toHaveLength(0);
  });

  it("fails closed when external handoff channels are only opened or skipped", async () => {
    const root = await makeRoot();
    const fixture = completePublishResult();
    fixture.success = false;
    fixture.reasonCode = "publish_incomplete";
    fixture.external.modules = [
      { name: "homebrew", loaded: true, status: "pr_opened" },
      {
        name: "scoop",
        loaded: true,
        status: "skipped_missing_credentials",
        reasonCode: "missing_credentials",
      },
      { name: "setup-agentplane", loaded: true, status: "unchanged" },
    ];
    const filePath = await writePublishResult(root, fixture);

    await expect(runAuditFailureStdout(filePath)).resolves.toContain('"ok":false');
  });

  it("fails closed when GHCR or GitHub Release asset evidence is missing", async () => {
    const root = await makeRoot();
    const fixture = completePublishResult();
    fixture.checks.ghcr.published = false;
    fixture.distribution.manifest.releaseAssets = [{ name: "release-distribution.json" }];
    const filePath = await writePublishResult(root, fixture);

    await expect(runAuditFailureStdout(filePath)).resolves.toContain(
      "GHCR publication not confirmed",
    );
  });
});
