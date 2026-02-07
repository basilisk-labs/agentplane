---
id: "202602071915-50D60W"
title: "CLI2: help JSON contract + docs"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071915-Y81PM2"
tags:
  - "cli"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T19:18:01.935Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T19:46:20.563Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: documented cli2 help behavior, global flag scoping for --json, and the help JSON schema contract with examples."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: define JSON help contract and update CLI contract docs for cli2 help + global flag scoping."
doc_version: 2
doc_updated_at: "2026-02-07T19:46:20.564Z"
doc_updated_by: "ORCHESTRATOR"
description: "Define JSON help contract and document CLI2 contract decisions (globals vs per-command flags, help formats)."
---
## Summary

Define the `agentplane help` contract and the JSON help schema optimized for agent consumption (minimal tokens, deterministic ordering).

## Scope

- Update `docs/developer/cli-contract.mdx` to include help behavior and global flag scoping rules.
- Add a new JSON help contract doc (e.g. `docs/developer/cli-help-json.mdx`).

## Plan

1. Freeze decisions:
- global flag scoping (only before the command id)
- `agentplane help [<cmd...>] [--compact] [--json]`
2. Specify the JSON help schema (minimal but extensible), with examples for:
- a simple command (`task new`)
- a multi-synopsis command (`recipes install`)
- a positional-arg command (`work start`)

## Risks

- `--json` naming conflict: global JSON errors vs help JSON output needs explicit scoping/precedence rules.

## Verify Steps

### Scope
Documentation must match cli2 help-render behavior.

### Checks
- Docs changes do not break build/tests.

### Evidence / Commands
- `bun run test:agentplane`

### Pass criteria
- The JSON help contract doc includes a formal schema + 2-3 worked examples.
- `docs/developer/cli-contract.mdx` explicitly documents `agentplane help ...` and global flag scoping.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T19:46:20.563Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: documented cli2 help behavior, global flag scoping for --json, and the help JSON schema contract with examples.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-07T19:21:18.960Z, excerpt_hash=sha256:bdd101f32a59623a3169108e986cd13b91bbebd4f1daa80f2b38243ca70cf008

Details:

Files: docs/developer/cli-contract.mdx; docs/developer/cli-help-json.mdx

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert changes under `docs/developer/*`.
