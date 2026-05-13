import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { classifyCodexSmokeRun } from "./codex-smoke.js";
import type { RunnerRunState } from "./types.js";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");

function makeState(
  overrides: Partial<RunnerRunState> & { status: RunnerRunState["status"] },
): RunnerRunState {
  return {
    schema_version: 1,
    runner_api_version: "1",
    run_id: "run-smoke",
    adapter_id: "codex",
    target: { kind: "task", task_id: "202603241111-SMOKE" },
    status: overrides.status,
    mode: "execute",
    bundle_path: "/tmp/bundle.json",
    result_path: "/tmp/result.json",
    bootstrap_path: "/tmp/bootstrap.md",
    events_path: "/tmp/events.jsonl",
    trace_path: "/tmp/agent-trace.jsonl",
    stderr_path: "/tmp/stderr.log",
    trace_policy: {
      mode: "raw",
      max_tail_bytes: 65_536,
      capture_stderr: true,
    },
    timeout_policy: {
      wall_clock_ms: 900_000,
      idle_ms: 180_000,
      terminate_grace_ms: 1500,
    },
    created_at: "2026-03-24T00:00:00.000Z",
    updated_at: "2026-03-24T00:00:01.000Z",
    ...overrides,
  };
}

describe("classifyCodexSmokeRun", () => {
  it("classifies successful runs", () => {
    const classification = classifyCodexSmokeRun(
      makeState({
        status: "success",
        result: {
          status: "success",
          exit_code: 0,
          started_at: "2026-03-24T00:00:00.000Z",
          ended_at: "2026-03-24T00:00:01.000Z",
        },
      }),
    );

    expect(classification.outcome).toBe("success");
    expect(classification.summary).toContain("completed successfully");
  });

  it("classifies timeout failures", () => {
    const classification = classifyCodexSmokeRun(
      makeState({
        status: "failed",
        result: {
          status: "failed",
          exit_code: 124,
          started_at: "2026-03-24T00:00:00.000Z",
          ended_at: "2026-03-24T00:00:01.000Z",
          timeout_reason: "idle",
        },
      }),
    );

    expect(classification.outcome).toBe("timeout");
    expect(classification.timeout_reason).toBe("idle");
  });

  it("classifies policy refusals before spawn", () => {
    const classification = classifyCodexSmokeRun(
      makeState({
        status: "failed",
        policy_decision: {
          adapter_id: "codex",
          requested: { sandbox: "custom-sandbox" },
          effective: {},
          fields: {},
          refusal_reason: {
            code: "E_RUNTIME",
            message: "refused",
            policy_field: "sandbox",
            declared_value: "custom-sandbox",
          },
        },
      }),
    );

    expect(classification.outcome).toBe("policy_refusal");
    expect(classification.refusal_reason?.policy_field).toBe("sandbox");
  });

  it("classifies non-timeout failures as runner failures", () => {
    const classification = classifyCodexSmokeRun(
      makeState({
        status: "failed",
        result: {
          status: "failed",
          exit_code: 1,
          started_at: "2026-03-24T00:00:00.000Z",
          ended_at: "2026-03-24T00:00:01.000Z",
        },
      }),
    );

    expect(classification.outcome).toBe("runner_failure");
  });

  it("keeps live smoke opt-in outside mandatory local fast CI", async () => {
    const packageJson = JSON.parse(
      await readFile(path.join(REPO_ROOT, "package.json"), "utf8"),
    ) as {
      scripts?: Record<string, string>;
    };
    const localCiScript = await readFile(
      path.join(REPO_ROOT, "scripts", "run-local-ci.mjs"),
      "utf8",
    );
    const prePushHook = await readFile(
      path.join(REPO_ROOT, "scripts", "run-pre-push-hook.mjs"),
      "utf8",
    );
    const smokeScript = await readFile(
      path.join(REPO_ROOT, "scripts", "run-runner-codex-smoke.mjs"),
      "utf8",
    );
    const smokeImplementation = await readFile(
      path.join(REPO_ROOT, "scripts", "workflow", "run-runner-codex-smoke.mjs"),
      "utf8",
    );

    expect(packageJson.scripts?.["runner:codex:smoke"]).toBe(
      "bun scripts/run-runner-codex-smoke.mjs",
    );
    expect(packageJson.scripts?.["ci:local"] ?? "").not.toContain("runner:codex:smoke");
    expect(packageJson.scripts?.["ci:local:fast"] ?? "").not.toContain("runner:codex:smoke");
    expect(packageJson.scripts?.["ci:local:full"] ?? "").not.toContain("runner:codex:smoke");
    expect(localCiScript).not.toContain("runner:codex:smoke");
    expect(prePushHook).not.toContain("runner:codex:smoke");
    expect(smokeScript).toContain("./workflow/run-runner-codex-smoke.mjs");
    expect(smokeImplementation).toContain("--live-custom-wrapper");
  });
});
