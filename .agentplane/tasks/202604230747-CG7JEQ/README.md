---
id: "202604230747-CG7JEQ"
title: "Make installed hooks self-contained for clean projects"
result_summary: "Made installed hooks self-contained for clean user projects."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hooks"
  - "install"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T07:47:22.330Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T07:52:00.421Z"
  updated_by: "CODER"
  note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.hooks.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 40 tests passed including installed fallback, missing project scripts, and clean release-mode regressions. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 24 tests passed. Command: bunx eslint packages/agentplane/src/commands/hooks/install.ts packages/agentplane/src/commands/hooks/run.pre-push.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Command: bun pm pack --dry-run --ignore-scripts --quiet in packages/agentplane, packages/core, packages/recipes; Result: pass; Evidence: tarball names emitted for all publish packages. Inspection: hook shim now captures installed runner path and npx fallback is opt-in via AGENTPLANE_HOOK_ALLOW_NPX; installed pre-push fallback skips missing project scripts/framework release scripts instead of blocking clean repositories."
commit:
  hash: "b330c72a569f4fbe39f0cacd36bd9e40a437488a"
  message: "🐛 CG7JEQ hooks: make installed hooks self-contained"
comments:
  -
    author: "CODER"
    body: "Start: hardening installed hooks so clean initialized repositories can push without framework scripts or project-local CI scripts."
  -
    author: "CODER"
    body: "Verified: installed hooks now work in clean initialized repositories without framework scripts, missing project CI scripts, or default npx fallback."
events:
  -
    type: "status"
    at: "2026-04-23T07:47:26.454Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: hardening installed hooks so clean initialized repositories can push without framework scripts or project-local CI scripts."
  -
    type: "verify"
    at: "2026-04-23T07:52:00.421Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.hooks.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 40 tests passed including installed fallback, missing project scripts, and clean release-mode regressions. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 24 tests passed. Command: bunx eslint packages/agentplane/src/commands/hooks/install.ts packages/agentplane/src/commands/hooks/run.pre-push.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Command: bun pm pack --dry-run --ignore-scripts --quiet in packages/agentplane, packages/core, packages/recipes; Result: pass; Evidence: tarball names emitted for all publish packages. Inspection: hook shim now captures installed runner path and npx fallback is opt-in via AGENTPLANE_HOOK_ALLOW_NPX; installed pre-push fallback skips missing project scripts/framework release scripts instead of blocking clean repositories."
  -
    type: "status"
    at: "2026-04-23T07:52:09.570Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: installed hooks now work in clean initialized repositories without framework scripts, missing project CI scripts, or default npx fallback."
doc_version: 3
doc_updated_at: "2026-04-23T07:52:09.571Z"
doc_updated_by: "CODER"
description: "Audit and harden the installed AgentPlane package path so init-installed hooks work in clean user repositories without framework scripts or project-local CI scripts."
sections:
  Summary: |-
    Make installed hooks self-contained for clean projects
    
    Audit and harden the installed AgentPlane package path so init-installed hooks work in clean user repositories without framework scripts or project-local CI scripts.
  Scope: |-
    - In scope: Audit and harden the installed AgentPlane package path so init-installed hooks work in clean user repositories without framework scripts or project-local CI scripts.
    - Out of scope: unrelated refactors not required for "Make installed hooks self-contained for clean projects".
  Plan: |-
    Goal: make the npm-installed AgentPlane CLI and hooks usable in any clean initialized user project without requiring framework checkout scripts or project-defined CI scripts.
    
    Scope:
    1. Harden the installed pre-push fallback so missing project scripts are skipped with explicit messages instead of blocking push. Preserve repo-local scripts/run-pre-push-hook.mjs priority for framework/custom repos.
    2. Harden hook shim installation so hooks can call the exact installed CLI binary captured at install time before relying on PATH. Avoid network/npx as the default hook recovery path.
    3. Add regression coverage for clean initialized repositories: hooks install writes a self-contained runner reference, pre-push succeeds when package.json/scripts are absent, and release/tag pre-push does not require framework release scripts.
    4. Verify focused hooks suite, focused init/hook coverage, targeted lint, and package build.
    
    Out of scope: publishing a new npm version in this task.
  Verify Steps: |-
    1. Run `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.hooks.test.ts --pool=threads --maxWorkers 4`. Expected: pass, including clean-project installed hook fallback regressions.
    2. Run `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts --pool=threads --maxWorkers 4`. Expected: pass for init hook installation surface.
    3. Run `bunx eslint packages/agentplane/src/commands/hooks/install.ts packages/agentplane/src/commands/hooks/run.pre-push.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts`. Expected: pass.
    4. Run `bun run --filter=agentplane build`. Expected: pass.
    5. Inspect hook shim and clean pre-push behavior. Expected: installed hooks do not require framework scripts, missing project CI scripts, or npx network fallback for normal operation.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T07:52:00.421Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.hooks.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 40 tests passed including installed fallback, missing project scripts, and clean release-mode regressions. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 24 tests passed. Command: bunx eslint packages/agentplane/src/commands/hooks/install.ts packages/agentplane/src/commands/hooks/run.pre-push.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Command: bun pm pack --dry-run --ignore-scripts --quiet in packages/agentplane, packages/core, packages/recipes; Result: pass; Evidence: tarball names emitted for all publish packages. Inspection: hook shim now captures installed runner path and npx fallback is opt-in via AGENTPLANE_HOOK_ALLOW_NPX; installed pre-push fallback skips missing project scripts/framework release scripts instead of blocking clean repositories.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T07:47:26.460Z, excerpt_hash=sha256:b8bb99a5e217b381225da29d83083adbde5cff613da376e583947f0b26010796
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make installed hooks self-contained for clean projects

