---
id: "202605190830-W0ZCVH"
title: "Make context init interactive"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "init"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T08:30:44.624Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T08:42:47.740Z"
  updated_by: "EVALUATOR"
  note: "Re-verified current PR head 4118cece7b9f after commit amend and PR publication. Focused checks remain the same passing set recorded in the task details."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-19T08:42:47.740Z"
  updated_by: "EVALUATOR"
  note: "Re-verified current PR head 4118cece7b9f after commit amend and PR publication. Focused checks remain the same passing set recorded in the task details."
  evaluated_sha: "5733e97e4deb3a875a562b3639b77bab5a9d264c"
  blueprint_digest: "e3cdb957c1398f7b590b5f0ac62ac696831e85452f5b2c03b465645d6d4b9c5f"
  evidence_refs:
    - ".agentplane/tasks/202605190830-W0ZCVH/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190830-W0ZCVH-interactive-context-init/.agentplane/tasks/202605190830-W0ZCVH/blueprint/resolved-snapshot.json"
  findings:
    - "Command: git rev-parse --short=12 HEAD\nResult: pass\nEvidence: 4118cece7b9f\nScope: current task PR head used for verification metadata refresh"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved context init interactive mode selection in the task worktree, preserving explicit profile flags and non-interactive defaults."
events:
  -
    type: "status"
    at: "2026-05-19T08:32:07.419Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved context init interactive mode selection in the task worktree, preserving explicit profile flags and non-interactive defaults."
  -
    type: "verify"
    at: "2026-05-19T08:39:57.528Z"
    author: "CODER"
    state: "ok"
    note: "Changed context init so interactive terminals prompt for one of minimal, adaptive, or maximum-assimilation when --profile is omitted, while explicit profiles and non-interactive runs keep deterministic behavior."
  -
    type: "verify"
    at: "2026-05-19T08:41:29.423Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality gate passed for the focused context init change: targeted CLI/context tests, changed-file lint, and policy routing check all passed before commit 580810a78."
  -
    type: "verify"
    at: "2026-05-19T08:42:47.740Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Re-verified current PR head 4118cece7b9f after commit amend and PR publication. Focused checks remain the same passing set recorded in the task details."
