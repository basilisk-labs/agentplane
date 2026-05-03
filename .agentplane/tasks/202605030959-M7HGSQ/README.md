---
id: "202605030959-M7HGSQ"
title: "Switch external channels to Bun binaries"
result_summary: "Superseded by HVF230 externalChannelSwitchGate; external channels remain standalone until Bun parity evidence exists."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
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
  state: "ok"
  updated_at: "2026-05-03T14:24:22.025Z"
  updated_by: "CODER"
  note: "Verified: superseded by 202605031118-HVF230. External channels intentionally remain standalone by default; Bun switch is gated on published parity evidence."
commit:
  hash: "0879fb8a5a2524a6b12fa1176c0b83d2905692d4"
  message: "Merge pull request #815 from basilisk-labs/task/202605031118-HVF230/bun-external-channel-switch-gate"
comments:
  -
    author: "CODER"
    body: "Start: close stale external Bun switch placeholder as superseded by the explicit external channel parity gate."
  -
    author: "INTEGRATOR"
    body: "Verified: stale placeholder closed because external channel switching is now represented by HVF230 gate, not an unsafe immediate default switch."
events:
  -
    type: "status"
    at: "2026-05-03T14:24:20.888Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: close stale external Bun switch placeholder as superseded by the explicit external channel parity gate."
  -
    type: "verify"
    at: "2026-05-03T14:24:22.025Z"
    author: "CODER"
    state: "ok"
    note: "Verified: superseded by 202605031118-HVF230. External channels intentionally remain standalone by default; Bun switch is gated on published parity evidence."
  -
    type: "status"
    at: "2026-05-03T14:24:22.474Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: stale placeholder closed because external channel switching is now represented by HVF230 gate, not an unsafe immediate default switch."
doc_version: 3
doc_updated_at: "2026-05-03T14:24:22.474Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-05-03T14:24:22.025Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: superseded by 202605031118-HVF230. External channels intentionally remain standalone by default; Bun switch is gated on published parity evidence.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T14:24:20.888Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
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
### 2026-05-03T14:24:22.025Z — VERIFY — ok

By: CODER

Note: Verified: superseded by 202605031118-HVF230. External channels intentionally remain standalone by default; Bun switch is gated on published parity evidence.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T14:24:20.888Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Blocked by 202605030959-G3XX2Y compatibility spike: external channels must not switch to Bun binaries until Bun executable artifacts pass binary-specific smoke tests and use release-owned checksums. Current safe external channel remains standalone Node runtime archives.
