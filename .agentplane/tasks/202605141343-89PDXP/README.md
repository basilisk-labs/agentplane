---
id: "202605141343-89PDXP"
title: "Add structured evaluator result schema"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evaluators"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T13:44:58.958Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T14:30:29.753Z"
  updated_by: "CODER"
  note: "Verified: evaluator SGR result contract is now consumed by evaluator catalog metadata via result_contract=sgr.evaluator_result.v1 and a validated evaluator_result v1 example. Checks passed after CI knip fix: bun test focused SGR/blueprint/evaluator/context files; bun run --filter=agentplane typecheck; bun run knip:check; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the evaluator SGR result schema inside the approved R793XK batch worktree and keeping verification evidence separate for this task."
events:
  -
    type: "status"
    at: "2026-05-14T13:45:57.874Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the evaluator SGR result schema inside the approved R793XK batch worktree and keeping verification evidence separate for this task."
  -
    type: "verify"
    at: "2026-05-14T13:56:12.426Z"
    author: "CODER"
    state: "ok"
    note: "Verified: evaluator SGR result contract models verdict, findings, missing_tests, hidden_assumptions, recovery_context, and evidence references without free-form markdown dependency. Checks passed: bun test packages/agentplane/src/runtime/sgr/contracts.test.ts; bun run --filter=agentplane typecheck; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings."
  -
    type: "verify"
    at: "2026-05-14T14:30:29.753Z"
    author: "CODER"
    state: "ok"
    note: "Verified: evaluator SGR result contract is now consumed by evaluator catalog metadata via result_contract=sgr.evaluator_result.v1 and a validated evaluator_result v1 example. Checks passed after CI knip fix: bun test focused SGR/blueprint/evaluator/context files; bun run --filter=agentplane typecheck; bun run knip:check; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings."
doc_version: 3
doc_updated_at: "2026-05-14T14:30:29.769Z"
doc_updated_by: "CODER"
description: "Make evaluator outputs machine-checkable by adding a structured Schema-Guided Reasoning result contract for verdicts, findings, hidden assumptions, missing tests, recovery context, and evidence references."
sections:
  Summary: |-
    Add structured evaluator result schema

    Make evaluator outputs machine-checkable by adding a structured Schema-Guided Reasoning result contract for verdicts, findings, hidden assumptions, missing tests, recovery context, and evidence references.
  Scope: |-
    - In scope: Make evaluator outputs machine-checkable by adding a structured Schema-Guided Reasoning result contract for verdicts, findings, hidden assumptions, missing tests, recovery context, and evidence references.
    - Out of scope: unrelated refactors not required for "Add structured evaluator result schema".
  Plan: "Implement the evaluator result SGR schema as part of the R793XK batch worktree/PR. Add typed contracts and validation/tests for structured evaluator outputs: verdict, findings, missing tests, hidden assumptions, recovery context, and evidence references. Keep evaluator execution/runtime changes out of scope unless needed to export or validate the contract."
  Verify Steps: |-
    1. Inspect the evaluator SGR result contract and confirm it models verdict, ordered findings, missing_tests, hidden_assumptions, recovery_context, and evidence references without relying on free-form markdown.
    2. Run focused evaluator schema/model tests and confirm valid evaluator results pass while invalid verdicts or findings without evidence fail.
    3. Run typecheck or the narrow package check covering the added exported contract.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T13:56:12.426Z — VERIFY — ok

    By: CODER

    Note: Verified: evaluator SGR result contract models verdict, findings, missing_tests, hidden_assumptions, recovery_context, and evidence references without free-form markdown dependency. Checks passed: bun test packages/agentplane/src/runtime/sgr/contracts.test.ts; bun run --filter=agentplane typecheck; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T13:45:57.874Z, excerpt_hash=sha256:b0048edfb2b29824ab19ad9a5697f94e092cdf3fa485b270dda06ab639a18489

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141342-R793XK-sgr-reliability-schemas/.agentplane/tasks/202605141343-89PDXP/blueprint/resolved-snapshot.json
    - old_digest: 324daea34b87b4df405c580a70d5e3b9364b5e341348f17d6ba809b03576e407
    - current_digest: 324daea34b87b4df405c580a70d5e3b9364b5e341348f17d6ba809b03576e407
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141343-89PDXP

    ### 2026-05-14T14:30:29.753Z — VERIFY — ok

    By: CODER

    Note: Verified: evaluator SGR result contract is now consumed by evaluator catalog metadata via result_contract=sgr.evaluator_result.v1 and a validated evaluator_result v1 example. Checks passed after CI knip fix: bun test focused SGR/blueprint/evaluator/context files; bun run --filter=agentplane typecheck; bun run knip:check; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T13:56:12.498Z, excerpt_hash=sha256:b0048edfb2b29824ab19ad9a5697f94e092cdf3fa485b270dda06ab639a18489

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141342-R793XK-sgr-reliability-schemas/.agentplane/tasks/202605141343-89PDXP/blueprint/resolved-snapshot.json
    - old_digest: 324daea34b87b4df405c580a70d5e3b9364b5e341348f17d6ba809b03576e407
    - current_digest: 324daea34b87b4df405c580a70d5e3b9364b5e341348f17d6ba809b03576e407
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141343-89PDXP

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add structured evaluator result schema

