import { execFile } from "node:child_process";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
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
import { seedReleaseWorkspace, writeReleaseNotes } from "@agentplane/testkit/release";
import { runReleasePlan } from "./plan.command.js";
import { pushReleaseRefs, runReleaseApply, runReleaseCandidate } from "./apply.command.js";
import { cleanHookEnv, packageDependencyExists } from "./apply.mutation.js";
import { readOptionalAgentplaneDependencyVersion } from "./apply.preflight.package.js";

const execFileAsync = promisify(execFile);
const ORIGINAL_DRY_RUN = process.env.AGENTPLANE_RELEASE_DRY_RUN;
const RELEASE_APPLY_LONG_TIMEOUT_MS = 120_000;
const RELEASE_APPLY_FULL_GATE_TIMEOUT_MS = 240_000;
const RELEASE_APPLY_PRIMARY_TIMEOUT_MS = 180_000;

async function withDryRunReleaseMode<T>(work: () => Promise<T>): Promise<T> {
  process.env.AGENTPLANE_RELEASE_DRY_RUN = "1";
  try {
    return await work();
  } finally {
    if (ORIGINAL_DRY_RUN === undefined) {
      delete process.env.AGENTPLANE_RELEASE_DRY_RUN;
    } else {
      process.env.AGENTPLANE_RELEASE_DRY_RUN = ORIGINAL_DRY_RUN;
    }
  }
}

async function listRuns(root: string): Promise<string[]> {
  const dir = path.join(root, ".agentplane", ".release", "plan");
  const runNames = await readdir(dir);
  return runNames
    .map((s) => s.trim())
    .filter(Boolean)
    .toSorted();
}

