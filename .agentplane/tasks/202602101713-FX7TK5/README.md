---
id: "202602101713-FX7TK5"
title: "Archive validation: parse tar.gz in JS (avoid system tar exit-code variance)"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "code"
  - "bugfix"
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: switch tar validation to JS parser to remove GNU tar exit-code variance"
events:
  -
    type: "status"
    at: "2026-02-10T17:13:53.885Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: switch tar validation to JS parser to remove GNU tar exit-code variance"
doc_version: 2
doc_updated_at: "2026-02-10T17:15:06.596Z"
doc_updated_by: "CODER"
description: "Replace tar-based archive validation that shells out to system tar with a small JS tar.gz parser (gunzip + tar header scan) to make unsafe-entry validation deterministic in CI."
id_source: "generated"
---
## Summary


## Scope

- In scope: packages/agentplane/src/cli/archive.ts tar validation logic; tests that assert exit codes for unsafe tar archives.\n- Out of scope: tar extraction (still uses system tar for now).

## Plan


## Risks

- Risk: tar parser bugs (false negatives/positives). Mitigation: strict ustar parsing, stop on zero blocks, unit coverage via existing unsafe-archive tests.\n- Risk: large archives (memory). Mitigation: current use-case is small recipe bundles; can stream later if needed.

## Verification

- bun run format:check: OK\n- bun run lint: OK\n- bun x vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts: OK

## Rollback Plan

Revert the change commit to restore system tar-based validation.

## Verify Steps

- bun run format:check\n- bun run lint\n- bun x vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts --hookTimeout 60000 --testTimeout 60000
