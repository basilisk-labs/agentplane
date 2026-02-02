---
id: "202602020815-AS2NVP"
title: "Switch core package scope to @agentplaneorg"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["npm"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: switch core package to @agentplaneorg scope, update dependency and release docs, then push changes." }
doc_version: 2
doc_updated_at: "2026-02-02T08:16:23+00:00"
doc_updated_by: "agentctl"
description: "Rename core package to @agentplaneorg/core, update agentplane dependency and release docs, then push."
---
## Summary

Rename core package to @agentplaneorg/core, update agentplane dependency and release docs, then push.

## Scope

Update packages/core/package.json, packages/agentplane/package.json, and release docs for @agentplaneorg scope.

## Risks

Scope change requires republishing core and agentplane; consumers must install from the new @agentplaneorg scope.

## Verify Steps

Not run (metadata/docs changes only).

## Rollback Plan

Revert the commit for 202602020815-AS2NVP.

