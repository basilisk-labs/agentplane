---
id: "202602071752-Y2SB7D"
title: "Update chain-of-thought guidance in AGENTS templates"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "docs"
  - "policy"
  - "agents"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T17:53:41.518Z"
  updated_by: "USER"
  note: "Approved."
verification:
  state: "ok"
  updated_at: "2026-02-07T17:54:51.902Z"
  updated_by: "ORCHESTRATOR"
  note: "Replaced old chain-of-thought bullet in root AGENTS.md and install template; ripgrep confirms old text is gone and new guidance is present in both files."
commit:
  hash: "7aa95c867696d6493faa74aa3656d86b33c1bdee"
  message: "✅ P7YDP0 policy: restore explicit reasoning bullets"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Update AGENTS.md chain-of-thought rule and its install template variant; keep change strictly scoped to those two files."
  -
    author: "ORCHESTRATOR"
    body: "Verified: chain-of-thought guidance is strict (no raw reasoning); both AGENTS.md and packages/agentplane/assets/AGENTS.md are aligned, and old wording is removed."
doc_version: 2
doc_updated_at: "2026-02-08T08:45:34.810Z"
doc_updated_by: "ORCHESTRATOR"
description: "Replace the \"Do not reveal internal chain-of-thought\" sentence with stricter guidance (no raw chain-of-thought; structured artifacts only) in root AGENTS.md and the install template."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Locate all occurrences of the current chain-of-thought rule in repo (root + template).\n2) Replace with stricter guidance: no raw internal chain-of-thought; express reasoning via structured artifacts list.\n3) Verify via ripgrep: old phrase removed; new text present in both files.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T17:54:51.902Z — VERIFY — ok

By: ORCHESTRATOR

Note: Replaced old chain-of-thought bullet in root AGENTS.md and install template; ripgrep confirms old text is gone and new guidance is present in both files.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
