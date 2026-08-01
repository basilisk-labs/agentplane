import { describe, expect, it, vi } from "vitest";

import { evaluatorRunSpec } from "../../commands/evaluator/evaluator.spec.js";
import { parseCommandArgv } from "../spec/parse.js";
import { findCommandEntry } from "./command-catalog.js";
import {
  EVALUATOR_READ_REQUIREMENTS,
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
    expect(observed.at(-1)).toEqual(EVALUATOR_READ_REQUIREMENTS);
    expect(getCtx).not.toHaveBeenCalled();

    await runtime.handler({ cwd: "/repo" }, evaluatorRunParsed(false));
    expect(observed.at(-1)).toEqual(EVALUATOR_WRITE_REQUIREMENTS);
  });
});
