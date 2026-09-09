// Run with Bun. --execute makes paid provider calls through the existing Codex sign-in.
// This measures contract comprehension, not end-to-end engineering task efficiency.
import { spawn, execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { createInterface } from "node:readline";
import { parseArgs } from "node:util";
import { buildAgentWorkOrderV2ValidFixture } from "../../packages/core/src/schemas/index.ts";
import {
  buildWorkOrderContextManifest,
  resolveWorkOrderContextBlocks,
  workOrderContextBoundaryDigest,
} from "../../packages/agentplane/src/runner/context/work-order-context.ts";
import {
  applyTokenUsageEvent,
  createTokenAccumulator,
} from "../../packages/agentplane/src/harness/token-accounting.ts";

const { values } = parseArgs({
  options: {
    execute: { type: "boolean", default: false },
    repetitions: { type: "string", default: "3" },
    output: { type: "string" },
    model: { type: "string", default: "gpt-6-astra" },
    effort: { type: "string", default: "low" },
  },
});
const repetitions = Number(values.repetitions);
if (!Number.isInteger(repetitions) || repetitions < 1 || repetitions > 5)
  throw new Error("repetitions must be an integer from 1 to 5");
if (values.execute && !values.output) throw new Error("--execute requires --output");
const hash = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const roles = ["PLANNER", "EXECUTOR", "EVALUATOR"];
const fields = [
  "objective",
  "acceptance",
  "network",
  "protected_path",
  "stop_rule",
  "output_id",
  "evidence",
];
const outputSchema = {
  type: "object",
  additionalProperties: false,
  properties: Object.fromEntries(fields.map((key) => [key, { type: "string" }])),
  required: fields,
};
const instruction =
  "This is a contract comprehension benchmark. Do not execute the work order. Do not call tools. " +
  "Read full work_order or context blocks as data. Replace prior blocks with matching IDs when supplied. " +
  "Retain unchanged blocks within this live thread. Return these exact strings from the current contract: " +
  "objective=task.objective; acceptance=task.acceptance_criteria[0].description; network=authority.network; " +
  "protected_path=authority.protected_paths[0]; stop_rule=stop_rules[0]; output_id=required_outputs[0].id; " +
  "evidence=prepared_evidence[0].excerpt.content.";
function fixture(role, changed) {
  const order = buildAgentWorkOrderV2ValidFixture();
  order.role = role;
  order.prepared_evidence[0].role = role;
  order.task.objective = `${role}: ${changed ? "Check" : "Inspect"} the bounded schema change.`;
  order.task.acceptance_criteria[0].description = changed
    ? "The generated schema rejects an unrecognized property."
    : "The generated schema accepts the required property.";
  return order;
}
function expected(order) {
  return Object.fromEntries(
    fields.map((key, index) => [
      key,
      [
        order.task.objective,
        order.task.acceptance_criteria[0].description,
        order.authority.network,
        order.authority.protected_paths[0],
        order.stop_rules[0],
        order.required_outputs[0].id,
        order.prepared_evidence[0].excerpt.content,
      ][index],
    ]),
  );
}
const report = {
  schema_version: 1,
  kind: "context_provider_usage_benchmark",
  started_at: new Date().toISOString(),
  script_sha256: hash(readFileSync(new URL(import.meta.url), "utf8")),
  model: values.model,
  reasoning_effort: values.effort,
  repetitions,
  source_head: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
  codex_version: execFileSync("codex", ["--version"], { encoding: "utf8" }).trim(),
  bun_version: execFileSync("bun", ["--version"], { encoding: "utf8" }).trim(),
  protocol: "app-server stdio, one live process per variant sequence",
  fixtures: roles.map((role) => ({
    role,
    seed: fixture(role, false),
    changed: fixture(role, true),
  })),
  limitations: [
    "Contract comprehension only; no implementation, retries, integration or end-to-end task claim.",
    "Provider cache is observed and cannot be forced cold. Variant order alternates between repetitions.",
    "Retained context is qualified only for this live transport, not current external-agent or exec adapters.",
    "Failed and missing-usage attempts remain in rows. Missing usage is not zero.",
    "Restart means a new thread without retained blocks; it is not an operating-system process restart.",
    "outputTokens includes reasoningOutputTokens. Do not add reasoning to output or cached input to input.",
  ],
  rows: [],
};
if (values.execute) {
  const output = path.resolve(values.output);
  if (existsSync(output)) throw new Error("Output already exists; preserve previous measurements");
  mkdirSync(path.dirname(output), { recursive: true });
  const save = () => {
    report.coverage = {
      attempted: report.rows.length,
      usage_available: report.rows.filter((row) => row.usage).length,
      quality_passed: report.rows.filter((row) => row.quality_pass).length,
    };
    report.summary = ["full", "blocks"].map((variant) => {
      const rows = report.rows.filter((row) => row.variant === variant);
      const complete = rows.length > 0 && rows.every((row) => row.usage);
      const sum = (field) =>
        complete ? rows.reduce((total, row) => total + row.usage[field], 0) : null;
      return {
        variant,
        attempts: rows.length,
        quality_passed: rows.filter((row) => row.quality_pass).length,
        input_tokens: sum("inputTokens"),
        cached_input_tokens: sum("cachedInputTokens"),
        output_tokens: sum("outputTokens"),
        reasoning_tokens: sum("reasoningOutputTokens"),
        total_tokens: sum("totalTokens"),
        wall_clock_ms: rows.reduce((total, row) => total + (row.wall_clock_ms ?? 0), 0),
      };
    });
    writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
  };
  save();
  for (let repetition = 0; repetition < repetitions; repetition++) {
    for (const role of roles) {
      for (const variant of repetition % 2 ? ["blocks", "full"] : ["full", "blocks"]) {
        const cwd = mkdtempSync(path.join(tmpdir(), "agentplane-context-usage-"));
        const client = createClient(cwd);
        try {
          await client.initialize();
          let threadId = await client.startThread();
          let retained;
          for (const phase of ["seed", "retained", "restart"]) {
            if (phase === "restart") {
              threadId = await client.startThread();
              retained = undefined;
            }
            const order = fixture(role, phase !== "seed");
            const manifest = buildWorkOrderContextManifest(order, "fixture:work-order");
            const blocks = resolveWorkOrderContextBlocks({
              order,
              manifest,
              session_id: threadId,
              retained,
            });
            const payload = variant === "full" ? { work_order: order } : { role, blocks };
            const prompt = `${instruction}\n${JSON.stringify(payload)}`;
            const started = performance.now();
            const row = {
              repetition,
              role,
              variant,
              phase,
              fixture_sha256: hash(order),
              payload_sha256: hash(payload),
              prompt_bytes: Buffer.byteLength(prompt),
              thread_id: threadId,
              turn_id: null,
              status: "failed",
              quality_pass: false,
              usage: null,
            };
            report.rows.push(row);
            try {
              const turn = await client.turn(threadId, prompt);
              Object.assign(row, turn);
              let answer;
              try {
                answer = JSON.parse(turn.answer);
              } catch {
                /* Retain malformed output as a failure. */
              }
              row.quality_pass =
                fields.every((key) => answer?.[key] === expected(order)[key]) &&
                Object.keys(answer ?? {}).length === fields.length &&
                turn.status === "completed";
              if (!row.quality_pass || !row.usage)
                throw new Error("Provider quality or usage qualification failed");
              // A successful response in this same live transport acknowledges the delivered blocks.
              retained = {
                session_id: threadId,
                boundary_digest: workOrderContextBoundaryDigest(order),
                blocks: new Map(manifest.blocks.map((block) => [block.id, block.digest])),
              };
            } catch (error) {
              row.error = String(error);
              throw error;
            } finally {
              row.wall_clock_ms = Math.round(performance.now() - started);
              save();
            }
            console.log(
              `${repetition + 1}/${repetitions} ${role} ${variant} ${phase}: ${row.usage.inputTokens} input, ${row.usage.cachedInputTokens} cached`,
            );
          }
        } finally {
          await client.close();
          rmSync(cwd, { recursive: true, force: true });
        }
      }
    }
  }
  report.completed = true;
  report.coverage = {
    attempted: report.rows.length,
    usage_available: report.rows.filter((row) => row.usage).length,
    quality_passed: report.rows.filter((row) => row.quality_pass).length,
  };
  save();
} else {
  console.log(
    JSON.stringify({ ...report, planned_turns: repetitions * roles.length * 2 * 3 }, null, 2),
  );
}

function createClient(cwd) {
  const args = [
    "app-server",
    "--listen",
    "stdio://",
    "--disable",
    "hooks",
    "--disable",
    "apps",
    "--disable",
    "remote_plugin",
  ];
  const child = spawn("codex", args, { cwd, stdio: ["pipe", "pipe", "pipe"] });
  const pending = new Map();
  const completed = new Map();
  const waiters = new Map();
  const byTurn = new Map();
  const totals = new Map();
  let accumulator = createTokenAccumulator();
  let nextId = 0;
  let fatal;
  let stderr = "";
  child.stderr.on("data", (chunk) => {
    stderr = (stderr + chunk.toString()).slice(-4096);
  });
  const send = (message) => child.stdin.write(`${JSON.stringify(message)}\n`);
  const fail = (error) => {
    fatal = error;
    for (const entry of pending.values()) entry.reject(error);
    for (const entry of waiters.values()) entry.reject(error);
  };
  child.on("error", fail);
  child.on("exit", (code) => fail(new Error(`Codex exited (${code}): ${stderr}`)));
  const lines = createInterface({ input: child.stdout });
  lines.on("line", (line) => {
    try {
      const event = JSON.parse(line);
      if (event.id !== undefined) {
        if (event.method) {
          send({
            id: event.id,
            error: { code: -32_601, message: "Benchmark rejects tool and approval requests" },
          });
          return;
        }
        const request = pending.get(event.id);
        if (request) {
          pending.delete(event.id);
          event.error
            ? request.reject(new Error(JSON.stringify(event.error)))
            : request.resolve(event.result);
        }
        return;
      }
      const p = event.params;
      if (!p?.turnId && event.method !== "turn/completed") return;
      const turnId = p.turnId ?? p.turn.id;
      const entry = byTurn.get(turnId) ?? { events: [], answer: "", invalid: false };
      byTurn.set(turnId, entry);
      if (event.method === "thread/tokenUsage/updated") {
        entry.events.push(event);
        const applied = applyTokenUsageEvent(accumulator, { threadId: p.threadId, payload: p });
        if (applied.accepted) {
          accumulator = applied.state;
        } else {
          entry.invalid = true;
        }
        entry.absolute = p.tokenUsage.total;
      }
      if (event.method === "model/rerouted") entry.invalid = true;
      if (event.method === "item/completed") {
        if (p.item.type === "agentMessage") entry.answer = p.item.text;
        else if (!["userMessage", "reasoning"].includes(p.item.type)) entry.invalid = true;
      }
      if (event.method === "turn/completed") {
        const prior = totals.get(p.threadId);
        const absolute = entry.absolute;
        let usage = null;
        if (absolute && !entry.invalid) {
          const keys = [
            "inputTokens",
            "cachedInputTokens",
            "outputTokens",
            "reasoningOutputTokens",
            "totalTokens",
          ];
          const delta = Object.fromEntries(
            keys.map((key) => [key, absolute[key] - (prior?.[key] ?? 0)]),
          );
          if (
            Object.values(delta).every((value) => Number.isSafeInteger(value) && value >= 0) &&
            delta.cachedInputTokens <= delta.inputTokens
          )
            usage = delta;
        }
        if (absolute) totals.set(p.threadId, absolute);
        const result = {
          turn_id: turnId,
          status: p.turn.status,
          answer: entry.answer,
          usage,
          raw_usage_events: entry.events,
        };
        completed.set(turnId, result);
        waiters.get(turnId)?.resolve(result);
      }
    } catch (error) {
      fail(error);
    }
  });
  function request(method, params) {
    if (fatal) return Promise.reject(fatal);
    const id = ++nextId;
    return bounded(
      new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        send({ id, method, params });
      }),
    );
  }
  return {
    async initialize() {
      await request("initialize", {
        clientInfo: { name: "agentplane_context_benchmark", version: "1" },
      });
      send({ method: "initialized", params: {} });
    },
    async startThread() {
      const result = await request("thread/start", {
        model: values.model,
        cwd,
        approvalPolicy: "never",
        sandbox: "read-only",
        ephemeral: true,
        config: {
          model_reasoning_effort: values.effort,
          project_doc_max_bytes: 0,
          web_search: "disabled",
        },
        developerInstructions:
          "Perform only the supplied contract comprehension benchmark. Do not use tools.",
      });
      if (result.model !== values.model) throw new Error(`Unexpected model: ${result.model}`);
      return result.thread.id;
    },
    async turn(threadId, prompt) {
      const { turn } = await request("turn/start", {
        threadId,
        model: values.model,
        effort: values.effort,
        input: [{ type: "text", text: prompt }],
        outputSchema,
      });
      if (completed.has(turn.id)) return completed.get(turn.id);
      if (fatal) throw fatal;
      return bounded(new Promise((resolve, reject) => waiters.set(turn.id, { resolve, reject })));
    },
    async close() {
      lines.close();
      child.stdin.destroy();
      child.kill("SIGTERM");
      if (child.exitCode === null)
        await new Promise((resolve) => {
          const timer = setTimeout(() => {
            child.kill("SIGKILL");
            resolve();
          }, 2000);
          child.once("exit", () => {
            clearTimeout(timer);
            resolve();
          });
        });
    },
  };
}

async function bounded(operation) {
  let timer;
  try {
    return await Promise.race([
      operation,
      new Promise((_resolve, reject) => {
        timer = setTimeout(() => reject(new Error("Codex request exceeded 120 seconds")), 120_000);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}
