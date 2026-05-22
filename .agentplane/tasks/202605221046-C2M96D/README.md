---
id: "202605221046-C2M96D"
title: "Amend refreshed task artifacts after commit"
result_summary: "Merged via PR #4015."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 17
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "workflow"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T12:37:15.471Z"
  updated_by: "CODER"
  note: "Verified hosted verify-unit fix: added missing gitBranchUpstream/gitDiffStat test doubles for integrate prepare diffstat freshness path; vitest prepare.test.ts passed (14 tests), typecheck passed, targeted ESLint passed, full test:fast passed (325 files, 1947 passed, 2 skipped)."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T12:17:36.615Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed for commit 780c0e4ea0d5767f2a39611103e2ea638567debd after refreshed GitHub checks: PR verification, Release-ready manifest, verify-static, verify-unit, test-windows, CodeQL all passed."
  evaluated_sha: "780c0e4ea0d5767f2a39611103e2ea638567debd"
  blueprint_digest: "7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156"
  evidence_refs:
    - ".agentplane/tasks/202605221046-C2M96D/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221046-C2M96D-amend-task-artifacts/.agentplane/tasks/202605221046-C2M96D/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "fc4030e8ba8c9c2c4e74c22dd5128dd9a89c4edd"
  message: "Merge pull request #4015 from basilisk-labs/task/202605221046-C2M96D/amend-task-artifacts"
comments:
  -
    author: "CODER"
    body: "Start: implementing amend-first task artifact refresh for branch_pr task commits within the approved git workflow scope."
  -
    author: "CODER"
    body: "Blocked: implementation scope changed because one-commit PR artifact packaging conflicts with self-referential head_sha metadata; awaiting re-scope approval."
  -
    author: "CODER"
    body: "Start: resuming with approved deeper scope to remove self-referential PR artifact head SHA gates and enable one-commit task branches."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4015 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-22T10:49:11.926Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing amend-first task artifact refresh for branch_pr task commits within the approved git workflow scope."
  -
    type: "status"
    at: "2026-05-22T10:53:09.170Z"
    author: "CODER"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: implementation scope changed because one-commit PR artifact packaging conflicts with self-referential head_sha metadata; awaiting re-scope approval."
  -
    type: "status"
    at: "2026-05-22T11:02:35.518Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: resuming with approved deeper scope to remove self-referential PR artifact head SHA gates and enable one-commit task branches."
  -
    type: "verify"
    at: "2026-05-22T11:25:08.451Z"
    author: "CODER"
    state: "ok"
    note: "Verified one-commit branch_pr artifact contract: targeted Vitest suite passed (52 tests), typecheck passed, policy routing passed, ap doctor passed; tracked PR artifacts no longer store OPEN head_sha and pr update amended artifacts into the existing task commit."
  -
    type: "verify"
    at: "2026-05-22T12:12:21.104Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed: GitHub checks on PR #4015 are green including PR verification, Release-ready manifest, verify-static, verify-unit, test-windows, CodeQL; local targeted checks passed for typecheck, ESLint on touched PR-flow files, and 40 PR-flow tests; task branch remains a single commit over main."
  -
    type: "verify"
    at: "2026-05-22T12:17:36.615Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed for commit 780c0e4ea0d5767f2a39611103e2ea638567debd after refreshed GitHub checks: PR verification, Release-ready manifest, verify-static, verify-unit, test-windows, CodeQL all passed."
  -
    type: "verify"
    at: "2026-05-22T12:29:55.926Z"
    author: "CODER"
    state: "ok"
    note: "Verified diffstat-based one-commit PR artifact freshness: framework bootstrap passed, typecheck passed, targeted ESLint passed, targeted PR-flow and pr-meta tests passed (56 tests), and OPEN PR artifacts use diffstat_sha256 without tracked head_sha."
  -
    type: "verify"
    at: "2026-05-22T12:37:15.471Z"
    author: "CODER"
    state: "ok"
    note: "Verified hosted verify-unit fix: added missing gitBranchUpstream/gitDiffStat test doubles for integrate prepare diffstat freshness path; vitest prepare.test.ts passed (14 tests), typecheck passed, targeted ESLint passed, full test:fast passed (325 files, 1947 passed, 2 skipped)."
  -
    type: "status"
    at: "2026-05-22T12:55:46.545Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4015 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-22T12:55:46.553Z"