Make evaluator outputs machine-checkable by adding a structured Schema-Guided Reasoning result contract for verdicts, findings, hidden assumptions, missing tests, recovery context, and evidence references.

## Scope

- In scope: Make evaluator outputs machine-checkable by adding a structured Schema-Guided Reasoning result contract for verdicts, findings, hidden assumptions, missing tests, recovery context, and evidence references.
- Out of scope: unrelated refactors not required for "Add structured evaluator result schema".

## Plan

Implement the evaluator result SGR schema as part of the R793XK batch worktree/PR. Add typed contracts and validation/tests for structured evaluator outputs: verdict, findings, missing tests, hidden assumptions, recovery context, and evidence references. Keep evaluator execution/runtime changes out of scope unless needed to export or validate the contract.

## Verify Steps

1. Inspect the evaluator SGR result contract and confirm it models verdict, ordered findings, missing_tests, hidden_assumptions, recovery_context, and evidence references without relying on free-form markdown.
2. Run focused evaluator schema/model tests and confirm valid evaluator results pass while invalid verdicts or findings without evidence fail.
3. Run typecheck or the narrow package check covering the added exported contract.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T13:56:12.426Z — VERIFY — ok

By: CODER

Note: Verified: evaluator SGR result contract models verdict, findings, missing_tests, hidden_assumptions, recovery_context, and evidence references without free-form markdown dependency. Checks passed: bun test packages/agentplane/src/runtime/sgr/contracts.test.ts; bun run --filter=agentplane typecheck; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T13:45:57.874Z, excerpt_hash=sha256:b0048edfb2b29824ab19ad9a5697f94e092cdf3fa485b270dda06ab639a18489

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141342-R793XK-sgr-reliability-schemas/.agentplane/tasks/202605141343-89PDXP/blueprint/resolved-snapshot.json
- old_digest: 324daea34b87b4df405c580a70d5e3b9364b5e341348f17d6ba809b03576e407
- current_digest: 324daea34b87b4df405c580a70d5e3b9364b5e341348f17d6ba809b03576e407
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141343-89PDXP

### 2026-05-14T14:30:29.753Z — VERIFY — ok

By: CODER

Note: Verified: evaluator SGR result contract is now consumed by evaluator catalog metadata via result_contract=sgr.evaluator_result.v1 and a validated evaluator_result v1 example. Checks passed after CI knip fix: bun test focused SGR/blueprint/evaluator/context files; bun run --filter=agentplane typecheck; bun run knip:check; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T13:56:12.498Z, excerpt_hash=sha256:b0048edfb2b29824ab19ad9a5697f94e092cdf3fa485b270dda06ab639a18489

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141342-R793XK-sgr-reliability-schemas/.agentplane/tasks/202605141343-89PDXP/blueprint/resolved-snapshot.json
- old_digest: 324daea34b87b4df405c580a70d5e3b9364b5e341348f17d6ba809b03576e407
- current_digest: 324daea34b87b4df405c580a70d5e3b9364b5e341348f17d6ba809b03576e407
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141343-89PDXP

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
