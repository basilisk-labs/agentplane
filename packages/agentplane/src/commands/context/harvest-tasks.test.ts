import { createHash } from "node:crypto";
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
    doc: input.doc,
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
        description:
          "Stable workflow rule: release changes require a checked PR before integration.",
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
    expect(proposal.source_refs).toEqual(
      expect.arrayContaining(["context/raw/tasks/202604010900-REL001.json#source_text_lines=3"]),
    );
    expect(proposal.signals.map((signal) => signal.kind)).toEqual([
      "stable_workflow_rule_candidate",
    ]);
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
        description: "Stable workflow rule: first independently recorded close-flow rule.",
        tags: ["workflow"],
      }),
      task({
        id: "202604020900-DUP002",
        title: "Harden branch_pr close flow",
        description: "Stable workflow rule: second independently recorded close-flow rule.",
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
      description: "Decision: task lifecycle changes require one separate CURATOR owner.",
    });
    const tasks = [source];
    const createdParsed: unknown[] = [];
    await write(
      root,
      `.agentplane/tasks/${source.id}/README.md`,
      "# Source task\n\n## Summary\n\nHarden task lifecycle workflow.\n",
    );
    await write(root, `.agentplane/tasks/${source.id}/acr.json`, '{"result":"verified"}\n');
    await write(
      root,
      `.agentplane/tasks/${source.id}/pr/meta.json`,
      '{"pr_url":"https://example.invalid/pull/42"}\n',
    );
    await write(root, `.agentplane/tasks/${source.id}/pr/diffstat.txt`, "1 file changed\n");
    await write(
      root,
      `.agentplane/tasks/${source.id}/quality/20260402-evaluator/evaluator-result.json`,
      '{"verdict":"pass"}\n',
    );

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
        path.join(root, ".agentplane/tasks/202604040900-CURAT1/source-set.lock.json"),
        "utf8",
      ),
    ).resolves.toContain(`"path": "context/raw/tasks/${source.id}.json"`);
    await expect(
      readFile(
        path.join(
          root,
          ".agentplane/context/derived/proposals/task-knowledge",
          `${proposalId}.json`,
        ),
        "utf8",
      ),
    ).resolves.toContain(`.agentplane/tasks/${source.id}/pr/meta.json#all`);
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
    const tasks = [
      task({
        id: "202604010900-REL001",
        title: "Release gate",
        tags: ["release"],
        description: "Decision: release gates require recorded verification.",
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

  it("does not create a proposal for a completed transient implementation task", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextHarvestTasks({
      ctx: ctx(root, [
        task({
          id: "202604010900-TRANS1",
          title: "Rename a local test helper",
          description: "Rename the helper after a unit-test cleanup.",
        }),
      ]),
      cwd: root,
      parsed: parsed({ writeProposals: true, format: "json" }),
    });

    const payload = JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
      counts: { proposals: number };
      selection_gate: { state: string };
    };
    expect(payload.counts.proposals).toBe(0);
    expect(payload.selection_gate.state).toBe("blocked");
    await expect(
      readdir(path.join(root, ".agentplane/context/derived/proposals/task-knowledge")),
    ).rejects.toThrow();
  });

  it("anchors a late durable signal to the exact captured source line", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const lateDoc = [
      ...Array.from({ length: 80 }, () => "Transient implementation detail."),
      "Decision: retain the explicit source boundary.",
    ].join("\n");

    await cmdContextHarvestTasks({
      ctx: ctx(root, [
        task({
          id: "202604010900-LATE01",
          title: "Document task outcome",
          description: "Capture a completed task outcome.",
          doc: lateDoc,
        }),
      ]),
      cwd: root,
      parsed: parsed({ writeProposals: true, format: "json" }),
    });

    const payload = JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
      source_refs: string[];
    };
    expect(payload.source_refs).toContain(
      "context/raw/tasks/202604010900-LATE01.json#source_text_lines=85",
    );
  });

  it("records canonical duplicate and consolidation evidence before creating CURATOR", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const source = task({
      id: "202604010900-CANON1",
      title: "Release verification contract",
      description: "Decision: release verification contract requires a checked PR.",
    });
    const tasks = [source];
    const observedChecks: unknown[] = [];
    await write(root, `.agentplane/tasks/${source.id}/README.md`, "# Source task\n");
    await write(
      root,
      ".agentplane/context/derived/facts/facts.jsonl",
      '{"id":"fact.release-verification","claim":"Release verification contract requires a checked PR."}\n',
    );

    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ task: [source.id], createExtractionTasks: true }),
      createTask: async ({ ctx: commandCtx, parsed: taskParsed }) => {
        const proposalDir = path.join(root, ".agentplane/context/derived/proposals/task-knowledge");
        const proposalFiles = await readdir(proposalDir);
        const checkName = proposalFiles.find((name) => name.endsWith(".canonical-check.json"));
        expect(checkName).toBeDefined();
        observedChecks.push(
          JSON.parse(await readFile(path.join(proposalDir, checkName ?? ""), "utf8")),
        );
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

    expect(observedChecks).toMatchObject([
      {
        result: "consolidation_required",
        resolution: { state: "recorded", required_action: "semantic_reconciliation" },
        matches: [
          {
            source_ref: ".agentplane/context/derived/facts/facts.jsonl#line=1",
            source_id: "fact.release-verification",
          },
        ],
      },
    ]);
    const proposalDir = path.join(root, ".agentplane/context/derived/proposals/task-knowledge");
    const proposalFiles = await readdir(proposalDir);
    const selectionName = proposalFiles.find((name) => name.endsWith(".selection.json"));
    await expect(readFile(path.join(proposalDir, selectionName ?? ""), "utf8")).resolves.toContain(
      '"result": "consolidation_required"',
    );
    await expect(
      readFile(
        path.join(root, ".agentplane/tasks/202604040900-CURAT1/source-set.lock.json"),
        "utf8",
      ),
    ).resolves.toContain('"path": ".agentplane/context/derived/facts/facts.jsonl"');
  });

  it("reclaims an expired selection lease after an interrupted CURATOR handoff", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const source = task({
      id: "202604010900-STALE1",
      title: "Recover interrupted knowledge selection",
      description: "Decision: stale handoffs require safe recovery.",
    });
    const tasks = [source];
    await write(root, `.agentplane/tasks/${source.id}/README.md`, "# Source task\n");

    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ task: [source.id], writeProposals: true }),
    });
    const proposalDir = path.join(root, ".agentplane/context/derived/proposals/task-knowledge");
    const proposalFiles = await readdir(proposalDir);
    const proposalName = proposalFiles.find((name) => name.endsWith(".json"));
    expect(proposalName).toBeDefined();
    const proposalId = proposalName?.replace(/\.json$/u, "") ?? "";
    const lockPath = path.join(proposalDir, `${proposalId}.selection.lock`);
    await write(
      root,
      path.relative(root, lockPath),
      JSON.stringify({
        schema_version: 1,
        kind: "task_knowledge_proposal_selection_lock",
        owner: { token: "interrupted", pid: 999_999, hostname: "other-host" },
        acquired_at: "1970-01-01T00:00:00.000Z",
        expires_at: "1970-01-01T00:00:01.000Z",
      }),
    );

    const createdTaskIds: string[] = [];
    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ task: [source.id], createExtractionTasks: true }),
      createTask: async ({ ctx: commandCtx, parsed: taskParsed }) => {
        const taskId = "202604040900-CURAT1";
        createdTaskIds.push(taskId);
        await commandCtx.taskBackend.writeTask({
          id: taskId,
          title: taskParsed.title,
          status: "TODO",
          owner: taskParsed.owner,
          priority: taskParsed.priority,
          tags: taskParsed.tags,
          description: taskParsed.description,
          extensions: taskParsed.extensions,
        } as TaskData);
        return taskCreationResult(taskId);
      },
    });

    expect(createdTaskIds).toEqual(["202604040900-CURAT1"]);
    await expect(readFile(lockPath, "utf8")).rejects.toThrow();
  });

  it("reclaims an abandoned selection recovery guard", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const source = task({
      id: "202604010900-GUARD1",
      title: "Recover abandoned selection guard",
      description: "Decision: interrupted selection recovery must stay recoverable.",
    });
    const tasks = [source];
    await write(root, `.agentplane/tasks/${source.id}/README.md`, "# Source task\n");

    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ task: [source.id], writeProposals: true }),
    });
    const proposalDir = path.join(root, ".agentplane/context/derived/proposals/task-knowledge");
    const proposalFiles = await readdir(proposalDir);
    const proposalName = proposalFiles.find((name) => name.endsWith(".json"));
    expect(proposalName).toBeDefined();
    const proposalId = proposalName?.replace(/\.json$/u, "") ?? "";
    const lockPath = path.join(proposalDir, `${proposalId}.selection.lock`);
    await write(
      root,
      path.relative(root, lockPath),
      JSON.stringify({
        schema_version: 1,
        kind: "task_knowledge_proposal_selection_lock",
        owner: { token: "interrupted", pid: 999_999, hostname: "other-host" },
        acquired_at: "1970-01-01T00:00:00.000Z",
        expires_at: "1970-01-01T00:00:01.000Z",
      }),
    );
    await write(
      root,
      path.relative(root, `${lockPath}.reclaim.lock`),
      JSON.stringify({
        schema_version: 1,
        kind: "task_knowledge_proposal_selection_reclaim_guard",
        owner: { token: "crashed-reclaimer", pid: 999_999, hostname: "other-host" },
        acquired_at: "1970-01-01T00:00:00.000Z",
        expires_at: "1970-01-01T00:00:01.000Z",
      }),
    );

    const createdTaskIds: string[] = [];
    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ task: [source.id], createExtractionTasks: true }),
      createTask: async ({ ctx: commandCtx, parsed: taskParsed }) => {
        const taskId = "202604040900-CURAT1";
        createdTaskIds.push(taskId);
        await commandCtx.taskBackend.writeTask({
          id: taskId,
          title: taskParsed.title,
          status: "TODO",
          owner: taskParsed.owner,
          priority: taskParsed.priority,
          tags: taskParsed.tags,
          description: taskParsed.description,
          extensions: taskParsed.extensions,
        } as TaskData);
        return taskCreationResult(taskId);
      },
    });

    expect(createdTaskIds).toEqual(["202604040900-CURAT1"]);
    await expect(readFile(`${lockPath}.reclaim.lock`, "utf8")).rejects.toThrow();
  });

  it("does not reclaim a replacement lock after reading a stale owner", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const source = task({
      id: "202604010900-RACE01",
      title: "Fence stale selection recovery",
      description: "Decision: stale selection recovery must preserve replacement ownership.",
    });
    const tasks = [source];
    await write(root, `.agentplane/tasks/${source.id}/README.md`, "# Source task\n");

    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ task: [source.id], writeProposals: true }),
    });
    const proposalDir = path.join(root, ".agentplane/context/derived/proposals/task-knowledge");
    const proposalFiles = await readdir(proposalDir);
    const proposalName = proposalFiles.find((name) => name.endsWith(".json"));
    expect(proposalName).toBeDefined();
    const proposalId = proposalName?.replace(/\.json$/u, "") ?? "";
    const lockPath = path.join(proposalDir, `${proposalId}.selection.lock`);
    await write(
      root,
      path.relative(root, lockPath),
      JSON.stringify({
        schema_version: 1,
        kind: "task_knowledge_proposal_selection_lock",
        owner: { token: "interrupted", pid: 999_999, hostname: "other-host" },
        acquired_at: "1970-01-01T00:00:00.000Z",
        expires_at: "1970-01-01T00:00:01.000Z",
      }),
    );

    let resumeReclaim: (() => void) | undefined;
    const reclaimPaused = new Promise<void>((resolve) => {
      resumeReclaim = resolve;
    });
    let signalStaleRead: (() => void) | undefined;
    const staleRead = new Promise<void>((resolve) => {
      signalStaleRead = resolve;
    });
    const first = cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ task: [source.id], createExtractionTasks: true }),
      selectionLockTestHooks: {
        afterStaleLockRead: async ({ ownerToken }) => {
          expect(ownerToken).toBe("interrupted");
          signalStaleRead?.();
          await reclaimPaused;
        },
      },
    });
    await staleRead;

    await rm(lockPath);
    let allowReplacement: (() => void) | undefined;
    const replacementAllowed = new Promise<void>((resolve) => {
      allowReplacement = resolve;
    });
    let signalReplacementAcquired: (() => void) | undefined;
    const replacementAcquired = new Promise<void>((resolve) => {
      signalReplacementAcquired = resolve;
    });
    const createdTaskIds: string[] = [];
    const second = cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ task: [source.id], createExtractionTasks: true }),
      createTask: async ({ ctx: commandCtx, parsed: taskParsed }) => {
        signalReplacementAcquired?.();
        await replacementAllowed;
        const taskId = "202604040900-CURAT1";
        createdTaskIds.push(taskId);
        await commandCtx.taskBackend.writeTask({
          id: taskId,
          title: taskParsed.title,
          status: "TODO",
          owner: taskParsed.owner,
          priority: taskParsed.priority,
          tags: taskParsed.tags,
          description: taskParsed.description,
          extensions: taskParsed.extensions,
        } as TaskData);
        return taskCreationResult(taskId);
      },
    });
    await replacementAcquired;
    const replacementLock = await readFile(lockPath, "utf8");
    expect(replacementLock).not.toContain("interrupted");

    resumeReclaim?.();
    await expect(first).rejects.toThrow(/live CURATOR selection/u);
    await expect(readFile(lockPath, "utf8")).resolves.toBe(replacementLock);

    allowReplacement?.();
    await second;
    expect(createdTaskIds).toEqual(["202604040900-CURAT1"]);
  });

  it("does not reclaim an expired lease while its local owner is still alive", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const source = task({
      id: "202604010900-LIVE01",
      title: "Keep active selection exclusive",
      description: "Decision: an active CURATOR selection remains exclusive.",
    });
    const tasks = [source];
    await write(root, `.agentplane/tasks/${source.id}/README.md`, "# Source task\n");

    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ task: [source.id], writeProposals: true }),
    });
    const proposalDir = path.join(root, ".agentplane/context/derived/proposals/task-knowledge");
    const proposalFiles = await readdir(proposalDir);
    const proposalName = proposalFiles.find((name) => name.endsWith(".json"));
    expect(proposalName).toBeDefined();
    const proposalId = proposalName?.replace(/\.json$/u, "") ?? "";
    await write(
      root,
      path.join(
        ".agentplane/context/derived/proposals/task-knowledge",
        `${proposalId}.selection.lock`,
      ),
      JSON.stringify({
        schema_version: 1,
        kind: "task_knowledge_proposal_selection_lock",
        owner: { token: "live-owner", pid: process.pid, hostname: os.hostname() },
        acquired_at: "1970-01-01T00:00:00.000Z",
        expires_at: "1970-01-01T00:00:01.000Z",
      }),
    );

    await expect(
      cmdContextHarvestTasks({
        ctx: ctx(root, tasks),
        cwd: root,
        parsed: parsed({ task: [source.id], createExtractionTasks: true }),
      }),
    ).rejects.toThrow(/live CURATOR selection/u);
  });

  it("freezes the canonical check under the selection lease before writing the CURATOR source lock", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const source = task({
      id: "202604010900-FREEZE",
      title: "Freeze canonical selection evidence",
      description: "Decision: canonical evidence must stay immutable during selection.",
    });
    const tasks = [source];
    await write(root, `.agentplane/tasks/${source.id}/README.md`, "# Source task\n");
    let allowCreation: (() => void) | undefined;
    const creationAllowed = new Promise<void>((resolve) => {
      allowCreation = resolve;
    });
    let signalCreation: (() => void) | undefined;
    const creationStarted = new Promise<void>((resolve) => {
      signalCreation = resolve;
    });

    const first = cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ task: [source.id], createExtractionTasks: true }),
      createTask: async ({ ctx: commandCtx, parsed: taskParsed }) => {
        signalCreation?.();
        await creationAllowed;
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
    await creationStarted;

    await expect(
      cmdContextHarvestTasks({
        ctx: ctx(root, tasks),
        cwd: root,
        parsed: parsed({ task: [source.id], createExtractionTasks: true }),
      }),
    ).rejects.toThrow(/live CURATOR selection/u);

    allowCreation?.();
    await first;

    const proposalDir = path.join(root, ".agentplane/context/derived/proposals/task-knowledge");
    const proposalFiles = await readdir(proposalDir);
    const checkName = proposalFiles.find((name) => name.endsWith(".canonical-check.json"));
    expect(checkName).toBeDefined();
    const checkPath = path.join(proposalDir, checkName ?? "");
    const checkContent = await readFile(checkPath);
    const sourceLock = JSON.parse(
      await readFile(
        path.join(root, ".agentplane/tasks/202604040900-CURAT1/source-set.lock.json"),
        "utf8",
      ),
    ) as { files: { path: string; sha256: string }[] };
    const checkSha256 = `sha256:${createHash("sha256").update(checkContent).digest("hex")}`;
    expect(
      sourceLock.files.find((file) => file.path === path.relative(root, checkPath))?.sha256,
    ).toBe(checkSha256);
    const selectionName = proposalFiles.find((name) => name.endsWith(".selection.json"));
    const selection = JSON.parse(
      await readFile(path.join(proposalDir, selectionName ?? ""), "utf8"),
    ) as { canonical_check: { sha256: string } };
    expect(selection.canonical_check.sha256).toBe(checkSha256);
  });

  it("keeps one CURATOR owner when the same proposal is selected concurrently", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const source = task({
      id: "202604010900-LOCK01",
      title: "Keep one CURATOR owner",
      description: "Decision: this proposal has one CURATOR owner.",
    });
    const tasks = [source];
    const createdTaskIds: string[] = [];
    await write(root, `.agentplane/tasks/${source.id}/README.md`, "# Source task\n");

    const createTask = async ({
      ctx: commandCtx,
      parsed: taskParsed,
    }: {
      ctx: CommandContext;
      parsed: {
        title: string;
        owner: string;
        priority: string;
        tags: string[];
        description: string;
        extensions: Record<string, unknown>;
      };
    }) => {
      const taskId = `202604040900-CURAT${createdTaskIds.length + 1}`;
      createdTaskIds.push(taskId);
      await commandCtx.taskBackend.writeTask({
        id: taskId,
        title: taskParsed.title,
        status: "TODO",
        owner: taskParsed.owner,
        priority: taskParsed.priority,
        tags: taskParsed.tags,
        description: taskParsed.description,
        extensions: taskParsed.extensions,
      } as TaskData);
      return taskCreationResult(taskId);
    };

    const selection = () =>
      cmdContextHarvestTasks({
        ctx: ctx(root, tasks),
        cwd: root,
        parsed: parsed({ task: [source.id], createExtractionTasks: true }),
        createTask: createTask as never,
      });
    const results = await Promise.allSettled([selection(), selection()]);

    expect(results.filter((result) => result.status === "fulfilled")).toHaveLength(1);
    expect(results.filter((result) => result.status === "rejected")).toHaveLength(1);
    expect(createdTaskIds).toHaveLength(1);
    expect(tasks.find((row) => row.id === source.id)?.extensions).toMatchObject({
      context_task_extraction: { extraction_task_id: createdTaskIds[0] },
    });
  });

  it("adopts a CURATOR task left between creation and selection receipts", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const source = task({
      id: "202604010900-ADOPT1",
      title: "Adopt interrupted CURATOR task",
      description: "Decision: CURATOR task creation must be idempotent after interruption.",
    });
    const tasks = [source];
    await write(root, `.agentplane/tasks/${source.id}/README.md`, "# Source task\n");

    await expect(
      cmdContextHarvestTasks({
        ctx: ctx(root, tasks),
        cwd: root,
        parsed: parsed({ task: [source.id], createExtractionTasks: true }),
        createTask: async ({ ctx: commandCtx, parsed: taskParsed }) => {
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
          throw new Error("interrupted after CURATOR task creation");
        },
      }),
    ).rejects.toThrow("interrupted after CURATOR task creation");

    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ task: [source.id], createExtractionTasks: true }),
      createTask: () => Promise.reject(new Error("retry must adopt the already-created CURATOR task")),
    });

    expect(tasks.filter((candidate) => candidate.owner === "CURATOR")).toHaveLength(1);
    expect(tasks.find((candidate) => candidate.id === source.id)?.extensions).toMatchObject({
      context_task_extraction: { extraction_task_id: "202604040900-CURAT1" },
    });
    await expect(
      readFile(path.join(root, ".agentplane/tasks/202604040900-CURAT1/source-set.lock.json"), "utf8"),
    ).resolves.toContain(`.agentplane/tasks/${source.id}/README.md`);
    const proposalDir = path.join(root, ".agentplane/context/derived/proposals/task-knowledge");
    const proposalFiles = await readdir(proposalDir);
    const intentName = proposalFiles.find((name) => name.endsWith(".selection.intent.json"));
    await expect(readFile(path.join(proposalDir, intentName ?? ""), "utf8")).resolves.toContain(
      '"state": "created"',
    );
  });
});
