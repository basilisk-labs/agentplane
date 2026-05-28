---
id: "202605282222-D43531"
title: "Context command dispatcher decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "context"
  - "hotspot"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T22:22:49.834Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T22:29:54.367Z"
  updated_by: "CODER"
  note: "Context command dispatcher split into thin entrypoint, runner, group usage handlers, and interactive init runner. Verified with focused context CLI tests, typecheck, arch deps, lint, format, and hotspot threshold check (runtime warnings 40 -> 39)."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-28T22:30:19.420Z"
  updated_by: "EVALUATOR"
  note: "Context command dispatcher decomposition completed without changing CLI behavior."
  evaluated_sha: "7b34c01e69a9f73b975e0b540b26af552c0cebaa"
  blueprint_digest: "8e89bc7f9a108b6d0065608f3bc60397d13b55c189d9f3c6b400d8b8f8f2ba01"
  evidence_refs:
    - ".agentplane/tasks/202605282222-D43531/README.md"
    - ".agentplane/tasks/202605282222-D43531/quality/20260528-223019420-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605282222-D43531/quality/20260528-223019420-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605282222-D43531/quality/20260528-223019420-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605282222-D43531/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/context/context.command.ts"
    - "packages/agentplane/src/commands/context/context-runner.ts"
    - "packages/agentplane/src/commands/context/context-groups.ts"
    - "packages/agentplane/src/commands/context/context-init-runner.ts"
    - "bunx vitest run packages/agentplane/src/cli/run-cli.core.context-init.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts --config vitest.workspace.ts"
    - "bun run typecheck"
    - "bun run arch:deps"
    - "bun run lint:core"
    - "bun run format:changed"
    - "node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300"
  findings:
    - "context.command.ts is now a one-line public barrel; command wrappers remain in context-runner.ts at 340 lines, group usage handlers moved to context-groups.ts, and interactive init prompting moved to context-init-runner.ts. Hotspot warning count decreased from 40 to 39."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decompose context command dispatcher into focused acyclic helpers while preserving context CLI behavior."
events:
  -
    type: "status"
    at: "2026-05-28T22:23:10.428Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose context command dispatcher into focused acyclic helpers while preserving context CLI behavior."
  -
    type: "verify"
    at: "2026-05-28T22:29:54.367Z"
    author: "CODER"
    state: "ok"
    note: "Context command dispatcher split into thin entrypoint, runner, group usage handlers, and interactive init runner. Verified with focused context CLI tests, typecheck, arch deps, lint, format, and hotspot threshold check (runtime warnings 40 -> 39)."
doc_version: 3
doc_updated_at: "2026-05-28T22:29:54.395Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/context/context.command.ts by extracting group dispatch and context command runner helpers while preserving context CLI behavior. Reduce hotspot warnings and keep command imports acyclic. Verify with focused context CLI tests, typecheck, lint, arch deps, format, and hotspot report."
sections:
  Summary: |-
    Context command dispatcher decomposition

    Decompose packages/agentplane/src/commands/context/context.command.ts by extracting group dispatch and context command runner helpers while preserving context CLI behavior. Reduce hotspot warnings and keep command imports acyclic. Verify with focused context CLI tests, typecheck, lint, arch deps, format, and hotspot report.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/context/context.command.ts by extracting group dispatch and context command runner helpers while preserving context CLI behavior. Reduce hotspot warnings and keep command imports acyclic. Verify with focused context CLI tests, typecheck, lint, arch deps, format, and hotspot report.
    - Out of scope: unrelated refactors not required for "Context command dispatcher decomposition".
  Plan: |-
    Plan:
    1. Start branch_pr worktree from route guidance.
    2. Split context.command.ts into focused dispatcher helpers: keep public exports/spec re-exports stable, move group usage handlers and context runner wrappers into acyclic modules.
    3. Preserve context init interactive prompt behavior and all existing command runner signatures.
    4. Run focused context CLI tests plus arch:deps, typecheck, lint:core, format:changed, and hotspot-report.
    5. Record verification/evaluator evidence, open PR, wait for hosted checks, merge into main, close lifecycle.
  Verify Steps: |-
    PLANNER fallback scaffold for "Context command dispatcher decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Context command dispatcher decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T22:29:54.367Z — VERIFY — ok

    By: CODER

    Note: Context command dispatcher split into thin entrypoint, runner, group usage handlers, and interactive init runner. Verified with focused context CLI tests, typecheck, arch deps, lint, format, and hotspot threshold check (runtime warnings 40 -> 39).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T22:23:10.428Z, excerpt_hash=sha256:286c8b52e7afa9734e3bc825e9e8d0af9f240db54527d21ac077b1a3309a441c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282222-D43531-context-command-dispatcher-decomposition/.agentplane/tasks/202605282222-D43531/blueprint/resolved-snapshot.json
    - old_digest: 8e89bc7f9a108b6d0065608f3bc60397d13b55c189d9f3c6b400d8b8f8f2ba01
    - current_digest: 8e89bc7f9a108b6d0065608f3bc60397d13b55c189d9f3c6b400d8b8f8f2ba01
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605282222-D43531

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Context command dispatcher decomposition

Decompose packages/agentplane/src/commands/context/context.command.ts by extracting group dispatch and context command runner helpers while preserving context CLI behavior. Reduce hotspot warnings and keep command imports acyclic. Verify with focused context CLI tests, typecheck, lint, arch deps, format, and hotspot report.

## Scope

- In scope: Decompose packages/agentplane/src/commands/context/context.command.ts by extracting group dispatch and context command runner helpers while preserving context CLI behavior. Reduce hotspot warnings and keep command imports acyclic. Verify with focused context CLI tests, typecheck, lint, arch deps, format, and hotspot report.
- Out of scope: unrelated refactors not required for "Context command dispatcher decomposition".

## Plan

Plan:
1. Start branch_pr worktree from route guidance.
2. Split context.command.ts into focused dispatcher helpers: keep public exports/spec re-exports stable, move group usage handlers and context runner wrappers into acyclic modules.
3. Preserve context init interactive prompt behavior and all existing command runner signatures.
4. Run focused context CLI tests plus arch:deps, typecheck, lint:core, format:changed, and hotspot-report.
5. Record verification/evaluator evidence, open PR, wait for hosted checks, merge into main, close lifecycle.

## Verify Steps

PLANNER fallback scaffold for "Context command dispatcher decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Context command dispatcher decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T22:29:54.367Z — VERIFY — ok

By: CODER

Note: Context command dispatcher split into thin entrypoint, runner, group usage handlers, and interactive init runner. Verified with focused context CLI tests, typecheck, arch deps, lint, format, and hotspot threshold check (runtime warnings 40 -> 39).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T22:23:10.428Z, excerpt_hash=sha256:286c8b52e7afa9734e3bc825e9e8d0af9f240db54527d21ac077b1a3309a441c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282222-D43531-context-command-dispatcher-decomposition/.agentplane/tasks/202605282222-D43531/blueprint/resolved-snapshot.json
- old_digest: 8e89bc7f9a108b6d0065608f3bc60397d13b55c189d9f3c6b400d8b8f8f2ba01
- current_digest: 8e89bc7f9a108b6d0065608f3bc60397d13b55c189d9f3c6b400d8b8f8f2ba01
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605282222-D43531

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
