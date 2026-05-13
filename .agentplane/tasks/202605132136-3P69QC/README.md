---
id: "202605132136-3P69QC"
title: "Fix evaluator builtin toggle actually disables builtin entries (issue #3657)"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "cli"
  - "code"
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
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-13T21:36:10.744Z"
doc_updated_by: "CODER"
description: |-
  GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3657
  
  Summary: Evaluator catalog builtin toggle is advertised but cannot actually disable builtin entries (boolean opt default true + no negated form).
  
  Acceptance criteria (from issue):
  - A documented CLI option can produce a project-only evaluator catalog.
  - Parser/spec supports the false state explicitly (negated flag or enum-style source selector).
  - Regression coverage proves builtin entries are omitted when project-only mode is requested.
  
  Pointers: packages/agentplane/src/commands/evaluator/evaluator.spec.ts; PR #3652 review discussion linked in issue.
sections:
  Summary: |-
    Fix evaluator builtin toggle actually disables builtin entries (issue #3657)
    
    GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3657
    
    Summary: Evaluator catalog builtin toggle is advertised but cannot actually disable builtin entries (boolean opt default true + no negated form).
    
    Acceptance criteria (from issue):
    - A documented CLI option can produce a project-only evaluator catalog.
    - Parser/spec supports the false state explicitly (negated flag or enum-style source selector).
    - Regression coverage proves builtin entries are omitted when project-only mode is requested.
    
    Pointers: packages/agentplane/src/commands/evaluator/evaluator.spec.ts; PR #3652 review discussion linked in issue.
  Scope: |-
    - In scope: GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3657 Summary: Evaluator catalog builtin toggle is advertised but cannot actually disable builtin entries (boolean opt default true + no negated form). Acceptance criteria (from issue): - A documented CLI option can produce a project-only evaluator catalog. - Parser/spec supports the false state explicitly (negated flag or enum-style source selector). - Regression coverage proves builtin entries are omitted when project-only mode is requested. Pointers: packages/agentplane/src/commands/evaluator/evaluator.spec.ts; PR #3652 review discussion linked in issue.
    - Out of scope: unrelated refactors not required for "Fix evaluator builtin toggle actually disables builtin entries (issue #3657)".
  Plan: |-
    1. Implement the change for "Fix evaluator builtin toggle actually disables builtin entries (issue #3657)".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
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

Fix evaluator builtin toggle actually disables builtin entries (issue #3657)

GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3657

Summary: Evaluator catalog builtin toggle is advertised but cannot actually disable builtin entries (boolean opt default true + no negated form).

Acceptance criteria (from issue):
- A documented CLI option can produce a project-only evaluator catalog.
- Parser/spec supports the false state explicitly (negated flag or enum-style source selector).
- Regression coverage proves builtin entries are omitted when project-only mode is requested.

Pointers: packages/agentplane/src/commands/evaluator/evaluator.spec.ts; PR #3652 review discussion linked in issue.

## Scope

- In scope: GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3657 Summary: Evaluator catalog builtin toggle is advertised but cannot actually disable builtin entries (boolean opt default true + no negated form). Acceptance criteria (from issue): - A documented CLI option can produce a project-only evaluator catalog. - Parser/spec supports the false state explicitly (negated flag or enum-style source selector). - Regression coverage proves builtin entries are omitted when project-only mode is requested. Pointers: packages/agentplane/src/commands/evaluator/evaluator.spec.ts; PR #3652 review discussion linked in issue.
- Out of scope: unrelated refactors not required for "Fix evaluator builtin toggle actually disables builtin entries (issue #3657)".

## Plan

1. Implement the change for "Fix evaluator builtin toggle actually disables builtin entries (issue #3657)".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

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
