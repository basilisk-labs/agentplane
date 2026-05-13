import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  cmdContextHarvestTasks,
  readHarvestReport,
  type ContextHarvestTasksParsed,
} from "./harvest-tasks.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-harvest-"));
  tempRoots.push(root);
  await mkdir(path.join(root, ".agentplane/context/derived"), { recursive: true });
  return root;
}

async function write(root: string, rel: string, text: string): Promise<void> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

async function initContextWorkspace(root: string): Promise<void> {
  await write(root, ".agentplane/context/agentplane.context.yaml", "version: 1\n");
  await write(root, ".agentplane/context/policies/context.rules.md", "# Context rules\n");
  await write(root, ".agentplane/context/policies/wiki.rules.md", "# Wiki rules\n");
  await write(root, ".agentplane/context/policies/redaction.rules.yaml", "version: 1\n");
}

afterEach(async () => {
  vi.restoreAllMocks();
  for (const root of tempRoots) {
    await rm(root, { recursive: true, force: true });
  }
  tempRoots = [];
});

function task(input: Partial<TaskData> & { id: string; title: string }): TaskData {
  return {
    id: input.id,
    title: input.title,
    status: input.status ?? "DONE",
    owner: input.owner ?? "CODER",
    priority: input.priority ?? "med",
    tags: input.tags ?? [],
    description: input.description ?? `${input.title} description`,
    sections: input.sections ?? {
      Summary: `${input.title} summary`,
      Verification: "Verified with focused tests.",
    },
    comments: input.comments ?? [],
    commit: input.commit ?? {
      hash: `abc${input.id.slice(-6)}`,
      message: `${input.title} implementation`,
    },
  } as TaskData;
}

function parsed(input: Partial<ContextHarvestTasksParsed> = {}): ContextHarvestTasksParsed {
  return {
    status: input.status ?? [],
    tag: input.tag ?? [],
    task: input.task ?? [],
    since: input.since ?? "",
    until: input.until ?? "",
    afterTask: input.afterTask ?? "",
    limit: input.limit ?? "",
    writeProposals: input.writeProposals ?? false,
    createExtractionTasks: input.createExtractionTasks ?? false,
    batchSize: input.batchSize ?? "25",
    promote: input.promote ?? false,
    dryRun: input.dryRun ?? false,
    format: input.format ?? "text",
  };
}

function ctx(root: string, tasks: TaskData[]): CommandContext {
  return {
    resolvedProject: { gitRoot: root },
    config: { paths: { workflow_dir: ".agentplane/tasks" } },
    taskBackend: {
      listTasks: () => Promise.resolve(tasks),
      writeTask: (updated: TaskData) => {
        const index = tasks.findIndex((task) => task.id === updated.id);
        if (index === -1) tasks.push(updated);
        else tasks[index] = updated;
        return Promise.resolve();
      },
    },
    backendId: "local",
    backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
    memo: {},
  } as unknown as CommandContext;
}

