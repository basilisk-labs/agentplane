---
id: "202603241720-PCG60Q"
title: "Add wrapper enforcement mode for custom runner sandbox policy"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "custom"
  - "sandbox"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T17:21:06.991Z"
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
    body: "Start: add wrapper-based enforcement for custom runner sandbox policy, wire the new config through capability/policy decisions, and cover advisory vs wrapper behavior with focused runner tests."
events:
  -
    type: "status"
    at: "2026-03-24T17:21:16.703Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add wrapper-based enforcement for custom runner sandbox policy, wire the new config through capability/policy decisions, and cover advisory vs wrapper behavior with focused runner tests."
doc_version: 3
doc_updated_at: "2026-03-24T17:21:16.707Z"
doc_updated_by: "CODER"
description: "Introduce an explicit wrapper-based enforcement mode for the custom runner adapter so recipe sandbox policy can be enforced through a real wrapper instead of advisory env propagation alone."
sections:
  Summary: |-
    Add wrapper enforcement mode for custom runner sandbox policy
    
    Introduce an explicit wrapper-based enforcement mode for the custom runner adapter so recipe sandbox policy can be enforced through a real wrapper instead of advisory env propagation alone.
  Scope: |-
    - In scope: Introduce an explicit wrapper-based enforcement mode for the custom runner adapter so recipe sandbox policy can be enforced through a real wrapper instead of advisory env propagation alone.
    - Out of scope: unrelated refactors not required for "Add wrapper enforcement mode for custom runner sandbox policy".
  Plan: |-
    1. Extend runner custom config with an explicit enforcement mode and wrapper settings for sandbox-capable execution.
    2. Update custom adapter capability reporting and invocation assembly so sandbox becomes wrapper-enforced when the wrapper mode is configured.
    3. Add preflight and adapter tests covering advisory mode, wrapper mode, and refusal paths; then run targeted verification.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/policy-decision.test.ts. Expected: advisory and wrapper enforcement paths both pass, and unsupported sandbox/refusal behavior is deterministic.
    2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Expected: config schema/types and runner code compile cleanly.
    3. Inspect the prepared custom invocation in tests. Expected: wrapper mode uses an explicit sandbox wrapper argv and policy decision reports sandbox as wrapper-enforced instead of advisory.
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

Add wrapper enforcement mode for custom runner sandbox policy

Introduce an explicit wrapper-based enforcement mode for the custom runner adapter so recipe sandbox policy can be enforced through a real wrapper instead of advisory env propagation alone.

## Scope

- In scope: Introduce an explicit wrapper-based enforcement mode for the custom runner adapter so recipe sandbox policy can be enforced through a real wrapper instead of advisory env propagation alone.
- Out of scope: unrelated refactors not required for "Add wrapper enforcement mode for custom runner sandbox policy".

## Plan

1. Extend runner custom config with an explicit enforcement mode and wrapper settings for sandbox-capable execution.
2. Update custom adapter capability reporting and invocation assembly so sandbox becomes wrapper-enforced when the wrapper mode is configured.
3. Add preflight and adapter tests covering advisory mode, wrapper mode, and refusal paths; then run targeted verification.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/policy-decision.test.ts. Expected: advisory and wrapper enforcement paths both pass, and unsupported sandbox/refusal behavior is deterministic.
2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Expected: config schema/types and runner code compile cleanly.
3. Inspect the prepared custom invocation in tests. Expected: wrapper mode uses an explicit sandbox wrapper argv and policy decision reports sandbox as wrapper-enforced instead of advisory.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
