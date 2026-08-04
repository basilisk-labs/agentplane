---
id: "202608040031-4XD57R"
title: "Attribute and remove redundant Git observations from direct supervisor preparation"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "performance"
  - "qualification"
  - "supervisor"
  - "v0.7.1"
verify:
  - "The benchmark report must expose bounded deterministic Git command histograms for baseline and candidate samples without adding work inside the timed interval."
  - "The candidate must reduce the measured direct managed-preparation observation count, preserve all route and recovery invariants, and pass the unchanged 20-cold/30-warm +10% median and p95 gate."
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T00:32:00.398Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-04T00:48:00.678Z"
  updated_by: "TESTER"
  note: "Verified exact implementation SHA 3a526415: instrumented 20-cold/30-warm packed benchmark passed all four unchanged +10% gates and reduced managed Git observations from 8 to 7; supervisor 154/154, recovery 86/86, critical CLI 79/79, qualification 21/21, typecheck, lint, format, doctor, and routing policy passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "human_supplied"
  updated_at: "2026-08-04T00:48:43.862Z"
  updated_by: "HUMAN"
  note: "Exact implementation 3a526415 removes one redundant direct-workflow status observation, preserves fail-closed fallback and state-fingerprint semantics, and passes the strict packed latency and regression gates."
  evaluated_sha: "3a526415de4ea9034687446e68f7115a97353402"
  blueprint_digest: "5e343ccc7db2e0c04fc0a4490ca851980d88eb8d2f60e124f2fbc19bd82b2bcd"
  evidence_refs:
    - ".agentplane/tasks/202608040031-4XD57R/quality/20260804-004843594-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608040031-4XD57R/quality/20260804-004843594-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608040031-4XD57R/quality/objects/sha256/83ccf85fefe05292c991ee8b196b124ffe12afe1c9b33bb087d08d44916aaea8.md"
    - ".agentplane/tasks/202608040031-4XD57R/quality/20260804-004843594-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608040031-4XD57R/quality/20260804-004843594-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608040031-4XD57R/README.md"
    - ".agentplane/tasks/202608040031-4XD57R/quality/objects/sha256/aa173978d0fa68e8bbe130f183914fafa658d524efdf5757fb60fa5983267738.patch"
    - ".agentplane/tasks/202608040031-4XD57R/quality/objects/sha256/d27609f61af1b2d3fe5626b3a1a3ff7eab710bd82d40b44459f52342ea6f0589.json"
    - ".agentplane/tasks/202608040031-4XD57R/quality/objects/sha256/db30dd99829741a38a1a36a49b04dbba810d52219e13c1d30bb78b397f0c2044.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
    - ".agentplane/tasks/202608040031-4XD57R/evidence/attribution-a649936d4.json"
    - ".agentplane/tasks/202608040031-4XD57R/evidence/supervisor-latency-2a724df0b.json"
    - ".agentplane/tasks/202608040031-4XD57R/evidence/supervisor-latency-3a526415d.json"
    - ".agentplane/tasks/202608040031-4XD57R/verification/20260804004800678-78383724249e0852.json"
    - "packages/agentplane/src/commands/shared/workflow-step-policy-scope.test.ts"
  findings:
    - "Git command histograms are collected only after the measured interval, are deterministically sorted, and their totals are validated against per-sample subprocess counts."
    - "Policy scope reuses dirty paths only from an available authoritative snapshot; unavailable snapshots retain the prior live status observation."
    - "Sequential blueprint and snapshot observation avoids the measured cold-start I/O contention introduced by the rejected parallel experiment."
commit:
  hash: "b9fc76f03f3e15e890106a4c628837860e4009cf"
  message: "🧩 4XD57R task: record verified performance evidence"
comments:
  -
    author: "CODER"
    body: "Start: instrument the matched supervisor benchmark and remove only the measured duplicate Git observations."
  -
    author: "CODER"
    body: "Implementation complete: exact SHA 3a526415 reuses authoritative dirty paths, reduces managed Git observations from 8 to 7, passes the unchanged 20/30 latency gate, supervisor 154/154, recovery 86/86, critical CLI 79/79, typecheck, lint, formatting, doctor, and routing policy."
  -
    author: "CODER"
    body: "Verified: pre-merge closure is ready; exact implementation 3a526415 passed strict latency, regression, static, policy, verification, and evaluator gates with complete raw evidence."
