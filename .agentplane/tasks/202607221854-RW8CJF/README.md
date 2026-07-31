---
id: "202607221854-RW8CJF"
title: "Define granular CommandSession capabilities and migrate a pilot slice"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on:
  - "202607221908-AB2SFC"
tags:
  - "architecture"
  - "cli"
  - "command-session"
  - "milestone-rc2"
  - "refactor"
  - "rf-24"
  - "v0.7"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run arch:check"
  - "bun run guards:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-31T19:53:14.538Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-31T20:40:26.156Z"
  updated_by: "TESTER"
  note: "Hosted dead-code baseline rework passed: unused type re-exports removed, knip baseline unchanged at 545 entries, typecheck and 13 focused tests pass at 3bb947f75."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-31T20:40:50.192Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 2 typed finding(s)."
  evaluated_sha: "3bb947f75aee3ce9075d56a0a90db0e8d6c3fa05"
  blueprint_digest: "db2315050a9bd415958b67dbb220b8e7dbf6348561ad789d75653afe7a24fe06"
  evidence_refs:
    - ".agentplane/tasks/202607221854-RW8CJF/quality/20260731-204049946-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221854-RW8CJF/quality/20260731-204049946-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221854-RW8CJF/quality/20260731-204049946-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221854-RW8CJF/quality/20260731-204049946-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221854-RW8CJF/quality/20260731-204049946-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221854-RW8CJF/README.md"
    - ".agentplane/tasks/202607221854-RW8CJF/quality/20260731-204049946-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221854-RW8CJF/quality/20260731-204049946-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221854-RW8CJF/quality/20260731-204049946-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The hosted dead-code failure exposed unnecessary type re-exports only; internal session types and runtime behavior remain unchanged."
    - "The public catalog surface is now limited to the existing CommandEntry and RunDeps contract, while internal consumers import only the session types they use."
commit:
  hash: "72cd979e8b580083ccc68b393428555163fb5816"
  message: "🔎 RW8CJF task: re-evaluate export surface"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-31T19:53:56.469Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-31T20:22:13.948Z"
    author: "TESTER"
    state: "ok"
    note: "CommandSession capability pilot passed typed denial, laziness, trace, architecture, critical CLI, typecheck, and bundle gates at implementation SHA 33e59899d."
  -
    type: "status"
    at: "2026-07-31T20:24:41.627Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-31T20:30:04.393Z"
    author: "TESTER"
    state: "ok"
    note: "Hosted hotspot regression resolved by moving the trace integration case into a dedicated test file; hotspots baseline, 13 focused tests, and typecheck pass at 32da254a5."
  -
    type: "status"
    at: "2026-07-31T20:31:10.713Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-31T20:40:26.156Z"
    author: "TESTER"
    state: "ok"
    note: "Hosted dead-code baseline rework passed: unused type re-exports removed, knip baseline unchanged at 545 entries, typecheck and 13 focused tests pass at 3bb947f75."
  -
    type: "status"
    at: "2026-07-31T20:41:53.125Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-31T20:41:53.138Z"
