---
id: "202602030653-YZGRB2"
title: "Standardize invalid/missing identifiers and values"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags: ["cli,errors"]
verify: []
commit: { hash: "28fc717789a0f4e32cecb73eff978da9458c94ad", message: "✨ CCHDAQ+EEFK09+HT8JWS+Q39M3X+YZGRB2+F1Q8AB refine cli messaging and tests" }
comments:
  - { author: "CODER", body: "Start: align invalid/missing identifier and value messages." }
  - { author: "INTEGRATOR", body: "Verified: bun test packages/agentplane/src/run-cli.core.test.ts packages/agentplane/src/run-cli.recipes.test.ts" }
  - { author: "INTEGRATOR", body: "Verified: bun test packages/agentplane/src/run-cli.core.test.ts packages/agentplane/src/run-cli.recipes.test.ts; bun run lint" }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:48.665Z"
doc_updated_by: "agentplane"
description: "Align messages for missing/unknown IDs and invalid values (regex/status/flags) with explicit expectations."
id_source: "generated"
---
## Summary


## Scope


## Risks


## Verify Steps


## Rollback Plan
