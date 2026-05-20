---
id: "202605200819-3K686F"
title: "Simplify context init modes"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-20T08:19:14.245Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-20T08:26:26.434Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR pass: public context init profiles are reduced to basic and maximum-assimilation; legacy minimal/wiki/codebase/research profiles are rejected by the CLI spec; raw init behavior remains empty except context/raw/.gitkeep; generated CLI docs and repo context manifest match the new basic mode. Evidence: focused context init and release-readiness tests pass, typecheck passes, docs:cli:check passes, lint/format pass, context wiki lint/check pass, and routing check passes."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-20T08:26:26.434Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR pass: public context init profiles are reduced to basic and maximum-assimilation; legacy minimal/wiki/codebase/research profiles are rejected by the CLI spec; raw init behavior remains empty except context/raw/.gitkeep; generated CLI docs and repo context manifest match the new basic mode. Evidence: focused context init and release-readiness tests pass, typecheck passes, docs:cli:check passes, lint/format pass, context wiki lint/check pass, and routing check passes."
  evaluated_sha: "6dfe8f4189a8c122ce59e2981c50cc024e56e63b"
  blueprint_digest: "f800c0ccad374cdbb794fb4502fc3a154c74d3975791f5a66ec2a36f953ed014"
  evidence_refs:
    - ".agentplane/tasks/202605200819-3K686F/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200819-3K686F-context-modes/.agentplane/tasks/202605200819-3K686F/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Simplify context init modes to the approved basic versus maximum-assimilation model and update code, docs, and tests from the task worktree."
events:
  -
    type: "status"
    at: "2026-05-20T08:19:25.571Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Simplify context init modes to the approved basic versus maximum-assimilation model and update code, docs, and tests from the task worktree."
  -
    type: "verify"
    at: "2026-05-20T08:26:07.144Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/run-cli.core.context-init.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts; Result: pass; Evidence: 27 pass, 0 fail. Command: bun run typecheck; Result: pass after fresh framework bootstrap. Command: bun run docs:cli:check; Result: pass. Command: bunx eslint touched TS files; Result: pass. Command: bunx prettier --check touched files; Result: pass. Command: ap context wiki lint context/wiki; Result: pass, 2 pages. Command: ap context check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass."
  -
    type: "verify"
    at: "2026-05-20T08:26:26.434Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR pass: public context init profiles are reduced to basic and maximum-assimilation; legacy minimal/wiki/codebase/research profiles are rejected by the CLI spec; raw init behavior remains empty except context/raw/.gitkeep; generated CLI docs and repo context manifest match the new basic mode. Evidence: focused context init and release-readiness tests pass, typecheck passes, docs:cli:check passes, lint/format pass, context wiki lint/check pass, and routing check passes."
