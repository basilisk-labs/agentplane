---
id: "202605090922-Y5MBV3"
title: "Remove compiler hotspot allowlist"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T09:22:41.393Z"
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
    body: "Start: remove the remaining hotspot allow-list entry after confirming compiler.ts is below the oversized threshold."
events:
  -
    type: "status"
    at: "2026-05-09T09:22:51.093Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove the remaining hotspot allow-list entry after confirming compiler.ts is below the oversized threshold."
doc_version: 3
doc_updated_at: "2026-05-09T09:22:51.102Z"
doc_updated_by: "CODER"
description: "Remove prompt-modules/compiler.ts from hotspots:check allow-list when the file is below the oversized threshold, leaving hotspot guardrails without runtime allow-list entries."
sections:
  Summary: |-
    Remove compiler hotspot allowlist
    
    Remove prompt-modules/compiler.ts from hotspots:check allow-list when the file is below the oversized threshold, leaving hotspot guardrails without runtime allow-list entries.
  Scope: |-
    - In scope: Remove prompt-modules/compiler.ts from hotspots:check allow-list when the file is below the oversized threshold, leaving hotspot guardrails without runtime allow-list entries.
    - Out of scope: unrelated refactors not required for "Remove compiler hotspot allowlist".
  Plan: |-
    1. Remove the remaining prompt-modules/compiler.ts --allow-oversized flag from hotspots:check.
    2. Regenerate script README if package script docs drift.
    3. Verify hotspots:check, docs:scripts:check, and typecheck.
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
