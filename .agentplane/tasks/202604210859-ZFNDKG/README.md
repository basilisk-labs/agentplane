---
id: "202604210859-ZFNDKG"
title: "Tighten Knip unused-code guard"
result_summary: "Knip check now fails on new unused-code baseline growth while preserving current debt."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on:
  - "202604210859-2TSS0Y"
tags:
  - "ci"
  - "code"
  - "tooling"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T10:40:15.518Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T10:50:34.623Z"
  updated_by: "CODER"
  note: "Tightened Knip into a current-baseline regression guard; post-refactor repository passes, artificial unused probe fails as expected, and command behavior is documented."
commit:
  hash: "e238fcdb3f1345a9fdb952c6b5c4389e2b046643"
  message: "✅ ZFNDKG code: done"
comments:
  -
    author: "CODER"
    body: "Start: tighten Knip unused-code guard into a regression check while preserving existing baseline."
  -
    author: "CODER"
    body: "Verified: tightened Knip unused-code guard into a current-baseline regression check; post-refactor baseline passes, artificial unused probe fails as expected, and command behavior is documented."
events:
  -
    type: "status"
    at: "2026-04-21T10:40:15.953Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tighten Knip unused-code guard into a regression check while preserving existing baseline."
  -
    type: "verify"
    at: "2026-04-21T10:44:32.778Z"
    author: "CODER"
    state: "ok"
    note: "Tightened Knip from warn-only to baseline regression guard; current repository passes, artificial unused probe fails as expected, and command behavior is documented."
  -
    type: "verify"
    at: "2026-04-21T10:50:34.623Z"
    author: "CODER"
    state: "ok"
    note: "Tightened Knip into a current-baseline regression guard; post-refactor repository passes, artificial unused probe fails as expected, and command behavior is documented."
  -
    type: "status"
    at: "2026-04-21T10:50:50.260Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: tightened Knip unused-code guard into a current-baseline regression check; post-refactor baseline passes, artificial unused probe fails as expected, and command behavior is documented."
doc_version: 3
doc_updated_at: "2026-04-21T10:50:50.261Z"
doc_updated_by: "CODER"
description: "Move Knip enforcement from warn-only toward failing on newly introduced unused exports/files while preserving existing ignores."
sections:
  Summary: "Make Knip useful as a regression guard without forcing immediate cleanup of all historical unused-code findings."
  Scope: "In scope: knip config/scripts and CI/local command behavior. Out of scope: broad unused-code cleanup."
  Plan: |-
    1. Inspect current knip scripts and ignore baseline.
    2. Configure failure for new unused files/exports if supported by existing workflow.
    3. Keep existing known ignores explicit.
    4. Run knip and related checks.
  Verify Steps: |-
    - Existing repository passes without expanding ignore lists.
    - A newly added unused export/file would fail the chosen guard.
    - The command behavior is documented in package scripts/config.
  Verification: |-
    - Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210859-ZFNDKG`
      - Result: pass
      - Evidence: task requires existing repository pass, newly added unused export/file failure, and documented command behavior.
      - Scope: task acceptance contract.
    - Command: `node scripts/check-knip-baseline.mjs`
      - Result: pass
      - Evidence: Knip unused-code baseline OK (files=11/11, exports=251/251, types=301/301, enumMembers=0/0, namespaceMembers=0/0, total=563/563).
      - Scope: direct script execution and current baseline after the accepted Redmine/schema split commits.
    - Command: `bun run knip:check`
      - Result: pass
      - Evidence: package script runs the baseline guard and reports the same 563/563 guarded findings.
      - Scope: CI/local package command behavior.
    - Command: artificial unused-file probe using `packages/agentplane/src/__knip_unused_probe.ts` followed by `node scripts/check-knip-baseline.mjs`
      - Result: pass
      - Evidence: guard failed as expected with files baseline grew count=12 max=11 and total baseline grew count=564 max=563; probe file was removed.
      - Scope: regression behavior for newly introduced unused files/exports.
    - Command: `bunx eslint scripts/check-knip-baseline.mjs`
      - Result: pass
      - Evidence: ESLint exited with code 0.
      - Scope: new guard script.
    - Command: `bunx prettier --check package.json scripts/check-knip-baseline.mjs docs/developer/testing-and-quality.mdx`
      - Result: pass
      - Evidence: all matched files use Prettier code style.
      - Scope: changed package script, guard script, and documentation.
    - Command: `git diff --check -- .agentplane/tasks/202604210859-ZFNDKG/README.md docs/developer/testing-and-quality.mdx package.json scripts/check-knip-baseline.mjs`
      - Result: pass
      - Evidence: no whitespace errors in task-scoped files.
      - Scope: changed files for this task.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T10:50:34.623Z — VERIFY — ok
    
    By: CODER
    
    Note: Tightened Knip into a current-baseline regression guard; post-refactor repository passes, artificial unused probe fails as expected, and command behavior is documented.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:50:33.723Z, excerpt_hash=sha256:79914544d1c28aee3ce45e76ad53af4310057001f76cd712e371a28d8a565369
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert knip config/script changes."
  Findings: "Source input: REFACTORING_PLAN D.2."
id_source: "generated"
---
## Summary

Make Knip useful as a regression guard without forcing immediate cleanup of all historical unused-code findings.

## Scope

In scope: knip config/scripts and CI/local command behavior. Out of scope: broad unused-code cleanup.

## Plan

1. Inspect current knip scripts and ignore baseline.
2. Configure failure for new unused files/exports if supported by existing workflow.
3. Keep existing known ignores explicit.
4. Run knip and related checks.

## Verify Steps

- Existing repository passes without expanding ignore lists.
- A newly added unused export/file would fail the chosen guard.
- The command behavior is documented in package scripts/config.

## Verification

- Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210859-ZFNDKG`
  - Result: pass
  - Evidence: task requires existing repository pass, newly added unused export/file failure, and documented command behavior.
  - Scope: task acceptance contract.
