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
    promote: input.promote ?? false,
    dryRun: input.dryRun ?? false,
    format: input.format ?? "text",
  };
}

function ctx(root: string, tasks: TaskData[]): CommandContext {
  return {
    resolvedProject: { gitRoot: root },
    config: { paths: { workflow_dir: ".agentplane/tasks" } },
    taskBackend: { listTasks: () => Promise.resolve(tasks) },
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
