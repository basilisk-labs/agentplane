---
id: "202605201001-3TVWFX"
title: "Lint task Verify Steps ambiguity"
result_summary: "Merged via batch PR #3965 as included task."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evidence"
  - "tasks"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bunx vitest run packages/core/src/tasks/tasks-lint.test.ts packages/agentplane/src/commands/task/lint*"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-20T10:01:04.393Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-20T16:53:47.951Z"
  updated_by: "EVALUATOR"
  note: "Verified: current main cc334fc66 contains batch PR #3965 and primary task 202605201000-511PS9 close evidence; included code task quality evidence remains covered by hosted PR checks and review fix."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-20T16:53:47.951Z"
  updated_by: "EVALUATOR"
  note: "Verified: current main cc334fc66 contains batch PR #3965 and primary task 202605201000-511PS9 close evidence; included code task quality evidence remains covered by hosted PR checks and review fix."
  evaluated_sha: "cc334fc66ef290e994438d1c3c413ebeb7d3b8a2"
  blueprint_digest: "c14da05db4cbde8cf4f0bddf4d0b5f1abb5c3060b5e455047755b5a7af44a570"
  evidence_refs:
    - ".agentplane/tasks/202605201001-3TVWFX/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tasks/202605201001-3TVWFX/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "63645a1cc3e1908fb5bca751360d416c122bb6ec"
  message: "Merge pull request #3965 from basilisk-labs/task/202605201000-511PS9/task-next-action-ambiguity"
comments:
  -
    author: "CODER"
    body: "Start: Batch task for Verify Steps linting; implementation will be included in primary ambiguity-route-contract worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: Included task landed through batch PR #3965; current main cc334fc66 contains implementation, hosted checks, review fix, and primary close evidence."
events:
  -
    type: "status"
    at: "2026-05-20T10:03:41.577Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Batch task for Verify Steps linting; implementation will be included in primary ambiguity-route-contract worktree."
  -
    type: "verify"
    at: "2026-05-20T10:22:33.550Z"
    author: "CODER"
    state: "ok"
    note: "Implemented in 8dea62f1d. Evidence: focused Vitest suites passed (tasks-lint, runner blueprint, base prompts); packages/core and packages/recipes typecheck passed; packages/agentplane tsc --noEmit passed after rebuilding local package outputs; ESLint passed on touched TS files; policy routing passed; diff check passed; framework:dev:bootstrap passed; ap doctor passed with only pre-existing untracked DONE-task archive warning for 202605200640-7AXZRX; CLI smoke passed for quickstart wording, next-action --explain, evidence check, and default task lint. ap task lint --verify-steps intentionally reports legacy polluted Verify Steps as an opt-in diagnostic."
  -
    type: "verify"
    at: "2026-05-20T10:23:46.441Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality gate passed for implementation commit 8dea62f1d. Scope matched task objective; no unrelated source changes identified. Evidence reviewed: focused tests, typechecks, ESLint, policy routing, diff check, framework bootstrap, doctor, and CLI smoke. Residual note: ap task lint --verify-steps is opt-in because it exposes pre-existing historical Verify Steps pollution outside this task."
  -
    type: "verify"
    at: "2026-05-20T16:53:47.951Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Verified: current main cc334fc66 contains batch PR #3965 and primary task 202605201000-511PS9 close evidence; included code task quality evidence remains covered by hosted PR checks and review fix."
  -
    type: "status"
    at: "2026-05-20T16:54:21.284Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Included task landed through batch PR #3965; current main cc334fc66 contains implementation, hosted checks, review fix, and primary close evidence."
