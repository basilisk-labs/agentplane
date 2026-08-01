import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { loadConfig } from "@agentplaneorg/core/config";
import { resolveProject } from "@agentplaneorg/core/project";
import { captureStdIO, mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it, vi } from "vitest";

import { evaluatorRunSpec } from "../../commands/evaluator/evaluator.spec.js";
import { createEvaluatorArtifactPreparationPort } from "../../commands/evaluator/evaluator-artifact-port.js";
import { addTask, commitPath } from "../../commands/evaluator/evaluator-test-helpers.js";
import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { parseCommandArgv } from "../spec/parse.js";
import { findCommandEntry } from "./command-catalog.js";
import {
  CONTEXT_TASK_WRITE_REQUIREMENTS,
  EVALUATOR_PREPARE_REQUIREMENTS,
  EVALUATOR_READ_REQUIREMENTS,
  EVALUATOR_WRITE_REQUIREMENTS,
} from "./command-catalog/context-evaluator-capability-profiles.js";
import {
  declareSessionCommand,
  type CommandCapability,
  type CommandEntry,
  type CommandSession,
} from "./command-catalog/kernel.js";
import { buildRegistry } from "./registry.run.js";

function evaluatorRunParsed(noRecord: boolean) {
  return parseCommandArgv(evaluatorRunSpec, [
    "TASK-1",
    "--provenance",
    "human_supplied",
    "--verdict",
    "pass",
    "--summary",
    "Reviewed evaluator authority selection.",
    "--finding",
    "The selected session matches the requested persistence mode.",
    "--evidence",
    "src/review-target.ts",
    ...(noRecord ? ["--no-record"] : []),
  ]).parsed;
}

