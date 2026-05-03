---
id: "202605031118-HVF230"
title: "Switch external channels after Bun parity"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
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
  state: "ok"
  updated_at: "2026-05-03T12:56:59.125Z"
  updated_by: "CODER"
  note: "Focused verification passed: release distribution manifest now records an externalChannelSwitchGate with Bun default disabled until parity evidence exists; Homebrew, Scoop, and setup-agentplane evidence copy the gate while preserving standalone_bundled_node defaults. Ran targeted release distribution and external renderer tests plus check-mode renderers."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: record an explicit Bun parity switch gate for external channels; do not switch Homebrew, Scoop, or setup-agentplane defaults until release-cycle Bun parity evidence exists."
events:
  -
    type: "status"
    at: "2026-05-03T12:54:33.221Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: record an explicit Bun parity switch gate for external channels; do not switch Homebrew, Scoop, or setup-agentplane defaults until release-cycle Bun parity evidence exists."
  -
    type: "verify"
    at: "2026-05-03T12:56:59.125Z"
    author: "CODER"
    state: "ok"
    note: "Focused verification passed: release distribution manifest now records an externalChannelSwitchGate with Bun default disabled until parity evidence exists; Homebrew, Scoop, and setup-agentplane evidence copy the gate while preserving standalone_bundled_node defaults. Ran targeted release distribution and external renderer tests plus check-mode renderers."
doc_version: 3
doc_updated_at: "2026-05-03T12:56:59.127Z"
doc_updated_by: "CODER"
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
    ### 2026-05-03T12:56:59.125Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused verification passed: release distribution manifest now records an externalChannelSwitchGate with Bun default disabled until parity evidence exists; Homebrew, Scoop, and setup-agentplane evidence copy the gate while preserving standalone_bundled_node defaults. Ran targeted release distribution and external renderer tests plus check-mode renderers.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T12:54:33.221Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
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
### 2026-05-03T12:56:59.125Z — VERIFY — ok

By: CODER

Note: Focused verification passed: release distribution manifest now records an externalChannelSwitchGate with Bun default disabled until parity evidence exists; Homebrew, Scoop, and setup-agentplane evidence copy the gate while preserving standalone_bundled_node defaults. Ran targeted release distribution and external renderer tests plus check-mode renderers.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T12:54:33.221Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