doc_version: 3
doc_updated_at: "2026-05-20T16:54:21.288Z"
doc_updated_by: "INTEGRATOR"
description: "Add machine checks that prevent Verify Steps from being polluted with executed output, empty Run commands, or evidence that belongs in Verification."
sections:
  Summary: |-
    Lint task Verify Steps ambiguity

    Add machine checks that prevent Verify Steps from being polluted with executed output, empty Run commands, or evidence that belongs in Verification.
  Scope: |-
    - In scope: Add machine checks that prevent Verify Steps from being polluted with executed output, empty Run commands, or evidence that belongs in Verification.
    - Out of scope: unrelated refactors not required for "Lint task Verify Steps ambiguity".
  Plan: |-
    1. Clarify the smallest safe implementation scope for: Lint task Verify Steps ambiguity.
    2. Make the scoped change using existing project conventions.
    3. Run the task Verify Steps and record the result before finishing.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/core/src/tasks/tasks-lint.test.ts packages/agentplane/src/commands/task/lint*`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-20T10:22:33.550Z — VERIFY — ok

    By: CODER

    Note: Implemented in 8dea62f1d. Evidence: focused Vitest suites passed (tasks-lint, runner blueprint, base prompts); packages/core and packages/recipes typecheck passed; packages/agentplane tsc --noEmit passed after rebuilding local package outputs; ESLint passed on touched TS files; policy routing passed; diff check passed; framework:dev:bootstrap passed; ap doctor passed with only pre-existing untracked DONE-task archive warning for 202605200640-7AXZRX; CLI smoke passed for quickstart wording, next-action --explain, evidence check, and default task lint. ap task lint --verify-steps intentionally reports legacy polluted Verify Steps as an opt-in diagnostic.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:03:41.577Z, excerpt_hash=sha256:0145c73ab6ca2d842a3dd6674e9f5af0c97a50e50443c6bf7c8c6a72774a5e7a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201000-511PS9-ambiguity-route-contract/.agentplane/tasks/202605201001-3TVWFX/blueprint/resolved-snapshot.json
    - old_digest: c14da05db4cbde8cf4f0bddf4d0b5f1abb5c3060b5e455047755b5a7af44a570
    - current_digest: c14da05db4cbde8cf4f0bddf4d0b5f1abb5c3060b5e455047755b5a7af44a570
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605201001-3TVWFX

    ### 2026-05-20T10:23:46.441Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality gate passed for implementation commit 8dea62f1d. Scope matched task objective; no unrelated source changes identified. Evidence reviewed: focused tests, typechecks, ESLint, policy routing, diff check, framework bootstrap, doctor, and CLI smoke. Residual note: ap task lint --verify-steps is opt-in because it exposes pre-existing historical Verify Steps pollution outside this task.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:22:34.223Z, excerpt_hash=sha256:0145c73ab6ca2d842a3dd6674e9f5af0c97a50e50443c6bf7c8c6a72774a5e7a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201000-511PS9-ambiguity-route-contract/.agentplane/tasks/202605201001-3TVWFX/blueprint/resolved-snapshot.json
    - old_digest: c14da05db4cbde8cf4f0bddf4d0b5f1abb5c3060b5e455047755b5a7af44a570
    - current_digest: c14da05db4cbde8cf4f0bddf4d0b5f1abb5c3060b5e455047755b5a7af44a570
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605201001-3TVWFX

    ### 2026-05-20T16:53:47.951Z — VERIFY — ok

    By: EVALUATOR

    Note: Verified: current main cc334fc66 contains batch PR #3965 and primary task 202605201000-511PS9 close evidence; included code task quality evidence remains covered by hosted PR checks and review fix.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:23:46.598Z, excerpt_hash=sha256:0145c73ab6ca2d842a3dd6674e9f5af0c97a50e50443c6bf7c8c6a72774a5e7a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605201001-3TVWFX/blueprint/resolved-snapshot.json
    - old_digest: c14da05db4cbde8cf4f0bddf4d0b5f1abb5c3060b5e455047755b5a7af44a570
    - current_digest: c14da05db4cbde8cf4f0bddf4d0b5f1abb5c3060b5e455047755b5a7af44a570
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605201001-3TVWFX

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Lint task Verify Steps ambiguity

Add machine checks that prevent Verify Steps from being polluted with executed output, empty Run commands, or evidence that belongs in Verification.

## Scope

- In scope: Add machine checks that prevent Verify Steps from being polluted with executed output, empty Run commands, or evidence that belongs in Verification.
- Out of scope: unrelated refactors not required for "Lint task Verify Steps ambiguity".

## Plan

1. Clarify the smallest safe implementation scope for: Lint task Verify Steps ambiguity.
2. Make the scoped change using existing project conventions.
3. Run the task Verify Steps and record the result before finishing.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/core/src/tasks/tasks-lint.test.ts packages/agentplane/src/commands/task/lint*`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-20T10:22:33.550Z — VERIFY — ok

