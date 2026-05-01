import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { expect, it } from "vitest";

import {
  commitAll,
  describeWhenNotHook,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "@agentplane/testkit";
import {
  seedReleaseWorkspace,
  withDryRunReleaseMode,
  writeReleaseNotes,
  writeReleasePushScripts,
  writeWorkflowMode,
} from "@agentplane/testkit/release";
import { pushReleaseRefs, runReleaseApply, runReleaseCandidate } from "./apply.command.js";
import { runReleasePlan } from "./plan.command.js";

const execFileAsync = promisify(execFile);
const RELEASE_APPLY_LONG_TIMEOUT_MS = 120_000;

describeWhenNotHook(
  "release apply: push recovery",
  { timeout: RELEASE_APPLY_LONG_TIMEOUT_MS },
  () => {
    it(
      "pushes release refs with --no-verify to avoid recursive local pre-push hooks",
      async () => {
        const root = await mkGitRepoRoot();
        await writeDefaultConfig(root);

        const remoteRoot = path.join(root, "remote.git");
        await execFileAsync("git", ["init", "--bare", remoteRoot], { cwd: root });
        await execFileAsync("git", ["remote", "add", "origin", remoteRoot], { cwd: root });

        await writeFile(path.join(root, "tracked.txt"), "release\n", "utf8");
        await commitAll(root, "seed");
        await execFileAsync("git", ["tag", "v0.2.6"], { cwd: root });
        await execFileAsync("git", ["tag", "v0.2.7"], { cwd: root });

        const hookPath = path.join(root, ".git", "hooks", "pre-push");
        const markerPath = path.join(root, "pre-push.marker");
        await writeFile(
          hookPath,
          [
            "#!/bin/sh",
            String.raw`printf 'hook-ran\n' >> '${markerPath}'`,
            "echo 'pre-push hook should have been skipped' >&2",
            "exit 1",
            "",
          ].join("\n"),
          "utf8",
        );
        await execFileAsync("chmod", ["+x", hookPath], { cwd: root });

        await pushReleaseRefs(root, "origin", "v0.2.7");

        await expect(readFile(markerPath, "utf8")).rejects.toThrow();

        const { stdout: localBranch } = await execFileAsync(
          "git",
          ["symbolic-ref", "--short", "HEAD"],
          {
            cwd: root,
          },
        );
        const branchRef = `refs/heads/${localBranch.trim()}`;
        const { stdout: remoteHead } = await execFileAsync("git", ["rev-parse", branchRef], {
          cwd: remoteRoot,
        });
        const { stdout: localHead } = await execFileAsync("git", ["rev-parse", "HEAD"], {
          cwd: root,
        });
        expect(remoteHead.trim()).toBe(localHead.trim());

        const { stdout: remoteTag } = await execFileAsync(
          "git",
          ["rev-parse", "refs/tags/v0.2.7"],
          {
            cwd: remoteRoot,
          },
        );
        const { stdout: localTag } = await execFileAsync("git", ["rev-list", "-n", "1", "v0.2.7"], {
          cwd: root,
        });
        expect(remoteTag.trim()).toBe(localTag.trim());
      },
      RELEASE_APPLY_LONG_TIMEOUT_MS,
    );

    it(
      "pushes only the task branch for explicit branch_pr release candidates and keeps the tag unpublished",
      async () => {
        const root = await mkGitRepoRoot();
        await writeDefaultConfig(root);
        await writeWorkflowMode(root, "branch_pr");

        const remoteRoot = path.join(root, "remote.git");
        await execFileAsync("git", ["init", "--bare", remoteRoot], { cwd: root });
        await execFileAsync("git", ["remote", "add", "origin", remoteRoot], { cwd: root });

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
          ["checkout", "-b", "task/202604130750-E2J835/release-candidate-push"],
          { cwd: root },
        );

        await writeReleasePushScripts({
          root,
          prepublishBody: [
            "import { writeFile } from 'node:fs/promises';",
            String.raw`await writeFile('prepublish.marker', 'ran\n', 'utf8');`,
          ].join("\n"),
          registryBody: `${String.raw`process.stdout.write('npm version availability check passed\n');`}\n`,
        });

        await writeFile(path.join(root, "file.txt"), "x", "utf8");
        await commitAll(root, "feat: add file");

        await runReleasePlan({ cwd: root, rootOverride: root }, { bump: "patch", yes: false });
        await writeReleaseNotes(
          root,
          "0.2.7",
          ["# Release Notes — v0.2.7", "", "- A", "- B", "- C", "- D", "- E", ""].join("\n"),
        );

        const hookPath = path.join(root, ".git", "hooks", "pre-push");
        const markerPath = path.join(root, "pre-push.marker");
        await writeFile(
          hookPath,
          [
            "#!/bin/sh",
            String.raw`printf 'hook-ran\n' >> '${markerPath}'`,
            "echo 'pre-push hook should have been skipped' >&2",
            "exit 1",
            "",
          ].join("\n"),
          "utf8",
        );
        await execFileAsync("chmod", ["+x", hookPath], { cwd: root });

        const rcApply = await withDryRunReleaseMode(async () =>
          runReleaseCandidate(
            { cwd: root, rootOverride: root },
            { plan: undefined, yes: true, push: true, remote: "origin" },
          ),
        );
        expect(rcApply).toBe(0);

        await expect(readFile(markerPath, "utf8")).rejects.toThrow();

        const { stdout: localTagOut } = await execFileAsync("git", ["tag", "--list", "v0.2.7"], {
          cwd: root,
        });
        expect(localTagOut.trim()).toBe("");

        const { stdout: localBranch } = await execFileAsync(
          "git",
          ["symbolic-ref", "--short", "HEAD"],
          { cwd: root },
        );
        const branchRef = `refs/heads/${localBranch.trim()}`;
        const { stdout: remoteHead } = await execFileAsync("git", ["rev-parse", branchRef], {
          cwd: remoteRoot,
        });
        const { stdout: localHead } = await execFileAsync("git", ["rev-parse", "HEAD"], {
          cwd: root,
        });
        expect(remoteHead.trim()).toBe(localHead.trim());
        await expect(
          execFileAsync("git", ["rev-parse", "refs/tags/v0.2.7"], { cwd: remoteRoot }),
        ).rejects.toBeTruthy();

        const reportPath = path.join(root, ".agentplane", ".release", "apply", "latest.json");
        const report = JSON.parse(await readFile(reportPath, "utf8")) as {
          route?: { kind?: string };
          tag?: { created?: boolean; pushed?: boolean };
          push?: { performed?: boolean; refs?: string[] };
        };
        expect(report.route?.kind).toBe("release_candidate");
        expect(report.tag?.created).toBe(false);
        expect(report.tag?.pushed).toBe(false);
        expect(report.push?.performed).toBe(true);
        expect(report.push?.refs).toEqual(["HEAD"]);
      },
      RELEASE_APPLY_LONG_TIMEOUT_MS,
    );

    it("fails on a burned npm version before running release:prepublish or mutating local state", async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);

      const remoteRoot = path.join(root, "remote.git");
      await execFileAsync("git", ["init", "--bare", remoteRoot], { cwd: root });
      await execFileAsync("git", ["remote", "add", "origin", remoteRoot], { cwd: root });

      await mkdir(path.join(root, "packages", "core"), { recursive: true });
      await mkdir(path.join(root, "docs", "releases"), { recursive: true });
      await writeReleasePushScripts({
        root,
        prepublishBody: [
          "import { writeFile } from 'node:fs/promises';",
          String.raw`await writeFile('prepublish.marker', 'ran\n', 'utf8');`,
        ].join("\n"),
        registryBody: [
          String.raw`process.stderr.write('Version already published: agentplane@0.2.7\n');`,
          "process.exitCode = 1;",
        ].join("\n"),
      });

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
        ["# Release Notes — v0.2.7", "", "- A", "- B", "- C", "- D", "- E", ""].join("\n"),
        "utf8",
      );

      await expect(
        withDryRunReleaseMode(async () =>
          runReleaseApply(
            { cwd: root, rootOverride: root },
            { plan: undefined, yes: true, push: true, remote: "origin" },
          ),
        ),
      ).rejects.toMatchObject({
        code: "E_VALIDATION",
        context: {
          diagnostic_state: "the target npm version is not publishable",
          diagnostic_next_action_command:
            "node scripts/check-npm-version-availability.mjs --version 0.2.7",
        },
      });

      await expect(readFile(path.join(root, "prepublish.marker"), "utf8")).rejects.toThrow();
      const coreText = await readFile(path.join(root, "packages", "core", "package.json"), "utf8");
      expect(coreText).toContain('"version": "0.2.6"');
      const { stdout: tagOut } = await execFileAsync("git", ["tag", "--list", "v0.2.7"], {
        cwd: root,
      });
      expect(tagOut.trim()).toBe("");
    }, 60_000);

    it("fails on the fast release prepublish phase before running the heavy phase", async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);

      const remoteRoot = path.join(root, "remote.git");
      await execFileAsync("git", ["init", "--bare", remoteRoot], { cwd: root });
      await execFileAsync("git", ["remote", "add", "origin", remoteRoot], { cwd: root });

      await mkdir(path.join(root, "packages", "core"), { recursive: true });
      await mkdir(path.join(root, "docs", "releases"), { recursive: true });
      await writeReleasePushScripts({
        root,
        prepublishFastBody: [
          String.raw`process.stderr.write('fast phase failed\n');`,
          "process.exitCode = 1;",
        ].join("\n"),
        prepublishHeavyBody: [
          "import { writeFile } from 'node:fs/promises';",
          String.raw`await writeFile('prepublish-heavy.marker', 'ran\n', 'utf8');`,
        ].join("\n"),
        registryBody: `${String.raw`process.stdout.write('npm version availability check passed\n');`}\n`,
      });

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
        ["# Release Notes — v0.2.7", "", "- A", "- B", "- C", "- D", "- E", ""].join("\n"),
        "utf8",
      );

      await expect(
        withDryRunReleaseMode(async () =>
          runReleaseApply(
            { cwd: root, rootOverride: root },
            { plan: undefined, yes: true, push: true, remote: "origin" },
          ),
        ),
      ).rejects.toMatchObject({
        code: "E_VALIDATION",
        context: {
          diagnostic_state:
            "release prepublish fast validation failed before pushing the release tag",
          diagnostic_next_action_command: "bun run release:prepublish:fast",
        },
      });

      await expect(readFile(path.join(root, "prepublish-heavy.marker"), "utf8")).rejects.toThrow();
    }, 60_000);

    it("fails on an existing remote release tag before running release:prepublish or mutating local state", async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);

      const remoteRoot = path.join(root, "remote.git");
      await execFileAsync("git", ["init", "--bare", remoteRoot], { cwd: root });
      await execFileAsync("git", ["remote", "add", "origin", remoteRoot], { cwd: root });

      await mkdir(path.join(root, "packages", "core"), { recursive: true });
      await mkdir(path.join(root, "docs", "releases"), { recursive: true });
      await writeReleasePushScripts({
        root,
        prepublishBody: [
          "import { writeFile } from 'node:fs/promises';",
          String.raw`await writeFile('prepublish.marker', 'ran\n', 'utf8');`,
        ].join("\n"),
        registryBody: `${String.raw`process.stdout.write('npm version availability check passed\n');`}\n`,
      });

      await seedReleaseWorkspace(root, {
        coreVersion: "0.2.6",
        cliVersion: "0.2.6",
        recipesVersion: "0.2.6",
        dependencyVersion: "0.2.6",
        recipesDependencyVersion: "0.2.6",
      });
      await commitAll(root, "seed");
      await execFileAsync("git", ["tag", "v0.2.6"], { cwd: root });
      const { stdout: seedHash } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
      await execFileAsync("git", ["push", "origin", "HEAD:refs/heads/main"], { cwd: root });
      await execFileAsync("git", ["update-ref", "refs/tags/v0.2.7", seedHash.trim()], {
        cwd: remoteRoot,
      });

      await writeFile(path.join(root, "file.txt"), "x", "utf8");
      await commitAll(root, "feat: add file");

      await runReleasePlan({ cwd: root, rootOverride: root }, { bump: "patch", yes: false });
      await writeFile(
        path.join(root, "docs", "releases", "v0.2.7.md"),
        ["# Release Notes — v0.2.7", "", "- A", "- B", "- C", "- D", "- E", ""].join("\n"),
        "utf8",
      );

      await expect(
        withDryRunReleaseMode(async () =>
          runReleaseApply(
            { cwd: root, rootOverride: root },
            { plan: undefined, yes: true, push: true, remote: "origin" },
          ),
        ),
      ).rejects.toMatchObject({
        code: "E_GIT",
        context: {
          diagnostic_state: "the target release tag already exists on the remote",
          diagnostic_next_action_command: "git ls-remote --tags origin refs/tags/v0.2.7",
        },
      });

      await expect(readFile(path.join(root, "prepublish.marker"), "utf8")).rejects.toThrow();
      const coreText = await readFile(path.join(root, "packages", "core", "package.json"), "utf8");
      expect(coreText).toContain('"version": "0.2.6"');
      const { stdout: localTagOut } = await execFileAsync("git", ["tag", "--list", "v0.2.7"], {
        cwd: root,
      });
      expect(localTagOut.trim()).toBe("");
    }, 60_000);
  },
);
