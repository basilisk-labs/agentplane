---
id: "202606011716-AR080K"
title: "Add fast context knowledge dashboard"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-01T17:16:40.555Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-01T18:31:53.247Z"
  updated_by: "EVALUATOR"
  note: "Verified final PR HEAD 6667e0663: GitHub PR #4364 required checks passed after CI recovery review; local dashboard unit tests, typecheck, build, docs CLI freshness, Knip baseline, hotspot threshold, dump-json smoke, and context graph validation passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-01T18:31:53.247Z"
  updated_by: "EVALUATOR"
  note: "Verified final PR HEAD 6667e0663: GitHub PR #4364 required checks passed after CI recovery review; local dashboard unit tests, typecheck, build, docs CLI freshness, Knip baseline, hotspot threshold, dump-json smoke, and context graph validation passed."
  evaluated_sha: "b77bb6bd3c7f95e97478c1abf227c78281ecd5a1"
  blueprint_digest: "3d3b913516511d5acbb765ecb78369fa6b7c55ab815c7eac9cd5d6370120bb16"
  evidence_refs:
    - ".agentplane/tasks/202606011716-AR080K/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606011716-AR080K-add-fast-context-knowledge-dashboard/.agentplane/tasks/202606011716-AR080K/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing the approved read-only whole-knowledge context dashboard in the dedicated branch_pr worktree, with fast projection-backed APIs and targeted tests for large context datasets."
events:
  -
    type: "status"
    at: "2026-06-01T17:17:02.205Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the approved read-only whole-knowledge context dashboard in the dedicated branch_pr worktree, with fast projection-backed APIs and targeted tests for large context datasets."
  -
    type: "verify"
    at: "2026-06-01T17:33:37.538Z"
    author: "CODER"
    state: "ok"
    note: "Verified: implemented read-only context dashboard command and typed whole-knowledge graph snapshot. Commands passed: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/context/dashboard.unit.test.ts; bun run --filter=agentplane typecheck; targeted eslint for changed files; bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; bun run --filter=agentplane build; ap context dashboard --dump-json; ap context graph validate; node .agentplane/policy/check-routing.mjs; git diff --check."
  -
    type: "verify"
    at: "2026-06-01T18:31:53.247Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Verified final PR HEAD 6667e0663: GitHub PR #4364 required checks passed after CI recovery review; local dashboard unit tests, typecheck, build, docs CLI freshness, Knip baseline, hotspot threshold, dump-json smoke, and context graph validation passed."
