---
id: "202607260532-9M7RNH"
title: "Recover stale protected-PR conflict-base context"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "conflict-rework"
  - "corrective"
  - "milestone-alpha2"
  - "provider"
  - "refactor"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "agentplane doctor"
  - "bun run lint:core"
  - "bun run typecheck"
  - "git diff --check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-26T05:34:00.985Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-26T07:08:32.159Z"
  updated_by: "TESTER"
  note: "Independent TESTER passed the declared legacy protected-conflict recovery contract."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-26T07:37:55.887Z"
  updated_by: "EVALUATOR"
  note: "Independent delta review found no P0/P1: the generated CLI reference exactly documents the explicit legacy protected-conflict adoption command and token while leaving runtime authority and behavior unchanged."
  evaluated_sha: "e84f13ddb070ad29dd4b0875b375df820f623e84"
  blueprint_digest: "62e7dccfeb5473213079b48611247d696a3f1c7d51171cce1ea5355ee01b1a4f"
  evidence_refs:
    - ".agentplane/tasks/202607260532-9M7RNH/README.md"
    - ".agentplane/tasks/202607260532-9M7RNH/quality/20260726-073755887-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607260532-9M7RNH/quality/20260726-073755887-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607260532-9M7RNH/quality/20260726-073755887-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607260532-9M7RNH/blueprint/resolved-snapshot.json"
    - "docs/user/cli-reference.generated.mdx"
    - "bun run docs:cli:check"
    - "bun run ci:contract"
    - "bun run test:critical"
    - "bunx vitest --config vitest.workspace.ts run --project cli-core run-cli.core.pr-conflict-rework.test.ts"
  findings:
    - "The generated reference contains the canonical command id, task-id argument, and exact adoption-token option; docs freshness and full contract checks pass."
    - "The v0.7 compatibility candidate remains exact-locked to the additive 247-command surface, and the immutable v0.6.24 anchor is unchanged."
commit:
  hash: "64f14f70470f48a2997abe566ff560a1044f35a3"
  message: "🧐 9M7RNH task: refresh quality review"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-26T05:34:28.944Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-26T07:08:32.159Z"
    author: "TESTER"
    state: "ok"
    note: "Independent TESTER passed the declared legacy protected-conflict recovery contract."
  -
    type: "status"
    at: "2026-07-26T07:09:58.897Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-26T07:30:48.590Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-26T07:30:48.591Z"
