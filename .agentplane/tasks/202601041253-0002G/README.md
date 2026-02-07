---
id: "202601041253-0002G"
title: "agentctl: integrate auto-updates PR diffstat + README auto-summary"
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
  hash: "62171a9bb6b56469b6209f2d5b29f053096a1d6f"
  message: "Legacy completion (backfill)"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=ran; pr=docs/workflow/T-080/pr."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:27.295Z"
doc_updated_by: "agentplane"
description: "Reduce manual PR bookkeeping by having `agentctl integrate` refresh the tracked PR artifacts on main.\\n\\nAcceptance:\\n- During `python scripts/agentctl.py integrate T-123 ...` (workflow_mode=branch_pr), after merge it updates:\\n  - `docs/workflow/T-123/pr/diffstat.txt` (recomputed for the task branch vs base), and\\n  - `docs/workflow/T-123/README.md` auto-summary block (between `<!-- BEGIN AUTO SUMMARY -->` / `<!-- END AUTO SUMMARY -->`) using the changed files list.\\n- No writes happen to the task branch; updates are only in the main checkout after merge.\\n- Works with `--merge-strategy squash|merge|rebase`.\\n- Update `.agent-plane/agentctl.md` to state `integrate` refreshes these artifacts automatically."
dirty: false
---
## Summary


## Scope


## Risks


## Verify Steps


## Rollback Plan


## Plan


## Verification
