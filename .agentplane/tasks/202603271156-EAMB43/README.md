---
id: "202603271156-EAMB43"
title: "Make framework dev bootstrap first-class"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "bootstrap"
  - "developer-experience"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-27T11:57:42.242Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-27T12:10:50.112Z"
  updated_by: "CODER"
  note: "Implemented a first-class framework dev bootstrap contract and verified it on a fresh worktree."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make fresh framework clones and worktrees self-bootstrap into a repo-local runtime contract, then repoint wrapper/runtime/doctor/local-CI to that canonical bootstrap surface."
events:
  -
    type: "status"
    at: "2026-03-27T12:04:49.265Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make fresh framework clones and worktrees self-bootstrap into a repo-local runtime contract, then repoint wrapper/runtime/doctor/local-CI to that canonical bootstrap surface."
  -
    type: "verify"
    at: "2026-03-27T12:10:50.112Z"
    author: "CODER"
    state: "ok"
    note: "Implemented a first-class framework dev bootstrap contract and verified it on a fresh worktree."
doc_version: 3
doc_updated_at: "2026-03-27T12:10:50.115Z"
doc_updated_by: "CODER"
description: "Establish a deterministic repo-local development runtime for the framework itself so fresh clones and worktrees can run lifecycle commands, hooks, tests, and local CLI flows without manual dist symlinks, package-level node_modules wiring, or stale-dist overrides. Keep installed/PATH agentplane as a separate smoke and compatibility path, not the default inner-loop runtime."
sections:
  Summary: |-
    Make framework dev bootstrap first-class
    
    Establish a deterministic repo-local development runtime for the framework itself so fresh clones and worktrees can run lifecycle commands, hooks, tests, and local CLI flows without manual dist symlinks, package-level node_modules wiring, or stale-dist overrides. Keep installed/PATH agentplane as a separate smoke and compatibility path, not the default inner-loop runtime.
  Scope: |-
    - In scope: Establish a deterministic repo-local development runtime for the framework itself so fresh clones and worktrees can run lifecycle commands, hooks, tests, and local CLI flows without manual dist symlinks, package-level node_modules wiring, or stale-dist overrides. Keep installed/PATH agentplane as a separate smoke and compatibility path, not the default inner-loop runtime.
    - Out of scope: unrelated refactors not required for "Make framework dev bootstrap first-class".
  Plan: |-
    1. Reproduce the fresh framework-clone failure modes for missing dist, missing workspace dependencies, and stale-build gating so the bootstrap contract targets the real breakpoints rather than an abstract setup checklist.
    2. Introduce one canonical framework-dev bootstrap surface that prepares repo-local dependencies, required submodule state, and build output for local framework development without depending on the installed global agentplane binary.
    3. Repoint runtime handoff, stale-build recovery, doctor guidance, and the relevant docs/tests to that bootstrap contract so fresh clone guidance, hook behavior, and local CI no longer rely on stale-dist overrides or ad hoc manual repair paths.
  Verify Steps: |-
    1. From a fresh framework checkout without dist, the installed wrapper and runtime guidance point to one canonical bootstrap command instead of scattered manual repair steps or AGENTPLANE_DEV_ALLOW_STALE_DIST=1. Expected: wrapper, runtime explain, and doctor all reference the same bootstrap surface.
    2. The canonical bootstrap command can prepare a fresh framework clone or worktree for local development without relying on the globally installed runtime for actual execution. Expected: it establishes dependencies, any required repo-local prerequisites, and build output, then validates the repo-local runtime.
    3. Automated coverage proves the bootstrap contract and its guidance. Expected: targeted script/runtime tests plus the relevant build/docs/local-CI checks pass, and any residual manual step is called out explicitly in Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-27T12:10:50.112Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented a first-class framework dev bootstrap contract and verified it on a fresh worktree.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T12:10:48.656Z, excerpt_hash=sha256:05aa9c5552c81ae109d0bdc70f24731f77b9f22e916b7b529c1dbeeb4ffd9e3a
    
    Details:
    
    Checks run:
    - bun run framework:dev:bootstrap
    - bun run --filter=@agentplaneorg/core build
    - bun run --filter=agentplane build
    - bunx vitest run packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/shared/repo-cli-version.test.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/doctor.fast.test.ts packages/agentplane/src/cli/repo-local-handoff.test.ts packages/agentplane/src/commands/doctor.command.test.ts
    - bun run docs:cli:check
    - bun run docs:bootstrap:check
    - bun run docs:recipes:generate
    - bun run docs:recipes:check
    - bunx prettier --check scripts/bootstrap-framework-dev.mjs packages/agentplane/bin/framework-dev-contract.js packages/agentplane/bin/framework-dev-contract.d.ts packages/agentplane/src/commands/runtime.command.ts packages/agentplane/src/shared/repo-cli-version.ts packages/agentplane/src/commands/doctor/runtime.ts scripts/run-local-ci.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/shared/repo-cli-version.test.ts packages/agentplane/src/cli/repo-local-handoff.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts scripts/check-agent-bootstrap-fresh.mjs docs/help/troubleshooting.mdx docs/developer/testing-and-quality.mdx docs/user/commands.mdx scripts/bootstrap-framework-dev.d.ts
    - bunx eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/commands/runtime.command.ts packages/agentplane/src/shared/repo-cli-version.ts packages/agentplane/src/commands/doctor/runtime.ts scripts/run-local-ci.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/shared/repo-cli-version.test.ts packages/agentplane/src/cli/repo-local-handoff.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts scripts/check-agent-bootstrap-fresh.mjs
    - bun run ci:local:fast
    Outcome:
    - fresh framework worktree can bootstrap itself without manual dist symlinks or stale-dist overrides
    - wrapper/runtime explain/doctor now converge on one bootstrap command
    - local CI no longer depends on AGENTPLANE_DEV_ALLOW_STALE_DIST=1 for CLI docs freshness
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    1. A fresh framework clone failed before any owner-scoped lifecycle command because the installed PATH wrapper immediately handed off to a missing repo-local dist. That means framework development needs an explicit bootstrap contract before task work can even start.
    2. Fresh clones were missing three separate prerequisites, not one: workspace dependencies, built dist output, and an initialized recipes submodule. Treating this as just a build problem would have left fresh worktrees half-broken.
    3. The superproject gitlink for agentplane-recipes was pinned to 770738b0b35857b08c38756aab1f80f209ca19b3, which is not available on the remote. The bootstrap contract therefore also needed the repo to move the gitlink to the reachable remote main commit 021c99bc8527220bf9339872903cf30105adea97.
    4. scripts/run-local-ci.mjs carried a hidden AGENTPLANE_DEV_ALLOW_STALE_DIST=1 escape hatch for docs:cli:check. That masked the real process gap instead of fixing it; the override is now removed.
    5. Residual constraint: a brand-new framework clone still needs one explicit bootstrap step, bun run framework:dev:bootstrap, before normal repo-local lifecycle commands. This task makes that step canonical and documented; it does not auto-install or auto-build on every CLI invocation.
