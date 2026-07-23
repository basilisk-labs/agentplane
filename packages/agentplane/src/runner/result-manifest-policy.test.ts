import { describe, expect, it } from "vitest";

import { CliError } from "../shared/errors.js";

import {
  assertRunnerManifestArtifactPolicy,
  readRecipeArtifactPrefixesFromRunnerEnv,
} from "./result-manifest-policy.js";
import type { AgentReportedLegacyClaim, RunnerResultManifest } from "./types.js";

function legacyManifest(claims: AgentReportedLegacyClaim[]): RunnerResultManifest {
  return {
    source_schema_version: 1,
    semantic_result: {
      provenance: "agent_reported",
      value: {
        schema_version: 2,
        kind: "legacy_agent_semantic_result",
        work_order_id: "policy-test",
      },
    },
    legacy_claims: claims,
    warnings: [],
  };
}

describe("result-manifest-policy", () => {
  it("accepts normalized relative paths under declared prefixes", () => {
    expect(() =>
      assertRunnerManifestArtifactPolicy({
        adapter_id: "custom",
        allowed_prefixes: ["reports/", "logs"],
        manifest: legacyManifest([
          {
            field: "artifacts",
            value: [{ path: "./reports//out.txt", label: "report" }],
            provenance: "agent_reported",
          },
          {
            field: "evidence.evidence_paths",
            value: ["logs/trace.log"],
            provenance: "agent_reported",
          },
        ]),
      }),
    ).not.toThrow();
  });

  it("rejects traversal, sibling prefixes, and absolute paths", () => {
    let error: unknown = null;
    try {
      assertRunnerManifestArtifactPolicy({
        adapter_id: "custom",
        allowed_prefixes: ["reports", "logs/"],
        manifest: legacyManifest([
          {
            field: "artifacts",
            value: [
              { path: "reports/../outside.txt", label: "report" },
              { path: "reports2/out.txt", label: "report" },
            ],
            provenance: "agent_reported",
          },
          {
            field: "evidence.evidence_paths",
            value: ["/tmp/out.log"],
            provenance: "agent_reported",
          },
        ]),
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(CliError);
    expect(error).toMatchObject({
      code: "E_RUNTIME",
      exitCode: 8,
      context: {
        policy_field: "writes_artifacts_to",
        invalid_artifact_paths: ["reports/../outside.txt", "reports2/out.txt"],
        invalid_evidence_paths: ["/tmp/out.log"],
      },
    });
    expect((error as CliError).message).toContain("writes_artifacts_to prefixes");
  });

  it("rejects invalid declared prefixes from runner env", () => {
    let error: unknown = null;
    try {
      readRecipeArtifactPrefixesFromRunnerEnv({
        AGENTPLANE_RECIPE_WRITES_ARTIFACTS_TO: JSON.stringify(["reports/", "../tmp"]),
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(CliError);
    expect(error).toMatchObject({
      code: "E_RUNTIME",
      exitCode: 8,
      context: {
        policy_field: "writes_artifacts_to",
        invalid_declared_prefixes: ["../tmp"],
      },
    });
  });
});
