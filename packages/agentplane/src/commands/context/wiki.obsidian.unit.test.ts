import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { cmdContextWikiLint, cmdContextWikiNew } from "./wiki.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-wiki-obsidian-"));
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

function wikiPage(opts: { title: string; body: string }): string {
  return [
    "---",
    "aliases:",
    `  - "${opts.title}"`,
    "tags:",
    "  - agentplane/context",
    "cssclasses:",
    "  - agentplane-context",
    "agentplane_context:",
    "  schema_version: 1",
    "  artifact_type: wiki_page",
    '  canonical_id: "wiki.test-page"',
    `  title: "${opts.title}"`,
    "  modality: decision",
    "  epistemic_status: sourced_claim",
    "  source_refs:",
    '    - path: "context/raw/specs/payment-api.md"',
    '      ref: "context/raw/specs/payment-api.md"',
    '      label: "context/raw/specs/payment-api.md"',
    "---",
    "",
    `# ${opts.title}`,
    "",
    opts.body,
    "",
    "## Sources",
    "",
    "1. [context/raw/specs/payment-api.md](context/raw/specs/payment-api.md)",
    "",
  ].join("\n");
}

describe("context wiki Obsidian compatibility", () => {
  it("creates pages with Obsidian properties and numeric source notes", async () => {
    const root = await tempRoot();

    await cmdContextWikiNew({
      cwd: root,
      parsed: {
        page: "decisions/context-claims",
        title: "Context Claims",
        modality: "decision",
        status: "reviewed_claim",
        visibility: "project",
        source: [".agentplane/tasks/202605130501-CTX001/README.md"],
        force: false,
      },
    });

    const pageText = await readFile(
      path.join(root, "context/wiki/decisions/context-claims.md"),
      "utf8",
    );
    expect(pageText).toContain("aliases:");
    expect(pageText).toContain("tags:");
    expect(pageText).toContain("cssclasses:");
    expect(pageText).toContain("## Sources");
    expect(pageText).toContain("1. [.agentplane/tasks/202605130501-CTX001/README.md]");
  });

  it("rejects wikilinks whose target case differs from canonical page title", async () => {
    const root = await tempRoot();
    await cmdContextWikiNew({
      cwd: root,
      parsed: {
        page: "modules/payment-api",
        title: "Payment API",
        modality: "definition",
        status: "reviewed_claim",
        visibility: "project",
        source: ["context/raw/specs/payment-api.md"],
        force: false,
      },
    });
    await write(
      root,
      "context/wiki/decisions/payment-contract.md",
      wikiPage({ title: "Payment Contract", body: "See [[payment api]] for details [1]." }),
    );

    await expect(
      cmdContextWikiLint({
        cwd: root,
        parsed: { path: "context/wiki" },
      }),
    ).rejects.toThrow(/\[\[payment api\]\] -> \[\[modules\/payment-api\]\]/u);

    await write(
      root,
      "context/wiki/decisions/payment-contract.md",
      wikiPage({ title: "Payment Contract", body: "See [[Payment API]] for details [1]." }),
    );
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextWikiLint({
      cwd: root,
      parsed: { path: "context/wiki" },
    });

    expect(out.mock.calls.map((call) => String(call[0])).join("")).toContain(
      "context wiki lint: ok (2 page(s))",
    );
  });

  it("accepts index-page wikilinks and flow-style aliases", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/concepts/index.md",
      [
        "---",
        'aliases: ["Concept Hub"]',
        "agentplane_context:",
        "  schema_version: 1",
        "  artifact_type: wiki_page",
        '  canonical_id: "wiki.concepts"',
        '  title: "Concepts"',
        "  modality: definition",
        "  epistemic_status: sourced_claim",
        "  source_refs: []",
        "---",
        "",
        "# Concepts",
        "",
        "## Sources",
        "",
        "- no-source: local test fixture",
        "",
      ].join("\n"),
    );
    await write(
      root,
      "context/wiki/overview.md",
      wikiPage({
        title: "Overview",
        body: "See [[concepts/index]] and [[Concept Hub]] for concepts [1].",
      }),
    );
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextWikiLint({
      cwd: root,
      parsed: { path: "context/wiki" },
    });

    expect(out.mock.calls.map((call) => String(call[0])).join("")).toContain(
      "context wiki lint: ok (2 page(s))",
    );
  });
});
