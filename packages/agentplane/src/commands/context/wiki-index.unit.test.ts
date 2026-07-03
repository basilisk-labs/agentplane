import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { cmdContextWikiLint, cmdContextWikiNew, cmdContextWikiIndex } from "./wiki.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-wiki-index-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  for (const root of tempRoots) await rm(root, { recursive: true, force: true });
  tempRoots = [];
});

async function write(root: string, rel: string, text: string): Promise<void> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

describe("context wiki index", () => {
  it("heals legacy generated index pages before replacing generated links", async () => {
    const root = await tempRoot();
    await cmdContextWikiNew({
      cwd: root,
      parsed: {
        page: "modules/meridian-relay",
        title: "Meridian Relay",
        modality: "definition",
        status: "reviewed_claim",
        visibility: "project",
        source: ["context/raw/specs/meridian-relay.md"],
        force: false,
      },
    });
    await write(
      root,
      "context/wiki/modules/index.md",
      [
        "# Modules",
        "",
        "<!-- agentplane-context-wiki-index:start -->",
        "- [Stale](stale.md)",
        "<!-- agentplane-context-wiki-index:end -->",
        "",
      ].join("\n"),
    );

    await cmdContextWikiIndex({ cwd: root, parsed: { path: "context/wiki" } });

    const modulesIndex = await readFile(path.join(root, "context/wiki/modules/index.md"), "utf8");
    expect(modulesIndex).toContain("agentplane_context:");
    expect(modulesIndex).toContain("[Meridian Relay](meridian-relay.md)");
    expect(modulesIndex).not.toContain("[Stale](stale.md)");
    await cmdContextWikiLint({ cwd: root, parsed: { path: "context/wiki" } });
  });
});
