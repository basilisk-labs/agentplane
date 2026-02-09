---
id: "202602091522-089FS2"
title: "CLI errors: enforce exitCodeForError mapping"
result_summary: "Exit codes derived from ErrorCode mapping"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "bug"
  - "quality"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "a1b446df808f4117c4a2a0b867eb7e537d6b0d4d"
  message: "✅ 089FS2 cli: align exit codes with ErrorCode mapping"
comments:
  -
    author: "CODER"
    body: "Start: implement a CliError factory that derives exitCode via exitCodeForError and migrate throw sites away from hardcoded exit codes."
  -
    author: "CODER"
    body: "Verified: Replaced hardcoded/mismatched CliError exit codes (especially E_IO/E_GIT) with exitCodeForError-derived values across CLI/commands, added cliError helper, and updated tests to reflect the consistent mapping. Ran bun run lint and bun run test:full."
events:
  -
    type: "status"
    at: "2026-02-09T15:26:37.763Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement a CliError factory that derives exitCode via exitCodeForError and migrate throw sites away from hardcoded exit codes."
  -
    type: "status"
    at: "2026-02-09T15:43:24.126Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Replaced hardcoded/mismatched CliError exit codes (especially E_IO/E_GIT) with exitCodeForError-derived values across CLI/commands, added cliError helper, and updated tests to reflect the consistent mapping. Ran bun run lint and bun run test:full."
doc_version: 2
doc_updated_at: "2026-02-09T15:43:24.126Z"
doc_updated_by: "CODER"
description: "Eliminate hardcoded exitCode mismatches vs ErrorCode by introducing a CLI error factory and migrating throw sites to compute exitCode strictly via exitCodeForError."
id_source: "generated"
---
## Summary

Introduce a single helper for constructing CliError values by ErrorCode and ensure all throws use exitCodeForError-derived exit codes.

## Scope

packages/agentplane/src/cli/exit-codes.ts, packages/agentplane/src/shared/errors.ts, and throw sites that currently hardcode exitCode inconsistent with code.

## Plan

1. Add helper (e.g. cliError(code, message, opts?)) that computes exitCode via exitCodeForError.\n2. Replace mismatched hardcoded exitCode sites (init/conflicts.ts, recipes/apply.ts, upgrade.ts, etc.).\n3. Add/adjust unit tests around exit code mapping where needed.\n4. bun run lint + bun run test:full.

## Risks

Risk: Some commands may have relied on non-standard exit codes. Mitigation: keep mapping as the single source of truth and update tests accordingly.

## Verify Steps

- bun run lint\n- bun run test:full

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit; mapping remains unchanged.