By: CODER

Note: Implemented in 8dea62f1d. Evidence: focused Vitest suites passed (tasks-lint, runner blueprint, base prompts); packages/core and packages/recipes typecheck passed; packages/agentplane tsc --noEmit passed after rebuilding local package outputs; ESLint passed on touched TS files; policy routing passed; diff check passed; framework:dev:bootstrap passed; ap doctor passed with only pre-existing untracked DONE-task archive warning for 202605200640-7AXZRX; CLI smoke passed for quickstart wording, next-action --explain, evidence check, and default task lint. ap task lint --verify-steps intentionally reports legacy polluted Verify Steps as an opt-in diagnostic.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:03:41.577Z, excerpt_hash=sha256:0145c73ab6ca2d842a3dd6674e9f5af0c97a50e50443c6bf7c8c6a72774a5e7a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201000-511PS9-ambiguity-route-contract/.agentplane/tasks/202605201001-3TVWFX/blueprint/resolved-snapshot.json
- old_digest: c14da05db4cbde8cf4f0bddf4d0b5f1abb5c3060b5e455047755b5a7af44a570
- current_digest: c14da05db4cbde8cf4f0bddf4d0b5f1abb5c3060b5e455047755b5a7af44a570
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605201001-3TVWFX

### 2026-05-20T10:23:46.441Z — VERIFY — ok

By: EVALUATOR

Note: Quality gate passed for implementation commit 8dea62f1d. Scope matched task objective; no unrelated source changes identified. Evidence reviewed: focused tests, typechecks, ESLint, policy routing, diff check, framework bootstrap, doctor, and CLI smoke. Residual note: ap task lint --verify-steps is opt-in because it exposes pre-existing historical Verify Steps pollution outside this task.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:22:34.223Z, excerpt_hash=sha256:0145c73ab6ca2d842a3dd6674e9f5af0c97a50e50443c6bf7c8c6a72774a5e7a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201000-511PS9-ambiguity-route-contract/.agentplane/tasks/202605201001-3TVWFX/blueprint/resolved-snapshot.json
- old_digest: c14da05db4cbde8cf4f0bddf4d0b5f1abb5c3060b5e455047755b5a7af44a570
- current_digest: c14da05db4cbde8cf4f0bddf4d0b5f1abb5c3060b5e455047755b5a7af44a570
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605201001-3TVWFX

### 2026-05-20T16:53:47.951Z — VERIFY — ok

By: EVALUATOR

Note: Verified: current main cc334fc66 contains batch PR #3965 and primary task 202605201000-511PS9 close evidence; included code task quality evidence remains covered by hosted PR checks and review fix.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:23:46.598Z, excerpt_hash=sha256:0145c73ab6ca2d842a3dd6674e9f5af0c97a50e50443c6bf7c8c6a72774a5e7a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605201001-3TVWFX/blueprint/resolved-snapshot.json
- old_digest: c14da05db4cbde8cf4f0bddf4d0b5f1abb5c3060b5e455047755b5a7af44a570
- current_digest: c14da05db4cbde8cf4f0bddf4d0b5f1abb5c3060b5e455047755b5a7af44a570
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605201001-3TVWFX

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
