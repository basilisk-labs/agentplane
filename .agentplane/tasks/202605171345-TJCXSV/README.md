---
id: "202605171345-TJCXSV"
title: "Add first-success demo command"
result_summary: "Merged via PR #3839."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "onboarding"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.boot.test.ts --runInBand"
  - "bun test packages/agentplane/src/cli/run-cli.core.demo.test.ts --runInBand"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T13:46:44.165Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T17:23:58.275Z"
  updated_by: "CODER"
  note: "Demo command verified: focused tests, help/quickstart tests, docs freshness checks, policy routing, typecheck, lint, formatting, bootstrap, and temp-repo demo smoke all passed."
  attempts: 0
commit:
  hash: "c11413a9035fd6f9d77e50ac11ba0f5f085af0a6"
  message: "Merge pull request #3839 from basilisk-labs/task/202605171345-TJCXSV/first-success-demo"
comments:
  -
    author: "CODER"
    body: "Start: implement the first-success demo command in the task worktree, keeping it as a safe workflow shortcut over normal task artifacts and ACR evidence without user-source or network mutation."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3839 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-17T17:11:42.942Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the first-success demo command in the task worktree, keeping it as a safe workflow shortcut over normal task artifacts and ACR evidence without user-source or network mutation."
  -
    type: "verify"
    at: "2026-05-17T17:23:58.275Z"
    author: "CODER"
    state: "ok"
    note: "Demo command verified: focused tests, help/quickstart tests, docs freshness checks, policy routing, typecheck, lint, formatting, bootstrap, and temp-repo demo smoke all passed."
  -
    type: "status"
    at: "2026-05-17T18:37:38.229Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3839 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-17T18:37:38.236Z"
