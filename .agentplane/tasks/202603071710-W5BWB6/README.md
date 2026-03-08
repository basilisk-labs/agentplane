---
id: "202603071710-W5BWB6"
title: "Extend onboarding smoke scenarios"
result_summary: "Expanded onboarding smoke scenario coverage across recovery, runtime, direct, and branch_pr flows."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-07T19:33:34.158Z"
  updated_by: "TESTER"
  note: "Command: bun run docs:onboarding:check; Result: pass; Evidence: smoke-check now covers legacy upgrade recovery, framework-checkout handoff/runtime diagnostics, direct lifecycle, and branch_pr flow. Scope: scripts/check-agent-onboarding-scenario.mjs and onboarding docs surfaces. Command: bun run --cwd website build; Result: pass; Evidence: production docs site build completed successfully. Scope: website/docs integration. Command: bun run lint:core -- scripts/check-agent-onboarding-scenario.mjs; Result: pass; Evidence: eslint finished cleanly. Scope: touched smoke-check script. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy gateway consistency."
commit:
  hash: "926c4da4f878a9fb76c4f48ad044e7468e4547b7"
  message: "🧪 W5BWB6 code: extend onboarding smoke scenarios"
comments:
  -
    author: "TESTER"
    body: "Start: extend onboarding smoke scenarios for runtime handoff, direct lifecycle, branch_pr, and upgrade recovery."
  -
    author: "TESTER"
    body: "Verified: onboarding smoke-check now covers the four canonical agent scenarios and all required checks passed."
events:
  -
    type: "status"
    at: "2026-03-07T19:29:26.063Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: extend onboarding smoke scenarios for runtime handoff, direct lifecycle, branch_pr, and upgrade recovery."
  -
    type: "verify"
    at: "2026-03-07T19:33:34.158Z"
    author: "TESTER"
    state: "ok"
    note: "Command: bun run docs:onboarding:check; Result: pass; Evidence: smoke-check now covers legacy upgrade recovery, framework-checkout handoff/runtime diagnostics, direct lifecycle, and branch_pr flow. Scope: scripts/check-agent-onboarding-scenario.mjs and onboarding docs surfaces. Command: bun run --cwd website build; Result: pass; Evidence: production docs site build completed successfully. Scope: website/docs integration. Command: bun run lint:core -- scripts/check-agent-onboarding-scenario.mjs; Result: pass; Evidence: eslint finished cleanly. Scope: touched smoke-check script. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy gateway consistency."
  -
    type: "status"
    at: "2026-03-07T19:33:43.604Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: onboarding smoke-check now covers the four canonical agent scenarios and all required checks passed."
doc_version: 3
doc_updated_at: "2026-03-07T19:33:43.604Z"
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

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T19:33:34.158Z — VERIFY — ok

By: TESTER

Note: Command: bun run docs:onboarding:check; Result: pass; Evidence: smoke-check now covers legacy upgrade recovery, framework-checkout handoff/runtime diagnostics, direct lifecycle, and branch_pr flow. Scope: scripts/check-agent-onboarding-scenario.mjs and onboarding docs surfaces. Command: bun run --cwd website build; Result: pass; Evidence: production docs site build completed successfully. Scope: website/docs integration. Command: bun run lint:core -- scripts/check-agent-onboarding-scenario.mjs; Result: pass; Evidence: eslint finished cleanly. Scope: touched smoke-check script. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy gateway consistency.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T19:32:37.850Z, excerpt_hash=sha256:4b131d9ab7b8f7133f1b2e9114d539c100fd5cbbd1031acd763fd3ed13c6884e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Keep this task at the smoke-check level; do not add a new heavy integration harness.
- Prefer grouped scenario assertions over one-off string checks so future onboarding drift is easier to diagnose.
- If docs drift exceeds the onboarding surfaces named in the plan, stop and re-check scope before broad edits.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
