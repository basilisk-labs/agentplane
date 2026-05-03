---
id: "202605031255-H9WWA0"
title: "Add WORKFLOW.md v2 schema and managed front matter writer"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-03T12:56:51.676Z"
doc_updated_by: "PLANNER"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
