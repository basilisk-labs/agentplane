---
id: "202605030959-M7HGSQ"
title: "Switch external channels to Bun binaries"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
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
  updated_at: "2026-05-03T10:00:31.843Z"
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
doc_updated_at: "2026-05-03T11:07:07.037Z"
doc_updated_by: "PLANNER"
description: "Update Homebrew, Scoop, setup-agentplane, and installer templates to consume Bun executable artifacts after binary smoke tests and checksum manifest parity are proven."
sections:
  Summary: |-
    Switch external channels to Bun binaries
    
    Update Homebrew, Scoop, setup-agentplane, and installer templates to consume Bun executable artifacts after binary smoke tests and checksum manifest parity are proven.
  Scope: |-
    - In scope: Update Homebrew, Scoop, setup-agentplane, and installer templates to consume Bun executable artifacts after binary smoke tests and checksum manifest parity are proven.
    - Out of scope: unrelated refactors not required for "Switch external channels to Bun binaries".
  Plan: |-
    Plan:
    1. Update Homebrew, Scoop, setup-agentplane, and installer templates to prefer Bun executable artifacts only after artifact generation is verified.
    2. Keep rollback to current standalone Node runtime archives documented and mechanically available.
    3. Validate external result manifests include the exact release-owned Bun checksums.
    4. Run channel-specific install smoke checks where supported.
    Acceptance: all external channels consume the same immutable release-owned Bun binaries and can be rolled back to the previous standalone channel if needed.
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
  Findings: "Blocked by 202605030959-G3XX2Y compatibility spike: external channels must not switch to Bun binaries until Bun executable artifacts pass binary-specific smoke tests and use release-owned checksums. Current safe external channel remains standalone Node runtime archives."
id_source: "generated"
---
## Summary

Switch external channels to Bun binaries

Update Homebrew, Scoop, setup-agentplane, and installer templates to consume Bun executable artifacts after binary smoke tests and checksum manifest parity are proven.

## Scope

- In scope: Update Homebrew, Scoop, setup-agentplane, and installer templates to consume Bun executable artifacts after binary smoke tests and checksum manifest parity are proven.
- Out of scope: unrelated refactors not required for "Switch external channels to Bun binaries".

## Plan

Plan:
1. Update Homebrew, Scoop, setup-agentplane, and installer templates to prefer Bun executable artifacts only after artifact generation is verified.
2. Keep rollback to current standalone Node runtime archives documented and mechanically available.
3. Validate external result manifests include the exact release-owned Bun checksums.
4. Run channel-specific install smoke checks where supported.
Acceptance: all external channels consume the same immutable release-owned Bun binaries and can be rolled back to the previous standalone channel if needed.

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

Blocked by 202605030959-G3XX2Y compatibility spike: external channels must not switch to Bun binaries until Bun executable artifacts pass binary-specific smoke tests and use release-owned checksums. Current safe external channel remains standalone Node runtime archives.
