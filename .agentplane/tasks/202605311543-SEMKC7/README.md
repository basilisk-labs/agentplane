---
id: "202605311543-SEMKC7"
title: "Explain blocked GitHub merge states"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "github"
  - "integration"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
verify:
  - "bun run test -- pr"
  - "bun run verify:cli"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:51.374Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-31T16:06:32.436Z"
  updated_by: "CODER"
  note: "Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-31T16:07:56.724Z"
  updated_by: "EVALUATOR"
  note: "Release recovery CLI/policy improvement batch passes targeted verification."
  evaluated_sha: "c7c33342a9051d9f3c5e30b668b0b53e8137a5a7"
  blueprint_digest: "6a40393be3028f364870d62257284725fa87f2501cbcb90a397255ded0c9b607"
  evidence_refs:
    - ".agentplane/tasks/202605311543-SEMKC7/README.md"
    - ".agentplane/tasks/202605311543-SEMKC7/quality/20260531-160756724-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605311543-SEMKC7/quality/20260531-160756724-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605311543-SEMKC7/quality/20260531-160756724-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605311543-SEMKC7/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/shared/route-decision-next-action.ts"
    - "packages/agentplane/src/commands/pr/internal/sync-github.ts"
    - "packages/agentplane/src/commands/branch/cleanup-merged.ts"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Implementation commit c7c33342a addresses the approved task scope; targeted typecheck, formatting, policy, agents, route decision, cleanup, evaluator, PR open/lifecycle, and help snapshot checks passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-05-31T15:53:32.406Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-31T16:06:32.436Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed."
doc_version: 3
doc_updated_at: "2026-05-31T16:06:32.461Z"
doc_updated_by: "CODER"
description: "Extend ap pr check to explain GitHub mergeStateStatus=BLOCKED with review/protection/auto-merge context and emit the next permitted action instead of only reporting green checks."
sections:
  Summary: |-
    Explain blocked GitHub merge states

    Extend ap pr check to explain GitHub mergeStateStatus=BLOCKED with review/protection/auto-merge context and emit the next permitted action instead of only reporting green checks.
  Scope: |-
    - In scope: Extend ap pr check to explain GitHub mergeStateStatus=BLOCKED with review/protection/auto-merge context and emit the next permitted action instead of only reporting green checks.
    - Out of scope: unrelated refactors not required for "Explain blocked GitHub merge states".
  Plan: |-
    1. Capture GitHub mergeStateStatus=BLOCKED fixtures with green checks.
    2. Extend ap pr check to report review, branch protection, auto-merge, and merge queue reasons when available.
    3. Emit one permitted next action for wait, request review, enable auto-merge, or integrate route.
    4. Verify output remains concise for normal CLEAN PRs.
  Verify Steps: |-
    PLANNER fallback scaffold for "Explain blocked GitHub merge states". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Explain blocked GitHub merge states". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-31T16:06:32.436Z — VERIFY — ok

    By: CODER

    Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:32.406Z, excerpt_hash=sha256:410e694ceda74578ddfe5f14dbbcdc216bc3ba35155b1713d814eed28f5712df

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-SEMKC7/blueprint/resolved-snapshot.json
    - old_digest: 6a40393be3028f364870d62257284725fa87f2501cbcb90a397255ded0c9b607
    - current_digest: 6a40393be3028f364870d62257284725fa87f2501cbcb90a397255ded0c9b607
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-SEMKC7

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Explain blocked GitHub merge states

Extend ap pr check to explain GitHub mergeStateStatus=BLOCKED with review/protection/auto-merge context and emit the next permitted action instead of only reporting green checks.

## Scope

- In scope: Extend ap pr check to explain GitHub mergeStateStatus=BLOCKED with review/protection/auto-merge context and emit the next permitted action instead of only reporting green checks.
- Out of scope: unrelated refactors not required for "Explain blocked GitHub merge states".

## Plan

1. Capture GitHub mergeStateStatus=BLOCKED fixtures with green checks.
2. Extend ap pr check to report review, branch protection, auto-merge, and merge queue reasons when available.
3. Emit one permitted next action for wait, request review, enable auto-merge, or integrate route.
4. Verify output remains concise for normal CLEAN PRs.

## Verify Steps

PLANNER fallback scaffold for "Explain blocked GitHub merge states". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Explain blocked GitHub merge states". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-31T16:06:32.436Z — VERIFY — ok

By: CODER

Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:32.406Z, excerpt_hash=sha256:410e694ceda74578ddfe5f14dbbcdc216bc3ba35155b1713d814eed28f5712df

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-SEMKC7/blueprint/resolved-snapshot.json
- old_digest: 6a40393be3028f364870d62257284725fa87f2501cbcb90a397255ded0c9b607
- current_digest: 6a40393be3028f364870d62257284725fa87f2501cbcb90a397255ded0c9b607
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-SEMKC7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
