---
id: "202601111656-4HQ6XY"
title: "Add strict Python linting/formatting and cleanup"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["python", "lint", "quality", "tooling"]
commit: { hash: "bf1955ebe79ce7ce7324980587969a0d72385247", message: "✨ 4HQ6XY Add strict ruff/mypy configs and dev deps; update Python modules for lint/type checks; clean new lint caches." }
comments:
  - { author: "CODER", body: "Start: Add strict Python lint/format/type-check configs, update code to pass them, and clean new artifacts." }
  - { author: "CODER", body: "Add strict ruff/mypy configs and dev deps; update Python modules for lint/type checks; clean new lint caches." }
  - { author: "CODER", body: "Verified: ran .venv/bin/ruff format ., .venv/bin/ruff check ., and .venv/bin/mypy; all passed. Added strict ruff/mypy configs, cleaned lint cache artifacts, and updated Python code for compliance." }
doc_version: 2
doc_updated_at: "2026-01-11T17:22:04+00:00"
doc_updated_by: "agentctl"
description: "Introduce strict Python lint/format/type-check tooling, update cleanup scripts for new artifacts, and ensure the repo passes the checks."
---
## Summary

Add strict Python lint/format/type-check tooling, clean up their artifacts, and ensure repository Python code passes the new checks.

## Context

User requested максимально жесткие линтеры/фиксеров for Python and cleanup of their artifacts; tooling should keep code correct and verified after linting.

## Scope

Add lint/format/type-check configs (ruff + type checker), update Python code to comply, add ignore/clean rules for caches, and document/run verify commands.

## Risks

Strict rules may require code refactors or per-file ignores; type-checker strictness can surface missing annotations or third-party stubs.

## Verify Steps

- .venv/bin/ruff format .
- .venv/bin/ruff check .
- .venv/bin/mypy

## Rollback Plan

Revert lint config files, clean script changes, and any code edits; remove lint dependencies; rerun previous checks.

## Notes

Aim for strict linting while scoping unavoidable exceptions (e.g., CLI subprocess usage).

