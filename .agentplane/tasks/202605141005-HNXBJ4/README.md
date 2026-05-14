---
id: "202605141005-HNXBJ4"
title: "Fix context search JSONL row freshness"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T10:05:28.914Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T10:26:23.138Z"
  updated_by: "CODER"
  note: "Fixed context search JSONL row freshness, including non-string row ids found in review. Verified focused context tests, eslint/prettier, release/docs gates, platform-critical, and empty-folder semantic assimilation smoke with no stale search rows."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Fix context search JSONL row freshness regression found during v0.6 empty-folder assimilation smoke."
events:
  -
    type: "status"
    at: "2026-05-14T10:05:38.854Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix context search JSONL row freshness regression found during v0.6 empty-folder assimilation smoke."
  -
    type: "verify"
    at: "2026-05-14T10:10:18.421Z"
    author: "CODER"
    state: "ok"
    note: "Fixed context search JSONL row freshness by recomputing current row hashes for row-level projection refs. Verified focused context tests, eslint/prettier, release/docs gates, platform-critical, and empty-folder semantic assimilation smoke with no stale search rows."
  -
    type: "verify"
    at: "2026-05-14T10:26:23.138Z"
    author: "CODER"
    state: "ok"
    note: "Fixed context search JSONL row freshness, including non-string row ids found in review. Verified focused context tests, eslint/prettier, release/docs gates, platform-critical, and empty-folder semantic assimilation smoke with no stale search rows."
doc_version: 3
doc_updated_at: "2026-05-14T10:26:23.166Z"
doc_updated_by: "CODER"
description: "Context search marks fresh JSONL facts and graph projection rows as stale because row-level projection hashes are compared to whole-file hashes. Fix row-level freshness and cover it with regression tests so empty-folder semantic assimilation search reports fresh derived rows."
sections:
  Summary: |-
    Fix context search JSONL row freshness
    
    Context search marks fresh JSONL facts and graph projection rows as stale because row-level projection hashes are compared to whole-file hashes. Fix row-level freshness and cover it with regression tests so empty-folder semantic assimilation search reports fresh derived rows.
  Scope: |-
    - In scope: Context search marks fresh JSONL facts and graph projection rows as stale because row-level projection hashes are compared to whole-file hashes. Fix row-level freshness and cover it with regression tests so empty-folder semantic assimilation search reports fresh derived rows.
    - Out of scope: unrelated refactors not required for "Fix context search JSONL row freshness".
  Plan: |-
    1. Update context search freshness handling so JSONL row refs recompute the current row hash for matching row-level refs and compare file hashes only for file-level refs.
    2. Add focused regression coverage for facts/graph JSONL row projection freshness after reindex.
    3. Run focused context tests, platform-critical, release/docs gates, and repeat the empty-folder semantic assimilation smoke.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T10:10:18.421Z — VERIFY — ok
    
    By: CODER
    
    Note: Fixed context search JSONL row freshness by recomputing current row hashes for row-level projection refs. Verified focused context tests, eslint/prettier, release/docs gates, platform-critical, and empty-folder semantic assimilation smoke with no stale search rows.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T10:05:38.854Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141005-HNXBJ4-context-jsonl-freshness/.agentplane/tasks/202605141005-HNXBJ4/blueprint/resolved-snapshot.json
    - old_digest: f3c5df08acba8e7ddf0a4372e13f47ef625e2224065742986e2ecd5d7cc8749c
    - current_digest: f3c5df08acba8e7ddf0a4372e13f47ef625e2224065742986e2ecd5d7cc8749c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141005-HNXBJ4
    
    ### 2026-05-14T10:26:23.138Z — VERIFY — ok
    
    By: CODER
    
    Note: Fixed context search JSONL row freshness, including non-string row ids found in review. Verified focused context tests, eslint/prettier, release/docs gates, platform-critical, and empty-folder semantic assimilation smoke with no stale search rows.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T10:10:18.432Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141005-HNXBJ4-context-jsonl-freshness/.agentplane/tasks/202605141005-HNXBJ4/blueprint/resolved-snapshot.json
    - old_digest: f3c5df08acba8e7ddf0a4372e13f47ef625e2224065742986e2ecd5d7cc8749c
    - current_digest: f3c5df08acba8e7ddf0a4372e13f47ef625e2224065742986e2ecd5d7cc8749c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141005-HNXBJ4
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix context search JSONL row freshness

Context search marks fresh JSONL facts and graph projection rows as stale because row-level projection hashes are compared to whole-file hashes. Fix row-level freshness and cover it with regression tests so empty-folder semantic assimilation search reports fresh derived rows.

## Scope

- In scope: Context search marks fresh JSONL facts and graph projection rows as stale because row-level projection hashes are compared to whole-file hashes. Fix row-level freshness and cover it with regression tests so empty-folder semantic assimilation search reports fresh derived rows.
- Out of scope: unrelated refactors not required for "Fix context search JSONL row freshness".

## Plan

1. Update context search freshness handling so JSONL row refs recompute the current row hash for matching row-level refs and compare file hashes only for file-level refs.
2. Add focused regression coverage for facts/graph JSONL row projection freshness after reindex.
3. Run focused context tests, platform-critical, release/docs gates, and repeat the empty-folder semantic assimilation smoke.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T10:10:18.421Z — VERIFY — ok

By: CODER

Note: Fixed context search JSONL row freshness by recomputing current row hashes for row-level projection refs. Verified focused context tests, eslint/prettier, release/docs gates, platform-critical, and empty-folder semantic assimilation smoke with no stale search rows.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T10:05:38.854Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141005-HNXBJ4-context-jsonl-freshness/.agentplane/tasks/202605141005-HNXBJ4/blueprint/resolved-snapshot.json
- old_digest: f3c5df08acba8e7ddf0a4372e13f47ef625e2224065742986e2ecd5d7cc8749c
- current_digest: f3c5df08acba8e7ddf0a4372e13f47ef625e2224065742986e2ecd5d7cc8749c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141005-HNXBJ4

### 2026-05-14T10:26:23.138Z — VERIFY — ok

By: CODER

Note: Fixed context search JSONL row freshness, including non-string row ids found in review. Verified focused context tests, eslint/prettier, release/docs gates, platform-critical, and empty-folder semantic assimilation smoke with no stale search rows.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T10:10:18.432Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141005-HNXBJ4-context-jsonl-freshness/.agentplane/tasks/202605141005-HNXBJ4/blueprint/resolved-snapshot.json
- old_digest: f3c5df08acba8e7ddf0a4372e13f47ef625e2224065742986e2ecd5d7cc8749c
- current_digest: f3c5df08acba8e7ddf0a4372e13f47ef625e2224065742986e2ecd5d7cc8749c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141005-HNXBJ4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
