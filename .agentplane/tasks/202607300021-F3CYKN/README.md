---
id: "202607300021-F3CYKN"
title: "Bind RF-04 candidate evidence to the beta.1 qualification packet"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
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
  state: "ok"
  updated_at: "2026-07-30T00:45:35.680Z"
  updated_by: "TESTER"
  note: "F3 binds immutable RF-04 candidate evidence to qualification packets and records the failed matched-runtime result as do_not_publish."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-30T00:46:35.401Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 2 typed finding(s)."
  evaluated_sha: "3b97bb9b977af418df3c9df4067fb19dddd7eb43"
  blueprint_digest: "c921e86bb24deb9a98bc1866c9d98819f4085a1e79a57ea0b5553576c07ef2f1"
  evidence_refs:
    - ".agentplane/tasks/202607300021-F3CYKN/quality/20260730-004635291-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607300021-F3CYKN/quality/20260730-004635291-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607300021-F3CYKN/quality/20260730-004635291-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607300021-F3CYKN/quality/20260730-004635291-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607300021-F3CYKN/quality/20260730-004635291-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607300021-F3CYKN/README.md"
    - ".agentplane/tasks/202607300021-F3CYKN/quality/20260730-004635291-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607300021-F3CYKN/quality/20260730-004635291-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607300021-F3CYKN/quality/20260730-004635291-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The reviewed parser reads the evidence blob at the reviewed SHA, validates its canonical digest, exact 50-run/10-scenario/55-episode coverage, matched runtime profile, runtime-bridge baseline, comparison failure IDs, and internally consistent verdict."
    - "The packet exposes candidate_measurement and deterministically maps the retained failed verdict to qualification_decision=do_not_publish; focused tests cover failed-valid, missing, cross-runtime, tampered, and invalid-candidate-SHA inputs."
commit:
  hash: "3b97bb9b977af418df3c9df4067fb19dddd7eb43"
  message: "🧩 F3CYKN task: satisfy qualification evidence lint"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Checkpoint: implemented the commit-owned RF-04 candidate evidence contract and preserved the failed latency verdict as do-not-publish."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-30T00:24:17.862Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-30T00:35:18.473Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Checkpoint: implemented the commit-owned RF-04 candidate evidence contract and preserved the failed latency verdict as do-not-publish."
  -
    type: "verify"
    at: "2026-07-30T00:45:35.680Z"
    author: "TESTER"
    state: "ok"
    note: "F3 binds immutable RF-04 candidate evidence to qualification packets and records the failed matched-runtime result as do_not_publish."
  -
    type: "status"
    at: "2026-07-30T00:47:12.226Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-30T00:47:12.227Z"
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
    ### 2026-07-30T00:45:35.680Z — VERIFY — ok

    By: TESTER

    Note: F3 binds immutable RF-04 candidate evidence to qualification packets and records the failed matched-runtime result as do_not_publish.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T00:35:18.473Z, excerpt_hash=sha256:9a12204d021ed89bfd0779a84fdf0be37909015aa3e4f10aa288d35b02ba323a

    Details:

    Focused qualification-packet tests passed (5/5); current-head evidence probe confirms 50 replay runs, 10 scenarios, 55 provider episodes, verdict=fail, exact failures latency.harness_setup_latency_ms.mean_ms and latency.time_to_verified_result_ms.mean_ms, decision=do_not_publish. W03 no-provider cache validation completed against b58705432c46df612a89348ef28ea268fdcc2b04 and correctly returned its expected non-zero failed-gate status without provider retry. bun run test:critical and bun run ci:contract passed.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-qualification-control-20260730/.agentplane/worktrees/202607300021-F3CYKN-bind-rf-04-candidate-evidence-to-the-beta-1-qual/.agentplane/tasks/202607300021-F3CYKN/blueprint/resolved-snapshot.json
    - old_digest: c921e86bb24deb9a98bc1866c9d98819f4085a1e79a57ea0b5553576c07ef2f1
    - current_digest: c921e86bb24deb9a98bc1866c9d98819f4085a1e79a57ea0b5553576c07ef2f1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607300021-F3CYKN

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607300021-F3CYKN
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

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
### 2026-07-30T00:45:35.680Z — VERIFY — ok

By: TESTER

Note: F3 binds immutable RF-04 candidate evidence to qualification packets and records the failed matched-runtime result as do_not_publish.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T00:35:18.473Z, excerpt_hash=sha256:9a12204d021ed89bfd0779a84fdf0be37909015aa3e4f10aa288d35b02ba323a

Details:

Focused qualification-packet tests passed (5/5); current-head evidence probe confirms 50 replay runs, 10 scenarios, 55 provider episodes, verdict=fail, exact failures latency.harness_setup_latency_ms.mean_ms and latency.time_to_verified_result_ms.mean_ms, decision=do_not_publish. W03 no-provider cache validation completed against b58705432c46df612a89348ef28ea268fdcc2b04 and correctly returned its expected non-zero failed-gate status without provider retry. bun run test:critical and bun run ci:contract passed.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-qualification-control-20260730/.agentplane/worktrees/202607300021-F3CYKN-bind-rf-04-candidate-evidence-to-the-beta-1-qual/.agentplane/tasks/202607300021-F3CYKN/blueprint/resolved-snapshot.json
- old_digest: c921e86bb24deb9a98bc1866c9d98819f4085a1e79a57ea0b5553576c07ef2f1
- current_digest: c921e86bb24deb9a98bc1866c9d98819f4085a1e79a57ea0b5553576c07ef2f1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607300021-F3CYKN

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607300021-F3CYKN
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
