---
id: "202605292132-QRQK1M"
title: "Preserve staged index on policy hook refusal"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "code"
  - "hooks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T21:32:51.551Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T21:34:37.417Z"
  updated_by: "CODER"
  note: "Focused regression passes: bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts -t 'hooks run pre-commit blocks AGENTS.md without env override'. Static checks pass: bun run typecheck, bun run lint:core, bun run format:check, node .agentplane/policy/check-routing.mjs."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add regression coverage for issue #4313 preserving staged index after protected-policy hook refusal."
events:
  -
    type: "status"
    at: "2026-05-29T21:33:04.586Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add regression coverage for issue #4313 preserving staged index after protected-policy hook refusal."
  -
    type: "verify"
    at: "2026-05-29T21:34:37.417Z"
    author: "CODER"
    state: "ok"
    note: "Focused regression passes: bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts -t 'hooks run pre-commit blocks AGENTS.md without env override'. Static checks pass: bun run typecheck, bun run lint:core, bun run format:check, node .agentplane/policy/check-routing.mjs."
doc_version: 3
doc_updated_at: "2026-05-29T21:34:37.431Z"
doc_updated_by: "CODER"
description: "Add regression coverage for GitHub issue #4313 so managed pre-commit protected-policy refusal preserves the staged index for retry with AGENTPLANE_ALLOW_POLICY=1."
sections:
  Summary: |-
    Preserve staged index on policy hook refusal

    Add regression coverage for GitHub issue #4313 so managed pre-commit protected-policy refusal preserves the staged index for retry with AGENTPLANE_ALLOW_POLICY=1.
  Scope: |-
    - In scope: Add regression coverage for GitHub issue #4313 so managed pre-commit protected-policy refusal preserves the staged index for retry with AGENTPLANE_ALLOW_POLICY=1.
    - Out of scope: unrelated refactors not required for "Preserve staged index on policy hook refusal".
  Plan: "1. Add focused regression coverage for issue #4313 proving managed pre-commit protected-policy refusal leaves staged files intact. 2. Verify the focused hook test and lightweight static checks. 3. Open PR and merge after hosted checks."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T21:34:37.417Z — VERIFY — ok

    By: CODER

    Note: Focused regression passes: bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts -t 'hooks run pre-commit blocks AGENTS.md without env override'. Static checks pass: bun run typecheck, bun run lint:core, bun run format:check, node .agentplane/policy/check-routing.mjs.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T21:33:04.586Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605292132-QRQK1M-preserve-policy-hook-index/.agentplane/tasks/202605292132-QRQK1M/blueprint/resolved-snapshot.json
    - old_digest: 332d0080b09edf570920448a9f3dcbec331be6b0f345b7476c52da7b9ad08565
    - current_digest: 332d0080b09edf570920448a9f3dcbec331be6b0f345b7476c52da7b9ad08565
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605292132-QRQK1M

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Preserve staged index on policy hook refusal

Add regression coverage for GitHub issue #4313 so managed pre-commit protected-policy refusal preserves the staged index for retry with AGENTPLANE_ALLOW_POLICY=1.

## Scope

- In scope: Add regression coverage for GitHub issue #4313 so managed pre-commit protected-policy refusal preserves the staged index for retry with AGENTPLANE_ALLOW_POLICY=1.
- Out of scope: unrelated refactors not required for "Preserve staged index on policy hook refusal".

## Plan

1. Add focused regression coverage for issue #4313 proving managed pre-commit protected-policy refusal leaves staged files intact. 2. Verify the focused hook test and lightweight static checks. 3. Open PR and merge after hosted checks.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T21:34:37.417Z — VERIFY — ok

By: CODER

Note: Focused regression passes: bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts -t 'hooks run pre-commit blocks AGENTS.md without env override'. Static checks pass: bun run typecheck, bun run lint:core, bun run format:check, node .agentplane/policy/check-routing.mjs.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T21:33:04.586Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605292132-QRQK1M-preserve-policy-hook-index/.agentplane/tasks/202605292132-QRQK1M/blueprint/resolved-snapshot.json
- old_digest: 332d0080b09edf570920448a9f3dcbec331be6b0f345b7476c52da7b9ad08565
- current_digest: 332d0080b09edf570920448a9f3dcbec331be6b0f345b7476c52da7b9ad08565
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605292132-QRQK1M

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
