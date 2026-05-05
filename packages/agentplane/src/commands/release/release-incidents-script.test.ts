import { execFile } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/check-release-incidents.mjs");

let tempDirs: string[] = [];

async function makeIncidentFile(text: string): Promise<string> {
  const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-release-incidents-"));
  tempDirs.push(dir);
  const filePath = path.join(dir, "incidents.md");
  await writeFile(filePath, text, "utf8");
  return filePath;
}

describe("release incident gate script", () => {
  afterEach(async () => {
    await Promise.all(tempDirs.map((dir) => rm(dir, { recursive: true, force: true })));
    tempDirs = [];
  });

  it("passes when the active incident registry has only the header", async () => {
    const incidentsPath = await makeIncidentFile(
      "# Policy Incidents Log\n\n- Append-only. Required fields: `id`.\n",
    );

    const result = await execFileAsync(process.execPath, [SCRIPT_PATH, "--path", incidentsPath]);

    expect(result.stdout).toContain("Release incident gate passed");
  });

  it("fails release checks when incidents.md still contains active entries", async () => {
    const incidentsPath = await makeIncidentFile(
      [
        "# Policy Incidents Log",
        "",
        "- Append-only. Required fields: `id`.",
        "- id: INC-20260505-01 | date: 2026-05-05 | scope: release | failure: still active | rule: fix first | evidence: task T | enforcement: manual | state: open",
        "- id: INC-20260505-02 | date: 2026-05-05 | scope: release | failure: still active | rule: fix first | evidence: task T | enforcement: manual | state: stabilized",
        "",
      ].join("\n"),
    );

    const result = await execFileAsync(process.execPath, [
      SCRIPT_PATH,
      "--path",
      incidentsPath,
    ]).then(
      () => {
        throw new Error("expected release incident check to fail");
      },
      (error: { stderr?: string; stdout?: string; code?: number }) => error,
    );

    expect(result.code).toBe(1);
    expect(result.stderr).toContain("release incident gate failed");
    expect(result.stderr).toContain("INC-20260505-01");
    expect(result.stderr).toContain("INC-20260505-02");
    expect(result.stderr).toContain("dedicated incident review/fix task");
  });
});
