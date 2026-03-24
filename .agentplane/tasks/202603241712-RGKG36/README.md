---
id: "202603241712-RGKG36"
title: "Refresh generated CLI reference after runner push blockers"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: regenerate the generated CLI reference, verify docs:cli:check passes, and commit only the refreshed reference plus this task artifact."
events:
  -
    type: "status"
    at: "2026-03-24T17:13:22.888Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: regenerate the generated CLI reference, verify docs:cli:check passes, and commit only the refreshed reference plus this task artifact."
doc_version: 3
doc_updated_at: "2026-03-24T17:13:22.890Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
