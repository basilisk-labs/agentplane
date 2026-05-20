---
id: "202605200959-2KQ8XN"
title: "Clarify workflow state source terminology"
result_summary: "Merged via batch PR #3965 as included task."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "ambiguity"
  - "docs"
  - "workflow"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify:
  - "ap doctor"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-20T09:59:58.342Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-20T16:53:44.928Z"
  updated_by: "EVALUATOR"
  note: "Verified: current main cc334fc66 contains batch PR #3965 and primary task 202605201000-511PS9 close evidence; included docs task route unchanged after snapshot refresh."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-20T16:53:44.928Z"
  updated_by: "EVALUATOR"
  note: "Verified: current main cc334fc66 contains batch PR #3965 and primary task 202605201000-511PS9 close evidence; included docs task route unchanged after snapshot refresh."
  evaluated_sha: "cc334fc66ef290e994438d1c3c413ebeb7d3b8a2"
  blueprint_digest: "c48427c2f5cd0d30d026f70413cd1bc6444d06701e23b59d2dd69ed683c7a46e"
  evidence_refs:
    - ".agentplane/tasks/202605200959-2KQ8XN/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tasks/202605200959-2KQ8XN/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "63645a1cc3e1908fb5bca751360d416c122bb6ec"
  message: "Merge pull request #3965 from basilisk-labs/task/202605201000-511PS9/task-next-action-ambiguity"
comments:
  -
    author: "CODER"
    body: "Start: Batch task for workflow source terminology clarification; implementation will be included in primary ambiguity-route-contract worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: Included task landed through batch PR #3965; current main cc334fc66 contains implementation, hosted checks, review fix, and primary close evidence."
events:
  -
    type: "status"
    at: "2026-05-20T10:03:23.583Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Batch task for workflow source terminology clarification; implementation will be included in primary ambiguity-route-contract worktree."
  -
    type: "verify"
    at: "2026-05-20T10:22:16.990Z"
    author: "CODER"
    state: "ok"
    note: "Implemented in 8dea62f1d. Evidence: focused Vitest suites passed (tasks-lint, runner blueprint, base prompts); packages/core and packages/recipes typecheck passed; packages/agentplane tsc --noEmit passed after rebuilding local package outputs; ESLint passed on touched TS files; policy routing passed; diff check passed; framework:dev:bootstrap passed; ap doctor passed with only pre-existing untracked DONE-task archive warning for 202605200640-7AXZRX; CLI smoke passed for quickstart wording, next-action --explain, evidence check, and default task lint. ap task lint --verify-steps intentionally reports legacy polluted Verify Steps as an opt-in diagnostic."
  -
    type: "verify"
    at: "2026-05-20T10:23:37.110Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality gate passed for implementation commit 8dea62f1d. Scope matched task objective; no unrelated source changes identified. Evidence reviewed: focused tests, typechecks, ESLint, policy routing, diff check, framework bootstrap, doctor, and CLI smoke. Residual note: ap task lint --verify-steps is opt-in because it exposes pre-existing historical Verify Steps pollution outside this task."
  -
    type: "verify"
    at: "2026-05-20T16:53:44.928Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Verified: current main cc334fc66 contains batch PR #3965 and primary task 202605201000-511PS9 close evidence; included docs task route unchanged after snapshot refresh."
  -
    type: "status"
    at: "2026-05-20T16:54:17.362Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Included task landed through batch PR #3965; current main cc334fc66 contains implementation, hosted checks, review fix, and primary close evidence."