events:
  -
    type: "status"
    at: "2026-08-04T00:32:15.569Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: instrument the matched supervisor benchmark and remove only the measured duplicate Git observations."
  -
    type: "status"
    at: "2026-08-04T00:47:40.985Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation complete: exact SHA 3a526415 reuses authoritative dirty paths, reduces managed Git observations from 8 to 7, passes the unchanged 20/30 latency gate, supervisor 154/154, recovery 86/86, critical CLI 79/79, typecheck, lint, formatting, doctor, and routing policy."
  -
    type: "verify"
    at: "2026-08-04T00:48:00.678Z"
    author: "TESTER"
    state: "ok"
    note: "Verified exact implementation SHA 3a526415: instrumented 20-cold/30-warm packed benchmark passed all four unchanged +10% gates and reduced managed Git observations from 8 to 7; supervisor 154/154, recovery 86/86, critical CLI 79/79, qualification 21/21, typecheck, lint, format, doctor, and routing policy passed."
  -
    type: "status"
    at: "2026-08-04T00:49:38.270Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure is ready; exact implementation 3a526415 passed strict latency, regression, static, policy, verification, and evaluator gates with complete raw evidence."
doc_version: 3
doc_updated_at: "2026-08-04T00:49:38.270Z"
doc_updated_by: "CODER"
description: "Extend the packed supervisor benchmark with deterministic per-command Git histograms, use those measurements to identify and remove only duplicated direct-workflow observations whose values are already covered by the same command context or route snapshot, preserve all stale-state and side-effect-safety invariants, and restore every cold and warm median and p95 surface below the unchanged +10% v0.6.26 ceiling."
sections:
  Summary: |-
    Attribute and remove redundant Git observations from direct supervisor preparation

    Extend the packed supervisor benchmark with deterministic per-command Git histograms, use those measurements to identify and remove only duplicated direct-workflow observations whose values are already covered by the same command context or route snapshot, preserve all stale-state and side-effect-safety invariants, and restore every cold and warm median and p95 surface below the unchanged +10% v0.6.26 ceiling.
  Scope: |-
    - In scope: Extend the packed supervisor benchmark with deterministic per-command Git histograms, use those measurements to identify and remove only duplicated direct-workflow observations whose values are already covered by the same command context or route snapshot, preserve all stale-state and side-effect-safety invariants, and restore every cold and warm median and p95 surface below the unchanged +10% v0.6.26 ceiling.
    - Out of scope: unrelated refactors not required for "Attribute and remove redundant Git observations from direct supervisor preparation".
  Plan: "1. Extend the supervisor latency report with bounded exact Git-command histograms aggregated outside the measured interval, and add contract tests for deterministic ordering and sample accounting. 2. Run the instrumented packed v0.6.26 versus current-main comparison to identify the exact two extra managed-preparation commands and any external-path asymmetry; preserve the raw report as task evidence. 3. Remove only observations that duplicate values already proven fresh in the same immutable command context or route snapshot; keep direct and branch_pr checkout identity, HEAD refresh after mutations, fingerprints, approvals, policy, provider, and effect-safety checks unchanged. 4. Add focused invalidation and parity tests, freeze a clean SHA, and require all four 20-cold/30-warm median and p95 surfaces to pass the unchanged +10% gate with a reduced candidate Git-command count. 5. Run critical/static/policy checks, independent evaluation, exact-head hosted review, and integrate through the queue before rebasing release qualification."
  Verify Steps: |-
    1. Run the qualification contract tests for the supervisor latency report. Expected: each baseline/candidate surface contains a deterministic, bounded Git command histogram whose total equals the summed per-sample Git subprocess count; instrumentation occurs after the timed command sequence.
    2. Run the instrumented packed benchmark against v0.6.26 on a clean SHA with at least 20 cold and 30 warm samples. Expected: the report identifies exact repeated command families and preserves raw evidence; no provider call occurs.
    3. Run focused route, task-run-path, supervisor, recovery, stale task/Git/policy/approval, concurrency, crash, and effect-in-doubt suites. Expected: the chosen observation reuse invalidates on every covered state change and no protected side effect can replay.
    4. Re-run node scripts/qualification/measure-v0.7.1-supervisor-latency.mjs --subject <clean-implementation-sha> --out <task-evidence>. Expected: every cold/warm median and p95 is <=10% above v0.6.26; managed candidate Git observations are lower than the blocked 2da557536 count of 8 and external preparation does not regress.
    5. Run bun run typecheck, touched ESLint/Prettier, bun run test:critical, ap doctor, node .agentplane/policy/check-routing.mjs, independent EVALUATOR, exact-head hosted checks, and review-thread audit. Expected: all pass before queue integration and hosted close.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-04T00:48:00.678Z — VERIFY — ok

    By: TESTER

    Note: Verified exact implementation SHA 3a526415: instrumented 20-cold/30-warm packed benchmark passed all four unchanged +10% gates and reduced managed Git observations from 8 to 7; supervisor 154/154, recovery 86/86, critical CLI 79/79, qualification 21/21, typecheck, lint, format, doctor, and routing policy passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T00:47:40.985Z, excerpt_hash=sha256:0a4dba5b8db43ca54d48c31317328093974e7f8e699af60823f96fb638134d9d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608040031-4XD57R-attribute-and-remove-redundant-git-observations/.agentplane/tasks/202608040031-4XD57R/blueprint/resolved-snapshot.json
    - old_digest: 5e343ccc7db2e0c04fc0a4490ca851980d88eb8d2f60e124f2fbc19bd82b2bcd
    - current_digest: 5e343ccc7db2e0c04fc0a4490ca851980d88eb8d2f60e124f2fbc19bd82b2bcd
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608040031-4XD57R

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608040031-4XD57R
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Instrumented evidence identified a duplicate direct-workflow status read: the authoritative Git snapshot already contained dirty paths, while policy scope performed a second status command. Reusing the available snapshot removes exactly one managed-preparation Git observation (8 to 7) and falls back to the original status read when the snapshot is unavailable.
      Impact: Exact SHA 3a526415 passes all four 20-cold/30-warm latency surfaces: cold external median +5.03%/p95 -2.21%, cold managed +4.71%/+4.06%, warm external -13.15%/-9.88%, warm managed +4.97%/+3.32% versus v0.6.26.
      Resolution: Keep snapshot and blueprint observations sequential to avoid cold-start I/O contention; preserve fail-closed fallback, fingerprint projection, HEAD freshness, and all recovery and side-effect checks.

    - Observation: The authoritative Git snapshot now supplies direct policy-scope dirty paths only when available; an explicit fallback retains the original status read when snapshot observation is unavailable.
      Impact: Removes one deterministic repository scan from task run preparation without weakening stale-state, policy, approval, recovery, concurrency, or side-effect safety.
      Resolution: Accept for exact-head hosted review and integration; retain the raw attribution, failed parallel-I/O experiment, and passing sequential benchmark as evidence.
