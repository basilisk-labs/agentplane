---
id: "202602091444-D2JM0S"
title: "AGENTS.md: packaged policy + root symlink"
result_summary: "Closed as not applicable; replaced by regular root AGENTS.md behavior"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "docs"
  - "cli"
  - "policy"
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
  hash: "4e803e244f4bf884f8f7e65a9b90e8a573a7f8b9"
  message: "✅ 7YSJCE docs: document upgrade review.json and role JSON fallback"
comments:
  -
    author: "CODER"
    body: "Start: Make AGENTS.md fully packaged (no repo-dev assumptions, agentplane binary only) and ensure workspace root AGENTS.md is a symlink to the installed framework copy under .agentplane/."
  -
    author: "CODER"
    body: "Blocked: superseded by 202602101501-J0ZCS3; init now creates a regular root AGENTS.md (no symlink), and upgrade refuses overwriting external symlink targets"
  -
    author: "CODER"
    body: "Verified: not applicable (task superseded by 202602101501-J0ZCS3); symlink-based AGENTS.md install was intentionally removed"
events:
  -
    type: "status"
    at: "2026-02-09T14:44:41.401Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Make AGENTS.md fully packaged (no repo-dev assumptions, agentplane binary only) and ensure workspace root AGENTS.md is a symlink to the installed framework copy under .agentplane/."
  -
    type: "status"
    at: "2026-02-10T15:21:35.877Z"
    author: "CODER"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: superseded by 202602101501-J0ZCS3; init now creates a regular root AGENTS.md (no symlink), and upgrade refuses overwriting external symlink targets"
  -
    type: "status"
    at: "2026-02-10T15:23:51.298Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DONE"
    note: "Verified: not applicable (task superseded by 202602101501-J0ZCS3); symlink-based AGENTS.md install was intentionally removed"
doc_version: 2
doc_updated_at: "2026-02-10T15:23:51.298Z"
doc_updated_by: "CODER"
description: "Update the packaged AGENTS.md policy to be installable with the framework (no repo-dev assumptions, no repo-local CLI paths, agentplane binary only). Ensure workspace root AGENTS.md is created as a symlink to the installed framework copy."
id_source: "generated"
---
## Summary


## Scope

In scope:\n- packages/agentplane/assets/AGENTS.md\n- workspace install/upgrade behavior for AGENTS.md (symlink + managed copy under .agentplane/)\n- root repo AGENTS.md kept in sync via symlink\n\nOut of scope:\n- changes to agent JSON content beyond references to AGENTS.md

## Plan


## Risks


## Verification


## Rollback Plan


## Verify Steps

Commands:\n- bun run lint\n- bun run test:full\n\nPass criteria:\n- All checks pass.\n- init creates .agentplane/AGENTS.md and root AGENTS.md symlink.\n- upgrade maintains the symlink and updates the managed copy.
