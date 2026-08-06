---
id: "202608052127-XWDY4R"
title: "Keep release diagnostics on the current published target"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 24
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "regression"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T21:32:45.986Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-06T00:09:30.562Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-05T23:53:35.466Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 2 typed finding(s)."
  evaluated_sha: "948b9d8a90b7e5483f55dcf04053be5106eff035"
  blueprint_digest: "3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94"
  evidence_refs:
    - ".agentplane/tasks/202608052127-XWDY4R/quality/20260805-235334800-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608052127-XWDY4R/quality/20260805-235334800-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608052127-XWDY4R/quality/objects/sha256/3c589bb3d9fc987a1d46d929e9ddf8e14a4169b3d45a7b81d620f7f1ad950d3a.md"
    - ".agentplane/tasks/202608052127-XWDY4R/quality/20260805-235334800-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608052127-XWDY4R/quality/20260805-235334800-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608052127-XWDY4R/quality/20260805-235334800-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608052127-XWDY4R/quality/20260805-235334800-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608052127-XWDY4R/README.md"
    - ".agentplane/tasks/202608052127-XWDY4R/quality/objects/sha256/89c53905d0d48525cdc39511155336552e5dd2d8df4ea8c35291316ef5daba0d.patch"
    - ".agentplane/tasks/202608052127-XWDY4R/quality/objects/sha256/1e20db7fa98d0d3df8e8c09241515c2db2152998abd635236fb58119a2ef59b7.json"
    - ".agentplane/tasks/202608052127-XWDY4R/verification/20260805234909952-0abbe8f50f50bd28.json"
    - ".agentplane/tasks/202608052127-XWDY4R/quality/objects/sha256/5a6be8e8bb4eef600218e0e0f9e31d0be93457cb7dca9813a7a6213dcd7a561f.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.release.md"
  findings:
    - "executeEvaluatorSupervisorEpisode treats every intent_recorded journal as a resumable evaluator outcome; when the latest operation is PLANNER/agent_episode it catches validation failure and stops the shared journal as effect_in_doubt."
    - "acceptExternalAgentResult only accepts a running intent_recorded journal, so a later matching PLANNER result cannot reconcile the effect after the evaluator-induced stop."
commit:
  hash: "948b9d8a90b7e5483f55dcf04053be5106eff035"
  message: "🚧 XWDY4R task: satisfy formatting contract"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation ready for independent verification: release diagnostics and evidence are bound to the exact current target; focused regressions pass."
  -
    author: "CODER"
    body: "Rework complete: canonical formatting applied mechanically to the provider conflict-rework matrix; focused test and repository-wide format check pass."
events:
  -
    type: "status"
    at: "2026-08-05T21:28:48.106Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-05T22:28:42.223Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation ready for independent verification: release diagnostics and evidence are bound to the exact current target; focused regressions pass."
  -
    type: "verify"
    at: "2026-08-05T22:30:00.773Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Contract gate rework: repository-wide Prettier rejects the touched provider conflict-rework test; apply the canonical formatter in a dedicated mechanical commit, then rerun ci:contract."
  -
    type: "status"
    at: "2026-08-05T22:31:10.586Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Rework complete: canonical formatting applied mechanically to the provider conflict-rework matrix; focused test and repository-wide format check pass."
  -
    type: "verify"
    at: "2026-08-05T23:45:59.060Z"
    author: "TESTER"
    state: "ok"
    note: "Consolidated post-release verification passed on 3195e6fb: focused release regressions, typecheck, lint/format, ci:contract, critical tests, doctor, routing, release:prepublish, full v0.7 qualification, and one no-retry 50-run/55-episode provider matrix. Qualification ready 18/19 with zero blocking defects; the sole absolute latency advisory is cleared by matched v0.6.26 comparison."
  -
    type: "verify"
    at: "2026-08-05T23:47:25.283Z"
    author: "TESTER"
    state: "ok"
    note: "Verification rebound after committing the archived evidence set. Candidate code remains 3195e6fb/948b9d8a implementation; consolidated qualification evidence is now part of the reviewed diff. No provider or test retry was performed."
  -
    type: "verify"
    at: "2026-08-05T23:49:09.952Z"
    author: "TESTER"
    state: "ok"
    note: "Consolidated post-release verification accepted with structured durable evidence; no test or provider retry was performed."
  -
    type: "verify"
    at: "2026-08-06T00:09:30.562Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
