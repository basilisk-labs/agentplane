---
id: "202604171502-MJKWG1"
title: "Decompose runtime incidents resolver into strategy modules"
result_summary: "Merged via PR #407."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "runtime"
verify:
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T18:44:19.559Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T18:53:09.885Z"
  updated_by: "CODER"
  note: "Decomposed runtime incidents resolver into registry, planning, and advice strategy modules; reduced resolve.ts to a façade re-export surface; verified typecheck plus resolve incident contract."
commit:
  hash: "42e19e0ea71a60f0c2d3fc785a2aae61b319ad23"
  message: "refactor/runtime: Decompose runtime incidents resolver into strategy modules (MJKWG1) (#407)"
comments:
  -
    author: "CODER"
    body: "Start: split the runtime incidents resolver into explicit registry, planning, and advice strategy modules while keeping the exported runtime API and tests stable."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #407 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-17T18:44:54.560Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split the runtime incidents resolver into explicit registry, planning, and advice strategy modules while keeping the exported runtime API and tests stable."
  -
    type: "verify"
    at: "2026-04-17T18:53:09.885Z"
    author: "CODER"
    state: "ok"
    note: "Decomposed runtime incidents resolver into registry, planning, and advice strategy modules; reduced resolve.ts to a façade re-export surface; verified typecheck plus resolve incident contract."
  -
    type: "status"
    at: "2026-04-17T19:01:11.375Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #407 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-17T19:01:11.381Z"
doc_updated_by: "INTEGRATOR"
description: "Split the runtime incidents resolver hotspot into declarative strategy modules so the dispatcher stays small and behavior remains unchanged."
sections:
  Summary: |-
    Decompose runtime incidents resolver into strategy modules
    
    Split the runtime incidents resolver hotspot into declarative strategy modules so the dispatcher stays small and behavior remains unchanged.
  Scope: |-
    - In scope: Split the runtime incidents resolver hotspot into declarative strategy modules so the dispatcher stays small and behavior remains unchanged.
    - Out of scope: unrelated refactors not required for "Decompose runtime incidents resolver into strategy modules".
  Plan: |-
    1. Identify incident-resolution branches that can become standalone strategies without changing behavior.
    2. Extract strategy modules and leave resolve.ts as a small dispatcher with explicit registration.
    3. Re-run incidents resolver tests and typecheck.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T18:53:09.885Z — VERIFY — ok
    
    By: CODER
    
    Note: Decomposed runtime incidents resolver into registry, planning, and advice strategy modules; reduced resolve.ts to a façade re-export surface; verified typecheck plus resolve incident contract.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T18:44:54.572Z, excerpt_hash=sha256:b3a7d948eda5e38d416a5d21e0a35287c1080f154026b97758b4952e110cee94
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Decompose runtime incidents resolver into strategy modules

Split the runtime incidents resolver hotspot into declarative strategy modules so the dispatcher stays small and behavior remains unchanged.

## Scope

- In scope: Split the runtime incidents resolver hotspot into declarative strategy modules so the dispatcher stays small and behavior remains unchanged.
- Out of scope: unrelated refactors not required for "Decompose runtime incidents resolver into strategy modules".

## Plan

1. Identify incident-resolution branches that can become standalone strategies without changing behavior.
2. Extract strategy modules and leave resolve.ts as a small dispatcher with explicit registration.
3. Re-run incidents resolver tests and typecheck.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T18:53:09.885Z — VERIFY — ok

By: CODER

Note: Decomposed runtime incidents resolver into registry, planning, and advice strategy modules; reduced resolve.ts to a façade re-export surface; verified typecheck plus resolve incident contract.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T18:44:54.572Z, excerpt_hash=sha256:b3a7d948eda5e38d416a5d21e0a35287c1080f154026b97758b4952e110cee94

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
