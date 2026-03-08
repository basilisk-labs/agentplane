---
id: "202603081422-5XXATM"
title: "Harden task doc set section replacement feedback"
result_summary: "task doc set no longer treats a printed README path as implicit proof that the target section changed."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T14:23:50.323Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T14:27:02.638Z"
  updated_by: "CODER"
  note: "Verified: targeted task doc tests and workflow-level task doc tests pass, lint is clean for the touched task-doc files, and task doc set now reports whether it updated the target section, applied a full-doc update, or produced no effective README change."
commit:
  hash: "6dd360106bd2388305aa69b87609639dcfe31ee3"
  message: "🩺 5XXATM task: clarify task doc set outcomes"
comments:
  -
    author: "CODER"
    body: "Start: reproducing the current task doc set success semantics so I can narrow the fix to explicit outcome reporting around section replacement without changing broader task-doc lifecycle behavior."
  -
    author: "CODER"
    body: "Start: reproduced that task doc set can print a README path without proving what changed in the targeted section, so the fix will add explicit outcome reporting around section replacement versus full-doc or no-op paths."
  -
    author: "CODER"
    body: "Verified: targeted task-doc tests and workflow-level task-doc tests pass, lint is clean for the touched files, and task doc set now reports whether it updated the target section, applied a full-doc update, or made no effective change."
events:
  -
    type: "status"
    at: "2026-03-08T14:23:42.583Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproducing the current task doc set success semantics so I can narrow the fix to explicit outcome reporting around section replacement without changing broader task-doc lifecycle behavior."
  -
    type: "status"
    at: "2026-03-08T14:23:50.905Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: reproduced that task doc set can print a README path without proving what changed in the targeted section, so the fix will add explicit outcome reporting around section replacement versus full-doc or no-op paths."
  -
    type: "verify"
    at: "2026-03-08T14:27:02.638Z"
    author: "CODER"
    state: "ok"
    note: "Verified: targeted task doc tests and workflow-level task doc tests pass, lint is clean for the touched task-doc files, and task doc set now reports whether it updated the target section, applied a full-doc update, or produced no effective README change."
  -
    type: "status"
    at: "2026-03-08T14:27:35.538Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: targeted task-doc tests and workflow-level task-doc tests pass, lint is clean for the touched files, and task doc set now reports whether it updated the target section, applied a full-doc update, or made no effective change."
doc_version: 3
doc_updated_at: "2026-03-08T14:27:35.538Z"
doc_updated_by: "CODER"
description: "Make task doc set detect and report whether a section replacement actually changed the target section, so returning a README path is no longer treated as implicit success when the content was unchanged or the payload took a different write path."
id_source: "generated"
---
## Summary

- Problem: `agentplane task doc set` currently prints the README path even when the targeted section replacement may not have produced the effective change the caller expected.
- Target outcome: the command reports what actually happened to the target section so agents do not mistake a path print for proven success.
- Constraint: keep the write-path behavior compatible with existing task-doc flows and limit scope to feedback/validation around section updates.

## Scope

### In scope
- inspect the current `task doc set` section update path
- add post-write validation or equivalent explicit outcome reporting
- cover the behavior with targeted task-doc tests

### Out of scope
- redesigning the entire task-doc command family
- unrelated README format changes
- new task lifecycle policy changes

## Plan

1. Reproduce the current ambiguous success behavior in the task doc set path.
2. Add explicit outcome reporting that distinguishes section replacement, full-doc update, and no-op writes.
3. Run targeted verification and close the task with traceable commit metadata.

## Verify Steps

1. Run targeted task-doc tests. Expected: section replacement paths still pass and the new outcome reporting is covered.
2. Run `bun run lint:core -- <touched task-doc files>`. Expected: the touched CLI/task-doc files lint cleanly.
3. Exercise `agentplane task doc set` on a controlled task fixture or integration test. Expected: the command no longer reports ambiguous success when the target section did not effectively change.

## Rollback Plan

1. Revert the task-doc feedback commit.
2. Re-run the targeted task-doc tests to confirm the command returns to the prior behavior.

## Findings


## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T14:27:02.638Z — VERIFY — ok

By: CODER

Note: Verified: targeted task doc tests and workflow-level task doc tests pass, lint is clean for the touched task-doc files, and task doc set now reports whether it updated the target section, applied a full-doc update, or produced no effective README change.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T14:23:50.905Z, excerpt_hash=sha256:0e2df81a94da3a0fd8562bd4038ce27d1554bb93eb72918fbab8af8dbd829042

<!-- END VERIFICATION RESULTS -->
