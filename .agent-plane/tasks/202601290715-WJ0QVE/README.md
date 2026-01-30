---
id: "202601290715-WJ0QVE"
title: "AP-041: backend sync redmine"
status: "DOING"
priority: "high"
owner: "REDMINE"
depends_on: ["202601290715-46R6VZ", "202601290715-AG5VAH"]
tags: ["roadmap", "nodejs", "backend", "sync"]
verify: ["bun run ci"]
comments:
  - { author: "REDMINE", body: "Start: implement backend sync redmine (push/pull/conflict modes) with contract tests and CLI wiring." }
doc_version: 2
doc_updated_at: "2026-01-30T07:40:19+00:00"
doc_updated_by: "agentctl"
description: "Implement backend sync redmine with push/pull directions, conflict strategies, and --yes flag; add mock-based contract tests."
---
## Summary

Ensure backend sync redmine command routes direction/conflict/confirm flags into backend sync with contract coverage.

## Scope

- Add a CLI test that backend sync forwards direction/conflict/confirm flags.
- Keep existing Redmine sync implementation intact.

## Risks

- Minimal behavior change; risk limited to test coverage and CLI flag parsing assumptions.

## Verify Steps

bun run ci

## Rollback Plan

Revert the backend sync CLI test addition and keep existing sync behavior unchanged.

