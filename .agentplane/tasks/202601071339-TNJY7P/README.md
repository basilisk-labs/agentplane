---
id: "202601071339-TNJY7P"
title: "Normalize diagram/badge wording for task export"
status: "DONE"
priority: "normal"
owner: "PLANNER"
depends_on: []
tags: ["docs"]
verify: []
commit: { hash: "918e384d381c85c237c936bde01954fa7a193268", message: "🪄 TNJY7P normalize diagram wording: update export label in README sequence diagram; align task export phrasing" }
comments:
  - { author: "ORCHESTRATOR", body: "Verified: not run; doc/instruction edits only, no runtime impact." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:35.187Z"
doc_updated_by: "agentplane"
description: "Align README diagrams and badges with 'task export' wording, ensuring tasks.json references are consistent and minimal."
---
## Summary

- Normalized diagram wording in README to refer to the task export/view consistently.


## Goal

- Keep diagrams and badges aligned with export terminology without overusing tasks.json.


## Scope

- @README.md


## Risks

- Low: diagram text change only.


## Verify Steps

- None (doc-only change).


## Rollback Plan

- Revert commit `918e384d381c`.
