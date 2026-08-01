import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { loadConfig } from "@agentplaneorg/core/config";
import { resolveProject } from "@agentplaneorg/core/project";
import { captureStdIO, mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it, vi } from "vitest";

import { evaluatorRunSpec } from "../../commands/evaluator/evaluator.spec.js";
import { addTask, commitPath } from "../../commands/evaluator/evaluator-test-helpers.js";
import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { parseCommandArgv } from "../spec/parse.js";
import { findCommandEntry } from "./command-catalog.js";
import {
  EVALUATOR_PREPARE_REQUIREMENTS,
  EVALUATOR_WRITE_REQUIREMENTS,
} from "./command-catalog/context-evaluator-capability-profiles.js";
import type { CommandCapability, CommandEntry, CommandSession } from "./command-catalog/kernel.js";
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
  it("constructs evaluator run authority from parsed persistence mode before loading its handler", async () => {
    const catalogEntry = findCommandEntry(["evaluator", "run"]);
    if (!catalogEntry?.selectSession) throw new Error("evaluator run must select a session");
    const observed: CommandCapability[][] = [];
    const getCtx = vi.fn(() => Promise.resolve({ marker: "command-context" } as never));
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
    });
    const runtime = registry.lookup(["evaluator", "run"]);
    if (!runtime) throw new Error("runtime registry did not register evaluator run");

    await runtime.handler({ cwd: "/repo" }, evaluatorRunParsed(true));
    expect(observed.at(-1)).toEqual(EVALUATOR_PREPARE_REQUIREMENTS);
    expect(getCtx).not.toHaveBeenCalled();

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
    const traces: { capability: CommandCapability; status: string }[] = [];
    const entry = findCommandEntry(["evaluator", "run"]);
    if (!entry) throw new Error("evaluator run catalog entry is missing");
    const registry = buildRegistry({
      entries: [entry],
      getCtx: () => Promise.resolve(commandContext),
      getResolvedProject: () => Promise.resolve(resolvedProject),
      getLoadedConfig: () => Promise.resolve(loadedConfig),
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
  });
});
