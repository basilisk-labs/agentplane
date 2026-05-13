---
id: "202605131125-68KKFW"
title: "Split human and agent CLI output"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T11:26:31.531Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved CLI presentation split in the task worktree. Scope is limited to output-mode detection, focused formatting helpers, and targeted verification for agentplane versus ap output."
events:
  -
    type: "status"
    at: "2026-05-13T11:26:54.888Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved CLI presentation split in the task worktree. Scope is limited to output-mode detection, focused formatting helpers, and targeted verification for agentplane versus ap output."
doc_version: 3
doc_updated_at: "2026-05-13T11:26:54.888Z"
doc_updated_by: "CODER"
description: "Make the long-form agentplane command render a cleaner human-oriented output with spacing, alignment, and color while keeping the short ap command minimal and unstyled for agent consumption."
sections:
  Summary: |-
    Split human and agent CLI output
    
    Make the long-form agentplane command render a cleaner human-oriented output with spacing, alignment, and color while keeping the short ap command minimal and unstyled for agent consumption.
  Scope: |-
    - In scope: Make the long-form agentplane command render a cleaner human-oriented output with spacing, alignment, and color while keeping the short ap command minimal and unstyled for agent consumption.
    - Out of scope: unrelated refactors not required for "Split human and agent CLI output".
  Plan: |-
    1. Locate the CLI invocation/output formatting layer and identify how `agentplane` and `ap` entrypoints differ at runtime.
    2. Add a small output-mode decision so `agentplane` uses human-oriented spacing/alignment/color and `ap` stays plain/minimal for agents.
    3. Update focused tests or snapshots that assert the two output contracts.
    4. Run task Verify Steps plus targeted CLI checks; record evidence before integration.
  Verify Steps: |-
    1. Run `ap task verify-show 202605131125-68KKFW`. Expected: the task verification contract is readable and has no unresolved setup blockers.
    2. Run focused CLI output tests covering `agentplane` and `ap` entrypoints. Expected: `agentplane` output contains human formatting while `ap` output remains plain/minimal.
    3. Run the relevant package typecheck/lint or exact-file checks for touched CLI code. Expected: no regressions in touched scope.
    4. Manually compare sample `agentplane` and `ap` command output. Expected: same semantic information, different presentation layer only.
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

Split human and agent CLI output

Make the long-form agentplane command render a cleaner human-oriented output with spacing, alignment, and color while keeping the short ap command minimal and unstyled for agent consumption.

## Scope

- In scope: Make the long-form agentplane command render a cleaner human-oriented output with spacing, alignment, and color while keeping the short ap command minimal and unstyled for agent consumption.
- Out of scope: unrelated refactors not required for "Split human and agent CLI output".

## Plan

1. Locate the CLI invocation/output formatting layer and identify how `agentplane` and `ap` entrypoints differ at runtime.
2. Add a small output-mode decision so `agentplane` uses human-oriented spacing/alignment/color and `ap` stays plain/minimal for agents.
3. Update focused tests or snapshots that assert the two output contracts.
4. Run task Verify Steps plus targeted CLI checks; record evidence before integration.

## Verify Steps

1. Run `ap task verify-show 202605131125-68KKFW`. Expected: the task verification contract is readable and has no unresolved setup blockers.
2. Run focused CLI output tests covering `agentplane` and `ap` entrypoints. Expected: `agentplane` output contains human formatting while `ap` output remains plain/minimal.
3. Run the relevant package typecheck/lint or exact-file checks for touched CLI code. Expected: no regressions in touched scope.
4. Manually compare sample `agentplane` and `ap` command output. Expected: same semantic information, different presentation layer only.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
