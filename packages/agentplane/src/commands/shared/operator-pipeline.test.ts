import { describe, expect, it } from "vitest";

import { runOperatorPipeline } from "./operator-pipeline.js";

describe("runOperatorPipeline", () => {
  it("runs phases in order and returns the finalized value", async () => {
    const steps: string[] = [];
    const result = await runOperatorPipeline({
      init: () => {
        steps.push("init");
        return { value: 2 };
      },
      preflight: () => {
        steps.push("preflight");
      },
      materialize: () => {
        steps.push("materialize");
      },
      execute: (state) => {
        steps.push("execute");
        return state.value * 3;
      },
      finalize: (_state, value) => {
        steps.push("finalize");
        return value + 1;
      },
      cleanup: () => {
        steps.push("cleanup");
      },
    });

    expect(result).toBe(7);
    expect(steps).toEqual(["init", "preflight", "materialize", "execute", "finalize", "cleanup"]);
  });

  it("still runs cleanup when a phase throws", async () => {
    const steps: string[] = [];

    await expect(
      runOperatorPipeline({
        init: () => {
          steps.push("init");
          return { value: 1 };
        },
        execute: () => {
          steps.push("execute");
          throw new Error("boom");
        },
        cleanup: () => {
          steps.push("cleanup");
        },
      }),
    ).rejects.toThrow("boom");

    expect(steps).toEqual(["init", "execute", "cleanup"]);
  });
});
