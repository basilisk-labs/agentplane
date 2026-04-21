---
id: "202604210858-3JVPBT"
title: "Harden HTTP fetch timeout and retry behavior"
result_summary: "Hardened CLI fetch timeout and retry behavior."
risk_level: "med"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "network"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T09:04:34.183Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T09:06:13.538Z"
  updated_by: "CODER"
  note: "Raised CLI fetch timeout to 5000ms, added bounded retry for fetchJson/fetchText transient fetch failures, and covered retry/default-timeout behavior in cli/http tests. Verification: agentplane http test passed (9 tests) and agentplane typecheck passed."
commit:
  hash: "3964ccf386d304db5044ec2722be09193bcb5061"
  message: "✅ 3JVPBT code: done"
comments:
  -
    author: "CODER"
    body: "Start: Harden the CLI HTTP fetch helper timeout and retry behavior with focused tests while avoiding unrelated network access."
  -
    author: "CODER"
    body: "Verified: CLI fetch helpers now use a longer timeout and retry transient fetch failures with focused tests and typecheck passing."
events:
  -
    type: "status"
    at: "2026-04-21T09:04:35.096Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Harden the CLI HTTP fetch helper timeout and retry behavior with focused tests while avoiding unrelated network access."
  -
    type: "verify"
    at: "2026-04-21T09:06:13.538Z"
    author: "CODER"
    state: "ok"
    note: "Raised CLI fetch timeout to 5000ms, added bounded retry for fetchJson/fetchText transient fetch failures, and covered retry/default-timeout behavior in cli/http tests. Verification: agentplane http test passed (9 tests) and agentplane typecheck passed."
  -
    type: "status"
    at: "2026-04-21T09:13:44.077Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: CLI fetch helpers now use a longer timeout and retry transient fetch failures with focused tests and typecheck passing."
doc_version: 3
doc_updated_at: "2026-04-21T09:13:44.079Z"
doc_updated_by: "CODER"
description: "Raise CLI HTTP fetch tolerance and add focused retry behavior so transient slow networks do not produce false E_NETWORK failures."
sections:
  Summary: "Increase the default fetch timeout and implement bounded retry/backoff for fetchJson/fetchText where appropriate."
  Scope: "In scope: packages/agentplane/src/cli/http.ts and its direct tests. Out of scope: download timeout policy, unrelated update-check UX, and network calls during planning."
  Plan: |-
    1. Inspect current HTTP helper contract and tests.
    2. Raise DEFAULT_FETCH_TIMEOUT_MS to a production-tolerant value.
    3. Add a bounded retry path that preserves existing error codes and abort semantics.
    4. Add tests for first timeout/failure then success and all attempts failing.
  Verify Steps: |-
    - Tests prove retry on transient failure and preserve final failure semantics.
    - Existing HTTP callers remain source-compatible.
    - No uncontrolled network access is introduced by tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T09:06:13.538Z — VERIFY — ok
    
    By: CODER
    
    Note: Raised CLI fetch timeout to 5000ms, added bounded retry for fetchJson/fetchText transient fetch failures, and covered retry/default-timeout behavior in cli/http tests. Verification: agentplane http test passed (9 tests) and agentplane typecheck passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:04:35.109Z, excerpt_hash=sha256:3f8fba5b5288ac235d0218c4f287a90ace275cd2229ed0f7266a36108637b5be
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert HTTP helper and test changes for this task only."
  Findings: "Source input: AUDIT H-1 and REFACTORING_PLAN E.1."
id_source: "generated"
---
## Summary

Increase the default fetch timeout and implement bounded retry/backoff for fetchJson/fetchText where appropriate.

## Scope

In scope: packages/agentplane/src/cli/http.ts and its direct tests. Out of scope: download timeout policy, unrelated update-check UX, and network calls during planning.

## Plan

1. Inspect current HTTP helper contract and tests.
2. Raise DEFAULT_FETCH_TIMEOUT_MS to a production-tolerant value.
3. Add a bounded retry path that preserves existing error codes and abort semantics.
4. Add tests for first timeout/failure then success and all attempts failing.

## Verify Steps

- Tests prove retry on transient failure and preserve final failure semantics.
- Existing HTTP callers remain source-compatible.
- No uncontrolled network access is introduced by tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T09:06:13.538Z — VERIFY — ok

By: CODER

Note: Raised CLI fetch timeout to 5000ms, added bounded retry for fetchJson/fetchText transient fetch failures, and covered retry/default-timeout behavior in cli/http tests. Verification: agentplane http test passed (9 tests) and agentplane typecheck passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:04:35.109Z, excerpt_hash=sha256:3f8fba5b5288ac235d0218c4f287a90ace275cd2229ed0f7266a36108637b5be

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert HTTP helper and test changes for this task only.

## Findings

Source input: AUDIT H-1 and REFACTORING_PLAN E.1.
