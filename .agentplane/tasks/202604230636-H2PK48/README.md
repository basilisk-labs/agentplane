---
id: "202604230636-H2PK48"
title: "Fix installed pre-push hook fallback"
result_summary: "Fixed installed CLI pre-push fallback for initialized user repositories."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hooks"
verify:
  - "bun run lint:core -- packages/agentplane/src/commands/hooks packages/agentplane/src/cli/run-cli.core.hooks.test.ts"
  - "bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.hooks.test.ts --pool=threads --maxWorkers 4"
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T06:36:33.711Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T06:45:32.780Z"
  updated_by: "CODER"
  note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.hooks.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 38 tests passed including installed fallback regression. Command: bunx eslint packages/agentplane/src/commands/hooks/run.pre-push.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Evidence: package build completed. Regression: repository without scripts/run-pre-push-hook.mjs executes internal installed CLI fallback and does not emit Missing pre-push hook script."
commit:
  hash: "9a42dbb083d27b82a5a447ecf7e7f5c9ac89da2c"
  message: "🐛 H2PK48 hooks: fix installed pre-push fallback"
comments:
  -
    author: "CODER"
    body: "Start: fixing installed pre-push hook fallback so initialized user repositories can push without framework scripts."
  -
    author: "CODER"
    body: "Verified: installed pre-push fallback works without repository-local framework scripts and focused hook checks passed."
events:
  -
    type: "status"
    at: "2026-04-23T06:36:34.443Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fixing installed pre-push hook fallback so initialized user repositories can push without framework scripts."
  -
    type: "verify"
    at: "2026-04-23T06:45:32.780Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.hooks.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 38 tests passed including installed fallback regression. Command: bunx eslint packages/agentplane/src/commands/hooks/run.pre-push.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Evidence: package build completed. Regression: repository without scripts/run-pre-push-hook.mjs executes internal installed CLI fallback and does not emit Missing pre-push hook script."
  -
    type: "status"
    at: "2026-04-23T06:46:24.220Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: installed pre-push fallback works without repository-local framework scripts and focused hook checks passed."
doc_version: 3
doc_updated_at: "2026-04-23T06:46:24.221Z"
doc_updated_by: "CODER"
description: "Make agentplane hooks run pre-push work in initialized user repositories that do not contain framework scripts/run-pre-push-hook.mjs by using an installed CLI fallback instead of failing usage."
sections:
  Summary: |-
    Fix installed pre-push hook fallback
    
    Make agentplane hooks run pre-push work in initialized user repositories that do not contain framework scripts/run-pre-push-hook.mjs by using an installed CLI fallback instead of failing usage.
  Scope: |-
    - In scope: make `agentplane hooks run pre-push` work from an installed/global CLI in initialized user repositories that do not contain framework `scripts/run-pre-push-hook.mjs`.
    - In scope: preserve repository-local `scripts/run-pre-push-hook.mjs` priority when it exists.
    - In scope: add regression coverage for missing repo script/global-install fallback.
    - Out of scope: changing hook install format or weakening pre-push checks.
  Plan: "Fix installed pre-push hook fallback by keeping repo-local script dispatch when available and adding a bundled/internal fallback for normal initialized user repositories. Regression coverage must prove the user-reported missing `scripts/run-pre-push-hook.mjs` path does not block installed CLI usage."
  Verify Steps: |-
    1. Run `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.hooks.test.ts --pool=threads --maxWorkers 4`. Expected: pass.
    2. Run `bunx eslint packages/agentplane/src/commands/hooks/run.pre-push.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts`. Expected: pass.
    3. Run `bun run --filter=agentplane build`. Expected: pass.
    4. Inspect the missing-repo-script regression. Expected: `hooks run pre-push` no longer fails with `Missing pre-push hook script` when installed fallback is used.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T06:45:32.780Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.hooks.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 38 tests passed including installed fallback regression. Command: bunx eslint packages/agentplane/src/commands/hooks/run.pre-push.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Evidence: package build completed. Regression: repository without scripts/run-pre-push-hook.mjs executes internal installed CLI fallback and does not emit Missing pre-push hook script.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T06:44:52.450Z, excerpt_hash=sha256:01f29a16163545a1a7105c5919d768cbe1d60646a43aa07b5103a57785558a43
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix installed pre-push hook fallback

Make agentplane hooks run pre-push work in initialized user repositories that do not contain framework scripts/run-pre-push-hook.mjs by using an installed CLI fallback instead of failing usage.

## Scope

- In scope: make `agentplane hooks run pre-push` work from an installed/global CLI in initialized user repositories that do not contain framework `scripts/run-pre-push-hook.mjs`.
- In scope: preserve repository-local `scripts/run-pre-push-hook.mjs` priority when it exists.
- In scope: add regression coverage for missing repo script/global-install fallback.
- Out of scope: changing hook install format or weakening pre-push checks.

## Plan

Fix installed pre-push hook fallback by keeping repo-local script dispatch when available and adding a bundled/internal fallback for normal initialized user repositories. Regression coverage must prove the user-reported missing `scripts/run-pre-push-hook.mjs` path does not block installed CLI usage.

## Verify Steps

1. Run `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.hooks.test.ts --pool=threads --maxWorkers 4`. Expected: pass.
2. Run `bunx eslint packages/agentplane/src/commands/hooks/run.pre-push.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts`. Expected: pass.
3. Run `bun run --filter=agentplane build`. Expected: pass.
4. Inspect the missing-repo-script regression. Expected: `hooks run pre-push` no longer fails with `Missing pre-push hook script` when installed fallback is used.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T06:45:32.780Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.hooks.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 38 tests passed including installed fallback regression. Command: bunx eslint packages/agentplane/src/commands/hooks/run.pre-push.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Evidence: package build completed. Regression: repository without scripts/run-pre-push-hook.mjs executes internal installed CLI fallback and does not emit Missing pre-push hook script.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T06:44:52.450Z, excerpt_hash=sha256:01f29a16163545a1a7105c5919d768cbe1d60646a43aa07b5103a57785558a43

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
