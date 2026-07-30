import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import { cmdContextHarvestTasks, type ContextHarvestTasksParsed } from "./harvest-tasks.js";

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

describe("context harvest tasks recovery", () => {
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
      createTask: () =>
        Promise.reject(new Error("retry must adopt the already-created CURATOR task")),
    });

    expect(tasks.filter((candidate) => candidate.owner === "CURATOR")).toHaveLength(1);
    expect(tasks.find((candidate) => candidate.id === source.id)?.extensions).toMatchObject({
      context_task_extraction: { extraction_task_id: "202604040900-CURAT1" },
    });
    await expect(
      readFile(
        path.join(root, ".agentplane/tasks/202604040900-CURAT1/source-set.lock.json"),
        "utf8",
      ),
    ).resolves.toContain(`.agentplane/tasks/${source.id}/README.md`);
    const proposalDir = path.join(root, ".agentplane/context/derived/proposals/task-knowledge");
    const proposalFiles = await readdir(proposalDir);
    const intentName = proposalFiles.find((name) => name.endsWith(".selection.intent.json"));
    await expect(readFile(path.join(proposalDir, intentName ?? ""), "utf8")).resolves.toContain(
      '"state": "created"',
    );
  });

  it("completes the receipt after an interruption immediately after the source marker", async () => {
    const root = await tempRoot();
    await initContextWorkspace(root);
    const source = task({
      id: "202604010900-MARKER",
      title: "Recover a marker-only CURATOR handoff",
      description: "Decision: a partial CURATOR handoff must converge to one durable receipt.",
    });
    const tasks = [source];
    await write(root, `.agentplane/tasks/${source.id}/README.md`, "# Source task\n");
    const interruptedContext = ctx(root, tasks);
    const writeTask = interruptedContext.taskBackend.writeTask.bind(interruptedContext.taskBackend);
    interruptedContext.taskBackend.writeTask = async (updated) => {
      await writeTask(updated);
      const extensions = updated.extensions as Record<string, unknown> | undefined;
      if (updated.id === source.id && extensions?.context_task_extraction) {
        throw new Error("interrupted after source selection marker");
      }
    };

    await expect(
      cmdContextHarvestTasks({
        ctx: interruptedContext,
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
          return taskCreationResult("202604040900-CURAT1");
        },
      }),
    ).rejects.toThrow("interrupted after source selection marker");

    const proposalDir = path.join(root, ".agentplane/context/derived/proposals/task-knowledge");
    const filesBeforeRecovery = await readdir(proposalDir);
    expect(filesBeforeRecovery.some((name) => name.endsWith(".selection.json"))).toBe(false);
    expect(tasks.find((candidate) => candidate.id === source.id)?.extensions).toMatchObject({
      context_task_extraction: { extraction_task_id: "202604040900-CURAT1" },
    });

    await cmdContextHarvestTasks({
      ctx: ctx(root, tasks),
      cwd: root,
      parsed: parsed({ task: [source.id], createExtractionTasks: true }),
      createTask: () => Promise.reject(new Error("retry must adopt the marker-owned CURATOR task")),
    });

    expect(tasks.filter((candidate) => candidate.owner === "CURATOR")).toHaveLength(1);
    const filesAfterRecovery = await readdir(proposalDir);
    const receiptName = filesAfterRecovery.find((name) => name.endsWith(".selection.json"));
    await expect(readFile(path.join(proposalDir, receiptName ?? ""), "utf8")).resolves.toContain(
      '"curator_task_id": "202604040900-CURAT1"',
    );
    await expect(
      cmdContextHarvestTasks({
        ctx: ctx(root, tasks),
        cwd: root,
        parsed: parsed({ task: [source.id], createExtractionTasks: true }),
        createTask: () =>
          Promise.reject(new Error("completed selections must not create a second task")),
      }),
    ).rejects.toThrow(/already owned by CURATOR task 202604040900-CURAT1/u);
  });
});
