import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  InvalidRunnerResultManifestError,
  manifestFromRunnerResult,
  invalidRunnerResultManifestPath,
  preserveInvalidRunnerResultManifest,
  readRunnerResultManifest,
} from "./result-manifest.js";

describe("runner result manifest", () => {
  it("accepts a valid schema_version=1 manifest", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-result-manifest-valid-"));
    const resultPath = path.join(tempDir, "result.json");
    await writeFile(
      resultPath,
      JSON.stringify(
        {
          schema_version: 1,
          status: "success",
          exit_code: 0,
          summary: "runner ok",
          findings: ["finding"],
          artifacts: [{ path: "reports/out.txt", label: "report" }],
          metrics: { duration_ms: 12, stdout_bytes: 4, stderr_bytes: 0 },
          evidence: {
            evidence_paths: ["reports/out.txt", "logs/out.log"],
            changed_paths: ["src/runner/task-state.ts"],
            conflict_paths: ["src/runner/conflict.ts"],
            files_changed_count: 1,
            tests_run: ["bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts"],
            verification_candidates: ["inspect reports/out.txt"],
            blocked_reason: "sibling runner owns the same file",
            recommended_parent_action: "split task scope before retrying",
          },
        },
        null,
        2,
      ),
      "utf8",
    );

    const manifest = await readRunnerResultManifest(resultPath);

    expect(manifest).toMatchObject({
      schema_version: 1,
      status: "success",
      exit_code: 0,
      summary: "runner ok",
      findings: ["finding"],
      artifacts: [{ path: "reports/out.txt", label: "report" }],
      metrics: { duration_ms: 12, stdout_bytes: 4, stderr_bytes: 0 },
      evidence: {
        evidence_paths: ["reports/out.txt", "logs/out.log"],
        changed_paths: ["src/runner/task-state.ts"],
        conflict_paths: ["src/runner/conflict.ts"],
        files_changed_count: 1,
        tests_run: ["bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts"],
        verification_candidates: ["inspect reports/out.txt"],
        blocked_reason: "sibling runner owns the same file",
        recommended_parent_action: "split task scope before retrying",
      },
    });
  });

  it("rejects manifests with missing schema_version", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-result-manifest-schema-"));
    const resultPath = path.join(tempDir, "result.json");
    await writeFile(resultPath, JSON.stringify({ status: "success" }), "utf8");

    await expect(readRunnerResultManifest(resultPath)).rejects.toMatchObject({
      name: "InvalidRunnerResultManifestError",
      result_path: resultPath,
      reason: "schema_version must be 1",
    });
  });

  it("rejects structural identifiers that are not machine-safe", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-result-manifest-ident-"));
    const resultPath = path.join(tempDir, "result.json");
    await writeFile(
      resultPath,
      JSON.stringify({
        schema_version: 1,
        artifacts: [{ path: "reports/out.txt", label: "Bad Label" }],
        capabilities_used: ["custom report"],
      }),
      "utf8",
    );

    let error: InvalidRunnerResultManifestError | null = null;
    try {
      await readRunnerResultManifest(resultPath);
    } catch (err) {
      error = err as InvalidRunnerResultManifestError;
    }

    expect(error).toBeInstanceOf(InvalidRunnerResultManifestError);
    expect(error?.result_path).toBe(resultPath);
    expect(error?.reason).toContain("artifacts[].label");
  });

  it("rejects successful manifests without quality evidence", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-result-manifest-quality-"));
    const resultPath = path.join(tempDir, "result.json");
    await writeFile(
      resultPath,
      JSON.stringify({ schema_version: 1, status: "success", summary: "done" }),
      "utf8",
    );

    await expect(readRunnerResultManifest(resultPath)).rejects.toMatchObject({
      reason:
        "successful manifests must include evidence paths, tests, verification candidates, or artifacts",
    });
  });

  it("requires blocked conflict manifests to name the parent action", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-result-manifest-conflict-"));
    const resultPath = path.join(tempDir, "result.json");
    await writeFile(
      resultPath,
      JSON.stringify({
        schema_version: 1,
        status: "failed",
        summary: "blocked",
        evidence: { conflict_paths: ["src/a.ts"] },
      }),
      "utf8",
    );

    await expect(readRunnerResultManifest(resultPath)).rejects.toMatchObject({
      reason: "evidence.conflict_paths requires evidence.blocked_reason",
    });
  });

  it("preserves malformed manifest payloads for later inspection", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-result-manifest-preserve-"));
    const resultPath = path.join(tempDir, "result.json");
    const rawManifest = '{\n  "schema_version": 1,\n  "findings": [42]\n}\n';
    await writeFile(resultPath, rawManifest, "utf8");

    let error: InvalidRunnerResultManifestError | null = null;
    try {
      await readRunnerResultManifest(resultPath);
    } catch (err) {
      error = err as InvalidRunnerResultManifestError;
    }

    expect(error).toBeInstanceOf(InvalidRunnerResultManifestError);
    const invalidPath = await preserveInvalidRunnerResultManifest({
      result_path: resultPath,
      error: error!,
    });
    expect(invalidPath).toBe(invalidRunnerResultManifestPath(resultPath));
    expect(await readFile(invalidPath, "utf8")).toBe(rawManifest);
  });

  it("serializes machine summaries and labeled artifacts from runner results", () => {
    const manifest = manifestFromRunnerResult({
      status: "success",
      exit_code: 0,
      started_at: "2026-03-24T09:00:00.000Z",
      ended_at: "2026-03-24T09:00:01.000Z",
      summary: "Codex execution completed successfully.",
      stdout_summary:
        "Assistant output was captured in codex-last-message.md; raw execution trace is in agent-trace.jsonl.",
      artifacts: [
        { path: "runs/run-1/agent-trace.jsonl", label: "raw-trace" },
        { path: "runs/run-1/codex-last-message.md", label: "assistant-last-message" },
      ],
      metrics: { stdout_bytes: 10, stderr_bytes: 0 },
      capabilities_used: ["codex.exec"],
      evidence: {
        evidence_paths: ["reports/out.txt"],
        changed_paths: ["src/runner/task-state.ts"],
        files_changed_count: 1,
        tests_run: ["bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts"],
        verification_candidates: ["inspect reports/out.txt"],
      },
    });

    expect(manifest).toEqual({
      schema_version: 1,
      status: "success",
      exit_code: 0,
      summary: "Codex execution completed successfully.",
      stdout_summary:
        "Assistant output was captured in codex-last-message.md; raw execution trace is in agent-trace.jsonl.",
      artifacts: [
        { path: "runs/run-1/agent-trace.jsonl", label: "raw-trace" },
        { path: "runs/run-1/codex-last-message.md", label: "assistant-last-message" },
      ],
      metrics: { stdout_bytes: 10, stderr_bytes: 0 },
      capabilities_used: ["codex.exec"],
      evidence: {
        evidence_paths: ["reports/out.txt"],
        changed_paths: ["src/runner/task-state.ts"],
        files_changed_count: 1,
        tests_run: ["bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts"],
        verification_candidates: ["inspect reports/out.txt"],
      },
    });
  });
});
