---
id: "202607021729-1F4FNM"
title: "Add SGR v2 typed context extraction writer"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202607021729-QWQRZY"
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bun test packages/agentplane/src/runtime/sgr/contracts.test.ts packages/agentplane/src/context/extraction-writer.test.ts packages/agentplane/src/commands/context/extraction-apply.unit.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-02T18:35:25.542Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-02T19:07:05.794Z"
  updated_by: "CODER"
  note: "Verified current implementation head 26c0d113 after review fixes."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-02T19:06:58.223Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed."
  evaluated_sha: "26c0d113ead47c3886ba3bd9f05032eed2fc0872"
  blueprint_digest: "ac7f23de9f0eb248425eeac8cf30f006f8efe41e2119b8b97d46a1eaf56f11e4"
  evidence_refs:
    - ".agentplane/tasks/202607021729-1F4FNM/README.md"
    - ".agentplane/tasks/202607021729-1F4FNM/quality/20260702-190658223-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607021729-1F4FNM/quality/20260702-190658223-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607021729-1F4FNM/quality/20260702-190658223-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607021729-1F4FNM/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement SGR v2 typed context extraction writer with v1-compatible extraction records, span refs, confidence vectors, and typed routing payloads."
events:
  -
    type: "status"
    at: "2026-07-02T18:36:56.760Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement SGR v2 typed context extraction writer with v1-compatible extraction records, span refs, confidence vectors, and typed routing payloads."
  -
    type: "verify"
    at: "2026-07-02T18:49:19.595Z"
    author: "CODER"
    state: "ok"
    note: "Verified SGR v2 typed context extraction writer and prompt routing."
  -
    type: "verify"
    at: "2026-07-02T19:07:05.794Z"
    author: "CODER"
    state: "ok"
    note: "Verified current implementation head 26c0d113 after review fixes."