doc_updated_by: "CODER"
description: "RF-24a: replace coarse CommandNeeds with composable project/config/backend/task/Git/route/policy/approval/context/provider/output capabilities and prove typed lazy resolution on representative commands."
sections:
  Summary: |-
    Define granular CommandSession capabilities and migrate a pilot slice

    RF-24a: replace coarse CommandNeeds with composable project/config/backend/task/Git/route/policy/approval/context/provider/output capabilities and prove typed lazy resolution on representative commands.
  Scope: |-
    - In scope: capability type model, command catalog declaration, typed handler subsets, lazy resolver graph, preparation tracing hooks, and pilot migration of simple/read, task, route, and provider commands.
    - Out of scope: migrating every command family in one big-bang.
  Plan: |-
    1. Define granular capability tokens and compile-time handler session subsets.
    2. Map legacy CommandNeeds to an explicit compatibility adapter.
    3. Make the resolver construct only declared lazy capabilities.
    4. Migrate representative low-, medium-, and high-dependency command slices.
    5. Add compile-time/runtime denial, laziness, and preparation trace tests.
  Verify Steps: |-
    1. Compile handlers against their declared sessions. Expected: undeclared task/Git/provider access is a type error or typed runtime denial at legacy boundaries.
    2. Run simple command fixtures. Expected: task, Git, route, and provider preparation nodes are never loaded.
    3. Run pilot task/route/provider commands. Expected: only declared capabilities load and output compatibility is unchanged.
    4. Inspect catalog and traces. Expected: requirements and preparation cost are visible per command.
    5. Run focused catalog/session tests, arch check, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-31T20:22:13.948Z — VERIFY — ok

    By: TESTER

    Note: CommandSession capability pilot passed typed denial, laziness, trace, architecture, critical CLI, typecheck, and bundle gates at implementation SHA 33e59899d.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T19:53:56.469Z, excerpt_hash=sha256:8a607b767465d48fff512fe7a20c5f468fbfae48be68219aa1ea6b45dd460fd4

    Details:

    # CommandSession Pilot Verification

    Verified implementation SHA: `33e59899d5cd381f089b96746fb715fa5c84a6a2`.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-31T20:30:04.393Z — VERIFY — ok

    By: TESTER

    Note: Hosted hotspot regression resolved by moving the trace integration case into a dedicated test file; hotspots baseline, 13 focused tests, and typecheck pass at 32da254a5.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T20:24:41.643Z, excerpt_hash=sha256:8a607b767465d48fff512fe7a20c5f468fbfae48be68219aa1ea6b45dd460fd4

    Details:

    # CommandSession Pilot Verification

    Verified implementation SHA: `33e59899d5cd381f089b96746fb715fa5c84a6a2`.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-31T20:40:26.156Z — VERIFY — ok

    By: TESTER

    Note: Hosted dead-code baseline rework passed: unused type re-exports removed, knip baseline unchanged at 545 entries, typecheck and 13 focused tests pass at 3bb947f75.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T20:31:10.728Z, excerpt_hash=sha256:8a607b767465d48fff512fe7a20c5f468fbfae48be68219aa1ea6b45dd460fd4

    Details:

    # CommandSession Pilot Verification

    Verified implementation SHA: `33e59899d5cd381f089b96746fb715fa5c84a6a2`.
  Rollback Plan: |-
    - Revert pilot command migrations and restore the explicit legacy CommandNeeds adapter.
    - Keep the capability contract additive until the remaining migration task is complete.
    - Re-run command snapshots, architecture checks, and typecheck.
  Findings: |-
    - Observation: Granular capabilities still share the current monolithic CommandContext preparation node.
      Impact: Requirements and access are typed and traceable, but field-level runtime isolation remains deferred.
      Resolution: Migrate underlying resolver slices incrementally in the downstream RC2 tasks while retaining the explicit legacy adapter.
extensions:
  implementation_commit:
    hash: "3bb947f75aee3ce9075d56a0a90db0e8d6c3fa05"
    message: "♻️ RW8CJF task: trim unused session type exports"
  workflow_route_baseline:
    start_head_sha: "1adc9896b158719e908acc894b3651bfec2348c1"
    version: 1
id_source: "generated"
---
## Summary

Define granular CommandSession capabilities and migrate a pilot slice

RF-24a: replace coarse CommandNeeds with composable project/config/backend/task/Git/route/policy/approval/context/provider/output capabilities and prove typed lazy resolution on representative commands.

## Scope

- In scope: capability type model, command catalog declaration, typed handler subsets, lazy resolver graph, preparation tracing hooks, and pilot migration of simple/read, task, route, and provider commands.
- Out of scope: migrating every command family in one big-bang.

## Plan

1. Define granular capability tokens and compile-time handler session subsets.
2. Map legacy CommandNeeds to an explicit compatibility adapter.
3. Make the resolver construct only declared lazy capabilities.
4. Migrate representative low-, medium-, and high-dependency command slices.
5. Add compile-time/runtime denial, laziness, and preparation trace tests.

## Verify Steps

1. Compile handlers against their declared sessions. Expected: undeclared task/Git/provider access is a type error or typed runtime denial at legacy boundaries.
2. Run simple command fixtures. Expected: task, Git, route, and provider preparation nodes are never loaded.
3. Run pilot task/route/provider commands. Expected: only declared capabilities load and output compatibility is unchanged.
4. Inspect catalog and traces. Expected: requirements and preparation cost are visible per command.
5. Run focused catalog/session tests, arch check, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-31T20:22:13.948Z — VERIFY — ok

By: TESTER

Note: CommandSession capability pilot passed typed denial, laziness, trace, architecture, critical CLI, typecheck, and bundle gates at implementation SHA 33e59899d.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T19:53:56.469Z, excerpt_hash=sha256:8a607b767465d48fff512fe7a20c5f468fbfae48be68219aa1ea6b45dd460fd4

Details:

# CommandSession Pilot Verification

