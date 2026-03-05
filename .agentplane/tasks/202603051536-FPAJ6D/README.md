---
id: "202603051536-FPAJ6D"
title: "Enforce strict conditional policy loading"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-05T15:37:38.602Z"
  updated_by: "CODER"
  note: "Verified: strict conditional loading works and routing guard rejects unconditional patterns."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: enforce strict conditional policy loading and reject unconditional always-load directives in AGENTS routing."
events:
  -
    type: "status"
    at: "2026-03-05T15:36:55.191Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: enforce strict conditional policy loading and reject unconditional always-load directives in AGENTS routing."
  -
    type: "verify"
    at: "2026-03-05T15:37:38.602Z"
    author: "CODER"
    state: "ok"
    note: "Verified: strict conditional loading works and routing guard rejects unconditional patterns."
doc_version: 2
doc_updated_at: "2026-03-05T15:37:38.604Z"
doc_updated_by: "CODER"
description: "Remove always-load policy directives and require condition-only policy module loading, with routing checks rejecting always/wildcard module references."
id_source: "generated"
---
## Summary

Switch AGENTS policy routing to strict condition-only loading: no default always-load directives. Keep minimal hard gates in AGENTS and load policy modules only when trigger conditions match.

## Scope

In scope: packages/agentplane/assets/AGENTS.md, scripts/check-policy-routing.mjs, and synced AGENTS mirror if changed by template parity. Out of scope: policy engine runtime behavior and non-routing governance changes.

## Plan

1) Remove IF always LOAD rules in AGENTS and replace with conditional triggers for mutating actions. 2) Keep hard invariants in AGENTS so safety does not depend on unconditional module load. 3) Extend policy routing check to fail on IF always LOAD directives. 4) Run policy/template checks and targeted tests.

## Risks

Risk: if conditions are too narrow, required policy modules may not load for some mutating flows. Mitigation: define broad mutating-action condition and keep hard invariants in AGENTS.

## Verify Steps

### Scope
- Validate strict conditional policy loading in AGENTS gateway.

### Checks
- bun run policy:routing:check
- bun run agents:check
- bun test packages/agentplane/src/agents/policy-routing-check.test.ts packages/agentplane/src/agents/agents-template.test.ts

### Evidence / Commands
- Record exact command list and results in verification note.

### Pass criteria
- No `IF always -> LOAD` directives.
- policy:routing:check passes.
- Template parity and routing tests pass.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-05T15:37:38.602Z — VERIFY — ok

By: CODER

Note: Verified: strict conditional loading works and routing guard rejects unconditional patterns.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-05T15:37:33.608Z, excerpt_hash=sha256:7d2cc3ca180bed35f9d6370675524d9654194c3b75f7af472a7191504dd80b26

Details:

Commands:\n- bun run policy:routing:check\n- bun run agents:check\n- bun test packages/agentplane/src/agents/policy-routing-check.test.ts packages/agentplane/src/agents/agents-template.test.ts\n\nOutcome:\n- All commands passed.\n- AGENTS load rules no longer use IF always.\n- routing check now enforces no unconditional loads.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commits from this task and rerun policy:routing:check plus agents:check to confirm prior behavior is restored.
