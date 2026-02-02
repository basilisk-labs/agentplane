---
id: "202601291715-KJ12XA"
title: "Add Dokploy recipe"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: ["202601290715-46R6VZ"]
tags: ["recipes", "dokploy", "deploy"]
verify: []
commit: { hash: "acdc0e8f58aee85f03189caee3b228c2b082dbbd", message: "✨ 202601291715-FW4RHR 202601291715-KJ12XA add github-sync and dokploy recipes" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-30T03:08:51+00:00"
doc_updated_by: "agentctl"
description: "Create a recipe that configures Dokploy API integration for deploy operations using API key and endpoint from .env."
---
## Summary

Added the Dokploy recipe metadata, scenarios, and CLI tool, and registered it in the recipes index.

## Context

Dokploy automation is exposed as a recipe so deployments and project listing can be driven via the recipes system.

## Scope

- Dokploy recipe manifest
- Scenarios for listing projects and deploying an application
- dokploy.mjs tool for API calls using .env configuration
- Recipes index entry

## Risks

- Incorrect API endpoint or key will cause the tool to fail.
- Deploy scenario requires a valid application ID and can trigger real deploys.

## Verify Steps

- Not run (recipe metadata and tool wiring only).

## Rollback Plan

- Remove the dokploy recipe files and delete its index entry.

## Notes

Tool expects DOKPLOY_API_ENDPOINTS (or DOKPLOY_API_BASE) and DOKPLOY_API_KEY; deploy uses DOKPLOY_APPLICATION_ID if not provided.
