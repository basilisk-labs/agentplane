---
id: "202605280743-P4J3DQ"
title: "Gate context policy during upgrade"
status: "DOING"
priority: "med"
owner: "UPGRADER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T07:43:50.592Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T08:08:04.016Z"
  updated_by: "UPGRADER"
  note: "Verified after replacing fallback Verify Steps with task-specific checks: context-policy upgrade regression passed 2/2; baseline upgrade suite passed 14/14; core run-process buffered execution passed 11/11; critical CLI suite passed all 5 chunks; agents/docs/typecheck/routing checks passed; framework bootstrap, ap config show, ap quickstart, task brief, next-action, and doctor passed."
  attempts: 0
commit: null
comments:
  -
    author: "UPGRADER"
    body: "Start: implementing verified upgrade gating for context policy installation and preserving regression evidence."
events:
  -
    type: "status"
    at: "2026-05-28T07:43:53.013Z"
    author: "UPGRADER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing verified upgrade gating for context policy installation and preserving regression evidence."
  -
    type: "verify"
    at: "2026-05-28T07:44:38.448Z"
    author: "UPGRADER"
    state: "ok"
    note: "Verified upgrade gating for context policy: typecheck passed; full upgrade suite passed; combined targeted vitest passed; policy routing and builtin asset freshness passed; ap config show and ap quickstart passed after repo-local rebuild."
  -
    type: "verify"
    at: "2026-05-28T08:08:04.016Z"
    author: "UPGRADER"
    state: "ok"
    note: "Verified after replacing fallback Verify Steps with task-specific checks: context-policy upgrade regression passed 2/2; baseline upgrade suite passed 14/14; core run-process buffered execution passed 11/11; critical CLI suite passed all 5 chunks; agents/docs/typecheck/routing checks passed; framework bootstrap, ap config show, ap quickstart, task brief, next-action, and doctor passed."
doc_version: 3
doc_updated_at: "2026-05-28T08:08:04.034Z"
doc_updated_by: "UPGRADER"
description: "Fix upgrade so context.must.md is installed only for repositories with initialized context layer, and add regression coverage."
sections:
  Summary: |-
    Gate context policy during upgrade

    Fix upgrade so context.must.md is installed only for repositories with initialized context layer, and add regression coverage.
  Scope: |-
    - In scope: Fix upgrade so context.must.md is installed only for repositories with initialized context layer, and add regression coverage.
    - Out of scope: unrelated refactors not required for "Gate context policy during upgrade".
  Plan: |-
    Plan:
    1. Keep packaged AGENTS/CLAUDE gateway context-free by default.
    2. Make context init own context.must.md installation and gateway overlay.
    3. Make upgrade install/retain context policy only when .agentplane/context/agentplane.context.yaml exists.
    4. Cover both non-context and initialized-context upgrade paths with regression tests.
    5. Verify typecheck, targeted vitest suites, routing check, generated assets check, and CLI quickstart.
  Verify Steps: |-
    1. Non-context upgrade path: run `bunx vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.upgrade.context-policy.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000 --hookTimeout 60000`. Expected: upgrade of a repository without `.agentplane/context/agentplane.context.yaml` does not install `.agentplane/policy/context.must.md` and does not add context load rules to the gateway.
    2. Initialized-context upgrade path: run the same regression test file and inspect the context-enabled case. Expected: upgrade preserves or installs `.agentplane/policy/context.must.md` only when the repository has an initialized context layer, and the gateway load rule remains present only for that case.
    3. Existing upgrade behavior: run `bunx vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000 --hookTimeout 60000`. Expected: baseline upgrade scenarios still pass, including managed-file replacement and preserved sanctioned local state.
    4. Generated/policy surfaces: run `bun run agents:check`, `bun run docs:bootstrap:check`, `bun run docs:cli:check`, `bun run typecheck`, and `node .agentplane/policy/check-routing.mjs`. Expected: agent templates, bootstrap guidance, CLI reference, TypeScript, and routing policy remain aligned with the source state.
    5. Critical CLI and runtime smoke: run `bun run test:critical`, `bunx vitest --config vitest.workspace.ts run --project core packages/core/src/process/run-process.test.ts`, `bun run framework:dev:bootstrap`, `ap config show`, `ap quickstart`, `ap task brief 202605280743-P4J3DQ`, and `ap task next-action 202605280743-P4J3DQ --explain`. Expected: critical CLI paths pass, buffered process execution works under Bun, repo-local runtime starts, route oracle points to the task worktree, and the next command remains `agentplane pr update 202605280743-P4J3DQ` unless PR artifacts were already refreshed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T07:44:38.448Z — VERIFY — ok

    By: UPGRADER

    Note: Verified upgrade gating for context policy: typecheck passed; full upgrade suite passed; combined targeted vitest passed; policy routing and builtin asset freshness passed; ap config show and ap quickstart passed after repo-local rebuild.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T07:43:53.013Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605280743-P4J3DQ/blueprint/resolved-snapshot.json
    - old_digest: 5a757ffdef075e49edafea4e2924f0ed2d08ea61f3069df5e04f329f052ebe2c
    - current_digest: 5a757ffdef075e49edafea4e2924f0ed2d08ea61f3069df5e04f329f052ebe2c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605280743-P4J3DQ

    ### 2026-05-28T08:08:04.016Z — VERIFY — ok

    By: UPGRADER

    Note: Verified after replacing fallback Verify Steps with task-specific checks: context-policy upgrade regression passed 2/2; baseline upgrade suite passed 14/14; core run-process buffered execution passed 11/11; critical CLI suite passed all 5 chunks; agents/docs/typecheck/routing checks passed; framework bootstrap, ap config show, ap quickstart, task brief, next-action, and doctor passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T08:06:50.316Z, excerpt_hash=sha256:69684137fa4e3b1a4a737bb6d7c145b0c92644a611736c86989614668da1e3e5

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605280743-P4J3DQ/blueprint/resolved-snapshot.json
    - old_digest: 5a757ffdef075e49edafea4e2924f0ed2d08ea61f3069df5e04f329f052ebe2c
    - current_digest: 5a757ffdef075e49edafea4e2924f0ed2d08ea61f3069df5e04f329f052ebe2c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605280743-P4J3DQ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Gate context policy during upgrade

