---
id: "202603061143-XDYEGQ"
title: "Sync docs with code and define v0.3 readiness"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T13:02:19.913Z"
  updated_by: "ORCHESTRATOR"
  note: "Re-approved after npm confirmed 0.3.0 is burned; release retargeted to 0.3.1 with website/docs completion and publish recovery."
verification:
  state: "ok"
  updated_at: "2026-03-06T13:20:54.053Z"
  updated_by: "CODER"
  note: "Command: node .agentplane/policy/check-routing.mjs; node scripts/check-cli-reference-fresh.mjs; git diff -- docs/user/setup.mdx docs/user/commands.mdx docs/help/troubleshooting.mdx docs/reference/generated-reference.mdx packages/agentplane/bin/agentplane.js packages/agentplane/bin/dist-guard.js packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/workflow-runtime/build.ts. Result: pass. Evidence: docs/code sync and release-readiness classification were completed; the blocked 0.3.x npm path is now explicitly understood and follow-up work was separated from site work. Scope: docs sync, stale-dist/doctor/workflow readiness analysis."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: align setup and preflight documentation with current CLI behavior, then verify docs and classify remaining release blockers for v0.3.0."
events:
  -
    type: "status"
    at: "2026-03-06T11:43:45.989Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: align setup and preflight documentation with current CLI behavior, then verify docs and classify remaining release blockers for v0.3.0."
  -
    type: "verify"
    at: "2026-03-06T11:46:55.717Z"
    author: "ORCHESTRATOR"
    state: "needs_rework"
    note: "Routing check passed and CLI docs freshness check passed after syncing setup/preflight documentation, but agentplane doctor timed out after 30s, so release-readiness verification remains incomplete."
  -
    type: "verify"
    at: "2026-03-06T11:57:31.514Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Implemented path-aware stale-dist guard with tests, aligned doctor behavior for historical task metadata, published .agentplane/WORKFLOW.md, and passed release-grade checks: doctor (warnings only), routing, CLI docs freshness, lint, and targeted CLI tests."
  -
    type: "verify"
    at: "2026-03-06T12:09:05.699Z"
    author: "CODER"
    state: "ok"
    note: "Removed repo-root path leakage from generated workflow artifacts; generated-reference now renders private packages as internal instead of 0.0.0. Verified: bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; bunx vitest run packages/agentplane/src/workflow-runtime/build.test.ts packages/agentplane/src/commands/doctor.command.test.ts --hookTimeout 60000 --testTimeout 60000; node packages/agentplane/dist/cli.js workflow build --validate; node packages/agentplane/dist/cli.js doctor; node .agentplane/policy/check-routing.mjs; node scripts/check-cli-reference-fresh.mjs; bun run lint:core -- packages/agentplane/src/workflow-runtime/build.ts packages/agentplane/src/commands/workflow-build.command.ts packages/agentplane/src/cli/run-cli/commands/init/write-workflow.ts packages/agentplane/src/workflow-runtime/build.test.ts packages/agentplane/src/commands/doctor.command.test.ts scripts/generate-website-docs.mjs"
  -
    type: "verify"
    at: "2026-03-06T13:20:54.053Z"
    author: "CODER"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs; node scripts/check-cli-reference-fresh.mjs; git diff -- docs/user/setup.mdx docs/user/commands.mdx docs/help/troubleshooting.mdx docs/reference/generated-reference.mdx packages/agentplane/bin/agentplane.js packages/agentplane/bin/dist-guard.js packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/workflow-runtime/build.ts. Result: pass. Evidence: docs/code sync and release-readiness classification were completed; the blocked 0.3.x npm path is now explicitly understood and follow-up work was separated from site work. Scope: docs sync, stale-dist/doctor/workflow readiness analysis."
doc_version: 2
doc_updated_at: "2026-03-06T13:20:54.054Z"
doc_updated_by: "CODER"
description: "Align setup/init docs with actual CLI behavior, assess stale-dist preflight behavior, and classify the blocked 0.3.x release path after the burned npm 0.3.0 version."
id_source: "generated"
---
## Summary

Sync docs with code and define v0.3 readiness

Align setup/init docs with actual CLI behavior, assess stale-dist preflight behavior, and classify 0.3.0 vs 0.3.1 work.

## Scope

- In scope: Align setup/init docs with actual CLI behavior, assess stale-dist preflight behavior, and classify 0.3.0 vs 0.3.1 work..
- Out of scope: unrelated refactors not required for "Sync docs with code and define v0.3 readiness".

