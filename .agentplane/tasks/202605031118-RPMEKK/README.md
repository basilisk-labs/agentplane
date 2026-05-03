---
id: "202605031118-RPMEKK"
title: "Add installer opt-in for Bun channel"
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
  updated_at: "2026-05-03T11:19:16.042Z"
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
doc_updated_at: "2026-05-03T11:19:13.453Z"
doc_updated_by: "PLANNER"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
