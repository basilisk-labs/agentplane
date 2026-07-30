import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
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
  for (const root of tempRoots) await rm(root, { recursive: true, force: true });
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
    batchBytes: input.batchBytes ?? "131072",
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

function taskCreationResult(taskId: string) {
  return {
    task_id: taskId,
    revision: 1,
    backend_id: "local",
    artifact_paths: [`.agentplane/tasks/${taskId}/README.md`],
  };
}

describe("context harvest tasks", () => {
  it("previews the oldest candidates without writing proposal artifacts", async () => {
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
      readdir(path.join(root, ".agentplane/context/derived/proposals/task-knowledge")),
    ).rejects.toThrow();
  });

  it("writes sourced unpublished proposals but never writes facts, graph rows, or wiki pages", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const tasks = [
      task({
        id: "202604010900-REL001",
        title: "Harden the release workflow",
        tags: ["release", "workflow"],
      }),
    ];

    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ tag: ["release"], writeProposals: true }),
    });

    const proposalDir = path.join(root, ".agentplane/context/derived/proposals/task-knowledge");
    const proposalFiles = await readdir(proposalDir);
    const proposalName = proposalFiles.find((name) => name.endsWith(".json"));
    expect(proposalName).toBeDefined();
    const proposal = JSON.parse(
      await readFile(path.join(proposalDir, proposalName ?? ""), "utf8"),
    ) as {
      kind: string;
      publication_state: string;
      source_task_id: string;
      source_refs: string[];
      signals: { kind: string }[];
    };
    expect(proposal).toMatchObject({
      kind: "task_knowledge_proposal",
      publication_state: "not_published",
      source_task_id: "202604010900-REL001",
    });
    expect(proposal.source_refs).toEqual([
      ".agentplane/tasks/202604010900-REL001/README.md#lines=1-80",
    ]);
    expect(proposal.signals.map((signal) => signal.kind)).toEqual(
      expect.arrayContaining(["task_pr_decision", "stable_workflow_rule_candidate"]),
    );
    await expect(
      readFile(path.join(root, "context/wiki/proposals/task-harvest/done-release.md")),
    ).rejects.toThrow();
    await expect(
      readFile(path.join(root, ".agentplane/context/derived/facts/facts.jsonl")),
    ).rejects.toThrow();
    await expect(
      readFile(path.join(root, ".agentplane/context/derived/graph/entities.jsonl")),
    ).rejects.toThrow();
    expect(tasks[0]?.extensions?.context_harvest).toMatchObject({
      pipeline: "context.harvest.tasks",
      state: "proposed",
      publication_state: "not_published",
      proposal_path: `.agentplane/context/derived/proposals/task-knowledge/${proposalName?.replace(/\.json$/u, "")}.json`,
    });
  });

  it("records consolidation evidence instead of deduplicating similar durable claims", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const tasks = [
      task({
        id: "202604010900-DUP001",
        title: "Harden branch_pr close flow",
        description: "First independently recorded workflow decision.",
        tags: ["workflow"],
      }),
      task({
        id: "202604020900-DUP002",
        title: "Harden branch_pr close flow",
        description: "Second independently recorded workflow decision.",
        tags: ["workflow"],
      }),
    ];

    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ tag: ["workflow"], writeProposals: true, format: "json" }),
    });

    const payload = JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
      counts: { consolidation_required: number };
    };
    expect(payload.counts.consolidation_required).toBe(2);
    const proposalDir = path.join(root, ".agentplane/context/derived/proposals/task-knowledge");
    const proposalFiles = await readdir(proposalDir);
    const proposals = await Promise.all(
      proposalFiles.map(
        async (name) =>
          JSON.parse(await readFile(path.join(proposalDir, name), "utf8")) as {
            state: string;
            dedupe: { consolidation_with: string[] };
          },
      ),
    );
    expect(proposals).toHaveLength(2);
    expect(proposals.every((proposal) => proposal.state === "consolidation_required")).toBe(true);
    expect(proposals.every((proposal) => proposal.dedupe.consolidation_with.length > 0)).toBe(true);
  });

  it("requires an initialized context workspace before persisting proposals", async () => {
    const root = await tempRoot();
    await expect(
      cmdContextHarvestTasks({
        ctx: ctx(root, [
          task({ id: "202604010900-REL001", title: "Release gate", tags: ["release"] }),
        ]),
        cwd: root,
        parsed: parsed({ tag: ["release"], writeProposals: true }),
      }),
    ).rejects.toThrow(/context init/u);
  });

  it("requires one explicit task selection before creating a CURATOR work order", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    await expect(
      cmdContextHarvestTasks({
        ctx: ctx(root, [
          task({ id: "202604010900-REL001", title: "Release gate", tags: ["release"] }),
        ]),
        cwd: root,
        parsed: parsed({ tag: ["release"], createExtractionTasks: true }),
      }),
    ).rejects.toThrow(/exactly one explicit --task/u);
  });

  it("rejects an explicit selection that is not an eligible completed proposal", async () => {
    const root = await tempRoot();
    await expect(
      cmdContextHarvestTasks({
        ctx: ctx(root, [
          task({
            id: "202604010900-TODO01",
            title: "Incomplete release gate",
            status: "TODO",
            tags: ["release"],
          }),
        ]),
        cwd: root,
        parsed: parsed({ task: ["202604010900-TODO01"], createExtractionTasks: true }),
      }),
    ).rejects.toThrow(/could not resolve the explicit task selection/u);
  });

  it("creates one exact CURATOR semantic work order and records the selection receipt", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const source = task({
      id: "202604010900-FIRST1",
      title: "Harden task lifecycle workflow",
      tags: ["workflow"],
    });
    const tasks = [source];
    const createdParsed: unknown[] = [];
    await write(
      root,
      `.agentplane/tasks/${source.id}/README.md`,
      "# Source task\n\n## Summary\n\nHarden task lifecycle workflow.\n",
    );
    await write(root, `.agentplane/tasks/${source.id}/acr.json`, '{"result":"verified"}\n');

    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ task: [source.id], createExtractionTasks: true, batchSize: "25" }),
      createTask: async ({ ctx: commandCtx, parsed: taskParsed }) => {
        createdParsed.push(taskParsed);
        await commandCtx.taskBackend.writeTask({
          id: "202604040900-CURAT1",
          title: taskParsed.title,
          status: "TODO",
          owner: taskParsed.owner,
          priority: taskParsed.priority,
          tags: taskParsed.tags,
          description: taskParsed.description,
          extensions: taskParsed.extensions,
        } as TaskData);
        return taskCreationResult("202604040900-CURAT1");
      },
    });

    expect(createdParsed).toHaveLength(1);
    const created = createdParsed[0] as {
      owner: string;
      tags: string[];
      blueprintRequest: string;
      verify: string[];
      extensions: {
        "agentplane.context": {
          proposal: { ids: string[]; paths: string[]; publication_state: string };
          source_set: { sources: { id: string; readme_path: string; acr_path: string }[] };
          prompt_modules: { address: { value: string }; content: string }[];
          allowed_outputs: string[];
          agent_allowed_outputs: string[];
          cli_owned_operations: string[];
        };
      };
    };
    expect(created.owner).toBe("CURATOR");
    expect(created.tags).toEqual(expect.arrayContaining(["knowledge-proposal"]));
    expect(created.blueprintRequest).toBe("context.maximum_assimilation");
    expect(created.extensions["agentplane.context"].proposal.ids).toHaveLength(1);
    expect(created.extensions["agentplane.context"].proposal.publication_state).toBe(
      "not_published",
    );
    expect(created.extensions["agentplane.context"].source_set.sources).toMatchObject([
      {
        id: source.id,
        readme_path: `.agentplane/tasks/${source.id}/README.md`,
        acr_path: `.agentplane/tasks/${source.id}/acr.json`,
      },
    ]);
    expect(created.extensions["agentplane.context"].allowed_outputs).toContain(
      ".agentplane/tasks/${taskId}/semantic-results/**",
    );
    expect(created.extensions["agentplane.context"].allowed_outputs).toContain("context/wiki/**");
    expect(created.extensions["agentplane.context"].agent_allowed_outputs).toEqual([
      ".agentplane/tasks/${taskId}/semantic-results/**",
    ]);
    expect(created.extensions["agentplane.context"].cli_owned_operations).toEqual(
      expect.arrayContaining(["apply_semantic_result", "reindex", "finalize"]),
    );
    expect(created.verify.join("\n")).toContain("Do not apply or materialize");
    const prompt = created.extensions["agentplane.context"].prompt_modules[0];
    expect(prompt?.address.value).toBe(
      "framework/template/generated.artifact/context_task_knowledge_proposal/v2",
    );
    expect(prompt?.content).toContain("Return one schema-valid SGR v2");
    expect(prompt?.content).toContain("Do not apply the SGR");
    expect(prompt?.content).not.toContain("Reindex, refresh");
    const proposalId = created.extensions["agentplane.context"].proposal.ids[0];
    await expect(
      readFile(
        path.join(
          root,
          ".agentplane/context/derived/proposals/task-knowledge",
          `${proposalId}.selection.json`,
        ),
        "utf8",
      ),
    ).resolves.toContain('"curator_task_id": "202604040900-CURAT1"');
    await expect(
      readFile(
        path.join(root, ".agentplane/tasks/202604040900-CURAT1/extraction-contract.json"),
        "utf8",
      ),
    ).resolves.toContain('"sgr_schema_version": 2');
    await expect(
      readFile(
        path.join(root, ".agentplane/tasks/202604040900-CURAT1/source-set.lock.json"),
        "utf8",
      ),
    ).resolves.toContain(`"path": ".agentplane/tasks/${source.id}/README.md"`);
    await expect(
      readFile(
        path.join(root, ".agentplane/tasks/202604040900-CURAT1/canonical-snapshot.json"),
        "utf8",
      ),
    ).resolves.toContain('"version": 3');
    await expect(
      readFile(path.join(root, ".agentplane/tasks/202604040900-CURAT1/context-pack.md"), "utf8"),
    ).resolves.toContain("Required Inputs");
    expect(tasks.find((row) => row.id === source.id)?.extensions).toMatchObject({
      context_task_extraction: {
        state: "selected",
        extraction_task_id: "202604040900-CURAT1",
      },
    });
  });

  it("skips unchanged proposal sources and offers a changed source again", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const tasks = [task({ id: "202604010900-REL001", title: "Release gate", tags: ["release"] })];

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
    expect(
      (
        JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
          selected_task_ids: string[];
        }
      ).selected_task_ids,
    ).toEqual([]);

    tasks[0] = {
      ...tasks[0],
      sections: { ...tasks[0]?.sections, Summary: "Release gate changed source evidence" },
    } as TaskData;
    out.mockClear();
    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ tag: ["release"], dryRun: true, format: "json" }),
    });
    expect(
      (
        JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
          selected_task_ids: string[];
        }
      ).selected_task_ids,
    ).toEqual(["202604010900-REL001"]);
  });

  it("rejects direct promotion and treats malformed proposal reports as invalid", async () => {
    const root = await tempRoot();
    await expect(
      cmdContextHarvestTasks({
        ctx: ctx(root, [
          task({ id: "202604010900-REL001", title: "Release gate", tags: ["release"] }),
        ]),
        cwd: root,
        parsed: parsed({ promote: true }),
      }),
    ).rejects.toThrow(/never promotes task knowledge directly/u);
    await write(
      root,
      ".agentplane/context/derived/reports/task-knowledge-proposals-bad.json",
      JSON.stringify({ generated_by: "context.harvest.tasks" }),
    );
    await expect(
      readHarvestReport(
        path.join(root, ".agentplane/context/derived/reports/task-knowledge-proposals-bad.json"),
      ),
    ).resolves.toBeNull();
  });
});
