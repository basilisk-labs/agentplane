---
id: "202604071841-HWNRXM"
title: "Use base diff scope for new branch pre-push publishes"
result_summary: "Merged via PR #129."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "hooks"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-07T18:41:28.341Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T18:45:41.900Z"
  updated_by: "CODER"
  note: "Command: bun test packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; Result: pass; Evidence: new branch pushes now derive changed files from the default base ref and task-only publishes stay narrowed. Command: bun x eslint scripts/lib/pre-push-scope.mjs scripts/run-pre-push-hook.mjs packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; Result: pass; Evidence: updated hook scope code and regressions lint cleanly."
commit:
  hash: "a427b8a5cd3e8104957cf1dfa4027fd65c00fa0d"
  message: "workflow/hooks: use base diff scope for new branch pre-push publishes (HWNRXM) (#129)"
comments:
  -
    author: "CODER"
    body: "Start: derive a default-base diff for new branch pre-push publishes and cover the narrowed hook scope with regression tests."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #129 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-07T18:42:04.628Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: derive a default-base diff for new branch pre-push publishes and cover the narrowed hook scope with regression tests."
  -
    type: "verify"
    at: "2026-04-07T18:45:41.900Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; Result: pass; Evidence: new branch pushes now derive changed files from the default base ref and task-only publishes stay narrowed. Command: bun x eslint scripts/lib/pre-push-scope.mjs scripts/run-pre-push-hook.mjs packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; Result: pass; Evidence: updated hook scope code and regressions lint cleanly."
  -
    type: "status"
    at: "2026-04-07T19:00:11.587Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #129 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-07T19:00:11.593Z"
doc_updated_by: "INTEGRATOR"
description: "Detect changed files for new branch pushes from the default base ref so task-only publishes do not fall back to full-fast CI."
sections:
  Summary: |-
    Use base diff scope for new branch pre-push publishes
    
    Detect changed files for new branch pushes from the default base ref so task-only publishes do not fall back to full-fast CI.
  Scope: |-
    - In scope: Detect changed files for new branch pushes from the default base ref so task-only publishes do not fall back to full-fast CI.
    - Out of scope: unrelated refactors not required for "Use base diff scope for new branch pre-push publishes".
  Plan: "1. Derive a deterministic changed-file diff for new branch pushes from the default base ref instead of treating them as no-scope. 2. Add regression coverage for pre-push scope selection and hook behavior on new branch pushes. 3. Verify the hook routes task-only new branch publishes away from full-fast CI."
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. <Action>. Expected: <observable result>.
    2. <Action>. Expected: <observable result>.
    3. <Action>. Expected: <observable result>.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T18:45:41.900Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun test packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; Result: pass; Evidence: new branch pushes now derive changed files from the default base ref and task-only publishes stay narrowed. Command: bun x eslint scripts/lib/pre-push-scope.mjs scripts/run-pre-push-hook.mjs packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; Result: pass; Evidence: updated hook scope code and regressions lint cleanly.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T18:42:04.637Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Use base diff scope for new branch pre-push publishes

Detect changed files for new branch pushes from the default base ref so task-only publishes do not fall back to full-fast CI.

## Scope

- In scope: Detect changed files for new branch pushes from the default base ref so task-only publishes do not fall back to full-fast CI.
- Out of scope: unrelated refactors not required for "Use base diff scope for new branch pre-push publishes".

## Plan

1. Derive a deterministic changed-file diff for new branch pushes from the default base ref instead of treating them as no-scope. 2. Add regression coverage for pre-push scope selection and hook behavior on new branch pushes. 3. Verify the hook routes task-only new branch publishes away from full-fast CI.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T18:45:41.900Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; Result: pass; Evidence: new branch pushes now derive changed files from the default base ref and task-only publishes stay narrowed. Command: bun x eslint scripts/lib/pre-push-scope.mjs scripts/run-pre-push-hook.mjs packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; Result: pass; Evidence: updated hook scope code and regressions lint cleanly.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T18:42:04.637Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
