---
id: "202601041253-0002C"
title: "agentctl: verify auto-log to per-task pr/verify.log"
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
  hash: "5ad82c70456333dacda8ff88d5daf15060253536"
  message: "Legacy completion (backfill)"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=ran; pr=docs/workflow/T-076/pr."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:26.363Z"
doc_updated_by: "agentplane"
description: "Make `agentctl verify` faster by defaulting the log file when a PR artifact exists.\\n\\nAcceptance:\\n- `python scripts/agentctl.py verify T-123` appends to `docs/workflow/T-123/pr/verify.log` when that PR dir exists.\\n- `--log` still overrides.\\n- Supports legacy `docs/workflow/prs/T-123/verify.log` during migration.\\n- `--skip-if-unchanged` continues to work and uses PR `meta.json:head_sha` when the effective log path is under the PR directory.\\n- Update `.agent-plane/agentctl.md` to document the new default."
dirty: false
---
## Summary


## Scope


## Risks


## Verify Steps


## Rollback Plan


## Plan


## Verification