id_source: "generated"
---
## Summary

Make framework dev bootstrap first-class

Establish a deterministic repo-local development runtime for the framework itself so fresh clones and worktrees can run lifecycle commands, hooks, tests, and local CLI flows without manual dist symlinks, package-level node_modules wiring, or stale-dist overrides. Keep installed/PATH agentplane as a separate smoke and compatibility path, not the default inner-loop runtime.

## Scope

- In scope: Establish a deterministic repo-local development runtime for the framework itself so fresh clones and worktrees can run lifecycle commands, hooks, tests, and local CLI flows without manual dist symlinks, package-level node_modules wiring, or stale-dist overrides. Keep installed/PATH agentplane as a separate smoke and compatibility path, not the default inner-loop runtime.
- Out of scope: unrelated refactors not required for "Make framework dev bootstrap first-class".

## Plan

1. Reproduce the fresh framework-clone failure modes for missing dist, missing workspace dependencies, and stale-build gating so the bootstrap contract targets the real breakpoints rather than an abstract setup checklist.
2. Introduce one canonical framework-dev bootstrap surface that prepares repo-local dependencies, required submodule state, and build output for local framework development without depending on the installed global agentplane binary.
3. Repoint runtime handoff, stale-build recovery, doctor guidance, and the relevant docs/tests to that bootstrap contract so fresh clone guidance, hook behavior, and local CI no longer rely on stale-dist overrides or ad hoc manual repair paths.

