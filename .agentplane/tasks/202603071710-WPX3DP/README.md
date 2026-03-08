---
id: "202603071710-WPX3DP"
title: "Make framework dev mode first-class"
result_summary: "Made framework development workflow explicit inside runtime diagnostics."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202603071710-Y4YT4P"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T19:50:10.070Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-07T19:53:17.382Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/commands/runtime.command.test.ts; Result: pass; Evidence: 4 runtime-command tests passed, including new framework-dev workflow coverage in JSON/text output. Scope: runtime diagnostics surface. Command: bun run lint:core -- packages/agentplane/src/commands/runtime.command.ts packages/agentplane/src/commands/runtime.command.test.ts; Result: pass; Evidence: eslint clean on the runtime workflow implementation and tests. Scope: touched runtime code. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0 on the implementation commit. Scope: updated runtime bundle. Command: node packages/agentplane/dist/cli.js runtime explain --json; Result: pass; Evidence: output now includes frameworkDev.available=true with rebuildCommands, reinstallScript, verifyCommand, forceGlobalExample, and recommendation fields. Scope: real runtime explain output. Command: bun run --cwd website build; Result: pass; Evidence: docs site still builds after the framework-dev workflow docs sync. Scope: touched docs surfaces."
commit:
  hash: "fefc1d994cc7a7164c21be99c50a4cfcbf3d1391"
  message: "🛠 WPX3DP code: make framework dev workflow explicit"
comments:
  -
    author: "CODER"
    body: "Start: turn runtime explain into the canonical framework-dev workflow surface for rebuild, reinstall, verify, and optional global override."
  -
    author: "CODER"
    body: "Verified: runtime explain is now the explicit framework-dev workflow surface for rebuild, reinstall, verify, and optional global override."
events:
  -
    type: "status"
    at: "2026-03-07T19:50:17.186Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: turn runtime explain into the canonical framework-dev workflow surface for rebuild, reinstall, verify, and optional global override."
  -
    type: "verify"
    at: "2026-03-07T19:53:17.382Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/runtime.command.test.ts; Result: pass; Evidence: 4 runtime-command tests passed, including new framework-dev workflow coverage in JSON/text output. Scope: runtime diagnostics surface. Command: bun run lint:core -- packages/agentplane/src/commands/runtime.command.ts packages/agentplane/src/commands/runtime.command.test.ts; Result: pass; Evidence: eslint clean on the runtime workflow implementation and tests. Scope: touched runtime code. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0 on the implementation commit. Scope: updated runtime bundle. Command: node packages/agentplane/dist/cli.js runtime explain --json; Result: pass; Evidence: output now includes frameworkDev.available=true with rebuildCommands, reinstallScript, verifyCommand, forceGlobalExample, and recommendation fields. Scope: real runtime explain output. Command: bun run --cwd website build; Result: pass; Evidence: docs site still builds after the framework-dev workflow docs sync. Scope: touched docs surfaces."
  -
    type: "status"
    at: "2026-03-07T19:53:45.733Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: runtime explain is now the explicit framework-dev workflow surface for rebuild, reinstall, verify, and optional global override."
doc_version: 3
doc_updated_at: "2026-03-07T19:53:45.733Z"
doc_updated_by: "CODER"
description: "Unify repo-local runtime, rebuild, reinstall, and framework debugging into an explicit framework development mode or workflow."
id_source: "generated"
---
## Summary

Make framework dev mode first-class

Unify repo-local runtime, rebuild, reinstall, and framework debugging into an explicit framework development mode or workflow.

## Scope

- In scope: Unify repo-local runtime, rebuild, reinstall, and framework debugging into an explicit framework development mode or workflow..
- Out of scope: unrelated refactors not required for "Make framework dev mode first-class".

## Plan

1. Extend runtime explain into an explicit framework-development workflow surface: keep runtime facts, but add canonical rebuild, reinstall, verify, and optional force-global steps when running inside the framework checkout. 2. Cover the new workflow surface in runtime.command tests and sync the framework-development docs that currently describe these steps in scattered form. 3. Run targeted runtime tests, lint touched runtime/docs files, rebuild agentplane, and validate the rendered runtime explain output from dist.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
1. `bunx vitest run packages/agentplane/src/commands/runtime.command.test.ts`
2. `bun run lint:core -- packages/agentplane/src/commands/runtime.command.ts packages/agentplane/src/commands/runtime.command.test.ts`
3. `bun run lint:core -- scripts/reinstall-global-agentplane.sh scripts/verify-global-agentplane-install.mjs`
4. `bun run --filter=agentplane build`
5. `node packages/agentplane/dist/cli.js runtime explain --json`

### Evidence / Commands
- Record whether runtime explain now emits a first-class framework-dev workflow with rebuild, reinstall, verify, and optional force-global guidance.

### Pass criteria
- Framework-checkout runtime output includes the explicit dev workflow.
- Existing runtime facts remain visible.
- Targeted tests, lint, and build pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T19:53:17.382Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/runtime.command.test.ts; Result: pass; Evidence: 4 runtime-command tests passed, including new framework-dev workflow coverage in JSON/text output. Scope: runtime diagnostics surface. Command: bun run lint:core -- packages/agentplane/src/commands/runtime.command.ts packages/agentplane/src/commands/runtime.command.test.ts; Result: pass; Evidence: eslint clean on the runtime workflow implementation and tests. Scope: touched runtime code. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0 on the implementation commit. Scope: updated runtime bundle. Command: node packages/agentplane/dist/cli.js runtime explain --json; Result: pass; Evidence: output now includes frameworkDev.available=true with rebuildCommands, reinstallScript, verifyCommand, forceGlobalExample, and recommendation fields. Scope: real runtime explain output. Command: bun run --cwd website build; Result: pass; Evidence: docs site still builds after the framework-dev workflow docs sync. Scope: touched docs surfaces.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T19:50:17.186Z, excerpt_hash=sha256:6ab42352c04df84163172a85a39c23a591d554a25ca914ead13e90ab1793eb17

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Keep the change inside the existing runtime diagnostics surface; do not create a broad new subsystem.
- The workflow must be explicit enough for framework contributors but should not leak unreleased beta-version semantics into public output.
- Prefer one canonical path over scattered prose: rebuild, reinstall helper, runtime verify, optional force-global.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
