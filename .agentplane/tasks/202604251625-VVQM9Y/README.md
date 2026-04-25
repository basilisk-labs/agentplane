---
id: "202604251625-VVQM9Y"
title: "Refactor workflow runtime validation"
result_summary: "Split validate.ts into orchestration, front matter schema validation, and primitive validation helpers; workflow-runtime/validate.ts is no longer a hotspot."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
verify:
  - "bun run test:project -- agentplane packages/agentplane/src/workflow-runtime/validate.test.ts packages/agentplane/src/workflow-runtime/build.test.ts packages/agentplane/src/workflow-runtime/fix.test.ts"
  - "bun run typecheck && bun run lint:core && bun run arch:check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-25T16:27:13.218Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-25T16:33:49.279Z"
  updated_by: "CODER"
  note: "Workflow runtime validation refactor passed focused tests, typecheck, lint, architecture, formatting, hotspot, task/artifact gates, and framework bootstrap."
commit:
  hash: "b343976ab9c063d426c0a595f1c9a3c2875056fb"
  message: "♻️ VVQM9Y task: split workflow validation"
comments:
  -
    author: "CODER"
    body: "Start: Refactoring workflow-runtime validation as the first approved atom, preserving validation behavior and using focused workflow-runtime tests plus repository gates."
  -
    author: "CODER"
    body: "Verified: workflow-runtime validation split passed focused tests and repository gates; refactor graph recorded for the next sequential atoms."
events:
  -
    type: "status"
    at: "2026-04-25T16:27:37.000Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Refactoring workflow-runtime validation as the first approved atom, preserving validation behavior and using focused workflow-runtime tests plus repository gates."
  -
    type: "verify"
    at: "2026-04-25T16:33:49.279Z"
    author: "CODER"
    state: "ok"
    note: "Workflow runtime validation refactor passed focused tests, typecheck, lint, architecture, formatting, hotspot, task/artifact gates, and framework bootstrap."
  -
    type: "status"
    at: "2026-04-25T16:35:36.453Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: workflow-runtime validation split passed focused tests and repository gates; refactor graph recorded for the next sequential atoms."
doc_version: 3
doc_updated_at: "2026-04-25T16:35:36.454Z"
doc_updated_by: "CODER"
description: "Split workflow-runtime validation into smaller modules without changing validation behavior, error messages, or workflow schema semantics. Target the current validate.ts hotspot first."
sections:
  Summary: |-
    Refactor workflow runtime validation
    
    Split workflow-runtime validation into smaller modules without changing validation behavior, error messages, or workflow schema semantics. Target the current validate.ts hotspot first.
  Scope: |-
    - In scope: Split workflow-runtime validation into smaller modules without changing validation behavior, error messages, or workflow schema semantics. Target the current validate.ts hotspot first.
    - Out of scope: unrelated refactors not required for "Refactor workflow runtime validation".
  Plan: |-
    1. Inspect workflow-runtime validation structure and tests to identify pure extraction boundaries.
    2. Move reusable primitive validators, section parsing, or issue helpers into focused modules without changing public exports or validation text.
    3. Keep validate.ts as the public orchestration entrypoint and preserve existing behavior.
    4. Run focused workflow-runtime tests plus typecheck/lint/arch/hotspot gates, record verification, and finish with traceable commits.
  Verify Steps: |-
    1. Run bun run test:project -- agentplane packages/agentplane/src/workflow-runtime/validate.test.ts packages/agentplane/src/workflow-runtime/build.test.ts packages/agentplane/src/workflow-runtime/template.test.ts packages/agentplane/src/workflow-runtime/file-ops.test.ts. Expected: it succeeds and confirms validation/front matter behavior is unchanged.
    2. Run bun run typecheck; bun run lint:core; bun run arch:check. Expected: each succeeds and confirms type safety, lint rules, and dependency boundaries.
    3. Run node scripts/hotspot-report.mjs --check. Expected: it succeeds and workflow-runtime/validate.ts is no longer a runtime hotspot.
    4. Compare the final result against task scope. Expected: remaining follow-up is either resolved or explicit in Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-25T16:33:49.279Z — VERIFY — ok
    
    By: CODER
    
    Note: Workflow runtime validation refactor passed focused tests, typecheck, lint, architecture, formatting, hotspot, task/artifact gates, and framework bootstrap.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T16:30:34.294Z, excerpt_hash=sha256:9a78cef1f62c3b1172857650fc89c9ffa1c2c6c2bff810e1a0503599c65a64bb
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Command: bun run test:project -- agentplane packages/agentplane/src/workflow-runtime/validate.test.ts packages/agentplane/src/workflow-runtime/build.test.ts packages/agentplane/src/workflow-runtime/template.test.ts packages/agentplane/src/workflow-runtime/file-ops.test.ts
      Result: pass. Evidence: 4 files, 11 tests passed. Scope: workflow front matter validation, build, template, file operations.
    - Command: bun run typecheck; bun run lint:core; bun run format:check; bun run arch:check; git diff --check
      Result: pass. Evidence: each command exited 0. Scope: type safety, lint/style, import boundaries, whitespace.
    - Command: node scripts/hotspot-report.mjs --check
      Result: pass. Evidence: runtime hotspot warning count dropped from 13 to 12; workflow-runtime/validate.ts is no longer listed. Scope: hotspot budget for this atom.
    - Command: node scripts/check-task-state.mjs; node scripts/check-agentplane-artifacts.mjs; bun run framework:dev:bootstrap
      Result: pass. Evidence: task state OK, artifact policy OK, repo-local runtime rebuilt and version 0.3.27 matched expected. Scope: task graph hygiene and runtime freshness.
    - Residual: next scheduled atom is 202604251626-PQAXKH for doctor workspace diagnostics.
