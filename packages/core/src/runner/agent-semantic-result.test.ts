import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  AGENT_SEMANTIC_RESULT_STATUS_VALUES,
  AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE,
  AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURES,
  AGENT_SEMANTIC_RESULT_V2_INVALID_FIXTURES,
  RUNNER_RESULT_MANIFEST_V1_LEGACY_FIXTURE,
  buildAgentSemanticResultV2ValidFixtures,
  listAgentSemanticResultSchemaErrors,
  renderAgentSemanticResultSchemaJson,
  validateAgentSemanticResult,
} from "./agent-semantic-result.js";

describe("agent semantic result contract", () => {
  it("binds canonical results to one strict semantic phase", () => {
    const digest = `sha256:${"a".repeat(64)}`;
    const binding = {
      phase: "implementation",
      task_id: "task-example-001",
      repository_identity: digest,
      repository_fingerprint: digest,
      plan_revision: 1,
      plan_digest: digest,
      work_item_id: "build",
      attempt: 1,
      claim_id: "claim",
      contract_digest: digest,
      authority_digest: digest,
    };
    const value = {
      ...AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE,
      canonical_binding: binding,
      canonical_outputs: [{ id: "source", kind: "source", digest }],
    };
    expect(validateAgentSemanticResult(value).canonical_binding).toEqual(binding);
    for (const invalid of [
      { ...value, canonical_binding: undefined },
      { ...value, canonical_outputs: undefined },
      { ...value, canonical_binding: { ...binding, attempt: 0 } },
      { ...value, canonical_binding: { ...binding, phase: "planning" } },
      { ...value, canonical_binding: { ...binding, authority_digest: "invented" } },
      { ...value, canonical_outputs: [{ id: "__proto__", kind: "source", digest }] },
    ])
      expect(listAgentSemanticResultSchemaErrors(invalid)).not.toEqual([]);
  });

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

  it.each([
    ["blocked", "agent-semantic-result-v2.blocked.valid.json"],
    ["needs_context", "agent-semantic-result-v2.needs-context.valid.json"],
    ["failed", "agent-semantic-result-v2.failed.valid.json"],
  ] as const)("accepts the generated %s fixture", async (status, fileName) => {
    const fixture = JSON.parse(
      await readFile(path.join(process.cwd(), "schemas", "examples", fileName), "utf8"),
    ) as unknown;

    expect(validateAgentSemanticResult(fixture)).toEqual(
      AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURES[status],
    );
  });

  it("builds every advertised status for the supplied work order", () => {
    const fixtures = buildAgentSemanticResultV2ValidFixtures("run-current");

    expect(Object.keys(fixtures)).toEqual(AGENT_SEMANTIC_RESULT_STATUS_VALUES);
    for (const status of AGENT_SEMANTIC_RESULT_STATUS_VALUES) {
      expect(validateAgentSemanticResult(fixtures[status])).toEqual(fixtures[status]);
      expect(fixtures[status].work_order_id).toBe("run-current");
    }
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
      listAgentSemanticResultSchemaErrors(
        AGENT_SEMANTIC_RESULT_V2_INVALID_FIXTURES.blocked_without_blocker,
      ),
    ).not.toEqual([]);
    expect(
      listAgentSemanticResultSchemaErrors(
        AGENT_SEMANTIC_RESULT_V2_INVALID_FIXTURES.needs_context_without_knowledge_request,
      ),
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
        ...buildAgentSemanticResultV2ValidFixtures("scope-request-invalid").blocked,
        blocker: {
          summary: "Additional repository scope is required.",
          scope_extension_request: {
            schema_version: 1,
            scope_roots: [],
            repository_effects: [],
            rationale: "No actual authority was requested.",
          },
        },
      }),
    ).not.toEqual([]);
    expect(
      listAgentSemanticResultSchemaErrors({
        ...AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE,
        status: "needs_context",
        knowledge_request: {
          schema_version: 1,
          kind: "knowledge_request",
          query: "Where is the provider contract defined?",
          reason: "The current work order does not include that contract.",
          desired_kind: "source",
          scope: "task_context",
          blocking: true,
        },
      }),
    ).toEqual([]);
  });

  it("accepts typed planner intent without natural-language classification", () => {
    expect(
      validateAgentSemanticResult({
        ...AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE,
        task_intent: {
          task_kind: "code",
          mutation_scope: "code",
          risk_flags: ["security"],
          tags: ["cli", "parser"],
          blueprint_request: "code.branch_pr",
          execution: {
            schema_version: 2,
            preferred_mode: "branch_pr",
            scope_roots: ["packages/core"],
            repository_effects: ["repository_write", "source_code", "security_boundary"],
            external_effects: [],
            requirements_uncertainty: "bounded",
            implementation_uncertainty: "material",
            reversibility: "reversible",
            rationale: ["security boundary changes require isolated review"],
          },
        },
      }).task_intent,
    ).toEqual({
      task_kind: "code",
      mutation_scope: "code",
      risk_flags: ["security"],
      tags: ["cli", "parser"],
      blueprint_request: "code.branch_pr",
      execution: {
        schema_version: 2,
        preferred_mode: "branch_pr",
        scope_roots: ["packages/core"],
        repository_effects: ["repository_write", "source_code", "security_boundary"],
        external_effects: [],
        requirements_uncertainty: "bounded",
        implementation_uncertainty: "material",
        reversibility: "reversible",
        rationale: ["security boundary changes require isolated review"],
      },
    });
    expect(
      listAgentSemanticResultSchemaErrors({
        ...AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE,
        task_intent: {
          task_kind: "code",
          mutation_scope: "unknown",
          risk_flags: [],
          tags: [],
        },
      }),
    ).not.toEqual([]);
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
