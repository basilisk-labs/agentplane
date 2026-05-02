---
id: "202605021412-MH8RSM"
title: "Switch Scoop and setup-action to standalone assets"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605021412-3KA8WV"
tags:
  - "code"
  - "release"
  - "scoop"
  - "setup-action"
verify:
  - "bun run release:scoop:check"
  - "bun run release:setup-action:check"
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
doc_updated_at: "2026-05-02T14:12:56.389Z"
doc_updated_by: "CODER"
description: "Update Scoop manifest rendering and setup-agentplane action generation to prefer bundled-runtime archives, remove npm/Node install assumptions, and keep explicit fallback or evidence when a platform asset is missing."
sections:
  Summary: |-
    Switch Scoop and setup-action to standalone assets
    
    Update Scoop manifest rendering and setup-agentplane action generation to prefer bundled-runtime archives, remove npm/Node install assumptions, and keep explicit fallback or evidence when a platform asset is missing.
  Scope: |-
    - In scope: Update Scoop manifest rendering and setup-agentplane action generation to prefer bundled-runtime archives, remove npm/Node install assumptions, and keep explicit fallback or evidence when a platform asset is missing.
    - Out of scope: unrelated refactors not required for "Switch Scoop and setup-action to standalone assets".
  Plan: |-
    1. Implement the change for "Switch Scoop and setup-action to standalone assets".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run release:scoop:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run release:setup-action:check`. Expected: it succeeds and confirms the requested outcome for this task.
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

Switch Scoop and setup-action to standalone assets

Update Scoop manifest rendering and setup-agentplane action generation to prefer bundled-runtime archives, remove npm/Node install assumptions, and keep explicit fallback or evidence when a platform asset is missing.

## Scope

- In scope: Update Scoop manifest rendering and setup-agentplane action generation to prefer bundled-runtime archives, remove npm/Node install assumptions, and keep explicit fallback or evidence when a platform asset is missing.
- Out of scope: unrelated refactors not required for "Switch Scoop and setup-action to standalone assets".

## Plan

1. Implement the change for "Switch Scoop and setup-action to standalone assets".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run release:scoop:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run release:setup-action:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
