---
id: "202607221850-9C9WBP"
title: "Normalize runner task inputs into TaskEpisodeView"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202607221908-9M2FBQ"
tags:
  - "cognitive-load"
  - "context"
  - "milestone-beta1"
  - "refactor"
  - "rf-21"
  - "runner"
  - "v0.7"
  - "wave-supervisor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run guards:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-27T21:30:04.534Z"
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
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-27T21:31:31.540Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-27T21:31:31.540Z"
doc_updated_by: "CODER"
description: "RF-21: replace full TaskData plus duplicate projections with one authoritative role-specific episode view, required-section policy, relevant history, and compaction receipt."
sections:
  Summary: |-
    Normalize runner task inputs into TaskEpisodeView

    RF-21: replace full TaskData plus duplicate projections with one authoritative role-specific episode view, required-section policy, relevant history, and compaction receipt.
  Scope: |-
    - In scope: immutable identity/state metadata, semantic narrative, blueprint-selected required sections, recent relevant events/comments, explicit compaction and omission receipts, v1 compatibility, and serialized-byte ratchets.
    - Out of scope: knowledge retrieval or lifecycle commands.
  Plan: |-
    1. Measure duplicate task representations from the frozen baseline.
    2. Define TaskEpisodeView with one authoritative field per fact.
    3. Select required sections from schema/blueprint metadata and fail loudly when unavailable.
    4. Compact history with explicit coverage/omission receipts.
    5. Migrate runner/work-order serialization and ratchet duplicate bytes downward.
  Verify Steps: |-
    1. Serialize representative large tasks before and after migration. Expected: one authoritative task representation and a material reduction in duplicate bytes without lower verified success fixtures.
    2. Remove or truncate a required section. Expected: preparation fails or records an explicit omission; it never silently hides required context.
    3. Exercise non-English/custom headings through blueprint metadata. Expected: section priority is structural, not an English string heuristic.
    4. Run task-context/work-order tests, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
    - Restore the previous compatibility path behind an explicit feature/compatibility boundary.
    - Re-run lifecycle, focused, and type checks before resuming dependent work.
  Findings: ""
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-27T21:32:39.898Z"
        authorityDigest: "sha256:3230db9cf0ae6892ab43231e4b9294f8dc113b807ee5dc2b276dd55a09d41f7a"
        digest: "sha256:d4e666f4e0a3ebc84028ab3ddbfe3c901f66e5064fd5cea8209cb0613879d21c"
        operationDigest: "sha256:4c84cea2438da053d7cb31efda4bf136133b5acc196742ca9195d7606283b27a"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:91c022eb250fd03403a05af62f63b23bac1af3126bc3ee77d43926794d3b7a56"
    grants:
      -
        actor: "USER"
        digest: "sha256:3230db9cf0ae6892ab43231e4b9294f8dc113b807ee5dc2b276dd55a09d41f7a"
        expiresAt: "2026-07-27T21:47:39.898Z"
        id: "authority-e06cf924-5c0b-455b-8177-3c43501c2df2"
        issuedAt: "2026-07-27T21:32:39.898Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:4c84cea2438da053d7cb31efda4bf136133b5acc196742ca9195d7606283b27a"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:91c022eb250fd03403a05af62f63b23bac1af3126bc3ee77d43926794d3b7a56"
        stateScopeDigest: "sha256:6662a1f9f6db9412153a019796259532ef6922a468912f5cfa73e17846816299"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "9f99149a3920e2e49a6887d2dcd22460e10f672e"
    version: 1
id_source: "generated"
---
## Summary

Normalize runner task inputs into TaskEpisodeView

RF-21: replace full TaskData plus duplicate projections with one authoritative role-specific episode view, required-section policy, relevant history, and compaction receipt.

## Scope

- In scope: immutable identity/state metadata, semantic narrative, blueprint-selected required sections, recent relevant events/comments, explicit compaction and omission receipts, v1 compatibility, and serialized-byte ratchets.
- Out of scope: knowledge retrieval or lifecycle commands.

## Plan

1. Measure duplicate task representations from the frozen baseline.
2. Define TaskEpisodeView with one authoritative field per fact.
3. Select required sections from schema/blueprint metadata and fail loudly when unavailable.
4. Compact history with explicit coverage/omission receipts.
5. Migrate runner/work-order serialization and ratchet duplicate bytes downward.

## Verify Steps

1. Serialize representative large tasks before and after migration. Expected: one authoritative task representation and a material reduction in duplicate bytes without lower verified success fixtures.
2. Remove or truncate a required section. Expected: preparation fails or records an explicit omission; it never silently hides required context.
3. Exercise non-English/custom headings through blueprint metadata. Expected: section priority is structural, not an English string heuristic.
4. Run task-context/work-order tests, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
- Restore the previous compatibility path behind an explicit feature/compatibility boundary.
- Re-run lifecycle, focused, and type checks before resuming dependent work.

## Findings