doc_version: 3
doc_updated_at: "2026-07-02T19:07:05.939Z"
doc_updated_by: "CODER"
description: "Phase 2 from the Context Maximum Assimilation PRD. Add SGR schema v2 typed context extraction records, span_refs, confidence_vector, entity_resolution/page_creation/topology_decision payloads, and writer routing for claims, ontology, sources, wiki-derived artifacts while preserving v1 compatibility."
sections:
  Summary: |-
    Add SGR v2 typed context extraction writer

    Phase 2 from the Context Maximum Assimilation PRD. Add SGR schema v2 typed context extraction records, span_refs, confidence_vector, entity_resolution/page_creation/topology_decision payloads, and writer routing for claims, ontology, sources, wiki-derived artifacts while preserving v1 compatibility.
  Scope: |-
    - In scope: Phase 2 from the Context Maximum Assimilation PRD. Add SGR schema v2 typed context extraction records, span_refs, confidence_vector, entity_resolution/page_creation/topology_decision payloads, and writer routing for claims, ontology, sources, wiki-derived artifacts while preserving v1 compatibility.
    - Out of scope: unrelated refactors not required for "Add SGR v2 typed context extraction writer".
  Plan: |-
    1. Implement the change for "Add SGR v2 typed context extraction writer".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun test packages/agentplane/src/runtime/sgr/contracts.test.ts packages/agentplane/src/context/extraction-writer.test.ts packages/agentplane/src/commands/context/extraction-apply.unit.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-02T18:49:19.595Z — VERIFY — ok

    By: CODER

    Note: Verified SGR v2 typed context extraction writer and prompt routing.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T18:36:56.760Z, excerpt_hash=sha256:b7f3fd9fd2ee17da795e80b7aa1dddd3037bef9d8d0e7ce1132f07b74eecf963

    Details:

    Commands: (1) bun test packages/agentplane/src/runtime/sgr/contracts.test.ts packages/agentplane/src/context/extraction-writer.test.ts packages/agentplane/src/commands/context/extraction-apply.unit.test.ts => pass, 16 tests. (2) bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/context/ingest-task.test.ts packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts => pass, 44 tests. (3) node .agentplane/policy/check-routing.mjs => pass, policy routing OK. (4) ap doctor => pass, doctor OK with pre-existing warnings for DONE tasks 202606040927-KSESDS and 202606041702-TVTSM2 missing implementation commit hash. (5) AGENTPLANE_FAST_CHANGED_FILES=".agentplane/tasks/202607021729-QWQRZY/README.md
    .agentplane/tasks/202607021729-QWQRZY/blueprint/resolved-snapshot.json
    .agentplane/tasks/202607021729-QWQRZY/pr/diffstat.txt
    .agentplane/tasks/202607021729-QWQRZY/pr/github-body.md
    .agentplane/tasks/202607021729-QWQRZY/pr/github-title.txt
    .agentplane/tasks/202607021729-QWQRZY/pr/meta.json
    .agentplane/tasks/202607021729-QWQRZY/pr/review.md
    .agentplane/tasks/202607021729-QWQRZY/quality/20260702-181743219-recovery-context/evaluator-opinion.md
    .agentplane/tasks/202607021729-QWQRZY/quality/20260702-181743219-recovery-context/evaluator-prompt.md
    .agentplane/tasks/202607021729-QWQRZY/quality/20260702-181743219-recovery-context/quality-report.json
    .agentplane/tasks/202607021729-QWQRZY/quality/20260702-181746403-recovery-context/evaluator-opinion.md
    .agentplane/tasks/202607021729-QWQRZY/quality/20260702-181746403-recovery-context/evaluator-prompt.md
    .agentplane/tasks/202607021729-QWQRZY/quality/20260702-181746403-recovery-context/quality-report.json
    .agentplane/tasks/202607021729-QWQRZY/quality/20260702-181759397-recovery-context/evaluator-opinion.md
    .agentplane/tasks/202607021729-QWQRZY/quality/20260702-181759397-recovery-context/evaluator-prompt.md
    .agentplane/tasks/202607021729-QWQRZY/quality/20260702-181759397-recovery-context/quality-report.json
    packages/agentplane/src/context/ingest-task-pack.test.ts
    packages/agentplane/src/context/ingest-task-pack.ts
    packages/agentplane/src/context/ingest-task.ts
    packages/agentplane/src/context/ingest.ts
    packages/agentplane/src/context/source-spans.test.ts
    packages/agentplane/src/context/source-spans.ts
    .agentplane/tasks/202607021729-1F4FNM/README.md
    packages/agentplane/src/commands/context/extraction-apply.unit.test.ts
    packages/agentplane/src/commands/context/extraction.ts
    packages/agentplane/src/commands/context/release-readiness.test.ts
    packages/agentplane/src/context/extraction-writer.ts
    packages/agentplane/src/context/harvest-tasks-extraction.ts
    packages/agentplane/src/context/ingest-task-prompt.ts
    packages/agentplane/src/runtime/sgr/contract-types.ts
    packages/agentplane/src/runtime/sgr/contracts.test.ts
    packages/agentplane/src/runtime/sgr/contracts.ts" bun run ci:local:fast => pass; format, schemas, policy routing, build/typecheck, 350 unit test files / 2099 tests, and critical CLI E2E chunks passed.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-1F4FNM-add-sgr-v2-typed-context-extraction-writer/.agentplane/tasks/202607021729-1F4FNM/blueprint/resolved-snapshot.json
    - old_digest: ac7f23de9f0eb248425eeac8cf30f006f8efe41e2119b8b97d46a1eaf56f11e4
    - current_digest: ac7f23de9f0eb248425eeac8cf30f006f8efe41e2119b8b97d46a1eaf56f11e4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607021729-1F4FNM

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607021729-1F4FNM
    - diagnostic_command: agentplane pr check 202607021729-1F4FNM
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-07-02T19:07:05.794Z — VERIFY — ok

    By: CODER

    Note: Verified current implementation head 26c0d113 after review fixes.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T18:49:19.814Z, excerpt_hash=sha256:b7f3fd9fd2ee17da795e80b7aa1dddd3037bef9d8d0e7ce1132f07b74eecf963

    Details:

    Review fixes preserve evaluator_result and blueprint_route_decision on SGR v1 while context_extraction uses SGR v2, and protect typed writer row identity from payload reserved fields. Passed focused tests (18), touched-file eslint, Knip baseline, format:changed, framework bootstrap, policy routing, and ap doctor.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-1F4FNM-add-sgr-v2-typed-context-extraction-writer/.agentplane/tasks/202607021729-1F4FNM/blueprint/resolved-snapshot.json
    - old_digest: ac7f23de9f0eb248425eeac8cf30f006f8efe41e2119b8b97d46a1eaf56f11e4
    - current_digest: ac7f23de9f0eb248425eeac8cf30f006f8efe41e2119b8b97d46a1eaf56f11e4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607021729-1F4FNM

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane finish 202607021729-1F4FNM --author CODER --body Verified: pre-merge closure packet is ready for the task PR. --result pre-merge closure --commit 26c0d113ead47c3886ba3bd9f05032eed2fc0872 --pre-merge-closure
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add SGR v2 typed context extraction writer

