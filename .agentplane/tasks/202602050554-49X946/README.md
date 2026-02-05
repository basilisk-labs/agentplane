---
id: "202602050554-49X946"
title: "AP-010c: Integrate update-check with CLI"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "cli", "update-check", "integration"]
verify: []
commit: null
comments:
  - { author: "CODER", body: "Start: integrate cached update-check into CLI and adjust tests." }
doc_version: 2
doc_updated_at: "2026-02-05T06:04:59.736Z"
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
