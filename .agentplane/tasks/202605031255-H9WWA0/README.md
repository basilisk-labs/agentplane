---
id: "202605031255-H9WWA0"
title: "Add WORKFLOW.md v2 schema and managed front matter writer"
result_summary: "WORKFLOW.md v2 schema and managed front matter writer are implemented."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605031255-GV0N4K"
tags:
  - "code"
  - "config"
  - "workflow"
verify:
  - "bun test packages/agentplane/src/workflow-runtime"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T12:57:41.690Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T13:28:11.106Z"
  updated_by: "CODER"
  note: "Implemented packages/core/src/config/workflow-file.ts and v2 front matter validation; covered by config and workflow-runtime tests."
commit:
  hash: "c02111e054b00ac06e7277733a65e88cbb557391"
  message: "✅ GV0N4K close: Merged via PR #814. (202605031255-GV0N4K) [config,docs,workflow] (#817)"
comments:
  -
    author: "CODER"
    body: "Start: Implemented WORKFLOW.md v2 front matter schema support and a managed YAML front matter writer in the core config layer."
  -
    author: "CODER"
    body: "Verified: WORKFLOW v2 schema/front matter writer is merged through PR #814 and covered by config/workflow-runtime tests."
events:
  -
    type: "status"
    at: "2026-05-03T13:28:10.702Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implemented WORKFLOW.md v2 front matter schema support and a managed YAML front matter writer in the core config layer."
  -
    type: "verify"
    at: "2026-05-03T13:28:11.106Z"
    author: "CODER"
    state: "ok"
    note: "Implemented packages/core/src/config/workflow-file.ts and v2 front matter validation; covered by config and workflow-runtime tests."
  -
    type: "status"
    at: "2026-05-03T13:40:26.715Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: WORKFLOW v2 schema/front matter writer is merged through PR #814 and covered by config/workflow-runtime tests."
doc_version: 3
doc_updated_at: "2026-05-03T13:40:26.716Z"
doc_updated_by: "CODER"
description: "Implement the typed WORKFLOW.md v2 front matter schema, parser, serializer, and CLI-owned formatting path for workflow, tasks, workspace, runner, scheduler, evaluator, observability, and prompt_template metadata without changing runtime precedence yet."
sections:
  Summary: |-
    Add WORKFLOW.md v2 schema and managed front matter writer

    Implement the typed WORKFLOW.md v2 front matter schema, parser, serializer, and CLI-owned formatting path for workflow, tasks, workspace, runner, scheduler, evaluator, observability, and prompt_template metadata without changing runtime precedence yet.
  Scope: |-
    - In scope: Implement the typed WORKFLOW.md v2 front matter schema, parser, serializer, and CLI-owned formatting path for workflow, tasks, workspace, runner, scheduler, evaluator, observability, and prompt_template metadata without changing runtime precedence yet.
    - Out of scope: unrelated refactors not required for "Add WORKFLOW.md v2 schema and managed front matter writer".
  Plan: "Implement WORKFLOW.md v2 schema, parser, serializer, and managed YAML front matter writer. Do not switch runtime precedence in this task. Acceptance: valid/invalid v2 fixtures are covered, markdown body is preserved, front matter formatting is CLI-owned, and v1 behavior remains compatible."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/workflow-runtime`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T13:28:11.106Z — VERIFY — ok

    By: CODER

    Note: Implemented packages/core/src/config/workflow-file.ts and v2 front matter validation; covered by config and workflow-runtime tests.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:28:10.702Z, excerpt_hash=sha256:de8cd1593f93100da4fe4df9cc83bd719895beb114580cd2f4c08acfaaa87a5e

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add WORKFLOW.md v2 schema and managed front matter writer

Implement the typed WORKFLOW.md v2 front matter schema, parser, serializer, and CLI-owned formatting path for workflow, tasks, workspace, runner, scheduler, evaluator, observability, and prompt_template metadata without changing runtime precedence yet.

## Scope

- In scope: Implement the typed WORKFLOW.md v2 front matter schema, parser, serializer, and CLI-owned formatting path for workflow, tasks, workspace, runner, scheduler, evaluator, observability, and prompt_template metadata without changing runtime precedence yet.
- Out of scope: unrelated refactors not required for "Add WORKFLOW.md v2 schema and managed front matter writer".

## Plan

Implement WORKFLOW.md v2 schema, parser, serializer, and managed YAML front matter writer. Do not switch runtime precedence in this task. Acceptance: valid/invalid v2 fixtures are covered, markdown body is preserved, front matter formatting is CLI-owned, and v1 behavior remains compatible.

## Verify Steps

1. Run `bun test packages/agentplane/src/workflow-runtime`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T13:28:11.106Z — VERIFY — ok

By: CODER

Note: Implemented packages/core/src/config/workflow-file.ts and v2 front matter validation; covered by config and workflow-runtime tests.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:28:10.702Z, excerpt_hash=sha256:de8cd1593f93100da4fe4df9cc83bd719895beb114580cd2f4c08acfaaa87a5e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
