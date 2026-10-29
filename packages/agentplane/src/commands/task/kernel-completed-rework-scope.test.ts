import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { validateAgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { captureStdIO, installRunCliIntegrationHarness } from "@agentplane/testkit";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { readKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { runCli } from "../../cli/run-cli.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { parseTaskScopeExtensionRequestState } from "../shared/task-scope-extension-request.js";
import type * as PrFlowModule from "../pr/flow-status.js";
import type { AgentActionPacket } from "./agent-action-packet.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import { fixture, git } from "./kernel-completed-external-rework.testkit.js";

vi.mock("../pr/flow-status.js", async (importOriginal) => ({
  ...(await importOriginal<typeof PrFlowModule>()),
  resolvePrFlowStatus: async (opts: {
    ctx: Awaited<ReturnType<typeof loadCommandContext>>;
    taskId: string;
  }) => {
    const task = (await opts.ctx.taskBackend.getTask(opts.taskId))!;
    const root = opts.ctx.resolvedProject.gitRoot;
    const head = git(root, "rev-parse", "HEAD");
    return {
      task: { id: task.id, status: task.status, verification: task.verification?.state ?? null },
      branch: { name: git(root, "branch", "--show-current"), headSha: head, metaHeadSha: null },
      pr: {
        provider: "github",
        state: "OPEN",
        source: "lookup",
        prNumber: 12,
        prUrl: "https://github.com/owner/project/pull/12",
        base: "main",
        headSha: head,
        mergeCommit: null,
      },
      closeTail: { state: "not_applicable", reason: "Fixture implementation PR is open" },
      hostedChecks: { checked: false, reason: "Not relevant to independent review dispatch" },
      reviewThreads: { checked: false, reason: "Not relevant to independent review dispatch" },
      queue: { present: false },
      handoff: { present: false },
      nextAction: "Review source",
    } satisfies PrFlowModule.PrFlowStatusReport;
  },
}));
installRunCliIntegrationHarness();
type Packet = Pick<AgentActionPacket, "authority"> & {
  action: { kind: string; reason?: string };
  exchange: NonNullable<AgentActionPacket["exchange"]>;
};
function parsePacket(text: string): Packet {
  return JSON.parse(text) as Packet;
}
async function invoke(root: string, args: string[]) {
  const io = captureStdIO();
  try {
    const code = await runCli([...args, "--root", root]);
    return { code, stdout: io.stdout, stderr: io.stderr };
  } finally {
    io.restore();
  }
}
async function issue(f: Awaited<ReturnType<typeof fixture>>) {
  const result = await invoke(f.root, ["task", "advance", f.id, "--agent-json"]);
  expect(result.code, result.stderr + result.stdout).toBe(0);
  const packet = parsePacket(result.stdout);
  expect(packet.action.kind, result.stderr + result.stdout).toBe("agent_episode");
  const order = validateAgentWorkOrderV2(
    JSON.parse(
      await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
    ),
  );
  return { packet, order };
}
async function returnResult(
  f: Awaited<ReturnType<typeof fixture>>,
  issued: Awaited<ReturnType<typeof issue>>,
  extra: Record<string, unknown> = {},
) {
  await writeFile(
    issued.packet.exchange.result_path,
    JSON.stringify({
      work_order_id: issued.order.work_order_id,
      status: "completed",
      summary: "Repaired source",
      findings: [],
      uncertainty: [],
      ...extra,
    }),
  );
  return invoke(f.root, [
    "task",
    "advance",
    f.id,
    "--result",
    issued.packet.exchange.result_path,
    "--agent-json",
  ]);
}
describe("completed canonical prospective scope grant", { timeout: 120_000 }, () => {
  it("admits an exact completed-task blocker scope before any source edit and reopens planning", async () => {
    const f = await fixture("branch_pr", false, false, true);
    const identity = (await resolveLogicalRepositoryIdentity({
      git_root: f.root,
      task: {},
    })) as k.Sha256Digest;
    const issued = await issue(f);
    const blocked = await returnResult(f, issued, {
      status: "blocked",
      summary: "Need fixture test scope",
      blocker: {
        summary: "The test file is outside the current writable roots",
        scope_extension_request: {
          schema_version: 1,
          rationale: "Add a focused regression test",
          scope_roots: ["fixture.test.ts"],
          repository_effects: ["tests"],
        },
      },
    });
    expect(blocked.code, blocked.stderr + blocked.stdout).toBe(0);
    const command = await loadCommandContext({ cwd: f.root, rootOverride: null });
    const task = (await command.taskBackend.getTask(f.id))!;
    const pending = parseTaskScopeExtensionRequestState(task)!;
    expect({
      status: task.status,
      mode: task.execution_route?.selected_mode,
      pending,
    }).toMatchObject({
      status: "DONE",
      mode: "branch_pr",
      pending: { status: "pending", work_item_id: null },
    });
    const record = readKernelRecord(task, identity);
    expect(record.kind).toBe("canonical");
    if (record.kind !== "canonical") return;
    const stale = await invoke(f.root, [
      "task",
      "scope",
      "extend",
      f.id,
      "--scope-root",
      "fixture.test.ts",
      "--repository-effect",
      "tests",
      "--request-digest",
      k.kernelDigest("wrong"),
      "--state-scope-digest",
      k.kernelDigest("wrong"),
      "--by",
      "USER",
    ]);
    expect(stale.code).not.toBe(0);
    await writeFile(path.join(f.root, "source.txt"), "changed before approval\n");
    const preMutated = await invoke(f.root, [
      "task",
      "scope",
      "extend",
      f.id,
      "--scope-root",
      "fixture.test.ts",
      "--repository-effect",
      "tests",
      "--request-digest",
      pending.request_digest,
      "--state-scope-digest",
      pending.request_digest,
      "--by",
      "USER",
    ]);
    expect(preMutated.code).not.toBe(0);
    await writeFile(path.join(f.root, "source.txt"), "before\n");
    const approved = await invoke(f.root, [
      "task",
      "scope",
      "extend",
      f.id,
      "--scope-root",
      "fixture.test.ts",
      "--repository-effect",
      "tests",
      "--request-digest",
      pending.request_digest,
      "--state-scope-digest",
      pending.request_digest,
      "--by",
      "USER",
    ]);
    expect(approved.code, approved.stderr + approved.stdout).toBe(0);
    const replay = await invoke(f.root, [
      "task",
      "scope",
      "extend",
      f.id,
      "--scope-root",
      "fixture.test.ts",
      "--repository-effect",
      "tests",
      "--request-digest",
      pending.request_digest,
      "--state-scope-digest",
      pending.request_digest,
      "--by",
      "USER",
    ]);
    expect(replay.code).not.toBe(0);
    const next = (await command.taskBackend.getTask(f.id))!;
    const reopened = readKernelRecord(next, identity);
    expect(reopened.kind).toBe("canonical");
    if (reopened.kind === "canonical") {
      expect(reopened.record.aggregate.state).toBe("PLANNING");
      expect(reopened.record.aggregate.current_plan?.state).toBe("REJECTED");
      expect(reopened.record.aggregate.authority_lineage?.at(-1)?.observation?.kind).toBe(
        "completed_rework_scope_request",
      );
    }
    expect(next.execution_contract?.authority.writable_roots).toContain("fixture.test.ts");
    expect(git(f.root, "status", "--porcelain")).toBe(`M .agentplane/tasks/${f.id}/README.md`);
    expect(await readFile(path.join(f.root, "source.txt"), "utf8")).toBe("before\n");
  });
});
