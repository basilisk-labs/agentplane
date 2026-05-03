---
id: "202605031908-TE8H0C"
title: "T05: Remove role-theater from README examples"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "readme"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:08:26.046Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: executing this approved launch backlog atom inside the primary ACR launch branch_pr worktree with scoped verification evidence."
events:
  -
    type: "status"
    at: "2026-05-03T19:30:07.621Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: executing this approved launch backlog atom inside the primary ACR launch branch_pr worktree with scoped verification evidence."
doc_version: 3
doc_updated_at: "2026-05-03T19:30:07.621Z"
doc_updated_by: "CODER"
description: "Replace first task flow examples in root and CLI package READMEs with role-free onboarding commands."
sections:
  Summary: |-
    T05: Remove role-theater from README examples

    Replace first task flow examples in root and CLI package READMEs with role-free onboarding commands.
  Scope: |-
    - In scope: Replace first task flow examples in root and CLI package READMEs with role-free onboarding commands.
    - Out of scope: unrelated refactors not required for "T05: Remove role-theater from README examples".
  Plan: "Edit README.md and packages/agentplane/README.md first task flow sections, keep one deferred roles sentence, and grep for forbidden role flags in those sections."
  Verify Steps: |-
    1. Review the requested outcome for "T05: Remove role-theater from README examples". Expected: the visible result matches ## Summary and stays inside approved scope.
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

T05: Remove role-theater from README examples

Replace first task flow examples in root and CLI package READMEs with role-free onboarding commands.

## Scope

- In scope: Replace first task flow examples in root and CLI package READMEs with role-free onboarding commands.
- Out of scope: unrelated refactors not required for "T05: Remove role-theater from README examples".

## Plan

Edit README.md and packages/agentplane/README.md first task flow sections, keep one deferred roles sentence, and grep for forbidden role flags in those sections.

## Verify Steps

1. Review the requested outcome for "T05: Remove role-theater from README examples". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
