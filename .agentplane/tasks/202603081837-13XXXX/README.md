---
id: "202603081837-13XXXX"
title: "Normalize long preflight timeout budgets in release apply regression suite"
result_summary: "Normalized remaining long release/apply preflight timeout budgets in the release regression suite."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T18:38:12.681Z"
  updated_by: "ORCHESTRATOR"
  note: "Normalize remaining long release/apply preflight timeout budgets without changing the asserted failure semantics."
verification:
  state: "ok"
  updated_at: "2026-03-08T18:41:37.032Z"
  updated_by: "CODER"
  note: "Normalized remaining long release-apply preflight timeout budgets; targeted apply test suite passed under 60s runner budget."
commit:
  hash: "9f8e429862b40108cbce006fe972328f45b17a3f"
  message: "🧪 13XXXX release: normalize preflight timeouts"
comments:
  -
    author: "CODER"
    body: "Start: normalizing the remaining long preflight timeout budgets in release/apply.test so release:prepublish stops failing on integration time budgets rather than on actual preflight semantics."
  -
    author: "CODER"
    body: "Verified: remaining long release/apply preflight cases now use explicit 60s budgets, so the release gate fails on semantics instead of runner timing."
events:
  -
    type: "status"
    at: "2026-03-08T18:38:21.818Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: normalizing the remaining long preflight timeout budgets in release/apply.test so release:prepublish stops failing on integration time budgets rather than on actual preflight semantics."
  -
    type: "verify"
    at: "2026-03-08T18:41:37.032Z"
    author: "CODER"
    state: "ok"
    note: "Normalized remaining long release-apply preflight timeout budgets; targeted apply test suite passed under 60s runner budget."
  -
    type: "status"
    at: "2026-03-08T18:43:38.686Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: remaining long release/apply preflight cases now use explicit 60s budgets, so the release gate fails on semantics instead of runner timing."
doc_version: 3
doc_updated_at: "2026-03-08T18:43:38.686Z"
doc_updated_by: "CODER"
description: "Fix remaining long-running preflight cases in release/apply.test so burned npm and related remote checks use realistic explicit timeouts, then rerun release:prepublish for v0.3.4."
id_source: "generated"
---
## Summary

Normalize long preflight timeout budgets in release apply regression suite

Fix remaining long-running preflight cases in release/apply.test so burned npm and related remote checks use realistic explicit timeouts, then rerun release:prepublish for v0.3.4.

## Scope

- In scope: Fix remaining long-running preflight cases in release/apply.test so burned npm and related remote checks use realistic explicit timeouts, then rerun release:prepublish for v0.3.4.
- Out of scope: unrelated refactors not required for "Normalize long preflight timeout budgets in release apply regression suite".

## Plan

1. Implement the change for "Normalize long preflight timeout budgets in release apply regression suite".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/release/apply.test.ts --testTimeout 60000 --hookTimeout 60000`. Expected: all long-running preflight cases pass without timeout failures.
2. Run `bun run release:prepublish`. Expected: the full release gate completes without release/apply regression failures.
3. Confirm the timed cases still assert no local mutation happens before the failure. Expected: burned-version and remote-tag cases still fail on the same diagnostics, not on weakened checks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T18:41:37.032Z — VERIFY — ok

By: CODER

Note: Normalized remaining long release-apply preflight timeout budgets; targeted apply test suite passed under 60s runner budget.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T18:38:21.818Z, excerpt_hash=sha256:7c9d5cd439b0b0911768c9966afc3b2e3cd929f4e8cf43343369cd3ab36332f1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
