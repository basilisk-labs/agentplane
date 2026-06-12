---
id: "202607092346-4Z7EZP"
title: "Make AgentPlane loops executable, resumable, and token-aware"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
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
doc_version: 3
doc_updated_at: "2026-07-10T00:13:20.320Z"
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
  Rollback Plan: "Revert the implementation commit(s) for task 4Z7EZP on the loop task branch. Loop execution must then return to the existing dry-run or single-agent-step behavior without changing main or shared external state."
  Findings: |-
    Initial finding: the previous prototype executes at most one agent.run and then forces human_review; loop-specific permissions, token budgets, transition evaluation, and resume are not enforced end-to-end.

    - Observation: Global schemas:check remains red on pre-existing task-readme-frontmatter and tasks-export schema drift; all three loop-spec schema copies have identical SHA-256 a54ab088bdbf5d32512a51b2a7f0fd60a6804920a3548d7edf365a7b6ecbb174.
      Impact: The repository-wide schema gate cannot be used as a green closure signal, but the loop schema changed by this task is synchronized across root, spec, and core surfaces.
      Resolution: Keep the unrelated task schema repair outside 4Z7EZP; use identical loop schema hashes plus focused loop validation tests as task evidence.

    - Observation: Global format:check remains red only on pre-existing packages/spec/examples/acr.json.
      Impact: The repository-wide formatting gate is red independently of this loop runtime change.
      Resolution: All task-touched files pass targeted Prettier check; leave acr.json outside the approved loop scope.
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
