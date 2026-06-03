---
id: "202606031634-40X015"
title: "Fix task-local artifact commit eligibility after finish"
result_summary: "Merged via PR #4400."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "issue-4399"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-03T16:35:20.660Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-03T16:43:46.268Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/policy/evaluate.test.ts packages/agentplane/src/commands/guard/impl/policy.test.ts packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts --pool=forks --testTimeout 120000 --hookTimeout 120000. Result: pass, 4 files and 43 tests passed. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: ap doctor. Result: pass, doctor OK with unrelated historical DONE-task warnings 202605221745-8BHZSX and 202606011809-VCQPP7. Command: git diff --check HEAD~1..HEAD. Result: pass. Live guard evidence: ap commit without --allow-tasks auto-staged same-task README and blueprint artifacts from explicit .agentplane/tasks/202606031634-40X015 allowlist before pre-commit signal-9 fallback; explicit pre-commit hook then passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-03T16:52:06.731Z"
  updated_by: "EVALUATOR"
  note: "Issue #4399 fixed: explicit same-task .agentplane/tasks/<task-id> allowlists now admit generated blueprint/quality artifacts without --allow-tasks while preserving protection for the task index and unrelated task artifacts."
  evaluated_sha: "e119f14de2f7825bd68c7225aee4cef57edb2dcc"
  blueprint_digest: "51cf37ca1ccc156fd962076190d2e0dc4e5f9cfc417a4894de0fc5e603b6347c"
  evidence_refs:
    - ".agentplane/tasks/202606031634-40X015/README.md"
    - ".agentplane/tasks/202606031634-40X015/quality/20260603-165206731-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606031634-40X015/quality/20260603-165206731-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606031634-40X015/quality/20260603-165206731-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606031634-40X015/blueprint/resolved-snapshot.json"
    - "bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/policy/evaluate.test.ts packages/agentplane/src/commands/guard/impl/policy.test.ts packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts --pool=forks --testTimeout 120000 --hookTimeout 120000"
    - "gh pr checks 4400 --watch --interval 30"
  findings:
    - "Focused guard/policy regressions pass; live ap commit path auto-staged same-task task artifacts from explicit allowlist without --allow-tasks before an unrelated pre-commit signal-9 fallback; hosted PR checks are green."
commit:
  hash: "869ff48ff5cea09cfeceb139fd165ffbd93ff906"
  message: "🔒 40X015 cli: narrow artifact exception"
comments:
  -
    author: "CODER"
    body: "Start: Investigating GitHub issue #4399 in the commit/lifecycle task artifact path, with scope limited to same-task generated artifacts and focused regression coverage."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4400 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-06-03T16:35:25.024Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Investigating GitHub issue #4399 in the commit/lifecycle task artifact path, with scope limited to same-task generated artifacts and focused regression coverage."
  -
    type: "verify"
    at: "2026-06-03T16:43:46.268Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/policy/evaluate.test.ts packages/agentplane/src/commands/guard/impl/policy.test.ts packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts --pool=forks --testTimeout 120000 --hookTimeout 120000. Result: pass, 4 files and 43 tests passed. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: ap doctor. Result: pass, doctor OK with unrelated historical DONE-task warnings 202605221745-8BHZSX and 202606011809-VCQPP7. Command: git diff --check HEAD~1..HEAD. Result: pass. Live guard evidence: ap commit without --allow-tasks auto-staged same-task README and blueprint artifacts from explicit .agentplane/tasks/202606031634-40X015 allowlist before pre-commit signal-9 fallback; explicit pre-commit hook then passed."
  -
    type: "status"
    at: "2026-06-03T17:18:50.968Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4400 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-06-03T17:18:50.973Z"
