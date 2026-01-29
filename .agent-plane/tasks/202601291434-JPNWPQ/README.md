---
id: "202601291434-JPNWPQ"
title: "Fix pr check invalid meta.json test expectation"
status: "DOING"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["testing", "lint"]
comments:
  - { author: "CODER", body: "Start: adjust failing pr check test assertion for JSON parse errors." }
doc_version: 2
doc_updated_at: "2026-01-29T14:34:57+00:00"
doc_updated_by: "agentctl"
description: "Align test with current JSON parse error message format."
---
## Summary

Update the failing pr check test to accept the current JSON parse error message.

## Scope

- Relax the test assertion to match the stable JSON parse error prefix

## Risks

- Overly broad match could hide real regressions

## Verify Steps

- bun test packages/agentplane/src/run-cli.test.ts

## Rollback Plan

- Revert the commit if the assertion becomes too loose

