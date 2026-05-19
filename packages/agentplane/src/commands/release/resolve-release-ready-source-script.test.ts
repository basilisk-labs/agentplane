import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/resolve-release-ready-source.mjs");

const temps: string[] = [];

function makeRun({
  id = 123,
  status,
  conclusion,
  headSha = "abc123",
  url = "https://github.com/example/repo/actions/runs/123",
  createdAt = "2026-03-13T00:00:00Z",
}: {
  id?: number;
  status: string;
  conclusion: string | null;
  headSha?: string;
  url?: string;
  createdAt?: string;
}) {
  return {
    id,
    name: "Core CI",
    status,
    conclusion,
    html_url: url,
    head_sha: headSha,
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

async function withFixtures(
  responder: (
    pathname: string,
    searchParams: URLSearchParams,
  ) => { status?: number; body: unknown },
  fn: (baseUrl: string, fixturePath: string) => Promise<void>,
) {
  const baseUrl = "https://fixtures.invalid";
  const fixtureDir = await mkdtemp(path.join(tmpdir(), "agentplane-release-ready-fixtures-"));
  temps.push(fixtureDir);
  const fixturePath = path.join(fixtureDir, "github-api.json");
  const fixtures = new Map<string, { status?: number; body: unknown }>();

  const register = (pathname: string, search = "") => {
    const searchParams = new URLSearchParams(search);
    fixtures.set(
      `${baseUrl}${pathname}${search ? `?${search}` : ""}`,
      responder(pathname, searchParams),
    );
  };

  register(
    "/repos/basilisk-labs/agentplane/actions/workflows/ci.yml/runs",
    "per_page=20&head_sha=abc123",
  );
  register(
    "/repos/basilisk-labs/agentplane/actions/workflows/ci.yml/runs",
    "per_page=20&event=workflow_dispatch",
  );
  register("/repos/basilisk-labs/agentplane/actions/runs/123/artifacts", "per_page=100");
  register("/repos/basilisk-labs/agentplane/actions/runs/789");
  register("/repos/basilisk-labs/agentplane/actions/runs/789/artifacts", "per_page=100");

  await writeFile(fixturePath, JSON.stringify(Object.fromEntries(fixtures)), "utf8");
  await fn(baseUrl, fixturePath);
}

async function runScript(baseUrl: string, fixturePath: string, args: string[] = []) {
  const cwd = await mkdtemp(path.join(tmpdir(), "agentplane-release-ready-source-"));
  temps.push(cwd);
  return execFileAsync("node", [SCRIPT_PATH, "--repo", "basilisk-labs/agentplane", ...args], {
    cwd,
    env: {
      ...process.env,
      GITHUB_TOKEN: "test-token",
      AGENTPLANE_GITHUB_API_BASE_URL: baseUrl,
      AGENTPLANE_GITHUB_API_FIXTURES: fixturePath,
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
    await withFixtures(
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
      async (baseUrl, fixturePath) => {
        const result = await runScript(baseUrl, fixturePath, ["--sha", "abc123", "--json"]);
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
    await withFixtures(
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
      async (baseUrl, fixturePath) => {
        const result = await runScript(baseUrl, fixturePath, ["--sha", "abc123"]).then(
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
    await withFixtures(
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
      async (baseUrl, fixturePath) => {
        const result = await runScript(baseUrl, fixturePath, ["--sha", "abc123"]).then(
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

  it("waits for an in-progress Core CI run and times out with an actionable state", async () => {
    await withFixtures(
      (pathname) => {
        if (pathname.endsWith("/actions/workflows/ci.yml/runs")) {
          return {
            body: {
              workflow_runs: [makeRun({ status: "in_progress", conclusion: null })],
            },
          };
        }
        return { status: 404, body: { message: "not found" } };
      },
      async (baseUrl, fixturePath) => {
        const result = await runScript(baseUrl, fixturePath, [
          "--sha",
          "abc123",
          "--wait",
          "--timeout-ms",
          "1",
          "--poll-interval-ms",
          "1",
          "--json",
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
        const payload = JSON.parse(result.stdout) as {
          ok: boolean;
          state: string;
          nextAction: string;
        };
        expect(result.ok).toBe(false);
        expect(payload.ok).toBe(false);
        expect(payload.state).toBe("workflow_wait_timeout");
        expect(payload.nextAction).toContain("retry publish");
      },
    );
  });

  it("passes when an explicit run-id belongs to the requested SHA and succeeded", async () => {
    await withFixtures(
      (pathname) => {
        if (pathname.endsWith("/actions/runs/789")) {
          return {
            body: makeRun({ id: 789, status: "completed", conclusion: "success" }),
          };
        }
        if (pathname.endsWith("/actions/runs/789/artifacts")) {
          return {
            body: {
              artifacts: [makeArtifact({})],
            },
          };
        }
        return { status: 404, body: { message: "not found" } };
      },
      async (baseUrl, fixturePath) => {
        const result = await runScript(baseUrl, fixturePath, [
          "--sha",
          "abc123",
          "--run-id",
          "789",
          "--json",
        ]);
        const payload = JSON.parse(String(result.stdout ?? "")) as {
          ok: boolean;
          state: string;
          run: { id: number; headSha: string };
          artifact: { name: string };
        };
        expect(payload.ok).toBe(true);
        expect(payload.state).toBe("ready_artifact_available");
        expect(payload.run.id).toBe(789);
        expect(payload.run.headSha).toBe("abc123");
        expect(payload.artifact.name).toBe("release-ready");
      },
    );
  });

  it("prefers the exact-sha alias artifact over the generic release-ready artifact on the selected run", async () => {
    await withFixtures(
      (pathname) => {
        if (pathname.endsWith("/actions/runs/789")) {
          return {
            body: makeRun({ id: 789, status: "completed", conclusion: "success" }),
          };
        }
        if (pathname.endsWith("/actions/runs/789/artifacts")) {
          return {
            body: {
              artifacts: [
                makeArtifact({ name: "release-ready" }),
                makeArtifact({ name: "release-ready-abc123" }),
              ],
            },
          };
        }
        return { status: 404, body: { message: "not found" } };
      },
      async (baseUrl, fixturePath) => {
        const result = await runScript(baseUrl, fixturePath, [
          "--sha",
          "abc123",
          "--run-id",
          "789",
          "--json",
        ]);
        const payload = JSON.parse(String(result.stdout ?? "")) as {
          ok: boolean;
          state: string;
          run: { id: number; headSha: string };
          artifact: { name: string };
        };
        expect(payload.ok).toBe(true);
        expect(payload.state).toBe("ready_artifact_available");
        expect(payload.run.id).toBe(789);
        expect(payload.run.headSha).toBe("abc123");
        expect(payload.artifact.name).toBe("release-ready-abc123");
      },
    );
  });

  it("fails when an explicit run-id belongs to a different SHA", async () => {
    await withFixtures(
      (pathname) => {
        if (pathname.endsWith("/actions/runs/789")) {
          return {
            body: makeRun({
              id: 789,
              status: "completed",
              conclusion: "success",
              headSha: "def456",
            }),
          };
        }
        if (pathname.endsWith("/actions/runs/789/artifacts")) {
          return {
            body: {
              artifacts: [],
            },
          };
        }
        return { status: 404, body: { message: "not found" } };
      },
      async (baseUrl, fixturePath) => {
        const result = await runScript(baseUrl, fixturePath, [
          "--sha",
          "abc123",
          "--run-id",
          "789",
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
        expect(result.stdout).toContain("run 789 belongs to def456, not requested abc123");
      },
    );
  });

  it("accepts a workflow_dispatch run-id when it carries an exact-sha release-ready alias artifact", async () => {
    await withFixtures(
      (pathname) => {
        if (pathname.endsWith("/actions/runs/789")) {
          return {
            body: makeRun({
              id: 789,
              status: "completed",
              conclusion: "success",
              headSha: "def456",
            }),
          };
        }
        if (pathname.endsWith("/actions/runs/789/artifacts")) {
          return {
            body: {
              artifacts: [makeArtifact({ name: "release-ready-abc123" })],
            },
          };
        }
        return { status: 404, body: { message: "not found" } };
      },
      async (baseUrl, fixturePath) => {
        const result = await runScript(baseUrl, fixturePath, [
          "--sha",
          "abc123",
          "--run-id",
          "789",
          "--json",
        ]);
        const payload = JSON.parse(String(result.stdout ?? "")) as {
          ok: boolean;
          state: string;
          run: { id: number; headSha: string };
          artifact: { name: string };
        };
        expect(payload.ok).toBe(true);
        expect(payload.state).toBe("ready_artifact_available");
        expect(payload.run.id).toBe(789);
        expect(payload.run.headSha).toBe("def456");
        expect(payload.artifact.name).toBe("release-ready-abc123");
      },
    );
  });

  it("rejects a mismatched workflow_dispatch run-id when it only carries the generic release-ready artifact", async () => {
    await withFixtures(
      (pathname) => {
        if (pathname.endsWith("/actions/runs/789")) {
          return {
            body: makeRun({
              id: 789,
              status: "completed",
              conclusion: "success",
              headSha: "def456",
            }),
          };
        }
        if (pathname.endsWith("/actions/runs/789/artifacts")) {
          return {
            body: {
              artifacts: [makeArtifact({ name: "release-ready" })],
            },
          };
        }
        return { status: 404, body: { message: "not found" } };
      },
      async (baseUrl, fixturePath) => {
        const result = await runScript(baseUrl, fixturePath, [
          "--sha",
          "abc123",
          "--run-id",
          "789",
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
        expect(result.stdout).toContain("run 789 belongs to def456, not requested abc123");
      },
    );
  });

  it("finds a workflow_dispatch recovery run by the exact-sha alias artifact when no head_sha run exists", async () => {
    await withFixtures(
      (pathname, searchParams) => {
        if (pathname.endsWith("/actions/workflows/ci.yml/runs")) {
          if (searchParams.get("head_sha") === "abc123") {
            return {
              body: {
                workflow_runs: [],
              },
            };
          }
          if (searchParams.get("event") === "workflow_dispatch") {
            return {
              body: {
                workflow_runs: [
                  makeRun({
                    id: 789,
                    status: "completed",
                    conclusion: "success",
                    headSha: "def456",
                    createdAt: "2026-03-14T00:00:00Z",
                  }),
                ],
              },
            };
          }
        }
        if (pathname.endsWith("/actions/runs/789/artifacts")) {
          return {
            body: {
              artifacts: [makeArtifact({ name: "release-ready-abc123" })],
            },
          };
        }
        return { status: 404, body: { message: "not found" } };
      },
      async (baseUrl, fixturePath) => {
        const result = await runScript(baseUrl, fixturePath, ["--sha", "abc123", "--json"]);
        const payload = JSON.parse(String(result.stdout ?? "")) as {
          ok: boolean;
          state: string;
          run: { id: number; headSha: string };
          artifact: { name: string };
        };
        expect(payload.ok).toBe(true);
        expect(payload.state).toBe("ready_artifact_available");
        expect(payload.run.id).toBe(789);
        expect(payload.artifact.name).toBe("release-ready-abc123");
      },
    );
  });

  it("prefers a later workflow_dispatch recovery run when the direct success run is missing release-ready artifacts", async () => {
    await withFixtures(
      (pathname, searchParams) => {
        if (pathname.endsWith("/actions/workflows/ci.yml/runs")) {
          if (searchParams.get("head_sha") === "abc123") {
            return {
              body: {
                workflow_runs: [
                  makeRun({
                    id: 123,
                    status: "completed",
                    conclusion: "success",
                    headSha: "abc123",
                    createdAt: "2026-03-13T00:00:00Z",
                  }),
                ],
              },
            };
          }
          if (searchParams.get("event") === "workflow_dispatch") {
            return {
              body: {
                workflow_runs: [
                  makeRun({
                    id: 789,
                    status: "completed",
                    conclusion: "success",
                    headSha: "def456",
                    createdAt: "2026-03-14T00:00:00Z",
                  }),
                ],
              },
            };
          }
        }
        if (pathname.endsWith("/actions/runs/123/artifacts")) {
          return {
            body: {
              artifacts: [],
            },
          };
        }
        if (pathname.endsWith("/actions/runs/789/artifacts")) {
          return {
            body: {
              artifacts: [makeArtifact({ name: "release-ready-abc123" })],
            },
          };
        }
        return { status: 404, body: { message: "not found" } };
      },
      async (baseUrl, fixturePath) => {
        const result = await runScript(baseUrl, fixturePath, ["--sha", "abc123", "--json"]);
        const payload = JSON.parse(String(result.stdout ?? "")) as {
          ok: boolean;
          state: string;
          run: { id: number; headSha: string };
          artifact: { name: string };
        };
        expect(payload.ok).toBe(true);
        expect(payload.state).toBe("ready_artifact_available");
        expect(payload.run.id).toBe(789);
        expect(payload.run.headSha).toBe("def456");
        expect(payload.artifact.name).toBe("release-ready-abc123");
      },
    );
  });

  it("ignores generic release-ready artifacts from mismatched workflow_dispatch recovery runs", async () => {
    await withFixtures(
      (pathname, searchParams) => {
        if (pathname.endsWith("/actions/workflows/ci.yml/runs")) {
          if (searchParams.get("head_sha") === "abc123") {
            return {
              body: {
                workflow_runs: [],
              },
            };
          }
          if (searchParams.get("event") === "workflow_dispatch") {
            return {
              body: {
                workflow_runs: [
                  makeRun({
                    id: 789,
                    status: "completed",
                    conclusion: "success",
                    headSha: "def456",
                    createdAt: "2026-03-14T00:00:00Z",
                  }),
                ],
              },
            };
          }
        }
        if (pathname.endsWith("/actions/runs/789/artifacts")) {
          return {
            body: {
              artifacts: [makeArtifact({ name: "release-ready" })],
            },
          };
        }
        return { status: 404, body: { message: "not found" } };
      },
      async (baseUrl, fixturePath) => {
        const result = await runScript(baseUrl, fixturePath, ["--sha", "abc123"]).then(
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
        expect(result.stdout).toContain("No workflow ci.yml run was found for abc123");
      },
    );
  });

  it("fails when an explicit run-id is not successful", async () => {
    await withFixtures(
      (pathname) => {
        if (pathname.endsWith("/actions/runs/789")) {
          return {
            body: makeRun({ id: 789, status: "completed", conclusion: "failure" }),
          };
        }
        return { status: 404, body: { message: "not found" } };
      },
      async (baseUrl, fixturePath) => {
        const result = await runScript(baseUrl, fixturePath, [
          "--sha",
          "abc123",
          "--run-id",
          "789",
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
        expect(result.stdout).toContain("Workflow ci.yml is not successfully completed");
      },
    );
  });
});
