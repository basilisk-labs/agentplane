---
id: "202605241100-5RN6QF"
title: "Fix context doctor line refs and all-scope search"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-24T11:00:43.446Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-24T11:06:23.343Z"
  updated_by: "CODER"
  note: "Fixed context doctor line-addressed raw source refs and context search --scope all SQLite/token matching. Checks passed: Prettier targeted files; Vitest issue-gates unit suite; targeted ESLint; policy routing; ap doctor."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-24T11:07:10.696Z"
  updated_by: "EVALUATOR"
  note: "Regression fixes are scoped to context doctor source-ref existence and context search matching/adapter selection."
  evaluated_sha: "9f232b08483ae7348ed9b7806740992c65d5a55f"
  blueprint_digest: "524878086f4f57a6990faa269bedcf25aa61cebfd40d42c6b2672b2689ab5d3d"
  evidence_refs:
    - ".agentplane/tasks/202605241100-5RN6QF/README.md"
    - ".agentplane/tasks/202605241100-5RN6QF/quality/20260524-110710696-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605241100-5RN6QF/quality/20260524-110710696-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605241100-5RN6QF/quality/20260524-110710696-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605241100-5RN6QF/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/context/doctor.ts"
    - "packages/agentplane/src/commands/context/search.ts"
    - "packages/agentplane/src/commands/context/issue-gates.unit.test.ts"
  findings:
    - "Evidence: targeted Prettier, Vitest issue-gates suite, targeted ESLint, policy routing, and ap doctor passed after the implementation commit."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Fix context doctor line-addressed raw source refs and context search all-scope SQLite adapter behavior, with focused regression tests."
events:
  -
    type: "status"
    at: "2026-05-24T11:01:15.758Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix context doctor line-addressed raw source refs and context search all-scope SQLite adapter behavior, with focused regression tests."
  -
    type: "verify"
    at: "2026-05-24T11:06:23.343Z"
    author: "CODER"
    state: "ok"
    note: "Fixed context doctor line-addressed raw source refs and context search --scope all SQLite/token matching. Checks passed: Prettier targeted files; Vitest issue-gates unit suite; targeted ESLint; policy routing; ap doctor."
doc_version: 3
doc_updated_at: "2026-05-24T11:06:23.361Z"
doc_updated_by: "CODER"
description: "Fix defects found by the maximum-assimilation playground: context doctor should accept line-addressed raw source refs when the raw source path is present in the manifest lock, and context search --scope all should use the SQLite projection instead of falling back to an empty local stub when the projection exists."
sections:
  Summary: |-
    Fix context doctor line refs and all-scope search

    Fix defects found by the maximum-assimilation playground: context doctor should accept line-addressed raw source refs when the raw source path is present in the manifest lock, and context search --scope all should use the SQLite projection instead of falling back to an empty local stub when the projection exists.
  Scope: |-
    - In scope: Fix defects found by the maximum-assimilation playground: context doctor should accept line-addressed raw source refs when the raw source path is present in the manifest lock, and context search --scope all should use the SQLite projection instead of falling back to an empty local stub when the projection exists.
    - Out of scope: unrelated refactors not required for "Fix context doctor line refs and all-scope search".
  Plan: |-
    1. Reproduce the two playground defects with focused tests: line-addressed context/raw refs in doctor and context search --scope all adapter selection.
    2. Patch context doctor so manifest membership compares the raw source path while preserving line-addressed refs as provenance.
    3. Patch context search so scope=all uses SQLite projection when available instead of returning an empty local-stub result.
    4. Add/adjust focused tests for both behaviors.
    5. Run task verify-show, targeted tests, check-routing, doctor, and record verification.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-24T11:06:23.343Z — VERIFY — ok

    By: CODER

    Note: Fixed context doctor line-addressed raw source refs and context search --scope all SQLite/token matching. Checks passed: Prettier targeted files; Vitest issue-gates unit suite; targeted ESLint; policy routing; ap doctor.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T11:01:15.758Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605241100-5RN6QF-fix-context-doctor-search/.agentplane/tasks/202605241100-5RN6QF/blueprint/resolved-snapshot.json
    - old_digest: 524878086f4f57a6990faa269bedcf25aa61cebfd40d42c6b2672b2689ab5d3d
    - current_digest: 524878086f4f57a6990faa269bedcf25aa61cebfd40d42c6b2672b2689ab5d3d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605241100-5RN6QF

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Playground defects reproduced as regression tests: line-addressed context/raw source refs are accepted against manifest raw paths, and all-scope search returns SQLite-backed results for multi-token cache queries.
      Impact: Maximum-assimilation extraction/assimilation quality checks no longer report false missing-source issues for line-specific refs and no longer hide indexed wiki hits behind local-stub all-scope search.
      Resolution: Normalize source refs to raw paths for manifest/file existence checks while preserving original refs, and use token-aware SQLite projection matching for all-scope context search.
id_source: "generated"
---
## Summary

Fix context doctor line refs and all-scope search

Fix defects found by the maximum-assimilation playground: context doctor should accept line-addressed raw source refs when the raw source path is present in the manifest lock, and context search --scope all should use the SQLite projection instead of falling back to an empty local stub when the projection exists.

## Scope

- In scope: Fix defects found by the maximum-assimilation playground: context doctor should accept line-addressed raw source refs when the raw source path is present in the manifest lock, and context search --scope all should use the SQLite projection instead of falling back to an empty local stub when the projection exists.
- Out of scope: unrelated refactors not required for "Fix context doctor line refs and all-scope search".

## Plan

1. Reproduce the two playground defects with focused tests: line-addressed context/raw refs in doctor and context search --scope all adapter selection.
2. Patch context doctor so manifest membership compares the raw source path while preserving line-addressed refs as provenance.
3. Patch context search so scope=all uses SQLite projection when available instead of returning an empty local-stub result.
4. Add/adjust focused tests for both behaviors.
5. Run task verify-show, targeted tests, check-routing, doctor, and record verification.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-24T11:06:23.343Z — VERIFY — ok

By: CODER

Note: Fixed context doctor line-addressed raw source refs and context search --scope all SQLite/token matching. Checks passed: Prettier targeted files; Vitest issue-gates unit suite; targeted ESLint; policy routing; ap doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T11:01:15.758Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605241100-5RN6QF-fix-context-doctor-search/.agentplane/tasks/202605241100-5RN6QF/blueprint/resolved-snapshot.json
- old_digest: 524878086f4f57a6990faa269bedcf25aa61cebfd40d42c6b2672b2689ab5d3d
- current_digest: 524878086f4f57a6990faa269bedcf25aa61cebfd40d42c6b2672b2689ab5d3d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605241100-5RN6QF

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Playground defects reproduced as regression tests: line-addressed context/raw source refs are accepted against manifest raw paths, and all-scope search returns SQLite-backed results for multi-token cache queries.
  Impact: Maximum-assimilation extraction/assimilation quality checks no longer report false missing-source issues for line-specific refs and no longer hide indexed wiki hits behind local-stub all-scope search.
  Resolution: Normalize source refs to raw paths for manifest/file existence checks while preserving original refs, and use token-aware SQLite projection matching for all-scope context search.
