/* eslint-disable @typescript-eslint/require-await */
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { CommandContext } from "../shared/task-backend.js";
import { cmdContextDoctor } from "./doctor.js";
import { cmdContextIngest } from "./ingest.js";
import { cmdContextInit } from "./init.js";
import { cmdContextReindex } from "./reindex.js";
import { cmdContextSearch } from "./search.js";
import { cmdContextVerifyTask } from "./verify-task.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-issue-gates-"));
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

describe("context GitHub issue regression gates", () => {
  it("preserves prior raw sources when ingesting explicit sources sequentially", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/a.md", "# A\n\nAlpha.\n");
    await write(root, "context/raw/b.md", "# B\n\nBeta.\n");
    vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const tasks: { id: string; owner: string; doc_updated_at: string }[] = [];
    let counter = 0;
    const createTask = vi.fn(async () => {
      counter += 1;
      tasks.push({
        id: `202605210000-CTX${counter}`,
        owner: "CURATOR",
        doc_updated_at: `2026-05-21T00:00:0${counter}.000Z`,
      });
    });
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: { listTasks: async () => [...tasks] },
      backendId: "local",
      backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
      memo: {},
    } as unknown as CommandContext;

    await cmdContextIngest({
      ctx,
      cwd: root,
      parsed: { sources: ["context/raw/a.md"], mode: "sources", dryRun: false, indexOnly: false },
      createTask,
    });
    await cmdContextIngest({
      ctx,
      cwd: root,
      parsed: { sources: ["context/raw/b.md"], mode: "sources", dryRun: false, indexOnly: false },
      createTask,
    });

    const lock = JSON.parse(
      await readFile(path.join(root, ".agentplane/context/manifest.lock.json"), "utf8"),
    ) as { sources: { path: string; status: string }[] };
    expect(lock.sources.map((source) => source.path).toSorted()).toEqual([
      "context/raw/a.md",
      "context/raw/b.md",
    ]);
    expect(lock.sources.find((source) => source.path === "context/raw/a.md")?.status).toBe(
      "unchanged",
    );
  });

  it("fails context check when wiki source refs are absent from manifest lock", async () => {
    const root = await tempRoot();
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
    await write(root, "context/raw/a.md", "# A\n\nAlpha.\n");
    await write(
      root,
      "context/wiki/a.md",
      [
        "---",
        'aliases: ["A"]',
        "agentplane_context:",
        "  schema_version: 1",
        "  artifact_type: wiki_page",
        '  canonical_id: "wiki.a"',
        '  title: "A"',
        "  modality: definition",
        "  epistemic_status: sourced_claim",
        "  visibility: project",
        "  source_refs:",
        '    - path: "context/raw/a.md"',
        '      ref: "context/raw/a.md"',
        '      label: "context/raw/a.md"',
        "  claims: []",
        "  graph_refs:",
        "    entities: []",
        "    edges: []",
        "  conflicts: []",
        "  updated_by: CURATOR",
        "---",
        "",
        "# A",
        "",
        "## Sources",
        "",
        "1. [context/raw/a.md](../raw/a.md)",
        "",
      ].join("\n"),
    );
    await write(
      root,
      ".agentplane/context/manifest.lock.json",
      JSON.stringify({ version: 1, generated_at: new Date().toISOString(), sources: [] }),
    );

    await expect(
      cmdContextDoctor({
        cwd: root,
        parsed: { fix: false, label: "check" },
      }),
    ).rejects.toThrow(/wiki source missing from manifest lock/u);
  });

  it("ignores body-only path examples when checking wiki source refs", async () => {
    const root = await tempRoot();
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
    await write(
      root,
      "context/wiki/example.md",
      [
        "---",
        'aliases: ["Example"]',
        "agentplane_context:",
        "  schema_version: 1",
        "  artifact_type: wiki_page",
        '  canonical_id: "wiki.example"',
        '  title: "Example"',
        "  modality: definition",
        "  epistemic_status: sourced_claim",
        "  visibility: project",
        "  source_refs: []",
        "  claims: []",
        "  graph_refs:",
        "    entities: []",
        "    edges: []",
        "  conflicts: []",
        "  updated_by: CURATOR",
        "---",
        "",
        "# Example",
        "",
        "```yaml",
        "- path: context/raw/body-only-example.md",
        "```",
        "",
        "## Sources",
        "",
        "- no-source: local test fixture",
        "",
      ].join("\n"),
    );

    await cmdContextDoctor({
      cwd: root,
      parsed: { fix: false, label: "check" },
    });
  });

  it("fails context check and suppresses stale projection search rows", async () => {
    const root = await tempRoot();
    await cmdContextInit({
      ctx: { resolvedProject: { gitRoot: root } } as CommandContext,
      cwd: root,
      parsed: {
        profile: "adaptive",
        rawGitignore: "none",
        derivedGitignore: "none",
        repair: false,
        force: false,
      },
    });
    await write(root, "context/wiki/payments.md", "# Payments\n\nstaleonly old.\n");
    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: false, includeRaw: true, reset: false },
    });
    await write(root, "context/wiki/payments.md", "# Payments\n\nNeedle current.\n");

    await expect(
      cmdContextDoctor({
        cwd: root,
        parsed: { fix: false, label: "check" },
      }),
    ).rejects.toThrow(/projection stale rows/u);

    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    await cmdContextSearch({
      cwd: root,
      parsed: { query: "staleonly", scope: "wiki", format: "json", explain: false },
    });
    const payload = JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
      results: { ref: string }[];
    };
    expect(payload.results).toEqual([]);
  });

  it("rejects maximum-assimilation graph refs without derived projections", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/managed-agents.md",
      [
        "---",
        'aliases: ["Managed Agents"]',
        "agentplane_context:",
        "  schema_version: 1",
        "  artifact_type: wiki_page",
        '  canonical_id: "wiki.managed-agents"',
        '  title: "Managed Agents"',
        "  modality: definition",
        "  epistemic_status: sourced_claim",
        "  source_refs:",
        '    - path: "context/raw/managed-agents.md"',
        '      ref: "context/raw/managed-agents.md"',
        '      label: "context/raw/managed-agents.md"',
        '  graph_refs: { entities: ["concept:managed-agents"], edges: [] }',
        "---",
        "",
        "# Managed Agents",
        "",
        "## Sources",
        "",
        "1. [context/raw/managed-agents.md](../raw/managed-agents.md)",
        "",
      ].join("\n"),
    );
    await write(root, ".agentplane/context/derived/graph/entities.jsonl", "");
    await write(root, ".agentplane/context/derived/graph/edges.jsonl", "");
    await write(root, ".agentplane/context/derived/graph/provenance_edges.jsonl", "");
    await write(root, ".agentplane/context/derived/facts/facts.jsonl", "");
    const task = {
      id: "202605210000-CTXMAX",
      status: "DOING",
      owner: "CURATOR",
      task_kind: "context",
      mutation_scope: "context",
      blueprint_request: "context.maximum_assimilation",
      extensions: {
        "agentplane.context": {
          mode: "maximum_assimilation",
          source_set: {
            files: [
              {
                path: "context/raw/managed-agents.md",
                sha256: "sha256:1111111111111111111111111111111111111111111111111111111111111111",
              },
            ],
          },
        },
      },
      runner: { evidence: { changed_paths: ["context/wiki/managed-agents.md"] } },
    };
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: { getTask: async () => task },
      backendId: "local",
      backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
      memo: {},
    } as unknown as CommandContext;

    await expect(
      cmdContextVerifyTask({
        ctx,
        cwd: root,
        parsed: { taskId: task.id },
      }),
    ).rejects.toThrow(/derived graph\/fact\/provenance projections are incomplete/u);
  });
});
