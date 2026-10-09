import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { configureGitUser, mockConfig, tempRepo } from "@agentplane/testkit";
import { makeTaskFixture } from "@agentplane/testkit/task";
import { loadCommandContext } from "../shared/task-backend.js";
import { createCanonicalTask } from "./kernel-create.js";
import { cmdTaskComment } from "./comment.js";
import { cmdTaskCloseNoop } from "./close-noop.js";
import { cmdTaskCloseDuplicate } from "./close-duplicate.js";
import { readTaskKernel } from "./kernel-read.js";
import { resolveExplicitExecutionContract } from "./execution-contract-intake.js";

const git = promisify(execFile);

describe("canonical bookkeeping command routes", { timeout: 120_000 }, () => {
  it.each(["noop", "duplicate", "superseded"] as const)(
    "records an audit comment and requires separate approval for %s",
    async (kind) => {
      const repo = await tempRepo({ branch: "main" });
      await configureGitUser(repo.root);
      await repo.writeConfig(mockConfig());
      await git("git", ["add", "."], { cwd: repo.root });
      await git(
        "git",
        ["-c", "core.hooksPath=/dev/null", "commit", "-m", "seed native bookkeeping"],
        { cwd: repo.root },
      );
      const ctx = await loadCommandContext({ cwd: repo.root });
      const taskId = "202610090001-ABC123";
      const relatedId = "202610090002-ABC234";
      const executionContract = resolveExplicitExecutionContract({
        config: ctx.config,
        parsed: { verify: [] },
        intent: { taskKind: "analysis", mutationScope: "none" },
      });
      for (const id of [taskId, relatedId]) {
        await createCanonicalTask(
          ctx,
          makeTaskFixture({
            id,
            priority: "med",
            task_kind: "analysis",
            mutation_scope: "none",
            execution_contract: executionContract,
          }),
        );
      }
      await cmdTaskComment({
        ctx,
        cwd: repo.root,
        taskId,
        author: "USER",
        body: "Audit attribution only",
        quiet: true,
      });
      let read = await readTaskKernel(ctx, taskId);
      expect(read.kind).toBe("canonical");
      if (read.kind !== "canonical") return;
      expect(read.record.aggregate.audit_comments).toMatchObject([
        {
          author: "USER",
          actor_id: "agentplane:kernel-controller",
          body: "Audit attribution only",
        },
      ]);
      expect(read.task.comments).toContainEqual({ author: "USER", body: "Audit attribution only" });
      expect(read.record.aggregate.authority_lineage ?? []).toEqual([]);
      const revision = read.record.aggregate.revision;
      await cmdTaskComment({
        ctx,
        cwd: repo.root,
        taskId,
        author: "USER",
        body: "Audit attribution only",
        quiet: true,
      });
      const common = {
        ctx,
        cwd: repo.root,
        taskId,
        author: "USER",
        note: "No implementation required",
        force: true,
        yes: true,
        quiet: true,
      };
      const close = (approvedBy?: string) =>
        kind === "noop"
          ? cmdTaskCloseNoop({ ...common, approvedBy })
          : cmdTaskCloseDuplicate({
              ...common,
              duplicateOf: relatedId,
              superseded: kind === "superseded",
              approvedBy,
            });
      await expect(close()).rejects.toMatchObject({
        code: "E_HANDOFF",
        context: {
          reason_code: "canonical_closure_approval_required",
          required_role: "USER",
          recovery_argv: expect.arrayContaining(["--approved-by", "USER"]),
        },
      });
      read = await readTaskKernel(ctx, taskId);
      expect(read.kind === "canonical" && read.record.aggregate.revision).toBe(revision);
      expect(await close("USER")).toBe(0);
      read = await readTaskKernel(ctx, taskId);
      expect(read).toMatchObject({
        kind: "canonical",
        record: {
          aggregate: {
            state: "CANCELLED",
            administrative_closure: {
              kind,
              actor_id: "USER",
              related_task_id: kind === "noop" ? null : relatedId,
            },
          },
        },
      });
      expect(await close("USER")).toBe(0);
    },
  );
});
