import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
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
import { cleanHookEnv, packageDependencyExists } from "./apply.mutation.js";
import {
  readOptionalAgentplaneDependencyVersion,
  validateReleaseNotes,
} from "./apply.preflight.package.js";

const execFileAsync = promisify(execFile);
const RELEASE_APPLY_LONG_TIMEOUT_MS = 120_000;
const RELEASE_APPLY_FULL_GATE_TIMEOUT_MS = 240_000;

describeWhenNotHook(
  "release apply: preflight",
  { timeout: RELEASE_APPLY_FULL_GATE_TIMEOUT_MS },
  () => {
    it("allows the release commit to stage protected config updates", () => {
      const env = cleanHookEnv();

      expect(env.AGENTPLANE_ALLOW_CONFIG).toBe("1");
      expect(env.AGENTPLANE_TASK_ID).toBeUndefined();
      expect(env.AGENTPLANE_STATUS_TO).toBeUndefined();
      expect(env.AGENTPLANE_AGENT_ID).toBeUndefined();
    });

    it("treats private testkit agentplane dependency as optional", async () => {
      const root = await mkGitRepoRoot();
      const pkgPath = path.join(root, "packages", "testkit", "package.json");
      await mkdir(path.dirname(pkgPath), { recursive: true });
      await writeFile(
        pkgPath,
        JSON.stringify(
          {
            name: "@agentplane/testkit",
            version: "0.0.0",
            private: true,
            dependencies: { "@agentplaneorg/core": "0.3.15" },
          },
          null,
          2,
        ) + "\n",
        "utf8",
      );

      await expect(readOptionalAgentplaneDependencyVersion(pkgPath)).resolves.toBeNull();
      await expect(packageDependencyExists(pkgPath, "agentplane")).resolves.toBe(false);
    });

    it("rejects release notes that still contain template placeholder text", async () => {
      const root = await mkGitRepoRoot();
      const notesPath = path.join(root, "docs", "releases", "v0.2.7.md");
      await mkdir(path.dirname(notesPath), { recursive: true });
      await writeFile(
        notesPath,
        validReleaseNotesBody("0.2.7").replace(
          "- Release notes summarize the user-visible outcome.",
          "- 2-4 bullets with the main release outcomes in plain language.",
        ),
        "utf8",
      );

      await expect(validateReleaseNotes(notesPath, 1)).rejects.toThrow(
        /template placeholder bullet/u,
      );
    });

    it("rejects release notes where Release Notes only appears in frontmatter", async () => {
      const root = await mkGitRepoRoot();
      const notesPath = path.join(root, "docs", "releases", "v0.2.7.md");
      await mkdir(path.dirname(notesPath), { recursive: true });
      await writeFile(
        notesPath,
        [
          "---",
          'description: "Release notes for v0.2.7."',
          "---",
          "",
          "# v0.2.7",
          "",
          "## Summary",
          "",
          "- Release notes summarize the user-visible outcome.",
          "",
          "## Added",
          "",
          "- Added the release capability covered by this test fixture.",
          "",
          "## Improved",
          "",
          "- Improved the release workflow exercised by this test fixture.",
          "",
          "## Fixed",
          "",
          "- Fixed the release readiness gap covered by this test fixture.",
          "",
          "## Upgrade Notes",
          "",
          "- No migration is required for this test fixture.",
          "",
          "## Verification",
          "",
          "- Release validation passed for this test fixture.",
          "",
        ].join("\n"),
        "utf8",
      );

      await expect(validateReleaseNotes(notesPath, 1)).rejects.toThrow(
        /top-level "Release Notes - vX\.Y\.Z" heading/u,
      );
    });

    it("rejects release notes that omit required template sections", async () => {
      const root = await mkGitRepoRoot();
      const notesPath = path.join(root, "docs", "releases", "v0.2.7.md");
      await mkdir(path.dirname(notesPath), { recursive: true });
      await writeFile(
        notesPath,
        [
          "# Release Notes - v0.2.7",
          "",
          "## Summary",
          "",
          "- Release notes summarize the user-visible outcome.",
          "",
          "## Changes",
          "",
          "- Added a generic change list.",
          "",
        ].join("\n"),
        "utf8",
      );

      await expect(validateReleaseNotes(notesPath, 1)).rejects.toThrow(
        /required template sections.*Added, Improved, Fixed, Upgrade Notes, Verification/u,
      );
    });

    it("allows release notes to mention old template bullets inside fenced examples", async () => {
      const root = await mkGitRepoRoot();
      const notesPath = path.join(root, "docs", "releases", "v0.2.7.md");
      await mkdir(path.dirname(notesPath), { recursive: true });
      await writeFile(
        notesPath,
        [
          validReleaseNotesBody("0.2.7"),
          "```md",
          "- 2-4 bullets with the main release outcomes in plain language.",
          "```",
          "",
        ].join("\n"),
        "utf8",
      );

      await expect(validateReleaseNotes(notesPath, 1)).resolves.toBeUndefined();
    });

    it("does not count fenced example bullets toward release note content minimums", async () => {
      const root = await mkGitRepoRoot();
      const notesPath = path.join(root, "docs", "releases", "v0.2.7.md");
      await mkdir(path.dirname(notesPath), { recursive: true });
      await writeFile(
        notesPath,
        [
          "# Release Notes - v0.2.7",
          "",
          "## Summary",
          "",
          "- Actual summary bullet.",
          "",
          "## Added",
          "",
          "## Improved",
          "",
          "## Fixed",
          "",
          "## Upgrade Notes",
          "",
          "## Verification",
          "",
          "```md",
          "- Fenced example bullet.",
          "- Another fenced example bullet.",
          "```",
          "",
        ].join("\n"),
        "utf8",
      );

      await expect(validateReleaseNotes(notesPath, 2)).rejects.toThrow(
        /at least 2 bullet points/u,
      );
    });

    it("rejects release notes with duplicate section headings", async () => {
      const root = await mkGitRepoRoot();
      const notesPath = path.join(root, "docs", "releases", "v0.2.7.md");
      await mkdir(path.dirname(notesPath), { recursive: true });
      await writeFile(
        notesPath,
        [validReleaseNotesBody("0.2.7"), "## Added", "", "- Added package parity checks.", ""].join(
          "\n",
        ),
        "utf8",
      );

      await expect(validateReleaseNotes(notesPath, 1)).rejects.toThrow(
        /duplicate section headings.*Added/u,
      );
    });

    it(
      "fails when tracked tree is dirty before apply",
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

        // Tracked dirty change that should block release apply.
        await writeFile(path.join(root, "file.txt"), "dirty", "utf8");

        await expect(
          withDryRunReleaseMode(async () =>
            runReleaseApply(
              { cwd: root, rootOverride: root },
              { plan: undefined, yes: false, push: false, remote: "origin" },
            ),
          ),
        ).rejects.toMatchObject({
          code: "E_GIT",
          context: {
            diagnostic_state: "release apply cannot start from a dirty tracked tree",
            diagnostic_next_action_command: "git status --short --untracked-files=no",
          },
        });
      },
      RELEASE_APPLY_FULL_GATE_TIMEOUT_MS,
    );

    it(
      "fails on a dirty tracked tree before preparing a branch_pr release candidate",
      async () => {
        const root = await mkGitRepoRoot();
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
        await execFileAsync("git", ["checkout", "-b", "task/202604130750-E2J835/release-dirty"], {
          cwd: root,
        });

        await writeFile(path.join(root, "file.txt"), "x", "utf8");
        await commitAll(root, "feat: add file");

        await runReleasePlan({ cwd: root, rootOverride: root }, { bump: "patch", yes: false });
        await writeReleaseNotes(root, "0.2.7", validReleaseNotesBody("0.2.7"));

        await writeFile(path.join(root, "file.txt"), "dirty", "utf8");

        await expect(
          withDryRunReleaseMode(async () =>
            runReleaseCandidate(
              { cwd: root, rootOverride: root },
              { plan: undefined, yes: false, push: false, remote: "origin" },
            ),
          ),
        ).rejects.toMatchObject({
          code: "E_GIT",
          context: {
            diagnostic_state: "release candidate cannot start from a dirty tracked tree",
            diagnostic_next_action_command: "git status --short --untracked-files=no",
          },
        });
      },
      RELEASE_APPLY_FULL_GATE_TIMEOUT_MS,
    );

    it("fails early when release tag already exists", async () => {
      const root = await mkGitRepoRoot();
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
      await execFileAsync("git", ["tag", "v0.2.7"], { cwd: root });

      await expect(
        withDryRunReleaseMode(async () =>
          runReleaseApply(
            { cwd: root, rootOverride: root },
            { plan: undefined, yes: false, push: false, remote: "origin" },
          ),
        ),
      ).rejects.toMatchObject({
        code: "E_GIT",
        context: {
          diagnostic_state: "the target release tag already exists locally",
          diagnostic_next_action_command: "git show --stat --oneline v0.2.7",
        },
      });
    });

    it("fails when release notes have fewer bullets than required", async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);

      await mkdir(path.join(root, "packages", "core"), { recursive: true });
      await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
      await mkdir(path.join(root, "packages", "recipes"), { recursive: true });
      await mkdir(path.join(root, "docs", "releases"), { recursive: true });

      await writeFile(
        path.join(root, "packages", "core", "package.json"),
        JSON.stringify({ name: "@agentplaneorg/core", version: "0.2.6" }, null, 2) + "\n",
        "utf8",
      );
      await writeFile(
        path.join(root, "packages", "agentplane", "package.json"),
        JSON.stringify(
          {
            name: "agentplane",
            version: "0.2.6",
            dependencies: {
              "@agentplaneorg/core": "0.2.6",
              "@agentplaneorg/recipes": "0.2.6",
            },
          },
          null,
          2,
        ) + "\n",
        "utf8",
      );
      await writeFile(
        path.join(root, "packages", "recipes", "package.json"),
        JSON.stringify({ name: "@agentplaneorg/recipes", version: "0.2.6" }, null, 2) + "\n",
        "utf8",
      );
      await commitAll(root, "seed");
      await execFileAsync("git", ["tag", "v0.2.6"], { cwd: root });

      await writeFile(path.join(root, "file.txt"), "x", "utf8");
      await commitAll(root, "feat: add file");
      await writeFile(path.join(root, "file-2.txt"), "y", "utf8");
      await commitAll(root, "fix: adjust file");

      await runReleasePlan({ cwd: root, rootOverride: root }, { bump: "patch", yes: false });
      await writeFile(
        path.join(root, "docs", "releases", "v0.2.7.md"),
        [
          "# Release Notes — v0.2.7",
          "",
          "## Summary",
          "",
          "- A",
          "",
          "## Added",
          "",
          "## Improved",
          "",
          "## Fixed",
          "",
          "## Upgrade Notes",
          "",
          "## Verification",
          "",
        ].join("\n"),
        "utf8",
      );

      await expect(
        withDryRunReleaseMode(async () =>
          runReleaseApply(
            { cwd: root, rootOverride: root },
            { plan: undefined, yes: false, push: false, remote: "origin" },
          ),
        ),
      ).rejects.toThrow(/at least 2 bullet points/u);
    });

    it(
      "fails when release apply is invoked from a branch_pr task branch",
      async () => {
        const root = await mkGitRepoRoot();
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

        await runReleasePlan({ cwd: root, rootOverride: root }, { bump: "patch", yes: false });
        await writeReleaseNotes(root, "0.2.7", validReleaseNotesBody("0.2.7"));

        await expect(
          withDryRunReleaseMode(async () =>
            runReleaseApply(
              { cwd: root, rootOverride: root },
              { plan: undefined, yes: false, push: false, remote: "origin" },
            ),
          ),
        ).rejects.toMatchObject({
          code: "E_VALIDATION",
          context: {
            diagnostic_state: "release apply was invoked from a branch_pr candidate branch",
            diagnostic_next_action_command: "agentplane release candidate",
          },
        });
      },
      RELEASE_APPLY_LONG_TIMEOUT_MS,
    );

    it(
      "fails when release apply is invoked from the branch_pr base branch",
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

        await writeFile(path.join(root, "file.txt"), "x", "utf8");
        await commitAll(root, "feat: add file");

        await runReleasePlan({ cwd: root, rootOverride: root }, { bump: "patch", yes: false });
        await writeReleaseNotes(root, "0.2.7", validReleaseNotesBody("0.2.7"));

        await expect(
          withDryRunReleaseMode(async () =>
            runReleaseApply(
              { cwd: root, rootOverride: root },
              { plan: undefined, yes: false, push: false, remote: "origin" },
            ),
          ),
        ).rejects.toMatchObject({
          code: "E_VALIDATION",
          context: {
            diagnostic_state: "release apply was invoked from a branch_pr base checkout",
            diagnostic_next_action_command: "agentplane release candidate",
          },
        });
      },
      RELEASE_APPLY_LONG_TIMEOUT_MS,
    );

    it(
      "fails when release candidate is invoked outside branch_pr mode",
      async () => {
        const root = await mkGitRepoRoot();
        await writeDefaultConfig(root);

        await seedReleaseWorkspace(root, {
          coreVersion: "0.2.6",
          cliVersion: "0.2.6",
          dependencyVersion: "0.2.6",
        });
        await commitAll(root, "seed");
        await execFileAsync("git", ["tag", "v0.2.6"], { cwd: root });

        await writeFile(path.join(root, "file.txt"), "x", "utf8");
        await commitAll(root, "feat: add file");

        await runReleasePlan({ cwd: root, rootOverride: root }, { bump: "patch", yes: false });
        await writeReleaseNotes(root, "0.2.7", validReleaseNotesBody("0.2.7"));

        await expect(
          withDryRunReleaseMode(async () =>
            runReleaseCandidate(
              { cwd: root, rootOverride: root },
              { plan: undefined, yes: false, push: false, remote: "origin" },
            ),
          ),
        ).rejects.toMatchObject({
          code: "E_VALIDATION",
          context: {
            diagnostic_state: "release candidate was invoked outside branch_pr mode",
            diagnostic_next_action_command: "agentplane release apply",
          },
        });
      },
      RELEASE_APPLY_LONG_TIMEOUT_MS,
    );
  },
);
