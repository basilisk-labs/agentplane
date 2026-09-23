import { describe, expect, it } from "vitest";

import { shouldPreserveCompletedKernelStateDuringVerification } from "./verify-record-kernel-state.js";

describe("replacement verification Kernel state", () => {
  it("preserves only a completed canonical task", () => {
    expect(
      shouldPreserveCompletedKernelStateDuringVerification({
        task: { status: "DONE", extensions: { task_kernel: { kind: "canonical_task" } } },
        allowCanonicalProjection: true,
      }),
    ).toBe(true);
    expect(
      shouldPreserveCompletedKernelStateDuringVerification({
        task: { status: "DOING", extensions: { task_kernel: { kind: "canonical_task" } } },
        allowCanonicalProjection: true,
      }),
    ).toBe(false);
  });
});
