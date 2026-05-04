import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);

describe("policy routing check script", () => {
  it("passes for repository AGENTS gateway and referenced policy files", async () => {
    await expect(
      execFileAsync("node", ["scripts/check-policy-routing.mjs"], {
        cwd: process.cwd(),
      }),
    ).resolves.toBeDefined();
  });

  it("prints remediation fields when routing fails", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-routing-check-"));
    try {
      const scriptPath = path.join(root, ".agentplane", "policy", "check-routing.mjs");
      await mkdir(path.dirname(scriptPath), { recursive: true });
      await writeFile(
        path.join(root, "AGENTS.md"),
        [
          "# PURPOSE",
          "## PROJECT",
          "## SOURCES OF TRUTH",
          "## COMMANDS",
          "## TOOLING",
          "## LOAD RULES",
          "- `@.agentplane/policy/missing.md`",
          "## MUST / MUST NOT",
          "MUST NOT load unrelated policy modules",
          "MUST NOT use wildcard policy paths",
          "## CORE DOD",
          "## SIZE BUDGET",
          "## CANONICAL DOCS",
          "- DOC `.agentplane/policy/incidents.md`",
          "## REFERENCE EXAMPLES",
          "- EXAMPLE `.agentplane/policy/examples/pr-note.md`",
          "",
        ].join("\n"),
        "utf8",
      );
      await writeFile(
        scriptPath,
        await readFile("packages/agentplane/assets/policy/check-routing.mjs", "utf8"),
      );
      try {
        await execFileAsync("node", [scriptPath], { cwd: root });
        throw new Error("Expected policy routing check to fail.");
      } catch (err) {
        const stderr =
          typeof (err as { stderr?: unknown }).stderr === "string"
            ? (err as { stderr: string }).stderr
            : "";
        expect(stderr).toContain("Safe command:");
      }
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
