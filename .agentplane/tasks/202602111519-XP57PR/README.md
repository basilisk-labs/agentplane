---
id: "202602111519-XP57PR"
title: "T2: execution.profile escalates approval requirements"
result_summary: "Execution profile now escalates approval requirements deterministically."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602111519-6CT56C"
tags:
  - "core"
  - "policy"
  - "config"
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-11T15:29:15.534Z"
  updated_by: "CODER"
  note: "Verified: Added execution-to-approval escalation matrix, require_force schema support, and tests for conservative/balanced behavior. Ran targeted core+agentplane tests and package builds."
commit:
  hash: "3264d9758337e5879bfe329158533cdf9f278e55"
  message: "✅ XP57PR approvals: add execution escalation matrix"
comments:
  -
    author: "CODER"
    body: "Start: implementing execution profile approval escalation matrix and require_force config support."
  -
    author: "CODER"
    body: "Verified: Implemented approval escalation matrix with conservative overrides for network/force, added require_force schema support, and validated via focused core/agentplane tests plus package builds."
events:
  -
    type: "status"
    at: "2026-02-11T15:24:06.093Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing execution profile approval escalation matrix and require_force config support."
  -
    type: "verify"
    at: "2026-02-11T15:29:15.534Z"
    author: "CODER"
    state: "ok"
    note: "Verified: Added execution-to-approval escalation matrix, require_force schema support, and tests for conservative/balanced behavior. Ran targeted core+agentplane tests and package builds."
  -
    type: "status"
    at: "2026-02-11T15:30:16.582Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Implemented approval escalation matrix with conservative overrides for network/force, added require_force schema support, and validated via focused core/agentplane tests plus package builds."
doc_version: 2
doc_updated_at: "2026-02-11T15:30:16.582Z"
doc_updated_by: "CODER"
description: "Implement applyExecutionToApprovals matrix and new agents.approvals.require_force schema/default wiring."
id_source: "generated"
---
## Summary

Implement execution-driven approval escalation matrix and add config field agents.approvals.require_force.

## Scope

In scope: config schema/types/defaults and approval-transform utility. Out of scope: command-level force/network rollouts (T3-T5).

## Plan

1) Extend config schema/types with require_force default false. 2) Add applyExecutionToApprovals helper with conservative/balanced/aggressive matrix. 3) Integrate helper into shared approval requirements resolution. 4) Add tests.

## Risks

Risk: regression in config validation/defaulting. Mitigation: add focused core config tests and approval transform tests.

## Verify Steps

- bun run test:core -- packages/core/src/config\n- bun run test:agentplane -- packages/agentplane/src/commands/shared\n- bun run lint\nExpected: schema/defaults and escalation logic are validated.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T15:29:15.534Z — VERIFY — ok

By: CODER

Note: Verified: Added execution-to-approval escalation matrix, require_force schema support, and tests for conservative/balanced behavior. Ran targeted core+agentplane tests and package builds.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T15:24:06.093Z, excerpt_hash=sha256:99a8db5d051cebef5125feab8f436bb40117f3c0454ed3ee3159953bca063309

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert config schema/type and escalation helper commits together.