doc_version: 3
doc_updated_at: "2026-08-06T00:09:31.825Z"
doc_updated_by: "CODER"
description: "Prevent release next-action from mixing the current package/tag target with stale local release-plan SHA and hosted evidence; add regression coverage, merge the fix, and publish the verified v0.7.4 patch release."
sections:
  Summary: |-
    Keep release diagnostics on the current published target

    Prevent release next-action from mixing the current package/tag target with stale local release-plan SHA and hosted evidence; add regression coverage, merge the fix, and publish the verified v0.7.4 patch release.
  Scope: "In scope: a consolidated post-release audit and fix set for installation and upgrade surfaces, package exports and assets, direct and branch_pr task lifecycle variants, automatic context generation and budget/safety boundaries, evaluator and provider handoffs, stale/concurrent/crash/authority recovery, release plan/evidence/idempotency diagnostics, token and latency regression, release notes/version artifacts, and one final patch publication. Out of scope: unrelated dependency upgrades, new product features, deletion of ambiguous task branches or user artifacts, and TypeScript 7 compiler migration."
  Plan: "Consolidated post-release patch plan. 1. Freeze a risk-based post-release matrix covering npm and binary installs, upgrades from supported 0.6.x and 0.7.x states, direct and branch_pr task lifecycles, context synthesis and budget boundaries, evaluator routes, authority/stale/concurrency/crash recovery, release recovery/evidence/idempotency, package exports, platform artifacts, and token/latency regressions. 2. Execute deterministic suites against published 0.7.3 and current main, plus bounded live provider smoke without retry; record every failure before editing. 3. Classify failures as product defect, test/evidence defect, environment issue, or expected fail-closed behavior; implement all confirmed release-blocking product fixes in PR #4780 without changing unrelated semantics. 4. Re-run the complete matrix and existing v0.7 qualification/prepublish gates; require zero blocking failures and no token/latency/quality regression. 5. Merge once through protected main. 6. Generate one patch target after the fix set is frozen, publish it from the exact merged SHA, and verify npm, tag, GitHub Release, assets, clean install, upgrade, postpublish audit, and terminal evidence. No intermediate patch publication."
  Verify Steps: "1. Run and archive the consolidated post-release matrix against published 0.7.3 and the candidate: clean npm install, packed install, platform asset manifest/install scripts, supported upgrade fixtures, Node package exports, direct and branch_pr lifecycle variants, automatic context synthesis and bounded omission/safety cases, evaluator verdict routes, stale state, authority, concurrency, crash/effect-in-doubt recovery, release plan/evidence/idempotency, and CLI machine-output identity. Expected: all scenarios classify deterministically and candidate has zero blocking product failures. 2. Run focused regression tests for every confirmed defect, bun run typecheck, formatting/lint on touched files, bun run ci:contract, bun run test:critical, agentplane doctor, and node .agentplane/policy/check-routing.mjs. Expected: all pass. 3. Run the full v0.7 qualification and bun run release:prepublish. Expected: existing effectiveness, quality, token, matched-latency, workflow, significant-coverage, release-critical, migration, and packed-install gates do not regress. 4. Run bounded live provider smoke without retry only after deterministic gates pass. Expected: recorded provider provenance, no scope violation, correct task/context handoff, and no retry masking. 5. After one protected-main merge, publish exactly one patch release and run postpublish audit plus clean npm and upgrade installs of all three packages. Expected: npm latest, tag, GitHub Release, assets, installed CLI version, release SHA, and evidence PR all agree."
  Verification: |-
    Pending consolidated post-release matrix, defect fixes, full requalification, and exact-SHA publication evidence.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T22:30:00.773Z — VERIFY — needs_rework

    By: TESTER

    Note: Contract gate rework: repository-wide Prettier rejects the touched provider conflict-rework test; apply the canonical formatter in a dedicated mechanical commit, then rerun ci:contract.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T22:28:42.223Z, excerpt_hash=sha256:601864529a301c859f24781e57ab5147e863d1919530ac48c0866ae21d2ed463

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608052127-XWDY4R-keep-release-diagnostics-on-the-current-publishe/.agentplane/tasks/202608052127-XWDY4R/blueprint/resolved-snapshot.json
    - old_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
    - current_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608052127-XWDY4R

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608052127-XWDY4R
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T23:45:59.060Z — VERIFY — ok

    By: TESTER

    Note: Consolidated post-release verification passed on 3195e6fb: focused release regressions, typecheck, lint/format, ci:contract, critical tests, doctor, routing, release:prepublish, full v0.7 qualification, and one no-retry 50-run/55-episode provider matrix. Qualification ready 18/19 with zero blocking defects; the sole absolute latency advisory is cleared by matched v0.6.26 comparison.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T22:31:10.586Z, excerpt_hash=sha256:601864529a301c859f24781e57ab5147e863d1919530ac48c0866ae21d2ed463

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608052127-XWDY4R-keep-release-diagnostics-on-the-current-publishe/.agentplane/tasks/202608052127-XWDY4R/blueprint/resolved-snapshot.json
    - old_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
    - current_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608052127-XWDY4R

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T23:47:25.283Z — VERIFY — ok

    By: TESTER

    Note: Verification rebound after committing the archived evidence set. Candidate code remains 3195e6fb/948b9d8a implementation; consolidated qualification evidence is now part of the reviewed diff. No provider or test retry was performed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T23:46:00.003Z, excerpt_hash=sha256:601864529a301c859f24781e57ab5147e863d1919530ac48c0866ae21d2ed463

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608052127-XWDY4R-keep-release-diagnostics-on-the-current-publishe/.agentplane/tasks/202608052127-XWDY4R/blueprint/resolved-snapshot.json
    - old_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
    - current_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608052127-XWDY4R

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608052127-XWDY4R
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T23:49:09.952Z — VERIFY — ok

    By: TESTER

    Note: Consolidated post-release verification accepted with structured durable evidence; no test or provider retry was performed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T23:47:26.478Z, excerpt_hash=sha256:601864529a301c859f24781e57ab5147e863d1919530ac48c0866ae21d2ed463

    Details:

    Command: bun run release:prepublish
    Result: pass
    Evidence: .agentplane/tasks/202608052127-XWDY4R/evidence/consolidated-qualification-3195e6fb/logs/full-contract.log and packaged-candidate-flow.log
    Scope: complete build, contract, migration, packed-install, platform, workflow, coverage, and release-critical gates

    Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full --provider --codex-version 0.146.0-alpha.3.1
    Result: pass
    Evidence: .agentplane/tasks/202608052127-XWDY4R/evidence/consolidated-qualification-3195e6fb/report.json and efficiency-evidence.json
    Scope: exact candidate 3195e6fb; 50 runs, 55 provider episodes, no retry, zero blocking defects

    Command: bun run ci:contract and bun run test:critical
    Result: pass
    Evidence: .agentplane/tasks/202608052127-XWDY4R/evidence/consolidated-qualification-3195e6fb/logs/full-contract.log and critical-cli.log
    Scope: repository contract plus release-critical CLI regression surface

    Command: bun run release:evidence:collect -- --version 0.7.3 --json
    Result: pass
    Evidence: .agentplane/.release/evidence/v0.7.3.json
    Scope: exact-tag npm, GitHub Release, successful publish workflow, canonical publish-result, and idempotent postpublish audit

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608052127-XWDY4R-keep-release-diagnostics-on-the-current-publishe/.agentplane/tasks/202608052127-XWDY4R/blueprint/resolved-snapshot.json
    - old_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
    - current_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608052127-XWDY4R

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608052127-XWDY4R
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-06T00:09:30.562Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T23:49:11.218Z, excerpt_hash=sha256:601864529a301c859f24781e57ab5147e863d1919530ac48c0866ae21d2ed463

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608052127-XWDY4R-keep-release-diagnostics-on-the-current-publishe/.agentplane/tasks/202608052127-XWDY4R/blueprint/resolved-snapshot.json
    - old_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
    - current_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608052127-XWDY4R

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608052127-XWDY4R
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Before publication, revert the task PR. After publication, never reuse the npm version or move the tag; fix any release-only regression in a new patch version while preserving published evidence."
  Findings: |-
    Confirmed post-release findings and fixes: (1) release next-action accepted stale recovery-plan SHA and hosted workflow truth for a different target; diagnostics now gate recovery applicability by exact version/tag and derive the current release SHA from the current tag. (2) release evidence was not terminal/idempotent; release state now validates target-bound evidence and next-action advances only after valid evidence. (3) evidence collection wrote failed postpublish audits as apparent success; it now resolves the exact-SHA successful publish workflow, downloads/reuses its canonical publish-result, validates npm/tag/GitHub Release identity, writes schema v2 evidence, and exits nonzero on any missing channel. (4) the provider conflict-rework matrix had a 60-second aggregate budget despite exercising many lifecycle/provider variants; its integration-matrix budget now matches comparable 120-second suites. Published v0.7.3 live proof: exact tag SHA 0e5a2babdcd2f810402407e25f199b70c76bd4c5, publish run 31047592552, all three npm packages 0.7.3, GitHub Release present, postpublish audit ok, repeated evidence collection reused the exact local artifact while rechecking the hosted workflow.

    - Observation: bun run ci:contract stopped at format:check because packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts differs from canonical Prettier output.
      Impact: The consolidated patch cannot enter release prepublish while the deterministic contract gate is red.
      Resolution: Reformat only the touched test mechanically, preserve its assertions and 120-second matrix budget, then repeat contract and critical gates.

    - Observation: Release diagnostics were stale-target prone and failed evidence could appear reusable; provider and full release regressions required one immutable candidate proof.
      Impact: The patch now binds release state and evidence to the exact current version, tag, release SHA, hosted publish run, npm packages, and GitHub Release while retaining deterministic failure semantics.
      Resolution: Archived consolidated evidence under .agentplane/tasks/202608052127-XWDY4R/evidence/consolidated-qualification-3195e6fb; token reduction 32.60%, verified success 8 to 20, scope violations 17 to 5, golden mismatches 33 to 10, no blocking defects.

    - Observation: The first passing record preceded the evidence archive commit, so the route correctly treated the expanded task diff as unverified.
      Impact: Without rebinding, PR publication could advance with task evidence not covered by the recorded diff fingerprint.
      Resolution: Reviewed the evidence-only commit 6f3aacfc8831 and recorded the same passing result against the complete current diff; semantic candidate and all prior test outputs are unchanged.
