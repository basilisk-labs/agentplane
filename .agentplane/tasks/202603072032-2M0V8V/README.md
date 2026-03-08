---
id: "202603072032-2M0V8V"
title: "Allow read-only diagnostics under stale dist"
result_summary: "Added a narrow stale-dist policy for doctor/runtime explain, expanded watched runtime paths, and fixed changed-path reporting."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T20:34:12.791Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-07T20:43:03.244Z"
  updated_by: "CODER"
  note: "Read-only diagnostics now warn and continue under stale dist; strict commands still block. Verified with targeted vitest, lint:core, website build, routing check, and manual runtime/task command checks."
commit:
  hash: "0c259fa8ccae43339a183a37d637f1f179e6643b"
  message: "🩺 2M0V8V cli: allow stale read-only diagnostics"
comments:
  -
    author: "CODER"
    body: "Start: add a narrow stale-dist policy exception for read-only diagnostics so framework contributors can run doctor/runtime explain without forcing AGENTPLANE_DEV_ALLOW_STALE_DIST=1."
  -
    author: "CODER"
    body: "Verified: read-only diagnostics now warn and continue under stale dist while stricter commands remain blocked until rebuild."
events:
  -
    type: "status"
    at: "2026-03-07T20:34:19.779Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a narrow stale-dist policy exception for read-only diagnostics so framework contributors can run doctor/runtime explain without forcing AGENTPLANE_DEV_ALLOW_STALE_DIST=1."
  -
    type: "verify"
    at: "2026-03-07T20:43:03.244Z"
    author: "CODER"
    state: "ok"
    note: "Read-only diagnostics now warn and continue under stale dist; strict commands still block. Verified with targeted vitest, lint:core, website build, routing check, and manual runtime/task command checks."
  -
    type: "status"
    at: "2026-03-07T20:46:20.273Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: read-only diagnostics now warn and continue under stale dist while stricter commands remain blocked until rebuild."
doc_version: 3
doc_updated_at: "2026-03-07T20:46:20.273Z"
doc_updated_by: "CODER"
description: "Let doctor and runtime explain run inside the framework checkout with an explicit warning when watched runtime paths are dirty, while keeping mutating commands blocked."
id_source: "generated"
---
## Summary

Allow read-only diagnostics to bypass the repo-checkout stale-dist hard-fail with an explicit warning, so framework contributors can still run `doctor` and `runtime explain` before the deeper snapshot-based freshness redesign lands.

## Scope

- In scope: Let doctor and runtime explain run inside the framework checkout with an explicit warning when watched runtime paths are dirty, while keeping mutating commands blocked..
- Out of scope: unrelated refactors not required for "Allow read-only diagnostics under stale dist".

## Plan

1. Add an explicit stale-dist command policy that treats `doctor` and `runtime explain` as read-only diagnostics allowed to proceed with a warning inside the framework checkout.
2. Keep strict blocking for mutating commands and preserve the existing override path for forced stale execution.
3. Add regressions for the new classification behavior, sync docs/troubleshooting text, run targeted checks, and close the task.

## Verify Steps

### Scope
- Primary tag: `code`
- Surfaces: stale-dist wrapper policy, read-only diagnostics contract, framework-dev troubleshooting/docs, regressions.

### Checks
- `bunx vitest run packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.test.ts`
- `bun run lint:core -- packages/agentplane/bin/agentplane.js packages/agentplane/bin/dist-guard.js packages/agentplane/src/cli/dist-guard.test.ts`
- `bun run docs:bootstrap:check`
- `bun run --cwd website build`
- `agentplane doctor`
- `node .agentplane/policy/check-routing.mjs`

### Evidence / Commands
- Record pass/fail plus whether stale read-only diagnostics warn-and-run while mutating behavior remains strict.

### Pass criteria
- `doctor` and `runtime explain` no longer require `AGENTPLANE_DEV_ALLOW_STALE_DIST=1` for dirty watched runtime paths in framework development, while mutating commands still hard-fail.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T20:43:03.244Z — VERIFY — ok

By: CODER

Note: Read-only diagnostics now warn and continue under stale dist; strict commands still block. Verified with targeted vitest, lint:core, website build, routing check, and manual runtime/task command checks.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T20:34:19.779Z, excerpt_hash=sha256:938b57051d4947e15e260631dc71435b1349841d64d9c9295638a1e524cbb6f2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Keep this task intentionally narrow: change command policy only for `doctor` and `runtime explain`.
- The snapshot-based freshness redesign is tracked separately in `202603072032-1BC7VQ` and `202603072032-V9VGT2`.

## Risks

- Risk: allowing too many stale-build commands weakens the safety contract and hides real dist drift.
- Mitigation: restrict the warning-only path to `doctor` and `runtime explain` in this task; leave all mutating commands strict.
