---
id: "202606050031-F42081"
title: "Stabilize release TypeScript build"
result_summary: "Release follow-up completed and included in the v0.6.17 release branch."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "build"
  - "cognitive-load"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-05T00:31:45.131Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-05T00:34:42.939Z"
  updated_by: "CODER"
  note: "TypeScript and tsup build paths now run through process-bound wrappers; typecheck, root build, testkit build, wrapper eslint, and scripts README check passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-05T00:34:56.193Z"
  updated_by: "EVALUATOR"
  note: "Release build scripts now run TypeScript and tsup through process-bound wrappers with direct signal diagnostics."
  evaluated_sha: "1a926df12d13049de0052cc00121c0aaf705e6de"
  blueprint_digest: "ddc4b025eb4d3a3ded5b56e8da43a5b6dd7edcbb0337bea8364b93c61305a085"
  evidence_refs:
    - ".agentplane/tasks/202606050031-F42081/README.md"
    - ".agentplane/tasks/202606050031-F42081/quality/20260605-003456193-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606050031-F42081/quality/20260605-003456193-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606050031-F42081/quality/20260605-003456193-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606050031-F42081/blueprint/resolved-snapshot.json"
    - "scripts/checks/run-typescript-build.mjs"
    - "scripts/checks/run-tsup-build.mjs"
    - "root-build-node24"
  findings:
    - "Root typecheck, root build, testkit build, wrapper eslint, and scripts README check passed."
commit:
  hash: "1a926df12d13049de0052cc00121c0aaf705e6de"
  message: "🧭 202606050031-F42081 ci: stabilize release build wrappers"
comments:
  -
    author: "CODER"
    body: "Start: isolate and stabilize tsc -b SIGKILL in final release prepublish."
  -
    author: "INTEGRATOR"
    body: "Verified: release follow-up was implemented, reviewed, and merged through the v0.6.17 release branch."
events:
  -
    type: "status"
    at: "2026-06-05T00:31:45.709Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: isolate and stabilize tsc -b SIGKILL in final release prepublish."
  -
    type: "verify"
    at: "2026-06-05T00:34:42.939Z"
    author: "CODER"
    state: "ok"
    note: "TypeScript and tsup build paths now run through process-bound wrappers; typecheck, root build, testkit build, wrapper eslint, and scripts README check passed."
  -
    type: "status"
    at: "2026-06-05T02:00:50.194Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: release follow-up was implemented, reviewed, and merged through the v0.6.17 release branch."
doc_version: 3
doc_updated_at: "2026-06-05T02:00:50.195Z"
doc_updated_by: "INTEGRATOR"
description: "Final v0.6.17 prepublish passes arch and knip but tsc -b in bun run build is killed with signal 9. Identify the TypeScript project causing the resource termination, make the build/typecheck path stable and diagnostic, then rerun build and full prepublish."
sections:
  Summary: |-
    Stabilize release TypeScript build

    Final v0.6.17 prepublish passes arch and knip but tsc -b in bun run build is killed with signal 9. Identify the TypeScript project causing the resource termination, make the build/typecheck path stable and diagnostic, then rerun build and full prepublish.
  Scope: |-
    - In scope: Final v0.6.17 prepublish passes arch and knip but tsc -b in bun run build is killed with signal 9. Identify the TypeScript project causing the resource termination, make the build/typecheck path stable and diagnostic, then rerun build and full prepublish.
    - Out of scope: unrelated refactors not required for "Stabilize release TypeScript build".
  Plan: "1. Reproduce tsc -b SIGKILL and isolate which referenced tsconfig triggers it. 2. Make the build path stable or diagnostic without weakening type coverage. 3. Run package-level typechecks/build and full release prepublish. 4. Record verification/evaluator evidence before continuing publication."
  Verify Steps: |-
    PLANNER fallback scaffold for "Stabilize release TypeScript build". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Stabilize release TypeScript build". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-05T00:34:42.939Z — VERIFY — ok

    By: CODER

    Note: TypeScript and tsup build paths now run through process-bound wrappers; typecheck, root build, testkit build, wrapper eslint, and scripts README check passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T00:31:45.709Z, excerpt_hash=sha256:209f8778433042a4568f7d8bb7e8b1b53b3f73e0ce655eeb270958ada39fc4c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606050031-F42081/blueprint/resolved-snapshot.json
    - old_digest: ddc4b025eb4d3a3ded5b56e8da43a5b6dd7edcbb0337bea8364b93c61305a085
    - current_digest: ddc4b025eb4d3a3ded5b56e8da43a5b6dd7edcbb0337bea8364b93c61305a085
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606050031-F42081

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606050031-F42081 --agent CODER --slug stabilize-release-typescript-build --worktree
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
  Findings: |-
    - Observation: The release build was killed when tool shims launched TypeScript/tsup through an ambient runtime path.
      Impact: Build failures now preserve signal diagnostics and run under the selected repository Node process, reducing false code-failure ambiguity for agents.
      Resolution: Add process.execPath wrappers for TypeScript and tsup, wire root/package build scripts through them, and regenerate scripts/README.md.
id_source: "generated"
---
## Summary

Stabilize release TypeScript build

Final v0.6.17 prepublish passes arch and knip but tsc -b in bun run build is killed with signal 9. Identify the TypeScript project causing the resource termination, make the build/typecheck path stable and diagnostic, then rerun build and full prepublish.

## Scope

- In scope: Final v0.6.17 prepublish passes arch and knip but tsc -b in bun run build is killed with signal 9. Identify the TypeScript project causing the resource termination, make the build/typecheck path stable and diagnostic, then rerun build and full prepublish.
- Out of scope: unrelated refactors not required for "Stabilize release TypeScript build".

## Plan

1. Reproduce tsc -b SIGKILL and isolate which referenced tsconfig triggers it. 2. Make the build path stable or diagnostic without weakening type coverage. 3. Run package-level typechecks/build and full release prepublish. 4. Record verification/evaluator evidence before continuing publication.

## Verify Steps

PLANNER fallback scaffold for "Stabilize release TypeScript build". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Stabilize release TypeScript build". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-05T00:34:42.939Z — VERIFY — ok

By: CODER

Note: TypeScript and tsup build paths now run through process-bound wrappers; typecheck, root build, testkit build, wrapper eslint, and scripts README check passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T00:31:45.709Z, excerpt_hash=sha256:209f8778433042a4568f7d8bb7e8b1b53b3f73e0ce655eeb270958ada39fc4c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606050031-F42081/blueprint/resolved-snapshot.json
- old_digest: ddc4b025eb4d3a3ded5b56e8da43a5b6dd7edcbb0337bea8364b93c61305a085
- current_digest: ddc4b025eb4d3a3ded5b56e8da43a5b6dd7edcbb0337bea8364b93c61305a085
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606050031-F42081

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606050031-F42081 --agent CODER --slug stabilize-release-typescript-build --worktree
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

- Observation: The release build was killed when tool shims launched TypeScript/tsup through an ambient runtime path.
  Impact: Build failures now preserve signal diagnostics and run under the selected repository Node process, reducing false code-failure ambiguity for agents.
  Resolution: Add process.execPath wrappers for TypeScript and tsup, wire root/package build scripts through them, and regenerate scripts/README.md.
