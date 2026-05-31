---
id: "202605281707-QEW595"
title: "Compact prompt diagnostics explain surface"
result_summary: "Closed included batch task from merged PR #4197"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
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
quality_review:
  state: "pass"
  updated_at: "2026-05-31T15:00:30.123Z"
  updated_by: "EVALUATOR"
  note: "Included task verified in merged batch PR #4197."
  evaluated_sha: "26704abb70798fb4ecca714fa3c21050d3893c18"
  blueprint_digest: "1ff282e85c56892bef4b861eaf0c9e776ab83254bb629d1ead531b714741ae91"
  evidence_refs:
    - ".agentplane/tasks/202605281707-QEW595/README.md"
    - ".agentplane/tasks/202605281707-QEW595/quality/20260531-150030123-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605281707-QEW595/quality/20260531-150030123-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605281707-QEW595/quality/20260531-150030123-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605281707-QEW595/blueprint/resolved-snapshot.json"
  findings:
    - "Task has verification.ok evidence and was included in the 51DD0G route-packet-v2 batch merged to main at 26704abb70798fb4ecca714fa3c21050d3893c18."
commit:
  hash: "26704abb70798fb4ecca714fa3c21050d3893c18"
  message: "Merge pull request #4329 from basilisk-labs/task/202605310706-GV6ECK/verify-ghost-progress"
comments:
  -
    author: "CODER"
    body: "Start: Implementing compact prompt diagnostics explain as an included task in the approved v0.6.12 agent-efficiency batch worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: closed included batch task after merged PR #4197 landed implementation commit 26704abb70798fb4ecca714fa3c21050d3893c18; task commit recorded SHA 26704abb70798fb4ecca714fa3c21050d3893c18."
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
  -
    type: "status"
    at: "2026-05-31T15:00:32.289Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: closed included batch task after merged PR #4197 landed implementation commit 26704abb70798fb4ecca714fa3c21050d3893c18; task commit recorded SHA 26704abb70798fb4ecca714fa3c21050d3893c18."
doc_version: 3
doc_updated_at: "2026-05-31T15:00:32.290Z"
doc_updated_by: "INTEGRATOR"
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
extensions: {}
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
