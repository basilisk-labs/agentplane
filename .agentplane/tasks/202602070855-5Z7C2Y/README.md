---
id: "202602070855-5Z7C2Y"
title: "Backend normalizeTasks: single-pass + write-if-changed"
status: "DONE"
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
  state: "ok"
  updated_at: "2026-02-07T12:21:39.104Z"
  updated_by: "CODEX"
  note: "Verified: bun run typecheck; bun run lint; bun run test:agentplane"
commit:
  hash: "f43b15eb15f6dd5d5bcd939bbe765ca580de738f"
  message: "✅ 5Z7C2Y backend: add normalizeTasks single-pass + wire task normalize"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: implement backend.normalizeTasks (LocalBackend single-pass + write-if-changed) and wire task normalize to prefer it."
  -
    author: "CODEX"
    body: "Verified: bun run typecheck; bun run lint; bun run test:agentplane. Summary: add TaskBackend.normalizeTasks; implement LocalBackend single-pass normalize with writeTextIfChanged; task normalize prefers backend.normalizeTasks. Implementation: f43b15eb15f6."
doc_version: 2
doc_updated_at: "2026-02-07T12:21:44.540Z"
doc_updated_by: "CODEX"
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

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T12:21:39.104Z — VERIFY — ok

By: CODEX

Note: Verified: bun run typecheck; bun run lint; bun run test:agentplane

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert commits for normalizeTasks and task normalize dispatch; fallback behavior remains listTasks + writeTask(s).
