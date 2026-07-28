---
id: "202607281605-D59AS4"
title: "Recover completed evaluator supervisor journals for new episodes"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "supervisor"
  - "evaluator"
  - "recovery"
  - "refactor"
  - "v0.7"
verify:
  - "bun run --filter=@agentplaneorg/core build && bunx vitest run packages/core/src/runner/supervisor-execution-episode.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts"
  - "bun run typecheck"
  - "bun run format:changed"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T16:06:02.030Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-28T16:15:50.843Z"
  updated_by: "TESTER"
  note: "Focused supervisor and evaluator regression tests, TypeScript build, formatting, and routing checks passed; stale-state reopening preserves usage while terminal stops remain protected."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-28T16:17:17.030Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 2 typed finding(s)."
  evaluated_sha: "395c5c3248bc87364098cfa7f7d51f2987025489"
  blueprint_digest: "cf3c9c5a682cf107a572f89969c24888f9d75da28cda60d16c6598ee6c4ceba6"
  evidence_refs:
    - ".agentplane/tasks/202607281605-D59AS4/quality/20260728-161624416-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607281605-D59AS4/quality/20260728-161624416-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607281605-D59AS4/quality/20260728-161624416-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607281605-D59AS4/quality/20260728-161624416-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607281605-D59AS4/quality/20260728-161624416-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607281605-D59AS4/quality/20260728-161624416-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202607281605-D59AS4/README.md"
    - ".agentplane/tasks/202607281605-D59AS4/quality/20260728-161624416-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607281605-D59AS4/quality/20260728-161624416-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607281605-D59AS4/quality/20260728-161624416-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The required repeated live evaluator episode is not evidenced; the frozen check record contains no runner history and only a summary assertion."
    - "Verification evidence does not record exact commands, results, output summaries, or covered scope for the declared checks."
commit:
  hash: "d74d6be94f2c5581daee824b0398adbd2138a59b"
  message: "fix(evaluator): recover stale journal at start"
comments:
  -
    author: "CODER"
    body: "Start: investigate and repair safe reopening of completed stale-state evaluator supervisor journals without weakening terminal protection for ambiguous provider effects."
  -
    author: "CODER"
    body: "Implementation: reopened only completed stale-state evaluator journals; preserved failed and ambiguous-effect terminal stops; added focused regression coverage."
  -
    author: "CODER"
    body: "Implementation correction: the evaluator now recovers stale_state returned by the same start attempt before any provider intent is persisted; the regression test changes real task state between episodes."
events:
  -
    type: "status"
    at: "2026-07-28T16:06:20.538Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: investigate and repair safe reopening of completed stale-state evaluator supervisor journals without weakening terminal protection for ambiguous provider effects."
  -
    type: "status"
    at: "2026-07-28T16:14:59.272Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: reopened only completed stale-state evaluator journals; preserved failed and ambiguous-effect terminal stops; added focused regression coverage."
  -
    type: "verify"
    at: "2026-07-28T16:15:50.843Z"
    author: "TESTER"
    state: "ok"
    note: "Focused supervisor and evaluator regression tests, TypeScript build, formatting, and routing checks passed; stale-state reopening preserves usage while terminal stops remain protected."
  -
    type: "status"
    at: "2026-07-28T16:21:57.981Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation correction: the evaluator now recovers stale_state returned by the same start attempt before any provider intent is persisted; the regression test changes real task state between episodes."
doc_version: 3
doc_updated_at: "2026-07-28T16:21:57.981Z"
doc_updated_by: "CODER"
description: "Allow a completed evaluator supervisor episode stopped only for stale state to reopen safely for a new provider episode, while preserving terminal protection for ambiguous or failed provider effects. This unblocks the 0.7 context-assimilation task without changing CURATOR semantics."
sections:
  Summary: |-
    Recover completed evaluator supervisor journals for new episodes

    Allow a completed evaluator supervisor episode stopped only for stale state to reopen safely for a new provider episode, while preserving terminal protection for ambiguous or failed provider effects. This unblocks the 0.7 context-assimilation task without changing CURATOR semantics.
  Scope: |-
    - In scope: Allow a completed evaluator supervisor episode stopped only for stale state to reopen safely for a new provider episode, while preserving terminal protection for ambiguous or failed provider effects. This unblocks the 0.7 context-assimilation task without changing CURATOR semantics.
    - Out of scope: unrelated refactors not required for "Recover completed evaluator supervisor journals for new episodes".
  Plan: "1. Inspect evaluator supervisor journal transition and recovery guards. 2. Permit only a completed stale-state journal to refresh its fingerprint and create a new episode. 3. Keep operation_failed and effect_in_doubt terminal. 4. Add focused unit and command-level regression tests, then run a real repeat evaluator episode. 5. Publish and integrate through the protected branch_pr route."
  Verify Steps: |-
    1. Confirm the safe reopen transition.
    Command: bun run --filter=@agentplaneorg/core build && bunx vitest run packages/core/src/runner/supervisor-execution-episode.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts
    Expected: a completed stale-state evaluator journal starts a second bounded episode; operation_failed and effect_in_doubt remain terminal.

    2. Check types and formatting.
    Command: bun run typecheck && bun run format:changed
    Expected: no type or formatting regression.

    3. Check policy routing.
    Command: node .agentplane/policy/check-routing.mjs
    Expected: routing validation succeeds.

    4. Exercise a repeated live evaluator episode.
    Expected: the second read-only provider episode succeeds and cumulative usage increases without reset.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-28T16:15Z — TESTER — local checks

    - Command: bun run --filter=@agentplaneorg/core build && bunx vitest run packages/core/src/runner/supervisor-execution-episode.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts
      Result: pass
      Evidence: core build succeeded; 2 files and 17 tests passed.
      Scope: completed stale-state reopening, terminal effect guards, and a second fake-Codex evaluator episode with cumulative usage.

    - Command: bun run typecheck
      Result: pass
      Evidence: scripts/checks/run-typescript-build.mjs exited 0.
      Scope: workspace type safety for the exported core helper and evaluator call site.

    - Command: bun run format:changed
      Result: pass
      Evidence: changed-file formatter reported no formatting errors.
      Scope: all changed implementation and test files.

    - Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK.
      Scope: policy gateway invariants.

    ### 2026-07-28T16:17Z — EVALUATOR — live episode 1

    - Command: ap evaluator execute 202607281605-D59AS4 --evaluator recovery-context --json
      Result: provider completed; semantic verdict rework only because the second live episode was not yet recorded.
      Evidence: quality/20260728-161624416-recovery-context/evaluator-episode.json records read-only Codex usage input=167909, output=2091, total=170000 and unchanged workspace.
      Scope: first durable EVALUATOR supervisor episode and provider telemetry.
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: 17 focused tests passed, plus typecheck, changed-file formatting, and routing validation.
      Impact: A completed evaluator journal can now start a bounded follow-up episode after a state refresh without resetting budget usage.
      Resolution: Core guards reject failed and effect-in-doubt journals; evaluator command reopens only the completed stale-state form.
