---
id: "202605221726-1DX1BA"
title: "Make flow repair apply safe branch_pr repairs"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "workflow"
verify:
  - "Confirm provider merge and approval actions are never executed by safe-apply."
  - "Run branch_pr route-decision tests for missing branch, stale PR metadata, missing close-tail, and stale cleanup."
  - "Run flow repair unit tests for dry-run and safe-apply modes."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:26:31.553Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T21:34:30.309Z"
  updated_by: "EVALUATOR"
  note: "Evaluator check: safe-apply is bounded to deterministic local repairs, JSON output remains machine-readable during nested pr update, and provider merge/approval steps are explicitly skipped."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T21:34:30.309Z"
  updated_by: "EVALUATOR"
  note: "Evaluator check: safe-apply is bounded to deterministic local repairs, JSON output remains machine-readable during nested pr update, and provider merge/approval steps are explicitly skipped."
  evaluated_sha: "def63e8b484a53d37f062afc3c66aa803e7d223d"
  blueprint_digest: "6e1176c7c06b5f65db957b601c4df8940714514300ea49a34d975a49c9c0e90e"
  evidence_refs:
    - ".agentplane/tasks/202605221726-1DX1BA/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-1DX1BA-flow-repair-safe-apply/.agentplane/tasks/202605221726-1DX1BA/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing safe-apply flow repair for deterministic branch_pr repairs while keeping provider merge and approval actions gated."
events:
  -
    type: "status"
    at: "2026-05-22T21:26:43.854Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing safe-apply flow repair for deterministic branch_pr repairs while keeping provider merge and approval actions gated."
  -
    type: "verify"
    at: "2026-05-22T21:34:21.530Z"
    author: "CODER"
    state: "ok"
    note: "Verified safe-apply behavior: provider/approval steps are skipped, stale PR artifacts update through pr update, and targeted hosted-close/status route tests plus typecheck, knip, CLI docs check, lint, and framework bootstrap passed."
  -
    type: "verify"
    at: "2026-05-22T21:34:30.309Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluator check: safe-apply is bounded to deterministic local repairs, JSON output remains machine-readable during nested pr update, and provider merge/approval steps are explicitly skipped."
doc_version: 3
doc_updated_at: "2026-05-22T21:34:30.337Z"
doc_updated_by: "CODER"
description: "Extend flow repair beyond dry-run for safe mechanical branch_pr repairs such as PR metadata refresh, branch fetch, hosted close-tail opening, and stale worktree cleanup while keeping merge/publish/provider actions approval-gated."
sections:
  Summary: |-
    Make flow repair apply safe branch_pr repairs

    Extend flow repair beyond dry-run for safe mechanical branch_pr repairs such as PR metadata refresh, branch fetch, hosted close-tail opening, and stale worktree cleanup while keeping merge/publish/provider actions approval-gated.
  Scope: |-
    - In scope: Extend flow repair beyond dry-run for safe mechanical branch_pr repairs such as PR metadata refresh, branch fetch, hosted close-tail opening, and stale worktree cleanup while keeping merge/publish/provider actions approval-gated.
    - Out of scope: unrelated refactors not required for "Make flow repair apply safe branch_pr repairs".
  Plan: "Add an explicit safe-apply mode for flow repair. Limit mutation to deterministic local or lifecycle repairs that are already printed by dry-run. Keep provider merges, approvals, verification verdicts, and scope changes out of automatic repair. Verify every repair class separately."
  Verify Steps: |-
    1. Run flow repair unit tests for dry-run and safe-apply modes.
    2. Run branch_pr route-decision tests for missing branch, stale PR metadata, missing close-tail, and stale cleanup.
    3. Confirm provider merge and approval actions are never executed by safe-apply.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T21:34:21.530Z — VERIFY — ok

    By: CODER

    Note: Verified safe-apply behavior: provider/approval steps are skipped, stale PR artifacts update through pr update, and targeted hosted-close/status route tests plus typecheck, knip, CLI docs check, lint, and framework bootstrap passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T21:26:43.854Z, excerpt_hash=sha256:00bb2a3ca1c0c85ff96c5794d6a7d53e984ed92ef64c9f82e069c231b666a81b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-1DX1BA-flow-repair-safe-apply/.agentplane/tasks/202605221726-1DX1BA/blueprint/resolved-snapshot.json
    - old_digest: 6e1176c7c06b5f65db957b601c4df8940714514300ea49a34d975a49c9c0e90e
    - current_digest: 6e1176c7c06b5f65db957b601c4df8940714514300ea49a34d975a49c9c0e90e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221726-1DX1BA

    ### 2026-05-22T21:34:30.309Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluator check: safe-apply is bounded to deterministic local repairs, JSON output remains machine-readable during nested pr update, and provider merge/approval steps are explicitly skipped.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T21:34:21.557Z, excerpt_hash=sha256:00bb2a3ca1c0c85ff96c5794d6a7d53e984ed92ef64c9f82e069c231b666a81b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-1DX1BA-flow-repair-safe-apply/.agentplane/tasks/202605221726-1DX1BA/blueprint/resolved-snapshot.json
    - old_digest: 6e1176c7c06b5f65db957b601c4df8940714514300ea49a34d975a49c9c0e90e
    - current_digest: 6e1176c7c06b5f65db957b601c4df8940714514300ea49a34d975a49c9c0e90e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221726-1DX1BA

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make flow repair apply safe branch_pr repairs

