---
id: "202601041346-YM3R8"
title: "Agentctl performance and UX improvements"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags:
  - "agentctl"
  - "ux"
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
  hash: "6b7b0c6182cf7dd1f0833e4044300db6b32fe3cd"
  message: "Legacy completion (backfill)"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: batch writes, caching, JSON errors, lazy lint, and logging flags implemented."
  -
    author: "INTEGRATOR"
    body: "Verified: documentation updated for lint/flags and agent guidance."
  -
    author: "INTEGRATOR"
    body: "Verified: agentctl.md now documents flags, JSON errors, normalize, lint behavior, and batch writes."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:33.048Z"
doc_updated_by: "agentplane"
description: "Add backend batch writes, fast in-memory indexes, structured error output with --json, lazy linting, and unified logging flags."
dirty: false
---
# 202601041346-YM3R8: Agentctl performance and UX improvements

## Summary

- Add backend batch writes and use them for normalize/finish.
- Cache task index/dependency state during a run.
- Add structured JSON error output for CI and integrations.
- Make linting lazy and opt-in for read-only commands.
- Add global logging flags for consistent verbosity.

## Goal

- Improve agentctl performance and automation ergonomics without changing core behavior.

## Scope

- `.agent-plane/agentctl.py`: batch writes, caching, JSON error mode, lazy lint, global logging flags.
- `.agent-plane/backends/local/backend.py`: `write_tasks()` implementation.
- `.agent-plane/agentctl.md`: document new flags and behaviors.

## Risks

- Logging and linting behavior changes may surprise existing automation.

## Verify Steps

- `python3 .agent-plane/agentctl.py task normalize`
- `python3 .agent-plane/agentctl.py task export --out .agent-plane/tasks.json`

## Rollback Plan

- Restore `.agent-plane/agentctl.py` and backend files from git history.

## Plan


## Verification

## Changes Summary (auto)

<!-- BEGIN AUTO SUMMARY -->
- `.agent-plane/agentctl.py`: batch writes, caching, JSON errors, lazy lint, logging flags.
- `.agent-plane/backends/local/backend.py`: add write_tasks support.
- `.agent-plane/agentctl.md`: document new flags.
<!-- END AUTO SUMMARY -->

## Changes Summary (auto)

<!-- BEGIN AUTO SUMMARY -->
- `.agent-plane/agentctl.py`: batch writes, caching, JSON errors, lazy lint, logging flags.
- `.agent-plane/backends/local/backend.py`: add write_tasks support.
- `.agent-plane/agentctl.md`: document new flags.
<!-- END AUTO SUMMARY -->
