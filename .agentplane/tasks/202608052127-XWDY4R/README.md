---
id: "202608052127-XWDY4R"
title: "Keep release diagnostics on the current published target"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 18
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
  state: "needs_rework"
  updated_at: "2026-08-05T22:30:00.773Z"
  updated_by: "TESTER"
  note: "Contract gate rework: repository-wide Prettier rejects the touched provider conflict-rework test; apply the canonical formatter in a dedicated mechanical commit, then rerun ci:contract."
  attempts: 1
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation ready for independent verification: release diagnostics and evidence are bound to the exact current target; focused regressions pass."
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
doc_version: 3
doc_updated_at: "2026-08-05T22:30:01.751Z"
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

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Before publication, revert the task PR. After publication, never reuse the npm version or move the tag; fix any release-only regression in a new patch version while preserving published evidence."
  Findings: |-
    Confirmed post-release findings and fixes: (1) release next-action accepted stale recovery-plan SHA and hosted workflow truth for a different target; diagnostics now gate recovery applicability by exact version/tag and derive the current release SHA from the current tag. (2) release evidence was not terminal/idempotent; release state now validates target-bound evidence and next-action advances only after valid evidence. (3) evidence collection wrote failed postpublish audits as apparent success; it now resolves the exact-SHA successful publish workflow, downloads/reuses its canonical publish-result, validates npm/tag/GitHub Release identity, writes schema v2 evidence, and exits nonzero on any missing channel. (4) the provider conflict-rework matrix had a 60-second aggregate budget despite exercising many lifecycle/provider variants; its integration-matrix budget now matches comparable 120-second suites. Published v0.7.3 live proof: exact tag SHA 0e5a2babdcd2f810402407e25f199b70c76bd4c5, publish run 31047592552, all three npm packages 0.7.3, GitHub Release present, postpublish audit ok, repeated evidence collection reused the exact local artifact while rechecking the hosted workflow.

    - Observation: bun run ci:contract stopped at format:check because packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts differs from canonical Prettier output.
      Impact: The consolidated patch cannot enter release prepublish while the deterministic contract gate is red.
      Resolution: Reformat only the touched test mechanically, preserve its assertions and 120-second matrix budget, then repeat contract and critical gates.
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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Before publication, revert the task PR. After publication, never reuse the npm version or move the tag; fix any release-only regression in a new patch version while preserving published evidence.

## Findings

Confirmed post-release findings and fixes: (1) release next-action accepted stale recovery-plan SHA and hosted workflow truth for a different target; diagnostics now gate recovery applicability by exact version/tag and derive the current release SHA from the current tag. (2) release evidence was not terminal/idempotent; release state now validates target-bound evidence and next-action advances only after valid evidence. (3) evidence collection wrote failed postpublish audits as apparent success; it now resolves the exact-SHA successful publish workflow, downloads/reuses its canonical publish-result, validates npm/tag/GitHub Release identity, writes schema v2 evidence, and exits nonzero on any missing channel. (4) the provider conflict-rework matrix had a 60-second aggregate budget despite exercising many lifecycle/provider variants; its integration-matrix budget now matches comparable 120-second suites. Published v0.7.3 live proof: exact tag SHA 0e5a2babdcd2f810402407e25f199b70c76bd4c5, publish run 31047592552, all three npm packages 0.7.3, GitHub Release present, postpublish audit ok, repeated evidence collection reused the exact local artifact while rechecking the hosted workflow.

- Observation: bun run ci:contract stopped at format:check because packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts differs from canonical Prettier output.
  Impact: The consolidated patch cannot enter release prepublish while the deterministic contract gate is red.
  Resolution: Reformat only the touched test mechanically, preserve its assertions and 120-second matrix budget, then repeat contract and critical gates.