doc_updated_by: "CODER"
description: "Close the liveness gap for legacy protected PR conflicts whose provider-reported conflict base is an ancestor of current main. Prepare a bounded read-only reconciliation packet carrying provider conflict-base, current base, ancestry, local conflict probe, and freshness; preserve fail-closed behavior and prohibit CLI rebase, merge, push, queue, or cleanup mutations."
sections:
  Summary: |-
    Recover stale protected-PR conflict-base context

    Close the liveness gap for legacy protected PR conflicts whose provider-reported conflict base is an ancestor of current main. Prepare a bounded read-only reconciliation packet carrying provider conflict-base, current base, ancestry, local conflict probe, and freshness; preserve fail-closed behavior and prohibit CLI rebase, merge, push, queue, or cleanup mutations.
  Scope: |-
    - In scope: Close the liveness gap for legacy protected PR conflicts whose provider-reported conflict base is an ancestor of current main. Prepare a bounded read-only reconciliation packet carrying provider conflict-base, current base, ancestry, local conflict probe, and freshness; preserve fail-closed behavior and prohibit CLI rebase, merge, push, queue, or cleanup mutations.
    - Out of scope: unrelated refactors not required for "Recover stale protected-PR conflict-base context".
  Plan: |-
    1. Capture live provider conflict identity, the provider conflict-base snapshot, current main head, branch/head/worktree evidence, and the exact ancestry relation.
    2. Define a bounded read-only reconciliation packet that distinguishes provider conflict-base from current base and includes a freshness token plus a local conflict probe.
    3. Route only eligible ancestor-drift cases to CODER semantic rework; retain fail-closed stops for unknown, non-ancestor, divergent, unavailable, dirty, or identity-mismatched state.
    4. Preserve the invariant that CLI preparation performs no rebase, merge, push, queue, cleanup, or task-state mutation.
    5. Add regression coverage for the THDN legacy topology: missing provider_base_sha, released handoff, DQM advancing main, and GitHub retaining an older conflict-base snapshot.
    6. Run focused route/packet tests, typecheck, lint, guards, lifecycle invariants, routing check, doctor, and diff check; record independent evaluation and stable hosted CI before normal queue integration.
  Verify Steps: |-
    1. Model a provider-reported OPEN protected-PR conflict whose provider base snapshot is an ancestor of current main. Expected: route returns a bounded read-only reconciliation packet containing provider conflict-base, current base, ancestry relation, local merge-base and candidate paths, and a freshness token.
    2. Model the THDN legacy topology: old handoff without provider_base_sha, queue entry released to rework, DQM merged so main advanced, and GitHub still reporting the older conflict-base. Expected: the route becomes eligible only after all live identities and the local probe are coherent; preparation does not mutate branch, worktree, queue, PR, provider, or task state.
    3. Prove fail-closed behavior for provider unavailable or mergeability unknown, missing/mismatched PR head or branch, current base not descending from provider conflict-base, unavailable merge-base/diff probe, dirty or missing worktree, and changed freshness inputs.
    4. Prove clean and current-base conflict routes preserve existing DQM behavior without weakening their identity guards.
    5. Run focused conflict-rework and route tests, bun run typecheck, bun run lint:core, bun run guards:check, bun run lifecycle:invariants, node .agentplane/policy/check-routing.mjs, agentplane doctor, and git diff --check.
    6. Record independent TESTER and EVALUATOR evidence; wait for stable hosted CI before normal branch_pr integration.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-26T07:08:32.159Z — VERIFY — ok

    By: TESTER

    Note: Independent TESTER passed the declared legacy protected-conflict recovery contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T05:34:28.944Z, excerpt_hash=sha256:296eb060c734854adbc8cb278bd598618ac578b91157115e668b46ee6aca3c75

    Details:

    Command: bun run typecheck; bun run lint:core; bun run guards:check; bun run lifecycle:invariants; node .agentplane/policy/check-routing.mjs; focused Vitest agentplane and cli-core suites; git diff --check. Result: pass. Evidence: 157 agentplane tests plus 1 cli-core E2E passed; typecheck, lint, guards, lifecycle invariants, routing, and diff checks passed. Scope: legacy protected-PR adoption, receipt invalidation, conflict-rework routing, and CLI projection.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607260532-9M7RNH-recover-stale-protected-pr-conflict-base-context/.agentplane/tasks/202607260532-9M7RNH/blueprint/resolved-snapshot.json
    - old_digest: 62e7dccfeb5473213079b48611247d696a3f1c7d51171cce1ea5355ee01b1a4f
    - current_digest: 62e7dccfeb5473213079b48611247d696a3f1c7d51171cce1ea5355ee01b1a4f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607260532-9M7RNH

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607260532-9M7RNH
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  implementation_commit:
    hash: "0ee793bb7dd331ac5c4bd1ef27e3f7f3d607de49"
    message: "🧩 9M7RNH conflict-rework: register adoption surface"
  workflow_route_baseline:
    start_head_sha: "0434d56b52cf40b9f2d8c1f4d35319d23261ffbb"
    version: 1
id_source: "generated"
---
## Summary

Recover stale protected-PR conflict-base context

Close the liveness gap for legacy protected PR conflicts whose provider-reported conflict base is an ancestor of current main. Prepare a bounded read-only reconciliation packet carrying provider conflict-base, current base, ancestry, local conflict probe, and freshness; preserve fail-closed behavior and prohibit CLI rebase, merge, push, queue, or cleanup mutations.

