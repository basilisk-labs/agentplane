---
id: "202604231624-DNT18Z"
title: "Decompose release apply preflight hotspot"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T16:24:11.499Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decompose release apply preflight into smaller helper modules for plan loading, git checks, and publish gate execution while preserving release behavior and diagnostics."
events:
  -
    type: "status"
    at: "2026-04-23T16:24:12.189Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose release apply preflight into smaller helper modules for plan loading, git checks, and publish gate execution while preserving release behavior and diagnostics."
doc_version: 3
doc_updated_at: "2026-04-23T16:24:12.201Z"
doc_updated_by: "CODER"
description: "Refactor packages/agentplane/src/commands/release/apply.preflight.ts into smaller helper modules for plan loading, git preflight checks, and publish gate checks without changing release behavior or diagnostics. Keep existing command contracts stable and verify with targeted release suites."
sections:
  Summary: |-
    Decompose release apply preflight hotspot
    
    Refactor packages/agentplane/src/commands/release/apply.preflight.ts into smaller helper modules for plan loading, git preflight checks, and publish gate checks without changing release behavior or diagnostics. Keep existing command contracts stable and verify with targeted release suites.
  Scope: |-
    - In scope: Refactor packages/agentplane/src/commands/release/apply.preflight.ts into smaller helper modules for plan loading, git preflight checks, and publish gate checks without changing release behavior or diagnostics. Keep existing command contracts stable and verify with targeted release suites.
    - Out of scope: unrelated refactors not required for "Decompose release apply preflight hotspot".
  Plan: "Split packages/agentplane/src/commands/release/apply.preflight.ts into helper modules for plan/json loading, git/publish preconditions, and prepublish gate execution. Keep exported surface stable via the existing apply.preflight entrypoint, preserve diagnostics/messages, and verify with targeted release apply tests, typecheck, hotspot check, bootstrap, and doctor."
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

Decompose release apply preflight hotspot

Refactor packages/agentplane/src/commands/release/apply.preflight.ts into smaller helper modules for plan loading, git preflight checks, and publish gate checks without changing release behavior or diagnostics. Keep existing command contracts stable and verify with targeted release suites.

## Scope

- In scope: Refactor packages/agentplane/src/commands/release/apply.preflight.ts into smaller helper modules for plan loading, git preflight checks, and publish gate checks without changing release behavior or diagnostics. Keep existing command contracts stable and verify with targeted release suites.
- Out of scope: unrelated refactors not required for "Decompose release apply preflight hotspot".

## Plan

Split packages/agentplane/src/commands/release/apply.preflight.ts into helper modules for plan/json loading, git/publish preconditions, and prepublish gate execution. Keep exported surface stable via the existing apply.preflight entrypoint, preserve diagnostics/messages, and verify with targeted release apply tests, typecheck, hotspot check, bootstrap, and doctor.

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
