import { describe, expect, it } from "vitest";

import { resolveUpgradeDownloadFromRelease } from "./upgrade.js";

describe("resolveUpgradeDownloadFromRelease", () => {
  it("uses assets when both bundle and checksum are present", () => {
    const out = resolveUpgradeDownloadFromRelease({
      release: {
        assets: [
          { name: "agentplane-upgrade.tar.gz", browser_download_url: "https://x/bundle" },
          { name: "agentplane-upgrade.tar.gz.sha256", browser_download_url: "https://x/checksum" },
        ],
      },
      owner: "basilisk-labs",
      repo: "agentplane",
      assetName: "agentplane-upgrade.tar.gz",
      checksumName: "agentplane-upgrade.tar.gz.sha256",
    });
    expect(out.kind).toBe("assets");
    if (out.kind === "assets") {
      expect(out.bundleUrl).toBe("https://x/bundle");
      expect(out.checksumUrl).toBe("https://x/checksum");
    }
  });

  it("falls back to tarball_url when assets are missing", () => {
    const out = resolveUpgradeDownloadFromRelease({
      release: { assets: [], tarball_url: "https://x/tarball" },
      owner: "basilisk-labs",
      repo: "agentplane",
      assetName: "agentplane-upgrade.tar.gz",
      checksumName: "agentplane-upgrade.tar.gz.sha256",
    });
    expect(out).toEqual({ kind: "tarball", tarballUrl: "https://x/tarball" });
  });
});
