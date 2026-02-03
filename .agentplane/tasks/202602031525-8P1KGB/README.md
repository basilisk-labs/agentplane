---
id: "202602031525-8P1KGB"
title: "Ensure release notes required for auto publish"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["release"]
verify: []
commit: null
comments:
  - { author: "ORCHESTRATOR", body: "Start: add enforced English release notes for auto-publish and make release trigger robust to tag type, plus pre-push guard for release tags." }
doc_version: 2
doc_updated_at: "2026-02-03T15:28:33.321Z"
doc_updated_by: "agentplane"
description: "Make release workflow auto-trigger regardless of tag type and require human English release notes before publish; add pre-push check for release tags."
id_source: "generated"
---
## Summary

## Scope

## Risks

## Verify Steps

## Rollback Plan

## Summary

Require English release notes for publishes, add pre-push guard, and make publish workflow auto-trigger for tag events regardless of tag type.

## Scope

Update publish workflow triggers and checks, add release notes validator script, add pre-push hook, and document release notes requirements and templates.

## Risks

Workflow will block publishing if notes are missing or not in the tagged commit; teams must commit notes before tagging.

## Verify Steps

1) Create a test tag and confirm pre-push rejects missing notes.\n2) Run publish workflow on a tag and confirm it fails without notes and passes with notes.

## Rollback Plan

Revert the workflow, hook, and script commits to restore prior release behavior.
