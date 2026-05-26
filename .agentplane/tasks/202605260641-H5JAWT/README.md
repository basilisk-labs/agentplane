---
id: "202605260641-H5JAWT"
title: "Block unstaged generated task artifacts in pre-commit"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "hooks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-26T06:41:37.034Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-26T06:48:10.945Z"
  updated_by: "CODER"
  note: "Command: bun run test:precommit. Result: pass, 17 files and 145 tests passed. Scope: pre-commit hook/runtime regression suite, including generated task artifact guard and commit wrapper allow-tasks behavior. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Scope: AgentPlane routing policy."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-26T06:48:51.605Z"
  updated_by: "EVALUATOR"
  note: "Pre-commit now blocks unstaged generated active task artifacts while preserving the agentplane commit --allow-tasks path."
  evaluated_sha: "217cee043ccf1ada34247200da4d290f4c7b934b"
  blueprint_digest: "b114644e8a655cea0db073d39a69e41b909b75e4829f35abf503028b2f025148"
  evidence_refs:
    - ".agentplane/tasks/202605260641-H5JAWT/README.md"
    - ".agentplane/tasks/202605260641-H5JAWT/quality/20260526-064851605-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605260641-H5JAWT/quality/20260526-064851605-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605260641-H5JAWT/quality/20260526-064851605-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605260641-H5JAWT/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/hooks/run.pre-commit.ts"
    - "packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts"
    - "bun run test:precommit"
    - "node .agentplane/policy/check-routing.mjs"
  findings:
    - "Generated blueprint and evaluator artifacts are detected from git changed paths and rejected when absent from the index."
    - "Focused hook and commit-wrapper tests cover raw pre-commit blocking, staged artifact acceptance, and allow-tasks auto-staging."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement pre-commit protection so generated active task artifacts cannot be left untracked or unstaged during task commits."
events:
  -
    type: "status"
    at: "2026-05-26T06:41:51.119Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement pre-commit protection so generated active task artifacts cannot be left untracked or unstaged during task commits."
  -
    type: "verify"
    at: "2026-05-26T06:48:10.945Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run test:precommit. Result: pass, 17 files and 145 tests passed. Scope: pre-commit hook/runtime regression suite, including generated task artifact guard and commit wrapper allow-tasks behavior. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Scope: AgentPlane routing policy."
doc_version: 3
doc_updated_at: "2026-05-26T06:48:10.960Z"
doc_updated_by: "CODER"
description: "Add a pre-commit guard that prevents commits when generated active task artifacts such as blueprint snapshots or evaluator quality reports remain untracked or unstaged."
sections:
  Summary: |-
    Block unstaged generated task artifacts in pre-commit

    Add a pre-commit guard that prevents commits when generated active task artifacts such as blueprint snapshots or evaluator quality reports remain untracked or unstaged.
  Scope: |-
    - In scope: Add a pre-commit guard that prevents commits when generated active task artifacts such as blueprint snapshots or evaluator quality reports remain untracked or unstaged.
    - Out of scope: unrelated refactors not required for "Block unstaged generated task artifacts in pre-commit".
  Plan: |-
    1. Inspect existing pre-commit/commit guard flow and task artifact path helpers.
    2. Add a focused pre-commit check for generated active task artifacts left untracked or unstaged.
    3. Cover raw git commit blocking and agentplane commit --allow-tasks compatibility with tests.
    4. Run targeted tests plus routing validation.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.refresh.test.ts`. Expected: raw pre-commit blocks unstaged generated task artifacts and the `agentplane commit --allow-tasks` path still stages task artifacts.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
    3. Run `ap task verify-show 202605260641-H5JAWT`. Expected: blueprint evidence is current and task verification contract is readable.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-26T06:48:10.945Z — VERIFY — ok

    By: CODER

    Note: Command: bun run test:precommit. Result: pass, 17 files and 145 tests passed. Scope: pre-commit hook/runtime regression suite, including generated task artifact guard and commit wrapper allow-tasks behavior. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Scope: AgentPlane routing policy.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-26T06:41:51.119Z, excerpt_hash=sha256:b28d50d1ba5d703b099532b39eed03469608dee56eab15b9b6cb8710da2e647c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605260641-H5JAWT-generated-artifact-precommit/.agentplane/tasks/202605260641-H5JAWT/blueprint/resolved-snapshot.json
    - old_digest: b114644e8a655cea0db073d39a69e41b909b75e4829f35abf503028b2f025148
    - current_digest: b114644e8a655cea0db073d39a69e41b909b75e4829f35abf503028b2f025148
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605260641-H5JAWT

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Block unstaged generated task artifacts in pre-commit

Add a pre-commit guard that prevents commits when generated active task artifacts such as blueprint snapshots or evaluator quality reports remain untracked or unstaged.

## Scope

- In scope: Add a pre-commit guard that prevents commits when generated active task artifacts such as blueprint snapshots or evaluator quality reports remain untracked or unstaged.
- Out of scope: unrelated refactors not required for "Block unstaged generated task artifacts in pre-commit".

## Plan

1. Inspect existing pre-commit/commit guard flow and task artifact path helpers.
2. Add a focused pre-commit check for generated active task artifacts left untracked or unstaged.
3. Cover raw git commit blocking and agentplane commit --allow-tasks compatibility with tests.
4. Run targeted tests plus routing validation.

## Verify Steps

1. Run `bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.refresh.test.ts`. Expected: raw pre-commit blocks unstaged generated task artifacts and the `agentplane commit --allow-tasks` path still stages task artifacts.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
3. Run `ap task verify-show 202605260641-H5JAWT`. Expected: blueprint evidence is current and task verification contract is readable.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-26T06:48:10.945Z — VERIFY — ok

By: CODER

Note: Command: bun run test:precommit. Result: pass, 17 files and 145 tests passed. Scope: pre-commit hook/runtime regression suite, including generated task artifact guard and commit wrapper allow-tasks behavior. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Scope: AgentPlane routing policy.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-26T06:41:51.119Z, excerpt_hash=sha256:b28d50d1ba5d703b099532b39eed03469608dee56eab15b9b6cb8710da2e647c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605260641-H5JAWT-generated-artifact-precommit/.agentplane/tasks/202605260641-H5JAWT/blueprint/resolved-snapshot.json
- old_digest: b114644e8a655cea0db073d39a69e41b909b75e4829f35abf503028b2f025148
- current_digest: b114644e8a655cea0db073d39a69e41b909b75e4829f35abf503028b2f025148
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605260641-H5JAWT

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
