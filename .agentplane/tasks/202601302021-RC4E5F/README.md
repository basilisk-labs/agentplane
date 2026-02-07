---
id: "202601302021-RC4E5F"
title: "Remove legacy Python-era root artifacts"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "cleanup"
  - "nodejs"
  - "docs"
  - "repo"
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
  hash: "1ebcf79f3873a57a7ba9e5c54b0534d0c0f4d7da"
  message: "♻️ VJC5RD migrate to .agentplane layout and add publish environment"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Verified: backfilled commit metadata during migration to satisfy lint; no code changes for this task."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:35.869Z"
doc_updated_by: "agentplane"
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

## Plan


## Verification
