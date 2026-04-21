---
id: "202604210900-20N2C1"
title: "Make task doc v3 the only supported version"
status: "DOING"
priority: "normal"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on:
  - "202604210900-RP5GA0"
tags:
  - "breaking"
  - "code"
  - "migration"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T09:45:27.351Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T10:04:20.997Z"
  updated_by: "CODER"
  note: "Made task README schema/metadata/lint enforcement v3-only, updated schema artifacts/examples/docs, and passed targeted core/backend tests plus typechecks."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make task README doc_version=3 the only supported active format, keep migration command guidance, and update targeted task-doc tests."
events:
  -
    type: "status"
    at: "2026-04-21T09:45:42.761Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make task README doc_version=3 the only supported active format, keep migration command guidance, and update targeted task-doc tests."
  -
    type: "verify"
    at: "2026-04-21T10:04:20.997Z"
    author: "CODER"
    state: "ok"
    note: "Made task README schema/metadata/lint enforcement v3-only, updated schema artifacts/examples/docs, and passed targeted core/backend tests plus typechecks."
doc_version: 3
doc_updated_at: "2026-04-21T10:04:21.002Z"
doc_updated_by: "CODER"
description: "Drop task doc v2 support only after migration policy confirms old task READMEs can fail explicitly."
sections:
  Summary: "Set supported task documentation to v3 only if T23 approves breaking removal; otherwise defer with migration criteria."
  Scope: "In scope: SUPPORTED_DOC_VERSIONS, v2 parsing/migration tests, and release/migration guidance. Out of scope: changing v3 section contract."
  Plan: |-
    1. Confirm T23 authorizes removal.
    2. Change supported doc versions to v3 only.
    3. Remove or isolate v2 parsing tests and keep migration guidance.
    4. Run task doc/backend tests.
  Verify Steps: |-
    - v2 docs fail explicitly with actionable guidance.
    - v3 tasks continue to pass.
    - Migration path is documented.
  Verification: |-
    - Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210900-20N2C1`
      - Result: pass
      - Evidence: verification contract requires explicit v2 failure, v3 continuity, and migration guidance.
      - Scope: task acceptance contract.
    - Command: `bun run test:project -- core --run packages/core/src/tasks/task-store.test.ts packages/core/src/tasks/tasks-lint.test.ts packages/core/src/tasks/task-artifact-schema.test.ts`
      - Result: pass
      - Evidence: 3 files passed, 28 tests passed.
      - Scope: core task metadata/schema/lint behavior.
    - Command: `bun run test:project -- agentplane --run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.test.ts`
      - Result: pass
      - Evidence: 2 files passed, 48 tests passed.
      - Scope: local backend task read/write behavior after v3-only schema enforcement.
    - Command: `bun run --filter=@agentplaneorg/core typecheck`
      - Result: pass
      - Evidence: @agentplaneorg/core typecheck exited with code 0.
      - Scope: core package type safety.
    - Command: `bun run --filter=agentplane typecheck`
      - Result: pass
      - Evidence: agentplane typecheck exited with code 0.
      - Scope: agentplane package type safety.
    - Command: `bun run schemas:sync`
      - Result: pass
      - Evidence: synced task README and tasks export schemas into packages/spec and packages/core schema artifacts.
      - Scope: published schema artifacts.
    - Command: `bun run framework:dev:bootstrap`
      - Result: pass
      - Evidence: framework dev runtime is ready.
      - Scope: rebuilt watched runtime after core/backend source changes.
    - Command: `git diff --check -- packages/core/src/tasks/task-artifact-schema.ts packages/core/src/tasks/task-doc-contract.ts packages/core/src/tasks/tasks-lint.ts packages/core/src/tasks/task-store.test.ts packages/core/src/tasks/tasks-lint.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend/shared/constants.ts docs/user/tasks-and-backends.mdx docs/help/troubleshooting-by-symptom.mdx packages/spec/examples/task-readme-frontmatter.json packages/spec/examples/tasks.json packages/spec/schemas/task-readme-frontmatter.schema.json packages/core/schemas/task-readme-frontmatter.schema.json packages/spec/schemas/tasks-export.schema.json packages/core/schemas/tasks-export.schema.json .agentplane/tasks/202604210900-20N2C1/README.md`
      - Result: pass
      - Evidence: no whitespace errors.
      - Scope: changed files for this task.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T10:04:20.997Z — VERIFY — ok
    
    By: CODER
    
    Note: Made task README schema/metadata/lint enforcement v3-only, updated schema artifacts/examples/docs, and passed targeted core/backend tests plus typechecks.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:04:20.295Z, excerpt_hash=sha256:1178180ad0782fa338b3ff2e24a3962e11601b1440133b5954c3b92e83b11b25
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore v2 support and tests."
  Findings: "Highest data-compatibility risk among bridge removals."
id_source: "generated"
---
## Summary

Set supported task documentation to v3 only if T23 approves breaking removal; otherwise defer with migration criteria.

## Scope

In scope: SUPPORTED_DOC_VERSIONS, v2 parsing/migration tests, and release/migration guidance. Out of scope: changing v3 section contract.

## Plan

1. Confirm T23 authorizes removal.
2. Change supported doc versions to v3 only.
3. Remove or isolate v2 parsing tests and keep migration guidance.
4. Run task doc/backend tests.

## Verify Steps

- v2 docs fail explicitly with actionable guidance.
- v3 tasks continue to pass.
- Migration path is documented.

## Verification

- Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210900-20N2C1`
  - Result: pass
  - Evidence: verification contract requires explicit v2 failure, v3 continuity, and migration guidance.
  - Scope: task acceptance contract.
