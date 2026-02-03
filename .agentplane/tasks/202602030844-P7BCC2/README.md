---
id: "202602030844-P7BCC2"
title: "Harden task README generation against duplicate frontmatter"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["tasks", "core"]
verify: []
commit: { hash: "45c5f8bf291f7cfc07cad4e2e16206ed554effc5", message: "✨ P7BCC2 strip duplicate frontmatter blocks" }
comments:
  - { author: "INTEGRATOR", body: "Verified: bun run test:core; frontmatter scan on task READMEs" }
doc_version: 2
doc_updated_at: "2026-02-03T08:49:12.080Z"
doc_updated_by: "agentplane"
description: "Strip leading duplicate frontmatter blocks from task README bodies and normalize doc merges to avoid repeated headers."
id_source: "generated"
---
## Summary

## Scope

## Risks

## Verify Steps

## Rollback Plan

## Summary

Prevent duplicate frontmatter in task READMEs and ensure doc merges normalize bodies.

## Scope

Update task README parsing/normalization, add tests, and re-run doc updates to clean existing duplicates.

## Risks

Low: parsing changes may affect unusual README bodies; validate with tests.

## Verify Steps

Run relevant tests (task-readme, task-backend) and re-scan task READMEs for duplicate frontmatter.

## Rollback Plan

Revert parsing changes; regenerate task READMEs via previous commits if needed.
