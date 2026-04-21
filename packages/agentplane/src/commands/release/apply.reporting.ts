import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";

import type { ReleaseApplyReport } from "./apply.types.js";

async function pushRefspecsNoVerify(
  gitRoot: string,
  remote: string,
  refspecs: readonly string[],
): Promise<void> {
  for (const refspec of refspecs) {
    await execFileAsync("git", ["push", "--no-verify", remote, refspec], {
      cwd: gitRoot,
      env: gitEnv(),
    });
  }
}

export async function writeReleaseApplyReport(
  gitRoot: string,
  report: ReleaseApplyReport,
): Promise<string> {
  const runId = new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
  const dir = path.join(gitRoot, ".agentplane", ".release", "apply");
  await mkdir(dir, { recursive: true });
  const reportPath = path.join(dir, `${runId}.json`);
  const latestPath = path.join(dir, "latest.json");
  const text = `${JSON.stringify(report, null, 2)}\n`;
  await writeFile(reportPath, text, "utf8");
  await writeFile(latestPath, text, "utf8");
  return reportPath;
}

export async function pushReleaseRefs(gitRoot: string, remote: string, tag: string): Promise<void> {
  await pushRefspecsNoVerify(gitRoot, remote, ["HEAD", tag]);
}

export async function pushReleaseCandidateBranch(gitRoot: string, remote: string): Promise<void> {
  await pushRefspecsNoVerify(gitRoot, remote, ["HEAD"]);
}
