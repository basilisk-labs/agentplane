---
id: "202605281707-QEW595"
title: "Compact prompt diagnostics explain surface"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "diagnostics"
  - "prompt-modules"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T17:09:16.201Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T17:22:31.267Z"
  updated_by: "CODER"
  note: "Command: bun run docs:cli:check and ap doctor; Result: pass. Evidence: runtime explain exposes --compact JSON promptDiagnosticsCompact with winning fragments and diagnostics. Scope: compact prompt diagnostics explain surface."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing compact prompt diagnostics explain as an included task in the approved v0.6.12 agent-efficiency batch worktree."
events:
  -
    type: "status"
    at: "2026-05-28T17:09:47.617Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing compact prompt diagnostics explain as an included task in the approved v0.6.12 agent-efficiency batch worktree."
  -
    type: "verify"
    at: "2026-05-28T17:22:31.267Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run docs:cli:check and ap doctor; Result: pass. Evidence: runtime explain exposes --compact JSON promptDiagnosticsCompact with winning fragments and diagnostics. Scope: compact prompt diagnostics explain surface."
doc_version: 3
doc_updated_at: "2026-05-28T17:22:31.297Z"
doc_updated_by: "CODER"
description: "Expose compact JSON diagnostics for winning prompt fragments, overrides, recipe mutations, and prompt-module provenance."
sections:
  Summary: |-
    Compact prompt diagnostics explain surface

    Expose compact JSON diagnostics for winning prompt fragments, overrides, recipe mutations, and prompt-module provenance.
  Scope: |-
    - In scope: Expose compact JSON diagnostics for winning prompt fragments, overrides, recipe mutations, and prompt-module provenance.
    - Out of scope: unrelated refactors not required for "Compact prompt diagnostics explain surface".
  Plan: "Add compact prompt diagnostics explain output for winning prompt fragments, overrides, recipe mutations, and provenance. Keep existing runtime explain behavior compatible and add JSON output for agent consumption."
  Verify Steps: "1. Run prompt-module compiler and registry tests for diagnostics/provenance. 2. Run runtime explain tests for compact JSON output. 3. Run doctor/runtime diagnostics tests if prompt graph findings are surfaced there."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T17:22:31.267Z — VERIFY — ok

    By: CODER

    Note: Command: bun run docs:cli:check and ap doctor; Result: pass. Evidence: runtime explain exposes --compact JSON promptDiagnosticsCompact with winning fragments and diagnostics. Scope: compact prompt diagnostics explain surface.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:09:47.617Z, excerpt_hash=sha256:11770ee8f2b1603d5e086a8e177418dfba7e15c43a759002715bf89780e07462

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281707-51DD0G-route-packet-v2/.agentplane/tasks/202605281707-QEW595/blueprint/resolved-snapshot.json
    - old_digest: 1ff282e85c56892bef4b861eaf0c9e776ab83254bb629d1ead531b714741ae91
    - current_digest: 1ff282e85c56892bef4b861eaf0c9e776ab83254bb629d1ead531b714741ae91
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605281707-QEW595

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Compact prompt diagnostics explain surface

Expose compact JSON diagnostics for winning prompt fragments, overrides, recipe mutations, and prompt-module provenance.

## Scope

- In scope: Expose compact JSON diagnostics for winning prompt fragments, overrides, recipe mutations, and prompt-module provenance.
- Out of scope: unrelated refactors not required for "Compact prompt diagnostics explain surface".

## Plan

Add compact prompt diagnostics explain output for winning prompt fragments, overrides, recipe mutations, and provenance. Keep existing runtime explain behavior compatible and add JSON output for agent consumption.

## Verify Steps

1. Run prompt-module compiler and registry tests for diagnostics/provenance. 2. Run runtime explain tests for compact JSON output. 3. Run doctor/runtime diagnostics tests if prompt graph findings are surfaced there.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T17:22:31.267Z — VERIFY — ok

By: CODER

Note: Command: bun run docs:cli:check and ap doctor; Result: pass. Evidence: runtime explain exposes --compact JSON promptDiagnosticsCompact with winning fragments and diagnostics. Scope: compact prompt diagnostics explain surface.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:09:47.617Z, excerpt_hash=sha256:11770ee8f2b1603d5e086a8e177418dfba7e15c43a759002715bf89780e07462

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281707-51DD0G-route-packet-v2/.agentplane/tasks/202605281707-QEW595/blueprint/resolved-snapshot.json
- old_digest: 1ff282e85c56892bef4b861eaf0c9e776ab83254bb629d1ead531b714741ae91
- current_digest: 1ff282e85c56892bef4b861eaf0c9e776ab83254bb629d1ead531b714741ae91
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605281707-QEW595

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
