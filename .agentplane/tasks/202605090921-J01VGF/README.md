---
id: "202605090921-J01VGF"
title: "Remove ACR hotspot allowlist"
result_summary: "Closed stale lifecycle state after merged implementation commit 4e2420cfc."
status: "DONE"
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
  updated_at: "2026-05-09T09:21:13.207Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T15:26:17.388Z"
  updated_by: "CODER"
  note: "ACR hotspot allowlist removal verified on current main."
commit:
  hash: "4e2420cfcebcd1621ace310849bd343c1bc8f15a"
  message: "🚧 J01VGF hotspots: remove acr allowlist"
comments:
  -
    author: "CODER"
    body: "Start: remove stale ACR hotspot allow-list entry after the ACR split dropped below the oversized threshold."
  -
    author: "INTEGRATOR"
    body: "Verified: ACR hotspot allowlist removal is present on current main, hotspot check and typecheck evidence are recorded."
events:
  -
    type: "status"
    at: "2026-05-09T09:21:21.080Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove stale ACR hotspot allow-list entry after the ACR split dropped below the oversized threshold."
  -
    type: "verify"
    at: "2026-05-09T09:21:58.648Z"
    author: "CODER"
    state: "ok"
    note: "ACR hotspot allow-list removal verified with hotspot, script docs, and type checks."
  -
    type: "verify"
    at: "2026-05-09T15:26:17.388Z"
    author: "CODER"
    state: "ok"
    note: "ACR hotspot allowlist removal verified on current main."
  -
    type: "status"
    at: "2026-05-09T15:28:02.509Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: ACR hotspot allowlist removal is present on current main, hotspot check and typecheck evidence are recorded."
doc_version: 3
doc_updated_at: "2026-05-09T15:28:02.513Z"
doc_updated_by: "INTEGRATOR"
description: "Remove acr.command.ts from hotspots:check allow-list after ACR split brings it below the oversized threshold, and update generated script docs if required."
sections:
  Summary: |-
    Remove ACR hotspot allowlist
    
    Remove acr.command.ts from hotspots:check allow-list after ACR split brings it below the oversized threshold, and update generated script docs if required.
  Scope: |-
    - In scope: Remove acr.command.ts from hotspots:check allow-list after ACR split brings it below the oversized threshold, and update generated script docs if required.
    - Out of scope: unrelated refactors not required for "Remove ACR hotspot allowlist".
  Plan: |-
    1. Remove packages/agentplane/src/commands/acr/acr.command.ts from the hotspots:check allow-list.
    2. Regenerate or update script documentation if the package script documentation is checked in.
    3. Verify hotspots:check, docs/scripts check if applicable, and typecheck remains green.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T09:21:58.648Z — VERIFY — ok
    
    By: CODER
    
    Note: ACR hotspot allow-list removal verified with hotspot, script docs, and type checks.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T09:21:21.090Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605090921-J01VGF/blueprint/resolved-snapshot.json
    - old_digest: 9624a1ed1bd600d360975acc05d1aeb9e6543aa8519402f249532dbb8eb434fb
    - current_digest: 9624a1ed1bd600d360975acc05d1aeb9e6543aa8519402f249532dbb8eb434fb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605090921-J01VGF
    
    ### 2026-05-09T15:26:17.388Z — VERIFY — ok
    
    By: CODER
    
    Note: ACR hotspot allowlist removal verified on current main.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T09:21:58.660Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: bun run hotspots:check | Result: pass | Evidence: threshold check passed without ACR allow-list. Scope: hotspot script configuration.
    Command: jq -r '.scripts["hotspots:check"]' package.json | Result: pass | Evidence: script has no --allow-oversized entry. Scope: package script.
    Command: bun run typecheck | Result: pass | Evidence: tsc -b completed. Scope: workspace TypeScript contracts.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605090921-J01VGF/blueprint/resolved-snapshot.json
    - old_digest: 9624a1ed1bd600d360975acc05d1aeb9e6543aa8519402f249532dbb8eb434fb
    - current_digest: 9624a1ed1bd600d360975acc05d1aeb9e6543aa8519402f249532dbb8eb434fb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605090921-J01VGF
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun run hotspots:check | Result: pass | Evidence: threshold check passed with only compiler.ts allow-listed; acr.command.ts reports as warning at 459 LoC, below oversized threshold. Scope: hotspot guard.\nCommand: bun run docs:scripts:generate && bun run docs:scripts:check | Result: pass | Evidence: scripts/README.md regenerated and check reported up to date. Scope: checked-in script docs.\nCommand: bun run typecheck | Result: pass | Evidence: tsc -b completed. Scope: workspace TypeScript contracts.
      Impact: ACR command is no longer hidden by oversized allow-list; remaining allow-list is only compiler.ts.
      Resolution: Removed packages/agentplane/src/commands/acr/acr.command.ts from hotspots:check allow-list and regenerated script docs.
id_source: "generated"
---
