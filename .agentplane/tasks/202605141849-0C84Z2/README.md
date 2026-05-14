---
id: "202605141849-0C84Z2"
title: "Fix doc section readback for issue #3747"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T18:50:04.286Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T19:03:38.416Z"
  updated_by: "CODER"
  note: "Re-verified after lint fix: focused Vitest suites passed, core task-readme suite passed, exact ESLint check passed, and policy routing passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement issue #3747 fix in task doc section persistence/readback, add focused regression coverage, and verify with targeted tests from the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-05-14T18:50:36.323Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement issue #3747 fix in task doc section persistence/readback, add focused regression coverage, and verify with targeted tests from the dedicated task worktree."
  -
    type: "verify"
    at: "2026-05-14T18:55:27.359Z"
    author: "CODER"
    state: "ok"
    note: "Focused verification passed for issue #3747 fix: agentplane backend/doc/plan Vitest suites passed, core task-readme suite passed, and policy routing passed."
  -
    type: "verify"
    at: "2026-05-14T19:03:38.416Z"
    author: "CODER"
    state: "ok"
    note: "Re-verified after lint fix: focused Vitest suites passed, core task-readme suite passed, exact ESLint check passed, and policy routing passed."
doc_version: 3
doc_updated_at: "2026-05-14T19:03:38.424Z"
doc_updated_by: "CODER"
description: "Fix GitHub issue #3747: task doc set can accept a section that is later filtered from canonical task doc readback, causing task doc show and task plan approve to disagree."
sections:
  Summary: "Fix GitHub issue #3747 where task doc set can report success for a section that later disappears from canonical task doc readback, making task doc show and task plan approve disagree."
  Scope: "In scope: local task README/doc section handling for doc_version=3, command behavior for task doc set/show, plan approval validation, and regression coverage for issue #3747. Out of scope: release publication, unrelated task backend sync, and unrelated existing task artifact drift."
  Plan: |-
    1. Add a regression test for issue #3747 that reproduces a configured doc section accepted by task doc set but filtered from v3 canonical readback.
    2. Fix the section contract so task doc set/show and task plan approve use a consistent persisted/readback model for configured task doc sections. Prefer preserving explicitly configured sections over reporting a successful write that cannot be read back.
    3. Run focused task doc/plan tests plus policy routing validation.
    4. Link GitHub issue #3747 to this task and close/delete/project-sync after the PR lands.
  Verify Steps: |-
    1. Run focused task doc/plan unit tests covering issue #3747. Expected: a v3 task cannot report a successful write for a non-canonical section that is dropped from readback, or the section remains readable and approvable consistently.
    2. Run targeted task document core tests. Expected: canonical section parsing/rendering behavior is stable.
    3. Run policy routing check. Expected: gateway and loaded policy route remain valid.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T18:55:27.359Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused verification passed for issue #3747 fix: agentplane backend/doc/plan Vitest suites passed, core task-readme suite passed, and policy routing passed.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T18:54:29.235Z, excerpt_hash=sha256:cb8a842695eaeff155000681e024e8f218c0c2d71b83647f2f844b3b4b24db91
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141849-0C84Z2-fix-doc-section-readback-3747/.agentplane/tasks/202605141849-0C84Z2/blueprint/resolved-snapshot.json
    - old_digest: 243283c66dce2f3f7b7898c6a9a67430ca1dc6185131829eb5b82f59ad33e12b
    - current_digest: 243283c66dce2f3f7b7898c6a9a67430ca1dc6185131829eb5b82f59ad33e12b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141849-0C84Z2
    
    ### 2026-05-14T19:03:38.416Z — VERIFY — ok
    
    By: CODER
    
    Note: Re-verified after lint fix: focused Vitest suites passed, core task-readme suite passed, exact ESLint check passed, and policy routing passed.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T18:55:27.364Z, excerpt_hash=sha256:cb8a842695eaeff155000681e024e8f218c0c2d71b83647f2f844b3b4b24db91
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141849-0C84Z2-fix-doc-section-readback-3747/.agentplane/tasks/202605141849-0C84Z2/blueprint/resolved-snapshot.json
    - old_digest: 243283c66dce2f3f7b7898c6a9a67430ca1dc6185131829eb5b82f59ad33e12b
    - current_digest: 243283c66dce2f3f7b7898c6a9a67430ca1dc6185131829eb5b82f59ad33e12b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141849-0C84Z2
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task branch commit if the section contract fix regresses supported task README sections or plan approval behavior."
  Findings: |-
    Issue link: https://github.com/basilisk-labs/agentplane/issues/3747. Linked comment: https://github.com/basilisk-labs/agentplane/issues/3747#issuecomment-4453752174.
    
    Verification evidence:
    - Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts
    - Result: pass
    - Evidence: 3 files passed, 44 tests passed.
    - Scope: backend task record read-model plus task doc and plan command behavior.
    
    - Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-readme.test.ts
    - Result: pass
    - Evidence: 1 file passed, 18 tests passed.
    - Scope: core task README parse/render behavior.
    
    - Command: node .agentplane/policy/check-routing.mjs
    - Result: pass
    - Evidence: policy routing OK.
    - Scope: gateway/policy route validity.
    
    - Observation: taskRecordToData now merges README body task-doc sections with frontmatter sections, preserving configured body-only sections such as Risks while keeping frontmatter sections authoritative for stale canonical body content.
      Impact: Fixes task doc set/show and plan approve disagreement for configured sections that are rendered in README body but absent from v3 canonical frontmatter sections.
      Resolution: Added regression coverage for body-only Risks alongside existing task doc/plan/core tests.
    
    - Observation: GitHub Core CI initially failed only on lint for the section merge expression; the expression was rewritten without an empty object spread fallback.
      Impact: Keeps issue #3747 behavior fix while satisfying repository lint rules.
      Resolution: Committed lint-safe merge logic and reran targeted verification.
