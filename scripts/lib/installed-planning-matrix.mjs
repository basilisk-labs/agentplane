import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

function compactPlan(unresolved = false) {
  return {
    schema_version: 2,
    criteria: [
      { id: "report", description: "Report exists", required: true, check_ids: ["review"] },
    ],
    checks: [{ id: "review", kind: "semantic", required: true, capability: "task.verify" }],
    work_items: [
      {
        id: "report",
        objective: "Write result.txt",
        depends_on: [],
        required_inputs: [],
        expected_outputs: ["report"],
        scope_roots: ["result.txt"],
        context: { required_sources: [], optional_sources: [], symbol_hints: [], max_bytes: 4096 },
        risk: "low",
        capabilities: [],
        resource_claims: [],
        optional: false,
        priority: 0,
      },
    ],
    assumptions: [],
    unresolved_questions: unresolved ? ["Which report?"] : [],
  };
}

export function runInstalledPlanningMatrix({ agentplane, tempRoot, run, runFailure }) {
  const scenarios = [];
  for (const mode of [
    "sufficient",
    "missing",
    "unresolved",
    "mandatory",
    "drift",
    "managed_unsupported",
  ]) {
    const root = path.join(tempRoot, mode);
    run("git", ["init", "-q", "-b", "main", root]);
    run("git", ["config", "user.name", "Planning Smoke"], { cwd: root });
    run("git", ["config", "user.email", "planning-smoke@example.com"], { cwd: root });
    writeFileSync(path.join(root, "README.md"), "# Planning fixture\n");
    run("git", ["add", "."], { cwd: root });
    run("git", ["commit", "-qm", "seed"], { cwd: root });
    const cli = (args) => run(agentplane, args, { cwd: root });
    const json = (args) => JSON.parse(cli(args));
    cli([
      "init",
      "--yes",
      "--setup-profile",
      "light",
      "--workflow",
      "direct",
      "--backend",
      "local",
      "--hooks",
      "false",
      "--require-plan-approval",
      "true",
    ]);
    if (["mandatory", "drift", "managed_unsupported"].includes(mode))
      cli(["config", "set", "agents.approvals.require_planner", "true"]);
    if (mode === "managed_unsupported") {
      cli(["config", "set", "runner.default_adapter", "custom"]);
      cli([
        "config",
        "set",
        "runner.custom.command",
        JSON.stringify([process.execPath, "-e", "throw Error('unexpected provider launch')"]),
      ]);
    }
    const input = path.join(root, "supplied.json");
    writeFileSync(input, JSON.stringify(compactPlan(mode === "unresolved")));
    run("git", ["add", "."], { cwd: root });
    run("git", ["-c", "core.hooksPath=/dev/null", "commit", "-qm", "fixture input"], { cwd: root });
    const created = json([
      "task",
      "create",
      "Produce a report",
      "--description",
      "Write the requested report",
      "--task-kind",
      "code",
      "--mutation-scope",
      "code",
      "--scope-root",
      "result.txt",
      "--repository-effect",
      "source_code",
      "--verify",
      "node --version",
      ...(mode === "missing" ? [] : ["--plan-file", input]),
      "--json",
    ]);
    const id = created.task_id;
    const advance = (result) =>
      json(["task", "advance", id, ...(result ? ["--result", result] : []), "--agent-json"]);
    const orderFor = (packet) =>
      JSON.parse(
        readFileSync(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
      );
    if (mode === "sufficient") {
      const managed = json(["task", "run", id, "--json"]);
      assert.equal(managed.action.kind, "approval_required");
      assert.equal(managed.exchange, undefined);
      assert.deepEqual(advance().action, managed.action);
      const before = json(["task", "show", id]).planning;
      assert.equal(before.outcome, "not_required");
      assert.equal(before.plan_origin, "caller_supplied");
      assert.deepEqual(before.issued_work_orders, []);
      assert.deepEqual(json(["task", "status", id, "--json"]).planning, before);
      cli(["task", "plan", "approve", id, "--by", "USER"]);
      const execution = advance();
      const executor = orderFor(execution);
      assert.equal(executor.role, "EXECUTOR");
      const source = "installed planning report\n";
      writeFileSync(path.join(executor.state_fingerprint.worktree, "result.txt"), source);
      writeFileSync(
        execution.exchange.result_path,
        JSON.stringify({
          work_order_id: executor.work_order_id,
          status: "completed",
          summary: "Report written",
          findings: [],
          uncertainty: [],
          canonical_outputs: [
            {
              id: "report",
              kind: "source",
              digest: `sha256:${createHash("sha256").update(source).digest("hex")}`,
            },
          ],
        }),
      );
      const inspection = advance(execution.exchange.result_path);
      const evaluator = orderFor(inspection);
      assert.equal(evaluator.role, "EVALUATOR");
      assert.equal(evaluator.authority.mutation_scope, "none");
      assert.ok(evaluator.verification_intent.requirements.length > 0);
      assert.equal(
        orderFor(advance(execution.exchange.result_path)).work_order_id,
        evaluator.work_order_id,
      );
      assert.equal(json(["task", "show", id]).planning.outcome, "not_required");
    } else if (mode === "managed_unsupported") {
      const failure = runFailure(agentplane, ["task", "run", id, "--json"], { cwd: root });
      assert.match(failure.stderr + failure.stdout, /required read-only planning/u);
      const view = json(["task", "show", id]).planning;
      assert.equal(view.plan_digest, null);
      assert.equal(view.managed_attempts, null);
      assert.deepEqual(view.accepted_results, []);
    } else {
      const packet = advance();
      const planner = orderFor(packet);
      assert.equal(planner.role, "PLANNER");
      assert.equal(planner.authority.sandbox, "read-only");
      assert.equal(planner.authority.mutation_scope, "none");
      assert.deepEqual(planner.authority.writable_roots, []);
      if (mode === "drift") {
        writeFileSync(path.join(root, "material-source.txt"), "changed\n");
        writeFileSync(
          packet.exchange.result_path,
          JSON.stringify({
            work_order_id: planner.work_order_id,
            status: "completed",
            summary: "Stale report plan",
            findings: [],
            uncertainty: [],
            canonical_plan: {
              work_items: [
                {
                  id: "report",
                  depends_on: [],
                  required_inputs: [],
                  expected_outputs: ["report"],
                  optional: false,
                  execution_requirements: {
                    scope_roots: ["result.txt"],
                    repository_effects: ["source_code"],
                    external_effects: [],
                    capabilities: [],
                    resources: [],
                  },
                  contract: {
                    role: "EXECUTOR",
                    objective: "Write report",
                    acceptance_criteria: ["Report exists"],
                    verification_commands: [],
                  },
                },
              ],
            },
          }),
        );
        const refused = runFailure(
          agentplane,
          ["task", "advance", id, "--result", packet.exchange.result_path, "--agent-json"],
          { cwd: root },
        );
        assert.match(refused.stderr + refused.stdout, /stale/u);
      }
      const view = json(["task", "show", id]).planning;
      assert.equal(view.requirement, "required");
      assert.equal(view.plan_digest, null);
      assert.deepEqual(view.accepted_results, []);
    }
    scenarios.push(mode);
  }
  return { scenarios, count: scenarios.length };
}
