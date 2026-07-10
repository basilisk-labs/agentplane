---
id: "202607092346-4Z7EZP"
title: "Make AgentPlane loops executable, resumable, and token-aware"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 15
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evaluation"
  - "loops"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-09T23:48:05.831Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-10T00:18:38.395Z"
  updated_by: "REVIEWER"
  note: "Focused loop tests (34/34), typecheck, docs CLI parity, routing, targeted lint/format, schema hash parity, and git diff checks pass; repository-wide schema/format failures are pre-existing and outside this task scope."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-10T00:19:23.024Z"
  updated_by: "EVALUATOR"
  note: "The reviewed head satisfies the approved agentplane-loops loop-runtime contract and all task-scoped deterministic gates."
  evaluated_sha: "aaf67d5127a823aaf0259770166daa824e143972"
  blueprint_digest: "04d2b34c5aea38a69205b7efc556ca976a152f605d62075306a1e26b9f0e9137"
  evidence_refs:
    - ".agentplane/tasks/202607092346-4Z7EZP/README.md"
    - ".agentplane/tasks/202607092346-4Z7EZP/quality/20260710-001923024-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607092346-4Z7EZP/quality/20260710-001923024-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607092346-4Z7EZP/quality/20260710-001923024-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607092346-4Z7EZP/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/loops/engine.test.ts"
    - "packages/agentplane/src/commands/loop/loop.command.test.ts"
  findings:
    - "No confirmed task-scoped defect remains after PR artifact refresh."
    - "Unsupported built-in loops remain intentionally fail-closed; tdd.fix is the only end-to-end executable slice."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the approved end-to-end loop engine on the task branch rooted at agentplane-loops; preserve main untouched and verify checkpoints, budgets, prompt propagation, retries, and resume."
events:
  -
    type: "status"
    at: "2026-07-09T23:48:42.084Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved end-to-end loop engine on the task branch rooted at agentplane-loops; preserve main untouched and verify checkpoints, budgets, prompt propagation, retries, and resume."
  -
    type: "verify"
    at: "2026-07-10T00:18:38.395Z"
    author: "REVIEWER"
    state: "ok"
    note: "Focused loop tests (34/34), typecheck, docs CLI parity, routing, targeted lint/format, schema hash parity, and git diff checks pass; repository-wide schema/format failures are pre-existing and outside this task scope."