Audit and harden the installed AgentPlane package path so init-installed hooks work in clean user repositories without framework scripts or project-local CI scripts.

## Scope

- In scope: Audit and harden the installed AgentPlane package path so init-installed hooks work in clean user repositories without framework scripts or project-local CI scripts.
- Out of scope: unrelated refactors not required for "Make installed hooks self-contained for clean projects".

## Plan

Goal: make the npm-installed AgentPlane CLI and hooks usable in any clean initialized user project without requiring framework checkout scripts or project-defined CI scripts.

Scope:
1. Harden the installed pre-push fallback so missing project scripts are skipped with explicit messages instead of blocking push. Preserve repo-local scripts/run-pre-push-hook.mjs priority for framework/custom repos.
2. Harden hook shim installation so hooks can call the exact installed CLI binary captured at install time before relying on PATH. Avoid network/npx as the default hook recovery path.
3. Add regression coverage for clean initialized repositories: hooks install writes a self-contained runner reference, pre-push succeeds when package.json/scripts are absent, and release/tag pre-push does not require framework release scripts.
4. Verify focused hooks suite, focused init/hook coverage, targeted lint, and package build.

Out of scope: publishing a new npm version in this task.

## Verify Steps

1. Run `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.hooks.test.ts --pool=threads --maxWorkers 4`. Expected: pass, including clean-project installed hook fallback regressions.
2. Run `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts --pool=threads --maxWorkers 4`. Expected: pass for init hook installation surface.
3. Run `bunx eslint packages/agentplane/src/commands/hooks/install.ts packages/agentplane/src/commands/hooks/run.pre-push.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts`. Expected: pass.
4. Run `bun run --filter=agentplane build`. Expected: pass.
5. Inspect hook shim and clean pre-push behavior. Expected: installed hooks do not require framework scripts, missing project CI scripts, or npx network fallback for normal operation.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T07:52:00.421Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.hooks.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 40 tests passed including installed fallback, missing project scripts, and clean release-mode regressions. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 24 tests passed. Command: bunx eslint packages/agentplane/src/commands/hooks/install.ts packages/agentplane/src/commands/hooks/run.pre-push.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Command: bun pm pack --dry-run --ignore-scripts --quiet in packages/agentplane, packages/core, packages/recipes; Result: pass; Evidence: tarball names emitted for all publish packages. Inspection: hook shim now captures installed runner path and npx fallback is opt-in via AGENTPLANE_HOOK_ALLOW_NPX; installed pre-push fallback skips missing project scripts/framework release scripts instead of blocking clean repositories.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T07:47:26.460Z, excerpt_hash=sha256:b8bb99a5e217b381225da29d83083adbde5cff613da376e583947f0b26010796

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