doc_version: 3
doc_updated_at: "2026-05-20T16:54:17.364Z"
doc_updated_by: "INTEGRATOR"
description: "Clarify that .agentplane/WORKFLOW.md is the single repo-local workflow/config source, while ap config show is a readback and quickstart is guidance, reducing source-of-truth ambiguity for agents."
sections:
  Summary: |-
    Clarify workflow state source terminology

    Clarify that runtime config/readback is canonical workflow state and WORKFLOW.md is a managed agent-readable projection, reducing source-of-truth ambiguity for agents.
  Scope: |-
    - In scope: Clarify that runtime config/readback is canonical workflow state and WORKFLOW.md is a managed agent-readable projection, reducing source-of-truth ambiguity for agents.
    - Out of scope: unrelated refactors not required for "Clarify workflow state source terminology".
  Plan: |-
    1. Clarify the smallest safe implementation scope for: Clarify workflow state source terminology.
    2. Make the scoped change using existing project conventions.
    3. Run the task Verify Steps and record the result before finishing.
  Verify Steps: |-
    PLANNER fallback scaffold for "Clarify workflow state source terminology". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Clarify workflow state source terminology". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-20T10:22:16.990Z — VERIFY — ok

    By: CODER

    Note: Implemented in 8dea62f1d. Evidence: focused Vitest suites passed (tasks-lint, runner blueprint, base prompts); packages/core and packages/recipes typecheck passed; packages/agentplane tsc --noEmit passed after rebuilding local package outputs; ESLint passed on touched TS files; policy routing passed; diff check passed; framework:dev:bootstrap passed; ap doctor passed with only pre-existing untracked DONE-task archive warning for 202605200640-7AXZRX; CLI smoke passed for quickstart wording, next-action --explain, evidence check, and default task lint. ap task lint --verify-steps intentionally reports legacy polluted Verify Steps as an opt-in diagnostic.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:03:23.583Z, excerpt_hash=sha256:93d6fa448828a802f1e6db6b19c3fa0283e0a06517ef329b19c44a9f45cab884

    Details:

    BlueprintSnapshotRef:
    - state: stale
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201000-511PS9-ambiguity-route-contract/.agentplane/tasks/202605200959-2KQ8XN/blueprint/resolved-snapshot.json
    - old_digest: 577baace79b6a4509190916e3f61223922a4beefde0a8f192bb23452777dd49b
    - current_digest: c48427c2f5cd0d30d026f70413cd1bc6444d06701e23b59d2dd69ed683c7a46e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605200959-2KQ8XN

    ### 2026-05-20T10:23:37.110Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality gate passed for implementation commit 8dea62f1d. Scope matched task objective; no unrelated source changes identified. Evidence reviewed: focused tests, typechecks, ESLint, policy routing, diff check, framework bootstrap, doctor, and CLI smoke. Residual note: ap task lint --verify-steps is opt-in because it exposes pre-existing historical Verify Steps pollution outside this task.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:22:17.190Z, excerpt_hash=sha256:93d6fa448828a802f1e6db6b19c3fa0283e0a06517ef329b19c44a9f45cab884

    Details:

    BlueprintSnapshotRef:
    - state: stale
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201000-511PS9-ambiguity-route-contract/.agentplane/tasks/202605200959-2KQ8XN/blueprint/resolved-snapshot.json
    - old_digest: 577baace79b6a4509190916e3f61223922a4beefde0a8f192bb23452777dd49b
    - current_digest: c48427c2f5cd0d30d026f70413cd1bc6444d06701e23b59d2dd69ed683c7a46e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605200959-2KQ8XN

    ### 2026-05-20T16:53:44.928Z — VERIFY — ok

    By: EVALUATOR

    Note: Verified: current main cc334fc66 contains batch PR #3965 and primary task 202605201000-511PS9 close evidence; included docs task route unchanged after snapshot refresh.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:23:37.194Z, excerpt_hash=sha256:93d6fa448828a802f1e6db6b19c3fa0283e0a06517ef329b19c44a9f45cab884

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605200959-2KQ8XN/blueprint/resolved-snapshot.json
    - old_digest: c48427c2f5cd0d30d026f70413cd1bc6444d06701e23b59d2dd69ed683c7a46e
    - current_digest: c48427c2f5cd0d30d026f70413cd1bc6444d06701e23b59d2dd69ed683c7a46e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605200959-2KQ8XN

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Clarify workflow state source terminology

