import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { commitAll, installRunCliIntegrationHarness } from "@agentplane/testkit";
import { digestSupervisorEpisodeValue } from "@agentplaneorg/core/schemas";
import { fixture, issue, unchanged, git } from "./external-agent-observation.testkit.js";
import { acceptExternalAgentResult } from "./external-agent-supervisor.js";
import { refreshExternalAgentRoute } from "./external-agent-result-routing.js";
import { recoverPendingExternalAgentResult } from "./external-agent-supervisor-recovery.js";
import { readExternalAgentExchange } from "./external-agent-exchange.js";
import * as observation from "./external-agent-read-only-observation.js";
import * as exchangeOwner from "./external-agent-exchange.js";
installRunCliIntegrationHarness();
describe("canonical read-only observation admission", () => {
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
