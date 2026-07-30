---
id: "202607300553-CR9VTJ"
title: "Requalify the AgentPlane 0.7.0-beta.1 decision on current main"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202607221850-0SFMS7"
  - "202607221850-8HBF4J"
  - "202607221850-9C9WBP"
  - "202607221850-DRWR0V"
  - "202607221850-R7WS01"
  - "202607221850-WM9X1G"
  - "202607221908-9M2FBQ"
  - "202607242236-1BFWEY"
  - "202607291148-1F9GZD"
tags:
  - "milestone-0-7-0-beta-1"
  - "quality"
  - "release-gate"
  - "rf-04"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run ci:contract"
  - "bun run test:critical"
  - "node scripts/checks/check-agent-efficiency-replay.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T05:53:32.333Z"
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
    author: "TESTER"
    body: "Start: establish the current-main beta.1 no-publish decision without provider retry."
events:
  -
    type: "status"
    at: "2026-07-30T05:53:55.660Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: establish the current-main beta.1 no-publish decision without provider retry."
doc_version: 3
doc_updated_at: "2026-07-30T05:53:55.660Z"
doc_updated_by: "TESTER"
description: "Replace the stranded beta.1 gate with a current-main qualification record. Preserve the immutable failed RF-04 candidate and F8 attribution, execute deterministic checks without provider calls, record do-not-publish for beta.1, and unblock beta.2 through an explicit successor dependency."
sections:
  Summary: |-
    Requalify the AgentPlane 0.7.0-beta.1 decision on current main

    Replace the stranded beta.1 gate with a current-main qualification record. Preserve the immutable failed RF-04 candidate and F8 attribution, execute deterministic checks without provider calls, record do-not-publish for beta.1, and unblock beta.2 through an explicit successor dependency.
  Scope: |-
    - In scope: Replace the stranded beta.1 gate with a current-main qualification record. Preserve the immutable failed RF-04 candidate and F8 attribution, execute deterministic checks without provider calls, record do-not-publish for beta.1, and unblock beta.2 through an explicit successor dependency.
    - Out of scope: unrelated refactors not required for "Requalify the AgentPlane 0.7.0-beta.1 decision on current main".
  Plan: "1. Persist the explicit replacement relation: keep the legacy beta.1 gate blocked because its stale PR cannot qualify current main, and replace only the beta.2 dependency edge with this successor. 2. On current main, validate the frozen 50-run/55-episode RF-04 evidence and the F8 timing-partition contract without invoking a provider or retrying the candidate. 3. Run the declared deterministic critical/contract checks, record any failure or flake as a blocker, and compare the retained latency failure against the unchanged quality rule. 4. Record beta.1 as do_not_publish, not as a product regression claim; publish no prerelease. 5. Close the graph-repair and quality-decision evidence through a normal PR, leaving actual beta.2 implementation work independent and ready only after this successor merges."
  Verify Steps: |-
    PLANNER fallback scaffold for "Requalify the AgentPlane 0.7.0-beta.1 decision on current main". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Requalify the AgentPlane 0.7.0-beta.1 decision on current main". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "7856c47baaab749275df9f7bbdc640bac19c86d5"
    version: 1
id_source: "generated"
---
## Summary

Requalify the AgentPlane 0.7.0-beta.1 decision on current main

Replace the stranded beta.1 gate with a current-main qualification record. Preserve the immutable failed RF-04 candidate and F8 attribution, execute deterministic checks without provider calls, record do-not-publish for beta.1, and unblock beta.2 through an explicit successor dependency.

## Scope

- In scope: Replace the stranded beta.1 gate with a current-main qualification record. Preserve the immutable failed RF-04 candidate and F8 attribution, execute deterministic checks without provider calls, record do-not-publish for beta.1, and unblock beta.2 through an explicit successor dependency.
- Out of scope: unrelated refactors not required for "Requalify the AgentPlane 0.7.0-beta.1 decision on current main".

## Plan

1. Persist the explicit replacement relation: keep the legacy beta.1 gate blocked because its stale PR cannot qualify current main, and replace only the beta.2 dependency edge with this successor. 2. On current main, validate the frozen 50-run/55-episode RF-04 evidence and the F8 timing-partition contract without invoking a provider or retrying the candidate. 3. Run the declared deterministic critical/contract checks, record any failure or flake as a blocker, and compare the retained latency failure against the unchanged quality rule. 4. Record beta.1 as do_not_publish, not as a product regression claim; publish no prerelease. 5. Close the graph-repair and quality-decision evidence through a normal PR, leaving actual beta.2 implementation work independent and ready only after this successor merges.

## Verify Steps

PLANNER fallback scaffold for "Requalify the AgentPlane 0.7.0-beta.1 decision on current main". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Requalify the AgentPlane 0.7.0-beta.1 decision on current main". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
