---
id: "202604220255-E4C2R4"
title: "De-overlap Vitest workspace projects"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604220255-7DPXA1"
tags:
  - "ci"
  - "testing"
  - "vitest"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:06.197Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T07:17:41.223Z"
  updated_by: "CODER"
  note: "Verified Vitest project de-overlap. Checks passed: node scripts/check-vitest-projects.mjs; docs:scripts:check; focused release/local-ci tests; test:precommit; test:platform-critical; test:backend-critical; test:release:critical; test:fast; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: de-overlap Vitest workspace projects while preserving existing CI entrypoints and verification coverage."
events:
  -
    type: "status"
    at: "2026-04-22T06:55:54.051Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: de-overlap Vitest workspace projects while preserving existing CI entrypoints and verification coverage."
  -
    type: "verify"
    at: "2026-04-22T07:17:41.223Z"
    author: "CODER"
    state: "ok"
    note: "Verified Vitest project de-overlap. Checks passed: node scripts/check-vitest-projects.mjs; docs:scripts:check; focused release/local-ci tests; test:precommit; test:platform-critical; test:backend-critical; test:release:critical; test:fast; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check."
doc_version: 3
doc_updated_at: "2026-04-22T07:17:41.236Z"
doc_updated_by: "CODER"
description: "Restructure vitest.workspace.ts so each test file belongs to one primary project and aggregate execution is handled by scripts instead of overlapping projects."
sections:
  Summary: "Reduce duplicate test execution and ambiguous ownership across Vitest projects."
  Scope: "Vitest workspace config, package scripts, and docs if needed. Preserve existing named CI entrypoints or provide compatible replacements."
  Plan: |-
    1. Map current test file membership across projects.
    2. Define non-overlapping primary projects.
    3. Move aggregate combinations to scripts or documented command groups.
    4. Add or update a project membership lint check if practical.
  Verify Steps: "Run vitest workspace/list validation, fast CI, scripts docs check if scripts changed."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T07:17:41.223Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified Vitest project de-overlap. Checks passed: node scripts/check-vitest-projects.mjs; docs:scripts:check; focused release/local-ci tests; test:precommit; test:platform-critical; test:backend-critical; test:release:critical; test:fast; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T06:55:54.060Z, excerpt_hash=sha256:d1c56cea551a5e897d75e1158bdff8e7134e4f0448e1a418d51258bc2edade5e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore previous vitest.workspace.ts project definitions."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Reduce duplicate test execution and ambiguous ownership across Vitest projects.

## Scope

Vitest workspace config, package scripts, and docs if needed. Preserve existing named CI entrypoints or provide compatible replacements.

## Plan

1. Map current test file membership across projects.
2. Define non-overlapping primary projects.
3. Move aggregate combinations to scripts or documented command groups.
4. Add or update a project membership lint check if practical.

## Verify Steps

Run vitest workspace/list validation, fast CI, scripts docs check if scripts changed.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T07:17:41.223Z — VERIFY — ok

By: CODER

Note: Verified Vitest project de-overlap. Checks passed: node scripts/check-vitest-projects.mjs; docs:scripts:check; focused release/local-ci tests; test:precommit; test:platform-critical; test:backend-critical; test:release:critical; test:fast; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T06:55:54.060Z, excerpt_hash=sha256:d1c56cea551a5e897d75e1158bdff8e7134e4f0448e1a418d51258bc2edade5e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore previous vitest.workspace.ts project definitions.

## Findings

None yet.
