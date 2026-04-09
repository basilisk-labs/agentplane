---
id: "202604091725-CB0Y6S"
title: "Run real pre-push hook via hooks run pre-push"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "hooks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T17:26:10.232Z"
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
    body: "Start: replace the current no-op hooks run pre-push path with real script execution so local pre-push validation actually exercises the repo gate before network pushes."
events:
  -
    type: "status"
    at: "2026-04-09T17:26:25.057Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace the current no-op hooks run pre-push path with real script execution so local pre-push validation actually exercises the repo gate before network pushes."
doc_version: 3
doc_updated_at: "2026-04-09T17:26:25.078Z"
doc_updated_by: "CODER"
description: "Make `agentplane hooks run pre-push` execute the actual pre-push script instead of returning success immediately, with regression coverage for script dispatch."
sections:
  Summary: |-
    Run real pre-push hook via hooks run pre-push
    
    Make `agentplane hooks run pre-push` execute the actual pre-push script instead of returning success immediately, with regression coverage for script dispatch.
  Scope: |-
    - In scope: Make `agentplane hooks run pre-push` execute the actual pre-push script instead of returning success immediately, with regression coverage for script dispatch.
    - Out of scope: unrelated refactors not required for "Run real pre-push hook via hooks run pre-push".
  Plan: "1. Make hooks run pre-push dispatch the real pre-push hook script with stdin passthrough and exit-code propagation. 2. Add regression coverage proving the command invokes the same script path instead of returning success immediately. 3. Verify with targeted tests and lint for hooks command and pre-push script coverage."
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. <Action>. Expected: <observable result>.
    2. <Action>. Expected: <observable result>.
    3. <Action>. Expected: <observable result>.
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

Run real pre-push hook via hooks run pre-push

Make `agentplane hooks run pre-push` execute the actual pre-push script instead of returning success immediately, with regression coverage for script dispatch.

## Scope

- In scope: Make `agentplane hooks run pre-push` execute the actual pre-push script instead of returning success immediately, with regression coverage for script dispatch.
- Out of scope: unrelated refactors not required for "Run real pre-push hook via hooks run pre-push".

## Plan

1. Make hooks run pre-push dispatch the real pre-push hook script with stdin passthrough and exit-code propagation. 2. Add regression coverage proving the command invokes the same script path instead of returning success immediately. 3. Verify with targeted tests and lint for hooks command and pre-push script coverage.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
