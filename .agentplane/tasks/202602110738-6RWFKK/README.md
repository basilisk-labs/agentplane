---
id: "202602110738-6RWFKK"
title: "Docs: align CLI contract with --json-errors"
result_summary: "Updated CLI contract docs for json-errors semantics"
status: "DONE"
priority: "high"
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
  updated_at: "2026-02-11T07:40:47.962Z"
  updated_by: "REVIEWER"
  note: "Verified docs now describe --json-errors for error output and preserve --json for help output; lint and test:fast passed."
commit:
  hash: "8305470eef4ac836df67072dda5c82b7039f225b"
  message: "✅ 6RWFKK docs: align CLI contract with json-errors flag"
comments:
  -
    author: "DOCS"
    body: "Start: update CLI contract docs to match current --json-errors behavior."
  -
    author: "DOCS"
    body: "Verified: CLI contract documentation now matches current json-errors behavior."
events:
  -
    type: "status"
    at: "2026-02-11T07:39:03.566Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: update CLI contract docs to match current --json-errors behavior."
  -
    type: "verify"
    at: "2026-02-11T07:40:47.962Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified docs now describe --json-errors for error output and preserve --json for help output; lint and test:fast passed."
  -
    type: "status"
    at: "2026-02-11T07:40:48.249Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: CLI contract documentation now matches current json-errors behavior."
doc_version: 2
doc_updated_at: "2026-02-11T07:40:48.249Z"
doc_updated_by: "DOCS"
description: "Update documentation to reflect current behavior: --json-errors controls JSON error output, while --json remains help-output only; remove contradictory wording."
id_source: "generated"
---
## Summary

Bring docs in line with CLI behavior by documenting --json-errors as the error-output flag and --json as help-output only.

## Scope

In scope: docs/developer/cli-contract.mdx and any other current docs that state --json controls error output. Out of scope: CLI runtime behavior changes.

## Plan

1) Find all contradictory docs references for global JSON error flag. 2) Rewrite contract text/examples to use --json-errors. 3) Keep help JSON docs unchanged where --json is correct for help output.

## Risks

Risk: missing one stale reference. Mitigation: grep scan across docs and README after edits.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T07:40:47.962Z — VERIFY — ok

By: REVIEWER

Note: Verified docs now describe --json-errors for error output and preserve --json for help output; lint and test:fast passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T07:39:03.566Z, excerpt_hash=sha256:67c0610b60b8fa286669ab24c61f17a59feb4ce971da7bd85488d75ee2af2042

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the docs commit for this task.

## Verify Steps

- rg -n "--json-errors|--json" docs README.md packages/agentplane/README.md
- bun run lint
- bun run test:fast
