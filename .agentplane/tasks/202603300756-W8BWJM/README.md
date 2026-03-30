---
id: "202603300756-W8BWJM"
title: "Create REFACTOR.md epic and atomic task map"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 9
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
  updated_at: "2026-03-30T08:03:42.464Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-30T08:04:02.817Z"
  updated_by: "DOCS"
  note: "Verified: REFACTOR.md now captures the next optimization backlog as epics plus atomic tasks with dependencies, acceptance criteria, guardrails, and rollout order; routing check passed, and doctor failure was confirmed as a pre-existing WORKFLOW.md/config mismatch unrelated to this docs-only change."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: draft the root REFACTOR.md backlog with epics, atomic tasks, sequencing, and acceptance criteria from the current optimization analysis."
events:
  -
    type: "status"
    at: "2026-03-30T07:59:47.223Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: draft the root REFACTOR.md backlog with epics, atomic tasks, sequencing, and acceptance criteria from the current optimization analysis."
  -
    type: "verify"
    at: "2026-03-30T08:04:02.817Z"
    author: "DOCS"
    state: "ok"
    note: "Verified: REFACTOR.md now captures the next optimization backlog as epics plus atomic tasks with dependencies, acceptance criteria, guardrails, and rollout order; routing check passed, and doctor failure was confirmed as a pre-existing WORKFLOW.md/config mismatch unrelated to this docs-only change."
doc_version: 3
doc_updated_at: "2026-03-30T08:05:46.673Z"
doc_updated_by: "DOCS"
description: "Capture the next optimization/refactor backlog in a dedicated REFACTOR.md file with epics, atomic tasks, sequencing, and acceptance criteria based on the current codebase analysis."
sections:
  Summary: |-
    Create REFACTOR.md epic and atomic task map
    
    Capture the next optimization/refactor backlog in a dedicated REFACTOR.md file with epics, atomic tasks, sequencing, and acceptance criteria based on the current codebase analysis.
  Scope: |-
    - In scope: Capture the next optimization/refactor backlog in a dedicated REFACTOR.md file with epics, atomic tasks, sequencing, and acceptance criteria based on the current codebase analysis.
    - Out of scope: unrelated refactors not required for "Create REFACTOR.md epic and atomic task map".
  Plan: |-
    1. Inspect the current refactor analysis, existing framework refactor roadmap, and any existing root-level refactor docs to define the canonical scope for REFACTOR.md.
    2. Create REFACTOR.md at the repository root as a working backlog document organized into epics and atomic tasks with goals, rationale, task boundaries, acceptance criteria, and recommended execution order.
    3. Verify the docs-only change with routing/doctor checks, record evidence in the task README, and leave the repository in a clean branch_pr-ready state.
  Verify Steps: |-
    1. Inspect REFACTOR.md at the repository root. Expected: the file exists and contains baseline, guardrails, epics, atomic tasks, execution order, and exit criteria.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: `policy routing OK`.
    3. Run `agentplane doctor`. Expected: no new REFACTOR.md-related issues; the pre-existing workflow-mode mismatch is recorded as residual repo drift.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-30T08:04:02.817Z — VERIFY — ok
    
    By: DOCS
    
    Note: Verified: REFACTOR.md now captures the next optimization backlog as epics plus atomic tasks with dependencies, acceptance criteria, guardrails, and rollout order; routing check passed, and doctor failure was confirmed as a pre-existing WORKFLOW.md/config mismatch unrelated to this docs-only change.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T08:03:53.892Z, excerpt_hash=sha256:b4224e5e7adb314c8cfbb790fb7f385136b283b7e1ea7cbbe5c1bf20ec7e9167
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - `agentplane doctor` currently fails before this change because `.agentplane/WORKFLOW.md` still declares `mode: "direct"` while `.agentplane/config.json` declares `workflow_mode=branch_pr`; REFACTOR.md did not introduce that drift.
    - In a framework task worktree without a built repo-local `dist`, task lifecycle commands require `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1` (or a local bootstrap) to avoid wrapper handoff failure.
    - The default pre-commit hook path is not runnable in this worktree without a local framework bootstrap because `node_modules/.bin/prettier` and package dependencies such as `ajv` are missing; this docs-only task relied on explicit routing/doctor verification instead.
id_source: "generated"
---
## Summary

Create REFACTOR.md epic and atomic task map

Capture the next optimization/refactor backlog in a dedicated REFACTOR.md file with epics, atomic tasks, sequencing, and acceptance criteria based on the current codebase analysis.

## Scope

- In scope: Capture the next optimization/refactor backlog in a dedicated REFACTOR.md file with epics, atomic tasks, sequencing, and acceptance criteria based on the current codebase analysis.
- Out of scope: unrelated refactors not required for "Create REFACTOR.md epic and atomic task map".

## Plan

1. Inspect the current refactor analysis, existing framework refactor roadmap, and any existing root-level refactor docs to define the canonical scope for REFACTOR.md.
2. Create REFACTOR.md at the repository root as a working backlog document organized into epics and atomic tasks with goals, rationale, task boundaries, acceptance criteria, and recommended execution order.
3. Verify the docs-only change with routing/doctor checks, record evidence in the task README, and leave the repository in a clean branch_pr-ready state.

## Verify Steps

1. Inspect REFACTOR.md at the repository root. Expected: the file exists and contains baseline, guardrails, epics, atomic tasks, execution order, and exit criteria.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: `policy routing OK`.
3. Run `agentplane doctor`. Expected: no new REFACTOR.md-related issues; the pre-existing workflow-mode mismatch is recorded as residual repo drift.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-30T08:04:02.817Z — VERIFY — ok

By: DOCS

Note: Verified: REFACTOR.md now captures the next optimization backlog as epics plus atomic tasks with dependencies, acceptance criteria, guardrails, and rollout order; routing check passed, and doctor failure was confirmed as a pre-existing WORKFLOW.md/config mismatch unrelated to this docs-only change.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T08:03:53.892Z, excerpt_hash=sha256:b4224e5e7adb314c8cfbb790fb7f385136b283b7e1ea7cbbe5c1bf20ec7e9167

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- `agentplane doctor` currently fails before this change because `.agentplane/WORKFLOW.md` still declares `mode: "direct"` while `.agentplane/config.json` declares `workflow_mode=branch_pr`; REFACTOR.md did not introduce that drift.
- In a framework task worktree without a built repo-local `dist`, task lifecycle commands require `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1` (or a local bootstrap) to avoid wrapper handoff failure.
- The default pre-commit hook path is not runnable in this worktree without a local framework bootstrap because `node_modules/.bin/prettier` and package dependencies such as `ajv` are missing; this docs-only task relied on explicit routing/doctor verification instead.
