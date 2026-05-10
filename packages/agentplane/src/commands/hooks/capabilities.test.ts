import { describe, expect, it } from "vitest";

import {
  hookCapabilityDiagnosticContext,
  resolveHookCapability,
  withHookCapabilityEnvironment,
} from "./capabilities.js";

describe("hook capabilities", () => {
  it("runs read-only hooks with Git optional locks disabled and no index write intent", async () => {
    const previous = process.env.GIT_OPTIONAL_LOCKS;
    delete process.env.GIT_OPTIONAL_LOCKS;
    try {
      const capability = resolveHookCapability("pre-commit");
      await withHookCapabilityEnvironment(capability, () => {
        expect(process.env.GIT_OPTIONAL_LOCKS).toBe("0");
        expect(process.env.AGENTPLANE_HOOK_CAPABILITY_MODE).toBe("read_only");
        expect(process.env.AGENTPLANE_HOOK_GIT_INDEX_WRITE_INTENT).toBe("forbidden");
        expect(process.env.AGENTPLANE_HOOK_MUTATION_KIND).toBe("hook_check");
        expect(process.env.AGENTPLANE_HOOK_LOCK_CONTEXT).toBe("git_optional_locks_disabled");
        return Promise.resolve();
      });

      expect(process.env.GIT_OPTIONAL_LOCKS).toBeUndefined();
    } finally {
      if (previous === undefined) delete process.env.GIT_OPTIONAL_LOCKS;
      else process.env.GIT_OPTIONAL_LOCKS = previous;
    }
  });

  it("declares write-capable hooks as outside-Git-index hook checks", () => {
    const capability = resolveHookCapability("post-merge");

    expect(capability).toMatchObject({
      mode: "write_capable",
      gitIndexWriteIntent: "forbidden",
      mutationKind: "hook_check",
      lockContext: "outside_git_index",
    });
    expect(hookCapabilityDiagnosticContext(capability)).toMatchObject({
      hook: "post-merge",
      hook_capability_mode: "write_capable",
      hook_git_index_write_intent: "forbidden",
      mutation_kind: "hook_check",
      hook_lock_context: "outside_git_index",
    });
  });
});
