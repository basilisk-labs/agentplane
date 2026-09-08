import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { cp, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { promisify } from "node:util";
import { expect, it } from "vitest";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithCommit,
  setTaskVerifySteps,
  writeConfig,
} from "@agentplane/testkit";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";
import { writeCompletedResult, type AgentPacket } from "./run-cli.core.task-advance.testkit.js";

installRunCliIntegrationHarness();
const exec = promisify(execFile);
const digest = (text: string) => `sha256:${createHash("sha256").update(text).digest("hex")}`;
const before = "module.exports = (value) => value > 10;\n";
const after = "module.exports = (value) => value >= 10;\n";
const check = [
  "const assert = require('node:assert/strict');",
  "const eligible = require('./eligible.cjs');",
  "assert.equal(eligible(9), false);",
  "assert.equal(eligible(10), true);",
  "assert.equal(eligible(11), true);",
].join("\n");

// Count the full schema closure, not only a small envelope that references a large schema.
async function schemaClosure(entry: string) {
  const files = new Map<string, number>();
  async function visit(file: string): Promise<void> {
    const absolute = path.resolve(file);
    if (files.has(absolute)) return;
    const text = await readFile(absolute, "utf8");
    files.set(absolute, Buffer.byteLength(text));
    async function walk(value: unknown): Promise<void> {
      if (!value || typeof value !== "object") return;
      for (const [key, child] of Object.entries(value)) {
        if (key === "$ref" && typeof child === "string" && !child.startsWith("#")) {
          const ref = child.split("#")[0]!;
          if (/^[a-z]+:/iu.test(ref)) throw new Error(`Unmeasured remote schema: ${ref}`);
          await visit(path.resolve(path.dirname(absolute), ref));
        } else await walk(child);
      }
    }
    await walk(JSON.parse(text));
  }
  await visit(entry);
  return { files: files.size, bytes: [...files.values()].reduce((a, b) => a + b, 0) };
}

