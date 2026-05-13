---
id: "202605132054-5FV925"
title: "Improve generated PR body formatting"
result_summary: "Merged via PR #3683."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T20:54:46.386Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T21:05:47.994Z"
  updated_by: "CODER"
  note: "Implemented hosted PR body formatter for long verification bullets. Checks passed after final adjustment: bun test packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx eslint packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx prettier --check packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs; agentplane doctor."
  attempts: 0
commit:
  hash: "1a618ca1dc6fdcd57f97161c06d96aa6278c7f50"
  message: "Merge pull request #3683 from basilisk-labs/task/202605132054-5FV925/pr-body-format"
comments:
  -
    author: "CODER"
    body: "Start: Implement generated GitHub PR body formatting guardrails for long verification commands and cover the renderer with focused tests."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3683 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-13T20:55:21.666Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement generated GitHub PR body formatting guardrails for long verification commands and cover the renderer with focused tests."
  -
    type: "verify"
    at: "2026-05-13T20:59:41.333Z"
    author: "CODER"
    state: "ok"
    note: "Implemented hosted PR body formatter for long verification shell commands. Checks passed: bun test packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx eslint packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx prettier --check packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs; agentplane doctor."
  -
    type: "verify"
    at: "2026-05-13T21:05:47.994Z"
    author: "CODER"
    state: "ok"
    note: "Implemented hosted PR body formatter for long verification bullets. Checks passed after final adjustment: bun test packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx eslint packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx prettier --check packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs; agentplane doctor."
  -
    type: "status"
    at: "2026-05-13T21:33:41.808Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3683 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-13T21:33:41.814Z"
doc_updated_by: "INTEGRATOR"
description: "Format generated GitHub PR bodies so long verification commands render as readable fenced bash blocks instead of wide bullet lines."
sections:
  Summary: |-
    Improve generated PR body formatting
    
    Format generated GitHub PR bodies so long verification commands render as readable fenced bash blocks instead of wide bullet lines.
  Scope: |-
    - In scope: Format generated GitHub PR bodies so long verification commands render as readable fenced bash blocks instead of wide bullet lines.
    - Out of scope: unrelated refactors not required for "Improve generated PR body formatting".
  Plan: |-
    1. Inspect the PR review template that renders github-body.md and identify how Summary/Scope/Verification Markdown is projected to GitHub.
    2. Add a formatter that keeps generated GitHub PR bodies readable by moving command-heavy or long verification lines into fenced bash blocks instead of wide Markdown bullets.
    3. Cover the behavior with focused review-template tests.
    4. Verify with the declared task checks, targeted tests, and routing validation.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T20:59:41.333Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented hosted PR body formatter for long verification shell commands. Checks passed: bun test packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx eslint packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx prettier --check packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs; agentplane doctor.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T20:55:21.666Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132054-5FV925-pr-body-format/.agentplane/tasks/202605132054-5FV925/blueprint/resolved-snapshot.json
    - old_digest: fd91c4a580a0b497f6d99b9ad2fa69b310bce3a010f7ae1a437678d4b8e9bcac
    - current_digest: fd91c4a580a0b497f6d99b9ad2fa69b310bce3a010f7ae1a437678d4b8e9bcac
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605132054-5FV925
    
    ### 2026-05-13T21:05:47.994Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented hosted PR body formatter for long verification bullets. Checks passed after final adjustment: bun test packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx eslint packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx prettier --check packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs; agentplane doctor.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T20:59:41.347Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132054-5FV925-pr-body-format/.agentplane/tasks/202605132054-5FV925/blueprint/resolved-snapshot.json
    - old_digest: fd91c4a580a0b497f6d99b9ad2fa69b310bce3a010f7ae1a437678d4b8e9bcac
    - current_digest: fd91c4a580a0b497f6d99b9ad2fa69b310bce3a010f7ae1a437678d4b8e9bcac
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605132054-5FV925
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Generated GitHub PR bodies now convert long command-like verification bullets into fenced bash blocks with wrapped continuation lines.
      Impact: Future PR descriptions remain readable in GitHub instead of rendering as very wide bullet lines.
      Resolution: Added focused renderer coverage for the long-command case.
    
    - Observation: Generated GitHub PR bodies now convert long command-like verification bullets into fenced bash blocks and long prose verification bullets into wrapped fenced text blocks.
      Impact: Future PR descriptions remain readable in GitHub instead of rendering as very wide bullet lines.
      Resolution: Added focused renderer coverage for both long shell-command and long prose verification notes.
id_source: "generated"
---
## Summary

Improve generated PR body formatting

Format generated GitHub PR bodies so long verification commands render as readable fenced bash blocks instead of wide bullet lines.

## Scope

- In scope: Format generated GitHub PR bodies so long verification commands render as readable fenced bash blocks instead of wide bullet lines.
- Out of scope: unrelated refactors not required for "Improve generated PR body formatting".

## Plan

1. Inspect the PR review template that renders github-body.md and identify how Summary/Scope/Verification Markdown is projected to GitHub.
2. Add a formatter that keeps generated GitHub PR bodies readable by moving command-heavy or long verification lines into fenced bash blocks instead of wide Markdown bullets.
3. Cover the behavior with focused review-template tests.
4. Verify with the declared task checks, targeted tests, and routing validation.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T20:59:41.333Z — VERIFY — ok

By: CODER

Note: Implemented hosted PR body formatter for long verification shell commands. Checks passed: bun test packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx eslint packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx prettier --check packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs; agentplane doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T20:55:21.666Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132054-5FV925-pr-body-format/.agentplane/tasks/202605132054-5FV925/blueprint/resolved-snapshot.json
- old_digest: fd91c4a580a0b497f6d99b9ad2fa69b310bce3a010f7ae1a437678d4b8e9bcac
- current_digest: fd91c4a580a0b497f6d99b9ad2fa69b310bce3a010f7ae1a437678d4b8e9bcac
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605132054-5FV925

### 2026-05-13T21:05:47.994Z — VERIFY — ok

By: CODER

Note: Implemented hosted PR body formatter for long verification bullets. Checks passed after final adjustment: bun test packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx eslint packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx prettier --check packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs; agentplane doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T20:59:41.347Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132054-5FV925-pr-body-format/.agentplane/tasks/202605132054-5FV925/blueprint/resolved-snapshot.json
- old_digest: fd91c4a580a0b497f6d99b9ad2fa69b310bce3a010f7ae1a437678d4b8e9bcac
- current_digest: fd91c4a580a0b497f6d99b9ad2fa69b310bce3a010f7ae1a437678d4b8e9bcac
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605132054-5FV925

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Generated GitHub PR bodies now convert long command-like verification bullets into fenced bash blocks with wrapped continuation lines.
  Impact: Future PR descriptions remain readable in GitHub instead of rendering as very wide bullet lines.
  Resolution: Added focused renderer coverage for the long-command case.

- Observation: Generated GitHub PR bodies now convert long command-like verification bullets into fenced bash blocks and long prose verification bullets into wrapped fenced text blocks.
  Impact: Future PR descriptions remain readable in GitHub instead of rendering as very wide bullet lines.
  Resolution: Added focused renderer coverage for both long shell-command and long prose verification notes.
