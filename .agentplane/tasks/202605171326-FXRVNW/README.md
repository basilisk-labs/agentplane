---
id: "202605171326-FXRVNW"
title: "Freeze release candidate base and scope after late merges"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-18T17:40:54.824Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-18T19:11:45.452Z"
  updated_by: "CODER"
  note: "Verified follow-up: finish validation mocks now include branch-prefix GitHub PR lookup, so close-tail sibling detection does not break existing finish validation tests."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the v0.6.3 prerelease rough-edge batch in a dedicated branch_pr worktree, covering release base freeze, stale task-state diagnostics, legacy task README frontmatter handling, and context wiki scaffold lint."
events:
  -
    type: "status"
    at: "2026-05-18T17:41:11.215Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the v0.6.3 prerelease rough-edge batch in a dedicated branch_pr worktree, covering release base freeze, stale task-state diagnostics, legacy task README frontmatter handling, and context wiki scaffold lint."
  -
    type: "verify"
    at: "2026-05-18T17:46:10.744Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release planning now records baseSha and release candidate/apply fails closed if HEAD drifts from the planned base; focused release plan tests, builds, policy routing, and doctor passed."
  -
    type: "verify"
    at: "2026-05-18T18:33:48.117Z"
    author: "CODER"
    state: "ok"
    note: "Verified: hardened release process follow-ups: branch_pr release plans now pin protected base SHA, release candidate preflight catches protected-base drift, PR checks/integration surface unresolved GitHub review threads, pre-push scope handles git push origin HEAD, Vitest hoisting warnings are removed, and close-tail duplicate PR risk is reduced by sibling branch-prefix detection. Focused Vitest, lint, build, routing, and doctor passed."
  -
    type: "verify"
    at: "2026-05-18T18:45:30.962Z"
    author: "CODER"
    state: "ok"
    note: "Verified follow-up: close-tail unit test coverage now stays below the oversized-test hotspot threshold after adding sibling close PR coverage."
  -
    type: "verify"
    at: "2026-05-18T18:56:31.201Z"
    author: "CODER"
    state: "ok"
    note: "Verified follow-up: close-tail test reset now satisfies lint while staying below the hotspot threshold."
  -
    type: "verify"
    at: "2026-05-18T19:11:45.452Z"
    author: "CODER"
    state: "ok"
    note: "Verified follow-up: finish validation mocks now include branch-prefix GitHub PR lookup, so close-tail sibling detection does not break existing finish validation tests."
