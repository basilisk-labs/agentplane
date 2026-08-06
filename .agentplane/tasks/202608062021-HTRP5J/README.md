---
id: "202608062021-HTRP5J"
title: "Classify compatibility adapters for bounded 0.8 retirement"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "compatibility"
  - "governance"
  - "v0.7.5"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts"
  - "bun run test:critical"
  - "bun run typecheck"
  - "bun run docs:cli:check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T20:23:01.483Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-06T22:03:16.202Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-06T22:03:16.202Z"
doc_updated_by: "CODER"
description: "Complete the compatibility retirement manifest so every adapter has an explicit removal version, support-until or zero-usage condition, archive conversion policy, or permanent historical-reader designation; keep historical readers out of normal execution paths where already separable, and verify doctor legacy reports the classification without deleting safety or recovery contracts in 0.7.5."
sections:
  Summary: |-
    Classify compatibility adapters for bounded 0.8 retirement

    Complete the compatibility retirement manifest so every adapter has an explicit removal version, support-until or zero-usage condition, archive conversion policy, or permanent historical-reader designation; keep historical readers out of normal execution paths where already separable, and verify doctor legacy reports the classification without deleting safety or recovery contracts in 0.7.5.
  Scope: |-
    - In scope: Complete the compatibility retirement manifest so every adapter has an explicit removal version, support-until or zero-usage condition, archive conversion policy, or permanent historical-reader designation; keep historical readers out of normal execution paths where already separable, and verify doctor legacy reports the classification without deleting safety or recovery contracts in 0.7.5.
    - Out of scope: unrelated refactors not required for "Classify compatibility adapters for bounded 0.8 retirement".
  Plan: "1. Audit every compatibility adapter in the retirement manifest and classify it as versioned removal, support-until, minimum zero-usage releases, archive conversion, or permanent historical reader. 2. Add schema validation that forbids an unbounded null retirement policy. 3. Surface the classification and remaining blocker through doctor legacy JSON and text output. 4. Where an existing clean boundary permits it, lazy-load historical readers only from upgrade, doctor, or archive paths; do not perform broad runtime extraction or delete safety/recovery contracts in this patch. 5. Document the 0.8 removal set and verify compatibility and critical suites."
  Verify Steps: |-
    - bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts
    - bun run test:critical
    - bun run typecheck
    - bun run docs:cli:check
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "0e1d30346d74b782d736e480700919077e532c5f"
    version: 1
id_source: "generated"
---
## Summary

Classify compatibility adapters for bounded 0.8 retirement

Complete the compatibility retirement manifest so every adapter has an explicit removal version, support-until or zero-usage condition, archive conversion policy, or permanent historical-reader designation; keep historical readers out of normal execution paths where already separable, and verify doctor legacy reports the classification without deleting safety or recovery contracts in 0.7.5.

## Scope

- In scope: Complete the compatibility retirement manifest so every adapter has an explicit removal version, support-until or zero-usage condition, archive conversion policy, or permanent historical-reader designation; keep historical readers out of normal execution paths where already separable, and verify doctor legacy reports the classification without deleting safety or recovery contracts in 0.7.5.
- Out of scope: unrelated refactors not required for "Classify compatibility adapters for bounded 0.8 retirement".

## Plan

1. Audit every compatibility adapter in the retirement manifest and classify it as versioned removal, support-until, minimum zero-usage releases, archive conversion, or permanent historical reader. 2. Add schema validation that forbids an unbounded null retirement policy. 3. Surface the classification and remaining blocker through doctor legacy JSON and text output. 4. Where an existing clean boundary permits it, lazy-load historical readers only from upgrade, doctor, or archive paths; do not perform broad runtime extraction or delete safety/recovery contracts in this patch. 5. Document the 0.8 removal set and verify compatibility and critical suites.

## Verify Steps

- bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts
- bun run test:critical
- bun run typecheck
- bun run docs:cli:check

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
