import { describe, expect, it } from "vitest";
import { requireKernelCommit } from "./kernel-runtime-context.js";

describe("canonical write reconciliation diagnostics", () => {
  it.each(["write_in_doubt", "readback_mismatch", "concurrent_write"] as const)(
    "preserves mutation evidence for %s",
    (code) => {
      const mutation = {
        task_id: "task-1",
        mutation_id: "mutation-1",
        command_kind: "capture_intent",
        expected_revision: 0,
        before_digest: null,
        intended_digest: "intended",
        observed_kind: null,
        observed_digest: null,
        write_error: "Error:EIO",
        read_error: "Error",
      };
      try {
        requireKernelCommit({ kind: "unavailable", code, facts: [], mutation });
        expect.unreachable();
      } catch (error) {
        expect(error).toMatchObject({
          code: "E_HANDOFF",
          context: { reason_code: "canonical_write_reconciliation_required", ...mutation },
        });
        expect((error as Error).message).toContain("exact original invocation");
        expect((error as Error).message).toContain("Do not migrate or scaffold");
      }
    },
  );
});
