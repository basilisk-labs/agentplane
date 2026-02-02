---
id: "202602021528-49A4G0"
title: "Release 0.1.1"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: ["[]"]
tags: ["release"]
verify: []
commit: null
comments:
  - { author: "ORCHESTRATOR", body: "Start: preparing 0.1.1 release bump for npm packages and release metadata, then verify and push." }
doc_version: 2
doc_updated_at: "2026-02-02T15:31:47.019Z"
doc_updated_by: "agentplane"
description: "Bump package versions to 0.1.1 and prepare release for npmjs."
id_source: "generated"
---
## Summary

## Scope

## Risks

## Verify Steps

## Rollback Plan

## Summary

Bump agentplane and @agentplaneorg/core to 0.1.1 and align CLI version output/tests for release.

## Scope

Update package versions, CLI version constant, and version assertions in tests.

## Risks

Mismatch between published package versions and CLI-reported version if any file is missed.

## Verify Steps

1) bun run --filter=agentplane test:cli:core\n2) bun run --filter=agentplane test:cli:smoke

## Rollback Plan

Revert the version bumps and restore previous test expectations.
