---
id: "202605181255-29XQ07"
title: "Repair framework context health contract"
result_summary: "Merged via PR #3895."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-18T12:56:12.501Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-18T13:02:11.402Z"
  updated_by: "CODER"
  note: "Verified: framework context health scaffold now exists and context commands pass; starter wiki placeholder wording was removed from the template and generated page; command/policy/runtime checks and Turbo workspace discovery pass."
  attempts: 0
commit:
  hash: "890e2c70d229f324007edf21dfcf30b4f0036e95"
  message: "Merge pull request #3895 from basilisk-labs/task/202605181255-29XQ07/framework-context-health"
comments:
  -
    author: "CODER"
    body: "Start: repair the framework context health route by reproducing the missing scaffold failure, applying the smallest context contract fix, and verifying context checks plus policy/runtime health."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3895 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-18T12:56:30.165Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair the framework context health route by reproducing the missing scaffold failure, applying the smallest context contract fix, and verifying context checks plus policy/runtime health."
  -
    type: "verify"
    at: "2026-05-18T13:02:11.402Z"
    author: "CODER"
    state: "ok"
    note: "Verified: framework context health scaffold now exists and context commands pass; starter wiki placeholder wording was removed from the template and generated page; command/policy/runtime checks and Turbo workspace discovery pass."
  -
    type: "status"
    at: "2026-05-18T17:37:25.274Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3895 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-18T17:37:25.280Z"
doc_updated_by: "INTEGRATOR"
description: "Fix the current framework checkout context health gap so declared context commands have a valid scaffold or deterministic repair behavior, and verify the local context health route."
sections:
  Summary: |-
    Repair framework context health contract

    Fix the current framework checkout context health gap so declared context commands have a valid scaffold or deterministic repair behavior, and verify the local context health route.
  Scope: |-
    - In scope: Fix the current framework checkout context health gap so declared context commands have a valid scaffold or deterministic repair behavior, and verify the local context health route.
    - Out of scope: unrelated refactors not required for "Repair framework context health contract".
  Plan: "1. Reproduce the current context health failure in the task worktree and inspect the context init/doctor contracts. 2. Implement the smallest fix so framework checkouts with declared context commands have deterministic context health: either complete the scaffold expected by doctor or adjust repair behavior without weakening initialized-project validation. 3. Remove/replace any fallback placeholder verification text in this task with concrete checks. 4. Verify with context health commands, focused context tests, policy routing, doctor, and a Turbo visibility smoke if relevant."
  Verify Steps: |-
    1. Run `ap context check`. Expected: exits 0 and prints `context doctor: ok` in this framework worktree.
    2. Run `ap context doctor`. Expected: exits 0 and prints `context doctor: ok` with the checked-in context scaffold.
    3. Run focused context init/wiki tests: `bun run test:project -- agentplane packages/agentplane/src/commands/context/release-readiness.test.ts`. Expected: context init/wiki health behavior remains covered.
    4. Run command and policy/runtime checks: `bun run workflows:command-check`, `node .agentplane/policy/check-routing.mjs`, and `ap doctor`. Expected: command guidance, policy routing, and framework runtime health stay green.
    5. Run formatting/syntax checks: `bunx prettier --check context/README.md context/wiki/AGENTS.md context/wiki/index.md context/capabilities/README.md .agentplane/context/agentplane.context.yaml .agentplane/context/policies/context.rules.md .agentplane/context/policies/wiki.rules.md .agentplane/context/policies/capability.rules.md .agentplane/context/policies/redaction.rules.yaml .agentplane/context/policies/sync.rules.yaml packages/agentplane/src/commands/context/init-wiki.ts` and `git diff --check`. Expected: touched text artifacts and TS diff are clean.
    6. Run `bun run dev:turbo:ls`. Expected: local Turbo overlay still resolves the workspace graph.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-18T13:02:11.402Z — VERIFY — ok

    By: CODER

    Note: Verified: framework context health scaffold now exists and context commands pass; starter wiki placeholder wording was removed from the template and generated page; command/policy/runtime checks and Turbo workspace discovery pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T13:00:52.538Z, excerpt_hash=sha256:b67fabf02e5d3677b4d45da13d2c6bee9c98eca01937ad276df81251d5533a18

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181255-29XQ07-framework-context-health/.agentplane/tasks/202605181255-29XQ07/blueprint/resolved-snapshot.json
    - old_digest: de78b7b204695a3d308e704932a9177aa28d07f977ff9a53acb80bdceaf962a3
    - current_digest: de78b7b204695a3d308e704932a9177aa28d07f977ff9a53acb80bdceaf962a3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605181255-29XQ07

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: ap context check; ap context doctor; ap context wiki lint context/wiki; ap context wiki index context/wiki; bun run test:project -- agentplane packages/agentplane/src/commands/context/release-readiness.test.ts; bun run workflows:command-check; node .agentplane/policy/check-routing.mjs; ap doctor; bunx prettier --check touched context/template files; git diff --check; bun run dev:turbo:ls. ap context verify-task was attempted but is not applicable because this is a code.branch_pr task, not a context task.
      Impact: The framework checkout now matches the declared context command contract instead of failing health checks on missing context scaffolding; future context init pages avoid placeholder replacement language.
      Resolution: Checked in the minimal context scaffold and ignore rules, stabilized project name in the context manifest, and updated the context wiki index template wording.