async function writeReleasePushScripts(opts: {
  root: string;
  prepublishBody?: string;
  prepublishFastBody?: string;
  prepublishHeavyBody?: string;
  registryBody: string;
}): Promise<void> {
  const heavyBody = opts.prepublishHeavyBody ?? opts.prepublishBody ?? "";
  const fastBody =
    opts.prepublishFastBody ??
    `${String.raw`process.stdout.write('release prepublish fast ok\n');`}\n`;
  await mkdir(path.join(opts.root, "scripts"), { recursive: true });
  await writeFile(
    path.join(opts.root, "package.json"),
    JSON.stringify(
      {
        name: "release-test-root",
        private: true,
        scripts: {
          "release:prepublish:fast": "node scripts/prepublish-fast.mjs",
          "release:prepublish:heavy": "node scripts/prepublish-heavy.mjs",
          "release:prepublish":
            "node scripts/prepublish-fast.mjs && node scripts/prepublish-heavy.mjs",
        },
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );
  await writeFile(path.join(opts.root, "scripts", "prepublish-fast.mjs"), fastBody, "utf8");
  await writeFile(path.join(opts.root, "scripts", "prepublish-heavy.mjs"), heavyBody, "utf8");
  await writeFile(
    path.join(opts.root, "scripts", "check-npm-version-availability.mjs"),
    opts.registryBody,
    "utf8",
  );
}

async function writeWorkflowMode(root: string, mode: "direct" | "branch_pr"): Promise<void> {
  const configPath = path.join(root, ".agentplane", "config.json");
  const raw = JSON.parse(await readFile(configPath, "utf8")) as Record<string, unknown>;
  raw.workflow_mode = mode;
  await writeFile(configPath, JSON.stringify(raw, null, 2) + "\n", "utf8");
}

describeWhenNotHook("release apply", { timeout: RELEASE_APPLY_FULL_GATE_TIMEOUT_MS }, () => {
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

  it(
    "bumps versions, commits, and tags using the latest plan",
    async () => {
      const root = await mkGitRepoRootWithBranch("release/v0.2.7");
      await writeDefaultConfig(root);
      await seedReleaseWorkspace(root, {
        coreVersion: "0.2.6",
        cliVersion: "0.2.6",
        recipesVersion: "0.2.6",
        dependencyVersion: "0.2.6",
        recipesDependencyVersion: "0.2.6",
      });
      await mkdir(path.join(root, "packages", "testkit"), { recursive: true });
      await writeFile(
        path.join(root, "packages", "testkit", "package.json"),
        JSON.stringify(
          {
            name: "@agentplane/testkit",
            version: "0.0.0",
            private: true,
            dependencies: { "@agentplaneorg/core": "0.2.6" },
          },
          null,
          2,
        ) + "\n",
        "utf8",
      );
      await commitAll(root, "seed");
      await execFileAsync("git", ["tag", "v0.2.6"], { cwd: root });

      await writeFile(path.join(root, "file.txt"), "x", "utf8");
      await commitAll(root, "feat: add file");

      const rcPlan = await runReleasePlan(
        { cwd: root, rootOverride: root },
        { bump: "patch", yes: false },
      );
      expect(rcPlan).toBe(0);

      // Mimic the DOCS agent: write release notes for the computed tag.
      const runs = await listRuns(root);
      const latest = runs.at(-1) ?? "";
      const versionJsonPath = path.join(
        root,
        ".agentplane",
        ".release",
        "plan",
        latest,
        "version.json",
      );
      const versionJson = JSON.parse(await readFile(versionJsonPath, "utf8")) as {
        nextTag?: string;
      };
      const nextTag = String(versionJson.nextTag ?? "");
      expect(nextTag).toBe("v0.2.7");

      await writeReleaseNotes(
        root,
        nextTag.replace(/^v/u, ""),
        ["# Release Notes — v0.2.7", "", "- A", "- B", "- C", "- D", "- E", ""].join("\n"),
      );

      const rcApply = await withDryRunReleaseMode(async () =>
        runReleaseApply(
          { cwd: root, rootOverride: root },
          { plan: undefined, yes: false, push: false, remote: "origin" },
        ),
      );
      expect(rcApply).toBe(0);

      const coreText = await readFile(path.join(root, "packages", "core", "package.json"), "utf8");
      const recipesText = await readFile(
        path.join(root, "packages", "recipes", "package.json"),
        "utf8",
      );
      const recipesRuntimeText = await readFile(
        path.join(root, "packages", "recipes", "src", "index.ts"),
        "utf8",
      );
      const testkitText = await readFile(
        path.join(root, "packages", "testkit", "package.json"),
        "utf8",
      );
      const agentplaneText = await readFile(
        path.join(root, "packages", "agentplane", "package.json"),
        "utf8",
      );
      const configText = await readFile(path.join(root, ".agentplane", "config.json"), "utf8");
      expect(coreText).toContain('"version": "0.2.7"');
      expect(recipesText).toContain('"version": "0.2.7"');
      expect(recipesRuntimeText).toContain('RECIPES_VERSION = "0.2.7"');
      expect(agentplaneText).toContain('"version": "0.2.7"');
      expect(agentplaneText).toContain('"@agentplaneorg/core": "0.2.7"');
      expect(agentplaneText).toContain('"@agentplaneorg/recipes": "0.2.7"');
      expect(testkitText).toContain('"@agentplaneorg/core": "0.2.7"');
      expect(configText).toContain('"expected_version": "0.2.7"');

      const { stdout: tagOut } = await execFileAsync("git", ["tag", "--list", "v0.2.7"], {
        cwd: root,
      });
      expect(tagOut.trim()).toBe("v0.2.7");

      const { stdout: committedFiles } = await execFileAsync(
        "git",
        ["show", "--name-only", "--format=", "HEAD"],
        { cwd: root },
      );
      expect(committedFiles).toContain(".agentplane/config.json");
      expect(committedFiles).toContain("packages/recipes/package.json");
      expect(committedFiles).toContain("packages/recipes/src/index.ts");
      expect(committedFiles).toContain("packages/testkit/package.json");

      const reportPath = path.join(root, ".agentplane", ".release", "apply", "latest.json");
      const report = JSON.parse(await readFile(reportPath, "utf8")) as {
        next_tag?: string;
        next_version?: string;
        commit?: { subject?: string } | null;
        checks?: { notes_validated?: boolean };
      };
      expect(report.next_tag).toBe("v0.2.7");
      expect(report.next_version).toBe("0.2.7");
      expect(report.checks?.notes_validated).toBe(true);
      expect(report.commit?.subject).toContain("release: publish v0.2.7");
    },
    RELEASE_APPLY_PRIMARY_TIMEOUT_MS,
  );

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
        ["# Release Notes — v0.2.7", "", "- A", "- B", "- C", "- D", "- E", ""].join("\n"),
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
    "allows local release apply without mandatory direct push",
    async () => {
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
        ["# Release Notes — v0.2.7", "", "- A", "- B", "- C", "- D", "- E", ""].join("\n"),
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
      await writeReleaseNotes(
        root,
        "0.2.7",
        ["# Release Notes — v0.2.7", "", "- A", "- B", "- C", "- D", "- E", ""].join("\n"),
      );

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
      ["# Release Notes — v0.2.7", "", "- A", "- B", "- C", "- D", "- E", ""].join("\n"),
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
      ["# Release Notes — v0.2.7", "", "- A", ""].join("\n"),
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

  it("regenerates and commits generated package reference after bumping release versions", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    await mkdir(path.join(root, "packages", "core"), { recursive: true });
    await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
    await mkdir(path.join(root, "packages", "recipes"), { recursive: true });
    await mkdir(path.join(root, "docs", "releases"), { recursive: true });
    await mkdir(path.join(root, "docs", "reference"), { recursive: true });
    await mkdir(path.join(root, "scripts"), { recursive: true });

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
    await writeFile(
      path.join(root, "docs", "reference", "generated-reference.mdx"),
      [
        "# Generated Reference",
        "",
        "| Package | Version |",
        "| --- | --- |",
        "| agentplane | 0.2.6 |",
        "| @agentplaneorg/core | 0.2.6 |",
        "| @agentplaneorg/recipes | 0.2.6 |",
        "",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      path.join(root, "scripts", "generate-website-docs.mjs"),
      [
        "import { mkdir, readFile, writeFile } from 'node:fs/promises';",
        "import path from 'node:path';",
        "",
        "const root = process.cwd();",
        "const core = JSON.parse(await readFile(path.join(root, 'packages', 'core', 'package.json'), 'utf8'));",
        "const cli = JSON.parse(await readFile(path.join(root, 'packages', 'agentplane', 'package.json'), 'utf8'));",
        "const recipes = JSON.parse(await readFile(path.join(root, 'packages', 'recipes', 'package.json'), 'utf8'));",
        "const outDir = path.join(root, 'docs', 'reference');",
        "await mkdir(outDir, { recursive: true });",
        "await writeFile(",
        "  path.join(outDir, 'generated-reference.mdx'),",
        "  [",
        "    '# Generated Reference',",
        "    '',",
        "    '| Package | Version |',",
        "    '| --- | --- |',",
        "    `| agentplane | ${cli.version} |`,",
        "    `| @agentplaneorg/core | ${core.version} |`,",
        "    `| @agentplaneorg/recipes | ${recipes.version} |`,",
        "    '',",
        String.raw`  ].join('\n'),`,
        "  'utf8',",
        ");",
        "",
      ].join("\n"),
      "utf8",
    );
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

    const rcApply = await withDryRunReleaseMode(async () =>
      runReleaseApply(
        { cwd: root, rootOverride: root },
        { plan: undefined, yes: false, push: false, remote: "origin" },
      ),
    );
    expect(rcApply).toBe(0);

    const generatedRef = await readFile(
      path.join(root, "docs", "reference", "generated-reference.mdx"),
      "utf8",
    );
    expect(generatedRef).toContain("| agentplane | 0.2.7 |");
    expect(generatedRef).toContain("| @agentplaneorg/core | 0.2.7 |");
    expect(generatedRef).toContain("| @agentplaneorg/recipes | 0.2.7 |");

    const { stdout: committedFiles } = await execFileAsync(
      "git",
      ["show", "--name-only", "--format=", "HEAD"],
      { cwd: root },
    );
    expect(committedFiles).toContain("docs/reference/generated-reference.mdx");
  }, 60_000);

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

      const { stdout: remoteTag } = await execFileAsync("git", ["rev-parse", "refs/tags/v0.2.7"], {
        cwd: remoteRoot,
      });
      const { stdout: localTag } = await execFileAsync("git", ["rev-list", "-n", "1", "v0.2.7"], {
        cwd: root,
      });
      expect(remoteTag.trim()).toBe(localTag.trim());
    },
    RELEASE_APPLY_LONG_TIMEOUT_MS,
  );

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
      await execFileAsync("git", ["checkout", "-b", "task/202604130750-E2J835/release-candidate"], {
        cwd: root,
      });

      await writeFile(path.join(root, "file.txt"), "x", "utf8");
      await commitAll(root, "feat: add file");

      await runReleasePlan({ cwd: root, rootOverride: root }, { bump: "patch", yes: false });
      await writeReleaseNotes(
        root,
        "0.2.7",
        ["# Release Notes — v0.2.7", "", "- A", "- B", "- C", "- D", "- E", ""].join("\n"),
      );

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
      await writeReleaseNotes(
        root,
        "0.2.7",
        ["# Release Notes — v0.2.7", "", "- A", "- B", "- C", "- D", "- E", ""].join("\n"),
      );

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
      await writeReleaseNotes(
        root,
        "0.2.7",
        ["# Release Notes — v0.2.7", "", "- A", "- B", "- C", "- D", "- E", ""].join("\n"),
      );

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

  it(
    "skips local tag creation on branch_pr task branches when preparing an explicit release candidate",
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
      await execFileAsync("git", ["checkout", "-b", "task/202604130750-E2J835/release-candidate"], {
        cwd: root,
      });

      await writeFile(path.join(root, "file.txt"), "x", "utf8");
      await commitAll(root, "feat: add file");

      const rcPlan = await runReleasePlan(
        { cwd: root, rootOverride: root },
        { bump: "patch", yes: false },
      );
      expect(rcPlan).toBe(0);
      await writeReleaseNotes(
        root,
        "0.2.7",
        ["# Release Notes — v0.2.7", "", "- A", "- B", "- C", "- D", "- E", ""].join("\n"),
      );

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

  it(
    "fails when the current package versions drift past the release-plan baseline",
    async () => {
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
        ["# Release Notes — v0.2.7", "", "- A", "- B", "- C", "- D", "- E", ""].join("\n"),
        "utf8",
      );

      await writeFile(
        path.join(root, "packages", "core", "package.json"),
        JSON.stringify({ name: "@agentplaneorg/core", version: "0.2.7" }, null, 2) + "\n",
        "utf8",
      );
      await writeFile(
        path.join(root, "packages", "recipes", "package.json"),
        JSON.stringify({ name: "@agentplaneorg/recipes", version: "0.2.7" }, null, 2) + "\n",
        "utf8",
      );
      await writeFile(
        path.join(root, "packages", "agentplane", "package.json"),
        JSON.stringify(
          {
            name: "agentplane",
            version: "0.2.7",
            dependencies: {
              "@agentplaneorg/core": "0.2.7",
              "@agentplaneorg/recipes": "0.2.7",
            },
          },
          null,
          2,
        ) + "\n",
        "utf8",
      );
      await commitAll(root, "drift versions");

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
          diagnostic_state:
            "the repository version no longer matches the prepared release-plan baseline",
          diagnostic_next_action_command: "agentplane release plan",
        },
      });
    },
    RELEASE_APPLY_FULL_GATE_TIMEOUT_MS,
  );
});
