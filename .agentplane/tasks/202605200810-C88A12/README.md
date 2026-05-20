---
id: "202605200810-C88A12"
title: "Gate release-ready manifest on task registry"
result_summary: "Merged via PR #3959."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
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
  updated_at: "2026-05-20T08:10:46.563Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-20T08:15:24.547Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed for implementation commit 55d3669a. Evidence covers ready and DOING task-registry manifest behavior, JSON stdout cleanliness, lint, typecheck, policy routing, and doctor. Residual warning is unrelated pre-existing untracked DONE archive 202605200640-7AXZRX."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-20T08:15:24.547Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed for implementation commit 55d3669a. Evidence covers ready and DOING task-registry manifest behavior, JSON stdout cleanliness, lint, typecheck, policy routing, and doctor. Residual warning is unrelated pre-existing untracked DONE archive 202605200640-7AXZRX."
  evaluated_sha: "55d3669a2595d145976efefcda69795af8b514b6"
  blueprint_digest: "eab50f35729cacbf84d26b140b69b28d66959b05b4e183ba129194ebf93e6efe"
  evidence_refs:
    - ".agentplane/tasks/202605200810-C88A12/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200810-C88A12-release-ready-task-registry/.agentplane/tasks/202605200810-C88A12/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "c68aed656063097d62dae0de757919a95e115194"
  message: "Merge pull request #3959 from basilisk-labs/task/202605200810-C88A12/release-ready-task-registry"
comments:
  -
    author: "CODER"
    body: "Start: Implement release-ready manifest task-registry gating so pre-close DOING task races cannot produce publishable release-ready artifacts."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3959 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-20T08:11:19.835Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement release-ready manifest task-registry gating so pre-close DOING task races cannot produce publishable release-ready artifacts."
  -
    type: "verify"
    at: "2026-05-20T08:15:22.834Z"
    author: "CODER"
    state: "ok"
    note: "Verified release-ready task registry gate locally. Targeted Vitest passed for release-ready manifest and CI workflow contract; eslint passed on touched scripts/tests; agentplane typecheck passed; release-ready manifest smoke returns ready=false with task_registry_not_release_ready while this task is DOING; policy routing and doctor passed with only pre-existing untracked archive warning."
  -
    type: "verify"
    at: "2026-05-20T08:15:24.547Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed for implementation commit 55d3669a. Evidence covers ready and DOING task-registry manifest behavior, JSON stdout cleanliness, lint, typecheck, policy routing, and doctor. Residual warning is unrelated pre-existing untracked DONE archive 202605200640-7AXZRX."
  -
    type: "status"
    at: "2026-05-20T09:46:45.636Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3959 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-20T09:46:45.639Z"