doc_version: 3
doc_updated_at: "2026-05-20T08:26:26.456Z"
doc_updated_by: "CODER"
description: "Replace the public context init mode model with basic and maximum-assimilation, remove legacy context profiles from user-facing contracts, and keep context/raw empty except .gitkeep for all modes."
sections:
  Summary: |-
    Simplify context init modes

    Replace the public context init mode model with basic and maximum-assimilation, remove legacy context profiles from user-facing contracts, and keep context/raw empty except .gitkeep for all modes.
  Scope: |-
    - In scope: Replace the public context init mode model with basic and maximum-assimilation, remove legacy context profiles from user-facing contracts, and keep context/raw empty except .gitkeep for all modes.
    - Out of scope: unrelated refactors not required for "Simplify context init modes".
  Plan: "1. Replace the public context init profile model with two modes: basic and maximum-assimilation. 2. Remove context legacy profiles minimal/wiki/codebase/research from parser, interactive UI, generated docs, and tests unless compatibility requires explicit migration handling. 3. Ensure context/raw is initialized only with .gitkeep in every mode. 4. Keep ordinary ingest on context.assimilation for basic and maximum ingest on context.maximum_assimilation. 5. Update focused tests and CLI docs, then run targeted context init/ingest tests, docs check, routing, and doctor."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-20T08:26:07.144Z — VERIFY — ok

    By: CODER

    Note: Command: bun test packages/agentplane/src/cli/run-cli.core.context-init.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts; Result: pass; Evidence: 27 pass, 0 fail. Command: bun run typecheck; Result: pass after fresh framework bootstrap. Command: bun run docs:cli:check; Result: pass. Command: bunx eslint touched TS files; Result: pass. Command: bunx prettier --check touched files; Result: pass. Command: ap context wiki lint context/wiki; Result: pass, 2 pages. Command: ap context check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T08:19:25.571Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200819-3K686F-context-modes/.agentplane/tasks/202605200819-3K686F/blueprint/resolved-snapshot.json
    - old_digest: f800c0ccad374cdbb794fb4502fc3a154c74d3975791f5a66ec2a36f953ed014
    - current_digest: f800c0ccad374cdbb794fb4502fc3a154c74d3975791f5a66ec2a36f953ed014
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605200819-3K686F

    ### 2026-05-20T08:26:26.434Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR pass: public context init profiles are reduced to basic and maximum-assimilation; legacy minimal/wiki/codebase/research profiles are rejected by the CLI spec; raw init behavior remains empty except context/raw/.gitkeep; generated CLI docs and repo context manifest match the new basic mode. Evidence: focused context init and release-readiness tests pass, typecheck passes, docs:cli:check passes, lint/format pass, context wiki lint/check pass, and routing check passes.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T08:26:07.167Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200819-3K686F-context-modes/.agentplane/tasks/202605200819-3K686F/blueprint/resolved-snapshot.json
    - old_digest: f800c0ccad374cdbb794fb4502fc3a154c74d3975791f5a66ec2a36f953ed014
    - current_digest: f800c0ccad374cdbb794fb4502fc3a154c74d3975791f5a66ec2a36f953ed014
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605200819-3K686F

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Simplify context init modes

Replace the public context init mode model with basic and maximum-assimilation, remove legacy context profiles from user-facing contracts, and keep context/raw empty except .gitkeep for all modes.

## Scope

- In scope: Replace the public context init mode model with basic and maximum-assimilation, remove legacy context profiles from user-facing contracts, and keep context/raw empty except .gitkeep for all modes.
- Out of scope: unrelated refactors not required for "Simplify context init modes".

## Plan

1. Replace the public context init profile model with two modes: basic and maximum-assimilation. 2. Remove context legacy profiles minimal/wiki/codebase/research from parser, interactive UI, generated docs, and tests unless compatibility requires explicit migration handling. 3. Ensure context/raw is initialized only with .gitkeep in every mode. 4. Keep ordinary ingest on context.assimilation for basic and maximum ingest on context.maximum_assimilation. 5. Update focused tests and CLI docs, then run targeted context init/ingest tests, docs check, routing, and doctor.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-20T08:26:07.144Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/run-cli.core.context-init.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts; Result: pass; Evidence: 27 pass, 0 fail. Command: bun run typecheck; Result: pass after fresh framework bootstrap. Command: bun run docs:cli:check; Result: pass. Command: bunx eslint touched TS files; Result: pass. Command: bunx prettier --check touched files; Result: pass. Command: ap context wiki lint context/wiki; Result: pass, 2 pages. Command: ap context check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T08:19:25.571Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200819-3K686F-context-modes/.agentplane/tasks/202605200819-3K686F/blueprint/resolved-snapshot.json
- old_digest: f800c0ccad374cdbb794fb4502fc3a154c74d3975791f5a66ec2a36f953ed014
- current_digest: f800c0ccad374cdbb794fb4502fc3a154c74d3975791f5a66ec2a36f953ed014
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605200819-3K686F

### 2026-05-20T08:26:26.434Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR pass: public context init profiles are reduced to basic and maximum-assimilation; legacy minimal/wiki/codebase/research profiles are rejected by the CLI spec; raw init behavior remains empty except context/raw/.gitkeep; generated CLI docs and repo context manifest match the new basic mode. Evidence: focused context init and release-readiness tests pass, typecheck passes, docs:cli:check passes, lint/format pass, context wiki lint/check pass, and routing check passes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T08:26:07.167Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200819-3K686F-context-modes/.agentplane/tasks/202605200819-3K686F/blueprint/resolved-snapshot.json
- old_digest: f800c0ccad374cdbb794fb4502fc3a154c74d3975791f5a66ec2a36f953ed014
- current_digest: f800c0ccad374cdbb794fb4502fc3a154c74d3975791f5a66ec2a36f953ed014
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605200819-3K686F

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
