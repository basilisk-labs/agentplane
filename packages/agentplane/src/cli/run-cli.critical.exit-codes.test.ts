import path from "node:path";

import { expect, it } from "vitest";

import { describeCritical } from "@agentplane/testkit";
import {
  ensureDir,
  expectCliError,
  makeTempDir,
  pathExists,
  runCli,
  writeText,
} from "./critical/harness.js";
const CRITICAL_EXIT_CODES_TIMEOUT_MS = 240_000;

describeCritical("critical: exit codes contract", () => {
  it(
    "init is idempotent by default (second run reports conflicts with E_IO)",
    async () => {
      const root = await makeTempDir("agentplane-critical-exit-");
      await ensureDir(root);

      const first = await runCli(["init", "--yes"], { cwd: root });
      expect(first.code).toBe(0);
      expect(await pathExists(path.join(root, ".agentplane", "WORKFLOW.md"))).toBe(true);

      const second = await runCli(["init", "--yes"], { cwd: root });
      expectCliError(second, 4, "E_IO");
      expect(second.stderr).toMatch(/Init conflicts detected/i);
      expect(second.stderr).toMatch(/--force/i);
    },
    CRITICAL_EXIT_CODES_TIMEOUT_MS,
  );

  it(
    "init completes with legacy cached recipe scenario metadata",
    async () => {
      const root = await makeTempDir("agentplane-critical-init-legacy-");
      const agentplaneHome = await makeTempDir("agentplane-critical-init-home-");
      await ensureDir(root);
      await writeText(
        path.join(agentplaneHome, "recipes.json"),
        JSON.stringify(
          {
            schema_version: 1,
            updated_at: "2026-04-22T00:00:00.000Z",
            recipes: [
              {
                id: "viewer",
                version: "1.2.3",
                source: "local",
                installed_at: "2026-04-22T00:00:00.000Z",
                tags: ["docs"],
                manifest: {
                  schema_version: "1",
                  kind: "project_overlay",
                  id: "viewer",
                  version: "1.2.3",
                  name: "Viewer",
                  summary: "Preview tasks",
                  agents: [
                    {
                      id: "viewer",
                      display_name: "Viewer",
                      role: "viewer",
                      summary: "Preview tasks",
                      file: "agents/viewer.md",
                    },
                  ],
                  scenarios: [
                    {
                      id: "viewer",
                      summary: "Launch the viewer",
                    },
                  ],
                },
              },
            ],
          },
          null,
          2,
        ),
      );

      const result = await runCli(["init", "--yes"], {
        cwd: root,
        extraEnv: { AGENTPLANE_HOME: agentplaneHome },
      });

      expect(result.code).toBe(0);
      expect(result.stderr).not.toContain("Invalid field manifest.scenarios[0]");
      expect(await pathExists(path.join(root, ".agentplane", "WORKFLOW.md"))).toBe(true);
    },
    CRITICAL_EXIT_CODES_TIMEOUT_MS,
  );
});
