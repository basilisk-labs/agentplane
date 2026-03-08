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
doc_version: 3
doc_updated_at: "2026-02-03T12:08:22.610Z"
doc_updated_by: "agentplane"
description: |-
  Update .AGENTS/*.json workflows to explicitly reference docs/agentctl.md (via # agentctl quickstart
  
  `python scripts/agentctl.py` is the only supported way to inspect/update `tasks.json` (manual edits break the checksum).
  
  ## Common commands
  
  ```bash
  # list/show
  python scripts/agentctl.py task list
  python scripts/agentctl.py task show T-123
  
  # validate tasks.json (schema/deps/checksum)
  python scripts/agentctl.py task lint
  
  # readiness gate (deps DONE)
  python scripts/agentctl.py ready T-123
  
  # status transitions that require structured comments
  python scripts/agentctl.py start T-123 --author CODER --body \"Start: ... (why, scope, plan, risks)\"
  python scripts/agentctl.py block T-123 --author CODER --body \"Blocked: ... (what blocks, next step, owner)\"
  
  # run per-task verify commands (declared on the task)
  python scripts/agentctl.py verify T-123
  
  # before committing, validate staged allowlist + message quality
  python scripts/agentctl.py guard commit T-123 -m \"✨ T-123 Short meaningful summary\" --allow <path-prefix>
  
  # if you want a safe wrapper that also runs `git commit`
  python scripts/agentctl.py commit T-123 -m \"✨ T-123 Short meaningful summary\" --allow <path-prefix>
  
  # when closing a task: mark DONE + attach commit metadata (typically after implementation commit)
  python scripts/agentctl.py finish T-123 --commit <git-rev> --author REVIEWER --body \"Verified: ... (what ran, results, caveats)\"
  ```
  
  ## Ergonomics helpers
  
  ```bash
  # find tasks that are ready to start (deps DONE)
  python scripts/agentctl.py task next
  
  # search tasks by text (title/description/tags/comments)
  python scripts/agentctl.py task search agentctl
  
  # scaffold a workflow artifact (docs/workflow/T-###.md)
  python scripts/agentctl.py task scaffold T-123
  
  # suggest minimal --allow prefixes based on staged files
  python scripts/agentctl.py guard suggest-allow
  python scripts/agentctl.py guard suggest-allow --format args
  ```
  
  ## Workflow reminders
  
  - `tasks.json` is canonical; do not edit it by hand.
  - Keep work atomic: one task → one implementation commit (plus planning + closure commits if you use the 3-phase cadence).
  - Prefer `start/block/finish` over `task set-status`.
  - Keep allowlists tight: pass only the path prefixes you intend to commit.) and prefer the new helper commands (task next/search/scaffold, guard suggest-allow, commit wrapper) where applicable.
dirty: false
---
## Summary


## Scope


## Plan


## Verify Steps


## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Findings


## Risks
