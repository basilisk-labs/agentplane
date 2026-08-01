import { describe, expect, it, vi } from "vitest";

import {
  createCommandSession,
  declareSessionCommand,
  type CommandCapability,
  type CommandSession,
} from "./kernel.js";
import { TASK_LIFECYCLE_REQUIREMENTS, TASK_READ_REQUIREMENTS } from "./task-capability-profiles.js";
import {
  PROJECT_CONFIG_REQUIREMENTS,
  PROJECT_REQUIREMENTS,
} from "./project-capability-profiles.js";
import {
  INTEGRATION_QUEUE_LIST_REQUIREMENTS,
  INTEGRATION_QUEUE_PROVIDER_READ_REQUIREMENTS,
  LOCAL_OPS_WRITE_REQUIREMENTS,
  PROVIDER_READ_REQUIREMENTS,
} from "./provider-ops-capability-profiles.js";
import {
  HERMES_PROJECTION_REQUIREMENTS,
  HERMES_REMOTE_PREPARATION_REQUIREMENTS,
  RUNNER_PREPARATION_REQUIREMENTS,
} from "./runner-hermes-capability-profiles.js";
import {
  CONTEXT_PROJECT_REQUIREMENTS,
  CONTEXT_TASK_READ_REQUIREMENTS,
  EVALUATOR_PREPARE_REQUIREMENTS,
  EVALUATOR_READ_REQUIREMENTS,
  EVALUATOR_WRITE_REQUIREMENTS,
} from "./context-evaluator-capability-profiles.js";

const commandContext = { marker: "command-context" };
const project = { marker: "project" };
const config = { marker: "config" };
const evaluatorArtifactPort = { prepare: vi.fn() };
const zeroHandler = () => Promise.resolve(0);

function makeResolvers() {
  return {
    getCtx: vi.fn(() => Promise.resolve(commandContext)),
    getResolvedProject: vi.fn(() => Promise.resolve(project)),
    getLoadedConfig: vi.fn(() => Promise.resolve(config)),
    getEvaluatorArtifactPort: vi.fn(() => Promise.resolve(evaluatorArtifactPort as never)),
    getHelpJsonForDocs: vi.fn(() => []),
  };
}

