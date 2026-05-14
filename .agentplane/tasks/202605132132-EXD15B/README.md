---
id: "202605132132-EXD15B"
title: "Fix evaluator builtin toggle (issue #3657)"
result_summary: "Closed as duplicate of 202605132136-3P69QC."
risk_level: "low"
breaking: false
status: "DONE"
priority: "med"
owner: "CODER"
revision: 2
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "cli"
  - "context"
  - "evaluator"
task_kind: "code"
mutation_scope: "code"
verify: []
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
comments:
  -
    author: "ORCHESTRATOR"
    body: |-
      Verified: 202605132132-EXD15B is a bookkeeping duplicate of 202605132136-3P69QC (Fix evaluator builtin toggle actually disables builtin entries (issue #3657)); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Recreated with primary tag allowlist (code) to satisfy task invariants.
events:
  -
    type: "status"
    at: "2026-05-13T21:36:17.263Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: 202605132132-EXD15B is a bookkeeping duplicate of 202605132136-3P69QC (Fix evaluator builtin toggle actually disables builtin entries (issue #3657)); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Recreated with primary tag allowlist (code) to satisfy task invariants.
doc_version: 3
doc_updated_at: "2026-05-13T21:36:17.263Z"
doc_updated_by: "ORCHESTRATOR"
description: |-
  GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3657
  
  Summary: Evaluator catalog builtin toggle is advertised but cannot disable builtin entries because boolean opts default true and parser lacks a negated form.
  
  Acceptance criteria (from issue):
  - A documented CLI option can produce a project-only evaluator catalog.
  - Parser/spec supports the false state explicitly (negated flag or enum source selector).
  - Regression coverage proves builtin entries are omitted in project-only mode.
  
  Pointers: packages/agentplane/src/commands/evaluator/evaluator.spec.ts; review discussion linked in issue.
sections:
  Summary: |-
    Fix evaluator builtin toggle (issue #3657)
    
    GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3657
    
    Summary: Evaluator catalog builtin toggle is advertised but cannot disable builtin entries because boolean opts default true and parser lacks a negated form.
    
    Acceptance criteria (from issue):
    - A documented CLI option can produce a project-only evaluator catalog.
    - Parser/spec supports the false state explicitly (negated flag or enum source selector).
    - Regression coverage proves builtin entries are omitted in project-only mode.
    
    Pointers: packages/agentplane/src/commands/evaluator/evaluator.spec.ts; review discussion linked in issue.
  Scope: |-
    - In scope: GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3657 Summary: Evaluator catalog builtin toggle is advertised but cannot disable builtin entries because boolean opts default true and parser lacks a negated form. Acceptance criteria (from issue): - A documented CLI option can produce a project-only evaluator catalog. - Parser/spec supports the false state explicitly (negated flag or enum source selector). - Regression coverage proves builtin entries are omitted in project-only mode. Pointers: packages/agentplane/src/commands/evaluator/evaluator.spec.ts; review discussion linked in issue.
    - Out of scope: unrelated refactors not required for "Fix evaluator builtin toggle (issue #3657)".
  Plan: |-
    1. Implement the change for "Fix evaluator builtin toggle (issue #3657)".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix evaluator builtin toggle (issue #3657)". Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the requested outcome for "Fix evaluator builtin toggle (issue #3657)". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Fix evaluator builtin toggle (issue #3657)

GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3657

Summary: Evaluator catalog builtin toggle is advertised but cannot disable builtin entries because boolean opts default true and parser lacks a negated form.

Acceptance criteria (from issue):
- A documented CLI option can produce a project-only evaluator catalog.
- Parser/spec supports the false state explicitly (negated flag or enum source selector).
- Regression coverage proves builtin entries are omitted in project-only mode.

Pointers: packages/agentplane/src/commands/evaluator/evaluator.spec.ts; review discussion linked in issue.

## Scope

- In scope: GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3657 Summary: Evaluator catalog builtin toggle is advertised but cannot disable builtin entries because boolean opts default true and parser lacks a negated form. Acceptance criteria (from issue): - A documented CLI option can produce a project-only evaluator catalog. - Parser/spec supports the false state explicitly (negated flag or enum source selector). - Regression coverage proves builtin entries are omitted in project-only mode. Pointers: packages/agentplane/src/commands/evaluator/evaluator.spec.ts; review discussion linked in issue.
- Out of scope: unrelated refactors not required for "Fix evaluator builtin toggle (issue #3657)".

## Plan

1. Implement the change for "Fix evaluator builtin toggle (issue #3657)".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold for "Fix evaluator builtin toggle (issue #3657)". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix evaluator builtin toggle (issue #3657)". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
