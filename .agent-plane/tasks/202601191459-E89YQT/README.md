---
id: "202601191459-E89YQT"
title: "Add minimal tags to completed tasks"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["tasks", "workflow"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: identify DONE tasks missing tags and add minimal tags." }
doc_version: 2
doc_updated_at: "2026-01-30T09:40:46+00:00"
doc_updated_by: "agentctl"
description: "Review completed tasks lacking tags and assign a minimal, navigable tag set without inflating tag counts."
---
## Summary

Audit DONE tasks with missing tags and add minimal tags to improve navigation without inflating tag counts.

## Context

Completed tasks had empty tags, which made filtering and browsing less useful.

## Scope

- Export tasks snapshot from local backend.\n- Identify DONE tasks with empty/missing tags.\n- Add 1-2 minimal tags per task via agentctl task update.\n- Export tasks and document changes.

## Risks

- Over-tagging could dilute signal; keep tags minimal and consistent.\n- Touching many tasks increases churn in tasks.json; batch updates carefully.

## Verify Steps

python .agent-plane/agentctl.py task export

## Rollback Plan

Revert the commit to restore previous tag state in tasks.json.

## Notes

Mapping was keyword-based with a workflow fallback for uncategorized titles.

