---
id: "202606042316-XH5D0B"
title: "Generate v0.6.17 release social assets"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "release"
  - "social"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-04T23:17:02.941Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-04T23:18:05.784Z"
  updated_by: "CODER"
  note: "Verified: bun run docs:social:generate created the v0.6.17 social preview asset and bun run docs:social:check checked 210 docs social images."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-04T23:18:23.987Z"
  updated_by: "EVALUATOR"
  note: "v0.6.17 release page social asset and manifest entry are generated and docs social checks pass."
  evaluated_sha: "87b120baf0ae9753a866ab5f0d76906933ab2b85"
  blueprint_digest: "497ae564dc032d9a7d729a5c059c457894bf3366f5a3c05248aa99b08ee50b24"
  evidence_refs:
    - ".agentplane/tasks/202606042316-XH5D0B/README.md"
    - ".agentplane/tasks/202606042316-XH5D0B/quality/20260604-231823987-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606042316-XH5D0B/quality/20260604-231823987-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606042316-XH5D0B/quality/20260604-231823987-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606042316-XH5D0B/blueprint/resolved-snapshot.json"
    - "website/static/img/social/docs/releases/v0.6.17.png"
    - "website/static/img/social/manifest.json"
    - "docs-social-check"
  findings:
    - "The review blocker is addressed by website/static/img/social/docs/releases/v0.6.17.png plus manifest.json; bun run docs:social:check passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: generate v0.6.17 docs social preview asset required by release checks."
events:
  -
    type: "status"
    at: "2026-06-04T23:17:03.497Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: generate v0.6.17 docs social preview asset required by release checks."
  -
    type: "verify"
    at: "2026-06-04T23:18:05.784Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run docs:social:generate created the v0.6.17 social preview asset and bun run docs:social:check checked 210 docs social images."
doc_version: 3
doc_updated_at: "2026-06-04T23:18:05.897Z"
doc_updated_by: "CODER"
description: "Generate the social preview image and manifest entry required by docs social checks for docs/releases/v0.6.17.md."
sections:
  Summary: |-
    Generate v0.6.17 release social assets

    Generate the social preview image and manifest entry required by docs social checks for docs/releases/v0.6.17.md.
  Scope: |-
    - In scope: Generate the social preview image and manifest entry required by docs social checks for docs/releases/v0.6.17.md.
    - Out of scope: unrelated refactors not required for "Generate v0.6.17 release social assets".
  Plan: "Generate the missing social preview asset for /docs/releases/v0.6.17 with the existing website generator, commit the PNG and manifest update, and verify with bun run docs:social:check."
  Verify Steps: |-
    PLANNER fallback scaffold for "Generate v0.6.17 release social assets". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Generate v0.6.17 release social assets". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-04T23:18:05.784Z — VERIFY — ok

    By: CODER

    Note: Verified: bun run docs:social:generate created the v0.6.17 social preview asset and bun run docs:social:check checked 210 docs social images.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T23:17:03.497Z, excerpt_hash=sha256:44fedd7f6b75b085997490fa89de2cd062b386a7b72c9d3aba8ba490b7ea2e4e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042309-YWKRCD-write-v0-6-17-release-notes/.agentplane/tasks/202606042316-XH5D0B/blueprint/resolved-snapshot.json
    - old_digest: 497ae564dc032d9a7d729a5c059c457894bf3366f5a3c05248aa99b08ee50b24
    - current_digest: 497ae564dc032d9a7d729a5c059c457894bf3366f5a3c05248aa99b08ee50b24
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606042316-XH5D0B

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606042316-XH5D0B --agent CODER --slug generate-v0-6-17-release-social-assets --worktree
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - runner_required: false
    - runner_failure_means: not_runner_route
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  branch_pr_batch:
    base: "main"
    branch: "task/202606042309-YWKRCD/write-v0-6-17-release-notes"
    included_task_ids:
      - "202606042316-XH5D0B"
    primary_task_id: "202606042309-YWKRCD"
    role: "included"
    updated_at: "2026-06-04T23:18:36.283Z"
id_source: "generated"
---
## Summary

Generate v0.6.17 release social assets

Generate the social preview image and manifest entry required by docs social checks for docs/releases/v0.6.17.md.

## Scope

- In scope: Generate the social preview image and manifest entry required by docs social checks for docs/releases/v0.6.17.md.
- Out of scope: unrelated refactors not required for "Generate v0.6.17 release social assets".

## Plan

Generate the missing social preview asset for /docs/releases/v0.6.17 with the existing website generator, commit the PNG and manifest update, and verify with bun run docs:social:check.

## Verify Steps

PLANNER fallback scaffold for "Generate v0.6.17 release social assets". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Generate v0.6.17 release social assets". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-04T23:18:05.784Z — VERIFY — ok

By: CODER

Note: Verified: bun run docs:social:generate created the v0.6.17 social preview asset and bun run docs:social:check checked 210 docs social images.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T23:17:03.497Z, excerpt_hash=sha256:44fedd7f6b75b085997490fa89de2cd062b386a7b72c9d3aba8ba490b7ea2e4e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042309-YWKRCD-write-v0-6-17-release-notes/.agentplane/tasks/202606042316-XH5D0B/blueprint/resolved-snapshot.json
- old_digest: 497ae564dc032d9a7d729a5c059c457894bf3366f5a3c05248aa99b08ee50b24
- current_digest: 497ae564dc032d9a7d729a5c059c457894bf3366f5a3c05248aa99b08ee50b24
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606042316-XH5D0B

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606042316-XH5D0B --agent CODER --slug generate-v0-6-17-release-social-assets --worktree
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- runner_required: false
- runner_failure_means: not_runner_route
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