doc_updated_by: "INTEGRATOR"
description: "Resolve GitHub issue #4399: task-local generated blueprint/quality artifacts should not force a separate follow-up task or require --allow-tasks when committed for the same task."
sections:
  Summary: |-
    Fix task-local artifact commit eligibility after finish

    Resolve GitHub issue #4399: task-local generated blueprint/quality artifacts should not force a separate follow-up task or require --allow-tasks when committed for the same task.
  Scope: |-
    - In scope: Resolve GitHub issue #4399: task-local generated blueprint/quality artifacts should not force a separate follow-up task or require --allow-tasks when committed for the same task.
    - Out of scope: unrelated refactors not required for "Fix task-local artifact commit eligibility after finish".
  Plan: |-
    1. Locate the commit allowlist / task-artifact filtering path that rejects same-task .agentplane/tasks/<task-id> artifacts without --allow-tasks.
    2. Change same-task artifact handling so task-local blueprint/quality artifacts are commit-eligible for that task without registering another task and without the extra artifact allow flag.
    3. Add focused regression coverage for issue #4399 covering same-task generated artifacts under .agentplane/tasks/<task-id>.
    4. Run the task Verify Steps, record verification, update PR artifacts, and hand off to integration.
  Verify Steps: |-
    1. Run focused regression coverage for task-local generated artifacts. Expected: same-task files under .agentplane/tasks/<task-id>/blueprint and .agentplane/tasks/<task-id>/quality are accepted by the task commit path without requiring a separate follow-up task or --allow-tasks.
    2. Run the relevant CLI test suite for the touched commit/lifecycle module. Expected: all tests pass.
    3. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing checks pass.
    4. Run agentplane doctor. Expected: required framework checks pass or any unrelated environment-only warning is recorded.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-03T16:43:46.268Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/policy/evaluate.test.ts packages/agentplane/src/commands/guard/impl/policy.test.ts packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts --pool=forks --testTimeout 120000 --hookTimeout 120000. Result: pass, 4 files and 43 tests passed. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: ap doctor. Result: pass, doctor OK with unrelated historical DONE-task warnings 202605221745-8BHZSX and 202606011809-VCQPP7. Command: git diff --check HEAD~1..HEAD. Result: pass. Live guard evidence: ap commit without --allow-tasks auto-staged same-task README and blueprint artifacts from explicit .agentplane/tasks/202606031634-40X015 allowlist before pre-commit signal-9 fallback; explicit pre-commit hook then passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T16:35:25.024Z, excerpt_hash=sha256:b939fba1687a542f6ca8c52efb286b332d540e94de08a5d2af7f09b181c89fe5

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606031634-40X015-fix-task-local-artifact-commit-eligibility-after/.agentplane/tasks/202606031634-40X015/blueprint/resolved-snapshot.json
    - old_digest: 51cf37ca1ccc156fd962076190d2e0dc4e5f9cfc417a4894de0fc5e603b6347c
    - current_digest: 51cf37ca1ccc156fd962076190d2e0dc4e5f9cfc417a4894de0fc5e603b6347c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606031634-40X015

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix task-local artifact commit eligibility after finish

Resolve GitHub issue #4399: task-local generated blueprint/quality artifacts should not force a separate follow-up task or require --allow-tasks when committed for the same task.

## Scope

- In scope: Resolve GitHub issue #4399: task-local generated blueprint/quality artifacts should not force a separate follow-up task or require --allow-tasks when committed for the same task.
- Out of scope: unrelated refactors not required for "Fix task-local artifact commit eligibility after finish".

## Plan

1. Locate the commit allowlist / task-artifact filtering path that rejects same-task .agentplane/tasks/<task-id> artifacts without --allow-tasks.
2. Change same-task artifact handling so task-local blueprint/quality artifacts are commit-eligible for that task without registering another task and without the extra artifact allow flag.
3. Add focused regression coverage for issue #4399 covering same-task generated artifacts under .agentplane/tasks/<task-id>.
4. Run the task Verify Steps, record verification, update PR artifacts, and hand off to integration.

## Verify Steps

1. Run focused regression coverage for task-local generated artifacts. Expected: same-task files under .agentplane/tasks/<task-id>/blueprint and .agentplane/tasks/<task-id>/quality are accepted by the task commit path without requiring a separate follow-up task or --allow-tasks.
2. Run the relevant CLI test suite for the touched commit/lifecycle module. Expected: all tests pass.
3. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing checks pass.
4. Run agentplane doctor. Expected: required framework checks pass or any unrelated environment-only warning is recorded.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-03T16:43:46.268Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/policy/evaluate.test.ts packages/agentplane/src/commands/guard/impl/policy.test.ts packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts --pool=forks --testTimeout 120000 --hookTimeout 120000. Result: pass, 4 files and 43 tests passed. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: ap doctor. Result: pass, doctor OK with unrelated historical DONE-task warnings 202605221745-8BHZSX and 202606011809-VCQPP7. Command: git diff --check HEAD~1..HEAD. Result: pass. Live guard evidence: ap commit without --allow-tasks auto-staged same-task README and blueprint artifacts from explicit .agentplane/tasks/202606031634-40X015 allowlist before pre-commit signal-9 fallback; explicit pre-commit hook then passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T16:35:25.024Z, excerpt_hash=sha256:b939fba1687a542f6ca8c52efb286b332d540e94de08a5d2af7f09b181c89fe5

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606031634-40X015-fix-task-local-artifact-commit-eligibility-after/.agentplane/tasks/202606031634-40X015/blueprint/resolved-snapshot.json
- old_digest: 51cf37ca1ccc156fd962076190d2e0dc4e5f9cfc417a4894de0fc5e603b6347c
- current_digest: 51cf37ca1ccc156fd962076190d2e0dc4e5f9cfc417a4894de0fc5e603b6347c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606031634-40X015

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
