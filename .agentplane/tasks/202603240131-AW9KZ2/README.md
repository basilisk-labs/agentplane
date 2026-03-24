---
id: "202603240131-AW9KZ2"
title: "Fail closed on unsupported Codex sandbox requests"
result_summary: "Codex adapter now rejects unsupported recipe sandbox values instead of silently falling back."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "codex"
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T01:33:26.459Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T01:36:27.105Z"
  updated_by: "CODER"
  note: "Adapter tests and source builds passed; unsupported recipe sandboxes now fail closed with E_RUNTIME instead of degrading to danger-full-access."
commit:
  hash: "f2cfbab57a69c8962ffaeeac76c702ba650f134b"
  message: "✅ AW9KZ2 code: done"
comments:
  -
    author: "CODER"
    body: "Start: fail closed on unsupported Codex sandbox requests; inspect adapter and tests, then patch typed failure behavior."
  -
    author: "CODER"
    body: "Verified: Replaced the permissive Codex sandbox fallback with a typed E_RUNTIME failure, updated the adapter test to lock the fail-closed contract, and reran codex adapter tests plus source builds to confirm unsupported recipe sandbox requests no longer degrade to danger-full-access."
events:
  -
    type: "status"
    at: "2026-03-24T01:33:35.346Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fail closed on unsupported Codex sandbox requests; inspect adapter and tests, then patch typed failure behavior."
  -
    type: "verify"
    at: "2026-03-24T01:36:27.105Z"
    author: "CODER"
    state: "ok"
    note: "Adapter tests and source builds passed; unsupported recipe sandboxes now fail closed with E_RUNTIME instead of degrading to danger-full-access."
  -
    type: "status"
    at: "2026-03-24T01:37:57.379Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Replaced the permissive Codex sandbox fallback with a typed E_RUNTIME failure, updated the adapter test to lock the fail-closed contract, and reran codex adapter tests plus source builds to confirm unsupported recipe sandbox requests no longer degrade to danger-full-access."
doc_version: 3
doc_updated_at: "2026-03-24T01:37:57.379Z"
doc_updated_by: "CODER"
description: "Remove the permissive fallback to danger-full-access when a requested recipe sandbox cannot be mapped to a supported Codex sandbox. Unsupported sandbox requests must raise a typed runtime failure instead of weakening policy."
sections:
  Summary: |-
    Fail closed on unsupported Codex sandbox requests
    
    Remove the permissive fallback to danger-full-access when a requested recipe sandbox cannot be mapped to a supported Codex sandbox. Unsupported sandbox requests must raise a typed runtime failure instead of weakening policy.
  Scope: |-
    - In scope: Remove the permissive fallback to danger-full-access when a requested recipe sandbox cannot be mapped to a supported Codex sandbox. Unsupported sandbox requests must raise a typed runtime failure instead of weakening policy.
    - Out of scope: unrelated refactors not required for "Fail closed on unsupported Codex sandbox requests".
  Plan: "1. Re-check the real Codex CLI contract for sandbox arguments against the current adapter behavior. 2. Replace the permissive fallback with a typed runtime failure when the requested sandbox is unsupported. 3. Update adapter tests to lock the fail-closed behavior. 4. Verify with targeted tests and source builds."
  Verify Steps: "1. Run bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts. 2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. 3. Confirm unsupported recipe sandbox requests now fail instead of degrading to danger-full-access."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T01:36:27.105Z — VERIFY — ok
    
    By: CODER
    
    Note: Adapter tests and source builds passed; unsupported recipe sandboxes now fail closed with E_RUNTIME instead of degrading to danger-full-access.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T01:33:35.347Z, excerpt_hash=sha256:3817f0e7571bcaa360fb5bb7bf0f71db8bf414b27c56614ec2b88c7fc3fb5310
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fail closed on unsupported Codex sandbox requests

Remove the permissive fallback to danger-full-access when a requested recipe sandbox cannot be mapped to a supported Codex sandbox. Unsupported sandbox requests must raise a typed runtime failure instead of weakening policy.

## Scope

- In scope: Remove the permissive fallback to danger-full-access when a requested recipe sandbox cannot be mapped to a supported Codex sandbox. Unsupported sandbox requests must raise a typed runtime failure instead of weakening policy.
- Out of scope: unrelated refactors not required for "Fail closed on unsupported Codex sandbox requests".

## Plan

1. Re-check the real Codex CLI contract for sandbox arguments against the current adapter behavior. 2. Replace the permissive fallback with a typed runtime failure when the requested sandbox is unsupported. 3. Update adapter tests to lock the fail-closed behavior. 4. Verify with targeted tests and source builds.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts. 2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. 3. Confirm unsupported recipe sandbox requests now fail instead of degrading to danger-full-access.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T01:36:27.105Z — VERIFY — ok

By: CODER

Note: Adapter tests and source builds passed; unsupported recipe sandboxes now fail closed with E_RUNTIME instead of degrading to danger-full-access.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T01:33:35.347Z, excerpt_hash=sha256:3817f0e7571bcaa360fb5bb7bf0f71db8bf414b27c56614ec2b88c7fc3fb5310

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
