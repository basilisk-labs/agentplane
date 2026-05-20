/* eslint-disable @typescript-eslint/require-await */
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { CommandContext } from "../shared/task-backend.js";
import { cmdContextDoctor } from "./doctor.js";
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
  it("explains how to initialize context when doctor finds no workspace", async () => {
    const root = await tempRoot();
    const stderr = vi.spyOn(process.stderr, "write").mockImplementation(() => true);

    await expect(
      cmdContextDoctor({
        cwd: root,
        parsed: { fix: false },
      }),
    ).rejects.toThrow(/context doctor failed/u);

    const output = stderr.mock.calls.map(([chunk]) => String(chunk)).join("");
    expect(output).toContain("[context.doctor] recovery:");
    expect(output).toContain("agentplane context init --repair");
    expect(output).toContain("`--fix` only repairs missing directories");
  });

  it("creates only basic wiki pages and an empty raw source tree during context init", async () => {
    const root = await tempRoot();
    vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextInit({
      ctx: { resolvedProject: { gitRoot: root } } as CommandContext,
      cwd: root,
      parsed: {
        profile: "basic",
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
    const wikiEntries = await readdir(path.join(root, "context/wiki"));
    const rawEntries = await readdir(path.join(root, "context/raw"));
    expect(wikiAgents).toContain("agentplane_context:");
    expect(wikiAgents).toContain('canonical_id: "wiki.agents"');
    expect(rootIndex).toContain("agentplane_context:");
    expect(rootIndex).toContain('canonical_id: "wiki.index"');
    expect(wikiEntries.toSorted()).toEqual(["AGENTS.md", "index.md"]);
    expect(rawEntries.toSorted()).toEqual([".gitkeep"]);
  });

  it("initializes maximum-assimilation wiki mode with explicit coverage guidance", async () => {
    const root = await tempRoot();
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

    const manifest = await readFile(
      path.join(root, ".agentplane/context/agentplane.context.yaml"),
      "utf8",
    );
    const readme = await readFile(path.join(root, "context/README.md"), "utf8");
    const wikiAgents = await readFile(path.join(root, "context/wiki/AGENTS.md"), "utf8");

    expect(manifest).toContain("mode: maximum-assimilation");
    expect(manifest).toContain("maintenance_mode: maximum_assimilation");
    expect(manifest).toContain("line_refs_required: true");
    expect(readme).toContain("Maximum-assimilation mode adds a stricter wiki maintenance contract");
    expect(readme).toContain("line-addressed source refs as provenance pointers");
    expect(readme).toContain("wiki/fact/graph artifacts stay self-contained");
    expect(wikiAgents).toContain("Use the `context.maximum_assimilation` blueprint");
    expect(wikiAgents).toContain("canonical entities, glossary aliases, relation candidates");
    expect(wikiAgents).toContain("treat those refs as audit provenance");
    expect(wikiAgents).toContain("stored meaning");
    expect(wikiAgents).toContain("availability state");
    expect(wikiAgents).toContain("`missing`");
    expect(wikiAgents).toContain("choose wiki structure from source content");
    expect(wikiAgents).toContain("[[Page Title]]");
    expect(wikiAgents).toContain("Record EVALUATOR review");
  });

  it("creates starter wiki structure on first context ingest with selected sources", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/specs/payment-api.md", "# Payment API\n\nPublic source.\n");
    vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const tasks: { id: string; owner: string }[] = [];
    let taskCounter = 0;
    const createTask = vi.fn(async () => {
      taskCounter += 1;
      tasks.push({ id: `202605130501-CTXSCA-${taskCounter}`, owner: "CURATOR" });
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
      parsed: { sources: [], mode: "changed", dryRun: false, indexOnly: false },
      createTask,
    });

    const wikiEntries = await readdir(path.join(root, "context/wiki"));
    expect(wikiEntries).toEqual(
      expect.arrayContaining(["concepts", "entities", "decisions", "modules", "reports"]),
    );
    await cmdContextWikiLint({
      cwd: root,
      parsed: { path: "context/wiki" },
    });

    const lock = JSON.parse(
      await readFile(path.join(root, ".agentplane/context/manifest.lock.json"), "utf8"),
    ) as { wiki_scaffold?: { starter_created_at?: string } };
    expect(lock.wiki_scaffold?.starter_created_at).toEqual(expect.any(String));
  });

  it("does not create fixed starter wiki folders on maximum-assimilation first ingest", async () => {
    const root = await tempRoot();
    await write(
      root,
      ".agentplane/context/agentplane.context.yaml",
      "version: 1\nworkspace:\n  mode: maximum-assimilation\n",
    );
    await write(root, "context/wiki/index.md", "# Context wiki\n");
    await write(root, "context/raw/specs/payment-api.md", "# Payment API\n\nPublic source.\n");
    vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const tasks: { id: string; owner: string }[] = [];
    const createTask = vi.fn(async () => {
      tasks.push({ id: "202605130501-CTXMAX-SCAFFOLD", owner: "CURATOR" });
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
      parsed: { sources: [], mode: "changed", dryRun: false, indexOnly: false },
      createTask,
    });

    const wikiEntries = await readdir(path.join(root, "context/wiki"));
    expect(wikiEntries).not.toEqual(
      expect.arrayContaining(["concepts", "entities", "decisions", "modules", "reports"]),
    );

    const lock = JSON.parse(
      await readFile(path.join(root, ".agentplane/context/manifest.lock.json"), "utf8"),
    ) as { wiki_scaffold?: { starter_created_at?: string } };
    expect(lock.wiki_scaffold).toBeUndefined();
  });

  it("indexes stable section refs and arbitrary user-created raw hierarchy", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/payments.md",
      "# Payments\n\nIntro\n\n## Refund Idempotency\n\nRefunds are idempotent.\n\n## Refund Idempotency\n\nDuplicate heading stays addressable.\n",
    );
    await write(root, "context/raw/specs/payment-api.md", "# Payment API\n\nPublic source.\n");
    await write(root, "context/raw/customer-notes/secret.md", "# Secret\n\nIndex this source.\n");

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
    expect(
      projection?.rows.some((row) => row.path === "context/raw/customer-notes/secret.md"),
    ).toBe(true);
  });

  it("excludes private raw files from fallback search for raw and all scopes", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/specs/payment-api.md", "# Payment API\n\nNeedle public.\n");
    await write(root, "context/raw/private/secret.md", "# Secret\n\nNeedle private.\n");
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextSearch({
      cwd: root,
      parsed: { query: "needle", scope: "raw", format: "json", explain: false },
    });
    await cmdContextSearch({
      cwd: root,
      parsed: { query: "needle", scope: "all", format: "json", explain: false },
    });

    const payloads = out.mock.calls
      .map((call) => String(call[0]))
      .join("")
      .trim()
      .split(/\n(?=\{)/u)
      .map((chunk) => JSON.parse(chunk) as { results: { ref: string }[] });
    expect(payloads).toHaveLength(2);
    for (const payload of payloads) {
      expect(payload.results.some((result) => result.ref.includes("context/raw/private"))).toBe(
        false,
      );
      expect(
        payload.results.some((result) => result.ref === "context/raw/specs/payment-api.md"),
      ).toBe(true);
    }
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

  it("keeps task history out of default context search unless tasks scope is explicit", async () => {
    const root = await tempRoot();
    await write(root, "context/wiki/release.md", "# Release\n\nCurated release checklist.\n");
    await write(
      root,
      ".agentplane/tasks/202605190000-SEARCH1/README.md",
      "# Task\n\nTask-only release archaeology note.\n",
    );
    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: true, includeRaw: false, reset: false },
    });

    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    await cmdContextSearch({
      cwd: root,
      parsed: {
        query: "release",
        scope: "",
        format: "json",
        explain: false,
      },
    });
    const defaultPayload = JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
      results: { ref: string }[];
    };
    expect(defaultPayload.results.some((result) => result.ref.startsWith("context/wiki/"))).toBe(
      true,
    );
    expect(
      defaultPayload.results.some((result) => result.ref.startsWith(".agentplane/tasks/")),
    ).toBe(false);

    out.mockClear();
    await cmdContextSearch({
      cwd: root,
      parsed: {
        query: "task-only release",
        scope: "tasks",
        format: "json",
        explain: false,
      },
    });
    const tasksPayload = JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
      results: { ref: string }[];
    };
    expect(tasksPayload.results.some((result) => result.ref.startsWith(".agentplane/tasks/"))).toBe(
      true,
    );
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

  it("allows profile-switch context tasks without source ingest files", async () => {
    const root = await tempRoot();
    const task = {
      id: "202605191451-CTXCFG",
      status: "DOING",
      owner: "CURATOR",
      task_kind: "context",
      mutation_scope: "context",
      blueprint_request: "context.maximum_assimilation",
      extensions: {
        "agentplane.context": {
          task_type: "context_profile_switch",
          mode: "maximum_assimilation",
          allowed_outputs: [
            ".agentplane/context/agentplane.context.yaml",
            "context/wiki/AGENTS.md",
          ],
        },
      },
      runner: {
        evidence: {
          changed_paths: [".agentplane/context/agentplane.context.yaml", "context/wiki/AGENTS.md"],
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
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextVerifyTask({
      ctx,
      cwd: root,
      parsed: { taskId: task.id },
    });

    expect(out.mock.calls.map((call) => String(call[0])).join("")).toContain(
      "context verify-task 202605191451-CTXCFG: ok",
    );
  });

  it("rejects maximum-assimilation ingest tasks without source ingest files", async () => {
    const root = await tempRoot();
    const task = {
      id: "202605191451-CTXING",
      status: "DOING",
      owner: "CURATOR",
      task_kind: "context",
      mutation_scope: "context",
      blueprint_request: "context.maximum_assimilation",
      extensions: {
        "agentplane.context": {
          task_type: "context_assimilation",
          mode: "maximum_assimilation",
          allowed_outputs: ["context/wiki/"],
          source_set: { files: [] },
        },
      },
      runner: {
        evidence: {
          changed_paths: [],
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
    ).rejects.toThrow(/extensions\.agentplane\.context\.source_set\.files must not be empty/u);
  });

  it("prints the context check label when check delegates to doctor", async () => {
    const root = await tempRoot();
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    await cmdContextInit({
      ctx: { resolvedProject: { gitRoot: root } } as CommandContext,
      cwd: root,
      parsed: {
        profile: "basic",
        rawGitignore: "none",
        derivedGitignore: "none",
        repair: false,
        force: false,
      },
    });
    out.mockClear();

    await cmdContextDoctor({
      cwd: root,
      parsed: { fix: false, label: "check" },
    });

    expect(out.mock.calls.map((call) => String(call[0])).join("")).toContain("context check: ok");
  });

  it("creates a CURATOR task for agent-assisted context assimilation", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/specs/payment-api.md", "# Payment API\n\nPublic source.\n");
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const tasks: { id: string; owner: string }[] = [];
    const createTask = vi.fn(async () => {
      tasks.push({ id: "202605130501-CTXRUN", owner: "CURATOR" });
    });
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
      },
      createTask,
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
            blueprint?: { id?: string; required_gates?: string[]; stop_rules?: string[] };
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
    ).toContain("context.assimilation");
    expect(
      createdArgs.parsed?.extensions?.["agentplane.context"]?.prompt_modules?.[0]?.content,
    ).toContain("agentplane context reindex --include-raw");
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
    ).toContain("Final update step: refresh affected indexes, navigation pages, glossary entries");
    expect(
      createdArgs.parsed?.extensions?.["agentplane.context"]?.prompt_modules?.[0]?.content,
    ).toContain("use the canonical term in prose and link it to the canonical page or section");
    expect(createdArgs.parsed?.extensions?.["agentplane.context"]?.wiki).toMatchObject({
      layout_strategy: "adaptive",
      frontmatter_required: true,
    });
    const blueprint = createdArgs.parsed?.extensions?.["agentplane.context"]?.blueprint;
    expect(blueprint?.id).toBe("context.assimilation");
    expect(blueprint?.required_gates).toEqual(
      expect.arrayContaining(["source_set_locked", "reindex_after_writes"]),
    );
    expect(blueprint?.stop_rules).toEqual(
      expect.arrayContaining([
        "pipeline_order_skipped",
        "agent_handoff_missing_after_stalled_work",
      ]),
    );
    expect(out.mock.calls.map((call) => String(call[0])).join("")).toContain(
      "context ingestion task created: 202605130501-CTXRUN",
    );
  });

  it("uses maximum assimilation blueprint when the context workspace requests it", async () => {
    const root = await tempRoot();
    await write(
      root,
      ".agentplane/context/agentplane.context.yaml",
      "version: 1\nworkspace:\n  mode: maximum-assimilation\n",
    );
    await write(root, "context/raw/research/product-notes.md", "# Product Notes\n\nKey source.\n");
    const tasks: { id: string; owner: string }[] = [];
    const createTask = vi.fn(async () => {
      tasks.push({ id: "202605130501-CTXMAX", owner: "CURATOR" });
    });
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
      },
      createTask,
    });

    const createdArgs = createTask.mock.calls[0]?.[0] as {
      parsed?: {
        blueprintRequest?: string;
        description?: string;
        extensions?: {
          "agentplane.context"?: {
            mode?: string;
            prompt_modules?: { content?: string }[];
            wiki?: {
              maintenance_mode?: string;
              raw_deletion_resilience_required?: boolean;
              line_refs_required?: boolean;
              canonical_glossary_required?: boolean;
            };
            blueprint?: { id?: string; required_gates?: string[]; stop_rules?: string[] };
          };
        };
      };
    };

    expect(createdArgs.parsed?.blueprintRequest).toBe("context.maximum_assimilation");
    expect(createdArgs.parsed?.description).toContain("Maximum-assimilation contract:");
    expect(createdArgs.parsed?.description).toContain("significant source meaning");
    expect(createdArgs.parsed?.description).toContain("audit provenance, not as retained content");
    expect(createdArgs.parsed?.description).toContain(
      "Choose wiki structure from the selected source content",
    );
    expect(createdArgs.parsed?.description).toContain("[[Page Title]]");
    expect(createdArgs.parsed?.description).toContain("EVALUATOR quality review");
    expect(createdArgs.parsed?.extensions?.["agentplane.context"]?.mode).toBe(
      "maximum_assimilation",
    );
    expect(createdArgs.parsed?.extensions?.["agentplane.context"]?.blueprint?.id).toBe(
      "context.maximum_assimilation",
    );
    expect(
      createdArgs.parsed?.extensions?.["agentplane.context"]?.blueprint?.required_gates,
    ).toEqual(
      expect.arrayContaining([
        "source_shaped_wiki_topology_recorded",
        "canonical_glossary_updated",
        "obsidian_wikilinks_reviewed",
        "evaluator_quality_review",
      ]),
    );
    expect(createdArgs.parsed?.extensions?.["agentplane.context"]?.blueprint?.stop_rules).toEqual(
      expect.arrayContaining([
        "missing_source_shaped_topology_decision",
        "missing_obsidian_wikilinks",
        "raw_deletion_resilience_unproven",
        "evaluator_quality_review_missing",
      ]),
    );
    expect(createdArgs.parsed?.extensions?.["agentplane.context"]?.wiki).toMatchObject({
      maintenance_mode: "maximum_assimilation",
      raw_deletion_resilience_required: true,
      line_refs_required: true,
      canonical_glossary_required: true,
    });
    expect(
      createdArgs.parsed?.extensions?.["agentplane.context"]?.prompt_modules?.[0]?.content,
    ).toContain("Maximum-assimilation workflow:");
    expect(
      createdArgs.parsed?.extensions?.["agentplane.context"]?.prompt_modules?.[0]?.content,
    ).toContain("availability state");
    expect(
      createdArgs.parsed?.extensions?.["agentplane.context"]?.prompt_modules?.[0]?.content,
    ).toContain("Topology pass:");
    expect(
      createdArgs.parsed?.extensions?.["agentplane.context"]?.prompt_modules?.[0]?.content,
    ).toContain("[[Canonical Page]]");
    expect(
      createdArgs.parsed?.extensions?.["agentplane.context"]?.prompt_modules?.[0]?.content,
    ).toContain("Evaluation pass:");
    expect(
      createdArgs.parsed?.extensions?.["agentplane.context"]?.prompt_modules?.[0]?.content,
    ).toContain("self-contained wiki/fact/graph content plus line-addressed provenance");
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

  it("allows initialized scaffold navigation files without page frontmatter", async () => {
    const root = await tempRoot();
    await write(root, "context/wiki/AGENTS.md", "# Wiki Policy\n");
    await write(root, "context/wiki/index.md", "# Project Wiki\n");
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
