---
id: "202602110741-99ZHP0"
title: "Docs: quickstart global flags use --json-errors"
result_summary: "Confirmed quickstart source already matches json-errors semantics"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
  - "cli"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-11T07:41:56.559Z"
  updated_by: "REVIEWER"
  note: "Verified source quickstart already documents --json-errors; no code/docs edit required."
commit:
  hash: "c97dd163243ac9022301754494c75ede5aa23c0c"
  message: "✅ 6RWFKK docs: align CLI contract with json-errors flag"
comments:
  -
    author: "DOCS"
    body: "Start: verify quickstart global flag wording in source and CLI output."
  -
    author: "DOCS"
    body: "Verified: source quickstart flag text was inspected and already uses --json-errors for error output; no repository file changes were required."
events:
  -
    type: "status"
    at: "2026-02-11T07:41:56.290Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: verify quickstart global flag wording in source and CLI output."
  -
    type: "verify"
    at: "2026-02-11T07:41:56.559Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified source quickstart already documents --json-errors; no code/docs edit required."
  -
    type: "status"
    at: "2026-02-11T07:42:04.265Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: source quickstart flag text was inspected and already uses --json-errors for error output; no repository file changes were required."
doc_version: 2
doc_updated_at: "2026-02-11T07:42:04.265Z"
doc_updated_by: "DOCS"
description: "Align built-in quickstart global flags text with current CLI behavior: --json-errors for errors, --json for help output."
id_source: "generated"
---
## Summary

Validated built-in quickstart global flag text against source; it already uses --json-errors for error output.

## Scope

In scope: verification of packages/agentplane/src/cli/command-guide.ts quickstart global flag wording. Out of scope: behavior changes.

## Plan

1) Inspect command-guide quickstart global flags. 2) Confirm wording for --json-errors/--json. 3) Close task if no change needed.

## Risks

Risk: none; validation-only task.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T07:41:56.559Z — VERIFY — ok

By: REVIEWER

Note: Verified source quickstart already documents --json-errors; no code/docs edit required.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T07:41:56.290Z, excerpt_hash=sha256:53520a05915e42e397a0bade97cc418cc755806d9721cc913755ecbcfe6770e7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

No code changes; nothing to rollback.

## Verify Steps

- rg -n "--json-errors|--json" packages/agentplane/src/cli/command-guide.ts
- agentplane quickstart
