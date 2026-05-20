---
id: "202605201000-511PS9"
title: "Unify task next-action route explanation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "ambiguity"
  - "code"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bunx vitest run packages/agentplane/src/commands/task/next-action.command* packages/agentplane/src/commands/task/status.command* packages/agentplane/src/commands/shared/route-decision*"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-20T10:05:05.617Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-20T10:23:41.341Z"
  updated_by: "EVALUATOR"
  note: "Quality gate passed for implementation commit 8dea62f1d. Scope matched task objective; no unrelated source changes identified. Evidence reviewed: focused tests, typechecks, ESLint, policy routing, diff check, framework bootstrap, doctor, and CLI smoke. Residual note: ap task lint --verify-steps is opt-in because it exposes pre-existing historical Verify Steps pollution outside this task."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-20T10:23:41.341Z"
  updated_by: "EVALUATOR"
  note: "Quality gate passed for implementation commit 8dea62f1d. Scope matched task objective; no unrelated source changes identified. Evidence reviewed: focused tests, typechecks, ESLint, policy routing, diff check, framework bootstrap, doctor, and CLI smoke. Residual note: ap task lint --verify-steps is opt-in because it exposes pre-existing historical Verify Steps pollution outside this task."
  evaluated_sha: "8dea62f1d0e2728731bc1fea54252adc77e4cbe3"
  blueprint_digest: "91f69fdec3d2fcfbaacff171c8dbdf8c35e59a81f753f14fb6181bbe078b0e88"
  evidence_refs:
    - ".agentplane/tasks/202605201000-511PS9/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201000-511PS9-ambiguity-route-contract/.agentplane/tasks/202605201000-511PS9/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Primary batch task for route ambiguity minimization; owns branch, worktree, and PR for the included task set."
events:
  -
    type: "status"
    at: "2026-05-20T10:03:29.638Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Primary batch task for route ambiguity minimization; owns branch, worktree, and PR for the included task set."
  -
    type: "verify"
    at: "2026-05-20T10:22:22.933Z"
    author: "CODER"
    state: "ok"
    note: "Implemented in 8dea62f1d. Evidence: focused Vitest suites passed (tasks-lint, runner blueprint, base prompts); packages/core and packages/recipes typecheck passed; packages/agentplane tsc --noEmit passed after rebuilding local package outputs; ESLint passed on touched TS files; policy routing passed; diff check passed; framework:dev:bootstrap passed; ap doctor passed with only pre-existing untracked DONE-task archive warning for 202605200640-7AXZRX; CLI smoke passed for quickstart wording, next-action --explain, evidence check, and default task lint. ap task lint --verify-steps intentionally reports legacy polluted Verify Steps as an opt-in diagnostic."
  -
    type: "verify"
    at: "2026-05-20T10:23:41.341Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality gate passed for implementation commit 8dea62f1d. Scope matched task objective; no unrelated source changes identified. Evidence reviewed: focused tests, typechecks, ESLint, policy routing, diff check, framework bootstrap, doctor, and CLI smoke. Residual note: ap task lint --verify-steps is opt-in because it exposes pre-existing historical Verify Steps pollution outside this task."
