---
id: "202608032207-V8HMV8"
title: "Make qualification reruns ignore their active evidence directory"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T22:08:01.389Z"
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
    at: "2026-08-03T22:08:23.112Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-03T22:08:23.112Z"
doc_updated_by: "CODER"
description: "Fix the v0.7.1 qualification runner so its top-level exact-subject cleanliness check excludes only the explicitly selected nested evidence directory, allowing audit-to-gate reruns without hiding unrelated repository changes."
sections:
  Summary: |-
    Make qualification reruns ignore their active evidence directory

    Fix the v0.7.1 qualification runner so its top-level exact-subject cleanliness check excludes only the explicitly selected nested evidence directory, allowing audit-to-gate reruns without hiding unrelated repository changes.
  Scope: |-
    - In scope: Fix the v0.7.1 qualification runner so its top-level exact-subject cleanliness check excludes only the explicitly selected nested evidence directory, allowing audit-to-gate reruns without hiding unrelated repository changes.
    - Out of scope: unrelated refactors not required for "Make qualification reruns ignore their active evidence directory".
  Plan: "1. Pass the resolved nested qualification output directory into the runner's initial exact-subject identity check. 2. Add regression coverage proving existing active evidence is excluded while unrelated dirty paths still fail. 3. Run focused qualification contract tests, typecheck, lint/format checks, semantic evaluator, and hosted PR checks. 4. Merge through the integration queue, then rebase the exact-evidence task and rerun the full deterministic audit before the one-shot provider gate."
  Verify Steps: |-
    - A rerun using an existing nested --out-dir reaches scenario execution/dry-run when HEAD and all non-evidence paths are clean.
    - An unrelated tracked or untracked change still fails the exact-subject cleanliness gate.
    - Root-level and outside-repository evidence directories remain rejected.
    - node --test scripts/qualification/release-qualification.test.mjs passes.
    - bun run typecheck, focused lint/format checks, semantic evaluator, and all hosted PR checks pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "15c0d5808aa64bb6ad3f15666ccac58b1648cec1"
    version: 1
id_source: "generated"
---
## Summary

Make qualification reruns ignore their active evidence directory

Fix the v0.7.1 qualification runner so its top-level exact-subject cleanliness check excludes only the explicitly selected nested evidence directory, allowing audit-to-gate reruns without hiding unrelated repository changes.

## Scope

- In scope: Fix the v0.7.1 qualification runner so its top-level exact-subject cleanliness check excludes only the explicitly selected nested evidence directory, allowing audit-to-gate reruns without hiding unrelated repository changes.
- Out of scope: unrelated refactors not required for "Make qualification reruns ignore their active evidence directory".

## Plan

1. Pass the resolved nested qualification output directory into the runner's initial exact-subject identity check. 2. Add regression coverage proving existing active evidence is excluded while unrelated dirty paths still fail. 3. Run focused qualification contract tests, typecheck, lint/format checks, semantic evaluator, and hosted PR checks. 4. Merge through the integration queue, then rebase the exact-evidence task and rerun the full deterministic audit before the one-shot provider gate.

## Verify Steps

- A rerun using an existing nested --out-dir reaches scenario execution/dry-run when HEAD and all non-evidence paths are clean.
- An unrelated tracked or untracked change still fails the exact-subject cleanliness gate.
- Root-level and outside-repository evidence directories remain rejected.
- node --test scripts/qualification/release-qualification.test.mjs passes.
- bun run typecheck, focused lint/format checks, semantic evaluator, and all hosted PR checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