describe("runtime registry session selection", () => {
  it("isolates capabilities, contexts, and artifact destinations across concurrent dispatches", async () => {
    const capabilityProfiles = new Map<string, CommandCapability[][]>();
    const readContexts: unknown[] = [];
    const mutationContexts: unknown[] = [];
    const artifactDestinations: string[] = [];
    const captureProfile = (command: string, requirements: readonly CommandCapability[]) => {
      const profiles = capabilityProfiles.get(command) ?? [];
      profiles.push([...requirements]);
      capabilityProfiles.set(command, profiles);
    };

    const evaluatorReadEntry = declareSessionCommand(
      {
        id: ["test", "evaluator-read"],
        group: "test",
        summary: "Exercise read-only evaluator authority.",
      },
      {
        requirements: EVALUATOR_READ_REQUIREMENTS,
        load: async (session) => {
          captureProfile("evaluator-read", session.requirements);
          return async () => {
            readContexts.push(await session.require("task.read", "test evaluator-read"));
            return 0;
          };
        },
      },
    );
    const evaluatorPrepareEntry = declareSessionCommand(
      {
        id: ["test", "evaluator-prepare"],
        group: "test",
        summary: "Exercise evaluator artifact preparation authority.",
      },
      {
        requirements: EVALUATOR_PREPARE_REQUIREMENTS,
        load: async (session) => {
          captureProfile("evaluator-prepare", session.requirements);
          return async () => {
            const port = await session.require(
              "evaluator.artifacts.write",
              "test evaluator-prepare",
            );
            const packet = await port.prepare({
              ctx: { cwd: "/repo" },
              taskId: "TASK-1",
              evaluatorId: "recovery-context",
              provenance: "evaluator_supplied",
            });
            artifactDestinations.push(packet.git_root);
            return 0;
          };
        },
      },
    );
    const contextMutationEntry = declareSessionCommand(
      {
        id: ["test", "context-mutation"],
        group: "test",
        summary: "Exercise context mutation authority.",
      },
      {
        requirements: CONTEXT_TASK_WRITE_REQUIREMENTS,
        load: async (session) => {
          captureProfile("context-mutation", session.requirements);
          return async () => {
            mutationContexts.push(await session.require("task.write", "test context-mutation"));
            return 0;
          };
        },
      },
    );

    let contextIndex = 0;
    let artifactIndex = 0;
    const getCtx = vi.fn(async () => ({ invocation: `context-${contextIndex++}` }) as never);
    const getEvaluatorArtifactPort = vi.fn(async () => {
      const destination = `/repo/.agentplane/tasks/TASK-${artifactIndex++}/quality/review`;
      return Object.freeze({
        prepare: async () => ({ git_root: destination, prepared: {} }),
      }) as never;
    });
    const registry = buildRegistry({
      entries: [evaluatorReadEntry, evaluatorPrepareEntry, contextMutationEntry],
      getCtx,
      getResolvedProject: vi.fn(async () => ({ marker: "project" }) as never),
      getLoadedConfig: vi.fn(async () => ({ marker: "config" }) as never),
      getEvaluatorArtifactPort,
    });
    const evaluatorRead = registry.lookup(["test", "evaluator-read"]);
    const evaluatorPrepare = registry.lookup(["test", "evaluator-prepare"]);
    const contextMutation = registry.lookup(["test", "context-mutation"]);
    if (!evaluatorRead || !evaluatorPrepare || !contextMutation) {
      throw new Error("concurrent isolation commands were not registered");
    }

    await Promise.all([
      evaluatorRead.handler({ cwd: "/repo" }, {}),
      evaluatorPrepare.handler({ cwd: "/repo" }, {}),
      contextMutation.handler({ cwd: "/repo" }, {}),
      evaluatorRead.handler({ cwd: "/repo" }, {}),
      evaluatorPrepare.handler({ cwd: "/repo" }, {}),
      contextMutation.handler({ cwd: "/repo" }, {}),
    ]);

    expect(capabilityProfiles.get("evaluator-read")).toEqual([
      EVALUATOR_READ_REQUIREMENTS,
      EVALUATOR_READ_REQUIREMENTS,
    ]);
    expect(capabilityProfiles.get("evaluator-prepare")).toEqual([
      EVALUATOR_PREPARE_REQUIREMENTS,
      EVALUATOR_PREPARE_REQUIREMENTS,
    ]);
    expect(capabilityProfiles.get("context-mutation")).toEqual([
      CONTEXT_TASK_WRITE_REQUIREMENTS,
      CONTEXT_TASK_WRITE_REQUIREMENTS,
    ]);
    expect(new Set([...readContexts, ...mutationContexts])).toHaveLength(4);
    expect(new Set(artifactDestinations)).toHaveLength(2);
    expect(getCtx).toHaveBeenCalledTimes(4);
    expect(getEvaluatorArtifactPort).toHaveBeenCalledTimes(2);
  });

  it("constructs evaluator run authority from parsed persistence mode before loading its handler", async () => {
    const catalogEntry = findCommandEntry(["evaluator", "run"]);
    if (!catalogEntry?.selectSession) throw new Error("evaluator run must select a session");
    const observed: CommandCapability[][] = [];
    const getCtx = vi.fn(() => Promise.resolve({ marker: "command-context" } as never));
    const getEvaluatorArtifactPort = vi.fn(() => Promise.resolve({ prepare: vi.fn() } as never));
    const entry: CommandEntry = {
      ...catalogEntry,
      selectSession: (parsed) => {
        const selected = catalogEntry.selectSession?.(parsed);
        if (!selected) throw new Error("evaluator run did not select a session");
        return {
          ...selected,
          load: (session) => {
            observed.push([...session.requirements]);
            return Promise.resolve(async () => {
              if ((parsed as { record: boolean }).record) return 0;
              await session.require("evaluator.artifacts.write", "evaluator run --no-record");
              const unsafe = session as CommandSession<CommandCapability>;
              for (const capability of [
                "backend.write",
                "task.write",
                "git.mutate",
                "approvals",
              ] as const) {
                await expect(
                  unsafe.require(capability, "evaluator run --no-record"),
                ).rejects.toMatchObject({ code: "E_INTERNAL" });
              }
              return 0;
            });
          },
        };
      },
    };
    const registry = buildRegistry({
      entries: [entry],
      getCtx,
      getResolvedProject: vi.fn(() => Promise.resolve({ marker: "project" } as never)),
      getLoadedConfig: vi.fn(() => Promise.resolve({ marker: "config" } as never)),
      getEvaluatorArtifactPort,
    });
    const runtime = registry.lookup(["evaluator", "run"]);
    if (!runtime) throw new Error("runtime registry did not register evaluator run");

    await runtime.handler({ cwd: "/repo" }, evaluatorRunParsed(true));
    expect(observed.at(-1)).toEqual(EVALUATOR_PREPARE_REQUIREMENTS);
    expect(getCtx).not.toHaveBeenCalled();
    expect(getEvaluatorArtifactPort).toHaveBeenCalledOnce();

    await runtime.handler({ cwd: "/repo" }, evaluatorRunParsed(false));
    expect(observed.at(-1)).toEqual(EVALUATOR_WRITE_REQUIREMENTS);
  });

  it("dispatches the real no-record handler with artifact-only write authority", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202608010000-EVRN";
    await addTask(root, taskId);
    await commitPath(root, "src/review-target.ts", "export const target = true;\n", "feat: target");
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const readmeBefore = await readFile(readmePath, "utf8");
    const resolvedProject = await resolveProject({ cwd: root, rootOverride: root });
    const loadedConfig = await loadConfig(resolvedProject.agentplaneDir);
    const commandContext = await loadCommandContext({ cwd: root, rootOverride: root });
    const artifactPort = createEvaluatorArtifactPreparationPort(commandContext);
    const getCtx = vi.fn(() => Promise.reject(new Error("full CommandContext must stay confined")));
    const traces: { capability: CommandCapability; status: string }[] = [];
    const entry = findCommandEntry(["evaluator", "run"]);
    if (!entry) throw new Error("evaluator run catalog entry is missing");
    const registry = buildRegistry({
      entries: [entry],
      getCtx,
      getResolvedProject: () => Promise.resolve(resolvedProject),
      getLoadedConfig: () => Promise.resolve(loadedConfig),
      getEvaluatorArtifactPort: () => Promise.resolve(artifactPort),
      onPreparationTrace: (event) => traces.push(event),
    });
    const runtime = registry.lookup(["evaluator", "run"]);
    if (!runtime) throw new Error("runtime registry did not register evaluator run");
    const io = captureStdIO();
    try {
      await runtime.handler(
        { cwd: root, rootOverride: root },
        {
          ...evaluatorRunParsed(true),
          taskId,
        },
      );
    } finally {
      io.restore();
    }

    expect(await readFile(readmePath, "utf8")).toBe(readmeBefore);
    const qualityRoot = path.join(root, ".agentplane", "tasks", taskId, "quality");
    const reviewDirectories = await readdir(qualityRoot);
    expect(reviewDirectories).toHaveLength(1);
    const packetFiles = await readdir(path.join(qualityRoot, reviewDirectories[0] ?? ""));
    expect(packetFiles).toEqual(
      expect.arrayContaining([
        "evaluator-diff.patch",
        "evaluator-observed-checks.json",
        "evaluator-prompt.md",
        "evaluator-work-order.json",
      ]),
    );
    expect(traces).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          capability: "evaluator.artifacts.write",
          status: "resolved",
        }),
      ]),
    );
    expect(traces.some((event) => event.capability === "task.write")).toBe(false);
    expect(getCtx).not.toHaveBeenCalled();
    expect(Object.keys(artifactPort)).toEqual(["prepare"]);
    expect(Object.isFrozen(artifactPort)).toBe(true);
    expect(Reflect.get(artifactPort, "git")).toBeUndefined();
    expect(Reflect.get(artifactPort, "taskBackend")).toBeUndefined();
    expect(Reflect.get(artifactPort, "writeFile")).toBeUndefined();
    await expect(
      artifactPort.prepare({
        ctx: { cwd: root, rootOverride: root },
        taskId: "../outside-task",
        evaluatorId: "recovery-context",
        provenance: "evaluator_supplied",
      }),
    ).rejects.toThrow();
  });
});
