---
id: "202607021730-7KG1WF"
title: "Document and migrate maximum-assimilation v2"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202607021729-8S1DF3"
tags:
  - "code"
  - "docs"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bun run docs:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-02T20:29:21.395Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-02T20:54:00.018Z"
  updated_by: "CODER"
  note: "Re-verified after rebase onto origin/main. Checks: migrate unit tests, command catalog tests, format:changed, policy routing; prior full ci:local:fast passed before force-push."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-02T20:53:36.216Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed after rebase onto origin/main."
  evaluated_sha: "38a972e50e634ad3b3b0696bc74481b362067f5a"
  blueprint_digest: "15a32c5dda4558da5c1484ab8751c9fcc80d482fc474aa043c09472ab25b1d40"
  evidence_refs:
    - ".agentplane/tasks/202607021730-7KG1WF/README.md"
    - ".agentplane/tasks/202607021730-7KG1WF/quality/20260702-205336216-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607021730-7KG1WF/quality/20260702-205336216-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607021730-7KG1WF/quality/20260702-205336216-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607021730-7KG1WF/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement maximum-assimilation v2 migration command and docs."
events:
  -
    type: "status"
    at: "2026-07-02T20:30:03.771Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement maximum-assimilation v2 migration command and docs."
  -
    type: "verify"
    at: "2026-07-02T20:39:22.796Z"
    author: "CODER"
    state: "ok"
    note: "Implemented maximum-assimilation v2 migration command and docs. Verified with targeted unit tests, full context test slice, CLI docs freshness, lint, format, policy routing, command smoke test, and doctor."
  -
    type: "verify"
    at: "2026-07-02T20:42:49.559Z"
    author: "CODER"
    state: "ok"
    note: "Re-verified current implementation head after quality artifact commit. Checks remain: migrate unit tests, command catalog tests, full context test slice, CLI docs freshness, targeted lint, format, policy routing, CLI smoke test, and doctor."
  -
    type: "verify"
    at: "2026-07-02T20:54:00.018Z"
    author: "CODER"
    state: "ok"
    note: "Re-verified after rebase onto origin/main. Checks: migrate unit tests, command catalog tests, format:changed, policy routing; prior full ci:local:fast passed before force-push."
