import { describe, expect, it } from "vitest";

import { normalizeFrameworkSourceForUpgrade } from "./upgrade.js";

describe("upgrade source normalization", () => {
  it("normalizes basilisk-labs/agent-plane to basilisk-labs/agentplane", () => {
    const out = normalizeFrameworkSourceForUpgrade("https://github.com/basilisk-labs/agent-plane");
    expect(out.migrated).toBe(true);
    expect(out.owner).toBe("basilisk-labs");
    expect(out.repo).toBe("agentplane");
    expect(out.source).toBe("https://github.com/basilisk-labs/agentplane");
  });

  it("leaves other repos unchanged (but canonicalizes URL form)", () => {
    const out = normalizeFrameworkSourceForUpgrade(
      "https://github.com/example-org/example-repo.git",
    );
    expect(out.migrated).toBe(false);
    expect(out.owner).toBe("example-org");
    expect(out.repo).toBe("example-repo");
    expect(out.source).toBe("https://github.com/example-org/example-repo");
  });
});
