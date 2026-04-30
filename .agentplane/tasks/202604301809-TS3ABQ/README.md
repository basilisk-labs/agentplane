---
id: "202604301809-TS3ABQ"
title: "Normalize core agent profiles for GPT-5.5"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604301809-K5P2HX"
tags:
  - "prompt-assembly"
verify:
  - "bun run agents:check"
  - "bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/registry.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-30T18:09:25.211Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-30T18:59:59.431Z"
  updated_by: "CODER"
  note: "Verified: compact keyed agent profile format added with derived fragment ids and legacy array/object compatibility; core profiles normalized to Goal/Success criteria/Constraints/Stop rules/Output; role/IDE readers handle keyed maps; docs updated. Checks: bun run agents:sync, bun run agents:check, targeted prompt/template/registry/GPT-5.5 tests, bun run typecheck, bun run lint:core, node .agentplane/policy/check-routing.mjs, git diff --check, targeted Prettier check, agentplane role CODER."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: normalize core agent profiles into outcome-first Goal/Success criteria/Constraints/Stop rules/Output blocks, preserving gateway/policy hard gates and generated mirror parity."
events:
  -
    type: "status"
    at: "2026-04-30T18:36:44.642Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: normalize core agent profiles into outcome-first Goal/Success criteria/Constraints/Stop rules/Output blocks, preserving gateway/policy hard gates and generated mirror parity."
  -
    type: "verify"
    at: "2026-04-30T18:59:59.431Z"
    author: "CODER"
    state: "ok"
    note: "Verified: compact keyed agent profile format added with derived fragment ids and legacy array/object compatibility; core profiles normalized to Goal/Success criteria/Constraints/Stop rules/Output; role/IDE readers handle keyed maps; docs updated. Checks: bun run agents:sync, bun run agents:check, targeted prompt/template/registry/GPT-5.5 tests, bun run typecheck, bun run lint:core, node .agentplane/policy/check-routing.mjs, git diff --check, targeted Prettier check, agentplane role CODER."
doc_version: 3
doc_updated_at: "2026-04-30T18:59:59.437Z"
doc_updated_by: "CODER"
description: "Rewrite core agent profiles around Goal, Success criteria, Constraints, Stop rules, and Output while preserving role boundaries and AgentPlane lifecycle constraints."
sections:
  Summary: |-
    Normalize core agent profiles for GPT-5.5
    
    Rewrite core agent profiles around Goal, Success criteria, Constraints, Stop rules, and Output while preserving role boundaries and AgentPlane lifecycle constraints.
  Scope: |-
    - In scope: Rewrite core agent profiles around Goal, Success criteria, Constraints, Stop rules, and Output while preserving role boundaries and AgentPlane lifecycle constraints.
    - Out of scope: unrelated refactors not required for "Normalize core agent profiles for GPT-5.5".
  Plan: |-
    1. Normalize ORCHESTRATOR, PLANNER, CODER, TESTER, REVIEWER, DOCS, INTEGRATOR, and CREATOR profiles.
    2. Remove procedural duplication only where gateway/policy already owns the hard gate.
    3. Keep role outputs and permissions precise.
    4. Verify agents:check, template/registry tests, and git diff --check.
  Verify Steps: |-
    1. Review the requested outcome for "Normalize core agent profiles for GPT-5.5". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-30T18:59:59.431Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: compact keyed agent profile format added with derived fragment ids and legacy array/object compatibility; core profiles normalized to Goal/Success criteria/Constraints/Stop rules/Output; role/IDE readers handle keyed maps; docs updated. Checks: bun run agents:sync, bun run agents:check, targeted prompt/template/registry/GPT-5.5 tests, bun run typecheck, bun run lint:core, node .agentplane/policy/check-routing.mjs, git diff --check, targeted Prettier check, agentplane role CODER.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T18:36:44.642Z, excerpt_hash=sha256:95c1fa5e247bc17733e4b728ed855a8a915834aaa927d0090dcbbb496a222b70
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Normalize core agent profiles for GPT-5.5

Rewrite core agent profiles around Goal, Success criteria, Constraints, Stop rules, and Output while preserving role boundaries and AgentPlane lifecycle constraints.

## Scope

- In scope: Rewrite core agent profiles around Goal, Success criteria, Constraints, Stop rules, and Output while preserving role boundaries and AgentPlane lifecycle constraints.
- Out of scope: unrelated refactors not required for "Normalize core agent profiles for GPT-5.5".

## Plan

1. Normalize ORCHESTRATOR, PLANNER, CODER, TESTER, REVIEWER, DOCS, INTEGRATOR, and CREATOR profiles.
2. Remove procedural duplication only where gateway/policy already owns the hard gate.
3. Keep role outputs and permissions precise.
4. Verify agents:check, template/registry tests, and git diff --check.

## Verify Steps

1. Review the requested outcome for "Normalize core agent profiles for GPT-5.5". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-30T18:59:59.431Z — VERIFY — ok

By: CODER

Note: Verified: compact keyed agent profile format added with derived fragment ids and legacy array/object compatibility; core profiles normalized to Goal/Success criteria/Constraints/Stop rules/Output; role/IDE readers handle keyed maps; docs updated. Checks: bun run agents:sync, bun run agents:check, targeted prompt/template/registry/GPT-5.5 tests, bun run typecheck, bun run lint:core, node .agentplane/policy/check-routing.mjs, git diff --check, targeted Prettier check, agentplane role CODER.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T18:36:44.642Z, excerpt_hash=sha256:95c1fa5e247bc17733e4b728ed855a8a915834aaa927d0090dcbbb496a222b70

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
