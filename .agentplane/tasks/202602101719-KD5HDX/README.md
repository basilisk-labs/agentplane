---
id: "202602101719-KD5HDX"
title: "Tests: generate unsafe tar.gz archives without system tar"
result_summary: "Make unsafe tar fixture deterministic"
status: "DONE"
priority: "high"
owner: "TESTER"
depends_on: []
tags:
  - "testing"
  - "cli"
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
  hash: "9d6025a8e0c1b500edce04a50dc85ee9798bcbdb"
  message: "✅ KD5HDX test: generate unsafe tar.gz fixture in JS"
comments:
  -
    author: "TESTER"
    body: "Start: make unsafe tar archive fixtures deterministic across tar implementations"
  -
    author: "TESTER"
    body: "Verified: bun run format:check, bun run lint, bun x vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts."
events:
  -
    type: "status"
    at: "2026-02-10T17:20:18.013Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: make unsafe tar archive fixtures deterministic across tar implementations"
  -
    type: "status"
    at: "2026-02-10T17:23:06.412Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run format:check, bun run lint, bun x vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts."
doc_version: 2
doc_updated_at: "2026-02-10T17:23:06.412Z"
doc_updated_by: "TESTER"
description: "Make createUnsafeRecipeArchive (tar) generate a deterministic tar.gz with a path-traversal member name in JS, avoiding GNU tar sanitization/exit-code variance that causes CI-only failures."
id_source: "generated"
---
## Summary


## Scope

- In scope: packages/agentplane/src/cli/run-cli.test-helpers.ts (createUnsafeRecipeArchive), recipes CLI tests relying on it.\n- Out of scope: production archive extraction/validation logic.

## Plan

1. Add a minimal tar writer (header + payload + padding + end blocks) and gzip it.\n2. For createUnsafeRecipeArchive(format=tar), write the tar.gz directly with a traversal entry name (default ../evil.txt).\n3. Keep zip path as-is.\n4. Run run-cli.recipes.test.ts and full test suite sanity.

## Risks

- Risk: invalid tar format breaks tests. Mitigation: implement ustar header + checksum correctly; keep fixture minimal.\n- Risk: lint/format noise. Mitigation: localized helpers within test-helpers.

## Verification

- bun run format:check: OK\n- bun run lint: OK\n- bun x vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts: OK

## Rollback Plan

Revert the change commit; tests will again rely on system tar and may fail in Linux CI.
