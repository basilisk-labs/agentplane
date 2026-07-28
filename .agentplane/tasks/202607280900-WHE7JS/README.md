---
id: "202607280900-WHE7JS"
title: "Break authority-close lifecycle feedback loop"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 15
origin:
  system: "manual"
depends_on: []
tags:
  - "blocker"
  - "code"
  - "lifecycle"
  - "v0.7"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:critical"
  - "bun run typecheck"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T09:01:44.246Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-28T09:22:59.261Z"
  updated_by: "TESTER"
  note: "Focused authority/lifecycle tests, task-state, typecheck, critical suite, policy routing, and full local fast CI passed; the live authority grant auto-committed its packet and advanced directly to pr.open."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "human_supplied"
  updated_at: "2026-07-28T09:23:17.513Z"
  updated_by: "HUMAN"
  note: "Reviewed the authority-grant lifecycle boundary: branch_pr grants now commit only task packet artifacts through the existing PR artifact helper, preserving all authority validation before mutation."
  evaluated_sha: "03a98aa601a69dd8c89e5dc424ca2e0ed214d025"
  blueprint_digest: "cf78dccf3ca7848d369ebafa8399f797778df6099809e148df6eba5dea7c2410"
  evidence_refs:
    - ".agentplane/tasks/202607280900-WHE7JS/quality/20260728-092317249-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607280900-WHE7JS/quality/20260728-092317249-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607280900-WHE7JS/quality/20260728-092317249-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607280900-WHE7JS/quality/20260728-092317249-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607280900-WHE7JS/README.md"
    - ".agentplane/tasks/202607280900-WHE7JS/quality/20260728-092317249-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607280900-WHE7JS/quality/20260728-092317249-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607280900-WHE7JS/quality/20260728-092317249-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
    - "bun run ci:local:fast"
  findings:
    - "No scope-digest, expiry, stale-input, or protected-operation policy was relaxed. The focused route regression proves a granted pr.open advances to an executable operation with a clean worktree; full fast CI passed."
commit:
  hash: "6d40a20d583714656c5edbffbf4bd78c483902c7"
  message: "🧩 WHE7JS task: refresh task artifacts after commit"
comments:
  -
    author: "CODER"
    body: "Start: isolate authority and close-tail freshness from implementation verification without weakening protected merge gates."
  -
    author: "CODER"
    body: "Implementation: committed branch_pr authority records automatically; added the route regression that proves the authorized PR operation remains executable."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-28T09:02:22.510Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: isolate authority and close-tail freshness from implementation verification without weakening protected merge gates."
  -
    type: "status"
    at: "2026-07-28T09:22:45.351Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: committed branch_pr authority records automatically; added the route regression that proves the authorized PR operation remains executable."
  -
    type: "verify"
    at: "2026-07-28T09:22:59.261Z"
    author: "TESTER"
    state: "ok"
    note: "Focused authority/lifecycle tests, task-state, typecheck, critical suite, policy routing, and full local fast CI passed; the live authority grant auto-committed its packet and advanced directly to pr.open."
  -
    type: "status"
    at: "2026-07-28T09:23:47.147Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-28T09:23:47.147Z"
