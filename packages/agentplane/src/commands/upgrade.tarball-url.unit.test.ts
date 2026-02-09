import { describe, expect, it } from "vitest";

import { resolveRepoTarballUrl } from "./upgrade.js";

describe("resolveRepoTarballUrl", () => {
  it("prefers explicit tag via codeload URL", () => {
    const url = resolveRepoTarballUrl({
      release: { tag_name: "v0.2.2", tarball_url: "https://api.github.com/x/tarball" },
      owner: "basilisk-labs",
      repo: "agentplane",
      explicitTag: "v1.2.3",
    });
    expect(url).toBe("https://codeload.github.com/basilisk-labs/agentplane/tar.gz/v1.2.3");
  });

  it("uses release tag_name via codeload URL when explicit tag is missing", () => {
    const url = resolveRepoTarballUrl({
      release: { tag_name: "v0.2.2", tarball_url: "https://api.github.com/x/tarball" },
      owner: "basilisk-labs",
      repo: "agentplane",
    });
    expect(url).toBe("https://codeload.github.com/basilisk-labs/agentplane/tar.gz/v0.2.2");
  });

  it("falls back to tarball_url when tag is not available", () => {
    const url = resolveRepoTarballUrl({
      release: { assets: [], tarball_url: "https://api.github.com/x/tarball" },
      owner: "basilisk-labs",
      repo: "agentplane",
    });
    expect(url).toBe("https://api.github.com/x/tarball");
  });
});
