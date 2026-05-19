---
id: "202605191451-TFBJEG"
title: "Fix issue #3934 maximum-assimilation lifecycle drift"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "code"
  - "context"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T14:51:46.654Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T16:59:28.896Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after review fix: maximum_assimilation mode no longer bypasses source_set.files for context_assimilation tasks; focused release-readiness test, lint:core, typecheck, framework bootstrap, and hosted PR checks passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-19T16:59:28.896Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after review fix: maximum_assimilation mode no longer bypasses source_set.files for context_assimilation tasks; focused release-readiness test, lint:core, typecheck, framework bootstrap, and hosted PR checks passed."
  evaluated_sha: "ce1775ccd1882baf3c993d1acf7e1a0ea3a43f8c"
  blueprint_digest: "9e3baf098fc34016f22121f1d106c78e0c8bf6a9a0828f7a25d4a41866993171"
  evidence_refs:
    - ".agentplane/tasks/202605191451-TFBJEG/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191451-TFBJEG-fix-3934-context-lifecycle/.agentplane/tasks/202605191451-TFBJEG/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement issue #3934 fixes in the dedicated branch_pr worktree, covering maximum-assimilation schema/help drift, context verification routing, finish close-commit preflight, and context check labeling with focused tests."
events:
  -
    type: "status"
    at: "2026-05-19T14:52:30.110Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement issue #3934 fixes in the dedicated branch_pr worktree, covering maximum-assimilation schema/help drift, context verification routing, finish close-commit preflight, and context check labeling with focused tests."
  -
    type: "verify"
    at: "2026-05-19T15:35:35.482Z"
    author: "CODER"
    state: "ok"
    note: "Implemented issue #3934 fixes and ran focused schema/context/finish lifecycle checks, typecheck, schema sync check, format check, policy routing, git diff check, and ap doctor."
  -
    type: "verify"
    at: "2026-05-19T15:36:08.753Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed: focused regression coverage exercises the schema/help drift, initialized profile switch behavior, profile-switch verification path, context check label, and direct close-commit preflight before DONE mutation."
  -
    type: "verify"
    at: "2026-05-19T16:59:28.896Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed after review fix: maximum_assimilation mode no longer bypasses source_set.files for context_assimilation tasks; focused release-readiness test, lint:core, typecheck, framework bootstrap, and hosted PR checks passed."
