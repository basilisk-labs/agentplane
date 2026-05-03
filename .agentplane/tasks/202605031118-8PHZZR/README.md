---
id: "202605031118-8PHZZR"
title: "Embed AgentPlane assets for Bun binary"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "bun"
  - "code"
  - "distribution"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T11:19:14.735Z"
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
doc_updated_at: "2026-05-03T11:19:11.821Z"
doc_updated_by: "PLANNER"
description: "Replace or supplement filesystem-only asset access with Bun-compatible embedded asset handling so a compiled binary can initialize projects without an npm package assets directory."
sections:
  Summary: |-
    Embed AgentPlane assets for Bun binary
    
    Replace or supplement filesystem-only asset access with Bun-compatible embedded asset handling so a compiled binary can initialize projects without an npm package assets directory.
  Scope: |-
    - In scope: Replace or supplement filesystem-only asset access with Bun-compatible embedded asset handling so a compiled binary can initialize projects without an npm package assets directory.
    - Out of scope: unrelated refactors not required for "Embed AgentPlane assets for Bun binary".
  Plan: |-
    Plan:
    1. Inventory asset reads that currently require packages/agentplane/assets on disk.
    2. Add Bun-compatible embedded asset access or a binary-adjacent asset extraction contract.
    3. Preserve normal filesystem asset access for npm and standalone Node channels.
    4. Verify init/bootstrap asset usage from a compiled binary.
    Acceptance: compiled Bun binary can initialize a repository without an npm package assets directory.
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

Embed AgentPlane assets for Bun binary

Replace or supplement filesystem-only asset access with Bun-compatible embedded asset handling so a compiled binary can initialize projects without an npm package assets directory.

## Scope

- In scope: Replace or supplement filesystem-only asset access with Bun-compatible embedded asset handling so a compiled binary can initialize projects without an npm package assets directory.
- Out of scope: unrelated refactors not required for "Embed AgentPlane assets for Bun binary".

## Plan

Plan:
1. Inventory asset reads that currently require packages/agentplane/assets on disk.
2. Add Bun-compatible embedded asset access or a binary-adjacent asset extraction contract.
3. Preserve normal filesystem asset access for npm and standalone Node channels.
4. Verify init/bootstrap asset usage from a compiled binary.
Acceptance: compiled Bun binary can initialize a repository without an npm package assets directory.

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