describe("context harvest tasks", () => {
  it("previews oldest completed tasks without writing proposal artifacts", async () => {
    const root = await tempRoot();
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const tasks = [
      task({ id: "202605010900-NEWER1", title: "Newer release task", tags: ["release"] }),
      task({ id: "202604010900-OLDER1", title: "Older release task", tags: ["release"] }),
      task({
        id: "202604010900-TODO01",
        title: "Open release task",
        status: "TODO",
        tags: ["release"],
      }),
    ];

    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ tag: ["release"], limit: "1", dryRun: true, format: "json" }),
    });

    const payload = JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
      selected_task_ids: string[];
      changed_paths: string[];
    };
    expect(payload.selected_task_ids).toEqual(["202604010900-OLDER1"]);
    expect(payload.changed_paths).toEqual([]);
    await expect(
      readFile(path.join(root, "context/wiki/proposals/task-harvest/done-release.md")),
    ).rejects.toThrow();
  });

  it("writes raw evidence, facts, graph rows, report, and a wiki proposal", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const tasks = [
      task({
        id: "202604010900-REL001",
        title: "Release gate hardening",
        tags: ["release", "code"],
      }),
    ];

    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ tag: ["release"], writeProposals: true }),
    });

    const evidence = await readFile(
      path.join(root, "context/raw/tasks/202604010900-REL001.json"),
      "utf8",
    );
    const facts = await readFile(
      path.join(root, ".agentplane/context/derived/facts/facts.jsonl"),
      "utf8",
    );
    const graph = await readFile(
      path.join(root, ".agentplane/context/derived/graph/entities.jsonl"),
      "utf8",
    );
    const proposal = await readFile(
      path.join(root, "context/wiki/proposals/task-harvest/done-release.md"),
      "utf8",
    );
    expect(evidence).toContain("202604010900-REL001");
    expect(facts).toContain('"generated_by":"context.harvest.tasks"');
    expect(facts).toContain('"source_refs"');
    expect(graph).toContain('"task:202604010900-REL001"');
    expect(proposal).toContain("promotion_state: proposal");
    expect(proposal).toContain("source_refs:");
    expect(tasks[0]?.extensions?.context_harvest).toMatchObject({
      pipeline: "context.harvest.tasks",
      state: "ingested",
      raw_evidence_path: "context/raw/tasks/202604010900-REL001.json",
      wiki_proposal_path: "context/wiki/proposals/task-harvest/done-release.md",
      promotion_state: "proposal",
    });
    const ledger = await readFile(
      path.join(root, ".agentplane/context/derived/ingestion/tasks.jsonl"),
      "utf8",
    );
    expect(ledger).toContain('"task_id":"202604010900-REL001"');
  });

  it("skips unchanged tasks with matching ingestion markers unless their evidence changes", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const tasks = [
      task({
        id: "202604010900-REL001",
        title: "Release gate hardening",
        tags: ["release", "code"],
      }),
    ];

    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ tag: ["release"], writeProposals: true }),
    });

    out.mockClear();
    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ tag: ["release"], dryRun: true, format: "json" }),
    });
    const unchanged = JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
      selected_task_ids: string[];
    };
    expect(unchanged.selected_task_ids).toEqual([]);

    const harvested = tasks[0];
    if (!harvested) throw new Error("expected harvested task");
    tasks[0] = {
      ...harvested,
      sections: { ...harvested.sections, Summary: "Release gate hardening updated summary" },
    };
    out.mockClear();
    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ tag: ["release"], dryRun: true, format: "json" }),
    });
    const changed = JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
      selected_task_ids: string[];
    };
    expect(changed.selected_task_ids).toEqual(["202604010900-REL001"]);
  });

  it("blocks promotion when duplicate task claims need manual conflict review", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const tasks = [
      task({ id: "202604010900-DUP001", title: "Harden branch_pr close flow", tags: ["workflow"] }),
      task({ id: "202604020900-DUP002", title: "Harden branch_pr close flow", tags: ["workflow"] }),
    ];

    await expect(
      cmdContextHarvestTasks({
        ctx: ctx(root, tasks),
        cwd: root,
        parsed: parsed({ tag: ["workflow"], writeProposals: true, promote: true }),
      }),
    ).rejects.toThrow(/promotion blocked/u);

    const proposal = await readFile(
      path.join(root, "context/wiki/proposals/task-harvest/done-workflow.md"),
      "utf8",
    );
    expect(proposal).toContain("Conflict marker:");
    await expect(
      readFile(path.join(root, "context/wiki/task-harvest/done-workflow.md")),
    ).rejects.toThrow();
  });

  it("requires context init artifacts before writing proposals", async () => {
    const root = await tempRoot();

    await expect(
      cmdContextHarvestTasks({
        ctx: ctx(root, [
          task({ id: "202604010900-REL001", title: "Release gate hardening", tags: ["release"] }),
        ]),
        cwd: root,
        parsed: parsed({ tag: ["release"], writeProposals: true }),
      }),
    ).rejects.toThrow(/context init/u);
  });

  it("creates CURATOR extraction tasks in oldest-first batches without writing raw evidence", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const createdParsed: unknown[] = [];
    const tasks = [
      task({ id: "202604030900-THIRD3", title: "Third context task", tags: ["workflow"] }),
      task({ id: "202604010900-FIRST1", title: "First context task", tags: ["workflow"] }),
      task({ id: "202604020900-SECOND", title: "Second context task", tags: ["workflow"] }),
    ];
    const commandCtx = ctx(root, tasks);
    let createdCount = 0;

    await cmdContextHarvestTasks({
      ctx: commandCtx,
      cwd: root,
      parsed: parsed({
        tag: ["workflow"],
        createExtractionTasks: true,
        batchSize: "2",
        format: "json",
      }),
      createTask: async ({ ctx, parsed }) => {
        createdCount += 1;
        createdParsed.push(parsed);
        await ctx.taskBackend.writeTask({
          id: `202604040900-CURAT${createdCount}`,
          title: parsed.title,
          status: "TODO",
          owner: parsed.owner,
          priority: parsed.priority,
          tags: parsed.tags,
          description: parsed.description,
          extensions: parsed.extensions,
        } as TaskData);
        return 0;
      },
    });

    expect(createdParsed).toHaveLength(2);
    expect(createdParsed[0]).toMatchObject({
      owner: "CURATOR",
      tags: ["context", "assimilation", "task-harvest"],
      taskKind: "context",
      mutationScope: "context",
      blueprintRequest: "context.assimilation",
    });
    const first = createdParsed[0] as {
      extensions: {
        "agentplane.context": {
          source_set: { sources: { id: string; readme_path: string; acr_path: string }[] };
          prompt_modules: { address: { value: string }; content: string }[];
        };
      };
    };
    expect(first.extensions["agentplane.context"].source_set.sources).toMatchObject([
      {
        id: "202604010900-FIRST1",
        title: "First context task",
        status: "DONE",
        tags: ["workflow"],
        readme_path: ".agentplane/tasks/202604010900-FIRST1/README.md",
        acr_path: ".agentplane/tasks/202604010900-FIRST1/acr.json",
        existing_harvest_marker: null,
      },
      {
        id: "202604020900-SECOND",
        title: "Second context task",
        status: "DONE",
        tags: ["workflow"],
        readme_path: ".agentplane/tasks/202604020900-SECOND/README.md",
        acr_path: ".agentplane/tasks/202604020900-SECOND/acr.json",
        existing_harvest_marker: null,
      },
    ]);
    expect(first.extensions["agentplane.context"].source_set.sources[0]?.source_digest).toMatch(
      /^sha256:/,
    );
    expect(first.extensions["agentplane.context"].source_set.sources[1]?.source_digest).toMatch(
      /^sha256:/,
    );
    expect(first.extensions["agentplane.context"].prompt_modules[0]?.address.value).toBe(
      "framework/template/generated.artifact/context_task_extraction/v1",
    );
    expect(first.extensions["agentplane.context"].prompt_modules[0]?.content).toContain(
      "Read each source task README first",
    );
    expect(tasks.find((row) => row.id === "202604010900-FIRST1")?.extensions).toMatchObject({
      context_task_extraction: {
        pipeline: "context.harvest.tasks",
        state: "queued",
        extraction_task_id: "202604040900-CURAT1",
        prompt_module_ref: "framework/template/generated.artifact/context_task_extraction/v1",
      },
    });
    await expect(
      readFile(path.join(root, "context/raw/tasks/202604010900-FIRST1.json")),
    ).rejects.toThrow();
  });

  it("preserves harvest markers when proposal writing and extraction task creation are combined", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const tasks = [
      task({
        id: "202604010900-FIRST1",
        title: "First context task",
        tags: ["workflow"],
      }),
    ];
    const commandCtx = ctx(root, tasks);

    await cmdContextHarvestTasks({
      ctx: commandCtx,
      cwd: root,
      parsed: parsed({
        tag: ["workflow"],
        writeProposals: true,
        createExtractionTasks: true,
        format: "json",
      }),
      createTask: async ({ ctx, parsed }) => {
        await ctx.taskBackend.writeTask({
          id: "202604040900-CURAT1",
          title: parsed.title,
          status: "TODO",
          owner: parsed.owner,
          priority: parsed.priority,
          tags: parsed.tags,
          description: parsed.description,
          extensions: parsed.extensions,
        } as TaskData);
        return 0;
      },
    });

    expect(tasks.find((row) => row.id === "202604010900-FIRST1")?.extensions).toMatchObject({
      context_harvest: {
        pipeline: "context.harvest.tasks",
        state: "ingested",
        raw_evidence_path: "context/raw/tasks/202604010900-FIRST1.json",
        wiki_proposal_path: "context/wiki/proposals/task-harvest/done-workflow.md",
      },
      context_task_extraction: {
        pipeline: "context.harvest.tasks",
        state: "queued",
        extraction_task_id: "202604040900-CURAT1",
      },
    });
  });

  it("does not treat raw harvest markers as semantic extraction completion", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const tasks = [
      task({
        id: "202604010900-REL001",
        title: "Release gate hardening",
        tags: ["release", "code"],
      }),
    ];

    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ tag: ["release"], writeProposals: true }),
    });
    out.mockClear();
    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({
        tag: ["release"],
        createExtractionTasks: true,
        dryRun: true,
        format: "json",
      }),
    });

    const payload = JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
      selected_task_ids: string[];
      extraction_task_batches: { source_task_ids: string[] }[];
    };
    expect(payload.selected_task_ids).toEqual(["202604010900-REL001"]);
    expect(payload.extraction_task_batches[0]?.source_task_ids).toEqual(["202604010900-REL001"]);
  });

  it("previews extraction task batches on dry-run without creating tasks", async () => {
    const root = await tempRoot();
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextHarvestTasks({
      ctx: ctx(root, [
        task({ id: "202604010900-FIRST1", title: "First context task", tags: ["workflow"] }),
        task({ id: "202604020900-SECOND", title: "Second context task", tags: ["workflow"] }),
      ]),
      cwd: root,
      parsed: parsed({
        tag: ["workflow"],
        createExtractionTasks: true,
        batchSize: "1",
        dryRun: true,
        format: "json",
      }),
      createTask: () => Promise.reject(new Error("dry-run must not create tasks")),
    });

    const payload = JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
      extraction_task_batches: { source_task_ids: string[]; created_task_id: string | null }[];
      created_extraction_task_ids: string[];
    };
    expect(payload.extraction_task_batches).toEqual([
      {
        batch_index: 1,
        batch_count: 2,
        source_task_ids: ["202604010900-FIRST1"],
        created_task_id: null,
      },
      {
        batch_index: 2,
        batch_count: 2,
        source_task_ids: ["202604020900-SECOND"],
        created_task_id: null,
      },
    ]);
    expect(payload.created_extraction_task_ids).toEqual([]);
  });

  it("sanitizes explicit task filters before deriving proposal paths", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);

    await cmdContextHarvestTasks({
      ctx: ctx(root, []),
      cwd: root,
      parsed: parsed({ task: ["foo/../../../../tmp/pwn"], writeProposals: true }),
    });

    await expect(
      readFile(path.join(root, "context/wiki/proposals/task-harvest/task-foo-tmp-pwn.md"), "utf8"),
    ).resolves.toContain("promotion_state: proposal");
    await expect(readFile(path.join(root, "tmp/pwn.md"))).rejects.toThrow();
  });

  it("treats malformed harvest reports as invalid", async () => {
    const root = await tempRoot();
    await write(
      root,
      ".agentplane/context/derived/reports/task-harvest-bad.json",
      JSON.stringify({ generated_by: "context.harvest.tasks" }),
    );

    await expect(
      readHarvestReport(
        path.join(root, ".agentplane/context/derived/reports/task-harvest-bad.json"),
      ),
    ).resolves.toBeNull();
  });
});
