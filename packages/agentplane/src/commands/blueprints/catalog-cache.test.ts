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
});
