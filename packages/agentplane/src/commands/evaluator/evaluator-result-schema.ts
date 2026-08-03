const NON_EMPTY_STRING_SCHEMA = { type: "string", minLength: 1 } as const;
const NULLABLE_NON_EMPTY_STRING_SCHEMA = {
  type: ["string", "null"],
  minLength: 1,
} as const;
const NULLABLE_SHA256_SCHEMA = {
  type: ["string", "null"],
  pattern: "^sha256:[a-f0-9]{64}$",
} as const;
const NULLABLE_POSITIVE_INTEGER_SCHEMA = {
  type: ["integer", "null"],
  minimum: 1,
} as const;

const EVALUATOR_RESULT_OUTPUT_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "AgentPlane EvaluatorSgrResult",
  description:
    "Read-only EVALUATOR output. AgentPlane validates frozen evidence and owns all persistence.",
  type: "object",
  additionalProperties: false,
  properties: {
    schema_version: { type: "integer", enum: [1] },
    kind: { type: "string", enum: ["evaluator_result"] },
    evaluator_id: NON_EMPTY_STRING_SCHEMA,
    verdict: { type: "string", enum: ["pass", "rework", "blocked", "human_review"] },
    findings: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          id: NON_EMPTY_STRING_SCHEMA,
          severity: { type: "string", enum: ["low", "medium", "high"] },
          summary: NON_EMPTY_STRING_SCHEMA,
          broken_invariant: NON_EMPTY_STRING_SCHEMA,
          evidence_refs: {
            type: "array",
            minItems: 1,
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                path: NON_EMPTY_STRING_SCHEMA,
                sha256: NULLABLE_SHA256_SCHEMA,
                line: NULLABLE_POSITIVE_INTEGER_SCHEMA,
                lines: NULLABLE_NON_EMPTY_STRING_SCHEMA,
                section: NULLABLE_NON_EMPTY_STRING_SCHEMA,
              },
              // Codex structured output requires every declared property to
              // appear in `required`. Source-reference metadata remains
              // semantically optional by using null, which is normalized by
              // the evaluator result validator before its typed SGR handoff.
              required: ["path", "sha256", "line", "lines", "section"],
            },
          },
        },
        required: ["id", "severity", "summary", "broken_invariant", "evidence_refs"],
      },
    },
    missing_tests: { type: "array", items: { type: "string" } },
    hidden_assumptions: { type: "array", items: { type: "string" } },
    recovery_context: NULLABLE_NON_EMPTY_STRING_SCHEMA,
    recovery_reason: { type: ["string", "null"], enum: ["deterministic_evidence_gap", null] },
  },
  required: [
    "schema_version",
    "kind",
    "evaluator_id",
    "verdict",
    "findings",
    "missing_tests",
    "hidden_assumptions",
    "recovery_context",
    "recovery_reason",
  ],
} as const;

export function renderEvaluatorResultOutputSchemaJson(): string {
  return `${JSON.stringify(EVALUATOR_RESULT_OUTPUT_SCHEMA, null, 2)}\n`;
}
