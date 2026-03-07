import { execFile } from "node:child_process";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { mkGitRepoRoot, writeDefaultConfig } from "../../cli/run-cli.test-helpers.js";
import { runReleasePlan } from "./plan.command.js";
import { pushReleaseRefs, runReleaseApply } from "./apply.command.js";

const execFileAsync = promisify(execFile);
const describeWhenNotHook = process.env.AGENTPLANE_HOOK_MODE === "1" ? describe.skip : describe;
const ORIGINAL_DRY_RUN = process.env.AGENTPLANE_RELEASE_DRY_RUN;

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

async function commitAll(root: string, message: string): Promise<void> {
  await execFileAsync("git", ["add", "-A"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", message], { cwd: root });
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
  prepublishBody: string;
  registryBody: string;
}): Promise<void> {
  await mkdir(path.join(opts.root, "scripts"), { recursive: true });
  await writeFile(
    path.join(opts.root, "package.json"),
    JSON.stringify(
      {
        name: "release-test-root",
        private: true,
        scripts: {
          "release:prepublish": "node scripts/prepublish-marker.mjs",
        },
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );
  await writeFile(
    path.join(opts.root, "scripts", "prepublish-marker.mjs"),
    opts.prepublishBody,
    "utf8",
  );
  await writeFile(
    path.join(opts.root, "scripts", "check-npm-version-availability.mjs"),
    opts.registryBody,
    "utf8",
  );
}

describeWhenNotHook("release apply", () => {
  it("bumps versions, commits, and tags using the latest plan", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    await mkdir(path.join(root, "packages", "core"), { recursive: true });
    await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
    await mkdir(path.join(root, "docs", "releases"), { recursive: true });

    await writeFile(
      path.join(root, "packages", "core", "package.json"),
      JSON.stringify({ name: "@agentplaneorg/core", version: "0.2.6" }, null, 2) + "\n",
      "utf8",
    );
    await writeFile(
      path.join(root, "packages", "agentplane", "package.json"),
      JSON.stringify(
        { name: "agentplane", version: "0.2.6", dependencies: { "@agentplaneorg/core": "0.2.6" } },
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
    const versionJson = JSON.parse(await readFile(versionJsonPath, "utf8")) as { nextTag?: string };
    const nextTag = String(versionJson.nextTag ?? "");
    expect(nextTag).toBe("v0.2.7");

    await writeFile(
      path.join(root, "docs", "releases", `${nextTag}.md`),
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

    const coreText = await readFile(path.join(root, "packages", "core", "package.json"), "utf8");
    const agentplaneText = await readFile(
      path.join(root, "packages", "agentplane", "package.json"),
      "utf8",
    );
    expect(coreText).toContain('"version": "0.2.7"');
    expect(agentplaneText).toContain('"version": "0.2.7"');
    expect(agentplaneText).toContain('"@agentplaneorg/core": "0.2.7"');

    const { stdout: tagOut } = await execFileAsync("git", ["tag", "--list", "v0.2.7"], {
      cwd: root,
    });
    expect(tagOut.trim()).toBe("v0.2.7");

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
    expect(report.commit?.subject).toContain("release: v0.2.7");
  }, 90_000);

  it("fails when tracked tree is dirty before apply", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    await mkdir(path.join(root, "packages", "core"), { recursive: true });
    await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
    await mkdir(path.join(root, "docs", "releases"), { recursive: true });

    await writeFile(
      path.join(root, "packages", "core", "package.json"),
      JSON.stringify({ name: "@agentplaneorg/core", version: "0.2.6" }, null, 2) + "\n",
      "utf8",
    );
    await writeFile(
      path.join(root, "packages", "agentplane", "package.json"),
      JSON.stringify(
        { name: "agentplane", version: "0.2.6", dependencies: { "@agentplaneorg/core": "0.2.6" } },
        null,
        2,
      ) + "\n",
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
  }, 60_000);

  it("requires --push in normal mode for non-dry-run release apply", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    await mkdir(path.join(root, "packages", "core"), { recursive: true });
    await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
    await mkdir(path.join(root, "docs", "releases"), { recursive: true });

    await writeFile(
      path.join(root, "packages", "core", "package.json"),
      JSON.stringify({ name: "@agentplaneorg/core", version: "0.2.6" }, null, 2) + "\n",
      "utf8",
    );
    await writeFile(
      path.join(root, "packages", "agentplane", "package.json"),
      JSON.stringify(
        { name: "agentplane", version: "0.2.6", dependencies: { "@agentplaneorg/core": "0.2.6" } },
        null,
        2,
      ) + "\n",
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

    const wasDryRun = process.env.AGENTPLANE_RELEASE_DRY_RUN;
    delete process.env.AGENTPLANE_RELEASE_DRY_RUN;

    await expect(
      runReleaseApply(
        { cwd: root, rootOverride: root },
        { plan: undefined, yes: true, push: false, remote: "origin" },
      ),
    ).rejects.toThrow(/Release publish is mandatory/u);

    if (wasDryRun === undefined) {
      delete process.env.AGENTPLANE_RELEASE_DRY_RUN;
    } else {
      process.env.AGENTPLANE_RELEASE_DRY_RUN = wasDryRun;
    }
  }, 30_000);

  it("fails early when release tag already exists", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    await mkdir(path.join(root, "packages", "core"), { recursive: true });
    await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
    await mkdir(path.join(root, "docs", "releases"), { recursive: true });

    await writeFile(
      path.join(root, "packages", "core", "package.json"),
      JSON.stringify({ name: "@agentplaneorg/core", version: "0.2.6" }, null, 2) + "\n",
      "utf8",
    );
    await writeFile(
      path.join(root, "packages", "agentplane", "package.json"),
      JSON.stringify(
        { name: "agentplane", version: "0.2.6", dependencies: { "@agentplaneorg/core": "0.2.6" } },
        null,
        2,
      ) + "\n",
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
    await mkdir(path.join(root, "docs", "releases"), { recursive: true });

    await writeFile(
      path.join(root, "packages", "core", "package.json"),
      JSON.stringify({ name: "@agentplaneorg/core", version: "0.2.6" }, null, 2) + "\n",
      "utf8",
    );
    await writeFile(
      path.join(root, "packages", "agentplane", "package.json"),
      JSON.stringify(
        { name: "agentplane", version: "0.2.6", dependencies: { "@agentplaneorg/core": "0.2.6" } },
        null,
        2,
      ) + "\n",
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
        { name: "agentplane", version: "0.2.6", dependencies: { "@agentplaneorg/core": "0.2.6" } },
        null,
        2,
      ) + "\n",
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

    const { stdout: committedFiles } = await execFileAsync(
      "git",
      ["show", "--name-only", "--format=", "HEAD"],
      { cwd: root },
    );
    expect(committedFiles).toContain("docs/reference/generated-reference.mdx");
  });

  it("pushes release refs with --no-verify to avoid recursive local pre-push hooks", async () => {
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
  }, 30_000);

  it("fails on a burned npm version before running release:prepublish or mutating local state", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const remoteRoot = path.join(root, "remote.git");
    await execFileAsync("git", ["init", "--bare", remoteRoot], { cwd: root });
    await execFileAsync("git", ["remote", "add", "origin", remoteRoot], { cwd: root });

    await mkdir(path.join(root, "packages", "core"), { recursive: true });
    await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
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

    await writeFile(
      path.join(root, "packages", "core", "package.json"),
      JSON.stringify({ name: "@agentplaneorg/core", version: "0.2.6" }, null, 2) + "\n",
      "utf8",
    );
    await writeFile(
      path.join(root, "packages", "agentplane", "package.json"),
      JSON.stringify(
        { name: "agentplane", version: "0.2.6", dependencies: { "@agentplaneorg/core": "0.2.6" } },
        null,
        2,
      ) + "\n",
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
  });

  it("fails on an existing remote release tag before running release:prepublish or mutating local state", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const remoteRoot = path.join(root, "remote.git");
    await execFileAsync("git", ["init", "--bare", remoteRoot], { cwd: root });
    await execFileAsync("git", ["remote", "add", "origin", remoteRoot], { cwd: root });

    await mkdir(path.join(root, "packages", "core"), { recursive: true });
    await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
    await mkdir(path.join(root, "docs", "releases"), { recursive: true });
    await writeReleasePushScripts({
      root,
      prepublishBody: [
        "import { writeFile } from 'node:fs/promises';",
        String.raw`await writeFile('prepublish.marker', 'ran\n', 'utf8');`,
      ].join("\n"),
      registryBody: `${String.raw`process.stdout.write('npm version availability check passed\n');`}\n`,
    });

    await writeFile(
      path.join(root, "packages", "core", "package.json"),
      JSON.stringify({ name: "@agentplaneorg/core", version: "0.2.6" }, null, 2) + "\n",
      "utf8",
    );
    await writeFile(
      path.join(root, "packages", "agentplane", "package.json"),
      JSON.stringify(
        { name: "agentplane", version: "0.2.6", dependencies: { "@agentplaneorg/core": "0.2.6" } },
        null,
        2,
      ) + "\n",
      "utf8",
    );
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
  });

  it("fails when the current package versions drift past the release-plan baseline", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    await mkdir(path.join(root, "packages", "core"), { recursive: true });
    await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
    await mkdir(path.join(root, "docs", "releases"), { recursive: true });

    await writeFile(
      path.join(root, "packages", "core", "package.json"),
      JSON.stringify({ name: "@agentplaneorg/core", version: "0.2.6" }, null, 2) + "\n",
      "utf8",
    );
    await writeFile(
      path.join(root, "packages", "agentplane", "package.json"),
      JSON.stringify(
        { name: "agentplane", version: "0.2.6", dependencies: { "@agentplaneorg/core": "0.2.6" } },
        null,
        2,
      ) + "\n",
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

    await writeFile(
      path.join(root, "packages", "core", "package.json"),
      JSON.stringify({ name: "@agentplaneorg/core", version: "0.2.7" }, null, 2) + "\n",
      "utf8",
    );
    await writeFile(
      path.join(root, "packages", "agentplane", "package.json"),
      JSON.stringify(
        { name: "agentplane", version: "0.2.7", dependencies: { "@agentplaneorg/core": "0.2.7" } },
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
  });
});
