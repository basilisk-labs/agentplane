---
id: "202603051455-JBFXVG"
title: "Refactor AGENTS gateway and modular policy docs"
result_summary: "AGENTS gateway modularization completed with policy routing enforcement"
status: "DONE"
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
  updated_at: "2026-03-05T15:01:41.310Z"
  updated_by: "CODER"
  note: "Verified: reran policy checks after final task-doc normalization; all targeted checks remain green."
commit:
  hash: "3fd12b28ac13a1afce9b73ff1405ed4d0758a79a"
  message: "✨ JBFXVG policy: modularize AGENTS gateway routing"
comments:
  -
    author: "CODER"
    body: "Start: execute AGENTS gateway refactor into modular policy files with explicit load rules, core DoD, and routing checks."
  -
    author: "CODER"
    body: "Verified: AGENTS.md is now a compact gateway; modular policy docs and routing enforcement checks were added and validated."
events:
  -
    type: "status"
    at: "2026-03-05T14:56:24.757Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: execute AGENTS gateway refactor into modular policy files with explicit load rules, core DoD, and routing checks."
  -
    type: "verify"
    at: "2026-03-05T15:00:56.029Z"
    author: "CODER"
    state: "ok"
    note: "Verified: policy gateway split completed; routing check and agent-template sync passed; agents-template and policy-routing tests passed."
  -
    type: "verify"
    at: "2026-03-05T15:01:41.310Z"
    author: "CODER"
    state: "ok"
    note: "Verified: reran policy checks after final task-doc normalization; all targeted checks remain green."
  -
    type: "status"
    at: "2026-03-05T15:04:49.187Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: AGENTS.md is now a compact gateway; modular policy docs and routing enforcement checks were added and validated."
doc_version: 3
doc_updated_at: "2026-03-05T15:04:49.187Z"
doc_updated_by: "CODER"
description: "Convert AGENTS.md into a compact policy gateway, move situational/repo workflow into modular .agentplane/policy docs, add reference examples, and enforce routing checks."
id_source: "generated"
---
## Summary

Refactor AGENTS.md into a compact policy gateway and move situational repository workflow rules into modular policy documents under .agentplane/policy.

## Context

Current AGENTS.md is long and mixes policy, workflow and reference material. Goal is to reduce ambiguity and token overhead by routing to small policy modules loaded only when needed.

## Scope

In scope: rewrite AGENTS.md as gateway; create modular policy docs under .agentplane/policy; add policy examples; add routing check script/test; wire policy check into CI scripts.
Out of scope: changing runtime behavior of workflow commands, backends, or release command implementations.

## Plan

1) Draft compact AGENTS gateway with strict load rules. 2) Create canonical policy modules for workflow, DoD, security, governance, and examples. 3) Add routing enforcement script and regression test. 4) Wire check into CI scripts. 5) Run targeted checks and tests; record evidence.

## Verify Steps

Run: bun run policy:routing:check; bun run agents:check; bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/agents/policy-routing-check.test.ts. Expected: all commands pass with no policy-routing or template-sync errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-05T15:00:56.029Z — VERIFY — ok

By: CODER

Note: Verified: policy gateway split completed; routing check and agent-template sync passed; agents-template and policy-routing tests passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-05T15:00:50.127Z, excerpt_hash=sha256:8eeb45be05938669e7a42f7d8b630c3b0735a9457ebfc397abb73ff853f17db0

#### 2026-03-05T15:01:41.310Z — VERIFY — ok

By: CODER

Note: Verified: reran policy checks after final task-doc normalization; all targeted checks remain green.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-05T15:01:32.573Z, excerpt_hash=sha256:1bbdce01d6f1bce66348aa9301be6a008ff34d8f9c450c1ddd70e69c5def47bf

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert commits that introduce gateway/policy split and restore previous AGENTS.md content.
Remove added .agentplane/policy modules and policy routing checks if they cause regressions.

## Findings

### Approvals / Overrides
- None.

### Decisions
- Use modular policy files under .agentplane/policy; keep AGENTS.md as entry gateway only.
- Enforce routing via script in CI to keep MUST-rules machine-checkable.

### Implementation Notes
- Rewrote AGENTS gateway and added workflow/security/dod/governance modules plus examples.
- Added scripts/check-policy-routing.mjs and policy-routing-check test.
- Wired policy check into ci, release:ci-check, and run-local-ci.

### Evidence / Links
- bun run policy:routing:check
- bun run agents:check
- bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/agents/policy-routing-check.test.ts

## Risks

Risk 1: dropping a critical guardrail during split. Mitigation: keep hard gates in AGENTS.md and verify mapping. Risk 2: ambiguous load triggers. Mitigation: explicit IF->LOAD rules plus automated routing checks.
