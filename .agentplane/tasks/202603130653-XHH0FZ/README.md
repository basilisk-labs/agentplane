---
id: "202603130653-XHH0FZ"
title: "Teach release recovery to read publish-result artifact"
result_summary: "Release recovery now reads publish-result when available and falls back to workflow-state inference only when the artifact is missing or unavailable."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T06:55:24.447Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T07:15:45.371Z"
  updated_by: "CODER"
  note: "Verified publish-result-aware release recovery: release-recovery-script suite, release-critical, eslint, and prettier all pass."
commit:
  hash: "d008bb6b3c1d65363e7835b61fdc816055d8840a"
  message: "🧾 XHH0FZ task: prefer publish-result in release recovery"
comments:
  -
    author: "CODER"
    body: "Start: teach release recovery to read publish-result artifact contents first and only fall back to workflow-state inference when that canonical output artifact is missing."
  -
    author: "CODER"
    body: "Verified: publish-result-aware recovery now prefers the canonical artifact over workflow-state inference, distinguishes incomplete publish outcomes, and reports explicit post-publish state in release recovery."
events:
  -
    type: "status"
    at: "2026-03-13T07:00:00.064Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: teach release recovery to read publish-result artifact contents first and only fall back to workflow-state inference when that canonical output artifact is missing."
  -
    type: "verify"
    at: "2026-03-13T07:15:45.371Z"
    author: "CODER"
    state: "ok"
    note: "Verified publish-result-aware release recovery: release-recovery-script suite, release-critical, eslint, and prettier all pass."
  -
    type: "status"
    at: "2026-03-13T07:16:49.864Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: publish-result-aware recovery now prefers the canonical artifact over workflow-state inference, distinguishes incomplete publish outcomes, and reports explicit post-publish state in release recovery."
doc_version: 3
doc_updated_at: "2026-03-13T07:16:49.866Z"
doc_updated_by: "CODER"
description: "Consume the publish-result artifact when present so release recovery reports published outcomes from canonical data before falling back to inference."
id_source: "generated"
---
## Summary

Teach release recovery to read publish-result artifact

Consume the publish-result artifact when present so release recovery reports published outcomes from canonical data before falling back to inference.

## Scope

- In scope: Consume the publish-result artifact when present so release recovery reports published outcomes from canonical data before falling back to inference.
- Out of scope: unrelated refactors not required for "Teach release recovery to read publish-result artifact".

## Plan

1. Teach `release:recover` to prefer `publish-result` artifact data when a publish run exists for the release SHA.
2. Fall back to workflow-state inference only when the publish-result artifact is missing or unavailable.
3. Cover both canonical and fallback paths with release recovery regression tests.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/release-recovery-script.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: recovery prefers publish-result data when present and preserves fallback behavior otherwise.
2. Run `bun run test:release:critical`. Expected: release recovery and smoke paths stay green after the artifact consumption change.
3. Inspect `scripts/check-release-recovery-state.mjs`. Expected: publish-result artifact is read before publish workflow status inference.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T07:15:45.371Z — VERIFY — ok

By: CODER

Note: Verified publish-result-aware release recovery: release-recovery-script suite, release-critical, eslint, and prettier all pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T07:00:00.065Z, excerpt_hash=sha256:40fc4055d4fbe4a602f1138814c8039a5a39c11de58003be13007cb6e59bc339

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
