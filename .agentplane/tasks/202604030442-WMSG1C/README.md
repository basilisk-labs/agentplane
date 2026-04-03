---
id: "202604030442-WMSG1C"
title: "F-010 Introduce protocol and result foundation"
result_summary: "integrate: squash task/202604030442-WMSG1C/protocol-foundation"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604030442-E8H05E"
tags:
  - "code"
  - "framework"
  - "protocol"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:42:07.044Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from framework roadmap and explicit user execution request"
verification:
  state: "ok"
  updated_at: "2026-04-03T14:07:03.937Z"
  updated_by: "CODER"
  note: "Introduced versioned protocol/result envelopes, wrapped framework explain in a stable additive protocol surface, persisted it in runner bundles, and verified with typecheck plus targeted vitest for protocol/context/runner/CLI contracts."
commit:
  hash: "a33027f4859bddffd32a308577ab68e9a037f481"
  message: "📝 WMSG1C task: refresh verification and pr state"
comments:
  -
    author: "CODER"
    body: "Start: define the framework protocol and result foundation, expose JSON-friendly runtime envelopes, and connect them to explain-capable runner/task surfaces without binding the model to recipe-specific adapters."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=ran; pr=.agentplane/tasks/202604030442-WMSG1C/pr."
events:
  -
    type: "status"
    at: "2026-04-03T13:57:34.711Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: define the framework protocol and result foundation, expose JSON-friendly runtime envelopes, and connect them to explain-capable runner/task surfaces without binding the model to recipe-specific adapters."
  -
    type: "verify"
    at: "2026-04-03T14:07:03.937Z"
    author: "CODER"
    state: "ok"
    note: "Introduced versioned protocol/result envelopes, wrapped framework explain in a stable additive protocol surface, persisted it in runner bundles, and verified with typecheck plus targeted vitest for protocol/context/runner/CLI contracts."
  -
    type: "status"
    at: "2026-04-03T14:08:00.511Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=ran; pr=.agentplane/tasks/202604030442-WMSG1C/pr."
doc_version: 3
doc_updated_at: "2026-04-03T14:08:00.514Z"
doc_updated_by: "INTEGRATOR"
description: "Create stable JSON-friendly result contracts on top of the explain foundation."
sections:
  Summary: |-
    F-010 Introduce protocol and result foundation
    
    Create stable JSON-friendly result contracts on top of the explain foundation.
  Scope: |-
    - In scope: Create stable JSON-friendly result contracts on top of the explain foundation.
    - Out of scope: unrelated refactors not required for "F-010 Introduce protocol and result foundation".
  Plan: |-
    1. Define base protocol and result types that are machine-readable, versionable, and independent from concrete runner adapters.
    2. Connect the explain surface to the new result foundation and describe the compatibility strategy in code or docs.
    3. Add tests that freeze the JSON-facing contract.
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-03T14:07:03.937Z — VERIFY — ok
    
    By: CODER
    
    Note: Introduced versioned protocol/result envelopes, wrapped framework explain in a stable additive protocol surface, persisted it in runner bundles, and verified with typecheck plus targeted vitest for protocol/context/runner/CLI contracts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T13:57:34.729Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

F-010 Introduce protocol and result foundation

Create stable JSON-friendly result contracts on top of the explain foundation.

## Scope

- In scope: Create stable JSON-friendly result contracts on top of the explain foundation.
- Out of scope: unrelated refactors not required for "F-010 Introduce protocol and result foundation".

## Plan

1. Define base protocol and result types that are machine-readable, versionable, and independent from concrete runner adapters.
2. Connect the explain surface to the new result foundation and describe the compatibility strategy in code or docs.
3. Add tests that freeze the JSON-facing contract.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-03T14:07:03.937Z — VERIFY — ok

By: CODER

Note: Introduced versioned protocol/result envelopes, wrapped framework explain in a stable additive protocol surface, persisted it in runner bundles, and verified with typecheck plus targeted vitest for protocol/context/runner/CLI contracts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T13:57:34.729Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
