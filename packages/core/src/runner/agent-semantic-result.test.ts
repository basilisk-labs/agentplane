import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE,
  RUNNER_RESULT_MANIFEST_V1_LEGACY_FIXTURE,
  listAgentSemanticResultSchemaErrors,
  renderAgentSemanticResultSchemaJson,
  validateAgentSemanticResult,
} from "./agent-semantic-result.js";

describe("agent semantic result contract", () => {
  it("accepts the generated v2 fixture", async () => {
    const fixturePath = path.join(
      process.cwd(),
      "schemas",
      "examples",
      "agent-semantic-result-v2.valid.json",
    );
    const fixture = JSON.parse(await readFile(fixturePath, "utf8")) as unknown;

    expect(validateAgentSemanticResult(fixture)).toEqual(AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE);
  });

  it("publishes the legacy v1 fixture only as incompatible migration input", async () => {
    const fixturePath = path.join(
      process.cwd(),
      "schemas",
      "examples",
      "runner-result-manifest-v1.legacy.json",
    );
    const fixture = JSON.parse(await readFile(fixturePath, "utf8")) as unknown;

    expect(fixture).toEqual(RUNNER_RESULT_MANIFEST_V1_LEGACY_FIXTURE);
    expect(listAgentSemanticResultSchemaErrors(fixture)).not.toEqual([]);
  });

  it("requires status-specific semantic details", () => {
    expect(
      listAgentSemanticResultSchemaErrors({
        ...AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE,
        status: "blocked",
      }),
    ).not.toEqual([]);
    expect(
      listAgentSemanticResultSchemaErrors({
        ...AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE,
        status: "needs_context",
      }),
    ).not.toEqual([]);
    expect(
      listAgentSemanticResultSchemaErrors({
        ...AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE,
        status: "blocked",
        blocker: { summary: "The required API is unavailable." },
      }),
    ).toEqual([]);
    expect(
      listAgentSemanticResultSchemaErrors({
        ...AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE,
        status: "needs_context",
        knowledge_request: {
          query: "Where is the provider contract defined?",
          reason: "The current work order does not include that contract.",
        },
      }),
    ).toEqual([]);
  });

  it.each([
    ["provenance", "agent_reported"],
    ["exit_code", 0],
    ["timeout_reason", null],
    ["duration_ms", 1250],
    ["metrics", { duration_ms: 1250 }],
    ["artifacts", [{ path: "result.json" }]],
    ["checks", [{ check: "bun run test", status: "passed" }]],
    ["changed_paths", ["packages/core/src/runner/agent-semantic-result.ts"]],
  ])("rejects agent-writable observed field %s", (field, value) => {
    expect(
      listAgentSemanticResultSchemaErrors({
        ...AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE,
        [field]: value,
      }),
    ).not.toEqual([]);
  });

  it("renders a strict public schema with the status requirements", () => {
    const rendered = JSON.parse(renderAgentSemanticResultSchemaJson()) as {
      oneOf?: {
        properties?: { status?: { const?: string } };
        required?: string[];
        additionalProperties?: boolean;
      }[];
    };

    expect(rendered.oneOf).toHaveLength(3);
    expect(
      rendered.oneOf?.find((branch) => branch.properties?.status?.const === "blocked")?.required,
    ).toContain("blocker");
    expect(
      rendered.oneOf?.find((branch) => branch.properties?.status?.const === "needs_context")
        ?.required,
    ).toContain("knowledge_request");
    expect(rendered.oneOf?.every((branch) => branch.additionalProperties === false)).toBe(true);
  });
});
