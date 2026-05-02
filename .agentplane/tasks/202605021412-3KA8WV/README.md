---
id: "202605021412-3KA8WV"
title: "Extend release distribution manifest with standalone assets"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605021412-Q2WGGA"
tags:
  - "code"
  - "distribution"
  - "release"
verify:
  - "bun run release:distribution:check"
  - "bun test packages/agentplane/src/commands/release/*distribution*"
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
doc_updated_at: "2026-05-02T14:12:52.864Z"
doc_updated_by: "CODER"
description: "Extend release-distribution.json generation and validation to include platformAssets for bundled-runtime CLI archives, per-platform sha256 values, install strategy metadata, and recovery evidence."
sections:
  Summary: |-
    Extend release distribution manifest with standalone assets
    
    Extend release-distribution.json generation and validation to include platformAssets for bundled-runtime CLI archives, per-platform sha256 values, install strategy metadata, and recovery evidence.
  Scope: |-
    - In scope: Extend release-distribution.json generation and validation to include platformAssets for bundled-runtime CLI archives, per-platform sha256 values, install strategy metadata, and recovery evidence.
    - Out of scope: unrelated refactors not required for "Extend release distribution manifest with standalone assets".
  Plan: |-
    1. Implement the change for "Extend release distribution manifest with standalone assets".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run release:distribution:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun test packages/agentplane/src/commands/release/*distribution*`. Expected: it succeeds and confirms the requested outcome for this task.
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

Extend release distribution manifest with standalone assets

Extend release-distribution.json generation and validation to include platformAssets for bundled-runtime CLI archives, per-platform sha256 values, install strategy metadata, and recovery evidence.

## Scope

- In scope: Extend release-distribution.json generation and validation to include platformAssets for bundled-runtime CLI archives, per-platform sha256 values, install strategy metadata, and recovery evidence.
- Out of scope: unrelated refactors not required for "Extend release distribution manifest with standalone assets".

## Plan

1. Implement the change for "Extend release distribution manifest with standalone assets".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run release:distribution:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun test packages/agentplane/src/commands/release/*distribution*`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