extensions:
  workflow_route_baseline:
    start_head_sha: "bae47b05c31e7e489a1c49ce12f7a27d6f44486a"
    version: 1
id_source: "generated"
---
## Summary

Attribute and remove redundant Git observations from direct supervisor preparation

Extend the packed supervisor benchmark with deterministic per-command Git histograms, use those measurements to identify and remove only duplicated direct-workflow observations whose values are already covered by the same command context or route snapshot, preserve all stale-state and side-effect-safety invariants, and restore every cold and warm median and p95 surface below the unchanged +10% v0.6.26 ceiling.

## Scope

- In scope: Extend the packed supervisor benchmark with deterministic per-command Git histograms, use those measurements to identify and remove only duplicated direct-workflow observations whose values are already covered by the same command context or route snapshot, preserve all stale-state and side-effect-safety invariants, and restore every cold and warm median and p95 surface below the unchanged +10% v0.6.26 ceiling.
- Out of scope: unrelated refactors not required for "Attribute and remove redundant Git observations from direct supervisor preparation".

## Plan

1. Extend the supervisor latency report with bounded exact Git-command histograms aggregated outside the measured interval, and add contract tests for deterministic ordering and sample accounting. 2. Run the instrumented packed v0.6.26 versus current-main comparison to identify the exact two extra managed-preparation commands and any external-path asymmetry; preserve the raw report as task evidence. 3. Remove only observations that duplicate values already proven fresh in the same immutable command context or route snapshot; keep direct and branch_pr checkout identity, HEAD refresh after mutations, fingerprints, approvals, policy, provider, and effect-safety checks unchanged. 4. Add focused invalidation and parity tests, freeze a clean SHA, and require all four 20-cold/30-warm median and p95 surfaces to pass the unchanged +10% gate with a reduced candidate Git-command count. 5. Run critical/static/policy checks, independent evaluation, exact-head hosted review, and integrate through the queue before rebasing release qualification.

