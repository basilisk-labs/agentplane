---
id: "202602031631-6M1YXR"
title: "Use local agentplane.js in AGENTS.md"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["docs"]
verify: []
commit: { hash: "7878c1909fb587ea4cb83209a95b1f53bc54c44c", message: "🧾 28XPQ3 record finish metadata" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: Update AGENTS.md to require repo-local agentplane.js usage and avoid system binaries." }
  - { author: "ORCHESTRATOR", body: "Verified: Ran agentplane verify; it reported no verify commands configured for this documentation-only change." }
doc_version: 2
doc_updated_at: "2026-02-03T16:34:55.874Z"
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
