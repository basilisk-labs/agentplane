import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { CommandContext } from "../shared/task-backend.js";
import { cmdContextDoctor } from "./doctor.js";
import { cmdContextInit } from "./init.js";
import { cmdContextWikiReport } from "./wiki-reports.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-cross-surface-"));
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

async function initMaximum(root: string): Promise<void> {
  vi.spyOn(process.stdout, "write").mockImplementation(() => true);
  await cmdContextInit({
    ctx: { resolvedProject: { gitRoot: root } } as CommandContext,
    cwd: root,
    parsed: {
      profile: "maximum-assimilation",
      rawGitignore: "none",
      derivedGitignore: "none",
      repair: false,
      force: false,
    },
  });
}

function wikiPage(id: string, graphEntity = ""): string {
  return [
    "---",
    "agentplane_context:",
    "  schema_version: 1",
    "  artifact_type: wiki_page",
    `  canonical_id: "wiki.${id}"`,
    `  title: "${id}"`,
    "  modality: definition",
    "  epistemic_status: sourced_claim",
    "  source_refs: []",
    "  graph_refs:",
    `    entities: ${graphEntity ? `["${graphEntity}"]` : "[]"}`,
    "    edges: []",
    "---",
    "",
    `# ${id}`,
    "",
    "Body.",
    "",
    "## Sources",
    "",
    "- no-source: test fixture",
    "",
  ].join("\n");
}

describe("context cross-surface integrity", () => {
  it("ignores hidden vault and raw archive directories", async () => {
    const root = await tempRoot();
    await initMaximum(root);
    await write(root, "context/wiki/.obsidian/plugins/local.md", "not a wiki page");
    await write(root, "context/raw/.archive/legacy.md", "# Archived\n");

    await expect(
      cmdContextDoctor({ cwd: root, parsed: { fix: false, label: "check" } }),
    ).resolves.toBe(0);
  });

  it("rejects raw files missing from the manifest and unresolved wiki graph refs", async () => {
    const root = await tempRoot();
    await initMaximum(root);
    await write(root, "context/raw/untracked.md", "# Untracked\n");
    await write(root, "context/wiki/unresolved.md", wikiPage("unresolved", "entity.missing"));

    await expect(
      cmdContextDoctor({ cwd: root, parsed: { fix: false, label: "check" } }),
    ).rejects.toThrow(
      /raw source missing from manifest lock[\s\S]*wiki graph entity ref does not resolve|wiki graph entity ref does not resolve[\s\S]*raw source missing from manifest lock/u,
    );
  });

  it("requires page policy for active maximum-assimilation entities", async () => {
    const root = await tempRoot();
    await initMaximum(root);
    await write(
      root,
      ".agentplane/context/derived/graph/entities.jsonl",
      `${JSON.stringify({ id: "entity.unpaged", kind: "concept", status: "active" })}\n`,
    );

    await expect(
      cmdContextDoctor({ cwd: root, parsed: { fix: false, label: "check" } }),
    ).rejects.toThrow(/active graph entity requires target_path or no_page_reason/u);
  });

  it("reports invalid wiki YAML as a validation issue instead of an internal error", async () => {
    const root = await tempRoot();
    await initMaximum(root);
    await write(
      root,
      "context/wiki/reports/index.md",
      "---\nagentplane_context:\n  source_refs: [\n---\n\n# Reports\n",
    );

    await expect(
      cmdContextDoctor({ cwd: root, parsed: { fix: false, label: "check" } }),
    ).rejects.toThrow(/context check failed.*invalid wiki frontmatter YAML/isu);
  });

  it("detects connectivity reports that became stale after wiki changes", async () => {
    const root = await tempRoot();
    await initMaximum(root);
    for (const id of ["alpha", "beta", "gamma"]) {
      await write(root, `context/wiki/entities/${id}.md`, wikiPage(id));
    }
    await cmdContextWikiReport({ cwd: root, parsed: { path: "context/wiki" } });
    const reportState = JSON.parse(
      await readFile(path.join(root, ".agentplane/context/derived/wiki/report-state.json"), "utf8"),
    ) as { source_digest: string };
    expect(reportState.source_digest).toMatch(/^sha256:/u);

    await write(root, "context/wiki/entities/alpha.md", wikiPage("alpha-updated"));
    await expect(
      cmdContextDoctor({ cwd: root, parsed: { fix: false, label: "check" } }),
    ).rejects.toThrow(/wiki connectivity reports are stale/u);
  });
});
