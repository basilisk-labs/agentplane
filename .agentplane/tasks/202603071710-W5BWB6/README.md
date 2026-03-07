---
id: "202603071710-W5BWB6"
title: "Extend onboarding smoke scenarios"
status: "DOING"
priority: "med"
owner: "TESTER"
depends_on:
  - "202603071710-ZCVMEZ"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T19:29:19.183Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: extend onboarding smoke scenarios for runtime handoff, direct lifecycle, branch_pr, and upgrade recovery."
events:
  -
    type: "status"
    at: "2026-03-07T19:29:26.063Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: extend onboarding smoke scenarios for runtime handoff, direct lifecycle, branch_pr, and upgrade recovery."
doc_version: 2
doc_updated_at: "2026-03-07T19:32:37.850Z"
doc_updated_by: "TESTER"
description: "Add scenario checks for legacy upgrade recovery, framework-checkout handoff, direct lifecycle, and branch_pr flow."
id_source: "generated"
---
## Summary

Extend onboarding smoke scenarios

Add scenario checks for legacy upgrade recovery, framework-checkout handoff, direct lifecycle, and branch_pr flow.

## Scope

- In scope: Add scenario checks for legacy upgrade recovery, framework-checkout handoff, direct lifecycle, and branch_pr flow..
- Out of scope: unrelated refactors not required for "Extend onboarding smoke scenarios".

## Plan

1. Expand scripts/check-agent-onboarding-scenario.mjs to validate four canonical onboarding scenarios: legacy upgrade recovery, framework-checkout handoff/runtime diagnostics, direct lifecycle, and branch_pr flow. 2. Sync only the affected docs surfaces if the smoke-check exposes missing anchors or scenario drift; keep the change limited to onboarding-facing docs and checks. 3. Run docs:onboarding:check, website build, lint:core for touched scripts, and policy routing; then record verification and finish with traceable metadata.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
1. `bun run docs:onboarding:check`
2. `bun run --cwd website build`
3. `bun run lint:core -- scripts/check-agent-onboarding-scenario.mjs`
4. `node .agentplane/policy/check-routing.mjs`

### Evidence / Commands
- Record the exact commands and the key scenario coverage they prove.

### Pass criteria
- The onboarding smoke-check covers legacy upgrade recovery, framework-checkout handoff/runtime diagnostics, direct lifecycle, and branch_pr flow.
- The docs site still builds cleanly.
- Routing validation still passes.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Notes

- Keep this task at the smoke-check level; do not add a new heavy integration harness.
- Prefer grouped scenario assertions over one-off string checks so future onboarding drift is easier to diagnose.
- If docs drift exceeds the onboarding surfaces named in the plan, stop and re-check scope before broad edits.
