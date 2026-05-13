---
id: "202605132134-E6RDJG"
title: "Fix evaluator root-resolution error surfacing (issue #3655)"
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
doc_updated_at: "2026-05-13T21:34:16.027Z"
doc_updated_by: "CODER"
description: |-
  GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3655
  
  Summary: evaluator list/show can swallow resolveProject failures and silently fall back to builtin-only mode, hiding project evaluators from .agentplane/evaluators/*.md.
  
  Acceptance criteria (from issue):
  - Running evaluator commands from a repository subdirectory can locate the project root or emits an explicit root-resolution error.
  - Builtin-only fallback is used only for intentional no-project contexts, not for swallowed resolveProject failures.
  - Regression coverage verifies project evaluator IDs remain visible from subdirectories or fail with a clear diagnostic.
  
  Pointers: packages/agentplane/src/commands/evaluator/evaluator.command.ts; review discussion linked in issue.
sections:
  Summary: |-
    Fix evaluator root-resolution error surfacing (issue #3655)
    
    GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3655
    
    Summary: evaluator list/show can swallow resolveProject failures and silently fall back to builtin-only mode, hiding project evaluators from .agentplane/evaluators/*.md.
    
    Acceptance criteria (from issue):
    - Running evaluator commands from a repository subdirectory can locate the project root or emits an explicit root-resolution error.
    - Builtin-only fallback is used only for intentional no-project contexts, not for swallowed resolveProject failures.
    - Regression coverage verifies project evaluator IDs remain visible from subdirectories or fail with a clear diagnostic.
    
    Pointers: packages/agentplane/src/commands/evaluator/evaluator.command.ts; review discussion linked in issue.
  Scope: |-
    - In scope: GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3655 Summary: evaluator list/show can swallow resolveProject failures and silently fall back to builtin-only mode, hiding project evaluators from .agentplane/evaluators/*.md. Acceptance criteria (from issue): - Running evaluator commands from a repository subdirectory can locate the project root or emits an explicit root-resolution error. - Builtin-only fallback is used only for intentional no-project contexts, not for swallowed resolveProject failures. - Regression coverage verifies project evaluator IDs remain visible from subdirectories or fail with a clear diagnostic. Pointers: packages/agentplane/src/commands/evaluator/evaluator.command.ts; review discussion linked in issue.
    - Out of scope: unrelated refactors not required for "Fix evaluator root-resolution error surfacing (issue #3655)".
  Plan: |-
    1. Implement the change for "Fix evaluator root-resolution error surfacing (issue #3655)".
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

Fix evaluator root-resolution error surfacing (issue #3655)

GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3655

Summary: evaluator list/show can swallow resolveProject failures and silently fall back to builtin-only mode, hiding project evaluators from .agentplane/evaluators/*.md.

Acceptance criteria (from issue):
- Running evaluator commands from a repository subdirectory can locate the project root or emits an explicit root-resolution error.
- Builtin-only fallback is used only for intentional no-project contexts, not for swallowed resolveProject failures.
- Regression coverage verifies project evaluator IDs remain visible from subdirectories or fail with a clear diagnostic.

Pointers: packages/agentplane/src/commands/evaluator/evaluator.command.ts; review discussion linked in issue.

## Scope

- In scope: GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3655 Summary: evaluator list/show can swallow resolveProject failures and silently fall back to builtin-only mode, hiding project evaluators from .agentplane/evaluators/*.md. Acceptance criteria (from issue): - Running evaluator commands from a repository subdirectory can locate the project root or emits an explicit root-resolution error. - Builtin-only fallback is used only for intentional no-project contexts, not for swallowed resolveProject failures. - Regression coverage verifies project evaluator IDs remain visible from subdirectories or fail with a clear diagnostic. Pointers: packages/agentplane/src/commands/evaluator/evaluator.command.ts; review discussion linked in issue.
- Out of scope: unrelated refactors not required for "Fix evaluator root-resolution error surfacing (issue #3655)".

## Plan

1. Implement the change for "Fix evaluator root-resolution error surfacing (issue #3655)".
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
