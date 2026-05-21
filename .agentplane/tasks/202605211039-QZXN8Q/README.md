---
id: "202605211039-QZXN8Q"
title: "Fix open context GitHub issues"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-21T10:40:34.103Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-21T11:39:21.093Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed for code head 0c198bbf4 with evidence: focused context regression tests 30/30; typecheck; targeted eslint; policy routing; diff check; pre-push fast CI 57/57; hosted PR checks passed after review fixes; GitHub review threads resolved."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-21T11:39:21.093Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed for code head 0c198bbf4 with evidence: focused context regression tests 30/30; typecheck; targeted eslint; policy routing; diff check; pre-push fast CI 57/57; hosted PR checks passed after review fixes; GitHub review threads resolved."
  evaluated_sha: "0c198bbf469779be42a7620a2d3527fca102c82a"
  blueprint_digest: "18e0ade17aae8b986cc912bccff42f183718c79ba21082f2d56af1cf29798d15"
  evidence_refs:
    - ".agentplane/tasks/202605211039-QZXN8Q/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211039-QZXN8Q-fix-open-context-issues/.agentplane/tasks/202605211039-QZXN8Q/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement approved GitHub context issue batch in branch_pr worktree, covering wiki lint/link contracts, manifest lock source inventory, stale projection health/search behavior, and maximum-assimilation derived artifact consistency."
events:
  -
    type: "status"
    at: "2026-05-21T10:40:55.447Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved GitHub context issue batch in branch_pr worktree, covering wiki lint/link contracts, manifest lock source inventory, stale projection health/search behavior, and maximum-assimilation derived artifact consistency."
  -
    type: "verify"
    at: "2026-05-21T10:51:45.512Z"
    author: "CODER"
    state: "ok"
    note: "Implemented context issue gates and ran focused tests, typecheck, exact-file eslint, policy routing, git diff check, and ap doctor successfully. Commit: 22bd61429."
  -
    type: "verify"
    at: "2026-05-21T10:51:55.998Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality gate passed from local evidence: focused context regressions, typecheck, exact-file eslint, policy routing, diff check, and ap doctor are green. GitHub PR #4000 is open for hosted checks and merge."
  -
    type: "verify"
    at: "2026-05-21T10:59:52.363Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Final branch head d3f360d8c passed pre-push fast CI: formatting, schema/template/policy/release checks, build, typecheck, bundle build, cold-start baseline, recipes/scripts freshness, onboarding scenario, hotspot baseline, vitest routing, targeted lint, and targeted context unit tests (57 tests passed)."
  -
    type: "verify"
    at: "2026-05-21T11:39:21.093Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed for code head 0c198bbf4 with evidence: focused context regression tests 30/30; typecheck; targeted eslint; policy routing; diff check; pre-push fast CI 57/57; hosted PR checks passed after review fixes; GitHub review threads resolved."
