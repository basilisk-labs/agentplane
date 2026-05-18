import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { expect, it } from "vitest";

import {
  commitAll,
  describeWhenNotHook,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  writeDefaultConfig,
} from "@agentplane/testkit";
import {
  seedReleaseWorkspace,
  validReleaseNotesBody,
  withDryRunReleaseMode,
  writeReleaseNotes,
  writeWorkflowMode,
} from "@agentplane/testkit/release";
import { runReleasePlan } from "./plan.command.js";
import { runReleaseApply, runReleaseCandidate } from "./apply.command.js";

const execFileAsync = promisify(execFile);
const RELEASE_APPLY_LONG_TIMEOUT_MS = 120_000;
const RELEASE_APPLY_FULL_GATE_TIMEOUT_MS = 240_000;

describeWhenNotHook(
  "release apply: apply flow",
  { timeout: RELEASE_APPLY_FULL_GATE_TIMEOUT_MS },
  () => {
    it(
      "allows local release apply without mandatory direct push",
      async () => {
        const root = await mkGitRepoRootWithBranch("main");
        await writeDefaultConfig(root);
        await mkdir(path.join(root, "docs", "releases"), { recursive: true });
        await seedReleaseWorkspace(root, {
          coreVersion: "0.2.6",
          cliVersion: "0.2.6",
          recipesVersion: "0.2.6",
          dependencyVersion: "0.2.6",
          recipesDependencyVersion: "0.2.6",
        });
        await commitAll(root, "seed");
        await execFileAsync("git", ["tag", "v0.2.6"], { cwd: root });

        await writeFile(path.join(root, "file.txt"), "x", "utf8");
        await commitAll(root, "feat: add file");

        await runReleasePlan({ cwd: root, rootOverride: root }, { bump: "patch", yes: false });
        await writeFile(
          path.join(root, "docs", "releases", "v0.2.7.md"),
          validReleaseNotesBody("0.2.7"),
          "utf8",
        );

        const wasDryRun = process.env.AGENTPLANE_RELEASE_DRY_RUN;
        delete process.env.AGENTPLANE_RELEASE_DRY_RUN;

        await expect(
          runReleaseApply(
            { cwd: root, rootOverride: root },
            { plan: undefined, yes: true, push: false, remote: "origin" },
          ),
        ).resolves.toBe(0);

        const headTagResult = await execFileAsync("git", ["tag", "--points-at", "HEAD"], {
          cwd: root,
        });
        const headTag = headTagResult.stdout.trim().split(/\r?\n/u).filter(Boolean);
        expect(headTag).toContain("v0.2.7");

        if (wasDryRun === undefined) {
          delete process.env.AGENTPLANE_RELEASE_DRY_RUN;
        } else {
          process.env.AGENTPLANE_RELEASE_DRY_RUN = wasDryRun;
        }
      },
      RELEASE_APPLY_FULL_GATE_TIMEOUT_MS,
    );

    it(
      "skips local tag creation on branch_pr task branches when preparing an explicit release candidate",
      async () => {
        const root = await mkGitRepoRootWithBranch("main");
        await writeDefaultConfig(root);
        await writeWorkflowMode(root, "branch_pr");

        await seedReleaseWorkspace(root, {
          coreVersion: "0.2.6",
          cliVersion: "0.2.6",
          dependencyVersion: "0.2.6",
        });
        await commitAll(root, "seed");
        await execFileAsync("git", ["tag", "v0.2.6"], { cwd: root });
        await execFileAsync("git", ["config", "--local", "agentplane.baseBranch", "main"], {
          cwd: root,
        });
        await execFileAsync(
          "git",
          ["checkout", "-b", "task/202604130750-E2J835/release-candidate"],
          {
            cwd: root,
          },
        );

        await writeFile(path.join(root, "file.txt"), "x", "utf8");
        await commitAll(root, "feat: add file");

        const rcPlan = await runReleasePlan(
          { cwd: root, rootOverride: root },
          { bump: "patch", yes: false },
        );
        expect(rcPlan).toBe(0);
        await writeReleaseNotes(root, "0.2.7", validReleaseNotesBody("0.2.7"));

        const rcApply = await withDryRunReleaseMode(async () =>
          runReleaseCandidate(
            { cwd: root, rootOverride: root },
            { plan: undefined, yes: false, push: false, remote: "origin" },
          ),
        );
        expect(rcApply).toBe(0);

        const { stdout: tagOut } = await execFileAsync("git", ["tag", "--list", "v0.2.7"], {
          cwd: root,
        });
        expect(tagOut.trim()).toBe("");

        const reportPath = path.join(root, ".agentplane", ".release", "apply", "latest.json");
        const report = JSON.parse(await readFile(reportPath, "utf8")) as {
          route?: {
            kind?: string;
            current_branch?: string;
            base_branch?: string | null;
          };
          commit?: { subject?: string } | null;
          tag?: { created?: boolean; pushed?: boolean };
          push?: { performed?: boolean; refs?: string[] };
        };
        expect(report.route?.kind).toBe("release_candidate");
        expect(report.route?.current_branch).toBe("task/202604130750-E2J835/release-candidate");
        expect(report.route?.base_branch).toBe("main");
        expect(report.commit?.subject).toBe("✨ E2J835 release: publish v0.2.7");
        expect(report.tag?.created).toBe(false);
        expect(report.tag?.pushed).toBe(false);
        expect(report.push?.performed).toBe(false);
        expect(report.push?.refs).toEqual([]);
      },
      RELEASE_APPLY_LONG_TIMEOUT_MS,
    );
  },
);
