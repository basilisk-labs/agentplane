---
id: "202605031118-RPMEKK"
title: "Add installer opt-in for Bun channel"
result_summary: "Merged via PR #809."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
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
  updated_at: "2026-05-03T11:19:16.042Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T12:23:19.428Z"
  updated_by: "CODER"
  note: "Focused verification passed: bun test packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts and node scripts/generate-release-distribution.mjs --check. Install scripts keep standalone as default and expose AGENTPLANE_INSTALL_CHANNEL=bun as an explicit opt-in channel."
commit:
  hash: "2c163b783901448ee99550202c21ce9fdfa837f8"
  message: "Merge pull request #809 from basilisk-labs/task/202605031118-RPMEKK/bun-installer-opt-in"
comments:
  -
    author: "CODER"
    body: "Start: add opt-in installer channel for Bun executable assets while keeping bundled-Node standalone as default."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #809 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-03T12:20:19.387Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add opt-in installer channel for Bun executable assets while keeping bundled-Node standalone as default."
  -
    type: "verify"
    at: "2026-05-03T12:23:19.428Z"
    author: "CODER"
    state: "ok"
    note: "Focused verification passed: bun test packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts and node scripts/generate-release-distribution.mjs --check. Install scripts keep standalone as default and expose AGENTPLANE_INSTALL_CHANNEL=bun as an explicit opt-in channel."
  -
    type: "status"
    at: "2026-05-03T12:39:32.210Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #809 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-03T12:39:32.216Z"
doc_updated_by: "INTEGRATOR"
description: "Add install.sh/install.ps1 opt-in support for Bun executable assets while keeping standalone Node archives as the default channel until release evidence proves parity."
sections:
  Summary: |-
    Add installer opt-in for Bun channel
    
    Add install.sh/install.ps1 opt-in support for Bun executable assets while keeping standalone Node archives as the default channel until release evidence proves parity.
  Scope: |-
    - In scope: Add install.sh/install.ps1 opt-in support for Bun executable assets while keeping standalone Node archives as the default channel until release evidence proves parity.
    - Out of scope: unrelated refactors not required for "Add installer opt-in for Bun channel".
  Plan: |-
    Plan:
    1. Add installer opt-in channel selection for Bun executable assets, for example AGENTPLANE_INSTALL_CHANNEL=bun.
    2. Keep standalone Node archives as default.
    3. Verify checksum lookup and install path for both channels.
    Acceptance: users can opt into Bun binary installs without changing default release behavior.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T12:23:19.428Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused verification passed: bun test packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts and node scripts/generate-release-distribution.mjs --check. Install scripts keep standalone as default and expose AGENTPLANE_INSTALL_CHANNEL=bun as an explicit opt-in channel.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T12:20:19.387Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add installer opt-in for Bun channel

Add install.sh/install.ps1 opt-in support for Bun executable assets while keeping standalone Node archives as the default channel until release evidence proves parity.

## Scope

- In scope: Add install.sh/install.ps1 opt-in support for Bun executable assets while keeping standalone Node archives as the default channel until release evidence proves parity.
- Out of scope: unrelated refactors not required for "Add installer opt-in for Bun channel".

## Plan

Plan:
1. Add installer opt-in channel selection for Bun executable assets, for example AGENTPLANE_INSTALL_CHANNEL=bun.
2. Keep standalone Node archives as default.
3. Verify checksum lookup and install path for both channels.
Acceptance: users can opt into Bun binary installs without changing default release behavior.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T12:23:19.428Z — VERIFY — ok

By: CODER

Note: Focused verification passed: bun test packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts and node scripts/generate-release-distribution.mjs --check. Install scripts keep standalone as default and expose AGENTPLANE_INSTALL_CHANNEL=bun as an explicit opt-in channel.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T12:20:19.387Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