Verified implementation SHA: `33e59899d5cd381f089b96746fb715fa5c84a6a2`.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-31T20:30:04.393Z — VERIFY — ok

By: TESTER

Note: Hosted hotspot regression resolved by moving the trace integration case into a dedicated test file; hotspots baseline, 13 focused tests, and typecheck pass at 32da254a5.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T20:24:41.643Z, excerpt_hash=sha256:8a607b767465d48fff512fe7a20c5f468fbfae48be68219aa1ea6b45dd460fd4

Details:

# CommandSession Pilot Verification

Verified implementation SHA: `33e59899d5cd381f089b96746fb715fa5c84a6a2`.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-31T20:40:26.156Z — VERIFY — ok

By: TESTER

Note: Hosted dead-code baseline rework passed: unused type re-exports removed, knip baseline unchanged at 545 entries, typecheck and 13 focused tests pass at 3bb947f75.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T20:31:10.728Z, excerpt_hash=sha256:8a607b767465d48fff512fe7a20c5f468fbfae48be68219aa1ea6b45dd460fd4

Details:

# CommandSession Pilot Verification

Verified implementation SHA: `33e59899d5cd381f089b96746fb715fa5c84a6a2`.

## Rollback Plan

- Revert pilot command migrations and restore the explicit legacy CommandNeeds adapter.
- Keep the capability contract additive until the remaining migration task is complete.
- Re-run command snapshots, architecture checks, and typecheck.

## Findings

- Observation: Granular capabilities still share the current monolithic CommandContext preparation node.
  Impact: Requirements and access are typed and traceable, but field-level runtime isolation remains deferred.
  Resolution: Migrate underlying resolver slices incrementally in the downstream RC2 tasks while retaining the explicit legacy adapter.

## 1. Typed capability boundary and lazy resolution

Command: `bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog/kernel.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli.command-session.test.ts`

Result: pass (3 files, 13 tests).

Evidence: the session tests cover compile-time capability narrowing, typed `E_INTERNAL` denial before an undeclared resolver runs, lazy node reuse, explicit legacy compatibility, and preparation trace visibility. The CLI integration test proves that `docs cli` resolves only the `output` node.

Scope: Verify steps 1-4; `CommandSession`, the command catalog, the registry bridge, and representative simple/read/task/route/provider commands.

The trace integration case lives in a dedicated test file so the existing oversized `run-cli.core.test.ts` baseline does not grow.

Command: `bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog/kernel.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli.command-session.test.ts`

Result: pass (3 files, 13 tests).

Evidence: the session tests cover compile-time capability narrowing, typed `E_INTERNAL` denial before an undeclared resolver runs, lazy node reuse, explicit legacy compatibility, and preparation trace visibility. The CLI integration test proves that `docs cli` resolves only the `output` node.

Scope: Verify steps 1-4; `CommandSession`, the command catalog, the registry bridge, and representative simple/read/task/route/provider commands.

The trace integration case lives in a dedicated test file so the existing oversized `run-cli.core.test.ts` baseline does not grow.

Command: `bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog/kernel.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli.core.test.ts`

Result: pass (3 files, 56 tests).

Evidence: the session tests cover compile-time capability narrowing, typed `E_INTERNAL` denial before an undeclared resolver runs, lazy node reuse, explicit legacy compatibility, and preparation trace visibility. The CLI integration test proves that `docs cli` resolves only the `output` node.

Scope: Verify steps 1-4; `CommandSession`, the command catalog, the registry bridge, and representative simple/read/task/route/provider commands.

## 2. Architecture and trust boundaries

Command: `bun run arch:check && bun run guards:check`

Result: pass.

Evidence: dependency-cruiser reported zero violations for every package and command slice; shared guards passed; the trust-boundary ratchet retained its single reviewed baseline exception.

Scope: Verify step 5; dependency direction, shared guard contracts, and trust-boundary invariants.

Command: `bun run arch:check && bun run guards:check`

Result: pass.

Evidence: dependency-cruiser reported zero violations for every package and command slice; shared guards passed; the trust-boundary ratchet retained its single reviewed baseline exception.

Scope: Verify step 5; dependency direction, shared guard contracts, and trust-boundary invariants.

Command: `bun run arch:check && bun run guards:check`

Result: pass.

Evidence: dependency-cruiser reported zero violations for every package and command slice; shared guards passed; the trust-boundary ratchet retained its single reviewed baseline exception.

Scope: Verify step 5; dependency direction, shared guard contracts, and trust-boundary invariants.

## 3. Critical CLI compatibility

Command: `bun run test:critical`