doc_updated_by: "INTEGRATOR"
description: "Optimize branch_pr task branches so refreshed task README, blueprint, and PR artifacts are folded into the active task commit with amend instead of creating extra artifact-only commits."
sections:
  Summary: |-
    Amend refreshed task artifacts after commit

    Optimize branch_pr task branches so refreshed task README, blueprint, and PR artifacts are folded into the active task commit with amend instead of creating extra artifact-only commits.
  Scope: "In scope: branch_pr task artifact refresh commits after implementation commits and PR artifact refresh; tests and docs/help strings directly affected by that behavior. Out of scope: hosted-close close-tail commits, direct-mode close commits, GitHub merge behavior, release publishing, and broad task lifecycle redesign."
  Plan: "Refactor branch_pr PR artifact identity so tracked PR artifacts no longer rely on self-referential head_sha metadata. Implement a one-commit task branch contract: task commit may include code, README, blueprint snapshot, and PR artifacts; freshness/integration should compute live branch head and verify evidence from runtime state instead of requiring tracked meta.head_sha to equal the branch commit that contains meta.json. Keep hosted-close merge_commit semantics intact after merge."
  Verify Steps: |-
    - Run PR metadata unit tests: bun test packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts
    - Run commit refresh tests: bun test packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts
    - Run branch_pr PR lifecycle tests: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts
    - Run integrate prepare/freshness tests: bun test packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts
    - Run policy routing check: node .agentplane/policy/check-routing.mjs
    - Run agentplane doctor
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T11:25:08.451Z — VERIFY — ok

    By: CODER

    Note: Verified one-commit branch_pr artifact contract: targeted Vitest suite passed (52 tests), typecheck passed, policy routing passed, ap doctor passed; tracked PR artifacts no longer store OPEN head_sha and pr update amended artifacts into the existing task commit.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T11:02:35.518Z, excerpt_hash=sha256:ae93d15a2b1f0a1a39f6b532ca9d8f995fcaae106368aedfcbb24ac4a89b6c55

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221046-C2M96D-amend-task-artifacts/.agentplane/tasks/202605221046-C2M96D/blueprint/resolved-snapshot.json
    - old_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
    - current_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221046-C2M96D

    ### 2026-05-22T12:12:21.104Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed: GitHub checks on PR #4015 are green including PR verification, Release-ready manifest, verify-static, verify-unit, test-windows, CodeQL; local targeted checks passed for typecheck, ESLint on touched PR-flow files, and 40 PR-flow tests; task branch remains a single commit over main.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T11:25:08.539Z, excerpt_hash=sha256:ae93d15a2b1f0a1a39f6b532ca9d8f995fcaae106368aedfcbb24ac4a89b6c55

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221046-C2M96D-amend-task-artifacts/.agentplane/tasks/202605221046-C2M96D/blueprint/resolved-snapshot.json
    - old_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
    - current_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221046-C2M96D

    ### 2026-05-22T12:17:36.615Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed for commit 780c0e4ea0d5767f2a39611103e2ea638567debd after refreshed GitHub checks: PR verification, Release-ready manifest, verify-static, verify-unit, test-windows, CodeQL all passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T12:12:21.124Z, excerpt_hash=sha256:ae93d15a2b1f0a1a39f6b532ca9d8f995fcaae106368aedfcbb24ac4a89b6c55

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221046-C2M96D-amend-task-artifacts/.agentplane/tasks/202605221046-C2M96D/blueprint/resolved-snapshot.json
    - old_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
    - current_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221046-C2M96D

    ### 2026-05-22T12:29:55.926Z — VERIFY — ok

    By: CODER

    Note: Verified diffstat-based one-commit PR artifact freshness: framework bootstrap passed, typecheck passed, targeted ESLint passed, targeted PR-flow and pr-meta tests passed (56 tests), and OPEN PR artifacts use diffstat_sha256 without tracked head_sha.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T12:17:36.633Z, excerpt_hash=sha256:ae93d15a2b1f0a1a39f6b532ca9d8f995fcaae106368aedfcbb24ac4a89b6c55

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221046-C2M96D-amend-task-artifacts/.agentplane/tasks/202605221046-C2M96D/blueprint/resolved-snapshot.json
    - old_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
    - current_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221046-C2M96D

    ### 2026-05-22T12:37:15.471Z — VERIFY — ok

    By: CODER

    Note: Verified hosted verify-unit fix: added missing gitBranchUpstream/gitDiffStat test doubles for integrate prepare diffstat freshness path; vitest prepare.test.ts passed (14 tests), typecheck passed, targeted ESLint passed, full test:fast passed (325 files, 1947 passed, 2 skipped).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T12:29:55.942Z, excerpt_hash=sha256:ae93d15a2b1f0a1a39f6b532ca9d8f995fcaae106368aedfcbb24ac4a89b6c55

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221046-C2M96D-amend-task-artifacts/.agentplane/tasks/202605221046-C2M96D/blueprint/resolved-snapshot.json
    - old_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
    - current_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221046-C2M96D

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task commit(s) for 202605221046-C2M96D. This restores separate task artifact refresh commits after implementation commits."
  Findings: |-
    - Observation: Full one-commit task branch packaging conflicts with current PR artifact metadata because pr/meta.json stores head_sha while the commit hash depends on the file content.
      Impact: A naive amend implementation would produce stale or unreachable head_sha values and break pr check/integrate freshness gates.
      Resolution: Re-scope is required: either accept a two-commit model (implementation plus PR packet) or redesign PR metadata away from self-referential commit SHA storage before enforcing one-commit branches.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: branch_pr task artifact refresh previously created extra commits and tracked PR meta/review stored branch head SHA.
      Impact: A task branch could not satisfy a true one-commit contract because artifact freshness wrote self-referential or stale head state into tracked files.
      Resolution: OPEN PR artifacts now compute branch head live at pr check/integrate time; artifact refresh and pr update use commit amend for task-local artifact changes.
