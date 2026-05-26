---
id: "202605252058-3Q9G73"
title: "Expand commit subject naming coverage"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-25T21:00:39.722Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-26T05:32:55.578Z"
  updated_by: "CODER"
  note: "Verified follow-up CI blocker fix. Commands passed: bun test packages/agentplane/src/commands/pr/internal/pr-paths.test.ts (3 pass), bun test packages/core/src/commit/commit-policy.test.ts (29 pass), bun run format:changed (Prettier passed), bun run typecheck (tsc -b passed), bun run test:fast (336 files passed; 2009 passed, 2 skipped), node .agentplane/policy/check-routing.mjs (policy routing OK)."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-26T05:33:05.015Z"
  updated_by: "EVALUATOR"
  note: "Commit subject policy expansion and CI blocker fix are focused and verified."
  evaluated_sha: "f54445348f9432b2d19a5d9ff0471ff5bc2c06e1"
  blueprint_digest: "b4634442440327264f085314b817fd3c1ba3c8d6d5b06724c8dfae9152f569b3"
  evidence_refs:
    - ".agentplane/tasks/202605252058-3Q9G73/README.md"
    - ".agentplane/tasks/202605252058-3Q9G73/quality/20260526-053305015-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605252058-3Q9G73/quality/20260526-053305015-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605252058-3Q9G73/quality/20260526-053305015-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605252058-3Q9G73/blueprint/resolved-snapshot.json"
    - "packages/core/src/commit/commit-policy.test.ts"
    - "packages/agentplane/src/commands/pr/internal/pr-paths.test.ts"
  findings:
    - "Reviewed final diff after hosted verify-unit failure. The additional pr-paths test change only aligns the mock with existing two-ref fallback behavior; commit subject policy still preserves strict task-context traceability."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement the approved commit subject naming coverage expansion in the task worktree, preserving strict task-bound traceability while allowing documented hosted semantic, merge transport, and dependency bot subject classes with focused tests."
events:
  -
    type: "status"
    at: "2026-05-25T21:01:26.100Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the approved commit subject naming coverage expansion in the task worktree, preserving strict task-bound traceability while allowing documented hosted semantic, merge transport, and dependency bot subject classes with focused tests."
  -
    type: "verify"
    at: "2026-05-25T21:06:03.474Z"
    author: "CODER"
    state: "ok"
    note: "Verified commit subject naming coverage expansion. Commands passed: bun test packages/core/src/commit/commit-policy.test.ts (29 pass), node .agentplane/policy/check-routing.mjs (policy routing OK), bun run typecheck (tsc -b passed), bun run format:changed (Prettier passed). Diff remained limited to commit policy, focused tests, and task README."
  -
    type: "verify"
    at: "2026-05-26T05:32:55.578Z"
    author: "CODER"
    state: "ok"
    note: "Verified follow-up CI blocker fix. Commands passed: bun test packages/agentplane/src/commands/pr/internal/pr-paths.test.ts (3 pass), bun test packages/core/src/commit/commit-policy.test.ts (29 pass), bun run format:changed (Prettier passed), bun run typecheck (tsc -b passed), bun run test:fast (336 files passed; 2009 passed, 2 skipped), node .agentplane/policy/check-routing.mjs (policy routing OK)."
