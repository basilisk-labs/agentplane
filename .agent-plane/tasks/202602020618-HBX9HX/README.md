---
id: "202602020618-HBX9HX"
title: "Fix agentplane version output and npm metadata"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["npm"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: align agentplane --version with 0.1.0 and fill npm publish metadata across package manifests; verify CLI output and build." }
doc_version: 2
doc_updated_at: "2026-02-02T06:19:43+00:00"
doc_updated_by: "agentctl"
description: "Ensure agentplane --version reports 0.1.0 and align publish metadata for npm release (package.json fields, version source)."
---
## Summary

Update agentplane --version to 0.1.0 and align npm publish metadata for the CLI package.

## Scope

Set CLI version to 0.1.0, update version-dependent tests, and ensure publishConfig metadata for packages/agentplane.

## Risks

If version is hardcoded, future bumps require manual update; tests cover CLI output to catch mismatches.

## Verify Steps

bun run --filter=agentplane build\nnode packages/agentplane/bin/agentplane.js --version

## Rollback Plan

Revert version and package metadata changes, then restore tests to the previous expected version.

