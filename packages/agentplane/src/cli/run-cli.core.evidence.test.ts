import { captureStdIO, mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";

describe("evidence maintenance CLI", () => {
  it("exposes stats, compact, and gc through the advanced command catalog", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "--json", "--all"]);
      expect(code).toBe(0);
      const ids = (JSON.parse(io.stdout) as { id: string[] }[]).map((entry) => entry.id.join(" "));
      expect(ids).toEqual(
        expect.arrayContaining(["evidence stats", "evidence compact", "evidence gc"]),
      );
    } finally {
      io.restore();
    }
  });

  it("reports an empty object store without mutating the project", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["evidence", "stats", "--json", "--root", root]);
      expect(code).toBe(0);
      const report = JSON.parse(io.stdout) as {
        kind: string;
        summary: { object_count: number; collectible_objects: number };
        objects: unknown[];
      };
      expect(report.kind).toBe("agentplane.evidence.inventory");
      expect(report.summary).toMatchObject({ object_count: 0, collectible_objects: 0 });
      expect(report.objects).toEqual([]);
      expect(io.stdout).not.toContain("absolute_path");
      expect(io.stdout).not.toContain("inode_key");
    } finally {
      io.restore();
    }
  });

  it("requires explicit confirmation before gc apply", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["evidence", "gc", "--apply", "--root", root]);
      expect(code).not.toBe(0);
      expect(io.stderr).toContain("requires --yes");
    } finally {
      io.restore();
    }
  });
});
