---
id: "202605200641-P7R67H"
title: "Implement observation harvest and follow-up gates"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "trust"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-20T06:41:58.954Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-20T06:54:12.894Z"
  updated_by: "EVALUATOR"
  note: "Quality gate passed for implementation commit 93161f991. Reviewed observation harvest CLI, release observation gating semantics, cold-start retry diagnostics, per-task runs_dir contract alignment, docs/social-image freshness, and promoted prior handled observations. Local focused tests, typechecks, website build:check, social-image check, cold-start guard, eslint, policy routing, doctor, and diff checks passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-20T06:54:12.894Z"
  updated_by: "EVALUATOR"
  note: "Quality gate passed for implementation commit 93161f991. Reviewed observation harvest CLI, release observation gating semantics, cold-start retry diagnostics, per-task runs_dir contract alignment, docs/social-image freshness, and promoted prior handled observations. Local focused tests, typechecks, website build:check, social-image check, cold-start guard, eslint, policy routing, doctor, and diff checks passed."
  evaluated_sha: "93161f99139cc0bafbe21b9674d332a6a392ea6b"
  blueprint_digest: "f22f814449eee013b30806f7b546e9758dac3d623e6795479e62c6e247573760"
  evidence_refs:
    - ".agentplane/tasks/202605200641-P7R67H/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200641-P7R67H-observations-followup-gates/.agentplane/tasks/202605200641-P7R67H/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement approved observations harvest, runtime log surface, cold-start retry/reporting, docs image drift repair, release observation gate, and branch-protection preparation in the dedicated branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-05-20T06:42:30.585Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved observations harvest, runtime log surface, cold-start retry/reporting, docs image drift repair, release observation gate, and branch-protection preparation in the dedicated branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-20T06:53:10.894Z"
    author: "CODER"
    state: "ok"
    note: "Implemented observations harvest, release observation gating, cold-start retry diagnostics, per-task runs_dir contract, docs social image repair, and promoted the prior handled observations. Checks passed: focused observations/release/cold-start tests; core and agentplane typecheck; framework:dev:bootstrap; ap task observations harvest/check smoke; docs:cli:check; docs:scripts:check; website build:check including social images; local CI route explain; bench:cli:cold:check; targeted eslint; format:changed; policy routing; ap doctor; git diff --check."
  -
    type: "verify"
    at: "2026-05-20T06:54:12.894Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality gate passed for implementation commit 93161f991. Reviewed observation harvest CLI, release observation gating semantics, cold-start retry diagnostics, per-task runs_dir contract alignment, docs/social-image freshness, and promoted prior handled observations. Local focused tests, typechecks, website build:check, social-image check, cold-start guard, eslint, policy routing, doctor, and diff checks passed."
