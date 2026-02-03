---
id: "202602020726-3N2KNX"
title: "Prepare npm publish metadata + checklist"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["npm"]
verify: []
commit: { hash: "ac77e3ec777c21300af9a27984fc2493d6a1c70d", message: "🔧 3N2KNX set basilisk-labs package metadata for npm publish" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: prepare npm publish checklist, update package metadata for basilisk-labs ownership, and document publish steps in Russian without running networked commands." }
  - { author: "ORCHESTRATOR", body: "verified: not run (metadata-only change) | details: pre-commit hooks ran format/lint/test-fast as part of commit." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:42.584Z"
doc_updated_by: "agentplane"
description: "Set basilisk-labs ownership metadata, ensure publish fields are complete, and provide a Russian checklist + commands for npm publish."
---
## Summary

Update npm package metadata to list basilisk-labs as author/maintainer/contributor and prepare a publish checklist.


## Scope

Adjust packages/agentplane/package.json metadata and provide publish steps for npmjs.


## Risks

Incorrect ownership metadata could mislead npm readers; publish steps require user credentials and should be followed carefully.


## Verify Steps

Not run (metadata-only change).


## Rollback Plan

Revert the commit for 202602020726-3N2KNX.
