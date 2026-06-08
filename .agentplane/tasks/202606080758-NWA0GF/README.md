---
id: "202606080758-NWA0GF"
title: "Fix patch release readiness issues"
result_summary: "Merged via PR #4481."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify:
  - "ap doctor"
  - "bun run release:check"
  - "bun run release:tasks:check"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/cli/run-cli.core.intake.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts packages/agentplane/src/commands/release/release-next-action-script.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-06-08T07:59:00.205Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-08T08:32:53.134Z"
  updated_by: "CODER"
  note: "Verified: focused intake/insights/release/direct/commit-wrapper tests passed; format:check passed; docs:cli:check passed; hotspots:check passed; release:check passed; typecheck passed; policy routing passed; ap doctor passed. release:tasks:check is blocked only by this active DOING task before closeout."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-08T08:46:38.419Z"
  updated_by: "EVALUATOR"
  note: "Patch-release readiness fixes are scoped and verified."
  evaluated_sha: "1e52f06d7a43dc26629783c31ea38ae6192424d3"
  blueprint_digest: "2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215"
  evidence_refs:
    - ".agentplane/tasks/202606080758-NWA0GF/README.md"
    - ".agentplane/tasks/202606080758-NWA0GF/quality/20260608-084638419-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606080758-NWA0GF/quality/20260608-084638419-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606080758-NWA0GF/quality/20260608-084638419-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606080758-NWA0GF/blueprint/resolved-snapshot.json"
    - "bun test focused suites; bun run format:check; bun run docs:cli:check; bun run hotspots:check; bun run release:check; bun run typecheck; node .agentplane/policy/check-routing.mjs; ap doctor; GitHub PR #4481 checks pass"
  findings:
    - "Implementation covers intake file/Russian prompt detection, redacted intake manifests, release GitHub fallback, insights legacy manifest bucketing, direct reconcile scoping, policy-safe close commit subjects, and no-close guidance. Local checks passed; hosted PR checks passed on PR #4481 before integration attempt."
commit:
  hash: "c787343ba654bef1a9e42483708fd8afad016b74"
  message: "🛠️ NWA0GF code: fix patch release readiness checks"
comments:
  -
    author: "CODER"
    body: "Start: implementing release-readiness fixes for intake diagnostics, insights quality counters, release next-action GitHub fallback, and direct-workflow issue triage in the dedicated task worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4481 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-06-08T07:59:25.134Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing release-readiness fixes for intake diagnostics, insights quality counters, release next-action GitHub fallback, and direct-workflow issue triage in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-06-08T08:12:47.843Z"
    author: "CODER"
    state: "ok"
    note: "Focused tests, release:check, typecheck, policy routing, and ap doctor passed. release:tasks:check is blocked only because this active task is still DOING before closeout."
  -
    type: "verify"
    at: "2026-06-08T08:14:35.139Z"
    author: "CODER"
    state: "ok"
    note: "Verified: focused intake/insights/release/direct tests passed; release:check passed; typecheck passed; policy routing passed; ap doctor passed. release:tasks:check is blocked only by this active DOING task before closeout."
  -
    type: "verify"
    at: "2026-06-08T08:17:11.348Z"
    author: "CODER"
    state: "ok"
    note: "Verified: focused intake/insights/release/direct tests passed; release:check passed; typecheck passed; policy routing passed; ap doctor passed. release:tasks:check is blocked only by this active DOING task before closeout."
  -
    type: "verify"
    at: "2026-06-08T08:24:39.492Z"
    author: "CODER"
    state: "ok"
    note: "Verified: focused intake/insights/release/direct/commit-wrapper tests passed; format:check passed; release:check passed; typecheck passed; policy routing passed; ap doctor passed. release:tasks:check is blocked only by this active DOING task before closeout."
  -
    type: "verify"
    at: "2026-06-08T08:27:20.675Z"
    author: "CODER"
    state: "ok"
    note: "Verified: focused intake/insights/release/direct/commit-wrapper tests passed; format:check passed; docs:cli:check passed; release:check passed; typecheck passed; policy routing passed; ap doctor passed. release:tasks:check is blocked only by this active DOING task before closeout."
  -
    type: "verify"
    at: "2026-06-08T08:32:53.134Z"
    author: "CODER"
    state: "ok"
    note: "Verified: focused intake/insights/release/direct/commit-wrapper tests passed; format:check passed; docs:cli:check passed; hotspots:check passed; release:check passed; typecheck passed; policy routing passed; ap doctor passed. release:tasks:check is blocked only by this active DOING task before closeout."
  -
    type: "status"
    at: "2026-06-08T08:53:27.474Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4481 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-06-08T08:53:27.482Z"
doc_updated_by: "INTEGRATOR"
description: "Implement release-readiness fixes identified by code audit: intake #file and Russian prompt detection, safer intake manifests, release next-action GitHub fallback, insights legacy-quality noise, and direct-workflow issue fixes or verified triage for #4471-#4474."
sections:
  Summary: |-
    Fix patch release readiness issues

    Implement release-readiness fixes identified by code audit: intake #file and Russian prompt detection, safer intake manifests, release next-action GitHub fallback, insights legacy-quality noise, and direct-workflow issue fixes or verified triage for #4471-#4474.
  Scope: |-
    - In scope: Implement release-readiness fixes identified by code audit: intake #file and Russian prompt detection, safer intake manifests, release next-action GitHub fallback, insights legacy-quality noise, and direct-workflow issue fixes or verified triage for #4471-#4474.
    - Out of scope: unrelated refactors not required for "Fix patch release readiness issues".
  Plan: |-
    Scope:
    - Fix deterministic intake extraction for #file/#path style references and Russian acceptance/constraint language.
    - Make task-local intake manifests safer by avoiding raw prompt persistence by default and validating task ids inside the manifest writer.
    - Improve insights quality counters so legacy tasks do not dominate intake-manifest coverage.
    - Fix release next-action --check-github local diagnostics so gh-authenticated checkouts do not fail on missing GITHUB_TOKEN/repo slug.
    - Inspect and address open direct-workflow issues #4471-#4474 where feasible in this patch scope; otherwise record concrete follow-up evidence.

    Plan:
    1. Add focused failing tests for intake #file/Russian prompt detection, manifest raw redaction, release next-action GitHub fallback, and insights legacy buckets.
    2. Patch intake report/command implementation and docs reference if CLI options or output shape change.
    3. Patch release diagnostics to infer repo and gh token where possible, preserving CI env behavior.
    4. Patch insights quality summarization to bucket legacy/not-expected manifests separately.
    5. Review direct workflow route/finish paths for #4471-#4474 and implement narrow fixes if they fit the task scope.
    6. Run targeted tests, release gates, typecheck, routing, doctor, then publish PR through branch_pr integration.

    Verify Steps:
    - bun test packages/agentplane/src/cli/run-cli.core.intake.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts packages/agentplane/src/commands/release/release-next-action-script.test.ts
    - bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts packages/agentplane/src/commands/shared/reconcile-check.test.ts
    - bun run release:check
    - bun run release:tasks:check
    - bun run typecheck
    - node .agentplane/policy/check-routing.mjs
    - ap doctor

    Rollback Plan:
    - Revert the task branch commits before integration, or revert the merge commit if a hosted-only regression appears after merge.

    Findings:
    - Initial audit found no dirty worktree, no active tasks, and no open PRs; open issues #4471-#4474 remain candidate fixes for this task.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun test packages/agentplane/src/cli/run-cli.core.intake.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts packages/agentplane/src/commands/release/release-next-action-script.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run release:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run release:tasks:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    7. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    8. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-08T08:12:47.843Z — VERIFY — ok

    By: CODER

    Note: Focused tests, release:check, typecheck, policy routing, and ap doctor passed. release:tasks:check is blocked only because this active task is still DOING before closeout.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T07:59:25.134Z, excerpt_hash=sha256:5b2d663a58f347c767fe7c65fe58d8431e7916c8a4d6bdcaaadc307503982163

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080758-NWA0GF-fix-patch-release-readiness/.agentplane/tasks/202606080758-NWA0GF/blueprint/resolved-snapshot.json
    - old_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
    - current_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606080758-NWA0GF

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606080758-NWA0GF
    - diagnostic_command: agentplane pr check 202606080758-NWA0GF
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-08T08:14:35.139Z — VERIFY — ok

    By: CODER

    Note: Verified: focused intake/insights/release/direct tests passed; release:check passed; typecheck passed; policy routing passed; ap doctor passed. release:tasks:check is blocked only by this active DOING task before closeout.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T08:12:47.997Z, excerpt_hash=sha256:5b2d663a58f347c767fe7c65fe58d8431e7916c8a4d6bdcaaadc307503982163

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080758-NWA0GF-fix-patch-release-readiness/.agentplane/tasks/202606080758-NWA0GF/blueprint/resolved-snapshot.json
    - old_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
    - current_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606080758-NWA0GF

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606080758-NWA0GF
    - diagnostic_command: agentplane pr check 202606080758-NWA0GF
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-08T08:17:11.348Z — VERIFY — ok

    By: CODER

    Note: Verified: focused intake/insights/release/direct tests passed; release:check passed; typecheck passed; policy routing passed; ap doctor passed. release:tasks:check is blocked only by this active DOING task before closeout.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T08:14:35.278Z, excerpt_hash=sha256:5b2d663a58f347c767fe7c65fe58d8431e7916c8a4d6bdcaaadc307503982163

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080758-NWA0GF-fix-patch-release-readiness/.agentplane/tasks/202606080758-NWA0GF/blueprint/resolved-snapshot.json
    - old_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
    - current_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606080758-NWA0GF

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606080758-NWA0GF
    - diagnostic_command: agentplane pr check 202606080758-NWA0GF
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-08T08:24:39.492Z — VERIFY — ok

    By: CODER

    Note: Verified: focused intake/insights/release/direct/commit-wrapper tests passed; format:check passed; release:check passed; typecheck passed; policy routing passed; ap doctor passed. release:tasks:check is blocked only by this active DOING task before closeout.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T08:17:11.499Z, excerpt_hash=sha256:5b2d663a58f347c767fe7c65fe58d8431e7916c8a4d6bdcaaadc307503982163

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080758-NWA0GF-fix-patch-release-readiness/.agentplane/tasks/202606080758-NWA0GF/blueprint/resolved-snapshot.json
    - old_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
    - current_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606080758-NWA0GF

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606080758-NWA0GF
    - diagnostic_command: agentplane pr check 202606080758-NWA0GF
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-08T08:27:20.675Z — VERIFY — ok

    By: CODER

    Note: Verified: focused intake/insights/release/direct/commit-wrapper tests passed; format:check passed; docs:cli:check passed; release:check passed; typecheck passed; policy routing passed; ap doctor passed. release:tasks:check is blocked only by this active DOING task before closeout.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T08:24:39.659Z, excerpt_hash=sha256:5b2d663a58f347c767fe7c65fe58d8431e7916c8a4d6bdcaaadc307503982163

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080758-NWA0GF-fix-patch-release-readiness/.agentplane/tasks/202606080758-NWA0GF/blueprint/resolved-snapshot.json
    - old_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
    - current_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606080758-NWA0GF

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606080758-NWA0GF
    - diagnostic_command: agentplane pr check 202606080758-NWA0GF
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-08T08:32:53.134Z — VERIFY — ok

    By: CODER

    Note: Verified: focused intake/insights/release/direct/commit-wrapper tests passed; format:check passed; docs:cli:check passed; hotspots:check passed; release:check passed; typecheck passed; policy routing passed; ap doctor passed. release:tasks:check is blocked only by this active DOING task before closeout.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T08:27:20.833Z, excerpt_hash=sha256:5b2d663a58f347c767fe7c65fe58d8431e7916c8a4d6bdcaaadc307503982163

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080758-NWA0GF-fix-patch-release-readiness/.agentplane/tasks/202606080758-NWA0GF/blueprint/resolved-snapshot.json
    - old_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
    - current_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606080758-NWA0GF

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606080758-NWA0GF
    - diagnostic_command: agentplane pr check 202606080758-NWA0GF
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: release:tasks:check reports .agentplane/tasks/202606080758-NWA0GF/README.md: DOING task blocks release readiness.
      Impact: Patch-release readiness cannot be fully green until this branch_pr task is merged and closed; no code regression was indicated.
      Resolution: Rerun release:tasks:check after task closeout on clean main.

    - Observation: release:tasks:check reports .agentplane/tasks/202606080758-NWA0GF/README.md: DOING task blocks release readiness.
      Impact: Patch-release readiness gate becomes fully green after this branch_pr task is merged and closed; no code regression indicated.
      Resolution: Rerun release:tasks:check after task closeout on clean main.

    - Observation: release:tasks:check reports .agentplane/tasks/202606080758-NWA0GF/README.md: DOING task blocks release readiness.
      Impact: Patch-release readiness gate becomes fully green after this branch_pr task is merged and closed; no code regression indicated.
      Resolution: Rerun release:tasks:check after task closeout on clean main.

    - Observation: release:tasks:check reports .agentplane/tasks/202606080758-NWA0GF/README.md: DOING task blocks release readiness.
      Impact: Patch-release readiness gate becomes fully green after this branch_pr task is merged and closed; no code regression indicated.
      Resolution: Rerun release:tasks:check after task closeout on clean main.

    - Observation: release:tasks:check reports .agentplane/tasks/202606080758-NWA0GF/README.md: DOING task blocks release readiness.
      Impact: Patch-release readiness gate becomes fully green after this branch_pr task is merged and closed; no code regression indicated.
      Resolution: Rerun release:tasks:check after task closeout on clean main.

    - Observation: release:tasks:check reports .agentplane/tasks/202606080758-NWA0GF/README.md: DOING task blocks release readiness.
      Impact: Patch-release readiness gate becomes fully green after this branch_pr task is merged and closed; no code regression indicated.
      Resolution: Rerun release:tasks:check after task closeout on clean main.
