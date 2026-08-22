import path from "node:path";
import { writeFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";
import { captureStdIO, mkGitRepoRootWithCommit, runCliSilent } from "@agentplane/testkit";

import { runCli } from "../../cli/run-cli.js";

describe("Hermes reconciliation duplicates", () => {
  it("flags duplicate cards for the same Agentplane task id", async () => {
    const root = await mkGitRepoRootWithCommit();
    await runCliSilent(["init", "--yes", "--root", root]);
    const statePath = path.join(root, "hermes-state.json");
    await writeFile(
      statePath,
      JSON.stringify({
        cards: [
          {
            id: "hk_123",
            metadata: { agentplane: { task_id: "202606010001-AAAAAA" } },
          },
          {
            id: "hk_124",
            metadata: { agentplane: { task_id: "202606010001-AAAAAA" } },
          },
        ],
      }),
    );

    const io = captureStdIO();
    try {
      const code = await runCli([
        "hermes",
        "reconcile",
        "--hermes-state",
        statePath,
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        hermes_state: {
          diagnostics: {
            findings: { code: string; message: string }[];
          };
        };
      };
      const duplicate = payload.hermes_state.diagnostics.findings.find(
        (finding) => finding.code === "duplicate_hermes_cards",
      );
      expect(duplicate?.message).toContain("202606010001-AAAAAA");
    } finally {
      io.restore();
    }
  });
});