it("measures a one-condition protocol round trip without claiming model telemetry", async () => {
  const root = await mkGitRepoRootWithCommit();
  const config = defaultConfig();
  config.workflow_mode = "direct";
  await writeConfig(root, config);
  await cp(path.join(process.cwd(), ".agentplane/policy"), path.join(root, ".agentplane/policy"), {
    recursive: true,
  });
  await writeFile(path.join(root, "eligible.cjs"), before);
  await writeFile(path.join(root, "check.cjs"), check);
  await writeFile(
    path.join(root, "package.json"),
    JSON.stringify({ scripts: { check: "node check.cjs", "ci:local:full": "node check.cjs" } }),
  );
  await exec("git", ["add", "."], { cwd: root });
  await exec("git", ["commit", "-m", "test: seed boundary condition fixture"], { cwd: root });
  await expect(exec(process.execPath, ["check.cjs"], { cwd: root })).rejects.toThrow();

  const calls: { stage: string; duration_ms: number; exit_code: number }[] = [];
  const exchanges: {
    role: string;
    schema: { files: number; bytes: number };
    work_order_bytes: number;
    manifest_bytes: number;
    result_bytes: number;
  }[] = [];
  async function invoke(stage: string, argv: string[]) {
    const io = captureStdIO();
    const start = performance.now();
    try {
      const code = await runCli([...argv, "--root", root]);
      calls.push({ stage, duration_ms: performance.now() - start, exit_code: code });
      expect(code, io.stderr).toBe(0);
      return io.stdout;
    } finally {
      io.restore();
    }
  }
  const taskId = (
    await invoke("setup", [
      "task",
      "new",
      "--title",
      "Include the exact threshold",
      "--description",
      "Change value > 10 to value >= 10 in eligible.cjs. Check 9, 10 and 11.",
      "--owner",
      "CODER",
      "--tag",
      "code",
      "--verify",
      "bun run check",
    ])
  ).trim();
  const planning = JSON.parse(
    await invoke("prepare:PLANNER", ["task", "advance", taskId, "--agent-json"]),
  ) as AgentPacket;
  expect(planning.authority.role).toBe("PLANNER");

  async function submit(packet: AgentPacket, summary: string) {
    const exchange = packet.exchange!;
    const resultPath = await writeCompletedResult(
      packet,
      summary,
      packet.authority.role === "EVALUATOR"
        ? { verdict: "pass", missing_tests: [], hidden_assumptions: [], residual_risks: [] }
        : undefined,
      packet.authority.role === "PLANNER"
        ? {
            task_kind: "code",
            mutation_scope: "code",
            risk_flags: [],
            tags: ["code"],
            execution: {
              schema_version: 2,
              preferred_mode: "direct",
              scope_roots: ["eligible.cjs"],
              repository_effects: ["repository_write", "source_code"],
              external_effects: [],
              requirements_uncertainty: "bounded",
              implementation_uncertainty: "bounded",
              reversibility: "reversible",
              rationale: ["Change one local condition and preserve the existing boundary check."],
            },
          }
        : undefined,
      packet.authority.role === "PLANNER",
    );
    if (packet.authority.role === "PLANNER") {
      const result = JSON.parse(await readFile(resultPath, "utf8"));
      const item = result.result.task_plan_proposal.work_items.work_items[0];
      item.objective = "Include value 10 in eligible.cjs and preserve the neighboring cases.";
      item.scope_roots = ["eligible.cjs"];
      item.acceptance_criteria[0].description = "The boundary test passes for 9, 10 and 11.";
      item.validation.criteria[0].description = item.acceptance_criteria[0].description;
      result.result.task_plan_proposal.top_level_validation.criteria[0].description =
        item.acceptance_criteria[0].description;
      await writeFile(resultPath, `${JSON.stringify(result, null, 2)}\n`);
    }
    if (exchange.result_format === "semantic_payload_v1") {
      const payload = JSON.parse(await readFile(resultPath, "utf8")).result;
      delete payload.schema_version;
      delete payload.kind;
      delete payload.canonical_binding;
      if (payload.task_plan_proposal) {
        const proposal = payload.task_plan_proposal;
        const { acceptance_criteria, validation, ...item } = proposal.work_items.work_items[0];
        payload.task_plan_proposal = {
          schema_version: 2,
          criteria: acceptance_criteria,
          checks: validation.checks,
          work_items: [item],
        };
      }
      await writeFile(resultPath, `${JSON.stringify(payload, null, 2)}\n`);
    }
    exchanges.push({
      role: packet.authority.role,
      schema: await schemaClosure(path.join(exchange.directory, exchange.result_schema_ref)),
      work_order_bytes: (await readFile(path.join(exchange.directory, exchange.work_order_ref)))
        .length,
      manifest_bytes: (await readFile(path.join(exchange.directory, "work-order-context.json")))
        .length,
      result_bytes: (await readFile(resultPath)).length,
    });
    return JSON.parse(
      await invoke(`admit:${packet.authority.role}`, exchange.resume_argv.slice(1)),
    ) as AgentPacket;
  }
  expect(
    (await submit(planning, "Include the threshold and run the boundary check.")).action.kind,
  ).toBe("approval_required");
  await setTaskVerifySteps(root, taskId);
  await invoke("fixture_approval", ["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR"]);
  const implementation = JSON.parse(
    await invoke("prepare:EXECUTOR", ["task", "advance", taskId, "--agent-json"]),
  ) as AgentPacket;
  expect(implementation.authority.role).toBe("EXECUTOR");
  await writeFile(path.join(root, "eligible.cjs"), after);
  await exec(process.execPath, ["check.cjs"], { cwd: root });
  const review = await submit(
    implementation,
    "Included the exact threshold. Boundary check passed.",
  );
  expect(review.authority.role).toBe("EVALUATOR");
  expect(
    (await submit(review, "The boundary and neighboring cases are correct.")).action.kind,
  ).toBe("terminal");
  expect(exchanges.map((item) => item.role)).toEqual(["PLANNER", "EXECUTOR", "EVALUATOR"]);
  expect(await readFile(path.join(root, "eligible.cjs"), "utf8")).toBe(after);

  const reportPath = process.env.AGENTPLANE_PROTOCOL_COST_REPORT;
  if (reportPath) {
    const output = path.resolve(reportPath);
    const outputRoot = path.resolve("scripts/baselines");
    expect(path.dirname(output)).toBe(outputRoot);
    const head = await exec("git", ["rev-parse", "HEAD"], { cwd: process.cwd() });
    const patch = await exec("git", ["diff", "HEAD", "--", "packages", "scripts"], {
      cwd: process.cwd(),
      maxBuffer: 10 * 1024 * 1024,
    });
    await writeFile(
      output,
      `${JSON.stringify(
        {
          schema_version: 1,
          source: {
            head: head.stdout.trim(),
            tracked_patch_digest: digest(patch.stdout),
            probe_digest: digest(await readFile(new URL(import.meta.url), "utf8")),
          },
          runtime: {
            node: process.version,
            executable: process.execPath,
            platform: process.platform,
            architecture: process.arch,
            harness: "Vitest in-process runCli; no provider",
          },
          fixture: {
            before,
            after,
            check,
            digest: digest(JSON.stringify({ before, after, check })),
          },
          exchanges,
          calls,
          totals: {
            semantic_exchanges: exchanges.length,
            result_retries: calls.filter(
              (call) => call.stage.startsWith("admit:") && call.exit_code !== 0,
            ).length,
            required_schema_bytes: exchanges.reduce((sum, item) => sum + item.schema.bytes, 0),
            agent_result_bytes: exchanges.reduce((sum, item) => sum + item.result_bytes, 0),
            cli_protocol_ms: calls
              .filter((call) => /^(prepare|admit):/u.test(call.stage))
              .reduce((sum, call) => sum + call.duration_ms, 0),
          },
          model: { elapsed_ms: null, input_tokens: null, output_tokens: null, cached_tokens: null },
          user_wait_ms: null,
          limitations: [
            "Scripted semantic results, not a model run.",
            "CLI admission includes native transitions and checks, and can prepare the next episode.",
            "Schema bytes count each complete reference closure per exchange; they are not token counts.",
            "WorkOrder and manifest sizes exclude referenced source contents and provider transport.",
          ],
        },
        null,
        2,
      )}\n`,
      { flag: "wx" },
    );
  }
}, 60_000);
