---
id: "202604241136-ESEK2A"
title: "v0.3 freeze B1: migrate remaining legacy prompts to Clack adapter"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "init"
  - "v0.3"
verify:
  - "rg -n 'promptChoice|promptYesNo|promptInput' packages/agentplane/src"
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
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-24T11:36:27.993Z"
doc_updated_by: "CODER"
description: "Move the remaining promptChoice/promptYesNo/promptInput callsites onto the Clack-backed prompt abstraction so init no longer keeps the legacy UI stack alive."
sections:
  Summary: |-
    v0.3 freeze B1: migrate remaining legacy prompts to Clack adapter
    
    Move the remaining promptChoice/promptYesNo/promptInput callsites onto the Clack-backed prompt abstraction so init no longer keeps the legacy UI stack alive.
  Scope: |-
    - In scope: Move the remaining promptChoice/promptYesNo/promptInput callsites onto the Clack-backed prompt abstraction so init no longer keeps the legacy UI stack alive.
    - Out of scope: unrelated refactors not required for "v0.3 freeze B1: migrate remaining legacy prompts to Clack adapter".
  Plan: |-
    1. Implement the change for "v0.3 freeze B1: migrate remaining legacy prompts to Clack adapter".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "v0.3 freeze B1: migrate remaining legacy prompts to Clack adapter". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

v0.3 freeze B1: migrate remaining legacy prompts to Clack adapter

Move the remaining promptChoice/promptYesNo/promptInput callsites onto the Clack-backed prompt abstraction so init no longer keeps the legacy UI stack alive.

## Scope

- In scope: Move the remaining promptChoice/promptYesNo/promptInput callsites onto the Clack-backed prompt abstraction so init no longer keeps the legacy UI stack alive.
- Out of scope: unrelated refactors not required for "v0.3 freeze B1: migrate remaining legacy prompts to Clack adapter".

## Plan

1. Implement the change for "v0.3 freeze B1: migrate remaining legacy prompts to Clack adapter".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "v0.3 freeze B1: migrate remaining legacy prompts to Clack adapter". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
