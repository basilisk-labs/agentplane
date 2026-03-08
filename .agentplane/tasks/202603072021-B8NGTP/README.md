---
id: "202603072021-B8NGTP"
title: "Fix onboarding check after bootstrap restructure"
result_summary: "Repaired onboarding parity check after bootstrap restructure."
status: "DONE"
priority: "med"
owner: "TESTER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T20:22:01.930Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-07T20:25:30.050Z"
  updated_by: "TESTER"
  note: "Onboarding smoke-check matches the current bootstrap structure"
commit:
  hash: "fe266f563babce091c3b898c7f8ae982b17a1f0c"
  message: "🧪 B8NGTP code: fix onboarding smoke check after bootstrap restructure"
comments:
  -
    author: "TESTER"
    body: "Start: repair the onboarding smoke-check so the generated bootstrap restructure and recovery/runtime guidance stop breaking pre-push on the current main branch."
  -
    author: "TESTER"
    body: "Verified: the onboarding smoke-check now follows the current bootstrap structure, so pre-push no longer fails on stale direct-lifecycle headings."
events:
  -
    type: "status"
    at: "2026-03-07T20:22:13.074Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair the onboarding smoke-check so the generated bootstrap restructure and recovery/runtime guidance stop breaking pre-push on the current main branch."
  -
    type: "verify"
    at: "2026-03-07T20:25:30.050Z"
    author: "TESTER"
    state: "ok"
    note: "Onboarding smoke-check matches the current bootstrap structure"
  -
    type: "status"
    at: "2026-03-07T20:25:37.533Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the onboarding smoke-check now follows the current bootstrap structure, so pre-push no longer fails on stale direct-lifecycle headings."
doc_version: 3
doc_updated_at: "2026-03-07T20:25:37.533Z"
doc_updated_by: "TESTER"
description: "Update onboarding smoke check to match the current generated bootstrap structure so pre-push can pass after HRBXMA."
id_source: "generated"
---
## Summary

Repair the onboarding smoke-check after the bootstrap parity work so pre-push validates the current startup path instead of stale section headings.

## Scope

- In scope: Update onboarding smoke check to match the current generated bootstrap structure so pre-push can pass after HRBXMA..
- Out of scope: unrelated refactors not required for "Fix onboarding check after bootstrap restructure".

## Plan

1. Update `scripts/check-agent-onboarding-scenario.mjs` to assert the current generated bootstrap structure and current recovery/runtime anchors instead of removed headings.
2. Run targeted onboarding/parity/build/routing checks plus `agentplane doctor` so the repaired smoke-check matches real repo surfaces.
3. Commit only the repair-task scope, record verification, close the task, then repeat `git push origin main`.

## Verify Steps

### Scope
- Primary tag: `code`
- Surfaces: onboarding smoke-check, generated bootstrap headings, startup/recovery docs, pre-push gate.

### Checks
- `bun run docs:onboarding:check`
- `bun run docs:bootstrap:check`
- `bun run lint:core -- scripts/check-agent-onboarding-scenario.mjs`
- `bun run --cwd website build`
- `agentplane doctor`
- `node .agentplane/policy/check-routing.mjs`

### Evidence / Commands
- Record pass/fail plus the startup surface each command covers.

### Pass criteria
- The onboarding smoke-check matches the current bootstrap/runtime/recovery surfaces and `git push origin main` no longer fails at `docs:onboarding:check`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T20:25:30.050Z — VERIFY — ok

By: TESTER

Note: Onboarding smoke-check matches the current bootstrap structure

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T20:22:13.074Z, excerpt_hash=sha256:3d109a59bcf597263b17763b996d2fed3910692b8ef7f44b9b14db40c4e97c62

Details:

Command: bun run docs:onboarding:check
Result: pass
Evidence: onboarding scenario check passed after updating direct lifecycle anchors to the current generated bootstrap structure.
Scope: scripts/check-agent-onboarding-scenario.mjs and startup docs surfaces.

Command: bun run docs:bootstrap:check
Result: pass
Evidence: bootstrap freshness/parity check passed.
Scope: generated bootstrap doc and linked startup surfaces.

Command: bun run lint:core -- scripts/check-agent-onboarding-scenario.mjs
Result: pass
Evidence: eslint completed with exit code 0.
Scope: onboarding smoke-check implementation.

Command: bun run --cwd website build
Result: pass
Evidence: Docusaurus production build completed successfully.
Scope: docs site renderability after onboarding check repair.

Command: agentplane doctor
Result: pass
Evidence: completed with errors=0 warnings=2 info=7; only historical archive warnings remain.
Scope: repo health after the repair.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy routing integrity.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
