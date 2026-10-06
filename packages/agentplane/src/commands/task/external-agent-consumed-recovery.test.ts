import { readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { installRunCliIntegrationHarness } from "@agentplane/testkit";
import { type AgentWorkOrderV2, digestSupervisorEpisodeValue } from "@agentplaneorg/core/schemas";
import { fixture, issue, unchanged } from "./external-agent-observation.testkit.js";
import { recordIssuedExternalAgentEpisode } from "./external-agent-supervisor-episode.js";
import { type ExternalAgentExchange, externalAgentIssueDigest } from "./external-agent-exchange.js";
import { recoverPendingExternalAgentResult } from "./external-agent-supervisor-recovery.js";
import { refreshExternalAgentRoute } from "./external-agent-result-routing.js";
import * as storeOwner from "../shared/supervisor-execution-episode.js";

installRunCliIntegrationHarness();
async function completed() {
  const f = await fixture();
  const issued = await issue(f);
  await issued.accept();
  const journalPath = await storeOwner.resolveSupervisorExecutionEpisodePath({
    git_root: f.root,
    common_git_dir: path.join(f.root, ".git"),
    task_id: f.id,
  });
  return {
    f,
    issued,
    journalPath,
    consumed: await readFile(issued.paths.exchange, "utf8"),
    receipt: await issued.journal(),
  };
}
async function duplicate() {
  const x = await completed();
  // Reproduce historical issuance using its actual native journal owner.
  await recordIssuedExternalAgentEpisode({
    command: x.f.command,
    decision: x.f.decision,
    work_order: x.issued.work_order,
    work_order_ref: x.issued.paths.work_order,
    purpose: x.issued.exchange.purpose,
    issue_digest: externalAgentIssueDigest({
      exchange: x.issued.exchange,
      work_order: x.issued.work_order,
    }),
    replace_failed_operation: false,
  });
  const journal = await x.issued.journal();
  expect(journal.operations).toHaveLength(2);
  return x;
}
async function recover(x: Awaited<ReturnType<typeof duplicate>>) {
  const accept = vi.fn();
  const decision = await refreshExternalAgentRoute({
    cwd: x.f.root,
    task_id: x.f.id,
    include_remote: false,
  });
  try {
    return await recoverPendingExternalAgentResult({
      command: x.f.command,
      task_id: x.f.id,
      current_decision: decision,
      accept_result: accept,
    });
  } finally {
    expect(accept).not.toHaveBeenCalled();
  }
}

describe("consumed external observation recovery", () => {
  it("does not issue another operation at the same consumed boundary", async () => {
    const x = await completed();
    for (let i = 0; i < 2; i++) await expect(issue(x.f)).rejects.toThrow("already consumed");
    expect(await x.issued.journal()).toEqual(x.receipt);
    expect(await readFile(x.issued.paths.exchange, "utf8")).toBe(x.consumed);
    await unchanged(x.f);
  });
  it.each(["unchanged", "cleanup", "source"] as const)(
    "retires only duplicate after %s and permits a distinct replacement",
    async (state) => {
      const x = await duplicate();
      const beforeRecovery = await x.issued.journal();
      if (state === "cleanup") await rm(path.join(x.f.root, "unowned.txt"));
      if (state === "source") await writeFile(path.join(x.f.root, "source.txt"), "new source\n");
      await expect(recover(x)).rejects.toThrow("fresh replacement");
      const failed = await x.issued.journal();
      expect(failed.operations[0]).toEqual(x.receipt.operations[0]);
      expect(failed.operations[1]?.status).toBe("failed");
      expect(failed.usage).toEqual(beforeRecovery.usage);
      // Simulate interruption after the durable CAS but before its error reaches the caller.
      await recover(x);
      expect(await x.issued.journal()).toEqual(failed);
      expect(await readFile(x.issued.paths.exchange, "utf8")).toBe(x.consumed);
      expect(await readFile(x.issued.paths.result, "utf8")).toBe(x.issued.bytes);
      if (state === "cleanup")
        await writeFile(path.join(x.f.root, "other-unowned.txt"), "new residue\n");
      if (state === "unchanged") {
        await expect(issue(x.f, true)).rejects.toThrow("already consumed");
        expect(await x.issued.journal()).toEqual(failed);
        return;
      }
      const next = await issue(x.f, true);
      expect(next.exchange.transition_id).not.toBe(x.issued.exchange.transition_id);
      expect(next.exchange.state_fingerprint).toBe(next.work_order.state_fingerprint.digest);
      const current = await refreshExternalAgentRoute({
        cwd: x.f.root,
        task_id: x.f.id,
        include_remote: false,
      });
      expect(next.work_order.state_fingerprint.components.git).toEqual(
        current.workflowStep.preconditionFingerprint.components.git,
      );
      expect(next.exchange.state_fingerprint).not.toBe(x.issued.exchange.state_fingerprint);
      const task = await x.f.command.taskBackend.getTask(x.f.id);
      expect(JSON.stringify(task?.extensions?.task_kernel)).toBe(x.f.kernel);
    },
  );
  it("leaves evidence intact when native CAS loses a race", async () => {
    const x = await duplicate();
    const before = await readFile(x.journalPath, "utf8");
    const realStore = storeOwner.createSupervisorEpisodeStore(x.journalPath);
    const spy = vi
      .spyOn(storeOwner, "createSupervisorEpisodeStore")
      .mockReturnValue({ ...realStore, compareAndSwap: () => Promise.resolve(false) });
    try {
      await expect(recover(x)).rejects.toThrow("changed during");
    } finally {
      spy.mockRestore();
    }
    expect(await readFile(x.journalPath, "utf8")).toBe(before);
    expect(await readFile(x.issued.paths.exchange, "utf8")).toBe(x.consumed);
    await expect(recover(x)).rejects.toThrow("fresh replacement");
  });
  it.each([
    "missing",
    "role",
    "task",
    "digest",
    "progress",
    "receipt",
    "effect",
    "authority",
    "precondition",
    "intervening",
    "postcondition",
    "result",
    "retained",
    "workorder",
    "checkout",
    "writable",
    "external",
    "purpose",
  ] as const)("rejects altered %s evidence without changing native journal", async (kind) => {
    const x = await duplicate();
    const journal = await x.issued.journal();
    const exchange = JSON.parse(x.consumed) as ExternalAgentExchange;
    const order = JSON.parse(await readFile(x.issued.paths.work_order, "utf8")) as AgentWorkOrderV2;
    switch (kind) {
      case "missing": {
        journal.operations.splice(0, 1);
        break;
      }
      case "role": {
        journal.operations[0]!.role = "EVALUATOR";
        break;
      }
      case "task": {
        journal.task_id = "202610060000-OTHER1";
        break;
      }
      case "digest": {
        exchange.result_digest = "sha256:" + "a".repeat(64);
        break;
      }
      case "progress": {
        journal.operations[0]!.progress_digest = "sha256:" + "a".repeat(64);
        break;
      }
      case "receipt": {
        journal.operations[0]!.result_digest = "sha256:" + "a".repeat(64);
        break;
      }
      case "effect": {
        journal.operations[1]!.effect_ref = "unrelated";
        break;
      }
      case "authority": {
        journal.operations[1]!.authority_digest = "sha256:" + "a".repeat(64);
        break;
      }
      case "precondition": {
        journal.operations[1]!.precondition_fingerprint_digest = "sha256:" + "a".repeat(64);
        break;
      }
      case "intervening": {
        journal.operations[0]!.work_order_ref = "/other/work-order.json";
        break;
      }
      case "postcondition": {
        exchange.postcondition_fingerprint = "sha256:" + "a".repeat(64);
        break;
      }
      case "result": {
        await writeFile(x.issued.paths.result, x.issued.bytes.replace("Unowned", "Changed"));
        break;
      }
      case "retained": {
        exchange.result!.result.summary = "Changed";
        break;
      }
      case "workorder": {
        order.task.id = "202610060000-OTHER1";
        break;
      }
      case "checkout": {
        exchange.checkout = path.dirname(x.f.root);
        break;
      }
      case "writable": {
        order.authority.writable_roots = [x.f.root];
        break;
      }
      case "external": {
        order.authority.external_side_effects = ["network"];
        break;
      }
      case "purpose": {
        exchange.purpose = "planning";
        break;
      }
    }
    const { digest: _digest, ...unsigned } = journal;
    journal.digest = digestSupervisorEpisodeValue(unsigned);
    await writeFile(x.journalPath, JSON.stringify(journal));
    await writeFile(x.issued.paths.exchange, JSON.stringify(exchange));
    await writeFile(x.issued.paths.work_order, JSON.stringify(order));
    const before = await readFile(x.journalPath, "utf8");
    await expect(recover(x)).rejects.toThrow();
    expect(await readFile(x.journalPath, "utf8")).toBe(before);
  });
});
