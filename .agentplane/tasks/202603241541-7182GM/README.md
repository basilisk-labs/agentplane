---
id: "202603241541-7182GM"
title: "Move live Codex smoke out of mandatory local fast path"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add a regression guard and doc note proving live Codex smoke stays opt-in outside mandatory local fast CI."
events:
  -
    type: "status"
    at: "2026-03-24T16:32:31.738Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a regression guard and doc note proving live Codex smoke stays opt-in outside mandatory local fast CI."
doc_version: 3
doc_updated_at: "2026-03-24T16:32:31.740Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
