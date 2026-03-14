---
id: "202603141209-BKJA9H"
title: "Expand upgrade regression matrix for legacy and drifted repos"
result_summary: "Upgrade recovery coverage now includes combined policy-tree drift plus legacy README repair, and upgrade commits derive protected-path hook overrides for mixed recovery runs."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
depends_on: []
tags:
  - "code"
  - "upgrade"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts packages/agentplane/src/commands/upgrade.cleanup.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T12:28:20.292Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T12:34:29.825Z"
  updated_by: "CODER"
  note: "Verified: upgrade regression coverage now includes combined legacy README and managed policy drift recovery, and upgrade commits honor protected-path hook overrides for mixed recovery runs."
commit:
  hash: "02dfa41e14712566b255485d0a1a5bf981f05b4e"
  message: "✨ BKJA9H code: expand upgrade recovery coverage for drifted legacy repos"
comments:
  -
    author: "CODER"
    body: "Start: expand the upgrade regression matrix for legacy and drifted repository states without changing upgrade semantics beyond tested recovery coverage."
  -
    author: "CODER"
    body: "Verified: upgrade regression coverage and release smoke now include a drifted legacy recovery path, and the upgrade commit path correctly permits protected config writes during managed recovery."
events:
  -
    type: "status"
    at: "2026-03-14T12:28:20.694Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: expand the upgrade regression matrix for legacy and drifted repository states without changing upgrade semantics beyond tested recovery coverage."
  -
    type: "verify"
    at: "2026-03-14T12:34:29.825Z"
    author: "CODER"
    state: "ok"
    note: "Verified: upgrade regression coverage now includes combined legacy README and managed policy drift recovery, and upgrade commits honor protected-path hook overrides for mixed recovery runs."
  -
    type: "status"
    at: "2026-03-14T12:34:49.483Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: upgrade regression coverage and release smoke now include a drifted legacy recovery path, and the upgrade commit path correctly permits protected config writes during managed recovery."
doc_version: 3
doc_updated_at: "2026-03-14T12:34:49.484Z"
doc_updated_by: "CODER"
description: "Add targeted fixtures and regression coverage for partial upgrade, manual drift, missing workflow artifacts, and projection states that omit doc_version so patch releases validate recovery paths instead of only happy paths."
sections:
  Summary: |-
    Expand upgrade regression matrix for legacy and drifted repos
    
    Add targeted fixtures and regression coverage for partial upgrade, manual drift, missing workflow artifacts, and projection states that omit doc_version so patch releases validate recovery paths instead of only happy paths.
  Scope: |-
    - In scope: Add targeted fixtures and regression coverage for partial upgrade, manual drift, missing workflow artifacts, and projection states that omit doc_version so patch releases validate recovery paths instead of only happy paths.
    - Out of scope: unrelated refactors not required for "Expand upgrade regression matrix for legacy and drifted repos".
  Plan: "1. Add fixtures that represent partial upgrade, manual drift, missing workflow artifacts, and projection states without doc_version. 2. Extend upgrade and release-smoke regressions so recovery paths are exercised end to end instead of only happy-path installs. 3. Keep the matrix fast enough for patch-release gating while proving the intended migration contract."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts packages/agentplane/src/commands/upgrade.cleanup.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T12:34:29.825Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: upgrade regression coverage now includes combined legacy README and managed policy drift recovery, and upgrade commits honor protected-path hook overrides for mixed recovery runs.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T12:28:20.695Z, excerpt_hash=sha256:594aea82c875533f832e0310fb399421b8d89cdedc3c3e1e6946fb506106740d
    
    Details:
    
    Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts packages/agentplane/src/commands/upgrade.cleanup.test.ts
    Result: pass
    Evidence: 16 tests passed; both core upgrade and release-smoke now cover a repo with an incomplete managed policy tree plus an active legacy README v2 task, and the combined recovery path completes cleanly.
    Scope: upgrade recovery matrix for drifted/legacy repos and protected-path hook handling during upgrade commits.
    
    Command: bun x tsc -b packages/core packages/agentplane
    Result: pass
    Evidence: TypeScript project build completed without errors.
    Scope: compile safety for upgrade commit env derivation and new regression fixtures.
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/upgrade/apply.ts packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts && ./node_modules/.bin/prettier --check packages/agentplane/src/commands/upgrade/apply.ts packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts
    Result: pass
    Evidence: eslint returned clean and Prettier reported all matched files already formatted.
    Scope: changed source/test files for the combined recovery regression.
    
    Command: git diff -- packages/agentplane/src/commands/upgrade/apply.ts packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts
    Result: pass
    Evidence: diff is limited to upgrade commit env overrides for protected paths and new combined legacy/drift recovery coverage in the release gate.
    Scope: final result compared against the approved task scope.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Expand upgrade regression matrix for legacy and drifted repos

Add targeted fixtures and regression coverage for partial upgrade, manual drift, missing workflow artifacts, and projection states that omit doc_version so patch releases validate recovery paths instead of only happy paths.

## Scope

- In scope: Add targeted fixtures and regression coverage for partial upgrade, manual drift, missing workflow artifacts, and projection states that omit doc_version so patch releases validate recovery paths instead of only happy paths.
- Out of scope: unrelated refactors not required for "Expand upgrade regression matrix for legacy and drifted repos".

## Plan

1. Add fixtures that represent partial upgrade, manual drift, missing workflow artifacts, and projection states without doc_version. 2. Extend upgrade and release-smoke regressions so recovery paths are exercised end to end instead of only happy-path installs. 3. Keep the matrix fast enough for patch-release gating while proving the intended migration contract.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts packages/agentplane/src/commands/upgrade.cleanup.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T12:34:29.825Z — VERIFY — ok

By: CODER

Note: Verified: upgrade regression coverage now includes combined legacy README and managed policy drift recovery, and upgrade commits honor protected-path hook overrides for mixed recovery runs.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T12:28:20.695Z, excerpt_hash=sha256:594aea82c875533f832e0310fb399421b8d89cdedc3c3e1e6946fb506106740d

Details:

Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts packages/agentplane/src/commands/upgrade.cleanup.test.ts
Result: pass
Evidence: 16 tests passed; both core upgrade and release-smoke now cover a repo with an incomplete managed policy tree plus an active legacy README v2 task, and the combined recovery path completes cleanly.
Scope: upgrade recovery matrix for drifted/legacy repos and protected-path hook handling during upgrade commits.

Command: bun x tsc -b packages/core packages/agentplane
Result: pass
Evidence: TypeScript project build completed without errors.
Scope: compile safety for upgrade commit env derivation and new regression fixtures.

Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/upgrade/apply.ts packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts && ./node_modules/.bin/prettier --check packages/agentplane/src/commands/upgrade/apply.ts packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts
Result: pass
Evidence: eslint returned clean and Prettier reported all matched files already formatted.
Scope: changed source/test files for the combined recovery regression.

Command: git diff -- packages/agentplane/src/commands/upgrade/apply.ts packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts
Result: pass
Evidence: diff is limited to upgrade commit env overrides for protected paths and new combined legacy/drift recovery coverage in the release gate.
Scope: final result compared against the approved task scope.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
