---
id: "202604301809-FYB4RD"
title: "Normalize secondary agent profiles for GPT-5.5"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604301809-TS3ABQ"
tags:
  - "prompt-assembly"
verify:
  - "bun run agents:check"
  - "bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/registry.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-30T18:09:29.026Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-30T19:11:25.649Z"
  updated_by: "CODER"
  note: "Verified: remaining non-core agent profiles (CREATOR, DOCS, INTEGRATOR, REDMINE, SKILL_EXTRACTOR, UPDATER, UPGRADER) now use compact keyed inputs/outputs/permissions/workflow and outcome-first Goal/Success criteria/Constraints/Stop rules/Output sections; all bundled profiles are covered by GPT-5.5 diagnostics. Checks: bun run agents:sync, bun run agents:check, targeted prompt fragment/template/registry/GPT-5.5 tests, bun run typecheck, bun run lint:core, node .agentplane/policy/check-routing.mjs, git diff --check, targeted Prettier check, agentplane role UPDATER."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: normalize secondary agent profiles into the compact keyed outcome-first contract, preserving each role boundary and avoiding authority expansion."
events:
  -
    type: "status"
    at: "2026-04-30T19:06:03.601Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: normalize secondary agent profiles into the compact keyed outcome-first contract, preserving each role boundary and avoiding authority expansion."
  -
    type: "verify"
    at: "2026-04-30T19:11:25.649Z"
    author: "CODER"
    state: "ok"
    note: "Verified: remaining non-core agent profiles (CREATOR, DOCS, INTEGRATOR, REDMINE, SKILL_EXTRACTOR, UPDATER, UPGRADER) now use compact keyed inputs/outputs/permissions/workflow and outcome-first Goal/Success criteria/Constraints/Stop rules/Output sections; all bundled profiles are covered by GPT-5.5 diagnostics. Checks: bun run agents:sync, bun run agents:check, targeted prompt fragment/template/registry/GPT-5.5 tests, bun run typecheck, bun run lint:core, node .agentplane/policy/check-routing.mjs, git diff --check, targeted Prettier check, agentplane role UPDATER."
doc_version: 3
doc_updated_at: "2026-04-30T19:11:25.659Z"
doc_updated_by: "CODER"
description: "Apply the same outcome-first profile structure to UPDATER, UPGRADER, SKILL_EXTRACTOR, and REDMINE without expanding their authority or creating overlapping roles."
sections:
  Summary: |-
    Normalize secondary agent profiles for GPT-5.5
    
    Apply the same outcome-first profile structure to UPDATER, UPGRADER, SKILL_EXTRACTOR, and REDMINE without expanding their authority or creating overlapping roles.
  Scope: |-
    - In scope: Apply the same outcome-first compact keyed profile structure to every remaining non-core agent profile: CREATOR, DOCS, INTEGRATOR, REDMINE, SKILL_EXTRACTOR, UPDATER, and UPGRADER, without expanding their authority or creating overlapping roles.
    - Out of scope: unrelated refactors not required for "Normalize secondary agent profiles for GPT-5.5".
  Plan: |-
    1. Normalize every remaining non-core agent profile using compact keyed inputs/outputs/permissions/workflow fragments.
    2. Rewrite each workflow around Goal, Success criteria, Constraints, Stop rules, and Output while preserving explicit invocation and side-effect boundaries.
    3. Keep specialized behaviors narrower than the core workflow roles and avoid new role overlap.
    4. Verify agents:check, template/registry/GPT-5.5 diagnostics tests, typecheck, lint, and git diff --check.
  Verify Steps: |-
    1. Review the requested outcome for "Normalize secondary agent profiles for GPT-5.5". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-30T19:11:25.649Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: remaining non-core agent profiles (CREATOR, DOCS, INTEGRATOR, REDMINE, SKILL_EXTRACTOR, UPDATER, UPGRADER) now use compact keyed inputs/outputs/permissions/workflow and outcome-first Goal/Success criteria/Constraints/Stop rules/Output sections; all bundled profiles are covered by GPT-5.5 diagnostics. Checks: bun run agents:sync, bun run agents:check, targeted prompt fragment/template/registry/GPT-5.5 tests, bun run typecheck, bun run lint:core, node .agentplane/policy/check-routing.mjs, git diff --check, targeted Prettier check, agentplane role UPDATER.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T19:07:10.977Z, excerpt_hash=sha256:4f80deb0feb0b8624c7aa66ff9978d6acf40e2d942b92553c8c3838452a722d0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Normalize secondary agent profiles for GPT-5.5

Apply the same outcome-first profile structure to UPDATER, UPGRADER, SKILL_EXTRACTOR, and REDMINE without expanding their authority or creating overlapping roles.

## Scope

- In scope: Apply the same outcome-first compact keyed profile structure to every remaining non-core agent profile: CREATOR, DOCS, INTEGRATOR, REDMINE, SKILL_EXTRACTOR, UPDATER, and UPGRADER, without expanding their authority or creating overlapping roles.
- Out of scope: unrelated refactors not required for "Normalize secondary agent profiles for GPT-5.5".

## Plan

1. Normalize every remaining non-core agent profile using compact keyed inputs/outputs/permissions/workflow fragments.
2. Rewrite each workflow around Goal, Success criteria, Constraints, Stop rules, and Output while preserving explicit invocation and side-effect boundaries.
3. Keep specialized behaviors narrower than the core workflow roles and avoid new role overlap.
4. Verify agents:check, template/registry/GPT-5.5 diagnostics tests, typecheck, lint, and git diff --check.

## Verify Steps

1. Review the requested outcome for "Normalize secondary agent profiles for GPT-5.5". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-30T19:11:25.649Z — VERIFY — ok

By: CODER

Note: Verified: remaining non-core agent profiles (CREATOR, DOCS, INTEGRATOR, REDMINE, SKILL_EXTRACTOR, UPDATER, UPGRADER) now use compact keyed inputs/outputs/permissions/workflow and outcome-first Goal/Success criteria/Constraints/Stop rules/Output sections; all bundled profiles are covered by GPT-5.5 diagnostics. Checks: bun run agents:sync, bun run agents:check, targeted prompt fragment/template/registry/GPT-5.5 tests, bun run typecheck, bun run lint:core, node .agentplane/policy/check-routing.mjs, git diff --check, targeted Prettier check, agentplane role UPDATER.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T19:07:10.977Z, excerpt_hash=sha256:4f80deb0feb0b8624c7aa66ff9978d6acf40e2d942b92553c8c3838452a722d0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
