---
id: "202606030625-R5DRR1"
title: "Make route context explicit for agent handoffs"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-03T06:25:44.922Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement explicit route and evidence contracts for post-merge hosted close, PR artifacts, batch closure metadata, incidents, and release recovery so agents receive deterministic next actions instead of inferring state from stale artifacts."
events:
  -
    type: "status"
    at: "2026-06-03T06:26:10.814Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement explicit route and evidence contracts for post-merge hosted close, PR artifacts, batch closure metadata, incidents, and release recovery so agents receive deterministic next actions instead of inferring state from stale artifacts."
doc_version: 3
doc_updated_at: "2026-06-03T06:26:10.814Z"
doc_updated_by: "CODER"
description: "Replace ambiguous post-merge, PR artifact, included batch, incident, and release recovery guidance with explicit structured context and next actions so agents do not infer lifecycle state from stale artifacts or prose."
sections:
  Summary: |-
    Make route context explicit for agent handoffs

    Replace ambiguous post-merge, PR artifact, included batch, incident, and release recovery guidance with explicit structured context and next actions so agents do not infer lifecycle state from stale artifacts or prose.
  Scope: |-
    - In scope: Replace ambiguous post-merge, PR artifact, included batch, incident, and release recovery guidance with explicit structured context and next actions so agents do not infer lifecycle state from stale artifacts or prose.
    - Out of scope: unrelated refactors not required for "Make route context explicit for agent handoffs".
  Plan: |-
    1. Add explicit route states for merged/recorded hosted close tails so task status routes to base sync/cleanup instead of owner-lane pr update.
    2. Surface PR artifact source details in pr check/status output so stale local artifacts do not require branch-source guessing.
    3. Replace included-batch closure text heuristics with structured batch metadata and make missing metadata a clear blocker.
    4. Add structured incident/release guidance fields where current output forces agents to infer promotion or publication truth.
    5. Cover each changed contract with focused regression tests and run route/policy checks plus the declared task verification.
  Verify Steps: |-
    1. Run focused route/pr/release/incident regression tests covering the changed contracts. Expected: all targeted tests pass.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy passes.
    3. Run `ap doctor`. Expected: no blocking diagnostics for the changed workflow contracts.
    4. After PR artifacts are published, run `ap pr check 202606030625-R5DRR1`. Expected: PR artifacts and verification metadata are fresh.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make route context explicit for agent handoffs

Replace ambiguous post-merge, PR artifact, included batch, incident, and release recovery guidance with explicit structured context and next actions so agents do not infer lifecycle state from stale artifacts or prose.

## Scope

- In scope: Replace ambiguous post-merge, PR artifact, included batch, incident, and release recovery guidance with explicit structured context and next actions so agents do not infer lifecycle state from stale artifacts or prose.
- Out of scope: unrelated refactors not required for "Make route context explicit for agent handoffs".

## Plan

1. Add explicit route states for merged/recorded hosted close tails so task status routes to base sync/cleanup instead of owner-lane pr update.
2. Surface PR artifact source details in pr check/status output so stale local artifacts do not require branch-source guessing.
3. Replace included-batch closure text heuristics with structured batch metadata and make missing metadata a clear blocker.
4. Add structured incident/release guidance fields where current output forces agents to infer promotion or publication truth.
5. Cover each changed contract with focused regression tests and run route/policy checks plus the declared task verification.

## Verify Steps

1. Run focused route/pr/release/incident regression tests covering the changed contracts. Expected: all targeted tests pass.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy passes.
3. Run `ap doctor`. Expected: no blocking diagnostics for the changed workflow contracts.
4. After PR artifacts are published, run `ap pr check 202606030625-R5DRR1`. Expected: PR artifacts and verification metadata are fresh.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
