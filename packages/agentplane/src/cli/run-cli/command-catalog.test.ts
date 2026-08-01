import { describe, expect, it } from "vitest";

import {
  findCommandEntry,
  getDirectChildCommandEntries,
  getDirectChildCommandNames,
  getHelpCommandEntries,
  matchCommandCatalog,
} from "./command-catalog.js";
import {
  CONTEXT_PROJECT_REQUIREMENTS,
  CONTEXT_TASK_READ_REQUIREMENTS,
  CONTEXT_TASK_WRITE_REQUIREMENTS,
  EVALUATOR_EXECUTE_REQUIREMENTS,
  EVALUATOR_PREPARE_REQUIREMENTS,
  EVALUATOR_WRITE_REQUIREMENTS,
} from "./command-catalog/context-evaluator-capability-profiles.js";
import {
  RUNNER_EXECUTION_REQUIREMENTS,
  RUNNER_PREPARATION_REQUIREMENTS,
} from "./command-catalog/runner-hermes-capability-profiles.js";

describe("command catalog graph", () => {
  it("uses one graph for longest-prefix match and exact lookup", () => {
    expect(matchCommandCatalog(["task", "plan", "set", "TASK-1"])?.entry.spec.id).toEqual([
      "task",
      "plan",
      "set",
    ]);
    expect(matchCommandCatalog(["task", "plan", "unknown"])?.entry.spec.id).toEqual([
      "task",
      "plan",
    ]);
    expect(findCommandEntry(["task", "plan"])?.spec.id).toEqual(["task", "plan"]);
    expect(findCommandEntry(["missing", "command"])).toBeNull();
  });

  it("lists direct children without leaking grandchildren", () => {
    const taskChildren = getDirectChildCommandEntries(["task"]).map((entry) =>
      entry.spec.id.join(" "),
    );
    expect(taskChildren).toContain("task new");
    expect(taskChildren).toContain("task plan");
    expect(taskChildren).not.toContain("task plan set");

    const taskPlanChildren = getDirectChildCommandEntries(["task", "plan"]).map((entry) =>
      entry.spec.id.join(" "),
    );
    expect(taskPlanChildren).toEqual(
      expect.arrayContaining(["task plan set", "task plan approve", "task plan reject"]),
    );
    expect(taskPlanChildren).not.toContain("task new");
    expect(getDirectChildCommandEntries(["missing", "command"])).toEqual([]);
  });

  it("derives direct child names from the canonical graph", () => {
    expect(getDirectChildCommandNames(["task", "plan"])).toEqual(["approve", "reject", "set"]);
    expect(getDirectChildCommandNames(["codex"])).toEqual(["plugin"]);
    expect(getDirectChildCommandNames(["codex", "plugin"])).toEqual(["install"]);
    expect(getDirectChildCommandNames(["missing", "command"])).toEqual([]);
  });

  it("keeps dispatch metadata separate from handler loading", () => {
    expect(findCommandEntry(["ide", "sync"])?.needs).toBe("project");
    expect(findCommandEntry(["ide", "sync"])?.requirements).toEqual(["project"]);
    expect(findCommandEntry(["ide", "sync"])?.compatibility).toBeNull();
    expect(findCommandEntry(["ide", "sync"])?.dispatch).toEqual({
      project: true,
      loadedConfig: false,
      taskContext: false,
    });
    expect(findCommandEntry(["config", "show"])?.needs).toBe("project+config");
    expect(findCommandEntry(["config", "show"])?.requirements).toEqual(["project", "config"]);
    expect(findCommandEntry(["config", "show"])?.preparationNodes).toEqual(["project", "config"]);
    expect(findCommandEntry(["config", "show"])?.compatibility).toBeNull();
    expect(findCommandEntry(["config", "show"])?.dispatch).toEqual({
      project: true,
      loadedConfig: true,
      taskContext: false,
    });
    expect(findCommandEntry(["task"])?.needs).toBe("none");
    expect(findCommandEntry(["task"])?.requirements).toEqual([]);
    expect(findCommandEntry(["task"])?.dispatch).toEqual({
      project: false,
      loadedConfig: false,
      taskContext: false,
    });
  });

  it("publishes granular requirements for the migrated pilot slices", () => {
    expect(findCommandEntry(["docs", "cli"])?.requirements).toEqual(["output"]);
    expect(findCommandEntry(["docs", "cli"])?.preparationNodes).toEqual(["output"]);
    expect(findCommandEntry(["agents"])?.requirements).toEqual(["project"]);

    expect(findCommandEntry(["task", "list"])?.requirements).toEqual([
      "project",
      "config",
      "backend.read",
      "task.read",
    ]);
    expect(findCommandEntry(["task", "list"])?.preparationNodes).toEqual([
      "project",
      "config",
      "command_context",
    ]);

    const routeRequirements = findCommandEntry(["task", "next-action"])?.requirements ?? [];
    expect(routeRequirements).toEqual(
      expect.arrayContaining(["task.read", "git.head", "route.local", "route.remote", "provider"]),
    );
    expect(findCommandEntry(["task", "next-action"])?.compatibility).toBeNull();

    const providerRequirements = findCommandEntry(["pr", "check"])?.requirements ?? [];
    expect(providerRequirements).toEqual(
      expect.arrayContaining(["task.read", "git.head", "git.diff", "route.remote", "provider"]),
    );
    expect(findCommandEntry(["pr", "check"])?.compatibility).toBeNull();
  });

  it("publishes exact project, config, runtime, and docs capability profiles", () => {
    for (const id of [["agents"], ["platform", "sync"], ["ide", "sync"]]) {
      const entry = findCommandEntry(id);
      expect(entry?.compatibility, id.join(" ")).toBeNull();
      expect(entry?.requirements, id.join(" ")).toEqual(["project"]);
    }

    for (const id of [
      ["config", "show"],
      ["config", "set"],
      ["mode", "get"],
      ["mode", "set"],
      ["profile", "set"],
      ["runtime", "explain"],
    ]) {
      const entry = findCommandEntry(id);
      expect(entry?.compatibility, id.join(" ")).toBeNull();
      expect(entry?.requirements, id.join(" ")).toEqual(["project", "config"]);
      expect(entry?.requirements, id.join(" ")).not.toEqual(
        expect.arrayContaining(["task.read", "git.head", "provider"]),
      );
    }

    expect(findCommandEntry(["runtime"])?.requirements).toEqual([]);
    expect(findCommandEntry(["runtime"])?.compatibility).toBeNull();
    for (const id of [
      ["platform"],
      ["platform", "list"],
      ["platform", "explain"],
      ["platform", "doctor"],
    ]) {
      expect(findCommandEntry(id)?.requirements, id.join(" ")).toEqual([]);
      expect(findCommandEntry(id)?.compatibility, id.join(" ")).toBeNull();
    }
    expect(findCommandEntry(["docs", "cli"])?.requirements).toEqual(["output"]);
    expect(findCommandEntry(["docs", "cli"])?.compatibility).toBeNull();
  });

  it("publishes exact context and evaluator capability profiles", () => {
    for (const id of [
      ["context"],
      ["context", "init"],
      ["context", "learn"],
      ["context", "wiki"],
      ["context", "graph"],
      ["context", "harvest"],
      ["context", "capability"],
      ["evaluator"],
      ["evaluator", "list"],
      ["evaluator", "show"],
    ]) {
      expect(findCommandEntry(id)?.requirements, id.join(" ")).toEqual([]);
      expect(findCommandEntry(id)?.compatibility, id.join(" ")).toBeNull();
    }

    for (const id of [
      ["context", "search"],
      ["context", "show"],
      ["context", "reindex"],
      ["context", "wiki", "lint"],
      ["context", "graph", "summary"],
      ["context", "doctor"],
    ]) {
      expect(findCommandEntry(id)?.requirements, id.join(" ")).toEqual(
        CONTEXT_PROJECT_REQUIREMENTS,
      );
      expect(findCommandEntry(id)?.compatibility, id.join(" ")).toBeNull();
    }

    expect(findCommandEntry(["context", "verify-task"])?.requirements).toEqual(
      CONTEXT_TASK_READ_REQUIREMENTS,
    );
    expect(findCommandEntry(["context", "verify-task"])?.requirements).not.toContain("task.write");

    for (const id of [
      ["context", "ingest"],
      ["context", "learn", "files"],
      ["context", "learn", "changes"],
      ["context", "learn", "tasks"],
      ["context", "harvest", "tasks"],
      ["context", "supervise-task"],
      ["context", "finalize-task"],
    ]) {
      expect(findCommandEntry(id)?.requirements, id.join(" ")).toEqual(
        CONTEXT_TASK_WRITE_REQUIREMENTS,
      );
      expect(findCommandEntry(id)?.requirements, id.join(" ")).not.toContain("provider");
      expect(findCommandEntry(id)?.compatibility, id.join(" ")).toBeNull();
    }

    expect(findCommandEntry(["evaluator", "prepare"])?.requirements).toEqual(
      EVALUATOR_PREPARE_REQUIREMENTS,
    );
    expect(findCommandEntry(["evaluator", "prepare"])?.preparationNodes).toEqual([
      "project",
      "config",
      "evaluator_artifacts",
    ]);
    expect(findCommandEntry(["evaluator", "prepare"])?.dispatch.taskContext).toBe(false);
    for (const id of [["evaluator", "apply"]]) {
      expect(findCommandEntry(id)?.requirements, id.join(" ")).toEqual(
        EVALUATOR_WRITE_REQUIREMENTS,
      );
      expect(findCommandEntry(id)?.requirements, id.join(" ")).toContain("task.read");
      expect(findCommandEntry(id)?.requirements, id.join(" ")).toContain("git.diff");
      expect(findCommandEntry(id)?.requirements, id.join(" ")).not.toContain("provider");
    }
    const evaluatorRun = findCommandEntry(["evaluator", "run"]);
    expect(evaluatorRun?.requirements).toEqual(EVALUATOR_PREPARE_REQUIREMENTS);
    expect(evaluatorRun?.dispatch.taskContext).toBe(true);
    expect(evaluatorRun?.selectSession?.({ record: false }).requirements).toEqual(
      EVALUATOR_PREPARE_REQUIREMENTS,
    );
    expect(evaluatorRun?.selectSession?.({ record: true }).requirements).toEqual(
      EVALUATOR_WRITE_REQUIREMENTS,
    );
    expect(findCommandEntry(["evaluator", "execute"])?.requirements).toEqual(
      EVALUATOR_EXECUTE_REQUIREMENTS,
    );
    expect(findCommandEntry(["evaluator", "execute"])?.requirements).toContain("task.read");
    expect(findCommandEntry(["evaluator", "execute"])?.requirements).toContain("route.local");
  });

  it("publishes exact task, lifecycle, and route capability profiles", () => {
    const taskReadCommands = [
      ["task", "list"],
      ["task", "next"],
      ["task", "search"],
      ["task", "show"],
      ["task", "verify-show"],
      ["task", "observations", "triage"],
      ["ready"],
    ];
    for (const id of taskReadCommands) {
      const entry = findCommandEntry(id);
      expect(entry?.compatibility, id.join(" ")).toBeNull();
      expect(entry?.requirements, id.join(" ")).toEqual([
        "project",
        "config",
        "backend.read",
        "task.read",
      ]);
    }

    const taskWriteCommands = [
      ["task", "new"],
      ["task", "comment"],
      ["task", "plan", "set"],
      ["task", "plan", "approve"],
      ["task", "doc", "set"],
    ];
    for (const id of taskWriteCommands) {
      const entry = findCommandEntry(id);
      expect(entry?.compatibility, id.join(" ")).toBeNull();
      expect(entry?.requirements, id.join(" ")).toEqual([
        "project",
        "config",
        "backend.read",
        "task.read",
        "backend.write",
        "task.write",
        "policy",
        "approvals",
      ]);
    }

    const lifecycleCommands = [
      ["commit"],
      ["start"],
      ["block"],
      ["verify"],
      ["finish"],
      ["task", "begin"],
      ["task", "complete"],
      ["task", "start-ready"],
    ];
    for (const id of lifecycleCommands) {
      const entry = findCommandEntry(id);
      expect(entry?.compatibility, id.join(" ")).toBeNull();
      expect(entry?.requirements, id.join(" ")).toEqual(
        expect.arrayContaining([
          "task.read",
          "task.write",
          "git.head",
          "git.diff",
          "git.mutate",
          "route.local",
          "policy",
          "approvals",
        ]),
      );
      expect(entry?.requirements, id.join(" ")).not.toContain("provider");
    }

    for (const id of [
      ["task", "status"],
      ["task", "brief"],
      ["task", "next-action"],
    ]) {
      const entry = findCommandEntry(id);
      expect(entry?.compatibility, id.join(" ")).toBeNull();
      expect(entry?.requirements, id.join(" ")).toEqual(
        expect.arrayContaining(["route.local", "route.remote", "provider"]),
      );
    }

    const authorityGrant = findCommandEntry(["task", "authority", "grant"]);
    expect(authorityGrant?.compatibility).toBeNull();
    expect(authorityGrant?.requirements).toEqual(
      expect.arrayContaining([
        "task.write",
        "git.mutate",
        "route.local",
        "route.remote",
        "provider",
      ]),
    );
  });

  it("publishes phase-scoped runner, Hermes, and insights capability profiles", () => {
    const taskRead = ["project", "config", "backend.read", "task.read"];
    const taskWrite = [...taskRead, "backend.write", "task.write", "policy", "approvals"];
    const runnerExecution = [
      ...taskWrite,
      "git.head",
      "git.diff",
      "git.mutate",
      "route.local",
      "route.remote",
      "provider",
      "context.search",
    ];

    for (const id of [
      ["task", "run", "status"],
      ["task", "run", "inspect"],
      ["task", "run", "logs"],
    ]) {
      expect(findCommandEntry(id)?.requirements, id.join(" ")).toEqual(taskRead);
      expect(findCommandEntry(id)?.compatibility, id.join(" ")).toBeNull();
    }
    for (const id of [
      ["task", "run", "reconcile"],
      ["task", "run", "resolve-effect"],
    ]) {
      expect(findCommandEntry(id)?.requirements, id.join(" ")).toEqual(taskWrite);
      expect(findCommandEntry(id)?.compatibility, id.join(" ")).toBeNull();
    }
    for (const id of [
      ["task", "run", "resume-effect"],
      ["hermes", "supervise"],
    ]) {
      expect(findCommandEntry(id)?.requirements, id.join(" ")).toEqual(runnerExecution);
      expect(findCommandEntry(id)?.compatibility, id.join(" ")).toBeNull();
    }

    const taskRun = findCommandEntry(["task", "run"]);
    expect(taskRun?.requirements).toEqual(RUNNER_PREPARATION_REQUIREMENTS);
    expect(taskRun?.selectSession?.({ dryRun: true }).requirements).toEqual(
      RUNNER_PREPARATION_REQUIREMENTS,
    );
    expect(taskRun?.selectSession?.({ dryRun: false }).requirements).toEqual(
      RUNNER_EXECUTION_REQUIREMENTS,
    );
    expect(taskRun?.selectSession?.({ dryRun: true }).requirements).not.toContain("provider");
    expect(taskRun?.selectSession?.({ dryRun: true }).requirements).not.toContain("git.mutate");
    expect(taskRun?.compatibility).toBeNull();

    const hermesProjection = [
      ...taskRead,
      "git.head",
      "git.diff",
      "route.local",
      "policy",
      "approvals",
      "context.search",
    ];
    for (const id of [
      ["hermes", "enqueue"],
      ["hermes", "reconcile"],
    ]) {
      expect(findCommandEntry(id)?.requirements, id.join(" ")).toEqual(hermesProjection);
      expect(findCommandEntry(id)?.requirements, id.join(" ")).not.toContain("provider");
      expect(findCommandEntry(id)?.compatibility, id.join(" ")).toBeNull();
    }

    expect(findCommandEntry(["task", "run", "tool"])?.requirements).toEqual(["project"]);
    expect(findCommandEntry(["hermes"])?.requirements).toEqual([]);
    expect(findCommandEntry(["hermes", "lifecycle"])?.requirements).toEqual([]);
    expect(findCommandEntry(["hermes", "doctor"])?.requirements).toEqual(["project", "config"]);
    expect(findCommandEntry(["insights"])?.requirements).toEqual([]);
    expect(findCommandEntry(["insights", "report"])?.requirements).toEqual(["project", "config"]);
    expect(findCommandEntry(["insights", "triage"])?.requirements).toEqual(["project", "config"]);
  });

  it("keeps framework and internal commands out of normal help without removing dispatch", () => {
    expect(findCommandEntry(["release"])?.surface).toBe("framework");
    expect(findCommandEntry(["release", "apply"])?.surface).toBe("framework");
    expect(findCommandEntry(["task", "normalize"])?.surface).toBe("internal");
    expect(findCommandEntry(["task", "run"])?.surface).toBe("internal");
    expect(findCommandEntry(["task", "run", "tool"])?.surface).toBe("internal");
    expect(findCommandEntry(["context", "learn", "tasks"])?.surface).toBe("user");
    expect(findCommandEntry(["context", "harvest", "tasks"])?.surface).toBe("advanced");

    const normalHelpIds = getHelpCommandEntries("user").map((entry) => entry.spec.id.join(" "));
    expect(normalHelpIds).not.toContain("release");
    expect(normalHelpIds).not.toContain("task normalize");
    expect(normalHelpIds).not.toContain("task run");
    expect(normalHelpIds).not.toContain("task run status");
    expect(normalHelpIds).not.toContain("task run tool");
    expect(normalHelpIds).not.toContain("context harvest tasks");
    expect(normalHelpIds).toContain("context learn tasks");
    expect(normalHelpIds).toContain("context check");
    expect(normalHelpIds).toContain("task");
    expect(normalHelpIds).toContain("work start");

    const frameworkHelpIds = getHelpCommandEntries("framework").map((entry) =>
      entry.spec.id.join(" "),
    );
    expect(frameworkHelpIds).toContain("release");
    expect(frameworkHelpIds).not.toContain("task normalize");
    expect(frameworkHelpIds).not.toContain("task run");
    expect(frameworkHelpIds).not.toContain("task run tool");

    const allHelpIds = getHelpCommandEntries("all").map((entry) => entry.spec.id.join(" "));
    expect(allHelpIds).toContain("release");
    expect(allHelpIds).toContain("task normalize");
    expect(allHelpIds).toContain("task run");
    expect(allHelpIds).toContain("task run status");
    expect(allHelpIds).toContain("task run tool");
    expect(allHelpIds).toContain("context harvest tasks");
  });
});
