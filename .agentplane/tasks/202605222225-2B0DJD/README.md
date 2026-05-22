---
id: "202605222225-2B0DJD"
title: "Treat already-merged PR delete-branch failures as integration progress"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T22:25:50.104Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T22:28:37.130Z"
  updated_by: "EVALUATOR"
  note: "Evaluator check: already-merged gh output is treated as protected-base merge completion while unrelated gh failures still flow through the existing handoff path; targeted regression, lint, and typecheck passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T22:28:37.130Z"
  updated_by: "EVALUATOR"
  note: "Evaluator check: already-merged gh output is treated as protected-base merge completion while unrelated gh failures still flow through the existing handoff path; targeted regression, lint, and typecheck passed."
  evaluated_sha: "249abc668195f7282bb8ad871142b66bcd2f4535"
  blueprint_digest: "5a7117f0090ab9fe3ac8ce70de6fa4e138603ade61af6498dd22bdb199a86ccf"
  evidence_refs:
    - ".agentplane/tasks/202605222225-2B0DJD/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605222225-2B0DJD-already-merged-pr-delete-branch/.agentplane/tasks/202605222225-2B0DJD/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: treating already-merged GitHub PR delete-branch failures as successful protected-base merge progress."
events:
  -
    type: "status"
    at: "2026-05-22T22:25:51.183Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: treating already-merged GitHub PR delete-branch failures as successful protected-base merge progress."
  -
    type: "verify"
    at: "2026-05-22T22:28:13.645Z"
    author: "CODER"
    state: "ok"
    note: "Verified: gh already-merged delete-branch failures now classify as protected-base merge progress; regression test covers worktree-attached local branch deletion, targeted integrate tests pass, lint passes, and typecheck passes."
  -
    type: "verify"
    at: "2026-05-22T22:28:37.130Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluator check: already-merged gh output is treated as protected-base merge completion while unrelated gh failures still flow through the existing handoff path; targeted regression, lint, and typecheck passed."
doc_version: 3
doc_updated_at: "2026-05-22T22:28:37.159Z"
doc_updated_by: "CODER"
description: "When branch_pr integrate drives gh pr merge with --delete-branch and GitHub reports the task PR was already merged, local branch deletion can fail because the branch is still attached to a worktree. The integrate command should classify this as progress toward hosted close rather than surfacing E_HANDOFF after the merge has succeeded. Keep true merge failures as handoff/errors."
sections:
  Summary: |-
    Treat already-merged PR delete-branch failures as integration progress

    When branch_pr integrate drives gh pr merge with --delete-branch and GitHub reports the task PR was already merged, local branch deletion can fail because the branch is still attached to a worktree. The integrate command should classify this as progress toward hosted close rather than surfacing E_HANDOFF after the merge has succeeded. Keep true merge failures as handoff/errors.
  Scope: |-
    - In scope: When branch_pr integrate drives gh pr merge with --delete-branch and GitHub reports the task PR was already merged, local branch deletion can fail because the branch is still attached to a worktree. The integrate command should classify this as progress toward hosted close rather than surfacing E_HANDOFF after the merge has succeeded. Keep true merge failures as handoff/errors.
    - Out of scope: unrelated refactors not required for "Treat already-merged PR delete-branch failures as integration progress".
  Plan: |-
    Plan:
    1. Add a narrow classifier for gh merge stderr/stdout that reports the PR is already merged, even when --delete-branch fails on a local worktree-attached branch.
    2. Return protected-base merge status=merged for that classifier so cmdIntegrate records the normal hosted-close handoff instead of a generic E_HANDOFF failure.
    3. Cover the regression in integrate command tests and run targeted tests plus type/lint checks.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T22:28:13.645Z — VERIFY — ok

    By: CODER

    Note: Verified: gh already-merged delete-branch failures now classify as protected-base merge progress; regression test covers worktree-attached local branch deletion, targeted integrate tests pass, lint passes, and typecheck passes.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T22:25:51.183Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605222225-2B0DJD-already-merged-pr-delete-branch/.agentplane/tasks/202605222225-2B0DJD/blueprint/resolved-snapshot.json
    - old_digest: 5a7117f0090ab9fe3ac8ce70de6fa4e138603ade61af6498dd22bdb199a86ccf
    - current_digest: 5a7117f0090ab9fe3ac8ce70de6fa4e138603ade61af6498dd22bdb199a86ccf
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605222225-2B0DJD

    ### 2026-05-22T22:28:37.130Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluator check: already-merged gh output is treated as protected-base merge completion while unrelated gh failures still flow through the existing handoff path; targeted regression, lint, and typecheck passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T22:28:13.671Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605222225-2B0DJD-already-merged-pr-delete-branch/.agentplane/tasks/202605222225-2B0DJD/blueprint/resolved-snapshot.json
    - old_digest: 5a7117f0090ab9fe3ac8ce70de6fa4e138603ade61af6498dd22bdb199a86ccf
    - current_digest: 5a7117f0090ab9fe3ac8ce70de6fa4e138603ade61af6498dd22bdb199a86ccf
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605222225-2B0DJD

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Treat already-merged PR delete-branch failures as integration progress

