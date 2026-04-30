---
id: "202604300725-SS9694"
title: "Fix release formatting drift"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "ok"
  updated_at: "2026-04-30T07:43:07.032Z"
  updated_by: "CODER"
  note: "Verification passed for formatting drift."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce format drift, apply mechanical formatting only, and verify format gates."
events:
  -
    type: "status"
    at: "2026-04-30T07:37:24.339Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce format drift, apply mechanical formatting only, and verify format gates."
  -
    type: "verify"
    at: "2026-04-30T07:43:07.032Z"
    author: "CODER"
    state: "ok"
    note: "Verification passed for formatting drift."
doc_version: 3
doc_updated_at: "2026-04-30T07:43:07.044Z"
doc_updated_by: "CODER"
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
    ### 2026-04-30T07:43:07.032Z — VERIFY — ok
    
    By: CODER
    
    Note: Verification passed for formatting drift.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T07:37:24.339Z, excerpt_hash=sha256:1154ff0ae1f9f14c3e7a33709c435b385c7efe75e014cd9ea111b7711571dfc8
    
    Details:
    
    Command: bun run format:check; Result: pass; Evidence: All matched files use Prettier code style; Scope: repository formatting.
    Command: bun run agents:check; Result: pass; Evidence: agents templates OK; Scope: generated agent/policy mirrors.
    Command: bun run policy:routing:check; Result: pass; Evidence: policy routing OK after keeping AGENTS.md under the 250-line budget; Scope: policy routing and budgets.
    Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: final diff.
    Command: bun run framework:dev:bootstrap; Result: pass; Evidence: Framework dev runtime is ready; Scope: repo-local runtime.
    Command: agentplane doctor; Result: pass; Evidence: doctor OK; Scope: workflow runtime health.
    
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
### 2026-04-30T07:43:07.032Z — VERIFY — ok

By: CODER

Note: Verification passed for formatting drift.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T07:37:24.339Z, excerpt_hash=sha256:1154ff0ae1f9f14c3e7a33709c435b385c7efe75e014cd9ea111b7711571dfc8

Details:

Command: bun run format:check; Result: pass; Evidence: All matched files use Prettier code style; Scope: repository formatting.
Command: bun run agents:check; Result: pass; Evidence: agents templates OK; Scope: generated agent/policy mirrors.
Command: bun run policy:routing:check; Result: pass; Evidence: policy routing OK after keeping AGENTS.md under the 250-line budget; Scope: policy routing and budgets.
Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: final diff.
Command: bun run framework:dev:bootstrap; Result: pass; Evidence: Framework dev runtime is ready; Scope: repo-local runtime.
Command: agentplane doctor; Result: pass; Evidence: doctor OK; Scope: workflow runtime health.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
