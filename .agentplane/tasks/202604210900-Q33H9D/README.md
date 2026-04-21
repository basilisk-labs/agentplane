---
id: "202604210900-Q33H9D"
title: "Split task artifact schema by document domain"
result_summary: "Split task artifact schema by document domain without schema compatibility drift."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "schemas"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T10:40:14.652Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T10:47:02.630Z"
  updated_by: "CODER"
  note: "Schema split verified: targeted schema tests, schema sync check, typecheck, targeted lint, and targeted formatting check passed."
commit:
  hash: "a9ee141c2f4ba835787a90e075c84114bc4e3497"
  message: "✅ Q33H9D code: done"
comments:
  -
    author: "CODER"
    body: "Start: split task artifact schema by document domain while preserving public exports and serialized compatibility."
  -
    author: "CODER"
    body: "Verified: split task artifact schema into domain modules while preserving public exports and serialized compatibility; targeted schema tests, schemas check, typecheck, lint/format, and framework bootstrap passed."
events:
  -
    type: "status"
    at: "2026-04-21T10:40:15.084Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split task artifact schema by document domain while preserving public exports and serialized compatibility."
  -
    type: "verify"
    at: "2026-04-21T10:47:02.630Z"
    author: "CODER"
    state: "ok"
    note: "Schema split verified: targeted schema tests, schema sync check, typecheck, targeted lint, and targeted formatting check passed."
  -
    type: "status"
    at: "2026-04-21T10:49:11.568Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: split task artifact schema into domain modules while preserving public exports and serialized compatibility; targeted schema tests, schemas check, typecheck, lint/format, and framework bootstrap passed."
doc_version: 3
doc_updated_at: "2026-04-21T10:49:11.569Z"
doc_updated_by: "CODER"
description: "Break the large task artifact Zod schema into focused schema modules for task, handoff, findings, verification, and PR metadata."
sections:
  Summary: "Decompose task-artifact-schema.ts into domain-specific schema modules without changing serialized artifact compatibility."
  Scope: "In scope: core task artifact schemas, exports, and schema tests. Out of scope: schema version changes."
  Plan: |-
    1. Map existing schema sections to task/handoff/findings/verify/pr-meta domains.
    2. Extract modules while preserving public exports and inferred types.
    3. Add/adjust tests to prove artifact compatibility.
    4. Run core schema tests/typecheck.
  Verify Steps: |-
    - Serialized task artifacts remain compatible.
    - Public exports do not break downstream imports.
    - Schema tests/typecheck pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - Command: `agentplane task verify-show 202604210900-Q33H9D`
      Result: pass
      Evidence: declared contract requires serialized task artifacts compatibility, stable public exports, and schema tests/typecheck.
      Scope: task-local acceptance contract.
    - Command: `bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-artifact-schema.test.ts`
      Result: pass
      Evidence: 3 Vitest project runs passed; 12 assertions passed.
      Scope: task artifact runtime schemas, published JSON schema compatibility, and published spec examples.
    - Command: `bun run schemas:check`
      Result: pass
      Evidence: schemas OK.
      Scope: generated schema artifacts remain synchronized with runtime schema renderers.
    - Command: `bun run typecheck`
      Result: pass
      Evidence: `tsc -b` completed successfully.
      Scope: public TypeScript exports and downstream compile compatibility.
    - Command: `bunx eslint packages/core/src/tasks/task-artifact-schema.ts packages/core/src/tasks/task-artifact-schema.shared.ts packages/core/src/tasks/task-artifact-schema.verification.ts packages/core/src/tasks/task-artifact-schema.findings.ts packages/core/src/tasks/task-artifact-schema.pr-metadata.ts packages/core/src/tasks/task-artifact-schema.handoff.ts packages/core/src/tasks/task-artifact-schema.task.ts`
      Result: pass
      Evidence: targeted ESLint completed without findings.
      Scope: edited schema modules.
    - Command: `bunx prettier --check packages/core/src/tasks/task-artifact-schema.ts packages/core/src/tasks/task-artifact-schema.shared.ts packages/core/src/tasks/task-artifact-schema.verification.ts packages/core/src/tasks/task-artifact-schema.findings.ts packages/core/src/tasks/task-artifact-schema.pr-metadata.ts packages/core/src/tasks/task-artifact-schema.handoff.ts packages/core/src/tasks/task-artifact-schema.task.ts`
      Result: pass
      Evidence: All matched files use Prettier code style.
      Scope: edited schema modules.
    
    ### 2026-04-21T10:47:02.630Z — VERIFY — ok
    
    By: CODER
    
    Note: Schema split verified: targeted schema tests, schema sync check, typecheck, targeted lint, and targeted formatting check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:46:57.900Z, excerpt_hash=sha256:fe4b523db6cbfc97a191a22544df119d97fb9aa14c0432fbb0fdc3572420ad98
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert schema module extraction."
  Findings: |-
    Source input: REFACTORING_PLAN C.4.
    
    - Fact: task artifact schemas now sit behind focused domain modules for task documents, handoff artifacts, Findings/document sections, verification state, and PR metadata.
    - Fact: `packages/core/src/tasks/task-artifact-schema.ts` remains the compatibility facade for existing public exports, validators, and render helpers.
    - Fact: targeted schema tests and `schemas:check` found no serialized JSON schema drift.
    - Residual risk: full repository CI was not run; unrelated concurrent changes exist in Redmine, Knip/tooling, docs, and other task READMEs.
