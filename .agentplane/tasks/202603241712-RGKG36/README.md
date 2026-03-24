---
id: "202603241712-RGKG36"
title: "Refresh generated CLI reference after runner push blockers"
result_summary: "The generated CLI reference is refreshed and docs:cli:check now passes against the current runner command surface."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "cli"
  - "generated"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T17:13:00.897Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T17:14:17.948Z"
  updated_by: "DOCS"
  note: "Checks passed: bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx; bun run docs:cli:check. Confirmed the generated reference now includes task run show --json and pre-push freshness should no longer block on CLI docs drift."
commit:
  hash: "570f8e30b6d13fa42c326e39393f486e129d67d6"
  message: "✅ RGKG36 docs: refresh generated CLI reference"
comments:
  -
    author: "DOCS"
    body: "Start: regenerate the generated CLI reference, verify docs:cli:check passes, and commit only the refreshed reference plus this task artifact."
  -
    author: "DOCS"
    body: "Verified: regenerated CLI reference now matches the current command contract, including the task run show --json surface that pre-push was checking."
events:
  -
    type: "status"
    at: "2026-03-24T17:13:22.888Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: regenerate the generated CLI reference, verify docs:cli:check passes, and commit only the refreshed reference plus this task artifact."
  -
    type: "verify"
    at: "2026-03-24T17:14:17.948Z"
    author: "DOCS"
    state: "ok"
    note: "Checks passed: bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx; bun run docs:cli:check. Confirmed the generated reference now includes task run show --json and pre-push freshness should no longer block on CLI docs drift."
  -
    type: "status"
    at: "2026-03-24T17:14:24.878Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: regenerated CLI reference now matches the current command contract, including the task run show --json surface that pre-push was checking."
doc_version: 3
doc_updated_at: "2026-03-24T17:14:24.881Z"
doc_updated_by: "DOCS"
description: "Regenerate docs/user/cli-reference.generated.mdx so docs:cli:check and pre-push pass after the latest runner and smoke-task changes."
sections:
  Summary: |-
    Refresh generated CLI reference after runner push blockers
    
    Regenerate docs/user/cli-reference.generated.mdx so docs:cli:check and pre-push pass after the latest runner and smoke-task changes.
  Scope: |-
    - In scope: Regenerate docs/user/cli-reference.generated.mdx so docs:cli:check and pre-push pass after the latest runner and smoke-task changes.
    - Out of scope: unrelated refactors not required for "Refresh generated CLI reference after runner push blockers".
  Plan: |-
    1. Regenerate docs/user/cli-reference.generated.mdx from the current CLI surface using the canonical docs generator.
    2. Re-run docs:cli:check to confirm the generated reference matches the installed command contract.
    3. Commit only the refreshed generated reference and task artifact, then retry push.
  Verify Steps: |-
    1. Run `bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx`. Expected: the generated CLI reference refreshes without errors.
    2. Run `bun run docs:cli:check`. Expected: the CLI reference freshness check passes.
    3. Inspect `git diff -- docs/user/cli-reference.generated.mdx`. Expected: only the generated CLI reference changes for this task.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T17:14:17.948Z — VERIFY — ok
    
    By: DOCS
    
    Note: Checks passed: bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx; bun run docs:cli:check. Confirmed the generated reference now includes task run show --json and pre-push freshness should no longer block on CLI docs drift.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T17:13:22.890Z, excerpt_hash=sha256:15b334b5a4776e539317efb77287db68b3215a8d104e2b1e8a7b849c69ac1358
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Refresh generated CLI reference after runner push blockers

Regenerate docs/user/cli-reference.generated.mdx so docs:cli:check and pre-push pass after the latest runner and smoke-task changes.

## Scope

- In scope: Regenerate docs/user/cli-reference.generated.mdx so docs:cli:check and pre-push pass after the latest runner and smoke-task changes.
- Out of scope: unrelated refactors not required for "Refresh generated CLI reference after runner push blockers".

## Plan

1. Regenerate docs/user/cli-reference.generated.mdx from the current CLI surface using the canonical docs generator.
2. Re-run docs:cli:check to confirm the generated reference matches the installed command contract.
3. Commit only the refreshed generated reference and task artifact, then retry push.

## Verify Steps

1. Run `bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx`. Expected: the generated CLI reference refreshes without errors.
2. Run `bun run docs:cli:check`. Expected: the CLI reference freshness check passes.
3. Inspect `git diff -- docs/user/cli-reference.generated.mdx`. Expected: only the generated CLI reference changes for this task.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T17:14:17.948Z — VERIFY — ok

By: DOCS

Note: Checks passed: bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx; bun run docs:cli:check. Confirmed the generated reference now includes task run show --json and pre-push freshness should no longer block on CLI docs drift.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T17:13:22.890Z, excerpt_hash=sha256:15b334b5a4776e539317efb77287db68b3215a8d104e2b1e8a7b849c69ac1358

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
