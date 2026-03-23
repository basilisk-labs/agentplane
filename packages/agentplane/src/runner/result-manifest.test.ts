import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  InvalidRunnerResultManifestError,
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
});
