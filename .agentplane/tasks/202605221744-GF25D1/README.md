---
id: "202605221744-GF25D1"
title: "Add agent task brief command"
result_summary: "Merged via PR #4060."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202605221726-N6CQ5A"
tags:
  - "cli"
  - "code"
  - "context"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Confirm task brief avoids remote network lookups unless an explicit remote flag is used."
  - "Confirm task brief includes route decision, Verify Steps, blueprint evidence, blockers, and next command for branch_pr tasks."
  - "Run targeted CLI tests for task brief text and JSON output."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:44:17.206Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T01:17:26.781Z"
  updated_by: "EVALUATOR"
  note: "Evaluator check: task brief satisfies approved local-first agent context scope. Evidence covers text and JSON output, no default gh lookup regression, generated CLI docs, typecheck, lint, format, and runtime bootstrap."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-23T01:17:26.781Z"
  updated_by: "EVALUATOR"
  note: "Evaluator check: task brief satisfies approved local-first agent context scope. Evidence covers text and JSON output, no default gh lookup regression, generated CLI docs, typecheck, lint, format, and runtime bootstrap."
  evaluated_sha: "f0c34065e9497a1254ee57de2b91d88d7885dc24"
  blueprint_digest: "c061dce418c548fb5171b42daa78994cc91cd9477bd70c6b467767e353ebc2b2"
  evidence_refs:
    - ".agentplane/tasks/202605221744-GF25D1/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221744-GF25D1-agent-task-brief/.agentplane/tasks/202605221744-GF25D1/blueprint/resolved-snapshot.json"
  findings:
    - "Reviewed implementation and test evidence. The default task brief path passes includeRemote=false into route decision; existing route decision callers keep the previous remote-aware default. The regression test seeds PR metadata plus a fake gh binary and confirms default task brief does not invoke gh. JSON output includes task, workflow, next_action, blockers, verify_steps, blueprint, snapshot, stop_rules, and remote.enabled=false."
commit:
  hash: "7c5c6157422927947c0a1aa94ca891402b73baca"
  message: "Merge pull request #4060 from basilisk-labs/task/202605221744-GF25D1/agent-task-brief"
comments:
  -
    author: "CODER"
    body: "Start: implementing the local-first task brief command with text and JSON output, reusing route, next-action, verify, and blueprint evidence surfaces."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4060 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-23T01:10:06.943Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the local-first task brief command with text and JSON output, reusing route, next-action, verify, and blueprint evidence surfaces."
  -
    type: "verify"
    at: "2026-05-23T01:17:05.405Z"
    author: "CODER"
    state: "ok"
    note: "Implemented task brief with local-first text and JSON output. It includes route/checkout/next action, blockers, Verify Steps, blueprint evidence, snapshot evidence, stop rules, and an explicit --remote flag for hosted truth. Verification passed."
  -
    type: "verify"
    at: "2026-05-23T01:17:26.781Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluator check: task brief satisfies approved local-first agent context scope. Evidence covers text and JSON output, no default gh lookup regression, generated CLI docs, typecheck, lint, format, and runtime bootstrap."
  -
    type: "status"
    at: "2026-05-23T01:32:49.295Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4060 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-23T01:32:49.303Z"
