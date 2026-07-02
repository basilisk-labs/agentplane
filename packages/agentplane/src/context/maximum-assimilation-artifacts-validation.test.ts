import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { validateMaximumAssimilationArtifacts } from "./maximum-assimilation-artifacts-validation.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-max-artifacts-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  for (const root of tempRoots) await rm(root, { recursive: true, force: true });
  tempRoots = [];
});

async function write(root: string, rel: string, text: string): Promise<void> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

async function writeMinimalReadableArtifacts(root: string): Promise<void> {
  await write(
    root,
    "context/wiki/glossary.md",
    "# Glossary\n\n- [[Payment API]]\nsource_refs: x\n",
  );
  await write(
    root,
    "context/wiki/reports/topology.md",
    "source_shape: product_docs\ncanonical_families: entities\npage_vs_heading: pages\nsource_refs: x\n",
  );
  await write(
    root,
    "context/wiki/reports/coverage.md",
    "coverage: covered; omitted; redacted; duplicate; unresolved; conflict; out_of_scope; source_refs: x\n",
  );
  await write(
    root,
    "context/wiki/reports/conflicts.md",
    "Conflict ID: none. conflicting claim IDs: none. source_refs: x. status: none. required human decision: none.\n",
  );
  await write(
    root,
    "context/wiki/reports/open-questions.md",
    "Unresolved entity identities: none. unresolved coverage spans: none. possibly_same_as candidates: none. topology uncertainties: none. source_refs: x.\n",
  );
  await write(
    root,
    "context/wiki/reports/evaluator-review.md",
    "Verdict: pass. Scenario coverage: scenario.test. Failures: none. Raw-deletion resilience assessment: pass. source_refs: x.\n",
  );
  await write(
    root,
    ".agentplane/context/derived/graph/entities.jsonl",
    JSON.stringify({
      id: "entity.payment_api",
      source_refs: ["context/raw/specs/payment-api.md#lines=1-3"],
    }) + "\n",
  );
  await write(
    root,
    ".agentplane/context/derived/graph/edges.jsonl",
    JSON.stringify({
      id: "edge.payment_api.workflow",
      source_refs: ["context/raw/specs/payment-api.md#lines=1-3"],
    }) + "\n",
  );
  await write(root, ".agentplane/context/derived/wiki/link-index.jsonl", "");
  await write(root, ".agentplane/context/derived/wiki/orphan-report.jsonl", "");
  await write(
    root,
    ".agentplane/context/derived/reports/evaluator.jsonl",
    JSON.stringify({
      schema_version: 1,
      scenario_id: "scenario.payment_api_recall",
      summary: "Future agent can update Payment API context from wiki and derived rows.",
      entrypoints: ["context/wiki/entities/payment-api.md"],
      expected_findings: ["entity.payment_api"],
      verdict: "pass",
      evidence_refs: [".agentplane/context/derived/graph/entities.jsonl"],
      raw_deletion_resilience: "pass",
    }) + "\n",
  );
}

describe("maximum-assimilation artifact validation", () => {
  it("rejects regex-only topology prose without a structured topology plan", async () => {
    const root = await tempRoot();
    await writeMinimalReadableArtifacts(root);

    const errors = await validateMaximumAssimilationArtifacts({ root, changedPaths: [] });

    expect(errors).toContain(
      ".agentplane/context/derived/wiki/topology.plan.json: maximum-assimilation requires a structured topology plan",
    );
  });

  it("rejects changed wiki pages outside declared topology page families", async () => {
    const root = await tempRoot();
    await writeMinimalReadableArtifacts(root);
    await write(
      root,
      ".agentplane/context/derived/wiki/topology.plan.json",
      JSON.stringify({
        schema_version: 1,
        mode: "maximum_assimilation",
        topology_version: 1,
        source_shape: {
          primary: "product_docs",
          rationale: "Payment API source is product documentation.",
          evidence_span_ids: ["span.payment-api.0001"],
        },
        canonical_page_families: [
          {
            family_id: "family.entities",
            path_template: "context/wiki/entities/{slug}.md",
            page_type: "concept",
            creation_rule: "Create pages for reusable entities.",
            page_vs_heading_rule: "Use headings for local details.",
            source_evidence_span_ids: ["span.payment-api.0001"],
          },
        ],
      }) + "\n",
    );

    const errors = await validateMaximumAssimilationArtifacts({
      root,
      changedPaths: ["context/wiki/foo/payment-api.md"],
    });

    expect(errors).toContain(
      "context/wiki/foo/payment-api.md: wiki page is not covered by topology plan page families",
    );
  });

  it("does not treat sibling path prefixes as declared topology page families", async () => {
    const root = await tempRoot();
    await writeMinimalReadableArtifacts(root);
    await write(
      root,
      ".agentplane/context/derived/wiki/topology.plan.json",
      JSON.stringify({
        schema_version: 1,
        mode: "maximum_assimilation",
        source_shape: {
          primary: "product_docs",
          rationale: "Payment API source is product documentation.",
          evidence_span_ids: ["span.payment-api.0001"],
        },
        canonical_page_families: [
          {
            family_id: "family.entities",
            path_template: "context/wiki/entities/{slug}.md",
            page_type: "concept",
            source_evidence_span_ids: ["span.payment-api.0001"],
          },
        ],
      }) + "\n",
    );

    const errors = await validateMaximumAssimilationArtifacts({
      root,
      changedPaths: ["context/wiki/entities-extra/payment-api.md"],
    });

    expect(errors).toContain(
      "context/wiki/entities-extra/payment-api.md: wiki page is not covered by topology plan page families",
    );
  });

  it("requires evaluator scenarios to use wiki or derived entrypoints", async () => {
    const root = await tempRoot();
    await writeMinimalReadableArtifacts(root);
    await write(
      root,
      ".agentplane/context/derived/wiki/topology.plan.json",
      JSON.stringify({
        schema_version: 1,
        mode: "maximum_assimilation",
        source_shape: {
          primary: "product_docs",
          rationale: "Payment API source is product documentation.",
          evidence_span_ids: ["span.payment-api.0001"],
        },
        canonical_page_families: [
          {
            family_id: "family.entities",
            path_template: "context/wiki/entities/{slug}.md",
            page_type: "concept",
            source_evidence_span_ids: ["span.payment-api.0001"],
          },
        ],
      }) + "\n",
    );
    await write(
      root,
      ".agentplane/context/derived/reports/evaluator.jsonl",
      JSON.stringify({
        schema_version: 1,
        scenario_id: "scenario.raw_only",
        summary: "Raw-only scenario.",
        entrypoints: ["context/raw/specs/payment-api.md"],
        verdict: "pass",
        evidence_refs: ["context/raw/specs/payment-api.md"],
      }) + "\n",
    );

    const errors = await validateMaximumAssimilationArtifacts({ root, changedPaths: [] });

    expect(errors).toContain(
      ".agentplane/context/derived/reports/evaluator.jsonl#scenario.raw_only: scenario must use wiki or derived entrypoints, not raw-only",
    );
  });
});
