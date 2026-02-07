---
id: "202602070855-ZXJ9M4"
title: "CommandContext: single bootstrap + memoization"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202602070855-CS7KA9"
tags:
  - "code"
  - "cli"
  - "perf"
verify:
  - "bun run typecheck"
  - "bun run test:cli:core"
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
comments: []
doc_version: 2
doc_updated_at: "2026-02-07T08:55:07.728Z"
doc_updated_by: "CODER"
description: "Refactor CLI dispatch to create CommandContext once per command; remove repeated resolveProject/loadConfig/loadTaskBackend calls; add ctx.memo for taskList/changedPaths/headCommit and route all repeats through it."
id_source: "generated"
---
