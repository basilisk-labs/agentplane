---
id: "202601110913-Z10Z68"
title: "Replace automation owners and refresh newcomer docs"
status: "DONE"
priority: "normal"
owner: "DOCS"
depends_on: []
tags: ["docs", "tasks"]
verify: []
commit: { hash: "2c6b87235c6a1292517cb179020a4ea00e1a44fa", message: "✅ Z10Z68 enforce verify/doc readiness and safer sync" }
comments:
  - { author: "DOCS", body: "Verified: py_compile redmine backend; task lint clean; owners now CODER; README/docs split between quickstart and full reference." }
  - { author: "DOCS", body: "Verified: py_compile agentctl/redmine; lint clean. Enforced known-agent owners in task flows/docs." }
  - { author: "DOCS", body: "Verified: py_compile agentctl/redmine; task lint clean after verify backfill; added verify/doc gates and safer sync." }
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Change owner=AUTOMATION tasks to a real agent (CODER) and adjust README/docs to guide first-time users vs full docs."
---
## Summary

Swap legacy owner=AUTOMATION to CODER across tasks and adjust README/docs to separate newcomer quickstart from full reference.

## Context

Lint warnings came from owner=AUTOMATION; docs needed clearer split between newcomer quickstart (root README) and full docs (docs/README).

## Scope

- Replace owner=AUTOMATION with CODER in all tasks.
- Regenerate tasks.json export.
- Refresh root README for first-time quickstart emphasis and point to docs/README.md for the full guide.
- Update docs/README.md to clarify it is the full reference.

## Risks

- Bulk owner changes touch many files; must avoid altering other metadata.
- README simplification should not hide links to full docs.

## Verify Steps

- python -m py_compile .agent-plane/backends/redmine/backend.py
- python .agent-plane/agentctl.py task lint

## Rollback Plan

- Revert the owner changes and README/docs edits.
