---
id: "202602050621-M6NF1X"
title: "AP-030a: Extract shared CLI utilities"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "roadmap"
  - "refactor"
  - "cli"
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
  hash: "f7230770ed602e75c7645e4d91265df6679ee895"
  message: "🧩 M6NF1X extract cli utilities"
comments:
  -
    author: "CODER"
    body: "Start: extract shared CLI utilities and thin run-cli.ts."
  -
    author: "CODER"
    body: "Verified: shared CLI utilities extracted; pre-commit hooks passed."
doc_version: 2
doc_updated_at: "2026-02-05T06:26:41.550Z"
doc_updated_by: "CODER"
description: "Move shared helpers (http, archive, update-check, exit codes, output) into cli/ modules; thin run-cli router."
id_source: "generated"
---
## Summary

Extract shared CLI utilities into cli/ modules and simplify run-cli.ts.

## Scope

Move shared helpers from run-cli.ts into cli/ modules; keep behavior unchanged; update imports and tests as needed.

## Risks

Risk: refactor breaks CLI wiring; mitigate with existing run-cli tests and pre-commit hooks.

## Verify Steps

Run pre-commit hooks and run-cli test suites; confirm no behavior regressions.

## Rollback Plan

Revert the refactor commit(s) to restore the monolithic run-cli.ts implementation.

## Plan


## Verification
