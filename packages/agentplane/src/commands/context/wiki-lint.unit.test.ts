import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { cmdContextWikiLint } from "./wiki.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-wiki-lint-"));
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

describe("context wiki lint", () => {
  it("lints CRLF wiki frontmatter and rejects missing lint targets", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/decisions/crlf-page.md",
      [
        "---",
        "agentplane_context:",
        "  schema_version: 1",
        "  artifact_type: wiki_page",
        '  canonical_id: "wiki.decisions-crlf-page"',
        '  title: "CRLF Page"',
        "  modality: decision",
        "  epistemic_status: sourced_claim",
        "  source_refs: []",
        "---",
        "",
        "# CRLF Page",
        "",
        "## Source References",
        "",
        "- no-source: local test fixture",
        "",
      ].join("\r\n"),
    );
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextWikiLint({
      cwd: root,
      parsed: { path: "context/wiki/decisions/crlf-page.md" },
    });
    await expect(
      cmdContextWikiLint({
        cwd: root,
        parsed: { path: "context/wiki/decisions/missing-page.md" },
      }),
    ).rejects.toThrow(/wiki lint target does not exist/u);

    expect(out.mock.calls.map((call) => String(call[0])).join("")).toContain(
      "context wiki lint: ok (1 page(s))",
    );
  });

  it("requires AgentPlane frontmatter on initialized navigation files", async () => {
    const root = await tempRoot();
    await write(root, "context/wiki/AGENTS.md", "# Wiki Policy\n");
    await write(root, "context/wiki/index.md", "# Project Wiki\n");

    await expect(
      cmdContextWikiLint({
        cwd: root,
        parsed: { path: "context/wiki" },
      }),
    ).rejects.toThrow(/missing YAML frontmatter/u);
  });
});