doc_version: 3
doc_updated_at: "2026-06-01T18:31:53.330Z"
doc_updated_by: "CODER"
description: "Implement a read-only context dashboard command that serves a whole knowledge graph across wiki pages, links, entities, claims, sources, capabilities, and task evidence, optimized for large task-history-to-LLM-wiki datasets using the existing context projection where possible."
sections:
  Summary: |-
    Add fast context knowledge dashboard

    Implement a read-only context dashboard command that serves a whole knowledge graph across wiki pages, links, entities, claims, sources, capabilities, and task evidence, optimized for large task-history-to-LLM-wiki datasets using the existing context projection where possible.
  Scope: |-
    - In scope: Implement a read-only context dashboard command that serves a whole knowledge graph across wiki pages, links, entities, claims, sources, capabilities, and task evidence, optimized for large task-history-to-LLM-wiki datasets using the existing context projection where possible.
    - Out of scope: unrelated refactors not required for "Add fast context knowledge dashboard".
  Plan: "Implement read-only whole-knowledge context dashboard. Scope: add context dashboard command spec/runner/catalog entry; build a fast graph model that prefers existing SQLite/projection and derived JSONL while streaming/parsing wiki markdown only for missing link/frontmatter data; expose local read-only HTTP APIs for graph, metrics, health, and static UI; include filters for wiki/entity/claim/source/capability/task layers; test empty graph and synthetic large wiki/graph inputs; document Verify Steps. Verification: targeted vitest for context dashboard, context graph validate/check where applicable, CLI help snapshot/update if command catalog changes, policy routing check, final git status audit."
  Verify Steps: |-
    1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/context/dashboard.unit.test.ts`. Expected: dashboard graph unit coverage passes, including typed wiki/entity/source/task graph and large wiki map behavior.
    2. Run `bun run --filter=agentplane typecheck`. Expected: the agentplane package typechecks.
    3. Run targeted ESLint for changed runtime/test files. Expected: no lint errors.
    4. Run `bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.help-snap.test.ts`. Expected: command catalog/help snapshot coverage passes.
    5. Run `bun run --filter=agentplane build` then `ap context dashboard --dump-json`. Expected: repo-local CLI build is fresh and the command emits a typed graph snapshot without starting HTTP.
    6. Run `node .agentplane/policy/check-routing.mjs` and `git status --short --untracked-files=all`. Expected: policy routing passes and final state contains only intentional task-scope artifacts.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-01T17:33:37.538Z — VERIFY — ok

    By: CODER

    Note: Verified: implemented read-only context dashboard command and typed whole-knowledge graph snapshot. Commands passed: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/context/dashboard.unit.test.ts; bun run --filter=agentplane typecheck; targeted eslint for changed files; bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; bun run --filter=agentplane build; ap context dashboard --dump-json; ap context graph validate; node .agentplane/policy/check-routing.mjs; git diff --check.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T17:30:11.179Z, excerpt_hash=sha256:429d6048969b5f32d453491bd466855f165a7acfb7437687876ecb6816a0bc7b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606011716-AR080K-add-fast-context-knowledge-dashboard/.agentplane/tasks/202606011716-AR080K/blueprint/resolved-snapshot.json
    - old_digest: 3d3b913516511d5acbb765ecb78369fa6b7c55ab815c7eac9cd5d6370120bb16
    - current_digest: 3d3b913516511d5acbb765ecb78369fa6b7c55ab815c7eac9cd5d6370120bb16
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606011716-AR080K

    ### 2026-06-01T18:31:53.247Z — VERIFY — ok

    By: EVALUATOR

    Note: Verified final PR HEAD 6667e0663: GitHub PR #4364 required checks passed after CI recovery review; local dashboard unit tests, typecheck, build, docs CLI freshness, Knip baseline, hotspot threshold, dump-json smoke, and context graph validation passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T17:33:37.577Z, excerpt_hash=sha256:429d6048969b5f32d453491bd466855f165a7acfb7437687876ecb6816a0bc7b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606011716-AR080K-add-fast-context-knowledge-dashboard/.agentplane/tasks/202606011716-AR080K/blueprint/resolved-snapshot.json
    - old_digest: 3d3b913516511d5acbb765ecb78369fa6b7c55ab815c7eac9cd5d6370120bb16
    - current_digest: 3d3b913516511d5acbb765ecb78369fa6b7c55ab815c7eac9cd5d6370120bb16
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606011716-AR080K

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add fast context knowledge dashboard

Implement a read-only context dashboard command that serves a whole knowledge graph across wiki pages, links, entities, claims, sources, capabilities, and task evidence, optimized for large task-history-to-LLM-wiki datasets using the existing context projection where possible.

## Scope

- In scope: Implement a read-only context dashboard command that serves a whole knowledge graph across wiki pages, links, entities, claims, sources, capabilities, and task evidence, optimized for large task-history-to-LLM-wiki datasets using the existing context projection where possible.
- Out of scope: unrelated refactors not required for "Add fast context knowledge dashboard".

## Plan

Implement read-only whole-knowledge context dashboard. Scope: add context dashboard command spec/runner/catalog entry; build a fast graph model that prefers existing SQLite/projection and derived JSONL while streaming/parsing wiki markdown only for missing link/frontmatter data; expose local read-only HTTP APIs for graph, metrics, health, and static UI; include filters for wiki/entity/claim/source/capability/task layers; test empty graph and synthetic large wiki/graph inputs; document Verify Steps. Verification: targeted vitest for context dashboard, context graph validate/check where applicable, CLI help snapshot/update if command catalog changes, policy routing check, final git status audit.

## Verify Steps

1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/context/dashboard.unit.test.ts`. Expected: dashboard graph unit coverage passes, including typed wiki/entity/source/task graph and large wiki map behavior.
2. Run `bun run --filter=agentplane typecheck`. Expected: the agentplane package typechecks.
3. Run targeted ESLint for changed runtime/test files. Expected: no lint errors.
4. Run `bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.help-snap.test.ts`. Expected: command catalog/help snapshot coverage passes.
5. Run `bun run --filter=agentplane build` then `ap context dashboard --dump-json`. Expected: repo-local CLI build is fresh and the command emits a typed graph snapshot without starting HTTP.
6. Run `node .agentplane/policy/check-routing.mjs` and `git status --short --untracked-files=all`. Expected: policy routing passes and final state contains only intentional task-scope artifacts.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-01T17:33:37.538Z — VERIFY — ok

By: CODER

Note: Verified: implemented read-only context dashboard command and typed whole-knowledge graph snapshot. Commands passed: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/context/dashboard.unit.test.ts; bun run --filter=agentplane typecheck; targeted eslint for changed files; bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; bun run --filter=agentplane build; ap context dashboard --dump-json; ap context graph validate; node .agentplane/policy/check-routing.mjs; git diff --check.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T17:30:11.179Z, excerpt_hash=sha256:429d6048969b5f32d453491bd466855f165a7acfb7437687876ecb6816a0bc7b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606011716-AR080K-add-fast-context-knowledge-dashboard/.agentplane/tasks/202606011716-AR080K/blueprint/resolved-snapshot.json
- old_digest: 3d3b913516511d5acbb765ecb78369fa6b7c55ab815c7eac9cd5d6370120bb16
- current_digest: 3d3b913516511d5acbb765ecb78369fa6b7c55ab815c7eac9cd5d6370120bb16
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606011716-AR080K

### 2026-06-01T18:31:53.247Z — VERIFY — ok

By: EVALUATOR

Note: Verified final PR HEAD 6667e0663: GitHub PR #4364 required checks passed after CI recovery review; local dashboard unit tests, typecheck, build, docs CLI freshness, Knip baseline, hotspot threshold, dump-json smoke, and context graph validation passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T17:33:37.577Z, excerpt_hash=sha256:429d6048969b5f32d453491bd466855f165a7acfb7437687876ecb6816a0bc7b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606011716-AR080K-add-fast-context-knowledge-dashboard/.agentplane/tasks/202606011716-AR080K/blueprint/resolved-snapshot.json
- old_digest: 3d3b913516511d5acbb765ecb78369fa6b7c55ab815c7eac9cd5d6370120bb16
- current_digest: 3d3b913516511d5acbb765ecb78369fa6b7c55ab815c7eac9cd5d6370120bb16
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606011716-AR080K

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