describe("CommandSession", () => {
  it("resolves only declared preparation nodes and reuses them", async () => {
    const resolvers = makeResolvers();
    const session = createCommandSession({
      command: "agents",
      requirements: ["project"] as const,
      resolvers,
    });

    await expect(session.require("project", "agents")).resolves.toBe(project);
    await expect(session.require("project", "agents")).resolves.toBe(project);

    expect(resolvers.getResolvedProject).toHaveBeenCalledTimes(1);
    expect(resolvers.getLoadedConfig).not.toHaveBeenCalled();
    expect(resolvers.getCtx).not.toHaveBeenCalled();
    expect(resolvers.getHelpJsonForDocs).not.toHaveBeenCalled();
    expect(session.trace().map((event) => [event.capability, event.node, event.status])).toEqual([
      ["project", "project", "resolved"],
      ["project", "project", "reused"],
    ]);
  });

  it("coalesces granular context capabilities onto the current legacy context node", async () => {
    const resolvers = makeResolvers();
    const session = createCommandSession({
      command: "pr check",
      requirements: ["project", "config", "task.read", "route.remote", "provider"] as const,
      resolvers,
    });

    const routeContext = await session.require("route.remote", "pr check");
    const providerContext = await session.require("provider", "pr check");
    expect(routeContext).toBe(providerContext);
    expect(routeContext).not.toBe(commandContext);
    expect(Reflect.get(routeContext, "marker")).toBe("command-context");

    expect(resolvers.getResolvedProject).toHaveBeenCalledTimes(1);
    expect(resolvers.getLoadedConfig).toHaveBeenCalledTimes(1);
    expect(resolvers.getCtx).toHaveBeenCalledTimes(1);
    expect(session.trace().map((event) => [event.capability, event.node, event.status])).toEqual([
      ["project", "project", "resolved"],
      ["config", "config", "resolved"],
      ["route.remote", "command_context", "resolved"],
      ["provider", "command_context", "reused"],
    ]);
  });

  it("returns a typed E_INTERNAL denial before an undeclared resolver can run", async () => {
    const resolvers = makeResolvers();
    const session = createCommandSession({
      command: "agents",
      requirements: ["project"] as const,
      resolvers,
    });
    const unsafe = session as CommandSession<CommandCapability>;

    let thrown: unknown;
    try {
      await unsafe.require("provider", "agents");
    } catch (error) {
      thrown = error;
    }
    expect(thrown).toMatchObject({ code: "E_INTERNAL" });
    expect(thrown).toBeInstanceOf(Error);
    expect((thrown as Error).message).toContain('undeclared capability "provider"');
    expect(resolvers.getCtx).not.toHaveBeenCalled();
    expect(session.trace().at(-1)).toMatchObject({
      capability: "provider",
      node: "command_context",
      status: "denied",
    });
  });

  it("keeps output synchronous, lazy, and independently traceable", () => {
    const resolvers = makeResolvers();
    const session = createCommandSession({
      command: "docs cli",
      requirements: ["output"] as const,
      resolvers,
    });

    expect(session.getHelpJsonForDocs()).toEqual([]);
    expect(session.getHelpJsonForDocs()).toEqual([]);
    expect(resolvers.getHelpJsonForDocs).toHaveBeenCalledTimes(1);
    expect(resolvers.getResolvedProject).not.toHaveBeenCalled();
    expect(resolvers.getLoadedConfig).not.toHaveBeenCalled();
    expect(resolvers.getCtx).not.toHaveBeenCalled();
    expect(session.trace().map((event) => event.status)).toEqual(["resolved", "reused"]);
  });

  it("makes undeclared session access a compile-time error", () => {
    declareSessionCommand(
      {
        id: ["typed", "pilot"],
        summary: "Compile-time CommandSession pilot.",
        parse: () => ({}),
      },
      {
        requirements: ["project"] as const,
        load: async (session) => {
          await session.require("project", "typed pilot");
          // @ts-expect-error provider is not declared by this command
          await session.require("provider", "typed pilot");
          return zeroHandler;
        },
      },
    );
  });

  it("rejects incomplete capability dependency declarations", () => {
    expect(() =>
      createCommandSession({
        command: "invalid",
        requirements: ["provider"] as const,
        resolvers: makeResolvers(),
      }),
    ).toThrow("require the config capability");
  });

  it("denies undeclared task-family Git and provider access before context preparation", async () => {
    const readResolvers = makeResolvers();
    const readSession = createCommandSession({
      command: "task show",
      requirements: TASK_READ_REQUIREMENTS,
      resolvers: readResolvers,
    }) as CommandSession<CommandCapability>;

    await expect(readSession.require("git.mutate", "task show")).rejects.toMatchObject({
      code: "E_INTERNAL",
    });
    expect(readResolvers.getCtx).not.toHaveBeenCalled();

    const lifecycleResolvers = makeResolvers();
    const lifecycleSession = createCommandSession({
      command: "finish",
      requirements: TASK_LIFECYCLE_REQUIREMENTS,
      resolvers: lifecycleResolvers,
    }) as CommandSession<CommandCapability>;

    await expect(lifecycleSession.require("provider", "finish")).rejects.toMatchObject({
      code: "E_INTERNAL",
    });
    expect(lifecycleResolvers.getCtx).not.toHaveBeenCalled();
  });

  it("denies task and provider access from project/config sessions before context preparation", async () => {
    for (const requirements of [PROJECT_REQUIREMENTS, PROJECT_CONFIG_REQUIREMENTS]) {
      const resolvers = makeResolvers();
      const session = createCommandSession({
        command: "config show",
        requirements,
        resolvers,
      }) as CommandSession<CommandCapability>;

      await expect(session.require("task.read", "config show")).rejects.toMatchObject({
        code: "E_INTERNAL",
      });
      await expect(session.require("provider", "config show")).rejects.toMatchObject({
        code: "E_INTERNAL",
      });
      expect(resolvers.getCtx).not.toHaveBeenCalled();
    }
  });

  it("denies undeclared provider mutation and local-ops network access", async () => {
    const providerReadResolvers = makeResolvers();
    const providerReadSession = createCommandSession({
      command: "pr check",
      requirements: PROVIDER_READ_REQUIREMENTS,
      resolvers: providerReadResolvers,
    }) as CommandSession<CommandCapability>;

    await expect(providerReadSession.require("git.mutate", "pr check")).rejects.toMatchObject({
      code: "E_INTERNAL",
    });
    await expect(providerReadSession.require("task.write", "pr check")).rejects.toMatchObject({
      code: "E_INTERNAL",
    });
    expect(providerReadResolvers.getCtx).not.toHaveBeenCalled();

    const queueListResolvers = makeResolvers();
    const queueListSession = createCommandSession({
      command: "integrate queue list",
      requirements: INTEGRATION_QUEUE_LIST_REQUIREMENTS,
      resolvers: queueListResolvers,
    }) as CommandSession<CommandCapability>;
    for (const capability of [
      "backend.write",
      "task.write",
      "git.mutate",
      "route.remote",
      "provider",
    ] as const) {
      await expect(
        queueListSession.require(capability, "integrate queue list"),
      ).rejects.toMatchObject({ code: "E_INTERNAL" });
    }
    expect(queueListResolvers.getCtx).not.toHaveBeenCalled();

    const queueClaimResolvers = makeResolvers();
    const queueClaimSession = createCommandSession({
      command: "integrate queue claim",
      requirements: INTEGRATION_QUEUE_PROVIDER_READ_REQUIREMENTS,
      resolvers: queueClaimResolvers,
    }) as CommandSession<CommandCapability>;
    for (const capability of ["task.read", "task.write", "git.mutate"] as const) {
      await expect(
        queueClaimSession.require(capability, "integrate queue claim"),
      ).rejects.toMatchObject({ code: "E_INTERNAL" });
    }
    expect(queueClaimResolvers.getCtx).not.toHaveBeenCalled();

    const localOpsResolvers = makeResolvers();
    const localOpsSession = createCommandSession({
      command: "work start",
      requirements: LOCAL_OPS_WRITE_REQUIREMENTS,
      resolvers: localOpsResolvers,
    }) as CommandSession<CommandCapability>;

    await expect(localOpsSession.require("provider", "work start")).rejects.toMatchObject({
      code: "E_INTERNAL",
    });
    await expect(localOpsSession.require("route.remote", "work start")).rejects.toMatchObject({
      code: "E_INTERNAL",
    });
    expect(localOpsResolvers.getCtx).not.toHaveBeenCalled();
  });

  it("denies cross-phase runner and Hermes capabilities before context preparation", async () => {
    const runnerResolvers = makeResolvers();
    const runnerPreparationSession = createCommandSession({
      command: "task run --dry-run",
      requirements: RUNNER_PREPARATION_REQUIREMENTS,
      resolvers: runnerResolvers,
    }) as CommandSession<CommandCapability>;

    expect(runnerPreparationSession.requirements).not.toContain("git.mutate");
    expect(runnerPreparationSession.requirements).not.toContain("provider");
    await expect(
      runnerPreparationSession.require("git.mutate", "task run --dry-run"),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });
    await expect(
      runnerPreparationSession.require("provider", "task run --dry-run"),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });
    expect(runnerResolvers.getCtx).not.toHaveBeenCalled();

    const hermesResolvers = makeResolvers();
    const hermesProjectionSession = createCommandSession({
      command: "hermes enqueue",
      requirements: HERMES_PROJECTION_REQUIREMENTS,
      resolvers: hermesResolvers,
    }) as CommandSession<CommandCapability>;

    await expect(
      hermesProjectionSession.require("provider", "hermes enqueue"),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });
    await expect(
      hermesProjectionSession.require("git.mutate", "hermes enqueue"),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });
    expect(hermesResolvers.getCtx).not.toHaveBeenCalled();

    const hermesInspectResolvers = makeResolvers();
    const hermesInspectSession = createCommandSession({
      command: "hermes supervise",
      requirements: HERMES_PROJECTION_REQUIREMENTS,
      resolvers: hermesInspectResolvers,
    }) as CommandSession<CommandCapability>;
    await expect(
      hermesInspectSession.require("provider", "hermes supervise"),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });
    await expect(
      hermesInspectSession.require("git.mutate", "hermes supervise"),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });
    expect(hermesInspectResolvers.getCtx).not.toHaveBeenCalled();

    const hermesRemoteResolvers = makeResolvers();
    const hermesRemoteSession = createCommandSession({
      command: "hermes supervise --remote",
      requirements: HERMES_REMOTE_PREPARATION_REQUIREMENTS,
      resolvers: hermesRemoteResolvers,
    }) as CommandSession<CommandCapability>;
    await expect(
      hermesRemoteSession.require("provider", "hermes supervise --remote"),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });
    await expect(
      hermesRemoteSession.require("git.mutate", "hermes supervise --remote"),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });
    expect(hermesRemoteResolvers.getCtx).not.toHaveBeenCalled();
  });

  it("denies context mutation and provider execution from read-only context/evaluator sessions", async () => {
    const projectResolvers = makeResolvers();
    const projectSession = createCommandSession({
      command: "context search",
      requirements: CONTEXT_PROJECT_REQUIREMENTS,
      resolvers: projectResolvers,
    }) as CommandSession<CommandCapability>;
    await expect(projectSession.require("task.write", "context search")).rejects.toMatchObject({
      code: "E_INTERNAL",
    });
    expect(projectResolvers.getCtx).not.toHaveBeenCalled();

    const taskReadResolvers = makeResolvers();
    const taskReadSession = createCommandSession({
      command: "context verify-task",
      requirements: CONTEXT_TASK_READ_REQUIREMENTS,
      resolvers: taskReadResolvers,
    }) as CommandSession<CommandCapability>;
    await expect(
      taskReadSession.require("task.write", "context verify-task"),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });
    expect(taskReadResolvers.getCtx).not.toHaveBeenCalled();

    for (const requirements of [EVALUATOR_READ_REQUIREMENTS, EVALUATOR_WRITE_REQUIREMENTS]) {
      const resolvers = makeResolvers();
      const session = createCommandSession({
        command: "evaluator prepare",
        requirements,
        resolvers,
      }) as CommandSession<CommandCapability>;
      await expect(session.require("provider", "evaluator prepare")).rejects.toMatchObject({
        code: "E_INTERNAL",
      });
      expect(resolvers.getCtx).not.toHaveBeenCalled();
    }

    const evaluatorReadResolvers = makeResolvers();
    const evaluatorReadSession = createCommandSession({
      command: "evaluator list",
      requirements: EVALUATOR_READ_REQUIREMENTS,
      resolvers: evaluatorReadResolvers,
    }) as CommandSession<CommandCapability>;
    await expect(
      evaluatorReadSession.require("evaluator.artifacts.write", "evaluator list"),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });
    expect(evaluatorReadResolvers.getCtx).not.toHaveBeenCalled();

    const evaluatorPrepareSession = createCommandSession({
      command: "evaluator prepare",
      requirements: EVALUATOR_PREPARE_REQUIREMENTS,
      resolvers: makeResolvers(),
    });
    expect(evaluatorPrepareSession.requirements).not.toContain("task.write");
    expect(evaluatorPrepareSession.requirements).not.toContain("git.mutate");
    const port = await evaluatorPrepareSession.require(
      "evaluator.artifacts.write",
      "evaluator prepare",
    );
    expect(port).toBe(evaluatorArtifactPort);
    // @ts-expect-error the artifact port does not expose the underlying Git service
    expect(port.git).toBeUndefined();
    // @ts-expect-error the artifact port does not expose the task backend
    expect(port.taskBackend).toBeUndefined();
  });

  it("denies backend and Git mutation through a context returned to a read-only evaluator", async () => {
    const writeTask = vi.fn(() => Promise.resolve());
    const stage = vi.fn(() => Promise.resolve());
    const getTask = vi.fn(() => Promise.resolve(null));
    const headCommit = vi.fn(() => Promise.resolve("abc123"));
    const rawContext = {
      resolvedProject: { gitRoot: "/repo" },
      config: {},
      taskBackend: {
        id: "local",
        capabilities: {},
        getTask,
        listTasks: vi.fn(() => Promise.resolve([])),
        writeTask,
      },
      backendId: "local",
      backendConfigPath: "/repo/.agentplane/config.json",
      git: {
        gitRoot: "/repo",
        headCommit,
        stage,
      },
      memo: {},
    };
    const resolvers = {
      ...makeResolvers(),
      getCtx: vi.fn(() => Promise.resolve(rawContext as never)),
    };
    const session = createCommandSession({
      command: "evaluator inspect",
      requirements: EVALUATOR_READ_REQUIREMENTS,
      resolvers,
    });
    const context = await session.require("task.read", "evaluator inspect");

    await expect(context.taskBackend.getTask("TASK-1")).resolves.toBeNull();
    await expect(context.git.headCommit()).resolves.toBe("abc123");
    await expect(
      Promise.resolve().then(() => context.taskBackend.writeTask({ id: "TASK-1" } as never)),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });
    await expect(
      Promise.resolve().then(() => context.git.stage(["README.md"])),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });
    expect(writeTask).not.toHaveBeenCalled();
    expect(stage).not.toHaveBeenCalled();
    expect(
      session
        .trace()
        .filter((event) => event.status === "denied")
        .map((event) => event.capability),
    ).toEqual(["task.write", "git.mutate"]);
  });

  it("keeps backend, task, and Git authority asymmetric", async () => {
    const writeTask = vi.fn(() => Promise.resolve());
    const sync = vi.fn(() => Promise.resolve());
    const headCommit = vi.fn(() => Promise.resolve("abc123"));
    const stage = vi.fn(() => Promise.resolve());
    const rawContext = {
      resolvedProject: { gitRoot: "/repo" },
      config: {},
      taskBackend: {
        id: "local",
        capabilities: {},
        getTask: vi.fn(() => Promise.resolve(null)),
        listTasks: vi.fn(() => Promise.resolve([])),
        writeTask,
        sync,
      },
      backendId: "local",
      backendConfigPath: "/repo/.agentplane/config.json",
      git: { gitRoot: "/repo", headCommit, stage },
      memo: {},
    };
    const makeScopedSession = (requirements: readonly CommandCapability[]) =>
      createCommandSession({
        command: "asymmetric capability test",
        requirements,
        resolvers: {
          ...makeResolvers(),
          getCtx: vi.fn(() => Promise.resolve(rawContext as never)),
        },
      }) as CommandSession<CommandCapability>;

    const backendWriteSession = makeScopedSession(["project", "config", "backend.write"]);
    const backendContext = await backendWriteSession.require(
      "backend.write",
      "asymmetric backend.write",
    );
    await expect(
      Promise.resolve().then(() => backendContext.taskBackend.writeTask({ id: "TASK-1" } as never)),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });

    const taskWriteSession = makeScopedSession(["project", "config", "task.write"]);
    const taskContext = await taskWriteSession.require("task.write", "asymmetric task.write");
    await expect(
      Promise.resolve().then(() =>
        taskContext.taskBackend.sync?.({
          direction: "pull",
          conflict: "fail",
          quiet: true,
          confirm: false,
        }),
      ),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });

    const gitMutationSession = makeScopedSession(["project", "config", "git.mutate"]);
    const gitMutationContext = await gitMutationSession.require(
      "git.mutate",
      "asymmetric git.mutate",
    );
    await expect(
      Promise.resolve().then(() => gitMutationContext.git.headCommit()),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });

    const gitHeadSession = makeScopedSession(["project", "config", "git.head"]);
    const gitHeadContext = await gitHeadSession.require("git.head", "asymmetric git.head");
    await expect(
      Promise.resolve().then(() => gitHeadContext.git.stage(["README.md"])),
    ).rejects.toMatchObject({ code: "E_INTERNAL" });

    expect(writeTask).not.toHaveBeenCalled();
    expect(sync).not.toHaveBeenCalled();
    expect(headCommit).not.toHaveBeenCalled();
    expect(stage).not.toHaveBeenCalled();
    expect(backendWriteSession.trace().at(-1)).toMatchObject({
      capability: "task.write",
      status: "denied",
    });
    expect(taskWriteSession.trace().at(-1)).toMatchObject({
      capability: "backend.write",
      status: "denied",
    });
    expect(gitMutationSession.trace().at(-1)).toMatchObject({
      capability: "git.head",
      status: "denied",
    });
    expect(gitHeadSession.trace().at(-1)).toMatchObject({
      capability: "git.mutate",
      status: "denied",
    });
  });
});
