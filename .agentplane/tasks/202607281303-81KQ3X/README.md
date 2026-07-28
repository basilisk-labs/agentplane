---
id: "202607281303-81KQ3X"
title: "Persist branch_pr authority outside the PR head"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "lifecycle"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T13:03:52.427Z"
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
    body: "Start: persist scoped authority outside the PR head and retain fail-closed validation."
events:
  -
    type: "status"
    at: "2026-07-28T13:04:14.503Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: persist scoped authority outside the PR head and retain fail-closed validation."
doc_version: 3
doc_updated_at: "2026-07-28T13:04:14.503Z"
doc_updated_by: "CODER"
description: "Protected CI is invalidated when a scoped authority grant is written to the task README and auto-committed to the PR branch. Persist auditable, expiring authority metadata outside refs/heads while retaining exact operation and state-scope validation across task and integration checkouts."
sections:
  Summary: |-
    Persist branch_pr authority outside the PR head

    Protected CI is invalidated when a scoped authority grant is written to the task README and auto-committed to the PR branch. Persist auditable, expiring authority metadata outside refs/heads while retaining exact operation and state-scope validation across task and integration checkouts.
  Scope: |-
    - In scope: Protected CI is invalidated when a scoped authority grant is written to the task README and auto-committed to the PR branch. Persist auditable, expiring authority metadata outside refs/heads while retaining exact operation and state-scope validation across task and integration checkouts.
    - Out of scope: unrelated refactors not required for "Persist branch_pr authority outside the PR head".
  Plan: "1. Map the authority write/read path and its shared checkout boundary. 2. Move authority persistence from the tracked task record into a durable repository-control-plane store that does not advance the task PR ref. 3. Keep expiry, operation digest, state-scope matching, and tamper detection fail-closed. 4. Add focused unit and lifecycle-route regressions. 5. Run declared local checks, publish a PR, and verify hosted checks before integration."
  Verify Steps: |-
    1. Grant a scoped authority from the task branch and assert that refs/heads/task/<task-id>/<slug> is byte-for-byte unchanged while the task worktree remains clean. Expected: authority remains available from the base integration checkout.
    2. Exercise matching, expired, tampered, and state-scope-mismatched authority records. Expected: only the matching unexpired record permits the exact operation.
    3. Simulate a verified PR head, grant integration authority, then recompute the route. Expected: integration enqueue is available without a PR-head publication or a fresh hosted-check requirement.
    4. Run focused authority and lifecycle tests, typecheck, test:fast, and the changed-files local CI route. Expected: all pass.
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
        at: "2026-07-28T13:04:27.490Z"
        authorityDigest: "sha256:6a8997e48fe04eb0f481d98cc0930a06dbf17b396a89f44bd3e59ac243412625"
        digest: "sha256:3ccf90820c987c5e31cce6c0dcee0df9fe043e1c29b90a84f20287b0ec191806"
        operationDigest: "sha256:be7dc32545435b74a39d6f8fa956a8271d6de50a5ef50b7643b14399812723a3"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:a9ebd6cf49906f0891a233c1d107be469c4b3713f5b94d98d59540e899fb065e"
    grants:
      -
        actor: "USER"
        digest: "sha256:6a8997e48fe04eb0f481d98cc0930a06dbf17b396a89f44bd3e59ac243412625"
        expiresAt: "2026-07-28T13:19:27.490Z"
        id: "authority-6527c189-4ad1-4914-aab5-cded2d6d240b"
        issuedAt: "2026-07-28T13:04:27.490Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:be7dc32545435b74a39d6f8fa956a8271d6de50a5ef50b7643b14399812723a3"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:a9ebd6cf49906f0891a233c1d107be469c4b3713f5b94d98d59540e899fb065e"
        stateScopeDigest: "sha256:9f645ed07fb68f90bdb10c05eac9d68f23551613dbb03f683142f4773548a628"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "47213e98e23ec136566a31bb1ef6c44f16d64690"
    version: 1
id_source: "generated"
---
## Summary

Persist branch_pr authority outside the PR head

Protected CI is invalidated when a scoped authority grant is written to the task README and auto-committed to the PR branch. Persist auditable, expiring authority metadata outside refs/heads while retaining exact operation and state-scope validation across task and integration checkouts.

## Scope

- In scope: Protected CI is invalidated when a scoped authority grant is written to the task README and auto-committed to the PR branch. Persist auditable, expiring authority metadata outside refs/heads while retaining exact operation and state-scope validation across task and integration checkouts.
- Out of scope: unrelated refactors not required for "Persist branch_pr authority outside the PR head".

## Plan

1. Map the authority write/read path and its shared checkout boundary. 2. Move authority persistence from the tracked task record into a durable repository-control-plane store that does not advance the task PR ref. 3. Keep expiry, operation digest, state-scope matching, and tamper detection fail-closed. 4. Add focused unit and lifecycle-route regressions. 5. Run declared local checks, publish a PR, and verify hosted checks before integration.

## Verify Steps

1. Grant a scoped authority from the task branch and assert that refs/heads/task/<task-id>/<slug> is byte-for-byte unchanged while the task worktree remains clean. Expected: authority remains available from the base integration checkout.
2. Exercise matching, expired, tampered, and state-scope-mismatched authority records. Expected: only the matching unexpired record permits the exact operation.
3. Simulate a verified PR head, grant integration authority, then recompute the route. Expected: integration enqueue is available without a PR-head publication or a fresh hosted-check requirement.
4. Run focused authority and lifecycle tests, typecheck, test:fast, and the changed-files local CI route. Expected: all pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