doc_updated_by: "INTEGRATOR"
description: "Add a safe local AgentPlane demo command that creates an inspectable first-success task artifact flow, including verification and ACR evidence, without touching user source files or requiring network/GitHub."
sections:
  Summary: |-
    Add first-success demo command

    Add a safe local AgentPlane demo command that creates an inspectable first-success task artifact flow, including verification and ACR evidence, without touching user source files or requiring network/GitHub.
  Scope: |-
    - In scope: Add a safe local AgentPlane demo command that creates an inspectable first-success task artifact flow, including verification and ACR evidence, without touching user source files or requiring network/GitHub.
    - Out of scope: unrelated refactors not required for "Add first-success demo command".
  Plan: "Implement a safe first-success demo surface without introducing a separate scenario runtime model. The command should either create or preview a disposable demo task in an explicit demo namespace/path, record the normal task lifecycle artifacts, generate or point to ACR evidence, and print the exact files to inspect. It must not touch user source files, require GitHub/network, or bypass policy gates; if the current workflow cannot safely mutate, it must stop with a clear reason and next command."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli/run-cli.core.demo.test.ts --runInBand`. Expected: demo command behavior is covered for success, no-network/no-user-source mutation, workflow-aware stop gates, and inspectable task/ACR output.
    2. Run `bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.boot.test.ts --runInBand`. Expected: quickstart/help surfaces point to the demo as the first-success path without exposing a new scenario runtime model.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
    4. Run the local demo command in a temp initialized git repository when the repo-local runtime is bootstrapped. Expected: it completes without network, writes only explicit demo AgentPlane artifacts, and prints the files to inspect.
    5. Review generated CLI docs/help snapshots. Expected: `agentplane demo` appears as a top-level first-success command and advanced lifecycle primitives remain discoverable but secondary.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T17:23:58.275Z — VERIFY — ok

    By: CODER

    Note: Demo command verified: focused tests, help/quickstart tests, docs freshness checks, policy routing, typecheck, lint, formatting, bootstrap, and temp-repo demo smoke all passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:11:42.942Z, excerpt_hash=sha256:ba812a097b894a83c1ff76c5159bf9085a9cc8a176e16a9d20c5fd1dd3e867ae

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171345-TJCXSV-first-success-demo/.agentplane/tasks/202605171345-TJCXSV/blueprint/resolved-snapshot.json
    - old_digest: fc7b51b5748e1a0f7b54f8ed9c588bd78c4332ba266b5934f7daa664cf096281
    - current_digest: fc7b51b5748e1a0f7b54f8ed9c588bd78c4332ba266b5934f7daa664cf096281
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171345-TJCXSV

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: ap work start 202605171345-TJCXSV --agent CODER --slug first-success-demo --worktree. Result: failed with E_GIT because local main is behind origin/main by 75 commits; base checkout also has unmerged context files.
      Impact: Implementation cannot safely start through the required branch_pr worktree route until base checkout is refreshed or a clean approved recovery path is chosen.
      Resolution: Do not bypass ap work start. Resolve or abort the unrelated base checkout conflict, fast-forward main, then rerun work start.

    - Observation: Command: bun test packages/agentplane/src/cli/run-cli.core.demo.test.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.boot.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --runInBand; Result: pass; Evidence: 26 tests passed. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: bun run docs:cli:check && bun run docs:bootstrap:check; Result: pass; Evidence: generated docs fresh. Command: bun run typecheck; Result: pass. Command: lint:core targeted invocation; Result: pass after local lint fix. Command: temp git repo init -> agentplane demo -> acr validate; Result: pass; Evidence: demo wrote README.md and acr.json, acr validate exited 0.
      Impact: The first-success path is now a real inspectable local artifact flow instead of a manual preview sequence.
      Resolution: Ship top-level agentplane demo as a safe first-success command and keep quickstart pointing at it.
id_source: "generated"
---
## Summary

Add first-success demo command

Add a safe local AgentPlane demo command that creates an inspectable first-success task artifact flow, including verification and ACR evidence, without touching user source files or requiring network/GitHub.

## Scope

- In scope: Add a safe local AgentPlane demo command that creates an inspectable first-success task artifact flow, including verification and ACR evidence, without touching user source files or requiring network/GitHub.
- Out of scope: unrelated refactors not required for "Add first-success demo command".

## Plan

Implement a safe first-success demo surface without introducing a separate scenario runtime model. The command should either create or preview a disposable demo task in an explicit demo namespace/path, record the normal task lifecycle artifacts, generate or point to ACR evidence, and print the exact files to inspect. It must not touch user source files, require GitHub/network, or bypass policy gates; if the current workflow cannot safely mutate, it must stop with a clear reason and next command.

## Verify Steps

1. Run `bun test packages/agentplane/src/cli/run-cli.core.demo.test.ts --runInBand`. Expected: demo command behavior is covered for success, no-network/no-user-source mutation, workflow-aware stop gates, and inspectable task/ACR output.
2. Run `bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.boot.test.ts --runInBand`. Expected: quickstart/help surfaces point to the demo as the first-success path without exposing a new scenario runtime model.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
4. Run the local demo command in a temp initialized git repository when the repo-local runtime is bootstrapped. Expected: it completes without network, writes only explicit demo AgentPlane artifacts, and prints the files to inspect.
5. Review generated CLI docs/help snapshots. Expected: `agentplane demo` appears as a top-level first-success command and advanced lifecycle primitives remain discoverable but secondary.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T17:23:58.275Z — VERIFY — ok

By: CODER

Note: Demo command verified: focused tests, help/quickstart tests, docs freshness checks, policy routing, typecheck, lint, formatting, bootstrap, and temp-repo demo smoke all passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:11:42.942Z, excerpt_hash=sha256:ba812a097b894a83c1ff76c5159bf9085a9cc8a176e16a9d20c5fd1dd3e867ae

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171345-TJCXSV-first-success-demo/.agentplane/tasks/202605171345-TJCXSV/blueprint/resolved-snapshot.json
- old_digest: fc7b51b5748e1a0f7b54f8ed9c588bd78c4332ba266b5934f7daa664cf096281
- current_digest: fc7b51b5748e1a0f7b54f8ed9c588bd78c4332ba266b5934f7daa664cf096281
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171345-TJCXSV

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: ap work start 202605171345-TJCXSV --agent CODER --slug first-success-demo --worktree. Result: failed with E_GIT because local main is behind origin/main by 75 commits; base checkout also has unmerged context files.
  Impact: Implementation cannot safely start through the required branch_pr worktree route until base checkout is refreshed or a clean approved recovery path is chosen.
  Resolution: Do not bypass ap work start. Resolve or abort the unrelated base checkout conflict, fast-forward main, then rerun work start.

- Observation: Command: bun test packages/agentplane/src/cli/run-cli.core.demo.test.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.boot.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --runInBand; Result: pass; Evidence: 26 tests passed. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: bun run docs:cli:check && bun run docs:bootstrap:check; Result: pass; Evidence: generated docs fresh. Command: bun run typecheck; Result: pass. Command: lint:core targeted invocation; Result: pass after local lint fix. Command: temp git repo init -> agentplane demo -> acr validate; Result: pass; Evidence: demo wrote README.md and acr.json, acr validate exited 0.
  Impact: The first-success path is now a real inspectable local artifact flow instead of a manual preview sequence.
  Resolution: Ship top-level agentplane demo as a safe first-success command and keep quickstart pointing at it.