## Verify Steps

1. From a fresh framework checkout without dist, the installed wrapper and runtime guidance point to one canonical bootstrap command instead of scattered manual repair steps or AGENTPLANE_DEV_ALLOW_STALE_DIST=1. Expected: wrapper, runtime explain, and doctor all reference the same bootstrap surface.
2. The canonical bootstrap command can prepare a fresh framework clone or worktree for local development without relying on the globally installed runtime for actual execution. Expected: it establishes dependencies, any required repo-local prerequisites, and build output, then validates the repo-local runtime.
3. Automated coverage proves the bootstrap contract and its guidance. Expected: targeted script/runtime tests plus the relevant build/docs/local-CI checks pass, and any residual manual step is called out explicitly in Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-27T12:10:50.112Z — VERIFY — ok

By: CODER

Note: Implemented a first-class framework dev bootstrap contract and verified it on a fresh worktree.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T12:10:48.656Z, excerpt_hash=sha256:05aa9c5552c81ae109d0bdc70f24731f77b9f22e916b7b529c1dbeeb4ffd9e3a

Details:

Checks run:
- bun run framework:dev:bootstrap
- bun run --filter=@agentplaneorg/core build
- bun run --filter=agentplane build
- bunx vitest run packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/shared/repo-cli-version.test.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/doctor.fast.test.ts packages/agentplane/src/cli/repo-local-handoff.test.ts packages/agentplane/src/commands/doctor.command.test.ts
- bun run docs:cli:check
- bun run docs:bootstrap:check
- bun run docs:recipes:generate
- bun run docs:recipes:check
- bunx prettier --check scripts/bootstrap-framework-dev.mjs packages/agentplane/bin/framework-dev-contract.js packages/agentplane/bin/framework-dev-contract.d.ts packages/agentplane/src/commands/runtime.command.ts packages/agentplane/src/shared/repo-cli-version.ts packages/agentplane/src/commands/doctor/runtime.ts scripts/run-local-ci.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/shared/repo-cli-version.test.ts packages/agentplane/src/cli/repo-local-handoff.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts scripts/check-agent-bootstrap-fresh.mjs docs/help/troubleshooting.mdx docs/developer/testing-and-quality.mdx docs/user/commands.mdx scripts/bootstrap-framework-dev.d.ts
- bunx eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/commands/runtime.command.ts packages/agentplane/src/shared/repo-cli-version.ts packages/agentplane/src/commands/doctor/runtime.ts scripts/run-local-ci.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/shared/repo-cli-version.test.ts packages/agentplane/src/cli/repo-local-handoff.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts scripts/check-agent-bootstrap-fresh.mjs
- bun run ci:local:fast
Outcome:
- fresh framework worktree can bootstrap itself without manual dist symlinks or stale-dist overrides
- wrapper/runtime explain/doctor now converge on one bootstrap command
- local CI no longer depends on AGENTPLANE_DEV_ALLOW_STALE_DIST=1 for CLI docs freshness

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. A fresh framework clone failed before any owner-scoped lifecycle command because the installed PATH wrapper immediately handed off to a missing repo-local dist. That means framework development needs an explicit bootstrap contract before task work can even start.
2. Fresh clones were missing three separate prerequisites, not one: workspace dependencies, built dist output, and an initialized recipes submodule. Treating this as just a build problem would have left fresh worktrees half-broken.
3. The superproject gitlink for agentplane-recipes was pinned to 770738b0b35857b08c38756aab1f80f209ca19b3, which is not available on the remote. The bootstrap contract therefore also needed the repo to move the gitlink to the reachable remote main commit 021c99bc8527220bf9339872903cf30105adea97.
4. scripts/run-local-ci.mjs carried a hidden AGENTPLANE_DEV_ALLOW_STALE_DIST=1 escape hatch for docs:cli:check. That masked the real process gap instead of fixing it; the override is now removed.
5. Residual constraint: a brand-new framework clone still needs one explicit bootstrap step, bun run framework:dev:bootstrap, before normal repo-local lifecycle commands. This task makes that step canonical and documented; it does not auto-install or auto-build on every CLI invocation.
