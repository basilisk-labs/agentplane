import { createServer } from "node:http";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/resolve-release-ready-source.mjs");

const temps: string[] = [];

function makeRun({
  status,
  conclusion,
  url = "https://github.com/example/repo/actions/runs/123",
  createdAt = "2026-03-13T00:00:00Z",
}: {
  status: string;
  conclusion: string | null;
  url?: string;
  createdAt?: string;
}) {
  return {
    id: 123,
    name: "Core CI",
    status,
    conclusion,
    html_url: url,
    head_sha: "abc123",
    event: "push",
    created_at: createdAt,
  };
}

function makeArtifact({
  name = "release-ready",
  url = "https://api.github.com/repos/example/repo/actions/artifacts/123/zip",
}: {
  name?: string;
  url?: string;
}) {
  return {
    id: 321,
    name,
    size_in_bytes: 256,
    expired: false,
    created_at: "2026-03-13T00:00:00Z",
    archive_download_url: url,
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

async function runScript(baseUrl: string, args: string[] = []) {
  const cwd = await mkdtemp(path.join(tmpdir(), "agentplane-release-ready-source-"));
  temps.push(cwd);
  return execFileAsync("node", [SCRIPT_PATH, "--repo", "basilisk-labs/agentplane", ...args], {
    cwd,
    env: {
      ...process.env,
      GITHUB_TOKEN: "test-token",
      AGENTPLANE_GITHUB_API_BASE_URL: baseUrl,
    },
  });
}

afterEach(async () => {
  while (temps.length > 0) {
    const dir = temps.pop();
    if (!dir) continue;
    await rm(dir, { recursive: true, force: true });
  }
});

describe("resolve-release-ready-source script", () => {
  it("passes when a successful Core CI run has the release-ready artifact", async () => {
    await withServer(
      (pathname) => {
        if (pathname.endsWith("/actions/workflows/ci.yml/runs")) {
          return {
            body: {
              workflow_runs: [makeRun({ status: "completed", conclusion: "success" })],
            },
          };
        }
        if (pathname.endsWith("/actions/runs/123/artifacts")) {
          return {
            body: {
              artifacts: [makeArtifact({})],
            },
          };
        }
        return { status: 404, body: { message: "not found" } };
      },
      async (baseUrl) => {
        const result = await runScript(baseUrl, ["--sha", "abc123", "--json"]);
        const payload = JSON.parse(String(result.stdout ?? "")) as {
          ok: boolean;
          state: string;
          run: { id: number };
          artifact: { name: string };
        };
        expect(payload.ok).toBe(true);
        expect(payload.state).toBe("ready_artifact_available");
        expect(payload.run.id).toBe(123);
        expect(payload.artifact.name).toBe("release-ready");
      },
    );
  });

  it("fails when the successful run is missing the release-ready artifact", async () => {
    await withServer(
      (pathname) => {
        if (pathname.endsWith("/actions/workflows/ci.yml/runs")) {
          return {
            body: {
              workflow_runs: [makeRun({ status: "completed", conclusion: "success" })],
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
        return { status: 404, body: { message: "not found" } };
      },
      async (baseUrl) => {
        const result = await runScript(baseUrl, ["--sha", "abc123"]).then(
          () => ({ ok: true as const, stdout: "" }),
          (error: unknown) => {
            const stdout =
              typeof error === "object" &&
              error !== null &&
              "stdout" in error &&
              typeof (error as { stdout?: unknown }).stdout === "string"
                ? (error as { stdout: string }).stdout
                : "";
            return { ok: false as const, stdout };
          },
        );
        expect(result.ok).toBe(false);
        expect(result.stdout).toContain("artifact release-ready is missing");
      },
    );
  });

  it("fails when Core CI is not successful for the requested SHA", async () => {
    await withServer(
      (pathname) => {
        if (pathname.endsWith("/actions/workflows/ci.yml/runs")) {
          return {
            body: {
              workflow_runs: [makeRun({ status: "completed", conclusion: "failure" })],
            },
          };
        }
        return { status: 404, body: { message: "not found" } };
      },
      async (baseUrl) => {
        const result = await runScript(baseUrl, ["--sha", "abc123"]).then(
          () => ({ ok: true as const, stdout: "" }),
          (error: unknown) => {
            const stdout =
              typeof error === "object" &&
              error !== null &&
              "stdout" in error &&
              typeof (error as { stdout?: unknown }).stdout === "string"
                ? (error as { stdout: string }).stdout
                : "";
            return { ok: false as const, stdout };
          },
        );
        expect(result.ok).toBe(false);
        expect(result.stdout).toContain("Workflow ci.yml is not successfully completed");
      },
    );
  });
});
