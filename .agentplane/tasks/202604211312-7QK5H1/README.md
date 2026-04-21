---
id: "202604211312-7QK5H1"
title: "Close testkit boundary rule gaps"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604211312-A8AS1Q"
tags:
  - "architecture"
  - "lint"
  - "testkit"
verify:
  - "bun run arch:check"
  - "bun run lint:core"
  - "bun run test:project -- cli-unit"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:12:36.648Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T17:09:42.831Z"
  updated_by: "CODER"
  note: "Verified testkit boundary rule gaps. Checks: bun run arch:check passed; bun run lint:core passed; bun run test:project -- cli-unit passed (63 files, 629 tests); bun run format:check passed; git diff --check passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: close testkit architecture boundary gaps for source, dist, and package-alias imports while preserving test-only surfaces."
events:
  -
    type: "status"
    at: "2026-04-21T17:06:40.260Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: close testkit architecture boundary gaps for source, dist, and package-alias imports while preserving test-only surfaces."
  -
    type: "verify"
    at: "2026-04-21T17:09:42.831Z"
    author: "CODER"
    state: "ok"
    note: "Verified testkit boundary rule gaps. Checks: bun run arch:check passed; bun run lint:core passed; bun run test:project -- cli-unit passed (63 files, 629 tests); bun run format:check passed; git diff --check passed."
doc_version: 3
doc_updated_at: "2026-04-21T17:09:42.834Z"
doc_updated_by: "CODER"
description: "Extend architecture rules so runtime code cannot import packages/testkit/src, packages/testkit/dist, or @agentplane/testkit outside approved test-only surfaces."
sections:
  Summary: |-
    Close testkit boundary rule gaps

    Extend architecture rules so runtime code cannot import packages/testkit/src, packages/testkit/dist, or @agentplane/testkit outside approved test-only surfaces.
  Scope: |-
    - In scope: Extend architecture rules so runtime code cannot import packages/testkit/src, packages/testkit/dist, or @agentplane/testkit outside approved test-only surfaces.
    - Out of scope: unrelated refactors not required for "Close testkit boundary rule gaps".
  Plan: "Scope: make the testkit boundary enforce the real import surfaces. Steps: 1. Extend dep-cruise rules to match packages/testkit/(src|dist) and @agentplane/testkit. 2. Add explicit test-file or testing facade exceptions only where intentional. 3. Add a regression fixture/check if available. Acceptance: a runtime import of @agentplane/testkit fails arch:check; existing test-only imports pass."
  Verify Steps: |-
    1. Review the requested outcome for "Close testkit boundary rule gaps". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T17:09:42.831Z — VERIFY — ok

    By: CODER

    Note: Verified testkit boundary rule gaps. Checks: bun run arch:check passed; bun run lint:core passed; bun run test:project -- cli-unit passed (63 files, 629 tests); bun run format:check passed; git diff --check passed.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T17:06:40.268Z, excerpt_hash=sha256:a9ce382c13e2f145b2707231bad7f25b0f27c3e76562f988517ec686588fefbb

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Close testkit boundary rule gaps

Extend architecture rules so runtime code cannot import packages/testkit/src, packages/testkit/dist, or @agentplane/testkit outside approved test-only surfaces.

## Scope

- In scope: Extend architecture rules so runtime code cannot import packages/testkit/src, packages/testkit/dist, or @agentplane/testkit outside approved test-only surfaces.
- Out of scope: unrelated refactors not required for "Close testkit boundary rule gaps".

## Plan

Scope: make the testkit boundary enforce the real import surfaces. Steps: 1. Extend dep-cruise rules to match packages/testkit/(src|dist) and @agentplane/testkit. 2. Add explicit test-file or testing facade exceptions only where intentional. 3. Add a regression fixture/check if available. Acceptance: a runtime import of @agentplane/testkit fails arch:check; existing test-only imports pass.

## Verify Steps

1. Review the requested outcome for "Close testkit boundary rule gaps". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T17:09:42.831Z — VERIFY — ok

By: CODER

Note: Verified testkit boundary rule gaps. Checks: bun run arch:check passed; bun run lint:core passed; bun run test:project -- cli-unit passed (63 files, 629 tests); bun run format:check passed; git diff --check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T17:06:40.268Z, excerpt_hash=sha256:a9ce382c13e2f145b2707231bad7f25b0f27c3e76562f988517ec686588fefbb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
