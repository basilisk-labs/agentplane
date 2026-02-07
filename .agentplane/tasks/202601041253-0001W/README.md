---
id: "202601041253-0001W"
title: "Update agents to use agentctl docs + helpers"
status: "DONE"
priority: "normal"
owner: "PLANNER"
depends_on: []
tags:
  - "agentctl"
  - "agents"
verify:
  - "python scripts/agentctl.py task lint"
  - "python scripts/agentctl.py agents"
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
  hash: "c735c4c5202296b00105c46e73cc23ddd9b7d203"
  message: "Legacy completion (backfill)"
comments:
  -
    author: "REVIEWER"
    body: "Verified: Ran python scripts/agentctl.py task lint and python scripts/agentctl.py agents; confirmed .AGENTS workflows now start with python scripts/agentctl.py quickstart and reference docs/agentctl.md and helper commands."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:22.610Z"
doc_updated_by: "agentplane"
description: "Update .AGENTS/*.json workflows to explicitly reference docs/agentctl.md (via # agentctl quickstart\\n\\n`python scripts/agentctl.py` is the only supported way to inspect/update `tasks.json` (manual edits break the checksum).\\n\\n## Common commands\\n\\n```bash\\n# list/show\\npython scripts/agentctl.py task list\\npython scripts/agentctl.py task show T-123\\n\\n# validate tasks.json (schema/deps/checksum)\\npython scripts/agentctl.py task lint\\n\\n# readiness gate (deps DONE)\\npython scripts/agentctl.py ready T-123\\n\\n# status transitions that require structured comments\\npython scripts/agentctl.py start T-123 --author CODER --body \\\"Start: ... (why, scope, plan, risks)\\\"\\npython scripts/agentctl.py block T-123 --author CODER --body \\\"Blocked: ... (what blocks, next step, owner)\\\"\\n\\n# run per-task verify commands (declared on the task)\\npython scripts/agentctl.py verify T-123\\n\\n# before committing, validate staged allowlist + message quality\\npython scripts/agentctl.py guard commit T-123 -m \\\"✨ T-123 Short meaningful summary\\\" --allow <path-prefix>\\n\\n# if you want a safe wrapper that also runs `git commit`\\npython scripts/agentctl.py commit T-123 -m \\\"✨ T-123 Short meaningful summary\\\" --allow <path-prefix>\\n\\n# when closing a task: mark DONE + attach commit metadata (typically after implementation commit)\\npython scripts/agentctl.py finish T-123 --commit <git-rev> --author REVIEWER --body \\\"Verified: ... (what ran, results, caveats)\\\"\\n```\\n\\n## Ergonomics helpers\\n\\n```bash\\n# find tasks that are ready to start (deps DONE)\\npython scripts/agentctl.py task next\\n\\n# search tasks by text (title/description/tags/comments)\\npython scripts/agentctl.py task search agentctl\\n\\n# scaffold a workflow artifact (docs/workflow/T-###.md)\\npython scripts/agentctl.py task scaffold T-123\\n\\n# suggest minimal --allow prefixes based on staged files\\npython scripts/agentctl.py guard suggest-allow\\npython scripts/agentctl.py guard suggest-allow --format args\\n```\\n\\n## Workflow reminders\\n\\n- `tasks.json` is canonical; do not edit it by hand.\\n- Keep work atomic: one task → one implementation commit (plus planning + closure commits if you use the 3-phase cadence).\\n- Prefer `start/block/finish` over `task set-status`.\\n- Keep allowlists tight: pass only the path prefixes you intend to commit.) and prefer the new helper commands (task next/search/scaffold, guard suggest-allow, commit wrapper) where applicable."
dirty: false
---
## Summary


## Scope


## Risks


## Verify Steps


## Rollback Plan


## Plan


## Verification