Phase 2 from the Context Maximum Assimilation PRD. Add SGR schema v2 typed context extraction records, span_refs, confidence_vector, entity_resolution/page_creation/topology_decision payloads, and writer routing for claims, ontology, sources, wiki-derived artifacts while preserving v1 compatibility.

## Scope

- In scope: Phase 2 from the Context Maximum Assimilation PRD. Add SGR schema v2 typed context extraction records, span_refs, confidence_vector, entity_resolution/page_creation/topology_decision payloads, and writer routing for claims, ontology, sources, wiki-derived artifacts while preserving v1 compatibility.
- Out of scope: unrelated refactors not required for "Add SGR v2 typed context extraction writer".

## Plan

1. Implement the change for "Add SGR v2 typed context extraction writer".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun test packages/agentplane/src/runtime/sgr/contracts.test.ts packages/agentplane/src/context/extraction-writer.test.ts packages/agentplane/src/commands/context/extraction-apply.unit.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-02T18:49:19.595Z — VERIFY — ok

By: CODER

Note: Verified SGR v2 typed context extraction writer and prompt routing.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T18:36:56.760Z, excerpt_hash=sha256:b7f3fd9fd2ee17da795e80b7aa1dddd3037bef9d8d0e7ce1132f07b74eecf963

Details:

