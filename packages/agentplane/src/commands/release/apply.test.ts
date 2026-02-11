import { execFile } from "node:child_process";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { mkGitRepoRoot, writeDefaultConfig } from "../../cli/run-cli.test-helpers.js";
import { runReleasePlan } from "./plan.command.js";
import { runReleaseApply } from "./apply.command.js";

const execFileAsync = promisify(execFile);
const describeWhenNotHook = process.env.AGENTPLANE_HOOK_MODE === "1" ? describe.skip : describe;

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
      JSON.stringify({ name: "agentplane", version: "0.2.6" }, null, 2) + "\n",
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
      ["# Release Notes — v0.2.7", "", "- A", "- B", "- C", ""].join("\n"),
      "utf8",
    );

    const rcApply = await runReleaseApply(
      { cwd: root, rootOverride: root },
      { plan: undefined, yes: false, push: false, remote: "origin" },
    );
    expect(rcApply).toBe(0);

    const coreText = await readFile(path.join(root, "packages", "core", "package.json"), "utf8");
    expect(coreText).toContain('"version": "0.2.7"');

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
  }, 30_000);

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
      JSON.stringify({ name: "agentplane", version: "0.2.6" }, null, 2) + "\n",
      "utf8",
    );
    await commitAll(root, "seed");
    await execFileAsync("git", ["tag", "v0.2.6"], { cwd: root });

    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    await commitAll(root, "feat: add file");

    await runReleasePlan({ cwd: root, rootOverride: root }, { bump: "patch", yes: false });
    await writeFile(
      path.join(root, "docs", "releases", "v0.2.7.md"),
      ["# Release Notes — v0.2.7", "", "- A", "- B", "- C", ""].join("\n"),
      "utf8",
    );

    // Tracked dirty change that should block release apply.
    await writeFile(path.join(root, "file.txt"), "dirty", "utf8");

    await expect(
      runReleaseApply(
        { cwd: root, rootOverride: root },
        { plan: undefined, yes: false, push: false, remote: "origin" },
      ),
    ).rejects.toThrow(/clean tracked working tree/u);
  });

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
      JSON.stringify({ name: "agentplane", version: "0.2.6" }, null, 2) + "\n",
      "utf8",
    );
    await commitAll(root, "seed");
    await execFileAsync("git", ["tag", "v0.2.6"], { cwd: root });

    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    await commitAll(root, "feat: add file");

    await runReleasePlan({ cwd: root, rootOverride: root }, { bump: "patch", yes: false });
    await writeFile(
      path.join(root, "docs", "releases", "v0.2.7.md"),
      ["# Release Notes — v0.2.7", "", "- A", "- B", "- C", ""].join("\n"),
      "utf8",
    );
    await execFileAsync("git", ["tag", "v0.2.7"], { cwd: root });

    await expect(
      runReleaseApply(
        { cwd: root, rootOverride: root },
        { plan: undefined, yes: false, push: false, remote: "origin" },
      ),
    ).rejects.toThrow(/Tag already exists/u);
  });
});
