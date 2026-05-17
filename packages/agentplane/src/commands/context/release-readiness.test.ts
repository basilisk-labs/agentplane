/* eslint-disable @typescript-eslint/require-await */
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { CommandContext } from "../shared/task-backend.js";
import { cmdContextIngest } from "./ingest.js";
import { cmdContextInit } from "./init.js";
import { cmdContextReindex, readContextProjection } from "./reindex.js";
import { cmdContextSearch } from "./search.js";
import { cmdContextShow } from "./show.js";
import { cmdContextVerifyTask } from "./verify-task.js";
import {
  cmdContextWikiExplain,
  cmdContextWikiIndex,
  cmdContextWikiLint,
  cmdContextWikiNew,
} from "./wiki.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-release-"));
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

describe("context release readiness guards", () => {
  it("creates adaptive starter wiki pages that pass full wiki lint", async () => {
    const root = await tempRoot();
    vi.spyOn(process.stdout, "write").mockImplementation(() => true);

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

    await cmdContextWikiLint({
      cwd: root,
      parsed: { path: "context/wiki" },
    });

    const wikiAgents = await readFile(path.join(root, "context/wiki/AGENTS.md"), "utf8");
    const rootIndex = await readFile(path.join(root, "context/wiki/index.md"), "utf8");
    expect(wikiAgents).toContain("agentplane_context:");
    expect(wikiAgents).toContain('canonical_id: "wiki.agents"');
    expect(rootIndex).toContain("agentplane_context:");
    expect(rootIndex).toContain('canonical_id: "wiki.index"');
  });

  it("indexes stable section refs and excludes private raw files from projection", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/payments.md",
      "# Payments\n\nIntro\n\n## Refund Idempotency\n\nRefunds are idempotent.\n\n## Refund Idempotency\n\nDuplicate heading stays addressable.\n",
    );
    await write(root, "context/raw/specs/payment-api.md", "# Payment API\n\nPublic source.\n");
    await write(root, "context/raw/private/secret.md", "# Secret\n\nDo not index.\n");

    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: false, includeRaw: true, reset: false },
    });

    const projection = await readContextProjection(root);
    expect(
      projection?.rows.some((row) => row.path === "context/wiki/payments.md#section=payments"),
    ).toBe(true);
    expect(
      projection?.rows.some(
        (row) => row.path === "context/wiki/payments.md#section=refund-idempotency",
      ),
    ).toBe(true);
    expect(
      projection?.rows.some(
        (row) => row.path === "context/wiki/payments.md#section=refund-idempotency-2",
      ),
    ).toBe(true);
    const fileRow = projection?.rows.find((row) => row.path === "context/wiki/payments.md");
    const sectionRow = projection?.rows.find(
      (row) => row.path === "context/wiki/payments.md#section=refund-idempotency",
    );
    expect(sectionRow?.sha256).toBe(fileRow?.sha256);
    expect(projection?.rows.some((row) => row.path.includes("context/raw/private"))).toBe(false);
  });

  it("does not mark fresh markdown section projection rows as stale", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/payments.md",
      "# Payments\n\nIntro\n\n## Refund Idempotency\n\nRefunds are idempotent.\n",
    );
    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: false, includeRaw: true, reset: false },
    });
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextSearch({
      cwd: root,
      parsed: {
        query: "refunds",
        scope: "context",
        format: "json",
        explain: false,
      },
    });

    const payload = JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
      results: { ref: string; freshness: { stale: boolean } }[];
    };
    const sectionResult = payload.results.find(
      (result) => result.ref === "context/wiki/payments.md#section=refund-idempotency",
    );
    expect(sectionResult?.freshness.stale).toBe(false);
  });

  it("does not mark fresh JSONL fact and graph projection rows as stale", async () => {
    const root = await tempRoot();
    await write(
      root,
      ".agentplane/context/derived/facts/facts.jsonl",
      [
        {
          id: "fact:meridian-relay:stages",
          subject: "Meridian Relay",
          predicate: "has_stages",
          object: "capture, normalize, curator review",
          confidence: 0.94,
          status: "active",
          source_refs: ["context/raw/research/meridian-relay.md"],
        },
        {
          id: 42,
          subject: "Numeric Meridian Relay",
          predicate: "has_numeric_id",
          object: "true",
          confidence: 0.9,
          status: "active",
          source_refs: ["context/raw/research/meridian-relay.md"],
        },
      ]
        .map((row) => JSON.stringify(row))
        .join("\n") + "\n",
    );
    await write(
      root,
      ".agentplane/context/derived/graph/entities.jsonl",
      `${JSON.stringify({
        id: "concept:meridian-relay",
        kind: "concept",
        label: "Meridian Relay",
        status: "active",
        source_refs: ["context/raw/research/meridian-relay.md"],
      })}\n`,
    );
    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: false, includeRaw: true, reset: false },
    });
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextSearch({
      cwd: root,
      parsed: {
        query: "meridian relay",
        scope: "context",
        format: "json",
        explain: false,
      },
    });

    const payload = JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
      results: { ref: string; freshness: { stale: boolean } }[];
    };
    const factResult = payload.results.find((result) =>
      result.ref.endsWith("facts.jsonl#fact=fact:meridian-relay:stages"),
    );
    const entityResult = payload.results.find((result) =>
      result.ref.endsWith("entities.jsonl#entity=concept:meridian-relay"),
    );
    const numericIdResult = payload.results.find((result) =>
      result.ref.endsWith("facts.jsonl#fact=42"),
    );
    expect(factResult?.freshness.stale).toBe(false);
    expect(entityResult?.freshness.stale).toBe(false);
    expect(numericIdResult?.freshness.stale).toBe(false);
  });

  it("resolves markdown sections by slug", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/payments.md",
      "# Payments\n\nIntro\n\n## Refund Idempotency\n\nRefunds are idempotent.\n\n## Other\n\nSkip.\n",
    );
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextShow({
      cwd: root,
      parsed: { ref: "context/wiki/payments.md#section=refund-idempotency" },
    });

    const text = out.mock.calls.map((call) => String(call[0])).join("");
    expect(text).toContain("Refunds are idempotent.");
    expect(text).not.toContain("Skip.");
  });

  it("rejects context facts without provenance fields", async () => {
    const root = await tempRoot();
    await write(
      root,
      ".agentplane/context/derived/facts/facts.jsonl",
      JSON.stringify({ id: "fact_1", confidence: 0.8, status: "active" }) + "\n",
    );
    const task = {
      id: "202605130501-CTX001",
      status: "TODO",
      owner: "CURATOR",
      task_kind: "context",
      mutation_scope: "context",
      blueprint_request: "context.assimilation",
      extensions: {
        "agentplane.context": {
          source_set: {
            files: [
              {
                path: "context/raw/specs/payment-api.md",
                sha256: "sha256:1111111111111111111111111111111111111111111111111111111111111111",
              },
            ],
          },
        },
      },
      runner: {
        evidence: {
          changed_paths: [".agentplane/context/derived/facts/facts.jsonl"],
        },
      },
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
    ).rejects.toThrow(/fact row has no source_ref/u);
  });

  it("hands context ingest --run to the task runner after creating a CURATOR task", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/specs/payment-api.md", "# Payment API\n\nPublic source.\n");
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const tasks: { id: string; owner: string }[] = [];
    const createTask = vi.fn(async () => {
      tasks.push({ id: "202605130501-CTXRUN", owner: "CURATOR" });
    });
    const approveTaskPlan = vi.fn(async () => 0);
    const startTask = vi.fn(async () => 0);
    const runTask = vi.fn(async () => 0);
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: {
        listTasks: async () => [...tasks],
      },
      backendId: "local",
      backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
      memo: {},
    } as unknown as CommandContext;

    await cmdContextIngest({
      ctx,
      cwd: root,
      parsed: {
        sources: [],
        mode: "changed",
        dryRun: false,
        indexOnly: false,
        runTask: true,
        includePrivate: false,
      },
      createTask,
      approveTaskPlan,
      startTask,
      runTask,
    });

    expect(createTask).toHaveBeenCalledOnce();
    const createdArgs = createTask.mock.calls[0]?.[0] as {
      parsed?: {
        description?: string;
        extensions?: {
          "agentplane.context"?: {
            prompt_module_ref?: string;
            prompt_modules?: { content?: string }[];
            wiki?: { layout_strategy?: string; frontmatter_required?: boolean };
          };
        };
      };
    };
    expect(createdArgs.parsed?.description).toContain("CURATOR contract:");
    expect(createdArgs.parsed?.extensions?.["agentplane.context"]?.prompt_module_ref).toBe(
      "framework/template/generated.artifact/context_assimilation/v1",
    );
    expect(
      createdArgs.parsed?.extensions?.["agentplane.context"]?.prompt_modules?.[0]?.content,
    ).toContain("frontmatter");
    expect(
      createdArgs.parsed?.extensions?.["agentplane.context"]?.prompt_modules?.[0]?.content,
    ).toContain("Recommended CLI helpers:");
    expect(
      createdArgs.parsed?.extensions?.["agentplane.context"]?.prompt_modules?.[0]?.content,
    ).toContain("agentplane context wiki new <slug>");
    expect(
      createdArgs.parsed?.extensions?.["agentplane.context"]?.prompt_modules?.[0]?.content,
    ).toContain("Prefer existing canonical labels over source-local wording");
    expect(
      createdArgs.parsed?.extensions?.["agentplane.context"]?.prompt_modules?.[0]?.content,
    ).toContain("If a small object belongs inside a broader topic");
    expect(
      createdArgs.parsed?.extensions?.["agentplane.context"]?.prompt_modules?.[0]?.content,
    ).toContain("Put meaningful wiki links inline in the narrative text");
    expect(
      createdArgs.parsed?.extensions?.["agentplane.context"]?.prompt_modules?.[0]?.content,
    ).toContain("agentplane context wiki index context/wiki");
    expect(
      createdArgs.parsed?.extensions?.["agentplane.context"]?.prompt_modules?.[0]?.content,
    ).toContain("use the canonical term in prose and link it to the canonical page or section");
    expect(createdArgs.parsed?.extensions?.["agentplane.context"]?.wiki).toMatchObject({
      layout_strategy: "adaptive",
      frontmatter_required: true,
    });
    expect(approveTaskPlan).toHaveBeenCalledWith(
      expect.objectContaining({
        cwd: root,
        rootOverride: undefined,
        taskId: "202605130501-CTXRUN",
        by: "ORCHESTRATOR",
      }),
    );
    expect(startTask).toHaveBeenCalledWith(
      expect.objectContaining({
        cwd: root,
        rootOverride: undefined,
        taskId: "202605130501-CTXRUN",
        author: "CURATOR",
      }),
    );
    expect(runTask).toHaveBeenCalledWith(
      { cwd: root, rootOverride: undefined },
      { taskId: "202605130501-CTXRUN", dryRun: false },
    );
    expect(out.mock.calls.map((call) => String(call[0])).join("")).toContain(
      "context ingestion task created: 202605130501-CTXRUN",
    );
  });

  it("creates and explains wiki pages with AgentPlane context frontmatter", async () => {
    const root = await tempRoot();
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

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
    await cmdContextWikiLint({
      cwd: root,
      parsed: { path: "context/wiki" },
    });
    await cmdContextWikiExplain({
      cwd: root,
      parsed: { page: "decisions/context-claims" },
    });

    const output = out.mock.calls.map((call) => String(call[0])).join("");
    expect(output).toContain("context wiki new: context/wiki/decisions/context-claims.md");
    expect(output).toContain("context wiki lint: ok (1 page(s))");
    expect(output).toContain("canonical_id:");
    expect(output).toContain("modality: decision");
  });

  it("updates generated wiki index sections for pages and subdirectories", async () => {
    const root = await tempRoot();
    await cmdContextWikiNew({
      cwd: root,
      parsed: {
        page: "modules/meridian-relay",
        title: "Meridian Relay",
        modality: "definition",
        status: "reviewed_claim",
        visibility: "project",
        source: ["context/raw/specs/meridian-relay.md"],
        force: false,
      },
    });
    await cmdContextWikiNew({
      cwd: root,
      parsed: {
        page: "decisions/meridian-relay-pull-sync",
        title: "Meridian Relay pull sync",
        modality: "decision",
        status: "reviewed_claim",
        visibility: "project",
        source: ["context/raw/specs/meridian-relay.md"],
        force: false,
      },
    });
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextWikiIndex({
      cwd: root,
      parsed: { path: "context/wiki" },
    });

    const rootIndex = await readFile(path.join(root, "context/wiki/index.md"), "utf8");
    const modulesIndex = await readFile(path.join(root, "context/wiki/modules/index.md"), "utf8");
    expect(rootIndex).toContain("<!-- agentplane-context-wiki-index:start -->");
    expect(rootIndex).toContain("[Modules](modules/index.md)");
    expect(rootIndex).toContain("[Decisions](decisions/index.md)");
    expect(modulesIndex).toContain("[Meridian Relay](meridian-relay.md)");
    expect(out.mock.calls.map((call) => String(call[0])).join("")).toContain(
      "context wiki index: updated",
    );
  });

  it("updates ancestor index pages when wiki index is run for a single page", async () => {
    const root = await tempRoot();
    await cmdContextWikiNew({
      cwd: root,
      parsed: {
        page: "modules/meridian-relay",
        title: "Meridian Relay",
        modality: "definition",
        status: "reviewed_claim",
        visibility: "project",
        source: ["context/raw/specs/meridian-relay.md"],
        force: false,
      },
    });

    await cmdContextWikiIndex({
      cwd: root,
      parsed: { path: "context/wiki/modules/meridian-relay.md" },
    });

    const modulesIndex = await readFile(path.join(root, "context/wiki/modules/index.md"), "utf8");
    expect(modulesIndex).toContain("[Meridian Relay](meridian-relay.md)");
  });

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
});