## Verify Steps

1. Run the qualification contract tests for the supervisor latency report. Expected: each baseline/candidate surface contains a deterministic, bounded Git command histogram whose total equals the summed per-sample Git subprocess count; instrumentation occurs after the timed command sequence.
2. Run the instrumented packed benchmark against v0.6.26 on a clean SHA with at least 20 cold and 30 warm samples. Expected: the report identifies exact repeated command families and preserves raw evidence; no provider call occurs.
3. Run focused route, task-run-path, supervisor, recovery, stale task/Git/policy/approval, concurrency, crash, and effect-in-doubt suites. Expected: the chosen observation reuse invalidates on every covered state change and no protected side effect can replay.
4. Re-run node scripts/qualification/measure-v0.7.1-supervisor-latency.mjs --subject <clean-implementation-sha> --out <task-evidence>. Expected: every cold/warm median and p95 is <=10% above v0.6.26; managed candidate Git observations are lower than the blocked 2da557536 count of 8 and external preparation does not regress.
5. Run bun run typecheck, touched ESLint/Prettier, bun run test:critical, ap doctor, node .agentplane/policy/check-routing.mjs, independent EVALUATOR, exact-head hosted checks, and review-thread audit. Expected: all pass before queue integration and hosted close.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-04T00:48:00.678Z — VERIFY — ok

By: TESTER

Note: Verified exact implementation SHA 3a526415: instrumented 20-cold/30-warm packed benchmark passed all four unchanged +10% gates and reduced managed Git observations from 8 to 7; supervisor 154/154, recovery 86/86, critical CLI 79/79, qualification 21/21, typecheck, lint, format, doctor, and routing policy passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T00:47:40.985Z, excerpt_hash=sha256:0a4dba5b8db43ca54d48c31317328093974e7f8e699af60823f96fb638134d9d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608040031-4XD57R-attribute-and-remove-redundant-git-observations/.agentplane/tasks/202608040031-4XD57R/blueprint/resolved-snapshot.json
- old_digest: 5e343ccc7db2e0c04fc0a4490ca851980d88eb8d2f60e124f2fbc19bd82b2bcd
- current_digest: 5e343ccc7db2e0c04fc0a4490ca851980d88eb8d2f60e124f2fbc19bd82b2bcd
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608040031-4XD57R

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608040031-4XD57R
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

- Observation: Instrumented evidence identified a duplicate direct-workflow status read: the authoritative Git snapshot already contained dirty paths, while policy scope performed a second status command. Reusing the available snapshot removes exactly one managed-preparation Git observation (8 to 7) and falls back to the original status read when the snapshot is unavailable.
  Impact: Exact SHA 3a526415 passes all four 20-cold/30-warm latency surfaces: cold external median +5.03%/p95 -2.21%, cold managed +4.71%/+4.06%, warm external -13.15%/-9.88%, warm managed +4.97%/+3.32% versus v0.6.26.
  Resolution: Keep snapshot and blueprint observations sequential to avoid cold-start I/O contention; preserve fail-closed fallback, fingerprint projection, HEAD freshness, and all recovery and side-effect checks.

- Observation: The authoritative Git snapshot now supplies direct policy-scope dirty paths only when available; an explicit fallback retains the original status read when snapshot observation is unavailable.
  Impact: Removes one deterministic repository scan from task run preparation without weakening stale-state, policy, approval, recovery, concurrency, or side-effect safety.
  Resolution: Accept for exact-head hosted review and integration; retain the raw attribution, failed parallel-I/O experiment, and passing sequential benchmark as evidence.