doc_version: 3
doc_updated_at: "2026-05-21T11:39:21.113Z"
doc_updated_by: "CODER"
description: "Batch-fix open GitHub context issues: Obsidian wiki contract, manifest source inventory, stale projections, and derived context consistency. Scope includes GitHub issues #3989, #3990, #3991, #3992, #3993, #3994, #3996, #3997, #3998. Investigate #3879 only for directly shared context runner recovery paths; otherwise leave it as separate follow-up."
sections:
  Summary: |-
    Fix open context GitHub issues

    Batch-fix open GitHub context issues: Obsidian wiki contract, manifest source inventory, stale projections, and derived context consistency. Scope includes GitHub issues #3989, #3990, #3991, #3992, #3993, #3994, #3996, #3997, #3998. Investigate #3879 only for directly shared context runner recovery paths; otherwise leave it as separate follow-up.
  Scope: "Included GitHub issues: #3989, #3990, #3991, #3992, #3993, #3994, #3996, #3997, #3998. Related investigation only: #3879. Allowed implementation surfaces: packages/agentplane context commands/runtime, focused context tests, generated CLI docs if command semantics change, and task/PR artifacts for this task."
  Plan: |-
    1. Implement the change for "Fix open context GitHub issues".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    - Run focused context tests covering wiki lint/link resolution, manifest lock source inventory, stale projection health/search behavior, and derived graph/fact consistency.
    - Run TypeScript typecheck or the repo's focused equivalent for touched packages.
    - Run node .agentplane/policy/check-routing.mjs.
    - Run ap doctor from the task worktree or record a concrete environment blocker.
    - Verify GitHub issues addressed in PR body; do not close issues until merged PR evidence is available.
  Verification: |-
    Executed in task worktree.

    - PASS: bun test packages/agentplane/src/commands/context/wiki.obsidian.unit.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts (29 pass, 0 fail).
    - PASS: bun run typecheck.
    - PASS: ./node_modules/.bin/eslint on the changed context files.
    - PASS: node .agentplane/policy/check-routing.mjs.
    - PASS: git diff --check.
    - PASS: ap doctor (doctor OK; errors=0 warnings=0).

    GitHub issue coverage: #3989/#3990/#3992/#3993/#3994 covered by wiki lint/link/frontmatter/.obsidian rules; #3996/#3998 covered by complete manifest source inventory; #3997 covered by stale projection failure and stale search suppression; #3991 covered by maximum-assimilation graph_refs vs derived projection gate. #3879 remains a v0.7 runner/runtime backlog item per existing GitHub issue comment and is not fixed by this context contract batch.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-21T10:51:45.512Z — VERIFY — ok

    By: CODER

    Note: Implemented context issue gates and ran focused tests, typecheck, exact-file eslint, policy routing, git diff check, and ap doctor successfully. Commit: 22bd61429.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T10:50:37.645Z, excerpt_hash=sha256:37671c5337839de06fb4f848de4b18c324851e9d05cfbd459b10eb6ce6d78bd9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211039-QZXN8Q-fix-open-context-issues/.agentplane/tasks/202605211039-QZXN8Q/blueprint/resolved-snapshot.json
    - old_digest: 18e0ade17aae8b986cc912bccff42f183718c79ba21082f2d56af1cf29798d15
    - current_digest: 18e0ade17aae8b986cc912bccff42f183718c79ba21082f2d56af1cf29798d15
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605211039-QZXN8Q

    ### 2026-05-21T10:51:55.998Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality gate passed from local evidence: focused context regressions, typecheck, exact-file eslint, policy routing, diff check, and ap doctor are green. GitHub PR #4000 is open for hosted checks and merge.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T10:51:45.528Z, excerpt_hash=sha256:37671c5337839de06fb4f848de4b18c324851e9d05cfbd459b10eb6ce6d78bd9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211039-QZXN8Q-fix-open-context-issues/.agentplane/tasks/202605211039-QZXN8Q/blueprint/resolved-snapshot.json
    - old_digest: 18e0ade17aae8b986cc912bccff42f183718c79ba21082f2d56af1cf29798d15
    - current_digest: 18e0ade17aae8b986cc912bccff42f183718c79ba21082f2d56af1cf29798d15
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605211039-QZXN8Q

    ### 2026-05-21T10:59:52.363Z — VERIFY — ok

    By: EVALUATOR

    Note: Final branch head d3f360d8c passed pre-push fast CI: formatting, schema/template/policy/release checks, build, typecheck, bundle build, cold-start baseline, recipes/scripts freshness, onboarding scenario, hotspot baseline, vitest routing, targeted lint, and targeted context unit tests (57 tests passed).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T10:51:56.016Z, excerpt_hash=sha256:37671c5337839de06fb4f848de4b18c324851e9d05cfbd459b10eb6ce6d78bd9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211039-QZXN8Q-fix-open-context-issues/.agentplane/tasks/202605211039-QZXN8Q/blueprint/resolved-snapshot.json
    - old_digest: 18e0ade17aae8b986cc912bccff42f183718c79ba21082f2d56af1cf29798d15
    - current_digest: 18e0ade17aae8b986cc912bccff42f183718c79ba21082f2d56af1cf29798d15
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605211039-QZXN8Q

    ### 2026-05-21T11:39:21.093Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed for code head 0c198bbf4 with evidence: focused context regression tests 30/30; typecheck; targeted eslint; policy routing; diff check; pre-push fast CI 57/57; hosted PR checks passed after review fixes; GitHub review threads resolved.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T10:59:52.410Z, excerpt_hash=sha256:37671c5337839de06fb4f848de4b18c324851e9d05cfbd459b10eb6ce6d78bd9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211039-QZXN8Q-fix-open-context-issues/.agentplane/tasks/202605211039-QZXN8Q/blueprint/resolved-snapshot.json
    - old_digest: 18e0ade17aae8b986cc912bccff42f183718c79ba21082f2d56af1cf29798d15
    - current_digest: 18e0ade17aae8b986cc912bccff42f183718c79ba21082f2d56af1cf29798d15
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605211039-QZXN8Q

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix open context GitHub issues

Batch-fix open GitHub context issues: Obsidian wiki contract, manifest source inventory, stale projections, and derived context consistency. Scope includes GitHub issues #3989, #3990, #3991, #3992, #3993, #3994, #3996, #3997, #3998. Investigate #3879 only for directly shared context runner recovery paths; otherwise leave it as separate follow-up.

## Scope

Included GitHub issues: #3989, #3990, #3991, #3992, #3993, #3994, #3996, #3997, #3998. Related investigation only: #3879. Allowed implementation surfaces: packages/agentplane context commands/runtime, focused context tests, generated CLI docs if command semantics change, and task/PR artifacts for this task.

## Plan

1. Implement the change for "Fix open context GitHub issues".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