id_source: "generated"
---
## Summary

Repair framework context health contract

Fix the current framework checkout context health gap so declared context commands have a valid scaffold or deterministic repair behavior, and verify the local context health route.

## Scope

- In scope: Fix the current framework checkout context health gap so declared context commands have a valid scaffold or deterministic repair behavior, and verify the local context health route.
- Out of scope: unrelated refactors not required for "Repair framework context health contract".

## Plan

1. Reproduce the current context health failure in the task worktree and inspect the context init/doctor contracts. 2. Implement the smallest fix so framework checkouts with declared context commands have deterministic context health: either complete the scaffold expected by doctor or adjust repair behavior without weakening initialized-project validation. 3. Remove/replace any fallback placeholder verification text in this task with concrete checks. 4. Verify with context health commands, focused context tests, policy routing, doctor, and a Turbo visibility smoke if relevant.

## Verify Steps

1. Run `ap context check`. Expected: exits 0 and prints `context doctor: ok` in this framework worktree.
2. Run `ap context doctor`. Expected: exits 0 and prints `context doctor: ok` with the checked-in context scaffold.
3. Run focused context init/wiki tests: `bun run test:project -- agentplane packages/agentplane/src/commands/context/release-readiness.test.ts`. Expected: context init/wiki health behavior remains covered.
4. Run command and policy/runtime checks: `bun run workflows:command-check`, `node .agentplane/policy/check-routing.mjs`, and `ap doctor`. Expected: command guidance, policy routing, and framework runtime health stay green.
5. Run formatting/syntax checks: `bunx prettier --check context/README.md context/wiki/AGENTS.md context/wiki/index.md context/capabilities/README.md .agentplane/context/agentplane.context.yaml .agentplane/context/policies/context.rules.md .agentplane/context/policies/wiki.rules.md .agentplane/context/policies/capability.rules.md .agentplane/context/policies/redaction.rules.yaml .agentplane/context/policies/sync.rules.yaml packages/agentplane/src/commands/context/init-wiki.ts` and `git diff --check`. Expected: touched text artifacts and TS diff are clean.
6. Run `bun run dev:turbo:ls`. Expected: local Turbo overlay still resolves the workspace graph.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-18T13:02:11.402Z — VERIFY — ok

By: CODER

Note: Verified: framework context health scaffold now exists and context commands pass; starter wiki placeholder wording was removed from the template and generated page; command/policy/runtime checks and Turbo workspace discovery pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T13:00:52.538Z, excerpt_hash=sha256:b67fabf02e5d3677b4d45da13d2c6bee9c98eca01937ad276df81251d5533a18

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181255-29XQ07-framework-context-health/.agentplane/tasks/202605181255-29XQ07/blueprint/resolved-snapshot.json
- old_digest: de78b7b204695a3d308e704932a9177aa28d07f977ff9a53acb80bdceaf962a3
- current_digest: de78b7b204695a3d308e704932a9177aa28d07f977ff9a53acb80bdceaf962a3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605181255-29XQ07

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands passed: ap context check; ap context doctor; ap context wiki lint context/wiki; ap context wiki index context/wiki; bun run test:project -- agentplane packages/agentplane/src/commands/context/release-readiness.test.ts; bun run workflows:command-check; node .agentplane/policy/check-routing.mjs; ap doctor; bunx prettier --check touched context/template files; git diff --check; bun run dev:turbo:ls. ap context verify-task was attempted but is not applicable because this is a code.branch_pr task, not a context task.
  Impact: The framework checkout now matches the declared context command contract instead of failing health checks on missing context scaffolding; future context init pages avoid placeholder replacement language.
  Resolution: Checked in the minimal context scaffold and ignore rules, stabilized project name in the context manifest, and updated the context wiki index template wording.
