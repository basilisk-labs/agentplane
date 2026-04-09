---
id: "202604091600-348SVA"
title: "Recover hosted-close-pr merge metadata from remote close branches"
result_summary: "Merged via PR #201."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T16:01:20.354Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T16:29:24.994Z"
  updated_by: "CODER"
  note: "Verified: targeted vitest, format:check, and docs:cli:check passed after formatting hosted-close-pr.command.ts for hosted CI parity."
commit:
  hash: "a8072af0eadaab760b82fc889e31f0a7f80a15e7"
  message: "github/workflow: Recover hosted-close-pr merge metadata from remote close branches (348SVA) (#201)"
comments:
  -
    author: "CODER"
    body: "Start: make hosted-close-pr recover merge metadata from remote task-close branches instead of requiring hydrated base-side pr/meta first."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #201 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-09T16:01:27.046Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make hosted-close-pr recover merge metadata from remote task-close branches instead of requiring hydrated base-side pr/meta first."
  -
    type: "verify"
    at: "2026-04-09T16:23:56.350Z"
    author: "CODER"
    state: "ok"
    note: "Verified: target vitest and eslint passed; hosted-close-pr now recovers merged PR metadata from GitHub when base-side pr meta is stale."
  -
    type: "verify"
    at: "2026-04-09T16:29:24.994Z"
    author: "CODER"
    state: "ok"
    note: "Verified: targeted vitest, format:check, and docs:cli:check passed after formatting hosted-close-pr.command.ts for hosted CI parity."
  -
    type: "status"
    at: "2026-04-09T16:48:47.317Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #201 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-09T16:48:47.324Z"
doc_updated_by: "INTEGRATOR"
description: "Allow task hosted-close-pr to open a closure PR even when base-side pr/meta.json is stale by deriving merge metadata from the remote task-close branch and merged task PR context."
sections:
  Summary: |-
    Recover hosted-close-pr merge metadata from remote close branches
    
    Allow task hosted-close-pr to open a closure PR even when base-side pr/meta.json is stale by deriving merge metadata from the remote task-close branch and merged task PR context.
  Scope: |-
    - In scope: Allow task hosted-close-pr to open a closure PR even when base-side pr/meta.json is stale by deriving merge metadata from the remote task-close branch and merged task PR context.
    - Out of scope: unrelated refactors not required for "Recover hosted-close-pr merge metadata from remote close branches".
  Plan: |-
    1. Implement the change for "Recover hosted-close-pr merge metadata from remote close branches".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Reproduce task hosted-close-pr against a task whose remote task-close branch exists but whose base-side pr/meta.json lacks merge metadata. Expected: the command still resolves merge_sha/source branch and opens or links the closure PR.
    2. Run targeted hosted-close-pr/unit tests. Expected: existing explicit-meta behavior stays intact while the remote-branch fallback passes.
    3. Verify the closure PR body/title remain deterministic. Expected: no regression in already-supported hosted-close-pr flows.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T16:23:56.350Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: target vitest and eslint passed; hosted-close-pr now recovers merged PR metadata from GitHub when base-side pr meta is stale.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T16:01:27.068Z, excerpt_hash=sha256:7b10fdded9105f7fbaacf807100d394dd8c16d31ddefb0061f4cab70a9857dc6
    
    ### 2026-04-09T16:29:24.994Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: targeted vitest, format:check, and docs:cli:check passed after formatting hosted-close-pr.command.ts for hosted CI parity.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T16:23:56.357Z, excerpt_hash=sha256:7b10fdded9105f7fbaacf807100d394dd8c16d31ddefb0061f4cab70a9857dc6
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Recover hosted-close-pr merge metadata from remote close branches

Allow task hosted-close-pr to open a closure PR even when base-side pr/meta.json is stale by deriving merge metadata from the remote task-close branch and merged task PR context.

## Scope

- In scope: Allow task hosted-close-pr to open a closure PR even when base-side pr/meta.json is stale by deriving merge metadata from the remote task-close branch and merged task PR context.
- Out of scope: unrelated refactors not required for "Recover hosted-close-pr merge metadata from remote close branches".

## Plan

1. Implement the change for "Recover hosted-close-pr merge metadata from remote close branches".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Reproduce task hosted-close-pr against a task whose remote task-close branch exists but whose base-side pr/meta.json lacks merge metadata. Expected: the command still resolves merge_sha/source branch and opens or links the closure PR.
2. Run targeted hosted-close-pr/unit tests. Expected: existing explicit-meta behavior stays intact while the remote-branch fallback passes.
3. Verify the closure PR body/title remain deterministic. Expected: no regression in already-supported hosted-close-pr flows.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T16:23:56.350Z — VERIFY — ok

By: CODER

Note: Verified: target vitest and eslint passed; hosted-close-pr now recovers merged PR metadata from GitHub when base-side pr meta is stale.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T16:01:27.068Z, excerpt_hash=sha256:7b10fdded9105f7fbaacf807100d394dd8c16d31ddefb0061f4cab70a9857dc6

### 2026-04-09T16:29:24.994Z — VERIFY — ok

By: CODER

Note: Verified: targeted vitest, format:check, and docs:cli:check passed after formatting hosted-close-pr.command.ts for hosted CI parity.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T16:23:56.357Z, excerpt_hash=sha256:7b10fdded9105f7fbaacf807100d394dd8c16d31ddefb0061f4cab70a9857dc6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
