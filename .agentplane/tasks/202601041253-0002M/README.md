---
id: "202601041253-0002M"
title: "Agents: prefer agentctl CLI for supported operations"
status: "DONE"
priority: "high"
owner: "PLANNER"
depends_on: ["202601041253-0002A", "202601041253-0002K"]
tags: ["agents", "agentctl", "workflow"]
verify: ["python scripts/agentctl.py task lint"]
commit: { hash: "95358c3c7df46275d7afccb5e2556aa52cdb4c39", message: "Legacy completion (backfill)" }
comments:
  - { author: "INTEGRATOR", body: "Verified: Integrated via squash; verify=ran; pr=docs/workflow/T-084/pr." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:28.249Z"
doc_updated_by: "agentplane"
description: "Audit scripts/agentctl.py capabilities and update .agent-plane/agents/*.json prompts so each agent uses agentctl for any supported operation (tasks.json ops, branch/worktree management, PR artifacts, verify logs, commit guardrails, integrate/cleanup). Only fall back to raw git/shell commands when agentctl has no equivalent."
dirty: false
---
## Summary


## Scope


## Risks


## Verify Steps


## Rollback Plan
