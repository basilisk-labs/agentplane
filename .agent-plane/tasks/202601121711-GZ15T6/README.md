---
id: "202601121711-GZ15T6"
title: "Polish cleanup scripts and tasks viewer"
status: "DOING"
priority: "normal"
owner: "REDMINE"
depends_on: []
tags: ["cleanup", "ui"]
verify: null
commit: null
comments:
  - { author: "CODER", body: "Polish tasks viewer UI (iOS palette, sticky header, order toggle, tooltip tags, metadata) and update clean scripts to remove dev files." }
doc_version: 2
doc_updated_at: "2026-01-12T17:12:41+00:00"
doc_updated_by: "agentctl"
description: "Remove dev-only files in clean scripts and refine tasks viewer UI (iOS palette, order toggle, sticky header, tooltip tags, metadata) and fix layout issues."
dirty: false
id_source: "custom"
---
## Summary

- Update clean.sh/clean.ps1 to remove dev-only files and refresh tasks viewer UI (iOS palette, header, order toggle, tooltip tags, metadata).

## Scope

- clean.sh/clean.ps1 remove pyproject.toml and requirements-dev.txt; tasks.html updates palette, header behavior, ordering, tooltips, and metadata.

## Risks

- UI styling regressions or layout differences across browsers.

## Verify Steps

- Manual: run ./viewer.sh, check sticky header, full-height background, tooltip tag wrapping, order toggle; run clean.sh on a test copy.

## Rollback Plan

- Revert this commit to restore the previous tasks viewer and clean scripts.

