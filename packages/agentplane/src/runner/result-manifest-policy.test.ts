import { describe, expect, it } from "vitest";

import { CliError } from "../shared/errors.js";

import {
  assertRunnerManifestArtifactPolicy,
  readRecipeArtifactPrefixesFromRunnerEnv,
} from "./result-manifest-policy.js";

describe("result-manifest-policy", () => {
  it("accepts normalized relative paths under declared prefixes", () => {
    expect(() =>
      assertRunnerManifestArtifactPolicy({
        adapter_id: "custom",
        allowed_prefixes: ["reports/", "logs"],
        manifest: {
          schema_version: 1,
          status: "success",
          artifacts: [{ path: "./reports//out.txt", label: "report" }],
          evidence: {
            evidence_paths: ["logs/trace.log"],
          },
        },
      }),
    ).not.toThrow();
  });

  it("rejects traversal, sibling prefixes, and absolute paths", () => {
    let error: unknown = null;
    try {
      assertRunnerManifestArtifactPolicy({
        adapter_id: "custom",
        allowed_prefixes: ["reports", "logs/"],
        manifest: {
          schema_version: 1,
          status: "success",
          artifacts: [
            { path: "reports/../outside.txt", label: "report" },
            { path: "reports2/out.txt", label: "report" },
          ],
          evidence: {
            evidence_paths: ["/tmp/out.log"],
          },
        },
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