extensions:
  workflow_route_baseline:
    start_head_sha: "944dc6eefcd5ea79c33af066caf1078f881e371a"
    version: 1
id_source: "generated"
---
## Summary

Keep release diagnostics on the current published target

Prevent release next-action from mixing the current package/tag target with stale local release-plan SHA and hosted evidence; add regression coverage, merge the fix, and publish the verified v0.7.4 patch release.

## Scope

In scope: a consolidated post-release audit and fix set for installation and upgrade surfaces, package exports and assets, direct and branch_pr task lifecycle variants, automatic context generation and budget/safety boundaries, evaluator and provider handoffs, stale/concurrent/crash/authority recovery, release plan/evidence/idempotency diagnostics, token and latency regression, release notes/version artifacts, and one final patch publication. Out of scope: unrelated dependency upgrades, new product features, deletion of ambiguous task branches or user artifacts, and TypeScript 7 compiler migration.

## Plan

Consolidated post-release patch plan. 1. Freeze a risk-based post-release matrix covering npm and binary installs, upgrades from supported 0.6.x and 0.7.x states, direct and branch_pr task lifecycles, context synthesis and budget boundaries, evaluator routes, authority/stale/concurrency/crash recovery, release recovery/evidence/idempotency, package exports, platform artifacts, and token/latency regressions. 2. Execute deterministic suites against published 0.7.3 and current main, plus bounded live provider smoke without retry; record every failure before editing. 3. Classify failures as product defect, test/evidence defect, environment issue, or expected fail-closed behavior; implement all confirmed release-blocking product fixes in PR #4780 without changing unrelated semantics. 4. Re-run the complete matrix and existing v0.7 qualification/prepublish gates; require zero blocking failures and no token/latency/quality regression. 5. Merge once through protected main. 6. Generate one patch target after the fix set is frozen, publish it from the exact merged SHA, and verify npm, tag, GitHub Release, assets, clean install, upgrade, postpublish audit, and terminal evidence. No intermediate patch publication.

