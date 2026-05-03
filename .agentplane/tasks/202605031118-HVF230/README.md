---
id: "202605031118-HVF230"
title: "Switch external channels after Bun parity"
status: "TODO"
priority: "med"
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
  updated_at: "2026-05-03T11:19:16.639Z"
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
doc_updated_at: "2026-05-03T11:19:13.899Z"
doc_updated_by: "PLANNER"
description: "Switch Homebrew, Scoop, and setup-agentplane to Bun binaries only after the experimental Bun channel has passed binary smoke/parity checks in a release cycle."
sections:
  Summary: |-
    Switch external channels after Bun parity
    
    Switch Homebrew, Scoop, and setup-agentplane to Bun binaries only after the experimental Bun channel has passed binary smoke/parity checks in a release cycle.
  Scope: |-
    - In scope: Switch Homebrew, Scoop, and setup-agentplane to Bun binaries only after the experimental Bun channel has passed binary smoke/parity checks in a release cycle.
    - Out of scope: unrelated refactors not required for "Switch external channels after Bun parity".
  Plan: |-
    Plan:
    1. Switch Homebrew, Scoop, and setup-agentplane only after an experimental Bun channel has passed release-cycle smoke/parity.
    2. Update external templates to consume release-owned Bun checksums.
    3. Preserve rollback to standalone Node archives.
    Acceptance: external channels use Bun binaries by default only after parity evidence exists.
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

Switch external channels after Bun parity

Switch Homebrew, Scoop, and setup-agentplane to Bun binaries only after the experimental Bun channel has passed binary smoke/parity checks in a release cycle.

## Scope

- In scope: Switch Homebrew, Scoop, and setup-agentplane to Bun binaries only after the experimental Bun channel has passed binary smoke/parity checks in a release cycle.
- Out of scope: unrelated refactors not required for "Switch external channels after Bun parity".

## Plan

Plan:
1. Switch Homebrew, Scoop, and setup-agentplane only after an experimental Bun channel has passed release-cycle smoke/parity.
2. Update external templates to consume release-owned Bun checksums.
3. Preserve rollback to standalone Node archives.
Acceptance: external channels use Bun binaries by default only after parity evidence exists.

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