doc_updated_by: "CODER"
description: "v0.7 blocker discovered while integrating RF-18 (#4654): a persisted authority record for pr.head.publish or integration.enqueue dirties the task worktree after pre-merge closure, which forces re-verification and a new closure, which in turn requires another publish authority. Make authority and closure evidence remain auditable without creating an infinite verification/publication loop. Preserve protected merge and hosted-check gates. Add a deterministic regression route covering authority grant -> close -> publish -> queue integration."
sections:
  Summary: |-
    Break authority-close lifecycle feedback loop

    v0.7 blocker discovered while integrating RF-18 (#4654): a persisted authority record for pr.head.publish or integration.enqueue dirties the task worktree after pre-merge closure, which forces re-verification and a new closure, which in turn requires another publish authority. Make authority and closure evidence remain auditable without creating an infinite verification/publication loop. Preserve protected merge and hosted-check gates. Add a deterministic regression route covering authority grant -> close -> publish -> queue integration.
  Scope: |-
    - In scope: v0.7 blocker discovered while integrating RF-18 (#4654): a persisted authority record for pr.head.publish or integration.enqueue dirties the task worktree after pre-merge closure, which forces re-verification and a new closure, which in turn requires another publish authority. Make authority and closure evidence remain auditable without creating an infinite verification/publication loop. Preserve protected merge and hosted-check gates. Add a deterministic regression route covering authority grant -> close -> publish -> queue integration.
    - Out of scope: unrelated refactors not required for "Break authority-close lifecycle feedback loop".
  Plan: |-
    1. Trace the route predicates that classify task README and PR-artifact changes as verification/pre-merge invalidators.
    2. Introduce an explicit freshness boundary: implementation, verification, quality, and close-tail evidence remain content-addressed; authority grants and provider-sync metadata preserve auditability but do not invalidate unchanged implementation evidence.
    3. Preserve all high-risk gates: a protected provider operation still requires a matching current authority record; code/verification/quality changes still require fresh verification and pre-merge closure; final PR head and hosted checks must remain live and stable.
    4. Add deterministic regression coverage for authority grant -> pre-merge closure -> final head publication -> integration queue, proving the route reaches an executable integration step without another verification cycle when implementation is unchanged.
    5. Run focused route tests, task-state check, typecheck, critical tests, policy routing, and the relevant local CI selector; record residual compatibility risk in task Findings.
  Verify Steps: |-
    1. Add a deterministic route-level regression: authority grant, verification, evaluator pass, pre-merge closure, final-head publication, hosted-green refresh, integration queue. Expected: unchanged implementation and quality evidence reaches an executable integration action without another verification/close/publish loop.
    2. Exercise the negative boundary. Expected: a changed implementation commit, invalid or stale authority, or changed hosted state still invalidates the appropriate evidence and blocks integration.
    3. Inspect persisted task and authority artifacts. Expected: every protected operation retains a matching scoped authority record; no authority record widens an operation.
    4. Run focused lifecycle-route tests, bun run task-state:check, bun run typecheck, bun run test:critical, and node .agentplane/policy/check-routing.mjs. Expected: all pass.
    5. Publish a PR and require stable hosted checks before integrating. Expected: the PR head, review state, and merge queue agree; no manual provider merge is used.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-28T09:22:59.261Z — VERIFY — ok

    By: TESTER

    Note: Focused authority/lifecycle tests, task-state, typecheck, critical suite, policy routing, and full local fast CI passed; the live authority grant auto-committed its packet and advanced directly to pr.open.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T09:22:45.351Z, excerpt_hash=sha256:52fcdb54a6ac5d2e275518998c6d5e8482aa9d20bac2e445e9a05838c2d4d074

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607280900-WHE7JS-break-authority-close-lifecycle-feedback-loop/.agentplane/tasks/202607280900-WHE7JS/blueprint/resolved-snapshot.json
    - old_digest: cf78dccf3ca7848d369ebafa8399f797778df6099809e148df6eba5dea7c2410
    - current_digest: cf78dccf3ca7848d369ebafa8399f797778df6099809e148df6eba5dea7c2410
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607280900-WHE7JS

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607280900-WHE7JS
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: authority grant emitted committed and next-action became cli_operation pr.open
      Impact: breaks the task-worktree dirty feedback loop without weakening authority scope or expiry
      Resolution: verified against commit 03a98aa601a69dd8c89e5dc424ca2e0ed214d025
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-28T09:22:01.374Z"
        authorityDigest: "sha256:af103b4aba5b99e7777b4476bee1e3d007d4670e4221791080f9017a351656bb"
        digest: "sha256:0c5c5058efd15e95304d32c5866983b1161881f37a6bdede065502f552346ddc"
        operationDigest: "sha256:5d7d27338ec14622ef194572b85ea7254b8c069eb1f84879e3e4cc270d855492"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:af8f1a911e6dcc9a09a068f68ba9e71bf90280645b0aa8cbd0bae70078e59d12"
      -
        actor: "USER"
        at: "2026-07-28T09:23:30.889Z"
        authorityDigest: "sha256:da0fae580c156b0a5473fc67c35c299b3b7690df925f044b649611a90b3442c4"
        digest: "sha256:36ab904c0b4ca37df662222265b709d039be64188fd547db271fbcc2ec6de2c3"
        operationDigest: "sha256:64fd58d047fb90bdfbd444c255ae309e86e6ad57d37765e1678bc81744c92356"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:0c5c5058efd15e95304d32c5866983b1161881f37a6bdede065502f552346ddc"
        schemaVersion: 1
        sequence: 2
        stateFingerprintDigest: "sha256:7afab48f7c7b2d93739a50b4f8140cb60b0c262dbbe6aa4c831670dd61221ab4"
      -
        actor: "USER"
        at: "2026-07-28T09:27:30.816Z"
        authorityDigest: "sha256:b2e3d978ec12031d9370f17d38159033b6a5054c421ae31feacf059e065cfc0c"
        digest: "sha256:6bbce1f1d8cf6a78360db03befd0283479e515f604bebdad15eb48af633e8722"
        operationDigest: "sha256:4f670682200a8d4c04293b8185dac01880f639301fc0ae43b1975183fb61a2da"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:36ab904c0b4ca37df662222265b709d039be64188fd547db271fbcc2ec6de2c3"
        schemaVersion: 1
        sequence: 3
        stateFingerprintDigest: "sha256:334387b4666341f6de5bec88befbaac77702c581801af8202b3d2e1818d48017"
    grants:
      -
        actor: "USER"
        digest: "sha256:af103b4aba5b99e7777b4476bee1e3d007d4670e4221791080f9017a351656bb"
        expiresAt: "2026-07-28T09:37:01.374Z"
        id: "authority-83fccb78-1288-40cc-8eb9-5d3dff7173c2"
        issuedAt: "2026-07-28T09:22:01.374Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:5d7d27338ec14622ef194572b85ea7254b8c069eb1f84879e3e4cc270d855492"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:af8f1a911e6dcc9a09a068f68ba9e71bf90280645b0aa8cbd0bae70078e59d12"
        stateScopeDigest: "sha256:6d1086ee329f82a88d40342f8e577d3f6d8015efd1e821cb8c20c2d25a29b684"
      -
        actor: "USER"
        digest: "sha256:da0fae580c156b0a5473fc67c35c299b3b7690df925f044b649611a90b3442c4"
        expiresAt: "2026-07-28T09:38:30.889Z"
        id: "authority-9aa8c749-069b-4d42-b453-606c4f109a78"
        issuedAt: "2026-07-28T09:23:30.889Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:64fd58d047fb90bdfbd444c255ae309e86e6ad57d37765e1678bc81744c92356"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:7afab48f7c7b2d93739a50b4f8140cb60b0c262dbbe6aa4c831670dd61221ab4"
        stateScopeDigest: "sha256:9064b3f6cfd0821b09405717ece3ace8dee280f243c3be2224d1a6679a83630c"
      -
        actor: "USER"
        digest: "sha256:b2e3d978ec12031d9370f17d38159033b6a5054c421ae31feacf059e065cfc0c"
        expiresAt: "2026-07-28T09:42:30.816Z"
        id: "authority-9541c70f-b7a3-4eb9-8f7e-d0490af59e7a"
        issuedAt: "2026-07-28T09:27:30.816Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:4f670682200a8d4c04293b8185dac01880f639301fc0ae43b1975183fb61a2da"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:334387b4666341f6de5bec88befbaac77702c581801af8202b3d2e1818d48017"
        stateScopeDigest: "sha256:2c73969f937695823fcdf58a641475df7ccbdaa36fd7dc6bb10ec8747c2ddadb"
    schemaVersion: 1
  implementation_commit:
    hash: "03a98aa601a69dd8c89e5dc424ca2e0ed214d025"
    message: "fix: commit branch-pr authority records"
  workflow_route_baseline:
    start_head_sha: "89a82f010479eb2583e414fb49c930d4819b5777"
    version: 1
id_source: "generated"
---
## Summary

Break authority-close lifecycle feedback loop

v0.7 blocker discovered while integrating RF-18 (#4654): a persisted authority record for pr.head.publish or integration.enqueue dirties the task worktree after pre-merge closure, which forces re-verification and a new closure, which in turn requires another publish authority. Make authority and closure evidence remain auditable without creating an infinite verification/publication loop. Preserve protected merge and hosted-check gates. Add a deterministic regression route covering authority grant -> close -> publish -> queue integration.

## Scope

- In scope: v0.7 blocker discovered while integrating RF-18 (#4654): a persisted authority record for pr.head.publish or integration.enqueue dirties the task worktree after pre-merge closure, which forces re-verification and a new closure, which in turn requires another publish authority. Make authority and closure evidence remain auditable without creating an infinite verification/publication loop. Preserve protected merge and hosted-check gates. Add a deterministic regression route covering authority grant -> close -> publish -> queue integration.
- Out of scope: unrelated refactors not required for "Break authority-close lifecycle feedback loop".

## Plan

1. Trace the route predicates that classify task README and PR-artifact changes as verification/pre-merge invalidators.
2. Introduce an explicit freshness boundary: implementation, verification, quality, and close-tail evidence remain content-addressed; authority grants and provider-sync metadata preserve auditability but do not invalidate unchanged implementation evidence.
3. Preserve all high-risk gates: a protected provider operation still requires a matching current authority record; code/verification/quality changes still require fresh verification and pre-merge closure; final PR head and hosted checks must remain live and stable.
4. Add deterministic regression coverage for authority grant -> pre-merge closure -> final head publication -> integration queue, proving the route reaches an executable integration step without another verification cycle when implementation is unchanged.
5. Run focused route tests, task-state check, typecheck, critical tests, policy routing, and the relevant local CI selector; record residual compatibility risk in task Findings.

## Verify Steps

1. Add a deterministic route-level regression: authority grant, verification, evaluator pass, pre-merge closure, final-head publication, hosted-green refresh, integration queue. Expected: unchanged implementation and quality evidence reaches an executable integration action without another verification/close/publish loop.
2. Exercise the negative boundary. Expected: a changed implementation commit, invalid or stale authority, or changed hosted state still invalidates the appropriate evidence and blocks integration.
3. Inspect persisted task and authority artifacts. Expected: every protected operation retains a matching scoped authority record; no authority record widens an operation.
4. Run focused lifecycle-route tests, bun run task-state:check, bun run typecheck, bun run test:critical, and node .agentplane/policy/check-routing.mjs. Expected: all pass.
5. Publish a PR and require stable hosted checks before integrating. Expected: the PR head, review state, and merge queue agree; no manual provider merge is used.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-28T09:22:59.261Z — VERIFY — ok

By: TESTER

Note: Focused authority/lifecycle tests, task-state, typecheck, critical suite, policy routing, and full local fast CI passed; the live authority grant auto-committed its packet and advanced directly to pr.open.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T09:22:45.351Z, excerpt_hash=sha256:52fcdb54a6ac5d2e275518998c6d5e8482aa9d20bac2e445e9a05838c2d4d074

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607280900-WHE7JS-break-authority-close-lifecycle-feedback-loop/.agentplane/tasks/202607280900-WHE7JS/blueprint/resolved-snapshot.json
- old_digest: cf78dccf3ca7848d369ebafa8399f797778df6099809e148df6eba5dea7c2410
- current_digest: cf78dccf3ca7848d369ebafa8399f797778df6099809e148df6eba5dea7c2410
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607280900-WHE7JS

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607280900-WHE7JS
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

- Observation: authority grant emitted committed and next-action became cli_operation pr.open
  Impact: breaks the task-worktree dirty feedback loop without weakening authority scope or expiry
  Resolution: verified against commit 03a98aa601a69dd8c89e5dc424ca2e0ed214d025
