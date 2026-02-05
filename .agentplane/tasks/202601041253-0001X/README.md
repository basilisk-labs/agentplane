---
id: "202601041253-0001X"
title: "Require user approval before final task-closing commit"
status: "DONE"
priority: "normal"
owner: "REVIEWER"
depends_on: []
tags: ["workflow", "agents", "git"]
verify: ["python scripts/agentctl.py task lint", "python scripts/agentctl.py agents"]
commit: { hash: "dca6297f9226447c57df14fb9f6090a679b535f3", message: "Legacy completion (backfill)" }
comments:
  - { author: "REVIEWER", body: "Verified: AGENTS.md and REVIEWER workflow now require explicit user approval before the final task-closing commit; task lint and agents registry checks pass." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:22.898Z"
doc_updated_by: "agentplane"
description: "Update agent workflows so that before creating the final closure commit for a task (the commit that marks the task DONE in tasks.json, typically together with docs/workflow/T-###.md updates), the agent must explicitly request user confirmation and wait for approval.\\\\n\\\\nAcceptance criteria:\\\\n- AGENTS.md COMMIT_WORKFLOW states that the final closure commit requires explicit user approval.\\\\n- ORCHESTRATOR guidance includes a pause/confirmation request before the closing commit.\\\\n- REVIEWER workflow requires asking the user before running agentctl finish + committing tasks.json (and any workflow artifact updates)."
dirty: false
---
## Summary


## Scope


## Risks


## Verify Steps


## Rollback Plan
