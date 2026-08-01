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
  CONTEXT_PROJECT_REQUIREMENTS,
  EVALUATOR_READ_REQUIREMENTS,
  EVALUATOR_WRITE_REQUIREMENTS,
} from "./context-evaluator-capability-profiles.js";

const commandContext = { marker: "command-context" };
const project = { marker: "project" };
const config = { marker: "config" };
const zeroHandler = () => Promise.resolve(0);

function makeResolvers() {
  return {
    getCtx: vi.fn(() => Promise.resolve(commandContext)),
    getResolvedProject: vi.fn(() => Promise.resolve(project)),
    getLoadedConfig: vi.fn(() => Promise.resolve(config)),
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

    await expect(session.require("route.remote", "pr check")).resolves.toBe(commandContext);
    await expect(session.require("provider", "pr check")).resolves.toBe(commandContext);

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
  });
});
