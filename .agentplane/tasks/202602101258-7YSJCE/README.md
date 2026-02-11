---
id: "202602101258-7YSJCE"
title: "T15: Docs + regression tests for new behavior"
result_summary: "Documented upgrade review.json + role JSON fallback; added last-review.json regression assertion"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "TESTER"
depends_on:
  - "202602101258-FQ8HDW"
  - "202602101258-0FC323"
  - "202602101258-PND66F"
  - "202602101258-KN6RMG"
  - "202602101258-87TTSB"
  - "202602101258-KPCVMK"
  - "202602101258-H5P2AR"
  - "202602101258-9HHSVV"
  - "202602101258-3GF4FT"
  - "202602101258-D78DYX"
  - "202602101258-TQQPV5"
tags:
  - "testing"
  - "docs"
  - "cli"
  - "upgrade"
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
  hash: "4e803e244f4bf884f8f7e65a9b90e8a573a7f8b9"
  message: "✅ 7YSJCE docs: document upgrade review.json and role JSON fallback"
comments:
  -
    author: "TESTER"
    body: "Start: update README docs for role output and upgrade review.json; add regression coverage for last-review.json"
  -
    author: "TESTER"
    body: "Verified: bun run lint; bun run test:agentplane (core.unit, upgrade.merge); bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build"
events:
  -
    type: "status"
    at: "2026-02-10T15:14:37.446Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: update README docs for role output and upgrade review.json; add regression coverage for last-review.json"
  -
    type: "status"
    at: "2026-02-10T15:20:56.312Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint; bun run test:agentplane (core.unit, upgrade.merge); bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build"
doc_version: 2
doc_updated_at: "2026-02-10T15:20:56.312Z"
doc_updated_by: "TESTER"
description: "Update docs and add regression tests for role output and upgrade review.json; run help snapshot tests as needed."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verify Steps

### Scope
- Docs: `README.md`, `packages/agentplane/README.md`
- Tests: `packages/agentplane/src/commands/upgrade.merge.test.ts`

### Checks
- `bun run lint`
- `bun run test:agentplane packages/agentplane/src/commands/upgrade.merge.test.ts`
- `bun run test:agentplane packages/agentplane/src/cli/run-cli/commands/core.unit.test.ts`
- `bun run --filter=@agentplaneorg/core build`
- `bun run --filter=agentplane build`

### Pass criteria
- All commands exit 0.
- README changes document `review.json` and `agentplane role` JSON fallback.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan
