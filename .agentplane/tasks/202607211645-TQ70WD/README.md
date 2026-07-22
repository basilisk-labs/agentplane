---
id: "202607211645-TQ70WD"
title: "Repair maximum assimilation context lifecycle"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 18
origin:
  system: "manual"
depends_on: []
tags:
  - "assimilation"
  - "code"
  - "context"
  - "regression"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-21T16:46:17.490Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-21T21:33:12.799Z"
  updated_by: "EVALUATOR"
  note: "Focused context tests, full AgentPlane suite, smoke gate, typecheck, formatting, routing, CLI help, and doctor all passed; only unrelated historical doctor warnings remain."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-21T21:34:06.213Z"
  updated_by: "EVALUATOR"
  note: "Quality review remains valid after committing evaluator and verification artifacts."
  evaluated_sha: "63e998521c6c6e82b63f3525adab65044d7471e3"
  blueprint_digest: "230c818d37ab56b7e97f3c6e57c02a387ebf20b89a707c0c3449544dfdae11ef"
  evidence_refs:
    - ".agentplane/tasks/202607211645-TQ70WD/README.md"
    - ".agentplane/tasks/202607211645-TQ70WD/quality/20260721-213406213-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607211645-TQ70WD/quality/20260721-213406213-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607211645-TQ70WD/quality/20260721-213406213-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607211645-TQ70WD/blueprint/resolved-snapshot.json"
    - "bun run test:project agentplane: 338 files, 1924 tests passed"
    - "bun run ci:local:smoke: passed"
  findings:
    - "No blocking findings; the implementation commit and all recorded checks remain unchanged."
commit:
  hash: "28d61bee90050bf2869313d497922f3cfb5fd738"
  message: "✅ TQ70WD task: record verified context lifecycle"
comments:
  -
    author: "CODER"
    body: "Start: implement the approved maximum-assimilation lifecycle fixes and regression coverage from the dedicated main-based task worktree."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-21T16:46:59.775Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved maximum-assimilation lifecycle fixes and regression coverage from the dedicated main-based task worktree."
  -
    type: "verify"
    at: "2026-07-21T21:33:12.799Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Focused context tests, full AgentPlane suite, smoke gate, typecheck, formatting, routing, CLI help, and doctor all passed; only unrelated historical doctor warnings remain."
  -
    type: "status"
    at: "2026-07-22T10:57:45.472Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-22T10:57:45.473Z"
