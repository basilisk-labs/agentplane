import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { captureStdIO } from "@agentplane/testkit";
import { afterEach, describe, expect, it, vi } from "vitest";

import { runContextIngest } from "../../context/ingest.js";
import { inspectContextHealth } from "../../context/doctor.js";
import { runContextReindex } from "../../context/reindex.js";
import type { CommandContext } from "../shared/task-backend.js";

import { makeRunContextLearnFilesHandler } from "./context-runner.js";
import { summarizeContextGraph } from "./graph.js";
import { searchContext } from "./search.js";
import { showContext } from "./show.js";
import { createContextWikiPage } from "./wiki.js";
import { generateContextWikiReport } from "./wiki-reports.js";

const tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-results-"));
  tempRoots.push(root);
  return root;
}

async function write(root: string, relative: string, text: string): Promise<void> {
  const target = path.join(root, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

afterEach(async () => {
  await Promise.all(tempRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("typed context command results", () => {
  it("returns structured results without using stdout as an orchestration channel", async () => {
    const root = await tempRoot();
    await write(root, "context/wiki/reference.md", "# Reference\n\nsemantic marker\n");
    await write(root, "context/raw/source.md", "# Source\n\nraw semantic marker\n");
    const io = captureStdIO();

    try {
      const reindex = await runContextReindex({
        cwd: root,
        parsed: { includeTasks: false, includeRaw: true, reset: false },
      });
      const search = await searchContext({
        cwd: root,
        parsed: {
          query: "semantic marker",
          scope: "wiki,raw",
          format: "json",
          explain: false,
        },
      });
      const show = await showContext({
        cwd: root,
        parsed: { ref: "context/wiki/reference.md#lines=1-2" },
      });
      const wiki = await createContextWikiPage({
        cwd: root,
        parsed: {
          page: "decisions/typed-boundary",
          title: "Typed Boundary",
          modality: "decision",
          status: "sourced_claim",
          visibility: "project",
          source: ["context/raw/source.md"],
          force: false,
        },
      });
      const wikiReport = await generateContextWikiReport({
        cwd: root,
        parsed: { path: "context/wiki" },
      });
      const graph = await summarizeContextGraph({ cwd: root, parsed: {} });
      const health = await inspectContextHealth({
        cwd: root,
        parsed: { fix: false, label: "doctor" },
      });
      const ingest = await runContextIngest({
        ctx: { resolvedProject: { gitRoot: root } } as CommandContext,
        cwd: root,
        parsed: {
          sources: ["context/raw/source.md"],
          mode: "sources",
          dryRun: true,
          indexOnly: false,
        },
      });

      expect(reindex.receipt.rows).toBeGreaterThan(0);
      expect(search.payload.results.some((result) => result.ref.includes("reference.md"))).toBe(
        true,
      );
      expect(show).toMatchObject({ selection: "lines", ref: "context/wiki/reference.md" });
      expect(wiki.path).toBe("context/wiki/decisions/typed-boundary.md");
      expect(wikiReport.changed).toContain("context/wiki/reports/coverage.md");
      expect(graph).toEqual({ entities: 0, edges: 0, provenance: 0 });
      expect(health).toMatchObject({ label: "doctor", fix: false });
      expect(health.issues.length).toBeGreaterThan(0);
      expect(ingest).toMatchObject({ kind: "dry_run", mode: "sources", source_hints: 1 });
      expect(io.stdout).toBe("");
      expect(io.stderr).toBe("");
    } finally {
      io.restore();
    }
  });

  it("reuses one session-owned command context for context learning", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/source.md", "# Source\n\nsession-owned context\n");
    const command = { resolvedProject: { gitRoot: root } } as CommandContext;
    const getCommandContext = vi.fn(() => Promise.resolve(command));
    const handler = makeRunContextLearnFilesHandler({ getCommandContext });
    const io = captureStdIO();

    try {
      await handler(
        { cwd: root, rootOverride: undefined },
        { sources: ["context/raw/source.md"], dryRun: true },
      );
      expect(getCommandContext).toHaveBeenCalledOnce();
      expect(getCommandContext).toHaveBeenCalledWith(
        { cwd: root, rootOverride: undefined },
        "context learn files",
      );
      expect(io.stdout).toContain("context ingest dry-run (sources)");
    } finally {
      io.restore();
    }
  });
});
