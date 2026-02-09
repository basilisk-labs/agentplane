---
id: "202602091725-3382DF"
title: "Help: verify per-command help output"
result_summary: "Per-command help contract test"
status: "DONE"
priority: "high"
owner: "TESTER"
depends_on: []
tags:
  - "testing"
  - "cli"
  - "help"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-09T17:28:17.038Z"
  updated_by: "TESTER"
  note: "Plan executed: added per-command help contract test; lint and full test suite pass."
verification:
  state: "ok"
  updated_at: "2026-02-09T17:27:36.361Z"
  updated_by: "TESTER"
  note: "Verified: bun run lint and bun run test:full pass. Contract test confirms compact help renders for every command."
commit:
  hash: "239b7ff3076ae0624063cac2d7374cb63036a4d3"
  message: "✅ 3382DF testing: add per-command help contract"
comments:
  -
    author: "TESTER"
    body: "Start: Add per-command help contract tests and fix any spec/help regressions found."
  -
    author: "TESTER"
    body: "Verified: bun run lint and bun run test:full pass. Added a contract test ensuring every registered command renders compact help successfully and required string options appear in usage."
events:
  -
    type: "status"
    at: "2026-02-09T17:26:16.424Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add per-command help contract tests and fix any spec/help regressions found."
  -
    type: "verify"
    at: "2026-02-09T17:27:36.361Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass. Contract test confirms compact help renders for every command."
  -
    type: "status"
    at: "2026-02-09T17:27:42.023Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass. Added a contract test ensuring every registered command renders compact help successfully and required string options appear in usage."
doc_version: 2
doc_updated_at: "2026-02-09T17:27:42.023Z"
doc_updated_by: "TESTER"
description: "Add a contract test that runs 'agentplane help <command...> --compact' for every registered command spec and asserts output basics (Usage line, no placeholders). Fix any spec/help issues found."
id_source: "generated"
---
## Summary

Add a per-command help contract test to prevent silent help regressions across the command catalog.

## Scope

In scope: CLI help rendering and registry wiring tests under packages/agentplane/src/cli/. Out of scope: redesigning help UX or rewriting command specs.

## Plan

1) Add a contract test iterating over COMMANDS (command catalog).
2) For each spec, run runCli(['help', ...id, '--compact']) and assert exit code 0, stdout contains a Usage line, and output does not contain obvious placeholders.
3) Add static checks against spec (required string opts appear in usage).
4) Fix any failing specs/tests.
5) Verify with bun run lint and bun run test:full.

## Risks

Risk: Tight assertions may become noisy if help format legitimately changes. Mitigation: keep the contract minimal (no snapshots).

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T17:27:36.361Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass. Contract test confirms compact help renders for every command.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T17:26:16.424Z, excerpt_hash=sha256:6e042b3dc8f55d70111d2d8bf286aaa56a0b2becd5935e2f20e2188280afbcdd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the added contract test and any spec/help adjustments in this task.

## Context

Help output is spec-generated and can regress when commands/options change. We want an automated, non-snapshot guard that ensures every command's help renders successfully and includes essential fields.

## Verify Steps

- bun run lint
- bun run test:full
