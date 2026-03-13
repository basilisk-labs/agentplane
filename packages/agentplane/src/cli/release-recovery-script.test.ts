import { execFile } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/check-release-recovery-state.mjs");

const workspaces: string[] = [];

async function initReleaseRepo(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-release-recovery-"));
  workspaces.push(root);

  await execFileAsync("git", ["init", "-q", "-b", "main"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Release Recovery Test"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "release-recovery@example.com"], {
    cwd: root,
  });

  await mkdir(path.join(root, "packages", "core"), { recursive: true });
  await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
  await mkdir(path.join(root, ".agentplane", ".release", "plan", "2026-03-08T00-00-00-000Z"), {
    recursive: true,
  });
  await mkdir(path.join(root, "docs", "releases"), { recursive: true });

  await writeFile(
    path.join(root, "packages", "core", "package.json"),
    JSON.stringify({ name: "@agentplaneorg/core", version: "0.2.6" }, null, 2) + "\n",
    "utf8",
  );
  await writeFile(
    path.join(root, "packages", "agentplane", "package.json"),
    JSON.stringify(
      { name: "agentplane", version: "0.2.6", dependencies: { "@agentplaneorg/core": "0.2.6" } },
      null,
      2,
    ) + "\n",
    "utf8",
  );
  await writeFile(
    path.join(root, ".agentplane", ".release", "plan", "2026-03-08T00-00-00-000Z", "version.json"),
    JSON.stringify(
      {
        prevTag: "v0.2.6",
        prevVersion: "0.2.6",
        nextTag: "v0.2.7",
        nextVersion: "0.2.7",
        bump: "patch",
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );

  await writeFile(path.join(root, "tracked.txt"), "seed\n", "utf8");
  await execFileAsync("git", ["add", "-A"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
  await execFileAsync("git", ["tag", "v0.2.6"], { cwd: root });

  return root;
}

async function runScript(
  root: string,
  args: string[] = [],
  env: Record<string, string> = {},
): Promise<{ stdout: string; stderr: string }> {
  const result = await execFileAsync("node", [SCRIPT_PATH, ...args], {
    cwd: root,
    env: {
      ...process.env,
      ...env,
    },
  });
  return {
    stdout: String(result.stdout ?? ""),
    stderr: String(result.stderr ?? ""),
  };
}

async function writeApplyReport(root: string, commitHash: string) {
  await mkdir(path.join(root, ".agentplane", ".release", "apply"), { recursive: true });
  await writeFile(
    path.join(root, ".agentplane", ".release", "apply", "latest.json"),
    JSON.stringify(
      {
        applied_at: "2026-03-13T00:00:00.000Z",
        plan_dir: ".agentplane/.release/plan/2026-03-08T00-00-00-000Z",
        notes_path: "docs/releases/v0.2.7.md",
        prev_version: "0.2.6",
        next_version: "0.2.7",
        prev_tag: "v0.2.6",
        next_tag: "v0.2.7",
        bump: "patch",
        commit: {
          hash: commitHash,
          subject: "✨ release: v0.2.7",
        },
        push: {
          requested: true,
          remote: "origin",
          performed: true,
        },
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );
}

function makeWorkflowRun({
  status,
  conclusion,
  url,
  createdAt = "2026-03-13T00:00:00Z",
}: {
  status: string;
  conclusion: string | null;
  url: string;
  createdAt?: string;
}) {
  return {
    id: 123,
    name: "workflow",
    status,
    conclusion,
    html_url: url,
    head_sha: "release-sha-123",
    event: "push",
    created_at: createdAt,
  };
}

async function withGithubServer(
  responder: (
    pathname: string,
    searchParams: URLSearchParams,
  ) => { status?: number; body: unknown },
  fn: (baseUrl: string) => Promise<void>,
) {
  const server = createServer((req, res) => {
    const parsed = new URL(req.url ?? "/", "http://127.0.0.1");
    const payload = responder(parsed.pathname, parsed.searchParams);
    res.statusCode = payload.status ?? 200;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(payload.body));
  });

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("failed to bind GitHub stub server");
  }

  try {
    await fn(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
}

afterEach(async () => {
  while (workspaces.length > 0) {
    const root = workspaces.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("release recovery script", () => {
  it("reports a local tag that was not pushed to the remote", async () => {
    const root = await initReleaseRepo();
    const remoteRoot = path.join(root, "remote.git");
    await execFileAsync("git", ["init", "--bare", remoteRoot], { cwd: root });
    await execFileAsync("git", ["remote", "add", "origin", remoteRoot], { cwd: root });
    await execFileAsync("git", ["push", "-u", "origin", "main"], { cwd: root });
    await writeFile(
      path.join(root, "docs", "releases", "v0.2.7.md"),
      "# Release Notes\n\n- A\n",
      "utf8",
    );
    await execFileAsync("git", ["tag", "v0.2.7"], { cwd: root });

    const { stdout } = await runScript(root, ["--json"]);
    const payload = JSON.parse(stdout) as {
      summary: { state: string; likelyCause: string; nextAction: string };
      current: { localTagPresent: boolean; remote: { tagPresent: boolean } };
      findings: { code: string; nextAction?: string }[];
    };

    expect(payload.summary.state).toBe("release_committed_locally_not_pushed");
    expect(payload.summary.likelyCause).toContain("release commit and local tag were created");
    expect(payload.summary.nextAction).toContain("git push origin HEAD");
    expect(payload.current.localTagPresent).toBe(true);
    expect(payload.current.remote.tagPresent).toBe(false);
    expect(
      payload.findings.some((finding) => finding.code === "release_local_tag_not_pushed"),
    ).toBe(true);
    expect(
      payload.findings.find((finding) => finding.code === "release_local_tag_not_pushed")
        ?.nextAction,
    ).toContain("git push origin HEAD");
  }, 60_000);

  it("prints the synthesized recovery state in text mode", async () => {
    const root = await initReleaseRepo();
    const remoteRoot = path.join(root, "remote.git");
    await execFileAsync("git", ["init", "--bare", remoteRoot], { cwd: root });
    await execFileAsync("git", ["remote", "add", "origin", remoteRoot], { cwd: root });
    await execFileAsync("git", ["push", "-u", "origin", "main"], { cwd: root });
    await writeFile(
      path.join(root, "docs", "releases", "v0.2.7.md"),
      "# Release Notes\n\n- A\n",
      "utf8",
    );
    await execFileAsync("git", ["tag", "v0.2.7"], { cwd: root });

    const { stdout } = await runScript(root);
    expect(stdout).toContain("State: release_committed_locally_not_pushed");
    expect(stdout).toContain("Likely cause:");
    expect(stdout).toContain(
      "Next safe action: If this release is correct, run: git push origin HEAD",
    );
  }, 60_000);

  it("reports release-note drift and locally bumped versions without a local tag", async () => {
    const root = await initReleaseRepo();
    await writeFile(
      path.join(root, "packages", "core", "package.json"),
      JSON.stringify({ name: "@agentplaneorg/core", version: "0.2.7" }, null, 2) + "\n",
      "utf8",
    );
    await writeFile(
      path.join(root, "packages", "agentplane", "package.json"),
      JSON.stringify(
        { name: "agentplane", version: "0.2.7", dependencies: { "@agentplaneorg/core": "0.2.7" } },
        null,
        2,
      ) + "\n",
      "utf8",
    );

    const { stdout } = await runScript(root, ["--json"]);
    const payload = JSON.parse(stdout) as {
      summary: { state: string; likelyCause: string; nextAction: string };
      findings: { code: string }[];
    };

    expect(payload.summary.state).toBe("release_versions_bumped_without_local_tag");
    expect(payload.summary.likelyCause).toContain("version files were bumped");
    expect(payload.summary.nextAction).toContain("create v0.2.7 intentionally or rerun");
    expect(payload.findings.some((finding) => finding.code === "release_notes_missing")).toBe(true);
    expect(
      payload.findings.some(
        (finding) => finding.code === "release_versions_bumped_without_local_tag",
      ),
    ).toBe(true);
  }, 60_000);

  it("reports burned npm versions when registry checking is requested", async () => {
    const root = await initReleaseRepo();
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await writeFile(
      path.join(root, "scripts", "check-npm-version-availability.mjs"),
      [
        String.raw`process.stderr.write('Version already published: agentplane@0.2.7\n');`,
        "process.exitCode = 1;",
        "",
      ].join("\n"),
      "utf8",
    );

    const { stdout } = await runScript(root, ["--json", "--check-registry"]);
    const payload = JSON.parse(stdout) as {
      summary: { state: string; likelyCause: string; nextAction: string };
      current: { registry: { checked: boolean; status: string; detail: string } };
      findings: { code: string }[];
    };

    expect(payload.summary.state).toBe("release_npm_version_burned");
    expect(payload.summary.likelyCause).toContain("target npm version is already unavailable");
    expect(payload.summary.nextAction).toContain("rerun `agentplane release plan`");
    expect(payload.current.registry.checked).toBe(true);
    expect(payload.current.registry.status).toBe("blocked");
    expect(payload.current.registry.detail).toContain("Version already published");
    expect(payload.findings.some((finding) => finding.code === "release_npm_version_burned")).toBe(
      true,
    );
  }, 60_000);

  it("distinguishes publish success from sibling Core CI failure on the same release SHA", async () => {
    const root = await initReleaseRepo();
    const remoteRoot = path.join(root, "remote.git");
    await execFileAsync("git", ["init", "--bare", remoteRoot], { cwd: root });
    await execFileAsync("git", ["remote", "add", "origin", remoteRoot], { cwd: root });
    await execFileAsync("git", ["push", "-u", "origin", "main"], { cwd: root });
    await writeFile(
      path.join(root, "docs", "releases", "v0.2.7.md"),
      "# Release Notes\n\n- A\n",
      "utf8",
    );
    await execFileAsync("git", ["tag", "v0.2.7"], { cwd: root });
    await writeApplyReport(root, "release-sha-123");

    await withGithubServer(
      (pathname, searchParams) => {
        expect(searchParams.get("head_sha")).toBe("release-sha-123");
        if (pathname.endsWith("/actions/workflows/ci.yml/runs")) {
          return {
            body: {
              workflow_runs: [
                makeWorkflowRun({
                  status: "completed",
                  conclusion: "failure",
                  url: "https://github.com/example/repo/actions/runs/ci-1",
                }),
              ],
            },
          };
        }
        if (pathname.endsWith("/actions/workflows/publish.yml/runs")) {
          return {
            body: {
              workflow_runs: [
                makeWorkflowRun({
                  status: "completed",
                  conclusion: "success",
                  url: "https://github.com/example/repo/actions/runs/publish-1",
                }),
              ],
            },
          };
        }
        return { status: 404, body: { message: "not found" } };
      },
      async (baseUrl) => {
        const { stdout } = await runScript(
          root,
          ["--json", "--check-github", "--github-repo", "basilisk-labs/agentplane"],
          {
            GITHUB_TOKEN: "test-token",
            AGENTPLANE_GITHUB_API_BASE_URL: baseUrl,
          },
        );
        const payload = JSON.parse(stdout) as {
          summary: { state: string; likelyCause: string; nextAction: string };
          current: {
            github: {
              releaseSha: string;
              publish: { state: string; conclusion: string | null };
              coreCi: { state: string; conclusion: string | null };
            };
          };
          findings: { code: string }[];
        };

        expect(payload.summary.state).toBe("release_already_published_with_red_core_ci");
        expect(payload.summary.likelyCause).toContain("publish workflow already succeeded");
        expect(payload.summary.nextAction).toContain("Do not rerun publish");
        expect(payload.current.github.releaseSha).toBe("release-sha-123");
        expect(payload.current.github.publish.state).toBe("success");
        expect(payload.current.github.coreCi.state).toBe("completed_not_success");
        expect(payload.current.github.coreCi.conclusion).toBe("failure");
        expect(
          payload.findings.some((finding) => finding.code === "release_publish_workflow_succeeded"),
        ).toBe(true);
        expect(
          payload.findings.some(
            (finding) => finding.code === "release_core_ci_failed_after_publish",
          ),
        ).toBe(true);
      },
    );
  }, 60_000);

  it("reports a missing release-ready artifact separately from publish status", async () => {
    const root = await initReleaseRepo();
    await writeFile(
      path.join(root, "docs", "releases", "v0.2.7.md"),
      "# Release Notes\n\n- A\n",
      "utf8",
    );
    await writeApplyReport(root, "release-sha-123");

    await withGithubServer(
      (pathname) => {
        if (pathname.endsWith("/actions/workflows/ci.yml/runs")) {
          return {
            body: {
              workflow_runs: [
                makeWorkflowRun({
                  status: "completed",
                  conclusion: "success",
                  url: "https://github.com/example/repo/actions/runs/ci-1",
                }),
              ],
            },
          };
        }
        if (pathname.endsWith("/actions/runs/123/artifacts")) {
          return {
            body: {
              artifacts: [],
            },
          };
        }
        if (pathname.endsWith("/actions/workflows/publish.yml/runs")) {
          return {
            body: {
              workflow_runs: [],
            },
          };
        }
        return { status: 404, body: { message: "not found" } };
      },
      async (baseUrl) => {
        const { stdout } = await runScript(
          root,
          ["--json", "--check-github", "--github-repo", "basilisk-labs/agentplane"],
          {
            GITHUB_TOKEN: "test-token",
            AGENTPLANE_GITHUB_API_BASE_URL: baseUrl,
          },
        );
        const payload = JSON.parse(stdout) as {
          summary: { state: string; nextAction: string };
          findings: { code: string }[];
          current: {
            github: {
              releaseReady: { state: string };
              publish: { state: string };
            };
          };
        };

        expect(payload.summary.state).toBe("release_ready_artifact_missing");
        expect(payload.summary.nextAction).toContain("release-ready artifact");
        expect(payload.current.github.releaseReady.state).toBe("ready_artifact_missing");
        expect(payload.current.github.publish.state).toBe("missing");
        expect(
          payload.findings.some((finding) => finding.code === "release_ready_artifact_missing"),
        ).toBe(true);
      },
    );
  }, 60_000);

  it("reports a release-ready SHA that still has not been published", async () => {
    const root = await initReleaseRepo();
    await writeFile(
      path.join(root, "docs", "releases", "v0.2.7.md"),
      "# Release Notes\n\n- A\n",
      "utf8",
    );
    await writeApplyReport(root, "release-sha-123");

    await withGithubServer(
      (pathname) => {
        if (pathname.endsWith("/actions/workflows/ci.yml/runs")) {
          return {
            body: {
              workflow_runs: [
                makeWorkflowRun({
                  status: "completed",
                  conclusion: "success",
                  url: "https://github.com/example/repo/actions/runs/ci-1",
                }),
              ],
            },
          };
        }
        if (pathname.endsWith("/actions/runs/123/artifacts")) {
          return {
            body: {
              artifacts: [
                {
                  id: 321,
                  name: "release-ready",
                  size_in_bytes: 256,
                  expired: false,
                  created_at: "2026-03-13T00:00:00Z",
                  archive_download_url:
                    "https://api.github.com/repos/example/repo/actions/artifacts/321/zip",
                },
              ],
            },
          };
        }
        if (pathname.endsWith("/actions/workflows/publish.yml/runs")) {
          return {
            body: {
              workflow_runs: [],
            },
          };
        }
        return { status: 404, body: { message: "not found" } };
      },
      async (baseUrl) => {
        const { stdout } = await runScript(
          root,
          ["--json", "--check-github", "--github-repo", "basilisk-labs/agentplane"],
          {
            GITHUB_TOKEN: "test-token",
            AGENTPLANE_GITHUB_API_BASE_URL: baseUrl,
          },
        );
        const payload = JSON.parse(stdout) as {
          summary: { state: string; likelyCause: string };
          current: {
            github: {
              releaseReady: { state: string; runId: number | null };
              publish: { state: string };
            };
          };
          findings: { code: string }[];
        };

        expect(payload.summary.state).toBe("release_ready_but_not_published");
        expect(payload.summary.likelyCause).toContain("release-ready artifact");
        expect(payload.current.github.releaseReady.state).toBe("ready_artifact_available");
        expect(payload.current.github.releaseReady.runId).toBe(123);
        expect(payload.current.github.publish.state).toBe("missing");
        expect(
          payload.findings.some((finding) => finding.code === "release_ready_artifact_available"),
        ).toBe(true);
      },
    );
  }, 60_000);

  it("prints explicit GitHub workflow status lines in text mode", async () => {
    const root = await initReleaseRepo();
    await writeFile(
      path.join(root, "docs", "releases", "v0.2.7.md"),
      "# Release Notes\n\n- A\n",
      "utf8",
    );
    await writeApplyReport(root, "release-sha-123");

    await withGithubServer(
      (pathname) => {
        if (pathname.endsWith("/actions/workflows/ci.yml/runs")) {
          return {
            body: {
              workflow_runs: [
                makeWorkflowRun({
                  status: "completed",
                  conclusion: "failure",
                  url: "https://github.com/example/repo/actions/runs/ci-1",
                }),
              ],
            },
          };
        }
        if (pathname.endsWith("/actions/workflows/publish.yml/runs")) {
          return {
            body: {
              workflow_runs: [
                makeWorkflowRun({
                  status: "completed",
                  conclusion: "success",
                  url: "https://github.com/example/repo/actions/runs/publish-1",
                }),
              ],
            },
          };
        }
        return { status: 404, body: { message: "not found" } };
      },
      async (baseUrl) => {
        const { stdout } = await runScript(
          root,
          ["--check-github", "--github-repo", "basilisk-labs/agentplane"],
          {
            GITHUB_TOKEN: "test-token",
            AGENTPLANE_GITHUB_API_BASE_URL: baseUrl,
          },
        );
        expect(stdout).toContain("State: release_already_published_with_red_core_ci");
        expect(stdout).toContain("GitHub release-ready: workflow_not_success");
        expect(stdout).toContain(
          "GitHub Core CI (ci.yml): completed_not_success (conclusion=failure)",
        );
        expect(stdout).toContain("GitHub Publish (publish.yml): success");
        expect(stdout).toContain("Next safe action: Do not rerun publish");
      },
    );
  }, 60_000);

  it("prints help text", async () => {
    const root = await initReleaseRepo();
    const { stdout } = await runScript(root, ["--help"]);
    expect(stdout).toContain("Usage: node scripts/check-release-recovery-state.mjs");
    expect(stdout).toContain("--check-registry");
    expect(stdout).toContain("--check-github");
  }, 60_000);
});
