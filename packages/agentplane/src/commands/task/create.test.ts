import { describe, expect, it } from "vitest";
import { defaultConfig } from "../../cli/core-imports.js";
import { resolveExplicitExecutionContract } from "./create.command.js";

describe("task create shared execution contract", () => {
  it("keeps read-only intake without repository authority", () => {
    const contract = resolveExplicitExecutionContract({
      config: defaultConfig(),
      parsed: { route: "auto", verify: [] },
      intent: { mutationScope: "none", riskFlags: [] },
    });
    expect(contract.declaration.scope_roots).toEqual([]);
    expect(contract.declaration.repository_effects).toEqual([]);
    expect(contract.authority.allowed_capabilities).toEqual([]);
  });

  it("admits source and test effects only inside explicit roots", () => {
    const contract = resolveExplicitExecutionContract({
      config: defaultConfig(),
      parsed: { route: "auto", verify: ["node --version"], scopeRoots: ["src", "src"] },
      intent: { taskKind: "code", mutationScope: "code", riskFlags: [] },
    });
    expect(contract.declaration.scope_roots).toEqual(["src"]);
    expect(contract.declaration.repository_effects).toEqual([
      "repository_write",
      "source_code",
      "tests",
    ]);
    expect(contract.declaration.external_effects).toEqual([]);
    expect(contract.authority.allowed_capabilities).toEqual(["repository_write"]);
    expect(contract.authority.allowed_resources).toEqual([]);
  });
});
