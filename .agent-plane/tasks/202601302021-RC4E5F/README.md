---
id: "202601302021-RC4E5F"
title: "Remove legacy Python-era root artifacts"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: ["none"]
tags: ["cleanup", "nodejs", "docs", "repo"]
doc_version: 2
doc_updated_at: "2026-01-30T16:20:08+00:00"
doc_updated_by: "agentctl"
description: "Remove root-level scripts/assets from Python agentctl era (clean scripts, viewer, etc.) that are no longer needed for Node CLI, and update docs/references accordingly."
---
## Summary

Removed legacy Python-era root scripts (clean.sh/clean.ps1/viewer.sh) and Python dev files; updated docs to remove references.

## Scope

Deleted clean.sh, clean.ps1, viewer.sh, pyproject.toml, requirements-dev.txt from repo root; updated docs/setup and audit docs to remove references.

## Risks

Removing legacy scripts may affect workflows that depended on clean.sh/viewer.sh; users should use Node CLI recipes and repo tools instead.

## Verify Steps

(Docs-only change)

## Rollback Plan

Restore removed root scripts/files and re-add doc references if legacy workflows are required.

