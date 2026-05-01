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
  listReleasePlanRuns,
  seedReleaseWorkspace,
  withDryRunReleaseMode,
  writeReleaseNotes,
} from "@agentplane/testkit/release";
import { runReleasePlan } from "./plan.command.js";
import { runReleaseApply } from "./apply.command.js";

const execFileAsync = promisify(execFile);
const RELEASE_APPLY_FULL_GATE_TIMEOUT_MS = 240_000;
const RELEASE_APPLY_PRIMARY_TIMEOUT_MS = 180_000;

describeWhenNotHook(
  "release apply: version mutation",
  { timeout: RELEASE_APPLY_FULL_GATE_TIMEOUT_MS },
  () => {
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
        const runs = await listReleasePlanRuns(root);
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

        const coreText = await readFile(
          path.join(root, "packages", "core", "package.json"),
          "utf8",
        );
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
  },
);