Extend flow repair beyond dry-run for safe mechanical branch_pr repairs such as PR metadata refresh, branch fetch, hosted close-tail opening, and stale worktree cleanup while keeping merge/publish/provider actions approval-gated.

## Scope

- In scope: Extend flow repair beyond dry-run for safe mechanical branch_pr repairs such as PR metadata refresh, branch fetch, hosted close-tail opening, and stale worktree cleanup while keeping merge/publish/provider actions approval-gated.
- Out of scope: unrelated refactors not required for "Make flow repair apply safe branch_pr repairs".

## Plan

Add an explicit safe-apply mode for flow repair. Limit mutation to deterministic local or lifecycle repairs that are already printed by dry-run. Keep provider merges, approvals, verification verdicts, and scope changes out of automatic repair. Verify every repair class separately.

## Verify Steps

1. Run flow repair unit tests for dry-run and safe-apply modes.
2. Run branch_pr route-decision tests for missing branch, stale PR metadata, missing close-tail, and stale cleanup.
3. Confirm provider merge and approval actions are never executed by safe-apply.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T21:34:21.530Z — VERIFY — ok

By: CODER

Note: Verified safe-apply behavior: provider/approval steps are skipped, stale PR artifacts update through pr update, and targeted hosted-close/status route tests plus typecheck, knip, CLI docs check, lint, and framework bootstrap passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T21:26:43.854Z, excerpt_hash=sha256:00bb2a3ca1c0c85ff96c5794d6a7d53e984ed92ef64c9f82e069c231b666a81b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-1DX1BA-flow-repair-safe-apply/.agentplane/tasks/202605221726-1DX1BA/blueprint/resolved-snapshot.json
- old_digest: 6e1176c7c06b5f65db957b601c4df8940714514300ea49a34d975a49c9c0e90e
- current_digest: 6e1176c7c06b5f65db957b601c4df8940714514300ea49a34d975a49c9c0e90e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221726-1DX1BA

### 2026-05-22T21:34:30.309Z — VERIFY — ok

By: EVALUATOR

Note: Evaluator check: safe-apply is bounded to deterministic local repairs, JSON output remains machine-readable during nested pr update, and provider merge/approval steps are explicitly skipped.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T21:34:21.557Z, excerpt_hash=sha256:00bb2a3ca1c0c85ff96c5794d6a7d53e984ed92ef64c9f82e069c231b666a81b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-1DX1BA-flow-repair-safe-apply/.agentplane/tasks/202605221726-1DX1BA/blueprint/resolved-snapshot.json
- old_digest: 6e1176c7c06b5f65db957b601c4df8940714514300ea49a34d975a49c9c0e90e
- current_digest: 6e1176c7c06b5f65db957b601c4df8940714514300ea49a34d975a49c9c0e90e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221726-1DX1BA

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