doc_version: 3
doc_updated_at: "2026-07-02T20:54:00.150Z"
doc_updated_by: "CODER"
description: "Phase 5 from the Context Maximum Assimilation PRD. Add migration or dry-run support for legacy context modes/artifacts, preserve existing wiki/facts/graph, generate initial topology/entity/page manifests where possible, and update user/developer docs plus release notes for the single public maximum-assimilation workflow."
sections:
  Summary: |-
    Document and migrate maximum-assimilation v2

    Phase 5 from the Context Maximum Assimilation PRD. Add migration or dry-run support for legacy context modes/artifacts, preserve existing wiki/facts/graph, generate initial topology/entity/page manifests where possible, and update user/developer docs plus release notes for the single public maximum-assimilation workflow.
  Scope: |-
    - In scope: Phase 5 from the Context Maximum Assimilation PRD. Add migration or dry-run support for legacy context modes/artifacts, preserve existing wiki/facts/graph, generate initial topology/entity/page manifests where possible, and update user/developer docs plus release notes for the single public maximum-assimilation workflow.
    - Out of scope: unrelated refactors not required for "Document and migrate maximum-assimilation v2".
  Plan: "1. Add a scoped maximum-assimilation v2 migration command with dry-run support that inspects existing context wiki/facts/graph/glossary artifacts, preserves them, and materializes missing initial topology/page/entity manifest artifacts only when explicitly run without dry-run. 2. Cover legacy context repositories with focused tests: dry-run writes nothing; apply preserves existing wiki/facts/graph rows; generated topology/page manifests are deterministic from existing wiki paths. 3. Update user/developer docs, CLI reference, and release notes to document the single public maximum-assimilation workflow, deprecated aliases, and the migration command. 4. Verify with targeted migration/context tests, docs checks, routing policy, and doctor."
  Verify Steps: |-
    PLANNER fallback scaffold for "Document and migrate maximum-assimilation v2". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Document and migrate maximum-assimilation v2". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-02T20:39:22.796Z — VERIFY — ok

    By: CODER

    Note: Implemented maximum-assimilation v2 migration command and docs. Verified with targeted unit tests, full context test slice, CLI docs freshness, lint, format, policy routing, command smoke test, and doctor.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T20:30:03.771Z, excerpt_hash=sha256:e490475f44c7a9f4330ef94ca16fcb913db5fe345c6508a45dd4a892972cce49

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021730-7KG1WF-document-and-migrate-maximum-assimilation-v2/.agentplane/tasks/202607021730-7KG1WF/blueprint/resolved-snapshot.json
    - old_digest: 35388cb24ac5308a7ea0b628d6aa2417e8933cfb00fc8d0aa53798d300f6357f
    - current_digest: 35388cb24ac5308a7ea0b628d6aa2417e8933cfb00fc8d0aa53798d300f6357f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607021730-7KG1WF

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607021730-7KG1WF
    - diagnostic_command: agentplane pr check 202607021730-7KG1WF
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-07-02T20:42:49.559Z — VERIFY — ok

    By: CODER

    Note: Re-verified current implementation head after quality artifact commit. Checks remain: migrate unit tests, command catalog tests, full context test slice, CLI docs freshness, targeted lint, format, policy routing, CLI smoke test, and doctor.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T20:39:22.910Z, excerpt_hash=sha256:e490475f44c7a9f4330ef94ca16fcb913db5fe345c6508a45dd4a892972cce49

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021730-7KG1WF-document-and-migrate-maximum-assimilation-v2/.agentplane/tasks/202607021730-7KG1WF/blueprint/resolved-snapshot.json
    - old_digest: 15a32c5dda4558da5c1484ab8751c9fcc80d482fc474aa043c09472ab25b1d40
    - current_digest: 15a32c5dda4558da5c1484ab8751c9fcc80d482fc474aa043c09472ab25b1d40
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607021730-7KG1WF

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607021730-7KG1WF
    - diagnostic_command: agentplane pr check 202607021730-7KG1WF
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-07-02T20:54:00.018Z — VERIFY — ok

    By: CODER

    Note: Re-verified after rebase onto origin/main. Checks: migrate unit tests, command catalog tests, format:changed, policy routing; prior full ci:local:fast passed before force-push.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T20:42:49.691Z, excerpt_hash=sha256:e490475f44c7a9f4330ef94ca16fcb913db5fe345c6508a45dd4a892972cce49

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021730-7KG1WF-document-and-migrate-maximum-assimilation-v2/.agentplane/tasks/202607021730-7KG1WF/blueprint/resolved-snapshot.json
    - old_digest: 15a32c5dda4558da5c1484ab8751c9fcc80d482fc474aa043c09472ab25b1d40
    - current_digest: 15a32c5dda4558da5c1484ab8751c9fcc80d482fc474aa043c09472ab25b1d40
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607021730-7KG1WF

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607021730-7KG1WF
    - diagnostic_command: agentplane pr check 202607021730-7KG1WF
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
    - Observation: context migrate maximum-assimilation-v2 preserves existing context/wiki, facts, and graph data while materializing missing topology, page-creation, page-manifest, and entity-resolution artifacts; dry-run writes nothing.
      Impact: Existing context workspaces can migrate toward strict maximum-assimilation v2 without data loss or retroactive invented raw-span coverage.
      Resolution: Added CLI command, command registration, unit tests, user docs, review docs, and release notes.
id_source: "generated"
---
## Summary

Document and migrate maximum-assimilation v2

Phase 5 from the Context Maximum Assimilation PRD. Add migration or dry-run support for legacy context modes/artifacts, preserve existing wiki/facts/graph, generate initial topology/entity/page manifests where possible, and update user/developer docs plus release notes for the single public maximum-assimilation workflow.

## Scope

- In scope: Phase 5 from the Context Maximum Assimilation PRD. Add migration or dry-run support for legacy context modes/artifacts, preserve existing wiki/facts/graph, generate initial topology/entity/page manifests where possible, and update user/developer docs plus release notes for the single public maximum-assimilation workflow.
- Out of scope: unrelated refactors not required for "Document and migrate maximum-assimilation v2".

