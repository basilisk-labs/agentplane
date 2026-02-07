---
id: "202602070855-5Z7C2Y"
title: "Backend normalizeTasks: single-pass + write-if-changed"
status: "DOING"
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
  state: "approved"
  updated_at: "2026-02-07T12:19:13.680Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: implement backend.normalizeTasks (LocalBackend single-pass + write-if-changed) and wire task normalize to prefer it."
doc_version: 2
doc_updated_at: "2026-02-07T12:19:21.470Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add backend.normalizeTasks() contract and wire local backend to single-pass read/parse/renderStable/writeIfChanged without touching updated_at when content unchanged; migrate task normalize to backend.normalizeTasks."
id_source: "explicit"
---
## Summary


## Scope

In scope: add TaskBackend.normalizeTasks(); implement LocalBackend.normalizeTasks as single-pass read/parse/render + writeTextIfChanged; implement RedmineBackend.normalizeTasks as cache-only or no-op; update task normalize command to call backend.normalizeTasks when available.

## Plan

1) Add TaskBackend.normalizeTasks() optional API + return stats.\n2) Implement LocalBackend.normalizeTasks(): single-pass over task READMEs; parse + render stable; writeTextIfChanged; count changed/scanned; never update timestamps unless file content changes.\n3) Implement RedmineBackend.normalizeTasks(): normalize cache if present, otherwise no-op.\n4) Update task normalize command to call backend.normalizeTasks() when available; keep old fallback for backends without it.\n5) Add/adjust tests if needed; run typecheck, lint, test:agentplane.

## Risks


## Verification


## Rollback Plan

Revert commits for normalizeTasks and task normalize dispatch; fallback behavior remains listTasks + writeTask(s).