Commands: (1) bun test packages/agentplane/src/runtime/sgr/contracts.test.ts packages/agentplane/src/context/extraction-writer.test.ts packages/agentplane/src/commands/context/extraction-apply.unit.test.ts => pass, 16 tests. (2) bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/context/ingest-task.test.ts packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts => pass, 44 tests. (3) node .agentplane/policy/check-routing.mjs => pass, policy routing OK. (4) ap doctor => pass, doctor OK with pre-existing warnings for DONE tasks 202606040927-KSESDS and 202606041702-TVTSM2 missing implementation commit hash. (5) AGENTPLANE_FAST_CHANGED_FILES=".agentplane/tasks/202607021729-QWQRZY/README.md
.agentplane/tasks/202607021729-QWQRZY/blueprint/resolved-snapshot.json
.agentplane/tasks/202607021729-QWQRZY/pr/diffstat.txt
.agentplane/tasks/202607021729-QWQRZY/pr/github-body.md
.agentplane/tasks/202607021729-QWQRZY/pr/github-title.txt
.agentplane/tasks/202607021729-QWQRZY/pr/meta.json
.agentplane/tasks/202607021729-QWQRZY/pr/review.md
.agentplane/tasks/202607021729-QWQRZY/quality/20260702-181743219-recovery-context/evaluator-opinion.md
.agentplane/tasks/202607021729-QWQRZY/quality/20260702-181743219-recovery-context/evaluator-prompt.md
.agentplane/tasks/202607021729-QWQRZY/quality/20260702-181743219-recovery-context/quality-report.json
.agentplane/tasks/202607021729-QWQRZY/quality/20260702-181746403-recovery-context/evaluator-opinion.md
.agentplane/tasks/202607021729-QWQRZY/quality/20260702-181746403-recovery-context/evaluator-prompt.md
.agentplane/tasks/202607021729-QWQRZY/quality/20260702-181746403-recovery-context/quality-report.json
.agentplane/tasks/202607021729-QWQRZY/quality/20260702-181759397-recovery-context/evaluator-opinion.md
.agentplane/tasks/202607021729-QWQRZY/quality/20260702-181759397-recovery-context/evaluator-prompt.md
.agentplane/tasks/202607021729-QWQRZY/quality/20260702-181759397-recovery-context/quality-report.json
packages/agentplane/src/context/ingest-task-pack.test.ts
packages/agentplane/src/context/ingest-task-pack.ts
packages/agentplane/src/context/ingest-task.ts
packages/agentplane/src/context/ingest.ts
packages/agentplane/src/context/source-spans.test.ts
packages/agentplane/src/context/source-spans.ts
.agentplane/tasks/202607021729-1F4FNM/README.md
packages/agentplane/src/commands/context/extraction-apply.unit.test.ts
packages/agentplane/src/commands/context/extraction.ts
packages/agentplane/src/commands/context/release-readiness.test.ts
packages/agentplane/src/context/extraction-writer.ts
packages/agentplane/src/context/harvest-tasks-extraction.ts
packages/agentplane/src/context/ingest-task-prompt.ts
packages/agentplane/src/runtime/sgr/contract-types.ts
packages/agentplane/src/runtime/sgr/contracts.test.ts
packages/agentplane/src/runtime/sgr/contracts.ts" bun run ci:local:fast => pass; format, schemas, policy routing, build/typecheck, 350 unit test files / 2099 tests, and critical CLI E2E chunks passed.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-1F4FNM-add-sgr-v2-typed-context-extraction-writer/.agentplane/tasks/202607021729-1F4FNM/blueprint/resolved-snapshot.json
- old_digest: ac7f23de9f0eb248425eeac8cf30f006f8efe41e2119b8b97d46a1eaf56f11e4
- current_digest: ac7f23de9f0eb248425eeac8cf30f006f8efe41e2119b8b97d46a1eaf56f11e4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607021729-1F4FNM

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607021729-1F4FNM
- diagnostic_command: agentplane pr check 202607021729-1F4FNM
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-07-02T19:07:05.794Z — VERIFY — ok

By: CODER

Note: Verified current implementation head 26c0d113 after review fixes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-02T18:49:19.814Z, excerpt_hash=sha256:b7f3fd9fd2ee17da795e80b7aa1dddd3037bef9d8d0e7ce1132f07b74eecf963

Details:

Review fixes preserve evaluator_result and blueprint_route_decision on SGR v1 while context_extraction uses SGR v2, and protect typed writer row identity from payload reserved fields. Passed focused tests (18), touched-file eslint, Knip baseline, format:changed, framework bootstrap, policy routing, and ap doctor.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607021729-1F4FNM-add-sgr-v2-typed-context-extraction-writer/.agentplane/tasks/202607021729-1F4FNM/blueprint/resolved-snapshot.json
- old_digest: ac7f23de9f0eb248425eeac8cf30f006f8efe41e2119b8b97d46a1eaf56f11e4
- current_digest: ac7f23de9f0eb248425eeac8cf30f006f8efe41e2119b8b97d46a1eaf56f11e4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607021729-1F4FNM

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane finish 202607021729-1F4FNM --author CODER --body Verified: pre-merge closure packet is ready for the task PR. --result pre-merge closure --commit 26c0d113ead47c3886ba3bd9f05032eed2fc0872 --pre-merge-closure
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
