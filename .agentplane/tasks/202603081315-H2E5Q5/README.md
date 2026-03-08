---
id: "202603081315-H2E5Q5"
title: "Fix literal newline escaping in task README sections"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on:
  - "202603081315-NV76YZ"
tags:
  - "code"
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
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-03-08T13:15:48.571Z"
doc_updated_by: "CODER"
description: "Find why some task README sections render literal \\n sequences instead of actual line breaks, then fix the write path and normalize affected examples or fixtures."
id_source: "generated"
---
## Summary

Fix literal newline escaping in task README sections

Find why some task README sections render literal \n sequences instead of actual line breaks, then fix the write path and normalize affected examples or fixtures.

## Scope

- In scope: Find why some task README sections render literal \n sequences instead of actual line breaks, then fix the write path and normalize affected examples or fixtures..
- Out of scope: unrelated refactors not required for "Fix literal newline escaping in task README sections".

## Plan

1. Implement the change for "Fix literal newline escaping in task README sections".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
