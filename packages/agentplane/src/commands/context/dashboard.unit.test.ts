import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { buildContextDashboardSnapshot, cmdContextDashboard } from "./dashboard.js";
import { cmdContextReindex } from "./reindex.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-dashboard-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  vi.restoreAllMocks();
  for (const root of tempRoots) {
    await rm(root, { recursive: true, force: true });
  }
  tempRoots = [];
});

async function write(root: string, rel: string, text: string): Promise<void> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

function wikiPage(opts: {
  id: string;
  title: string;
  sourceRefs?: string[];
  graphEntities?: string[];
  claims?: string[];
  body?: string;
}): string {
  return [
    "---",
    `aliases: ["${opts.title}"]`,
    "agentplane_context:",
    "  schema_version: 1",
    "  artifact_type: wiki_page",
    `  canonical_id: "${opts.id}"`,
    `  title: "${opts.title}"`,
    "  modality: definition",
    "  epistemic_status: sourced_claim",
    "  visibility: project",
    "  source_refs:",
    ...(opts.sourceRefs ?? []).map((ref) => `    - "${ref}"`),
    "  claims:",
    ...(opts.claims ?? []).map(
      (claim, index) => `    - id: "${opts.id}.claim.${index + 1}"\n      summary: "${claim}"`,
    ),
    "  graph_refs:",
    "    entities:",
    ...(opts.graphEntities ?? []).map((entity) => `      - "${entity}"`),
    "    edges: []",
    "  conflicts: []",
    "  updated_by: CURATOR",
    "---",
    "",
    `# ${opts.title}`,
    "",
    opts.body ?? "",
    "",
  ].join("\n");
}

describe("context dashboard graph snapshot", () => {
  it("builds a typed knowledge graph across wiki, entities, claims, sources, and tasks", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/a.md", "# Alpha\n\nSource text.\n");
    await write(root, ".agentplane/tasks/202606010000-ALPHA/README.md", "# Task\n");
    await write(
      root,
      "context/wiki/index.md",
      wikiPage({
        id: "wiki.index",
        title: "Index",
        sourceRefs: ["context/raw/a.md#lines=1-2"],
        graphEntities: ["product.alpha"],
        claims: ["Index describes Alpha."],
        body: "See [[Alpha]] and [raw](../raw/a.md).",
      }),
    );
    await write(
      root,
      "context/wiki/alpha.md",
      wikiPage({
        id: "wiki.alpha",
        title: "Alpha",
        sourceRefs: [".agentplane/tasks/202606010000-ALPHA/README.md"],
        graphEntities: ["product.alpha"],
        body: "Alpha details.",
      }),
    );
    await write(
      root,
      ".agentplane/context/derived/graph/entities.jsonl",
      JSON.stringify({ id: "product.alpha", kind: "concept", label: "Alpha Product" }) + "\n",
    );
    await write(
      root,
      ".agentplane/context/derived/graph/edges.jsonl",
      JSON.stringify({
        id: "edge.alpha.self",
        from: "product.alpha",
        to: "product.alpha",
        relation: "related_to",
      }) + "\n",
    );
    await write(
      root,
      ".agentplane/context/derived/graph/provenance_edges.jsonl",
      JSON.stringify({ source: "context/raw/a.md#lines=1-2", target: "product.alpha" }) + "\n",
    );
    await write(
      root,
      ".agentplane/context/derived/facts/facts.jsonl",
      JSON.stringify({
        id: "fact.alpha",
        summary: "Alpha has source text.",
        source_refs: ["context/raw/a.md#lines=1-2"],
      }) + "\n",
    );
    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: true, includeRaw: true, reset: true },
    });

    const snapshot = await buildContextDashboardSnapshot(root);

    expect(snapshot.projection.available).toBe(true);
    expect(snapshot.projection.rows).toBeGreaterThan(0);
    expect(snapshot.nodes.map((node) => node.id)).toEqual(
      expect.arrayContaining([
        "wiki.index",
        "wiki.alpha",
        "entity:product.alpha",
        "claim:fact.alpha",
        "source:context/raw/a.md",
        "task:202606010000-ALPHA",
      ]),
    );
    expect(snapshot.edges.map((edge) => edge.type)).toEqual(
      expect.arrayContaining([
        "wikilink",
        "source_ref",
        "graph_ref",
        "entity_relation",
        "provenance",
      ]),
    );
    expect(snapshot.metrics.wiki_pages).toBe(2);
    expect(snapshot.metrics.broken_wikilinks).toBe(0);
  });

  it("handles a large wiki map without requiring entity rows", async () => {
    const root = await tempRoot();
    const total = 300;
    for (let index = 0; index < total; index += 1) {
      const current = `page-${index}`;
      const next = `page-${(index + 1) % total}`;
      await write(
        root,
        `context/wiki/${current}.md`,
        wikiPage({
          id: `wiki.${current}`,
          title: `Page ${index}`,
          sourceRefs: [`context/raw/source-${index}.md`],
          body: `Next [[${next}|Page ${(index + 1) % total}]].`,
        }),
      );
    }

    const snapshot = await buildContextDashboardSnapshot(root);

    expect(snapshot.metrics.wiki_pages).toBe(total);
    expect(snapshot.metrics.broken_wikilinks).toBe(0);
    expect(snapshot.metrics.largest_component).toBeGreaterThanOrEqual(total);
  });

  it("prints a JSON snapshot without starting the HTTP server", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/index.md",
      wikiPage({ id: "wiki.index", title: "Index", body: "Empty starter." }),
    );
    const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await expect(
      cmdContextDashboard({
        cwd: root,
        parsed: { host: "127.0.0.1", port: "0", open: false, dumpJson: true },
      }),
    ).resolves.toBe(0);

    expect(stdout.mock.calls.map((call) => String(call[0])).join("")).toContain('"wiki_pages": 1');
  });
});
