---
id: "202602030844-P7BCC2"
title: "Harden task README generation against duplicate frontmatter"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "tasks"
  - "core"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "45c5f8bf291f7cfc07cad4e2e16206ed554effc5"
  message: "✨ P7BCC2 strip duplicate frontmatter blocks"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: bun run test:core; frontmatter scan on task READMEs"
doc_version: 2
doc_updated_at: "2026-02-03T12:09:49.698Z"
doc_updated_by: "agentplane"
description: "Strip leading duplicate frontmatter blocks from task README bodies and normalize doc merges to avoid repeated headers."
id_source: "generated"
---
## Summary

Prevent duplicate frontmatter in task READMEs and ensure doc merges normalize bodies.

Normalized task doc sections (dedupe).

## Scope

Update task README parsing/normalization, add tests, and re-run doc updates to clean existing duplicates.

## Risks

Low: parsing changes may affect unusual README bodies; validate with tests.

## Verify Steps

Run relevant tests (task-readme, task-backend) and re-scan task READMEs for duplicate frontmatter.

## Rollback Plan

Revert parsing changes; regenerate task READMEs via previous commits if needed.

## Plan


## Verification
