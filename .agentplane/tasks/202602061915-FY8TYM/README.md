---
id: "202602061915-FY8TYM"
title: "P0: start/block/finish без повторной загрузки backend"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T19:25:18.302Z"
  updated_by: "USER"
  note: "Approved by user on 2026-02-06T19:25:18.302Z: refactor start/block/finish to reuse context; no backward-compat required."
verification:
  state: "ok"
  updated_at: "2026-02-06T19:26:48.681Z"
  updated_by: "TESTER"
  note: "bun run test:agentplane passed."
commit:
  hash: "731128a96708d986319153d6609f37e16c900827"
  message: "✨ FY8TYM task"
comments:
  -
    author: "CODER"
    body: "Start: Refactor start/block/finish to load CommandContext once and reuse backend/config/resolved; remove per-task backend reloads in finish."
  -
    author: "CODER"
    body: "Verified: start/block/finish now reuse CommandContext (loadTaskBackend once per command) and load tasks via ctx; bun run test:agentplane passed."
doc_version: 3
doc_updated_at: "2026-02-06T19:29:06.811Z"
doc_updated_by: "CODER"
description: "(Tracking=202602061915-XCPF92; depends_on=202602061915-RNTNEP) Перевести команды start/block/finish на CommandContext: один backend на команду; в finish не вызывать loadBackendTask в цикле."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Switch cmdStart/cmdBlock/cmdFinish to call loadCommandContext once per invocation.
2) Load tasks via loadTaskFromContext instead of loadBackendTask (no repeated loadTaskBackend).
3) In finish: remove per-task loadBackendTask call inside loop; reuse ctx.backend.
4) Run bun run test:agentplane.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T19:26:48.681Z — VERIFY — ok

By: TESTER

Note: bun run test:agentplane passed.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Findings


## Risks