## Plan

1. Add a scoped maximum-assimilation v2 migration command with dry-run support that inspects existing context wiki/facts/graph/glossary artifacts, preserves them, and materializes missing initial topology/page/entity manifest artifacts only when explicitly run without dry-run. 2. Cover legacy context repositories with focused tests: dry-run writes nothing; apply preserves existing wiki/facts/graph rows; generated topology/page manifests are deterministic from existing wiki paths. 3. Update user/developer docs, CLI reference, and release notes to document the single public maximum-assimilation workflow, deprecated aliases, and the migration command. 4. Verify with targeted migration/context tests, docs checks, routing policy, and doctor.

## Verify Steps

PLANNER fallback scaffold for "Document and migrate maximum-assimilation v2". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Document and migrate maximum-assimilation v2". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-02T20:39:22.796Z — VERIFY — ok

By: CODER

Note: Implemented maximum-assimilation v2 migration command and docs. Verified with targeted unit tests, full context test slice, CLI docs freshness, lint, format, policy routing, command smoke test, and doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T20:30:03.771Z, excerpt_hash=sha256:e490475f44c7a9f4330ef94ca16fcb913db5fe345c6508a45dd4a892972cce49

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021730-7KG1WF-document-and-migrate-maximum-assimilation-v2/.agentplane/tasks/202607021730-7KG1WF/blueprint/resolved-snapshot.json
- old_digest: 35388cb24ac5308a7ea0b628d6aa2417e8933cfb00fc8d0aa53798d300f6357f
- current_digest: 35388cb24ac5308a7ea0b628d6aa2417e8933cfb00fc8d0aa53798d300f6357f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607021730-7KG1WF

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607021730-7KG1WF
- diagnostic_command: agentplane pr check 202607021730-7KG1WF
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-07-02T20:42:49.559Z — VERIFY — ok

By: CODER

Note: Re-verified current implementation head after quality artifact commit. Checks remain: migrate unit tests, command catalog tests, full context test slice, CLI docs freshness, targeted lint, format, policy routing, CLI smoke test, and doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T20:39:22.910Z, excerpt_hash=sha256:e490475f44c7a9f4330ef94ca16fcb913db5fe345c6508a45dd4a892972cce49

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021730-7KG1WF-document-and-migrate-maximum-assimilation-v2/.agentplane/tasks/202607021730-7KG1WF/blueprint/resolved-snapshot.json
- old_digest: 15a32c5dda4558da5c1484ab8751c9fcc80d482fc474aa043c09472ab25b1d40
- current_digest: 15a32c5dda4558da5c1484ab8751c9fcc80d482fc474aa043c09472ab25b1d40
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607021730-7KG1WF

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607021730-7KG1WF
- diagnostic_command: agentplane pr check 202607021730-7KG1WF
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-07-02T20:54:00.018Z — VERIFY — ok

By: CODER

Note: Re-verified after rebase onto origin/main. Checks: migrate unit tests, command catalog tests, format:changed, policy routing; prior full ci:local:fast passed before force-push.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T20:42:49.691Z, excerpt_hash=sha256:e490475f44c7a9f4330ef94ca16fcb913db5fe345c6508a45dd4a892972cce49

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021730-7KG1WF-document-and-migrate-maximum-assimilation-v2/.agentplane/tasks/202607021730-7KG1WF/blueprint/resolved-snapshot.json
- old_digest: 15a32c5dda4558da5c1484ab8751c9fcc80d482fc474aa043c09472ab25b1d40
- current_digest: 15a32c5dda4558da5c1484ab8751c9fcc80d482fc474aa043c09472ab25b1d40
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607021730-7KG1WF

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607021730-7KG1WF
- diagnostic_command: agentplane pr check 202607021730-7KG1WF
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

- Observation: context migrate maximum-assimilation-v2 preserves existing context/wiki, facts, and graph data while materializing missing topology, page-creation, page-manifest, and entity-resolution artifacts; dry-run writes nothing.
  Impact: Existing context workspaces can migrate toward strict maximum-assimilation v2 without data loss or retroactive invented raw-span coverage.
  Resolution: Added CLI command, command registration, unit tests, user docs, review docs, and release notes.
