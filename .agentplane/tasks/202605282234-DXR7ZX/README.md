---
id: "202605282234-DXR7ZX"
title: "Context init builder decomposition"
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
  updated_at: "2026-05-28T22:34:37.140Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T22:42:34.688Z"
  updated_by: "CODER"
  note: "Context init was decomposed into command orchestration, bootstrap/git helpers, and content builders. Verified with focused context CLI tests, typecheck, arch deps, lint, format, and hotspot threshold check (runtime warnings 39 -> 38)."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-28T22:42:50.512Z"
  updated_by: "EVALUATOR"
  note: "Context init builder decomposition completed without behavior changes."
  evaluated_sha: "0f3c098c28ff587e4eb9080963c05f75e08f58c6"
  blueprint_digest: "ac2130312a9c9df8994ec714ec7c87b2f489c88307bfaca5bfc69cdca2fa590a"
  evidence_refs:
    - ".agentplane/tasks/202605282234-DXR7ZX/README.md"
    - ".agentplane/tasks/202605282234-DXR7ZX/quality/20260528-224250512-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605282234-DXR7ZX/quality/20260528-224250512-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605282234-DXR7ZX/quality/20260528-224250512-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605282234-DXR7ZX/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/context/init.ts"
    - "packages/agentplane/src/commands/context/context-init-bootstrap.ts"
    - "packages/agentplane/src/commands/context/context-init-builders.ts"
    - "bunx vitest run packages/agentplane/src/cli/run-cli.core.context-init.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts --config vitest.workspace.ts"
    - "bun run typecheck"
    - "bun run arch:deps"
    - "bun run lint:core"
    - "bun run format:changed"
    - "node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300"
  findings:
    - "packages/agentplane/src/commands/context/init.ts now focuses on command orchestration and workspace file writes at 284 lines; bootstrap/git helpers moved to context-init-bootstrap.ts, and generated content builders moved to context-init-builders.ts. Hotspot warning count decreased from 39 to 38."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decompose context init builders from command orchestration while preserving context init behavior and verifying hotspot warning reduction."
events:
  -
    type: "status"
    at: "2026-05-28T22:34:52.690Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose context init builders from command orchestration while preserving context init behavior and verifying hotspot warning reduction."
  -
    type: "verify"
    at: "2026-05-28T22:42:34.688Z"
    author: "CODER"
    state: "ok"
    note: "Context init was decomposed into command orchestration, bootstrap/git helpers, and content builders. Verified with focused context CLI tests, typecheck, arch deps, lint, format, and hotspot threshold check (runtime warnings 39 -> 38)."
doc_version: 3
doc_updated_at: "2026-05-28T22:42:34.712Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/context/init.ts by extracting context init content builders and small file-read helpers into focused modules, preserving context init behavior and reducing hotspot warning count."
sections:
  Summary: |-
    Context init builder decomposition

    Decompose packages/agentplane/src/commands/context/init.ts by extracting context init content builders and small file-read helpers into focused modules, preserving context init behavior and reducing hotspot warning count.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/context/init.ts by extracting context init content builders and small file-read helpers into focused modules, preserving context init behavior and reducing hotspot warning count.
    - Out of scope: unrelated refactors not required for "Context init builder decomposition".
  Plan: |-
    1. Start the branch_pr task worktree from canonical main.
    2. Keep context init CLI behavior stable while extracting content builders and simple file-read helpers from packages/agentplane/src/commands/context/init.ts into focused modules.
    3. Verify with focused context init tests, typecheck, arch dependency check, lint, format, and hotspot threshold check; expected runtime hotspot warning count decreases from 39 to 38.
    4. Record verification/evaluator evidence, open PR, wait for hosted checks and review threads, then merge and close the task.
  Verify Steps: |-
    PLANNER fallback scaffold for "Context init builder decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Context init builder decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T22:42:34.688Z — VERIFY — ok

    By: CODER

    Note: Context init was decomposed into command orchestration, bootstrap/git helpers, and content builders. Verified with focused context CLI tests, typecheck, arch deps, lint, format, and hotspot threshold check (runtime warnings 39 -> 38).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T22:34:52.690Z, excerpt_hash=sha256:6268127a7714fcdcf25b06b41e00b0b08f7ab62508aee058e5c630f9807581af

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282234-DXR7ZX-context-init-builder-decomposition/.agentplane/tasks/202605282234-DXR7ZX/blueprint/resolved-snapshot.json
    - old_digest: ac2130312a9c9df8994ec714ec7c87b2f489c88307bfaca5bfc69cdca2fa590a
    - current_digest: ac2130312a9c9df8994ec714ec7c87b2f489c88307bfaca5bfc69cdca2fa590a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605282234-DXR7ZX

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Context init builder decomposition

Decompose packages/agentplane/src/commands/context/init.ts by extracting context init content builders and small file-read helpers into focused modules, preserving context init behavior and reducing hotspot warning count.

## Scope

- In scope: Decompose packages/agentplane/src/commands/context/init.ts by extracting context init content builders and small file-read helpers into focused modules, preserving context init behavior and reducing hotspot warning count.
- Out of scope: unrelated refactors not required for "Context init builder decomposition".

## Plan

1. Start the branch_pr task worktree from canonical main.
2. Keep context init CLI behavior stable while extracting content builders and simple file-read helpers from packages/agentplane/src/commands/context/init.ts into focused modules.
3. Verify with focused context init tests, typecheck, arch dependency check, lint, format, and hotspot threshold check; expected runtime hotspot warning count decreases from 39 to 38.
4. Record verification/evaluator evidence, open PR, wait for hosted checks and review threads, then merge and close the task.

## Verify Steps

PLANNER fallback scaffold for "Context init builder decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Context init builder decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T22:42:34.688Z — VERIFY — ok

By: CODER

Note: Context init was decomposed into command orchestration, bootstrap/git helpers, and content builders. Verified with focused context CLI tests, typecheck, arch deps, lint, format, and hotspot threshold check (runtime warnings 39 -> 38).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T22:34:52.690Z, excerpt_hash=sha256:6268127a7714fcdcf25b06b41e00b0b08f7ab62508aee058e5c630f9807581af

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282234-DXR7ZX-context-init-builder-decomposition/.agentplane/tasks/202605282234-DXR7ZX/blueprint/resolved-snapshot.json
- old_digest: ac2130312a9c9df8994ec714ec7c87b2f489c88307bfaca5bfc69cdca2fa590a
- current_digest: ac2130312a9c9df8994ec714ec7c87b2f489c88307bfaca5bfc69cdca2fa590a
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605282234-DXR7ZX

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
