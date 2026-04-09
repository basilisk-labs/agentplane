---
id: "202604092201-C3ZHCX"
title: "Allow cleanup merged to fetch origin before candidate resolution"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "git"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T22:02:12.009Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T22:16:42.206Z"
  updated_by: "CODER"
  note: "Refreshed CLI reference after adding cleanup merged fetch mode; targeted cleanup merged tests remain green."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add explicit fetch/prune mode to cleanup merged."
events:
  -
    type: "status"
    at: "2026-04-09T22:02:12.998Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add explicit fetch/prune mode to cleanup merged."
  -
    type: "verify"
    at: "2026-04-09T22:14:04.867Z"
    author: "CODER"
    state: "ok"
    note: "Added explicit fetch/prune mode to cleanup merged and covered stale origin ref behavior under default and fetch-enabled runs."
  -
    type: "verify"
    at: "2026-04-09T22:16:42.206Z"
    author: "CODER"
    state: "ok"
    note: "Refreshed CLI reference after adding cleanup merged fetch mode; targeted cleanup merged tests remain green."
doc_version: 3
doc_updated_at: "2026-04-09T22:16:42.209Z"
doc_updated_by: "CODER"
description: "Add an explicit fetch/prune option to cleanup merged so operators can refresh origin state before local and remote cleanup decisions."
sections:
  Summary: |-
    Allow cleanup merged to fetch origin before candidate resolution
    
    Add an explicit fetch/prune option to cleanup merged so operators can refresh origin state before local and remote cleanup decisions.
  Scope: |-
    - In scope: Add an explicit fetch/prune option to cleanup merged so operators can refresh origin state before local and remote cleanup decisions.
    - Out of scope: unrelated refactors not required for "Allow cleanup merged to fetch origin before candidate resolution".
  Plan: "1. Add an opt-in fetch/prune mode to cleanup merged before candidate resolution. 2. Keep default behavior network-free. 3. Cover fetch-enabled and default flows in tests."
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. <Action>. Expected: <observable result>.
    2. <Action>. Expected: <observable result>.
    3. <Action>. Expected: <observable result>.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T22:14:04.867Z — VERIFY — ok
    
    By: CODER
    
    Note: Added explicit fetch/prune mode to cleanup merged and covered stale origin ref behavior under default and fetch-enabled runs.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T22:02:13.004Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    ### 2026-04-09T22:16:42.206Z — VERIFY — ok
    
    By: CODER
    
    Note: Refreshed CLI reference after adding cleanup merged fetch mode; targeted cleanup merged tests remain green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T22:14:04.869Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Allow cleanup merged to fetch origin before candidate resolution

Add an explicit fetch/prune option to cleanup merged so operators can refresh origin state before local and remote cleanup decisions.

## Scope

- In scope: Add an explicit fetch/prune option to cleanup merged so operators can refresh origin state before local and remote cleanup decisions.
- Out of scope: unrelated refactors not required for "Allow cleanup merged to fetch origin before candidate resolution".

## Plan

1. Add an opt-in fetch/prune mode to cleanup merged before candidate resolution. 2. Keep default behavior network-free. 3. Cover fetch-enabled and default flows in tests.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T22:14:04.867Z — VERIFY — ok

By: CODER

Note: Added explicit fetch/prune mode to cleanup merged and covered stale origin ref behavior under default and fetch-enabled runs.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T22:02:13.004Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

### 2026-04-09T22:16:42.206Z — VERIFY — ok

By: CODER

Note: Refreshed CLI reference after adding cleanup merged fetch mode; targeted cleanup merged tests remain green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T22:14:04.869Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
