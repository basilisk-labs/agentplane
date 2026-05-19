import { execFile } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { captureStdIO, commitAll, mkGitRepoRoot } from "@agentplane/testkit";
import { expect, it } from "vitest";

import type { CommandContext } from "../shared/task-backend.js";
import { warnIfLocalTaskStateBehindUpstream } from "./list.js";

const execFileAsync = promisify(execFile);

it("warns when local task listing is behind its upstream tracking branch", async () => {
  const root = await mkGitRepoRoot();
  await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
  await commitAll(root, "seed local task state");
  const { stdout: branchOut } = await execFileAsync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
    cwd: root,
  });
  const currentBranch = String(branchOut).trim();

  await execFileAsync("git", ["checkout", "-b", "upstream-task-state"], { cwd: root });
  await writeFile(path.join(root, "upstream-task-state.txt"), "upstream\n", "utf8");
  await commitAll(root, "upstream task state");
  const { stdout: upstreamShaOut } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: root,
  });

  await execFileAsync("git", ["checkout", currentBranch], { cwd: root });
  await execFileAsync(
    "git",
    ["update-ref", `refs/remotes/origin/${currentBranch}`, String(upstreamShaOut).trim()],
    { cwd: root },
  );
  await execFileAsync("git", ["remote", "add", "origin", "https://example.invalid/repo.git"], {
    cwd: root,
  });
  await execFileAsync("git", ["branch", "--set-upstream-to", `origin/${currentBranch}`], {
    cwd: root,
  });

  const io = captureStdIO();
  try {
    await warnIfLocalTaskStateBehindUpstream({
      resolvedProject: { gitRoot: root },
    } as CommandContext);
    expect(io.stderr).toContain("local task state may be stale");
    expect(io.stderr).toContain(`behind origin/${currentBranch} by 1 commit`);
  } finally {
    io.restore();
  }
});
