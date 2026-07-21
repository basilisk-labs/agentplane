---
id: "202607211645-TQ70WD"
title: "Repair maximum assimilation context lifecycle"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the approved maximum-assimilation lifecycle fixes and regression coverage from the dedicated main-based task worktree."
events:
  -
    type: "status"
    at: "2026-07-21T16:46:59.775Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved maximum-assimilation lifecycle fixes and regression coverage from the dedicated main-based task worktree."
doc_version: 3
doc_updated_at: "2026-07-21T21:31:16.902Z"
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
