---
id: "202602021544-1TWSK3"
title: "Fix publish workflow failures"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["release", "ci"]
verify: []
commit: { hash: "a8c85b65b4d353469c9f8d9a0a944ff370c4be93", message: "🛠️ 1TWSK3 fix publish imports and workflow" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: fix package import scope mismatches and TS typing error to unblock publish workflow." }
  - { author: "ORCHESTRATOR", body: "Verified: bun run --filter=@agentplaneorg/core build and bun run --filter=agentplane build." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:45.534Z"
doc_updated_by: "agentplane"
description: "Update @agentplane/core imports to @agentplaneorg/core and fix TS7006 in run-cli.ts so GitHub publish workflow passes."
id_source: "generated"
---
## Summary


## Scope


## Risks


## Verify Steps


## Rollback Plan