doc_updated_by: "CODER"
description: "Fix the evaluator-to-context verification contract, Wiki frontmatter generation and linting, modality and expected-artifact consistency, and add end-to-end regression coverage for maximum assimilation including raw-deletion resilience."
sections:
  Summary: "Repair the maximum-assimilation context lifecycle so the documented path finishes without manual derived-file edits and all context commands agree on Wiki, modality, artifact, and evaluator contracts."
  Scope: "In scope: context runtime and CLI implementation under packages/agentplane/src/context/** and packages/agentplane/src/commands/context/**; related schemas/assets only when required by a shared contract; focused and end-to-end tests in the same package; task-local AgentPlane artifacts. Deliver evaluator projection or canonical consumption, valid and consistently linted Wiki frontmatter, shared modality vocabulary, complete expected reports including topology, generated graph-ref rationale, actionable diagnostics, finalization/reporting support where it fits the existing CLI architecture, and raw-deletion regression coverage. Out of scope: release/version changes, unrelated workflow code, and agentplane-loops."
  Plan: "1. Trace evaluator, maximum-assimilation verifier, Wiki index/lint, modality, and expected-artifact data flows and establish shared contracts. 2. Implement a canonical evaluator-to-context verification path that removes the manual evaluator.jsonl gap. 3. Centralize Wiki frontmatter serialization/parsing, make index generation idempotent, and make lint use the runtime parser with actionable errors. 4. Align modality acceptance and maximum-assimilation expected/generated artifacts, including topology and graph-reference rationale. 5. Add or extend finalization and summary diagnostics through the smallest compatible existing CLI surface. 6. Add focused regressions plus an end-to-end maximum-assimilation fixture that validates first-run indexing and curated-context operation after raw removal. 7. Run targeted tests, formatting, typecheck, routing checks, AgentPlane doctor, quality review, and record verification."
  Verify Steps: "1. Run targeted Vitest coverage for context Wiki lint/index, maximum-assimilation verify-task, extraction apply, evaluator projection, and the new end-to-end lifecycle fixture. 2. Prove first-run and repeat Wiki indexing both produce parseable frontmatter and pass wiki lint, context check, and context doctor. 3. Prove evaluator output satisfies maximum-assimilation verification without manual writes to .agentplane/context/derived/**. 4. Prove the curated Wiki/graph/search surface remains valid after the raw corpus is removed in the fixture. 5. Run bun run format:changed. 6. Run bun run typecheck. 7. Run node .agentplane/policy/check-routing.mjs. 8. Run ap doctor and record any unrelated baseline warnings separately."
  Verification: |-
    Command: bunx vitest --config vitest.workspace.ts run --project agentplane <12 focused context test files>. Result: pass. Evidence: 12 files, 60 tests; covers evaluator projection into verify-task, first/repeat Wiki indexing, YAML lint diagnostics, generated topology/coverage reports, workflow modality, finalization order, and raw-deletion curated search. Scope: changed context lifecycle behavior.

    Command: bun run test:project agentplane. Result: pass. Evidence: 338 test files, 1924 tests. Scope: complete AgentPlane project regression suite.

    Command: bun run ci:local:smoke. Result: pass. Evidence: repository Prettier check, Vitest project routing, full core ESLint, and 16-file/146-test precommit suite passed. Scope: local smoke quality gate.

    Command: bun run typecheck. Result: pass. Evidence: TypeScript build completed with no diagnostics. Scope: workspace type contracts.

    Command: bun run format:changed. Result: pass. Evidence: all 29 changed files matched Prettier style. Scope: task diff formatting.

    Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: repository policy graph.

    Command: bun packages/agentplane/bin/agentplane.js help context finalize-task. Result: pass. Evidence: CLI exposes context finalize-task <task-id> with the expected contract. Scope: new operator surface.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-21T21:33:12.799Z — VERIFY — ok

    By: EVALUATOR

    Note: Focused context tests, full AgentPlane suite, smoke gate, typecheck, formatting, routing, CLI help, and doctor all passed; only unrelated historical doctor warnings remain.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-21T21:33:09.691Z, excerpt_hash=sha256:3dce42a7dd8c071ce5916b5cc05fea64d41f70ad2d75e99a4bc037a283d17c41

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607211645-TQ70WD-repair-maximum-assimilation-context-lifecycle/.agentplane/tasks/202607211645-TQ70WD/blueprint/resolved-snapshot.json
    - old_digest: 230c818d37ab56b7e97f3c6e57c02a387ebf20b89a707c0c3449544dfdae11ef
    - current_digest: 230c818d37ab56b7e97f3c6e57c02a387ebf20b89a707c0c3449544dfdae11ef
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607211645-TQ70WD

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607211645-TQ70WD
    - diagnostic_command: agentplane pr check 202607211645-TQ70WD
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task commits. No persisted user data migration is planned; any new derived evaluator/report projection must be reconstructible from task-local evaluator evidence or existing canonical context inputs."
  Findings: |-
    - Observation: Maximum-assimilation verification consumed .agentplane/context/derived/reports/evaluator.jsonl while evaluator run only wrote task-local quality-report.json.
      Impact: The documented lifecycle could not complete without a forbidden manual write to the derived context layer.
      Resolution: Evaluator run now projects recorded maximum-assimilation reviews into a stable task-scoped evaluator scenario and carries explicit raw-deletion evidence.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: Generated Wiki indexes rendered an empty source_refs value as malformed YAML, and wiki lint used substring checks instead of the runtime YAML parser.
      Impact: Wiki lint could pass pages that later crashed context check and doctor with an internal YAML parse error.
      Resolution: Wiki generation now uses the shared YAML serializer; lint parses and type-checks frontmatter; doctor reports invalid Wiki YAML as E_VALIDATION with file and parser location.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: Wiki modality and expected-artifact contracts diverged from maximum-assimilation page types and verifier requirements.
      Impact: Workflow pages were rejected and topology/coverage reports required manual creation.
      Resolution: Workflow modality is shared by CLI and manifest, expected artifacts include topology, and wiki report generates topology and coverage pages.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: Curated search was reindexed after removing the raw source fixture and remained usable while raw-only search returned no rows.
      Impact: Raw-deletion resilience is now protected against regression instead of relying only on a manual test report.
      Resolution: Added a regression covering curated-only reindex and search after raw removal; evaluator scenarios now require passing raw-deletion evidence.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: ap doctor completed with zero errors and two warnings for historical DONE tasks 202606040927-KSESDS and 202606041702-TVTSM2 missing implementation hashes.
      Impact: No impact on this task; warnings predate and are outside the approved context lifecycle scope.
      Resolution: Recorded as baseline drift; no unrelated historical task mutation performed.