doc_updated_by: "INTEGRATOR"
description: "Make Core CI release-ready artifact fail closed when task registry is not release-ready, so Publish release does not discover pre-close DOING task races first."
sections:
  Summary: |-
    Gate release-ready manifest on task registry

    Make Core CI release-ready artifact fail closed when task registry is not release-ready, so Publish release does not discover pre-close DOING task races first.
  Scope: |-
    - In scope: Make Core CI release-ready artifact fail closed when task registry is not release-ready, so Publish release does not discover pre-close DOING task races first.
    - Out of scope: unrelated refactors not required for "Gate release-ready manifest on task registry".
  Plan: |-
    1. Add release task registry readiness to scripts/manifest.mjs release-ready generation so manifests become ready=false with a specific reason when task state is not release-ready.
    2. Keep Publish release's existing task-registry check as defense-in-depth, but ensure Core CI release-ready artifact is the first canonical gate.
    3. Add focused script tests covering ready checkout and DOING task checkout behavior.
    4. Run targeted tests, lint/typecheck as needed, policy routing, doctor, and release task registry check.
    5. Publish PR through branch_pr and merge after hosted checks pass.
  Verify Steps: |-
    1. Run
     RUN  v4.1.6 /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200810-C88A12-release-ready-task-registry

     Test Files  2 passed (2)
          Tests  5 passed (5)
       Start at  15:14:04
       Duration  261ms (transform 35ms, setup 0ms, import 48ms, tests 134ms, environment 0ms); expected: release-ready manifest tests and CI workflow contract pass.
    2. Run ; expected: no lint errors.
    3. Run {"schemaVersion":1,"ready":false,"reasonCode":"task_registry_not_release_ready","message":"Task registry is not release-ready: task state check failed.
    .agentplane/tasks/202605200810-C88A12/README.md: DOING task blocks release readiness; finish, close, or explicitly move it out of the release scope before candidate/publish.","nextAction":"Finish or close active task records before treating this SHA as release-ready.","sha":"test-sha","ref":"refs/heads/main","version":"0.6.3","tag":"v0.6.3","notesPath":"docs/releases/v0.6.3.md","packages":{"coreVersion":"0.6.3","recipesVersion":"0.6.3","cliVersion":"0.6.3","coreDependencyVersion":"0.6.3","recipesDependencyVersion":"0.6.3"},"taskRegistry":{"ready":false,"reasonCode":"task_registry_not_release_ready","message":"task state check failed.
    .agentplane/tasks/202605200810-C88A12/README.md: DOING task blocks release readiness; finish, close, or explicitly move it out of the release scope before candidate/publish."},"registry":{"checked":false,"status":"skipped","corePublished":null,"recipesPublished":null,"cliPublished":null,"detail":"registry snapshot was not requested"},"source":{"workflow":null,"runId":null,"runAttempt":null,"eventName":null,"generatedAt":"2026-05-20T08:14:08.368Z"}} in the active task worktree; expected:  and  while this task is DOING.
    4. Run policy routing OK and doctor (OK); expected: routing passes and doctor has no errors.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-20T08:15:22.834Z — VERIFY — ok

    By: CODER

    Note: Verified release-ready task registry gate locally. Targeted Vitest passed for release-ready manifest and CI workflow contract; eslint passed on touched scripts/tests; agentplane typecheck passed; release-ready manifest smoke returns ready=false with task_registry_not_release_ready while this task is DOING; policy routing and doctor passed with only pre-existing untracked archive warning.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T08:14:11.015Z, excerpt_hash=sha256:23dd61ebe0a8ff588d2bea8854c10e111383acf72d399434c3e6fc5794e0aec0

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200810-C88A12-release-ready-task-registry/.agentplane/tasks/202605200810-C88A12/blueprint/resolved-snapshot.json
    - old_digest: eab50f35729cacbf84d26b140b69b28d66959b05b4e183ba129194ebf93e6efe
    - current_digest: eab50f35729cacbf84d26b140b69b28d66959b05b4e183ba129194ebf93e6efe
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605200810-C88A12

    ### 2026-05-20T08:15:24.547Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed for implementation commit 55d3669a. Evidence covers ready and DOING task-registry manifest behavior, JSON stdout cleanliness, lint, typecheck, policy routing, and doctor. Residual warning is unrelated pre-existing untracked DONE archive 202605200640-7AXZRX.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T08:15:22.850Z, excerpt_hash=sha256:23dd61ebe0a8ff588d2bea8854c10e111383acf72d399434c3e6fc5794e0aec0

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200810-C88A12-release-ready-task-registry/.agentplane/tasks/202605200810-C88A12/blueprint/resolved-snapshot.json
    - old_digest: eab50f35729cacbf84d26b140b69b28d66959b05b4e183ba129194ebf93e6efe
    - current_digest: eab50f35729cacbf84d26b140b69b28d66959b05b4e183ba129194ebf93e6efe
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605200810-C88A12

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Gate release-ready manifest on task registry

Make Core CI release-ready artifact fail closed when task registry is not release-ready, so Publish release does not discover pre-close DOING task races first.

## Scope

- In scope: Make Core CI release-ready artifact fail closed when task registry is not release-ready, so Publish release does not discover pre-close DOING task races first.
- Out of scope: unrelated refactors not required for "Gate release-ready manifest on task registry".

## Plan

1. Add release task registry readiness to scripts/manifest.mjs release-ready generation so manifests become ready=false with a specific reason when task state is not release-ready.
2. Keep Publish release's existing task-registry check as defense-in-depth, but ensure Core CI release-ready artifact is the first canonical gate.
3. Add focused script tests covering ready checkout and DOING task checkout behavior.
4. Run targeted tests, lint/typecheck as needed, policy routing, doctor, and release task registry check.
5. Publish PR through branch_pr and merge after hosted checks pass.

## Verify Steps

1. Run
 RUN  v4.1.6 /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200810-C88A12-release-ready-task-registry

 Test Files  2 passed (2)
      Tests  5 passed (5)
   Start at  15:14:04
   Duration  261ms (transform 35ms, setup 0ms, import 48ms, tests 134ms, environment 0ms); expected: release-ready manifest tests and CI workflow contract pass.
2. Run ; expected: no lint errors.
3. Run {"schemaVersion":1,"ready":false,"reasonCode":"task_registry_not_release_ready","message":"Task registry is not release-ready: task state check failed.
.agentplane/tasks/202605200810-C88A12/README.md: DOING task blocks release readiness; finish, close, or explicitly move it out of the release scope before candidate/publish.","nextAction":"Finish or close active task records before treating this SHA as release-ready.","sha":"test-sha","ref":"refs/heads/main","version":"0.6.3","tag":"v0.6.3","notesPath":"docs/releases/v0.6.3.md","packages":{"coreVersion":"0.6.3","recipesVersion":"0.6.3","cliVersion":"0.6.3","coreDependencyVersion":"0.6.3","recipesDependencyVersion":"0.6.3"},"taskRegistry":{"ready":false,"reasonCode":"task_registry_not_release_ready","message":"task state check failed.
.agentplane/tasks/202605200810-C88A12/README.md: DOING task blocks release readiness; finish, close, or explicitly move it out of the release scope before candidate/publish."},"registry":{"checked":false,"status":"skipped","corePublished":null,"recipesPublished":null,"cliPublished":null,"detail":"registry snapshot was not requested"},"source":{"workflow":null,"runId":null,"runAttempt":null,"eventName":null,"generatedAt":"2026-05-20T08:14:08.368Z"}} in the active task worktree; expected:  and  while this task is DOING.
4. Run policy routing OK and doctor (OK); expected: routing passes and doctor has no errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-20T08:15:22.834Z — VERIFY — ok

By: CODER

Note: Verified release-ready task registry gate locally. Targeted Vitest passed for release-ready manifest and CI workflow contract; eslint passed on touched scripts/tests; agentplane typecheck passed; release-ready manifest smoke returns ready=false with task_registry_not_release_ready while this task is DOING; policy routing and doctor passed with only pre-existing untracked archive warning.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T08:14:11.015Z, excerpt_hash=sha256:23dd61ebe0a8ff588d2bea8854c10e111383acf72d399434c3e6fc5794e0aec0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200810-C88A12-release-ready-task-registry/.agentplane/tasks/202605200810-C88A12/blueprint/resolved-snapshot.json
- old_digest: eab50f35729cacbf84d26b140b69b28d66959b05b4e183ba129194ebf93e6efe
- current_digest: eab50f35729cacbf84d26b140b69b28d66959b05b4e183ba129194ebf93e6efe
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605200810-C88A12

### 2026-05-20T08:15:24.547Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed for implementation commit 55d3669a. Evidence covers ready and DOING task-registry manifest behavior, JSON stdout cleanliness, lint, typecheck, policy routing, and doctor. Residual warning is unrelated pre-existing untracked DONE archive 202605200640-7AXZRX.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T08:15:22.850Z, excerpt_hash=sha256:23dd61ebe0a8ff588d2bea8854c10e111383acf72d399434c3e6fc5794e0aec0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200810-C88A12-release-ready-task-registry/.agentplane/tasks/202605200810-C88A12/blueprint/resolved-snapshot.json
- old_digest: eab50f35729cacbf84d26b140b69b28d66959b05b4e183ba129194ebf93e6efe
- current_digest: eab50f35729cacbf84d26b140b69b28d66959b05b4e183ba129194ebf93e6efe
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605200810-C88A12

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
