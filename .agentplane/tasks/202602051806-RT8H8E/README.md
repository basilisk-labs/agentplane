---
id: "202602051806-RT8H8E"
title: "Bump packages to 0.1.6"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["release", "versioning"]
verify: []
commit: null
comments:
  - { author: "ORCHESTRATOR", body: "Start: bump package versions to 0.1.6 and align dependencies for release." }
doc_version: 2
doc_updated_at: "2026-02-05T18:17:29.228Z"
doc_updated_by: "ORCHESTRATOR"
description: "Update agentplane and core package versions to 0.1.6."
id_source: "generated"
---
## Summary

Bump agentplane and core packages to v0.1.6 for release.

## Scope

Update package.json versions and internal dependency versions to 0.1.6.

## Risks

Low: mismatched versions could break release checks or publish.

## Verify Steps

Command: rg "version" packages/agentplane/package.json packages/core/package.json; ensure both are 0.1.6 and dependency aligns.

## Verification

Checked package.json versions and @agentplaneorg/core dependency set to 0.1.6.

## Rollback Plan

Restore previous version numbers in package.json files.