Clarify that runtime config/readback is canonical workflow state and WORKFLOW.md is a managed agent-readable projection, reducing source-of-truth ambiguity for agents.

## Scope

- In scope: Clarify that runtime config/readback is canonical workflow state and WORKFLOW.md is a managed agent-readable projection, reducing source-of-truth ambiguity for agents.
- Out of scope: unrelated refactors not required for "Clarify workflow state source terminology".

## Plan

1. Clarify the smallest safe implementation scope for: Clarify workflow state source terminology.
2. Make the scoped change using existing project conventions.
3. Run the task Verify Steps and record the result before finishing.

## Verify Steps

PLANNER fallback scaffold for "Clarify workflow state source terminology". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Clarify workflow state source terminology". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-20T10:22:16.990Z — VERIFY — ok

By: CODER

Note: Implemented in 8dea62f1d. Evidence: focused Vitest suites passed (tasks-lint, runner blueprint, base prompts); packages/core and packages/recipes typecheck passed; packages/agentplane tsc --noEmit passed after rebuilding local package outputs; ESLint passed on touched TS files; policy routing passed; diff check passed; framework:dev:bootstrap passed; ap doctor passed with only pre-existing untracked DONE-task archive warning for 202605200640-7AXZRX; CLI smoke passed for quickstart wording, next-action --explain, evidence check, and default task lint. ap task lint --verify-steps intentionally reports legacy polluted Verify Steps as an opt-in diagnostic.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:03:23.583Z, excerpt_hash=sha256:93d6fa448828a802f1e6db6b19c3fa0283e0a06517ef329b19c44a9f45cab884

Details:

BlueprintSnapshotRef:
- state: stale
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201000-511PS9-ambiguity-route-contract/.agentplane/tasks/202605200959-2KQ8XN/blueprint/resolved-snapshot.json
- old_digest: 577baace79b6a4509190916e3f61223922a4beefde0a8f192bb23452777dd49b
- current_digest: c48427c2f5cd0d30d026f70413cd1bc6444d06701e23b59d2dd69ed683c7a46e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605200959-2KQ8XN

### 2026-05-20T10:23:37.110Z — VERIFY — ok

By: EVALUATOR

Note: Quality gate passed for implementation commit 8dea62f1d. Scope matched task objective; no unrelated source changes identified. Evidence reviewed: focused tests, typechecks, ESLint, policy routing, diff check, framework bootstrap, doctor, and CLI smoke. Residual note: ap task lint --verify-steps is opt-in because it exposes pre-existing historical Verify Steps pollution outside this task.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:22:17.190Z, excerpt_hash=sha256:93d6fa448828a802f1e6db6b19c3fa0283e0a06517ef329b19c44a9f45cab884

Details:

BlueprintSnapshotRef:
- state: stale
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201000-511PS9-ambiguity-route-contract/.agentplane/tasks/202605200959-2KQ8XN/blueprint/resolved-snapshot.json
- old_digest: 577baace79b6a4509190916e3f61223922a4beefde0a8f192bb23452777dd49b
- current_digest: c48427c2f5cd0d30d026f70413cd1bc6444d06701e23b59d2dd69ed683c7a46e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605200959-2KQ8XN

### 2026-05-20T16:53:44.928Z — VERIFY — ok

By: EVALUATOR

Note: Verified: current main cc334fc66 contains batch PR #3965 and primary task 202605201000-511PS9 close evidence; included docs task route unchanged after snapshot refresh.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T10:23:37.194Z, excerpt_hash=sha256:93d6fa448828a802f1e6db6b19c3fa0283e0a06517ef329b19c44a9f45cab884

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605200959-2KQ8XN/blueprint/resolved-snapshot.json
- old_digest: c48427c2f5cd0d30d026f70413cd1bc6444d06701e23b59d2dd69ed683c7a46e
- current_digest: c48427c2f5cd0d30d026f70413cd1bc6444d06701e23b59d2dd69ed683c7a46e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605200959-2KQ8XN

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
