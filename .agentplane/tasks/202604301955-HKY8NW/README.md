---
id: "202604301955-HKY8NW"
title: "Add docs IA and path drift guard"
result_summary: "Merged via PR #636."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604301955-D7JQB7"
tags:
  - "code"
  - "docs-ia"
  - "tooling"
verify:
  - "bun run docs:ia:check"
  - "bun run docs:scripts:check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-30T19:56:51.273Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-30T20:48:04.001Z"
  updated_by: "CODER"
  note: "Post-PR fix: docs:ia:check now ignores generated package dist/ references that are not present in fresh CI checkout. Rechecked: bun run docs:ia:check; bun run docs:scripts:check; bun run lint:core."
commit:
  hash: "00031a6f3ac9c42d4784bf97e5abe3e7d06e77b7"
  message: "Merge pull request #636 from basilisk-labs/task/202604301955-HKY8NW/docs-ia-path-guard"
comments:
  -
    author: "CODER"
    body: "Start: implement the approved docs IA/path drift guard in the task worktree, keep the change limited to the docs script surface, and verify with docs:ia:check plus docs script checks."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #636 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-30T20:35:18.846Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved docs IA/path drift guard in the task worktree, keep the change limited to the docs script surface, and verify with docs:ia:check plus docs script checks."
  -
    type: "verify"
    at: "2026-04-30T20:44:48.521Z"
    author: "CODER"
    state: "ok"
    note: "Implemented docs:ia:check for docs/index.mdx/sidebar/doc-file alignment, stale legacy reference denylist, and conservative current-doc repo-path validation. Checks passed: bun run docs:ia:check; bun run docs:scripts:check; bun run docs:site:typecheck; bun run docs:site:build; bun run docs:site:check:design; bun run lint:core; node .agentplane/policy/check-routing.mjs; agentplane doctor; git diff --check."
  -
    type: "verify"
    at: "2026-04-30T20:48:04.001Z"
    author: "CODER"
    state: "ok"
    note: "Post-PR fix: docs:ia:check now ignores generated package dist/ references that are not present in fresh CI checkout. Rechecked: bun run docs:ia:check; bun run docs:scripts:check; bun run lint:core."
  -
    type: "status"
    at: "2026-04-30T20:53:44.587Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #636 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-30T20:53:44.592Z"
