---
id: "202602101258-P8B15P"
title: "T1: Normalize ORCHESTRATOR vs PLANNER boundaries"
result_summary: "Agent profiles no longer claim each other's task-creation authority."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "agents"
  - "policy"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-10T13:01:34.968Z"
  updated_by: "TESTER"
  note: "Verified: Agent profile text matches AGENTS.md authority boundaries; agents-template tests passed."
commit:
  hash: "d74de01d3eb5a0f59ff8da91f3d48bfbedfbcb64"
  message: "🚧 P8B15P agents: align ORCHESTRATOR/PLANNER boundaries"
comments:
  -
    author: "CODER"
    body: "Start: Align agent profile role boundaries with AGENTS.md to prevent workflow drift and mis-execution."
  -
    author: "CODER"
    body: "Verified: ORCHESTRATOR/PLANNER profiles now match AGENTS.md authority boundaries; agents-template tests passed."
events:
  -
    type: "status"
    at: "2026-02-10T12:59:37.034Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Align agent profile role boundaries with AGENTS.md to prevent workflow drift and mis-execution."
  -
    type: "verify"
    at: "2026-02-10T13:01:34.968Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: Agent profile text matches AGENTS.md authority boundaries; agents-template tests passed."
  -
    type: "status"
    at: "2026-02-10T13:02:38.658Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: ORCHESTRATOR/PLANNER profiles now match AGENTS.md authority boundaries; agents-template tests passed."
doc_version: 2
doc_updated_at: "2026-02-10T13:02:38.658Z"
doc_updated_by: "CODER"
description: "Align ORCHESTRATOR/PLANNER agent profiles with AGENTS.md authority boundaries; update both assets and installed .agentplane copies; run template/tests."
id_source: "generated"
---
## Summary

Normalize ORCHESTRATOR vs PLANNER authority boundaries in agent profiles (assets + installed .agentplane copies) so they do not conflict with AGENTS.md.

## Scope

In scope: packages/agentplane/assets/agents/ORCHESTRATOR.json; packages/agentplane/assets/agents/PLANNER.json; .agentplane/agents/ORCHESTRATOR.json; .agentplane/agents/PLANNER.json; any related tests under packages/agentplane/src. Out of scope: behavior changes to CLI commands.

## Plan

1. Inspect current ORCHESTRATOR/PLANNER profiles in assets and installed copies. 2. Edit workflow text to match AGENTS.md: ORCHESTRATOR creates exactly one tracking task after overall plan approval; PLANNER creates downstream tasks; neither claims the other's authority. 3. Run focused tests: agents-template test and quick CLI help/regression if relevant.

## Risks

Risk: accidental semantic change to profile fields consumed by tooling. Mitigation: keep changes limited to workflow guidance text; run agents template tests.

## Verify Steps

Commands:\n- bun run test:agentplane -- agents template tests must pass\n- bun run lint\nPass criteria:\n- ORCHESTRATOR/PLANNER profiles contain no statements contradicting AGENTS.md authority boundaries.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-10T13:01:34.968Z — VERIFY — ok

By: TESTER

Note: Verified: Agent profile text matches AGENTS.md authority boundaries; agents-template tests passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-10T12:59:37.034Z, excerpt_hash=sha256:3abd3b0ca51b6864fae8931ff9401c611cecb02ec6fb7c70bdd6d7b991733c6f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the profile JSON edits (git checkout of the modified files) and re-run the same tests.

## Context

AGENTS.md is the canonical policy. Current ORCHESTRATOR.json and PLANNER.json profiles have drift that can mislead automation/humans and cause workflow violations.
