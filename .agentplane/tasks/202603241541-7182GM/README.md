---
id: "202603241541-7182GM"
title: "Move live Codex smoke out of mandatory local fast path"
result_summary: "Live Codex smoke remains first-class for manual runner probing but is now explicitly guarded outside ci:local:fast and default pre-push flows."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "ci"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T16:32:23.187Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T16:34:07.983Z"
  updated_by: "CODER"
  note: "Checks passed: bunx vitest run packages/agentplane/src/runner/codex-smoke.test.ts; bun run --filter=agentplane build; bunx prettier --check packages/agentplane/src/runner/codex-smoke.test.ts docs/developer/testing-and-quality.mdx. Confirmed live Codex smoke remains manual-only and is not referenced by ci:local or pre-push fast path."
commit:
  hash: "057d05c9bdf25b29a51311750a0cffa203c5b707"
  message: "✅ 7182GM code: done"
comments:
  -
    author: "CODER"
    body: "Start: add a regression guard and doc note proving live Codex smoke stays opt-in outside mandatory local fast CI."
  -
    author: "CODER"
    body: "Verified: live Codex smoke stays opt-in, documented as manual-only, and guarded against accidental inclusion in the mandatory local fast path."
events:
  -
    type: "status"
    at: "2026-03-24T16:32:31.738Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a regression guard and doc note proving live Codex smoke stays opt-in outside mandatory local fast CI."
  -
    type: "verify"
    at: "2026-03-24T16:34:07.983Z"
    author: "CODER"
    state: "ok"
    note: "Checks passed: bunx vitest run packages/agentplane/src/runner/codex-smoke.test.ts; bun run --filter=agentplane build; bunx prettier --check packages/agentplane/src/runner/codex-smoke.test.ts docs/developer/testing-and-quality.mdx. Confirmed live Codex smoke remains manual-only and is not referenced by ci:local or pre-push fast path."
  -
    type: "status"
    at: "2026-03-24T16:34:13.783Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: live Codex smoke stays opt-in, documented as manual-only, and guarded against accidental inclusion in the mandatory local fast path."
doc_version: 3
doc_updated_at: "2026-03-24T16:34:13.784Z"
doc_updated_by: "CODER"
description: "Keep the live Codex smoke harness first-class but decouple it from mandatory local pre-push fast CI so local pushes rely on deterministic checks while live smoke remains runnable on demand or scheduled."
sections:
  Summary: |-
    Move live Codex smoke out of mandatory local fast path
    
    Keep the live Codex smoke harness first-class but decouple it from mandatory local pre-push fast CI so local pushes rely on deterministic checks while live smoke remains runnable on demand or scheduled.
  Scope: |-
    - In scope: Keep the live Codex smoke harness first-class but decouple it from mandatory local pre-push fast CI so local pushes rely on deterministic checks while live smoke remains runnable on demand or scheduled.
    - Out of scope: unrelated refactors not required for "Move live Codex smoke out of mandatory local fast path".
  Plan: |-
    1. Inspect the local fast CI and hook path to confirm where live Codex smoke is or is not referenced today.
    2. Add a regression guard that proves the live smoke harness stays opt-in and is not invoked by mandatory local fast CI or pre-push plumbing.
    3. Update developer guidance so live smoke remains first-class for manual regression checks while fast local gates stay deterministic.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/runner/codex-smoke.test.ts`. Expected: the smoke harness classification tests pass and the new guard confirms live smoke stays opt-in outside mandatory fast CI.
    2. Run `bun run --filter=agentplane build`. Expected: the agentplane package builds successfully after the smoke-harness contract update.
    3. Review the updated developer guidance for local quality gates. Expected: docs explicitly state that live Codex smoke is on-demand and not part of the mandatory `ci:local:fast` or `pre-push` path.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T16:34:07.983Z — VERIFY — ok
    
    By: CODER
    
    Note: Checks passed: bunx vitest run packages/agentplane/src/runner/codex-smoke.test.ts; bun run --filter=agentplane build; bunx prettier --check packages/agentplane/src/runner/codex-smoke.test.ts docs/developer/testing-and-quality.mdx. Confirmed live Codex smoke remains manual-only and is not referenced by ci:local or pre-push fast path.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T16:32:31.740Z, excerpt_hash=sha256:0eedf128c4e0a78a69d0bd97b1e593f2d43fd3b3c9cfdc680e60a5c973ae988e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Move live Codex smoke out of mandatory local fast path

Keep the live Codex smoke harness first-class but decouple it from mandatory local pre-push fast CI so local pushes rely on deterministic checks while live smoke remains runnable on demand or scheduled.

## Scope

- In scope: Keep the live Codex smoke harness first-class but decouple it from mandatory local pre-push fast CI so local pushes rely on deterministic checks while live smoke remains runnable on demand or scheduled.
- Out of scope: unrelated refactors not required for "Move live Codex smoke out of mandatory local fast path".

## Plan

1. Inspect the local fast CI and hook path to confirm where live Codex smoke is or is not referenced today.
2. Add a regression guard that proves the live smoke harness stays opt-in and is not invoked by mandatory local fast CI or pre-push plumbing.
3. Update developer guidance so live smoke remains first-class for manual regression checks while fast local gates stay deterministic.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/runner/codex-smoke.test.ts`. Expected: the smoke harness classification tests pass and the new guard confirms live smoke stays opt-in outside mandatory fast CI.
2. Run `bun run --filter=agentplane build`. Expected: the agentplane package builds successfully after the smoke-harness contract update.
3. Review the updated developer guidance for local quality gates. Expected: docs explicitly state that live Codex smoke is on-demand and not part of the mandatory `ci:local:fast` or `pre-push` path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T16:34:07.983Z — VERIFY — ok

By: CODER

Note: Checks passed: bunx vitest run packages/agentplane/src/runner/codex-smoke.test.ts; bun run --filter=agentplane build; bunx prettier --check packages/agentplane/src/runner/codex-smoke.test.ts docs/developer/testing-and-quality.mdx. Confirmed live Codex smoke remains manual-only and is not referenced by ci:local or pre-push fast path.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T16:32:31.740Z, excerpt_hash=sha256:0eedf128c4e0a78a69d0bd97b1e593f2d43fd3b3c9cfdc680e60a5c973ae988e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