When branch_pr integrate drives gh pr merge with --delete-branch and GitHub reports the task PR was already merged, local branch deletion can fail because the branch is still attached to a worktree. The integrate command should classify this as progress toward hosted close rather than surfacing E_HANDOFF after the merge has succeeded. Keep true merge failures as handoff/errors.

## Scope

- In scope: When branch_pr integrate drives gh pr merge with --delete-branch and GitHub reports the task PR was already merged, local branch deletion can fail because the branch is still attached to a worktree. The integrate command should classify this as progress toward hosted close rather than surfacing E_HANDOFF after the merge has succeeded. Keep true merge failures as handoff/errors.
- Out of scope: unrelated refactors not required for "Treat already-merged PR delete-branch failures as integration progress".

## Plan

Plan:
1. Add a narrow classifier for gh merge stderr/stdout that reports the PR is already merged, even when --delete-branch fails on a local worktree-attached branch.
2. Return protected-base merge status=merged for that classifier so cmdIntegrate records the normal hosted-close handoff instead of a generic E_HANDOFF failure.
3. Cover the regression in integrate command tests and run targeted tests plus type/lint checks.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T22:28:13.645Z — VERIFY — ok

By: CODER

Note: Verified: gh already-merged delete-branch failures now classify as protected-base merge progress; regression test covers worktree-attached local branch deletion, targeted integrate tests pass, lint passes, and typecheck passes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T22:25:51.183Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605222225-2B0DJD-already-merged-pr-delete-branch/.agentplane/tasks/202605222225-2B0DJD/blueprint/resolved-snapshot.json
- old_digest: 5a7117f0090ab9fe3ac8ce70de6fa4e138603ade61af6498dd22bdb199a86ccf
- current_digest: 5a7117f0090ab9fe3ac8ce70de6fa4e138603ade61af6498dd22bdb199a86ccf
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605222225-2B0DJD

### 2026-05-22T22:28:37.130Z — VERIFY — ok

By: EVALUATOR

Note: Evaluator check: already-merged gh output is treated as protected-base merge completion while unrelated gh failures still flow through the existing handoff path; targeted regression, lint, and typecheck passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T22:28:13.671Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605222225-2B0DJD-already-merged-pr-delete-branch/.agentplane/tasks/202605222225-2B0DJD/blueprint/resolved-snapshot.json
- old_digest: 5a7117f0090ab9fe3ac8ce70de6fa4e138603ade61af6498dd22bdb199a86ccf
- current_digest: 5a7117f0090ab9fe3ac8ce70de6fa4e138603ade61af6498dd22bdb199a86ccf
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605222225-2B0DJD

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