doc_version: 3
doc_updated_at: "2026-05-20T06:54:12.910Z"
doc_updated_by: "CODER"
description: "Implement the recent follow-ups from task execution logs: harvest task observations into actionable queues, align runtime log surface, harden cold-start retry/reporting, fix docs social image drift, gate release readiness on blocking observations, and prepare branch protection for the new PR verification aggregate."
sections:
  Summary: |-
    Implement observation harvest and follow-up gates

    Implement the recent follow-ups from task execution logs: harvest task observations into actionable queues, align runtime log surface, harden cold-start retry/reporting, fix docs social image drift, gate release readiness on blocking observations, and prepare branch protection for the new PR verification aggregate.
  Scope: |-
    - In scope: Implement the recent follow-ups from task execution logs: harvest task observations into actionable queues, align runtime log surface, harden cold-start retry/reporting, fix docs social image drift, gate release readiness on blocking observations, and prepare branch protection for the new PR verification aggregate.
    - Out of scope: unrelated refactors not required for "Implement observation harvest and follow-up gates".
  Plan: "1. Implement task observations harvesting: add CLI support to collect open observations across tasks and classify them into GitHub issue, incident, context, agent-improvement, or none actions without parsing README prose. 2. Align the runtime log surface by making the configured observability runs directory real and documenting/recording command execution events where appropriate, or otherwise make the absence explicit in diagnostics. 3. Harden the cold-start guard so borderline transient failures produce retry/reporting evidence instead of a single misleading threshold failure. 4. Repair the stale docs social image build artifact so docs:site:build:check is not blocked by pre-existing image drift. 5. Add release-readiness gating for open medium+ task observations that require triage before publish, with a deterministic bypass only for non-blocking/action=none entries. 6. Verify with focused observations/release/cold-start/docs checks, policy routing, doctor, local CI route explain output, and hosted PR checks. 7. After merge, update branch protection to require Core CI / PR verification if GitHub credentials allow it; if not, record the exact blocker."
  Verify Steps: |-
    1. Run focused tests for task observations, release task readiness, and cold-start baseline retry diagnostics. Expected: all tests pass.
    2. Run agentplane/core typecheck plus agentplane build/framework bootstrap. Expected: typecheck and repo-local runtime are current.
    3. Run observations CLI smoke: ap task observations harvest --json and ap task observations check 202605191736-EQBZ4M. Expected: no invalid or blocking observations and promoted prior follow-ups.
    4. Run release/docs gates: docs:cli:check, docs:scripts:check, website social image check/build check, policy routing, ap doctor, git diff --check. Expected: all pass.
    5. Run local CI route explain for representative workflow/script/doc changes. Expected: routed plan is explainable.
    6. Open PR, wait for hosted checks, integrate through branch_pr merge route, then update or report GitHub branch protection for Core CI / PR verification.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-20T06:53:10.894Z — VERIFY — ok

    By: CODER

    Note: Implemented observations harvest, release observation gating, cold-start retry diagnostics, per-task runs_dir contract, docs social image repair, and promoted the prior handled observations. Checks passed: focused observations/release/cold-start tests; core and agentplane typecheck; framework:dev:bootstrap; ap task observations harvest/check smoke; docs:cli:check; docs:scripts:check; website build:check including social images; local CI route explain; bench:cli:cold:check; targeted eslint; format:changed; policy routing; ap doctor; git diff --check.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T06:51:49.915Z, excerpt_hash=sha256:b70efcc18e31a8996390df57857c80762e8cf26d9bee80c94e526cc5654f4dfc

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200641-P7R67H-observations-followup-gates/.agentplane/tasks/202605200641-P7R67H/blueprint/resolved-snapshot.json
    - old_digest: f22f814449eee013b30806f7b546e9758dac3d623e6795479e62c6e247573760
    - current_digest: f22f814449eee013b30806f7b546e9758dac3d623e6795479e62c6e247573760
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605200641-P7R67H

    ### 2026-05-20T06:54:12.894Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality gate passed for implementation commit 93161f991. Reviewed observation harvest CLI, release observation gating semantics, cold-start retry diagnostics, per-task runs_dir contract alignment, docs/social-image freshness, and promoted prior handled observations. Local focused tests, typechecks, website build:check, social-image check, cold-start guard, eslint, policy routing, doctor, and diff checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T06:53:10.911Z, excerpt_hash=sha256:b70efcc18e31a8996390df57857c80762e8cf26d9bee80c94e526cc5654f4dfc

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200641-P7R67H-observations-followup-gates/.agentplane/tasks/202605200641-P7R67H/blueprint/resolved-snapshot.json
    - old_digest: f22f814449eee013b30806f7b546e9758dac3d623e6795479e62c6e247573760
    - current_digest: f22f814449eee013b30806f7b546e9758dac3d623e6795479e62c6e247573760
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605200641-P7R67H

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Release-ready observation gate cannot be run directly in this active worktree because the current task is DOING by design.
      Impact: The new gate behavior is covered by task-registry-ready-script tests and observation smoke; direct release readiness should be rerun after merge/close.
      Resolution: Proceed through branch_pr PR checks, then confirm hosted release-ready behavior on GitHub after the task is merged.
id_source: "generated"
---
## Summary

Implement observation harvest and follow-up gates

Implement the recent follow-ups from task execution logs: harvest task observations into actionable queues, align runtime log surface, harden cold-start retry/reporting, fix docs social image drift, gate release readiness on blocking observations, and prepare branch protection for the new PR verification aggregate.

## Scope

- In scope: Implement the recent follow-ups from task execution logs: harvest task observations into actionable queues, align runtime log surface, harden cold-start retry/reporting, fix docs social image drift, gate release readiness on blocking observations, and prepare branch protection for the new PR verification aggregate.
- Out of scope: unrelated refactors not required for "Implement observation harvest and follow-up gates".