extensions:
  implementation_commit:
    hash: "63e998521c6c6e82b63f3525adab65044d7471e3"
    message: "🐛 TQ70WD task: repair context assimilation lifecycle"
id_source: "generated"
---
## Summary

Repair the maximum-assimilation context lifecycle so the documented path finishes without manual derived-file edits and all context commands agree on Wiki, modality, artifact, and evaluator contracts.

## Scope

In scope: context runtime and CLI implementation under packages/agentplane/src/context/** and packages/agentplane/src/commands/context/**; related schemas/assets only when required by a shared contract; focused and end-to-end tests in the same package; task-local AgentPlane artifacts. Deliver evaluator projection or canonical consumption, valid and consistently linted Wiki frontmatter, shared modality vocabulary, complete expected reports including topology, generated graph-ref rationale, actionable diagnostics, finalization/reporting support where it fits the existing CLI architecture, and raw-deletion regression coverage. Out of scope: release/version changes, unrelated workflow code, and agentplane-loops.

## Plan

1. Trace evaluator, maximum-assimilation verifier, Wiki index/lint, modality, and expected-artifact data flows and establish shared contracts. 2. Implement a canonical evaluator-to-context verification path that removes the manual evaluator.jsonl gap. 3. Centralize Wiki frontmatter serialization/parsing, make index generation idempotent, and make lint use the runtime parser with actionable errors. 4. Align modality acceptance and maximum-assimilation expected/generated artifacts, including topology and graph-reference rationale. 5. Add or extend finalization and summary diagnostics through the smallest compatible existing CLI surface. 6. Add focused regressions plus an end-to-end maximum-assimilation fixture that validates first-run indexing and curated-context operation after raw removal. 7. Run targeted tests, formatting, typecheck, routing checks, AgentPlane doctor, quality review, and record verification.

## Verify Steps

1. Run targeted Vitest coverage for context Wiki lint/index, maximum-assimilation verify-task, extraction apply, evaluator projection, and the new end-to-end lifecycle fixture. 2. Prove first-run and repeat Wiki indexing both produce parseable frontmatter and pass wiki lint, context check, and context doctor. 3. Prove evaluator output satisfies maximum-assimilation verification without manual writes to .agentplane/context/derived/**. 4. Prove the curated Wiki/graph/search surface remains valid after the raw corpus is removed in the fixture. 5. Run bun run format:changed. 6. Run bun run typecheck. 7. Run node .agentplane/policy/check-routing.mjs. 8. Run ap doctor and record any unrelated baseline warnings separately.

## Verification

Command: bunx vitest --config vitest.workspace.ts run --project agentplane <12 focused context test files>. Result: pass. Evidence: 12 files, 60 tests; covers evaluator projection into verify-task, first/repeat Wiki indexing, YAML lint diagnostics, generated topology/coverage reports, workflow modality, finalization order, and raw-deletion curated search. Scope: changed context lifecycle behavior.

Command: bun run test:project agentplane. Result: pass. Evidence: 338 test files, 1924 tests. Scope: complete AgentPlane project regression suite.

Command: bun run ci:local:smoke. Result: pass. Evidence: repository Prettier check, Vitest project routing, full core ESLint, and 16-file/146-test precommit suite passed. Scope: local smoke quality gate.

Command: bun run typecheck. Result: pass. Evidence: TypeScript build completed with no diagnostics. Scope: workspace type contracts.

Command: bun run format:changed. Result: pass. Evidence: all 29 changed files matched Prettier style. Scope: task diff formatting.

Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: repository policy graph.

Command: bun packages/agentplane/bin/agentplane.js help context finalize-task. Result: pass. Evidence: CLI exposes context finalize-task <task-id> with the expected contract. Scope: new operator surface.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-21T21:33:12.799Z — VERIFY — ok

By: EVALUATOR

Note: Focused context tests, full AgentPlane suite, smoke gate, typecheck, formatting, routing, CLI help, and doctor all passed; only unrelated historical doctor warnings remain.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-21T21:33:09.691Z, excerpt_hash=sha256:3dce42a7dd8c071ce5916b5cc05fea64d41f70ad2d75e99a4bc037a283d17c41

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607211645-TQ70WD-repair-maximum-assimilation-context-lifecycle/.agentplane/tasks/202607211645-TQ70WD/blueprint/resolved-snapshot.json
- old_digest: 230c818d37ab56b7e97f3c6e57c02a387ebf20b89a707c0c3449544dfdae11ef
- current_digest: 230c818d37ab56b7e97f3c6e57c02a387ebf20b89a707c0c3449544dfdae11ef
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607211645-TQ70WD

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607211645-TQ70WD
- diagnostic_command: agentplane pr check 202607211645-TQ70WD
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task commits. No persisted user data migration is planned; any new derived evaluator/report projection must be reconstructible from task-local evaluator evidence or existing canonical context inputs.

## Findings

- Observation: Maximum-assimilation verification consumed .agentplane/context/derived/reports/evaluator.jsonl while evaluator run only wrote task-local quality-report.json.
  Impact: The documented lifecycle could not complete without a forbidden manual write to the derived context layer.
  Resolution: Evaluator run now projects recorded maximum-assimilation reviews into a stable task-scoped evaluator scenario and carries explicit raw-deletion evidence.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: Generated Wiki indexes rendered an empty source_refs value as malformed YAML, and wiki lint used substring checks instead of the runtime YAML parser.
  Impact: Wiki lint could pass pages that later crashed context check and doctor with an internal YAML parse error.
  Resolution: Wiki generation now uses the shared YAML serializer; lint parses and type-checks frontmatter; doctor reports invalid Wiki YAML as E_VALIDATION with file and parser location.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: Wiki modality and expected-artifact contracts diverged from maximum-assimilation page types and verifier requirements.
  Impact: Workflow pages were rejected and topology/coverage reports required manual creation.
  Resolution: Workflow modality is shared by CLI and manifest, expected artifacts include topology, and wiki report generates topology and coverage pages.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: Curated search was reindexed after removing the raw source fixture and remained usable while raw-only search returned no rows.
  Impact: Raw-deletion resilience is now protected against regression instead of relying only on a manual test report.
  Resolution: Added a regression covering curated-only reindex and search after raw removal; evaluator scenarios now require passing raw-deletion evidence.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: ap doctor completed with zero errors and two warnings for historical DONE tasks 202606040927-KSESDS and 202606041702-TVTSM2 missing implementation hashes.
  Impact: No impact on this task; warnings predate and are outside the approved context lifecycle scope.
  Resolution: Recorded as baseline drift; no unrelated historical task mutation performed.