id_source: "generated"
---
## Summary

Fix patch release readiness issues

Implement release-readiness fixes identified by code audit: intake #file and Russian prompt detection, safer intake manifests, release next-action GitHub fallback, insights legacy-quality noise, and direct-workflow issue fixes or verified triage for #4471-#4474.

## Scope

- In scope: Implement release-readiness fixes identified by code audit: intake #file and Russian prompt detection, safer intake manifests, release next-action GitHub fallback, insights legacy-quality noise, and direct-workflow issue fixes or verified triage for #4471-#4474.
- Out of scope: unrelated refactors not required for "Fix patch release readiness issues".

## Plan

Scope:
- Fix deterministic intake extraction for #file/#path style references and Russian acceptance/constraint language.
- Make task-local intake manifests safer by avoiding raw prompt persistence by default and validating task ids inside the manifest writer.
- Improve insights quality counters so legacy tasks do not dominate intake-manifest coverage.
- Fix release next-action --check-github local diagnostics so gh-authenticated checkouts do not fail on missing GITHUB_TOKEN/repo slug.
- Inspect and address open direct-workflow issues #4471-#4474 where feasible in this patch scope; otherwise record concrete follow-up evidence.

Plan:
1. Add focused failing tests for intake #file/Russian prompt detection, manifest raw redaction, release next-action GitHub fallback, and insights legacy buckets.
2. Patch intake report/command implementation and docs reference if CLI options or output shape change.
3. Patch release diagnostics to infer repo and gh token where possible, preserving CI env behavior.
4. Patch insights quality summarization to bucket legacy/not-expected manifests separately.
5. Review direct workflow route/finish paths for #4471-#4474 and implement narrow fixes if they fit the task scope.
6. Run targeted tests, release gates, typecheck, routing, doctor, then publish PR through branch_pr integration.