id_source: "generated"
---
## Summary

Fix GitHub issue #3747 where task doc set can report success for a section that later disappears from canonical task doc readback, making task doc show and task plan approve disagree.

## Scope

In scope: local task README/doc section handling for doc_version=3, command behavior for task doc set/show, plan approval validation, and regression coverage for issue #3747. Out of scope: release publication, unrelated task backend sync, and unrelated existing task artifact drift.

## Plan

1. Add a regression test for issue #3747 that reproduces a configured doc section accepted by task doc set but filtered from v3 canonical readback.
2. Fix the section contract so task doc set/show and task plan approve use a consistent persisted/readback model for configured task doc sections. Prefer preserving explicitly configured sections over reporting a successful write that cannot be read back.
3. Run focused task doc/plan tests plus policy routing validation.
4. Link GitHub issue #3747 to this task and close/delete/project-sync after the PR lands.

## Verify Steps

1. Run focused task doc/plan unit tests covering issue #3747. Expected: a v3 task cannot report a successful write for a non-canonical section that is dropped from readback, or the section remains readable and approvable consistently.
2. Run targeted task document core tests. Expected: canonical section parsing/rendering behavior is stable.
3. Run policy routing check. Expected: gateway and loaded policy route remain valid.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T18:55:27.359Z — VERIFY — ok

By: CODER

Note: Focused verification passed for issue #3747 fix: agentplane backend/doc/plan Vitest suites passed, core task-readme suite passed, and policy routing passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T18:54:29.235Z, excerpt_hash=sha256:cb8a842695eaeff155000681e024e8f218c0c2d71b83647f2f844b3b4b24db91

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141849-0C84Z2-fix-doc-section-readback-3747/.agentplane/tasks/202605141849-0C84Z2/blueprint/resolved-snapshot.json
- old_digest: 243283c66dce2f3f7b7898c6a9a67430ca1dc6185131829eb5b82f59ad33e12b
- current_digest: 243283c66dce2f3f7b7898c6a9a67430ca1dc6185131829eb5b82f59ad33e12b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141849-0C84Z2

### 2026-05-14T19:03:38.416Z — VERIFY — ok

By: CODER

Note: Re-verified after lint fix: focused Vitest suites passed, core task-readme suite passed, exact ESLint check passed, and policy routing passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T18:55:27.364Z, excerpt_hash=sha256:cb8a842695eaeff155000681e024e8f218c0c2d71b83647f2f844b3b4b24db91

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141849-0C84Z2-fix-doc-section-readback-3747/.agentplane/tasks/202605141849-0C84Z2/blueprint/resolved-snapshot.json
- old_digest: 243283c66dce2f3f7b7898c6a9a67430ca1dc6185131829eb5b82f59ad33e12b
- current_digest: 243283c66dce2f3f7b7898c6a9a67430ca1dc6185131829eb5b82f59ad33e12b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141849-0C84Z2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task branch commit if the section contract fix regresses supported task README sections or plan approval behavior.

## Findings

Issue link: https://github.com/basilisk-labs/agentplane/issues/3747. Linked comment: https://github.com/basilisk-labs/agentplane/issues/3747#issuecomment-4453752174.

Verification evidence:
- Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts
- Result: pass
- Evidence: 3 files passed, 44 tests passed.
- Scope: backend task record read-model plus task doc and plan command behavior.

- Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-readme.test.ts
- Result: pass
- Evidence: 1 file passed, 18 tests passed.
- Scope: core task README parse/render behavior.

- Command: node .agentplane/policy/check-routing.mjs
- Result: pass
- Evidence: policy routing OK.
- Scope: gateway/policy route validity.

- Observation: taskRecordToData now merges README body task-doc sections with frontmatter sections, preserving configured body-only sections such as Risks while keeping frontmatter sections authoritative for stale canonical body content.
  Impact: Fixes task doc set/show and plan approve disagreement for configured sections that are rendered in README body but absent from v3 canonical frontmatter sections.
  Resolution: Added regression coverage for body-only Risks alongside existing task doc/plan/core tests.

- Observation: GitHub Core CI initially failed only on lint for the section merge expression; the expression was rewritten without an empty object spread fallback.
  Impact: Keeps issue #3747 behavior fix while satisfying repository lint rules.
  Resolution: Committed lint-safe merge logic and reran targeted verification.