- Command: `node scripts/check-knip-baseline.mjs`
  - Result: pass
  - Evidence: Knip unused-code baseline OK (files=11/11, exports=251/251, types=301/301, enumMembers=0/0, namespaceMembers=0/0, total=563/563).
  - Scope: direct script execution and current baseline after the accepted Redmine/schema split commits.
- Command: `bun run knip:check`
  - Result: pass
  - Evidence: package script runs the baseline guard and reports the same 563/563 guarded findings.
  - Scope: CI/local package command behavior.
- Command: artificial unused-file probe using `packages/agentplane/src/__knip_unused_probe.ts` followed by `node scripts/check-knip-baseline.mjs`
  - Result: pass
  - Evidence: guard failed as expected with files baseline grew count=12 max=11 and total baseline grew count=564 max=563; probe file was removed.
  - Scope: regression behavior for newly introduced unused files/exports.
- Command: `bunx eslint scripts/check-knip-baseline.mjs`
  - Result: pass
  - Evidence: ESLint exited with code 0.
  - Scope: new guard script.
- Command: `bunx prettier --check package.json scripts/check-knip-baseline.mjs docs/developer/testing-and-quality.mdx`
  - Result: pass
  - Evidence: all matched files use Prettier code style.
  - Scope: changed package script, guard script, and documentation.
- Command: `git diff --check -- .agentplane/tasks/202604210859-ZFNDKG/README.md docs/developer/testing-and-quality.mdx package.json scripts/check-knip-baseline.mjs`
  - Result: pass
  - Evidence: no whitespace errors in task-scoped files.
  - Scope: changed files for this task.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T10:50:34.623Z — VERIFY — ok

By: CODER

Note: Tightened Knip into a current-baseline regression guard; post-refactor repository passes, artificial unused probe fails as expected, and command behavior is documented.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:50:33.723Z, excerpt_hash=sha256:79914544d1c28aee3ce45e76ad53af4310057001f76cd712e371a28d8a565369

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert knip config/script changes.

## Findings

Source input: REFACTORING_PLAN D.2.