Verify Steps:
- bun test packages/agentplane/src/cli/run-cli.core.intake.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts packages/agentplane/src/commands/release/release-next-action-script.test.ts
- bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts packages/agentplane/src/commands/shared/reconcile-check.test.ts
- bun run release:check
- bun run release:tasks:check
- bun run typecheck
- node .agentplane/policy/check-routing.mjs
- ap doctor

Rollback Plan:
- Revert the task branch commits before integration, or revert the merge commit if a hosted-only regression appears after merge.

Findings:
- Initial audit found no dirty worktree, no active tasks, and no open PRs; open issues #4471-#4474 remain candidate fixes for this task.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun test packages/agentplane/src/cli/run-cli.core.intake.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts packages/agentplane/src/commands/release/release-next-action-script.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run release:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run release:tasks:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
6. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
7. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
8. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-08T08:12:47.843Z — VERIFY — ok

By: CODER

Note: Focused tests, release:check, typecheck, policy routing, and ap doctor passed. release:tasks:check is blocked only because this active task is still DOING before closeout.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T07:59:25.134Z, excerpt_hash=sha256:5b2d663a58f347c767fe7c65fe58d8431e7916c8a4d6bdcaaadc307503982163

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080758-NWA0GF-fix-patch-release-readiness/.agentplane/tasks/202606080758-NWA0GF/blueprint/resolved-snapshot.json
- old_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
- current_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606080758-NWA0GF

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606080758-NWA0GF
- diagnostic_command: agentplane pr check 202606080758-NWA0GF
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-08T08:14:35.139Z — VERIFY — ok

