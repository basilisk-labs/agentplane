---
id: "202602091644-60R2T4"
title: "Upgrade: agent-assisted mode (--agent) + auto-safe mode (--auto)"
result_summary: "upgrade agent/auto modes"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602091644-2JKX4T"
  - "202602091644-PNW35M"
tags:
  - "code"
  - "upgrade"
  - "architecture"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T17:21:20.264Z"
  updated_by: "TESTER"
  note: "Verified: bun run lint and bun run test:full pass."
commit:
  hash: "7865fe14d959e858d295e4555d327ff22f65f926"
  message: "✅ 60R2T4 upgrade: agent plan mode + auto apply mode"
comments:
  -
    author: "CODER"
    body: "Start: Add upgrade mode switching (--agent default plan-only; --auto applies managed files). Update specs/tests and add agent-mode plan artifact generation."
  -
    author: "CODER"
    body: "Verified: bun run lint and bun run test:full pass. Added upgrade modes: default agent-assisted plan generation (no writes) and explicit --auto for applying managed files. Updated CLI/tests and added agent-mode coverage."
events:
  -
    type: "status"
    at: "2026-02-09T17:20:23.655Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add upgrade mode switching (--agent default plan-only; --auto applies managed files). Update specs/tests and add agent-mode plan artifact generation."
  -
    type: "verify"
    at: "2026-02-09T17:21:20.264Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass."
  -
    type: "status"
    at: "2026-02-09T17:21:27.248Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass. Added upgrade modes: default agent-assisted plan generation (no writes) and explicit --auto for applying managed files. Updated CLI/tests and added agent-mode coverage."
doc_version: 2
doc_updated_at: "2026-02-09T17:21:27.248Z"
doc_updated_by: "CODER"
description: "Add upgrade modes: --agent generates plan/diff/constraints/report scaffold; --auto applies only safe transforms (add missing, anchors, canonical sections)."
id_source: "generated"
---
## Summary

Rework upgrade UX into agent-assisted (--agent) and auto-safe (--auto) modes. --agent generates a plan/diff/constraints/report scaffold; --auto performs only provably safe transforms.

## Scope

packages/agentplane/src/commands/upgrade.* and assets/AGENTS anchors. No semantic text merges in --auto.

## Plan

1) Extend upgrade spec with --agent/--auto modes (default to --agent).\n2) Implement --agent mode: compute manifest diff and write artifacts under .agentplane/.upgrade/agent/ (plan.md, constraints.md, report.md skeleton, optional diff.patch).\n3) Implement --auto mode: only add missing managed files, update anchors, and apply canonical section updates; never merge arbitrary user text.\n4) Ensure upgrade still respects allow/deny manifest and never touches tasks/backends/config.\n5) Add tests for both modes.\n6) Run bun run lint and bun run test:full.

## Risks

Risk: behavior change for existing users; mitigate by keeping current auto-apply as --auto and making --agent an additive mode with clear messaging.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T17:21:20.264Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T17:20:23.655Z, excerpt_hash=sha256:b1c0b70f1d34c90da71779587c3cd50a8f706cb5646069c8a11489209697a440

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert upgrade mode changes; keep manifest-based safe upgrade as the baseline behavior.

## Verify Steps

- bun run lint\n- bun run test:full