doc_version: 3
doc_updated_at: "2026-07-10T00:18:38.500Z"
doc_updated_by: "CODER"
description: "Implement an end-to-end deterministic loop engine on agentplane-loops without touching main: typed transitions, durable checkpoints and resume, step-specific prompt/context propagation, enforced eligibility/permissions/budgets, token accounting, focused checks/evaluator decisions, CLI/docs/schema alignment, and regression tests."
sections:
  Summary: |-
    Make AgentPlane loops executable, resumable, and token-aware

    Implement an end-to-end deterministic loop engine on agentplane-loops without touching main: typed transitions, durable checkpoints and resume, step-specific prompt/context propagation, enforced eligibility/permissions/budgets, token accounting, focused checks/evaluator decisions, CLI/docs/schema alignment, and regression tests.
  Scope: "Implement only on the agentplane-loops branch family. Do not switch, merge, push, or integrate into main. Approved implementation paths: packages/agentplane/src/loops/**; packages/agentplane/src/commands/loop/**; packages/agentplane/src/runner/types/**; packages/agentplane/src/runner/usecases/task-run*.ts; packages/agentplane/src/harness/token-accounting*; schemas and packages/{spec,core}/schemas/loop-spec.schema.json; docs/{reference,developer}/loops.mdx; generated CLI reference when required; task-local artifacts. Deliver one end-to-end executable tdd.fix vertical slice with durable state, enforced gates and budgets, compact step context, deterministic verification, and resumable execution. Other built-in loops may remain experimental but must fail closed when unsupported."
  Plan: |-
    1. Compile LoopSpec into a validated executable graph with typed conditions and hard eligibility gates.
    2. Implement a durable LoopEngine with atomic per-step checkpoints, idempotent resume, budget enforcement, and a step executor registry.
    3. Execute tdd.fix end-to-end: context and prompt rendering, agent runner handoff, diff capture, focused verification, evaluation, and decision routing.
    4. Propagate loop permissions, budgets, prompt identity, and compact step-specific context into RunnerTarget and persist token usage in run metrics.
    5. Add regression tests for success, retry, budget exhaustion, permission denial, crash/resume, and unsupported loop behavior.
    6. Synchronize schemas, CLI reference, and loop documentation; run focused and repository gates and record pre-existing failures separately.
  Verify Steps: |-
    1. bun test packages/agentplane/src/loops packages/agentplane/src/commands/loop/loop.command.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/harness/token-accounting.test.ts
    Expected: executable loop, retry, budget, permission, and resume tests pass.
    2. bun run typecheck
    Expected: TypeScript build passes.
    3. bun run schemas:check
    Expected: loop and shared schemas are synchronized.
    4. bun run docs:cli:check
    Expected: CLI reference matches the executable command surface.
    5. node .agentplane/policy/check-routing.mjs
    Expected: policy routing remains valid.
    6. bun run format:check
    Expected: touched implementation and generated artifacts are formatted.
    7. git diff --check
    Expected: no whitespace errors.
    8. git status --short --untracked-files=all
    Expected: only intentional task-scoped changes remain.
  Verification: |-
    PASS: bun test packages/agentplane/src/loops packages/agentplane/src/commands/loop/loop.command.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/harness/token-accounting.test.ts — 34 tests, 0 failures.
    PASS: bun run typecheck.
    PASS: targeted ESLint on new loop engine/condition/selection and changed runner/command implementation.
    PASS: bun run docs:cli:check after regeneration.
    PASS: node .agentplane/policy/check-routing.mjs.
    PASS: targeted Prettier check for all task-touched files.
    PASS: git diff --check.
    PARTIAL: bun run schemas:check remains red only on unrelated task README/tasks-export schema copies; loop-spec copies are byte-identical by SHA-256.
    PARTIAL: bun run format:check remains red only on unrelated packages/spec/examples/acr.json.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-10T00:18:38.395Z — VERIFY — ok

    By: REVIEWER

    Note: Focused loop tests (34/34), typecheck, docs CLI parity, routing, targeted lint/format, schema hash parity, and git diff checks pass; repository-wide schema/format failures are pre-existing and outside this task scope.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T00:13:20.320Z, excerpt_hash=sha256:db0ecec4f82d546cfddd454677dcab04255605392b22bc78e32417e09e811d98

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202607092346-4Z7EZP-make-agentplane-loops-executable-resumable-and-t/.agentplane/tasks/202607092346-4Z7EZP/blueprint/resolved-snapshot.json
    - old_digest: 04d2b34c5aea38a69205b7efc556ca976a152f605d62075306a1e26b9f0e9137
    - current_digest: 04d2b34c5aea38a69205b7efc556ca976a152f605d62075306a1e26b9f0e9137
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607092346-4Z7EZP

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607092346-4Z7EZP
    - diagnostic_command: agentplane pr check 202607092346-4Z7EZP
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the implementation commit(s) for task 4Z7EZP on the loop task branch. Loop execution must then return to the existing dry-run or single-agent-step behavior without changing main or shared external state."
  Findings: |-
    Initial finding: the previous prototype executes at most one agent.run and then forces human_review; loop-specific permissions, token budgets, transition evaluation, and resume are not enforced end-to-end.

    - Observation: Global schemas:check remains red on pre-existing task-readme-frontmatter and tasks-export schema drift; all three loop-spec schema copies have identical SHA-256 a54ab088bdbf5d32512a51b2a7f0fd60a6804920a3548d7edf365a7b6ecbb174.
      Impact: The repository-wide schema gate cannot be used as a green closure signal, but the loop schema changed by this task is synchronized across root, spec, and core surfaces.
      Resolution: Keep the unrelated task schema repair outside 4Z7EZP; use identical loop schema hashes plus focused loop validation tests as task evidence.

    - Observation: Global format:check remains red only on pre-existing packages/spec/examples/acr.json.
      Impact: The repository-wide formatting gate is red independently of this loop runtime change.
      Resolution: All task-touched files pass targeted Prettier check; leave acr.json outside the approved loop scope.

    - Observation: Repository-wide schemas:check and format:check remain red only on unrelated existing artifacts; all touched loop schemas and files pass targeted checks.
      Impact: Global gates cannot be reported as fully green, but no task-scoped regression remains.
      Resolution: Keep unrelated schema/task-export and acr.json cleanup outside 4Z7EZP; use focused tests, identical loop-schema hashes, and targeted formatting as closure evidence.
id_source: "generated"
---
## Summary

Make AgentPlane loops executable, resumable, and token-aware

Implement an end-to-end deterministic loop engine on agentplane-loops without touching main: typed transitions, durable checkpoints and resume, step-specific prompt/context propagation, enforced eligibility/permissions/budgets, token accounting, focused checks/evaluator decisions, CLI/docs/schema alignment, and regression tests.

## Scope

