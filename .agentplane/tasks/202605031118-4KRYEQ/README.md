---
id: "202605031118-4KRYEQ"
title: "Generate Bun executable release assets"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "bun"
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T11:19:15.651Z"
  updated_by: "ORCHESTRATOR"
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
doc_updated_at: "2026-05-03T11:19:12.745Z"
doc_updated_by: "PLANNER"
description: "Add release asset generation for Bun compiled executables as an experimental parallel channel with manifest and checksum entries, preserving the existing standalone Node archive channel."
sections:
  Summary: |-
    Generate Bun executable release assets
    
    Add release asset generation for Bun compiled executables as an experimental parallel channel with manifest and checksum entries, preserving the existing standalone Node archive channel.
  Scope: |-
    - In scope: Add release asset generation for Bun compiled executables as an experimental parallel channel with manifest and checksum entries, preserving the existing standalone Node archive channel.
    - Out of scope: unrelated refactors not required for "Generate Bun executable release assets".
  Plan: |-
    Plan:
    1. Add Bun executable artifact generation as an experimental parallel release channel.
    2. Emit bun-executable-assets.json and SHA256SUMS entries without replacing standalone Node archives.
    3. Add release manifest fields for installStrategy=bun_executable.
    4. Verify generation/check mode and binary smoke on host target.
    Acceptance: release workflow can publish Bun executable artifacts alongside current artifacts behind an experimental gate.
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

Generate Bun executable release assets

Add release asset generation for Bun compiled executables as an experimental parallel channel with manifest and checksum entries, preserving the existing standalone Node archive channel.

## Scope

- In scope: Add release asset generation for Bun compiled executables as an experimental parallel channel with manifest and checksum entries, preserving the existing standalone Node archive channel.
- Out of scope: unrelated refactors not required for "Generate Bun executable release assets".

## Plan

Plan:
1. Add Bun executable artifact generation as an experimental parallel release channel.
2. Emit bun-executable-assets.json and SHA256SUMS entries without replacing standalone Node archives.
3. Add release manifest fields for installStrategy=bun_executable.
4. Verify generation/check mode and binary smoke on host target.
Acceptance: release workflow can publish Bun executable artifacts alongside current artifacts behind an experimental gate.

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
