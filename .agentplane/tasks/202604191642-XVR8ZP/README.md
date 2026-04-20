---
id: "202604191642-XVR8ZP"
title: "Prune duplicate and obsolete package scripts"
result_summary: "Superseded by completed redundant platform-critical package script cleanup."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "tooling"
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
commit:
  hash: "f5a4cf30b5cf9dee8135cf0be7c27bf8326eedf5"
  message: "cli/tooling: Drop redundant platform-critical init-upgrade alias (MQ7NQ5) (#418)"
comments:
  -
    author: "CODER"
    body: "Verified: superseded by completed package-script cleanup task 202604171519-MQ7NQ5; duplicate script is absent in current package.json."
events:
  -
    type: "status"
    at: "2026-04-20T10:47:05.352Z"
    author: "CODER"
    from: "TODO"
    to: "DONE"
    note: "Verified: superseded by completed package-script cleanup task 202604171519-MQ7NQ5; duplicate script is absent in current package.json."
doc_version: 3
doc_updated_at: "2026-04-20T10:47:05.353Z"
doc_updated_by: "CODER"
description: "Epic F′. Remove duplicate or obsolete npm scripts after consolidating the script runtime."
sections:
  Summary: |-
    Prune duplicate and obsolete package scripts
    
    Epic F′. Remove duplicate or obsolete npm scripts after consolidating the script runtime.
  Scope: |-
    - In scope: Epic F′. Remove duplicate or obsolete npm scripts after consolidating the script runtime.
    - Out of scope: unrelated refactors not required for "Prune duplicate and obsolete package scripts".
  Plan: |-
    1. Implement the change for "Prune duplicate and obsolete package scripts".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
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

Prune duplicate and obsolete package scripts

Epic F′. Remove duplicate or obsolete npm scripts after consolidating the script runtime.

## Scope

- In scope: Epic F′. Remove duplicate or obsolete npm scripts after consolidating the script runtime.
- Out of scope: unrelated refactors not required for "Prune duplicate and obsolete package scripts".

## Plan

1. Implement the change for "Prune duplicate and obsolete package scripts".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

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
