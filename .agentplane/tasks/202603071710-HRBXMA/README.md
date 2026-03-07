---
id: "202603071710-HRBXMA"
title: "Expand docs and CLI parity gates"
result_summary: "Expanded docs and CLI parity gates across startup and recovery surfaces."
status: "DONE"
priority: "med"
owner: "TESTER"
depends_on:
  - "202603071710-31BQ6E"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T20:06:38.368Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-07T20:18:58.788Z"
  updated_by: "TESTER"
  note: "Parity gates and docs surfaces are aligned"
commit:
  hash: "dd6c36d7c8915135594107f2ea49c949cb89c29f"
  message: "🧪 HRBXMA code: expand docs and CLI parity gates"
comments:
  -
    author: "TESTER"
    body: "Start: extend the existing bootstrap freshness gate to cover runtime, troubleshooting, and release recovery parity anchors before closing the final roadmap task."
  -
    author: "TESTER"
    body: "Verified: parity checks now cover bootstrap freshness, quickstart/role guidance, runtime recovery anchors, troubleshooting next actions, and release recovery docs."
events:
  -
    type: "status"
    at: "2026-03-07T20:06:48.444Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: extend the existing bootstrap freshness gate to cover runtime, troubleshooting, and release recovery parity anchors before closing the final roadmap task."
  -
    type: "verify"
    at: "2026-03-07T20:18:58.788Z"
    author: "TESTER"
    state: "ok"
    note: "Parity gates and docs surfaces are aligned"
  -
    type: "status"
    at: "2026-03-07T20:19:11.660Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: parity checks now cover bootstrap freshness, quickstart/role guidance, runtime recovery anchors, troubleshooting next actions, and release recovery docs."
doc_version: 2
doc_updated_at: "2026-03-07T20:19:11.660Z"
doc_updated_by: "TESTER"
description: "Add parity checks across bootstrap docs, quickstart, role help, troubleshooting next actions, and runtime explain examples."
id_source: "generated"
---
## Summary

Expand docs and CLI parity gates

Add parity checks across bootstrap docs, quickstart, role help, troubleshooting next actions, and runtime explain examples.

## Scope

- In scope: Add parity checks across bootstrap docs, quickstart, role help, troubleshooting next actions, and runtime explain examples..
- Out of scope: unrelated refactors not required for "Expand docs and CLI parity gates".

## Plan

1. Extend `scripts/check-agent-bootstrap-fresh.mjs` to assert parity across bootstrap doc generation, quickstart/role help, troubleshooting recovery next actions, runtime explain workflow docs, and release recovery docs.
2. Update docs/help text only where the new gate exposes a real drift; keep runtime/help ownership unchanged.
3. Run targeted parity, lint, docs-site, and routing checks; record evidence and close the task with traceable verification.

## Risks

- Risk: parity assertions become too brittle and fail on intentional wording changes.
- Mitigation: assert stable command/doc anchors and recovery actions, not prose formatting.

## Verify Steps

### Scope
- Primary tag: `code`
- Surfaces: bootstrap generation, `quickstart`, role help, troubleshooting recovery, runtime diagnostics, release recovery docs.

### Checks
- `bun run docs:bootstrap:check`
- `bun run lint:core -- scripts/check-agent-bootstrap-fresh.mjs`
- `bun run --cwd website build`
- `agentplane doctor`
- `node .agentplane/policy/check-routing.mjs`

### Evidence / Commands
- Record pass/fail plus the drift surface each command covers.

### Pass criteria
- The parity gate fails on drift and passes with the updated docs/help/runtime surfaces.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T20:18:58.788Z — VERIFY — ok

By: TESTER

Note: Parity gates and docs surfaces are aligned

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T20:11:35.368Z, excerpt_hash=sha256:31081ee35f350696f5886cc8552ac072c959c5f12eeb2036a78e586a82fcc793

Details:

Command: bun run docs:bootstrap:check
Result: pass
Evidence: bootstrap doc freshness check passed; startup command blocks, quickstart/roles, runtime docs, troubleshooting, and release recovery docs aligned.
Scope: scripts/check-agent-bootstrap-fresh.mjs, docs/user/agent-bootstrap.generated.mdx, startup/recovery surfaces.

Command: bun run lint:core -- scripts/check-agent-bootstrap-fresh.mjs
Result: pass
Evidence: eslint completed with exit code 0.
Scope: parity gate script implementation.

Command: bun run --cwd website build
Result: pass
Evidence: Docusaurus production build completed successfully.
Scope: docs site renderability after troubleshooting/bootstrap updates.

Command: agentplane doctor
Result: pass
Evidence: completed with errors=0 warnings=2 info=7 after a long historical-archive scan; runtime facts and warnings remained informational/actionable only.
Scope: repo health and docs/code verification coverage for touched surfaces.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy routing integrity after task documentation and docs changes.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Notes

- Keep the implementation in the existing bootstrap freshness script unless a second gate is strictly necessary.
- Prefer checking canonical command/doc anchors over large prose snapshots.
- Task-doc section writes must stay sequential for a single README; concurrent writes can overwrite each other.
