---
id: "202607280900-WHE7JS"
title: "Break authority-close lifecycle feedback loop"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: isolate authority and close-tail freshness from implementation verification without weakening protected merge gates."
events:
  -
    type: "status"
    at: "2026-07-28T09:02:22.510Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: isolate authority and close-tail freshness from implementation verification without weakening protected merge gates."
doc_version: 3
doc_updated_at: "2026-07-28T09:02:22.510Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
    schemaVersion: 1
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
