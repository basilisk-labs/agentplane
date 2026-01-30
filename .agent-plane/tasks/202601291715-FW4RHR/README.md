---
id: "202601291715-FW4RHR"
title: "Add GitHub sync recipe"
status: "TODO"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: ["202601290715-46R6VZ"]
tags: ["recipes", "github", "sync"]
doc_version: 2
doc_updated_at: "2026-01-30T03:08:45+00:00"
doc_updated_by: "agentctl"
description: "Create a recipe that installs the GitHub Issues/Projects sync workflow and script for tasks.json."
---
## Summary

Added the GitHub sync recipe metadata, assets, and install tool, and registered it in the recipes index.

## Context

This recipe packages the existing GitHub Issues/Projects sync workflow and script so it can be installed via the recipes system.

## Scope

- Recipe manifest + install scenario
- Workflow + sync script assets
- install-github-sync tool for copying assets and filling placeholders from .env
- Recipes index entry

## Risks

- Missing or incorrect .env values can leave placeholders in the workflow.
- GitHub repo settings or permissions can block the workflow from running.

## Verify Steps

- Not run (recipe metadata and assets only).

## Rollback Plan

- Remove the github-sync recipe files and delete its index entry.

## Notes

The install tool reads owner/repo/project values from .env and substitutes placeholders in the workflow.

