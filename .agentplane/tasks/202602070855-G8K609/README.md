---
id: "202602070855-G8K609"
title: "Stable ordering + replace always-write with writeIfChanged"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on:
  - "202602070855-JRBN0P"
tags:
  - "code"
  - "perf"
  - "formatting"
verify:
  - "bun run typecheck"
  - "bun run test:agentplane"
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
doc_updated_at: "2026-02-07T09:12:36.327Z"
doc_updated_by: "CODER"
description: "Stabilize ordering in JSON/YAML/README rendering; ensure deterministic task sorting; replace unconditional writes with writeIfChanged across config/meta/cache/export/normalize."
id_source: "explicit"
---
