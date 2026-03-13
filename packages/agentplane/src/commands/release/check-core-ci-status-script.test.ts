import { createServer } from "node:http";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/check-core-ci-status.mjs");

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

async function withServer(
  responder: (requestCount: number) => { status?: number; body: unknown },
  fn: (baseUrl: string) => Promise<void>,
) {
  let requestCount = 0;
  const server = createServer((req, res) => {
    requestCount += 1;
    const payload = responder(requestCount);
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
  const cwd = await mkdtemp(path.join(tmpdir(), "agentplane-core-ci-check-"));
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

describe("check-core-ci-status script", () => {
  it("passes when Core CI already completed successfully", async () => {
    await withServer(
      () => ({
        body: {
          workflow_runs: [makeRun({ status: "completed", conclusion: "success" })],
        },
      }),
      async (baseUrl) => {
        const result = await runScript(baseUrl, ["--sha", "abc123", "--json"]);
        const payload = JSON.parse(String(result.stdout ?? "")) as { ok: boolean; state: string };
        expect(payload.ok).toBe(true);
        expect(payload.state).toBe("success");
      },
    );
  });

  it("fails when Core CI completed with a non-success conclusion", async () => {
    await withServer(
      () => ({
        body: {
          workflow_runs: [makeRun({ status: "completed", conclusion: "failure" })],
        },
      }),
      async (baseUrl) => {
        const result = await runScript(baseUrl, ["--sha", "abc123"]).then(
          () => ({ ok: true as const, stdout: "", stderr: "" }),
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
        expect(result.stdout).toContain("conclusion=failure");
        expect(result.stdout).toContain("Next action:");
      },
    );
  });

  it("waits for an in-progress Core CI run to finish", async () => {
    await withServer(
      (requestCount) => ({
        body: {
          workflow_runs: [
            requestCount === 1
              ? makeRun({ status: "in_progress", conclusion: null })
              : makeRun({ status: "completed", conclusion: "success" }),
          ],
        },
      }),
      async (baseUrl) => {
        const result = await runScript(baseUrl, [
          "--sha",
          "abc123",
          "--poll-ms",
          "1",
          "--timeout-ms",
          "1000",
          "--json",
        ]);
        const payload = JSON.parse(String(result.stdout ?? "")) as { ok: boolean; state: string };
        expect(payload.ok).toBe(true);
        expect(payload.state).toBe("success");
      },
    );
  });

  it("fails when no Core CI run appears before timeout", async () => {
    await withServer(
      () => ({
        body: {
          workflow_runs: [],
        },
      }),
      async (baseUrl) => {
        const result = await runScript(baseUrl, [
          "--sha",
          "abc123",
          "--poll-ms",
          "1",
          "--timeout-ms",
          "5",
        ]).then(
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
        expect(result.stdout).toContain("No workflow ci.yml run was found");
      },
    );
  });
});
