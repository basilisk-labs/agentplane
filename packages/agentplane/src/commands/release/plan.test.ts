import { execFile } from "node:child_process";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { expect, it } from "vitest";

import { commitAll, describeWhenNotHook, tempRepo } from "@agentplane/testkit";
import { seedReleaseWorkspace } from "@agentplane/testkit/release";
import { runReleasePlan, releasePlanSpec } from "./plan.command.js";

const execFileAsync = promisify(execFile);
describeWhenNotHook("release plan", () => {
  it("writes a release plan dir with changes list and next patch version", async () => {
    const repo = await tempRepo({ withDefaultConfig: true });
    const { root } = repo;
    try {
      await seedReleaseWorkspace(root, {
        coreVersion: "0.2.6",
        cliVersion: "0.2.6",
        dependencyVersion: "0.2.6",
      });
      await commitAll(root, "seed");
      await execFileAsync("git", ["tag", "v0.2.6"], { cwd: root });

      await writeFile(path.join(root, "file.txt"), "x", "utf8");
      await commitAll(root, "feat: add file");

      const rc = await runReleasePlan(
        { cwd: root, rootOverride: root },
        { bump: "patch", yes: false },
      );
      expect(rc).toBe(0);

      const plansDir = path.join(root, ".agentplane", ".release", "plan");
      const runNames = await readdir(plansDir);
      const runs = runNames.toSorted();
      expect(runs.length).toBeGreaterThan(0);
      const latest = runs.at(-1) ?? "";
      const runDir = path.join(plansDir, latest);

      const version = JSON.parse(await readFile(path.join(runDir, "version.json"), "utf8")) as {
        prevTag?: string | null;
        prevVersion?: string;
        nextTag?: string;
        nextVersion?: string;
        bump?: string;
        baseSha?: string;
      };
      const { stdout: headSha } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      expect(version.prevTag).toBe("v0.2.6");
      expect(version.nextTag).toBe("v0.2.7");
      expect(version.nextVersion).toBe("0.2.7");
      expect(version.bump).toBe("patch");
      expect(version.baseSha).toBe(headSha.trim());

      const instructions = await readFile(path.join(runDir, "instructions.md"), "utf8");
      expect(instructions).toContain("docs/releases/v0.2.7.md");
      expect(instructions).toContain("Cover all listed differences");
      expect(instructions).toContain("Write at least 1 bullet points.");
      const changesMd = await readFile(path.join(runDir, "changes.md"), "utf8");
      expect(changesMd).toContain("feat: add file");
    } finally {
      await repo.cleanup();
    }
  }, 60_000);

  it("requires --yes for minor/major bumps", () => {
    expect(() =>
      releasePlanSpec.validate?.({ bump: "minor", yes: false, since: undefined }),
    ).toThrow(/requires explicit approval/i);
    expect(() =>
      releasePlanSpec.validate?.({ bump: "major", yes: false, since: undefined }),
    ).toThrow(/requires explicit approval/i);
  });

  it("fails when workspace version is already ahead of the latest published patch tag", async () => {
    const repo = await tempRepo({ withDefaultConfig: true });
    const { root } = repo;
    try {
      await seedReleaseWorkspace(root, {
        coreVersion: "0.2.8",
        cliVersion: "0.2.8",
        dependencyVersion: "0.2.8",
      });
      await commitAll(root, "seed");
      await execFileAsync("git", ["tag", "v0.2.6"], { cwd: root });

      await expect(
        runReleasePlan({ cwd: root, rootOverride: root }, { bump: "patch", yes: false }),
      ).rejects.toThrow(/latest published\/tagged release is v0\.2\.6/i);
      await expect(
        runReleasePlan({ cwd: root, rootOverride: root }, { bump: "patch", yes: false }),
      ).rejects.toThrow(/v0\.2\.7, v0\.2\.8/i);
    } finally {
      await repo.cleanup();
    }
  }, 60_000);

  it("blocks release planning until active incidents are cleaned", async () => {
    const repo = await tempRepo({ withDefaultConfig: true });
    const { root } = repo;
    try {
      await seedReleaseWorkspace(root, {
        coreVersion: "0.2.6",
        cliVersion: "0.2.6",
        dependencyVersion: "0.2.6",
      });
      await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
      await writeFile(
        path.join(root, ".agentplane", "policy", "incidents.md"),
        [
          "# Policy Incidents Log",
          "",
          "- Append-only. Required fields: `id`.",
          "- id: INC-20260505-01 | date: 2026-05-05 | scope: release | failure: still active | rule: fix first | evidence: task T | enforcement: manual | state: open",
          "",
        ].join("\n"),
        "utf8",
      );
      await commitAll(root, "seed");
      await execFileAsync("git", ["tag", "v0.2.6"], { cwd: root });

      await expect(
        runReleasePlan({ cwd: root, rootOverride: root }, { bump: "patch", yes: false }),
      ).rejects.toThrow(/Release planning blocked.*INC-20260505-01/i);
    } finally {
      await repo.cleanup();
    }
  }, 60_000);
});