## Plan

1. Implement task observations harvesting: add CLI support to collect open observations across tasks and classify them into GitHub issue, incident, context, agent-improvement, or none actions without parsing README prose. 2. Align the runtime log surface by making the configured observability runs directory real and documenting/recording command execution events where appropriate, or otherwise make the absence explicit in diagnostics. 3. Harden the cold-start guard so borderline transient failures produce retry/reporting evidence instead of a single misleading threshold failure. 4. Repair the stale docs social image build artifact so docs:site:build:check is not blocked by pre-existing image drift. 5. Add release-readiness gating for open medium+ task observations that require triage before publish, with a deterministic bypass only for non-blocking/action=none entries. 6. Verify with focused observations/release/cold-start/docs checks, policy routing, doctor, local CI route explain output, and hosted PR checks. 7. After merge, update branch protection to require Core CI / PR verification if GitHub credentials allow it; if not, record the exact blocker.

## Verify Steps

1. Run focused tests for task observations, release task readiness, and cold-start baseline retry diagnostics. Expected: all tests pass.
2. Run agentplane/core typecheck plus agentplane build/framework bootstrap. Expected: typecheck and repo-local runtime are current.
3. Run observations CLI smoke: ap task observations harvest --json and ap task observations check 202605191736-EQBZ4M. Expected: no invalid or blocking observations and promoted prior follow-ups.
4. Run release/docs gates: docs:cli:check, docs:scripts:check, website social image check/build check, policy routing, ap doctor, git diff --check. Expected: all pass.
5. Run local CI route explain for representative workflow/script/doc changes. Expected: routed plan is explainable.
6. Open PR, wait for hosted checks, integrate through branch_pr merge route, then update or report GitHub branch protection for Core CI / PR verification.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-20T06:53:10.894Z — VERIFY — ok

By: CODER

Note: Implemented observations harvest, release observation gating, cold-start retry diagnostics, per-task runs_dir contract, docs social image repair, and promoted the prior handled observations. Checks passed: focused observations/release/cold-start tests; core and agentplane typecheck; framework:dev:bootstrap; ap task observations harvest/check smoke; docs:cli:check; docs:scripts:check; website build:check including social images; local CI route explain; bench:cli:cold:check; targeted eslint; format:changed; policy routing; ap doctor; git diff --check.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T06:51:49.915Z, excerpt_hash=sha256:b70efcc18e31a8996390df57857c80762e8cf26d9bee80c94e526cc5654f4dfc

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200641-P7R67H-observations-followup-gates/.agentplane/tasks/202605200641-P7R67H/blueprint/resolved-snapshot.json
- old_digest: f22f814449eee013b30806f7b546e9758dac3d623e6795479e62c6e247573760
- current_digest: f22f814449eee013b30806f7b546e9758dac3d623e6795479e62c6e247573760
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605200641-P7R67H

### 2026-05-20T06:54:12.894Z — VERIFY — ok

By: EVALUATOR

Note: Quality gate passed for implementation commit 93161f991. Reviewed observation harvest CLI, release observation gating semantics, cold-start retry diagnostics, per-task runs_dir contract alignment, docs/social-image freshness, and promoted prior handled observations. Local focused tests, typechecks, website build:check, social-image check, cold-start guard, eslint, policy routing, doctor, and diff checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T06:53:10.911Z, excerpt_hash=sha256:b70efcc18e31a8996390df57857c80762e8cf26d9bee80c94e526cc5654f4dfc

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200641-P7R67H-observations-followup-gates/.agentplane/tasks/202605200641-P7R67H/blueprint/resolved-snapshot.json
- old_digest: f22f814449eee013b30806f7b546e9758dac3d623e6795479e62c6e247573760
- current_digest: f22f814449eee013b30806f7b546e9758dac3d623e6795479e62c6e247573760
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605200641-P7R67H

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Release-ready observation gate cannot be run directly in this active worktree because the current task is DOING by design.
  Impact: The new gate behavior is covered by task-registry-ready-script tests and observation smoke; direct release readiness should be rerun after merge/close.
  Resolution: Proceed through branch_pr PR checks, then confirm hosted release-ready behavior on GitHub after the task is merged.
