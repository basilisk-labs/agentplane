---
id: "202605311543-SCWWPR"
title: "Add release task reconciliation command"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "release"
  - "task-registry"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run release:tasks:check"
  - "bun run verify:cli"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:45.214Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-31T16:09:38.458Z"
  updated_by: "CODER"
  note: "Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-31T16:07:21.687Z"
  updated_by: "EVALUATOR"
  note: "Release recovery CLI/policy improvement batch passes targeted verification."
  evaluated_sha: "c7c33342a9051d9f3c5e30b668b0b53e8137a5a7"
  blueprint_digest: "6c103c79ad62cd42d7d01475580312163f2a8862e272c8dbad1dba2b1e5efa9b"
  evidence_refs:
    - ".agentplane/tasks/202605311543-SCWWPR/README.md"
    - ".agentplane/tasks/202605311543-SCWWPR/quality/20260531-160721687-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605311543-SCWWPR/quality/20260531-160721687-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605311543-SCWWPR/quality/20260531-160721687-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605311543-SCWWPR/blueprint/resolved-snapshot.json"
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
    at: "2026-05-31T15:53:29.162Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-31T16:06:16.351Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed."
  -
    type: "verify"
    at: "2026-05-31T16:09:38.458Z"
    author: "CODER"
    state: "ok"
    note: "Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture."
doc_version: 3
doc_updated_at: "2026-05-31T16:09:38.483Z"
doc_updated_by: "CODER"
description: "Add an operator command that reconciles release-blocking verified DOING tasks in batch, records landed PR evidence, writes evaluator/finish metadata, and prepares a safe closure branch."
sections:
  Summary: |-
    Add release task reconciliation command

    Add an operator command that reconciles release-blocking verified DOING tasks in batch, records landed PR evidence, writes evaluator/finish metadata, and prepares a safe closure branch.
  Scope: |-
    - In scope: Add an operator command that reconciles release-blocking verified DOING tasks in batch, records landed PR evidence, writes evaluator/finish metadata, and prepares a safe closure branch.
    - Out of scope: unrelated refactors not required for "Add release task reconciliation command".
  Plan: |-
    1. Define the release reconciliation command contract and inputs for merged PR, primary task, and included task set.
    2. Implement dry-run and apply modes that record evaluator and finish metadata without implementation changes.
    3. Ensure the command prepares a safe closure branch or reports why it cannot.
    4. Cover the v0.6.12 included-task regression with fixture tests.
  Verify Steps: |-
    PLANNER fallback scaffold for "Add release task reconciliation command". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Add release task reconciliation command". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-31T16:06:16.351Z — VERIFY — ok

    By: CODER

    Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:29.162Z, excerpt_hash=sha256:6999a31f2ede5026aad9da84fd07654f6af54a3dadae5ed4768693920d79d028

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-SCWWPR/blueprint/resolved-snapshot.json
    - old_digest: 6c103c79ad62cd42d7d01475580312163f2a8862e272c8dbad1dba2b1e5efa9b
    - current_digest: 6c103c79ad62cd42d7d01475580312163f2a8862e272c8dbad1dba2b1e5efa9b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-SCWWPR

    ### 2026-05-31T16:09:38.458Z — VERIFY — ok

    By: CODER

    Note: Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:06:16.377Z, excerpt_hash=sha256:6999a31f2ede5026aad9da84fd07654f6af54a3dadae5ed4768693920d79d028

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-SCWWPR/blueprint/resolved-snapshot.json
    - old_digest: 6c103c79ad62cd42d7d01475580312163f2a8862e272c8dbad1dba2b1e5efa9b
    - current_digest: 6c103c79ad62cd42d7d01475580312163f2a8862e272c8dbad1dba2b1e5efa9b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-SCWWPR

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  branch_pr_batch:
    base: "main"
    branch: "task/202605311543-KS7B7N/release-recovery-cli-improvements"
    included_task_ids:
      - "202605311543-0VPDRD"
      - "202605311543-3H1G55"
      - "202605311543-6N3TMM"
      - "202605311543-NWXTSG"
      - "202605311543-QH9XXK"
      - "202605311543-R282E5"
      - "202605311543-SCWWPR"
      - "202605311543-SEMKC7"
    primary_task_id: "202605311543-KS7B7N"
    role: "included"
    updated_at: "2026-05-31T16:24:35.209Z"
id_source: "generated"
---
## Summary

Add release task reconciliation command

Add an operator command that reconciles release-blocking verified DOING tasks in batch, records landed PR evidence, writes evaluator/finish metadata, and prepares a safe closure branch.

## Scope

- In scope: Add an operator command that reconciles release-blocking verified DOING tasks in batch, records landed PR evidence, writes evaluator/finish metadata, and prepares a safe closure branch.
- Out of scope: unrelated refactors not required for "Add release task reconciliation command".

## Plan

1. Define the release reconciliation command contract and inputs for merged PR, primary task, and included task set.
2. Implement dry-run and apply modes that record evaluator and finish metadata without implementation changes.
3. Ensure the command prepares a safe closure branch or reports why it cannot.
4. Cover the v0.6.12 included-task regression with fixture tests.

## Verify Steps

PLANNER fallback scaffold for "Add release task reconciliation command". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Add release task reconciliation command". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-31T16:06:16.351Z — VERIFY — ok

By: CODER

Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:29.162Z, excerpt_hash=sha256:6999a31f2ede5026aad9da84fd07654f6af54a3dadae5ed4768693920d79d028

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-SCWWPR/blueprint/resolved-snapshot.json
- old_digest: 6c103c79ad62cd42d7d01475580312163f2a8862e272c8dbad1dba2b1e5efa9b
- current_digest: 6c103c79ad62cd42d7d01475580312163f2a8862e272c8dbad1dba2b1e5efa9b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-SCWWPR

### 2026-05-31T16:09:38.458Z — VERIFY — ok

By: CODER

Note: Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:06:16.377Z, excerpt_hash=sha256:6999a31f2ede5026aad9da84fd07654f6af54a3dadae5ed4768693920d79d028

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-SCWWPR/blueprint/resolved-snapshot.json
- old_digest: 6c103c79ad62cd42d7d01475580312163f2a8862e272c8dbad1dba2b1e5efa9b
- current_digest: 6c103c79ad62cd42d7d01475580312163f2a8862e272c8dbad1dba2b1e5efa9b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-SCWWPR

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