- Run focused context tests covering wiki lint/link resolution, manifest lock source inventory, stale projection health/search behavior, and derived graph/fact consistency.
- Run TypeScript typecheck or the repo's focused equivalent for touched packages.
- Run node .agentplane/policy/check-routing.mjs.
- Run ap doctor from the task worktree or record a concrete environment blocker.
- Verify GitHub issues addressed in PR body; do not close issues until merged PR evidence is available.

## Verification

Executed in task worktree.

- PASS: bun test packages/agentplane/src/commands/context/wiki.obsidian.unit.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts (29 pass, 0 fail).
- PASS: bun run typecheck.
- PASS: ./node_modules/.bin/eslint on the changed context files.
- PASS: node .agentplane/policy/check-routing.mjs.
- PASS: git diff --check.
- PASS: ap doctor (doctor OK; errors=0 warnings=0).

GitHub issue coverage: #3989/#3990/#3992/#3993/#3994 covered by wiki lint/link/frontmatter/.obsidian rules; #3996/#3998 covered by complete manifest source inventory; #3997 covered by stale projection failure and stale search suppression; #3991 covered by maximum-assimilation graph_refs vs derived projection gate. #3879 remains a v0.7 runner/runtime backlog item per existing GitHub issue comment and is not fixed by this context contract batch.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-21T10:51:45.512Z — VERIFY — ok

By: CODER

Note: Implemented context issue gates and ran focused tests, typecheck, exact-file eslint, policy routing, git diff check, and ap doctor successfully. Commit: 22bd61429.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T10:50:37.645Z, excerpt_hash=sha256:37671c5337839de06fb4f848de4b18c324851e9d05cfbd459b10eb6ce6d78bd9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211039-QZXN8Q-fix-open-context-issues/.agentplane/tasks/202605211039-QZXN8Q/blueprint/resolved-snapshot.json
- old_digest: 18e0ade17aae8b986cc912bccff42f183718c79ba21082f2d56af1cf29798d15
- current_digest: 18e0ade17aae8b986cc912bccff42f183718c79ba21082f2d56af1cf29798d15
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605211039-QZXN8Q

### 2026-05-21T10:51:55.998Z — VERIFY — ok

By: EVALUATOR

Note: Quality gate passed from local evidence: focused context regressions, typecheck, exact-file eslint, policy routing, diff check, and ap doctor are green. GitHub PR #4000 is open for hosted checks and merge.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T10:51:45.528Z, excerpt_hash=sha256:37671c5337839de06fb4f848de4b18c324851e9d05cfbd459b10eb6ce6d78bd9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211039-QZXN8Q-fix-open-context-issues/.agentplane/tasks/202605211039-QZXN8Q/blueprint/resolved-snapshot.json
- old_digest: 18e0ade17aae8b986cc912bccff42f183718c79ba21082f2d56af1cf29798d15
- current_digest: 18e0ade17aae8b986cc912bccff42f183718c79ba21082f2d56af1cf29798d15
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605211039-QZXN8Q

### 2026-05-21T10:59:52.363Z — VERIFY — ok

By: EVALUATOR

Note: Final branch head d3f360d8c passed pre-push fast CI: formatting, schema/template/policy/release checks, build, typecheck, bundle build, cold-start baseline, recipes/scripts freshness, onboarding scenario, hotspot baseline, vitest routing, targeted lint, and targeted context unit tests (57 tests passed).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T10:51:56.016Z, excerpt_hash=sha256:37671c5337839de06fb4f848de4b18c324851e9d05cfbd459b10eb6ce6d78bd9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211039-QZXN8Q-fix-open-context-issues/.agentplane/tasks/202605211039-QZXN8Q/blueprint/resolved-snapshot.json
- old_digest: 18e0ade17aae8b986cc912bccff42f183718c79ba21082f2d56af1cf29798d15
- current_digest: 18e0ade17aae8b986cc912bccff42f183718c79ba21082f2d56af1cf29798d15
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605211039-QZXN8Q

### 2026-05-21T11:39:21.093Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed for code head 0c198bbf4 with evidence: focused context regression tests 30/30; typecheck; targeted eslint; policy routing; diff check; pre-push fast CI 57/57; hosted PR checks passed after review fixes; GitHub review threads resolved.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T10:59:52.410Z, excerpt_hash=sha256:37671c5337839de06fb4f848de4b18c324851e9d05cfbd459b10eb6ce6d78bd9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211039-QZXN8Q-fix-open-context-issues/.agentplane/tasks/202605211039-QZXN8Q/blueprint/resolved-snapshot.json
- old_digest: 18e0ade17aae8b986cc912bccff42f183718c79ba21082f2d56af1cf29798d15
- current_digest: 18e0ade17aae8b986cc912bccff42f183718c79ba21082f2d56af1cf29798d15
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605211039-QZXN8Q

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
