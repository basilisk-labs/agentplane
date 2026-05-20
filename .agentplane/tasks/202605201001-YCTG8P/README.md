---
id: "202605201001-YCTG8P"
title: "Add runner route decision snapshot"
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
  - "runner"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bunx vitest run packages/agentplane/src/runner/context/*.test.ts packages/agentplane/src/runner/usecases/task-run*.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-20T10:01:47.330Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-20T16:53:54.708Z"
  updated_by: "EVALUATOR"
  note: "Verified: current main cc334fc66 contains batch PR #3965 and primary task 202605201000-511PS9 close evidence; included code task quality evidence remains covered by hosted PR checks and review fix."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-20T16:53:54.708Z"
  updated_by: "EVALUATOR"
  note: "Verified: current main cc334fc66 contains batch PR #3965 and primary task 202605201000-511PS9 close evidence; included code task quality evidence remains covered by hosted PR checks and review fix."
  evaluated_sha: "cc334fc66ef290e994438d1c3c413ebeb7d3b8a2"
  blueprint_digest: "6a6cf96bf8edd6c44162fc8683dcdef1e0c83ae7707e5b6563204bd8c5929d13"
  evidence_refs:
    - ".agentplane/tasks/202605201001-YCTG8P/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tasks/202605201001-YCTG8P/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "63645a1cc3e1908fb5bca751360d416c122bb6ec"
  message: "Merge pull request #3965 from basilisk-labs/task/202605201000-511PS9/task-next-action-ambiguity"
comments:
  -
    author: "CODER"
    body: "Start: Batch task for runner route decision snapshot; implementation will be included in primary ambiguity-route-contract worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: Included task landed through batch PR #3965; current main cc334fc66 contains implementation, hosted checks, review fix, and primary close evidence."
events:
  -
    type: "status"
    at: "2026-05-20T10:03:57.328Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Batch task for runner route decision snapshot; implementation will be included in primary ambiguity-route-contract worktree."
  -
    type: "verify"
    at: "2026-05-20T10:22:46.351Z"
    author: "CODER"
    state: "ok"
    note: "Implemented in 8dea62f1d. Evidence: focused Vitest suites passed (tasks-lint, runner blueprint, base prompts); packages/core and packages/recipes typecheck passed; packages/agentplane tsc --noEmit passed after rebuilding local package outputs; ESLint passed on touched TS files; policy routing passed; diff check passed; framework:dev:bootstrap passed; ap doctor passed with only pre-existing untracked DONE-task archive warning for 202605200640-7AXZRX; CLI smoke passed for quickstart wording, next-action --explain, evidence check, and default task lint. ap task lint --verify-steps intentionally reports legacy polluted Verify Steps as an opt-in diagnostic."
  -
    type: "verify"
    at: "2026-05-20T10:24:25.962Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality gate passed for implementation commit 8dea62f1d. Scope matched task objective; no unrelated source changes identified. Evidence reviewed: focused tests, typechecks, ESLint, policy routing, diff check, framework bootstrap, doctor, and CLI smoke. Residual note: ap task lint --verify-steps is opt-in because it exposes pre-existing historical Verify Steps pollution outside this task."
  -
    type: "verify"
    at: "2026-05-20T16:53:54.708Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Verified: current main cc334fc66 contains batch PR #3965 and primary task 202605201000-511PS9 close evidence; included code task quality evidence remains covered by hosted PR checks and review fix."
  -
    type: "status"
    at: "2026-05-20T16:54:26.363Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Included task landed through batch PR #3965; current main cc334fc66 contains implementation, hosted checks, review fix, and primary close evidence."
doc_version: 3
doc_updated_at: "2026-05-20T16:54:26.367Z"
doc_updated_by: "INTEGRATOR"
description: "Include route decision, checkout role, approval contract, and artifact contract in runner bundles so execution agents do not reconstruct the route from fragmented surfaces."
sections:
  Summary: |-
    Add runner route decision snapshot

    Include route decision, checkout role, approval contract, and artifact contract in runner bundles so execution agents do not reconstruct the route from fragmented surfaces.
  Scope: |-
    - In scope: Include route decision, checkout role, approval contract, and artifact contract in runner bundles so execution agents do not reconstruct the route from fragmented surfaces.
    - Out of scope: unrelated refactors not required for "Add runner route decision snapshot".
  Plan: |-
    1. Clarify the smallest safe implementation scope for: Add runner route decision snapshot.
    2. Make the scoped change using existing project conventions.
    3. Run the task Verify Steps and record the result before finishing.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/runner/context/*.test.ts packages/agentplane/src/runner/usecases/task-run*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-20T10:22:46.351Z — VERIFY — ok

    By: CODER

    Note: Implemented in 8dea62f1d. Evidence: focused Vitest suites passed (tasks-lint, runner blueprint, base prompts); packages/core and packages/recipes typecheck passed; packages/agentplane tsc --noEmit passed after rebuilding local package outputs; ESLint passed on touched TS files; policy routing passed; diff check passed; framework:dev:bootstrap passed; ap doctor passed with only pre-existing untracked DONE-task archive warning for 202605200640-7AXZRX; CLI smoke passed for quickstart wording, next-action --explain, evidence check, and default task lint. ap task lint --verify-steps intentionally reports legacy polluted Verify Steps as an opt-in diagnostic.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:03:57.328Z, excerpt_hash=sha256:56696db90b09f8f6930af7b02b0f9aff6a94c26288122b81342b2d1f719c8991

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201000-511PS9-ambiguity-route-contract/.agentplane/tasks/202605201001-YCTG8P/blueprint/resolved-snapshot.json
    - old_digest: 6a6cf96bf8edd6c44162fc8683dcdef1e0c83ae7707e5b6563204bd8c5929d13
    - current_digest: 6a6cf96bf8edd6c44162fc8683dcdef1e0c83ae7707e5b6563204bd8c5929d13
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605201001-YCTG8P

    ### 2026-05-20T10:24:25.962Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality gate passed for implementation commit 8dea62f1d. Scope matched task objective; no unrelated source changes identified. Evidence reviewed: focused tests, typechecks, ESLint, policy routing, diff check, framework bootstrap, doctor, and CLI smoke. Residual note: ap task lint --verify-steps is opt-in because it exposes pre-existing historical Verify Steps pollution outside this task.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:22:46.429Z, excerpt_hash=sha256:56696db90b09f8f6930af7b02b0f9aff6a94c26288122b81342b2d1f719c8991

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201000-511PS9-ambiguity-route-contract/.agentplane/tasks/202605201001-YCTG8P/blueprint/resolved-snapshot.json
    - old_digest: 6a6cf96bf8edd6c44162fc8683dcdef1e0c83ae7707e5b6563204bd8c5929d13
    - current_digest: 6a6cf96bf8edd6c44162fc8683dcdef1e0c83ae7707e5b6563204bd8c5929d13
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605201001-YCTG8P

    ### 2026-05-20T16:53:54.708Z — VERIFY — ok

    By: EVALUATOR

    Note: Verified: current main cc334fc66 contains batch PR #3965 and primary task 202605201000-511PS9 close evidence; included code task quality evidence remains covered by hosted PR checks and review fix.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:24:26.122Z, excerpt_hash=sha256:56696db90b09f8f6930af7b02b0f9aff6a94c26288122b81342b2d1f719c8991

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605201001-YCTG8P/blueprint/resolved-snapshot.json
    - old_digest: 6a6cf96bf8edd6c44162fc8683dcdef1e0c83ae7707e5b6563204bd8c5929d13
    - current_digest: 6a6cf96bf8edd6c44162fc8683dcdef1e0c83ae7707e5b6563204bd8c5929d13
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605201001-YCTG8P

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add runner route decision snapshot

Include route decision, checkout role, approval contract, and artifact contract in runner bundles so execution agents do not reconstruct the route from fragmented surfaces.

## Scope

- In scope: Include route decision, checkout role, approval contract, and artifact contract in runner bundles so execution agents do not reconstruct the route from fragmented surfaces.
- Out of scope: unrelated refactors not required for "Add runner route decision snapshot".

## Plan

1. Clarify the smallest safe implementation scope for: Add runner route decision snapshot.
2. Make the scoped change using existing project conventions.
3. Run the task Verify Steps and record the result before finishing.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/runner/context/*.test.ts packages/agentplane/src/runner/usecases/task-run*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-20T10:22:46.351Z — VERIFY — ok

By: CODER

Note: Implemented in 8dea62f1d. Evidence: focused Vitest suites passed (tasks-lint, runner blueprint, base prompts); packages/core and packages/recipes typecheck passed; packages/agentplane tsc --noEmit passed after rebuilding local package outputs; ESLint passed on touched TS files; policy routing passed; diff check passed; framework:dev:bootstrap passed; ap doctor passed with only pre-existing untracked DONE-task archive warning for 202605200640-7AXZRX; CLI smoke passed for quickstart wording, next-action --explain, evidence check, and default task lint. ap task lint --verify-steps intentionally reports legacy polluted Verify Steps as an opt-in diagnostic.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:03:57.328Z, excerpt_hash=sha256:56696db90b09f8f6930af7b02b0f9aff6a94c26288122b81342b2d1f719c8991

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201000-511PS9-ambiguity-route-contract/.agentplane/tasks/202605201001-YCTG8P/blueprint/resolved-snapshot.json
- old_digest: 6a6cf96bf8edd6c44162fc8683dcdef1e0c83ae7707e5b6563204bd8c5929d13
- current_digest: 6a6cf96bf8edd6c44162fc8683dcdef1e0c83ae7707e5b6563204bd8c5929d13
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605201001-YCTG8P

### 2026-05-20T10:24:25.962Z — VERIFY — ok

By: EVALUATOR

Note: Quality gate passed for implementation commit 8dea62f1d. Scope matched task objective; no unrelated source changes identified. Evidence reviewed: focused tests, typechecks, ESLint, policy routing, diff check, framework bootstrap, doctor, and CLI smoke. Residual note: ap task lint --verify-steps is opt-in because it exposes pre-existing historical Verify Steps pollution outside this task.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:22:46.429Z, excerpt_hash=sha256:56696db90b09f8f6930af7b02b0f9aff6a94c26288122b81342b2d1f719c8991

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201000-511PS9-ambiguity-route-contract/.agentplane/tasks/202605201001-YCTG8P/blueprint/resolved-snapshot.json
- old_digest: 6a6cf96bf8edd6c44162fc8683dcdef1e0c83ae7707e5b6563204bd8c5929d13
- current_digest: 6a6cf96bf8edd6c44162fc8683dcdef1e0c83ae7707e5b6563204bd8c5929d13
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605201001-YCTG8P

### 2026-05-20T16:53:54.708Z — VERIFY — ok

By: EVALUATOR

Note: Verified: current main cc334fc66 contains batch PR #3965 and primary task 202605201000-511PS9 close evidence; included code task quality evidence remains covered by hosted PR checks and review fix.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:24:26.122Z, excerpt_hash=sha256:56696db90b09f8f6930af7b02b0f9aff6a94c26288122b81342b2d1f719c8991

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605201001-YCTG8P/blueprint/resolved-snapshot.json
- old_digest: 6a6cf96bf8edd6c44162fc8683dcdef1e0c83ae7707e5b6563204bd8c5929d13
- current_digest: 6a6cf96bf8edd6c44162fc8683dcdef1e0c83ae7707e5b6563204bd8c5929d13
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605201001-YCTG8P

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