doc_version: 3
doc_updated_at: "2026-05-26T05:32:55.594Z"
doc_updated_by: "CODER"
description: "Extend commit subject policy to classify task commits, semantic hosted commits, merge transport commits, and known bot dependency commits so recent branch_pr history fits a documented naming convention without weakening task-bound traceability."
sections:
  Summary: |-
    Expand commit subject naming coverage

    Extend commit subject policy to classify task commits, semantic hosted commits, merge transport commits, and known bot dependency commits so recent branch_pr history fits a documented naming convention without weakening task-bound traceability.
  Scope: |-
    - In scope: Extend commit subject policy to classify task commits, semantic hosted commits, merge transport commits, and known bot dependency commits so recent branch_pr history fits a documented naming convention without weakening task-bound traceability.
    - Out of scope: unrelated refactors not required for "Expand commit subject naming coverage".
  Plan: "Plan: 1. Update commit subject policy to classify strict task subjects, conventional semantic subjects, Git/GitHub merge transport subjects, and known dependency-bot bump subjects. 2. Preserve strict task-bound traceability for manual task commits unless AGENTPLANE_ALLOW_HUMAN_TASK_SUBJECT is explicitly set. 3. Add unit tests covering recent real subjects from May 26 branch_pr history and rejection cases. 4. Update user-facing diagnostics/docs if the accepted forms change. 5. Verify with targeted commit-policy tests, hook-related tests if touched, routing policy check, and task verify-show evidence."
  Verify Steps: |-
    1. Run `bun test packages/core/src/commit/commit-policy.test.ts`. Expected: commit subject policy accepts strict task, hosted semantic, Git transport, and dependency bot subjects while rejecting non-strict task-context conventional subjects.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy gateway and module budgets remain valid.
    3. Review `git diff -- packages/core/src/commit/commit-policy.ts packages/core/src/commit/commit-policy.test.ts .agentplane/tasks/202605252058-3Q9G73/README.md`. Expected: diff is limited to commit subject policy, focused tests, and task verification documentation.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-25T21:06:03.474Z — VERIFY — ok

    By: CODER

    Note: Verified commit subject naming coverage expansion. Commands passed: bun test packages/core/src/commit/commit-policy.test.ts (29 pass), node .agentplane/policy/check-routing.mjs (policy routing OK), bun run typecheck (tsc -b passed), bun run format:changed (Prettier passed). Diff remained limited to commit policy, focused tests, and task README.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T21:01:26.100Z, excerpt_hash=sha256:de3e3278cda6d73589cc67452d8559e687c86a48010ee07987ddeb181e1e4c2a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605252058-3Q9G73-expand-commit-subject-naming-coverage/.agentplane/tasks/202605252058-3Q9G73/blueprint/resolved-snapshot.json
    - old_digest: b4634442440327264f085314b817fd3c1ba3c8d6d5b06724c8dfae9152f569b3
    - current_digest: b4634442440327264f085314b817fd3c1ba3c8d6d5b06724c8dfae9152f569b3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605252058-3Q9G73

    ### 2026-05-26T05:32:55.578Z — VERIFY — ok

    By: CODER

    Note: Verified follow-up CI blocker fix. Commands passed: bun test packages/agentplane/src/commands/pr/internal/pr-paths.test.ts (3 pass), bun test packages/core/src/commit/commit-policy.test.ts (29 pass), bun run format:changed (Prettier passed), bun run typecheck (tsc -b passed), bun run test:fast (336 files passed; 2009 passed, 2 skipped), node .agentplane/policy/check-routing.mjs (policy routing OK).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T21:06:03.521Z, excerpt_hash=sha256:de3e3278cda6d73589cc67452d8559e687c86a48010ee07987ddeb181e1e4c2a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605252058-3Q9G73-expand-commit-subject-naming-coverage/.agentplane/tasks/202605252058-3Q9G73/blueprint/resolved-snapshot.json
    - old_digest: b4634442440327264f085314b817fd3c1ba3c8d6d5b06724c8dfae9152f569b3
    - current_digest: b4634442440327264f085314b817fd3c1ba3c8d6d5b06724c8dfae9152f569b3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605252058-3Q9G73

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The policy now accepts conventional hosted semantic subjects, Git/GitHub transport subjects, and dependency bot bump subjects when no task context is present.
      Impact: Recent branch_pr history forms such as tests:, code:, Merge pull request, Merge branch, and Bump subjects are covered by the naming convention.
      Resolution: Strict task-context commits still require the emoji + task suffix + scope template unless explicit human-task subject override is set.

    - Observation: Hosted verify-unit failed because pr-paths.test mocked only one missing git ref while runtime correctly tries task branch and origin/task branch.
      Impact: CI required check could not pass even though runtime behavior was correct.
      Resolution: Updated the test mock to reject both candidate refs before expecting null.
id_source: "generated"
---
## Summary

Expand commit subject naming coverage

Extend commit subject policy to classify task commits, semantic hosted commits, merge transport commits, and known bot dependency commits so recent branch_pr history fits a documented naming convention without weakening task-bound traceability.

## Scope