extensions:
  workflow_route_baseline:
    start_head_sha: "c8df32a5e5a1b160e9ab74e0ae6f3a97224d186f"
    version: 1
id_source: "generated"
---
## Summary

Recover completed evaluator supervisor journals for new episodes

Allow a completed evaluator supervisor episode stopped only for stale state to reopen safely for a new provider episode, while preserving terminal protection for ambiguous or failed provider effects. This unblocks the 0.7 context-assimilation task without changing CURATOR semantics.

## Scope

- In scope: Allow a completed evaluator supervisor episode stopped only for stale state to reopen safely for a new provider episode, while preserving terminal protection for ambiguous or failed provider effects. This unblocks the 0.7 context-assimilation task without changing CURATOR semantics.
- Out of scope: unrelated refactors not required for "Recover completed evaluator supervisor journals for new episodes".

## Plan

1. Inspect evaluator supervisor journal transition and recovery guards. 2. Permit only a completed stale-state journal to refresh its fingerprint and create a new episode. 3. Keep operation_failed and effect_in_doubt terminal. 4. Add focused unit and command-level regression tests, then run a real repeat evaluator episode. 5. Publish and integrate through the protected branch_pr route.

## Verify Steps

1. Confirm the safe reopen transition.
Command: bun run --filter=@agentplaneorg/core build && bunx vitest run packages/core/src/runner/supervisor-execution-episode.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts
Expected: a completed stale-state evaluator journal starts a second bounded episode; operation_failed and effect_in_doubt remain terminal.

2. Check types and formatting.
Command: bun run typecheck && bun run format:changed
Expected: no type or formatting regression.

3. Check policy routing.
Command: node .agentplane/policy/check-routing.mjs
Expected: routing validation succeeds.

4. Exercise a repeated live evaluator episode.
Expected: the second read-only provider episode succeeds and cumulative usage increases without reset.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-28T16:15Z — TESTER — local checks

- Command: bun run --filter=@agentplaneorg/core build && bunx vitest run packages/core/src/runner/supervisor-execution-episode.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts
  Result: pass
  Evidence: core build succeeded; 2 files and 17 tests passed.
  Scope: completed stale-state reopening, terminal effect guards, and a second fake-Codex evaluator episode with cumulative usage.

- Command: bun run typecheck
  Result: pass
  Evidence: scripts/checks/run-typescript-build.mjs exited 0.
  Scope: workspace type safety for the exported core helper and evaluator call site.

- Command: bun run format:changed
  Result: pass
  Evidence: changed-file formatter reported no formatting errors.
  Scope: all changed implementation and test files.

- Command: node .agentplane/policy/check-routing.mjs
  Result: pass
  Evidence: policy routing OK.
  Scope: policy gateway invariants.

### 2026-07-28T16:17Z — EVALUATOR — live episode 1

- Command: ap evaluator execute 202607281605-D59AS4 --evaluator recovery-context --json
  Result: provider completed; semantic verdict rework only because the second live episode was not yet recorded.
  Evidence: quality/20260728-161624416-recovery-context/evaluator-episode.json records read-only Codex usage input=167909, output=2091, total=170000 and unchanged workspace.
  Scope: first durable EVALUATOR supervisor episode and provider telemetry.
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: 17 focused tests passed, plus typecheck, changed-file formatting, and routing validation.
  Impact: A completed evaluator journal can now start a bounded follow-up episode after a state refresh without resetting budget usage.
  Resolution: Core guards reject failed and effect-in-doubt journals; evaluator command reopens only the completed stale-state form.