By: CODER

Note: Verified: focused intake/insights/release/direct tests passed; release:check passed; typecheck passed; policy routing passed; ap doctor passed. release:tasks:check is blocked only by this active DOING task before closeout.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T08:12:47.997Z, excerpt_hash=sha256:5b2d663a58f347c767fe7c65fe58d8431e7916c8a4d6bdcaaadc307503982163

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080758-NWA0GF-fix-patch-release-readiness/.agentplane/tasks/202606080758-NWA0GF/blueprint/resolved-snapshot.json
- old_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
- current_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606080758-NWA0GF

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606080758-NWA0GF
- diagnostic_command: agentplane pr check 202606080758-NWA0GF
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-08T08:17:11.348Z — VERIFY — ok

By: CODER

Note: Verified: focused intake/insights/release/direct tests passed; release:check passed; typecheck passed; policy routing passed; ap doctor passed. release:tasks:check is blocked only by this active DOING task before closeout.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T08:14:35.278Z, excerpt_hash=sha256:5b2d663a58f347c767fe7c65fe58d8431e7916c8a4d6bdcaaadc307503982163

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080758-NWA0GF-fix-patch-release-readiness/.agentplane/tasks/202606080758-NWA0GF/blueprint/resolved-snapshot.json
- old_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
- current_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606080758-NWA0GF

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606080758-NWA0GF
- diagnostic_command: agentplane pr check 202606080758-NWA0GF
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-08T08:24:39.492Z — VERIFY — ok

By: CODER

Note: Verified: focused intake/insights/release/direct/commit-wrapper tests passed; format:check passed; release:check passed; typecheck passed; policy routing passed; ap doctor passed. release:tasks:check is blocked only by this active DOING task before closeout.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T08:17:11.499Z, excerpt_hash=sha256:5b2d663a58f347c767fe7c65fe58d8431e7916c8a4d6bdcaaadc307503982163

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080758-NWA0GF-fix-patch-release-readiness/.agentplane/tasks/202606080758-NWA0GF/blueprint/resolved-snapshot.json
- old_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
- current_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606080758-NWA0GF

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606080758-NWA0GF
- diagnostic_command: agentplane pr check 202606080758-NWA0GF
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-08T08:27:20.675Z — VERIFY — ok

