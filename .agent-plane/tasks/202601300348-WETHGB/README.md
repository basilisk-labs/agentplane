---
id: "202601300348-WETHGB"
title: "Verify recipe functionality (GitHub sync, Dokploy)"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["recipes", "testing", "cli"]
commit: { hash: "c18aac3d05c99734f94a00345f38a8a4b01022e0", message: "✨ 202601300348-KG2R32 document recipes usage, built-ins, and authoring" }
doc_version: 2
doc_updated_at: "2026-01-30T04:05:44+00:00"
doc_updated_by: "agentctl"
description: "Run and validate the GitHub sync and Dokploy recipes; fix issues found."
---
## Summary

Verified GitHub sync and Dokploy recipes by installing local archives, listing scenarios, running GitHub sync install, and executing Dokploy list-projects with environment variables loaded.

## Context

Recipe execution depends on environment variables for external services; this check confirms the scenarios are registered and the tools run end-to-end.

## Scope

- Built local tar.gz archives for github-sync and dokploy recipes
- Installed recipes into an isolated, temporary workspace
- Validated scenario discovery and scenario run output
- Confirmed Dokploy list-projects works when env vars are loaded

## Risks

- Deploy scenario was not executed to avoid triggering a real deployment.
- Recipe tools rely on environment variables being present in the shell.

## Verify Steps

- bun run build
- tar -czf .agent-plane/tmp/recipe-verify-20260130/archives/dokploy-0.1.0.tar.gz -C agentplane-recipes/recipes dokploy
- tar -czf .agent-plane/tmp/recipe-verify-20260130/archives/github-sync-0.1.0.tar.gz -C agentplane-recipes/recipes github-sync
- node packages/agentplane/bin/agentplane.js recipe install <archive>
- node packages/agentplane/bin/agentplane.js scenario list
- set -a; source .env; set +a; node packages/agentplane/bin/agentplane.js scenario run dokploy:list-projects
- set -a; source .env; set +a; node packages/agentplane/bin/agentplane.js scenario run github-sync:install

## Rollback Plan

- Remove any temporary recipe verification workspace if present.

## Notes

Dokploy tools require DOKPLOY_API_ENDPOINTS (or DOKPLOY_API_BASE) and DOKPLOY_API_KEY to be exported in the shell for scenario runs.

