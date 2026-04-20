---
id: "202604200907-3C8KVB"
title: "Extract shared runner adapter base helpers"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T09:07:24.575Z"
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
    body: "Start: Extract common runner adapter base helpers for shared validation and supervision persistence while keeping adapter-specific execution semantics intact."
events:
  -
    type: "status"
    at: "2026-04-20T09:07:36.283Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract common runner adapter base helpers for shared validation and supervision persistence while keeping adapter-specific execution semantics intact."
doc_version: 3
doc_updated_at: "2026-04-20T09:07:36.309Z"
doc_updated_by: "CODER"
description: "Continue C-prime adapter decomposition by moving duplicated Codex/custom runner adapter validation, supervision state updates, and event append helpers into a shared runner adapter base module while preserving adapter-specific command and manifest behavior."
sections:
  Summary: |-
    Extract shared runner adapter base helpers
    
    Continue C-prime adapter decomposition by moving duplicated Codex/custom runner adapter validation, supervision state updates, and event append helpers into a shared runner adapter base module while preserving adapter-specific command and manifest behavior.
  Scope: |-
    - In scope: Continue C-prime adapter decomposition by moving duplicated Codex/custom runner adapter validation, supervision state updates, and event append helpers into a shared runner adapter base module while preserving adapter-specific command and manifest behavior.
    - Out of scope: unrelated refactors not required for "Extract shared runner adapter base helpers".
  Plan: |-
    1. Add runner/adapters/base.ts with common bundle/invocation assertions and run-state/event helpers shared by Codex and custom adapters.
    2. Replace duplicated validation and supervision persistence code in codex.ts and custom.ts with the shared helpers.
    3. Preserve adapter-specific argv/env construction, result manifest merge semantics, and user-facing summaries.
    4. Run focused adapter tests plus typecheck/lint/format/bootstrap, record evidence, commit, and finish.
  Verify Steps: |-
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

Extract shared runner adapter base helpers

Continue C-prime adapter decomposition by moving duplicated Codex/custom runner adapter validation, supervision state updates, and event append helpers into a shared runner adapter base module while preserving adapter-specific command and manifest behavior.

## Scope

- In scope: Continue C-prime adapter decomposition by moving duplicated Codex/custom runner adapter validation, supervision state updates, and event append helpers into a shared runner adapter base module while preserving adapter-specific command and manifest behavior.
- Out of scope: unrelated refactors not required for "Extract shared runner adapter base helpers".

## Plan

1. Add runner/adapters/base.ts with common bundle/invocation assertions and run-state/event helpers shared by Codex and custom adapters.
2. Replace duplicated validation and supervision persistence code in codex.ts and custom.ts with the shared helpers.
3. Preserve adapter-specific argv/env construction, result manifest merge semantics, and user-facing summaries.
4. Run focused adapter tests plus typecheck/lint/format/bootstrap, record evidence, commit, and finish.

## Verify Steps

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