Implement only on the agentplane-loops branch family. Do not switch, merge, push, or integrate into main. Approved implementation paths: packages/agentplane/src/loops/**; packages/agentplane/src/commands/loop/**; packages/agentplane/src/runner/types/**; packages/agentplane/src/runner/usecases/task-run*.ts; packages/agentplane/src/harness/token-accounting*; schemas and packages/{spec,core}/schemas/loop-spec.schema.json; docs/{reference,developer}/loops.mdx; generated CLI reference when required; task-local artifacts. Deliver one end-to-end executable tdd.fix vertical slice with durable state, enforced gates and budgets, compact step context, deterministic verification, and resumable execution. Other built-in loops may remain experimental but must fail closed when unsupported.

## Plan

1. Compile LoopSpec into a validated executable graph with typed conditions and hard eligibility gates.
2. Implement a durable LoopEngine with atomic per-step checkpoints, idempotent resume, budget enforcement, and a step executor registry.
3. Execute tdd.fix end-to-end: context and prompt rendering, agent runner handoff, diff capture, focused verification, evaluation, and decision routing.
4. Propagate loop permissions, budgets, prompt identity, and compact step-specific context into RunnerTarget and persist token usage in run metrics.
5. Add regression tests for success, retry, budget exhaustion, permission denial, crash/resume, and unsupported loop behavior.
6. Synchronize schemas, CLI reference, and loop documentation; run focused and repository gates and record pre-existing failures separately.

## Verify Steps

1. bun test packages/agentplane/src/loops packages/agentplane/src/commands/loop/loop.command.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/harness/token-accounting.test.ts
Expected: executable loop, retry, budget, permission, and resume tests pass.
2. bun run typecheck
Expected: TypeScript build passes.
3. bun run schemas:check
Expected: loop and shared schemas are synchronized.
4. bun run docs:cli:check
Expected: CLI reference matches the executable command surface.
5. node .agentplane/policy/check-routing.mjs
Expected: policy routing remains valid.
6. bun run format:check
Expected: touched implementation and generated artifacts are formatted.
7. git diff --check
Expected: no whitespace errors.
8. git status --short --untracked-files=all
Expected: only intentional task-scoped changes remain.

## Verification

PASS: bun test packages/agentplane/src/loops packages/agentplane/src/commands/loop/loop.command.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/harness/token-accounting.test.ts — 34 tests, 0 failures.
PASS: bun run typecheck.
PASS: targeted ESLint on new loop engine/condition/selection and changed runner/command implementation.
PASS: bun run docs:cli:check after regeneration.
PASS: node .agentplane/policy/check-routing.mjs.
PASS: targeted Prettier check for all task-touched files.
PASS: git diff --check.
PARTIAL: bun run schemas:check remains red only on unrelated task README/tasks-export schema copies; loop-spec copies are byte-identical by SHA-256.
PARTIAL: bun run format:check remains red only on unrelated packages/spec/examples/acr.json.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-10T00:18:38.395Z — VERIFY — ok

By: REVIEWER

Note: Focused loop tests (34/34), typecheck, docs CLI parity, routing, targeted lint/format, schema hash parity, and git diff checks pass; repository-wide schema/format failures are pre-existing and outside this task scope.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T00:13:20.320Z, excerpt_hash=sha256:db0ecec4f82d546cfddd454677dcab04255605392b22bc78e32417e09e811d98

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202607092346-4Z7EZP-make-agentplane-loops-executable-resumable-and-t/.agentplane/tasks/202607092346-4Z7EZP/blueprint/resolved-snapshot.json
- old_digest: 04d2b34c5aea38a69205b7efc556ca976a152f605d62075306a1e26b9f0e9137
- current_digest: 04d2b34c5aea38a69205b7efc556ca976a152f605d62075306a1e26b9f0e9137
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607092346-4Z7EZP

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607092346-4Z7EZP
- diagnostic_command: agentplane pr check 202607092346-4Z7EZP
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the implementation commit(s) for task 4Z7EZP on the loop task branch. Loop execution must then return to the existing dry-run or single-agent-step behavior without changing main or shared external state.

## Findings

Initial finding: the previous prototype executes at most one agent.run and then forces human_review; loop-specific permissions, token budgets, transition evaluation, and resume are not enforced end-to-end.

- Observation: Global schemas:check remains red on pre-existing task-readme-frontmatter and tasks-export schema drift; all three loop-spec schema copies have identical SHA-256 a54ab088bdbf5d32512a51b2a7f0fd60a6804920a3548d7edf365a7b6ecbb174.
  Impact: The repository-wide schema gate cannot be used as a green closure signal, but the loop schema changed by this task is synchronized across root, spec, and core surfaces.
  Resolution: Keep the unrelated task schema repair outside 4Z7EZP; use identical loop schema hashes plus focused loop validation tests as task evidence.

- Observation: Global format:check remains red only on pre-existing packages/spec/examples/acr.json.
  Impact: The repository-wide formatting gate is red independently of this loop runtime change.
  Resolution: All task-touched files pass targeted Prettier check; leave acr.json outside the approved loop scope.

- Observation: Repository-wide schemas:check and format:check remain red only on unrelated existing artifacts; all touched loop schemas and files pass targeted checks.
  Impact: Global gates cannot be reported as fully green, but no task-scoped regression remains.
  Resolution: Keep unrelated schema/task-export and acr.json cleanup outside 4Z7EZP; use focused tests, identical loop-schema hashes, and targeted formatting as closure evidence.