id_source: "generated"
---
## Summary

Decompose task-artifact-schema.ts into domain-specific schema modules without changing serialized artifact compatibility.

## Scope

In scope: core task artifact schemas, exports, and schema tests. Out of scope: schema version changes.

## Plan

1. Map existing schema sections to task/handoff/findings/verify/pr-meta domains.
2. Extract modules while preserving public exports and inferred types.
3. Add/adjust tests to prove artifact compatibility.
4. Run core schema tests/typecheck.

## Verify Steps

- Serialized task artifacts remain compatible.
- Public exports do not break downstream imports.
- Schema tests/typecheck pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- Command: `agentplane task verify-show 202604210900-Q33H9D`
  Result: pass
  Evidence: declared contract requires serialized task artifacts compatibility, stable public exports, and schema tests/typecheck.
  Scope: task-local acceptance contract.
- Command: `bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-artifact-schema.test.ts`
  Result: pass
  Evidence: 3 Vitest project runs passed; 12 assertions passed.
  Scope: task artifact runtime schemas, published JSON schema compatibility, and published spec examples.
- Command: `bun run schemas:check`
  Result: pass
  Evidence: schemas OK.
  Scope: generated schema artifacts remain synchronized with runtime schema renderers.
- Command: `bun run typecheck`
  Result: pass
  Evidence: `tsc -b` completed successfully.
  Scope: public TypeScript exports and downstream compile compatibility.
- Command: `bunx eslint packages/core/src/tasks/task-artifact-schema.ts packages/core/src/tasks/task-artifact-schema.shared.ts packages/core/src/tasks/task-artifact-schema.verification.ts packages/core/src/tasks/task-artifact-schema.findings.ts packages/core/src/tasks/task-artifact-schema.pr-metadata.ts packages/core/src/tasks/task-artifact-schema.handoff.ts packages/core/src/tasks/task-artifact-schema.task.ts`
  Result: pass
  Evidence: targeted ESLint completed without findings.
  Scope: edited schema modules.
- Command: `bunx prettier --check packages/core/src/tasks/task-artifact-schema.ts packages/core/src/tasks/task-artifact-schema.shared.ts packages/core/src/tasks/task-artifact-schema.verification.ts packages/core/src/tasks/task-artifact-schema.findings.ts packages/core/src/tasks/task-artifact-schema.pr-metadata.ts packages/core/src/tasks/task-artifact-schema.handoff.ts packages/core/src/tasks/task-artifact-schema.task.ts`
  Result: pass
  Evidence: All matched files use Prettier code style.
  Scope: edited schema modules.

### 2026-04-21T10:47:02.630Z — VERIFY — ok

By: CODER

Note: Schema split verified: targeted schema tests, schema sync check, typecheck, targeted lint, and targeted formatting check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:46:57.900Z, excerpt_hash=sha256:fe4b523db6cbfc97a191a22544df119d97fb9aa14c0432fbb0fdc3572420ad98

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert schema module extraction.

## Findings

Source input: REFACTORING_PLAN C.4.

- Fact: task artifact schemas now sit behind focused domain modules for task documents, handoff artifacts, Findings/document sections, verification state, and PR metadata.
- Fact: `packages/core/src/tasks/task-artifact-schema.ts` remains the compatibility facade for existing public exports, validators, and render helpers.
- Fact: targeted schema tests and `schemas:check` found no serialized JSON schema drift.
- Residual risk: full repository CI was not run; unrelated concurrent changes exist in Redmine, Knip/tooling, docs, and other task READMEs.