## Verify Steps

1. Run and archive the consolidated post-release matrix against published 0.7.3 and the candidate: clean npm install, packed install, platform asset manifest/install scripts, supported upgrade fixtures, Node package exports, direct and branch_pr lifecycle variants, automatic context synthesis and bounded omission/safety cases, evaluator verdict routes, stale state, authority, concurrency, crash/effect-in-doubt recovery, release plan/evidence/idempotency, and CLI machine-output identity. Expected: all scenarios classify deterministically and candidate has zero blocking product failures. 2. Run focused regression tests for every confirmed defect, bun run typecheck, formatting/lint on touched files, bun run ci:contract, bun run test:critical, agentplane doctor, and node .agentplane/policy/check-routing.mjs. Expected: all pass. 3. Run the full v0.7 qualification and bun run release:prepublish. Expected: existing effectiveness, quality, token, matched-latency, workflow, significant-coverage, release-critical, migration, and packed-install gates do not regress. 4. Run bounded live provider smoke without retry only after deterministic gates pass. Expected: recorded provider provenance, no scope violation, correct task/context handoff, and no retry masking. 5. After one protected-main merge, publish exactly one patch release and run postpublish audit plus clean npm and upgrade installs of all three packages. Expected: npm latest, tag, GitHub Release, assets, installed CLI version, release SHA, and evidence PR all agree.

