import { mkdir, mkdtemp, readFile, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  InvalidRunnerResultManifestError,
  applyRunnerResultManifest,
  invalidRunnerResultManifestPath,
  preserveInvalidRunnerResultManifest,
  preserveRunnerResultManifestSource,
  readRunnerResultManifest,
  salvageBlockedRunnerResultManifest,
} from "./result-manifest.js";
import type { RunnerResult } from "./types.js";

async function writeJsonManifest(
  directory: string,
  payload: Record<string, unknown>,
): Promise<string> {
  const resultPath = path.join(directory, "result.json");
  await mkdir(directory, { recursive: true });
  await writeFile(resultPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return resultPath;
}

function observedRunnerResult(overrides: Partial<RunnerResult> = {}): RunnerResult {
  return {
    status: "failed",
    exit_code: 7,
    started_at: "2026-07-23T09:00:00.000Z",
    ended_at: "2026-07-23T09:00:01.000Z",
    summary: "Supervisor observed a failed process.",
    stdout_summary: "Observed stdout.",
    stderr_summary: "Observed stderr.",
    timeout_reason: "idle",
    output_paths: ["runs/observed/trace.jsonl"],
    artifacts: [{ path: "runs/observed/trace.jsonl", label: "raw-trace" }],
    metrics: {
      duration_ms: 1000,
      stdout_bytes: 120,
      stderr_bytes: 24,
      output_last_message_bytes: 48,
    },
    evidence: {
      evidence_paths: ["runs/observed/trace.jsonl"],
      changed_paths: ["src/observed.ts"],
      files_changed_count: 1,
      tests_run: ["bun test observed"],
    },
    ...overrides,
  };
}

describe("runner result manifest", () => {
  it("consumes the generated canonical v2 fixture", async () => {
    const fixture = JSON.parse(
      await readFile(
        path.join(process.cwd(), "schemas", "examples", "agent-semantic-result-v2.valid.json"),
        "utf8",
      ),
    ) as Record<string, unknown>;
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-semantic-result-fixture-"));
    const resultPath = await writeJsonManifest(tempDir, fixture);

    await expect(readRunnerResultManifest(resultPath)).resolves.toEqual({
      source_schema_version: 2,
      semantic_result: {
        provenance: "agent_reported",
        value: fixture,
      },
      legacy_claims: [],
      warnings: [],
    });
  });

  it("reads a strict v2 semantic result and injects agent-reported provenance", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-semantic-result-v2-"));
    const resultPath = await writeJsonManifest(tempDir, {
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: "work-order-42",
      status: "needs_context",
      summary: "Implementation is ready except for one missing contract.",
      findings: ["The public schema does not define the required identifier."],
      uncertainty: ["The identifier may be supplied by a generated artifact."],
      blocker: {
        summary: "The identifier contract is unavailable.",
        recommended_action: "Provide the canonical schema.",
      },
      knowledge_request: {
        query: "canonical identifier schema",
        reason: "The implementation cannot safely invent the identifier.",
      },
      claimed_checks: [
        {
          check: "focused-tests",
          claimed_status: "passed",
          details: "The agent reports that focused tests passed.",
        },
      ],
    });

    await expect(readRunnerResultManifest(resultPath)).resolves.toEqual({
      source_schema_version: 2,
      semantic_result: {
        provenance: "agent_reported",
        value: {
          schema_version: 2,
          kind: "agent_semantic_result",
          work_order_id: "work-order-42",
          status: "needs_context",
          summary: "Implementation is ready except for one missing contract.",
          findings: ["The public schema does not define the required identifier."],
          uncertainty: ["The identifier may be supplied by a generated artifact."],
          blocker: {
            summary: "The identifier contract is unavailable.",
            recommended_action: "Provide the canonical schema.",
          },
          knowledge_request: {
            query: "canonical identifier schema",
            reason: "The implementation cannot safely invent the identifier.",
          },
          claimed_checks: [
            {
              check: "focused-tests",
              claimed_status: "passed",
              details: "The agent reports that focused tests passed.",
            },
          ],
        },
      },
      legacy_claims: [],
      warnings: [],
    });
  });

  it.each([
    ["exit_code", 0],
    ["timeout_reason", "wall_clock"],
    ["started_at", "2026-07-23T09:00:00.000Z"],
    ["ended_at", "2026-07-23T09:00:01.000Z"],
    ["stdout_summary", "claimed stdout"],
    ["stderr_summary", "claimed stderr"],
    ["metrics", { duration_ms: 1 }],
    ["artifacts", [{ path: "claimed.txt" }]],
    ["output_paths", ["claimed.txt"]],
    ["evidence", { changed_paths: ["src/claimed.ts"] }],
    ["checks", [{ name: "unit", status: "passed" }]],
    ["changed_paths", ["src/claimed.ts"]],
    ["capabilities_used", ["codex.exec"]],
    ["provenance", "observed"],
  ])("rejects observed or supervisor-owned v2 field %s", async (field, value) => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-semantic-result-strict-"));
    const resultPath = await writeJsonManifest(tempDir, {
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: "work-order-strict",
      status: "completed",
      summary: "The semantic work is complete.",
      findings: [],
      uncertainty: [],
      [field]: value,
    });

    let error: InvalidRunnerResultManifestError | null = null;
    try {
      await readRunnerResultManifest(resultPath);
    } catch (err) {
      error = err as InvalidRunnerResultManifestError;
    }

    expect(error).toBeInstanceOf(InvalidRunnerResultManifestError);
    expect(error?.result_path).toBe(resultPath);
    expect(error?.reason).toContain(field);
  });

  it("consumes the generated legacy v1 compatibility fixture", async () => {
    const fixture = JSON.parse(
      await readFile(
        path.join(process.cwd(), "schemas", "examples", "runner-result-manifest-v1.legacy.json"),
        "utf8",
      ),
    ) as Record<string, unknown>;
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-legacy-result-fixture-"));
    const resultPath = await writeJsonManifest(path.join(tempDir, "fixture-work-order"), fixture);

    const manifest = await readRunnerResultManifest(resultPath);

    expect(manifest).toMatchObject({
      source_schema_version: 1,
      semantic_result: {
        provenance: "agent_reported",
        value: {
          schema_version: 2,
          kind: "legacy_agent_semantic_result",
          work_order_id: "fixture-work-order",
          status: "completed",
          summary: fixture.summary,
          findings: fixture.findings,
        },
      },
    });
    expect(manifest?.warnings[0]?.code).toBe("legacy_manifest_v1");
    expect(manifest?.warnings[0]?.message).toContain("schema_version=1");
    expect(manifest?.legacy_claims).toEqual(
      expect.arrayContaining([
        { field: "status", value: fixture.status, provenance: "agent_reported" },
        {
          field: "exit_code",
          value: fixture.exit_code,
          provenance: "agent_reported",
        },
        {
          field: "timeout_reason",
          value: fixture.timeout_reason,
          provenance: "agent_reported",
        },
        {
          field: "metrics.duration_ms",
          value: 1250,
          provenance: "agent_reported",
        },
        {
          field: "evidence.changed_paths",
          value: ["packages/core/src/runner/agent-semantic-result.ts"],
          provenance: "agent_reported",
        },
        {
          field: "evidence.tests_run",
          value: ["bun run schemas:check"],
          provenance: "agent_reported",
        },
      ]),
    );
  });

  it("normalizes legacy v1 semantics while preserving observed-looking values as raw claims", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-result-manifest-v1-"));
    const resultPath = await writeJsonManifest(path.join(tempDir, "legacy-work-order"), {
      schema_version: 1,
      status: "success",
      exit_code: 0,
      summary: "Legacy runner claims success.",
      findings: ["Legacy semantic finding."],
      stdout_summary: "Legacy stdout claim.",
      timeout_reason: "wall_clock",
      artifacts: [],
      metrics: {
        duration_ms: 0,
        stdout_bytes: 0,
        stderr_bytes: 0,
        output_last_message_bytes: null,
      },
      evidence: {
        evidence_paths: [],
        changed_paths: [],
        files_changed_count: 0,
        tests_run: [],
      },
    });

    const manifest = await readRunnerResultManifest(resultPath);

    expect(manifest).toMatchObject({
      source_schema_version: 1,
      semantic_result: {
        provenance: "agent_reported",
        value: {
          schema_version: 2,
          kind: "legacy_agent_semantic_result",
          work_order_id: "legacy-work-order",
          status: "completed",
          summary: "Legacy runner claims success.",
          findings: ["Legacy semantic finding."],
        },
      },
    });
    expect(manifest?.legacy_claims).toEqual([
      { field: "status", value: "success", provenance: "agent_reported" },
      { field: "exit_code", value: 0, provenance: "agent_reported" },
      {
        field: "stdout_summary",
        value: "Legacy stdout claim.",
        provenance: "agent_reported",
      },
      { field: "timeout_reason", value: "wall_clock", provenance: "agent_reported" },
      { field: "artifacts", value: [], provenance: "agent_reported" },
      { field: "metrics.duration_ms", value: 0, provenance: "agent_reported" },
      { field: "metrics.stdout_bytes", value: 0, provenance: "agent_reported" },
      { field: "metrics.stderr_bytes", value: 0, provenance: "agent_reported" },
      {
        field: "metrics.output_last_message_bytes",
        value: null,
        provenance: "agent_reported",
      },
      { field: "evidence.evidence_paths", value: [], provenance: "agent_reported" },
      { field: "evidence.changed_paths", value: [], provenance: "agent_reported" },
      { field: "evidence.files_changed_count", value: 0, provenance: "agent_reported" },
      { field: "evidence.tests_run", value: [], provenance: "agent_reported" },
    ]);
    const warnings = manifest?.warnings ?? [];
    expect(warnings[0]?.code).toBe("legacy_manifest_v1");
    expect(warnings.every((warning) => warning.message.length > 0)).toBe(true);
    expect(warnings.slice(1).map((warning) => ("field" in warning ? warning.field : null))).toEqual(
      manifest?.legacy_claims.map((claim) => claim.field),
    );
  });

  it("keeps supervisor observations authoritative and audits conflicting legacy claims", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-result-conflicts-"));
    const resultPath = await writeJsonManifest(path.join(tempDir, "conflicting-work-order"), {
      schema_version: 1,
      status: "success",
      exit_code: 0,
      summary: "Agent claims the run succeeded.",
      timeout_reason: "wall_clock",
      artifacts: [{ path: "agent-claimed.txt", label: "claimed-output" }],
      metrics: { duration_ms: 10 },
      evidence: {
        changed_paths: ["src/claimed.ts"],
        files_changed_count: 9,
        tests_run: ["bun test claimed"],
      },
    });
    const manifest = await readRunnerResultManifest(resultPath);
    const base = observedRunnerResult();

    const applied = applyRunnerResultManifest({ base, manifest });

    expect(applied).toMatchObject({
      status: "failed",
      exit_code: 7,
      timeout_reason: "idle",
      output_paths: ["runs/observed/trace.jsonl"],
      artifacts: [{ path: "runs/observed/trace.jsonl", label: "raw-trace" }],
      metrics: {
        duration_ms: 1000,
        stdout_bytes: 120,
        stderr_bytes: 24,
        output_last_message_bytes: 48,
      },
      evidence: {
        evidence_paths: ["runs/observed/trace.jsonl"],
        changed_paths: ["src/observed.ts"],
        files_changed_count: 1,
        tests_run: ["bun test observed"],
      },
      semantic_result: manifest!.semantic_result,
      agent_reported_claims: manifest!.legacy_claims,
      manifest_warnings: manifest!.warnings,
    });
    expect(applied.claim_conflicts).toEqual(
      expect.arrayContaining([
        {
          field: "status",
          agent_reported: "success",
          observed: "failed",
          resolution: "observed_wins",
        },
        {
          field: "exit_code",
          agent_reported: 0,
          observed: 7,
          resolution: "observed_wins",
        },
        {
          field: "timeout_reason",
          agent_reported: "wall_clock",
          observed: "idle",
          resolution: "observed_wins",
        },
        {
          field: "metrics.duration_ms",
          agent_reported: 10,
          observed: 1000,
          resolution: "observed_wins",
        },
        {
          field: "evidence.changed_paths",
          agent_reported: ["src/claimed.ts"],
          observed: ["src/observed.ts"],
          resolution: "observed_wins",
        },
        {
          field: "evidence.tests_run",
          agent_reported: ["bun test claimed"],
          observed: ["bun test observed"],
          resolution: "observed_wins",
        },
      ]),
    );
  });

  it("does not expose an observed status when salvaging invalid legacy blocker guidance", () => {
    const salvaged = salvageBlockedRunnerResultManifest(
      JSON.stringify({
        schema_version: 1,
        status: "blocked",
        exit_code: 1,
        summary: "Runner claims it is blocked on sibling-owned paths.",
        artifacts: [{ path: "reports/out.txt", label: "Bad Label" }],
        evidence: {
          conflict_paths: ["src/runner/conflict.ts"],
          blocked_reason: "sibling runner owns the same file",
          recommended_parent_action: "split task scope before retrying",
        },
      }),
      "runs/legacy-blocked/result.json",
    );

    expect(salvaged).toMatchObject({
      semantic_result: {
        provenance: "agent_reported",
        value: {
          schema_version: 2,
          kind: "legacy_agent_semantic_result",
          work_order_id: "legacy-blocked",
          status: "blocked",
          summary: "Runner claims it is blocked on sibling-owned paths.",
        },
      },
    });
    expect(salvaged).not.toHaveProperty("status");
    expect(salvaged).not.toHaveProperty("exit_code");
    expect(salvaged).not.toHaveProperty("timeout_reason");
    expect(salvaged).not.toHaveProperty("metrics");
    expect(salvaged).not.toHaveProperty("artifacts");
    expect(salvaged).not.toHaveProperty("evidence");
  });

  it("preserves malformed manifest payloads for later inspection", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-result-manifest-preserve-"));
    const resultPath = path.join(tempDir, "result.json");
    const rawManifest = '{\n  "schema_version": 2,\n  "findings": [42]\n}\n';
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

  it("preserves the original agent manifest with write-once source semantics", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-result-source-once-"));
    const resultPath = path.join(tempDir, "result.json");
    const sourcePath = path.join(tempDir, "result.source.json");
    const agentPayload = '{"schema_version":1,"summary":"agent source"}\n';
    await writeFile(resultPath, agentPayload, "utf8");

    await expect(preserveRunnerResultManifestSource(resultPath)).resolves.toBe(sourcePath);
    await writeFile(
      resultPath,
      '{"schema_version":1,"kind":"runner_result_record","observed_by":"agentplane"}\n',
      "utf8",
    );
    await expect(preserveRunnerResultManifestSource(resultPath)).rejects.toThrow(
      "does not match the current agent manifest",
    );

    expect(await readFile(sourcePath, "utf8")).toBe(agentPayload);
  });

  it("preserves the exact source bytes without UTF-8 normalization", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-result-source-bytes-"));
    const resultPath = path.join(tempDir, "result.json");
    const sourcePath = path.join(tempDir, "result.source.json");
    const agentPayload = Buffer.from([
      0x7b, 0x22, 0x76, 0x22, 0x3a, 0x22, 0x0d, 0x0a, 0xff, 0x22, 0x7d, 0x0a,
    ]);
    await writeFile(resultPath, agentPayload);

    await expect(preserveRunnerResultManifestSource(resultPath)).resolves.toBe(sourcePath);
    expect(await readFile(sourcePath)).toEqual(agentPayload);
  });

  it.skipIf(process.platform === "win32")(
    "rejects an agent-controlled result symlink that points outside the run directory",
    async () => {
      const runDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-result-source-input-link-"));
      const outsideDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-result-source-outside-"));
      const resultPath = path.join(runDir, "result.json");
      const sourcePath = path.join(runDir, "result.source.json");
      const outsidePath = path.join(outsideDir, "outside.json");
      const agentPayload = '{"schema_version":1,"summary":"outside source"}\n';
      await writeFile(outsidePath, agentPayload, "utf8");
      await symlink(outsidePath, resultPath);

      await expect(preserveRunnerResultManifestSource(resultPath)).rejects.toThrow(
        "Refusing non-regular runner result manifest",
      );
      await expect(readFile(sourcePath)).rejects.toMatchObject({ code: "ENOENT" });
      expect(await readFile(outsidePath, "utf8")).toBe(agentPayload);
    },
  );

  it("rejects a pre-created source symlink even when its bytes match", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-result-source-symlink-"));
    const resultPath = path.join(tempDir, "result.json");
    const sourcePath = path.join(tempDir, "result.source.json");
    const attackerPath = path.join(tempDir, "attacker-controlled.json");
    const agentPayload = '{"schema_version":1,"summary":"agent source"}\n';
    await writeFile(resultPath, agentPayload, "utf8");
    await writeFile(attackerPath, agentPayload, "utf8");
    await symlink(attackerPath, sourcePath);

    await expect(preserveRunnerResultManifestSource(resultPath)).rejects.toThrow(
      "Refusing non-regular runner result source snapshot",
    );
    expect(await readFile(attackerPath, "utf8")).toBe(agentPayload);
  });
});