doc_updated_by: "INTEGRATOR"
description: "Add a compact task brief surface that merges route decision, checkout role, next action, blockers, Verify Steps, blueprint evidence, and stop rules into one agent-ready view."
sections:
  Summary: |-
    Add agent task brief command

    Add a compact task brief surface that merges route decision, checkout role, next action, blockers, Verify Steps, blueprint evidence, and stop rules into one agent-ready view.
  Scope: |-
    - In scope: Add a compact task brief surface that merges route decision, checkout role, next action, blockers, Verify Steps, blueprint evidence, and stop rules into one agent-ready view.
    - Out of scope: unrelated refactors not required for "Add agent task brief command".
  Plan: "Implement an agent-ready task brief command by reusing route-decision and Verify Steps/blueprint evidence surfaces. Keep default output compact and local-only; provide JSON output for agents and an explicit remote mode for hosted truth."
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts`. Expected: task brief text/JSON coverage and command registration coverage pass.
    2. Run `ap task brief 202605221744-GF25D1` and `ap task brief 202605221744-GF25D1 --json`. Expected: output includes route decision, Verify Steps, blueprint evidence, blockers, next command, and local-only remote note.
    3. Run `bun run docs:cli:check`. Expected: generated CLI reference is fresh for `task brief`.
    4. Run targeted lint and format checks for touched source/test files. Expected: no lint errors and formatting is unchanged.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T01:17:05.405Z — VERIFY — ok

    By: CODER

    Note: Implemented task brief with local-first text and JSON output. It includes route/checkout/next action, blockers, Verify Steps, blueprint evidence, snapshot evidence, stop rules, and an explicit --remote flag for hosted truth. Verification passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T01:10:06.943Z, excerpt_hash=sha256:f851459322eebe1a8bb3ad0b93556d66f3eb8cfa009f5efc5a0b43e2ac46968a

    Details:

    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts
    Result: pass
    Evidence: 2 files, 21 tests passed; task brief text/JSON and command registration covered.
    Scope: CLI behavior and command catalog.

    Command: ap task brief 202605221744-GF25D1; ap task brief 202605221744-GF25D1 --json
    Result: pass
    Evidence: output includes route decision, Verify Steps, blueprint evidence, snapshot evidence, next command, blockers array, and remote lookup skipped note.
    Scope: real task smoke.

    Command: bun run docs:cli:check
    Result: pass
    Evidence: docs/user/cli-reference.generated.mdx is up to date.
    Scope: generated CLI docs.

    Command: bun run lint:core -- packages/agentplane/src/commands/task/brief.command.ts packages/agentplane/src/commands/shared/route-decision.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/run-cli/command-loaders/task.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts
    Result: pass
    Evidence: no lint errors.
    Scope: touched source/test files.

    Command: bun run format:check -- packages/agentplane/src/commands/task/brief.command.ts packages/agentplane/src/commands/shared/route-decision.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/run-cli/command-loaders/task.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: touched source/test files.

    Command: bun run typecheck
    Result: pass
    Evidence: tsc -b completed with exit 0.
    Scope: TypeScript project references.

    Command: bun run framework:dev:bootstrap
    Result: pass
    Evidence: repo-local runtime ready after rebuild.
    Scope: runtime freshness for new CLI command.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221744-GF25D1-agent-task-brief/.agentplane/tasks/202605221744-GF25D1/blueprint/resolved-snapshot.json
    - old_digest: c061dce418c548fb5171b42daa78994cc91cd9477bd70c6b467767e353ebc2b2
    - current_digest: c061dce418c548fb5171b42daa78994cc91cd9477bd70c6b467767e353ebc2b2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221744-GF25D1

    ### 2026-05-23T01:17:26.781Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluator check: task brief satisfies approved local-first agent context scope. Evidence covers text and JSON output, no default gh lookup regression, generated CLI docs, typecheck, lint, format, and runtime bootstrap.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T01:17:05.431Z, excerpt_hash=sha256:f851459322eebe1a8bb3ad0b93556d66f3eb8cfa009f5efc5a0b43e2ac46968a

    Details:

    Reviewed implementation and test evidence. The default task brief path passes includeRemote=false into route decision; existing route decision callers keep the previous remote-aware default. The regression test seeds PR metadata plus a fake gh binary and confirms default task brief does not invoke gh. JSON output includes task, workflow, next_action, blockers, verify_steps, blueprint, snapshot, stop_rules, and remote.enabled=false.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221744-GF25D1-agent-task-brief/.agentplane/tasks/202605221744-GF25D1/blueprint/resolved-snapshot.json
    - old_digest: c061dce418c548fb5171b42daa78994cc91cd9477bd70c6b467767e353ebc2b2
    - current_digest: c061dce418c548fb5171b42daa78994cc91cd9477bd70c6b467767e353ebc2b2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221744-GF25D1

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add agent task brief command

Add a compact task brief surface that merges route decision, checkout role, next action, blockers, Verify Steps, blueprint evidence, and stop rules into one agent-ready view.

## Scope

- In scope: Add a compact task brief surface that merges route decision, checkout role, next action, blockers, Verify Steps, blueprint evidence, and stop rules into one agent-ready view.
- Out of scope: unrelated refactors not required for "Add agent task brief command".

## Plan

Implement an agent-ready task brief command by reusing route-decision and Verify Steps/blueprint evidence surfaces. Keep default output compact and local-only; provide JSON output for agents and an explicit remote mode for hosted truth.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts`. Expected: task brief text/JSON coverage and command registration coverage pass.
2. Run `ap task brief 202605221744-GF25D1` and `ap task brief 202605221744-GF25D1 --json`. Expected: output includes route decision, Verify Steps, blueprint evidence, blockers, next command, and local-only remote note.
3. Run `bun run docs:cli:check`. Expected: generated CLI reference is fresh for `task brief`.
4. Run targeted lint and format checks for touched source/test files. Expected: no lint errors and formatting is unchanged.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T01:17:05.405Z — VERIFY — ok

