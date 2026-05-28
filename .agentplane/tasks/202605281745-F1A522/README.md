---
id: "202605281745-F1A522"
title: "Respect ignored tasks.json in hooks"
result_summary: "Merged via PR #4200."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github-issue"
  - "hooks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T17:45:41.148Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T17:52:34.201Z"
  updated_by: "CODER"
  note: "Verified issue #4188 hook behavior fix. Focused hook/protected-path tests passed; format:changed, typecheck, policy routing, and doctor passed."
  attempts: 0
commit:
  hash: "7d6128d20eacdb7e1dedee24294e21b4655c0d75"
  message: "Respect ignored tasks.json in hooks"
comments:
  -
    author: "CODER"
    body: "Start: implement issue #4188 hook protection fix in the dedicated branch_pr worktree, keeping enforcement for tracked or explicitly staged protected files and adding focused regression coverage."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4200 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-28T17:46:18.098Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement issue #4188 hook protection fix in the dedicated branch_pr worktree, keeping enforcement for tracked or explicitly staged protected files and adding focused regression coverage."
  -
    type: "verify"
    at: "2026-05-28T17:52:34.201Z"
    author: "CODER"
    state: "ok"
    note: "Verified issue #4188 hook behavior fix. Focused hook/protected-path tests passed; format:changed, typecheck, policy routing, and doctor passed."
  -
    type: "status"
    at: "2026-05-28T19:25:23.261Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4200 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-28T19:25:23.265Z"
doc_updated_by: "INTEGRATOR"
description: "Fix Git hook task-protection behavior from GitHub issue #4188 so ignored .agentplane/tasks.json does not require AGENTPLANE_ALLOW_TASKS unless tracked or explicitly staged."
sections:
  Summary: |-
    Respect ignored tasks.json in hooks

    Fix Git hook task-protection behavior from GitHub issue #4188 so ignored .agentplane/tasks.json does not require AGENTPLANE_ALLOW_TASKS unless tracked or explicitly staged.
  Scope: |-
    - In scope: Fix Git hook task-protection behavior from GitHub issue #4188 so ignored .agentplane/tasks.json does not require AGENTPLANE_ALLOW_TASKS unless tracked or explicitly staged.
    - Out of scope: unrelated refactors not required for "Respect ignored tasks.json in hooks".
  Plan: "Fix issue #4188 by narrowing hook task-protection enforcement to protected files that Git considers tracked or explicitly staged. Add a focused regression test covering ignored .agentplane/tasks.json plus a tracked/force-staged protection case. Verify with task Verify Steps, focused precommit hook tests, policy routing, and doctor."
  Verify Steps: |-
    1. Review the hook policy diff. Expected: `hook_pre_commit` allows active task subtree artifacts without treating ignored untracked `.agentplane/tasks.json` as staged state, while still blocking force-staged `.agentplane/tasks.json`.
    2. Run `bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts packages/agentplane/src/cli/run-cli.critical.protected-paths.test.ts packages/agentplane/src/policy/evaluate.test.ts`. Expected: all focused hook/protected-path policy tests pass.
    3. Run `bun run format:changed`, `bun run typecheck`, `node .agentplane/policy/check-routing.mjs`, and `ap doctor`. Expected: formatting, typecheck, policy routing, and runtime health pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T17:52:34.201Z — VERIFY — ok

    By: CODER

    Note: Verified issue #4188 hook behavior fix. Focused hook/protected-path tests passed; format:changed, typecheck, policy routing, and doctor passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:46:18.098Z, excerpt_hash=sha256:1dcec9bc602332260dbec126ccd200081d6e9cbf7a9a1d5b477429f46da16358

    Details:

    Command: bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts packages/agentplane/src/cli/run-cli.critical.protected-paths.test.ts packages/agentplane/src/policy/evaluate.test.ts. Result: pass. Evidence: 30 pass, 0 fail, 54 expect calls. Scope: hook pre-commit protected path behavior for ignored and force-staged tasks.json plus existing protected-path coverage.
    Command: bun run format:changed. Result: pass. Evidence: All matched files use Prettier code style. Scope: changed code/test formatting.
    Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: TypeScript project references.
    Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing constraints.
    Command: ap doctor. Result: pass. Evidence: doctor (OK), errors=0 warnings=0. Scope: repo-local runtime and workflow health.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281745-F1A522-respect-ignored-tasks-json-in-hooks/.agentplane/tasks/202605281745-F1A522/blueprint/resolved-snapshot.json
    - old_digest: d06ada05f5ce05a1168110a271332a96d71e37134ff09796718f4f877403333b
    - current_digest: d06ada05f5ce05a1168110a271332a96d71e37134ff09796718f4f877403333b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605281745-F1A522

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Respect ignored tasks.json in hooks

Fix Git hook task-protection behavior from GitHub issue #4188 so ignored .agentplane/tasks.json does not require AGENTPLANE_ALLOW_TASKS unless tracked or explicitly staged.

## Scope

- In scope: Fix Git hook task-protection behavior from GitHub issue #4188 so ignored .agentplane/tasks.json does not require AGENTPLANE_ALLOW_TASKS unless tracked or explicitly staged.
- Out of scope: unrelated refactors not required for "Respect ignored tasks.json in hooks".

## Plan

Fix issue #4188 by narrowing hook task-protection enforcement to protected files that Git considers tracked or explicitly staged. Add a focused regression test covering ignored .agentplane/tasks.json plus a tracked/force-staged protection case. Verify with task Verify Steps, focused precommit hook tests, policy routing, and doctor.

## Verify Steps

1. Review the hook policy diff. Expected: `hook_pre_commit` allows active task subtree artifacts without treating ignored untracked `.agentplane/tasks.json` as staged state, while still blocking force-staged `.agentplane/tasks.json`.
2. Run `bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts packages/agentplane/src/cli/run-cli.critical.protected-paths.test.ts packages/agentplane/src/policy/evaluate.test.ts`. Expected: all focused hook/protected-path policy tests pass.
3. Run `bun run format:changed`, `bun run typecheck`, `node .agentplane/policy/check-routing.mjs`, and `ap doctor`. Expected: formatting, typecheck, policy routing, and runtime health pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T17:52:34.201Z — VERIFY — ok

By: CODER

Note: Verified issue #4188 hook behavior fix. Focused hook/protected-path tests passed; format:changed, typecheck, policy routing, and doctor passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:46:18.098Z, excerpt_hash=sha256:1dcec9bc602332260dbec126ccd200081d6e9cbf7a9a1d5b477429f46da16358

Details:

Command: bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts packages/agentplane/src/cli/run-cli.critical.protected-paths.test.ts packages/agentplane/src/policy/evaluate.test.ts. Result: pass. Evidence: 30 pass, 0 fail, 54 expect calls. Scope: hook pre-commit protected path behavior for ignored and force-staged tasks.json plus existing protected-path coverage.
Command: bun run format:changed. Result: pass. Evidence: All matched files use Prettier code style. Scope: changed code/test formatting.
Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: TypeScript project references.
Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing constraints.
Command: ap doctor. Result: pass. Evidence: doctor (OK), errors=0 warnings=0. Scope: repo-local runtime and workflow health.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281745-F1A522-respect-ignored-tasks-json-in-hooks/.agentplane/tasks/202605281745-F1A522/blueprint/resolved-snapshot.json
- old_digest: d06ada05f5ce05a1168110a271332a96d71e37134ff09796718f4f877403333b
- current_digest: d06ada05f5ce05a1168110a271332a96d71e37134ff09796718f4f877403333b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605281745-F1A522

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