doc_version: 3
doc_updated_at: "2026-05-19T08:42:47.793Z"
doc_updated_by: "CODER"
description: "Add a TTY dialog for user-run agentplane context init with basic mode information and a three-mode selection: minimal, adaptive, maximum-assimilation. Preserve explicit profile flags and non-interactive defaults."
sections:
  Summary: |-
    Make context init interactive

    Add a TTY dialog for user-run agentplane context init with basic mode information and a three-mode selection: minimal, adaptive, maximum-assimilation. Preserve explicit profile flags and non-interactive defaults.
  Scope: |-
    - In scope: Add a TTY dialog for user-run agentplane context init with basic mode information and a three-mode selection: minimal, adaptive, maximum-assimilation. Preserve explicit profile flags and non-interactive defaults.
    - Out of scope: unrelated refactors not required for "Make context init interactive".
  Plan: |-
    1. Inspect the current context init command parser and execution path.
    2. Add an interactive TTY prompt before context workspace creation when the user did not pass --profile.
    3. Limit the user-facing mode choices to minimal, adaptive, and maximum-assimilation, with concise mode descriptions.
    4. Preserve explicit --profile behavior and non-TTY/automation defaults.
    5. Add focused CLI tests for interactive selection, explicit profile bypass, and non-interactive default behavior.
    6. Run targeted tests plus policy routing validation.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli/run-cli.core.init.test.ts --test-name-pattern \"context init\"`. Expected: context init CLI behavior remains green, including interactive mode selection and non-interactive defaults.
    2. Run `bun test packages/agentplane/src/commands/context/release-readiness.test.ts --test-name-pattern \"context init|maximum-assimilation\"`. Expected: context workspace generation still matches release-readiness contracts.
    3. Run `bunx eslint packages/agentplane/src/commands/context/context.spec.ts packages/agentplane/src/commands/context/context.command.ts packages/agentplane/src/cli/run-cli.core.init.test.ts`. Expected: changed files pass lint.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T08:39:57.528Z — VERIFY — ok

    By: CODER

    Note: Changed context init so interactive terminals prompt for one of minimal, adaptive, or maximum-assimilation when --profile is omitted, while explicit profiles and non-interactive runs keep deterministic behavior.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T08:39:25.138Z, excerpt_hash=sha256:ed229a096098871a5727abbc25227ab9667ceac250907cd40ff218298c4c8a8f

    Details:

    Command: bun test packages/agentplane/src/cli/run-cli.core.init.test.ts --test-name-pattern "context init"
    Result: pass
    Evidence: 7 pass, 0 fail, 43 expect calls
    Scope: context init CLI behavior including interactive selection, explicit profile bypass, non-TTY default, bootstrap/idempotency/error paths

    Command: bun test packages/agentplane/src/commands/context/release-readiness.test.ts --test-name-pattern "context init|maximum-assimilation"
    Result: pass
    Evidence: 2 pass, 0 fail, 17 expect calls
    Scope: context workspace generation contracts

    Command: bunx eslint packages/agentplane/src/commands/context/context.spec.ts packages/agentplane/src/commands/context/context.command.ts packages/agentplane/src/cli/run-cli.core.init.test.ts
    Result: pass
    Evidence: exit 0
    Scope: changed source/test files

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK
    Scope: policy routing contract

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190830-W0ZCVH-interactive-context-init/.agentplane/tasks/202605190830-W0ZCVH/blueprint/resolved-snapshot.json
    - old_digest: e3cdb957c1398f7b590b5f0ac62ac696831e85452f5b2c03b465645d6d4b9c5f
    - current_digest: e3cdb957c1398f7b590b5f0ac62ac696831e85452f5b2c03b465645d6d4b9c5f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605190830-W0ZCVH

    ### 2026-05-19T08:41:29.423Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality gate passed for the focused context init change: targeted CLI/context tests, changed-file lint, and policy routing check all passed before commit 580810a78.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T08:39:57.572Z, excerpt_hash=sha256:ed229a096098871a5727abbc25227ab9667ceac250907cd40ff218298c4c8a8f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190830-W0ZCVH-interactive-context-init/.agentplane/tasks/202605190830-W0ZCVH/blueprint/resolved-snapshot.json
    - old_digest: e3cdb957c1398f7b590b5f0ac62ac696831e85452f5b2c03b465645d6d4b9c5f
    - current_digest: e3cdb957c1398f7b590b5f0ac62ac696831e85452f5b2c03b465645d6d4b9c5f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605190830-W0ZCVH

    ### 2026-05-19T08:42:47.740Z — VERIFY — ok

    By: EVALUATOR

    Note: Re-verified current PR head 4118cece7b9f after commit amend and PR publication. Focused checks remain the same passing set recorded in the task details.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T08:41:29.528Z, excerpt_hash=sha256:ed229a096098871a5727abbc25227ab9667ceac250907cd40ff218298c4c8a8f

    Details:

    Command: git rev-parse --short=12 HEAD
    Result: pass
    Evidence: 4118cece7b9f
    Scope: current task PR head used for verification metadata refresh

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190830-W0ZCVH-interactive-context-init/.agentplane/tasks/202605190830-W0ZCVH/blueprint/resolved-snapshot.json
    - old_digest: e3cdb957c1398f7b590b5f0ac62ac696831e85452f5b2c03b465645d6d4b9c5f
    - current_digest: e3cdb957c1398f7b590b5f0ac62ac696831e85452f5b2c03b465645d6d4b9c5f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605190830-W0ZCVH

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make context init interactive

Add a TTY dialog for user-run agentplane context init with basic mode information and a three-mode selection: minimal, adaptive, maximum-assimilation. Preserve explicit profile flags and non-interactive defaults.

## Scope

- In scope: Add a TTY dialog for user-run agentplane context init with basic mode information and a three-mode selection: minimal, adaptive, maximum-assimilation. Preserve explicit profile flags and non-interactive defaults.
- Out of scope: unrelated refactors not required for "Make context init interactive".

## Plan

1. Inspect the current context init command parser and execution path.
2. Add an interactive TTY prompt before context workspace creation when the user did not pass --profile.
3. Limit the user-facing mode choices to minimal, adaptive, and maximum-assimilation, with concise mode descriptions.
4. Preserve explicit --profile behavior and non-TTY/automation defaults.
5. Add focused CLI tests for interactive selection, explicit profile bypass, and non-interactive default behavior.
6. Run targeted tests plus policy routing validation.

