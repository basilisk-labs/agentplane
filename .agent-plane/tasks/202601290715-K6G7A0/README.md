---
id: "202601290715-K6G7A0"
title: "AP-044: v1 release hardening"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: ["202601290715-0XACWT"]
tags: ["roadmap", "release"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: scoping AP-044 release hardening; will outline plan and risks." }
doc_version: 2
doc_updated_at: "2026-01-30T08:44:26+00:00"
doc_updated_by: "agentctl"
description: "Stabilize logs/help/--json, improve UX, and add E2E smoke in CI for init/task/recipes/mode/workflow."
---
## Summary

Release hardening: standardize CLI error output (text + JSON) and add CI smoke coverage for init/task/recipes/mode/work-start flow.

## Context

AP-044 is the final release-hardening step in the v1 roadmap after docs (AP-043). It requires stable CLI output, usable error UX/--json mode, and CI smoke coverage for critical flows.

## Scope

- Add structured error output with hints and JSON exit_code.
- Ensure unknown commands flow through structured errors (so --json works consistently).
- Add CLI smoke test for init → task → start/finish → recipe install/list → mode switch → work start.
- Update tests for JSON error shape.

## Risks

- Error output format changes could affect tooling that scrapes stderr/stdout.
- Smoke test depends on git and tar availability; may add CI flakiness if environment differs.

## Verify Steps

bun run ci:agentplane

## Rollback Plan

Revert the AP-044 commit(s) to restore previous error formatting and remove the smoke test.