doc_updated_by: "INTEGRATOR"
description: "Add an automated docs information-architecture guard that checks docs/index.mdx and website/sidebars.ts alignment, catches orphan current docs, and fails on markdown references to repository paths that no longer exist."
sections:
  Summary: |-
    Add docs IA and path drift guard
    
    Add an automated docs information-architecture guard that checks docs/index.mdx and website/sidebars.ts alignment, catches orphan current docs, and fails on markdown references to repository paths that no longer exist.
  Scope: |-
    - In scope: Add an automated docs information-architecture guard that checks docs/index.mdx and website/sidebars.ts alignment, catches orphan current docs, and fails on markdown references to repository paths that no longer exist.
    - Out of scope: unrelated refactors not required for "Add docs IA and path drift guard".
  Plan: "1. Add a docs IA check script that extracts sidebar doc IDs and docs/index.mdx links and reports mismatches. 2. Add path-reference validation for repository paths mentioned in markdown. 3. Wire the script into package.json and regenerate scripts/README.md. 4. Run bun run docs:ia:check and bun run docs:scripts:check."
  Verify Steps: |-
    1. Run `bun run docs:ia:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-30T20:44:48.521Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented docs:ia:check for docs/index.mdx/sidebar/doc-file alignment, stale legacy reference denylist, and conservative current-doc repo-path validation. Checks passed: bun run docs:ia:check; bun run docs:scripts:check; bun run docs:site:typecheck; bun run docs:site:build; bun run docs:site:check:design; bun run lint:core; node .agentplane/policy/check-routing.mjs; agentplane doctor; git diff --check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T20:35:18.846Z, excerpt_hash=sha256:20e11b2f828727a36a997b9ca3daef3f10a6a26d204ad7c66f43c2f9acc4bc67
    
    ### 2026-04-30T20:48:04.001Z — VERIFY — ok
    
    By: CODER
    
    Note: Post-PR fix: docs:ia:check now ignores generated package dist/ references that are not present in fresh CI checkout. Rechecked: bun run docs:ia:check; bun run docs:scripts:check; bun run lint:core.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T20:44:48.528Z, excerpt_hash=sha256:20e11b2f828727a36a997b9ca3daef3f10a6a26d204ad7c66f43c2f9acc4bc67
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: docs:site:typecheck emits untracked website/*.js files in this repo; they were removed before docs:site:build. Build then passed.
      Impact: The new guard is wired into package scripts, root CI/release CI, and Docs CI, so future IA/path drift fails automatically.
      Resolution: Task implementation commit is 7a95d2ca with generated task artifact refresh c5166206.
      Promotion: incident-candidate
      Fixability: external
    
    - Observation: Remote Docs CI failed before this fix on docs/developer/project-layout.mdx referencing packages/agentplane/dist/. That path is generated output, not a required tracked source path.
      Impact: The guard remains strict for current source/doc paths but no longer depends on local build artifacts that may exist only in developer worktrees.
      Resolution: Follow-up fix commit is 4ab6c548 with artifact refresh 5685436b.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Add docs IA and path drift guard

Add an automated docs information-architecture guard that checks docs/index.mdx and website/sidebars.ts alignment, catches orphan current docs, and fails on markdown references to repository paths that no longer exist.

## Scope

- In scope: Add an automated docs information-architecture guard that checks docs/index.mdx and website/sidebars.ts alignment, catches orphan current docs, and fails on markdown references to repository paths that no longer exist.
- Out of scope: unrelated refactors not required for "Add docs IA and path drift guard".

## Plan

1. Add a docs IA check script that extracts sidebar doc IDs and docs/index.mdx links and reports mismatches. 2. Add path-reference validation for repository paths mentioned in markdown. 3. Wire the script into package.json and regenerate scripts/README.md. 4. Run bun run docs:ia:check and bun run docs:scripts:check.

## Verify Steps

1. Run `bun run docs:ia:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-30T20:44:48.521Z — VERIFY — ok

By: CODER

Note: Implemented docs:ia:check for docs/index.mdx/sidebar/doc-file alignment, stale legacy reference denylist, and conservative current-doc repo-path validation. Checks passed: bun run docs:ia:check; bun run docs:scripts:check; bun run docs:site:typecheck; bun run docs:site:build; bun run docs:site:check:design; bun run lint:core; node .agentplane/policy/check-routing.mjs; agentplane doctor; git diff --check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T20:35:18.846Z, excerpt_hash=sha256:20e11b2f828727a36a997b9ca3daef3f10a6a26d204ad7c66f43c2f9acc4bc67

### 2026-04-30T20:48:04.001Z — VERIFY — ok

By: CODER

Note: Post-PR fix: docs:ia:check now ignores generated package dist/ references that are not present in fresh CI checkout. Rechecked: bun run docs:ia:check; bun run docs:scripts:check; bun run lint:core.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T20:44:48.528Z, excerpt_hash=sha256:20e11b2f828727a36a997b9ca3daef3f10a6a26d204ad7c66f43c2f9acc4bc67

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: docs:site:typecheck emits untracked website/*.js files in this repo; they were removed before docs:site:build. Build then passed.
  Impact: The new guard is wired into package scripts, root CI/release CI, and Docs CI, so future IA/path drift fails automatically.
  Resolution: Task implementation commit is 7a95d2ca with generated task artifact refresh c5166206.
  Promotion: incident-candidate
  Fixability: external

- Observation: Remote Docs CI failed before this fix on docs/developer/project-layout.mdx referencing packages/agentplane/dist/. That path is generated output, not a required tracked source path.
  Impact: The guard remains strict for current source/doc paths but no longer depends on local build artifacts that may exist only in developer worktrees.
  Resolution: Follow-up fix commit is 4ab6c548 with artifact refresh 5685436b.
  Promotion: incident-candidate
  Fixability: external
