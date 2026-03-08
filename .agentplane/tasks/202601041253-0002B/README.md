---
id: "202601041253-0002B"
title: "agentctl: add work start (branch+pr+scaffold)"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202601041253-0002A"
tags:
  - "agentctl"
  - "workflow"
  - "ergonomics"
verify:
  - "python -m compileall scripts/agentctl.py"
  - "python scripts/agentctl.py task lint"
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
  hash: "2a76efc28ea31c69c13e9c13e2494036db931d6c"
  message: "Legacy completion (backfill)"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: Squash-merged task/T-075/work-start; verify will be recorded via agentctl verify log in this closure; PR artifacts + README updated."
doc_version: 3
doc_updated_at: "2026-02-03T12:08:26.086Z"
doc_updated_by: "agentplane"
description: |-
  Add a single command to reduce startup friction for a task branch in workflow_mode=branch_pr.
  
  Acceptance:
  - New command: `python scripts/agentctl.py work start T-123 --agent CODER --slug x --worktree`.
  - Performs the equivalent of:
    - `python scripts/agentctl.py branch create T-123 --agent CODER --slug x --worktree`
    - `python scripts/agentctl.py pr open T-123 --author CODER --branch task/T-123/x`
    - `python scripts/agentctl.py task scaffold T-123` (writes `docs/workflow/T-123/README.md`)
  - Creates PR artifacts at `docs/workflow/T-123/pr/` (meta/diffstat/verify.log/review.md).
  - Idempotent with `--reuse`; does not clobber existing artifacts unless `--overwrite` is passed through to scaffold.
  - Prints clear NEXT steps.
  - Never writes `tasks.json`.
  - Update `.agent-plane/agentctl.md` to document the new command.
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