- Command: `bun run test:project -- core --run packages/core/src/tasks/task-store.test.ts packages/core/src/tasks/tasks-lint.test.ts packages/core/src/tasks/task-artifact-schema.test.ts`
  - Result: pass
  - Evidence: 3 files passed, 28 tests passed.
  - Scope: core task metadata/schema/lint behavior.
- Command: `bun run test:project -- agentplane --run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.test.ts`
  - Result: pass
  - Evidence: 2 files passed, 48 tests passed.
  - Scope: local backend task read/write behavior after v3-only schema enforcement.
- Command: `bun run --filter=@agentplaneorg/core typecheck`
  - Result: pass
  - Evidence: @agentplaneorg/core typecheck exited with code 0.
  - Scope: core package type safety.
- Command: `bun run --filter=agentplane typecheck`
  - Result: pass
  - Evidence: agentplane typecheck exited with code 0.
  - Scope: agentplane package type safety.
- Command: `bun run schemas:sync`
  - Result: pass
  - Evidence: synced task README and tasks export schemas into packages/spec and packages/core schema artifacts.
  - Scope: published schema artifacts.
- Command: `bun run framework:dev:bootstrap`
  - Result: pass
  - Evidence: framework dev runtime is ready.
  - Scope: rebuilt watched runtime after core/backend source changes.
- Command: `git diff --check -- packages/core/src/tasks/task-artifact-schema.ts packages/core/src/tasks/task-doc-contract.ts packages/core/src/tasks/tasks-lint.ts packages/core/src/tasks/task-store.test.ts packages/core/src/tasks/tasks-lint.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend/shared/constants.ts docs/user/tasks-and-backends.mdx docs/help/troubleshooting-by-symptom.mdx packages/spec/examples/task-readme-frontmatter.json packages/spec/examples/tasks.json packages/spec/schemas/task-readme-frontmatter.schema.json packages/core/schemas/task-readme-frontmatter.schema.json packages/spec/schemas/tasks-export.schema.json packages/core/schemas/tasks-export.schema.json .agentplane/tasks/202604210900-20N2C1/README.md`
  - Result: pass
  - Evidence: no whitespace errors.
  - Scope: changed files for this task.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T10:04:20.997Z — VERIFY — ok

By: CODER

Note: Made task README schema/metadata/lint enforcement v3-only, updated schema artifacts/examples/docs, and passed targeted core/backend tests plus typechecks.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:04:20.295Z, excerpt_hash=sha256:1178180ad0782fa338b3ff2e24a3962e11601b1440133b5954c3b92e83b11b25

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore v2 support and tests.

## Findings

Highest data-compatibility risk among bridge removals.
