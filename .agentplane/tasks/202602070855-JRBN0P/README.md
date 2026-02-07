---
id: "202602070855-JRBN0P"
title: "Batch backend APIs + controlled parallelism"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on:
  - "202602070855-5Z7C2Y"
tags:
  - "backend"
  - "code"
  - "perf"
verify:
  - "bun run typecheck"
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T12:26:35.274Z"
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
    body: "Start: add batch backend APIs and bounded parallelism for multi-task operations."
doc_version: 2
doc_updated_at: "2026-02-07T12:26:40.505Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add backend batch methods (getTasks/updateTasks or writeTasks) with concurrency limits; use controlled parallelism for list/normalize/finish style operations to avoid IO storms."
id_source: "generated"
---
## Summary

Add batch backend APIs and limited parallelism helpers to avoid IO storms when operating on many tasks.

## Scope

In scope: add TaskBackend.getTasks(); implement LocalBackend.getTasks and RedmineBackend.getTasks with concurrency limits; update LocalBackend writeTasks and normalizeTasks to use bounded parallelism.

## Plan

1) Add TaskBackend.getTasks(taskIds) optional API.\n2) Implement bounded-parallel mapLimit helper (internal) and use it for LocalBackend.getTasks/writeTasks/normalizeTasks and RedmineBackend.getTasks.\n3) Keep behavior compatible: ordering stable; errors still surface.\n4) Run typecheck, lint, test:agentplane.

## Risks

Risk: too much concurrency causing filesystem or API load; Risk: nondeterminism in error reporting; Risk: changed ordering of effects vs prior sequential loops.

## Verification

- bun run typecheck\n- bun run lint\n- bun run test:agentplane

## Rollback Plan