## Scope

- In scope: Close the liveness gap for legacy protected PR conflicts whose provider-reported conflict base is an ancestor of current main. Prepare a bounded read-only reconciliation packet carrying provider conflict-base, current base, ancestry, local conflict probe, and freshness; preserve fail-closed behavior and prohibit CLI rebase, merge, push, queue, or cleanup mutations.
- Out of scope: unrelated refactors not required for "Recover stale protected-PR conflict-base context".

## Plan

1. Capture live provider conflict identity, the provider conflict-base snapshot, current main head, branch/head/worktree evidence, and the exact ancestry relation.
2. Define a bounded read-only reconciliation packet that distinguishes provider conflict-base from current base and includes a freshness token plus a local conflict probe.
3. Route only eligible ancestor-drift cases to CODER semantic rework; retain fail-closed stops for unknown, non-ancestor, divergent, unavailable, dirty, or identity-mismatched state.
4. Preserve the invariant that CLI preparation performs no rebase, merge, push, queue, cleanup, or task-state mutation.
5. Add regression coverage for the THDN legacy topology: missing provider_base_sha, released handoff, DQM advancing main, and GitHub retaining an older conflict-base snapshot.
6. Run focused route/packet tests, typecheck, lint, guards, lifecycle invariants, routing check, doctor, and diff check; record independent evaluation and stable hosted CI before normal queue integration.

## Verify Steps

1. Model a provider-reported OPEN protected-PR conflict whose provider base snapshot is an ancestor of current main. Expected: route returns a bounded read-only reconciliation packet containing provider conflict-base, current base, ancestry relation, local merge-base and candidate paths, and a freshness token.
2. Model the THDN legacy topology: old handoff without provider_base_sha, queue entry released to rework, DQM merged so main advanced, and GitHub still reporting the older conflict-base. Expected: the route becomes eligible only after all live identities and the local probe are coherent; preparation does not mutate branch, worktree, queue, PR, provider, or task state.
3. Prove fail-closed behavior for provider unavailable or mergeability unknown, missing/mismatched PR head or branch, current base not descending from provider conflict-base, unavailable merge-base/diff probe, dirty or missing worktree, and changed freshness inputs.
4. Prove clean and current-base conflict routes preserve existing DQM behavior without weakening their identity guards.
5. Run focused conflict-rework and route tests, bun run typecheck, bun run lint:core, bun run guards:check, bun run lifecycle:invariants, node .agentplane/policy/check-routing.mjs, agentplane doctor, and git diff --check.
6. Record independent TESTER and EVALUATOR evidence; wait for stable hosted CI before normal branch_pr integration.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-26T07:08:32.159Z — VERIFY — ok

By: TESTER

Note: Independent TESTER passed the declared legacy protected-conflict recovery contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T05:34:28.944Z, excerpt_hash=sha256:296eb060c734854adbc8cb278bd598618ac578b91157115e668b46ee6aca3c75

Details:

Command: bun run typecheck; bun run lint:core; bun run guards:check; bun run lifecycle:invariants; node .agentplane/policy/check-routing.mjs; focused Vitest agentplane and cli-core suites; git diff --check. Result: pass. Evidence: 157 agentplane tests plus 1 cli-core E2E passed; typecheck, lint, guards, lifecycle invariants, routing, and diff checks passed. Scope: legacy protected-PR adoption, receipt invalidation, conflict-rework routing, and CLI projection.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607260532-9M7RNH-recover-stale-protected-pr-conflict-base-context/.agentplane/tasks/202607260532-9M7RNH/blueprint/resolved-snapshot.json
- old_digest: 62e7dccfeb5473213079b48611247d696a3f1c7d51171cce1ea5355ee01b1a4f
- current_digest: 62e7dccfeb5473213079b48611247d696a3f1c7d51171cce1ea5355ee01b1a4f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607260532-9M7RNH

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607260532-9M7RNH
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
