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
  validReleaseNotesBody,
  withDryRunReleaseMode,
  writeReleaseNotes,
} from "@agentplane/testkit/release";
import { runReleaseCommandExecute } from "./apply.pipeline/mutation.js";
import type { ReleaseCommandState } from "./apply.types.js";
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
          recipesCoreDependencyVersion: "0.2.6",
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

        await writeReleaseNotes(root, nextTag.replace(/^v/u, ""), validReleaseNotesBody("0.2.7"));

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
        const workflowText = await readFile(path.join(root, ".agentplane", "WORKFLOW.md"), "utf8");
        expect(coreText).toContain('"version": "0.2.7"');
        expect(recipesText).toContain('"version": "0.2.7"');
        expect(recipesText).toContain('"@agentplaneorg/core": "0.2.7"');
        expect(recipesRuntimeText).toContain('RECIPES_VERSION = "0.2.7"');
        expect(agentplaneText).toContain('"version": "0.2.7"');
        expect(agentplaneText).toContain('"@agentplaneorg/core": "0.2.7"');
        expect(agentplaneText).toContain('"@agentplaneorg/recipes": "0.2.7"');
        expect(testkitText).toContain('"@agentplaneorg/core": "0.2.7"');
        expect(workflowText).toContain("expected_version: 0.2.7");

        const { stdout: tagOut } = await execFileAsync("git", ["tag", "--list", "v0.2.7"], {
          cwd: root,
        });
        expect(tagOut.trim()).toBe("v0.2.7");

        const { stdout: committedFiles } = await execFileAsync(
          "git",
          ["show", "--name-only", "--format=", "HEAD"],
          { cwd: root },
        );
        expect(committedFiles).toContain(".agentplane/WORKFLOW.md");
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
      await mkdir(path.join(root, "scripts", "generate"), { recursive: true });

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
        path.join(root, "scripts", "generate", "generate-package-reference.mjs"),
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
        validReleaseNotesBody("0.2.7"),
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

    it.each([true, false])(
      "native mutation keeps recipes/core aligned when edge present=%s and is byte-stable on repeat",
      async (present) => {
        const root = await mkGitRepoRoot();
        await writeDefaultConfig(root);
        await seedReleaseWorkspace(root, {
          coreVersion: "0.7.12",
          recipesCoreDependencyVersion: present ? "0.7.12" : undefined,
        });
        const recipesPkgPath = path.join(root, "packages/recipes/package.json");
        const original = JSON.parse(await readFile(recipesPkgPath, "utf8")) as {
          version: string;
          dependencies?: Record<string, string>;
        };
        original.dependencies = { ...original.dependencies, zod: "^4.0.0" };
        await writeFile(recipesPkgPath, `${JSON.stringify(original, null, 2)}\n`);
        await writeReleaseNotes(root, "0.7.13", validReleaseNotesBody("0.7.13"));
        await commitAll(root, "seed native mutation fixture");
        const state: ReleaseCommandState = {
          resolved: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") },
          gitRoot: root,
          planDir: path.join(root, ".agentplane/.release/plan/fixture"),
          plan: {
            prevTag: "v0.7.12",
            prevVersion: "0.7.12",
            nextTag: "v0.7.13",
            nextVersion: "0.7.13",
            bump: "patch",
          },
          notesPath: path.join(root, "docs/releases/v0.7.13.md"),
          taskBranchPrefix: "task",
          route: {
            kind: "direct_release",
            workflow_mode: "direct",
            current_branch: "main",
            base_branch: null,
          },
          corePkgPath: path.join(root, "packages/core/package.json"),
          agentplanePkgPath: path.join(root, "packages/agentplane/package.json"),
          recipesPkgPath,
          testkitPkgPath: path.join(root, "packages/testkit/package.json"),
          npmVersionChecked: false,
        };
        const result = await withDryRunReleaseMode(() => runReleaseCommandExecute(state));
        expect(result.releaseCommit).not.toBeNull();
        const after = await readFile(recipesPkgPath, "utf8");
        const recipes = JSON.parse(after) as typeof original;
        expect(recipes.version).toBe("0.7.13");
        expect(recipes.dependencies).toEqual({
          ...(present ? { "@agentplaneorg/core": "0.7.13" } : {}),
          zod: "^4.0.0",
        });
        const parityScript = path.resolve(process.cwd(), "scripts/check-release-parity.mjs");
        await expect(execFileAsync("node", [parityScript], { cwd: root })).resolves.toBeDefined();
        await withDryRunReleaseMode(() => runReleaseCommandExecute(state));
        expect(await readFile(recipesPkgPath, "utf8")).toBe(after);

        if (present) {
          recipes.dependencies!["@agentplaneorg/core"] = "0.7.12";
          await writeFile(recipesPkgPath, JSON.stringify(recipes));
          await expect(execFileAsync("node", [parityScript], { cwd: root })).rejects.toMatchObject({
            stderr: expect.stringContaining(
              "@agentplaneorg/core=0.7.12 does not match workspace version 0.7.13",
            ) as unknown,
          });
        }
      },
      60_000,
    );

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
          validReleaseNotesBody("0.2.7"),
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
