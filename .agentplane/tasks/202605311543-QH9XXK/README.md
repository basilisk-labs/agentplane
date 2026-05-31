---
id: "202605311543-QH9XXK"
title: "Codify branch_pr release recovery prompt rules"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "docs"
  - "prompt-policy"
task_kind: "docs"
mutation_scope: "docs"
verify:
  - "bun run agents:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:52.980Z"
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
    body: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-05-31T15:53:33.718Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
doc_version: 3
doc_updated_at: "2026-05-31T15:53:33.718Z"
doc_updated_by: "CODER"
description: "Add or update agent-facing prompt/policy guidance for release recovery: classify route before mutation, use GitHub truth, pass markdown bodies by file, preserve dirty cleanup state, and use ap integrate before direct gh merge."
sections:
  Summary: |-
    Codify branch_pr release recovery prompt rules

    Add or update agent-facing prompt/policy guidance for release recovery: classify route before mutation, use GitHub truth, pass markdown bodies by file, preserve dirty cleanup state, and use ap integrate before direct gh merge.
  Scope: |-
    - In scope: Add or update agent-facing prompt/policy guidance for release recovery: classify route before mutation, use GitHub truth, pass markdown bodies by file, preserve dirty cleanup state, and use ap integrate before direct gh merge.
    - Out of scope: unrelated refactors not required for "Codify branch_pr release recovery prompt rules".
  Plan: |-
    1. Identify the agent-facing policy or prompt surface that governs branch_pr release recovery.
    2. Add concise rules for route classification, GitHub truth, markdown body files, dirty cleanup preservation, and ap integrate before direct gh merge.
    3. Keep repository artifacts in English and within policy size budgets.
    4. Verify check-routing and agents checks.
  Verify Steps: |-
    PLANNER fallback scaffold for "Codify branch_pr release recovery prompt rules". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Codify branch_pr release recovery prompt rules". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Codify branch_pr release recovery prompt rules

Add or update agent-facing prompt/policy guidance for release recovery: classify route before mutation, use GitHub truth, pass markdown bodies by file, preserve dirty cleanup state, and use ap integrate before direct gh merge.

## Scope

- In scope: Add or update agent-facing prompt/policy guidance for release recovery: classify route before mutation, use GitHub truth, pass markdown bodies by file, preserve dirty cleanup state, and use ap integrate before direct gh merge.
- Out of scope: unrelated refactors not required for "Codify branch_pr release recovery prompt rules".

## Plan

1. Identify the agent-facing policy or prompt surface that governs branch_pr release recovery.
2. Add concise rules for route classification, GitHub truth, markdown body files, dirty cleanup preservation, and ap integrate before direct gh merge.
3. Keep repository artifacts in English and within policy size budgets.
4. Verify check-routing and agents checks.

## Verify Steps

PLANNER fallback scaffold for "Codify branch_pr release recovery prompt rules". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Codify branch_pr release recovery prompt rules". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
