---
id: "202602020618-HBX9HX"
title: "Fix agentplane version output and npm metadata"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["npm"]
verify: []
commit: { hash: "84362d7bd0aee1c9567aedb28130a28331bc608e", message: "🔧 HBX9HX fix cli version: 0.1.0 and publish metadata" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: align agentplane --version with 0.1.0 and fill npm publish metadata across package manifests; verify CLI output and build." }
  - { author: "ORCHESTRATOR", body: "verified: bun run --filter=agentplane build | details: node packages/agentplane/bin/agentplane.js --version (0.1.0); pre-commit hooks (format/lint/test-fast) passed." }
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
