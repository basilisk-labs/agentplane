import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  EXECUTION_RECEIPT_PROVENANCE,
  EXECUTION_RECEIPT_V1_VALID_FIXTURE,
  listExecutionReceiptSchemaErrors,
  renderExecutionReceiptSchemaJson,
  validateExecutionReceipt,
} from "./execution-receipt.js";

describe("execution receipt contract", () => {
  it("accepts the generated v1 fixture", async () => {
    const fixturePath = path.join(
      process.cwd(),
      "schemas",
      "examples",
      "execution-receipt-v1.valid.json",
    );
    const fixture = JSON.parse(await readFile(fixturePath, "utf8")) as unknown;

    expect(validateExecutionReceipt(fixture)).toEqual(EXECUTION_RECEIPT_V1_VALID_FIXTURE);
  });

  it.each([
    ["agent_reported provenance", ["process", "provenance"], "agent_reported"],
    ["unknown process outcome", ["process", "outcome"], "completed"],
    ["invalid artifact digest", ["artifacts", 0, "sha256"], "sha256:not-a-digest"],
    ["unknown success outcome", ["success_policy", "outcome"], "success"],
  ])("rejects %s", (_label, pathSegments, value) => {
    const candidate = structuredClone(EXECUTION_RECEIPT_V1_VALID_FIXTURE) as Record<
      string,
      unknown
    >;
    let target: Record<string | number, unknown> = candidate;
    for (const segment of pathSegments.slice(0, -1)) {
      target = target[segment] as Record<string | number, unknown>;
    }
    target[pathSegments.at(-1)!] = value;

    expect(listExecutionReceiptSchemaErrors(candidate)).not.toEqual([]);
  });

  it("rejects unexpected fields at every durable boundary", () => {
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V1_VALID_FIXTURE,
        semantic_result: { provenance: "agent_reported" },
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V1_VALID_FIXTURE,
        process: {
          ...EXECUTION_RECEIPT_V1_VALID_FIXTURE.process,
          claimed_checks: [],
        },
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V1_VALID_FIXTURE,
        git: {
          ...EXECUTION_RECEIPT_V1_VALID_FIXTURE.git,
          delta: {
            ...EXECUTION_RECEIPT_V1_VALID_FIXTURE.git.delta,
            agent_reported_paths: [],
          },
        },
      }),
    ).not.toEqual([]);
  });

  it("enforces state-specific observation contracts", () => {
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V1_VALID_FIXTURE,
        artifacts: [
          {
            provenance: EXECUTION_RECEIPT_PROVENANCE,
            path: "missing.txt",
            required: true,
            state: "missing",
            bytes: 12,
            sha256: `sha256:${"1".repeat(64)}`,
          },
        ],
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V1_VALID_FIXTURE,
        git: {
          provenance: EXECUTION_RECEIPT_PROVENANCE,
          state: "unavailable",
          before: EXECUTION_RECEIPT_V1_VALID_FIXTURE.git.before,
          after: null,
          delta: null,
          excluded_paths: [],
        },
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V1_VALID_FIXTURE,
        collection: {
          provenance: EXECUTION_RECEIPT_PROVENANCE,
          status: "complete",
          errors: ["Git observer failed."],
        },
      }),
    ).not.toEqual([]);
  });

  it("rejects observed success without complete observed evidence", () => {
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V1_VALID_FIXTURE,
        process: {
          ...EXECUTION_RECEIPT_V1_VALID_FIXTURE.process,
          exit_code: 7,
        },
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V1_VALID_FIXTURE,
        checks: [
          {
            ...EXECUTION_RECEIPT_V1_VALID_FIXTURE.checks[0],
            status: "failed",
            exit_code: 1,
          },
        ],
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V1_VALID_FIXTURE,
        process: {
          ...EXECUTION_RECEIPT_V1_VALID_FIXTURE.process,
          process_tree: {
            ...EXECUTION_RECEIPT_V1_VALID_FIXTURE.process.process_tree,
            containment_state: "limited",
            containment_limitation:
              "POSIX process-group cleanup cannot observe descendants in a new session.",
          },
        },
      }),
    ).not.toEqual([]);
  });

  it("enforces process observation coherence", () => {
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V1_VALID_FIXTURE,
        process: {
          ...EXECUTION_RECEIPT_V1_VALID_FIXTURE.process,
          outcome: "timed_out",
          exit_code: 124,
          timeout_reason: null,
        },
        success_policy: {
          provenance: EXECUTION_RECEIPT_PROVENANCE,
          outcome: "rejected",
          reasons: ["The process timed out."],
        },
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V1_VALID_FIXTURE,
        process: {
          ...EXECUTION_RECEIPT_V1_VALID_FIXTURE.process,
          started_at: "2026-07-23T11:00:00.000+01:00",
          ended_at: "2026-07-23T09:59:59.000Z",
        },
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V1_VALID_FIXTURE,
        process: {
          ...EXECUTION_RECEIPT_V1_VALID_FIXTURE.process,
          outcome: "signaled",
          exit_code: null,
          exit_signal: null,
        },
        success_policy: {
          provenance: EXECUTION_RECEIPT_PROVENANCE,
          outcome: "rejected",
          reasons: ["The process was terminated by a signal."],
        },
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V1_VALID_FIXTURE,
        process: {
          ...EXECUTION_RECEIPT_V1_VALID_FIXTURE.process,
          outcome: "signaled",
          exit_code: null,
          exit_signal: "SIGKILL",
        },
        success_policy: {
          provenance: EXECUTION_RECEIPT_PROVENANCE,
          outcome: "rejected",
          reasons: ["The process was terminated by a signal."],
        },
      }),
    ).toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V1_VALID_FIXTURE,
        process: {
          ...EXECUTION_RECEIPT_V1_VALID_FIXTURE.process,
          outcome: "signaled",
          exit_code: null,
          exit_signal: "SIGABRT",
        },
        success_policy: {
          provenance: EXECUTION_RECEIPT_PROVENANCE,
          outcome: "rejected",
          reasons: ["The process was terminated by SIGABRT."],
        },
      }),
    ).toEqual([]);
  });

  it("renders a strict public schema", () => {
    const rendered = JSON.parse(renderExecutionReceiptSchemaJson()) as {
      additionalProperties?: boolean;
      required?: string[];
      properties?: {
        process?: { additionalProperties?: boolean };
        git?: { oneOf?: { additionalProperties?: boolean }[] };
        artifacts?: { items?: { oneOf?: { additionalProperties?: boolean }[] } };
        success_policy?: { oneOf?: { additionalProperties?: boolean }[] };
      };
    };

    expect(rendered.additionalProperties).toBe(false);
    expect(rendered.required).toEqual(
      expect.arrayContaining([
        "process",
        "git",
        "artifacts",
        "checks",
        "collection",
        "scope_evaluation",
        "success_policy",
      ]),
    );
    expect(rendered.properties?.process?.additionalProperties).toBe(false);
    expect(
      rendered.properties?.git?.oneOf?.every((branch) => branch.additionalProperties === false),
    ).toBe(true);
    expect(
      rendered.properties?.artifacts?.items?.oneOf?.every(
        (branch) => branch.additionalProperties === false,
      ),
    ).toBe(true);
    expect(
      rendered.properties?.success_policy?.oneOf?.every(
        (branch) => branch.additionalProperties === false,
      ),
    ).toBe(true);
  });
});