## Verification

Pending consolidated post-release matrix, defect fixes, full requalification, and exact-SHA publication evidence.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T22:30:00.773Z — VERIFY — needs_rework

By: TESTER

Note: Contract gate rework: repository-wide Prettier rejects the touched provider conflict-rework test; apply the canonical formatter in a dedicated mechanical commit, then rerun ci:contract.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T22:28:42.223Z, excerpt_hash=sha256:601864529a301c859f24781e57ab5147e863d1919530ac48c0866ae21d2ed463

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608052127-XWDY4R-keep-release-diagnostics-on-the-current-publishe/.agentplane/tasks/202608052127-XWDY4R/blueprint/resolved-snapshot.json
- old_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
- current_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608052127-XWDY4R

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608052127-XWDY4R
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T23:45:59.060Z — VERIFY — ok

By: TESTER

Note: Consolidated post-release verification passed on 3195e6fb: focused release regressions, typecheck, lint/format, ci:contract, critical tests, doctor, routing, release:prepublish, full v0.7 qualification, and one no-retry 50-run/55-episode provider matrix. Qualification ready 18/19 with zero blocking defects; the sole absolute latency advisory is cleared by matched v0.6.26 comparison.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T22:31:10.586Z, excerpt_hash=sha256:601864529a301c859f24781e57ab5147e863d1919530ac48c0866ae21d2ed463

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608052127-XWDY4R-keep-release-diagnostics-on-the-current-publishe/.agentplane/tasks/202608052127-XWDY4R/blueprint/resolved-snapshot.json
- old_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
- current_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608052127-XWDY4R

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T23:47:25.283Z — VERIFY — ok

By: TESTER

Note: Verification rebound after committing the archived evidence set. Candidate code remains 3195e6fb/948b9d8a implementation; consolidated qualification evidence is now part of the reviewed diff. No provider or test retry was performed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T23:46:00.003Z, excerpt_hash=sha256:601864529a301c859f24781e57ab5147e863d1919530ac48c0866ae21d2ed463

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608052127-XWDY4R-keep-release-diagnostics-on-the-current-publishe/.agentplane/tasks/202608052127-XWDY4R/blueprint/resolved-snapshot.json
- old_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
- current_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608052127-XWDY4R

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608052127-XWDY4R
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T23:49:09.952Z — VERIFY — ok

By: TESTER

Note: Consolidated post-release verification accepted with structured durable evidence; no test or provider retry was performed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T23:47:26.478Z, excerpt_hash=sha256:601864529a301c859f24781e57ab5147e863d1919530ac48c0866ae21d2ed463

Details:

