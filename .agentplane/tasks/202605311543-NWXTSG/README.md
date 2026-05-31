---
id: "202605311543-NWXTSG"
title: "Add branch cleanup dry-run reports"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-cleanup"
  - "cli"
  - "worktree"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test -- branch"
  - "bun run verify:cli"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:52.408Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-31T16:09:58.347Z"
  updated_by: "CODER"
  note: "Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-31T16:08:00.125Z"
  updated_by: "EVALUATOR"
  note: "Release recovery CLI/policy improvement batch passes targeted verification."
  evaluated_sha: "c7c33342a9051d9f3c5e30b668b0b53e8137a5a7"
  blueprint_digest: "ddbeb630bfdedaceb06e2085615a979da4d9f426864769b3baf5ad0f15f45ee2"
  evidence_refs:
    - ".agentplane/tasks/202605311543-NWXTSG/README.md"
    - ".agentplane/tasks/202605311543-NWXTSG/quality/20260531-160800125-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605311543-NWXTSG/quality/20260531-160800125-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605311543-NWXTSG/quality/20260531-160800125-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605311543-NWXTSG/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/shared/route-decision-next-action.ts"
    - "packages/agentplane/src/commands/pr/internal/sync-github.ts"
    - "packages/agentplane/src/commands/branch/cleanup-merged.ts"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Implementation commit c7c33342a addresses the approved task scope; targeted typecheck, formatting, policy, agents, route decision, cleanup, evaluator, PR open/lifecycle, and help snapshot checks passed."
commit:
  hash: "6da8e6202c2182ddb437feca9d15caafcac855d2"
  message: "Merge pull request #4332 from basilisk-labs/task/202605311543-KS7B7N/release-recovery-cli-improvements"
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4332 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-31T15:53:33.051Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-31T16:06:35.855Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed."
  -
    type: "verify"
    at: "2026-05-31T16:09:58.347Z"
    author: "CODER"
    state: "ok"
    note: "Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture."
  -
    type: "status"
    at: "2026-05-31T17:36:37.272Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4332 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-31T17:36:37.274Z"
doc_updated_by: "INTEGRATOR"
description: "Add a branch cleanup command that classifies merged, dirty, backup, active-worktree, and unmerged branches; supports dry-run; preserves dirty state with named stashes; and writes a cleanup report."
sections:
  Summary: |-
    Add branch cleanup dry-run reports

    Add a branch cleanup command that classifies merged, dirty, backup, active-worktree, and unmerged branches; supports dry-run; preserves dirty state with named stashes; and writes a cleanup report.
  Scope: |-
    - In scope: Add a branch cleanup command that classifies merged, dirty, backup, active-worktree, and unmerged branches; supports dry-run; preserves dirty state with named stashes; and writes a cleanup report.
    - Out of scope: unrelated refactors not required for "Add branch cleanup dry-run reports".
  Plan: |-
    1. Define branch cleanup classification for merged, dirty, backup, active-worktree, unmerged, and remote-tracking branches.
    2. Implement dry-run report before destructive cleanup.
    3. Preserve dirty worktree state with named stashes and write a manifest mapping stash to removed branch/worktree.
    4. Add tests for cleanup safety and final status reporting.
  Verify Steps: |-
    PLANNER fallback scaffold for "Add branch cleanup dry-run reports". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Add branch cleanup dry-run reports". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-31T16:06:35.855Z — VERIFY — ok

    By: CODER

    Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:33.051Z, excerpt_hash=sha256:c02d189bafa0488ff5bd92dabc723d013c918b5df49bdf30f9b684583cdf82c8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-NWXTSG/blueprint/resolved-snapshot.json
    - old_digest: ddbeb630bfdedaceb06e2085615a979da4d9f426864769b3baf5ad0f15f45ee2
    - current_digest: ddbeb630bfdedaceb06e2085615a979da4d9f426864769b3baf5ad0f15f45ee2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-NWXTSG

    ### 2026-05-31T16:09:58.347Z — VERIFY — ok

    By: CODER

    Note: Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:06:35.881Z, excerpt_hash=sha256:c02d189bafa0488ff5bd92dabc723d013c918b5df49bdf30f9b684583cdf82c8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-NWXTSG/blueprint/resolved-snapshot.json
    - old_digest: ddbeb630bfdedaceb06e2085615a979da4d9f426864769b3baf5ad0f15f45ee2
    - current_digest: ddbeb630bfdedaceb06e2085615a979da4d9f426864769b3baf5ad0f15f45ee2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-NWXTSG

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

Add branch cleanup dry-run reports

Add a branch cleanup command that classifies merged, dirty, backup, active-worktree, and unmerged branches; supports dry-run; preserves dirty state with named stashes; and writes a cleanup report.

## Scope

- In scope: Add a branch cleanup command that classifies merged, dirty, backup, active-worktree, and unmerged branches; supports dry-run; preserves dirty state with named stashes; and writes a cleanup report.
- Out of scope: unrelated refactors not required for "Add branch cleanup dry-run reports".

## Plan

1. Define branch cleanup classification for merged, dirty, backup, active-worktree, unmerged, and remote-tracking branches.
2. Implement dry-run report before destructive cleanup.
3. Preserve dirty worktree state with named stashes and write a manifest mapping stash to removed branch/worktree.
4. Add tests for cleanup safety and final status reporting.

## Verify Steps

PLANNER fallback scaffold for "Add branch cleanup dry-run reports". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Add branch cleanup dry-run reports". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-31T16:06:35.855Z — VERIFY — ok

By: CODER

Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:33.051Z, excerpt_hash=sha256:c02d189bafa0488ff5bd92dabc723d013c918b5df49bdf30f9b684583cdf82c8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-NWXTSG/blueprint/resolved-snapshot.json
- old_digest: ddbeb630bfdedaceb06e2085615a979da4d9f426864769b3baf5ad0f15f45ee2
- current_digest: ddbeb630bfdedaceb06e2085615a979da4d9f426864769b3baf5ad0f15f45ee2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-NWXTSG

### 2026-05-31T16:09:58.347Z — VERIFY — ok

By: CODER

Note: Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:06:35.881Z, excerpt_hash=sha256:c02d189bafa0488ff5bd92dabc723d013c918b5df49bdf30f9b684583cdf82c8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-NWXTSG/blueprint/resolved-snapshot.json
- old_digest: ddbeb630bfdedaceb06e2085615a979da4d9f426864769b3baf5ad0f15f45ee2
- current_digest: ddbeb630bfdedaceb06e2085615a979da4d9f426864769b3baf5ad0f15f45ee2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-NWXTSG

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