By: CODER

Note: Verified: focused intake/insights/release/direct/commit-wrapper tests passed; format:check passed; docs:cli:check passed; release:check passed; typecheck passed; policy routing passed; ap doctor passed. release:tasks:check is blocked only by this active DOING task before closeout.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T08:24:39.659Z, excerpt_hash=sha256:5b2d663a58f347c767fe7c65fe58d8431e7916c8a4d6bdcaaadc307503982163

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080758-NWA0GF-fix-patch-release-readiness/.agentplane/tasks/202606080758-NWA0GF/blueprint/resolved-snapshot.json
- old_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
- current_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606080758-NWA0GF

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606080758-NWA0GF
- diagnostic_command: agentplane pr check 202606080758-NWA0GF
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-08T08:32:53.134Z — VERIFY — ok

By: CODER

Note: Verified: focused intake/insights/release/direct/commit-wrapper tests passed; format:check passed; docs:cli:check passed; hotspots:check passed; release:check passed; typecheck passed; policy routing passed; ap doctor passed. release:tasks:check is blocked only by this active DOING task before closeout.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T08:27:20.833Z, excerpt_hash=sha256:5b2d663a58f347c767fe7c65fe58d8431e7916c8a4d6bdcaaadc307503982163

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080758-NWA0GF-fix-patch-release-readiness/.agentplane/tasks/202606080758-NWA0GF/blueprint/resolved-snapshot.json
- old_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
- current_digest: 2369802ae6fbc4ddad4c01391f167d86d78c9cefd86bf6115116c6c5ea19f215
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606080758-NWA0GF

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606080758-NWA0GF
- diagnostic_command: agentplane pr check 202606080758-NWA0GF
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: release:tasks:check reports .agentplane/tasks/202606080758-NWA0GF/README.md: DOING task blocks release readiness.
  Impact: Patch-release readiness cannot be fully green until this branch_pr task is merged and closed; no code regression was indicated.
  Resolution: Rerun release:tasks:check after task closeout on clean main.

- Observation: release:tasks:check reports .agentplane/tasks/202606080758-NWA0GF/README.md: DOING task blocks release readiness.
  Impact: Patch-release readiness gate becomes fully green after this branch_pr task is merged and closed; no code regression indicated.
  Resolution: Rerun release:tasks:check after task closeout on clean main.

- Observation: release:tasks:check reports .agentplane/tasks/202606080758-NWA0GF/README.md: DOING task blocks release readiness.
  Impact: Patch-release readiness gate becomes fully green after this branch_pr task is merged and closed; no code regression indicated.
  Resolution: Rerun release:tasks:check after task closeout on clean main.

- Observation: release:tasks:check reports .agentplane/tasks/202606080758-NWA0GF/README.md: DOING task blocks release readiness.
  Impact: Patch-release readiness gate becomes fully green after this branch_pr task is merged and closed; no code regression indicated.
  Resolution: Rerun release:tasks:check after task closeout on clean main.

- Observation: release:tasks:check reports .agentplane/tasks/202606080758-NWA0GF/README.md: DOING task blocks release readiness.
  Impact: Patch-release readiness gate becomes fully green after this branch_pr task is merged and closed; no code regression indicated.
  Resolution: Rerun release:tasks:check after task closeout on clean main.

- Observation: release:tasks:check reports .agentplane/tasks/202606080758-NWA0GF/README.md: DOING task blocks release readiness.
  Impact: Patch-release readiness gate becomes fully green after this branch_pr task is merged and closed; no code regression indicated.
  Resolution: Rerun release:tasks:check after task closeout on clean main.
