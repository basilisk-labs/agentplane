---
id: "202604300725-SS9694"
title: "Fix release formatting drift"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604300724-ZTGZYT"
tags:
  - "docs"
  - "formatting"
  - "release"
verify:
  - "agentplane doctor"
  - "bun run agents:check"
  - "bun run format:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-30T07:26:42.524Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-30T07:26:38.480Z"
doc_updated_by: "ORCHESTRATOR"
description: "Make format:check pass by applying the smallest Prettier-compatible formatting changes to release-blocking files, without changing prompt semantics or unrelated generated artifacts."
sections:
  Summary: |-
    Fix release formatting drift
    
    Make format:check pass by applying the smallest Prettier-compatible formatting changes to release-blocking files, without changing prompt semantics or unrelated generated artifacts.
  Scope: |-
    - In scope: Make format:check pass by applying the smallest Prettier-compatible formatting changes to release-blocking files, without changing prompt semantics or unrelated generated artifacts.
    - Out of scope: unrelated refactors not required for "Fix release formatting drift".
  Plan: |-
    1. Reproduce the formatting gate with bun run format:check and record the release-blocking file set.
    2. Apply Prettier only to release-blocking files after the parity sync task has landed.
    3. Review diffs for formatting-only changes and no prompt semantic edits.
    4. Verify format:check, git diff --check, agents:check, and doctor.
    5. Publish through branch_pr and close after hosted merge.
  Verify Steps: |-
    1. Review the requested outcome for "Fix release formatting drift". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix release formatting drift

Make format:check pass by applying the smallest Prettier-compatible formatting changes to release-blocking files, without changing prompt semantics or unrelated generated artifacts.

## Scope

- In scope: Make format:check pass by applying the smallest Prettier-compatible formatting changes to release-blocking files, without changing prompt semantics or unrelated generated artifacts.
- Out of scope: unrelated refactors not required for "Fix release formatting drift".

## Plan

1. Reproduce the formatting gate with bun run format:check and record the release-blocking file set.
2. Apply Prettier only to release-blocking files after the parity sync task has landed.
3. Review diffs for formatting-only changes and no prompt semantic edits.
4. Verify format:check, git diff --check, agents:check, and doctor.
5. Publish through branch_pr and close after hosted merge.

## Verify Steps

1. Review the requested outcome for "Fix release formatting drift". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
