---
id: "202605282336-A20GQR"
title: "Context wiki command decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hotspot"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T23:36:16.119Z"
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
    body: "Start: Decompose context wiki rendering and lint helpers in the task worktree while preserving wiki new, lint, explain, link, and index behavior under focused tests."
events:
  -
    type: "status"
    at: "2026-05-28T23:36:39.033Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Decompose context wiki rendering and lint helpers in the task worktree while preserving wiki new, lint, explain, link, and index behavior under focused tests."
doc_version: 3
doc_updated_at: "2026-05-28T23:36:39.033Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/context/wiki.ts by extracting wiki page rendering and lint/catalog helpers while preserving context wiki command behavior."
sections:
  Summary: |-
    Context wiki command decomposition

    Decompose packages/agentplane/src/commands/context/wiki.ts by extracting wiki page rendering and lint/catalog helpers while preserving context wiki command behavior.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/context/wiki.ts by extracting wiki page rendering and lint/catalog helpers while preserving context wiki command behavior.
    - Out of scope: unrelated refactors not required for "Context wiki command decomposition".
  Plan: |-
    Plan:
    1. Start branch_pr worktree for CODER.
    2. Extract context wiki model/render helpers and lint/frontmatter catalog helpers from wiki.ts into focused modules.
    3. Preserve public command exports and behavior for wiki new/lint/explain/link/index.
    4. Verify with focused wiki tests, typecheck, arch dependency check, lint, format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean merged worktree.

    Acceptance:
    - context wiki command outputs and validation behavior remain compatible.
    - wiki.ts drops below the runtime hotspot warning threshold.
    - hotspot runtime warning count decreases from 34 to 33.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Context wiki command decomposition

Decompose packages/agentplane/src/commands/context/wiki.ts by extracting wiki page rendering and lint/catalog helpers while preserving context wiki command behavior.

## Scope

- In scope: Decompose packages/agentplane/src/commands/context/wiki.ts by extracting wiki page rendering and lint/catalog helpers while preserving context wiki command behavior.
- Out of scope: unrelated refactors not required for "Context wiki command decomposition".

## Plan

Plan:
1. Start branch_pr worktree for CODER.
2. Extract context wiki model/render helpers and lint/frontmatter catalog helpers from wiki.ts into focused modules.
3. Preserve public command exports and behavior for wiki new/lint/explain/link/index.
4. Verify with focused wiki tests, typecheck, arch dependency check, lint, format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean merged worktree.

Acceptance:
- context wiki command outputs and validation behavior remain compatible.
- wiki.ts drops below the runtime hotspot warning threshold.
- hotspot runtime warning count decreases from 34 to 33.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