id_source: "generated"
---
## Summary

Refactor workflow runtime validation

Split workflow-runtime validation into smaller modules without changing validation behavior, error messages, or workflow schema semantics. Target the current validate.ts hotspot first.

## Scope

- In scope: Split workflow-runtime validation into smaller modules without changing validation behavior, error messages, or workflow schema semantics. Target the current validate.ts hotspot first.
- Out of scope: unrelated refactors not required for "Refactor workflow runtime validation".

## Plan

1. Inspect workflow-runtime validation structure and tests to identify pure extraction boundaries.
2. Move reusable primitive validators, section parsing, or issue helpers into focused modules without changing public exports or validation text.
3. Keep validate.ts as the public orchestration entrypoint and preserve existing behavior.
4. Run focused workflow-runtime tests plus typecheck/lint/arch/hotspot gates, record verification, and finish with traceable commits.

## Verify Steps

1. Run bun run test:project -- agentplane packages/agentplane/src/workflow-runtime/validate.test.ts packages/agentplane/src/workflow-runtime/build.test.ts packages/agentplane/src/workflow-runtime/template.test.ts packages/agentplane/src/workflow-runtime/file-ops.test.ts. Expected: it succeeds and confirms validation/front matter behavior is unchanged.
2. Run bun run typecheck; bun run lint:core; bun run arch:check. Expected: each succeeds and confirms type safety, lint rules, and dependency boundaries.
3. Run node scripts/hotspot-report.mjs --check. Expected: it succeeds and workflow-runtime/validate.ts is no longer a runtime hotspot.
4. Compare the final result against task scope. Expected: remaining follow-up is either resolved or explicit in Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-25T16:33:49.279Z — VERIFY — ok

By: CODER

Note: Workflow runtime validation refactor passed focused tests, typecheck, lint, architecture, formatting, hotspot, task/artifact gates, and framework bootstrap.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T16:30:34.294Z, excerpt_hash=sha256:9a78cef1f62c3b1172857650fc89c9ffa1c2c6c2bff810e1a0503599c65a64bb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Command: bun run test:project -- agentplane packages/agentplane/src/workflow-runtime/validate.test.ts packages/agentplane/src/workflow-runtime/build.test.ts packages/agentplane/src/workflow-runtime/template.test.ts packages/agentplane/src/workflow-runtime/file-ops.test.ts
  Result: pass. Evidence: 4 files, 11 tests passed. Scope: workflow front matter validation, build, template, file operations.
- Command: bun run typecheck; bun run lint:core; bun run format:check; bun run arch:check; git diff --check
  Result: pass. Evidence: each command exited 0. Scope: type safety, lint/style, import boundaries, whitespace.
- Command: node scripts/hotspot-report.mjs --check
  Result: pass. Evidence: runtime hotspot warning count dropped from 13 to 12; workflow-runtime/validate.ts is no longer listed. Scope: hotspot budget for this atom.
- Command: node scripts/check-task-state.mjs; node scripts/check-agentplane-artifacts.mjs; bun run framework:dev:bootstrap
  Result: pass. Evidence: task state OK, artifact policy OK, repo-local runtime rebuilt and version 0.3.27 matched expected. Scope: task graph hygiene and runtime freshness.
- Residual: next scheduled atom is 202604251626-PQAXKH for doctor workspace diagnostics.
