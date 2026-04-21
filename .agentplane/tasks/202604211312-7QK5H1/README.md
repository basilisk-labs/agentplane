---
id: "202604211312-7QK5H1"
title: "Close testkit boundary rule gaps"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-21T13:12:35.719Z"
doc_updated_by: "PLANNER"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
