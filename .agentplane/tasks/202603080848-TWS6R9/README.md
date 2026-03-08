---
id: "202603080848-TWS6R9"
title: "Remove ignored d.ts lint noise in local hooks"
result_summary: "Extracted pre-commit staged-file selection into a helper and excluded .d.ts files from ESLint targets while preserving Prettier coverage and ordinary source-file linting."
status: "DONE"
priority: "low"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T08:57:40.532Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T08:59:32.443Z"
  updated_by: "TESTER"
  note: "Verified: pre-commit file selection now excludes declaration files from ESLint targets while preserving Prettier coverage and ordinary source-file lint coverage. Lint and the regression test both passed."
commit:
  hash: "1d0aea16ec77a4ab05204ee8e9f56cafe9389fb1"
  message: "🧹 TWS6R9 hooks: drop ignored d.ts lint noise"
comments:
  -
    author: "CODER"
    body: "Start: extracting the pre-commit staged-file selector and excluding declaration files from ESLint targets while keeping normal source-file lint coverage intact."
  -
    author: "CODER"
    body: "Verified: pre-commit file selection now leaves declaration files in the formatter path but excludes them from ESLint targets, removing non-actionable ignored-file warnings from local hooks."
events:
  -
    type: "status"
    at: "2026-03-08T08:57:40.842Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extracting the pre-commit staged-file selector and excluding declaration files from ESLint targets while keeping normal source-file lint coverage intact."
  -
    type: "verify"
    at: "2026-03-08T08:59:11.933Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: pre-commit file selection now excludes declaration files from ESLint targets while preserving Prettier coverage and ordinary source-file lint coverage. Lint and the regression test both passed."
  -
    type: "verify"
    at: "2026-03-08T08:59:32.443Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: pre-commit file selection now excludes declaration files from ESLint targets while preserving Prettier coverage and ordinary source-file lint coverage. Lint and the regression test both passed."
  -
    type: "status"
    at: "2026-03-08T08:59:46.396Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-commit file selection now leaves declaration files in the formatter path but excludes them from ESLint targets, removing non-actionable ignored-file warnings from local hooks."
doc_version: 2
doc_updated_at: "2026-03-08T08:59:46.396Z"
doc_updated_by: "CODER"
description: "Stop local hook and targeted lint paths from printing ignored .d.ts warnings while preserving lint coverage for relevant runtime files."
id_source: "generated"
---
## Summary

Remove ignored d.ts lint noise in local hooks

Stop local hook and targeted lint paths from printing ignored .d.ts warnings while preserving lint coverage for relevant runtime files.

## Scope

- In scope: Stop local hook and targeted lint paths from printing ignored .d.ts warnings while preserving lint coverage for relevant runtime files..
- Out of scope: unrelated refactors not required for "Remove ignored d.ts lint noise in local hooks".

## Plan

1. Extract pre-commit staged-file selection into a small helper so the ESLint target set is deterministic and testable.
2. Exclude ignored declaration files such as .d.ts from ESLint targets while preserving Prettier coverage and normal source-file linting.
3. Verify the selector with a regression test and lint the touched hook files.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- `bun run lint:core -- scripts/run-pre-commit-hook.mjs scripts/lib/pre-commit-staged-files.mjs packages/agentplane/src/cli/pre-commit-staged-files.test.ts`
- `bunx vitest run packages/agentplane/src/cli/pre-commit-staged-files.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000`

### Evidence / Commands
- Record that declaration files remain eligible for Prettier when relevant but are excluded from the ESLint target list.

### Pass criteria
- Local pre-commit selection no longer emits ignored .d.ts ESLint warnings while preserving coverage for regular lintable source files.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T08:59:11.933Z — VERIFY — ok

By: TESTER

Note: Verified: pre-commit file selection now excludes declaration files from ESLint targets while preserving Prettier coverage and ordinary source-file lint coverage. Lint and the regression test both passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T08:57:40.842Z, excerpt_hash=sha256:99368444755b95d8a7ec2dd0d4e310d02a47c4962e5e87131afea3d3b89237dd

#### 2026-03-08T08:59:32.443Z — VERIFY — ok

By: TESTER

Note: Verified: pre-commit file selection now excludes declaration files from ESLint targets while preserving Prettier coverage and ordinary source-file lint coverage. Lint and the regression test both passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T08:59:11.934Z, excerpt_hash=sha256:99368444755b95d8a7ec2dd0d4e310d02a47c4962e5e87131afea3d3b89237dd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Notes

- Motivation: recent commits still printed non-actionable ESLint warnings because .d.ts files were forwarded into targeted lint invocations even though ESLint ignores them.
- Non-goal: changing the repository-wide ESLint config or weakening source-file lint coverage.
