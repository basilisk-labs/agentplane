---
id: "202602101706-92WVEK"
title: "Archive validation: treat tar warning exit codes as validation, not IO"
result_summary: "Fix tar validation exit codes across platforms"
status: "DONE"
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
commit:
  hash: "9a6a39839d9d621e0bb4a89b0f33eec613b58a50"
  message: "✅ 92WVEK cli: make tar archive validation robust"
comments:
  -
    author: "CODER"
    body: "Start: fix tar listing so unsafe archive errors return E_VALIDATION across platforms"
  -
    author: "CODER"
    body: "Verified: bun run format:check, bun run lint, bun x vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts."
events:
  -
    type: "status"
    at: "2026-02-10T17:07:15.553Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix tar listing so unsafe archive errors return E_VALIDATION across platforms"
  -
    type: "status"
    at: "2026-02-10T17:09:11.308Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run format:check, bun run lint, bun x vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts."
doc_version: 2
doc_updated_at: "2026-02-10T17:09:11.308Z"
doc_updated_by: "CODER"
description: "Fix validateArchive for tar.gz so GNU tar warning exit codes do not surface as E_IO; parse stdout even if tar exits non-zero to keep unsafe-entry errors E_VALIDATION (exit code 3)."
id_source: "generated"
---
## Summary

Make tar-based archive validation robust to GNU tar warning exit codes by parsing stdout even when tar exits non-zero, so unsafe archives fail as E_VALIDATION (exit code 3) rather than E_IO (exit code 4).

## Scope

- In scope: packages/agentplane/src/cli/archive.ts and related tests.\n- Out of scope: changing archive extraction (tar -xzf / unzip) behavior.

## Plan

1. Replace tar list helpers to capture stdout/stderr even when tar exits non-zero.\n2. If stdout contains entries, proceed with validation; if stdout empty, surface E_IO with stderr.\n3. Run the affected CLI recipe archive tests locally (run-cli.recipes.test.ts) and ensure exit codes match expectations.

## Risks

- Risk: swallowing real tar failures. Mitigation: only ignore non-zero when stdout is present; otherwise fail with E_IO and include stderr.\n- Risk: behavior differences between tar implementations. Mitigation: rely on tar stdout as the source of member names for validation.

## Verification

- bun run format:check: OK\n- bun run lint: OK\n- bun x vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts: OK

## Rollback Plan

Revert the change commit; tar listing errors will again surface as E_IO in some environments.

## Verify Steps

- bun run format:check\n- bun run lint\n- bun run test:cli:recipes (or bun x vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts)
