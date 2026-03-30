---
id: "202603300819-1BKNXM"
title: "Update REFACTOR.md with corrective runtime and workflow tasks"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "architecture"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-30T08:20:46.940Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-30T08:50:08.169Z"
  updated_by: "DOCS"
  note: "OK: node .agentplane/policy/check-routing.mjs; REFACTOR.md now records confirmed runtime/workflow gaps in Epic C and classifies the PR-artifact issue as a hypothesis pending reproduction."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: update REFACTOR.md with corrective tasks for the observed workflow mismatch, framework worktree runtime friction, and the branch_pr PR-artifact repro/classification path."
events:
  -
    type: "status"
    at: "2026-03-30T08:21:15.831Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: update REFACTOR.md with corrective tasks for the observed workflow mismatch, framework worktree runtime friction, and the branch_pr PR-artifact repro/classification path."
  -
    type: "verify"
    at: "2026-03-30T08:50:08.169Z"
    author: "DOCS"
    state: "ok"
    note: "OK: node .agentplane/policy/check-routing.mjs; REFACTOR.md now records confirmed runtime/workflow gaps in Epic C and classifies the PR-artifact issue as a hypothesis pending reproduction."
doc_version: 3
doc_updated_at: "2026-03-30T08:50:08.172Z"
doc_updated_by: "DOCS"
description: "Extend the root refactor backlog with the concrete runtime/workflow defects discovered during execution: WORKFLOW.md mode drift, framework worktree bootstrap/global fallback friction, and a clearly marked hypothesis task for the base-checkout PR-artifact edge-case."
sections:
  Summary: |-
    Update REFACTOR.md with corrective runtime and workflow tasks
    
    Extend the root refactor backlog with the concrete runtime/workflow defects discovered during execution: WORKFLOW.md mode drift, framework worktree bootstrap/global fallback friction, and a clearly marked hypothesis task for the base-checkout PR-artifact edge-case.
  Scope: |-
    - In scope: Extend the root refactor backlog with the concrete runtime/workflow defects discovered during execution: WORKFLOW.md mode drift, framework worktree bootstrap/global fallback friction, and a clearly marked hypothesis task for the base-checkout PR-artifact edge-case.
    - Out of scope: unrelated refactors not required for "Update REFACTOR.md with corrective runtime and workflow tasks".
  Plan: |-
    1. Inspect the current REFACTOR backlog and the concrete runtime/workflow issues discovered during execution so the new backlog entries reflect observed repository reality.
    2. Update REFACTOR.md with corrective tasks for the workflow artifact mismatch, framework worktree runtime/bootstrap friction, and a clearly labeled hypothesis/repro task for the base-checkout PR-artifact edge-case.
    3. Verify the docs-only change with routing and doctor checks, recording any remaining residual repo-wide drift explicitly in task findings.
  Verify Steps: |-
    1. Inspect REFACTOR.md. Expected: the backlog includes corrective entries for the discovered workflow/runtime defects and marks the PR-artifact issue as a classified hypothesis or repro task.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: `policy routing OK`.
    3. Run `agentplane doctor`. Expected: no new REFACTOR.md-related issues; any remaining repo-wide workflow mismatch is recorded explicitly if still present.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-30T08:50:08.169Z — VERIFY — ok
    
    By: DOCS
    
    Note: OK: node .agentplane/policy/check-routing.mjs; REFACTOR.md now records confirmed runtime/workflow gaps in Epic C and classifies the PR-artifact issue as a hypothesis pending reproduction.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T08:21:15.833Z, excerpt_hash=sha256:d1d151b244a0d801ad76264608a6b67a8ea620eb439a627c3b125ef57cc2a614
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Update REFACTOR.md with corrective runtime and workflow tasks

Extend the root refactor backlog with the concrete runtime/workflow defects discovered during execution: WORKFLOW.md mode drift, framework worktree bootstrap/global fallback friction, and a clearly marked hypothesis task for the base-checkout PR-artifact edge-case.

## Scope

- In scope: Extend the root refactor backlog with the concrete runtime/workflow defects discovered during execution: WORKFLOW.md mode drift, framework worktree bootstrap/global fallback friction, and a clearly marked hypothesis task for the base-checkout PR-artifact edge-case.
- Out of scope: unrelated refactors not required for "Update REFACTOR.md with corrective runtime and workflow tasks".

## Plan

1. Inspect the current REFACTOR backlog and the concrete runtime/workflow issues discovered during execution so the new backlog entries reflect observed repository reality.
2. Update REFACTOR.md with corrective tasks for the workflow artifact mismatch, framework worktree runtime/bootstrap friction, and a clearly labeled hypothesis/repro task for the base-checkout PR-artifact edge-case.
3. Verify the docs-only change with routing and doctor checks, recording any remaining residual repo-wide drift explicitly in task findings.

## Verify Steps

1. Inspect REFACTOR.md. Expected: the backlog includes corrective entries for the discovered workflow/runtime defects and marks the PR-artifact issue as a classified hypothesis or repro task.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: `policy routing OK`.
3. Run `agentplane doctor`. Expected: no new REFACTOR.md-related issues; any remaining repo-wide workflow mismatch is recorded explicitly if still present.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-30T08:50:08.169Z — VERIFY — ok

By: DOCS

Note: OK: node .agentplane/policy/check-routing.mjs; REFACTOR.md now records confirmed runtime/workflow gaps in Epic C and classifies the PR-artifact issue as a hypothesis pending reproduction.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T08:21:15.833Z, excerpt_hash=sha256:d1d151b244a0d801ad76264608a6b67a8ea620eb439a627c3b125ef57cc2a614

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
