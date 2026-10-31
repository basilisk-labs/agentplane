import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { configureGitUser, mockConfig, tempRepo } from "@agentplane/testkit";
import { makeTaskFixture } from "@agentplane/testkit/task";
import { parseTaskReadme, taskKernel } from "@agentplaneorg/core/tasks";
import { isRecord } from "../../shared/guards.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { createCanonicalTask } from "./kernel-create.js";
import { cmdTaskComment } from "./comment.js";
import { cmdTaskCloseNoop } from "./close-noop.js";
import { cmdTaskCloseDuplicate } from "./close-duplicate.js";
import { readTaskKernel } from "./kernel-read.js";
import { resolveExplicitExecutionContract } from "./execution-contract-intake.js";

const git = promisify(execFile);

describe("canonical bookkeeping command routes", { timeout: 120_000 }, () => {
  it("preserves a body-file comment across distinct native writes and cold reads", async () => {
    const repo = await tempRepo({ branch: "main" });
    await configureGitUser(repo.root);
    await repo.writeConfig(mockConfig());
    await git("git", ["add", "."], { cwd: repo.root });
    await git("git", ["-c", "core.hooksPath=/dev/null", "commit", "-m", "seed roundtrip"], {
      cwd: repo.root,
    });
    const taskId = "202610090003-ABC345";
    const ctx = await loadCommandContext({ cwd: repo.root });
    await createCanonicalTask(
      ctx,
      makeTaskFixture({
        id: taskId,
        priority: "med",
        task_kind: "analysis",
        mutation_scope: "none",
        execution_contract: resolveExplicitExecutionContract({
          config: ctx.config,
          parsed: { verify: [] },
          intent: { taskKind: "analysis", mutationScope: "none" },
        }),
      }),
    );
    const body = "Exact audit value  \r\nsecond line\t\n" + String.raw`literal\n\nvalue` + "\n\n";
    const bodyFile = path.join(repo.root, "audit-body.txt");
    const readme = path.join(repo.root, ".agentplane", "tasks", taskId, "README.md");
    await writeFile(bodyFile, body);
    const cli = fileURLToPath(new URL("../../../bin/agentplane.js", import.meta.url));
    const run = async (args: string[]) => {
      try {
        return await git(process.execPath, [cli, "task", ...args, "--root", repo.root], {
          cwd: repo.root,
          env: { ...process.env, AGENTPLANE_DEV_AUTO_BOOTSTRAP: "0" },
        });
      } catch (error) {
        let diagnostic: Record<string, unknown> = { task_readme: "unavailable" };
        try {
          const parsed = parseTaskReadme(await readFile(readme, "utf8"));
          const extensions = parsed.frontmatter.extensions;
          const record = isRecord(extensions) ? extensions.task_kernel : null;
          if (isRecord(record)) {
            const { digest, ...contents } = record;
            const comments = isRecord(record.aggregate) ? record.aggregate.audit_comments : null;
            const observedBody =
              Array.isArray(comments) && isRecord(comments[0]) ? comments[0].body : null;
            diagnostic = {
              stored_digest: digest,
              observed_digest: taskKernel.kernelDigest(contents),
              audit_body_exact: observedBody === body,
              audit_body: typeof observedBody === "string" ? observedBody : null,
            };
          }
        } catch {
          // Keep the original command failure when its partial afterimage cannot be decoded.
        }
        throw new Error(
          `${error instanceof Error ? error.message : String(error)}\nBody-file readback: ${JSON.stringify(diagnostic)}`,
          { cause: error },
        );
      }
    };
    const coldRead = async () => {
      const result = await run(["show", taskId]);
      const observed: unknown = JSON.parse(result.stdout);
      expect(observed).toHaveProperty("source", "task_kernel");
      expect(observed).toHaveProperty("canonical_record.aggregate.audit_comments.0.body", body);
      const fresh = await loadCommandContext({ cwd: repo.root });
      const read = await readTaskKernel(fresh, taskId);
      expect(read.kind).toBe("canonical");
      if (read.kind !== "canonical") throw new Error("Native read was not canonical");
      expect(observed).toHaveProperty("canonical_record.digest", read.record.digest);
      expect(read.record.aggregate.audit_comments?.[0]?.body).toBe(body);
      return read.record;
    };
    await run(["comment", taskId, "--author", "ORCHESTRATOR", "--body-file", bodyFile]);
    const first = await coldRead();
    const firstMutation = first.aggregate.audit_comments![0]!.mutation_id;
    const firstReceipt = first.aggregate.mutation_receipts[firstMutation];
    expect(firstReceipt).toBeDefined();
    await run(["comment", taskId, "--author", "ORCHESTRATOR", "--body", "Second distinct write"]);
    const second = await coldRead();
    expect(second.aggregate.revision).toBe(first.aggregate.revision + 1);
    expect(second.aggregate.audit_comments).toHaveLength(2);
    expect(second.aggregate.mutation_receipts[firstMutation]).toEqual(firstReceipt);
    const beforeReplay = await readFile(readme);
    await run(["comment", taskId, "--author", "ORCHESTRATOR", "--body-file", bodyFile]);
    const replayed = await coldRead();
    expect(replayed.digest).toBe(second.digest);
    expect(await readFile(readme)).toEqual(beforeReplay);
  });

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
          recovery_argv: expect.arrayContaining(["--approved-by", "USER"]) as unknown,
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
