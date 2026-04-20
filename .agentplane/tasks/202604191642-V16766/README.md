---
id: "202604191642-V16766"
title: "Adopt tsup and subpath exports for core packages"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "build"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T14:16:18.888Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T14:36:48.971Z"
  updated_by: "CODER"
  note: "Command: bun run build; Result: pass; Evidence: root build completed tsc -b plus core/recipes tsup bundle phases. Command: bun run lint:core; Result: pass; Evidence: ESLint completed without findings. Command: bun run test:core; Result: pass; Evidence: 18 files / 152 tests passed. Command: bun run test:recipes; Result: pass; Evidence: 2 files / 5 tests passed. Command: bunx vitest run packages/agentplane/src/cli/repo-local-handoff.test.ts; Result: pass; Evidence: 7 tests passed, including conditional export resolution. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: repo-local runtime OK with info-only archive findings. Command: npm pack --dry-run --json in packages/core and packages/recipes; Result: pass; Evidence: core tarball 44.7 KB / unpacked 352.5 KB versus tsc-only baseline 51.1 KB / 415.1 KB; recipes tarball 10.3 KB / unpacked 40.8 KB versus tsc-only baseline 11.2 KB / 60.2 KB. Command: workspace package subpath import smoke; Result: pass; Evidence: @agentplaneorg/core root plus fs/git/logger/process/schemas/tasks and @agentplaneorg/recipes import successfully from package context. Scope: tsup build configs, package exports, package manifests, lockfile, core entry barrels, repo-local export regression test."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Adding tsup build configs and subpath exports for core and recipes while preserving tsc typecheck and release parity behavior."
events:
  -
    type: "status"
    at: "2026-04-20T14:16:25.796Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding tsup build configs and subpath exports for core and recipes while preserving tsc typecheck and release parity behavior."
  -
    type: "verify"
    at: "2026-04-20T14:36:48.971Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run build; Result: pass; Evidence: root build completed tsc -b plus core/recipes tsup bundle phases. Command: bun run lint:core; Result: pass; Evidence: ESLint completed without findings. Command: bun run test:core; Result: pass; Evidence: 18 files / 152 tests passed. Command: bun run test:recipes; Result: pass; Evidence: 2 files / 5 tests passed. Command: bunx vitest run packages/agentplane/src/cli/repo-local-handoff.test.ts; Result: pass; Evidence: 7 tests passed, including conditional export resolution. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: repo-local runtime OK with info-only archive findings. Command: npm pack --dry-run --json in packages/core and packages/recipes; Result: pass; Evidence: core tarball 44.7 KB / unpacked 352.5 KB versus tsc-only baseline 51.1 KB / 415.1 KB; recipes tarball 10.3 KB / unpacked 40.8 KB versus tsc-only baseline 11.2 KB / 60.2 KB. Command: workspace package subpath import smoke; Result: pass; Evidence: @agentplaneorg/core root plus fs/git/logger/process/schemas/tasks and @agentplaneorg/recipes import successfully from package context. Scope: tsup build configs, package exports, package manifests, lockfile, core entry barrels, repo-local export regression test."
doc_version: 3
doc_updated_at: "2026-04-20T14:36:48.978Z"
doc_updated_by: "CODER"
description: "Epic K and I′. Introduce tsup builds and subpath exports for core and recipes where they improve package shape and tree shaking."
sections:
  Summary: |-
    Adopt tsup and subpath exports for core packages
    
    Epic K and I′. Introduce tsup builds and subpath exports for core and recipes where they improve package shape and tree shaking.
  Scope: |-
    - In scope: Epic K and I′. Introduce tsup builds and subpath exports for core and recipes where they improve package shape and tree shaking.
    - Out of scope: unrelated refactors not required for "Adopt tsup and subpath exports for core packages".
  Plan: "Adopt tsup only for publishable library packages: add tsup config for @agentplaneorg/core and @agentplaneorg/recipes, expose core subpath exports for git/fs/logger/schemas/tasks/process, keep the root tsc build/typecheck contract green, and verify generated dist plus release parity. Network/package-lock changes are expected only for the tsup dev dependency."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T14:36:48.971Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run build; Result: pass; Evidence: root build completed tsc -b plus core/recipes tsup bundle phases. Command: bun run lint:core; Result: pass; Evidence: ESLint completed without findings. Command: bun run test:core; Result: pass; Evidence: 18 files / 152 tests passed. Command: bun run test:recipes; Result: pass; Evidence: 2 files / 5 tests passed. Command: bunx vitest run packages/agentplane/src/cli/repo-local-handoff.test.ts; Result: pass; Evidence: 7 tests passed, including conditional export resolution. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: repo-local runtime OK with info-only archive findings. Command: npm pack --dry-run --json in packages/core and packages/recipes; Result: pass; Evidence: core tarball 44.7 KB / unpacked 352.5 KB versus tsc-only baseline 51.1 KB / 415.1 KB; recipes tarball 10.3 KB / unpacked 40.8 KB versus tsc-only baseline 11.2 KB / 60.2 KB. Command: workspace package subpath import smoke; Result: pass; Evidence: @agentplaneorg/core root plus fs/git/logger/process/schemas/tasks and @agentplaneorg/recipes import successfully from package context. Scope: tsup build configs, package exports, package manifests, lockfile, core entry barrels, repo-local export regression test.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T14:16:25.810Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Adopt tsup and subpath exports for core packages

Epic K and I′. Introduce tsup builds and subpath exports for core and recipes where they improve package shape and tree shaking.

## Scope

- In scope: Epic K and I′. Introduce tsup builds and subpath exports for core and recipes where they improve package shape and tree shaking.
- Out of scope: unrelated refactors not required for "Adopt tsup and subpath exports for core packages".

## Plan

Adopt tsup only for publishable library packages: add tsup config for @agentplaneorg/core and @agentplaneorg/recipes, expose core subpath exports for git/fs/logger/schemas/tasks/process, keep the root tsc build/typecheck contract green, and verify generated dist plus release parity. Network/package-lock changes are expected only for the tsup dev dependency.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T14:36:48.971Z — VERIFY — ok

By: CODER

Note: Command: bun run build; Result: pass; Evidence: root build completed tsc -b plus core/recipes tsup bundle phases. Command: bun run lint:core; Result: pass; Evidence: ESLint completed without findings. Command: bun run test:core; Result: pass; Evidence: 18 files / 152 tests passed. Command: bun run test:recipes; Result: pass; Evidence: 2 files / 5 tests passed. Command: bunx vitest run packages/agentplane/src/cli/repo-local-handoff.test.ts; Result: pass; Evidence: 7 tests passed, including conditional export resolution. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: repo-local runtime OK with info-only archive findings. Command: npm pack --dry-run --json in packages/core and packages/recipes; Result: pass; Evidence: core tarball 44.7 KB / unpacked 352.5 KB versus tsc-only baseline 51.1 KB / 415.1 KB; recipes tarball 10.3 KB / unpacked 40.8 KB versus tsc-only baseline 11.2 KB / 60.2 KB. Command: workspace package subpath import smoke; Result: pass; Evidence: @agentplaneorg/core root plus fs/git/logger/process/schemas/tasks and @agentplaneorg/recipes import successfully from package context. Scope: tsup build configs, package exports, package manifests, lockfile, core entry barrels, repo-local export regression test.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T14:16:25.810Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
