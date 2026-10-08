import assert from "node:assert/strict";
import { digest } from "./contract.mjs";
import { openSubscriptionLedger } from "./subscription-ledger.mjs";
import {
  parseSubscriptionTokens,
  subscriptionQuota,
  mergeSubscriptionQuota,
  tokenFields,
  validateSubscriptionContract,
} from "./subscription-contract.mjs";

function bounded(promise, milliseconds) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_resolve, reject) => {
      timer = setTimeout(
        () => reject(new Error("Managed request deadline expired; effect remains unknown")),
        milliseconds,
      );
    }),
  ]).finally(() => clearTimeout(timer));
}

const noop = () => {};

// The host supplies an initialized managed app-server connection, its native
// authority check and its sandboxed process. Campaign JSON supplies none of these.
// This module neither starts a provider nor changes authentication or billing.
export async function openSubscriptionBoundary({ contract: input, ledgerRoot }, host) {
  const contract = validateSubscriptionContract(input);
  assert.equal(typeof host.authorize, "function");
  assert.equal(typeof host.request, "function");
  assert.equal(typeof host.subscribe, "function");
  const { request, subscribe, authorize, threadOptions: qualifyThread, now = Date.now } = host;
  assert.equal(typeof qualifyThread, "function");
  assert.equal(
    await authorize(digest(contract), contract.authority_digest),
    true,
    "Missing native campaign authority",
  );
  const ledger = openSubscriptionLedger(ledgerRoot, contract);
  let busy = false;
  return {
    read: ledger.read,
    async execute(call, input, threadOptions) {
      assert.ok(!busy, "A subscription turn is already active");
      busy = true;
      let unsubscribe = noop;
      let deadlineTimer;
      try {
        const timeout = contract.limits.turn_timeout_ms;
        const started = now();
        const campaignStart =
          Object.values(ledger.read().calls)[0]?.reservation.started_ms ?? started;
        const deadline = Math.min(
          started + timeout,
          campaignStart + contract.limits.max_duration_ms,
        );
        assert.ok(deadline > started, "Campaign time exhausted");
        const rpc = (method, params) =>
          bounded(
            Promise.resolve().then(() => {
              assert.ok(now() < deadline, "Managed request deadline expired");
              if (method === "turn/start")
                assert.equal(stopReason, null, "Subscription stopped before turn start");
              return request(method, params);
            }),
            Math.max(1, deadline - now()),
          );
        const account = await rpc("account/read", { refreshToken: false });
        let quota = subscriptionQuota(account, await rpc("account/rateLimits/read", {}));
        assert.ok(
          quota.windows.every((w) => w.used_percent < contract.limits.quota_cutoff_percent),
          "Subscription quota cutoff reached",
        );
        // Sandbox/cwd come from the qualified host, never from a campaign manifest.
        const options = await bounded(
          Promise.resolve().then(() => qualifyThread(threadOptions)),
          Math.max(1, deadline - now()),
        );
        const thread = await rpc("thread/start", {
          ...options,
          model: contract.model,
          ephemeral: true,
          approvalPolicy: "never",
          config: { ...options.config, model_reasoning_effort: contract.effort },
        });
        const threadId = thread.thread?.id;
        assert.ok(typeof threadId === "string" && threadId);
        const observedModel = thread.model ?? null;
        const observedEffort = thread.reasoningEffort ?? null;
        assert.equal(observedModel, contract.model, "Observed model drift before dispatch");
        assert.equal(
          observedEffort,
          contract.effort,
          "Observed effort unavailable or drifted before dispatch",
        );
        quota = subscriptionQuota(
          await rpc("account/read", { refreshToken: false }),
          await rpc("account/rateLimits/read", {}),
        );
        assert.ok(
          quota.windows.every((w) => w.used_percent < contract.limits.quota_cutoff_percent),
          "Subscription quota cutoff reached",
        );
        assert.ok(now() < deadline, "Managed request deadline expired before intent");
        const reservation = {
          ...structuredClone(call),
          model: contract.model,
          effort: contract.effort,
          thread_id: threadId,
          started_ms: started,
          deadline_ms: deadline,
          preflight_quota: quota,
        };
        ledger.intent(reservation);
        let turnId = null;
        let usage = parseSubscriptionTokens(null);
        let stopReason = null;
        let identityValid = true;
        let finished = null;
        let finalQuota = quota;
        let quotaOvershoot = 0;
        const buffered = [];
        let resolveCompletion;
        let rejectCompletion;
        const completion = new Promise((resolve, reject) => {
          resolveCompletion = resolve;
          rejectCompletion = reject;
        });
        // Attach a handler before notifications can reject this promise.
        completion.catch(() => {});
        let interruptionRequested = false;
        const interrupt = (reason) => {
          stopReason ??= reason;
          if (turnId && !interruptionRequested) {
            interruptionRequested = true;
            Promise.resolve()
              .then(() => request("turn/interrupt", { threadId, turnId }))
              .catch(() => {});
          }
        };
        const consume = (event) => {
          try {
            const p = event.params;
            if (event.method === "account/rateLimits/updated") {
              try {
                finalQuota = mergeSubscriptionQuota(finalQuota, p);
                quotaOvershoot = Math.max(
                  quotaOvershoot,
                  ...finalQuota.windows.map(
                    (w) => w.used_percent - contract.limits.quota_cutoff_percent,
                  ),
                );
                if (
                  finalQuota.windows.some(
                    (w) => w.used_percent >= contract.limits.quota_cutoff_percent,
                  )
                )
                  interrupt("quota_cutoff");
              } catch {
                interrupt("quota_unavailable");
              }
              return;
            }
            if (event.method === "account/updated") {
              if (p?.authMode !== "chatgpt") interrupt("authentication_changed");
              return;
            }
            if (p?.threadId !== threadId) return;
            if (!turnId) {
              buffered.push(event);
              return;
            }
            if ((p.turnId ?? p.turn?.id) !== turnId) return;
            if (finished) throw new Error("Event after terminal turn");
            if (event.method === "model/rerouted") {
              identityValid = false;
              interrupt("model_rerouted");
            }
            if (event.method === "thread/tokenUsage/updated") {
              const next = parseSubscriptionTokens(p.tokenUsage?.total);
              for (const key of tokenFields)
                if (usage[key] !== null)
                  assert.ok(
                    next[key] !== null && next[key] >= usage[key],
                    "Cumulative usage regressed",
                  );
              if (usage.totalTokens !== null && next.totalTokens === usage.totalTokens)
                assert.deepEqual(next, usage, "Conflicting cumulative usage");
              usage = next;
              const prior = Object.values(ledger.read().calls).reduce(
                (sum, c) => sum + (c.receipt?.usage.totalTokens ?? 0),
                0,
              );
              if (
                prior +
                  (usage.totalTokens ??
                    Math.max(usage.inputTokens ?? 0, usage.cachedInputTokens ?? 0) +
                      Math.max(usage.outputTokens ?? 0, usage.reasoningOutputTokens ?? 0)) >=
                contract.limits.soft_token_ceiling
              )
                interrupt("soft_token_ceiling");
            }
            if (event.method === "turn/completed") {
              assert.ok(
                ["completed", "failed", "interrupted"].includes(p.turn.status),
                "Unknown terminal status",
              );
              if (now() >= deadline) stopReason ??= "turn_deadline";
              finished = { status: p.turn.status, finished_ms: now() };
              resolveCompletion();
            }
          } catch (error) {
            interrupt("invalid_provider_evidence");
            rejectCompletion(error);
          }
        };
        unsubscribe = subscribe(consume);
        deadlineTimer = setTimeout(() => interrupt("turn_deadline"), Math.max(1, deadline - now()));
        assert.equal(stopReason, null, "Subscription stopped before turn start");
        const result = await rpc("turn/start", {
          threadId,
          model: contract.model,
          effort: contract.effort,
          input: structuredClone(input),
        });
        turnId = result.turn?.id;
        ledger.turn(call.id, turnId);
        for (const event of buffered) consume(event);
        if (stopReason) interrupt(stopReason);
        await bounded(completion, Math.max(1, deadline - now()));
        const priorTokens = Object.values(ledger.read().calls).reduce(
          (sum, c) => sum + (c.receipt?.usage.totalTokens ?? 0),
          0,
        );
        const receipt = {
          thread_id: threadId,
          turn_id: turnId,
          effect_state: "terminal",
          ...finished,
          observed_model: observedModel,
          observed_effort: observedEffort,
          identity_valid: identityValid,
          usage,
          stop_reason: stopReason,
          final_quota: finalQuota,
          token_overshoot:
            usage.totalTokens === null
              ? null
              : Math.max(0, priorTokens + usage.totalTokens - contract.limits.soft_token_ceiling),
          quota_overshoot_percent: quotaOvershoot,
          duration_ms: finished.finished_ms - started,
        };
        ledger.receipt(call.id, receipt);
        return receipt;
      } finally {
        clearTimeout(deadlineTimer);
        unsubscribe();
        busy = false;
      }
    },
  };
}
