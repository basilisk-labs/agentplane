---
id: "202603121018-P8VY4W"
title: "Remove stale lifecycle eslint directives"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T10:19:23.269Z"
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
    author: "CODER"
    body: "Start: remove the stale unused eslint-disable directives from the split lifecycle suites and confirm the files are lint-clean without changing test behavior."
events:
  -
    type: "status"
    at: "2026-03-12T10:19:37.037Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove the stale unused eslint-disable directives from the split lifecycle suites and confirm the files are lint-clean without changing test behavior."
doc_version: 3
doc_updated_at: "2026-03-12T10:19:37.037Z"
doc_updated_by: "CODER"
description: "Remove unused eslint-disable directives left behind after splitting lifecycle CLI test suites."
id_source: "generated"
---
## Summary

Remove unused eslint-disable directives from the split lifecycle test suites so the files are lint-clean without warnings.

## Scope

Touch only the split lifecycle test files and task-local README artifacts needed to remove stale lint suppression comments.

## Plan

Remove stale lifecycle eslint suppression comments without changing test behavior or runtime code.

## Verify Steps

1. Run `./node_modules/.bin/eslint packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts`.
2. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts --hookTimeout 60000 --testTimeout 60000`.
3. Confirm no runtime files outside those test suites change.

## Verification

Pending.

## Rollback Plan

Restore the removed directives if lint warnings reappear because the files regain intentionally unused imports or type-only suppression needs.

## Findings

None yet.