Fix upgrade so context.must.md is installed only for repositories with initialized context layer, and add regression coverage.

## Scope

- In scope: Fix upgrade so context.must.md is installed only for repositories with initialized context layer, and add regression coverage.
- Out of scope: unrelated refactors not required for "Gate context policy during upgrade".

## Plan

Plan:
1. Keep packaged AGENTS/CLAUDE gateway context-free by default.
2. Make context init own context.must.md installation and gateway overlay.
3. Make upgrade install/retain context policy only when .agentplane/context/agentplane.context.yaml exists.
4. Cover both non-context and initialized-context upgrade paths with regression tests.
5. Verify typecheck, targeted vitest suites, routing check, generated assets check, and CLI quickstart.

## Verify Steps

1. Non-context upgrade path: run `bunx vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.upgrade.context-policy.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000 --hookTimeout 60000`. Expected: upgrade of a repository without `.agentplane/context/agentplane.context.yaml` does not install `.agentplane/policy/context.must.md` and does not add context load rules to the gateway.
2. Initialized-context upgrade path: run the same regression test file and inspect the context-enabled case. Expected: upgrade preserves or installs `.agentplane/policy/context.must.md` only when the repository has an initialized context layer, and the gateway load rule remains present only for that case.
3. Existing upgrade behavior: run `bunx vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000 --hookTimeout 60000`. Expected: baseline upgrade scenarios still pass, including managed-file replacement and preserved sanctioned local state.
4. Generated/policy surfaces: run `bun run agents:check`, `bun run docs:bootstrap:check`, `bun run docs:cli:check`, `bun run typecheck`, and `node .agentplane/policy/check-routing.mjs`. Expected: agent templates, bootstrap guidance, CLI reference, TypeScript, and routing policy remain aligned with the source state.
5. Critical CLI and runtime smoke: run `bun run test:critical`, `bunx vitest --config vitest.workspace.ts run --project core packages/core/src/process/run-process.test.ts`, `bun run framework:dev:bootstrap`, `ap config show`, `ap quickstart`, `ap task brief 202605280743-P4J3DQ`, and `ap task next-action 202605280743-P4J3DQ --explain`. Expected: critical CLI paths pass, buffered process execution works under Bun, repo-local runtime starts, route oracle points to the task worktree, and the next command remains `agentplane pr update 202605280743-P4J3DQ` unless PR artifacts were already refreshed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T07:44:38.448Z — VERIFY — ok

By: UPGRADER

Note: Verified upgrade gating for context policy: typecheck passed; full upgrade suite passed; combined targeted vitest passed; policy routing and builtin asset freshness passed; ap config show and ap quickstart passed after repo-local rebuild.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T07:43:53.013Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605280743-P4J3DQ/blueprint/resolved-snapshot.json
- old_digest: 5a757ffdef075e49edafea4e2924f0ed2d08ea61f3069df5e04f329f052ebe2c
- current_digest: 5a757ffdef075e49edafea4e2924f0ed2d08ea61f3069df5e04f329f052ebe2c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605280743-P4J3DQ

### 2026-05-28T08:08:04.016Z — VERIFY — ok

By: UPGRADER

Note: Verified after replacing fallback Verify Steps with task-specific checks: context-policy upgrade regression passed 2/2; baseline upgrade suite passed 14/14; core run-process buffered execution passed 11/11; critical CLI suite passed all 5 chunks; agents/docs/typecheck/routing checks passed; framework bootstrap, ap config show, ap quickstart, task brief, next-action, and doctor passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T08:06:50.316Z, excerpt_hash=sha256:69684137fa4e3b1a4a737bb6d7c145b0c92644a611736c86989614668da1e3e5

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605280743-P4J3DQ/blueprint/resolved-snapshot.json
- old_digest: 5a757ffdef075e49edafea4e2924f0ed2d08ea61f3069df5e04f329f052ebe2c
- current_digest: 5a757ffdef075e49edafea4e2924f0ed2d08ea61f3069df5e04f329f052ebe2c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605280743-P4J3DQ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