doc_version: 3
doc_updated_at: "2026-05-18T19:11:45.483Z"
doc_updated_by: "CODER"
description: "Harden release candidate planning so a patch release cannot claim to exclude work that is already merged into the candidate base. The v0.6.2 regression case is a release task that planned to exclude route-decision CLI work while PR #3823 later landed on origin/main. Release tooling should pin the base SHA, detect late merges, and require explicit revert, branch cut, or re-scope before candidate generation."
sections:
  Summary: |-
    Freeze release candidate base and scope after late merges

    Harden release candidate planning so a patch release cannot claim to exclude work that is already merged into the candidate base. The v0.6.2 regression case is a release task that planned to exclude route-decision CLI work while PR #3823 later landed on origin/main. Release tooling should pin the base SHA, detect late merges, and require explicit revert, branch cut, or re-scope before candidate generation.
  Scope: |-
    - In scope: Harden release candidate planning so a patch release cannot claim to exclude work that is already merged into the candidate base. The v0.6.2 regression case is a release task that planned to exclude route-decision CLI work while PR #3823 later landed on origin/main. Release tooling should pin the base SHA, detect late merges, and require explicit revert, branch cut, or re-scope before candidate generation.
    - Out of scope: unrelated refactors not required for "Freeze release candidate base and scope after late merges".
  Plan: "Batch prerelease fix plan for v0.6.3: primary task owns one branch_pr worktree and includes 202605171326-FXRVNW, 202605171325-7P5M3V, 202605171325-7P2VM4, and 202605170941-3RACDD. Implement release base/scope freeze guard, stale local task-state warning when base is behind upstream, tolerant diagnostics for invalid legacy task README frontmatter, and context wiki scaffold lint alignment. Verify focused tests for release planning/state, task scanner/frontmatter, stale-upstream diagnostics, context wiki init+lint, plus policy routing, doctor, and release prerelease gates before generating the v0.6.3 candidate."
  Verify Steps: |-
    1. Add focused release-planning tests for an excluded PR/task that is already reachable from the selected candidate base SHA. Expected: release candidate generation fails closed with explicit re-scope/revert/branch-cut guidance.
    2. Add a positive test where excluded work is not reachable from the base SHA. Expected: release planning proceeds and records the pinned base.
    3. Run the focused release candidate/planning tests. Expected: all tests pass.
    4. If release manifest or notes generation is touched, run the relevant release check such as bun run release:check or a narrower documented substitute. Expected: pass, or skipped with concrete blocker and risk.
    5. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: routing passes; doctor has no new warnings beyond documented pre-existing drift.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-18T17:46:10.744Z — VERIFY — ok

    By: CODER

    Note: Verified: release planning now records baseSha and release candidate/apply fails closed if HEAD drifts from the planned base; focused release plan tests, builds, policy routing, and doctor passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T17:41:11.215Z, excerpt_hash=sha256:7eecdcf44b9b978192f3a7307d5417499bfdc57fbc78a1aaae98c7fdb4b1045c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171326-FXRVNW-v063-prerelease-rough-edges/.agentplane/tasks/202605171326-FXRVNW/blueprint/resolved-snapshot.json
    - old_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
    - current_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171326-FXRVNW

    ### 2026-05-18T18:33:48.117Z — VERIFY — ok

    By: CODER

    Note: Verified: hardened release process follow-ups: branch_pr release plans now pin protected base SHA, release candidate preflight catches protected-base drift, PR checks/integration surface unresolved GitHub review threads, pre-push scope handles git push origin HEAD, Vitest hoisting warnings are removed, and close-tail duplicate PR risk is reduced by sibling branch-prefix detection. Focused Vitest, lint, build, routing, and doctor passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T17:46:10.773Z, excerpt_hash=sha256:7eecdcf44b9b978192f3a7307d5417499bfdc57fbc78a1aaae98c7fdb4b1045c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171326-FXRVNW-v063-prerelease-rough-edges/.agentplane/tasks/202605171326-FXRVNW/blueprint/resolved-snapshot.json
    - old_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
    - current_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171326-FXRVNW

    ### 2026-05-18T18:45:30.962Z — VERIFY — ok

    By: CODER

    Note: Verified follow-up: close-tail unit test coverage now stays below the oversized-test hotspot threshold after adding sibling close PR coverage.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T18:33:48.156Z, excerpt_hash=sha256:7eecdcf44b9b978192f3a7307d5417499bfdc57fbc78a1aaae98c7fdb4b1045c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171326-FXRVNW-v063-prerelease-rough-edges/.agentplane/tasks/202605171326-FXRVNW/blueprint/resolved-snapshot.json
    - old_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
    - current_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171326-FXRVNW

    ### 2026-05-18T18:56:31.201Z — VERIFY — ok

    By: CODER

    Note: Verified follow-up: close-tail test reset now satisfies lint while staying below the hotspot threshold.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T18:45:31.322Z, excerpt_hash=sha256:7eecdcf44b9b978192f3a7307d5417499bfdc57fbc78a1aaae98c7fdb4b1045c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171326-FXRVNW-v063-prerelease-rough-edges/.agentplane/tasks/202605171326-FXRVNW/blueprint/resolved-snapshot.json
    - old_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
    - current_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171326-FXRVNW

    ### 2026-05-18T19:11:45.452Z — VERIFY — ok

    By: CODER

    Note: Verified follow-up: finish validation mocks now include branch-prefix GitHub PR lookup, so close-tail sibling detection does not break existing finish validation tests.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T18:56:31.395Z, excerpt_hash=sha256:7eecdcf44b9b978192f3a7307d5417499bfdc57fbc78a1aaae98c7fdb4b1045c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171326-FXRVNW-v063-prerelease-rough-edges/.agentplane/tasks/202605171326-FXRVNW/blueprint/resolved-snapshot.json
    - old_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
    - current_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171326-FXRVNW

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands: bunx vitest run release/plan, release/apply.preflight, release/apply.push-recovery, cli/local-ci-selection, task/mutation-parity, task/finish.close-tail --testTimeout 60000 --hookTimeout 60000; bunx eslint changed TS files; bun run --filter=agentplane build; node .agentplane/policy/check-routing.mjs && ap doctor.
      Impact: Results: Vitest pass, 6 files and 89 tests; eslint pass on changed TS files; agentplane build pass with ESM dist/cli.js build success; policy routing OK; doctor OK with repo-local handoff info only.
      Resolution: Scope covered: release planning/preflight, release push recovery, pre-push selector, GitHub review-thread blocker, task mutation parity, close-tail idempotency, and repo policy health.

    - Observation: Commands: bunx vitest run packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts --testTimeout 60000 --hookTimeout 60000; bun run hotspots:check; git diff --check.
      Impact: Results: finish.close-tail unit tests passed, 1 file and 13 tests; hotspot baseline OK with 11 oversized-test entries and 12567 total lines; whitespace check passed.
      Resolution: No baseline expansion needed; added close-tail coverage remains under the 1000-line warning threshold.

    - Observation: Commands: bunx eslint packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts; bunx prettier --check packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts; bunx vitest run packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts --testTimeout 60000 --hookTimeout 60000.
      Impact: Results: eslint pass; prettier pass; finish.close-tail unit tests passed, 1 file and 13 tests; file remains 999 lines.
      Resolution: The lint-safe for-of reset keeps the test file under the oversized-test threshold without changing baseline budgets.

    - Observation: Commands: bunx vitest run packages/agentplane/src/commands/task/finish.validation.unit.test.ts --testNamePattern 'rejects branch_pr close commit before mutating task state when other tracked files are dirty|auto-materializes a task-close branch by default in branch_pr mode' --testTimeout 60000 --hookTimeout 60000 --reporter verbose; bunx eslint packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts; bunx prettier --check packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts.
      Impact: Results: targeted finish validation scenarios passed, 2 tests; eslint passed; prettier passed.
      Resolution: Existing finish validation mock contract now matches the new sync-github export used by close-tail duplicate PR detection.
