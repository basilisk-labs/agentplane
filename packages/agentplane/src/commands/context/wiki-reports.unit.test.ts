import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { cmdContextWikiReport } from "./wiki-reports.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-wiki-report-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  vi.restoreAllMocks();
  for (const root of tempRoots) await rm(root, { recursive: true, force: true });
  tempRoots = [];
});

async function write(root: string, rel: string, text: string): Promise<void> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

function wikiPage(title: string, body: string): string {
  return [
    "---",
    `aliases: ["${title}"]`,
    "agentplane_context:",
    "  schema_version: 1",
    "  artifact_type: wiki_page",
    `  canonical_id: "wiki.${title.toLowerCase().replaceAll(" ", "-")}"`,
    `  title: "${title}"`,
    "  modality: definition",
    "  epistemic_status: sourced_claim",
    "  source_refs: []",
    "---",
    "",
    `# ${title}`,
    "",
    body,
    "",
    "## Sources",
    "",
    "- no-source: local test fixture",
    "",
  ].join("\n");
}

describe("context wiki report", () => {
  it("writes link index, orphan report, required report pages, and evaluator review", async () => {
    const root = await tempRoot();
    await write(root, "context/wiki/index.md", wikiPage("Index", "See [[Payment API]]."));
    await write(
      root,
      "context/wiki/entities/payment-api.md",
      wikiPage("Payment API", "Payment API."),
    );
    await write(root, "context/wiki/entities/orphan.md", wikiPage("Orphan", "No inbound links."));
    await write(
      root,
      ".agentplane/context/derived/claims/open_questions.jsonl",
      JSON.stringify({ id: "question.payment", summary: "Confirm retry scope." }) + "\n",
    );
    await write(
      root,
      ".agentplane/context/derived/reports/evaluator.jsonl",
      JSON.stringify({
        schema_version: 1,
        scenario_id: "scenario.payment_api_recall",
        summary: "Future agent can update Payment API context.",
        entrypoints: ["context/wiki/entities/payment-api.md"],
        verdict: "pass",
        evidence_refs: [".agentplane/context/derived/graph/entities.jsonl"],
        raw_deletion_resilience: "pass",
      }) + "\n",
    );
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextWikiReport({ cwd: root, parsed: { path: "context/wiki" } });

    const stdout = out.mock.calls.map((call) => String(call[0])).join("");
    expect(stdout).toContain("context wiki report: updated");
    const linkIndex = await readFile(
      path.join(root, ".agentplane/context/derived/wiki/link-index.jsonl"),
      "utf8",
    );
    expect(linkIndex).toContain('"target_path":"context/wiki/entities/payment-api.md"');
    const orphanReport = await readFile(
      path.join(root, ".agentplane/context/derived/wiki/orphan-report.jsonl"),
      "utf8",
    );
    expect(orphanReport).toContain("context/wiki/entities/orphan.md");
    const evaluatorReview = await readFile(
      path.join(root, "context/wiki/reports/evaluator-review.md"),
      "utf8",
    );
    expect(evaluatorReview).toContain("Verdict: pass");
    expect(evaluatorReview).toContain("Scenario coverage: scenario.payment_api_recall");
    expect(
      await readFile(path.join(root, "context/wiki/reports/open-questions.md"), "utf8"),
    ).toContain("question.payment");
  });

  it("honors the requested wiki report path", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/entities/payment-api.md",
      wikiPage("Payment API", "See [[Shared Term]]."),
    );
    await write(root, "context/wiki/entities/shared-term.md", wikiPage("Shared Term", "Shared."));
    await write(root, "context/wiki/other/noise.md", wikiPage("Noise", "See [[Payment API]]."));
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextWikiReport({ cwd: root, parsed: { path: "context/wiki/entities" } });

    out.mockRestore();
    const linkIndex = await readFile(
      path.join(root, ".agentplane/context/derived/wiki/link-index.jsonl"),
      "utf8",
    );
    expect(linkIndex).toContain('"source_path":"context/wiki/entities/payment-api.md"');
    expect(linkIndex).not.toContain('"source_path":"context/wiki/other/noise.md"');
    await expect(
      cmdContextWikiReport({ cwd: root, parsed: { path: "context/wiki/missing" } }),
    ).rejects.toThrow(/wiki report target does not exist/u);
  });

  it("does not count report-page links as inbound links for orphan rows", async () => {
    const root = await tempRoot();
    await write(root, "context/wiki/entities/report-only.md", wikiPage("Report Only", "Body."));
    await write(
      root,
      "context/wiki/reports/open-questions.md",
      wikiPage("Open Questions", "Follow up on [[Report Only]]."),
    );
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextWikiReport({ cwd: root, parsed: { path: "context/wiki" } });

    out.mockRestore();
    const orphanReport = await readFile(
      path.join(root, ".agentplane/context/derived/wiki/orphan-report.jsonl"),
      "utf8",
    );
    expect(orphanReport).toContain("context/wiki/entities/report-only.md");
  });
});
