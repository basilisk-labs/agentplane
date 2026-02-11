import { execFile } from "node:child_process";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { mkGitRepoRoot, writeDefaultConfig } from "../../cli/run-cli.test-helpers.js";
import { runReleasePlan, releasePlanSpec } from "./plan.command.js";

const execFileAsync = promisify(execFile);
const describeWhenNotHook = process.env.AGENTPLANE_HOOK_MODE === "1" ? describe.skip : describe;

async function commitAll(root: string, message: string): Promise<void> {
  await execFileAsync("git", ["add", "-A"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", message], { cwd: root });
}

describeWhenNotHook("release plan", () => {
  it("writes a release plan dir with changes list and next patch version", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    await mkdir(path.join(root, "packages", "core"), { recursive: true });
    await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
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
    };
    expect(version.prevTag).toBe("v0.2.6");
    expect(version.nextTag).toBe("v0.2.7");
    expect(version.nextVersion).toBe("0.2.7");
    expect(version.bump).toBe("patch");

    const instructions = await readFile(path.join(runDir, "instructions.md"), "utf8");
    expect(instructions).toContain("docs/releases/v0.2.7.md");
    const changesMd = await readFile(path.join(runDir, "changes.md"), "utf8");
    expect(changesMd).toContain("feat: add file");
  });

  it("requires --yes for minor/major bumps", () => {
    expect(() =>
      releasePlanSpec.validate?.({ bump: "minor", yes: false, since: undefined }),
    ).toThrow(/requires explicit approval/i);
    expect(() =>
      releasePlanSpec.validate?.({ bump: "major", yes: false, since: undefined }),
    ).toThrow(/requires explicit approval/i);
  });
});