doc_version: 3
doc_updated_at: "2026-05-20T10:23:41.422Z"
doc_updated_by: "CODER"
description: "Make the task route decision surface explain effective approval policy, checkout role, and ambiguity between next-action and recovery diagnostics."
sections:
  Summary: |-
    Unify task next-action route explanation

    Make the task route decision surface explain effective approval policy, checkout role, and ambiguity between next-action and recovery diagnostics.
  Scope: |-
    - In scope: Make the task route decision surface explain effective approval policy, checkout role, and ambiguity between next-action and recovery diagnostics.
    - Out of scope: unrelated refactors not required for "Unify task next-action route explanation".
  Plan: |-
    Batch implementation plan for related ambiguity-minimization tasks:

    Included tasks:
    - 202605200959-2KQ8XN: clarify that WORKFLOW.md is the single repo-local workflow/config source and config show is readback.
    - 202605201000-511PS9: unify next-action route explanation.
    - 202605201001-3TVWFX: lint Verify Steps ambiguity.
    - 202605201001-C1X8B6: check blueprint evidence completeness.
    - 202605201001-YCTG8P: add runner route decision snapshot.

    Plan:
    1. Use 202605201000-511PS9 as the primary branch/worktree/PR owner because the implementation surfaces are related and should land together.
    2. Update docs and quickstart wording so WORKFLOW.md is the config source, ap config show is readback, and quickstart is guidance.
    3. Extend route decision output with effective approval policy, checkout role, and ambiguity diagnostics.
    4. Add task README lint checks for polluted Verify Steps.
    5. Add a minimal blueprint evidence check command and wire it into route/verification surfaces without blocking unrelated flows by default.
    6. Add route decision snapshot fields to runner bundle and bootstrap guidance.
    7. Run focused tests, policy routing, doctor; record verification independently for every included task.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/commands/task/next-action.command* packages/agentplane/src/commands/task/status.command* packages/agentplane/src/commands/shared/route-decision*`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-20T10:22:22.933Z — VERIFY — ok

    By: CODER

    Note: Implemented in 8dea62f1d. Evidence: focused Vitest suites passed (tasks-lint, runner blueprint, base prompts); packages/core and packages/recipes typecheck passed; packages/agentplane tsc --noEmit passed after rebuilding local package outputs; ESLint passed on touched TS files; policy routing passed; diff check passed; framework:dev:bootstrap passed; ap doctor passed with only pre-existing untracked DONE-task archive warning for 202605200640-7AXZRX; CLI smoke passed for quickstart wording, next-action --explain, evidence check, and default task lint. ap task lint --verify-steps intentionally reports legacy polluted Verify Steps as an opt-in diagnostic.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:04:59.689Z, excerpt_hash=sha256:ab9d05471bf3deb5a9ceb5770373bf359c46e290dd7f4abf927636f11af14959

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201000-511PS9-ambiguity-route-contract/.agentplane/tasks/202605201000-511PS9/blueprint/resolved-snapshot.json
    - old_digest: 91f69fdec3d2fcfbaacff171c8dbdf8c35e59a81f753f14fb6181bbe078b0e88
    - current_digest: 91f69fdec3d2fcfbaacff171c8dbdf8c35e59a81f753f14fb6181bbe078b0e88
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605201000-511PS9

    ### 2026-05-20T10:23:41.341Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality gate passed for implementation commit 8dea62f1d. Scope matched task objective; no unrelated source changes identified. Evidence reviewed: focused tests, typechecks, ESLint, policy routing, diff check, framework bootstrap, doctor, and CLI smoke. Residual note: ap task lint --verify-steps is opt-in because it exposes pre-existing historical Verify Steps pollution outside this task.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:22:23.042Z, excerpt_hash=sha256:ab9d05471bf3deb5a9ceb5770373bf359c46e290dd7f4abf927636f11af14959

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201000-511PS9-ambiguity-route-contract/.agentplane/tasks/202605201000-511PS9/blueprint/resolved-snapshot.json
    - old_digest: 91f69fdec3d2fcfbaacff171c8dbdf8c35e59a81f753f14fb6181bbe078b0e88
    - current_digest: 91f69fdec3d2fcfbaacff171c8dbdf8c35e59a81f753f14fb6181bbe078b0e88
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605201000-511PS9

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Unify task next-action route explanation

Make the task route decision surface explain effective approval policy, checkout role, and ambiguity between next-action and recovery diagnostics.

## Scope

- In scope: Make the task route decision surface explain effective approval policy, checkout role, and ambiguity between next-action and recovery diagnostics.
- Out of scope: unrelated refactors not required for "Unify task next-action route explanation".

## Plan

Batch implementation plan for related ambiguity-minimization tasks:

Included tasks:
- 202605200959-2KQ8XN: clarify that WORKFLOW.md is the single repo-local workflow/config source and config show is readback.
- 202605201000-511PS9: unify next-action route explanation.
- 202605201001-3TVWFX: lint Verify Steps ambiguity.
- 202605201001-C1X8B6: check blueprint evidence completeness.
- 202605201001-YCTG8P: add runner route decision snapshot.

Plan:
1. Use 202605201000-511PS9 as the primary branch/worktree/PR owner because the implementation surfaces are related and should land together.
2. Update docs and quickstart wording so WORKFLOW.md is the config source, ap config show is readback, and quickstart is guidance.
3. Extend route decision output with effective approval policy, checkout role, and ambiguity diagnostics.
4. Add task README lint checks for polluted Verify Steps.
5. Add a minimal blueprint evidence check command and wire it into route/verification surfaces without blocking unrelated flows by default.
6. Add route decision snapshot fields to runner bundle and bootstrap guidance.
7. Run focused tests, policy routing, doctor; record verification independently for every included task.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/commands/task/next-action.command* packages/agentplane/src/commands/task/status.command* packages/agentplane/src/commands/shared/route-decision*`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-20T10:22:22.933Z — VERIFY — ok

By: CODER

Note: Implemented in 8dea62f1d. Evidence: focused Vitest suites passed (tasks-lint, runner blueprint, base prompts); packages/core and packages/recipes typecheck passed; packages/agentplane tsc --noEmit passed after rebuilding local package outputs; ESLint passed on touched TS files; policy routing passed; diff check passed; framework:dev:bootstrap passed; ap doctor passed with only pre-existing untracked DONE-task archive warning for 202605200640-7AXZRX; CLI smoke passed for quickstart wording, next-action --explain, evidence check, and default task lint. ap task lint --verify-steps intentionally reports legacy polluted Verify Steps as an opt-in diagnostic.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:04:59.689Z, excerpt_hash=sha256:ab9d05471bf3deb5a9ceb5770373bf359c46e290dd7f4abf927636f11af14959

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201000-511PS9-ambiguity-route-contract/.agentplane/tasks/202605201000-511PS9/blueprint/resolved-snapshot.json
- old_digest: 91f69fdec3d2fcfbaacff171c8dbdf8c35e59a81f753f14fb6181bbe078b0e88
- current_digest: 91f69fdec3d2fcfbaacff171c8dbdf8c35e59a81f753f14fb6181bbe078b0e88
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605201000-511PS9

### 2026-05-20T10:23:41.341Z — VERIFY — ok

By: EVALUATOR

Note: Quality gate passed for implementation commit 8dea62f1d. Scope matched task objective; no unrelated source changes identified. Evidence reviewed: focused tests, typechecks, ESLint, policy routing, diff check, framework bootstrap, doctor, and CLI smoke. Residual note: ap task lint --verify-steps is opt-in because it exposes pre-existing historical Verify Steps pollution outside this task.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:22:23.042Z, excerpt_hash=sha256:ab9d05471bf3deb5a9ceb5770373bf359c46e290dd7f4abf927636f11af14959

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201000-511PS9-ambiguity-route-contract/.agentplane/tasks/202605201000-511PS9/blueprint/resolved-snapshot.json
- old_digest: 91f69fdec3d2fcfbaacff171c8dbdf8c35e59a81f753f14fb6181bbe078b0e88
- current_digest: 91f69fdec3d2fcfbaacff171c8dbdf8c35e59a81f753f14fb6181bbe078b0e88
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605201000-511PS9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
