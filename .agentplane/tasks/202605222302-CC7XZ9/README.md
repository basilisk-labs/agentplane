---
id: "202605222302-CC7XZ9"
title: "Keep CI route registry edits in targeted hooks local CI"
result_summary: "Merged via PR #4046."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "performance"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T23:02:50.666Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T23:04:42.201Z"
  updated_by: "EVALUATOR"
  note: "Evaluator check: CI routing registry files are covered by the existing hooks bucket without broadening generic scripts handling; regression coverage prevents full-fast fallback for selector maintenance edits."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T23:04:42.201Z"
  updated_by: "EVALUATOR"
  note: "Evaluator check: CI routing registry files are covered by the existing hooks bucket without broadening generic scripts handling; regression coverage prevents full-fast fallback for selector maintenance edits."
  evaluated_sha: "7454ee55af38d29a9568c6fca35390911c8cbe81"
  blueprint_digest: "763707adbb50026face8520744d16df44025a25b39aa485511076b5f605f14a6"
  evidence_refs:
    - ".agentplane/tasks/202605222302-CC7XZ9/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605222302-CC7XZ9-hooks-route-ci-registry-files/.agentplane/tasks/202605222302-CC7XZ9/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "5e98cd4c5476ef7f1dc90219a835f2ccc23d4226"
  message: "Merge pull request #4046 from basilisk-labs/task/202605222302-CC7XZ9/hooks-route-ci-registry-files"
comments:
  -
    author: "CODER"
    body: "Start: keeping local CI routing registry edits in the targeted hooks bucket."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4046 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-22T23:02:51.748Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: keeping local CI routing registry edits in the targeted hooks bucket."
  -
    type: "verify"
    at: "2026-05-22T23:04:37.510Z"
    author: "CODER"
    state: "ok"
    note: "Verified: local CI route registry maintenance now selects targeted hooks route instead of full-fast; selector regression passes, local CI explain shows hooks bucket, lint passes, and typecheck passes."
  -
    type: "verify"
    at: "2026-05-22T23:04:42.201Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluator check: CI routing registry files are covered by the existing hooks bucket without broadening generic scripts handling; regression coverage prevents full-fast fallback for selector maintenance edits."
  -
    type: "status"
    at: "2026-05-22T23:10:54.112Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4046 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-22T23:10:54.117Z"
doc_updated_by: "INTEGRATOR"
description: "Local CI selection changes should not force full-fast solely because they touch scripts/lib/test-route-registry.mjs or scripts/lib/local-ci-selection.d.ts. Add these CI routing files to the hooks/local-CI bucket so selector maintenance runs targeted hooks checks instead of broad release/upgrade unit suites during pre-push."
sections:
  Summary: |-
    Keep CI route registry edits in targeted hooks local CI

    Local CI selection changes should not force full-fast solely because they touch scripts/lib/test-route-registry.mjs or scripts/lib/local-ci-selection.d.ts. Add these CI routing files to the hooks/local-CI bucket so selector maintenance runs targeted hooks checks instead of broad release/upgrade unit suites during pre-push.
  Scope: |-
    - In scope: Local CI selection changes should not force full-fast solely because they touch scripts/lib/test-route-registry.mjs or scripts/lib/local-ci-selection.d.ts. Add these CI routing files to the hooks/local-CI bucket so selector maintenance runs targeted hooks checks instead of broad release/upgrade unit suites during pre-push.
    - Out of scope: unrelated refactors not required for "Keep CI route registry edits in targeted hooks local CI".
  Plan: |-
    Plan:
    1. Add scripts/lib/test-route-registry.mjs and scripts/lib/local-ci-selection.d.ts to the local CI hooks bucket patterns.
    2. Add selector regression coverage showing CI routing registry edits choose targeted hooks instead of full-fast.
    3. Run selector tests and local CI explain for the observed changed-file set.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T23:04:37.510Z — VERIFY — ok

    By: CODER

    Note: Verified: local CI route registry maintenance now selects targeted hooks route instead of full-fast; selector regression passes, local CI explain shows hooks bucket, lint passes, and typecheck passes.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T23:02:51.748Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605222302-CC7XZ9-hooks-route-ci-registry-files/.agentplane/tasks/202605222302-CC7XZ9/blueprint/resolved-snapshot.json
    - old_digest: 763707adbb50026face8520744d16df44025a25b39aa485511076b5f605f14a6
    - current_digest: 763707adbb50026face8520744d16df44025a25b39aa485511076b5f605f14a6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605222302-CC7XZ9

    ### 2026-05-22T23:04:42.201Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluator check: CI routing registry files are covered by the existing hooks bucket without broadening generic scripts handling; regression coverage prevents full-fast fallback for selector maintenance edits.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T23:04:37.537Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605222302-CC7XZ9-hooks-route-ci-registry-files/.agentplane/tasks/202605222302-CC7XZ9/blueprint/resolved-snapshot.json
    - old_digest: 763707adbb50026face8520744d16df44025a25b39aa485511076b5f605f14a6
    - current_digest: 763707adbb50026face8520744d16df44025a25b39aa485511076b5f605f14a6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605222302-CC7XZ9

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Keep CI route registry edits in targeted hooks local CI

Local CI selection changes should not force full-fast solely because they touch scripts/lib/test-route-registry.mjs or scripts/lib/local-ci-selection.d.ts. Add these CI routing files to the hooks/local-CI bucket so selector maintenance runs targeted hooks checks instead of broad release/upgrade unit suites during pre-push.

## Scope

- In scope: Local CI selection changes should not force full-fast solely because they touch scripts/lib/test-route-registry.mjs or scripts/lib/local-ci-selection.d.ts. Add these CI routing files to the hooks/local-CI bucket so selector maintenance runs targeted hooks checks instead of broad release/upgrade unit suites during pre-push.
- Out of scope: unrelated refactors not required for "Keep CI route registry edits in targeted hooks local CI".

## Plan

Plan:
1. Add scripts/lib/test-route-registry.mjs and scripts/lib/local-ci-selection.d.ts to the local CI hooks bucket patterns.
2. Add selector regression coverage showing CI routing registry edits choose targeted hooks instead of full-fast.
3. Run selector tests and local CI explain for the observed changed-file set.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T23:04:37.510Z — VERIFY — ok

By: CODER

Note: Verified: local CI route registry maintenance now selects targeted hooks route instead of full-fast; selector regression passes, local CI explain shows hooks bucket, lint passes, and typecheck passes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T23:02:51.748Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605222302-CC7XZ9-hooks-route-ci-registry-files/.agentplane/tasks/202605222302-CC7XZ9/blueprint/resolved-snapshot.json
- old_digest: 763707adbb50026face8520744d16df44025a25b39aa485511076b5f605f14a6
- current_digest: 763707adbb50026face8520744d16df44025a25b39aa485511076b5f605f14a6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605222302-CC7XZ9

### 2026-05-22T23:04:42.201Z — VERIFY — ok

By: EVALUATOR

Note: Evaluator check: CI routing registry files are covered by the existing hooks bucket without broadening generic scripts handling; regression coverage prevents full-fast fallback for selector maintenance edits.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T23:04:37.537Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605222302-CC7XZ9-hooks-route-ci-registry-files/.agentplane/tasks/202605222302-CC7XZ9/blueprint/resolved-snapshot.json
- old_digest: 763707adbb50026face8520744d16df44025a25b39aa485511076b5f605f14a6
- current_digest: 763707adbb50026face8520744d16df44025a25b39aa485511076b5f605f14a6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605222302-CC7XZ9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