By: CODER

Note: Implemented task brief with local-first text and JSON output. It includes route/checkout/next action, blockers, Verify Steps, blueprint evidence, snapshot evidence, stop rules, and an explicit --remote flag for hosted truth. Verification passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T01:10:06.943Z, excerpt_hash=sha256:f851459322eebe1a8bb3ad0b93556d66f3eb8cfa009f5efc5a0b43e2ac46968a

Details:

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts
Result: pass
Evidence: 2 files, 21 tests passed; task brief text/JSON and command registration covered.
Scope: CLI behavior and command catalog.

Command: ap task brief 202605221744-GF25D1; ap task brief 202605221744-GF25D1 --json
Result: pass
Evidence: output includes route decision, Verify Steps, blueprint evidence, snapshot evidence, next command, blockers array, and remote lookup skipped note.
Scope: real task smoke.

Command: bun run docs:cli:check
Result: pass
Evidence: docs/user/cli-reference.generated.mdx is up to date.
Scope: generated CLI docs.

Command: bun run lint:core -- packages/agentplane/src/commands/task/brief.command.ts packages/agentplane/src/commands/shared/route-decision.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/run-cli/command-loaders/task.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts
Result: pass
Evidence: no lint errors.
Scope: touched source/test files.

Command: bun run format:check -- packages/agentplane/src/commands/task/brief.command.ts packages/agentplane/src/commands/shared/route-decision.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/run-cli/command-loaders/task.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts
Result: pass
Evidence: All matched files use Prettier code style.
Scope: touched source/test files.

Command: bun run typecheck
Result: pass
Evidence: tsc -b completed with exit 0.
Scope: TypeScript project references.

Command: bun run framework:dev:bootstrap
Result: pass
Evidence: repo-local runtime ready after rebuild.
Scope: runtime freshness for new CLI command.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221744-GF25D1-agent-task-brief/.agentplane/tasks/202605221744-GF25D1/blueprint/resolved-snapshot.json
- old_digest: c061dce418c548fb5171b42daa78994cc91cd9477bd70c6b467767e353ebc2b2
- current_digest: c061dce418c548fb5171b42daa78994cc91cd9477bd70c6b467767e353ebc2b2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221744-GF25D1

### 2026-05-23T01:17:26.781Z — VERIFY — ok

By: EVALUATOR

Note: Evaluator check: task brief satisfies approved local-first agent context scope. Evidence covers text and JSON output, no default gh lookup regression, generated CLI docs, typecheck, lint, format, and runtime bootstrap.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T01:17:05.431Z, excerpt_hash=sha256:f851459322eebe1a8bb3ad0b93556d66f3eb8cfa009f5efc5a0b43e2ac46968a

Details:

Reviewed implementation and test evidence. The default task brief path passes includeRemote=false into route decision; existing route decision callers keep the previous remote-aware default. The regression test seeds PR metadata plus a fake gh binary and confirms default task brief does not invoke gh. JSON output includes task, workflow, next_action, blockers, verify_steps, blueprint, snapshot, stop_rules, and remote.enabled=false.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221744-GF25D1-agent-task-brief/.agentplane/tasks/202605221744-GF25D1/blueprint/resolved-snapshot.json
- old_digest: c061dce418c548fb5171b42daa78994cc91cd9477bd70c6b467767e353ebc2b2
- current_digest: c061dce418c548fb5171b42daa78994cc91cd9477bd70c6b467767e353ebc2b2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221744-GF25D1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
