---
id: "202603071710-A2MHWZ"
title: "Add runtime source diagnostics"
result_summary: "Added agentplane runtime explain, shared runtime-source resolution, and doctor runtime diagnostics so framework developers can see which binary and package roots are actually active."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202603071710-CJMQZT"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T18:20:32.921Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: add a runtime explain surface and align doctor diagnostics around active binary/source facts before continuing the post-0.3.2 P0 track."
verification:
  state: "ok"
  updated_at: "2026-03-07T18:48:44.524Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified runtime diagnostics end-to-end: bunx vitest run -u packages/agentplane/src/cli/runtime-context.test.ts packages/agentplane/src/shared/runtime-source.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; bun run lint:core -- packages/agentplane/bin/agentplane.js packages/agentplane/bin/runtime-context.js packages/agentplane/src/shared/runtime-source.ts packages/agentplane/src/shared/runtime-source.test.ts packages/agentplane/src/commands/runtime.command.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/run-cli/command-catalog.ts packages/agentplane/src/cli/runtime-context.test.ts; node packages/agentplane/dist/cli.js runtime explain --json; node packages/agentplane/dist/cli.js doctor; node scripts/check-cli-reference-fresh.mjs; bun run docs:site:check; node .agentplane/policy/check-routing.mjs."
commit:
  hash: "52bd51fb4c9c21b965136b2f2d907c3b985e078a"
  message: "🩺 runtime: add explain diagnostics"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: add explicit runtime-source diagnostics so one command can explain which binary is active, where it comes from, and whether the current process is using global install, repo-local handoff, or another runtime source."
  -
    author: "CODER"
    body: "Verified: runtime diagnostics now report the active binary, runtime mode, handoff source when present, resolved agentplane/core package roots, and doctor surfaces the same facts inside the framework checkout."
events:
  -
    type: "status"
    at: "2026-03-07T18:19:59.581Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: add explicit runtime-source diagnostics so one command can explain which binary is active, where it comes from, and whether the current process is using global install, repo-local handoff, or another runtime source."
  -
    type: "verify"
    at: "2026-03-07T18:48:44.524Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Verified runtime diagnostics end-to-end: bunx vitest run -u packages/agentplane/src/cli/runtime-context.test.ts packages/agentplane/src/shared/runtime-source.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; bun run lint:core -- packages/agentplane/bin/agentplane.js packages/agentplane/bin/runtime-context.js packages/agentplane/src/shared/runtime-source.ts packages/agentplane/src/shared/runtime-source.test.ts packages/agentplane/src/commands/runtime.command.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/run-cli/command-catalog.ts packages/agentplane/src/cli/runtime-context.test.ts; node packages/agentplane/dist/cli.js runtime explain --json; node packages/agentplane/dist/cli.js doctor; node scripts/check-cli-reference-fresh.mjs; bun run docs:site:check; node .agentplane/policy/check-routing.mjs."
  -
    type: "status"
    at: "2026-03-07T18:48:44.678Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: runtime diagnostics now report the active binary, runtime mode, handoff source when present, resolved agentplane/core package roots, and doctor surfaces the same facts inside the framework checkout."
doc_version: 2
doc_updated_at: "2026-03-07T18:48:44.678Z"
doc_updated_by: "CODER"
description: "Add a runtime explain surface and doctor diagnostics that show the active binary path, source mode, package versions, and framework source roots."
id_source: "generated"
---
## Summary

Add runtime source diagnostics

Add a runtime explain surface and doctor diagnostics that show the active binary path, source mode, package versions, and framework source roots.

## Scope

- In scope: Add a runtime explain surface and doctor diagnostics that show the active binary path, source mode, package versions, and framework source roots..
- Out of scope: unrelated refactors not required for "Add runtime source diagnostics".

## Plan

1. Define a small runtime-context model that can report the active binary path, whether execution is global or repo-local, the current framework checkout context, and the effective agentplane/core package sources. 2. Expose that model through a new runtime explain CLI surface and add doctor output that points to the same runtime facts when framework-checkout or global-install ambiguity is relevant. 3. Add regression tests for the resolver and CLI output, update docs, and verify with targeted tests plus local docs checks.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T18:48:44.524Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified runtime diagnostics end-to-end: bunx vitest run -u packages/agentplane/src/cli/runtime-context.test.ts packages/agentplane/src/shared/runtime-source.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; bun run lint:core -- packages/agentplane/bin/agentplane.js packages/agentplane/bin/runtime-context.js packages/agentplane/src/shared/runtime-source.ts packages/agentplane/src/shared/runtime-source.test.ts packages/agentplane/src/commands/runtime.command.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/run-cli/command-catalog.ts packages/agentplane/src/cli/runtime-context.test.ts; node packages/agentplane/dist/cli.js runtime explain --json; node packages/agentplane/dist/cli.js doctor; node scripts/check-cli-reference-fresh.mjs; bun run docs:site:check; node .agentplane/policy/check-routing.mjs.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T18:20:25.140Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
