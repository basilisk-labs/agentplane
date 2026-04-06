---
id: "202604062101-XYXG7Y"
title: "Retry hosted merge sync gh fallback on transient transport errors"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T21:02:48.599Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T21:31:56.163Z"
  updated_by: "CODER"
  note: "Focused vitest, eslint, and prettier check passed after formatting hosted-merge-sync.test.ts for CI parity; scope: XYXG7Y hosted merge sync retry path."
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-04-06T21:06:56.715Z"
    author: "CODER"
    state: "ok"
    note: "Verified: hosted merge sync now retries transient gh transport failures while preserving immediate auth/usage failures; focused vitest and eslint passed."
  -
    type: "verify"
    at: "2026-04-06T21:31:56.163Z"
    author: "CODER"
    state: "ok"
    note: "Focused vitest, eslint, and prettier check passed after formatting hosted-merge-sync.test.ts for CI parity; scope: XYXG7Y hosted merge sync retry path."
doc_version: 3
doc_updated_at: "2026-04-06T21:31:56.180Z"
doc_updated_by: "CODER"
description: "Harden the gh-based hosted merge sync fallback by retrying transient EOF/TLS failures so reconcile paths survive flaky GitHub transport without manual loops."
sections:
  Summary: |-
    Retry hosted merge sync gh fallback on transient transport errors
    
    Harden the gh-based hosted merge sync fallback by retrying transient EOF/TLS failures so reconcile paths survive flaky GitHub transport without manual loops.
  Scope: |-
    - In scope: Harden the gh-based hosted merge sync fallback by retrying transient EOF/TLS failures so reconcile paths survive flaky GitHub transport without manual loops.
    - Out of scope: unrelated refactors not required for "Retry hosted merge sync gh fallback on transient transport errors".
  Plan: "1. Isolate the gh fallback used by hosted merge sync and identify transient transport failures worth retrying. 2. Add bounded retry/backoff around transient EOF/TLS failures without masking permanent auth/usage errors. 3. Verify with focused unit/command tests."
  Verify Steps: |-
    - Run focused vitest coverage for hosted merge sync fallback retry behavior.
    - Run eslint on the touched hosted-merge-sync source/tests.
    - Confirm permanent auth/usage failures still surface immediately while transient EOF/TLS failures retry within bounded limits.
  Verification: |-
    - Command: bunx vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
      Result: pass
      Evidence: 6 tests passed; transient EOF retry path succeeded after a delayed gh lookup; permanent auth failure stayed immediate.
      Scope: hosted merge sync fallback retry behavior.
    - Command: bunx eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
      Result: pass
      Evidence: no lint errors.
      Scope: hosted merge sync source and tests.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T21:06:56.715Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: hosted merge sync now retries transient gh transport failures while preserving immediate auth/usage failures; focused vitest and eslint passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T21:06:49.469Z, excerpt_hash=sha256:e62571ef15b172b204b7c11f0228c801c9eb650da29d4484a41a8ede1be397e3
    
    ### 2026-04-06T21:31:56.163Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused vitest, eslint, and prettier check passed after formatting hosted-merge-sync.test.ts for CI parity; scope: XYXG7Y hosted merge sync retry path.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T21:06:56.719Z, excerpt_hash=sha256:e62571ef15b172b204b7c11f0228c801c9eb650da29d4484a41a8ede1be397e3
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - The gh fallback path in hosted merge sync must stay narrow: retry transient transport failures only, and keep auth/usage failures immediate.
    - Fresh task worktrees may still need bun run framework:dev:bootstrap before targeted tests can resolve the repo-local runtime.
id_source: "generated"
---
## Summary

Retry hosted merge sync gh fallback on transient transport errors

Harden the gh-based hosted merge sync fallback by retrying transient EOF/TLS failures so reconcile paths survive flaky GitHub transport without manual loops.

## Scope

- In scope: Harden the gh-based hosted merge sync fallback by retrying transient EOF/TLS failures so reconcile paths survive flaky GitHub transport without manual loops.
- Out of scope: unrelated refactors not required for "Retry hosted merge sync gh fallback on transient transport errors".

## Plan

1. Isolate the gh fallback used by hosted merge sync and identify transient transport failures worth retrying. 2. Add bounded retry/backoff around transient EOF/TLS failures without masking permanent auth/usage errors. 3. Verify with focused unit/command tests.

## Verify Steps

- Run focused vitest coverage for hosted merge sync fallback retry behavior.
- Run eslint on the touched hosted-merge-sync source/tests.
- Confirm permanent auth/usage failures still surface immediately while transient EOF/TLS failures retry within bounded limits.

## Verification

- Command: bunx vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
  Result: pass
  Evidence: 6 tests passed; transient EOF retry path succeeded after a delayed gh lookup; permanent auth failure stayed immediate.
  Scope: hosted merge sync fallback retry behavior.
- Command: bunx eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
  Result: pass
  Evidence: no lint errors.
  Scope: hosted merge sync source and tests.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T21:06:56.715Z — VERIFY — ok

By: CODER

Note: Verified: hosted merge sync now retries transient gh transport failures while preserving immediate auth/usage failures; focused vitest and eslint passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T21:06:49.469Z, excerpt_hash=sha256:e62571ef15b172b204b7c11f0228c801c9eb650da29d4484a41a8ede1be397e3

### 2026-04-06T21:31:56.163Z — VERIFY — ok

By: CODER

Note: Focused vitest, eslint, and prettier check passed after formatting hosted-merge-sync.test.ts for CI parity; scope: XYXG7Y hosted merge sync retry path.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T21:06:56.719Z, excerpt_hash=sha256:e62571ef15b172b204b7c11f0228c801c9eb650da29d4484a41a8ede1be397e3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- The gh fallback path in hosted merge sync must stay narrow: retry transient transport failures only, and keep auth/usage failures immediate.
- Fresh task worktrees may still need bun run framework:dev:bootstrap before targeted tests can resolve the repo-local runtime.