Command: bun run release:prepublish
Result: pass
Evidence: .agentplane/tasks/202608052127-XWDY4R/evidence/consolidated-qualification-3195e6fb/logs/full-contract.log and packaged-candidate-flow.log
Scope: complete build, contract, migration, packed-install, platform, workflow, coverage, and release-critical gates

Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full --provider --codex-version 0.146.0-alpha.3.1
Result: pass
Evidence: .agentplane/tasks/202608052127-XWDY4R/evidence/consolidated-qualification-3195e6fb/report.json and efficiency-evidence.json
Scope: exact candidate 3195e6fb; 50 runs, 55 provider episodes, no retry, zero blocking defects

Command: bun run ci:contract and bun run test:critical
Result: pass
Evidence: .agentplane/tasks/202608052127-XWDY4R/evidence/consolidated-qualification-3195e6fb/logs/full-contract.log and critical-cli.log
Scope: repository contract plus release-critical CLI regression surface

Command: bun run release:evidence:collect -- --version 0.7.3 --json
Result: pass
Evidence: .agentplane/.release/evidence/v0.7.3.json
Scope: exact-tag npm, GitHub Release, successful publish workflow, canonical publish-result, and idempotent postpublish audit

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608052127-XWDY4R-keep-release-diagnostics-on-the-current-publishe/.agentplane/tasks/202608052127-XWDY4R/blueprint/resolved-snapshot.json
- old_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
- current_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608052127-XWDY4R

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608052127-XWDY4R
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-06T00:09:30.562Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T23:49:11.218Z, excerpt_hash=sha256:601864529a301c859f24781e57ab5147e863d1919530ac48c0866ae21d2ed463

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608052127-XWDY4R-keep-release-diagnostics-on-the-current-publishe/.agentplane/tasks/202608052127-XWDY4R/blueprint/resolved-snapshot.json
- old_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
- current_digest: 3fe0b72ea882ded7217e863c43b2b5ea11f53ab7bd1cd55c7d25440fafaefb94
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608052127-XWDY4R

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608052127-XWDY4R
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Before publication, revert the task PR. After publication, never reuse the npm version or move the tag; fix any release-only regression in a new patch version while preserving published evidence.

## Findings

Confirmed post-release findings and fixes: (1) release next-action accepted stale recovery-plan SHA and hosted workflow truth for a different target; diagnostics now gate recovery applicability by exact version/tag and derive the current release SHA from the current tag. (2) release evidence was not terminal/idempotent; release state now validates target-bound evidence and next-action advances only after valid evidence. (3) evidence collection wrote failed postpublish audits as apparent success; it now resolves the exact-SHA successful publish workflow, downloads/reuses its canonical publish-result, validates npm/tag/GitHub Release identity, writes schema v2 evidence, and exits nonzero on any missing channel. (4) the provider conflict-rework matrix had a 60-second aggregate budget despite exercising many lifecycle/provider variants; its integration-matrix budget now matches comparable 120-second suites. Published v0.7.3 live proof: exact tag SHA 0e5a2babdcd2f810402407e25f199b70c76bd4c5, publish run 31047592552, all three npm packages 0.7.3, GitHub Release present, postpublish audit ok, repeated evidence collection reused the exact local artifact while rechecking the hosted workflow.

- Observation: bun run ci:contract stopped at format:check because packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts differs from canonical Prettier output.
  Impact: The consolidated patch cannot enter release prepublish while the deterministic contract gate is red.
  Resolution: Reformat only the touched test mechanically, preserve its assertions and 120-second matrix budget, then repeat contract and critical gates.

- Observation: Release diagnostics were stale-target prone and failed evidence could appear reusable; provider and full release regressions required one immutable candidate proof.
  Impact: The patch now binds release state and evidence to the exact current version, tag, release SHA, hosted publish run, npm packages, and GitHub Release while retaining deterministic failure semantics.
  Resolution: Archived consolidated evidence under .agentplane/tasks/202608052127-XWDY4R/evidence/consolidated-qualification-3195e6fb; token reduction 32.60%, verified success 8 to 20, scope violations 17 to 5, golden mismatches 33 to 10, no blocking defects.

- Observation: The first passing record preceded the evidence archive commit, so the route correctly treated the expanded task diff as unverified.
  Impact: Without rebinding, PR publication could advance with task evidence not covered by the recorded diff fingerprint.
  Resolution: Reviewed the evidence-only commit 6f3aacfc8831 and recorded the same passing result against the complete current diff; semantic candidate and all prior test outputs are unchanged.
