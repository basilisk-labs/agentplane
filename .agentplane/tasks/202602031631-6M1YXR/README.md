---
id: "202602031631-6M1YXR"
title: "Use local agentplane.js in AGENTS.md"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["docs"]
verify: []
commit: { hash: "769b13d6c21a50546143ad0cdc8b127b21948da4", message: "📝 6M1YXR require repo-local agentplane.js usage" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: Update AGENTS.md to require repo-local agentplane.js usage and avoid system binaries." }
  - { author: "ORCHESTRATOR", body: "Verified: Ran agentplane verify; it reported no verify commands configured for this documentation-only change." }
  - { author: "ORCHESTRATOR", body: "Verified: Commit 769b13d6c21a captured AGENTS.md update; no additional verify commands configured." }
doc_version: 2
doc_updated_at: "2026-02-03T16:38:47.252Z"
doc_updated_by: "ORCHESTRATOR"
description: "Update AGENTS.md to instruct agents to run local packages/agentplane/bin/agentplane.js instead of system agentplane."
id_source: "generated"
---
## Summary

Updated AGENTS.md to require repo-local agentplane.js invocation and clarified shorthand usage.

## Scope

AGENTS.md only.

## Risks

Low risk. Documentation-only change; potential confusion if other docs still reference a system-installed agentplane.

## Verify Steps

Not run (documentation-only change).

## Rollback Plan

Revert AGENTS.md to the previous guidance.
