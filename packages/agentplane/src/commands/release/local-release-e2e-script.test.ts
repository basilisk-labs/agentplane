import { createServer } from "node:http";
import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/run-local-release-e2e.mjs");
const LOCAL_RELEASE_E2E_TIMEOUT_MS = 60_000;

const roots: string[] = [];

async function writeExecutable(root: string, relativePath: string, content: string) {
  const target = path.join(root, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, `${content}\n`, { encoding: "utf8", mode: 0o755 });
  return target;
}

async function initWorkspace() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-local-release-e2e-"));
  roots.push(root);

  await execFileAsync("git", ["init", "-q", "-b", "main"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Release E2E Test"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "release-e2e@example.com"], { cwd: root });

  await mkdir(path.join(root, "packages", "core"), { recursive: true });
  await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
  await mkdir(path.join(root, "docs", "releases"), { recursive: true });

  await writeFile(
    path.join(root, "packages", "core", "package.json"),
    JSON.stringify({ name: "@agentplaneorg/core", version: "1.2.3" }, null, 2) + "\n",
    "utf8",
  );
  await writeFile(
    path.join(root, "packages", "agentplane", "package.json"),
    JSON.stringify(
      { name: "agentplane", version: "1.2.3", dependencies: { "@agentplaneorg/core": "1.2.3" } },
      null,
      2,
    ) + "\n",
    "utf8",
  );
  await writeFile(path.join(root, "docs", "releases", "v1.2.3.md"), "# Notes\n", "utf8");
  await writeFile(path.join(root, "tracked.txt"), "seed\n", "utf8");

  await execFileAsync("git", ["add", "-A"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

  const shaResult = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  const sha = String(shaResult.stdout ?? "").trim();

  const binDir = path.join(root, "bin");
  await mkdir(binDir, { recursive: true });

  await writeExecutable(
    root,
    "bin/npm",
    ["#!/usr/bin/env bash", "set -euo pipefail", "echo 'npm error code E404' >&2", "exit 1"].join(
      "\n",
    ),
  );

  await writeExecutable(
    root,
    "bin/gh",
    [
      "#!/usr/bin/env bash",
      "set -euo pipefail",
      'if [[ "$1" != "--version" && -z "${GH_TOKEN:-${GITHUB_TOKEN:-}}" ]]; then',
      "  echo 'missing token' >&2",
      "  exit 1",
      "fi",
      'if [[ "$1" == "--version" ]]; then',
      "  echo 'gh version test'",
      "  exit 0",
      "fi",
      'if [[ "$1" != "run" || "$2" != "download" ]]; then',
      "  echo 'unexpected gh invocation' >&2",
      "  exit 1",
      "fi",
      "dest=''",
      "for ((i=1; i<=$#; i++)); do",
      '  if [[ "${!i}" == "--dir" ]]; then',
      "    next=$((i+1))",
      '    dest="${!next}"',
      "  fi",
      "done",
      'if [[ -z "$dest" ]]; then',
      "  echo 'missing --dir' >&2",
      "  exit 1",
      "fi",
      'mkdir -p "$dest"',
      'cat > "$dest/release-ready.json" <<EOF',
      "{",
      '  "ready": true,',
      '  "reasonCode": "ready",',
      '  "sha": "${AGENTPLANE_TEST_GH_SHA}",',
      '  "version": "${AGENTPLANE_TEST_GH_VERSION:-1.2.3}",',
      '  "tag": "${AGENTPLANE_TEST_GH_TAG:-v1.2.3}"',
      "}",
      "EOF",
    ].join("\n"),
  );

  return { root, sha, binDir };
}

function makeRun({
  conclusion = "success",
  headSha,
}: {
  conclusion?: string | null;
  headSha: string;
}) {
  return {
    id: 123,
    name: "Core CI",
    status: "completed",
    conclusion,
    html_url: "https://github.com/example/repo/actions/runs/123",
    head_sha: headSha,
    event: "push",
    created_at: "2026-03-13T00:00:00Z",
  };
}

function makeArtifact() {
  return {
    id: 321,
    name: "release-ready",
    size_in_bytes: 256,
    expired: false,
    created_at: "2026-03-13T00:00:00Z",
    archive_download_url: "https://api.github.com/repos/example/repo/actions/artifacts/321/zip",
  };
}

async function withServer(
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
    throw new Error("failed to bind test server");
  }

  try {
    await fn(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
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
    maxBuffer: 50 * 1024 * 1024,
  });
  return {
    stdout: String(result.stdout ?? ""),
    stderr: String(result.stderr ?? ""),
  };
}

afterEach(async () => {
  while (roots.length > 0) {
    const root = roots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("local release E2E script", () => {
  it(
    "passes for the exact checkout SHA when GitHub release-ready metadata and artifact match",
    async () => {
      const { root, sha, binDir } = await initWorkspace();

      await withServer(
        (pathname, searchParams) => {
          if (pathname.endsWith("/actions/workflows/ci.yml/runs")) {
            expect(searchParams.get("head_sha")).toBe(sha);
            return {
              body: {
                workflow_runs: [makeRun({ headSha: sha })],
              },
            };
          }
          if (pathname.endsWith("/actions/runs/123/artifacts")) {
            return {
              body: {
                artifacts: [makeArtifact()],
              },
            };
          }
          return { status: 404, body: { message: "not found" } };
        },
        async (baseUrl) => {
          const result = await runScript(
            root,
            ["--skip-prepublish", "--json", "--repo", "basilisk-labs/agentplane"],
            {
              PATH: `${binDir}:${process.env.PATH ?? ""}`,
              GITHUB_TOKEN: "test-token",
              AGENTPLANE_GITHUB_API_BASE_URL: baseUrl,
              AGENTPLANE_TEST_GH_SHA: sha,
            },
          );

          const payload = JSON.parse(result.stdout) as {
            ok: boolean;
            sha: string;
            runId: number;
            version: string;
            tag: string;
            localManifestPath: string;
            downloadedManifestPath: string;
          };
          expect(payload.ok).toBe(true);
          expect(payload.sha).toBe(sha);
          expect(payload.runId).toBe(123);
          expect(payload.version).toBe("1.2.3");
          expect(payload.tag).toBe("v1.2.3");

          const localManifest = JSON.parse(
            await readFile(path.join(root, payload.localManifestPath), "utf8"),
          ) as { sha: string };
          expect(localManifest.sha).toBe(sha);

          const downloadedManifest = JSON.parse(
            await readFile(path.join(root, payload.downloadedManifestPath), "utf8"),
          ) as { sha: string };
          expect(downloadedManifest.sha).toBe(sha);
        },
      );
    },
    LOCAL_RELEASE_E2E_TIMEOUT_MS,
  );

  it("fails when the requested sha does not match the current checkout", async () => {
    const { root, binDir } = await initWorkspace();

    const result = await runScript(root, ["--skip-prepublish", "--sha", "deadbeef"], {
      PATH: `${binDir}:${process.env.PATH ?? ""}`,
      GITHUB_TOKEN: "test-token",
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
    expect(result.stderr).toContain("Exact checkout required");
  });

  it("fails explicitly when GitHub auth is missing", LOCAL_RELEASE_E2E_TIMEOUT_MS, async () => {
    const { root, binDir } = await initWorkspace();

    const result = await runScript(root, ["--skip-prepublish"], {
      PATH: `${binDir}:${process.env.PATH ?? ""}`,
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
    expect(result.stderr).toContain("Missing required GITHUB_TOKEN");
  });

  it(
    "fails when the downloaded artifact manifest does not match the exact release sha",
    LOCAL_RELEASE_E2E_TIMEOUT_MS,
    async () => {
      const { root, sha, binDir } = await initWorkspace();

      await withServer(
        (pathname) => {
          if (pathname.endsWith("/actions/workflows/ci.yml/runs")) {
            return {
              body: {
                workflow_runs: [makeRun({ headSha: sha })],
              },
            };
          }
          if (pathname.endsWith("/actions/runs/123/artifacts")) {
            return {
              body: {
                artifacts: [makeArtifact()],
              },
            };
          }
          return { status: 404, body: { message: "not found" } };
        },
        async (baseUrl) => {
          const result = await runScript(
            root,
            ["--skip-prepublish", "--repo", "basilisk-labs/agentplane"],
            {
              PATH: `${binDir}:${process.env.PATH ?? ""}`,
              GITHUB_TOKEN: "test-token",
              AGENTPLANE_GITHUB_API_BASE_URL: baseUrl,
              AGENTPLANE_TEST_GH_SHA: "different-sha",
            },
          ).then(
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
          expect(result.stderr).toContain("Local release E2E validation failed");
          expect(result.stderr).toContain("downloaded manifest sha mismatch");
        },
      );
    },
  );
});
