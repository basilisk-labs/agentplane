---
id: "202607221850-9C9WBP"
title: "Normalize runner task inputs into TaskEpisodeView"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-22T18:50:20.039Z"
doc_updated_by: "PLANNER"
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