Result: pass (12 of 12 chunks).

Evidence: all critical CLI suites passed, including efficiency baseline/candidate/replay, exit-code, Git edge, protected-path, scope-leak, symlink-root, and trust-boundary regression suites.

Scope: Verify steps 2, 3, and 5; user-visible CLI compatibility and safety behavior.

Command: `bun run test:critical`

Result: pass (12 of 12 chunks).

Evidence: all critical CLI suites passed, including efficiency baseline/candidate/replay, exit-code, Git edge, protected-path, scope-leak, symlink-root, and trust-boundary regression suites.

Scope: Verify steps 2, 3, and 5; user-visible CLI compatibility and safety behavior.

Command: `bun run test:critical`

Result: pass (12 of 12 chunks).

Evidence: all critical CLI suites passed, including efficiency baseline/candidate/replay, exit-code, Git edge, protected-path, scope-leak, symlink-root, and trust-boundary regression suites.

Scope: Verify steps 2, 3, and 5; user-visible CLI compatibility and safety behavior.

## 4. Type and bundle integrity

Command: `bun run typecheck && bun run build`

Result: pass.

Evidence: the repository TypeScript build completed without diagnostics; core, recipes, and agentplane bundles built successfully, including the 3.01 MB CLI bundle.

Scope: Verify steps 1 and 5; compile-time session subsets, public package boundaries, and production bundle generation.

Command: `bun run typecheck && bun run build`

Result: pass.

Evidence: the repository TypeScript build completed without diagnostics; core, recipes, and agentplane bundles built successfully, including the 3.01 MB CLI bundle.

Scope: Verify steps 1 and 5; compile-time session subsets, public package boundaries, and production bundle generation.

Command: `bun run typecheck && bun run build`

Result: pass.

Evidence: the repository TypeScript build completed without diagnostics; core, recipes, and agentplane bundles built successfully, including the 3.01 MB CLI bundle.

Scope: Verify steps 1 and 5; compile-time session subsets, public package boundaries, and production bundle generation.

## 5. Dead-code and export surface

Command: `bun run knip:check`

Result: pass.

Evidence: the unused-code baseline remains unchanged at 545 entries (`files=1`, `exports=178`, `types=366`). Session types are exported only from the modules that consume them; no unused public re-export debt was added.

Scope: Verify step 5; public type surface and dead-code ratchet.

## Residual boundary

Granular capabilities currently coalesce onto the existing monolithic `CommandContext` preparation node. This pilot makes requirements explicit, typed, lazy, and traceable without claiming field-level runtime isolation. Downstream vertical-slice tasks will split the underlying context resolvers while the explicit legacy adapter preserves compatibility.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-RW8CJF-define-granular-commandsession-capabilities-and/.agentplane/tasks/202607221854-RW8CJF/blueprint/resolved-snapshot.json
- old_digest: db2315050a9bd415958b67dbb220b8e7dbf6348561ad789d75653afe7a24fe06
- current_digest: db2315050a9bd415958b67dbb220b8e7dbf6348561ad789d75653afe7a24fe06
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221854-RW8CJF

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

Granular capabilities currently coalesce onto the existing monolithic `CommandContext` preparation node. This pilot makes requirements explicit, typed, lazy, and traceable without claiming field-level runtime isolation. Downstream vertical-slice tasks will split the underlying context resolvers while the explicit legacy adapter preserves compatibility.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-RW8CJF-define-granular-commandsession-capabilities-and/.agentplane/tasks/202607221854-RW8CJF/blueprint/resolved-snapshot.json
- old_digest: db2315050a9bd415958b67dbb220b8e7dbf6348561ad789d75653afe7a24fe06
- current_digest: db2315050a9bd415958b67dbb220b8e7dbf6348561ad789d75653afe7a24fe06
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221854-RW8CJF

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

Granular capabilities currently coalesce onto the existing monolithic `CommandContext` preparation node. This pilot makes requirements explicit, typed, lazy, and traceable without claiming field-level runtime isolation. Downstream vertical-slice tasks will split the underlying context resolvers while the explicit legacy adapter preserves compatibility.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-RW8CJF-define-granular-commandsession-capabilities-and/.agentplane/tasks/202607221854-RW8CJF/blueprint/resolved-snapshot.json
- old_digest: db2315050a9bd415958b67dbb220b8e7dbf6348561ad789d75653afe7a24fe06
- current_digest: db2315050a9bd415958b67dbb220b8e7dbf6348561ad789d75653afe7a24fe06
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221854-RW8CJF

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->
