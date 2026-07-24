import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import { makeRunnerContextBundle, setRunnerBundleRunDir } from "@agentplane/testkit/runner";
import { afterEach, describe, expect, it } from "vitest";

import { writePreparedRunnerArtifacts } from "../artifacts.js";
import { createRunnerAdapter } from "./index.js";
import {
  createCodexResultEventCollector,
  materializeCodexResultTransport,
  renderCodexResultOutputSchemaJson,
} from "./codex-result-transport.js";

const tempRoots: string[] = [];

afterEach(async () => {
  await Promise.all(
    tempRoots.splice(0).map(async (root) => await rm(root, { recursive: true, force: true })),
  );
});

async function tempResultPath(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-codex-result-transport-"));
  tempRoots.push(root);
  return path.join(root, "result.json");
}

function validTransportResult(workOrderId: string): Record<string, unknown> {
  return {
    schema_version: 2,
    kind: "agent_semantic_result",
    work_order_id: workOrderId,
    status: "completed",
    summary: "Structured result.",
    findings: [],
    uncertainty: [],
    claimed_checks: [],
    blocker: null,
    knowledge_request: null,
  };
}

describe("Codex supervisor semantic result transport", () => {
  it("renders a strict structured-output schema without union keywords", () => {
    const schemaText = renderCodexResultOutputSchemaJson();
    const schema = JSON.parse(schemaText) as Record<string, unknown>;

    expect(schemaText).not.toContain('"oneOf"');
    expect(schemaText).not.toContain('"anyOf"');
    expect(schema).toMatchObject({
      type: "object",
      additionalProperties: false,
    });
    expect(schema.required).toEqual(
      expect.arrayContaining([
        "schema_version",
        "kind",
        "work_order_id",
        "status",
        "blocker",
        "knowledge_request",
      ]),
    );
  });

  it("normalizes nullable transport fields into canonical AgentSemanticResult v2", async () => {
    const resultPath = await tempResultPath();
    const rawText = JSON.stringify({
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: "run-read-only",
      status: "completed",
      summary: "Read-only review completed.",
      findings: ["No mutation was needed."],
      uncertainty: [],
      claimed_checks: [
        {
          check: "review",
          claimed_status: "passed",
          details: null,
        },
      ],
      blocker: null,
      knowledge_request: null,
    });

    const normalized = await materializeCodexResultTransport({
      raw_text: rawText,
      result_path: resultPath,
      work_order_id: "run-read-only",
    });

    expect(normalized).toEqual({
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: "run-read-only",
      status: "completed",
      summary: "Read-only review completed.",
      findings: ["No mutation was needed."],
      uncertainty: [],
      claimed_checks: [
        {
          check: "review",
          claimed_status: "passed",
        },
      ],
    });
    expect(JSON.parse(await readFile(resultPath, "utf8"))).toEqual(normalized);
  });

  it("uses the last agent message before turn completion", async () => {
    const resultPath = await tempResultPath();
    const collector = createCodexResultEventCollector();
    collector.observeStdoutLine(
      JSON.stringify({
        type: "item.completed",
        item: {
          type: "agent_message",
          text: "Intermediate assistant message.",
        },
      }),
    );
    collector.observeStdoutLine(
      JSON.stringify({
        type: "item.completed",
        item: {
          type: "agent_message",
          text: JSON.stringify({
            schema_version: 2,
            kind: "agent_semantic_result",
            work_order_id: "run-read-only",
            status: "completed",
            summary: "Final structured result.",
            findings: [],
            uncertainty: [],
            claimed_checks: [],
            blocker: null,
            knowledge_request: null,
          }),
        },
      }),
    );
    collector.observeStdoutLine(JSON.stringify({ type: "turn.completed" }));

    await expect(
      materializeCodexResultTransport({
        raw_text: collector.readLastAgentMessage(),
        result_path: resultPath,
        work_order_id: "run-read-only",
      }),
    ).resolves.toMatchObject({
      work_order_id: "run-read-only",
      summary: "Final structured result.",
    });
  });

  it("rejects an agent message emitted after turn completion", () => {
    const collector = createCodexResultEventCollector();
    collector.observeStdoutLine(JSON.stringify({ type: "turn.completed" }));
    collector.observeStdoutLine(
      JSON.stringify({
        type: "item.completed",
        item: {
          type: "agent_message",
          text: JSON.stringify({
            schema_version: 2,
            kind: "agent_semantic_result",
            work_order_id: "run-read-only",
            status: "completed",
            summary: "Late result.",
            findings: [],
            uncertainty: [],
            claimed_checks: [],
            blocker: null,
            knowledge_request: null,
          }),
        },
      }),
    );

    expect(() => collector.readLastAgentMessage()).toThrow(/after turn completion/u);
  });

  it("fails closed when the stream ends before turn completion", () => {
    const collector = createCodexResultEventCollector();
    collector.observeStdoutLine(
      JSON.stringify({
        type: "item.completed",
        item: {
          type: "agent_message",
          text: "Incomplete turn.",
        },
      }),
    );

    expect(() => collector.readLastAgentMessage()).toThrow(/before turn completion/u);
  });

  it("rejects duplicate turn completion events", () => {
    const collector = createCodexResultEventCollector();
    collector.observeStdoutLine(JSON.stringify({ type: "turn.completed" }));
    collector.observeStdoutLine(JSON.stringify({ type: "turn.completed" }));

    expect(() => collector.readLastAgentMessage()).toThrow(/duplicate turn completion/u);
  });

  it("persists the structured-output schema as a supervisor-owned run artifact", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-codex-result-schema-"));
    tempRoots.push(root);
    const bundle = makeRunnerContextBundle({ gitRoot: root, mode: "execute" });
    setRunnerBundleRunDir(bundle, path.join(root, "runs", "run-read-only"));
    bundle.execution.sandbox_policy = {
      requested: "read-only",
      source: "role_default",
      role: "EVALUATOR",
      authority: {
        danger_full_access_authorized: false,
        provenance: null,
        source: null,
      },
    };
    const invocation = await createRunnerAdapter(defaultConfig()).prepare(bundle);

    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Return structured semantic output.\n",
      invocation,
    });

    expect(invocation.output_schema_path).toBeTruthy();
    expect(await readFile(invocation.output_schema_path!, "utf8")).toBe(
      renderCodexResultOutputSchemaJson(),
    );
  });

  it("refuses a transport result bound to another work order", async () => {
    const resultPath = await tempResultPath();

    await expect(
      materializeCodexResultTransport({
        raw_text: JSON.stringify({
          schema_version: 2,
          kind: "agent_semantic_result",
          work_order_id: "another-run",
          status: "completed",
          summary: "Wrong run.",
          findings: [],
          uncertainty: [],
          claimed_checks: [],
          blocker: null,
          knowledge_request: null,
        }),
        result_path: resultPath,
        work_order_id: "run-read-only",
      }),
    ).rejects.toThrow(/work_order_id mismatch/u);
  });

  it("rejects unknown and legacy fields at the semantic-result root", async () => {
    const resultPath = await tempResultPath();

    await expect(
      materializeCodexResultTransport({
        raw_text: JSON.stringify({
          ...validTransportResult("run-read-only"),
          exit_code: 0,
        }),
        result_path: resultPath,
        work_order_id: "run-read-only",
      }),
    ).rejects.toThrow(/root.*unexpected fields: exit_code/u);
  });

  it.each([
    {
      label: "claimed check",
      value: {
        ...validTransportResult("run-read-only"),
        claimed_checks: [
          {
            check: "review",
            claimed_status: "passed",
            details: null,
            observed_status: "passed",
          },
        ],
      },
      expected: /claimed_checks entry.*unexpected fields: observed_status/u,
    },
    {
      label: "blocker",
      value: {
        ...validTransportResult("run-read-only"),
        status: "blocked",
        blocker: {
          summary: "Needs operator action.",
          recommended_action: null,
          evidence_paths: ["/tmp/out.log"],
        },
      },
      expected: /blocker.*unexpected fields: evidence_paths/u,
    },
    {
      label: "knowledge request",
      value: {
        ...validTransportResult("run-read-only"),
        status: "needs_context",
        knowledge_request: {
          query: "Provide the contract.",
          reason: "The contract is required.",
          artifacts: ["contract.md"],
        },
      },
      expected: /knowledge_request.*unexpected fields: artifacts/u,
    },
  ])("rejects unknown fields inside a $label object", async ({ value, expected }) => {
    const resultPath = await tempResultPath();

    await expect(
      materializeCodexResultTransport({
        raw_text: JSON.stringify(value),
        result_path: resultPath,
        work_order_id: "run-read-only",
      }),
    ).rejects.toThrow(expected);
  });
});