id_source: "generated"
---
## Summary

Freeze release candidate base and scope after late merges

Harden release candidate planning so a patch release cannot claim to exclude work that is already merged into the candidate base. The v0.6.2 regression case is a release task that planned to exclude route-decision CLI work while PR #3823 later landed on origin/main. Release tooling should pin the base SHA, detect late merges, and require explicit revert, branch cut, or re-scope before candidate generation.

## Scope

- In scope: Harden release candidate planning so a patch release cannot claim to exclude work that is already merged into the candidate base. The v0.6.2 regression case is a release task that planned to exclude route-decision CLI work while PR #3823 later landed on origin/main. Release tooling should pin the base SHA, detect late merges, and require explicit revert, branch cut, or re-scope before candidate generation.
- Out of scope: unrelated refactors not required for "Freeze release candidate base and scope after late merges".

## Plan

Batch prerelease fix plan for v0.6.3: primary task owns one branch_pr worktree and includes 202605171326-FXRVNW, 202605171325-7P5M3V, 202605171325-7P2VM4, and 202605170941-3RACDD. Implement release base/scope freeze guard, stale local task-state warning when base is behind upstream, tolerant diagnostics for invalid legacy task README frontmatter, and context wiki scaffold lint alignment. Verify focused tests for release planning/state, task scanner/frontmatter, stale-upstream diagnostics, context wiki init+lint, plus policy routing, doctor, and release prerelease gates before generating the v0.6.3 candidate.

## Verify Steps

1. Add focused release-planning tests for an excluded PR/task that is already reachable from the selected candidate base SHA. Expected: release candidate generation fails closed with explicit re-scope/revert/branch-cut guidance.
2. Add a positive test where excluded work is not reachable from the base SHA. Expected: release planning proceeds and records the pinned base.
3. Run the focused release candidate/planning tests. Expected: all tests pass.
4. If release manifest or notes generation is touched, run the relevant release check such as bun run release:check or a narrower documented substitute. Expected: pass, or skipped with concrete blocker and risk.
5. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: routing passes; doctor has no new warnings beyond documented pre-existing drift.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-18T17:46:10.744Z — VERIFY — ok

By: CODER

Note: Verified: release planning now records baseSha and release candidate/apply fails closed if HEAD drifts from the planned base; focused release plan tests, builds, policy routing, and doctor passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T17:41:11.215Z, excerpt_hash=sha256:7eecdcf44b9b978192f3a7307d5417499bfdc57fbc78a1aaae98c7fdb4b1045c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171326-FXRVNW-v063-prerelease-rough-edges/.agentplane/tasks/202605171326-FXRVNW/blueprint/resolved-snapshot.json
- old_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
- current_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171326-FXRVNW

### 2026-05-18T18:33:48.117Z — VERIFY — ok

By: CODER

