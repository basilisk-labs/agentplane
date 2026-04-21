import { describe, expect, it } from "vitest";

import {
  buildCleanRuntimeModeEnv,
  clearRuntimeModeEnv,
  describeCritical,
} from "agentplane/internal/testing";
import { buildCleanRuntimeModeEnv as buildCleanRuntimeModeEnvFromTestkit } from "@agentplane/testkit";

describe("agentplane/internal/testing", () => {
  it("re-exports the canonical testkit source alias", () => {
    expect(buildCleanRuntimeModeEnv).toBe(buildCleanRuntimeModeEnvFromTestkit);
    expect(describeCritical).toBeTypeOf("function");
  });

  it("keeps runtime environment helpers available through the compatibility surface", () => {
    const env = buildCleanRuntimeModeEnv({
      AGENTPLANE_RUNTIME_MODE: "global",
      KEEP_ME: "1",
    });

    expect(env).toEqual({ KEEP_ME: "1" });

    clearRuntimeModeEnv(env);
    expect(env).toEqual({ KEEP_ME: "1" });
  });
});
