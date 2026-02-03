---
id: "202601071333-WRD9N1"
title: "Reduce snapshot wording in docs"
status: "DONE"
priority: "normal"
owner: "PLANNER"
depends_on: []
tags: ["docs", "cleanup"]
verify: []
commit: { hash: "c8cc07f9a2424f20a7f2d062494519761f7bf2a5", message: "🧹 WRD9N1 reduce snapshot wording in docs: switch snapshot phrasing to export/view; update viewer and export descriptions; keep tasks.json references only where needed" }
comments:
  - { author: "ORCHESTRATOR", body: "Verified: not run; doc/instruction edits only, no runtime impact." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:34.908Z"
doc_updated_by: "agentplane"
description: "Update README, docs, and CONTRIBUTING to minimize repeated 'snapshot/tasks.json' phrasing, while preserving rules: do not edit exports by hand and use agentctl for task export."
---
## Summary

- Reduced snapshot wording in README, docs, CONTRIBUTING, and cleanup notes.
- Kept tasks.json references only where needed for export/viewer guidance.


## Goal

- Minimize repeated snapshot phrasing while preserving export rules and commands.


## Scope

- @README.md
- @CONTRIBUTING.md
- @clean.sh
- @docs/01-overview.md
- @docs/03-setup.md
- @docs/04-architecture.md
- @docs/07-tasks-and-backends.md
- @docs/09-commands.md
- @docs/10-troubleshooting.md


## Risks

- Low: wording changes could hide explicit snapshot terminology some users expect.


## Verify Steps

- None (doc/instruction changes only).


## Rollback Plan

- Revert commit `c8cc07f9a242`.