doc_version: 3
doc_updated_at: "2026-05-19T16:59:28.939Z"
doc_updated_by: "CODER"
description: "Resolve GitHub issue #3934: align maximum-assimilation profile switching, blueprint schema/help, context verify-task scope, direct finish close-commit preflight, and context check labeling."
sections:
  Summary: |-
    Fix issue #3934 maximum-assimilation lifecycle drift

    Resolve GitHub issue #3934: align maximum-assimilation profile switching, blueprint schema/help, context verify-task scope, direct finish close-commit preflight, and context check labeling.
  Scope: |-
    - In scope: Resolve GitHub issue #3934: align maximum-assimilation profile switching, blueprint schema/help, context verify-task scope, direct finish close-commit preflight, and context check labeling.
    - Out of scope: unrelated refactors not required for "Fix issue #3934 maximum-assimilation lifecycle drift".
  Plan: "1. Reproduce issue #3934 surfaces with targeted CLI/schema checks. 2. Align maximum-assimilation blueprint ids between help and task README schema. 3. Make context profile switching explicit for initialized workspaces. 4. Adjust context verify-task so non-ingest context tasks have a supported validation route or clear scoped rejection. 5. Preflight direct finish close-commit before mutating task DONE where possible. 6. Fix context check labeling. 7. Add/update focused tests and run task verify-show, targeted tests, typecheck/policy checks, ap doctor."
  Verify Steps: |-
    1. `ap task verify-show 202605191451-TFBJEG`
    2. `bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts`
    3. `bunx vitest run packages/agentplane/src/cli/run-cli.core.context-init.test.ts`
    4. `bunx vitest run packages/agentplane/src/commands/context/release-readiness.test.ts -t "profile-switch|context check label|context facts"`
    5. `bunx vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts -t "direct dirty tracked"`
    6. `bun run schemas:check`
    7. `bun run typecheck`
    8. `bun run format:check`
    9. `node .agentplane/policy/check-routing.mjs`
    10. `ap doctor`

    Context DoD note: `ap context verify-task 202605191451-TFBJEG` is intentionally not applicable because this is a code task that changes context CLI behavior, not a task-bound context artifact mutation.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T15:35:35.482Z — VERIFY — ok

    By: CODER

    Note: Implemented issue #3934 fixes and ran focused schema/context/finish lifecycle checks, typecheck, schema sync check, format check, policy routing, git diff check, and ap doctor.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:26:22.445Z, excerpt_hash=sha256:13c016aa641d0e1b5121af8b956b2adf7ccbc65b1e30aaeb2009f9c39ab2b899

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191451-TFBJEG-fix-3934-context-lifecycle/.agentplane/tasks/202605191451-TFBJEG/blueprint/resolved-snapshot.json
    - old_digest: 9e3baf098fc34016f22121f1d106c78e0c8bf6a9a0828f7a25d4a41866993171
    - current_digest: 9e3baf098fc34016f22121f1d106c78e0c8bf6a9a0828f7a25d4a41866993171
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191451-TFBJEG

    ### 2026-05-19T15:36:08.753Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed: focused regression coverage exercises the schema/help drift, initialized profile switch behavior, profile-switch verification path, context check label, and direct close-commit preflight before DONE mutation.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:35:35.560Z, excerpt_hash=sha256:13c016aa641d0e1b5121af8b956b2adf7ccbc65b1e30aaeb2009f9c39ab2b899

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191451-TFBJEG-fix-3934-context-lifecycle/.agentplane/tasks/202605191451-TFBJEG/blueprint/resolved-snapshot.json
    - old_digest: 9e3baf098fc34016f22121f1d106c78e0c8bf6a9a0828f7a25d4a41866993171
    - current_digest: 9e3baf098fc34016f22121f1d106c78e0c8bf6a9a0828f7a25d4a41866993171
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191451-TFBJEG

    ### 2026-05-19T16:59:28.896Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed after review fix: maximum_assimilation mode no longer bypasses source_set.files for context_assimilation tasks; focused release-readiness test, lint:core, typecheck, framework bootstrap, and hosted PR checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:36:08.882Z, excerpt_hash=sha256:13c016aa641d0e1b5121af8b956b2adf7ccbc65b1e30aaeb2009f9c39ab2b899

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191451-TFBJEG-fix-3934-context-lifecycle/.agentplane/tasks/202605191451-TFBJEG/blueprint/resolved-snapshot.json
    - old_digest: 9e3baf098fc34016f22121f1d106c78e0c8bf6a9a0828f7a25d4a41866993171
    - current_digest: 9e3baf098fc34016f22121f1d106c78e0c8bf6a9a0828f7a25d4a41866993171
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191451-TFBJEG

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Verified maximum-assimilation blueprint schema alignment, explicit initialized profile switch handling, profile-switch context verify-task path, context check labeling, and direct finish close-commit dirty preflight before DONE mutation.
      Impact: Issue #3934 surfaces are covered in focused regression tests. Full finish-close-commit file initially exposed stale commit-from-comment expectations under the EVALUATOR gate; the fixture was updated to assert the current quality-gate behavior and the focused regression now passes.
      Resolution: Use --force for explicit context profile scaffold rewrites, allow config/profile context verification without source_set.files, label context check distinctly, and reject dirty direct close commits before mutating task state.
id_source: "generated"
---
## Summary

Fix issue #3934 maximum-assimilation lifecycle drift

Resolve GitHub issue #3934: align maximum-assimilation profile switching, blueprint schema/help, context verify-task scope, direct finish close-commit preflight, and context check labeling.

## Scope

- In scope: Resolve GitHub issue #3934: align maximum-assimilation profile switching, blueprint schema/help, context verify-task scope, direct finish close-commit preflight, and context check labeling.
- Out of scope: unrelated refactors not required for "Fix issue #3934 maximum-assimilation lifecycle drift".

## Plan