## Verify Steps

1. Run `bun test packages/agentplane/src/cli/run-cli.core.init.test.ts --test-name-pattern \"context init\"`. Expected: context init CLI behavior remains green, including interactive mode selection and non-interactive defaults.
2. Run `bun test packages/agentplane/src/commands/context/release-readiness.test.ts --test-name-pattern \"context init|maximum-assimilation\"`. Expected: context workspace generation still matches release-readiness contracts.
3. Run `bunx eslint packages/agentplane/src/commands/context/context.spec.ts packages/agentplane/src/commands/context/context.command.ts packages/agentplane/src/cli/run-cli.core.init.test.ts`. Expected: changed files pass lint.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T08:39:57.528Z — VERIFY — ok

By: CODER

Note: Changed context init so interactive terminals prompt for one of minimal, adaptive, or maximum-assimilation when --profile is omitted, while explicit profiles and non-interactive runs keep deterministic behavior.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T08:39:25.138Z, excerpt_hash=sha256:ed229a096098871a5727abbc25227ab9667ceac250907cd40ff218298c4c8a8f

Details:

Command: bun test packages/agentplane/src/cli/run-cli.core.init.test.ts --test-name-pattern "context init"
Result: pass
Evidence: 7 pass, 0 fail, 43 expect calls
Scope: context init CLI behavior including interactive selection, explicit profile bypass, non-TTY default, bootstrap/idempotency/error paths

Command: bun test packages/agentplane/src/commands/context/release-readiness.test.ts --test-name-pattern "context init|maximum-assimilation"
Result: pass
Evidence: 2 pass, 0 fail, 17 expect calls
Scope: context workspace generation contracts

Command: bunx eslint packages/agentplane/src/commands/context/context.spec.ts packages/agentplane/src/commands/context/context.command.ts packages/agentplane/src/cli/run-cli.core.init.test.ts
Result: pass
Evidence: exit 0
Scope: changed source/test files

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK
Scope: policy routing contract

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190830-W0ZCVH-interactive-context-init/.agentplane/tasks/202605190830-W0ZCVH/blueprint/resolved-snapshot.json
- old_digest: e3cdb957c1398f7b590b5f0ac62ac696831e85452f5b2c03b465645d6d4b9c5f
- current_digest: e3cdb957c1398f7b590b5f0ac62ac696831e85452f5b2c03b465645d6d4b9c5f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605190830-W0ZCVH

### 2026-05-19T08:41:29.423Z — VERIFY — ok

By: EVALUATOR

Note: Quality gate passed for the focused context init change: targeted CLI/context tests, changed-file lint, and policy routing check all passed before commit 580810a78.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T08:39:57.572Z, excerpt_hash=sha256:ed229a096098871a5727abbc25227ab9667ceac250907cd40ff218298c4c8a8f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190830-W0ZCVH-interactive-context-init/.agentplane/tasks/202605190830-W0ZCVH/blueprint/resolved-snapshot.json
- old_digest: e3cdb957c1398f7b590b5f0ac62ac696831e85452f5b2c03b465645d6d4b9c5f
- current_digest: e3cdb957c1398f7b590b5f0ac62ac696831e85452f5b2c03b465645d6d4b9c5f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605190830-W0ZCVH

### 2026-05-19T08:42:47.740Z — VERIFY — ok

By: EVALUATOR

Note: Re-verified current PR head 4118cece7b9f after commit amend and PR publication. Focused checks remain the same passing set recorded in the task details.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T08:41:29.528Z, excerpt_hash=sha256:ed229a096098871a5727abbc25227ab9667ceac250907cd40ff218298c4c8a8f

Details:

Command: git rev-parse --short=12 HEAD
Result: pass
Evidence: 4118cece7b9f
Scope: current task PR head used for verification metadata refresh

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190830-W0ZCVH-interactive-context-init/.agentplane/tasks/202605190830-W0ZCVH/blueprint/resolved-snapshot.json
- old_digest: e3cdb957c1398f7b590b5f0ac62ac696831e85452f5b2c03b465645d6d4b9c5f
- current_digest: e3cdb957c1398f7b590b5f0ac62ac696831e85452f5b2c03b465645d6d4b9c5f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605190830-W0ZCVH

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