Note: Verified: hardened release process follow-ups: branch_pr release plans now pin protected base SHA, release candidate preflight catches protected-base drift, PR checks/integration surface unresolved GitHub review threads, pre-push scope handles git push origin HEAD, Vitest hoisting warnings are removed, and close-tail duplicate PR risk is reduced by sibling branch-prefix detection. Focused Vitest, lint, build, routing, and doctor passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T17:46:10.773Z, excerpt_hash=sha256:7eecdcf44b9b978192f3a7307d5417499bfdc57fbc78a1aaae98c7fdb4b1045c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171326-FXRVNW-v063-prerelease-rough-edges/.agentplane/tasks/202605171326-FXRVNW/blueprint/resolved-snapshot.json
- old_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
- current_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171326-FXRVNW

### 2026-05-18T18:45:30.962Z — VERIFY — ok

By: CODER

Note: Verified follow-up: close-tail unit test coverage now stays below the oversized-test hotspot threshold after adding sibling close PR coverage.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T18:33:48.156Z, excerpt_hash=sha256:7eecdcf44b9b978192f3a7307d5417499bfdc57fbc78a1aaae98c7fdb4b1045c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171326-FXRVNW-v063-prerelease-rough-edges/.agentplane/tasks/202605171326-FXRVNW/blueprint/resolved-snapshot.json
- old_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
- current_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171326-FXRVNW

### 2026-05-18T18:56:31.201Z — VERIFY — ok

By: CODER

Note: Verified follow-up: close-tail test reset now satisfies lint while staying below the hotspot threshold.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T18:45:31.322Z, excerpt_hash=sha256:7eecdcf44b9b978192f3a7307d5417499bfdc57fbc78a1aaae98c7fdb4b1045c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171326-FXRVNW-v063-prerelease-rough-edges/.agentplane/tasks/202605171326-FXRVNW/blueprint/resolved-snapshot.json
- old_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
- current_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171326-FXRVNW

### 2026-05-18T19:11:45.452Z — VERIFY — ok

By: CODER

Note: Verified follow-up: finish validation mocks now include branch-prefix GitHub PR lookup, so close-tail sibling detection does not break existing finish validation tests.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T18:56:31.395Z, excerpt_hash=sha256:7eecdcf44b9b978192f3a7307d5417499bfdc57fbc78a1aaae98c7fdb4b1045c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171326-FXRVNW-v063-prerelease-rough-edges/.agentplane/tasks/202605171326-FXRVNW/blueprint/resolved-snapshot.json
- old_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
- current_digest: ff0d68e901f85322f204ed809c3256235cbfa5ce3b8a6cd6c5af2981bed1bdb0
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171326-FXRVNW

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands: bunx vitest run release/plan, release/apply.preflight, release/apply.push-recovery, cli/local-ci-selection, task/mutation-parity, task/finish.close-tail --testTimeout 60000 --hookTimeout 60000; bunx eslint changed TS files; bun run --filter=agentplane build; node .agentplane/policy/check-routing.mjs && ap doctor.
  Impact: Results: Vitest pass, 6 files and 89 tests; eslint pass on changed TS files; agentplane build pass with ESM dist/cli.js build success; policy routing OK; doctor OK with repo-local handoff info only.
  Resolution: Scope covered: release planning/preflight, release push recovery, pre-push selector, GitHub review-thread blocker, task mutation parity, close-tail idempotency, and repo policy health.

- Observation: Commands: bunx vitest run packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts --testTimeout 60000 --hookTimeout 60000; bun run hotspots:check; git diff --check.
  Impact: Results: finish.close-tail unit tests passed, 1 file and 13 tests; hotspot baseline OK with 11 oversized-test entries and 12567 total lines; whitespace check passed.
  Resolution: No baseline expansion needed; added close-tail coverage remains under the 1000-line warning threshold.

- Observation: Commands: bunx eslint packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts; bunx prettier --check packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts; bunx vitest run packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts --testTimeout 60000 --hookTimeout 60000.
  Impact: Results: eslint pass; prettier pass; finish.close-tail unit tests passed, 1 file and 13 tests; file remains 999 lines.
  Resolution: The lint-safe for-of reset keeps the test file under the oversized-test threshold without changing baseline budgets.

- Observation: Commands: bunx vitest run packages/agentplane/src/commands/task/finish.validation.unit.test.ts --testNamePattern 'rejects branch_pr close commit before mutating task state when other tracked files are dirty|auto-materializes a task-close branch by default in branch_pr mode' --testTimeout 60000 --hookTimeout 60000 --reporter verbose; bunx eslint packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts; bunx prettier --check packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts.
  Impact: Results: targeted finish validation scenarios passed, 2 tests; eslint passed; prettier passed.
  Resolution: Existing finish validation mock contract now matches the new sync-github export used by close-tail duplicate PR detection.
