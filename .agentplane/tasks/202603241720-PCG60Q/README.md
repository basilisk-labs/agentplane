---
id: "202603241720-PCG60Q"
title: "Add wrapper enforcement mode for custom runner sandbox policy"
result_summary: "Added codex full-auto wrapper enforcement mode for custom runner sandbox policy with schema support and focused regression coverage."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
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
  state: "ok"
  updated_at: "2026-03-24T17:31:02.201Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/policy-decision.test.ts; Result: pass; Evidence: 35 tests passed, including advisory mode, wrapper mode, and unsupported-sandbox refusal paths; Scope: runner config schema, custom adapter capabilities, invocation assembly, and policy decisions. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds exited with code 0; Scope: runtime config/schema and agentplane runner source build. Command: inspect packages/agentplane/src/runner/adapters/custom.test.ts and packages/agentplane/src/runner/policy-decision.test.ts; Result: pass; Evidence: wrapper mode assembles codex sandbox <platform> --full-auto argv and reports sandbox as wrapper-enforced instead of advisory; Scope: prepared invocation contract and policy projection."
commit:
  hash: "5a24c2aab8a8681a65f84f47e36705ccc3a175d8"
  message: "✅ PCG60Q code: add custom runner wrapper enforcement mode"
comments:
  -
    author: "CODER"
    body: "Start: add wrapper-based enforcement for custom runner sandbox policy, wire the new config through capability/policy decisions, and cover advisory vs wrapper behavior with focused runner tests."
  -
    author: "CODER"
    body: "Verified: custom runner now supports an explicit codex sandbox wrapper mode, reports sandbox as wrapper-enforced in policy decisions, fails closed for unsupported sandbox values, and passes targeted config, adapter, policy, and build verification."
events:
  -
    type: "status"
    at: "2026-03-24T17:21:16.703Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add wrapper-based enforcement for custom runner sandbox policy, wire the new config through capability/policy decisions, and cover advisory vs wrapper behavior with focused runner tests."
  -
    type: "verify"
    at: "2026-03-24T17:31:02.201Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/policy-decision.test.ts; Result: pass; Evidence: 35 tests passed, including advisory mode, wrapper mode, and unsupported-sandbox refusal paths; Scope: runner config schema, custom adapter capabilities, invocation assembly, and policy decisions. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds exited with code 0; Scope: runtime config/schema and agentplane runner source build. Command: inspect packages/agentplane/src/runner/adapters/custom.test.ts and packages/agentplane/src/runner/policy-decision.test.ts; Result: pass; Evidence: wrapper mode assembles codex sandbox <platform> --full-auto argv and reports sandbox as wrapper-enforced instead of advisory; Scope: prepared invocation contract and policy projection."
  -
    type: "status"
    at: "2026-03-24T17:31:12.495Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: custom runner now supports an explicit codex sandbox wrapper mode, reports sandbox as wrapper-enforced in policy decisions, fails closed for unsupported sandbox values, and passes targeted config, adapter, policy, and build verification."
doc_version: 3
doc_updated_at: "2026-03-24T17:31:12.496Z"
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
    #### 2026-03-24T17:31:02.201Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/policy-decision.test.ts; Result: pass; Evidence: 35 tests passed, including advisory mode, wrapper mode, and unsupported-sandbox refusal paths; Scope: runner config schema, custom adapter capabilities, invocation assembly, and policy decisions. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds exited with code 0; Scope: runtime config/schema and agentplane runner source build. Command: inspect packages/agentplane/src/runner/adapters/custom.test.ts and packages/agentplane/src/runner/policy-decision.test.ts; Result: pass; Evidence: wrapper mode assembles codex sandbox <platform> --full-auto argv and reports sandbox as wrapper-enforced instead of advisory; Scope: prepared invocation contract and policy projection.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T17:30:52.093Z, excerpt_hash=sha256:ace7becafed0e7519e032a36db23d8fc675fb1723ed2acaeb6480e2701625c51
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- Custom wrapper enforcement currently supports only recipe sandbox=workspace-write because that is the only codex sandbox full-auto behavior confirmed locally; other sandbox values fail closed instead of degrading to advisory execution."
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
#### 2026-03-24T17:31:02.201Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/policy-decision.test.ts; Result: pass; Evidence: 35 tests passed, including advisory mode, wrapper mode, and unsupported-sandbox refusal paths; Scope: runner config schema, custom adapter capabilities, invocation assembly, and policy decisions. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds exited with code 0; Scope: runtime config/schema and agentplane runner source build. Command: inspect packages/agentplane/src/runner/adapters/custom.test.ts and packages/agentplane/src/runner/policy-decision.test.ts; Result: pass; Evidence: wrapper mode assembles codex sandbox <platform> --full-auto argv and reports sandbox as wrapper-enforced instead of advisory; Scope: prepared invocation contract and policy projection.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T17:30:52.093Z, excerpt_hash=sha256:ace7becafed0e7519e032a36db23d8fc675fb1723ed2acaeb6480e2701625c51

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Custom wrapper enforcement currently supports only recipe sandbox=workspace-write because that is the only codex sandbox full-auto behavior confirmed locally; other sandbox values fail closed instead of degrading to advisory execution.
