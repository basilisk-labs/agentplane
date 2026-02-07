---
id: "202602070855-5Z7C2Y"
title: "Backend normalizeTasks: single-pass + write-if-changed"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202602070855-B7WC12"
tags:
  - "backend"
  - "code"
  - "perf"
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
doc_updated_at: "2026-02-07T09:12:36.073Z"
doc_updated_by: "CODER"
description: "Add backend.normalizeTasks() contract and wire local backend to single-pass read/parse/renderStable/writeIfChanged without touching updated_at when content unchanged; migrate task normalize to backend.normalizeTasks."
id_source: "explicit"
---
