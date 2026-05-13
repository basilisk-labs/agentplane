---
id: "202605132134-ZD2J9D"
title: "Hide non-actionable group roots in generated CLI docs (issue #3656)"
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
  - "docgen"
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
doc_updated_at: "2026-05-13T21:34:46.127Z"
doc_updated_by: "CODER"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
