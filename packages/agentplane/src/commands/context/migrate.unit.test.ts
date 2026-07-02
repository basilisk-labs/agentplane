import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { cmdContextMigrate } from "./migrate.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-migrate-"));
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

function row(value: Record<string, unknown>): string {
  return `${JSON.stringify(value)}\n`;
}

describe("context migrate maximum-assimilation-v2", () => {
  it("previews writes in dry-run mode without changing files", async () => {
    const root = await tempRoot();
    await write(root, "context/wiki/entities/payment-api.md", "# Payment API\n");
    await write(
      root,
      ".agentplane/context/derived/graph/entities.jsonl",
      row({ id: "entity.payment_api", kind: "concept", label: "Payment API" }),
    );
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextMigrate({
      cwd: root,
      parsed: { target: "maximum-assimilation-v2", dryRun: true },
    });

    const stdout = out.mock.calls.map((call) => String(call[0])).join("");
    expect(stdout).toContain("context migrate maximum-assimilation-v2: dry-run");
    expect(stdout).toContain("would write:");
    expect(stdout).toContain(".agentplane/context/derived/wiki/topology.plan.json");
    await expect(
      stat(path.join(root, ".agentplane/context/derived/wiki/topology.plan.json")),
    ).rejects.toThrow();
    await expect(
      stat(path.join(root, ".agentplane/context/derived/ontology/entity-resolution.jsonl")),
    ).rejects.toThrow();
  });

  it("preserves wiki, facts, and graph while creating missing v2 migration artifacts", async () => {
    const root = await tempRoot();
    const wikiText = "# Payment API\n\nLegacy page.\n";
    const factsText = row({
      id: "fact.payment_api.retry",
      summary: "Payment API retry policy exists.",
    });
    const graphText = row({
      id: "entity.payment_api",
      kind: "concept",
      label: "Payment API",
    });
    await write(root, "context/wiki/entities/payment-api.md", wikiText);
    await write(root, ".agentplane/context/derived/facts/facts.jsonl", factsText);
    await write(root, ".agentplane/context/derived/graph/entities.jsonl", graphText);
    await write(
      root,
      ".agentplane/context/derived/graph/edges.jsonl",
      row({
        id: "edge.payment_api.mentions.retry",
        from: "entity.payment_api",
        to: "entity.retry_policy",
        relation: "mentions",
      }),
    );
    vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextMigrate({
      cwd: root,
      parsed: { target: "maximum-assimilation-v2", dryRun: false },
    });

    expect(await readFile(path.join(root, "context/wiki/entities/payment-api.md"), "utf8")).toBe(
      wikiText,
    );
    expect(
      await readFile(path.join(root, ".agentplane/context/derived/facts/facts.jsonl"), "utf8"),
    ).toBe(factsText);
    expect(
      await readFile(path.join(root, ".agentplane/context/derived/graph/entities.jsonl"), "utf8"),
    ).toBe(graphText);
    const topology = JSON.parse(
      await readFile(
        path.join(root, ".agentplane/context/derived/wiki/topology.plan.json"),
        "utf8",
      ),
    ) as { mode?: string; canonical_page_families?: { family_id?: string }[] };
    expect(topology.mode).toBe("maximum_assimilation");
    expect(topology.canonical_page_families?.[0]?.family_id).toBe("family.entities");
    expect(
      await readFile(
        path.join(root, ".agentplane/context/derived/ontology/page-creation.jsonl"),
        "utf8",
      ),
    ).toContain("context/wiki/entities/payment-api.md");
    expect(
      await readFile(
        path.join(root, ".agentplane/context/derived/wiki/page-manifests.jsonl"),
        "utf8",
      ),
    ).toContain("context/wiki/entities/payment-api.md");
    expect(
      await readFile(
        path.join(root, ".agentplane/context/derived/ontology/entity-resolution.jsonl"),
        "utf8",
      ),
    ).toContain("entity.payment_api");
  });

  it("does not overwrite an existing topology plan and appends only missing rows", async () => {
    const root = await tempRoot();
    const existingTopology = {
      schema_version: 1,
      mode: "maximum_assimilation",
      source_shape: {
        primary: "existing",
        rationale: "Existing topology must remain untouched.",
        evidence_span_ids: ["existing.span"],
      },
      canonical_page_families: [
        {
          family_id: "family.existing",
          path_template: "context/wiki/entities/{slug}.md",
          page_type: "entity",
          source_evidence_span_ids: ["existing.span"],
        },
      ],
    };
    await write(root, "context/wiki/entities/payment-api.md", "# Payment API\n");
    await write(
      root,
      ".agentplane/context/derived/wiki/topology.plan.json",
      `${JSON.stringify(existingTopology, null, 2)}\n`,
    );
    await write(
      root,
      ".agentplane/context/derived/ontology/page-creation.jsonl",
      row({
        id: "page.existing",
        path: "context/wiki/entities/payment-api.md",
        page_type: "entity",
        family_id: "family.existing",
        source_refs: [{ path: "context/wiki/entities/payment-api.md" }],
        span_refs: ["existing.span"],
      }),
    );
    vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextMigrate({
      cwd: root,
      parsed: { target: "maximum-assimilation-v2", dryRun: false },
    });

    const topologyAfter = await readFile(
      path.join(root, ".agentplane/context/derived/wiki/topology.plan.json"),
      "utf8",
    );
    expect(JSON.parse(topologyAfter)).toEqual(existingTopology);
    const pageCreation = await readFile(
      path.join(root, ".agentplane/context/derived/ontology/page-creation.jsonl"),
      "utf8",
    );
    const pageRows = pageCreation
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as { path?: string });
    expect(
      pageRows.filter((row) => row.path === "context/wiki/entities/payment-api.md"),
    ).toHaveLength(1);
  });
});