- In scope: Extend commit subject policy to classify task commits, semantic hosted commits, merge transport commits, and known bot dependency commits so recent branch_pr history fits a documented naming convention without weakening task-bound traceability.
- Out of scope: unrelated refactors not required for "Expand commit subject naming coverage".

## Plan

Plan: 1. Update commit subject policy to classify strict task subjects, conventional semantic subjects, Git/GitHub merge transport subjects, and known dependency-bot bump subjects. 2. Preserve strict task-bound traceability for manual task commits unless AGENTPLANE_ALLOW_HUMAN_TASK_SUBJECT is explicitly set. 3. Add unit tests covering recent real subjects from May 26 branch_pr history and rejection cases. 4. Update user-facing diagnostics/docs if the accepted forms change. 5. Verify with targeted commit-policy tests, hook-related tests if touched, routing policy check, and task verify-show evidence.

## Verify Steps

1. Run `bun test packages/core/src/commit/commit-policy.test.ts`. Expected: commit subject policy accepts strict task, hosted semantic, Git transport, and dependency bot subjects while rejecting non-strict task-context conventional subjects.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy gateway and module budgets remain valid.
3. Review `git diff -- packages/core/src/commit/commit-policy.ts packages/core/src/commit/commit-policy.test.ts .agentplane/tasks/202605252058-3Q9G73/README.md`. Expected: diff is limited to commit subject policy, focused tests, and task verification documentation.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-25T21:06:03.474Z — VERIFY — ok

By: CODER

Note: Verified commit subject naming coverage expansion. Commands passed: bun test packages/core/src/commit/commit-policy.test.ts (29 pass), node .agentplane/policy/check-routing.mjs (policy routing OK), bun run typecheck (tsc -b passed), bun run format:changed (Prettier passed). Diff remained limited to commit policy, focused tests, and task README.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T21:01:26.100Z, excerpt_hash=sha256:de3e3278cda6d73589cc67452d8559e687c86a48010ee07987ddeb181e1e4c2a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605252058-3Q9G73-expand-commit-subject-naming-coverage/.agentplane/tasks/202605252058-3Q9G73/blueprint/resolved-snapshot.json
- old_digest: b4634442440327264f085314b817fd3c1ba3c8d6d5b06724c8dfae9152f569b3
- current_digest: b4634442440327264f085314b817fd3c1ba3c8d6d5b06724c8dfae9152f569b3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605252058-3Q9G73

### 2026-05-26T05:32:55.578Z — VERIFY — ok

By: CODER

Note: Verified follow-up CI blocker fix. Commands passed: bun test packages/agentplane/src/commands/pr/internal/pr-paths.test.ts (3 pass), bun test packages/core/src/commit/commit-policy.test.ts (29 pass), bun run format:changed (Prettier passed), bun run typecheck (tsc -b passed), bun run test:fast (336 files passed; 2009 passed, 2 skipped), node .agentplane/policy/check-routing.mjs (policy routing OK).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T21:06:03.521Z, excerpt_hash=sha256:de3e3278cda6d73589cc67452d8559e687c86a48010ee07987ddeb181e1e4c2a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605252058-3Q9G73-expand-commit-subject-naming-coverage/.agentplane/tasks/202605252058-3Q9G73/blueprint/resolved-snapshot.json
- old_digest: b4634442440327264f085314b817fd3c1ba3c8d6d5b06724c8dfae9152f569b3
- current_digest: b4634442440327264f085314b817fd3c1ba3c8d6d5b06724c8dfae9152f569b3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605252058-3Q9G73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The policy now accepts conventional hosted semantic subjects, Git/GitHub transport subjects, and dependency bot bump subjects when no task context is present.
  Impact: Recent branch_pr history forms such as tests:, code:, Merge pull request, Merge branch, and Bump subjects are covered by the naming convention.
  Resolution: Strict task-context commits still require the emoji + task suffix + scope template unless explicit human-task subject override is set.

- Observation: Hosted verify-unit failed because pr-paths.test mocked only one missing git ref while runtime correctly tries task branch and origin/task branch.
  Impact: CI required check could not pass even though runtime behavior was correct.
  Resolution: Updated the test mock to reject both candidate refs before expecting null.
