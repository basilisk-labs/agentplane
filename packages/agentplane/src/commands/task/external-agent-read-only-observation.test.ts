import { readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { commitAll, installRunCliIntegrationHarness } from "@agentplane/testkit";
import {
  digestSupervisorEpisodeValue,
  stopSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import { fixture, issue, unchanged, git } from "./external-agent-observation.testkit.js";
import { acceptExternalAgentResult } from "./external-agent-supervisor.js";
import { refreshExternalAgentRoute } from "./external-agent-result-routing.js";
import { recoverPendingExternalAgentResult } from "./external-agent-supervisor-recovery.js";
import { readExternalAgentExchange } from "./external-agent-exchange.js";
import * as observation from "./external-agent-read-only-observation.js";
import * as exchangeOwner from "./external-agent-exchange.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../shared/supervisor-execution-episode.js";
installRunCliIntegrationHarness();
describe("canonical read-only observation admission", () => {
  it.each([
    ["running", "issued"],
    ["effect_in_doubt", "issued"],
    ["running", "prepared"],
  ] as const)(
    "retires an unanswered read-only intent after a later route replaces it (%s, %s)",
    async (journalState, exchangeStatus) => {
      const f = await fixture();
      const issued = await issue(f);
      await unlink(issued.paths.result);
      if (exchangeStatus === "prepared") {
        const exchange = (await readExternalAgentExchange(issued.paths.exchange))!;
        await writeFile(issued.paths.exchange, JSON.stringify({ ...exchange, status: "prepared" }));
      }
      const journalPath = await resolveSupervisorExecutionEpisodePath({
        git_root: f.root,
        common_git_dir: path.join(f.root, ".git"),
        task_id: f.id,
      });
      if (journalState === "effect_in_doubt") {
        const store = createSupervisorEpisodeStore(journalPath);
        const journal = await issued.journal();
        expect(
          await store.compareAndSwap(
            journal.digest,
            stopSupervisorExecutionEpisode({ journal, reason: "effect_in_doubt" }),
          ),
        ).toBe(true);
      }
      const laterDecision = decisionAfterDrift(f);
      await expect(
        recoverPendingExternalAgentResult({
          command: f.command,
          task_id: f.id,
          current_decision: laterDecision,
          accept_result: () => Promise.reject(new Error("No result may be applied")),
        }),
      ).rejects.toThrow(/retired the stale result.*--replacement/u);
      const retired = await issued.journal();
      expect(retired.operations.at(-1)?.status).toBe("failed");
      expect(retired.stop?.reason).toBe("operation_failed");
      expect(await readExternalAgentExchange(issued.paths.exchange)).toMatchObject({
        status: "retired",
        postcondition_fingerprint: laterDecision.workflowStep.preconditionFingerprint.digest,
      });
      expect(
        await recoverPendingExternalAgentResult({
          command: f.command,
          task_id: f.id,
          current_decision: laterDecision,
          accept_result: () => Promise.reject(new Error("Retired result may not be applied")),
        }),
      ).toBeNull();
      expect(await issued.journal()).toEqual(retired);
    },
  );

  it("keeps an unanswered observation at its original boundary", async () => {
    const f = await fixture();
    const issued = await issue(f);
    await unlink(issued.paths.result);
    const before = await issued.journal();
    expect(
      await recoverPendingExternalAgentResult({
        command: f.command,
        task_id: f.id,
        current_decision: f.decision,
        accept_result: () => Promise.reject(new Error("No result may be applied")),
      }),
    ).toBeNull();
    expect(await issued.journal()).toEqual(before);
    expect(await readExternalAgentExchange(issued.paths.exchange)).toMatchObject({
      status: "issued",
    });
  });

  it("does not retire an exchange with a recorded result digest", async () => {
    const f = await fixture();
    const issued = await issue(f);
    await unlink(issued.paths.result);
    const exchange = (await readExternalAgentExchange(issued.paths.exchange))!;
    await writeFile(
      issued.paths.exchange,
      JSON.stringify({ ...exchange, result_digest: `sha256:${"a".repeat(64)}` }),
    );
    const before = await issued.journal();
    expect(
      await recoverPendingExternalAgentResult({
        command: f.command,
        task_id: f.id,
        current_decision: decisionAfterDrift(f),
        accept_result: () => Promise.reject(new Error("No result may be applied")),
      }),
    ).toBeNull();
    expect(await issued.journal()).toEqual(before);
    expect(await readExternalAgentExchange(issued.paths.exchange)).toMatchObject({
      status: "issued",
      result_digest: `sha256:${"a".repeat(64)}`,
    });
  });

  it.each(["task", "fingerprint"] as const)(
    "rejects an unanswered exchange with a mismatched journal %s before retirement",
    async (kind) => {
      const f = await fixture();
      const issued = await issue(f);
      await unlink(issued.paths.result);
      const journalPath = await resolveSupervisorExecutionEpisodePath({
        git_root: f.root,
        common_git_dir: path.join(f.root, ".git"),
        task_id: f.id,
      });
      const journal = await issued.journal();
      const changed = structuredClone(journal);
      if (kind === "task") changed.task_id = "202610060000-OTHER1";
      else changed.operations.at(-1)!.precondition_fingerprint_digest = `sha256:${"b".repeat(64)}`;
      const operation = changed.operations.at(-1)!;
      if (operation.recovery) {
        const previousKey = operation.operation_key;
        operation.operation_key = digestSupervisorEpisodeValue({
          task_id: changed.task_id,
          episode: operation.episode,
          role: operation.role,
          kind: operation.kind,
          operation_identity: operation.recovery.operation_identity,
          precondition_fingerprint_digest: operation.precondition_fingerprint_digest,
          authority_ref: operation.authority_ref,
          authority_digest: operation.authority_digest,
          work_order_ref: operation.work_order_ref,
          effect_ref: operation.effect_ref,
          ...(operation.replacement_of_operation_key
            ? { replacement_of_operation_key: operation.replacement_of_operation_key }
            : {}),
          recovery: operation.recovery,
        });
        if (changed.cursor.operation_key === previousKey)
          changed.cursor.operation_key = operation.operation_key;
      }
      const { digest: _digest, ...payload } = changed;
      changed.digest = digestSupervisorEpisodeValue(payload);
      await createSupervisorEpisodeStore(journalPath).write(changed);
      const exchange = await readExternalAgentExchange(issued.paths.exchange);
      await expect(
        recoverPendingExternalAgentResult({
          command: f.command,
          task_id: f.id,
          current_decision: decisionAfterDrift(f),
          accept_result: () => Promise.reject(new Error("No result may be applied")),
        }),
      ).rejects.toThrow("Read-only observation does not match the unresolved supervisor intent.");
      expect(await issued.journal()).toEqual(changed);
      expect(await readExternalAgentExchange(issued.paths.exchange)).toEqual(exchange);
    },
  );

  it("finishes retirement after exchange acknowledgement but before journal CAS", async () => {
    const f = await fixture();
    const issued = await issue(f);
    await unlink(issued.paths.result);
    const laterDecision = decisionAfterDrift(f);
    const spy = vi
      .spyOn(exchangeOwner, "writeExternalAgentExchange")
      .mockImplementationOnce(async (target, value) => {
        await originalWrite(target, value);
        throw new Error("Injected post-acknowledgement interruption");
      });
    try {
      await expect(
        recoverPendingExternalAgentResult({
          command: f.command,
          task_id: f.id,
          current_decision: laterDecision,
          accept_result: () => Promise.reject(new Error("No result may be applied")),
        }),
      ).rejects.toThrow("Injected post-acknowledgement interruption");
    } finally {
      spy.mockRestore();
    }
    const interrupted = await issued.journal();
    expect(interrupted.operations.at(-1)?.status).toBe("intent");
    expect(await readExternalAgentExchange(issued.paths.exchange)).toMatchObject({
      status: "retired",
    });
    await expect(
      recoverPendingExternalAgentResult({
        command: f.command,
        task_id: f.id,
        current_decision: laterDecision,
        accept_result: () => Promise.reject(new Error("Retired result may not be applied")),
      }),
    ).rejects.toThrow(/reconciled a retired external-agent exchange/u);
    const reconciled = await issued.journal();
    expect(reconciled.operations.at(-1)?.status).toBe("failed");
  });

  it("preserves a returned observation for its original result path", async () => {
    const f = await fixture();
    const issued = await issue(f);
    const before = await issued.journal();
    const accepted = vi.fn(() => Promise.resolve(decisionAfterDrift(f)));
    await recoverPendingExternalAgentResult({
      command: f.command,
      task_id: f.id,
      current_decision: decisionAfterDrift(f),
      accept_result: accepted,
    });
    expect(accepted).toHaveBeenCalledWith({
      cwd: issued.exchange.checkout,
      result_path: issued.paths.result,
    });
    expect(await issued.journal()).toEqual(before);
    expect(await readExternalAgentExchange(issued.paths.exchange)).toMatchObject({
      status: "issued",
    });
  });

  it("does not retire a mutation-capable unanswered exchange", async () => {
    const f = await fixture();
    const issued = await issue(f);
    await unlink(issued.paths.result);
    const order = JSON.parse(await readFile(issued.paths.work_order, "utf8")) as {
      authority: { sandbox: string; writable_roots: string[] };
    };
    order.authority.sandbox = "workspace-write";
    order.authority.writable_roots = [f.root];
    await writeFile(issued.paths.work_order, JSON.stringify(order));
    const before = await issued.journal();
    expect(
      await recoverPendingExternalAgentResult({
        command: f.command,
        task_id: f.id,
        current_decision: decisionAfterDrift(f),
        accept_result: () => Promise.reject(new Error("No result may be applied")),
      }),
    ).toBeNull();
    expect(await issued.journal()).toEqual(before);
    expect(await readExternalAgentExchange(issued.paths.exchange)).toMatchObject({
      status: "issued",
    });
  });

  it("preserves legacy comment and native metadata commit behavior", async () => {
    const f = await fixture();
    const issued = await issue(f);
    // Exercise the legacy application owner directly. Legacy tasks no longer
    // participate in canonical route evaluation without an explicit migration.
    const legacy = (await f.command.taskBackend.getTask(f.id))!;
    delete legacy.extensions!.task_kernel;
    await f.command.taskBackend.writeTask(legacy);
    await commitAll(f.root, "legacy fixture");
    const head = git(f.root, "rev-parse", "HEAD");
    const envelope = exchangeOwner.validateExternalAgentResultEnvelope({
      raw: JSON.parse(issued.bytes),
      exchange: issued.exchange,
      work_order: issued.work_order,
    });
    await observation.applyExternalReadOnlyWorktreeObservation({
      command: f.command,
      exchange: issued.exchange,
      envelope,
      work_order: issued.work_order,
    });
    const task = (await f.command.taskBackend.getTask(f.id))!;
    expect(
      task.comments?.some((comment) =>
        comment.body.includes("Read-only worktree observation (blocked)"),
      ),
    ).toBe(true);
    expect(git(f.root, "rev-parse", "HEAD")).not.toBe(head);
  });

  it("rejects foreign task and episode identities before application", async () => {
    const f = await fixture();
    const issued = await issue(f);
    await expect(
      acceptExternalAgentResult({
        ctx: { cwd: f.root },
        command: f.command,
        task_id: "202610060000-OTHER1",
        result_path: issued.paths.result,
        include_remote: false,
      }),
    ).rejects.toThrow();
    const payload = JSON.parse(issued.bytes) as { work_order_id: string };
    payload.work_order_id = "foreign-work-order";
    await writeFile(issued.paths.result, JSON.stringify(payload));
    await expect(issued.accept()).rejects.toThrow();
    const receipt = await issued.journal();
    expect(receipt.operations[0]?.status).toBe("intent");
    await unchanged(f);
  });

  it("records one durable receipt without mutating repository or terminal kernel state", async () => {
    const f = await fixture();
    const issued = await issue(f);
    await issued.accept();
    await unchanged(f);
    const receipt = await issued.journal();
    expect(receipt.operations).toHaveLength(1);
    expect(receipt.operations[0]).toMatchObject({
      status: "completed",
      result_digest: digestSupervisorEpisodeValue({
        semantic_status: "blocked",
        work_order_id: issued.work_order.work_order_id,
        result_digest: exchangeOwner.externalAgentResultDigest(
          exchangeOwner.validateExternalAgentResultEnvelope({
            raw: JSON.parse(issued.bytes),
            exchange: issued.exchange,
            work_order: issued.work_order,
          }),
        ),
      }),
    });
    expect(await readExternalAgentExchange(issued.paths.exchange)).toMatchObject({
      status: "consumed",
    });
    await issued.accept();
    expect(await issued.journal()).toEqual(receipt);
    expect(await readFile(issued.paths.result, "utf8")).toBe(issued.bytes);
    await unchanged(f);
  });

  it("replaces a stale read-only intent after failed receipt persistence but before retirement acknowledgement", async () => {
    const f = await fixture();
    const issued = await issue(f);
    await writeFile(path.join(f.root, "source.txt"), "unrelated new source state\n");
    const spy = vi
      .spyOn(exchangeOwner, "writeExternalAgentExchange")
      .mockImplementation(async (target, value) => {
        if (value.status === "retired")
          throw new Error("Injected retirement acknowledgement failure");
        await originalWrite(target, value);
      });
    try {
      await expect(issued.accept()).rejects.toThrow("Injected retirement");
    } finally {
      spy.mockRestore();
    }
    const failed = await issued.journal();
    expect(failed.operations[0]?.status).toBe("failed");
    expect(await readExternalAgentExchange(issued.paths.exchange)).toMatchObject({
      status: "result_received",
    });
    const beforeRetry = JSON.stringify(failed);
    await expect(issued.accept()).rejects.toThrow();
    expect(JSON.stringify(await issued.journal())).toBe(beforeRetry);
    const replacement = await issue(f, true);
    expect(replacement.exchange.transition_id).not.toBe(issued.exchange.transition_id);
    expect(replacement.exchange.state_fingerprint).not.toBe(issued.exchange.state_fingerprint);
    expect(await readFile(issued.paths.result, "utf8")).toBe(issued.bytes);
    const persisted = await f.command.taskBackend.getTask(f.id);
    expect(JSON.stringify(persisted?.extensions?.task_kernel)).toBe(f.kernel);
  });

  it.each(["before", "after", "acknowledgement"] as const)(
    "recovers retained original result after interruption %s admission",
    async (phase) => {
      const f = await fixture();
      const issued = await issue(f);
      const original = observation.applyExternalReadOnlyWorktreeObservation;
      const spy =
        phase === "acknowledgement"
          ? vi
              .spyOn(exchangeOwner, "writeExternalAgentExchange")
              .mockImplementation(async (target, value) => {
                if (value.status === "consumed")
                  throw new Error("Injected acknowledgement failure");
                await originalWrite(target, value);
              })
          : vi
              .spyOn(observation, "applyExternalReadOnlyWorktreeObservation")
              .mockImplementationOnce(async (opts) => {
                if (phase === "after") await original(opts);
                throw new Error("Injected observation failure");
              });
      try {
        await expect(issued.accept()).rejects.toThrow(/Injected/);
      } finally {
        spy.mockRestore();
      }
      expect(await readExternalAgentExchange(issued.paths.exchange)).toMatchObject({
        status: "result_received",
      });
      await unchanged(f);
      const decision = await refreshExternalAgentRoute({
        cwd: f.root,
        task_id: f.id,
        include_remote: false,
      });
      await recoverPendingExternalAgentResult({
        command: f.command,
        task_id: f.id,
        current_decision: decision,
        accept_result: issued.accept,
      });
      await unchanged(f);
      const receipt = await issued.journal();
      expect(receipt.operations).toHaveLength(1);
      expect(receipt.operations[0]?.status).toBe("completed");
      await issued.accept();
      expect(await issued.journal()).toEqual(receipt);
      expect(await readFile(issued.paths.result, "utf8")).toBe(issued.bytes);
    },
  );
  it.each(["result", "retained_result", "work_order", "checkout", "source", "task"] as const)(
    "rejects changed %s evidence instead of admitting a stale observation",
    async (kind) => {
      const f = await fixture();
      const issued = await issue(f);
      const crash = vi
        .spyOn(observation, "applyExternalReadOnlyWorktreeObservation")
        .mockRejectedValueOnce(new Error("Injected old handler failure"));
      try {
        await expect(issued.accept()).rejects.toThrow("Injected");
      } finally {
        crash.mockRestore();
      }
      switch (kind) {
        case "result": {
          await writeFile(
            issued.paths.result,
            issued.bytes.replace("Unowned residue", "Different observation"),
          );

          break;
        }
        case "retained_result":
        case "checkout": {
          const exchange = (await readExternalAgentExchange(issued.paths.exchange))!;
          if (kind === "retained_result")
            exchange.result!.result.summary = "Tampered retained evidence";
          else exchange.checkout = path.dirname(f.root);
          await writeFile(issued.paths.exchange, JSON.stringify(exchange));

          break;
        }
        case "work_order": {
          const order = JSON.parse(await readFile(issued.paths.work_order, "utf8")) as {
            task: { id: string };
          };
          order.task.id = "202610060000-OTHER1";
          await writeFile(issued.paths.work_order, JSON.stringify(order));

          break;
        }
        case "source": {
          await writeFile(path.join(f.root, "source.txt"), "unauthorized mutation\n");

          break;
        }
        default: {
          const task = (await f.command.taskBackend.getTask(f.id))!;
          await f.command.taskBackend.writeTask({ ...task, title: task.title + " changed" });
        }
      }
      await expect(issued.accept()).rejects.toThrow();
      const receipt = await issued.journal();
      expect(receipt.operations[0]?.status).toBe(
        kind === "source" || kind === "task" ? "failed" : "intent",
      );
      const task = (await f.command.taskBackend.getTask(f.id))!;
      expect(JSON.stringify(task.extensions?.task_kernel)).toBe(f.kernel);
      expect(git(f.root, "rev-parse", "HEAD")).toBe(f.head);
    },
  );
});
const originalWrite = exchangeOwner.writeExternalAgentExchange;

function decisionAfterDrift(f: Awaited<ReturnType<typeof fixture>>) {
  return {
    ...f.decision,
    workflowStep: {
      ...f.decision.workflowStep,
      kind: "cli_operation",
      operation: { id: "provider.pr.update_branch", params: {} },
      preconditionFingerprint: {
        ...f.decision.workflowStep.preconditionFingerprint,
        digest: `sha256:${"f".repeat(64)}`,
      },
    },
  } as typeof f.decision;
}
