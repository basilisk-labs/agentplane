import { execFileSync, spawnSync } from "node:child_process";
import path from "node:path";
import { expect } from "vitest";
import { loadCommandContext } from "../shared/task-backend.js";
import { cmdVerifyParsed } from "./verify-record.js";

/** Execute the fixture's Git and selected document checks before recording their observations. */
export async function recordFixtureVerification(root: string, id: string): Promise<void> {
  execFileSync("git", ["diff", "--check"], { cwd: root });
  const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
  const task = (await ctx.taskBackend.getTask(id))!;
  const checks = ["affected_unit_integration", "critical_paths", "task_outcome"].map(
    (check) =>
      `Check: ${check}\nCommand: git diff --check\nResult: pass\nEvidence: actual fixture Git check passed\nScope: task implementation`,
  );
  if (task.execution_contract?.verification.contract?.selected_checks.includes("docs_contract")) {
    const file = path.join(ctx.config.paths.workflow_dir, id, "README.md");
    const script =
      "const fs=require('node:fs'),a=require('node:assert/strict');const d=fs.readFileSync(" +
      JSON.stringify(file) +
      ",'utf8');for(const h of ['Scope','Plan','Rollback Plan'])a(d.includes('\\n## '+h+'\\n'));";
    execFileSync("node", ["-e", script], { cwd: root });
    const quotedScript = "'" + script.replaceAll("'", "'\"'\"'") + "'";
    checks.push(
      `Check: docs_contract\nCommand: node -e ${quotedScript}\nResult: pass\nEvidence: actual Node assertion verified Scope, Plan and Rollback Plan sections\nScope: fixture task document structure`,
    );
  }
  expect(
    await cmdVerifyParsed({
      ctx,
      cwd: root,
      rootOverride: undefined,
      taskId: id,
      state: "ok",
      by: "SUPERVISOR",
      note: "Native fixture verification passed.",
      details: checks.join("\n\n"),
      quiet: true,
      allowCanonicalProjection: true,
    }),
  ).toBe(0);
}

export async function recordFailedFixtureVerification(root: string, id: string): Promise<void> {
  const failed = spawnSync("npm", ["run", "test"], { cwd: root, encoding: "utf8" });
  expect(failed.status, failed.stdout + failed.stderr).toBe(1);
  expect(
    await cmdVerifyParsed({
      ctx: await loadCommandContext({ cwd: root, rootOverride: null }),
      cwd: root,
      rootOverride: undefined,
      taskId: id,
      state: "needs_rework",
      by: "SUPERVISOR",
      note: "The actual fixture npm test failed because source.txt still needs implementation.",
      details:
        "Check: task_outcome\nCommand: npm run test\nResult: fail\nEvidence: actual npm process exited1 on the source assertion\nScope: fixture implementation",
      quiet: true,
      allowCanonicalProjection: true,
    }),
  ).toBe(0);
}