## Plan

1) Assess whether historical doctor warnings can be eliminated by normalizing task metadata without rewriting git history. 2) Scan codebase for additional hardcoded values that should be derived from config/runtime/state and for likely placeholder text or TODO-grade scaffolding that leaks into shipped behavior/docs. 3) Classify findings into v0.3.0 blockers vs later cleanup.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
Validate release-readiness changes for docs, stale-dist behavior, workflow generation, doctor behavior, and generated references.

### Checks
- Build `@agentplaneorg/core` and `agentplane`.
- Run targeted tests for dist guard, workflow runtime, doctor, and init/upgrade flows.
- Run release-grade CLI verification (`workflow build --validate`, `doctor`, routing, CLI docs freshness).
- Run targeted lint on changed source/docs generation files.

### Evidence / Commands
- bun run --filter=@agentplaneorg/core build
- bun run --filter=agentplane build
- bunx vitest run packages/agentplane/src/workflow-runtime/build.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts --hookTimeout 60000 --testTimeout 60000
- node packages/agentplane/dist/cli.js workflow build --validate
- node packages/agentplane/dist/cli.js doctor
- node .agentplane/policy/check-routing.mjs
- node scripts/check-cli-reference-fresh.mjs
- bun run lint:core -- packages/agentplane/src/workflow-runtime/build.ts packages/agentplane/src/commands/workflow-build.command.ts packages/agentplane/src/cli/run-cli/commands/init/write-workflow.ts packages/agentplane/src/workflow-runtime/build.test.ts packages/agentplane/src/commands/doctor.command.test.ts scripts/generate-website-docs.mjs

### Pass criteria
- All listed commands exit successfully.
- `doctor` may emit historical warnings from archived task metadata but must not fail.
- Generated workflow artifacts must not leak absolute local paths.
- Generated package reference must not expose private packages as `0.0.0`.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T11:46:55.717Z — VERIFY — needs_rework

By: ORCHESTRATOR

Note: Routing check passed and CLI docs freshness check passed after syncing setup/preflight documentation, but agentplane doctor timed out after 30s, so release-readiness verification remains incomplete.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T11:43:45.989Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

#### 2026-03-06T11:57:31.514Z — VERIFY — ok

By: ORCHESTRATOR

Note: Implemented path-aware stale-dist guard with tests, aligned doctor behavior for historical task metadata, published .agentplane/WORKFLOW.md, and passed release-grade checks: doctor (warnings only), routing, CLI docs freshness, lint, and targeted CLI tests.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T11:48:32.198Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

#### 2026-03-06T12:09:05.699Z — VERIFY — ok

By: CODER

Note: Removed repo-root path leakage from generated workflow artifacts; generated-reference now renders private packages as internal instead of 0.0.0. Verified: bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; bunx vitest run packages/agentplane/src/workflow-runtime/build.test.ts packages/agentplane/src/commands/doctor.command.test.ts --hookTimeout 60000 --testTimeout 60000; node packages/agentplane/dist/cli.js workflow build --validate; node packages/agentplane/dist/cli.js doctor; node .agentplane/policy/check-routing.mjs; node scripts/check-cli-reference-fresh.mjs; bun run lint:core -- packages/agentplane/src/workflow-runtime/build.ts packages/agentplane/src/commands/workflow-build.command.ts packages/agentplane/src/cli/run-cli/commands/init/write-workflow.ts packages/agentplane/src/workflow-runtime/build.test.ts packages/agentplane/src/commands/doctor.command.test.ts scripts/generate-website-docs.mjs

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T12:02:58.037Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

#### 2026-03-06T13:20:54.053Z — VERIFY — ok

By: CODER

Note: Command: node .agentplane/policy/check-routing.mjs; node scripts/check-cli-reference-fresh.mjs; git diff -- docs/user/setup.mdx docs/user/commands.mdx docs/help/troubleshooting.mdx docs/reference/generated-reference.mdx packages/agentplane/bin/agentplane.js packages/agentplane/bin/dist-guard.js packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/workflow-runtime/build.ts. Result: pass. Evidence: docs/code sync and release-readiness classification were completed; the blocked 0.3.x npm path is now explicitly understood and follow-up work was separated from site work. Scope: docs sync, stale-dist/doctor/workflow readiness analysis.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T12:09:05.700Z, excerpt_hash=sha256:58e5e1c97c95090be9760f2405b89bcde8754bf09033310a5f0ef7310de6f702

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
