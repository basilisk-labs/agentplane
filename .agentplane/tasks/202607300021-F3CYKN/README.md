---
id: "202607300021-F3CYKN"
title: "Bind RF-04 candidate evidence to the beta.1 qualification packet"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607292104-W03KZ0"
tags:
  - "benchmark"
  - "milestone-beta1"
  - "qualification-packet"
  - "quality"
  - "rf-04"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run test:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T00:22:28.031Z"
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
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-30T00:24:17.862Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-30T00:24:17.862Z"
doc_updated_by: "CODER"
description: "Make the beta.1 qualification packet consume commit-owned, SHA-bound RF-04 candidate and matched-runtime bridge evidence, expose its verdict and failed thresholds to the evaluator, and reject absent, cross-runtime, or tampered evidence. Preserve the observed W03 failure as a do-not-publish decision; do not retry provider capture or weaken thresholds."
sections:
  Summary: |-
    Bind RF-04 candidate evidence to the beta.1 qualification packet

    Make the beta.1 qualification packet consume commit-owned, SHA-bound RF-04 candidate and matched-runtime bridge evidence, expose its verdict and failed thresholds to the evaluator, and reject absent, cross-runtime, or tampered evidence. Preserve the observed W03 failure as a do-not-publish decision; do not retry provider capture or weaken thresholds.
  Scope: |-
    - In scope: Make the beta.1 qualification packet consume commit-owned, SHA-bound RF-04 candidate and matched-runtime bridge evidence, expose its verdict and failed thresholds to the evaluator, and reject absent, cross-runtime, or tampered evidence. Preserve the observed W03 failure as a do-not-publish decision; do not retry provider capture or weaken thresholds.
    - Out of scope: unrelated refactors not required for "Bind RF-04 candidate evidence to the beta.1 qualification packet".
  Plan: |-
    1. Inspect the completed W03 immutable measurement and define the minimal commit-owned candidate evidence contract: reviewed product SHA, candidate runtime profile, matched bridge identity, 50-run/55-episode coverage, normalized metric values, comparison thresholds/failure IDs, verdict, and stable digests. Preserve a failed candidate as evidence, not as an error to erase.
    2. Extend the beta.1 qualification packet and evaluator-facing lineage so it consumes only that committed evidence and rejects missing, tampered, cross-runtime, or unreviewed-SHA inputs. A failed candidate must produce an explicit do-not-publish/rework decision; it must never be represented as a passing beta.1 gate.
    3. Add focused tests with a committed fixture covering valid failed evidence, missing evidence, digest tampering, runtime mismatch, and a candidate SHA mismatch. Do not issue provider calls, change frozen thresholds, or retry W03.
    4. Run focused qualification/RF-04 tests, the deterministic no-provider evidence validation, and bun run ci:contract. Record residual limitations: the existing latency samples are non-interleaved and success subsets differ, so the comparison blocks beta.1 but is not causal attribution.
  Verify Steps: |-
    1. Run focused qualification-packet and RF-04 candidate tests. Expected: a packet requires commit-owned evidence and rejects absent, tampered, cross-runtime, or candidate-SHA-mismatched data.
    2. Run the deterministic no-provider candidate evidence check against W03 subject b58705432c46df612a89348ef28ea268fdcc2b04 and Codex 0.146.0-alpha.3.1. Expected: it validates 50 runs and 55 episodes, then retains the two declared latency failures without retrying any provider call.
    3. Build a beta.1 qualification packet from the committed failed evidence. Expected: it exposes exact failure IDs and a do-not-publish/rework decision; it cannot claim beta.1 pass.
    4. Run bun run ci:contract. Expected: the repository contract passes with the new packet lineage and tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "3a15147b76962e5547061a519d0ad51d79a74d7f"
    version: 1
id_source: "generated"
---
## Summary

Bind RF-04 candidate evidence to the beta.1 qualification packet

Make the beta.1 qualification packet consume commit-owned, SHA-bound RF-04 candidate and matched-runtime bridge evidence, expose its verdict and failed thresholds to the evaluator, and reject absent, cross-runtime, or tampered evidence. Preserve the observed W03 failure as a do-not-publish decision; do not retry provider capture or weaken thresholds.

## Scope

- In scope: Make the beta.1 qualification packet consume commit-owned, SHA-bound RF-04 candidate and matched-runtime bridge evidence, expose its verdict and failed thresholds to the evaluator, and reject absent, cross-runtime, or tampered evidence. Preserve the observed W03 failure as a do-not-publish decision; do not retry provider capture or weaken thresholds.
- Out of scope: unrelated refactors not required for "Bind RF-04 candidate evidence to the beta.1 qualification packet".

## Plan

1. Inspect the completed W03 immutable measurement and define the minimal commit-owned candidate evidence contract: reviewed product SHA, candidate runtime profile, matched bridge identity, 50-run/55-episode coverage, normalized metric values, comparison thresholds/failure IDs, verdict, and stable digests. Preserve a failed candidate as evidence, not as an error to erase.
2. Extend the beta.1 qualification packet and evaluator-facing lineage so it consumes only that committed evidence and rejects missing, tampered, cross-runtime, or unreviewed-SHA inputs. A failed candidate must produce an explicit do-not-publish/rework decision; it must never be represented as a passing beta.1 gate.
3. Add focused tests with a committed fixture covering valid failed evidence, missing evidence, digest tampering, runtime mismatch, and a candidate SHA mismatch. Do not issue provider calls, change frozen thresholds, or retry W03.
4. Run focused qualification/RF-04 tests, the deterministic no-provider evidence validation, and bun run ci:contract. Record residual limitations: the existing latency samples are non-interleaved and success subsets differ, so the comparison blocks beta.1 but is not causal attribution.

## Verify Steps

1. Run focused qualification-packet and RF-04 candidate tests. Expected: a packet requires commit-owned evidence and rejects absent, tampered, cross-runtime, or candidate-SHA-mismatched data.
2. Run the deterministic no-provider candidate evidence check against W03 subject b58705432c46df612a89348ef28ea268fdcc2b04 and Codex 0.146.0-alpha.3.1. Expected: it validates 50 runs and 55 episodes, then retains the two declared latency failures without retrying any provider call.
3. Build a beta.1 qualification packet from the committed failed evidence. Expected: it exposes exact failure IDs and a do-not-publish/rework decision; it cannot claim beta.1 pass.
4. Run bun run ci:contract. Expected: the repository contract passes with the new packet lineage and tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
