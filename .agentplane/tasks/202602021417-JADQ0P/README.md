---
id: "202602021417-JADQ0P"
title: "Migrate legacy .agent-plane data to .agentplane and remove python artifacts"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "ops"
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
  hash: "35359daf1bcc5ede5838feed0e88a0c23e8f81ec"
  message: "🧪 4RQ156+JADQ0P align scenario test messages"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: bun run test:full; rg -n \"\\.agent-plane\" -S; rg -n \"agentctl\" docs README.md packages"
doc_version: 2
doc_updated_at: "2026-02-03T12:09:44.368Z"
doc_updated_by: "agentplane"
description: "Move legacy task data from .agent-plane into .agentplane using Node CLI paths, remove python-era artifacts and references, and update configs/docs/tests accordingly."
id_source: "explicit"
---
## Summary


## Scope


## Risks


## Verify Steps


## Rollback Plan


## Plan


## Verification
