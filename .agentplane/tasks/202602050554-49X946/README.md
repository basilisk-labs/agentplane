---
id: "202602050554-49X946"
title: "AP-010c: Integrate update-check with CLI"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "roadmap"
  - "cli"
  - "update-check"
  - "integration"
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
  hash: "b8d498ad200bd00637fb3da03e2a6e7ea075e076"
  message: "🧩 49X946 integrate cached update-check"
comments:
  -
    author: "CODER"
    body: "Start: integrate cached update-check into CLI and adjust tests."
  -
    author: "CODER"
    body: "Verified: cached update-check integrated; tests updated; pre-commit hooks passed."
doc_version: 2
doc_updated_at: "2026-02-05T06:06:24.848Z"
doc_updated_by: "CODER"
description: "Wire cached update-check into CLI with offline-first behavior and tests."
id_source: "generated"
---
## Summary

Wire cached update-check into CLI with offline-first behavior and tests.

## Scope

Integrate update-check cache into CLI startup; respect --json and AGENTPLANE_NO_UPDATE_CHECK; add integration tests.

## Risks

Risk: update-check runs network too often or skips warnings; mitigate with integration tests covering TTL and skip flags.

## Verify Steps

Run update-check integration tests; ensure no network for fresh cache and proper skip behavior.

## Rollback Plan

Revert the CLI integration commit to restore previous update-check behavior.

## Plan


## Verification
