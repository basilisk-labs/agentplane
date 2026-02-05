---
id: "202602031525-8P1KGB"
title: "Ensure release notes required for auto publish"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["release"]
verify: []
commit: { hash: "5e10b452d70be5b65b9cc2360ac155d7628be189", message: "🚀 8P1KGB enforce release notes for publish" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: add enforced English release notes for auto-publish and make release trigger robust to tag type, plus pre-push guard for release tags." }
  - { author: "ORCHESTRATOR", body: "Verified: not run; pre-commit hooks fail on unrelated lint in packages/agentplane/src/run-cli.ts. Changes reviewed manually and scoped to workflow/docs/scripts/lefthook." }
doc_version: 2
doc_updated_at: "2026-02-03T15:31:08.747Z"
doc_updated_by: "agentplane"
description: "Make release workflow auto-trigger regardless of tag type and require human English release notes before publish; add pre-push check for release tags."
id_source: "generated"
---
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