id_source: "generated"
---
## Summary

Amend refreshed task artifacts after commit

Optimize branch_pr task branches so refreshed task README, blueprint, and PR artifacts are folded into the active task commit with amend instead of creating extra artifact-only commits.

## Scope

In scope: branch_pr task artifact refresh commits after implementation commits and PR artifact refresh; tests and docs/help strings directly affected by that behavior. Out of scope: hosted-close close-tail commits, direct-mode close commits, GitHub merge behavior, release publishing, and broad task lifecycle redesign.

## Plan

Refactor branch_pr PR artifact identity so tracked PR artifacts no longer rely on self-referential head_sha metadata. Implement a one-commit task branch contract: task commit may include code, README, blueprint snapshot, and PR artifacts; freshness/integration should compute live branch head and verify evidence from runtime state instead of requiring tracked meta.head_sha to equal the branch commit that contains meta.json. Keep hosted-close merge_commit semantics intact after merge.

## Verify Steps

- Run PR metadata unit tests: bun test packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts
- Run commit refresh tests: bun test packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts
- Run branch_pr PR lifecycle tests: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts
- Run integrate prepare/freshness tests: bun test packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts
- Run policy routing check: node .agentplane/policy/check-routing.mjs
- Run agentplane doctor

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T11:25:08.451Z — VERIFY — ok

By: CODER

Note: Verified one-commit branch_pr artifact contract: targeted Vitest suite passed (52 tests), typecheck passed, policy routing passed, ap doctor passed; tracked PR artifacts no longer store OPEN head_sha and pr update amended artifacts into the existing task commit.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T11:02:35.518Z, excerpt_hash=sha256:ae93d15a2b1f0a1a39f6b532ca9d8f995fcaae106368aedfcbb24ac4a89b6c55

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221046-C2M96D-amend-task-artifacts/.agentplane/tasks/202605221046-C2M96D/blueprint/resolved-snapshot.json
- old_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
- current_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221046-C2M96D

