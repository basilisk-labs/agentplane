import { describe, expect, it } from "vitest";

import { pickLatestVersion } from "./catalog-cache.js";
import type { CatalogEntry } from "./catalog.js";

describe("pickLatestVersion", () => {
  it("orders installable versions by semver components", () => {
    const entry: CatalogEntry = {
      id: "analysis",
      versions: [
        { version: "1.2.9", url: "analysis-1.2.9.tgz", sha256: "a" },
        { version: "1.2.10", url: "analysis-1.2.10.tgz", sha256: "b" },
      ],
    };

    expect(pickLatestVersion(entry).version).toBe("1.2.10");
  });

  it("skips versions that require a newer AgentPlane runtime", () => {
    const entry: CatalogEntry = {
      id: "analysis",
      versions: [
        {
          version: "1.0.0",
          url: "analysis-1.0.0.tgz",
          sha256: "a",
          min_agentplane_version: "0.5.0",
        },
        {
          version: "2.0.0",
          url: "analysis-2.0.0.tgz",
          sha256: "b",
          min_agentplane_version: "0.7.0",
        },
      ],
    };

    expect(pickLatestVersion(entry, { agentplaneVersion: "0.6.0" }).version).toBe("1.0.0");
  });
});