1. Reproduce issue #3934 surfaces with targeted CLI/schema checks. 2. Align maximum-assimilation blueprint ids between help and task README schema. 3. Make context profile switching explicit for initialized workspaces. 4. Adjust context verify-task so non-ingest context tasks have a supported validation route or clear scoped rejection. 5. Preflight direct finish close-commit before mutating task DONE where possible. 6. Fix context check labeling. 7. Add/update focused tests and run task verify-show, targeted tests, typecheck/policy checks, ap doctor.

## Verify Steps

1. `ap task verify-show 202605191451-TFBJEG`
2. `bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts`
3. `bunx vitest run packages/agentplane/src/cli/run-cli.core.context-init.test.ts`
4. `bunx vitest run packages/agentplane/src/commands/context/release-readiness.test.ts -t "profile-switch|context check label|context facts"`
5. `bunx vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts -t "direct dirty tracked"`
6. `bun run schemas:check`
7. `bun run typecheck`
8. `bun run format:check`
9. `node .agentplane/policy/check-routing.mjs`
10. `ap doctor`

Context DoD note: `ap context verify-task 202605191451-TFBJEG` is intentionally not applicable because this is a code task that changes context CLI behavior, not a task-bound context artifact mutation.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T15:35:35.482Z — VERIFY — ok

By: CODER

Note: Implemented issue #3934 fixes and ran focused schema/context/finish lifecycle checks, typecheck, schema sync check, format check, policy routing, git diff check, and ap doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:26:22.445Z, excerpt_hash=sha256:13c016aa641d0e1b5121af8b956b2adf7ccbc65b1e30aaeb2009f9c39ab2b899

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191451-TFBJEG-fix-3934-context-lifecycle/.agentplane/tasks/202605191451-TFBJEG/blueprint/resolved-snapshot.json
- old_digest: 9e3baf098fc34016f22121f1d106c78e0c8bf6a9a0828f7a25d4a41866993171
- current_digest: 9e3baf098fc34016f22121f1d106c78e0c8bf6a9a0828f7a25d4a41866993171
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191451-TFBJEG

### 2026-05-19T15:36:08.753Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed: focused regression coverage exercises the schema/help drift, initialized profile switch behavior, profile-switch verification path, context check label, and direct close-commit preflight before DONE mutation.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:35:35.560Z, excerpt_hash=sha256:13c016aa641d0e1b5121af8b956b2adf7ccbc65b1e30aaeb2009f9c39ab2b899

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191451-TFBJEG-fix-3934-context-lifecycle/.agentplane/tasks/202605191451-TFBJEG/blueprint/resolved-snapshot.json
- old_digest: 9e3baf098fc34016f22121f1d106c78e0c8bf6a9a0828f7a25d4a41866993171
- current_digest: 9e3baf098fc34016f22121f1d106c78e0c8bf6a9a0828f7a25d4a41866993171
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191451-TFBJEG

### 2026-05-19T16:59:28.896Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed after review fix: maximum_assimilation mode no longer bypasses source_set.files for context_assimilation tasks; focused release-readiness test, lint:core, typecheck, framework bootstrap, and hosted PR checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:36:08.882Z, excerpt_hash=sha256:13c016aa641d0e1b5121af8b956b2adf7ccbc65b1e30aaeb2009f9c39ab2b899

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191451-TFBJEG-fix-3934-context-lifecycle/.agentplane/tasks/202605191451-TFBJEG/blueprint/resolved-snapshot.json
- old_digest: 9e3baf098fc34016f22121f1d106c78e0c8bf6a9a0828f7a25d4a41866993171
- current_digest: 9e3baf098fc34016f22121f1d106c78e0c8bf6a9a0828f7a25d4a41866993171
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191451-TFBJEG

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Verified maximum-assimilation blueprint schema alignment, explicit initialized profile switch handling, profile-switch context verify-task path, context check labeling, and direct finish close-commit dirty preflight before DONE mutation.
  Impact: Issue #3934 surfaces are covered in focused regression tests. Full finish-close-commit file initially exposed stale commit-from-comment expectations under the EVALUATOR gate; the fixture was updated to assert the current quality-gate behavior and the focused regression now passes.
  Resolution: Use --force for explicit context profile scaffold rewrites, allow config/profile context verification without source_set.files, label context check distinctly, and reject dirty direct close commits before mutating task state.
