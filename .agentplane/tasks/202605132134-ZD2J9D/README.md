---
id: "202605132134-ZD2J9D"
title: "Hide non-actionable group roots in generated CLI docs (issue #3656)"
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
  - "docgen"
task_kind: "code"
mutation_scope: "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T07:59:17.401Z"
  updated_by: "ORCHESTRATOR"
  note: "Covered by 202605140709-5H7BAA v0.6 readiness integration and release smoke verification."
verification:
  state: "ok"
  updated_at: "2026-05-14T07:59:46.597Z"
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
    at: "2026-05-14T07:59:17.981Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Covered by 202605140709-5H7BAA v0.6 readiness integration."
  -
    type: "verify"
    at: "2026-05-14T07:59:46.597Z"
    author: "CODER"
    state: "ok"
    note: "Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed."
  -
    type: "status"
    at: "2026-05-14T09:08:16.886Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: merged via PR #3694 after full v0.6 readiness checks and GitHub CI passed."
doc_version: 3
doc_updated_at: "2026-05-14T09:08:16.888Z"
doc_updated_by: "INTEGRATOR"
description: |-
  GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3656
  
  Summary: generated user CLI reference includes group roots when dispatcher arg is optional but not variadic (e.g. task doc / task verify).
  
  Acceptance criteria (from issue):
  - Non-variadic optional subcommand dispatchers are classified as group roots when they have child commands.
  - Generated user CLI reference excludes those roots while preserving actionable child commands.
  - Regression coverage includes at least one non-variadic dispatcher such as task doc or task verify.
  
  Pointers: packages/agentplane/src/cli/spec/docs-render.ts; review discussion linked in issue.
sections:
  Summary: |-
    Hide non-actionable group roots in generated CLI docs (issue #3656)
    
    GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3656
    
    Summary: generated user CLI reference includes group roots when dispatcher arg is optional but not variadic (e.g. task doc / task verify).
    
    Acceptance criteria (from issue):
    - Non-variadic optional subcommand dispatchers are classified as group roots when they have child commands.
    - Generated user CLI reference excludes those roots while preserving actionable child commands.
    - Regression coverage includes at least one non-variadic dispatcher such as task doc or task verify.
    
    Pointers: packages/agentplane/src/cli/spec/docs-render.ts; review discussion linked in issue.
  Scope: |-
    - In scope: GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3656 Summary: generated user CLI reference includes group roots when dispatcher arg is optional but not variadic (e.g. task doc / task verify). Acceptance criteria (from issue): - Non-variadic optional subcommand dispatchers are classified as group roots when they have child commands. - Generated user CLI reference excludes those roots while preserving actionable child commands. - Regression coverage includes at least one non-variadic dispatcher such as task doc or task verify. Pointers: packages/agentplane/src/cli/spec/docs-render.ts; review discussion linked in issue.
    - Out of scope: unrelated refactors not required for "Hide non-actionable group roots in generated CLI docs (issue #3656)".
  Plan: |-
    1. Implement the change for "Hide non-actionable group roots in generated CLI docs (issue #3656)".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T07:59:46.597Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T07:59:17.981Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605140709-5H7BAA-v06-readiness-blockers/.agentplane/tasks/202605132134-ZD2J9D/blueprint/resolved-snapshot.json
    - old_digest: 9382f1a2e66c7babfad73a8ba9566629677fe337b835b5e7e754469980d54202
    - current_digest: 9382f1a2e66c7babfad73a8ba9566629677fe337b835b5e7e754469980d54202
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605132134-ZD2J9D
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Hide non-actionable group roots in generated CLI docs (issue #3656)

GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3656

Summary: generated user CLI reference includes group roots when dispatcher arg is optional but not variadic (e.g. task doc / task verify).

Acceptance criteria (from issue):
- Non-variadic optional subcommand dispatchers are classified as group roots when they have child commands.
- Generated user CLI reference excludes those roots while preserving actionable child commands.
- Regression coverage includes at least one non-variadic dispatcher such as task doc or task verify.

Pointers: packages/agentplane/src/cli/spec/docs-render.ts; review discussion linked in issue.

## Scope

- In scope: GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3656 Summary: generated user CLI reference includes group roots when dispatcher arg is optional but not variadic (e.g. task doc / task verify). Acceptance criteria (from issue): - Non-variadic optional subcommand dispatchers are classified as group roots when they have child commands. - Generated user CLI reference excludes those roots while preserving actionable child commands. - Regression coverage includes at least one non-variadic dispatcher such as task doc or task verify. Pointers: packages/agentplane/src/cli/spec/docs-render.ts; review discussion linked in issue.
- Out of scope: unrelated refactors not required for "Hide non-actionable group roots in generated CLI docs (issue #3656)".

## Plan

1. Implement the change for "Hide non-actionable group roots in generated CLI docs (issue #3656)".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T07:59:46.597Z — VERIFY — ok

By: CODER

Note: Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T07:59:17.981Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605140709-5H7BAA-v06-readiness-blockers/.agentplane/tasks/202605132134-ZD2J9D/blueprint/resolved-snapshot.json
- old_digest: 9382f1a2e66c7babfad73a8ba9566629677fe337b835b5e7e754469980d54202
- current_digest: 9382f1a2e66c7babfad73a8ba9566629677fe337b835b5e7e754469980d54202
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605132134-ZD2J9D

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
