---
id: "202605021412-XDJ6X7"
title: "Switch Homebrew formula to standalone assets"
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
  - "homebrew"
  - "release"
verify:
  - "bun run release:homebrew:check"
  - "ruby -c generated Formula/agentplane.rb"
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
doc_updated_at: "2026-05-02T14:12:55.210Z"
doc_updated_by: "CODER"
description: "Update the Homebrew formula renderer and tap publication flow to consume macOS bundled-runtime archives directly, remove depends_on node, select arm64/x64 assets, and validate formula syntax/install behavior."
sections:
  Summary: |-
    Switch Homebrew formula to standalone assets
    
    Update the Homebrew formula renderer and tap publication flow to consume macOS bundled-runtime archives directly, remove depends_on node, select arm64/x64 assets, and validate formula syntax/install behavior.
  Scope: |-
    - In scope: Update the Homebrew formula renderer and tap publication flow to consume macOS bundled-runtime archives directly, remove depends_on node, select arm64/x64 assets, and validate formula syntax/install behavior.
    - Out of scope: unrelated refactors not required for "Switch Homebrew formula to standalone assets".
  Plan: |-
    1. Implement the change for "Switch Homebrew formula to standalone assets".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run release:homebrew:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `ruby -c generated Formula/agentplane.rb`. Expected: it succeeds and confirms the requested outcome for this task.
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

Switch Homebrew formula to standalone assets

Update the Homebrew formula renderer and tap publication flow to consume macOS bundled-runtime archives directly, remove depends_on node, select arm64/x64 assets, and validate formula syntax/install behavior.

## Scope

- In scope: Update the Homebrew formula renderer and tap publication flow to consume macOS bundled-runtime archives directly, remove depends_on node, select arm64/x64 assets, and validate formula syntax/install behavior.
- Out of scope: unrelated refactors not required for "Switch Homebrew formula to standalone assets".

## Plan

1. Implement the change for "Switch Homebrew formula to standalone assets".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run release:homebrew:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `ruby -c generated Formula/agentplane.rb`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
