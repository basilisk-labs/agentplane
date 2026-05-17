import { describe, expect, it } from "vitest";

import { normalizeFrameworkSourceForUpgrade } from "./upgrade.js";

describe("upgrade source normalization", () => {
  it("keeps legacy basilisk-labs/agent-plane sources explicit", () => {
    const out = normalizeFrameworkSourceForUpgrade("https://github.com/basilisk-labs/agent-plane");
    expect(out.owner).toBe("basilisk-labs");
    expect(out.repo).toBe("agent-plane");
    expect(out.source).toBe("https://github.com/basilisk-labs/agent-plane");
  });

  it("leaves other repos unchanged (but canonicalizes URL form)", () => {
    const out = normalizeFrameworkSourceForUpgrade(
      "https://github.com/example-org/example-repo.git",
    );
    expect(out.owner).toBe("example-org");
    expect(out.repo).toBe("example-repo");
    expect(out.source).toBe("https://github.com/example-org/example-repo");
  });

  it("rejects URLs that only contain github.com outside the host", () => {
    expect(() =>
      normalizeFrameworkSourceForUpgrade(
        "https://evil.example/github.com/basilisk-labs/agentplane",
      ),
    ).toThrow(/config\.framework\.source/);
    expect(() =>
      normalizeFrameworkSourceForUpgrade(
        "https://github.com.evil.example/basilisk-labs/agentplane",
      ),
    ).toThrow(/config\.framework\.source/);
  });
});
