---
id: "202605132136-3P69QC"
title: "Fix evaluator builtin toggle actually disables builtin entries (issue #3657)"
result_summary: "Merged to main in PR #3694; v0.6 readiness and assimilation checks passed."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 5
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
  state: "approved"
  updated_at: "2026-05-14T07:59:18.588Z"
  updated_by: "ORCHESTRATOR"
  note: "Covered by 202605140709-5H7BAA v0.6 readiness integration and release smoke verification."
verification:
  state: "ok"
  updated_at: "2026-05-14T07:59:47.613Z"
  updated_by: "CODER"
  note: "Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed."
  attempts: 0
commit:
  hash: "ec628cd9a2aa899cca01611be9519181845ba555"
  message: "Merge pull request #3694 from basilisk-labs/task/202605140709-5H7BAA/v06-readiness-blockers"
comments:
  -
    author: "CODER"
    body: "Start: Covered by 202605140709-5H7BAA v0.6 readiness integration."
  -
    author: "INTEGRATOR"
    body: "Verified: merged via PR #3694 after full v0.6 readiness checks and GitHub CI passed."
events:
  -
    type: "status"
    at: "2026-05-14T07:59:19.228Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Covered by 202605140709-5H7BAA v0.6 readiness integration."
  -
    type: "verify"
    at: "2026-05-14T07:59:47.613Z"
    author: "CODER"
    state: "ok"
    note: "Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed."
  -
    type: "status"
    at: "2026-05-14T09:08:41.793Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: merged via PR #3694 after full v0.6 readiness checks and GitHub CI passed."
doc_version: 3
doc_updated_at: "2026-05-14T09:08:41.798Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-05-14T07:59:47.613Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T07:59:19.228Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605140709-5H7BAA-v06-readiness-blockers/.agentplane/tasks/202605132136-3P69QC/blueprint/resolved-snapshot.json
    - old_digest: 2d22d7b97a2883c3d7b34caee367208827000ee0ac007b181175b2b838d5795f
    - current_digest: 2d22d7b97a2883c3d7b34caee367208827000ee0ac007b181175b2b838d5795f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605132136-3P69QC
    
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
### 2026-05-14T07:59:47.613Z — VERIFY — ok

By: CODER

Note: Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T07:59:19.228Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605140709-5H7BAA-v06-readiness-blockers/.agentplane/tasks/202605132136-3P69QC/blueprint/resolved-snapshot.json
- old_digest: 2d22d7b97a2883c3d7b34caee367208827000ee0ac007b181175b2b838d5795f
- current_digest: 2d22d7b97a2883c3d7b34caee367208827000ee0ac007b181175b2b838d5795f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605132136-3P69QC

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
