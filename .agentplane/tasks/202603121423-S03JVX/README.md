---
id: "202603121423-S03JVX"
title: "Normalize escaped multiline task text"
result_summary: "normalize escaped multiline task text"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T14:51:19.847Z"
  updated_by: "ORCHESTRATOR"
  note: "Proceed with a shared inline-text normalization fix only."
verification:
  state: "ok"
  updated_at: "2026-03-12T14:58:27.185Z"
  updated_by: "CODER"
  note: "Inline task text now decodes escaped newlines consistently across doc and plan writes; unit, command, CLI, help, docs, lint, and both builds passed."
commit:
  hash: "e73886e5a6574c3a50f37b5adff987497013b656"
  message: "🚧 S03JVX task: normalize escaped multiline task text"
comments:
  -
    author: "CODER"
    body: "Start: normalize escaped multiline inline text for task doc and plan commands."
  -
    author: "CODER"
    body: "Verified: inline task text now decodes escaped newlines consistently across task doc and task plan writes, and help/docs describe the contract explicitly."
events:
  -
    type: "status"
    at: "2026-03-12T14:51:29.497Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: normalize escaped multiline inline text for task doc and plan commands."
  -
    type: "verify"
    at: "2026-03-12T14:58:27.185Z"
    author: "CODER"
    state: "ok"
    note: "Inline task text now decodes escaped newlines consistently across doc and plan writes; unit, command, CLI, help, docs, lint, and both builds passed."
  -
    type: "status"
    at: "2026-03-12T14:58:55.401Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: inline task text now decodes escaped newlines consistently across task doc and task plan writes, and help/docs describe the contract explicitly."
doc_version: 3
doc_updated_at: "2026-03-12T14:58:55.401Z"
doc_updated_by: "CODER"
description: "Unify inline --text handling for task doc/plan commands so literal \\n sequences follow the documented multiline contract instead of being written verbatim."
id_source: "generated"
---
## Summary

Normalize escaped multiline task text

Unify inline --text handling for task doc/plan commands so literal \n sequences follow the documented multiline contract instead of being written verbatim.

## Scope

- In scope: Unify inline --text handling for task doc/plan commands so literal \n sequences follow the documented multiline contract instead of being written verbatim.
- Out of scope: unrelated refactors not required for "Normalize escaped multiline task text".

## Plan

1. Add one shared inline-text normalization path for task README mutations so literal escaped newlines in CLI `--text` payloads become real line breaks.
2. Apply the helper to task doc/plan text entry points, align help/examples with the supported contract, and avoid changing file-based input semantics.
3. Verify with focused command/unit/CLI regressions plus lint and both package builds, then record the normalized input contract in task findings.

## Verify Steps

1. Run focused regressions for inline `--text` normalization in task doc/plan flows. Expected: literal escaped newlines become real line breaks, while file input stays unchanged.
2. Run lint on touched task command/spec/test files. Expected: no new lint violations.
3. Build @agentplaneorg/core and agentplane after the input-normalization change. Expected: both builds succeed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T14:58:27.185Z — VERIFY — ok

By: CODER

Note: Inline task text now decodes escaped newlines consistently across doc and plan writes; unit, command, CLI, help, docs, lint, and both builds passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T14:58:21.457Z, excerpt_hash=sha256:cdc2a149e010bbdf8f83b312efe4a20ade6001a513ded5be14f4ea0d002205d8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. Root cause: inline `--text` flows treated shell-passed `
` literally, while nearby scaffold/migration code already had partial newline-decoding logic with inconsistent heuristics.
2. A shared task-doc helper now decodes escaped newline sequences for inline task text, and `task doc set` plus `task plan set` apply it only to `--text` input, not to file content.
3. Help/generated CLI docs now state this contract explicitly, and regressions cover unit, command-level, CLI, and help-doc sync paths.