### 2026-05-22T12:12:21.104Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed: GitHub checks on PR #4015 are green including PR verification, Release-ready manifest, verify-static, verify-unit, test-windows, CodeQL; local targeted checks passed for typecheck, ESLint on touched PR-flow files, and 40 PR-flow tests; task branch remains a single commit over main.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T11:25:08.539Z, excerpt_hash=sha256:ae93d15a2b1f0a1a39f6b532ca9d8f995fcaae106368aedfcbb24ac4a89b6c55

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221046-C2M96D-amend-task-artifacts/.agentplane/tasks/202605221046-C2M96D/blueprint/resolved-snapshot.json
- old_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
- current_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221046-C2M96D

### 2026-05-22T12:17:36.615Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed for commit 780c0e4ea0d5767f2a39611103e2ea638567debd after refreshed GitHub checks: PR verification, Release-ready manifest, verify-static, verify-unit, test-windows, CodeQL all passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T12:12:21.124Z, excerpt_hash=sha256:ae93d15a2b1f0a1a39f6b532ca9d8f995fcaae106368aedfcbb24ac4a89b6c55

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221046-C2M96D-amend-task-artifacts/.agentplane/tasks/202605221046-C2M96D/blueprint/resolved-snapshot.json
- old_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
- current_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221046-C2M96D

### 2026-05-22T12:29:55.926Z — VERIFY — ok

By: CODER

Note: Verified diffstat-based one-commit PR artifact freshness: framework bootstrap passed, typecheck passed, targeted ESLint passed, targeted PR-flow and pr-meta tests passed (56 tests), and OPEN PR artifacts use diffstat_sha256 without tracked head_sha.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T12:17:36.633Z, excerpt_hash=sha256:ae93d15a2b1f0a1a39f6b532ca9d8f995fcaae106368aedfcbb24ac4a89b6c55

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221046-C2M96D-amend-task-artifacts/.agentplane/tasks/202605221046-C2M96D/blueprint/resolved-snapshot.json
- old_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
- current_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221046-C2M96D

### 2026-05-22T12:37:15.471Z — VERIFY — ok

By: CODER

Note: Verified hosted verify-unit fix: added missing gitBranchUpstream/gitDiffStat test doubles for integrate prepare diffstat freshness path; vitest prepare.test.ts passed (14 tests), typecheck passed, targeted ESLint passed, full test:fast passed (325 files, 1947 passed, 2 skipped).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T12:29:55.942Z, excerpt_hash=sha256:ae93d15a2b1f0a1a39f6b532ca9d8f995fcaae106368aedfcbb24ac4a89b6c55

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221046-C2M96D-amend-task-artifacts/.agentplane/tasks/202605221046-C2M96D/blueprint/resolved-snapshot.json
- old_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
- current_digest: 7b7a01bc14a041d89c7ae3cdebac76f8d7f497922cbb1711634b725a31e8d156
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221046-C2M96D

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task commit(s) for 202605221046-C2M96D. This restores separate task artifact refresh commits after implementation commits.

## Findings

- Observation: Full one-commit task branch packaging conflicts with current PR artifact metadata because pr/meta.json stores head_sha while the commit hash depends on the file content.
  Impact: A naive amend implementation would produce stale or unreachable head_sha values and break pr check/integrate freshness gates.
  Resolution: Re-scope is required: either accept a two-commit model (implementation plus PR packet) or redesign PR metadata away from self-referential commit SHA storage before enforcing one-commit branches.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: branch_pr task artifact refresh previously created extra commits and tracked PR meta/review stored branch head SHA.
  Impact: A task branch could not satisfy a true one-commit contract because artifact freshness wrote self-referential or stale head state into tracked files.
  Resolution: OPEN PR artifacts now compute branch head live at pr check/integrate time; artifact refresh and pr update use commit amend for task-local artifact changes.
