---
id: "202602071657-4JSPP2"
title: "Gate: Spike rules (Plan + Verify Steps exit criteria + Notes)"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071657-KD91NP"
tags:
  - "code"
  - "workflow"
verify:
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T17:42:53.517Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T17:43:45.803Z"
  updated_by: "CODER"
  note: "Plan approval now enforces spike tasks have filled Verify Steps and non-empty Notes; bun run test:agentplane."
commit:
  hash: "a09ad85e1a0e0316893971da972b3c5fabc696e4"
  message: "✅ 4JSPP2 workflow: gate spike plan approval"
comments:
  -
    author: "CODER"
    body: "Start: enforce spike-specific plan approval gates (Verify Steps exit criteria, Notes findings)."
  -
    author: "CODER"
    body: "Verified: spike-tagged tasks require filled Verify Steps and non-empty Notes before plan approval; bun run test:agentplane passed."
doc_version: 2
doc_updated_at: "2026-02-07T17:45:02.472Z"
doc_updated_by: "CODER"
description: "Define/enforce spike-specific doc expectations; Verify Steps acts as exit criteria."
---
## Summary


## Scope


## Plan

1) Extend plan approval gating for spike-tagged tasks: require filled Verify Steps as exit criteria.
2) Also require non-empty Notes for spike tasks (Findings/Decision/Next Steps) if feasible without breaking existing flows.
3) Add/update tests later in the dedicated test tasks.
4) Run bun run test:agentplane.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T17:43:45.803Z — VERIFY — ok

By: CODER

Note: Plan approval now enforces spike tasks have filled Verify Steps and non-empty Notes; bun run test:agentplane.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Scope

Enforce spike-specific readiness at plan approval time.

### Checks

- Spike-tagged tasks cannot be approved with empty/placeholder Verify Steps.

### Evidence / Commands

- bun run test:agentplane

### Pass criteria

- Plan approval fails with E_VALIDATION when spike Verify Steps is unfilled.
