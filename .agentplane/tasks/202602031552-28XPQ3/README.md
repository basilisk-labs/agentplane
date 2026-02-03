---
id: "202602031552-28XPQ3"
title: "Release 0.1.4"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["release"]
verify: []
commit: null
comments:
  - { author: "ORCHESTRATOR", body: "Start: prepare 0.1.4 release (notes, version bump, tag, publish via GitHub Actions)." }
doc_version: 2
doc_updated_at: "2026-02-03T16:06:27.358Z"
doc_updated_by: "agentplane"
description: "Bump versions to 0.1.4, add English release notes, tag release, and publish via GitHub Actions."
id_source: "generated"
---
## Summary

## Scope

## Risks

## Verify Steps

## Rollback Plan

## Summary

Release 0.1.4 by adding English release notes and bumping package versions.

## Scope

Add docs/releases/v0.1.4.md, update core/agentplane versions to 0.1.4, and tag/publish via GitHub Actions.

## Risks

If any version references are missed, published packages may report the wrong version or tests may fail.

## Verify Steps

rg "0.1.3" packages/core packages/agentplane

## Rollback Plan

Revert the release commit and delete tag v0.1.4 if publish fails.

## Notes

Publish workflow now installs dependencies with --ignore-scripts to avoid prepack build failures during bun install.
